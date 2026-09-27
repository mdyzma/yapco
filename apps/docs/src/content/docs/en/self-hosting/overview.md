---
title: Self-hosting overview
description: The parts of a YAPCO server and the two ways to run one.
sidebar:
  order: 1
---

A YAPCO site is two small things behind one address:

1. **Static files**: the app and this documentation. There is no database; planners stay in
   each visitor's browser.
2. **The PDF export service**: renders pages in a headless Chromium and returns the PDF. It
   keeps nothing.

**Caddy** serves the files and passes PDF requests to the export service:

```text
browser ──> Caddy :8080 ──┬─ /               the app
                          ├─ /docs/*         this documentation
                          └─ /api/export/*   export service ──> Chromium
```

## Two ways to run it

| | Docker | Proxmox container |
| --- | --- | --- |
| For | Any computer or server with Docker | A Proxmox host |
| You install | Only Docker | Nothing by hand: one script installs Node.js, Chromium and Caddy |
| Updates | `git pull` and rebuild the image | The script again, or Jenkins on every commit |
| Guide | [Run with Docker](/docs/en/self-hosting/docker/) | [Install on Proxmox](/docs/en/self-hosting/proxmox/) |

Both use the same Caddy configuration (`deploy/Caddyfile`) and serve the same site on port
8080, with plain HTTP.

## On your own domain

To reach the site from anywhere at `https://planner.example.com`, put a
[Cloudflare Tunnel](/docs/en/self-hosting/cloudflare-tunnel/) in front of either. No port on your
router is opened, and Cloudflare provides the certificate. Without a tunnel the site serves your
own computer or network.

## Steps

1. [Run with Docker](/docs/en/self-hosting/docker/) **or** [Install on Proxmox](/docs/en/self-hosting/proxmox/).
2. [Publish with a Cloudflare Tunnel](/docs/en/self-hosting/cloudflare-tunnel/) (optional).
3. [Automatic deploys with Gitea and Jenkins](/docs/en/self-hosting/ci-cd/) (optional, Proxmox).
4. [Updating and maintenance](/docs/en/self-hosting/updating/).

The examples use `planner.example.com`; put your own address in its place.
