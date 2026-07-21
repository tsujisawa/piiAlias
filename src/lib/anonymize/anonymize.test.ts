import { describe, expect, it } from "vitest";
import { anonymizeText, excludeKey } from "./anonymize";

describe("anonymizeText", () => {
  it("assigns sequential labels per category in order of appearance", () => {
    const input = "株式会社山田商事と株式会社鈴木物産に応募しました。";
    const { output, mapping } = anonymizeText(input);
    expect(output).toBe("会社名Aと会社名Bに応募しました。");
    expect(mapping).toEqual([
      { category: "company", original: "株式会社山田商事", label: "会社名A" },
      { category: "company", original: "株式会社鈴木物産", label: "会社名B" },
    ]);
  });

  it("reuses the same label for a repeated occurrence of the same text", () => {
    const input = "株式会社山田商事に入社し、株式会社山田商事で3年勤務した。";
    const { output, mapping } = anonymizeText(input);
    expect(output).toBe("会社名Aに入社し、会社名Aで3年勤務した。");
    expect(mapping).toHaveLength(1);
  });

  it("anonymizes multiple categories within one text", () => {
    const input = "氏名：山田太郎 早稲田大学を卒業し、株式会社山田商事に入社。";
    const { output, mapping } = anonymizeText(input);
    expect(output).toContain("人物A");
    expect(output).toContain("A大学");
    expect(output).toContain("会社名A");
    expect(mapping.map((m) => m.category).sort()).toEqual(["company", "person", "university"]);
  });

  it("excludes a match when its key is passed in excludedKeys", () => {
    const input = "株式会社山田商事に応募しました。";
    const key = excludeKey({ category: "company", text: "株式会社山田商事" });

    const { output, mapping } = anonymizeText(input, new Set([key]));
    expect(output).toBe(input);
    expect(mapping).toHaveLength(0);
  });

  it("returns the input unchanged when nothing matches", () => {
    const input = "これは何も検出されないただのテキストです。";
    const { output, mapping } = anonymizeText(input);
    expect(output).toBe(input);
    expect(mapping).toHaveLength(0);
  });
});
