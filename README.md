# QR Jokes

A Pebble watchapp that shows a QR code on your wrist. You type the text on your
phone, the watch displays it as a code. That's it.

The intended use: tell someone your watch face is cool. They look. It's a QR
code. "Yeah, you have to scan it to see the time." They scan it and get a joke.

Forked from Christian Reinbacher's
[QR Generator](https://github.com/reini1305/qrgenerator) with the business-card
feature removed and a settings page you can actually delete things from.

## What changed from QR Generator

- **No business cards.** The two MECARD slots are gone. Every slot is a plain text box.
- **Eight text boxes** instead of four.
- **Delete works.** Clear a box and tap Save; that code disappears from the watch.
  Empty boxes are skipped when you cycle, so the watch only ever shows codes you filled in.
- **Settings page is built in** (via [Clay](https://github.com/pebble/clay)), so it does
  not depend on a web page hosted by someone else.
- The description bar shows `2/5: your text` so you know where you are in the list.

## Using it

1. Install the app, then in the Pebble phone app open **QR Jokes → Settings**.
2. Type something in any of the eight boxes and tap **Save**.
3. On the watch:
   - **Up / Down**: previous / next code (empty boxes are skipped, list wraps around).
   - **Select**: scroll the text bar and light the screen.
   - **Long-press Select**: hide or show the text bar, so only the code is visible.
     Do this before showing anyone your "watch face".
   - Shake the wrist to light the screen for ten seconds.
4. To remove a code, clear its box in Settings and Save.

Shorter text makes a chunkier, easier-to-scan code. Under about 60 characters is
ideal on the 144 px screens; the hard limit is 230.

## Building

You need the Pebble tooling (`pebble-tool`, maintained by Core Devices / Rebble) and Node.

```sh
pip install pebble-tool
pebble sdk install latest
npm install          # pulls in pebble-clay
pebble build
pebble install --phone <phone-ip>      # or: pebble install --emulator basalt
```

In the emulator, `pebble emu-app-config` opens the settings page in your browser.

Layout:

| Path | What |
| --- | --- |
| `src/c/qrgenerator.c` | Watch side: draws the code, handles buttons, asks the phone for codes |
| `src/c/appglance.c` | Shows the current text in the launcher's app glance |
| `src/pkjs/index.js` | Phone side: stores the texts, encodes QR codes, skips empty slots |
| `src/pkjs/config.js` | The settings page definition (eight text boxes) |
| `src/pkjs/qrencode.js` | [libqrencode-js](https://github.com/lymar/libqrencode-js), unchanged |

## Joke ideas

Paste any of these into a box. Short ones scan fastest.

**The time, sort of**

- A broken watch is right twice a day. This one is right whenever you stop checking.
- The time is now. It always has been.
- Current time: later than you think.
- Error 404: time not found. Try again yesterday.
- Loading time... please wait. That was the time.
- It's five o'clock somewhere. Not here. Somewhere.
- The time is the same as on your phone. You're holding it.
- You have reached the time. Please leave a message after the tick.
- Breaking news: it's now. More at never.
- Today's date: today. Tomorrow's: TBD.
- This watch is right twice a day. It just won't say which twice.

**Wisdom, lightly damaged**

- To know the time, you must first know yourself. Or check your phone. It's right there.
- Time waits for no one, but it will wait for you to finish scanning.
- Patience is a virtue. This watch has lots of it.
- A wise man once asked a watch for the time. The watch said nothing. He is still waiting.
- Live every moment like it's the time. Because it is.
- The clock is a circle so you can't tell where it ends. Neither can I.
- Yesterday was the time to ask. Today it's just awkward.
- The early bird gets the worm. The early scanner gets this message.
- It's always now. I checked.
- This is the time. All of it. Spend it wisely.

**Pure nonsense**

- You scanned a watch to learn the time. Sit with that.
- Congratulations. You are the time now.
- Tick. Tock. You're welcome.
- You have scanned 1 wrist. Please scan another wrist to continue.
- If you can read this, you are too close to my wrist.
- Battery at 100%. Time at 0%. Priorities.
- Smartwatch? More like smart aleck.
- Roses are red, violets are blue, this watch is a QR code, the time is on you.
- Fortune: you will look at a watch and learn nothing. Lucky numbers: 12, 3, 6, 9.
- Clocks go in circles. So do people who scan watches. Welcome back.
- Stop checking. It's not going to get any later. It is, actually, but still.

A box can also hold a URL, so one slot can send the scanner to a web page instead.

## Credits

- [Christian Reinbacher](https://github.com/reini1305) for the original QR Generator app.
- [libqrencode-js](https://github.com/lymar/libqrencode-js) does the actual encoding.
- [Clay](https://github.com/pebble/clay) renders the settings page.
