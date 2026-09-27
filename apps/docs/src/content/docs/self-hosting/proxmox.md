---
title: Instalacja na Proxmoxie
description: Utwórz kontener z Debianem i zainstaluj YAPCO jednym skryptem.
sidebar:
  order: 3
---

## 1. Utwórz kontener

W panelu Proxmoxa otwórz **Shell** węzła (nie kontenera). Raz pobierz szablon Debiana (działa
Debian 12 i 13):

```bash
pveam update
pveam available --section system | grep debian
```

Pobierz nazwę, którą pokaże (numer wersji się zmienia), na przykład:

```bash
pveam download local debian-13-standard_13.1-2_amd64.tar.zst
```

Utwórz i uruchom kontener. Zamiast `120` wybierz wolny numer, a nazwy magazynów dopasuj do
swoich:

```bash
pct create 120 local:vztmpl/debian-13-standard_13.1-2_amd64.tar.zst --hostname yapco --cores 2 --memory 4096 --swap 1024 --rootfs local-lvm:16 --net0 name=eth0,bridge=vmbr0,ip=dhcp --unprivileged 1 --features nesting=1 --onboot 1 --start 1
```

To samo w panelu: **Create CT** → nazwa `yapco`, szablon Debiana, dysk 16 GB, 2 rdzenie,
4096 MB pamięci, DHCP, włączone *Unprivileged* i *Nesting*.

:::tip
Nadaj kontenerowi stały adres: wystarczy rezerwacja DHCP na routerze. Jenkins i tunel będą
na niego wskazywać.
:::

4 GB pamięci ma znaczenie: z mniejszą budowanie aplikacji może się nie udać.

## 2. Uruchom skrypt instalacyjny

Otwórz powłokę kontenera jako root:

```bash
pct enter 120
```

A potem:

```bash
apt-get update && apt-get install -y curl
curl -fsSL https://raw.githubusercontent.com/mdyzma/yapco/main/deploy/proxmox/install.sh | YAPCO_ORIGIN=https://planner.example.com sh
```

Trwa to kilka minut. Skrypt:

1. instaluje Node.js 24, Chromium i Caddy;
2. tworzy użytkownika `yapco` i klonuje repozytorium do `/opt/yapco/app`;
3. instaluje zależności i buduje aplikację oraz tę dokumentację;
4. uruchamia **yapco-export** (systemd), usługę PDF na `127.0.0.1:8787`;
5. uruchamia **Caddy** na porcie 8080: aplikację, `/docs` i `/api/export/*`, ze ścisłymi
   nagłówkami bezpieczeństwa;
6. wszystko sprawdza i kończy komunikatem `Done. Serving …`.

## Ustawienia

| Zmienna | Znaczenie | Domyślnie |
| --- | --- | --- |
| `YAPCO_ORIGIN` | Twój publiczny adres; usługa PDF przyjmuje strony tylko z niego i z adresu w sieci lokalnej | brak (tylko sieć lokalna) |
| `YAPCO_REPO` | Skąd klonować, np. z kopii w Gitea | GitHub |
| `YAPCO_BRANCH` | Gałąź | `main` |
| `YAPCO_COMMIT` | Wdróż dokładnie ten commit | najnowszy na gałęzi |

Nie wpisuj prawdziwego adresu do repozytorium: podawaj go jako `YAPCO_ORIGIN` przy
uruchamianiu skryptu albo trzymaj w Jenkinsie (zobacz
[Automatyczne wdrożenia](/docs/self-hosting/ci-cd/)).

## Sprawdź

Z dowolnego komputera w sieci domowej otwórz `http://<adres kontenera>:8080`. Utwórz planer
i zrób PDF jednego miesiąca; pod `http://<adres kontenera>:8080/docs/` jest ta dokumentacja.

Jeśli któreś sprawdzenie się nie uda:

```bash
journalctl -u yapco-export -n 50
journalctl -u caddy -n 50
```

Dalej: [publikacja przez tunel Cloudflare](/docs/self-hosting/cloudflare-tunnel/).
