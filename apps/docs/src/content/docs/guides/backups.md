---
title: Kopie zapasowe i przenoszenie planerów
description: Zapisuj planery jako pliki JSON, przywracaj je i przenoś między przeglądarkami.
sidebar:
  order: 9
---

Planery są zapisane tylko w przeglądarce, w której je utworzono. Wyczyszczenie danych
przeglądania dla strony je usuwa, więc rób kopie.

## Kopia

**Eksport → Zapisz planer jako JSON**. Jeden plik na planer, ze wszystkim: stronami, Twoimi
zmianami, treściami i ustawieniami. Trzymaj pliki w folderze, który ma kopię (OneDrive, Dysk
Google…).

Rób ją co tydzień i zawsze przed aktualizacją własnego serwera.

## Przywracanie i przenoszenie

Lista planerów → **Importuj JSON…** → wybierz plik. Zostanie dodany jako **nowy** planer; nic nie
zostanie nadpisane. Tym samym plikiem przeniesiesz planer do innej przeglądarki, na inny
komputer albo z `localhost` na stronę w internecie.

## Tylko układ

**Eksport → Zapisz szablon jako JSON** zapisuje układ bez imion, dat i danych osobowych. Import
tworzy z niego nowy planer.

## Duplikowanie

**Duplikuj** na liście planerów tworzy kopię w tej samej przeglądarce, na przykład żeby
wypróbować inne moduły bez ruszania oryginału.

## Ograniczenia

Import przyjmuje pliki JSON do 10 MB, które są planerem albo szablonem YAPCO.
