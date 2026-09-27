---
title: Run it on your computer
description: Install Node.js and pnpm, clone the repository and start YAPCO locally.
sidebar:
  order: 3
---

Running YAPCO locally needs no server and no internet connection after the first install. The
app runs in your browser, and PDFs are made by your own Google Chrome.

## Requirements

- **Node.js 24** ([nodejs.org](https://nodejs.org); 22 or newer works)
- **Git**
- **Google Chrome**, for PDF export
- About 2 GB of disk space for the dependencies

## Install

```bash
git clone https://github.com/mdyzma/yapco.git
cd yapco
corepack enable
pnpm install
```

On Windows, if `corepack enable` fails with a permission error, run this in PowerShell instead:

```powershell
corepack enable --install-directory "$env:APPDATA\npm" pnpm
```

Check it worked: `pnpm --version` prints 12.x.

## Start

```bash
pnpm dev
```

Wait for `Ready` and `Export service on http://127.0.0.1:8787`, then open
**http://localhost:3000**. One command starts both the app and the PDF export service. To stop,
press **Ctrl+C**.

:::caution[Always use the same address]
Planners are stored per browser **and** per address. `http://127.0.0.1:3000`, another browser, a
private window or a hosted site each have their own, separate, empty storage. Move planners
between them with [JSON files](/docs/en/guides/backups/).
:::

## Update

With the app stopped:

```bash
git pull
pnpm install
pnpm dev
```

Your planners are not touched (they are in the browser, not in the project folder), but save
JSON backups first anyway. If a page looks wrong after updating, reload it with **Ctrl+F5**.

## This documentation, locally

```bash
pnpm --filter @planner/docs dev
```

It opens on http://localhost:4321/docs/. Under `pnpm dev` the app's *Documentation* link points
to `/docs`, which exists only on a server set up as in
[Self-hosting](/docs/en/self-hosting/overview/).

## Check everything works (optional)

```bash
pnpm check
```

Lint, types, all unit tests and the build: the same as CI. See
[Troubleshooting](/docs/en/guides/troubleshooting/) if something fails.
