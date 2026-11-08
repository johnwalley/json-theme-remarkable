import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { PartialDateSchema, parseResume } from "./schema";

describe("PartialDateSchema", () => {
  it.each([
    ["2004", { kind: "year", year: 2004 }],
    ["2025-06", { kind: "year-month", year: 2025, month: 6 }],
    ["2025-12", { kind: "year-month", year: 2025, month: 12 }],
    ["2025-06-15", { kind: "year-month", year: 2025, month: 6 }],
  ])("parses %s", (input, expected) => {
    expect(PartialDateSchema.parse(input)).toEqual(expected);
  });

  it.each(["2025-00", "2025-13", "2025-6", "25", "2025-06-32", "June 2025", ""])(
    "rejects %j",
    (input) => {
      expect(PartialDateSchema.safeParse(input).success).toBe(false);
    }
  );
});

describe("parseResume", () => {
  it("accepts the real resume.json", () => {
    const json = JSON.parse(
      readFileSync(new URL("./assets/resume.json", import.meta.url), "utf8")
    );
    expect(() => parseResume(json)).not.toThrow();
  });

  it("accepts a minimal resume and fills in empty sections", () => {
    const resume = parseResume({ basics: { name: "Ada Lovelace" } });
    expect(resume.basics.profiles).toEqual([]);
    expect(resume.work).toEqual([]);
    expect(resume.skills).toEqual([]);
    expect(resume.education).toEqual([]);
  });

  it("lists every problem by path", () => {
    expect(() =>
      parseResume({
        basics: { name: "Ada", email: "nope" },
        work: [{ name: "Analytical Engine", startDate: "1843-13" }],
      })
    ).toThrow(/basics\.email: Invalid email[\s\S]*work\.0\.startDate: Expected a date/);
  });
});
