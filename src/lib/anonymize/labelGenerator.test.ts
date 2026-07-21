import { describe, expect, it } from "vitest";
import { buildLabel, toAlphaLabel } from "./labelGenerator";

describe("toAlphaLabel", () => {
  it("converts 1-based numbers to Excel-style column labels", () => {
    expect(toAlphaLabel(1)).toBe("A");
    expect(toAlphaLabel(26)).toBe("Z");
    expect(toAlphaLabel(27)).toBe("AA");
    expect(toAlphaLabel(28)).toBe("AB");
    expect(toAlphaLabel(52)).toBe("AZ");
    expect(toAlphaLabel(53)).toBe("BA");
  });
});

describe("buildLabel", () => {
  it("formats each category with its expected prefix/suffix", () => {
    expect(buildLabel("company", 1)).toBe("会社名A");
    expect(buildLabel("person", 1)).toBe("人物A");
    expect(buildLabel("university", 1)).toBe("A大学");
    expect(buildLabel("highschool", 1)).toBe("A高校");
    expect(buildLabel("vocationalSchool", 1)).toBe("A専門学校");
    expect(buildLabel("juniorHighSchool", 1)).toBe("A中学校");
    expect(buildLabel("elementarySchool", 1)).toBe("A小学校");
    expect(buildLabel("birthdate", 1)).toBe("生年月日A");
    expect(buildLabel("address", 1)).toBe("住所A");
    expect(buildLabel("phoneNumber", 1)).toBe("電話番号A");
    expect(buildLabel("email", 1)).toBe("メールアドレスA");
    expect(buildLabel("gender", 1)).toBe("性別A");
    expect(buildLabel("age", 1)).toBe("年齢A");
  });
});
