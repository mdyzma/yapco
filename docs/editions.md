# Editions of "Dzień po Dniu"

"Dzień po Dniu" / "Day by Day" comes in three editions that scale from the simplest to the most
structured. Each is a preset of modules ([ADR-0010](adr/0010-modules-presets-and-block-variants.md)),
so every element below can still be switched on or off for one planner: when it is made, or
later in the preview's planner settings.

| Edition | Polish | For |
| --- | --- | --- |
| **Basic** | Podstawowy | The simplest planner: priorities and a plan for the day, an evening page of dots with gratitude, a short review each week and month. |
| **Balance** | Balans | Everyday life and wellbeing, with some structure: a check-in and check-out, the evening reflection, "A good life", the Wheel of Life. No addiction or therapy wording. |
| **Recovery Edition** | Terapeutyczny | Recovery from addiction: sobriety days, craving, HALT-B, triggers, the contract and the crisis section; the wellbeing parts are optional. |

## What each edition contains

● on by default · ○ optional module · — not in this edition

| Element | Basic | Balance | Recovery |
| --- | :---: | :---: | :---: |
| **Day, left (morning and day)** | | | |
| Date, quote, three priorities, plan of the day | ● | ● | ● |
| Priorities with "How" and "If it gets hard" | — | ● | ● |
| Check-in: mood, energy, sleep | — | ● | ● |
| Check-in: tension, craving | — | — | ● |
| "Today I take care of myself / protect my sobriety", "Who will I talk to" | — | ● | ● |
| HALT-B | — | ○ | ● |
| **Day, right (evening)** | | | |
| Dots with "What am I grateful for?" at the end, nothing else | ● | — | — |
| Check-out numbers | — | ● mood, tension, energy | ● mood, tension, craving |
| Tick list "What helped me today?" | — | ● | — |
| Tick lists "Trigger today?" and "What protected me?" | — | — | ● |
| "What was hard today? What threatened my sobriety?" | — | — | ● |
| Reflection dots, small victory, gratitude, tomorrow | — | ● | ● |
| "A good life" | — | ● | ○ wellbeing |
| **Week** | | | |
| Week spread: days, three most important things, intention | ● | ● | ● |
| Small experiment | — | ● | ● |
| If–then plan and "What to watch out for" | — | — | ● |
| "My week", short: one sentence, what was good, what to change, dots | ● | — | — |
| "My week": numbers, what helped, wins, pattern, experiment, keep and change | — | ● | — |
| "My week", full: numbers, HALT-B, triggers, what protected me, if–then plan | — | — | ● |
| **Month** | | | |
| Divider, calendar, intention, three things that matter | ● | ● | ● |
| Value of the month and "My month in practice" | — | ● | ○ wellbeing |
| End: one short page, "My month" | ● | — | — |
| End: Wheel of Life | — | ● | ● |
| End: "What did this month show me?" and "Looking ahead" | — | ● | ● |
| End: "My patterns" | — | — | ● |
| **Front and back** | | | |
| Cover and "How to use this planner" | ● | ● | ● |
| "A good start" (agreement, good life, values, strengths…) | — | ● | ○ |
| Therapeutic contract, safety rules, crisis section | — | — | ● |
| Situation analysis (CBT), Day+, Mindfulness, Productivity | ○ | ○ | ○ |

## How the editions are built

| Module | Basic | Balance | Recovery | What it controls |
| --- | :---: | :---: | :---: | --- |
| `start` "A good start" | off | on | off | the front matter pages |
| `recovery` | off | off | on | sobriety, craving, triggers, the contract, safety rules and the crisis section, and recovery wording |
| `halt` HALT-B | off | off | on | the HALT-B check on the day page and in "My week" |
| `wellbeing` "Dobrostan" | off | on | off | "A good life", the value of the month and "My month in practice" |
| `cbt`, `dayplus`, `mindful`, `productivity` | off | off | off | optional pages and blocks in any edition |

Basic is the planner with neither `recovery` nor `wellbeing`: its evening page, "My week" and
month end are pages of their own (`day-right-simple`, `week-review-simple`, `month-simple`), and
the day and week spreads leave out the check-in and the prompts. Balance is `wellbeing` without
`recovery`: neutral wording and lighter reviews that only roll up what its days collect (for
example "What did this month show me?" asks for the biggest win instead of the hardest moment).

The printable guide follows the edition: it shows each edition's own pages with example filling,
and explains them in that edition's words.
