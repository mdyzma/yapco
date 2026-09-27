# ADR-0011: Self-hosted only: Docker and Proxmox, Cloudflare Workers removed

Status: Accepted · Date: 2026-09-27 · Supersedes: ADR-0008

## Context
ADR-0008 planned hosting on Cloudflare: the static site on Workers Static Assets and PDFs from
Browser Run, deployed by GitHub Actions. Since v0.8.0 the production site has instead run in a
Proxmox container (Caddy, the Node export service, Chromium), deployed by Jenkins from a Gitea
mirror and published through a Cloudflare Tunnel. The Workers route was never used in production,
had a daily PDF limit on the free plan, did not serve the documentation at `/docs`, and needed
its own code (`apps/worker`), workflows and tests to stay in step. Not everyone has Proxmox, and
not everyone wants Node.js and Chrome installed on their machine.

## Decision
- **One way to serve YAPCO**: Caddy in front of static files (`apps/web/out`, `apps/docs/dist`)
  and the export service (`apps/export-node`) with Chromium. The Caddy configuration is one file,
  `deploy/Caddyfile`, shared by both deployments.
- **Two ways to run it**:
  - **Docker** (`deploy/docker/`): one image with everything, for any machine with Docker.
    Two processes (export service and Caddy) under one entrypoint; unprivileged user, read-only
    file system.
  - **Proxmox LXC** (`deploy/proxmox/install.sh`): the same parts installed directly, deployed
    by Jenkins (`Jenkinsfile`) or by hand.
- **Publishing** on a domain is left to a Cloudflare Tunnel (or any reverse proxy) in front of
  port 8080; the site itself speaks plain HTTP.
- **Removed**: `apps/worker`, the Deploy and Drift workflows, the Browser Run drift test,
  `apps/web/public/_headers` and the Cloudflare operations guide. GitHub CI keeps checking every
  push (lint, format, types, tests, build, PDF checks in Chrome).

## Alternatives considered
- **Keep Workers as a second route**: more code and documentation to maintain for a route nobody
  uses; can be restored from git history (up to v0.9.1) if needed.
- **Two containers** (Caddy and the export service apart): the export service would have to
  listen beyond loopback and trust another container; one container matches the Proxmox layout.
- **Run the Docker image on Proxmox too**: possible later; the LXC script already works and
  Docker inside LXC adds a layer.

## Consequences
+ One Caddyfile and one export service for every deployment; the Docker image can be tested
  locally exactly as it runs on a server.
+ No daily PDF limit, `/docs` everywhere, fewer dependencies (no wrangler, workerd, Cloudflare
  types).
− The site depends on the owner's hardware being up (no Cloudflare-hosted fallback).
− The Docker image is about 1.5 GB, mostly Chromium.
