---
title: Updating and maintenance
description: Update the server, check it, and what to back up.
sidebar:
  order: 6
---

## Update

With Jenkins, updates are automatic: every commit on `main` that passes the checks is deployed.

By hand, run the same script again in the container:

```bash
curl -fsSL https://raw.githubusercontent.com/mdyzma/yapco/main/deploy/proxmox/install.sh | YAPCO_ORIGIN=https://planner.example.com sh
```

It pulls `main`, rebuilds the app and the documentation, and restarts the services. Open copies
of the app switch to the new version on their next visit.

## Check it

| Check | Command |
| --- | --- |
| Export service | `curl -s http://127.0.0.1:8787/api/export/health` → `{"ok":true}` |
| Site through Caddy | `curl -sI http://127.0.0.1:8080/pl` → `200` |
| Documentation | `curl -sI http://127.0.0.1:8080/docs/` → `200` |
| Deployed version | the dashboard's footer: *Build 1a2b3c4* |
| Logs | `journalctl -u yapco-export -n 50`, `journalctl -u caddy -n 50` |

## Backups

The container holds **no user data**: planners live only in each visitor's browser. A normal
Proxmox backup is useful, but rebuilding from [Install on Proxmox](/docs/en/self-hosting/proxmox/)
gives exactly the same result.

Users should keep their own [JSON backups](/docs/en/guides/backups/).

## Load

Several people making PDFs at the same time share the container's CPU. One six-month planner
takes about a minute with 2 cores.

## Common problems

| Problem | Fix |
| --- | --- |
| `403` from Caddy after a fresh install on Debian 13 | Home folders are private there; the script runs `chmod 755 /opt/yapco`. Run it again. |
| PDFs fail only on the public address | `YAPCO_ORIGIN` is missing or different; run the script with the right address. |
| Build killed or very slow | Less than 4 GB of memory; raise it in Proxmox. |
| Jenkins: `No space left on device` | Resize its disk: `pct resize <id> rootfs +10G` on the node. |
