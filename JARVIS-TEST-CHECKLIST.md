# JARVIS V1 test checklist (iPhone)

Honest status: before delivery JARVIS was only checked on a desktop computer (a headless Chromium browser at iPhone screen size, plus Node simulations). **Nothing below has been tested on a real iPhone.** Tick each box yourself and note anything odd.

Legend: **[Desktop-checked]** passed in the desktop simulation, still needs your iPhone. **[Never tested]** could not be tried at all before delivery.

Your site address will look like `https://YOURUSERNAME.github.io/jarvis/`.

## 1. Website loads over HTTPS
- [ ] The address starts with https:// and Safari shows no security warning. [Desktop-checked, locally only]
- [ ] The Command Center opens with the bottom bar showing 9 tabs (Command, Brain, Tasks, CRM, Outreach, Lab, Report, Agent, Settings) and no sideways scrolling. [Desktop-checked at 375px and 320px width]
- [ ] Text is readable and nothing is cut off at the edges or hidden behind the bottom bar. [Never tested on a real iPhone]
- [ ] The Space Grotesk font appears when online (the phone's normal font is also acceptable). [Never tested]

## 2. Navigation and buttons
- [ ] Tap each of the 9 tabs; each opens its own screen. [Desktop-checked]
- [ ] On Brain, switch between Today, Plan, Sales and Vault. [Desktop-checked]
- [ ] Open a form (for example Tasks, Add task), leave a required box empty, tap Save: you see an error. Fill it in and save. [Desktop-checked]
- [ ] Forms and dialogs stay usable when the on-screen keyboard is open (Save button reachable). [Never tested]
- [ ] In Settings, tap Load sample data, then use a few buttons on each screen (Edit, Copy, Mark done, Dismiss). Nothing should freeze or show an error. [Desktop-checked: 141 buttons clicked without a script error]
- [ ] Buttons are comfortable to tap with a thumb. [Never tested]

## 3. Data persists
- [ ] Add one task, one prospect (CRM), one project (Lab) and one Vault note.
- [ ] Fully close Safari (swipe it away), reopen the site: all four are still there. [Desktop-checked with page reloads]
- [ ] Note: the Home Screen app and Safari keep separate storage on iPhone, so data added in one does not appear in the other. Use Export and Restore to move it. [Behaviour of iOS, never tested]

## 4. Export and restore
- [ ] Settings, Export JSON, Copy JSON, paste into Notes. Check it looks like text starting with `{`. [Desktop-checked; the real iPhone clipboard was never tested]
- [ ] Settings, Import JSON, paste it back, Check backup: the preview says "No problems found" and "Nothing has been changed yet". Cancel. [Desktop-checked]
- [ ] Change one word inside the pasted text and check again: you get a checksum warning. [Desktop-checked]
- [ ] Choose Merge, then Replace on a spare copy of your data: a safety snapshot is made and Settings, Recovery offers to restore it. [Desktop-checked]
- [ ] Try the "Choose file" option with a .json file saved in Files. [Never tested]
- [ ] Settings, Reset all data: you must type RESET, and the snapshot lets you undo. [Desktop-checked]

## 5. Install and offline
- [ ] Safari, Share, Add to Home Screen: the JARVIS icon and name look right. [Never tested]
- [ ] Open JARVIS from the Home Screen icon: it opens full screen with no Safari bars, and nothing hides under the top status area or the bottom edge. [Never tested]
- [ ] Open the app once online, then switch on Airplane Mode and open it again: it still starts and shows your data. [Desktop-checked in a browser; never tested on iPhone]
- [ ] After a redeploy, close and reopen the app: it should show a "new version installed" message once, then use the new version. [Desktop-checked in a browser]
- [ ] Settings, Install and offline shows "Installed: Yes" and "Offline support: Active" from the Home Screen app. [Never tested]

## 6. Voice and permissions
- [ ] The microphone question appears only when you tap Speak, never when the page loads. [Never tested]
- [ ] Allow it, say a command: the words appear in the box, nothing runs until you tap Generate plan. [Never tested]
- [ ] Deny it: JARVIS shows a clear message and typing still works. [Never tested]
- [ ] Try Speak both in Safari and in the Home Screen app. Speech recognition may not work in the Home Screen app on iPhone; if so, use Safari. [Never tested]
- [ ] On a plan or report, tap Speak response: you hear it, Stop speaking stops it, and Settings can turn it off. [Never tested]

## 7. Core workflows (quick pass)
- [ ] Command Center: type "help me get my next website client", Generate plan, tick steps, Create selected, then in Agent approve and run. Statuses end as Completed or an honest Failed. [Desktop-checked]
- [ ] Outreach: Copy draft, paste somewhere. The history says "Copied, not confirmed sent". [Desktop-checked with a simulated clipboard; real iPhone clipboard never tested]
- [ ] Vault: saving a note containing "password: abc" is refused. [Desktop-checked]
- [ ] Brain, Today: recommendations and the daily plan appear from your data; Dismiss hides one. [Desktop-checked]

## Known limitations (by design)
- No login or encryption, no cloud backup or sync. Data lives only in this browser on this phone. Clearing Safari data, removing the app or changing phones erases it unless you exported a backup.
- Needs an external service (not built): real AI, live web research or finding leads, sending WhatsApp, Instagram or email, reminders or monitoring while the app is closed, calendar, publishing sites, payments.
- Safari on iOS 15.4 or later is expected (the app uses the dialog element).
- JARVIS only recalculates recommendations when you open or refresh it.
