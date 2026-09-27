---
title: Cloudflare Workers (alternatywa)
description: YAPCO w całości na Cloudflare, bez własnego serwera.
sidebar:
  order: 5
---

Repozytorium zawiera też Worker Cloudflare (`apps/worker`), który serwuje aplikację i tworzy
pliki PDF przez Browser Run Cloudflare. Nie potrzebuje Twojego sprzętu, ale:

- darmowy plan daje około **10 minut przeglądarki dziennie** na PDF (kilka pełnych planerów);
- ta dokumentacja **nie** jest tam jeszcze dostępna pod `/docs`.

## W skrócie

1. Domena w DNS Cloudflare (jak dla [tunelu](/docs/self-hosting/cloudflare-tunnel/)).
2. **Workers & Pages**: zanotuj **Account ID**.
3. **My Profile → API Tokens → Create Token** z szablonu *Edit Cloudflare Workers*, z uprawnieniami
   *Workers Scripts*, *Browser Rendering*, *Workers Routes*, *DNS* i *Zone read* dla Twojej
   domeny.
4. W GitHubie → **Settings → Secrets and variables → Actions**: sekrety `CLOUDFLARE_API_TOKEN`
   i `CLOUDFLARE_ACCOUNT_ID` oraz zmienna `PRODUCTION_URL`.
5. W `apps/worker/wrangler.jsonc` dodaj swój adres do `routes` z `"custom_domain": true`.
6. Push na `main`: workflow **Deploy** testuje, wdraża, sprawdza stronę i w razie błędu wycofuje
   wdrożenie.

Albo z własnego komputera:

```bash
pnpm --filter @planner/web build
pnpm --filter @planner/worker exec wrangler login
pnpm --filter @planner/worker deploy
```

Pełna instrukcja krok po kroku jest w repozytorium: `docs/operations/deploy-subdomain.md`,
droga A.

:::caution
Nie ustawiaj sekretów Cloudflare w GitHubie, jeśli hostujesz na Proxmoxie: z nimi każdy push
wdrażałby też na Workers.
:::
