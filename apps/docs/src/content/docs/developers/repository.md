---
title: Układ repozytorium
description: Aplikacje, pakiety i szablony monorepo.
sidebar:
  order: 1
---

YAPCO to **workspace pnpm** budowany przez **Turborepo**: wszędzie TypeScript, React 19,
Next.js 16 (eksport statyczny), next-intl, Zod 4, Zustand, dnd-kit, Tailwind CSS, Dexie i Vitest.

```text
yapco/
├── apps/
│   ├── web/                  Aplikacja Next.js: lista planerów, projektant, podgląd, eksport, przewodnik
│   ├── docs/                 Ta dokumentacja (Astro Starlight), pod /docs
│   ├── export-node/          Usługa PDF i CLI (Chrome bez okna przez playwright-core)
│   └── worker/               Worker Cloudflare: strona i PDF przez Browser Run
├── packages/
│   ├── planner-schema/       Schematy Zod, typy, migracje, wartości domyślne
│   ├── planner-i18n/         Tłumaczenia, daty, liczba mnoga, formy zależne od płci
│   ├── planner-core/         Paginacja (strony, rozkładówki, puste strony), geometria, moduły
│   ├── planner-renderer/     Renderowanie stron w React w milimetrach, prowadnice, CSS druku
│   ├── planner-blocks/       Rejestr bloków i bloki wbudowane
│   ├── planner-generator/    Kalendarz, rozwijanie szablonu, rozdawanie treści
│   ├── planner-content/      Sprawdzanie treści, import i eksport CSV, filtry
│   ├── planner-editor/       Polecenia projektanta, zakres zmian, historia cofania
│   ├── planner-pdf/          Plan eksportu, łączenie, impozycja, kalibracja
│   └── planner-storage/      Interfejsy repozytoriów, IndexedDB i pamięć
├── templates/
│   ├── therapeutic-recovery/ „Dzień po Dniu”: źródło TypeScript → template.json
│   └── weekly-planner/       „Tydzień po Tygodniu”
├── deploy/proxmox/           install.sh dla kontenera z Debianem
├── docs/                     Architektura, ADR, operacje, plan rozwoju
└── Jenkinsfile               Potok dla własnego serwera
```

## Polecenia

| Polecenie | Co robi |
| --- | --- |
| `pnpm dev` | Aplikacja (:3000) i usługa eksportu (:8787) w trybie obserwowania zmian |
| `pnpm check` | Lint, typy, testy i build: to samo co CI |
| `pnpm test` | Wszystkie testy jednostkowe |
| `pnpm --filter @planner/docs dev` | Ta dokumentacja na :4321 |
| `pnpm --filter @planner/web build` | Statyczna aplikacja w `apps/web/out` |
| `pnpm --filter @planner/export-node test:e2e` | PDF w Chrome: wymiary, wolne miejsce na otwory, brak uciętego tekstu |
| `pnpm --filter @planner/export-node pdf <planer.json>` | PDF z wiersza poleceń |

## Więcej w repozytorium

- `docs/architecture/system-design.md`: cały projekt systemu.
- `docs/adr/`: decyzje, od monorepo po moduły i warianty.
- `docs/roadmap.md`: co zrobione i co dalej.
