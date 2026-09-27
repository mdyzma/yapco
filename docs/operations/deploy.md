# Deploying YAPCO

YAPCO is self-hosted ([ADR-0011](../adr/0011-self-hosted-docker-and-proxmox.md)). A site is two
small things behind one address:

- **static files**: the app (`apps/web/out`) and the user documentation (`apps/docs/dist`), with
  no database: planners stay in each visitor's browser;
- **the PDF export service** (`apps/export-node`), which renders pages in a local Chromium and
  keeps nothing.

**Caddy** serves the files and passes `/api/export/*` to the export service. Both deployments use
the same [deploy/Caddyfile](../../deploy/Caddyfile):

```text
browser ──> Caddy :8080 ──┬─ /               the app
                          ├─ /docs/*         the documentation
                          └─ /api/export/*   export service 127.0.0.1:8787 ──> Chromium
```

| | A. Docker | B. Proxmox container |
|---|---|---|
| For | Any computer or server with Docker; nothing else installed | A Proxmox host |
| Files | [deploy/docker/](../../deploy/docker/) | [deploy/proxmox/install.sh](../../deploy/proxmox/install.sh) |
| Updates | `git pull`, then rebuild the image | the script again, or Jenkins on every commit |
| Size | one image, about 1.5 GB (mostly Chromium) | a 16 GB container with the source and build tools |

Either can be published on your own domain with a **Cloudflare Tunnel** (section C); without one
it serves your own computer or network. The examples use `planner.example.com`; put your own
address in its place, and keep it out of the repository.

For development on your own computer (`pnpm dev`) see the [runbook](runbook.md).

---

## A. Docker

Everything (Node.js, Chromium, Caddy, the app, the documentation and the export service) is in
one image. Your system only needs Docker: Docker Desktop on Windows or macOS, Docker Engine with
the Compose plugin on Linux.

### A0. Quickest: the ready-made image

GitHub Actions ([.github/workflows/docker.yml](../../.github/workflows/docker.yml)) publishes the
image for linux/amd64 and linux/arm64: `ghcr.io/mdyzma/yapco:latest` follows `main`, and release
tags `v1.2.3` get `:1.2.3` and `:1.2`. Without cloning or building:

```bash
docker run -d --name yapco --restart unless-stopped -p 127.0.0.1:8080:8080 --shm-size 1g --read-only --tmpfs /tmp --security-opt no-new-privileges ghcr.io/mdyzma/yapco:latest
```

It works as it is in PowerShell, Terminal (macOS) and Linux shells; in Git Bash on Windows put
`MSYS_NO_PATHCONV=1` before it, or Git Bash turns `/tmp` into a Windows path. Add `-e YAPCO_ORIGIN=…` for other addresses (see A2), and use `-p 8080:8080` to open it from other
devices. Update with `docker pull ghcr.io/mdyzma/yapco:latest`, `docker rm -f yapco` and the same
`docker run`.

The package must be **public** on GitHub for others to pull it: after the first publish, open the
repository's *Packages* → `yapco` → *Package settings* → *Change visibility* → *Public*.

### A1. Build and start it yourself

```bash
git clone https://github.com/mdyzma/yapco.git
cd yapco
docker compose -f deploy/docker/compose.yaml up -d --build
```

The first build takes a few minutes (it installs the dependencies and builds the site inside the
image). Then open **http://localhost:8080**. The documentation is at `/docs`.

Check it:

```bash
docker compose -f deploy/docker/compose.yaml ps
```

The status should say `healthy` (the health check asks the export service through Caddy).

### A2. Settings

Copy `deploy/docker/.env.example` to `deploy/docker/.env` and change what you need.
Windows (PowerShell): `Copy-Item deploy/docker/.env.example deploy/docker/.env`, then
`notepad deploy/docker/.env`. Linux / macOS: `cp deploy/docker/.env.example deploy/docker/.env`,
then edit it (`nano`, or `open -e` on macOS).

| Variable | Default | Meaning |
|---|---|---|
| `YAPCO_PORT` | `8080` | The port on the host |
| `YAPCO_BIND` | `127.0.0.1` | `127.0.0.1`: only this computer; `0.0.0.0`: other devices in your network too |
| `YAPCO_ORIGIN` | none | More addresses people open the site with, comma-separated, e.g. `http://192.168.1.20:8080` or `https://planner.example.com`. PDF export accepts requests only from these and from `localhost` |
| `BUILD_SHA` | `docker` | Shown in the dashboard's footer, e.g. the output of `git rev-parse --short HEAD` |

After changing `.env`, run the `up -d` command again.

To show the exact commit in the footer, set `BUILD_SHA` in the shell when building (a value in
your shell wins over `.env`):

```powershell
# Windows (PowerShell)
$env:BUILD_SHA = git rev-parse --short HEAD
docker compose -f deploy/docker/compose.yaml up -d --build
```

```bash
# Linux / macOS
BUILD_SHA=$(git rev-parse --short HEAD) docker compose -f deploy/docker/compose.yaml up -d --build
```

### A3. Update, stop, remove

```bash
git pull
docker compose -f deploy/docker/compose.yaml up -d --build
```

```bash
docker compose -f deploy/docker/compose.yaml down
```

The container keeps no data, so removing it (or the image) loses nothing. Planners stay in the
browsers; keep JSON backups of them as usual.

### A4. How the container is built

- [Dockerfile](../../deploy/docker/Dockerfile): a build stage installs the workspace and builds
  the app and documentation; the run stage has only Node.js, Chromium, fonts, Caddy, the static
  files and the export service with its production dependencies.
- [entrypoint.sh](../../deploy/docker/entrypoint.sh) starts the export service and Caddy; if
  either stops, the container stops and Docker restarts it (`restart: unless-stopped`).
- It runs as the unprivileged `node` user with a read-only file system (only `/tmp` is
  writable), `no-new-privileges`, and 1 GB of shared memory for Chromium.

Logs: `docker compose -f deploy/docker/compose.yaml logs -f`.

---

## B. Proxmox container

One small LXC container runs Caddy, the export service and Chromium directly, installed by one
script. This is how the project's own site runs.

### B1. Create the container

In the Proxmox web UI, open the **Shell** of your node (not of a container) and download a
Debian template once (Debian 12 or 13):

```bash
pveam update
pveam available --section system | grep debian
```

Download the name it prints (the version number changes over time), for example:

```bash
pveam download local debian-13-standard_13.1-2_amd64.tar.zst
```

Create and start the container. Pick a free ID instead of `120`, and the storage names you use
(`local-lvm` for the disk is the Proxmox default):

```bash
pct create 120 local:vztmpl/debian-13-standard_13.1-2_amd64.tar.zst --hostname yapco --cores 2 --memory 4096 --swap 1024 --rootfs local-lvm:16 --net0 name=eth0,bridge=vmbr0,ip=dhcp --unprivileged 1 --features nesting=1 --onboot 1 --start 1
```

The same in the web UI: **Create CT** → hostname `yapco`, the Debian template, disk 16 GB, 2
cores, 4096 MB memory, network DHCP, *Unprivileged* and *Nesting* on. 4 GB of memory matters:
building the web app with less can fail. Give the container a fixed address (a DHCP reservation
on your router).

### B2. Install YAPCO (one script)

Open a shell in the container, as root:

```bash
pct enter 120
```

Then run the install script:

```bash
apt-get update && apt-get install -y curl
curl -fsSL https://raw.githubusercontent.com/mdyzma/yapco/main/deploy/proxmox/install.sh | YAPCO_ORIGIN=https://planner.example.com sh
```

It takes a few minutes and:

1. installs Node.js 24, Chromium and Caddy;
2. creates the user `yapco` and clones the repository into `/opt/yapco/app`;
3. installs the dependencies and builds the app and the documentation;
4. starts **yapco-export** (systemd): the PDF export service on `127.0.0.1:8787`, which accepts
   requests only from `YAPCO_ORIGIN` and the container's LAN address;
5. installs [deploy/Caddyfile](../../deploy/Caddyfile) and starts **Caddy** on port 8080;
6. checks the export service, the site and `/docs`, and ends with `Done. Serving …`.

| Variable | Meaning | Default |
|---|---|---|
| `YAPCO_ORIGIN` | the public address | none (LAN only) |
| `YAPCO_REPO` | where to clone from, e.g. your Gitea mirror | GitHub |
| `YAPCO_BRANCH` | the branch | `main` |
| `YAPCO_COMMIT` | deploy exactly this commit | the tip of the branch |

If a check fails: `journalctl -u yapco-export -n 50` and `journalctl -u caddy -n 50`.

### B3. Updating

Run the same script again. It pulls the branch, rebuilds and restarts the export service and
Caddy. Open copies of the app pick up the new version on their next visit (the service worker
checks `/sw.js` every time).

### B4. Automatic deploys with Gitea and Jenkins

Instead of running the script by hand, let Jenkins test every change and deploy it:

```text
push to GitHub → Gitea pull mirror (every 10 min) → Jenkins polls Gitea (every 5 min)
  → lint, format, types, tests, build, PDF checks in Chromium (the same as GitHub CI)
  → SSH into the container: install.sh for exactly that commit, fetched from Gitea
```

The pipeline is the [Jenkinsfile](../../Jenkinsfile) in the repository root. B1 (the container)
is still needed; the first Jenkins deploy then does everything B2 does.

**1. Gitea mirror.** In Gitea: **+** → **New Migration** → **GitHub** → URL
`https://github.com/mdyzma/yapco.git`, tick **This repository will be a mirror**, interval
`10m0s`. If Gitea cannot read the repository, add a GitHub access token in the form. Keep the
mirror **public** in Gitea: the container clones from it without credentials.

**2. SSH from Jenkins to the container.** On any computer, make a key pair for deploys only:

```bash
ssh-keygen -t ed25519 -C yapco-deploy -N "" -f yapco-deploy
```

On Windows, run it in PowerShell (OpenSSH is built into Windows 10 and 11) without `-N ""`, and
press Enter twice when it asks for a passphrase: `ssh-keygen -t ed25519 -C yapco-deploy -f yapco-deploy`.

In the container, allow that key for root (Debian allows root logins by key only):

```bash
apt-get update && apt-get install -y openssh-server
mkdir -p /root/.ssh && chmod 700 /root/.ssh
echo "PASTE THE CONTENTS OF yapco-deploy.pub HERE" >> /root/.ssh/authorized_keys
chmod 600 /root/.ssh/authorized_keys
```

**3. Jenkins.**

- The Jenkins machine builds YAPCO itself, so it needs Node.js 24, Chromium and git once (as
  root, Debian), and at least 20 GB of disk and 4 GB of memory. A plain agent is enough; Docker
  is not needed:

  ```bash
  curl -fsSL https://deb.nodesource.com/setup_24.x | bash - && apt-get install -y nodejs
  apt-get install -y git chromium fonts-dejavu-core fonts-liberation openssh-client
  corepack enable
  ```

- Plugins (Manage Jenkins → Plugins): **Pipeline**, **Git** and **SSH Agent**.
- Credentials (Manage Jenkins → Credentials → *Add*): kind **SSH Username with private key**,
  ID `yapco-deploy`, username `root`, private key = the contents of the `yapco-deploy` file.
- Environment variables (Manage Jenkins → System → *Global properties* → *Environment
  variables*):
  - `YAPCO_DEPLOY_HOST` = the container's address, e.g. `192.168.1.50`
  - `YAPCO_REPO` = the Gitea clone URL, e.g. `http://gitea.lan:3000/you/yapco.git`
  - `YAPCO_ORIGIN` = your public address, e.g. `https://planner.example.com`. It stays in
    Jenkins, not in the repository; without it, PDFs work only from the LAN address.
- **New Item** → name `yapco` → **Pipeline** → *Pipeline script from SCM* → **Git** → the Gitea
  URL, branch `*/main`, script path `Jenkinsfile` → *Save* → **Build Now**.

The first build takes longest. A green build ends with the install script's `Done. Serving …`,
and the dashboard's footer shows the deployed commit. Without `YAPCO_DEPLOY_HOST`, Jenkins runs
the checks and skips the deploy.

### B5. Notes

- Back up the container with Proxmox's normal backups; it holds no user data, so a rebuild from
  the steps above is just as good.
- The export service keeps nothing and logs no planners; keep `journalctl` at its defaults.
- Several people making PDFs at the same time share the container's CPU; one six-month planner
  takes about a minute.
- On Debian 13 home folders are private; the script makes `/opt/yapco` readable for Caddy.

---

## C. Your own domain with a Cloudflare Tunnel

A tunnel publishes the site (Docker or Proxmox) at `https://planner.example.com` without opening
a port on your router. Cloudflare provides the certificate.

### C1. The domain on Cloudflare DNS

1. In the Cloudflare dashboard: **Websites** → check whether `example.com` is **Active**. If it
   is, go to C2.
2. Otherwise: **Add a domain** → `example.com` → **Free** plan. Cloudflare scans the existing
   DNS records.
3. **Compare the records carefully** with those at your current DNS provider before switching:
   the main website (`A` / `CNAME` for `@` and `www`), **mail** (`MX`, plus `TXT` records for SPF,
   DKIM and DMARC), and any verification `TXT` records. A missing MX record means lost email.
4. At your **registrar**, replace the nameservers with the two Cloudflare shows. Cloudflare
   emails you when the zone is **Active**.
5. **Do not** create a DNS record for `planner` yourself; the tunnel creates it.

### C2. The tunnel

**Zero Trust** (first time: choose a team name and the **Free** plan) → **Networks** →
**Tunnels** → **Create a tunnel** → **Cloudflared** → name it, e.g. `home`.

1. **Install connector**: pick your system and run the command shown. It can run in the YAPCO
   Proxmox container, in a separate cloudflared container that serves several sites, or on the
   machine that runs Docker.
2. **Public hostname**: subdomain `planner`, domain `example.com`, service **HTTP**, URL
   `localhost:8080` (cloudflared on the same machine) or `<address>:8080` (elsewhere).
3. **Save tunnel**. Cloudflare creates the `planner` DNS record itself.

Then tell the export service about the public address: `YAPCO_ORIGIN=https://planner.example.com`
(Docker: in `.env`, then `up -d`; Proxmox: run the script with it, or set it in Jenkins).

Check from any computer that `https://planner.example.com/api/export/health` answers
`{"ok":true}` (open it in a browser, or use `curl.exe -s …` in Windows PowerShell and `curl -s …`
elsewhere), then create a planner and make a PDF of one month.

### C3. Security settings

On the `example.com` zone in Cloudflare:

- **Security** → **WAF** → **Rate limiting rules** (one rule is free): *URI Path* *starts with*
  `/api/export/`, more than **60** requests per **10 seconds** per IP → **Block** for 10
  seconds.
- **Security** → **Bots**: **Bot Fight Mode** on.
- **SSL/TLS** → **Edge Certificates**: **Always Use HTTPS** on, **Minimum TLS Version** 1.2.
- Leave **Web Analytics**, **Zaraz** and **Browser Insights** off. The privacy notice
  (`/en/privacy`) promises no analytics.

### C4. Optional: keep it private at first

**Zero Trust** → **Access** → **Applications** → **Add an application** → *Self-hosted* →
domain `planner.example.com` → policy *Allow* → *Emails* → your own address. Visitors then log
in with a one-time code sent by email. Remove the application when you go public. With Access,
Cloudflare also processes your email address for the login.
