---
title: Troubleshooting and FAQ
description: Common problems and questions.
sidebar:
  order: 10
---

## Problems

| Problem | Fix |
| --- | --- |
| The dashboard is empty | A different address, browser or private window, or the browsing data was cleared. [Import your JSON backups](/docs/en/guides/backups/). |
| PDF export is not available | The export service is busy or down. Try again in a few minutes, or use *Print from the browser instead*. |
| Locally: "the export service isn't running" | Start with `pnpm dev` (it starts both), or run `pnpm --filter @planner/export-node dev` in a second terminal, then *Check again*. |
| Locally: `Could not start Chrome` | Install Google Chrome, or set `CHROME_PATH` to a Chrome or Chromium before `pnpm dev`. |
| Locally: `Port 3000 is in use` | The app already runs in another terminal. |
| The printout is slightly too small or large | The print dialog scales: choose *Actual size* / 100 %. Check with the calibration sheet. |
| The backs are upside down | Choose the other flip edge (long ↔ short). |
| The backs come out in the wrong order | Toggle *Backs in reverse order* in Export. |
| A page looks broken after an update | Reload with Ctrl+F5. |
| A text is cut off on a page | Shorten it, or raise the block's height in the designer. Please report it if it happens with the template's own text. |

## Questions

**Is it free?** Yes. YAPCO is open source under the MIT licence.

**Can others see my planner if I share the link?** No. The link opens an empty app; everyone's
planners stay in their own browser.

**Can I use it on a phone?** For viewing and small changes, yes. Designing and printing work best
on a computer.

**Can I change the edition later?** Yes: change the modules in the Preview's planner settings.

**Can I start mid-month?** Yes: pick any start date. The first week is complete even if it starts
in the previous month.

**Can I write my own quotes?** Yes, in **Content**, or import them from a spreadsheet (CSV).

**Is the Recovery Edition a therapy?** No. It is a paper tool to use alongside therapy or a
support group. In a crisis, contact your therapist, a helpline or emergency services.

**Where do I report a problem?** [GitHub issues](https://github.com/mdyzma/yapco/issues): the
template, edition, format and language, what you expected and what you saw.
