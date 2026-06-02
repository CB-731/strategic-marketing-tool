# Change Requests — Strategic Marketing Bootcamp

Use this file for small edits and features after the planned sprints are complete.

## Workflow

1. Add one small change request with a clear scope.
2. Ask Copilot to complete only that change request.
3. Validate the app.
4. Update this file plus `docs/TASK_LOG.md` and `docs/CURRENT_STATUS.md`.

## Status Legend

- Pending
- In progress
- Complete
- Blocked

## CR-001 — Project actions and simplified remembered login

Status: Complete
Priority: High
Date: 2026-05-06

Problem:
- Users could create projects but could not rename or delete them.
- The left sidebar showed technical Google session details that did not help normal app use.
- Closing and reopening the app could force the login gate after the short Google access token expired.

Goal:
- Let users edit a project name.
- Let users delete a project from the app.
- Remove the visible session details panel and keep only `Sign out`.
- Remember the user's Google connection locally for up to 90 days so the app opens directly when revisited.

Scope completed:
- Added `Edit name` and `Delete` buttons to expanded project accordions.
- Project rename updates local state and attempts to rename the Google Drive project folder when a Drive folder ID exists.
- Project delete removes the project from `smb_state` only; Google Drive folder/docs are not deleted.
- Removed visible `SESSION ACTIVE`, scopes, expiry, and `Re-authenticate` controls from the sidebar.
- Added 90-day remembered-auth behavior while keeping normal Google API expiry checks for Drive operations.

Acceptance criteria:
- Expanded project shows `Edit name` and `Delete`.
- Delete confirms before removing the project from local app state.
- Delete does not delete Google Drive files.
- Rename persists the new name in the app and calls Drive folder rename when possible.
- Sidebar no longer shows session scopes, expiry, or re-authenticate controls.
- Saved auth can reopen the app without showing the login gate for up to 90 days.

Validation:
- `public/index.html` has no editor diagnostics.
- Static app returns HTTP 200 at `http://localhost:4173`.
- Project action markers are present.
- Removed session details markers are absent.

## CR-002 — Task 2 and Task 3 resource tools

Status: Complete
Priority: Medium
Date: 2026-05-06

Problem:
- Task 2 and Task 3 resource links needed the user's preferred research tools.

Goal:
- Add target-market research tools to Task 2.
- Add top-player/competitor research tools to Task 3.

Scope completed:
- Task 2 now includes Google Maps, Yelp, Facebook reviews/comments, Trustpilot, YouTube comments, Instagram comments, TikTok comments, Reddit, Quora, Google Keyword Planner, and Ubersuggest.
- Task 3 now includes Meta Ads Library, Google Ads Transparency Center, and Competitor Websites Search.
- Updated `docs/TASK_CONTENT_MATRIX.md` to match the app data.

Acceptance criteria:
- Task 2 resources show all target market research tools.
- Task 3 resources show all top player research tools.
- Resource links still open in new tabs from the existing right sidebar resource renderer.

Validation:
- `public/index.html` has no editor diagnostics.
- Static app returns HTTP 200 at `http://localhost:4173`.
- Served app contains the new Task 2 and Task 3 resource labels.

## CR-003 — Task 2 and Task 3 resource-use instructions

Status: Complete
Priority: Medium
Date: 2026-05-06

Problem:
- Task 2 and Task 3 had resource links, but the How sections did not explain exactly how to use each resource.

Goal:
- Add search prompts and what-to-look-for guidance directly into the Task 2 and Task 3 How sections.

Scope completed:
- Task 2 How now explains how to use Google Maps, Yelp, Facebook, Trustpilot, YouTube, Instagram, TikTok, Reddit, Quora, Google Keyword Planner, and Ubersuggest.
- Task 3 How now explains how to use Meta Ads Library, Google Ads Transparency Center, and Competitor Websites.

Acceptance criteria:
- Task 2 How includes search terms and research targets for each target-market tool.
- Task 3 How includes search terms and research targets for each top-player/competitor tool.
- The right sidebar still renders the guidance as normal How bullets.

Validation:
- `public/index.html` has no editor diagnostics.
- Static app returns HTTP 200 at `http://localhost:4173`.
- Served app contains all new Task 2 How markers and Task 3 How markers.

## Planned Next Change Requests

Recommended launch order:

- CR-018 — GWS graph views, visualization toolkit, and session deletion.

## CR-004 — Persistent sign-in hardening

Status: Complete
Priority: High
Date: 2026-05-06

Problem:
- Users should stay connected when they close the app and return later.
- Current remembered-auth behavior exists, but it should be tested and hardened as a dedicated change request.

Goal:
- Make returning to the app feel persistent for up to 90 days unless the user clicks `Sign out`.
- Preserve projects and state even when Google API access must refresh.

Scope:
- Review `smb_auth_token` startup behavior.
- Ensure closing/reopening the app keeps the user inside the app when a remembered connection exists.
- If Google API calls fail because the access token is expired, prompt reconnection without deleting `smb_state`.
- Keep `Sign out` as the only user-controlled disconnect action.

Scope completed:
- Confirmed startup uses remembered auth for up to 90 days via `isRememberedAuthExpired()` instead of treating the short Google access-token lifetime as app sign-out.
- Updated Drive/API auth refresh failures so they no longer clear `smb_auth_token` or force the app back to the login gate.
- Added a contextual in-app `Reconnect Google` banner that appears only when Google API access needs refreshing.
- Updated project creation and Drive folder rename flows so expired Google API access prompts reconnection while preserving `smb_state` and leaving existing projects visible.
- Kept `Sign out` as the only action that intentionally clears the remembered connection.

Do not change:
- Do not remove Google OAuth.
- Do not delete projects when auth expires.
- Do not implement delete modal or duplicate-name handling in this CR.

Acceptance criteria:
- Closing and reopening the app keeps the user inside the app when remembered auth is within 90 days.
- Clicking `Sign out` clears the remembered connection.
- Expired API access prompts reconnection but does not delete projects.
- Multi-tab auth changes still sync through `localStorage`.

Manual test:
1. Sign in and create/open a project.
2. Close the app tab.
3. Reopen `http://localhost:4173`.
4. Expected: app opens directly without the login gate if remembered auth is still valid.
5. Click `Sign out`.
6. Expected: login gate appears and project state remains saved.

Validation:
- `public/index.html` has no editor diagnostics.
- Static app returns HTTP 200 at `http://localhost:4173`.
- Auth refresh code no longer clears the remembered token on Drive API expiry paths.
- Served app includes the new `Reconnect Google` banner marker.

## CR-005 — Project action icons only

Status: Complete
Priority: Medium
Date: 2026-05-06

Problem:
- Project actions currently use visible text buttons (`Edit name`, `Delete`).
- The sidebar should stay clean and compact.

Goal:
- Replace project action text with icons only.

Scope:
- Replace text buttons with icon buttons for rename and delete.
- Suggested icons:
	- Rename: `✎`
	- Delete: `🗑`
- Add accessible labels and titles so screen readers still understand the actions.
- Keep hover/focus styles clear.

Scope completed:
- Replaced visible `Edit name` and `Delete` project action button text with icon-only buttons.
- Used `✎` for rename and `🗑` for delete.
- Added `aria-label` and `title` attributes for accessible action names.
- Tightened project action styling so icons align to the right and keep clear hover/focus states.
- Kept the existing rename/delete behavior unchanged.

Do not change:
- Do not change the actual rename/delete behavior.
- Do not add Drive deletion in this CR.
- Do not add duplicate-name handling in this CR.

Acceptance criteria:
- Expanded project cards show icon-only project actions.
- Icons have accessible labels like `Rename project` and `Delete project`.
- Sidebar no longer shows `Edit name` or `Delete` as large text action buttons.

Manual test:
1. Open a project accordion.
2. Expected: rename/delete are visible as icons only.
3. Hover each icon.
4. Expected: hover/focus state is clear.
5. Click rename icon.
6. Expected: existing rename flow starts.

Validation:
- `public/index.html` has no editor diagnostics.
- Static app returns HTTP 200 at `http://localhost:4173`.
- Served app includes `Rename project` and `Delete project` accessible labels.
- Served app no longer includes visible `Edit name` project action text.

## CR-006 — Custom delete modal and Google Drive deletion

Status: Complete
Priority: High
Date: 2026-05-06

Problem:
- Delete currently uses a browser confirmation dialog.
- Delete currently removes the project from the app only and does not delete the Google Drive folder.

Goal:
- Replace browser confirmation with an in-app confirmation modal.
- When confirmed, delete the Google Drive project folder and then remove the project from local app state.

Scope:
- Add a custom delete confirmation modal.
- Add a Drive helper for deleting/trashing the project folder.
- Recommended Drive behavior: move the folder to trash with `PATCH /drive/v3/files/{folderId}` and `{ "trashed": true }`, instead of permanent delete.
- Show loading state while deletion is running.
- If Drive deletion fails, keep the project in app state and show a readable error.
- If Drive deletion succeeds, remove the project from `smb_state`.
- If no projects remain, show onboarding/new project state.

Scope completed:
- Replaced `window.confirm()` project deletion with an in-app `DeleteProjectModal`.
- Added `trashDriveFolder()` using Drive `PATCH /files/{folderId}` with `{ "trashed": true }`.
- Delete confirmation clearly says the app project will be removed and the Google Drive folder/docs will be moved to trash.
- Added deleting/loading state and readable errors.
- Drive deletion failure keeps the project in `smb_state` and leaves the modal open with an error.
- Drive trash success removes the project from `smb_state` and switches/reopens the remaining app state normally.
- If no projects remain, existing onboarding behavior opens the new-project flow.

Do not change:
- Do not permanently delete Drive files unless explicitly requested later.
- Do not implement duplicate-name handling in this CR.

Acceptance criteria:
- Delete uses an app modal, not `window.confirm()`.
- Modal clearly says Drive folder/docs will be moved to trash.
- Cancel closes the modal without deleting anything.
- Confirm moves the Drive folder to trash and removes project from the app.
- Drive deletion failure leaves the local project intact and shows an error.

Manual test:
1. Open a project accordion.
2. Click delete icon.
3. Expected: custom modal opens.
4. Click Cancel.
5. Expected: project remains.
6. Click delete again and confirm.
7. Expected: project disappears from the app and Drive folder is trashed.

Validation:
- `public/index.html` has no editor diagnostics.
- Static app returns HTTP 200 at `http://localhost:4173`.
- Served app includes `DeleteProjectModal`, `trashDriveFolder`, and moved-to-trash copy.
- Served app no longer includes `window.confirm`.

## CR-007 — Duplicate project name handling

Status: Complete
Priority: High
Date: 2026-05-06

Problem:
- A user can create or rename a project with a name that already exists in the app or Google Drive.
- Duplicate project/folder names can confuse users.

Goal:
- Prevent confusing duplicate project names and keep the app project name aligned with Google Drive.

Scope:
- Before creating a project, check whether the same project name already exists in `smb_state`.
- Before creating the Drive folder, check whether a folder with that name already exists under `marketing-projects`.
- Recommended behavior for first version: automatically create a unique name like `Project Name (2)`, `Project Name (3)`, etc.
- Apply the same unique-name behavior when renaming a project.
- Keep the final local project name and Drive folder name the same.

Scope completed:
- Added `getUniqueProjectName()` for local duplicate project names.
- Added `getAvailableProjectFolderName()` to check both app-reserved names and existing Google Drive folders under `marketing-projects`.
- Project creation now checks existing app project names and Drive folder names before creating the project folder.
- Project creation automatically uses a unique final name such as `Project Name (2)` when needed.
- Project rename now checks other app project names and Drive folders before renaming.
- Rename ignores the current Drive folder ID so keeping the same Drive folder name is allowed.
- The final local app project name and Google Drive folder name stay aligned.

Do not change:
- Do not add a complex choice modal unless explicitly requested.
- Do not change template-copy behavior beyond using the final unique project name.

Acceptance criteria:
- Creating a project with an existing app name does not create a confusing duplicate.
- Creating a project with an existing Drive folder name uses a unique final name.
- Renaming a project to an existing app or Drive name uses a unique final name or shows a clear error.
- Final local project name matches the final Google Drive folder name.

Manual test:
1. Create a project named `Test Campaign`.
2. Try creating another project named `Test Campaign`.
3. Expected: second project gets a unique name such as `Test Campaign (2)` or shows a clear duplicate-name flow.
4. Rename a project to an existing name.
5. Expected: duplicate is handled cleanly and Drive/app names stay aligned.

Validation:
- `public/index.html` has no editor diagnostics.
- Static app returns HTTP 200 at `http://localhost:4173`.
- Served app includes `getUniqueProjectName`, `getAvailableProjectFolderName`, `Checking project name`, and duplicate-avoidance copy.

## CR-008 — Custom rename project modal

Status: Complete
Priority: Medium
Date: 2026-05-06

Problem:
- Clicking the edit icon used the browser `window.prompt()` flow.
- The rename experience should match the in-app modal style used for project creation and deletion.

Goal:
- Replace the browser prompt with a custom in-app rename modal.

Scope completed:
- Added `RenameProjectModal` with a project-name input, Cancel button, Save name button, loading state, and error display.
- Clicking the rename icon now opens the custom modal instead of `window.prompt()`.
- Existing rename behavior is preserved, including Google Drive folder rename and duplicate-name handling.
- If Google access needs refresh, the modal stays open and shows a readable error.

Acceptance criteria:
- Rename uses an app modal, not a browser prompt.
- Cancel closes the modal without changing the project.
- Save name runs the existing rename flow.
- Drive rename failure leaves the project unchanged and shows an error in the modal.

Validation:
- `public/index.html` has no editor diagnostics.
- Static app returns HTTP 200 at `http://localhost:4173`.
- Served app includes `RenameProjectModal`, `Save name`, and `Renaming...` markers.
- Served app no longer includes `window.prompt`.

## CR-009 — Plan one-document tab architecture

Status: Complete
Priority: High
Date: 2026-05-06

Problem:
- The current project creation flow creates 12 copied Google Docs per project.
- The user wants each project to have one copied Google Doc with 12 tabs, and each app task should open the matching tab in that same project document.

Goal:
- Capture the one-document tab architecture before changing `public/index.html`.
- Split the migration into safe, launchable change requests.
- Preserve the strict one-CR-at-a-time workflow.

Master template:
- Google Docs master template file ID: `1iwVp357VIfNPpaxPvrzjBWEywUz7m4OgtF6gTrNgGA0`
- The user confirmed task tab IDs stay stable after copying the Google Doc.

Task tab IDs:
- Task 1: `t.0`
- Task 2: `t.ydgz63tave8a`
- Task 3: `t.5dn56s9efkj`
- Task 4: `t.ncqn2i4w2jbv`
- Task 5: `t.3j6tv0hluq56`
- Task 6: `t.jdcyzkyk81rp`
- Task 7: `t.sxvx4a6o3gsj`
- Task 8: `t.fo749bbijzaq`
- Task 9: `t.jl8brcq4ska7`
- Task 10: `t.yscnjy3n65pl`
- Task 11: `t.fynxj2j5iaw5`
- Task 12: `t.f76a8avsf4c4`

Target architecture:
- Each new project still gets one project folder under `marketing-projects`.
- Each new project gets one copied Google Doc named after the final unique project name.
- Project state should store a project-level `projectDocId` for new projects.
- Task definitions should store the stable tab ID for each task.
- The center workspace should build Google Docs edit/embed URLs from `projectDocId` plus the selected task `tabId`.
- Existing checklist/progress/unlock behavior should remain task-based and unchanged.

Scope completed:
- Recorded the master template ID and all 12 stable task tab IDs.
- Added implementation CRs CR-010 through CR-013.
- Updated launch guidance so the migration can be completed one CR at a time.
- No application code was changed in this planning CR.

Acceptance criteria:
- The new architecture is documented with exact template and tab IDs.
- Follow-up CRs are small enough to implement and validate independently.
- No `public/index.html` behavior changes happen during this planning-only CR.

Validation:
- Documentation updated only.
- CR numbering starts at CR-009 because CR-008 already exists for the custom rename modal.

## CR-010 — Copy one master template per project

Status: Complete
Priority: High
Date: 2026-05-07

Problem:
- New project creation currently copies 12 separate task template docs.
- The new architecture needs exactly one copied master Google Doc per project.

Goal:
- Change new project creation so it copies `1iwVp357VIfNPpaxPvrzjBWEywUz7m4OgtF6gTrNgGA0` once into the project folder.
- Name the copied document after the final unique project name.
- Store the copied document ID at project level.

Scope:
- Add a master template constant for `1iwVp357VIfNPpaxPvrzjBWEywUz7m4OgtF6gTrNgGA0`.
- Update `createProjectInDrive()` to copy one master document instead of 12 task documents for new projects.
- Add `projectDocId` to new project state.
- Keep project folder creation, duplicate name handling, loading progress, auth reconnect behavior, and error handling intact.
- Keep checklist and task metadata creation intact, but do not require each task to have its own copied doc ID for new projects.

Scope completed:
- Added `MASTER_PROJECT_TEMPLATE_FILE_ID` with the master Google Docs template ID.
- Changed the project creation progress flow to track one project document copy.
- Updated `createProjectInDrive()` to create the project folder, copy the master template once, name that copied Google Doc after the final unique project name, and store the result as `projectDocId`.
- New project tasks are still created for all 12 task checklist/progress records, but they no longer require per-task copied doc IDs.
- Added `projectDocId` preservation to project normalization so existing saved projects are not broken and new project-level document references persist.
- Updated onboarding/progress copy to describe one master project document with 12 task tabs.

Do not change:
- Do not remove legacy task `docId` support in this CR.
- Do not change task tab URL routing in this CR unless needed as a safe placeholder.
- Do not delete old template IDs yet.

Acceptance criteria:
- Creating a new project creates one project folder and one copied Google Doc in Drive.
- The copied Google Doc is named after the final app/Drive project name.
- New project state includes the copied Google Doc ID as `projectDocId`.
- New project creation no longer attempts to copy 12 separate docs.
- Existing projects in `smb_state` are not broken by normalization.

Validation:
- `public/index.html` has no editor diagnostics.
- Static app returns HTTP 200 at `http://localhost:4173`.
- Served app contains `MASTER_PROJECT_TEMPLATE_FILE_ID`, `1iwVp357VIfNPpaxPvrzjBWEywUz7m4OgtF6gTrNgGA0`, and `projectDocId` markers.
- Served app no longer contains the old 12-file project creation loop markers.

## CR-011 — Open exact task tab per task

Status: Complete
Priority: High
Date: 2026-05-07

Problem:
- The app currently opens a task-specific Google Doc ID.
- The new architecture requires every task to open the same project Google Doc but on the exact matching tab.

Goal:
- Route the center Google Docs iframe and fallback button to the selected task's tab inside the project document.

Scope:
- Add a stable `tabId` to each of the 12 task definitions.
- Update Google Docs URL helpers to accept an optional tab ID and add `?tab=...` for edit URLs.
- Update `CenterWorkspace` to prefer `currentProject.projectDocId` plus selected task `tabId` for new one-doc projects.
- Ensure Task 1 opens `tab=t.0`, Task 2 opens `tab=t.ydgz63tave8a`, and so on through Task 12.
- Keep iframe loading spinner and `Open in Google Docs ↗` fallback behavior.

Scope completed:
- Added `tabId` to all 12 task definitions.
- Updated `getGoogleDocEditUrl()` to accept an optional tab ID and build query strings with `tab=...` plus `embedded=true` when needed.
- Updated `CenterWorkspace` so new one-doc projects prefer `currentProject.projectDocId` with the selected task definition's `tabId`.
- Kept the old per-task `docId` fallback path when a project does not have `projectDocId`.
- Kept the existing iframe loading spinner and `Open in Google Docs ↗` fallback behavior.

Do not change:
- Do not remove old per-task doc routing yet.
- Do not alter checklist/progress/unlock logic.
- Do not change the master Google Doc itself.

Acceptance criteria:
- Selecting each task builds a Google Docs URL for the same `projectDocId` with that task's exact `tab` value.
- The center iframe updates when switching tasks.
- The fallback open button uses the same exact tab URL.
- Old projects without `projectDocId` still have a non-broken fallback path until CR-012 completes.

Validation:
- `public/index.html` has no editor diagnostics.
- Static app returns HTTP 200 at `http://localhost:4173`.
- Served app contains all 12 configured tab IDs.
- Served app contains tab URL helper markers and project document routing markers.

## CR-012 — Legacy 12-doc project compatibility

Status: Complete
Priority: High
Date: 2026-05-07

Problem:
- Users may already have projects in `smb_state` created with the old 12-doc-per-project structure.
- A direct migration to `projectDocId` only could break old projects.

Goal:
- Keep old projects usable while new projects use the one-document tab architecture.

Scope:
- Normalize projects that may have either:
	- `projectDocId` for new one-doc projects, or
	- per-task `docId` values for old 12-doc projects.
- Update document selection helpers so they prefer `projectDocId` + task `tabId`, then fallback to per-task `docId` when `projectDocId` is missing.
- Ensure missing-document recovery copy still makes sense for both project types or shows clear copy.
- Preserve all existing project rename/delete behavior.

Scope completed:
- Confirmed project normalization preserves both project-level `projectDocId` and per-task legacy `docId` values.
- Added `getProjectDocumentReference()` to centralize document selection for both schemas.
- Document selection now prefers `projectDocId` plus task `tabId`, then falls back to the selected task's legacy `docId` when `projectDocId` is missing.
- Updated `CenterWorkspace` to use the centralized document reference helper.
- Updated recovery copy to distinguish missing one-doc project documents from missing legacy task documents.
- Existing project rename/delete behavior was left unchanged.

Do not change:
- Do not force-migrate old Drive files.
- Do not delete old task docs.
- Do not remove old template IDs until CR-013.

Acceptance criteria:
- New one-doc projects open exact tabs.
- Existing 12-doc projects still open their per-task docs.
- Normalization does not erase old task `docId` values.
- Rename and delete still work for both old and new projects.

Validation:
- `public/index.html` has no editor diagnostics.
- Static app returns HTTP 200 at `http://localhost:4173`.
- Served app contains compatibility helper markers, legacy fallback markers, and updated recovery copy markers.
- State normalization preserves old and new project document references.

## CR-013 — Cleanup old 12-template system

Status: Complete
Priority: Medium
Date: 2026-05-07

Problem:
- After the one-document architecture is validated, old 12-template creation code and constants may remain and create confusion.

Goal:
- Remove unused old template-copy code while keeping legacy project viewing support where needed.

Scope:
- Remove old 12-template copy constants only if they are no longer used for new project creation or recovery.
- Simplify project creation progress text to describe one document copy.
- Keep old project viewing fallback support from CR-012.
- Update relevant docs after cleanup.

Scope completed:
- Removed old per-task `templateFileId` values from `TASK_DEFINITIONS` because new project creation no longer uses them.
- Removed the unused old `getTaskFileName()` helper.
- Removed the unused old task-template placeholder checker.
- Replaced the generic old `copyTemplateDoc()` helper with `copyMasterProjectDoc()`, which copies only `MASTER_PROJECT_TEMPLATE_FILE_ID`.
- Renamed the project creation count constant to `PROJECT_DOCUMENT_COPY_COUNT` so progress copy describes one project document.
- Kept legacy `docId` read support and `legacyTaskDocId` fallback from CR-012 so old projects remain viewable.
- Updated relevant docs to reflect the final one-document architecture.

Do not change:
- Do not remove legacy `docId` read support if old projects still depend on it.
- Do not delete any user Drive files.
- Do not change task content, checklist logic, auth, rename, or delete behavior.

Acceptance criteria:
- New project creation code clearly uses one master template only.
- Dead 12-template copy logic is removed or documented as intentionally retained fallback.
- Old projects remain viewable.
- Documentation reflects the final architecture.

Validation:
- `public/index.html` has no editor diagnostics.
- Static app returns HTTP 200 at `http://localhost:4173`.
- Served app has no unused old-template creation markers.
- Served app retains master document copy markers and legacy view fallback markers.

## CR-014 — Silent Google token refresh

Status: Complete
Priority: High
Date: 2026-05-07

Problem:
- Google access tokens are short-lived.
- When the token expires, users may see reconnect messaging and need to retry Drive actions manually.

Goal:
- Try a silent Google token refresh before Drive actions that need a valid token.
- Keep projects visible and preserve `smb_state` when refresh is needed or fails.

Scope:
- Add promise-based Google token requests around the existing Google Identity Services token client.
- Add a helper that returns the current token when valid, otherwise requests a silent refresh with `prompt: ''`.
- Use the helper before project create, project rename, and project delete Drive operations.
- Show the existing `Reconnect Google` banner only if silent refresh fails.
- Keep `Sign out` as the only action that intentionally clears remembered auth.

Scope completed:
- Added promise-based Google token request handling with `authRequestRef`.
- Added `getValidGoogleToken()` to return a valid saved token or silently request a new token with `prompt: ''`.
- Added an automatic silent refresh attempt when the app opens with a remembered but expired Google access token.
- Project create now silently refreshes before copying the master project document and continues after refresh succeeds.
- Project rename now silently refreshes before Drive folder lookup/rename and continues after refresh succeeds.
- Project delete now silently refreshes before moving the Drive folder to trash and continues after refresh succeeds.
- If silent refresh fails, the app keeps projects visible, keeps `smb_state`, and shows reconnect guidance.

Do not change:
- Do not add a backend.
- Do not request or store Google refresh tokens in the browser.
- Do not delete projects or clear `smb_state` when refresh fails.

Acceptance criteria:
- Expired tokens trigger a silent refresh attempt before Drive project create/rename/delete.
- If silent refresh succeeds, the original Drive action continues without requiring a second click.
- If silent refresh fails, projects remain visible and the user sees reconnect guidance.
- Sign out still clears the remembered Google connection.

Validation:
- `public/index.html` has no editor diagnostics.
- Static app returns HTTP 200 at `http://localhost:4173`.
- Served app contains silent refresh helper markers.
- Served app contains Drive action refresh markers for create, rename, and delete.

## CR-015 — Dynamic Stage 2 funnel elements with synced Docs tabs

Status: Complete
Priority: High
Date: 2026-05-25

Problem:
- Stage 2 previously used fixed Tasks 6-8 once per project.
- Users need to answer the same Stage 2 strategy questions for multiple funnel elements (for example Meta Ad, Landing Page) while keeping numbering and document tabs synchronized.

Goal:
- After Task 5 completion, replace fixed Stage 2 tasks with generated per-element task triplets.
- Keep sidebar tasks and Google Docs parent/child tabs synchronized with matching order and numbering.
- Allow later reconfiguration with explicit destructive confirmation.

Scope:
- Add project-level Stage 2 state for ordered funnel elements, generated tab ownership, and task-to-tab mapping.
- Show a Stage 2 setup modal after Task 5 is complete if Stage 2 is not configured.
- Stage 2 modal supports add/edit/delete/reorder for element names, unique-name validation, and max 10 elements.
- Add reconfigure flow with destructive warning and required typed confirmation `backup`.
- Generate Stage 2 tasks from Task 6/7/8 templates for each element.
- Number generated tasks from 6 upward in element order.
- Shift downstream task numbering after generated Stage 2 block.
- Create Google Docs parent tabs using exact element names.
- Create 3 child tabs per parent with Task 6/7/8 wording and updated numbers only.
- Insert Stage 2 template content into generated child tabs.
- Remove only previously generated Stage 2 tabs/tasks on reconfigure, then rebuild.

Scope completed:
- Added dynamic task-definition building per project so Stage 2 can be generated from funnel element inputs.
- Added Stage 2 project normalization fields: `elements`, `taskTabIds`, and `generatedTabIds`.
- Added first-time Stage 2 setup modal trigger after Task 5 completion.
- Added manual `Reconfigure Stage 2` action once Task 5 is complete.
- Added Stage 2 modal validation and drag/drop plus arrow-based ordering controls.
- Added destructive reconfigure guard requiring exact text `backup`.
- Added Docs API helper layer (`docsRequest`, `docsBatchUpdate`, tab add/update/delete helpers).
- Added Stage 2 tab synchronization flow to create parent/child tab trees and persist exact task-tab mappings.
- Added downstream tab title renumbering after Stage 2 generation/reconfigure.
- Updated sidebar rendering to group generated Stage 2 tasks under each funnel element.
- Kept Task 5 unchanged and used it only as setup gate.

Do not change:
- Do not modify Task 5 content/checklist behavior.
- Do not remove legacy non-Stage-2 tasks/content.
- Do not delete non-generated user tabs during Stage 2 reconfigure.

Acceptance criteria:
- Stage 2 setup is available only after Task 5 is complete.
- Parent tab titles equal funnel element names exactly.
- Stage 2 task numbering always starts at 6 and increments by task in element order.
- Generated child tab titles keep Task 6/7/8 wording with numeric prefix updates only.
- Sidebar tasks open the exact mapped generated Docs tabs.
- Reconfigure requires typed `backup` and only removes generated Stage 2 content before rebuilding.

Validation:
- `public/index.html` has no editor diagnostics.
- Static app runs from `public/` at `http://localhost:4173`.
- Stage 2 modal markers, docs-tab helper markers, and generated Stage 2 mapping markers are present in `public/index.html`.

## CR-016 — Stage 2 popup UX refinement (input + Enter/arrow + edit/delete)

Status: Complete
Priority: Medium
Date: 2026-05-25

Problem:
- The Stage 2 setup popup UI was confusing during element entry.
- Users requested a simple input flow where pressing Enter or a small arrow button adds an element.
- Users requested per-element edit and delete icons next to each saved element.

Goal:
- Replace the row-heavy Stage 2 editor with a simpler add/edit workflow.
- Keep existing Stage 2 validation rules and submission behavior unchanged.

Scope:
- Add a top input in the Stage 2 modal for element text entry.
- Add a small arrow push button next to the input that performs the same action as Enter.
- Support keyboard Enter key for add/save from that input.
- Render saved element rows with two icon actions: edit and delete.
- Editing an element pre-fills the top input and saves through Enter/arrow.
- Keep duplicate-name, empty-name, and max-elements validation.

Scope completed:
- Added a dedicated Stage 2 input builder row with a compact arrow action button.
- Added Enter key handling to submit element add/save without clicking.
- Replaced inline row controls with icon-only element actions (`✎` edit and `🗑` delete).
- Added edit-mode behavior so clicking edit loads the element name into the input for update.
- Updated Stage 2 handlers so add/edit return success flags and only clear the draft on successful save.
- Removed obsolete drag/reorder controls from the Stage 2 popup.

Do not change:
- Do not change Stage 2 numbering and Docs sync architecture.
- Do not relax Stage 2 unique-name, empty-name, or max-elements rules.

Acceptance criteria:
- Stage 2 popup has one main input and one small arrow button beside it.
- Pressing Enter in the input performs the same add/save action as clicking the arrow button.
- Each listed element shows exactly two actions: edit and delete.
- Edit action updates the selected element through the same input.
- Existing Stage 2 submit/reconfigure flow still works.

Validation:
- `public/index.html` has no editor diagnostics.
- Local app server returns HTTP 200 at `http://localhost:4173`.
- Served source includes Stage 2 popup builder, Enter key handler, and edit/delete icon markers.

## CR-017 — GWS planned-vs-actual dashboard and analytics

Status: Complete
Priority: High
Date: 2026-05-31

Problem:
- GWS history showed raw sessions but did not compare the plan at session start with actual outcomes.
- Dashboard lacked aggregate insight metrics such as total time, pause behavior, cadence trend, and project task breakdown.

Goal:
- Show planned vs actual task comparison for each session with visible matches and gaps.
- Add summary metrics to the dashboard for performance tracking.
- Record implementation and validation progress in project docs.

Scope:
- Persist `pauseCount` and achieved-task outcomes in each GWS session.
- On session close, compute achieved checklist outcomes from checklist delta (start snapshot vs final state).
- In dashboard details, render two columns:
	- Planned tasks at start
	- Actually achieved tasks
- Mark matches and gaps visually.
- Add dashboard summary metrics:
	- Total time
	- Session count
	- Pause count
	- Project breakdown by task
	- Cadence trend (last 7 days vs previous 7 days)
- Extend CSV export fields for pause count and planned/achieved task columns.

Scope completed:
- Added session-level `pauseCount` and `achievedTasks` normalization/persistence.
- Updated pause flow to increment `pauseCount` per pause action.
- Updated session finalization to compute achieved tasks from checklist progress made during the session.
- Added planned-vs-actual comparison UI with visual indicators:
	- `✓` match
	- `✕` planned but not achieved gap
	- `+` achieved but not planned
- Added dashboard metrics cards for total time, session count, pause count, project breakdown, and cadence trend.
- Updated dashboard CSV export to include pause count and planned/achieved task fields.
- Updated `docs/CURRENT_STATUS.md`, `docs/TASK_LOG.md`, and `docs/IMPLEMENTATION_CHECKLIST.md`.

Do not change:
- Do not alter task unlocking behavior.
- Do not alter Google Docs tab sync behavior.

Acceptance criteria:
- Expanded session details show planned tasks and actually achieved tasks side by side.
- Match and gap states are visually distinct.
- Dashboard exposes total time, session count, pause count, project breakdown, and cadence trend.
- Session close captures achieved outcomes from checklist progress during that session.
- CSV export includes planned/achieved task values and pause count.

Validation:
- `public/index.html` has no editor diagnostics.
- Start/pause/resume/end handler paths persist `pauseCount` and active-session updates.
- Session close path computes checklist delta into `achievedTasks` and finalized `completedChecklistItems`.
- Dashboard comparison and summary metric markers are present in `public/index.html`.
- Note: Full browser manual validation flow (start, pause, close, reopen, finish, reflection, and click-through) remains a manual QA run.

## CR-018 — GWS graph views, visualization toolkit, and session deletion

Status: Pending
Priority: High
Date: 2026-05-31

Problem:
- The dashboard currently provides metrics but limited graph-first insight for workload and cadence quality.
- Users need stronger visualization to spot progress trends, workload imbalance, and cadence mistakes quickly.
- Users also need the ability to delete unwanted session records.

Goal:
- Add dedicated graph views for overview, workload, and cadence analysis.
- Add visual mistake indicators for work rhythm and planning consistency.
- Add safe session deletion from dashboard history.

Scope:
- Add dashboard view switcher:
	- Overview
	- Workload
	- Cadence
- Add graph components (SVG/CSS-based) for:
	- Time trend
	- Workload distribution by task
	- Planned-vs-actual patterns
	- Cadence comparison (last 7 days vs previous 7 days)
- Add date-range filters (`7d`, `30d`, `90d`, `all`) used by all views.
- Add cadence warning signals:
	- Overrun tendency
	- Interruption density
	- Irregular weekly rhythm
- Add delete-session action with confirmation.
- Keep dashboard analytics-only (no session control actions).
- Keep CSV export aligned to active filters.

Do not change:
- Do not change task unlocking behavior.
- Do not change Google Docs tab routing behavior.
- Do not move session start/pause/resume/end controls into dashboard.

Acceptance criteria:
- Dashboard exposes three analytics views: Overview, Workload, and Cadence.
- Each view includes at least one graph and one concise interpretation block.
- Date-range and task/status filters update all graphs and KPI cards consistently.
- Cadence risks and workload imbalance are visibly flagged.
- Session deletion is available in dashboard history with confirmation.
- Metrics and graphs remain consistent after session deletion.
- CSV export reflects currently filtered data.

Validation plan:
- `public/index.html` has no editor diagnostics.
- Graph rendering works for empty state, mixed-state, and high-volume session history.
- Deleting a session updates lists, KPI cards, and charts without stale data.
- Dashboard remains analytics-only and timer controls remain in timer UI.
- Manual QA run covers filter combinations and cadence warning correctness.
