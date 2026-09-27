---
title: Install on Proxmox
description: Create a Debian container and install YAPCO with one script.
sidebar:
  order: 2
---

## 1. Create the container

In the Proxmox web UI, open the **Shell** of your node (not of a container). Download a Debian
template once (Debian 12 or 13 both work):

```bash
pveam update
pveam available --section system | grep debian
```

Download the name it prints (the version changes over time), for example:

```bash
pveam download local debian-13-standard_13.1-2_amd64.tar.zst
```

Create and start the container. Pick a free ID instead of `120`, and your own storage names:

```bash
pct create 120 local:vztmpl/debian-13-standard_13.1-2_amd64.tar.zst --hostname yapco --cores 2 --memory 4096 --swap 1024 --rootfs local-lvm:16 --net0 name=eth0,bridge=vmbr0,ip=dhcp --unprivileged 1 --features nesting=1 --onboot 1 --start 1
```

The same in the web UI: **Create CT** → hostname `yapco`, the Debian template, disk 16 GB,
2 cores, 4096 MB memory, DHCP, *Unprivileged* and *Nesting* on.

:::tip
Give the container a fixed address: a DHCP reservation on your router is enough. Jenkins and the
tunnel will point at it.
:::

4 GB of memory matters: building the app with less can fail.

## 2. Run the install script

Open a shell in the container as root:

```bash
pct enter 120
```

Then:

```bash
apt-get update && apt-get install -y curl
curl -fsSL https://raw.githubusercontent.com/mdyzma/yapco/main/deploy/proxmox/install.sh | YAPCO_ORIGIN=https://planner.example.com sh
```

It takes a few minutes and:

1. installs Node.js 24, Chromium and Caddy;
2. creates the user `yapco` and clones the repository into `/opt/yapco/app`;
3. installs the dependencies and builds the app and this documentation;
4. starts **yapco-export** (systemd), the PDF service on `127.0.0.1:8787`;
5. starts **Caddy** on port 8080: the app, `/docs`, and `/api/export/*`, with strict security
   headers;
6. checks everything and ends with `Done. Serving …`.

## Settings

| Variable | Meaning | Default |
| --- | --- | --- |
| `YAPCO_ORIGIN` | Your public address; the PDF service accepts pages only from it and from the LAN address | none (LAN only) |
| `YAPCO_REPO` | Where to clone from, e.g. your Gitea mirror | GitHub |
| `YAPCO_BRANCH` | The branch | `main` |
| `YAPCO_COMMIT` | Deploy exactly this commit | the latest on the branch |

Keep your real address out of the repository: pass it as `YAPCO_ORIGIN` when you run the
script, or keep it in Jenkins (see [Automatic deploys](/docs/en/self-hosting/ci-cd/)).

## Check it

From any computer in your LAN, open `http://<container address>:8080`. Create a planner and make
a PDF of one month; open `http://<container address>:8080/docs/` for this documentation.

If a check fails:

```bash
journalctl -u yapco-export -n 50
journalctl -u caddy -n 50
```

Next: [publish it with a Cloudflare Tunnel](/docs/en/self-hosting/cloudflare-tunnel/).
