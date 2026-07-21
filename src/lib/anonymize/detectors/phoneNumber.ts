import type { CategoryMatch } from "../types";
import { matchAllToCategoryMatches } from "./utils";

// ハイフンあり(0X0-XXXX-XXXX等)とハイフンなし(0始まり10-11桁)の両方に対応
const PHONE_RE = /0\d{1,4}-\d{1,4}-\d{3,4}|0\d{9,10}/g;

export function detectPhoneNumber(text: string): CategoryMatch[] {
  return matchAllToCategoryMatches(text, PHONE_RE, "phoneNumber");
}
