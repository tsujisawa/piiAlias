import { describe, expect, it } from "vitest";
import { detectPerson } from "./person";

describe("detectPerson", () => {
  it("detects a name preceding an honorific", () => {
    const matches = detectPerson("田中太郎様にご案内しました。");
    expect(matches.map((m) => m.text)).toContain("田中太郎");
  });

  it("detects a name labeled with 氏名:", () => {
    const matches = detectPerson("氏名：山田 花子");
    expect(matches.map((m) => m.text)).toContain("山田 花子");
  });

  it("does not swallow a trailing honorific after a labeled name", () => {
    const matches = detectPerson("氏名：山田太郎　様\n性別：男性");
    expect(matches.map((m) => m.text)).toContain("山田太郎");
    expect(matches.map((m) => m.text)).not.toContain("山田太郎　様");
  });

  it("detects a bare name via the common-surname dictionary", () => {
    const matches = detectPerson("田中太郎は営業部に所属していた。");
    expect(matches.map((m) => m.text)).toContain("田中太郎");
  });

  it("does not treat a company-like suffix after a surname as a person", () => {
    const matches = detectPerson("鈴木製作所に勤務していた。");
    expect(matches.map((m) => m.text)).not.toContain("鈴木製作所");
    expect(matches.map((m) => m.text)).not.toContain("鈴木製");
  });
});
