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
- **Routing:** File-based under `src/app`. All routes serve the same path regardless of language — no `/en/...` prefix. Spanish slugs are canonical (`/`, `/aniversario`, `/codigo-conducta`, `/terminos`, `/patrocinadores`, `/aniversario/patrocinadores`).
- **Language Control:** Handled client-side via `LangProvider` (`src/lib/LangProvider.tsx`). An inline `<head>` script (`strategy="beforeInteractive"`) reads the `playasontech_lang` cookie, falls back to `navigator.languages`, then defaults to `"es"`. It sets `data-lang` and `lang` on `<html>` synchronously before paint. React hydrates reading `data-lang` — no flash, no loading state.
- **Client Behavior:** Components are server-rendered by default. Browser-only logic/effects use `"use client"`. Clean up listeners/observers to support React Strict Mode. Bilingual content components use the `useLang()` hook from `LangProvider` instead of a `lang` prop.
- **Styling:** Tailwind CSS with custom theme tokens. Custom animations and effects are in `src/app/globals.css`.
- **Content:** Each section component owns its copy in a local `COPY = { es: ..., en: ... }` constant. The `Lang` type and constants live in `src/i18n/lang.ts`.
- **Assets:** Stored in `public/` (referenced as `/assets/...`).

## Deploying

`npm run deploy-ci` pushes local commits, triggers the GitHub Actions build/deploy workflow, and verifies the online status of the static export on the `gh-pages` branch.

## Conventions

- Site is bilingual (`es` / `en`). Spanish is the default; English is added in parallel — every visible string lives in a `COPY` map keyed by locale and is referenced via the `useLang()` hook. When you add or change Spanish copy, add or change the English counterpart in the same edit.
- `npm run build` must pass (type-check and lint) before opening a PR.
- Branch from `main` per feature.
- **Always use Next.js `<Link>` component instead of standard `<a>` tags for internal navigation.**
- **Never push to `main` or deploy without explicit approval.**
- **Never use `--force` on any git command** (no `git push --force`, no `--force-with-lease`, no `git reset --hard` on shared branches, etc.).
- **Deploys are only authorized by Kevin.** Even with general approval to push, do not run `npm run deploy-ci` or trigger the GitHub Actions deploy workflow unless Kevin has explicitly authorized that specific deploy.
