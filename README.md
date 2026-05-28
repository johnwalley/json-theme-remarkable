# jsonresume-theme-remarkable

A personal CV/resume site. Resume content lives in a [JSON Resume](https://jsonresume.org/) document and is rendered to HTML by a small React + Vite app. The output is styled for A4 and can be printed to PDF straight from the browser.

## How it works

- `src/assets/resume.json` — the source of truth. Edit this to change CV content.
- `src/App.tsx` — parses and validates `resume.json` against a Zod schema (a partial JSON Resume schema covering `basics`, `work`, `skills`, and `education`, plus a custom `PartialDate` that accepts `YYYY` or `YYYY-MM`).
- `src/components/resume.tsx` — top-level layout: hero, summary, experience, skills, education.
- `src/components/resume.module.css` — A4 page sizing (`@page { size: A4; margin: 20mm }`) and print-specific tweaks (hides link underlines, avoids breaks after headings).

## Scripts

```sh
pnpm install
pnpm dev       # local dev server with HMR
pnpm build     # type-check (tsc -b) and produce a production build in dist/
pnpm preview   # serve the built output
pnpm lint      # eslint
```

## Producing a PDF

1. `pnpm dev` (or `pnpm build && pnpm preview`).
2. Open the site in the browser.
3. Print → Save as PDF. Use A4, default margins, and enable "Background graphics" if needed.

## Stack

React 19, TypeScript, Vite, Zod for runtime schema validation, react-markdown for rich text in highlights/summaries, react-icons for profile links.
