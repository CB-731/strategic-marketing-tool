# Task Log — Strategic Marketing Bootcamp

Use this file to record completed work after every implementation task.

## Status Legend

- Not started
- In progress
- Blocked
- Complete

## Current Sprint

Sprint 11 — Manual Testing and Hardening — Complete

## Next Sprint

No planned sprint. All planned implementation sprints are complete.

## Log

| Date | Sprint | Task | Status | Notes |
|---|---|---|---|---|
| 2026-05-06 | Sprint 0 | Create planning documents | Complete | Created AI context, sprint plan, task log, decisions, bugs, and content matrix. |
| 2026-05-06 | Sprint 0 | Confirm implementation target | Complete | Final target is `public/index.html` as a single-file React app inside the existing project structure. |
| 2026-05-06 | Testing | Current scaffold test | Complete | Ran `npm test`, `npm install`, `npm run build`, `npm start`, and `npm audit --audit-level=high`. Current scaffold fails build/start; issues logged in `docs/BUGS.md`. |
| 2026-05-06 | Sprint 1 | Build static shell in `public/index.html` | Complete | Replaced the broken public entry with a single-file React shell using Inter, dark theme variables, full-height three-panel layout, empty project list placeholder, center placeholder, and right sidebar guidance placeholder. |
| 2026-05-06 | Sprint 2 | Add canonical task data layer | Complete | Added 12 hardcoded task definitions and pure helper functions for task lookup, file naming, default checklist creation, completion checks, and unlock logic in `public/index.html`. |
| 2026-05-06 | Sprint 3 | Add localStorage state layer | Complete | Added `smb_state`, default app state, load/save helpers, malformed JSON recovery, current project/task selectors, persisted task selection updates, storage-event sync, and a local state sandbox in `public/index.html`. |
| 2026-05-06 | Sprint 4 | Add Google OAuth gate | Complete | Added Google Identity Services script, login screen, required Google scopes, `smb_auth_token` storage helpers, expiry detection, and graceful re-auth prompts while keeping `smb_state` intact in `public/index.html`. |
| 2026-05-06 | Config | Add real OAuth client ID | Complete | Replaced the OAuth client placeholder with `203979048578-9onoru8b2ep1nn0ngi488eibc20auoln.apps.googleusercontent.com` in `public/index.html`. |
| 2026-05-06 | Sprint 5 | Add onboarding and Drive creation flow | Complete | Added first/new project onboarding modal, Drive API wrapper, create-or-reuse `marketing-projects` folder, project subfolder creation, 12-template copy loop, progress UI, error/retry handling, and successful metadata save into `smb_state`. |
| 2026-05-06 | UI cleanup | Remove demo sandbox content | Complete | Removed the Sprint 3 demo state controls/content from the visible app and added normalization to remove legacy `demo-project-*` entries from `smb_state`. |
| 2026-05-06 | Config | Add real template file IDs | Complete | Replaced all 12 `PASTE_TASKX_TEMPLATE_FILE_ID_HERE` placeholders with the provided Google Docs template file IDs in `public/index.html`. |
| 2026-05-06 | Sprint 6 | Build left sidebar navigation | Complete | Added project accordions, phase groups, all 12 task nav items, active/completed/incomplete/locked states, locked-click feedback, project switching, and persisted last opened task behavior in `public/index.html`. |
| 2026-05-06 | UI cleanup | Fix sidebar auth panel overlap | Complete | Updated the left sidebar layout so project navigation scrolls in its own area and the authentication/sign-out panel stays in a reserved footer without covering task text. |
| 2026-05-06 | UI cleanup | Collapse sidebar auth controls | Complete | Refactored the left sidebar so project/task navigation gets the main space and Google session tools collapse into a compact bottom row that expands only when clicked. |
| 2026-05-06 | Sprint 7 | Build center Google Doc iframe | Complete | Added selected task header, Google Docs embed URL helper, iframe viewer, loading overlay, task-switch reload behavior, and `Open in Google Docs ↗` fallback in `public/index.html`. |
| 2026-05-06 | Sprint 8 | Build right guidance panel | Complete | Added selected task lesson header, tagline, WHAT/WHY/HOW/MISTAKES content blocks, diagram image with caption fallback, template labels, and external resource links in `public/index.html`. |
| 2026-05-06 | Config | Use local diagram assets | Complete | Replaced all 12 Google Drive diagram placeholder URLs with local `/assets/diagrams/task-XX-diagram.png` paths in `public/index.html`. |
| 2026-05-06 | UI cleanup | Add diagram lightbox | Complete | Made right-sidebar diagrams open in a same-window dark blurred lightbox with backdrop close, top-right close button, Escape close, and looping zoom in/out controls. |
| 2026-05-06 | UI cleanup | Hide loaded diagram captions | Complete | Updated diagram rendering so caption text appears only when the diagram image fails to load, including inside the lightbox fallback. |
| 2026-05-06 | UI cleanup | Fit diagram lightbox images | Complete | Updated opened diagrams to fit inside the lightbox without internal scrollbars while keeping centered zoom in/out behavior. |
| 2026-05-06 | UI cleanup | Maximize center doc iframe | Complete | Removed the center document header so the Google Doc iframe uses the full center height and moved `Open in Google Docs ↗` to a floating rounded button at bottom right. |
| 2026-05-06 | Sprint 9 | Build checklist progress logic | Complete | Added functional right-sidebar checklists, immediate `smb_state` persistence, progress count/bar, task completion messages, next-task unlock behavior, and downstream re-locking in `public/index.html`. |
| 2026-05-06 | Sprint 10 | Add project polish and recovery | Complete | Confirmed multiple-project onboarding behavior, improved first/new project modal copy, strengthened normalized state recovery, added missing task document recovery UI, and added responsive guard polish in `public/index.html`. |
| 2026-05-06 | Sprint 11 | Manual testing and hardening | Complete | Validated served app health, placeholders, diagram assets, feature markers, and diagnostics; fixed prerequisite locking so all earlier tasks must be complete while downstream checklist data is preserved. See `docs/MANUAL_TEST_REPORT.md`. |
| 2026-05-06 | CR-001 | Project actions and simplified remembered login | Complete | Added project rename/delete controls, Drive folder rename support, local-only project delete, simplified auth footer to only `Sign out`, and remembered Google connection behavior for up to 90 days. See `docs/CHANGE_REQUESTS.md`. |
| 2026-05-06 | CR-002 | Task 2 and Task 3 resource tools | Complete | Added the user's target-market research tools to Task 2 and top-player/competitor research tools to Task 3, then synced `docs/TASK_CONTENT_MATRIX.md`. |
| 2026-05-06 | CR-003 | Task 2 and Task 3 resource-use instructions | Complete | Added detailed search prompts and what-to-look-for guidance to the How sections for each Task 2 target-market tool and each Task 3 top-player/competitor tool. |
| 2026-05-06 | CR-004 | Persistent sign-in hardening | Complete | Hardened remembered auth so returning users remain in the app for up to 90 days, Drive API refresh failures no longer clear saved app auth, and a contextual `Reconnect Google` banner prompts refresh without deleting `smb_state`. |
| 2026-05-06 | CR-005 | Project action icons only | Complete | Replaced project action text buttons with compact icon-only rename/delete buttons, added accessible labels/titles, and preserved existing rename/delete behavior. |
| 2026-05-06 | CR-006 | Custom delete modal and Google Drive deletion | Complete | Replaced browser confirm with an in-app delete modal, added Drive folder trashing via PATCH, preserved local state on Drive deletion failure, and removes the project locally only after Drive trash succeeds. |
| 2026-05-06 | CR-007 | Duplicate project name handling | Complete | Added local and Drive-aware unique project naming for create/rename flows so duplicate names automatically become unique names like `Project Name (2)` while app and Drive names stay aligned. |
| 2026-05-06 | CR-008 | Custom rename project modal | Complete | Replaced browser prompt rename flow with an in-app rename modal that preserves Drive rename, duplicate-name handling, loading state, cancel behavior, and error display. |
| 2026-05-06 | CR-009 | Plan one-document tab architecture | Complete | Recorded the master Google Docs template ID, all 12 stable task tab IDs, and split implementation into CR-010 through CR-013 without changing application code. |
| 2026-05-07 | CR-010 | Copy one master template per project | Complete | New project creation now copies the master Google Doc once, names it after the final unique project name, stores `projectDocId`, and keeps all 12 checklist task records without per-task copied doc IDs. |
| 2026-05-07 | CR-011 | Open exact task tab per task | Complete | Added all 12 stable task tab IDs, updated Google Docs URL helpers to include `tab=...`, and routed one-doc projects through `projectDocId` plus selected task `tabId` while preserving per-task `docId` fallback. |
| 2026-05-07 | CR-012 | Legacy 12-doc project compatibility | Complete | Added centralized document-reference selection so one-doc projects use `projectDocId` + `tabId`, old projects fall back to per-task `docId`, and recovery copy distinguishes missing project docs from missing legacy task docs. |
| 2026-05-07 | CR-013 | Cleanup old 12-template system | Complete | Removed stale per-task template IDs and unused old template helpers, made the remaining Drive copy helper explicitly copy the master project document, and preserved legacy project viewing fallback. |
| 2026-05-07 | CR-014 | Silent Google token refresh | Complete | Added promise-based Google token requests, silent `prompt: ''` refresh before Drive create/rename/delete, startup silent refresh for remembered expired access tokens, and reconnect guidance only when silent refresh fails. |

## Next Task

No pending planned change request remains. Use `docs/CHANGE_REQUESTS.md` for future small edits.

Recommended next prompt:

```text
Read the planning docs and docs/CHANGE_REQUESTS.md. Add or complete the next requested change only. Do not start unrelated changes.
```
