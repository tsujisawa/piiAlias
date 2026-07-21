import type { CategoryMatch } from "../types";
import { matchAllToCategoryMatches } from "./utils";

// 「性別」ラベルの直後に限定して検出する（単独の「男性」「女性」は一般文脈でも頻出し誤検出リスクが高いため）
const GENDER_RE = /性別\s*[:：]\s*(男性|女性|男|女)/g;

export function detectGender(text: string): CategoryMatch[] {
  return matchAllToCategoryMatches(text, GENDER_RE, "gender", 1);
}
