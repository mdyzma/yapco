---
title: Gdzie są Twoje dane
description: Planery są tylko w Twojej przeglądarce; co widzi serwer, a czego nie.
sidebar:
  order: 5
---

YAPCO nie ma kont ani bazy danych na serwerze.

- **Planery** są zapisane w pamięci Twojej przeglądarki (IndexedDB), osobno dla każdej
  przeglądarki i adresu. Nikt inny ich nie widzi, także osoba, która prowadzi stronę.
- **Tworzenie PDF** wysyła drukowane strony do usługi eksportu na tej samej stronie. Usługa
  renderuje je w Chrome bez okna i odsyła PDF. Niczego nie zachowuje i nie zapisuje treści
  planerów w logach.
- **Plik PDF** pobiera się do Twojego folderu *Pobrane*. Na serwerze nie zostaje kopia.
- **Bez statystyk, bez ciasteczek, bez śledzenia.**

## Co to dla Ciebie znaczy

- **Wyczyszczenie danych przeglądania usuwa planery.** Rób
  [kopie JSON](/docs/guides/backups/).
- Planer z laptopa nie pojawi się na telefonie. Przenieś go plikiem JSON.
- Udostępniając adres strony, udostępniasz pustą aplikację, nigdy swoje planery: każdy, kto ją
  otworzy, ma własne.

Pełną informację znajdziesz na stronie *Prywatność* w aplikacji (link na dole listy planerów).
