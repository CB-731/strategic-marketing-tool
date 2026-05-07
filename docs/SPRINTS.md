# Sprint Plan — Strategic Marketing Bootcamp

Use this file to build the app step by step. Complete only the current sprint unless instructed otherwise.

## Sprint 0 — Planning Files

Status: Complete

Goal: Create a stable project memory system so future implementation does not drift.

Tasks:

- [x] Create `AI_PROJECT_CONTEXT.md`.
- [x] Create `docs/SPRINTS.md`.
- [x] Create `docs/TASK_LOG.md`.
- [x] Create `docs/DECISIONS.md`.
- [x] Create `docs/BUGS.md`.
- [x] Create `docs/TASK_CONTENT_MATRIX.md`.
- [x] Confirm final implementation target: `public/index.html` as the single-file React app entry inside the existing project structure.

Definition of done:

- Planning files exist.
- Future AI sessions can read project context before coding.

---

## Sprint 1 — Static App Shell

Status: Complete

Goal: Build the visual foundation without auth or Google APIs.

Tasks:

### Task 1.1 — Create single-file app shell

Objective: Create the browser app entry point.

Files touched:
- `index.html` or `public/index.html`

Implementation steps:
1. Load Inter font.
2. Load React and ReactDOM via CDN if using single HTML React.
3. Create root app container.
4. Add global CSS reset and dark theme variables.

Acceptance criteria:
- App renders in browser.
- No build step required if using root `index.html`.
- No console errors.

### Task 1.2 — Build three-panel layout

Objective: Implement fixed full-height layout.

Files touched:
- `index.html` or app CSS file

Implementation steps:
1. Body and root height are `100vh`.
2. App shell uses grid columns: `260px minmax(0, 1fr) 320px`.
3. Left and right sidebars use `#141414`.
4. Center uses `#1a1a1a`.
5. Body has no page scroll.
6. Sidebars have independent scroll areas.

Acceptance criteria:
- Left sidebar is 260px.
- Right sidebar is 320px.
- Center fills remaining space.
- No page scroll.

### Task 1.3 — Static placeholders

Objective: Render non-functional layout placeholders.

Implementation steps:
1. Left sidebar shows app name and `+ New Project` button.
2. Center shows placeholder for selected doc/task.
3. Right sidebar shows placeholder for task guidance.

Acceptance criteria:
- Visual shell matches design system.

---

## Sprint 2 — Static Task Data

Status: Complete

Goal: Hardcode all 12 task definitions before building behavior.

Tasks:

### Task 2.1 — Create task definitions object

Objective: Build one canonical static data object for all tasks.

Implementation steps:
1. Add 12 task objects.
2. Add phase, phase name, title, file name pattern, template ID placeholder.
3. Add lesson number, tagline, WHAT, WHY, HOW, mistakes.
4. Add diagram src and caption.
5. Add external links and optional template link.
6. Add checklist items.

Acceptance criteria:
- All 12 tasks exist.
- No task content is missing.
- Template IDs remain `PASTE_TASKX_TEMPLATE_FILE_ID_HERE`.
- Diagram IDs remain `PASTE_TASKX_DIAGRAM_ID`.

### Task 2.2 — Create helper functions

Objective: Derive filenames, phases, and checklist defaults from task data.

Implementation steps:
1. Add `getTaskDefinition(taskId)`.
2. Add `getTaskFileName(projectName, task)`.
3. Add `createDefaultProjectTask(taskId, docId)`.
4. Add `isTaskComplete(task)`.
5. Add `isTaskUnlocked(project, taskId)`.

Acceptance criteria:
- Helpers are pure functions.
- No DOM access inside helpers.

---

## Sprint 3 — Local Storage State

Status: Complete

Goal: Implement all local app state without Google APIs.

Tasks:

### Task 3.1 — State persistence layer

Objective: Save and load app state from `localStorage`.

Implementation steps:
1. Define `smb_state` key.
2. Implement `loadState()`.
3. Implement `saveState(state)`.
4. Add malformed JSON recovery.
5. Add default state `{ projects: [], currentProjectId: null }`.

Acceptance criteria:
- App survives refresh.
- Bad localStorage data does not crash app.

### Task 3.2 — Project and task selection

Objective: Track current project and selected task.

Implementation steps:
1. Use `currentProjectId` from state.
2. Use project `lastOpenedTask`.
3. On task click, update `lastOpenedTask`.
4. Persist immediately.

Acceptance criteria:
- Last opened task persists after refresh.

### Task 3.3 — Multi-tab sync

Objective: Treat localStorage as source of truth.

Implementation steps:
1. Add `window.addEventListener('storage', ...)`.
2. Reload app state when `smb_state` changes.

Acceptance criteria:
- Two tabs stay broadly synchronized.

---

## Sprint 4 — Google OAuth

Status: Complete

Goal: Add authentication gate before the app loads.

Tasks:

### Task 4.1 — Login screen

Objective: Show clean login screen before auth.

Implementation steps:
1. Render app name.
2. Render `Continue with Google` button.
3. Do not render app shell until token exists.

Acceptance criteria:
- Unauthenticated user sees only login screen.

### Task 4.2 — Google Identity Services OAuth

Objective: Request Google token from browser.

Implementation steps:
1. Load Google Identity Services script.
2. Use token client flow.
3. Request scopes:
   - Drive
   - Documents
   - Gmail readonly
4. Store token metadata in `localStorage` under `smb_auth_token`.

Acceptance criteria:
- Token is saved after login.
- App opens after successful login.

### Task 4.3 — Token expiry handling

Objective: Gracefully prompt re-auth.

Implementation steps:
1. Store `issued_at` and `expires_in`.
2. Check expiry on app startup and API failure 401/403.
3. Show re-auth prompt without deleting `smb_state`.

Acceptance criteria:
- Expired token does not destroy project state.

---

## Sprint 5 — Onboarding and Drive Project Creation

Status: Complete

Goal: Create user Drive folders and copy docs.

Tasks:

### Task 5.1 — Onboarding modal

Objective: Ask for first or new project name.

Implementation steps:
1. Show when authenticated and no projects exist.
2. Also show when `+ New Project` is clicked.
3. Text: `Welcome. What is your first project name?`
4. Input and Confirm button.
5. Disable Confirm for empty input.

Acceptance criteria:
- Modal appears for first login.
- Modal appears for new project.

### Task 5.2 — Drive API wrapper

Objective: Centralize Google Drive calls.

Implementation steps:
1. Implement `driveRequest(path, options)`.
2. Add authorization header.
3. Parse JSON error messages.
4. On 401/403, trigger re-auth state.

Acceptance criteria:
- API errors become readable UI errors.

### Task 5.3 — Create folder hierarchy

Objective: Create required folders.

Implementation steps:
1. Create or find root folder `marketing-projects`.
2. Create project subfolder inside it.
3. Store project folder ID.

Acceptance criteria:
- Project folder exists in Drive under `marketing-projects`.

### Task 5.4 — Copy 12 template docs

Objective: Use Drive API copy method.

Implementation steps:
1. Loop over all 12 task definitions in order.
2. Use `POST /drive/v3/files/{templateFileId}/copy`.
3. Use correct file names.
4. Parent is user project folder ID.
5. Track copied doc ID.
6. Show progress message `(N/12 files created)`.

Acceptance criteria:
- 12 docs are copied.
- Master templates are not modified.
- Progress updates after each copy.

### Task 5.5 — Save completed project metadata

Objective: Persist only successful projects.

Implementation steps:
1. Create project UUID.
2. Store name, folderId, `lastOpenedTask: 1`.
3. Store 12 tasks with doc IDs and default checklists.
4. Set `currentProjectId`.
5. Open Task 1.

Acceptance criteria:
- Main app opens on Task 1 after creation.
- Refresh keeps the project.

### Task 5.6 — Retry on error

Objective: Recover from Drive API failure.

Implementation steps:
1. Show visible error message.
2. Show Retry button.
3. Retry starts creation again from current project name.
4. Do not save partial project as complete.

Acceptance criteria:
- Failed creation is recoverable.

---

## Sprint 6 — Left Sidebar Navigation

Status: Complete

Goal: Implement projects, phases, task locking, and completion indicators.

Tasks:

### Task 6.1 — Project accordion

Implementation steps:
1. Render all projects.
2. Project header expands/collapses.
3. Current project expands by default.
4. Clicking project sets `currentProjectId`.

Acceptance criteria:
- User can switch projects.

### Task 6.2 — Phase groups

Implementation steps:
1. Render Phase 1, Phase 2, Phase 3.
2. Use uppercase tracked phase labels.
3. Render tasks under correct phase.

Acceptance criteria:
- All 12 tasks appear under correct phase.

### Task 6.3 — Lock/unlock logic

Implementation steps:
1. Task 1 unlocked.
2. Task N unlocked when Task N-1 is complete.
3. Locked task is greyed out and not clickable.
4. Locked click shows tooltip.

Acceptance criteria:
- User cannot open locked tasks.

### Task 6.4 — Active and completed styling

Implementation steps:
1. Active task has gold left border.
2. Completed task shows ✅.
3. Incomplete unlocked task shows 🔲.
4. Locked task shows 🔒.

Acceptance criteria:
- Sidebar state accurately reflects task state.

---

## Sprint 7 — Center Google Doc Iframe

Status: Complete

Goal: Display selected task document.

Tasks:

### Task 7.1 — Iframe viewer

Implementation steps:
1. Get current task doc ID.
2. Build URL `https://docs.google.com/document/d/[DOC_ID]/edit?embedded=true`.
3. Render iframe.
4. Change iframe when task changes.

Acceptance criteria:
- Selected task doc appears in center panel.

### Task 7.2 — Iframe loading state

Implementation steps:
1. Show spinner before iframe loads.
2. Hide spinner on iframe `load`.
3. Reset loading state when selected task changes.

Acceptance criteria:
- Spinner appears on task switch.

### Task 7.3 — Blocked iframe fallback

Implementation steps:
1. Start timeout when iframe loads.
2. If load does not complete in reasonable time, show fallback.
3. Fallback button opens docs URL in new tab.

Acceptance criteria:
- User can always open Google Doc.

---

## Sprint 8 — Right Sidebar Guidance

Status: Complete

Goal: Render hardcoded lesson guidance for selected task.

Tasks:

### Task 8.1 — Task header

Implementation steps:
1. Render lesson number.
2. Render task name.
3. Render italic tagline.

Acceptance criteria:
- Header changes with selected task.

### Task 8.2 — Content blocks

Implementation steps:
1. Render WHAT block with gold border.
2. Render WHY block with green border.
3. Render HOW block with blue border.
4. Render MISTAKES block with red border.

Acceptance criteria:
- All blocks display correct content for all 12 tasks.

### Task 8.3 — Diagram and resources

Implementation steps:
1. Render diagram image.
2. If image fails, show caption fallback.
3. Render caption.
4. Render template link when present.
5. Render external links in new tabs.

Acceptance criteria:
- Diagrams and links render per task.

---

## Sprint 9 — Checklist and Progress Logic

Status: Complete

Goal: Make task completion functional.

Tasks:

### Task 9.1 — Checklist UI

Implementation steps:
1. Render task-specific checklist.
2. Use custom styled checkboxes.
3. Persist checkbox state immediately.

Acceptance criteria:
- Checkbox states survive refresh.

### Task 9.2 — Progress bar

Implementation steps:
1. Count checked items.
2. Show `X/Total` checked.
3. Fill gold progress bar.

Acceptance criteria:
- Progress updates instantly.

### Task 9.3 — Completion and unlocking

Implementation steps:
1. If all boxes checked, mark task complete.
2. Show `Task complete! Next task unlocked.`.
3. Unlock next task.
4. If any box unchecked, mark task incomplete.
5. Re-lock downstream tasks if prerequisites fail.

Acceptance criteria:
- Completion state and locks are correct.

---

## Sprint 10 — Project Management Polish

Status: Complete

Goal: Support multiple projects and clean recovery.

Tasks:

### Task 10.1 — New project flow

Implementation steps:
1. `+ New Project` opens onboarding modal.
2. New project creates folder and 12 docs.
3. New project is added to existing projects.
4. Set new project as current.

Acceptance criteria:
- Multiple projects are supported.

### Task 10.2 — App recovery states

Implementation steps:
1. If no projects, show onboarding.
2. If project exists but selected ID invalid, select first project.
3. If task doc ID missing, show readable error.

Acceptance criteria:
- App does not crash on corrupted partial state.

### Task 10.3 — Final UI polish

Implementation steps:
1. Thin dark scrollbars.
2. Hover transitions.
3. Responsive guard for narrow widths.
4. Button disabled/loading states.

Acceptance criteria:
- UI feels complete and stable.

---

## Sprint 11 — Manual Testing and Hardening

Status: Complete

Goal: Validate every required behavior.

Tasks:

- [x] Test auth from empty localStorage.
- [x] Test token storage.
- [x] Test first project creation.
- [x] Test Drive API failure retry.
- [x] Test all 12 docs copied.
- [x] Test sidebar locking.
- [x] Test checklist completion/uncompletion.
- [x] Test task switching iframe.
- [x] Test blocked iframe fallback.
- [x] Test diagram image fallback.
- [x] Test multiple projects.
- [x] Test refresh persistence.
- [x] Test two-tab storage sync.

Sprint 11 notes:

- Static app preview returns HTTP 200.
- No template or diagram placeholders remain in the served app.
- All 12 local diagram assets return HTTP 200.
- `public/index.html` has no editor diagnostics.
- Fixed a blocking prerequisite hardening issue so every previous task must be complete before later tasks unlock, while preserving downstream checklist data.
- Full details are recorded in `docs/MANUAL_TEST_REPORT.md`.

Definition of done:

- All manual tests pass or have documented bugs in `docs/BUGS.md`.
