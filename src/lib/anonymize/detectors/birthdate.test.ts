import { describe, expect, it } from "vitest";
import { detectBirthdate } from "./birthdate";

describe("detectBirthdate", () => {
  it("detects a western-calendar date near a context keyword", () => {
    const matches = detectBirthdate("生年月日: 1990年5月1日");
    expect(matches.map((m) => m.text)).toContain("1990年5月1日");
  });

  it("detects a japanese-era (wareki) date near a context keyword", () => {
    const matches = detectBirthdate("生年月日: 昭和63年5月1日");
    expect(matches.map((m) => m.text)).toContain("昭和63年5月1日");
  });

  it("detects a plausible birth-year date even without a context keyword", () => {
    const matches = detectBirthdate("1990年5月1日に生まれ、現在に至る。");
    expect(matches.map((m) => m.text)).toContain("1990年5月1日");
  });

  it("does not flag an implausible year as a birthdate without context", () => {
    const matches = detectBirthdate("提出期限は2024年5月1日です。");
    expect(matches.map((m) => m.text)).not.toContain("2024年5月1日");
  });
});
