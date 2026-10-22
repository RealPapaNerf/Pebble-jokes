// Phone-side JavaScript for QR Jokes.
// Holds the list of texts, turns the requested one into a QR code and ships
// the bitmap to the watch. The watch only ever asks "give me the current one"
// or "give me the next/previous one"; all skipping of empty slots happens here.

var Clay = require('pebble-clay');
var clayConfig = require('./config');
var qrencode = require('./qrencode');

var SLOT_COUNT = clayConfig.SLOT_COUNT;
var MAX_CHARS = 230;

// Shown when every box in the settings is empty.
var EMPTY_QR_TEXT = 'Nothing here yet. Open the Pebble app on your phone, ' +
                    'pick QR Jokes, tap Settings and type something.';
var EMPTY_DESCRIPTION = 'No codes yet - add some in Settings';

var clay = new Clay(clayConfig, null, { autoHandleEvents: false });

var texts = [];
var currentId = 0;

function loadTexts() {
  var stored = {};
  try {
    stored = JSON.parse(localStorage.getItem('clay-settings')) || {};
  } catch (e) {
    stored = {};
  }
  texts = [];
  for (var i = 1; i <= SLOT_COUNT; i++) {
    var value = stored['text' + i];
    texts.push(typeof value === 'string' ? value.trim() : '');
  }
}

function isFilled(i) {
  return texts[i] !== '';
}

function filledSlots() {
  var result = [];
  for (var i = 0; i < SLOT_COUNT; i++) {
    if (isFilled(i)) {
      result.push(i);
    }
  }
  return result;
}

// Find the slot to show, starting at `from` and moving in `direction`
// (-1 previous, 0 stay/forward, +1 next). Returns -1 if everything is empty.
function resolveSlot(from, direction) {
  if (filledSlots().length === 0) {
    return -1;
  }
  var step = direction < 0 ? -1 : 1;
  var slot = ((from % SLOT_COUNT) + SLOT_COUNT) % SLOT_COUNT;
  if (direction !== 0 || !isFilled(slot)) {
    for (var n = 0; n < SLOT_COUNT; n++) {
      slot = (slot + step + SLOT_COUNT) % SLOT_COUNT;
      if (isFilled(slot)) {
        break;
      }
    }
  }
  return slot;
}

function encode(text) {
  var code = qrencode.encodeString(text, 0, qrencode.QR_ECLEVEL_L, qrencode.QR_MODE_8, true);
  var size = code.length;
  var bytes = [];
  for (var y = 0; y < size; y++) {
    for (var x = 0; x < size; x++) {
      bytes[y * size + x] = code[x][y] ? 1 : 0;
    }
  }
  return bytes;
}

function sendCode(id, direction) {
  var slot = resolveSlot(id, direction);
  var toEncode;
  var description;

  if (slot < 0) {
    slot = 0;
    toEncode = EMPTY_QR_TEXT;
    description = EMPTY_DESCRIPTION;
  } else {
    toEncode = texts[slot];
    var filled = filledSlots();
    var position = filled.indexOf(slot) + 1;
    description = position + '/' + filled.length + ': ' + toEncode;
    if (toEncode.length > MAX_CHARS) {
      toEncode = 'Too long: keep each code under ' + MAX_CHARS + ' characters.';
      description = position + '/' + filled.length + ': too long (max ' + MAX_CHARS + ' chars)';
    }
  }

  currentId = slot;
  var msg = {
    qrcode: encode(toEncode),
    description: description,
    id: slot
  };
  Pebble.sendAppMessage(msg, function() {}, function(err) {
    console.log('Failed to send QR code: ' + JSON.stringify(err));
  });
}

Pebble.addEventListener('ready', function() {
  loadTexts();
  // Tell the watch we are alive; it answers with a fetch for its last slot.
  Pebble.sendAppMessage({ id: 100 });
});

Pebble.addEventListener('appmessage', function(e) {
  var payload = e.payload || {};
  if (typeof payload.fetch !== 'undefined') {
    var id = payload.fetch - 1;
    var direction = payload.direction || 0;
    sendCode(id, direction);
  }
});

Pebble.addEventListener('showConfiguration', function() {
  Pebble.openURL(clay.generateUrl());
});

Pebble.addEventListener('webviewclosed', function(e) {
  if (!e || !e.response) {
    return;
  }
  // getSettings() also writes the new values to localStorage.
  clay.getSettings(e.response, false);
  loadTexts();
  sendCode(currentId, 0);
});
