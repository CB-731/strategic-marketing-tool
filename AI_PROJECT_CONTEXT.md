# AI Project Context — Strategic Marketing Bootcamp

This file is the source of truth for future AI work. Read it before making code changes.

## Product

Build a browser-only single page application called **Strategic Marketing Bootcamp**.

The app helps users create marketing bootcamp projects. Each project creates a Google Drive folder, copies 12 Google Docs master templates, then guides the user task-by-task through a 12 lesson marketing workflow.

## Implementation Decision

Use a **single HTML file React app** unless explicitly changed later.

Reason:
- Browser-only requirement.
- No backend server.
- OAuth token stored in `localStorage`.
- Google Drive API called directly from the browser.
- React makes stateful panels, accordions, iframe loading, and checklists easier.

Primary app file target:

- `public/index.html` as the single-file React app entry inside the existing project structure.

## Hard Rules

- No backend.
- No page reloads.
- Use Google OAuth 2.0 only.
- Store OAuth token in `localStorage`.
- Store all app state in `localStorage`.
- Copy Google Docs with Drive API `files.copy`.
- Never modify the master templates.
- Do not hardcode Google Doc body content into created docs.
- The only intentional code placeholders are:
  - Google OAuth client ID.
  - `PASTE_TASKX_TEMPLATE_FILE_ID_HERE` values.
  - `PASTE_TASKX_DIAGRAM_ID` values.
- Every checklist item must be functional.
- Every right sidebar lesson must come from static task data in the app.
- External links open in a new tab.

## Required Google OAuth Scopes

```text
https://www.googleapis.com/auth/drive
https://www.googleapis.com/auth/documents
https://www.googleapis.com/auth/gmail.readonly
```

## Required Local Storage Shape

Use one top-level app state key, for example:

```json
{
  "projects": [
    {
      "id": "uuid",
      "name": "Project Name",
      "folderId": "google-drive-folder-id",
      "lastOpenedTask": 1,
      "tasks": [
        {
          "taskId": 1,
          "docId": "google-doc-id",
          "completed": false,
          "checklist": [false, false, false, false, false]
        }
      ]
    }
  ],
  "currentProjectId": "uuid"
}
```

Recommended keys:

- `smb_auth_token`
- `smb_state`
- `smb_onboarding_draft` only if needed for temporary creation recovery

## Core Data Model

### Project

```ts
type Project = {
  id: string;
  name: string;
  folderId: string;
  lastOpenedTask: number;
  tasks: ProjectTask[];
};
```

### ProjectTask

```ts
type ProjectTask = {
  taskId: number;
  docId: string;
  completed: boolean;
  checklist: boolean[];
};
```

### Static Task Data

Each task must include:

```ts
type TaskDefinition = {
  taskId: number;
  phase: 1 | 2 | 3;
  phaseName: string;
  shortTitle: string;
  fullDocTitle: string;
  templateFileId: string;
  lessonNumber: string;
  tagline: string;
  what: string[];
  why: string;
  how: string[];
  mistakes: string[];
  diagram: {
    src: string;
    caption: string;
  };
  templateLink?: string;
  externalLinks?: { label: string; url: string }[];
  checklist: string[];
};
```

## Main User Flow

1. User lands on login screen.
2. User clicks **Continue with Google**.
3. App requests required OAuth scopes.
4. Token is saved to `localStorage`.
5. App checks localStorage state.
6. If no projects exist, show onboarding modal.
7. User enters first project name.
8. App creates or uses Drive root folder named `marketing-projects`.
9. App creates project subfolder using the exact project name.
10. App copies 12 master Google Docs into that folder using Drive API copy method.
11. App saves project metadata and doc IDs.
12. App opens main interface on Task 1.

## Google Drive API Calls

### Create Folder

```http
POST https://www.googleapis.com/drive/v3/files
Authorization: Bearer ACCESS_TOKEN
Content-Type: application/json

{
  "name": "marketing-projects",
  "mimeType": "application/vnd.google-apps.folder",
  "parents": ["root"]
}
```

For project subfolder, parent is the `marketing-projects` folder ID.

### Copy Template Document

```http
POST https://www.googleapis.com/drive/v3/files/{templateFileId}/copy
Authorization: Bearer ACCESS_TOKEN
Content-Type: application/json

{
  "name": "[ProjectName] Phase X - Task Y: Task Name",
  "parents": ["user-project-folder-id"]
}
```

## Project Creation UI Requirements

During project creation show:

```text
Creating your project... (3/12 files created)
```

Also show a spinner.

On API error:
- Stop creation loading state.
- Show visible error message.
- Show Retry button.
- Do not save incomplete project metadata as a completed project.

If the user closes the app mid-onboarding:
- On next login, if no saved project exists, restart onboarding.

## Layout

Three-panel layout. Full viewport height. No page scroll.

- Left sidebar: `260px` wide.
- Center panel: flexible.
- Right sidebar: `320px` wide.

Sidebars may scroll independently. Body/page must not scroll.

## Design System

Colors:

- Background: `#0f0f0f`
- Left sidebar: `#141414`
- Right sidebar: `#141414`
- Center panel: `#1a1a1a`
- Card background: `#1e1e1e`
- Accent gold: `#d4a843`
- Text primary: `#f0f0f0`
- Text secondary: `#9a9a9a`
- Success green: `#4caf50`
- Border: `#2a2a2a`

Content block borders:

- WHAT: `#d4a843`
- WHY: `#8bc34a`
- HOW: `#2196f3`
- MISTAKES: `#f44336`

Typography:

- Font: Inter or system-ui.
- Phase labels: 10px uppercase tracked.
- Sidebar task names: 13px medium.
- Right sidebar headers: 16px bold.
- Right sidebar body: 13px, line-height 1.6.

## Navigation Rules

- Projects render as accordion items.
- Expanded project shows 3 phases.
- Task 1 is always unlocked.
- Task N unlocks only when Task N-1 checklist is 100% complete.
- Active task has 3px gold left border.
- Completed tasks show ✅.
- Locked tasks show 🔒, are 40% opacity, cursor not-allowed.
- Clicking locked task shows tooltip: `Complete the previous task first`.
- If user unchecks a completed task, mark it incomplete and re-lock later tasks as needed.

## Center Panel Rules

- Show selected task name as header.
- Embed selected Google Doc:

```text
https://docs.google.com/document/d/[DOC_ID]/edit?embedded=true
```

- Show loading spinner while iframe loads.
- If iframe appears blocked or does not load after timeout, show fallback button:

```text
Open in Google Docs ↗
```

## Right Sidebar Rules

Each task renders:

1. Header: lesson number, task name, italic tagline.
2. Lesson content: WHAT, WHY, HOW, MISTAKES TO AVOID.
3. Diagram and resources: image, caption, links, optional template link.
4. Completion checklist: checkbox list, progress bar, success message.

## Edge Cases

- No projects: show onboarding modal immediately after login.
- Drive API fails: visible error and retry button.
- Token expiry: prompt re-auth without deleting app state.
- Multiple tabs: `localStorage` is source of truth; listen for `storage` events.
- Iframe blocked: show Google Docs fallback link.
- Diagram image fails: show caption text fallback.

## Build Order

Always follow [docs/SPRINTS.md](docs/SPRINTS.md). Complete one sprint or one task at a time. Do not skip ahead unless explicitly requested.
