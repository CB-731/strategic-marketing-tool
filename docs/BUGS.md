# Bugs and Known Issues — Strategic Marketing Bootcamp

Use this file to track implementation bugs and edge cases.

## Open Bugs

### BUG-001 — Current scaffold does not build

Date found: 2026-05-06

Status: Open

Details:
- `npm run build` fails with TypeScript syntax errors because JSX is written in `.ts` files.
- Affected files include `src/main.ts` and `src/pages/index.ts`.
- This is legacy scaffold code and is not the final implementation target.

Recommended fix:
- During Sprint 1, replace `public/index.html` with the agreed single-file React app shell and stop relying on the broken `src` scaffold.

### BUG-002 — Configured start command fails

Date found: 2026-05-06

Status: Open

Details:
- `npm start` runs `node dist/main.js`.
- The generated `dist/main.js` contains invalid JavaScript emitted from invalid JSX-in-`.ts` source.
- The app does not launch through the current npm start script.

Recommended fix:
- Do not use the old Node/Express scaffold for the browser-only app.
- Sprint 1 should make `public/index.html` independently loadable as the single-file app entry.

### BUG-003 — Current public entry references missing files

Date found: 2026-05-06

Status: Resolved

Details:
- `public/index.html` references `styles/main.css` and `main.js`.
- These files do not exist under `public/`.
- The current browser entry cannot render a working app.

Resolution:
- Sprint 1 replaced the broken public entry with a self-contained React shell in `public/index.html`.

### BUG-004 — Dependency audit reports high vulnerabilities

Date found: 2026-05-06

Status: Open

Details:
- `npm audit --audit-level=high` reports 8 high severity vulnerabilities through old `googleapis` dependency chain.

Recommended fix:
- Since the final app is browser-only and does not need server-side Google libraries, remove unused Node/Express/Google server dependencies in a later cleanup sprint or when replacing the scaffold.

## Edge Cases To Test

- [x] User closes app mid-onboarding: onboarding restarts on next login.
- [x] Google Drive API fails during creation: visible error + Retry button.
- [x] User has no projects: onboarding modal appears immediately after login.
- [x] Locked task clicked: tooltip says `Complete the previous task first`.
- [x] User unchecks completed task: task becomes incomplete and later tasks re-lock.
- [x] Multiple browser tabs: localStorage remains source of truth.
- [x] Token expiry: prompt re-auth without losing app state.
- [x] User closes app and returns later: saved connection opens the app without the login gate for up to 90 days unless the user signs out.
- [x] Iframe blocked: show `Open in Google Docs ↗` fallback.
- [x] Diagram image fails: show caption fallback.

Sprint 11 note:
- These edge cases were reviewed during hardening. External Google account flows still require the configured OAuth client to allow `http://localhost:4173` and require a user-authorized Google session.

## Resolved Bugs

- BUG-003 — `public/index.html` no longer references missing local assets after Sprint 1.
- HARDEN-001 — Downstream task unlock logic now requires every previous task to be complete, preserving downstream checklist data while re-locking access when prerequisites become incomplete.
- CR-001 — Project rename/delete actions, simplified auth footer, and 90-day remembered auth behavior were added after Sprint 11.
