import type { CategoryId, CategoryMatch } from "./types";

// 数値が小さいほど優先（構造的に確度が高いパターンを優先する）
const PRIORITY: Record<CategoryId, number> = {
  company: 0,
  university: 0,
  highschool: 0,
  vocationalSchool: 0,
  juniorHighSchool: 0,
  elementarySchool: 0,
  address: 0,
  email: 0,
  phoneNumber: 1,
  birthdate: 1,
  age: 1,
  gender: 2,
  person: 2,
};

export function resolveOverlaps(matches: CategoryMatch[]): CategoryMatch[] {
  const sorted = [...matches].sort((a, b) => {
    const priorityDiff = PRIORITY[a.category] - PRIORITY[b.category];
    if (priorityDiff !== 0) return priorityDiff;
    const lengthDiff = b.end - b.start - (a.end - a.start);
    if (lengthDiff !== 0) return lengthDiff;
    return a.start - b.start;
  });

  const accepted: CategoryMatch[] = [];
  for (const candidate of sorted) {
    const overlapsExisting = accepted.some(
      (a) => candidate.start < a.end && a.start < candidate.end,
    );
    if (!overlapsExisting) accepted.push(candidate);
  }

  return accepted.sort((a, b) => a.start - b.start);
}
