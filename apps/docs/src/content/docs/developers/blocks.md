---
title: Dodawanie bloku
description: Zdefiniuj typ bloku raz; projektant sam zbuduje jego panel właściwości.
sidebar:
  order: 4
---

Bloki są w `packages/planner-blocks/src/blocks/`, pogrupowane według kategorii (tekst, pisanie,
śledzenie, kalendarz, terapeutyczne). Blok definiuje się raz przez `defineBlock`:

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

Potem:

1. Dodaj go do `BUILT_IN_BLOCKS` w `packages/planner-blocks/src/index.ts`.
2. Projektant zbuduje panel właściwości z `inspector`; nie trzeba zmieniać kodu edytora.
3. Dodaj testy w `packages/planner-blocks/test/`.

## Zasady

- **Tylko milimetry i punkty**, nigdy piksele ekranu. Cienkie linie mają `0.1mm`.
- **Oba języki** dla każdej etykiety, a teksty jako `LocalizedText`.
- Tekst wpisywany przez użytkownika w blok przechodzi przez `resolveText`, więc działają
  `{{zmienne}}` i formy zależne od płci.
- Bloki z przykładem wypełnienia czytają go przez funkcje pomocnicze przykładów, więc Podgląd
  i przewodnik pokazują go szarym „pismem odręcznym”.
- Gdy zmienia się kształt właściwości, zwiększ `version` i dodaj migrację.
