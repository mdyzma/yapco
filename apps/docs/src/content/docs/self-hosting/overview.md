---
title: "Własny serwer: przegląd"
description: Z czego składa się serwer YAPCO i dwa sposoby, by go uruchomić.
sidebar:
  order: 1
---

Strona YAPCO to dwie małe rzeczy:

1. **Pliki statyczne**: aplikacja (`apps/web/out`) i ta dokumentacja (`apps/docs/dist`). Nie ma
   bazy danych; planery zostają w przeglądarce każdej osoby.
2. **Usługa eksportu PDF** (`apps/export-node`): renderuje strony w Chromium bez okna i zwraca
   PDF. Niczego nie przechowuje.

## Dwa sposoby

| | Proxmox + tunel Cloudflare | Cloudflare Workers |
| --- | --- | --- |
| Działa na | Twoim kontenerze LXC | Cloudflare |
| Tworzenie PDF | Chromium w kontenerze, bez dziennego limitu | Browser Run: około 10 minut przeglądarki dziennie w darmowym planie |
| Dokumentacja pod `/docs` | Tak | Jeszcze nie |
| Aktualizacje | Skrypt instalacyjny, ręcznie albo z Jenkinsa | GitHub Actions po każdym pushu na `main` |
| Domowy serwer wyłączony | Strona nie działa | Strona działa |

Ta dokumentacja opisuje szczegółowo drogę przez **Proxmoxa**: tylko ona serwuje `/docs` i nie
ma limitu plików PDF. Drogę przez Workers streszcza strona
[Cloudflare Workers](/docs/self-hosting/cloudflare-workers/).

## Układ na Proxmoxie

```text
przeglądarka ──https──> Cloudflare ──tunel──> cloudflared ──> Caddy :8080 ──┬─ /            aplikacja
                                                                             ├─ /docs/*      ta dokumentacja
                                                                             └─ /api/export/* ──> usługa eksportu :8787 ──> Chromium
```

- **Caddy** serwuje pliki i przekazuje `/api/export/*` do usługi eksportu.
- **cloudflared** łączy kontener z Cloudflare, więc nie otwierasz żadnego portu na routerze.
- Opcjonalnie: **Gitea** kopiuje repozytorium z GitHuba, a **Jenkins** testuje i wdraża każdą
  zmianę.

## Kroki

1. [Instalacja na Proxmoxie](/docs/self-hosting/proxmox/): kontener i skrypt instalacyjny.
2. [Publikacja przez tunel Cloudflare](/docs/self-hosting/cloudflare-tunnel/): własny adres
   z HTTPS.
3. [Automatyczne wdrożenia](/docs/self-hosting/ci-cd/) z Gitea i Jenkinsem (opcjonalnie).
4. [Aktualizacje i utrzymanie](/docs/self-hosting/updating/).

Przykłady używają adresu `planner.example.com`; wstaw w jego miejsce swój.
