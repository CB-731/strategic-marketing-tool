# LLM Workflow — How To Build Without Losing Context

Use this method for every future coding session.

## Rule 1 — Start By Reading Context

Before coding, read:

1. `AI_PROJECT_CONTEXT.md`
2. `docs/SPRINTS.md`
3. `docs/TASK_LOG.md`
4. `docs/DECISIONS.md`
5. `docs/BUGS.md`
6. `docs/TASK_CONTENT_MATRIX.md`

## Rule 2 — Work One Sprint At A Time

Never ask for the entire app in one prompt.

Good prompt:

```text
Read the project planning files. Complete Sprint 1 only. Do not start auth or Google APIs.
```

Better prompt:

```text
Read the project planning files. Complete Sprint 1 Task 1.2 only: the three-panel layout. Do not modify anything unrelated.
```

## Rule 3 — Every Task Has A Definition Of Done

A task is complete only when:

- The requested files were changed.
- The acceptance criteria pass.
- Relevant manual checks were done.
- `docs/TASK_LOG.md` is updated.
- New bugs are recorded in `docs/BUGS.md`.

## Rule 4 — Do Not Skip Foundation Work

Build order:

1. Static shell.
2. Static task data.
3. localStorage state.
4. Auth.
5. Drive onboarding.
6. Sidebar navigation.
7. Center iframe.
8. Right guidance.
9. Checklist logic.
10. Edge cases and polish.

## Rule 5 — Do Not Invent Missing Product Content

If content is missing:

- Check `docs/TASK_CONTENT_MATRIX.md`.
- Check the original user specification.
- Ask the user instead of inventing content.

Intentional placeholders are allowed only when documented. OAuth, template IDs, and diagram paths are currently configured.

## Rule 6 — Update The Project Memory

After every implementation step:

- Mark completed task in `docs/SPRINTS.md` if appropriate.
- Add an entry to `docs/TASK_LOG.md`.
- Add decisions to `docs/DECISIONS.md`.
- Add bugs to `docs/BUGS.md`.

## Recommended Next Prompt

```text
Read AI_PROJECT_CONTEXT.md and all docs planning files. Complete Sprint 1 only. Build the static single-file React app shell with the dark three-panel layout. Do not add auth, localStorage, or Google APIs yet.
```
