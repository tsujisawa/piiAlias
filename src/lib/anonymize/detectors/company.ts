import { CORPORATE_PREFIXES, PROPER_NOUN_CHAR } from "../constants";
import type { CategoryMatch } from "../types";
import { matchAllToCategoryMatches } from "./utils";

const CORP_ALT = `(?:${CORPORATE_PREFIXES.join("|")})`;

// 前置: 株式会社山田商事
const PREFIXED_RE = new RegExp(`${CORP_ALT}${PROPER_NOUN_CHAR}{1,20}`, "g");
// 後置: 山田商事株式会社（現職の勤務先企業名もこのパターンで拾う）
const SUFFIXED_RE = new RegExp(`${PROPER_NOUN_CHAR}{1,15}${CORP_ALT}`, "g");

export function detectCompany(text: string): CategoryMatch[] {
  return [
    ...matchAllToCategoryMatches(text, PREFIXED_RE, "company"),
    ...matchAllToCategoryMatches(text, SUFFIXED_RE, "company"),
  ];
}
