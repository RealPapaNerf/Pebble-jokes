// Settings page shown in the Pebble phone app (rendered by Clay, no hosting needed).
// Every field is a plain text box. Leave a box empty to remove that QR code.

var SLOT_COUNT = 8;

var items = [
  {
    type: 'heading',
    defaultValue: 'QR Jokes'
  },
  {
    type: 'text',
    defaultValue:
      'Each box becomes one QR code on the watch. ' +
      'Up/Down cycles through the codes you filled in. ' +
      'Empty boxes are skipped, so to delete a code just clear its box and save. ' +
      'Keep each one under 230 characters.'
  },
  {
    type: 'section',
    items: [
      {
        type: 'heading',
        defaultValue: 'Your QR codes'
      }
    ]
  }
];

for (var i = 1; i <= SLOT_COUNT; i++) {
  items[2].items.push({
    type: 'input',
    messageKey: 'text' + i,
    label: 'Code ' + i,
    defaultValue: '',
    attributes: {
      placeholder: i === 1 ? 'e.g. Scan to see the time' : 'empty = not shown',
      maxlength: 230
    }
  });
}

items.push({
  type: 'submit',
  defaultValue: 'Save'
});

module.exports = items;
module.exports.SLOT_COUNT = SLOT_COUNT;
