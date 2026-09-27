---
title: Współtworzenie
description: Przygotowanie, sprawdzanie i zasady zmian w YAPCO.
sidebar:
  order: 5
---

Zgłoszenia i pull requesty są mile widziane na [GitHubie](https://github.com/mdyzma/yapco). Przy
czymś większym niż poprawka najpierw otwórz zgłoszenie, żebyśmy uzgodnili podejście.

## Jak możesz pomóc

- **Zgłoś problem**: szablon, wariant, format i język; czego się spodziewałeś/aś i co
  zobaczyłeś/aś; zrzut ekranu albo numer strony.
- **Popraw treści**: brzmienie, tłumaczenia, pytania, sentencje i przykłady. Szczególnie cenne są
  uwagi osób, które używają papierowych planerów albo pracują w terapii.
- **Popraw błędy albo dodaj funkcje**: zobacz `docs/roadmap.md`.
- **Popraw tę dokumentację**: każda strona ma na dole link *Edytuj stronę*.

## Przed pull requestem

```bash
pnpm check
```

- `pnpm check` musi przechodzić; CI uruchamia to samo.
- Dodaj lub zaktualizuj testy (Vitest, w katalogu `test/` każdego pakietu).
- Zmiany układu i treści: zbuduj aplikację i uruchom testy końcowe
  (`pnpm --filter @planner/web build`, potem `pnpm --filter @planner/export-node test:e2e`).
- Formatuj Prettierem (`pnpm format`).

## Zasady

- **Commity**: krótkie tematy według [Conventional Commits](https://www.conventionalcommits.org/),
  po angielsku, na przykład `feat(template): four contacts on the crisis plan`.
- **Zawsze dwa języki**: teksty szablonu jako `L('English', 'Polski')`; teksty aplikacji
  w `apps/web/messages/en.json` i `pl.json` z tymi samymi kluczami; ta dokumentacja
  w `apps/docs/src/content/docs/` (polski) i `…/docs/en/` (angielski), z tymi samymi nazwami
  plików.
- **Jednostki fizyczne**: milimetry i punkty.
- **Prywatność**: bez statystyk, bez kont, nic, co wysyła treść planera na serwer.
- **Decyzje**: zmiana modelu danych, drukowania albo wdrażania dostaje ADR w `docs/adr/`.

## Licencja

MIT. Współtworząc, zgadzasz się, że Twój wkład jest objęty tą licencją.
