import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { build } from "vite";
import { beforeAll, describe, expect, it } from "vitest";

// Build the real theme bundle (as `pnpm build:theme` does) and test its output.
// The output lives under node_modules so the bundle can resolve its dependencies.
const outDir = new URL("../node_modules/.tmp/theme-test/", import.meta.url);

type Theme = typeof import("./theme");
let theme: Theme;

const resume = JSON.parse(
  readFileSync(new URL("./assets/resume.json", import.meta.url), "utf8")
);

beforeAll(async () => {
  await build({
    configFile: new URL("../vite.theme.config.ts", import.meta.url).pathname,
    build: { outDir: outDir.pathname },
    logLevel: "silent",
  });
  theme = await import(/* @vite-ignore */ pathToFileURL(`${outDir.pathname}index.js`).href);
}, 30_000);

describe("built theme", () => {
  it("renders a complete HTML document", () => {
    const html = theme.render(resume);
    expect(html.startsWith("<!doctype html><html lang=\"en\">")).toBe(true);
    expect(html).toContain("<title>John Walley</title>");
    expect(html).toMatch(/<h1[^>]*>John Walley<\/h1>/);
    expect(html).toMatch(/<h2[^>]*>Experience<\/h2>/);
  });

  it("is self-contained: CSS and fonts inlined, no external resources", () => {
    const html = theme.render(resume);
    expect(html).not.toContain("__THEME_CSS__");
    expect(html).toMatch(/<style>[\s\S]*@page[\s\S]*<\/style>/);
    expect(html).toContain("url(data:font/woff2;base64,");
    expect(html).not.toMatch(/<(link|script)\b/);
    expect(html).not.toContain("fonts.googleapis.com");
  });

  it("omits sections that a minimal resume doesn't have", () => {
    const html = theme.render({ basics: { name: "Ada Lovelace" } });
    expect(html).toMatch(/<h1[^>]*>Ada Lovelace<\/h1>/);
    expect(html).not.toMatch(/<h2/);
  });

  it("throws a readable error for an invalid resume", () => {
    expect(() => theme.render({ basics: {} })).toThrow(/basics\.name/);
  });

  it("exports A4 PDF options", () => {
    expect(theme.pdfRenderOptions).toMatchObject({ format: "A4" });
  });
});
