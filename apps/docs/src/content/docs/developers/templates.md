---
title: Pisanie szablonu
description: Szablony to TypeScript kompilowany do JSON.
sidebar:
  order: 3
---

Każdy szablon to pakiet w `templates/`:

| Plik | Co to jest |
| --- | --- |
| `src/template.ts` | Szablon. **Edytuj ten plik.** |
| `src/dsl.ts` | Małe funkcje pomocnicze: `L`, `block`, `stack`, `row`, `railBlock`, `mmH`, `fr` |
| `template.json` | Generowany; dane, które wczytuje aplikacja. Nigdy nie edytuj ręcznie. |
| `test/` | Pilnuje aktualności `template.json`, renderuje każdy blok w A4 i A5 w obu językach |

## Klocki

```ts
import { L, block, fr, mmH, stack } from './dsl';

// Tekst w obu językach, w jednym rekordzie.
const title = L('My week', 'Mój tydzień');

// Blok: id, typ, właściwości i rozmiar w przepływie strony.
const heading = block('week-title', 'text', { text: title, variant: 'heading' }, { height: mmH(12) });

// Lista z polami wyboru, która dzieli wolne miejsce.
const todo = block('todo', 'numbered-list', { title: L('To do', 'Do zrobienia'), count: 8, marker: 'checkbox' }, { height: fr(1) });

// Treść strony: bloki od góry do dołu.
const body = stack('body', [heading, todo]);
```

- `row` stawia bloki obok siebie; `railBlock` umieszcza blok w kolumnie **zewnętrznego
  marginesu**.
- Rozmiary to `mmH(n)` (stałe milimetry), `fr(n)` (część wolnego miejsca) albo dopasowanie do
  treści.
- **Zmiany dla A5**: ten sam szablon strony, z częścią właściwości zmienioną dla A5 (mniej linii,
  krótsza lista).

## Sekcje i powtarzanie

Sekcje powtarzają się `co miesiąc`, `co tydzień` albo `codziennie` i mogą wymagać, by strona
zaczynała się po lewej lub po prawej. Generator dodaje wtedy puste strony.

## Moduły i brzmienie („Dzień po Dniu”)

Funkcje pomocnicze w `src/template.ts`:

- `needs(node, ...modules)`: węzeł drukuje się tylko z włączonymi modułami.
- `without(node, module)`: tylko gdy moduł jest wyłączony.
- `varies(node, ...variants)`: inne właściwości (np. brzmienie) zależnie od warunku modułu.

Brzmienie pasujące tylko do wariantu terapeutycznego należy do modułu `recovery`. Test renderuje
każdą stronę Balansu i nie przechodzi, jeśli pojawią się słowa o zdrowieniu lub terapii.

## Formy zależne od płci

Pisz je jako `{g:męska|żeńska}`, na przykład `L('Ready?', '{g:Gotowy|Gotowa}?')`. Drukuje się
forma dla płci planera albo *Gotowy/a*, gdy płeć nie jest ustawiona.

## Budowanie i sprawdzanie

```bash
pnpm --filter @planner/template-therapeutic-recovery build:template
pnpm --filter @planner/template-therapeutic-recovery test
```

(`@planner/template-weekly-planner` dla tygodniowego). Potem obejrzyj stronę w podglądzie
z włączonym przykładem wypełnienia, w A4 i A5, z włączonymi i wyłączonymi modułami, które jej
dotyczą. Test końcowy renderuje miesiąc każdego wariantu i formatu i nie przechodzi, gdy
drukowany tekst jest ucięty.

Każda strona „Dzień po Dniu” potrzebuje przykładu i tekstu przewodnika w `src/samples.ts`, w obu
językach.
