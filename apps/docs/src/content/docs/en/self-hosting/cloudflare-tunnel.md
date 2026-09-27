---
title: Publish with a Cloudflare Tunnel
description: Your own address with HTTPS, without opening a port on your router.
sidebar:
  order: 3
---

A Cloudflare Tunnel connects the container to Cloudflare from the inside, so the site gets an
HTTPS address and no port on your router is opened.

## Before you start

Your domain's DNS must be managed by Cloudflare (**Websites** → the domain shows **Active**).
If it is not yet: **Add a domain** → Free plan, compare the imported DNS records with your
current provider (especially **MX** and the **TXT** records for mail), and change the
nameservers at your registrar.

## Create the tunnel

In the Cloudflare dashboard: **Zero Trust** → **Networks** → **Tunnels** → **Create a tunnel** →
**Cloudflared** → name it, for example `proxmox`.

1. **Install connector**: choose **Debian**, **64-bit**, and run the command shown. You can run
   it in the YAPCO container, or in a separate container for cloudflared that serves several
   sites.
2. **Public hostname**:
   - Subdomain: `planner`
   - Domain: `example.com`
   - Service: **HTTP**, URL `localhost:8080` (cloudflared in the YAPCO container) or
     `<container address>:8080` (cloudflared elsewhere)
3. **Save tunnel**. Cloudflare creates the DNS record itself.

The tunnel should show **Healthy**. Then, from any computer:

```bash
curl -s https://planner.example.com/api/export/health
```

It answers `{"ok":true}`. Open the site, make a PDF, and open `/docs`.

:::note
The export service accepts pages only from the addresses it knows. If PDFs fail on the public
address but work in the LAN, run the install script again with
`YAPCO_ORIGIN=https://planner.example.com`.
:::

## Recommended Cloudflare settings

On your domain:

- **Security → WAF → Rate limiting rules** (one rule is free): *URI Path* starts with
  `/api/export/`, more than 60 requests per 10 seconds per IP → **Block**.
- **Security → Bots**: **Bot Fight Mode** on.
- **SSL/TLS → Edge Certificates**: **Always Use HTTPS** on, minimum TLS 1.2.
- Leave **Web Analytics**, **Zaraz** and **Browser Insights** off: the privacy notice promises
  no analytics.

## Keep it private at first (optional)

**Zero Trust → Access → Applications → Add an application → Self-hosted**, your address, a
policy that allows only your e-mail address. Visitors then log in with a one-time code. Remove
the application when you go public.
