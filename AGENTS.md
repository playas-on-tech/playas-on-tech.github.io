# AGENTS.md

Guidance for agents working in this repository.

## Commands

```bash
npm install
npm run dev        # Dev server (http://localhost:3000)
npm run build      # Static export (./out)
npm run lint       # ESLint
npm run deploy-ci  # Deploy static export to GitHub Pages
```

## Architecture

- **Stack:** Next.js (App Router), TypeScript, Tailwind CSS. Fully static export (`output: 'export'`).
- **Routing:** File-based under `src/app`. Spanish (default) lives in the `(es)` route group at URL root (`/`, `/aniversario`, etc.); English mirrors under `/en/...`. Each locale has its own root layout so `<html lang>` and metadata are correct per page.
- **Client Behavior:** Components are server-rendered by default. Browser-only logic/effects use `"use client"`. Clean up listeners/observers to support React Strict Mode.
- **Styling:** Tailwind CSS with custom theme tokens. Custom animations and effects are in `src/app/globals.css`.
- **Content:** Each section component owns its copy in a local `COPY = { es: ..., en: ... }` constant and accepts a `lang?: Lang` prop (defaults to `"es"`). The `Lang` type and `altLangHref` helper live in `src/i18n/lang.ts`.
- **Assets:** Stored in `public/` (referenced as `/assets/...`).

## Deploying

`npm run deploy-ci` pushes local commits, triggers the GitHub Actions build/deploy workflow, and verifies the online status of the static export on the `gh-pages` branch.

## Conventions

- Site is bilingual (`es` / `en`). Spanish is the default; English is added in parallel — every visible string lives in a `COPY` map keyed by locale and is referenced via the component's `lang` prop. When you add or change Spanish copy, add or change the English counterpart in the same edit.
- `npm run build` must pass (type-check and lint) before opening a PR.
- Branch from `main` per feature.
- **Always use Next.js `<Link>` component instead of standard `<a>` tags for internal navigation.**
- **Never push to `main` or deploy without explicit approval.**
- **Never use `--force` on any git command** (no `git push --force`, no `--force-with-lease`, no `git reset --hard` on shared branches, etc.).
- **Deploys are only authorized by Kevin.** Even with general approval to push, do not run `npm run deploy-ci` or trigger the GitHub Actions deploy workflow unless Kevin has explicitly authorized that specific deploy.
