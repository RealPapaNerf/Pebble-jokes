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
| `docs/` | The joke website for GitHub Pages (see below) |

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

**Your momma, plus time**

- Your momma told me the time. Then she told me again. She's right twice a day.
- Your momma is so old she asked this watch for the time and it said "before".
- Your momma is so slow this watch finished loading before she did.
- Your momma is so big she's in two time zones.
- Your momma is so old her watch is a sundial.
- Your momma called. She wants to know the time too.
- Your momma set this watch. That's why it's a QR code.
- It's your momma o'clock.
- Your momma said it's past your bedtime.
- Your momma is so late she's the reason this watch stopped trying.
- Your momma is so old she remembers when this watch told the time.
- Your momma is the time now.

**Subscribed to something they didn't want**

- You are now subscribed to Wrist Facts. Reply STOP to receive more Wrist Facts.
- Thanks for subscribing to Hourly Time Updates! First update: it's now.
- Subscription confirmed: Your Momma Daily. Unsubscribe is not available.
- Welcome to the newsletter. There is no newsletter. There is no unsubscribe.
- You have been added to this watch's mailing list. The watch has no email.
- Your free trial of Knowing The Time has started. Trial ends: now.
- Reply STOP to stop. Reply START to stop. Replies do nothing.
- Your subscription to Jokes On You has auto-renewed.
- Msg & data rates may apply. They apply to your momma.
- You are now following this wrist. Unfollow by walking away.
- Your 30-day trial of Time has expired. Renew at your momma's house.

**Very dumb**

- You suck.
- That's what she said.
- Your momma.
- Your momma told me the time.
- Nice phone. Shame about the face.
- It's time you went home.
- Time to get a life.
- No.
- lol
- Still waiting? Same.
- The time is: you scanned a watch. Think about your choices.
- You smell like someone who scans watches.
- Scanned by a loser. Hi.
- The time is on the wall, genius.
- Skill issue.
- Your fly is down.
- Sorry, wrong wrist.
- Wow, you fell for that.
- Your momma is a QR code.
- You've been QR'd. Tell your friends. Or don't, they already know.
- Instructions unclear, scanned a watch.
- Unsubscribe.

**The classic**

A box can hold a URL, and phone cameras offer to open it with one tap. Put this in a slot:

```
https://youtu.be/dQw4w9WgXcQ
```

Use the short `youtu.be` form: it makes a 25x25 code with 5 px modules on the watch,
which scans from arm's length. Pair it with a text slot right before it, such as
"Scan the next one for the actual time", then press Down.

## The joke website

The `docs/` folder is a small static site for GitHub Pages. Point a QR code at a
page instead of plain text and the scanner's phone opens a web page.

Turn it on once: GitHub repo **Settings → Pages → Build and deployment →
Source: Deploy from a branch → Branch: `main`, folder `/docs` → Save**. A minute
later the site is live at `https://realpapanerf.github.io/Pebble-jokes/`.

Pages you can point a QR code at (each is a 29x29 code, 4 px modules on the watch):

| Put this in a settings box | What the scanner gets |
| --- | --- |
| `https://realpapanerf.github.io/Pebble-jokes/` | A random joke and a big **Tap to see the time** button. The button is the rickroll. |
| `https://realpapanerf.github.io/Pebble-jokes/?13` | Joke number 13 (numbers are positions in `docs/jokes.js`) |
| `https://realpapanerf.github.io/Pebble-jokes/time/` | A fake "checking the time…" progress bar that stalls on "Asking your momma", then a **Tap to reveal the time** button. Also the rickroll. |
| `https://realpapanerf.github.io/Pebble-jokes/sub/` | A subscription confirmation they never asked for. Every tap of Unsubscribe adds another subscription. |

The full bit: scan the code, land on the site, tap to see the time, get rickrolled.

So eight watch slots could be, say, three text jokes, `?14`, `?26`, `time/`, `sub/`
and the rickroll.

To add jokes to the site, append to the array in `docs/jokes.js`. Only ever add to
the end: the number in a URL is the joke's position, and reordering would change
what existing QR codes show.

## Credits

- [Christian Reinbacher](https://github.com/reini1305) for the original QR Generator app.
- [libqrencode-js](https://github.com/lymar/libqrencode-js) does the actual encoding.
- [Clay](https://github.com/pebble/clay) renders the settings page.
