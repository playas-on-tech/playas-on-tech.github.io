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
- **Routing:** File-based under `src/app`.
- **Client Behavior:** Components are server-rendered by default. Browser-only logic/effects use `"use client"`. Clean up listeners/observers to support React Strict Mode.
- **Styling:** Tailwind CSS with custom theme tokens. Custom animations and effects are in `src/app/globals.css`.
- **Content:** Defined as local arrays at the top of components.
- **Assets:** Stored in `public/` (referenced as `/assets/...`).

## Deploying

`npm run deploy-ci` pushes local commits, triggers the GitHub Actions build/deploy workflow, and verifies the online status of the static export on the `gh-pages` branch.

## Conventions

- All content must be in Spanish.
- `npm run build` must pass (type-check and lint) before opening a PR.
- Branch from `main` per feature.
- **Always use Next.js `<Link>` component instead of standard `<a>` tags for internal navigation.**
- **Never push to `main` or deploy without explicit approval.**
