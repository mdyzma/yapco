---
title: Repository layout
description: The apps, packages and templates of the monorepo.
sidebar:
  order: 1
---

YAPCO is a **pnpm workspace** built with **Turborepo**: TypeScript everywhere, React 19,
Next.js 16 (static export), next-intl, Zod 4, Zustand, dnd-kit, Tailwind CSS, Dexie and Vitest.

```text
yapco/
├── apps/
│   ├── web/                  Next.js app: dashboard, designer, preview, export, guide
│   ├── docs/                 This documentation (Astro Starlight), served at /docs
│   └── export-node/          PDF service and CLI (headless Chrome via playwright-core)
├── packages/
│   ├── planner-schema/       Zod schemas, types, migrations, defaults
│   ├── planner-i18n/         Translation lookup, dates, plurals, gendered wording
│   ├── planner-core/         Pagination (sides, spreads, fillers), geometry, modules
│   ├── planner-renderer/     React page rendering in millimetres, guides, print CSS
│   ├── planner-blocks/       Block registry and the built-in blocks
│   ├── planner-generator/    Calendar planning, template expansion, content dealing
│   ├── planner-content/      Content checks, CSV import and export, filters
│   ├── planner-editor/       Designer commands, edit scope, undo history
│   ├── planner-pdf/          Export plan, merging, imposition, calibration
│   └── planner-storage/      Repository interfaces, IndexedDB and in-memory stores
├── templates/
│   ├── therapeutic-recovery/ "Day by Day": TypeScript source → template.json
│   └── weekly-planner/       "Week by Week"
├── deploy/                   Caddyfile, docker/ (Dockerfile, compose.yaml), proxmox/install.sh
├── docs/                     Architecture, ADRs, operations, roadmap
└── Jenkinsfile               The self-hosted pipeline
```

## Commands

| Command | What it does |
| --- | --- |
| `pnpm dev` | The app (:3000) and the export service (:8787) in watch mode |
| `pnpm check` | Lint, typecheck, tests and build: the same as CI |
| `pnpm test` | All unit tests |
| `pnpm --filter @planner/docs dev` | This documentation on :4321 |
| `pnpm --filter @planner/web build` | The static app in `apps/web/out` |
| `pnpm --filter @planner/export-node test:e2e` | PDFs in Chrome: sizes, holes clear, no cut-off text |
| `pnpm --filter @planner/export-node pdf <planner.json>` | A PDF from the command line |

## Further reading in the repository

- `docs/architecture/system-design.md`: the whole design.
- `docs/adr/`: the decisions, from the monorepo to modules and presets.
- `docs/roadmap.md`: what is done and what comes next.
