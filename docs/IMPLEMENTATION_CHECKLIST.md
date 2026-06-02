# Implementation Checklist — Strategic Marketing Bootcamp

## Planning

- [x] AI context file created.
- [x] Sprint plan created.
- [x] Task log created.
- [x] Decisions file created.
- [x] Bugs file created.
- [x] Task content matrix created.

## App Shell

- [x] Single page app entry exists.
- [x] Dark theme variables implemented.
- [x] Inter font loaded.
- [x] Three-panel layout implemented.
- [x] No page scroll.
- [x] Sidebars scroll independently.

## State

- [x] `smb_state` localStorage key defined.
- [x] `loadState()` implemented.
- [x] `saveState(state)` implemented.
- [x] Malformed JSON recovery implemented.
- [x] Default state shape implemented.
- [x] Current project selection implemented.
- [x] Current task selection implemented via `lastOpenedTask`.
- [x] localStorage sync via `storage` events implemented.

## Authentication

- [x] Login screen appears before app.
- [x] Google OAuth configured.
- [x] Drive scope requested.
- [x] Documents scope requested.
- [x] Gmail readonly scope requested.
- [x] OAuth token saved to localStorage.
- [x] Token expiry handled.

## Onboarding and Drive API

- [x] Onboarding modal appears if no projects exist.
- [x] Real Google Docs template file IDs configured.
- [x] `marketing-projects` folder created or found.
- [x] Project subfolder created.
- [x] 12 docs copied from templates.
- [x] Progress spinner/message shown.
- [x] API errors show message and Retry.
- [x] Successful project metadata saved.
- [x] App opens on Task 1.

## Project Navigation

- [x] New project button works.
- [x] Projects render as accordions.
- [x] Phases render correctly.
- [x] Task active state works.
- [x] Completion indicators work.
- [x] Locking logic works.
- [x] Locked task tooltip works.

## Center Panel

- [x] Task header shown.
- [x] Google Doc iframe shown.
- [x] Iframe loading spinner works.
- [x] Open in Google Docs fallback works.

## Right Sidebar

- [x] Header renders for all tasks.
- [x] WHAT block renders for all tasks.
- [x] WHY block renders for all tasks.
- [x] HOW block renders for all tasks.
- [x] MISTAKES block renders for all tasks.
- [x] Diagram image renders for all tasks.
- [x] Diagram fallback works.
- [x] External links open in new tab.
- [x] Template link labels render where applicable.

## Checklist

- [x] All checklist items render.
- [x] Checkbox state saves.
- [x] Progress bar updates.
- [x] Completion marks task complete.
- [x] Next task unlocks.
- [x] Unchecking re-locks downstream tasks.

## Edge Cases

- [x] Mid-onboarding close restarts onboarding.
- [x] Google API failure is recoverable.
- [x] No-project state is handled.
- [x] Multiple tabs sync state.
- [x] Token expiry prompts re-auth.
- [x] Corrupted localStorage does not crash app.

## GWS Dashboard Analytics

- [x] Planned tasks at session start are displayed.
- [x] Actually achieved tasks are displayed.
- [x] Planned vs actual matches and gaps are visually marked.
- [x] Total time metric is displayed.
- [x] Session count metric is displayed.
- [x] Pause count metric is displayed.
- [x] Project breakdown metric is displayed.
- [x] Cadence trend metric is displayed.
- [x] Dashboard CSV export includes planned and achieved task fields.

## GWS Validation Runbook

- [x] Code paths for start, pause, resume, and finish were validated in source.
- [x] Active session resume persistence path remains intact.
- [x] Start sound is configured for single playback (`loop = false`).
- [ ] Full manual browser QA pass completed for start/pause/close/reopen/finish/reflection/dashboard click-through.

## Sprint 12 — GWS Visualization Suite (Planned)

- [ ] Dashboard view switcher is implemented (`Overview`, `Workload`, `Cadence`).
- [ ] Shared date-range filters (`7d`, `30d`, `90d`, `all`) drive all graph views.
- [ ] Overview trend graph and KPI cards are implemented.
- [ ] Workload distribution graph by task is implemented.
- [ ] Planned-vs-actual workload comparison graph is implemented.
- [ ] Cadence comparison graph (last 7 days vs previous 7 days) is implemented.
- [ ] Cadence warning signals are implemented (overrun, interruption density, irregular rhythm).
- [ ] Session deletion with confirmation is implemented in dashboard history.
- [ ] Graph and KPI datasets remain consistent after deletion and filter changes.
- [ ] CSV export stays aligned with active filters.
- [ ] Manual QA completed for empty, mixed, and high-volume session history states.
