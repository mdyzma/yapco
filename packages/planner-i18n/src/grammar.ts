import type { Locale } from '@planner/schema';

export type PluralForms = Partial<Record<Intl.LDMLPluralRule, string>> & { other: string };

/**
 * Picks the plural form for `n` using CLDR rules. Polish needs one/few/many:
 * 1 dzień, 3 dni, 5 dni; English needs one/other. `{n}` in the chosen form is replaced.
 */
export function plural(locale: Locale, n: number, forms: PluralForms): string {
  const rule = new Intl.PluralRules(locale).select(n);
  return (forms[rule] ?? forms.other).replaceAll('{n}', String(n));
}

export type GrammaticalGender = 'slash' | 'feminine' | 'masculine' | 'neutral';

const GENDER_TOKEN = /\{g:([^|{}]*)\|([^|{}]*)(?:\|([^|{}]*))?\}/g;

/**
 * Both forms, the short way Polish writes them: the masculine form, then the feminine ending
 * ("zauważyłeś/aś", "wdzięczny/a", "sam/a"); a feminine insertion before a shared ending in
 * brackets ("chciał(a)bym"); both in full when they differ too much ("przeszedłem/przeszłam").
 */
export function slashForm(masculine: string, feminine: string): string {
  let common = 0;
  while (
    common < masculine.length &&
    common < feminine.length &&
    masculine[common] === feminine[common]
  )
    common++;
  const mEnd = masculine.slice(common);
  const fEnd = feminine.slice(common);
  if (common < 2 || !fEnd || mEnd.length > 3) return `${masculine}/${feminine}`;
  if (mEnd && fEnd.endsWith(mEnd)) {
    return `${masculine.slice(0, common)}(${fEnd.slice(0, fEnd.length - mEnd.length)})${mEnd}`;
  }
  return `${masculine}/${fEnd}`;
}

/**
 * Resolves gendered wording written as `{g:masculine|feminine}` or
 * `{g:masculine|feminine|neutral}` (§7). "Za co jestem dziś {g:wdzięczny|wdzięczna}?" becomes
 * "wdzięczny/a" in slash mode. Neutral uses the third form when the author gave one, otherwise
 * the slash form.
 */
export function applyGender(text: string, mode: GrammaticalGender): string {
  return text.replace(GENDER_TOKEN, (_, masculine: string, feminine: string, neutral?: string) => {
    switch (mode) {
      case 'masculine':
        return masculine;
      case 'feminine':
        return feminine;
      case 'neutral':
        return neutral ?? slashForm(masculine, feminine);
      default:
        return slashForm(masculine, feminine);
    }
  });
}
