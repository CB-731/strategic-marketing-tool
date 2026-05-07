# Project Plan — Strategic Marketing Bootcamp

This project is organized using the following system:

```text
Specification → Architecture → Milestones → Sprints → Tasks → Acceptance Criteria → Task Log
```

## Source Of Truth Files

- `AI_PROJECT_CONTEXT.md` — main AI context and product rules.
- `PROJECT_PLAN.md` — high-level organization method.
- `docs/SPRINTS.md` — exact sprint/task breakdown.
- `docs/TASK_LOG.md` — completed work log.
- `docs/DECISIONS.md` — architectural decisions.
- `docs/BUGS.md` — bugs and edge cases.
- `docs/TASK_CONTENT_MATRIX.md` — task names, template placeholders, checklist items, links, diagrams.
- `docs/IMPLEMENTATION_CHECKLIST.md` — complete build checklist.
- `docs/LLM_WORKFLOW.md` — how to prompt future AI sessions.
- `docs/NEXT_PROMPT.md` — next safe implementation prompt.

## Method

### 1. Never Build Everything At Once

Large apps cause context drift. This project must be built one sprint at a time.

### 2. Every Sprint Has A Goal

A sprint is a focused feature area, for example:

- Static app shell.
- Auth.
- Local storage.
- Drive onboarding.
- Sidebar navigation.
- Iframe viewer.
- Guidance panel.
- Checklist logic.

### 3. Every Task Has Acceptance Criteria

A task is not complete unless its acceptance criteria pass.

### 4. Update Memory After Work

After each task:

- Update `docs/TASK_LOG.md`.
- Update `docs/SPRINTS.md` task status if needed.
- Record new decisions in `docs/DECISIONS.md`.
- Record issues in `docs/BUGS.md`.

## Milestones

## Milestone 1 — Foundation

Includes:

- Planning docs.
- Static app shell.
- Design system.
- Static task data.

Related sprints:

- Sprint 0
- Sprint 1
- Sprint 2

## Milestone 2 — State and Auth

Includes:

- localStorage state model.
- Google OAuth.
- Token persistence.
- Token expiry handling.

Related sprints:

- Sprint 3
- Sprint 4

## Milestone 3 — Project Creation

Includes:

- Onboarding modal.
- Drive folder creation.
- Template doc copying.
- Project metadata persistence.
- Creation loading and retry.

Related sprint:

- Sprint 5

## Milestone 4 — Core App UX

Includes:

- Project accordion.
- Phase navigation.
- Locked/unlocked tasks.
- Active task state.
- Center Google Doc iframe.
- Right guidance panel.

Related sprints:

- Sprint 6
- Sprint 7
- Sprint 8

## Milestone 5 — Completion System

Includes:

- Checklist state.
- Progress bar.
- Task completion.
- Unlock next task.
- Re-lock downstream tasks.

Related sprint:

- Sprint 9

## Milestone 6 — Polish and Hardening

Includes:

- Multiple projects.
- Multi-tab sync.
- Token expiry recovery.
- Diagram fallback.
- Iframe fallback.
- Final manual testing.

Related sprints:

- Sprint 10
- Sprint 11

## Current Status

Planning complete. Implementation has not started in this planning flow.

## Next Step

Start Sprint 1 using `docs/NEXT_PROMPT.md`.
