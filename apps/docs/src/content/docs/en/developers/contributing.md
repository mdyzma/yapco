---
title: Contributing
description: Set-up, checks and conventions for changes to YAPCO.
sidebar:
  order: 5
---

Issues and pull requests are welcome on [GitHub](https://github.com/mdyzma/yapco). For anything
larger than a fix, open an issue first so we can agree on the approach.

## Ways to help

- **Report a problem**: the template, edition, format and language; what you expected and what
  you saw; a screenshot or the page number.
- **Improve the content**: wording, translations, prompts, quotes and examples. Suggestions from
  people who use paper planners, or work in therapy, are especially welcome.
- **Fix bugs or add features**: see `docs/roadmap.md`.
- **Improve this documentation**: every page has an *Edit page* link at the bottom.

## Before a pull request

```bash
pnpm check
```

- Keep `pnpm check` green; CI runs the same.
- Add or update tests with the change (Vitest, in each package's `test/`).
- Layout and content changes: build the app and run the end-to-end tests
  (`pnpm --filter @planner/web build`, then `pnpm --filter @planner/export-node test:e2e`).
- Format with Prettier (`pnpm format`).

## Conventions

- **Commits**: short [Conventional Commits](https://www.conventionalcommits.org/) subjects, for
  example `feat(template): four contacts on the crisis plan`.
- **Two languages, always**: template texts as `L('English', 'Polski')`; app strings in
  `apps/web/messages/en.json` and `pl.json` with the same keys; this documentation in
  `apps/docs/src/content/docs/` (Polish) and `…/docs/en/` (English), with the same file names.
- **Physical units**: millimetres and points.
- **Privacy**: no analytics, no accounts, nothing that sends planner content to a server.
- **Decisions**: a change to the data model, the print pipeline or the deployment gets an ADR in
  `docs/adr/`.

## Licence

MIT. By contributing you agree that your contribution is licensed under it.
