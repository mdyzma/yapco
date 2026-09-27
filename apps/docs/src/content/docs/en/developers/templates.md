---
title: Writing a template
description: Templates are TypeScript that compiles to JSON.
sidebar:
  order: 3
---

Each template is a package in `templates/`:

| File | What it is |
| --- | --- |
| `src/template.ts` | The template. **Edit this.** |
| `src/dsl.ts` | Small helpers: `L`, `block`, `stack`, `row`, `railBlock`, `mmH`, `fr` |
| `template.json` | Generated; the data the app loads. Never edit by hand. |
| `test/` | Keeps `template.json` in sync, renders every block in A4 and A5 in both languages |

## The building blocks

```ts
import { L, block, fr, mmH, stack } from './dsl';

// Text in both languages, in one record.
const title = L('My week', 'Mój tydzień');

// A block: id, type, props, and its size in the page's flow.
const heading = block('week-title', 'text', { text: title, variant: 'heading' }, { height: mmH(12) });

// A list with checkboxes that shares the free space.
const todo = block('todo', 'numbered-list', { title: L('To do', 'Do zrobienia'), count: 8, marker: 'checkbox' }, { height: fr(1) });

// A page body: blocks from top to bottom.
const body = stack('body', [heading, todo]);
```

- `row` puts blocks side by side; `railBlock` places a block in the **outer margin** column.
- Sizes are `mmH(n)` (fixed millimetres), `fr(n)` (a share of the free space) or fit-content.
- **A5 overrides**: the same page template, with some props changed for A5 (fewer lines, a
  shorter list).

## Sections and repetition

Sections repeat `each month`, `each week` or `each day`, and can require a page to start on a
left or right side. The generator adds blank pages where needed.

## Modules and wording ("Day by Day")

- `needs(node, ...modules)`: the node prints only with those modules on.
- `without(node, module)`: only when the module is off.
- `varies(node, ...variants)`: different props (for example wording) per module condition.

Wording that suits only the recovery edition belongs in the `recovery` module. A test renders
every Balance page and fails if recovery or therapy words appear.

## Polish gender

Write gendered Polish as `{g:masculine|feminine}`, for example
`L('Ready?', '{g:Gotowy|Gotowa}?')`. It prints for the planner's gender, or as *Gotowy/a* when
none is set.

## Build and check

```bash
pnpm --filter @planner/template-therapeutic-recovery build:template
pnpm --filter @planner/template-therapeutic-recovery test
```

(`@planner/template-weekly-planner` for the weekly one.) Then look at the page in the preview
with the example filling on, in A4 and A5, and with the modules that affect it on and off. The
end-to-end overflow check renders a month of every edition and format and fails when printed
text is cut off.

Every page of "Day by Day" needs an example and guide text in `src/samples.ts`, in both
languages.
