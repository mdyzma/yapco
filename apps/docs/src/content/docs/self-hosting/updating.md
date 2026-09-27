---
title: Aktualizacje i utrzymanie
description: Aktualizacja serwera, sprawdzanie go i co warto kopiować.
sidebar:
  order: 6
---

## Aktualizacja

Z Jenkinsem aktualizacje są automatyczne: każdy commit na `main`, który przejdzie sprawdzenia,
zostaje wdrożony.

Ręcznie uruchom ten sam skrypt jeszcze raz w kontenerze:

```bash
curl -fsSL https://raw.githubusercontent.com/mdyzma/yapco/main/deploy/proxmox/install.sh | YAPCO_ORIGIN=https://planner.example.com sh
```

Pobiera `main`, buduje od nowa aplikację i dokumentację i restartuje usługi. Otwarte kopie
aplikacji przechodzą na nową wersję przy następnej wizycie.

## Sprawdzanie

| Co | Polecenie |
| --- | --- |
| Usługa eksportu | `curl -s http://127.0.0.1:8787/api/export/health` → `{"ok":true}` |
| Strona przez Caddy | `curl -sI http://127.0.0.1:8080/pl` → `200` |
| Dokumentacja | `curl -sI http://127.0.0.1:8080/docs/` → `200` |
| Wdrożona wersja | stopka listy planerów: *Wersja 1a2b3c4* |
| Logi | `journalctl -u yapco-export -n 50`, `journalctl -u caddy -n 50` |

## Kopie zapasowe

Kontener **nie przechowuje danych użytkowników**: planery są tylko w przeglądarkach. Zwykła
kopia Proxmoxa się przyda, ale odtworzenie według
[Instalacji na Proxmoxie](/docs/self-hosting/proxmox/) daje dokładnie to samo.

Użytkownicy powinni robić własne [kopie JSON](/docs/guides/backups/).

## Obciążenie

Kilka osób tworzących PDF jednocześnie dzieli procesor kontenera. Półroczny planer to około
minuty przy 2 rdzeniach.

## Częste problemy

| Problem | Rozwiązanie |
| --- | --- |
| `403` z Caddy po świeżej instalacji na Debianie 13 | Katalogi domowe są tam prywatne; skrypt wykonuje `chmod 755 /opt/yapco`. Uruchom go ponownie. |
| PDF nie działa tylko pod adresem publicznym | Brak `YAPCO_ORIGIN` albo inny adres; uruchom skrypt z właściwym. |
| Budowanie przerwane albo bardzo wolne | Mniej niż 4 GB pamięci; zwiększ ją w Proxmoxie. |
| Jenkins: `No space left on device` | Powiększ jego dysk: `pct resize <id> rootfs +10G` na węźle. |
