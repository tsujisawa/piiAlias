import { describe, expect, it } from "vitest";
import { detectEmail } from "./email";

describe("detectEmail", () => {
  it("detects a standard email address", () => {
    const matches = detectEmail("連絡先: taro.yamada@example.com です。");
    expect(matches.map((m) => m.text)).toContain("taro.yamada@example.com");
  });
});
