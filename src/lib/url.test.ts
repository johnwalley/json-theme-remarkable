import { describe, expect, it } from "vitest";
import { toDisplay, toHref } from "./url";

describe("toHref", () => {
  it("adds https:// to a bare domain", () => {
    expect(toHref("www.walley.org.uk")).toBe("https://www.walley.org.uk");
  });

  it.each(["https://example.com/", "http://example.com", "mailto:a@b.c"])(
    "leaves %s alone",
    (url) => {
      expect(toHref(url)).toBe(url);
    }
  );
});

describe("toDisplay", () => {
  it.each([
    ["https://www.walley.org.uk/", "www.walley.org.uk"],
    ["http://example.com/path", "example.com/path"],
    ["www.walley.org.uk", "www.walley.org.uk"],
  ])("shows %s as %s", (url, expected) => {
    expect(toDisplay(url)).toBe(expected);
  });
});
