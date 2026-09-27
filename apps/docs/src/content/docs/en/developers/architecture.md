---
title: How it works
description: From a template to a printed page.
sidebar:
  order: 2
---

```text
template (TS → JSON)  ──►  generator  ──►  planner document  ──►  renderer  ──►  PDF
   pages, blocks,          dates, months,     pages with sides,     React in mm,     Chrome
   modules, presets        weeks, quotes      overrides, modules    print CSS        print
```

## Template

A template describes **sections** (which repeat per month, week or day), **page templates**
(layouts of blocks) and **blocks** (typed, with props validated by Zod). Polish and English live
in the same record (`{ en, pl }`). **Modules** and **presets** decide which pages print and which
wording a block uses. Templates are authored in TypeScript and compiled to `template.json`.

## Generator

The generator expands the template for a start date and length into concrete pages. It plans
the calendar (a week belongs to the month of its Monday), knows which side of a spread each page
falls on, and inserts **fillers** so that sections start on the right side and months fill whole
sheets. It also deals quotes so that none repeats within 30 days where possible.

## Planner document and overrides

A planner holds its own copy of the template plus **overrides**: JSON patches per page template
("all pages with this layout") or per page ("only this page"), per format (A4 / A5) and per
module variant. Regenerating for new dates keeps them.

## Renderer

Pages are React components laid out in real millimetres, with type in points. The same
components render the designer canvas, the preview, the printable guide and the PDF.

## PDF

The export service opens a print route of the static app in headless Chrome, which prints it
to PDF: text stays vector and sizes are exact. `planner-pdf` then merges the parts and imposes
them (two A5 per A4, by-hand duplex, booklet bundles).

## Storage

Planners live in the browser's IndexedDB through a repository interface; nothing is stored on a
server. A service worker caches the app for offline use.

## Decisions

The reasoning behind each choice is in the ADRs in `docs/adr/`: the flow layout with an optional
free layer, document instances and overrides, PDF via headless Chromium, localised content in
single records, home print profiles, hosting, editor commands, and modules and presets.
