import { COMMON_SURNAMES, COMPANY_LIKE_SUFFIXES, JP_NAME_CHAR, KANJI, KATAKANA } from "../constants";
import type { CategoryMatch } from "../types";
import { matchAllToCategoryMatches } from "./utils";

// 敬称近接: 山田太郎様 / 田中さん
const HONORIFIC_RE = new RegExp(`(${JP_NAME_CHAR}{2,4})(?:様|さん|氏|殿)`, "g");
// ラベル近接: 氏名: 山田 太郎 / 名前：田中太郎
// 末尾に区切り文字(または行末)を要求することで、後ろに続く別カテゴリの語句
// （例:「氏名：山田太郎 早稲田大学」の「早稲田大学」）まで飲み込まないようにする。
// 2つ目の語が敬称（様/さん/氏/殿）で始まる場合は氏名の一部として取り込まない
// （例:「氏名：山田太郎 様」の「様」）。
const LABELED_RE = new RegExp(
  `(?:氏名|名前)\\s*[:：]\\s*(${JP_NAME_CHAR}{2,8}(?:[\\s　](?!(?:様|さん|氏|殿))${JP_NAME_CHAR}{1,4})?)(?=[\\s　、。,.\\n]|$)`,
  "g",
);

// 頻出苗字辞書マッチ: 敬称・ラベルなしの裸の人名（例:「田中太郎は」）を拾う。
// 名前部分はひらがなの助詞を巻き込まないよう漢字・カタカナのみに限定し、
// 直後が会社名・屋号っぽい語（「〜製作所」等）の場合は人名として扱わない。
const SURNAME_ALT = `(?:${COMMON_SURNAMES.join("|")})`;
const COMPANY_LIKE_SUFFIX_ALT = `(?:${COMPANY_LIKE_SUFFIXES.join("|")})`;
const GIVEN_NAME_CHAR = `[${KANJI}${KATAKANA}]`;
const SURNAME_DICTIONARY_RE = new RegExp(
  `${SURNAME_ALT}(?!${COMPANY_LIKE_SUFFIX_ALT})${GIVEN_NAME_CHAR}{1,3}`,
  "g",
);

export function detectPerson(text: string): CategoryMatch[] {
  return [
    ...matchAllToCategoryMatches(text, HONORIFIC_RE, "person", 1),
    ...matchAllToCategoryMatches(text, LABELED_RE, "person", 1),
    ...matchAllToCategoryMatches(text, SURNAME_DICTIONARY_RE, "person"),
  ];
}
