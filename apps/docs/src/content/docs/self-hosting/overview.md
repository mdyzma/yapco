---
title: "Własny serwer: przegląd"
description: Z czego składa się serwer YAPCO i dwa sposoby, by go uruchomić.
sidebar:
  order: 1
---

Strona YAPCO to dwie małe rzeczy pod jednym adresem:

1. **Pliki statyczne**: aplikacja i ta dokumentacja. Nie ma bazy danych; planery zostają
   w przeglądarce każdej osoby.
2. **Usługa eksportu PDF**: renderuje strony w Chromium bez okna i zwraca PDF. Niczego nie
   przechowuje.

**Caddy** serwuje pliki i przekazuje żądania PDF do usługi eksportu:

```text
przeglądarka ──> Caddy :8080 ──┬─ /               aplikacja
                               ├─ /docs/*         ta dokumentacja
                               └─ /api/export/*   usługa eksportu ──> Chromium
```

## Dwa sposoby uruchomienia

| | Docker | Kontener Proxmox |
| --- | --- | --- |
| Dla | Każdego komputera lub serwera z Dockerem | Serwera z Proxmoxem |
| Instalujesz | Tylko Dockera | Nic ręcznie: jeden skrypt instaluje Node.js, Chromium i Caddy |
| Aktualizacje | `git pull` i przebudowanie obrazu | Ponownie skrypt albo Jenkins po każdym commicie |
| Instrukcja | [Uruchomienie w Dockerze](/docs/self-hosting/docker/) | [Instalacja na Proxmoxie](/docs/self-hosting/proxmox/) |

Oba sposoby używają tej samej konfiguracji Caddy (`deploy/Caddyfile`) i serwują tę samą stronę na
porcie 8080, przez zwykłe HTTP.

## Pod własną domeną

Żeby strona była dostępna z każdego miejsca pod `https://planner.example.com`, postaw przed nią
[tunel Cloudflare](/docs/self-hosting/cloudflare-tunnel/). Nie otwierasz żadnego portu na
routerze, a certyfikat zapewnia Cloudflare. Bez tunelu strona działa na Twoim komputerze albo
w sieci domowej.

## Kroki

1. [Uruchomienie w Dockerze](/docs/self-hosting/docker/) **albo** [Instalacja na Proxmoxie](/docs/self-hosting/proxmox/).
2. [Publikacja przez tunel Cloudflare](/docs/self-hosting/cloudflare-tunnel/) (opcjonalnie).
3. [Automatyczne wdrożenia z Gitea i Jenkinsem](/docs/self-hosting/ci-cd/) (opcjonalnie, Proxmox).
4. [Aktualizacje i utrzymanie](/docs/self-hosting/updating/).

Przykłady używają adresu `planner.example.com`; wstaw w jego miejsce swój.
