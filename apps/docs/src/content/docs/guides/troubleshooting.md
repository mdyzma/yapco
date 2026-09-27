---
title: Problemy i pytania
description: Częste problemy i pytania.
sidebar:
  order: 10
---

## Problemy

| Problem | Rozwiązanie |
| --- | --- |
| Lista planerów jest pusta | Inny adres, przeglądarka albo okno prywatne, albo wyczyszczono dane przeglądania. [Zaimportuj kopie JSON](/docs/guides/backups/). |
| Eksport do PDF jest niedostępny | Usługa eksportu jest zajęta albo nie działa. Spróbuj za kilka minut albo użyj *Drukuj z przeglądarki*. |
| Lokalnie: „usługa eksportu nie jest uruchomiona” | Uruchom `pnpm dev` (startuje obie) albo `pnpm --filter @planner/export-node dev` w drugim terminalu, potem *Sprawdź ponownie*. |
| Lokalnie: `Could not start Chrome` | Zainstaluj Google Chrome albo ustaw `CHROME_PATH` na Chrome lub Chromium przed `pnpm dev`. |
| Lokalnie: `Port 3000 is in use` | Aplikacja działa już w innym terminalu. |
| Wydruk jest trochę za mały lub za duży | Okno drukowania skaluje: wybierz *Rzeczywisty rozmiar* / 100 %. Sprawdź arkuszem kalibracyjnym. |
| Tyły są do góry nogami | Wybierz drugą krawędź obracania (dłuższa ↔ krótsza). |
| Tyły wychodzą w złej kolejności | Przełącz *Tyły w odwrotnej kolejności* w Eksporcie. |
| Po aktualizacji strona wygląda źle | Odśwież klawiszami Ctrl+F5. |
| Tekst na stronie jest ucięty | Skróć go albo zwiększ wysokość bloku w projektancie. Zgłoś to, jeśli dotyczy tekstu z szablonu. |

## Pytania

**Czy to jest darmowe?** Tak. YAPCO jest otwartym oprogramowaniem na licencji MIT.

**Czy inni zobaczą mój planer, jeśli udostępnię link?** Nie. Link otwiera pustą aplikację;
planery każdej osoby zostają w jej przeglądarce.

**Czy mogę korzystać na telefonie?** Do przeglądania i drobnych zmian tak. Projektowanie
i drukowanie najlepiej działają na komputerze.

**Czy mogę później zmienić wariant?** Tak: zmień moduły w ustawieniach planera w Podglądzie.

**Czy mogę zacząć w połowie miesiąca?** Tak: wybierz dowolną datę rozpoczęcia. Pierwszy tydzień
jest kompletny, nawet jeśli zaczyna się w poprzednim miesiącu.

**Czy mogę dodać własne sentencje?** Tak, w **Treściach**, albo zaimportować je z arkusza (CSV).

**Czy wariant Terapeutyczny to terapia?** Nie. To papierowe narzędzie do używania obok terapii
lub grupy wsparcia. W kryzysie skontaktuj się z terapeutą, telefonem zaufania albo numerem
alarmowym.

**Gdzie zgłosić problem?** [GitHub issues](https://github.com/mdyzma/yapco/issues): szablon,
wariant, format i język, czego się spodziewałeś/aś i co zobaczyłeś/aś.
