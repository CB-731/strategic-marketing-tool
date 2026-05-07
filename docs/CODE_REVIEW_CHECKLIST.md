# Code Review Checklist

Use this after each sprint.

## General

- [ ] No unrelated changes.
- [ ] No invented placeholders except approved Google IDs and OAuth client ID.
- [ ] No backend added.
- [ ] No page reload navigation.
- [ ] No master template modification logic.

## State

- [ ] localStorage reads are guarded with try/catch.
- [ ] localStorage writes use the agreed state shape.
- [ ] Derived state is not duplicated unnecessarily.

## Google APIs

- [ ] OAuth scopes are exact.
- [ ] Drive requests include bearer token.
- [ ] API errors are displayed to user.
- [ ] 401/403 causes re-auth prompt.

## UI

- [ ] Dark colors match design system.
- [ ] Sidebar widths match spec.
- [ ] No body/page scroll.
- [ ] Sidebars scroll independently.
- [ ] Hover and active states are clear.

## Accessibility

- [ ] Buttons have clear labels.
- [ ] Inputs have labels or accessible names.
- [ ] Modals use dialog semantics where practical.
- [ ] External links indicate they open in new tab if possible.

## Security

- [ ] Token is not logged to console.
- [ ] API errors do not print sensitive data.
- [ ] Links use `rel="noreferrer"` when `target="_blank"`.
