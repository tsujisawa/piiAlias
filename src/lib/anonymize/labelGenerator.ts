import type { CategoryId } from "./types";

// 1-based: 1->A, 2->B, ..., 26->Z, 27->AA, 28->AB, ...
export function toAlphaLabel(n: number): string {
  let s = "";
  let remaining = n;
  while (remaining > 0) {
    const rem = (remaining - 1) % 26;
    s = String.fromCharCode(65 + rem) + s;
    remaining = Math.floor((remaining - 1) / 26);
  }
  return s;
}

export function buildLabel(category: CategoryId, n: number): string {
  const letter = toAlphaLabel(n);
  switch (category) {
    case "company":
      return `会社名${letter}`;
    case "person":
      return `人物${letter}`;
    case "university":
      return `${letter}大学`;
    case "highschool":
      return `${letter}高校`;
    case "vocationalSchool":
      return `${letter}専門学校`;
    case "juniorHighSchool":
      return `${letter}中学校`;
    case "elementarySchool":
      return `${letter}小学校`;
    case "birthdate":
      return `生年月日${letter}`;
    case "address":
      return `住所${letter}`;
    case "phoneNumber":
      return `電話番号${letter}`;
    case "email":
      return `メールアドレス${letter}`;
    case "gender":
      return `性別${letter}`;
    case "age":
      return `年齢${letter}`;
  }
}
