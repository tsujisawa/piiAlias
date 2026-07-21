import { JP_NAME_CHAR, PROPER_NOUN_CHAR } from "../constants";
import type { CategoryMatch } from "../types";
import { matchAllToCategoryMatches } from "./utils";

// 「大学」「高校」等の裸の単体語だけで誤マッチしないよう、前置1文字以上を必須にする
const UNIVERSITY_RE = new RegExp(`${PROPER_NOUN_CHAR}{1,15}大学(?:院)?`, "g");
const HIGHSCHOOL_RE = new RegExp(`${PROPER_NOUN_CHAR}{1,15}(?:高等学校|高校)`, "g");
const VOCATIONAL_RE = new RegExp(`${PROPER_NOUN_CHAR}{1,20}(?:専門学校|専修学校)`, "g");
const JUNIOR_HIGH_RE = new RegExp(`${PROPER_NOUN_CHAR}{1,15}中学校`, "g");
// 小学校名はひらがな名（「さくら小学校」等）が多いためJP_NAME_CHAR(ひらがな込み)を使う。
// ただし「私はさくら小学校」のように直前の助詞まで飲み込むリスクが上がるため、
// 他の学校種別より文字数上限を短くして被害範囲を抑える。
const ELEMENTARY_RE = new RegExp(`${JP_NAME_CHAR}{1,8}小学校`, "g");

export function detectUniversity(text: string): CategoryMatch[] {
  return matchAllToCategoryMatches(text, UNIVERSITY_RE, "university");
}

export function detectHighschool(text: string): CategoryMatch[] {
  return matchAllToCategoryMatches(text, HIGHSCHOOL_RE, "highschool");
}

export function detectVocationalSchool(text: string): CategoryMatch[] {
  return matchAllToCategoryMatches(text, VOCATIONAL_RE, "vocationalSchool");
}

export function detectJuniorHighSchool(text: string): CategoryMatch[] {
  return matchAllToCategoryMatches(text, JUNIOR_HIGH_RE, "juniorHighSchool");
}

export function detectElementarySchool(text: string): CategoryMatch[] {
  return matchAllToCategoryMatches(text, ELEMENTARY_RE, "elementarySchool");
}
