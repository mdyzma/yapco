---
title: Adding a block
description: Define a block type once; the designer builds its properties panel.
sidebar:
  order: 4
---

Blocks live in `packages/planner-blocks/src/blocks/`, grouped by category (text, writing,
tracking, calendar, therapeutic). A block is defined once with `defineBlock`:

```tsx
import { z } from 'zod';
import { defineBlock } from '../registry';

const L = (en: string, pl: string) => ({ en, pl });

const Props = z.object({
  lines: z.number().int().min(1).max(30),
});

export const notesBlock = defineBlock({
  type: 'my-notes',
  version: 1,
  label: L('Notes', 'Notatki'),
  category: 'writing',
  propsSchema: Props,
  defaults: { lines: 6 },
  inspector: [{ key: 'lines', kind: 'number', label: L('Lines', 'Linie'), min: 1, max: 30 }],
  Render: ({ props }) => (
    <div>
      {Array.from({ length: props.lines }, (_, i) => (
        <div key={i} style={{ height: '7mm', borderBottom: '0.1mm solid currentColor' }} />
      ))}
    </div>
  ),
});
```

Then:

1. Add it to `BUILT_IN_BLOCKS` in `packages/planner-blocks/src/index.ts`.
2. The designer builds the properties panel from `inspector`; no editor code needed.
3. Add tests in `packages/planner-blocks/test/`.

## Rules

- **Millimetres and points only**, never screen pixels. Hairlines are `0.1mm`.
- **Both languages** for every label, and texts as `LocalizedText`.
- Text that the user writes into the block goes through `resolveText`, so `{{variables}}` and
  gendered Polish work.
- Blocks with an example filling read it through the sample helpers, so the Preview and the
  guide show it in grey handwriting.
- Bump `version` and add a migration when the props change shape.
