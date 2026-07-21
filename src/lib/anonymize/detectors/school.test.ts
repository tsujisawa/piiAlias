import { describe, expect, it } from "vitest";
import {
  detectElementarySchool,
  detectHighschool,
  detectJuniorHighSchool,
  detectUniversity,
  detectVocationalSchool,
} from "./school";

describe("detectUniversity", () => {
  it("detects university names", () => {
    const matches = detectUniversity("早稲田大学を卒業しました。");
    expect(matches.map((m) => m.text)).toContain("早稲田大学");
  });
});

describe("detectHighschool", () => {
  it("prefers the longer 高等学校 suffix over 高校", () => {
    const matches = detectHighschool("開成高等学校に在籍していました。");
    expect(matches.map((m) => m.text)).toContain("開成高等学校");
  });

  it("detects the short 高校 suffix", () => {
    const matches = detectHighschool("開成高校に在籍していました。");
    expect(matches.map((m) => m.text)).toContain("開成高校");
  });
});

describe("detectVocationalSchool", () => {
  it("detects vocational school names", () => {
    const matches = detectVocationalSchool("東京IT専門学校を卒業。");
    expect(matches.map((m) => m.text)).toContain("東京IT専門学校");
  });
});

describe("detectJuniorHighSchool", () => {
  it("detects junior high school names", () => {
    const matches = detectJuniorHighSchool("市立第一中学校に通っていました。");
    expect(matches.map((m) => m.text)).toContain("市立第一中学校");
  });
});

describe("detectElementarySchool", () => {
  it("detects elementary school names", () => {
    const matches = detectElementarySchool("桜丘小学校の出身です。");
    expect(matches.map((m) => m.text)).toContain("桜丘小学校");
  });

  it("detects elementary school names written in hiragana", () => {
    const matches = detectElementarySchool("さくら小学校の出身です。");
    expect(matches.map((m) => m.text)).toContain("さくら小学校");
  });
});
