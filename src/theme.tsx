/**
 * JSON Resume theme entry point: `render(resume)` returns a complete,
 * self-contained HTML document (CSS and fonts inlined, no network requests).
 * Built to lib/index.js by vite.theme.config.ts.
 */
import "@fontsource-variable/eb-garamond/wght.css";
import "@fontsource-variable/eb-garamond/wght-italic.css";
import "./index.css";

import { renderToStaticMarkup } from "react-dom/server";
import { Resume } from "./components/resume";
import { parseResume } from "./schema";

// Replaced with the bundled CSS (fonts inlined as data URIs) at build time.
const css = "__THEME_CSS__";

export function render(resume: unknown): string {
  const data = parseResume(resume);

  return (
    "<!doctype html>" +
    renderToStaticMarkup(
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{data.basics.name}</title>
          <style dangerouslySetInnerHTML={{ __html: css }} />
        </head>
        <body>
          <div id="root">
            <Resume resume={data} />
          </div>
        </body>
      </html>
    )
  );
}

/** Options for tools that print themes to PDF (e.g. `resumed export`). */
export const pdfRenderOptions = {
  format: "A4",
  preferCSSPageSize: true,
  printBackground: true,
  mediaType: "print",
};
