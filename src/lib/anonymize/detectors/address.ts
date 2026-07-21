import { KANJI, KATAKANA, PREFECTURES, PROPER_NOUN_CHAR } from "../constants";
import type { CategoryMatch } from "../types";
import { matchAllToCategoryMatches } from "./utils";

const PREF_ALT = `(?:${PREFECTURES.join("|")})`;
// 番地の数字・ハイフンを許容しつつ、ひらがなの助詞（「です」等）は含めないことで
// 貪欲マッチが住所の後に続く文まで飲み込むのを防ぐ。
const ADDRESS_BODY_CHAR = `[${KANJI}${KATAKANA}0-9０-９ー・\\-－]`;
// 郵便番号があれば含め、都道府県から住所本体が続く限りを住所とみなす
const ADDRESS_RE = new RegExp(
  `(?:〒\\s?\\d{3}-?\\d{4}\\s*)?${PREF_ALT}${ADDRESS_BODY_CHAR}{0,40}`,
  "g",
);

// 都道府県名を省略し「〇〇市」「〇〇区」「〇〇町」「〇〇村」から始まる住所。
// 直後に番地相当の数字が続く場合のみマッチさせることで、「渋谷区は~」のような
// 単なる地名の言及を住所として誤検出しないようにする。
const MUNICIPALITY_SUFFIX = "(?:市|区|町|村)";
const MUNICIPALITY_ADDRESS_RE = new RegExp(
  `${PROPER_NOUN_CHAR}{1,8}${MUNICIPALITY_SUFFIX}(?=${ADDRESS_BODY_CHAR}*[0-9０-９])${ADDRESS_BODY_CHAR}{1,30}`,
  "g",
);

export function detectAddress(text: string): CategoryMatch[] {
  return [
    ...matchAllToCategoryMatches(text, ADDRESS_RE, "address"),
    ...matchAllToCategoryMatches(text, MUNICIPALITY_ADDRESS_RE, "address"),
  ];
}
