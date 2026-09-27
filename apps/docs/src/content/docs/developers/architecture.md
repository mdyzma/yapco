---
title: Jak to działa
description: Od szablonu do wydrukowanej strony.
sidebar:
  order: 2
---

```text
szablon (TS → JSON)  ──►  generator  ──►  dokument planera  ──►  renderer  ──►  PDF
   strony, bloki,          daty, miesiące,   strony ze stronami     React w mm,     druk
   moduły, warianty        tygodnie, cytaty  rozkładówek, zmiany    CSS druku       w Chrome
```

## Szablon

Szablon opisuje **sekcje** (powtarzane co miesiąc, tydzień lub dzień), **szablony stron**
(układy bloków) i **bloki** (typowane, z właściwościami sprawdzanymi przez Zod). Polski
i angielski są w tym samym rekordzie (`{ en, pl }`). **Moduły** i **warianty** decydują, które
strony się drukują i jakiego brzmienia używa blok. Szablony pisze się w TypeScripcie
i kompiluje do `template.json`.

## Generator

Generator rozwija szablon dla daty rozpoczęcia i długości w konkretne strony. Planuje kalendarz
(tydzień należy do miesiąca swojego poniedziałku), wie, po której stronie rozkładówki wypada
każda strona, i dodaje **puste strony**, żeby sekcje zaczynały się po właściwej stronie,
a miesiące zajmowały pełne kartki. Rozdaje też sentencje tak, by w miarę możliwości żadna nie
powtórzyła się w ciągu 30 dni.

## Dokument planera i zmiany

Planer ma własną kopię szablonu oraz **zmiany**: łatki JSON dla szablonu strony („wszystkie strony
z tym układem”) albo dla jednej strony („tylko ta strona”), dla formatu (A4 / A5) i dla wersji
modułu. Ponowne wygenerowanie dla nowych dat je zachowuje.

## Renderer

Strony to komponenty React rozmieszczone w prawdziwych milimetrach, z czcionkami w punktach. Te
same komponenty rysują stronę w projektancie, podgląd, przewodnik do druku i PDF.

## PDF

Usługa eksportu otwiera trasę druku statycznej aplikacji w Chrome bez okna, a ten drukuje ją do
PDF: tekst zostaje wektorowy, a wymiary są dokładne. `planner-pdf` łączy potem części i układa
je do druku (dwie A5 na A4, ręczny dupleks, składki broszury).

## Zapis danych

Planery są w IndexedDB przeglądarki, przez interfejs repozytorium; nic nie jest zapisywane na
serwerze. Service worker przechowuje aplikację do pracy offline.

## Decyzje

Uzasadnienie każdego wyboru jest w ADR w `docs/adr/`: układ przepływowy z opcjonalną swobodną
warstwą, instancje dokumentów i zmiany, PDF przez Chromium, treści w obu językach w jednym
rekordzie, domowe profile druku, hosting, polecenia projektanta oraz moduły i warianty.
