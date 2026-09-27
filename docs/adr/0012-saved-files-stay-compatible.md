# ADR-0012: From 1.0, saved planners and templates keep working

Status: Accepted · Date: 2026-09-27

## Context
Planners live only in the browser, and their only backups are JSON files from the Export screen
("Save planner as JSON", "Save template as JSON"). Before 1.0, a change to the saved shape was
allowed to break older planners: there were few users, and a new planner was quick to make.
With 1.0 people start writing in printed planners for months, keep their JSON backups, and move
planners between browsers and self-hosted sites of different versions. Losing a planner, or its
edits, on an update is no longer acceptable.

The mechanism already exists (§4.8): every saved project and template carries `schemaVersion`,
and loading always runs forward-only migrations and then validates
(`packages/planner-schema/src/migrations`, `PROJECT_MIGRATIONS`, `TEMPLATE_MIGRATIONS`).

## Decision
- **Promise:** a planner or template saved by any 1.x version imports into every later 1.x
  version, with its pages, edits, content and settings. An older app shown a newer file says so
  ("Update the app") rather than guessing.
- **Rule:** any change to the saved shape of a project, template, document, content library or
  block props raises `schemaVersion` and adds a migration step for it, with a test. Block props
  keep their own `version` and migrations (ADR-0003).
- **Proof:** `apps/web/test/fixtures/v<version>/` keeps files exactly as a released version saved
  them; `apps/web/test/compatibility.test.ts` imports and lays out every one of them. Fixtures are
  never edited or reformatted (Prettier ignores them). Each minor release that changes what is
  saved adds a folder.
- **Browser storage** (IndexedDB) goes through the same parse and migration path as imports, so
  planners already in a browser upgrade the same way.
- **Breaking** this promise needs a 2.0 and a way to convert old files.

## Alternatives considered
- **No promise, back up and recreate:** acceptable in early development; not for a planner
  people rely on, and planners carry hand-tuned edits that a new planner would lose.
- **Versioned readers instead of migrations:** every reader would have to understand every old
  shape; migrations keep one current shape in the code.

## Consequences
+ Updates are safe for users; JSON backups stay useful for years.
+ The fixtures catch accidental breaks in CI, before a release.
− Every shape change costs a migration and a test, and the old shapes stay documented in them.
− About 1 MB of fixture files per saved-shape version in the repository.
