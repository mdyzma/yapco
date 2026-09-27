---
title: Run with Docker
description: The app, the documentation and PDF export in one container; nothing else to install.
sidebar:
  order: 2
---

The Docker image contains everything YAPCO needs: Node.js, Chromium, Caddy, the app, this
documentation and the PDF export service. Your system only needs Docker, and nothing is installed
on it besides the image.

## What you need

- **Windows or macOS**: [Docker Desktop](https://www.docker.com/products/docker-desktop/).
- **Linux**: Docker Engine with the Compose plugin.
- **Git**, to get the source, and about 5 GB of free disk space for the build.

## Start

```bash
git clone https://github.com/mdyzma/yapco.git
cd yapco
docker compose -f deploy/docker/compose.yaml up -d --build
```

The first build takes a few minutes: it installs the dependencies and builds the site inside the
image. Then open **http://localhost:8080**. This documentation is at
http://localhost:8080/docs/.

Check that it is running:

```bash
docker compose -f deploy/docker/compose.yaml ps
```

The status should say `healthy`.

## Settings

Copy `deploy/docker/.env.example` to `deploy/docker/.env` and change what you need:

| Variable | Default | Meaning |
| --- | --- | --- |
| `YAPCO_PORT` | `8080` | The port on your computer |
| `YAPCO_BIND` | `127.0.0.1` | `127.0.0.1`: only this computer can open it; `0.0.0.0`: other devices in your network too |
| `YAPCO_ORIGIN` | none | More addresses people open the site with, comma-separated |
| `BUILD_SHA` | `docker` | The version shown in the dashboard's footer |

After a change, run the `up -d` command again.

:::caution[PDF export and addresses]
The export service answers only pages opened from an address it knows: `localhost` and the
addresses in `YAPCO_ORIGIN`. If you open the site from another device as
`http://192.168.1.20:8080`, or through a tunnel as `https://planner.example.com`, add that address
to `YAPCO_ORIGIN`, or *Create PDF* will fail there.
:::

## Update

```bash
git pull
docker compose -f deploy/docker/compose.yaml up -d --build
```

## Stop and remove

```bash
docker compose -f deploy/docker/compose.yaml down
```

The container keeps no data, so stopping or removing it loses nothing: planners stay in your
browser. Keep [JSON backups](/docs/en/guides/backups/) of them as usual.

To free the disk space as well, remove the image: `docker image rm yapco:local`.

## Logs

```bash
docker compose -f deploy/docker/compose.yaml logs -f
```

## How it is built

- `deploy/docker/Dockerfile`: a build stage installs the workspace and builds the app and the
  documentation; the final image has only Node.js, Chromium, fonts, Caddy, the static files and
  the export service. It is about 1.5 GB, mostly Chromium.
- `deploy/docker/entrypoint.sh` starts the export service and Caddy; if either stops, Docker
  restarts the container.
- The container runs as an unprivileged user with a read-only file system.
- `deploy/Caddyfile` is the same as on Proxmox.

Next (optional): [publish it with a Cloudflare Tunnel](/docs/en/self-hosting/cloudflare-tunnel/).
