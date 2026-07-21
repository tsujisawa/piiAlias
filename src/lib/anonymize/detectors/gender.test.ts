import { describe, expect, it } from "vitest";
import { detectGender } from "./gender";

describe("detectGender", () => {
  it("detects a gender value labeled with 性別:", () => {
    const matches = detectGender("性別：男性");
    expect(matches.map((m) => m.text)).toContain("男性");
  });

  it("does not flag a bare occurrence without the 性別 label", () => {
    const matches = detectGender("男性向けの求人です。");
    expect(matches).toHaveLength(0);
  });
});
