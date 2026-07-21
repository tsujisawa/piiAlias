import type { CategoryMatch } from "../types";
import { matchAllToCategoryMatches } from "./utils";

const AGE_RE = /\d{1,3}歳/g;

export function detectAge(text: string): CategoryMatch[] {
  return matchAllToCategoryMatches(text, AGE_RE, "age");
}
