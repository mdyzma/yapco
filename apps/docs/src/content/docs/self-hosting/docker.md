---
title: Uruchomienie w Dockerze
description: Aplikacja, dokumentacja i eksport PDF w jednym kontenerze; nic więcej do instalowania.
sidebar:
  order: 2
---

Obraz Dockera zawiera wszystko, czego potrzebuje YAPCO: Node.js, Chromium, Caddy, aplikację, tę
dokumentację i usługę eksportu PDF. Twój system potrzebuje tylko Dockera i poza obrazem nic się na
nim nie instaluje.

## Czego potrzebujesz

- **Windows lub macOS**: [Docker Desktop](https://www.docker.com/products/docker-desktop/).
- **Linux**: Docker Engine z wtyczką Compose.
- **Git**, żeby pobrać źródła, i około 5 GB wolnego miejsca na dysku na budowanie.

## Uruchomienie

```bash
git clone https://github.com/mdyzma/yapco.git
cd yapco
docker compose -f deploy/docker/compose.yaml up -d --build
```

Pierwsze budowanie trwa kilka minut: instaluje zależności i buduje stronę wewnątrz obrazu. Potem
otwórz **http://localhost:8080**. Ta dokumentacja jest pod http://localhost:8080/docs/.

Sprawdź, czy działa:

```bash
docker compose -f deploy/docker/compose.yaml ps
```

Status powinien pokazywać `healthy`.

## Ustawienia

Skopiuj `deploy/docker/.env.example` do `deploy/docker/.env` i zmień, co potrzebujesz:

| Zmienna | Domyślnie | Znaczenie |
| --- | --- | --- |
| `YAPCO_PORT` | `8080` | Port na Twoim komputerze |
| `YAPCO_BIND` | `127.0.0.1` | `127.0.0.1`: otworzy ją tylko ten komputer; `0.0.0.0`: także inne urządzenia w sieci |
| `YAPCO_ORIGIN` | brak | Dodatkowe adresy, pod którymi ludzie otwierają stronę, rozdzielone przecinkami |
| `BUILD_SHA` | `docker` | Wersja pokazywana w stopce listy planerów |

Po zmianie uruchom ponownie polecenie `up -d`.

:::caution[Eksport PDF i adresy]
Usługa eksportu odpowiada tylko stronom otwartym z adresu, który zna: `localhost` i adresów
z `YAPCO_ORIGIN`. Jeśli otwierasz stronę z innego urządzenia jako `http://192.168.1.20:8080` albo
przez tunel jako `https://planner.example.com`, dodaj ten adres do `YAPCO_ORIGIN`, bo inaczej
*Utwórz PDF* tam nie zadziała.
:::

## Aktualizacja

```bash
git pull
docker compose -f deploy/docker/compose.yaml up -d --build
```

## Zatrzymanie i usunięcie

```bash
docker compose -f deploy/docker/compose.yaml down
```

Kontener nie przechowuje danych, więc jego zatrzymanie czy usunięcie niczego nie kasuje: planery
zostają w Twojej przeglądarce. Jak zwykle rób ich [kopie JSON](/docs/guides/backups/).

Żeby zwolnić też miejsce na dysku, usuń obraz: `docker image rm yapco:local`.

## Logi

```bash
docker compose -f deploy/docker/compose.yaml logs -f
```

## Jak jest zbudowany

- `deploy/docker/Dockerfile`: etap budowania instaluje workspace i buduje aplikację oraz
  dokumentację; końcowy obraz ma tylko Node.js, Chromium, czcionki, Caddy, pliki statyczne i usługę
  eksportu. Ma około 1,5 GB, głównie przez Chromium.
- `deploy/docker/entrypoint.sh` uruchamia usługę eksportu i Caddy; jeśli któraś się zatrzyma,
  Docker restartuje kontener.
- Kontener działa jako zwykły użytkownik, z systemem plików tylko do odczytu.
- `deploy/Caddyfile` jest ten sam co na Proxmoxie.

Dalej (opcjonalnie): [publikacja przez tunel Cloudflare](/docs/self-hosting/cloudflare-tunnel/).
