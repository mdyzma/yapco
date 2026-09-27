---
title: Self-hosting overview
description: The parts of a YAPCO server and the two ways to run one.
sidebar:
  order: 1
---

A YAPCO site is two small things:

1. **Static files**: the app (`apps/web/out`) and this documentation (`apps/docs/dist`). There
   is no database; planners stay in each visitor's browser.
2. **The PDF export service** (`apps/export-node`): renders pages in a headless Chromium and
   returns the PDF. It keeps nothing.

## Two ways

| | Proxmox + Cloudflare Tunnel | Cloudflare Workers |
| --- | --- | --- |
| Runs on | Your own LXC container | Cloudflare |
| PDF creation | Chromium in the container, no daily limit | Browser Run: about 10 browser-minutes a day on the free plan |
| Documentation at `/docs` | Yes | Not yet |
| Updates | The install script, by hand or from Jenkins | GitHub Actions on every push to `main` |
| Home server down | Site down | Site still up |

This documentation describes the **Proxmox** way in detail: it is the one that serves `/docs`
and has no limit on PDFs. The Workers way is summarised in
[Cloudflare Workers](/docs/en/self-hosting/cloudflare-workers/).

## The Proxmox set-up

```text
browser ──https──> Cloudflare ──tunnel──> cloudflared ──> Caddy :8080 ──┬─ /            the app
                                                                         ├─ /docs/*      this documentation
                                                                         └─ /api/export/* ──> export service :8787 ──> Chromium
```

- **Caddy** serves the files and sends `/api/export/*` to the export service.
- **cloudflared** connects the container to Cloudflare, so no port on your router is opened.
- Optional: **Gitea** mirrors the GitHub repository and **Jenkins** tests and deploys every
  change.

## Steps

1. [Install on Proxmox](/docs/en/self-hosting/proxmox/): the container and the install script.
2. [Publish with a Cloudflare Tunnel](/docs/en/self-hosting/cloudflare-tunnel/): your own
   address with HTTPS.
3. [Automatic deploys](/docs/en/self-hosting/ci-cd/) with Gitea and Jenkins (optional).
4. [Updating and maintenance](/docs/en/self-hosting/updating/).

The examples use `planner.example.com`; put your own address in its place.
