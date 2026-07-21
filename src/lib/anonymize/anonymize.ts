import { detectAddress } from "./detectors/address";
import { detectAge } from "./detectors/age";
import { detectBirthdate } from "./detectors/birthdate";
import { detectCompany } from "./detectors/company";
import { detectEmail } from "./detectors/email";
import { detectGender } from "./detectors/gender";
import { detectPerson } from "./detectors/person";
import { detectPhoneNumber } from "./detectors/phoneNumber";
import {
  detectElementarySchool,
  detectHighschool,
  detectJuniorHighSchool,
  detectUniversity,
  detectVocationalSchool,
} from "./detectors/school";
import { buildLabel } from "./labelGenerator";
import { resolveOverlaps } from "./overlap";
import type { AnonymizeResult, CategoryMatch, MappingEntry } from "./types";

export function excludeKey(match: Pick<CategoryMatch, "category" | "text">): string {
  return `${match.category}:${match.text}`;
}

export function anonymizeText(
  input: string,
  excludedKeys: Set<string> = new Set(),
): AnonymizeResult {
  const isExcluded = (m: CategoryMatch) => excludedKeys.has(excludeKey(m));

  const structuralMatches: CategoryMatch[] = [
    ...detectCompany(input),
    ...detectUniversity(input),
    ...detectHighschool(input),
    ...detectVocationalSchool(input),
    ...detectJuniorHighSchool(input),
    ...detectElementarySchool(input),
    ...detectAddress(input),
    ...detectEmail(input),
    ...detectPhoneNumber(input),
    ...detectBirthdate(input),
    ...detectAge(input),
    ...detectGender(input),
  ].filter((m) => !isExcluded(m));

  const resolvedStructural = resolveOverlaps(structuralMatches);

  // 人名検出は他カテゴリが既に確保した区間を避けることで、会社名内の姓などの誤検出を防ぐ
  const personMatches = detectPerson(input)
    .filter((m) => !isExcluded(m))
    .filter((p) => !resolvedStructural.some((s) => p.start < s.end && s.start < p.end));

  const allMatches = resolveOverlaps([...resolvedStructural, ...personMatches]);

  return buildOutput(input, allMatches);
}

function buildOutput(input: string, matches: CategoryMatch[]): AnonymizeResult {
  const labelByCategoryAndText = new Map<string, Map<string, string>>();
  const counters = new Map<string, number>();
  const mapping: MappingEntry[] = [];

  let output = "";
  let cursor = 0;
  for (const m of matches) {
    output += input.slice(cursor, m.start);

    const textToLabel = labelByCategoryAndText.get(m.category) ?? new Map<string, string>();
    labelByCategoryAndText.set(m.category, textToLabel);

    let label = textToLabel.get(m.text);
    if (!label) {
      const n = (counters.get(m.category) ?? 0) + 1;
      counters.set(m.category, n);
      label = buildLabel(m.category, n);
      textToLabel.set(m.text, label);
      mapping.push({ category: m.category, original: m.text, label });
    }
    output += label;
    cursor = m.end;
  }
  output += input.slice(cursor);

  return { output, mapping };
}
