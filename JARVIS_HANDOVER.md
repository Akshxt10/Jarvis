# JARVIS V1 handover

Technical notes for whoever continues this project (including a future Claude session). For deployment steps see README.md.

## Status

Feature freeze. Nothing has been deployed. No formal test round has been run on a real iPhone. The code was checked in headless Chromium at 375px and 320px (including hosting from a sub-folder address and a simulated redeploy) and in Node-based simulations (see README, "What was verified"). WebKit was not available for testing.

## Requirements and defaults

Expected: iOS 15.4+ Safari (dialog element), HTTPS hosting. The only external request is the Google Fonts stylesheet in index.html (optional; remove the link to avoid it). The default drafting name `me` is "Akshat" (editable in Settings). Both are documented in README.md.

## File map (flat folder, no build step)

| File | Role |
|---|---|
| index.html | Static shell: bottom nav container, `main`, `dialog#dlg`, toast, stop-speaking button, PWA tags |
| styles.css | Dark navy and cyan theme, mobile layout, 44px touch targets on coarse pointers |
| app.js | All logic (about 150 KB, no dependencies) |
| JARVIS-TEST-CHECKLIST.md | Real-iPhone test list; marks what was only desktop-checked or never tested |
| manifest.webmanifest, sw.js, offline.html, 4 icons | PWA. Service worker cache name is the `CACHE` constant in sw.js (README names the same value) |
| _headers | Optional, Netlify or Cloudflare only |

A single-file variant of the app is also published as a Claude Artifact. It is not part of the ZIP and differs from app.js only in PWA-specific parts (install card, service worker registration, a few wording changes). The ZIP is the source of truth.

## Architecture (app.js)

- **One state object `S`**, saved as JSON under localStorage key `jarvis_v1` by `save()` and read by `load()` and sanitised by `norm()`. `norm()` also sanitises every imported backup (known keys only, repaired values, ids made unique). A second key, `jarvis_v1_prev`, holds one safety snapshot.
- **`S` keys** (schema `SCHEMA = 2`): v, bk, biz, brain, kb, rs, day, tasks, leads, projects, log, cmds, msgs, flows, proposals, speak, me. Array collections are listed in `COLS`.
- **Rendering:** `render()` writes `V[view]()` into `main`. Views: command, brain (Today, Plan, Sales, Vault sub-sections via `F.bt`), tasks, crm, outreach, lab, report, flows (the Agent tab), settings. All user text goes through `esc()`.
- **Events:** one delegated click handler reads `data-a` and calls `A[name](id, element)`. Filters use `data-f` with one `input` handler. Forms are built by `form()` from field lists in `CFG`; a form callback may return an error string.
- **Tool registry `TOOLS`:** implemented local tools: create_task, create_prospect, save_draft, create_project, daily_report, save_research, save_brief, schedule_followup, create_proposal. Future (not implemented, they fail honestly if run): send_message, publish_website, make_purchase, ai_plan, browser_automation. Tools reuse existing records instead of duplicating them.
- **Execution engine:** `addFlow()` creates a workflow awaiting approval; `drive()` runs it step by step. Workflow statuses: Awaiting approval, Running, Paused, Completed, Failed, Cancelled. Step statuses: Pending, Running, Completed, Failed, Needs Approval. Results and errors are stored per step. Nothing runs without the user's approval, and nothing runs while the app is closed.
- **Planners (local rules, no AI):** `buildPlan` (Command Brain, intents in `INTENTS`), `planFlow`/`localPlan` (Plan as workflow), `mkPlan`/`mkDecision` (Brain), `recs()` (Today priority engine), `fuDraft` (follow-up drafts). All are labelled LOCAL PLAN or rule-based.
- **AI hook:** `AI_ENDPOINT` is `null`. If set to the user's own HTTPS server, `remotePlan()` posts `{instruction, tools, context}` and `validatePlan()` accepts only tools in `TOOLS` and never lowers an approval requirement. Never put a key in this file.
- **Knowledge Vault:** `S.kb` notes with category, tags, fact/assumption label, optional links; `kbFor()` selects relevant notes for plans and drafts. `looksSecret()` refuses password and key patterns.
- **Backup:** `exportText()` writes the whole of `S` plus `app, version, schema, exportedAt, counts, checksum` (FNV-1a hex of the data portion). `A.doimport` validates, previews and offers Replace or Merge; a snapshot is saved first by `safeSnap()`.
- **Recovery:** snapshot before restore, reset, bulk delete and data-format updates; another-tab changes are detected via the `storage` event and `save()`.

## Changing things safely

1. Edit the files, keep every file name unchanged.
2. If app.js, styles.css or index.html change, bump `CACHE` in sw.js and the same name in README.md, otherwise installed copies may keep serving old files.
3. If you add a persisted field: add it to `empty()`, sanitise it in `norm()`, and check it appears in an export and survives restore.
4. Rebuild the ZIP from the folder and check it matches.

## Known limits

No login, no encryption, no cloud backup or sync, no background work or notifications, no real AI, no message sending, no web research. Data lives in one browser on one device and can be cleared by the user or the browser. Only one safety snapshot is kept. Text checks for secrets are pattern-based. The WebKit engine and real iPhone Safari behaviour, Home Screen installation, microphone use on iPhone, and web fonts offline have not been tested.
