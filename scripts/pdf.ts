/**
 * Print the built site (dist/) to an A4 PDF using the installed Chrome.
 *
 * Usage: pnpm pdf [output.pdf]
 * Defaults to dist/<Name>-CV.pdf, derived from basics.name in resume.json.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { chromium } from "playwright-core";
import { preview } from "vite";

const resume = JSON.parse(
  readFileSync(new URL("../src/assets/resume.json", import.meta.url), "utf8")
);
const defaultName = `${resume.basics.name.trim().replace(/\s+/g, "-")}-CV.pdf`;
const outPath = resolve(process.argv[2] ?? `dist/${defaultName}`);

const server = await preview({ preview: { port: 0, open: false }, logLevel: "warn" });
const url = server.resolvedUrls?.local[0];
if (!url) throw new Error("Vite preview server did not report a URL");

let browser;
try {
  browser = await chromium.launch({ channel: "chrome" });
} catch (e) {
  await server.close();
  console.error(
    "Could not launch Google Chrome. Install Chrome, or run " +
      "`pnpm exec playwright-core install chromium` and remove `channel` in scripts/pdf.ts.\n"
  );
  throw e;
}

try {
  const page = await browser.newPage();
  await page.emulateMedia({ media: "print", colorScheme: "light" });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate("document.fonts.ready"); // string form: no DOM types in this tsconfig
  // preferCSSPageSize honours `@page { size: A4; margin: ... }` in the CSS.
  await page.pdf({ path: outPath, preferCSSPageSize: true, printBackground: true });
  console.log(`Wrote ${outPath}`);
} finally {
  await browser.close();
  await server.close();
}
