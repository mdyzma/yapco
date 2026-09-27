import type { LocalizedText } from '@planner/schema';

/**
 * Example filling for the guide and "example" exports of "Week by Week": a month and a week of
 * a fictional user (Ola), who works, studies in the evenings and plans a move. Short grey notes
 * explain what each part is for. All names, dates and events are made up.
 */

const L = (en: string, pl: string): LocalizedText => ({ en, pl });

type Sample = { fill?: unknown; note?: LocalizedText; noteAt?: string };

export const SAMPLES: Record<string, Record<string, Sample>> = {
  cover: {
    owner: { fill: 'Ola' },
  },
  year: {
    goals: {
      fill: {
        items: [
          L('Pass the evening course', 'Zdać kurs wieczorowy'),
          L('Move to a flat closer to work', 'Przeprowadzić się bliżej pracy'),
          L('Run 5 km without stopping', 'Przebiec 5 km bez zatrzymania'),
          L('Visit grandma once a month', 'Odwiedzać babcię raz w miesiącu'),
          L('Save for a summer trip', 'Odłożyć na letni wyjazd'),
        ],
        done: [2],
      },
      note: L('tick them off during the year', 'odhaczaj w ciągu roku'),
      noteAt: 'bottom-right',
    },
    remember: {
      fill: L(
        'Rest is part of the plan.\nOne big thing at a time.',
        'Odpoczynek też jest częścią planu.\nJedna duża sprawa naraz.',
      ),
    },
    notes: {
      fill: L(
        'course exams: January and June\ntrip: book by March',
        'egzaminy z kursu: styczeń i czerwiec\nwyjazd: rezerwacja do marca',
      ),
    },
  },
  'month-left': {
    calendar: {
      fill: {
        '2': L('dentist 8:30', 'dentysta 8:30'),
        '7': L('course', 'kurs'),
        '9': L('rent', 'czynsz'),
        '14': L('course', 'kurs'),
        '17': L('grandma', 'babcia'),
        '21': L('course', 'kurs'),
        '24': L('flat viewing', 'oglądanie mieszkania'),
        '28': L('course test', 'kolokwium'),
      },
      note: L('fixed dates first', 'najpierw stałe terminy'),
      noteAt: 'bottom-right',
    },
    goals: {
      fill: {
        items: [
          L('Find two flats to view', 'Znaleźć dwa mieszkania do obejrzenia'),
          L('Run three times a week', 'Biegać trzy razy w tygodniu'),
          L('Prepare for the course test', 'Przygotować się do kolokwium'),
        ],
        done: [0],
      },
    },
  },
  'month-right': {
    dates: {
      fill: L('9: rent\n17: grandma\n28: course test', '9: czynsz\n17: babcia\n28: kolokwium'),
    },
    todo: {
      fill: {
        items: [
          L('Renew bus pass', 'Odnowić bilet miesięczny'),
          L('Book the car service', 'Umówić serwis auta'),
          L("Buy Kasia's present", 'Kupić prezent dla Kasi'),
          L('Sort old clothes', 'Przejrzeć stare ubrania'),
          L('Call the landlord', 'Zadzwonić do właściciela'),
        ],
        done: [0, 2],
      },
      note: L('small tasks that have no fixed day', 'drobne sprawy bez stałego dnia'),
      noteAt: 'bottom-right',
    },
    notes: {
      fill: L('flats: max. 25 min to work, 2 rooms', 'mieszkania: maks. 25 min do pracy, 2 pokoje'),
    },
  },
  'week-left': {
    // The outer column is narrow: short entries, no notes.
    priorities: {
      fill: {
        items: [
          L('Chapter 4', 'Rozdział 4'),
          L('2 viewings', '2 oglądania'),
          L('Run 3×', 'Bieganie 3×'),
        ],
        done: [1],
      },
    },
    remember: {
      fill: L('Wed: early\nmeeting', 'śr.: wczesne\nspotkanie'),
    },
    mon: { fill: { text: L('run 7:00\nread chapter 4 (1/2)', 'bieganie 7:00\nrozdział 4 (1/2)') } },
    tue: {
      fill: {
        text: L('call two agencies\ncourse 18:00', 'telefon do dwóch biur\nkurs 18:00'),
      },
    },
    wed: {
      fill: { text: L('team meeting 8:00\nrun', 'spotkanie zespołu 8:00\nbieganie') },
      note: L('a few words per day are enough', 'kilka słów na dzień wystarczy'),
      noteAt: 'bottom-right',
    },
  },
  'week-right': {
    thu: { fill: { text: L('read chapter 4 (2/2)', 'rozdział 4 (2/2)') } },
    fri: { fill: { text: L('pizza with Kasia 19:00', 'pizza z Kasią 19:00') } },
    sat: {
      fill: {
        text: L(
          'flat viewing 11:00\nrun in the park',
          'oglądanie mieszkania 11:00\nbieganie w parku',
        ),
      },
    },
    sun: { fill: { text: L('grandma, plan the week', 'babcia, plan tygodnia') } },
    todo: {
      fill: {
        items: [L('Pay rent', 'Czynsz'), L('Library', 'Biblioteka'), L('Groceries', 'Zakupy')],
        done: [0, 2],
      },
    },
    notes: {
      fill: L('Sat flat: bright,\nbut noisy', 'sob.: jasne,\nale głośno'),
    },
  },
  notes: {
    notes: {
      fill: L(
        'Course test topics:\n- chapters 3–5\n- the case study',
        'Na kolokwium:\n- rozdziały 3–5\n- studium przypadku',
      ),
      note: L('free notes on a 5 mm dot grid', 'wolne notatki na kropkach co 5 mm'),
      noteAt: 'bottom-right',
    },
  },
};

/** What to fill in on each page and why: the text of the printed guide. */
export const GUIDES: Record<string, LocalizedText> = {
  cover: L(
    'The title page: write your name if you like. The start date is printed from the planner settings, or left blank for a planner without dates.',
    'Strona tytułowa: wpisz swoje imię, jeśli chcesz. Data początku drukuje się z ustawień planera albo zostaje pusta w planerze bez dat.',
  ),
  year: L(
    'Once, at the start: up to five goals for the year, ticked off as you reach them, and what you want to remember. The dot grid is for anything that belongs to the whole year, such as exam dates or a trip to book.',
    'Raz, na początku: najwyżej pięć celów na rok, odhaczanych, gdy je osiągniesz, i to, o czym chcesz pamiętać. Kropki są na wszystko, co dotyczy całego roku, np. terminy egzaminów czy wyjazd do zarezerwowania.',
  ),
  'month-left': L(
    'The month opens with its calendar: put fixed dates in first (appointments, payments, birthdays). Then up to three goals for the month, ticked off as you go.',
    'Miesiąc otwiera kalendarz: najpierw wpisz stałe terminy (wizyty, płatności, urodziny). Potem najwyżej trzy cele na miesiąc, odhaczane na bieżąco.',
  ),
  'month-right': L(
    'Important dates to keep in view, a to-do list for tasks that have no fixed day, and notes for the month. Move what is left over to the next month instead of rewriting the whole list.',
    'Ważne daty, które chcesz mieć przed oczami, lista zadań bez stałego dnia i notatki na miesiąc. To, co zostanie, przenieś na następny miesiąc zamiast przepisywać całą listę.',
  ),
  'week-left': L(
    'The week spread, filled in on Sunday or Monday. The outer column holds the three things that make the week good and what to remember; each day gets a few lines for appointments and tasks.',
    'Rozkładówka tygodnia, wypełniana w niedzielę lub poniedziałek. W zewnętrznej kolumnie trzy sprawy, dzięki którym tydzień będzie dobry, i to, o czym pamiętać; każdy dzień ma kilka linii na terminy i zadania.',
  ),
  'week-right': L(
    'Thursday to Sunday, with a to-do list for the week and notes in the outer column. At the end of the week, tick what is done and carry the rest over.',
    'Czwartek–niedziela, a w zewnętrznej kolumnie lista zadań na tydzień i notatki. Na koniec tygodnia odhacz zrobione, a resztę przenieś dalej.',
  ),
  notes: L(
    'A page of 5 mm dots at the end of each month: notes, lists, sketches, whatever does not fit elsewhere.',
    'Strona kropek co 5 mm na koniec każdego miesiąca: notatki, listy, szkice, wszystko, co nie mieści się gdzie indziej.',
  ),
};
