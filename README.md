# JARVIS V1 (standalone PWA)

A local-first business dashboard for a website-development business. Static files only: no backend, no API keys, no build step, no paid service.

**Modules:** Command Center (daily briefing, plain-language Command Brain, voice input, spoken responses), Brain (Today priority engine and daily plan, business profile, plans and decisions, sales intelligence, Knowledge Vault), Tasks, CRM, Outreach Studio, Website Lab, Reports, Agent (approval-based workflows, proposals and quotations, tool registry), Settings (backup, restore, recovery, storage, voice).

**Status: feature freeze.** No new modules are planned. Nothing has been deployed, and no formal test round has been run on a real iPhone. The code was checked in a headless desktop browser at iPhone screen size (see "What was verified").

## Requirements

- **Browser:** Safari on iPhone, iOS 15.4 or later expected. The app uses the HTML dialog element (Safari 15.4+); on older versions yes/no questions fall back to the browser's own prompt but forms will not open. This minimum comes from the code and is not tested on an old iPhone.
- **Hosting:** HTTPS is required for installing, offline use and copying to the clipboard. GitHub Pages provides it.
- **Network:** none needed to run after the first load. The only outside request is the Space Grotesk font from Google Fonts (a request to Google when online). Delete the Google Fonts `<link>` line in index.html to avoid it; the app then uses the phone's system font.
- **Name in drafts:** message drafts start with the name "Akshat"; change it in Settings, Preferences.

## What was verified before this freeze

Checked by running the real files in headless Chromium at 375px and 320px width: every tab loads, no horizontal overflow, the service worker registers and the app opens offline, data persists across reload, forms validate, duplicates are blocked, a Command Brain plan can be queued and approved, copy to clipboard works, export and restore preview work, tampered backups are detected, reset needs RESET and can be undone, and every visible button was clicked without a script error (a few only scroll, reorder or repeat a message, so their effect is not visible to the test). Hosting from a sub-folder address (as GitHub Pages does) was also checked in Chromium: the service worker scope, manifest, icons, precache and offline start all worked, and a simulated redeploy replaced the old cache, served the new code and kept saved data. A later pass also confirmed that passwords and keys are refused in forms and commands, phone numbers are accepted in contact details, duplicate open tasks are blocked, and the storage-limit banner appears. Not verified: the WebKit engine that iPhone Safari uses (it was not available in my test environment), real iPhone Safari behaviour, Add to Home Screen, microphone and speech on iPhone, and Google Fonts offline.

## Browser permissions

- **Microphone and speech recognition:** only asked when you tap Speak, never when the page loads. Support and reliability depend on the browser; on iPhone it may not work inside a Home Screen app, in which case open the site in Safari. Typing always works.
- **Clipboard:** used by the Copy buttons. If the browser refuses, JARVIS says so and you can select the text manually.
- **Persistent storage:** optional, requested only when you tap the button in Settings. The browser may refuse.
- **Speech output:** uses the browser's own voices, can be turned off in Settings.
- Notifications, location and camera are not used.

## Needs an external service (not built)

- Real AI reasoning or AI-written plans: needs your own server holding the model key. `AI_ENDPOINT` in app.js is empty.
- Live web research or finding leads, and any account access.
- Sending WhatsApp, Instagram or email messages: you copy drafts and send them yourself.
- Background or scheduled work, reminders and notifications while the app is closed.
- Cloud sync between devices and cloud backup.
- Publishing websites, taking payments, browser automation, calendar integration.

## Files (keep them all in ONE flat folder, no subfolders)

| File | Purpose |
|---|---|
| index.html | Page structure and PWA tags |
| styles.css | All styling (dark navy and cyan theme) |
| app.js | All app logic, data model, tool registry, planner |
| manifest.webmanifest | App name, colours, icons |
| sw.js | Service worker: caches the app files only |
| offline.html | Shown if the app files were never cached and you are offline |
| icon-192.png, icon-512.png, icon-maskable-512.png, apple-touch-icon.png | App icons |
| _headers | Optional, only for Netlify or Cloudflare Pages. GitHub Pages ignores it. |
| README.md | This guide |
| JARVIS_HANDOVER.md | Technical handover: architecture, data model, tool registry, how to change things safely |
| JARVIS-TEST-CHECKLIST.md | What to test on your iPhone, marking what has never been tried on a real device |

The three .md files and `_headers` are not needed to run the site, but uploading them is harmless. A separate **JARVIS-DEPLOYMENT-GUIDE.pdf** (delivered next to the ZIP, not part of the website) repeats the iPhone deployment steps in a beginner-friendly layout.

## Deploy on GitHub Pages from an iPhone (free, no domain needed)

1. Save all the files to the Files app (from the Claude file cards, or unzip jarvis-pwa-final.zip by tapping it).
2. In Safari, open github.com and create a free account.
3. Create a new repository: name it `jarvis`, set it to **Public** (at the time of writing, free GitHub accounts publish Pages from public repositories; check GitHub's current rules), then Create.
4. In the repo, tap **Add file, then Upload files**. Tap choose files, select ALL the files from the folder (use Select in the picker; do not upload the .zip itself), then **Commit changes**.
5. Open the repo **Settings** (if you cannot see it, tap the three dots menu, or use aA, then Request Desktop Website). Tap **Pages**. Under Build and deployment choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then Save.
6. Wait 1 to 3 minutes and refresh. Your address will be `https://YOURUSERNAME.github.io/jarvis/`.
7. Open it in Safari. Tap Share, then **Add to Home Screen**.

Other free hosts (Netlify, Cloudflare Pages) can serve the same files. I have not verified their upload flows from an iPhone, so GitHub Pages is the documented route.

The repo is public, so anyone can read the code. The code contains no secrets. Your business data is never in the repo; it lives only in your browser.

## Move your current data over

The Claude Artifact and the deployed site are different addresses, and the Safari tab and the Home Screen app also keep separate storage on iPhone. Browser storage cannot be shared between them.

1. In the old JARVIS: Settings, Export JSON, Copy JSON, paste into Notes.
2. In the new app (Home Screen version): Settings, Import JSON, paste, Import.

## Storage limits (be aware)

- Data is saved in browser storage on one device. There is no cloud sync.
- Clearing Safari website data, removing the app, or using another device or browser shows an empty JARVIS until you import a backup.
- Safari may clear site data for sites not opened for about a week. Home Screen apps are exempt as far as I know. Export backups regularly anyway.
- Exported JSON contains your business records, so keep it private. It never contains API keys because JARVIS has no key field.

## What the service worker does

It caches only the app files listed in sw.js so JARVIS can start offline. It does not read or cache your data, does not cache other websites, and ignores POST requests. It checks the network first, so a redeploy shows up after a refresh. To force every device to refresh, change the number in `jarvis-v1-shell-11` inside sw.js when you redeploy.

PWA features need HTTPS (GitHub Pages provides it). Opening index.html as a local file will run the app but without install or offline support.

## What changed compared with the Claude Artifact

- Works the same: all modules, data model, JSON export/import, voice, planner, tool registry, proposals.
- Added: manifest, service worker, offline page, icons, an Install and offline card in Settings.
- Gone after export: Claude can no longer edit the page in place, the artifact share link and comments, and the shared origin (so data does not carry over automatically).
- Differences to expect: file downloads may work better outside the preview (Copy JSON remains the fallback). Speech recognition on iPhone has been unreliable inside Home Screen apps; if Speak fails there, open the site in Safari instead. Google Fonts load only when online; offline falls back to system fonts.

## AI and automation boundaries

- Plans come from the local rule-based planner and are labelled LOCAL PLAN.
- `AI_ENDPOINT` in app.js is empty. A real model needs your own server that keeps the key secret and allows your site in CORS. Never put a key in app.js.
- Not implemented: sending messages, publishing sites, purchases, browser automation, background or scheduled runs, cloud sync. Workflows run only while the app is open.

## Audit changes

- Imported or older data is cleaned on load: duplicate IDs, malformed plans and workflows no longer break screens, and only http(s) preview links are rendered.
- A failed save now shows an accurate warning, and clears itself once saving works again.
- Sample data is labelled "(sample)" and can be removed from Settings.
- Settings has a Preferences card (name used in message drafts). Buttons are larger on touch screens.

## Final consolidation changes

- Command Center plans now use the same tool registry as workflows: "Add steps as tasks" reuses open tasks instead of duplicating them, and "Review as workflow" sends a plan through the approval engine.
- Each prospect card has a Workflows button (demo brief, outreach draft, follow-up, proposal) that uses the same templates and the same records.
- Backup import is validated, shows counts, skips unreadable items, and asks before replacing data.
- Confirmation dialogs no longer leave stale handlers, and fall back to the browser's own confirm on very old browsers.
- The service worker is versioned (shell-3). After a redeploy, the app tells you when a new version was installed; close and reopen it to use it.

## Business Brain (new tab)

All of this is rule-based and runs on your device. Nothing is researched online, no AI model is connected, and every result is labelled LOCAL PLAN.

- **Business profile:** name, description, products and services, audience, countries, pricing, INR budget, goals and priorities. Saved with your data and included in backups.
- **Context-aware plans:** objective, context used, steps, resources, costs, risks and next action. Steps use your real prospects, tasks, projects and proposals. Costs outside JARVIS are shown as unknown. "Review as workflow" turns a plan into tasks through the approval engine.
- **Sales intelligence:** a transparent lead score (stage, overdue follow-up, contact details saved, your own value estimates), a comparison table, overdue follow-ups with a one-tap follow-up workflow, and outcomes with reasons lost. Win rate appears only once prospects are marked Won or Lost.
- **Quotations:** the proposal workflow accepts line items ("item - amount") and totals them in INR.
- **Decision support:** describe a problem and get a diagnosis, options with advantages and disadvantages, a recommendation within your budget, and an execution plan.
- **Daily briefing:** on the Command Center, built only from saved tasks, follow-ups, projects, proposals and activity.

Needs an external service (not built): live lead research, AI-written reasoning, sending messages, cloud sync.

## Command Brain (Command Center)

Type a request in plain words, for example "help me get my next website client", "prepare a proposal for this lead", "show me overdue follow-ups", "plan today's business priorities", "create a website project with tasks" or "help me improve my digital product sales". Intent is recognised with local rules (no AI model).

- Each plan shows the objective, ordered steps with priority and an effort estimate (marked as an estimate), required information, relevant prospects, tasks and projects from your data, and the next recommended action.
- If something is missing (which prospect, the price, which product) it asks one short question and rebuilds the plan from your answer.
- Tick the steps you want and tap Create selected. That queues them as a workflow in the Agent tab, where you see what will be created (and which items already exist and will be reused) and approve it. Only then do the existing tools run, and each step's real result or error appears back in the plan.
- Plans, answers and outcomes are saved locally in your backups and can be reopened from the history.
- Plans are recommendations until you approve and run them. Nothing is sent, researched online or scheduled in the background.

Needs an external service (not built): AI language understanding, live web or account access, sending messages, background reminders.

## Knowledge Vault (Brain tab, Vault)

The Brain tab now has three sections: Plan, Sales and Vault.

- **Notes you write yourself:** title, details, category (business, strategy, product and pricing, audience and customers, sales lessons, outreach results, project notes, decisions, prompts and templates), tags, and optional links to a prospect, project and task. Every note is marked as a **fact** (you know it is true) or an **assumption**.
- **Organise:** search by keyword, filter by category, tag, pinned, facts or assumptions, pin, edit, copy and delete. Prospect and project cards show how many notes are linked, and prospect cards have an Add note button.
- **Used by JARVIS:** Brain plans, decisions and Command Brain plans list the saved notes that match the request (and notes linked to the named prospect), labelled "saved fact" or "saved assumption (unverified)". Outreach Studio can start a draft from a saved template (placeholders {name}, {niche}, {city}, {website}, {me}) and shows notes related to the prospect. Saved notes are never turned into new claims.
- **Memory controls:** the Vault shows what is saved, and Settings shows a count of everything JARVIS holds. Notes are part of Export JSON and Import JSON. "Delete all notes" asks first. Saving is blocked for text that looks like a password, API key, token or card/ID number, and imported notes that look like that are replaced with a notice.
- Everything is stored in this browser only. There is no cloud sync and no AI memory.

## Security, recovery and data integrity

- **Backups:** Export JSON now includes a header with the schema number, export time, record counts and a checksum. The last export time is remembered, and the Command Center reminds you after 7 days. JARVIS cannot see where you saved the file.
- **Restore with a preview:** paste the JSON or choose the file. JARVIS checks that it is valid JSON, looks like a JARVIS backup, matches its checksum and record counts, then shows a table of current versus backup records plus any problems. You choose Replace or Merge (Merge only adds records you do not already have), and confirm. Invalid fields are reset to safe values, unreadable records are skipped, and nothing imported is ever run as code or HTML.
- **Safety snapshot:** before a restore, a reset, a bulk delete or a data format update, the previous data is kept (most recent one only) and can be restored from Settings, Recovery. If another tab or window changed the data, the other version is kept the same way and a banner explains.
- **Reset:** you must type RESET. A snapshot is kept so it can be undone.
- **Duplicates:** adding a prospect with the same name and city, a project with the same name for the same prospect, or an identical note is blocked with a message. Workflows already reuse existing records.
- **Storage:** missing or blocked browser storage is detected and shown honestly, and the app keeps working in memory. Settings can ask the browser for persistent storage, which the browser may refuse.
- **Honest limits:** there is no login, no encryption and no cloud backup. Anyone who can use the browser profile can read the data and backup files are plain text. Passwords and API keys are never requested. Text that looks like a password, API key or card/ID number is refused in forms, commands and notes (a pattern check that can miss some). Earlier saved data and imported backups are not re-scanned, except Vault notes.

## Proactive assistant (Brain tab, Today)

The Brain tab opens on **Today**. Everything is recalculated from your saved data whenever you open or refresh the screen. Nothing runs in the background, nothing is monitored while the app is closed, and nothing is sent or created unless you tap a button.

- **Priority engine:** overdue tasks, upcoming deadlines (3 days), overdue and approaching follow-ups, prospects with a contacted/interested stage but no follow-up date, new prospects left untouched for 7 days, projects with no next step or open tasks still linked, proposals sent with no outcome for 5 days, and sales goals that no task, plan, project or command mentions (a keyword match that can miss differently worded work).
- **Each recommendation shows** why it matters, the suggested next action, priority, the related prospect or project, and buttons: Create task (reuses an existing open task, never duplicates), a shortcut to the right screen, Mark done and Dismiss. Dismissed or done items stay hidden; a recommendation only returns if its situation changes (for example a new follow-up date). Handled items can be restored.
- **Daily plan:** generated from tasks due or overdue, follow-ups due, and projects in progress. It starts as a draft, you edit, reorder, add or remove items, then Save plan. Ticking an item only updates the checklist.
- **Follow-ups:** overdue and next-7-days follow-ups with a drafted message built only from saved details (stage, last contact, proposal sent by you). Copy draft records it as copied (not sent). "I followed up" asks you to confirm before logging it.
- Dismissals and the daily plan are saved with your data and included in Export JSON and restore.

Needs an external service (not built): background monitoring or reminders when the app is closed, sending messages, calendar integration, AI-written recommendations.

## Security and recovery fixes (final pass)

- Password, key and card/ID patterns are now refused in every form, command box and saved draft, not only in the Vault. Contact details skip the digit check because they hold phone numbers.
- If the safety snapshot cannot be saved (storage full or blocked), restore, merge, reset, sample removal and delete-all-notes warn you and ask before continuing, and the result says no undo is available.
- Fixed: removing sample data took its snapshot after deleting, so undo could not bring the data back.
- Adding an open task with the same title and due date as an existing one is blocked.
- A banner appears when your data nears the browser's storage limit (about 5 MB).

## Updating later

Edit or replace files in the repo (Add file, Upload files, same file names), then bump the cache number in sw.js.
