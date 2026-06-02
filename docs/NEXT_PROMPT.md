# Next Prompt

Sprint 12 and CR-018 are now planned and ready for implementation. Use this prompt to execute only the launched change request:

```text
Read AI_PROJECT_CONTEXT.md and these docs: docs/SPRINTS.md, docs/TASK_LOG.md, docs/DECISIONS.md, docs/BUGS.md, docs/TASK_CONTENT_MATRIX.md, docs/IMPLEMENTATION_CHECKLIST.md, docs/CHANGE_REQUESTS.md.

Add or complete the next requested change only.

Implementation target:
- Use `public/index.html` as the single-file React app entry.

Context:
- Sprints 0–11 are complete.
- Sprint 12 is planned and focused on GWS graph views, visualization tooling, and session deletion.
- Post-sprint edits are tracked in docs/CHANGE_REQUESTS.md.
- CR-009 documented the one-document tab architecture using the provided master template ID and stable task tab IDs.
- CR-010 changed new project creation to copy one master template per project and store `projectDocId`.
- CR-011 added stable task tab IDs and routes one-doc projects through `projectDocId` plus selected task `tabId`.
- CR-012 kept legacy 12-doc projects working through per-task `docId` fallback and clearer recovery copy.
- CR-013 cleaned up old 12-template creation constants/helpers while keeping legacy per-task `docId` viewing support.
- CR-014 added silent Google token refresh before Drive create, rename, and delete operations.
- CR-018 is pending and should be treated as the active launched scope when requested.
- Sprint 11 findings are recorded in docs/MANUAL_TEST_REPORT.md.
- Known legacy scaffold issues remain documented in docs/BUGS.md and are outside the active browser-only app target unless explicitly selected for cleanup.

Do not add new product features unless explicitly requested. Complete only the launched CR.
```

## Launch prompt

```text
Read the planning docs and docs/CHANGE_REQUESTS.md. Add or complete the next requested change only. Do not start unrelated changes.
```
