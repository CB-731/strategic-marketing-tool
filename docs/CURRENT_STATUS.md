# Current Status — Strategic Marketing Bootcamp

Date: 2026-05-06

## Completed

- Project planning system created.
- Sprint breakdown created.
- Architecture plan created.
- Acceptance criteria created.
- Implementation checklist created.
- Task content matrix created.
- LLM workflow created.
- Next implementation prompt created.
- Sprint 0 completed.
- Final implementation target confirmed: `public/index.html` as the single-file React app entry inside the existing project structure.
- Sprint 1 completed.
- Static single-file React shell implemented in `public/index.html`.
- App preview now serves the Sprint 1 shell successfully.
- Sprint 2 completed.
- Canonical static task data for all 12 lessons added to `public/index.html`.
- Pure task helpers added for task lookup, filenames, checklist defaults, completion checks, and unlock logic.
- Sprint 3 completed.
- Local app state now persists in `localStorage` under `smb_state`.
- Added current project/task selectors and storage-event synchronization in `public/index.html`.
- Sprint 4 completed.
- Google OAuth login gate added before the app shell.
- Required Drive, Documents, and Gmail readonly scopes are configured in `public/index.html`.
- Token metadata now persists in `localStorage` under `smb_auth_token`.
- Token expiry and 401/403 re-auth prompting helpers are implemented.
- OAuth client ID is configured in `public/index.html`.
- Sprint 5 completed.
- Onboarding modal appears after auth when no projects exist and from the `+ New Project` button.
- Drive project creation helpers are implemented for `marketing-projects`, project subfolder creation, template copying, progress, retry, and successful `smb_state` metadata save.
- All 12 Google Docs template file IDs are configured in `public/index.html`.
- Old Sprint 3 demo sandbox content has been removed from the visible UI and legacy demo projects are filtered out of `smb_state`.
- Sprint 6 completed.
- Left sidebar project navigation now renders projects as accordions with phase groups, all 12 tasks, active/completed/incomplete/locked task states, locked-click feedback, project switching, and persisted task selection.
- Left sidebar authentication controls now sit in a compact collapsed footer so project/task navigation remains the visual priority.
- Sprint 7 completed.
- Center panel now shows the selected task name, embeds the selected task Google Doc, shows an iframe loading spinner, updates when task selection changes, and provides an `Open in Google Docs ↗` fallback.
- Sprint 8 completed.
- Right sidebar now renders selected task lesson number, title, tagline, WHAT/WHY/HOW/MISTAKES blocks, diagram/caption fallback, template labels, and external resource links.
- Diagram sources now use local files in `public/assets/diagrams` instead of Google Drive placeholder URLs.
- Diagrams now open in a same-window lightbox with a transparent dark blurred backdrop, top-right close button, backdrop/Escape close behavior, and looping zoom controls.
- Diagram caption text now appears only as fallback text when a diagram image fails to load.
- Opened diagrams now fit inside the lightbox without internal scrollbars while zooming from the center.
- Center Google Doc iframe now uses the full center panel height, with `Open in Google Docs ↗` as a floating bottom-right rounded button.
- Sprint 9 completed.
- Right sidebar checklist now renders functional checkboxes, saves immediately to `smb_state`, shows checked count and gold progress bar, marks tasks complete, unlocks the next task, and re-locks downstream tasks when prerequisites become incomplete.
- Sprint 10 completed.
- Project management polish confirms the existing `+ New Project` flow supports multiple projects, adds clearer first/new project modal copy, strengthens state recovery for invalid selections/downstream locks, adds a missing task document recovery message, and adds responsive/UI guard polish.
- Sprint 11 completed.
- Manual testing and hardening validated the served app, placeholder replacement, diagram assets, feature markers, local persistence/recovery logic, Google integration paths, and editor diagnostics.
- Sprint 11 hardening fixed prerequisite locking so all previous tasks must be complete before a later task unlocks, while preserving downstream checklist data.
- CR-001 completed after the sprint plan.
- Expanded project accordions now include `Edit name` and `Delete` actions.
- Project rename persists locally and attempts to rename the Google Drive project folder when a folder ID exists.
- Project delete removes the project from the app/localStorage only and leaves Google Drive files untouched.
- The sidebar auth footer now only shows `Sign out`; visible session scopes, expiry, and re-authenticate controls were removed.
- Saved Google auth is remembered locally for up to 90 days so returning users can reopen the app without the login gate unless the remembered connection is too old or they sign out.
- CR-002 completed after the sprint plan.
- Task 2 resources now include the user's target-market research tools: Google Maps, Yelp, Facebook reviews/comments, Trustpilot, YouTube comments, Instagram comments, TikTok comments, Reddit, Quora, Google Keyword Planner, and Ubersuggest.
- Task 3 resources now include Meta Ads Library, Google Ads Transparency Center, and Competitor Websites Search.
- CR-003 completed after the sprint plan.
- Task 2 How now explains how to search each target-market tool and what evidence to extract.
- Task 3 How now explains how to search Meta Ads Library, Google Ads Transparency Center, and competitor websites, plus what hooks, offers, headlines, trust elements, and opportunity gaps to collect.
- CR-004 completed after the sprint plan.
- Remembered auth is now hardened so users can reopen the app within the 90-day remembered window without being forced through the login gate.
- Expired Google API access now prompts a contextual `Reconnect Google` banner without clearing `smb_state` or hiding existing projects.
- `Sign out` remains the only intentional disconnect action.
- CR-005 completed after the sprint plan.
- Expanded project accordions now use icon-only project actions: `✎` for rename and `🗑` for delete.
- Project action icons include accessible labels and titles while preserving existing rename/delete behavior.
- CR-006 completed after the sprint plan.
- Project delete now uses an in-app confirmation modal instead of a browser confirmation dialog.
- Confirmed project deletion moves the Google Drive project folder to trash before removing the project from local app state.
- Drive deletion failure leaves the project intact and shows a readable modal error.
- CR-007 completed after the sprint plan.
- Project creation now prevents confusing duplicate names by checking existing app project names and Google Drive folders under `marketing-projects`.
- Project rename now applies the same unique-name handling while keeping the final app project name and Drive folder name aligned.
- Duplicate names automatically become unique names such as `Project Name (2)`.
- CR-008 completed after the sprint plan.
- Project rename now uses a custom in-app modal instead of the browser `window.prompt()` flow.
- The rename modal preserves Drive folder rename, duplicate-name handling, loading state, cancel behavior, and readable errors.
- CR-009 completed after the sprint plan.
- The one-document Google Docs tab architecture is now planned using master template `1iwVp357VIfNPpaxPvrzjBWEywUz7m4OgtF6gTrNgGA0`.
- Stable task tab IDs for all 12 tasks are recorded in `docs/CHANGE_REQUESTS.md`.
- Follow-up implementation is split into CR-010 through CR-013.
- CR-010 completed after the sprint plan.
- New project creation now copies one master Google Doc instead of 12 separate task docs.
- New project state now stores the copied master document ID as `projectDocId`.
- All 12 task checklist/progress records are still created for new projects, but they do not require per-task copied doc IDs.
- CR-011 completed after the sprint plan.
- All 12 task definitions now include stable Google Docs tab IDs.
- Google Docs URL generation now supports task tabs.
- One-doc projects now route the center iframe and fallback button through `projectDocId` plus the selected task `tabId`.
- Old per-task `docId` routing remains as a fallback when a project has no `projectDocId`.
- CR-012 completed after the sprint plan.
- Document selection is now centralized so one-doc projects use `projectDocId` + `tabId`, while legacy 12-doc projects fall back to per-task `docId`.
- Project normalization preserves both new project-level document references and old per-task document references.
- Recovery copy now distinguishes missing project-level documents from missing legacy task documents.
- CR-013 completed after the sprint plan.
- Old per-task template IDs and unused old task-template copy helpers have been removed from the active app code.
- New project creation now clearly uses one master project document copy through `MASTER_PROJECT_TEMPLATE_FILE_ID`.
- Legacy per-task `docId` read support remains so old projects can still open their existing task docs.
- CR-014 completed after the sprint plan.
- The app now tries silent Google token refresh with `prompt: ''` before Drive create, rename, and delete operations when the saved access token is expired.
- The app also attempts silent refresh on startup when a remembered Google connection exists but the short-lived access token is expired.
- If silent refresh fails, projects remain visible and reconnect guidance is shown without clearing `smb_state`.

## Not Started

- No planned implementation sprint remains.
- No pending planned change request remains.

## Latest Test Result

Date: 2026-05-06

- `npm test` passes only because the script says `No tests specified`.
- `public/index.html` now loads as a standalone static React shell and returns HTTP 200 in preview.
- Sprint 1 placeholders render for the left sidebar, center panel, and right sidebar.
- Sprint 2 data validation confirms 12 task definitions, 12 configured template file IDs, 12 local diagram asset paths, and all required helper functions exist in `public/index.html`.
- Sprint 3 validation confirms `smb_state`, load/save helpers, project/task selectors, and `storage` event sync support exist in `public/index.html`.
- Sprint 4 validation confirms the GIS script, login screen, required scopes, `smb_auth_token`, token client flow, and 401/403 re-auth handling code exist in `public/index.html`.
- Sprint 5 validation confirms the OAuth client ID, onboarding modal, Drive API wrapper, folder helpers, Drive copy method, project creation service, progress UI, retry button, and metadata save code exist in `public/index.html`.
- Sprint 6 validation confirms project accordion navigation, phase groups, task status icons, locked task message behavior, and persisted project/task selection exist in `public/index.html`.
- Sprint 7 validation confirms selected task header, Google Docs embed URL helper, iframe rendering, loading overlay, iframe fallback button, and task-switch reload behavior exist in `public/index.html`.
- Sprint 8 validation confirms the right guidance panel renders task header, WHAT/WHY/HOW/MISTAKES blocks, diagram fallback, template label, and external links from canonical task data in `public/index.html`.
- Sprint 9 validation confirms checklist rendering, checkbox persistence helper, progress bar, completion state, next-task unlock behavior, and downstream re-locking code exist in `public/index.html`.
- Sprint 10 validation confirms multi-project onboarding copy, normalized invalid selected task recovery, missing doc ID recovery UI, responsive guard CSS, and state normalization polish exist in `public/index.html`.
- Sprint 11 validation confirms the app preview returns HTTP 200, no template placeholders remain, no diagram placeholders remain, all 12 local diagram assets return HTTP 200, `public/index.html` has no editor diagnostics, and prerequisite locking checks every previous task.
- CR-001 validation confirms `public/index.html` has no editor diagnostics, the app preview returns HTTP 200, project action markers are present, and old visible sidebar session-detail markers are absent.
- CR-002 validation confirms `public/index.html` has no editor diagnostics, the app preview returns HTTP 200, and served app content contains the new Task 2 and Task 3 resource labels.
- CR-003 validation confirms `public/index.html` has no editor diagnostics, the app preview returns HTTP 200, and served app content contains the new Task 2 and Task 3 How guidance markers.
- CR-004 validation confirms `public/index.html` has no editor diagnostics, the app preview returns HTTP 200, auth refresh paths preserve remembered auth, and served app content includes the `Reconnect Google` marker.
- CR-005 validation confirms `public/index.html` has no editor diagnostics, the app preview returns HTTP 200, icon action labels are present, and visible `Edit name` action text is absent.
- CR-006 validation confirms `public/index.html` has no editor diagnostics, the app preview returns HTTP 200, delete modal/Drive trash markers are present, and `window.confirm` is absent.
- CR-007 validation confirms `public/index.html` has no editor diagnostics, the app preview returns HTTP 200, and served app content includes unique-name helper and duplicate-avoidance markers.
- CR-008 validation confirms `public/index.html` has no editor diagnostics, the app preview returns HTTP 200, rename modal markers are present, and `window.prompt` is absent.
- CR-009 validation confirms documentation-only planning was completed for the one-document tab architecture; no application code was changed.
- CR-010 validation confirms `public/index.html` has no editor diagnostics, the app preview returns HTTP 200, the master template/project document markers are present, and the old 12-file creation loop markers are absent.
- CR-011 validation confirms `public/index.html` has no editor diagnostics, the app preview returns HTTP 200, all 12 tab IDs are present, and tab/project document routing markers are present.
- CR-012 validation confirms `public/index.html` has no editor diagnostics, the app preview returns HTTP 200, compatibility helper markers are present, legacy fallback markers are present, and updated recovery copy markers are present.
- CR-013 validation confirms `public/index.html` has no editor diagnostics, the app preview returns HTTP 200, stale old-template creation markers are absent, master document copy markers remain, and legacy view fallback markers remain.
- CR-014 validation confirms `public/index.html` has no editor diagnostics, the app preview returns HTTP 200, silent refresh helper markers are present, and Drive action refresh markers are present for create, rename, and delete.
- `npm run build` still fails because legacy `src` files contain JSX in `.ts` files.
- `npm start` still fails because the old generated `dist/main.js` path is unrelated legacy scaffold code.
- Dependency audit reports 8 high severity vulnerabilities from old server-side dependencies.
- Issues are documented in `docs/BUGS.md`.

Detailed Sprint 11 findings are recorded in `docs/MANUAL_TEST_REPORT.md`.

## Manual Note

- End-to-end Drive project creation is ready to test with the configured Google Docs template file IDs.
- Google Cloud must allow `http://localhost:4173` as an authorized JavaScript origin for the configured OAuth client.

## Immediate Next Step

All planned sprints and planned change requests are complete. Use `docs/CHANGE_REQUESTS.md` for future small edits.

Use `docs/NEXT_PROMPT.md`.
