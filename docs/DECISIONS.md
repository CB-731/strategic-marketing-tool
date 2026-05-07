# Decisions — Strategic Marketing Bootcamp

Record important technical decisions here so future AI sessions do not reverse them accidentally.

## Decision 1 — Browser-only SPA

Date: 2026-05-06

Decision:
Build as a browser-only single page application.

Reason:
The specification requires no backend server and all state in localStorage.

Implications:
- Google OAuth token is stored in localStorage.
- Google Drive API is called directly from browser JavaScript.
- No server-side Google API libraries are required.

## Decision 2 — Prefer Single HTML React App

Date: 2026-05-06

Decision:
Prefer a single HTML file React app for implementation.

Reason:
The user requested a complete web app and allowed single HTML or React. The required interactions are stateful and React helps manage auth state, project state, accordions, iframe loading, and checklists.

Implications:
- React can be loaded via CDN in one HTML file.
- Babel standalone may be used for development simplicity.
- If production hardening is needed later, migrate to Vite.

## Decision 3 — Static Task Content Object

Date: 2026-05-06

Decision:
All 12 task definitions, lesson content, checklists, diagram URLs, and external links must live in one static data object.

Reason:
This prevents duplicated UI logic and reduces hallucination risk.

Implications:
- Sidebar, center iframe headers, Drive copy file names, and right sidebar all read from the same task definitions.

## Decision 4 — Do Not Save Partial Failed Projects

Date: 2026-05-06

Decision:
If Drive project creation fails, do not save the project as complete in `smb_state`.

Reason:
A project without its copied project Google Doc breaks the center workspace. Checklist and navigation state should not be saved as a completed project unless the Drive project document was created successfully.

Implications:
- Show error and Retry.
- Creation can restart from the same project name.

## Decision 5 — Master Templates Are Copy Source Only

Date: 2026-05-06

Decision:
Never edit, write to, or pre-populate the master templates.

Reason:
The specification requires Drive API copy method only.

Implications:
- Use `POST /drive/v3/files/{MASTER_PROJECT_TEMPLATE_FILE_ID}/copy`.
- The copied project document is user-owned and stored in the user's project folder.

## Decision 6 — Final Implementation Target

Date: 2026-05-06

Decision:
Use `public/index.html` as the single-file React app entry point inside the existing project structure.

Reason:
The project already contains a `public/index.html` file and the product decision is to build a single HTML React app. Using the existing public entry avoids creating competing app entry points.

Implications:
- Sprint 1 should replace the current minimal `public/index.html` with the static single-file React shell.
- Future implementation should keep app code in `public/index.html` unless a later decision explicitly migrates to another structure.
- Existing `src` files are not the primary implementation target for this single-file build.

## Decision 7 — Use Google Identity Services Token Client

Date: 2026-05-06

Decision:
Use Google Identity Services `oauth2.initTokenClient()` in `public/index.html` and store token metadata under `smb_auth_token`.

Reason:
The app is browser-only and needs OAuth without a backend.

Implications:
- App renders a login screen before the workspace when no valid token exists.
- Token expiry clears only auth state, not `smb_state`.
- Future Google Drive API code should call the re-auth runtime helper on 401/403 responses.

## Decision 8 — One Project Document with Stable Task Tabs

Date: 2026-05-06

Decision:
Migrate new project creation from 12 copied Google Docs per project to one copied Google Doc per project, using the user's master template file `1iwVp357VIfNPpaxPvrzjBWEywUz7m4OgtF6gTrNgGA0` and stable Google Docs tab IDs for all 12 tasks.

Reason:
The user wants one project document inside each project folder, with each app task opening the exact corresponding tab in that same document.

Implications:
- New projects should store a project-level `projectDocId`.
- Task definitions should include stable `tabId` values.
- Google Docs URLs should be built from `projectDocId` plus the selected task tab ID.
- Old projects created with 12 task docs must remain viewable until legacy compatibility is intentionally removed.
