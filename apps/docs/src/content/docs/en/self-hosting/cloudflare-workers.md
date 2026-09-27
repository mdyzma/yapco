---
title: Cloudflare Workers (alternative)
description: Run YAPCO entirely on Cloudflare, without a server of your own.
sidebar:
  order: 5
---

The repository also contains a Cloudflare Worker (`apps/worker`) that serves the app and renders
PDFs with Cloudflare's Browser Run. It needs no hardware of your own, but:

- the free plan gives about **10 browser-minutes a day** for PDFs (a few full planners);
- this documentation is **not** served at `/docs` there yet.

## Outline

1. Your domain on Cloudflare DNS (as for the [tunnel](/docs/en/self-hosting/cloudflare-tunnel/)).
2. **Workers & Pages**: note the **Account ID**.
3. **My Profile → API Tokens → Create Token** from the *Edit Cloudflare Workers* template, with
   *Workers Scripts*, *Browser Rendering*, *Workers Routes*, *DNS* and *Zone read* for your
   zone.
4. In GitHub → **Settings → Secrets and variables → Actions**: the secrets
   `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`, and the variable `PRODUCTION_URL`.
5. In `apps/worker/wrangler.jsonc`, add your address to `routes` with `"custom_domain": true`.
6. Push to `main`: the **Deploy** workflow tests, deploys, smoke-tests and rolls back on failure.

Or from your own computer:

```bash
pnpm --filter @planner/web build
pnpm --filter @planner/worker exec wrangler login
pnpm --filter @planner/worker deploy
```

The full step-by-step is in the repository: `docs/operations/deploy-subdomain.md`, route A.

:::caution
Do not set the Cloudflare GitHub secrets if you host on Proxmox: with them, every push would
also deploy to Workers.
:::
