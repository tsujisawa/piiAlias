import type { CategoryMatch } from "../types";
import { matchAllToCategoryMatches } from "./utils";

const EMAIL_RE = /[\w.+-]+@[\w-]+\.[\w.-]+/g;

export function detectEmail(text: string): CategoryMatch[] {
  return matchAllToCategoryMatches(text, EMAIL_RE, "email");
}
