# Acceptance Criteria — Strategic Marketing Bootcamp

## Authentication

- User sees login screen before app.
- Login/signup happens exclusively through Google OAuth 2.0.
- OAuth requests Drive, Documents, and Gmail readonly scopes.
- OAuth token metadata is saved to localStorage.
- Expired token causes re-auth prompt without deleting app state.

## First-Time Onboarding

- If authenticated user has no saved projects, modal appears.
- Modal text says `Welcome. What is your first project name?`.
- Empty project name cannot be confirmed.
- Confirm starts Drive creation flow.
- Spinner and progress message display during creation.
- Progress message shows exact number of copied files out of 12.
- API error shows visible message and Retry button.
- Completed project opens on Task 1.

## Google Drive Creation

- Root Drive folder named `marketing-projects` is created or reused.
- Project subfolder is created with exact project name.
- 12 Google Docs are copied from master templates using Drive API copy method.
- Copied docs use exact required names.
- Copied docs are placed in the project subfolder.
- Master templates are never modified.
- Project metadata includes folder ID and all 12 doc IDs.

## Layout

- App is full viewport height.
- Body has no page scroll.
- Left sidebar is 260px.
- Right sidebar is 320px.
- Center panel fills remaining width.
- Sidebars scroll independently.
- Dark design system matches specified colors.

## Sidebar

- App name appears at top.
- `+ New Project` button is prominent and full width.
- Projects render as accordions.
- Expanded project shows 3 phases.
- Active task has gold left border.
- Completed task shows ✅.
- Incomplete unlocked task shows 🔲.
- Locked task shows 🔒 and is not clickable.
- Locked click shows tooltip.
- Task unlocks only when previous checklist is complete.

## Center Panel

- Selected task name appears above iframe.
- Selected task Google Doc embeds with URL `https://docs.google.com/document/d/[DOC_ID]/edit?embedded=true`.
- Spinner displays while iframe loads.
- Task click updates iframe.
- If iframe is blocked, `Open in Google Docs ↗` button appears.

## Right Sidebar

- Independently scrollable.
- Header renders lesson number, task name, and tagline.
- WHAT, WHY, HOW, and MISTAKES blocks render with correct border colors.
- Diagram image renders for each task.
- Diagram image fallback shows caption.
- External links open in new tab.
- Template link label appears where applicable.

## Checklist

- Every checklist item renders as a functional checkbox.
- Progress bar shows checked count out of total.
- All checked marks task complete.
- Completion shows success message.
- Next task unlocks.
- Unchecking reverts task to incomplete.
- Downstream tasks re-lock if prerequisite becomes incomplete.
- State persists to localStorage.

## Project Management

- `+ New Project` opens same onboarding flow.
- New project creates its own Drive subfolder and one copied master project Google Doc with 12 task tabs.
- All projects appear in sidebar.
- User can switch projects.
- Each project remembers last opened task.

## Edge Cases

- Closing app mid-onboarding restarts onboarding on next login if no project saved.
- Google API errors never crash app.
- Bad localStorage JSON is recovered gracefully.
- Multiple tabs sync through localStorage events.
