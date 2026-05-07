# Manual Test Report — Strategic Marketing Bootcamp

Date: 2026-05-06

## Scope

Sprint 11 manual testing and hardening for the browser-only single-file app in `public/index.html`.

## Automated/Static Checks Run

| Check | Result | Notes |
|---|---|---|
| Static app HTTP response | Pass | `http://localhost:4173` returns `200`. |
| `public/index.html` editor diagnostics | Pass | No errors found. |
| Template placeholders | Pass | No `PASTE_TASKX_TEMPLATE_FILE_ID_HERE` values remain in served app. |
| Diagram placeholders | Pass | No `PASTE_TASKX_DIAGRAM_ID` values remain in served app. |
| Local diagram assets | Pass | All 12 `/assets/diagrams/task-XX-diagram.png` files return `200`. |
| Core feature markers | Pass | Served app includes auth, Drive creation, project navigation, iframe, guidance, diagram lightbox, checklist, and storage sync code. |

## Sprint 11 Checklist

| Test | Status | Notes |
|---|---|---|
| Auth from empty localStorage | Ready for browser verification | Login gate and token-client flow are present; requires user Google account interaction. |
| Token storage | Pass by code review | `smb_auth_token` is loaded/saved with guarded parsing and expiry metadata. |
| First project creation | Ready for browser verification | Drive creation loop and onboarding UI are present; requires Google Drive authorization. |
| Drive API failure retry | Pass by code review | Drive errors show visible message and Retry button without saving a partial project. |
| All 12 docs copied | Pass by code review | `TASK_DEFINITIONS` are looped in order and each copied doc ID is stored. |
| Sidebar locking | Pass by hardening | Unlock logic now requires all previous tasks complete. |
| Checklist completion/uncompletion | Pass by hardening | Checkboxes persist to `smb_state`; completion and re-lock behavior updated. |
| Task switching iframe | Pass by code review | Iframe key and URL change with selected task doc ID. |
| Blocked iframe fallback | Pass by code review | Timeout fallback provides `Open in Google Docs ↗`. |
| Diagram image fallback | Pass by code review | Caption fallback appears only if image load fails. |
| Multiple projects | Pass by code review | New projects append to `projects` and become current. |
| Refresh persistence | Pass by code review | `loadState()`/`saveState()` normalize and persist `smb_state`. |
| Two-tab storage sync | Pass by code review | `storage` listener reloads state/auth token changes. |

## Blocking Issues Found and Fixed

### HARDEN-001 — Downstream task lock recovery

- Found during Sprint 11 code review.
- Previous implementation could mark downstream tasks incomplete while leaving their checklists fully checked, causing inconsistent `100%` progress with incomplete state after prerequisites were restored.
- Fix:
  - `isTaskUnlocked()` now requires all previous tasks to be complete.
  - Downstream checklist progress is preserved instead of cleared or force-marked incomplete.
  - Locked status still takes visual priority in the sidebar.

## Remaining Known Issues

These are legacy scaffold issues outside the active single-file app target:

- `npm run build` still fails because legacy `src` files contain JSX in `.ts` files.
- `npm start` still targets legacy generated `dist/main.js`.
- Dependency audit vulnerabilities remain in old unused server-side dependencies.

See `docs/BUGS.md`.
