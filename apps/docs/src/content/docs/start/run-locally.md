---
title: Uruchomienie na komputerze
description: Zainstaluj Node.js i pnpm, pobierz repozytorium i uruchom YAPCO lokalnie.
sidebar:
  order: 3
---

Lokalne YAPCO nie potrzebuje serwera ani internetu po pierwszej instalacji. Aplikacja działa
w Twojej przeglądarce, a pliki PDF tworzy Twój własny Google Chrome.

## Wymagania

- **Node.js 24** ([nodejs.org](https://nodejs.org); działa też 22 lub nowszy)
- **Git**
- **Google Chrome**, do eksportu PDF
- Około 2 GB miejsca na dysku na zależności

## Instalacja

```bash
git clone https://github.com/mdyzma/yapco.git
cd yapco
corepack enable
pnpm install
```

Jeśli w Windows `corepack enable` kończy się błędem uprawnień, uruchom w PowerShellu:

```powershell
corepack enable --install-directory "$env:APPDATA\npm" pnpm
```

Sprawdź: `pnpm --version` pokazuje 12.x.

## Uruchomienie

```bash
pnpm dev
```

Poczekaj na `Ready` i `Export service on http://127.0.0.1:8787`, a potem otwórz
**http://localhost:3000**. Jedno polecenie uruchamia i aplikację, i usługę eksportu PDF.
Zatrzymujesz je klawiszami **Ctrl+C**.

:::caution[Zawsze ten sam adres]
Planery są zapisane osobno dla każdej przeglądarki **i** każdego adresu. `http://127.0.0.1:3000`,
inna przeglądarka, okno prywatne czy strona w internecie mają własne, osobne i puste miejsce.
Planery przenosisz między nimi [plikami JSON](/docs/guides/backups/).
:::

## Aktualizacja

Przy zatrzymanej aplikacji:

```bash
git pull
pnpm install
pnpm dev
```

Aktualizacja nie dotyka Twoich planerów (są w przeglądarce, nie w folderze projektu), ale
i tak najpierw zapisz kopie JSON. Jeśli po aktualizacji strona wygląda źle, odśwież ją
klawiszami **Ctrl+F5**.

## Ta dokumentacja lokalnie

```bash
pnpm --filter @planner/docs dev
```

Otwiera się pod http://localhost:4321/docs/. Przy `pnpm dev` link *Dokumentacja* w aplikacji
prowadzi do `/docs`, który istnieje tylko na serwerze skonfigurowanym jak w rozdziale
[Własny serwer](/docs/self-hosting/overview/).

## Sprawdzenie, czy wszystko działa (opcjonalnie)

```bash
pnpm check
```

Lint, typy, wszystkie testy jednostkowe i build: to samo co CI. Jeśli coś się nie uda, zajrzyj
do [Problemów i pytań](/docs/guides/troubleshooting/).
