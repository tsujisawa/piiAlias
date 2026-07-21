import { describe, expect, it } from "vitest";
import { detectAddress } from "./address";

describe("detectAddress", () => {
  it("detects an address starting with a prefecture", () => {
    const matches = detectAddress("住所は東京都渋谷区渋谷1-2-3です。");
    expect(matches.map((m) => m.text)).toContain("東京都渋谷区渋谷1-2-3");
  });

  it("includes a leading postal code when present", () => {
    const matches = detectAddress("〒150-0002 東京都渋谷区渋谷1-2-3");
    expect(matches[0]?.text).toBe("〒150-0002 東京都渋谷区渋谷1-2-3");
  });

  it("detects an address starting with a municipality when a prefecture is omitted", () => {
    const matches = detectAddress("住所は渋谷区渋谷1-2-3です。");
    expect(matches.map((m) => m.text)).toContain("渋谷区渋谷1-2-3");
  });

  it("does not treat a bare municipality mention without a street number as an address", () => {
    const matches = detectAddress("渋谷区は再開発が進んでいる。");
    expect(matches).toHaveLength(0);
  });
});
