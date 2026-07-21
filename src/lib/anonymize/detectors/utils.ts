import type { CategoryId, CategoryMatch } from "../types";

export function matchAllToCategoryMatches(
  text: string,
  regex: RegExp,
  category: CategoryId,
  groupIndex = 0,
): CategoryMatch[] {
  const matches: CategoryMatch[] = [];
  for (const m of text.matchAll(regex)) {
    const matched = m[groupIndex];
    if (matched === undefined || m.index === undefined) continue;
    const groupOffset = m[0].indexOf(matched);
    const start = m.index + (groupOffset === -1 ? 0 : groupOffset);
    matches.push({
      category,
      start,
      end: start + matched.length,
      text: matched,
    });
  }
  return matches;
}
