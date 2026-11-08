# jsonresume-theme-remarkable

A personal CV/resume site. Resume content lives in a [JSON Resume](https://jsonresume.org/) document and is rendered to HTML by a small React + Vite app. The output is styled for A4 and can be printed to PDF straight from the browser.

## How it works

- `src/assets/resume.json` — the source of truth. Edit this to change CV content.
- `src/schema.ts` — Zod schema for the resume (a partial JSON Resume schema covering `basics`, `work`, `skills`, and `education`, plus a custom `PartialDate` that accepts `YYYY` or `YYYY-MM`).
- `vite.config.ts` — a small plugin validates `resume.json` against the schema at build time and serves the result as `virtual:resume`. Invalid data fails `pnpm build` and shows the error overlay in `pnpm dev`; Zod is not shipped to the browser.
- `src/components/resume.tsx` — top-level layout: hero, summary, experience, skills, education.
- `src/components/resume.module.css` — A4 page sizing (`@page { size: A4; margin: 18mm }`) and print-specific tweaks (hides link underlines, avoids breaks after headings).

## Scripts

```sh
pnpm install
pnpm dev       # local dev server with HMR
pnpm build     # type-check (tsc -b) and produce a production build in dist/
pnpm preview   # serve the built output
pnpm pdf       # build and print to dist/<Name>-CV.pdf (or: pnpm pdf path/to/out.pdf)
pnpm lint      # eslint
```

## Producing a PDF

Run `pnpm pdf`. It builds the site, serves it with `vite preview`, and prints it with your installed Google Chrome (via `playwright-core`), using the A4 size and margins from the CSS. The output goes to `dist/<Name>-CV.pdf`, named from `basics.name`.

To print by hand instead: `pnpm dev`, open the site, then Print → Save as PDF with A4 and default margins.

## Stack

React 19, TypeScript, Vite, Zod for build-time schema validation, react-markdown for rich text in highlights/summaries, react-icons for profile links, and EB Garamond self-hosted via Fontsource (no Google Fonts request, so PDFs never print in a fallback font).
