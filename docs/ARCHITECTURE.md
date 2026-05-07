# Architecture — Strategic Marketing Bootcamp

## Runtime Architecture

Browser-only SPA.

```text
Google OAuth → OAuth token in localStorage
              ↓
React App State ←→ localStorage
              ↓
Google Drive API v3
              ↓
User Drive folders + copied Google Docs
```

## Target Project Document Architecture

New planned architecture for project documents:

```text
marketing-projects Drive folder
└── Project folder
    └── Project Name Google Doc
        ├── Task 1 tab:  t.0
        ├── Task 2 tab:  t.ydgz63tave8a
        ├── Task 3 tab:  t.5dn56s9efkj
        ├── Task 4 tab:  t.ncqn2i4w2jbv
        ├── Task 5 tab:  t.3j6tv0hluq56
        ├── Task 6 tab:  t.jdcyzkyk81rp
        ├── Task 7 tab:  t.sxvx4a6o3gsj
        ├── Task 8 tab:  t.fo749bbijzaq
        ├── Task 9 tab:  t.jl8brcq4ska7
        ├── Task 10 tab: t.yscnjy3n65pl
        ├── Task 11 tab: t.fynxj2j5iaw5
        └── Task 12 tab: t.f76a8avsf4c4
```

Master template file ID: `1iwVp357VIfNPpaxPvrzjBWEywUz7m4OgtF6gTrNgGA0`.

Planned state model:

- New projects store one project-level `projectDocId`.
- Task definitions store stable `tabId` values.
- Center document URLs use `projectDocId` plus the selected task `tabId`.
- Legacy projects with per-task `docId` values should remain readable during migration.

## Major Modules

Even if implemented in one HTML file, organize code mentally into these modules:

1. Constants
2. Static task data
3. localStorage helpers
4. OAuth helpers
5. Google Drive API helpers
6. Project creation service
7. App state reducer/update functions
8. Login screen component
9. Onboarding modal component
10. Left sidebar component
11. Center iframe component
12. Right guidance component
13. Checklist component
14. Error/loading components

## Component Tree

```text
Root
├── LoginScreen               when no valid token
└── AppShell                  when authenticated
    ├── LeftSidebar
    │   ├── NewProjectButton
    │   └── ProjectAccordion
    │       └── PhaseGroup
    │           └── TaskNavItem
    ├── CenterDocPanel
    │   ├── TaskHeader
    │   ├── IframeSpinner
    │   ├── GoogleDocIframe
    │   └── OpenInDocsFallback
    ├── RightGuidancePanel
    │   ├── LessonHeader
    │   ├── ContentBlock WHAT
    │   ├── ContentBlock WHY
    │   ├── ContentBlock HOW
    │   ├── ContentBlock MISTAKES
    │   ├── DiagramResources
    │   └── CompletionChecklist
    └── OnboardingModal       when creating first/new project
```

## State Ownership

Root owns:

- Auth token state.
- App state loaded from localStorage.
- Current project.
- Current task.
- Onboarding modal state.
- API loading/error state.

Sidebar receives:

- Projects.
- Current project ID.
- Current task ID.
- Task click handler.
- New project handler.

Center panel receives:

- Current project task.
- Current task definition.

Right panel receives:

- Current project task.
- Current task definition.
- Checklist change handler.

## Google API Error Strategy

Drive request wrapper should:

1. Send Authorization header.
2. Parse response JSON.
3. Throw readable errors.
4. Detect 401/403.
5. Trigger re-auth required state.
6. Preserve local app state.

## Iframe Fallback Strategy

Google Docs iframe may be blocked. Implement:

- Loading spinner on task switch.
- `onLoad` hides spinner.
- Timeout shows fallback button if iframe does not load.
- Fallback URL opens full Docs edit page in new tab.

## Downstream Lock Strategy

When checklist changes:

1. Update selected task checklist.
2. Set selected task completed = all checked.
3. For every task after the first incomplete task, keep locked by computed logic.
4. Do not need separate `locked` state in localStorage.
5. Locked state should be derived.

## Derived State Functions

Required helpers:

- `getCurrentProject(state)`
- `getCurrentTask(project)`
- `getTaskDefinition(taskId)`
- `getTaskProgress(projectTask)`
- `isProjectTaskComplete(projectTask)`
- `isTaskUnlocked(project, taskId)`
- `getGoogleDocEditUrl(docId, embedded, tabId)`
- `getProjectDocumentReference(project, projectTask, taskDefinition)`
- `copyMasterProjectDoc(token, fileName, folderId)`
