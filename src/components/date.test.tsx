import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { DateComponent } from "./date";

const render = (date?: Parameters<typeof DateComponent>[0]["date"]) =>
  renderToStaticMarkup(<DateComponent date={date} />);

describe("DateComponent", () => {
  it("renders a year", () => {
    expect(render({ kind: "year", year: 2004 })).toMatch(
      /<time datetime="2004">2004<\/time>/i
    );
  });

  it("renders a month and year with a machine-readable dateTime", () => {
    expect(render({ kind: "year-month", year: 2025, month: 6 })).toMatch(
      /<time datetime="2025-06">June 2025<\/time>/i
    );
  });

  it("renders a missing date as Present", () => {
    expect(render(undefined)).toBe("<span>Present</span>");
  });
});
