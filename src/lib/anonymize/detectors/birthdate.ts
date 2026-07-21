import type { CategoryMatch } from "../types";

const CONTEXT_KEYWORDS = /生年月日|生まれ/;

const WAREKI_ERA_START_YEAR: Record<string, number> = {
  明治: 1868,
  大正: 1912,
  昭和: 1926,
  平成: 1989,
  令和: 2019,
};

const WAREKI_RE =
  /(明治|大正|昭和|平成|令和)(元|\d{1,2})年(\d{1,2})月(\d{1,2})日/g;
const SEIREKI_KANJI_RE = /(\d{4})年(\d{1,2})月(\d{1,2})日/g;
const SEIREKI_SLASH_RE = /(\d{4})[/-](\d{1,2})[/-](\d{1,2})/g;

interface DateCandidate {
  start: number;
  end: number;
  text: string;
  year: number;
}

function warekiToYear(era: string, yearStr: string): number {
  const offset = yearStr === "元" ? 1 : parseInt(yearStr, 10);
  return WAREKI_ERA_START_YEAR[era] + offset - 1;
}

function collect(text: string, re: RegExp, yearOf: (m: RegExpMatchArray) => number): DateCandidate[] {
  const results: DateCandidate[] = [];
  for (const m of text.matchAll(re)) {
    if (m.index === undefined) continue;
    results.push({
      start: m.index,
      end: m.index + m[0].length,
      text: m[0],
      year: yearOf(m),
    });
  }
  return results;
}

export function detectBirthdate(text: string): CategoryMatch[] {
  const candidates = [
    ...collect(text, WAREKI_RE, (m) => warekiToYear(m[1], m[2])),
    ...collect(text, SEIREKI_KANJI_RE, (m) => parseInt(m[1], 10)),
    ...collect(text, SEIREKI_SLASH_RE, (m) => parseInt(m[1], 10)),
  ];

  const currentYear = new Date().getFullYear();
  const minPlausibleBirthYear = currentYear - 80;
  const maxPlausibleBirthYear = currentYear - 15;

  const matches: CategoryMatch[] = [];
  for (const c of candidates) {
    const context = text.slice(Math.max(0, c.start - 20), Math.min(text.length, c.end + 10));
    const hasContext = CONTEXT_KEYWORDS.test(context);
    const isPlausibleBirthYear = c.year >= minPlausibleBirthYear && c.year <= maxPlausibleBirthYear;

    if (hasContext || isPlausibleBirthYear) {
      matches.push({ category: "birthdate", start: c.start, end: c.end, text: c.text });
    }
  }
  return matches;
}
