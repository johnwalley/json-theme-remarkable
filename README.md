# jsonresume-theme-remarkable

A personal CV/resume site and [JSON Resume](https://jsonresume.org/) theme. Resume content lives in a JSON Resume document and is rendered to HTML by React components. The output is styled for A4 and prints cleanly to PDF.

The same components are used two ways:

- **The site**: a React + Vite app for editing and printing this CV (`pnpm dev`, `pnpm pdf`).
- **The theme**: `render(resume)` returns a self-contained HTML document for any JSON Resume (`pnpm build:theme` → `lib/index.js`).

## How it works

- `src/assets/resume.json` — the source of truth. Edit this to change CV content.
- `src/schema.ts` — Zod schema for the resume (a partial JSON Resume schema covering `basics`, `work`, `skills`, and `education`, plus a custom `PartialDate` that accepts `YYYY`, `YYYY-MM` or `YYYY-MM-DD`). Fields the layout can do without are optional, and empty sections aren't rendered.
- `vite.config.ts` — a small plugin validates `resume.json` against the schema at build time and serves the result as `virtual:resume`. Invalid data fails `pnpm build` and shows the error overlay in `pnpm dev`; Zod is not shipped to the browser.
- `src/theme.tsx` and `vite.theme.config.ts` — the JSON Resume theme entry point and its build. All CSS, including the fonts as base64 data URIs, is inlined into `lib/index.js`, so the rendered HTML makes no network requests.
- `src/components/resume.tsx` — top-level layout: hero, summary, experience, skills, education.
- `src/components/resume.module.css` — A4 page sizing (`@page { size: A4; margin: 18mm }`) and print-specific tweaks (hides link underlines, avoids breaks after headings).

## Scripts

```sh
pnpm install
pnpm dev       # local dev server with HMR
pnpm build     # type-check (tsc -b) and produce a production build in dist/
pnpm preview   # serve the built output
pnpm pdf       # build and print to dist/<Name>-CV.pdf (or: pnpm pdf path/to/out.pdf)
pnpm build:theme  # build the JSON Resume theme to lib/index.js
pnpm test      # vitest: schema, date/URL formatting, and the built theme
pnpm lint      # eslint
```

## Producing a PDF

Run `pnpm pdf`. It builds the site, serves it with `vite preview`, and prints it with your installed Google Chrome (via `playwright-core`), using the A4 size and margins from the CSS. The output goes to `dist/<Name>-CV.pdf`, named from `basics.name`.

To print by hand instead: `pnpm dev`, open the site, then Print → Save as PDF with A4 and default margins.

## Using the theme

```js
import { render } from "jsonresume-theme-remarkable";

const html = render(resume); // throws a readable error listing invalid fields
```

It also exports `pdfRenderOptions` (A4, CSS page size) for tools that print themes to PDF, and follows the standard theme contract, so it should work with [resumed](https://github.com/rbardini/resumed), e.g. `resumed render resume.json --theme jsonresume-theme-remarkable`. The package is marked `"private": true`; remove that to publish it to npm.

## Stack

React 19, TypeScript, Vite, Zod for build-time schema validation, react-markdown for rich text in highlights/summaries, react-icons for profile links, and EB Garamond self-hosted via Fontsource (no Google Fonts request, so PDFs never print in a fallback font).
