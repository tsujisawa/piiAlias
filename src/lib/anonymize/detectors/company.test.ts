import { describe, expect, it } from "vitest";
import { detectCompany } from "./company";

describe("detectCompany", () => {
  it("detects prefixed company names", () => {
    const matches = detectCompany("株式会社山田商事に応募しました。");
    expect(matches.map((m) => m.text)).toContain("株式会社山田商事");
  });

  it("detects suffixed company names (including current employer)", () => {
    const matches = detectCompany("現在は山田商事株式会社に勤務しています。");
    expect(matches.map((m) => m.text)).toContain("山田商事株式会社");
  });

  it("detects other corporate prefixes", () => {
    const matches = detectCompany("有限会社鈴木工務店で働いていました。");
    expect(matches.map((m) => m.text)).toContain("有限会社鈴木工務店");
  });

  it("stops at punctuation delimiters", () => {
    const matches = detectCompany("勤務先は株式会社ABC、以上です。");
    const abcMatch = matches.find((m) => m.text.startsWith("株式会社"));
    expect(abcMatch?.text).toBe("株式会社ABC");
  });

  it("detects non-company corporate forms", () => {
    expect(detectCompany("一般社団法人日本協会に所属。").map((m) => m.text)).toContain(
      "一般社団法人日本協会",
    );
    expect(detectCompany("公益財団法人未来財団に勤務。").map((m) => m.text)).toContain(
      "公益財団法人未来財団",
    );
    expect(detectCompany("特定非営利活動法人向日葵で活動。").map((m) => m.text)).toContain(
      "特定非営利活動法人向日葵",
    );
    expect(detectCompany("NPO法人青空の理事を務める。").map((m) => m.text)).toContain(
      "NPO法人青空",
    );
    expect(detectCompany("医療法人光会に勤務。").map((m) => m.text)).toContain(
      "医療法人光会",
    );
    expect(detectCompany("学校法人明治学園を運営。").map((m) => m.text)).toContain(
      "学校法人明治学園",
    );
  });
});
