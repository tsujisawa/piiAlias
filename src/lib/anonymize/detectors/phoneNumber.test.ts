import { describe, expect, it } from "vitest";
import { detectPhoneNumber } from "./phoneNumber";

describe("detectPhoneNumber", () => {
  it("detects a hyphenated mobile phone number", () => {
    const matches = detectPhoneNumber("連絡先: 090-1234-5678");
    expect(matches.map((m) => m.text)).toContain("090-1234-5678");
  });

  it("detects a non-hyphenated phone number", () => {
    const matches = detectPhoneNumber("連絡先: 09012345678");
    expect(matches.map((m) => m.text)).toContain("09012345678");
  });
});
