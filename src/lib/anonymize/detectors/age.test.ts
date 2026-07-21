import { describe, expect, it } from "vitest";
import { detectAge } from "./age";

describe("detectAge", () => {
  it("detects an age expressed as N歳", () => {
    const matches = detectAge("年齢: 30歳");
    expect(matches.map((m) => m.text)).toContain("30歳");
  });
});
