# AGENTS.md

Guidance for Claude Code / contributors working in this repository.

> **Stack migration (this branch):** the site moved from Create React App
> (react-scripts + React Router + plain CSS) to **Next.js 15 (App Router) +
> TypeScript + Tailwind CSS**, exported as a static site for GitHub Pages. The
> old CRA pages (`sobre-nosotros`, `codigo-conducta`, `venue`, `donaciones`) and
> the hidden mini-games are **not yet ported** — see "Follow-ups" below.

## Commands

```bash
npm install
npm run dev        # Dev server — http://localhost:3000
npm run build      # Static export → ./out  (type-checks + lints)
npm run lint       # ESLint (next/core-web-vitals)
npm run deploy     # Build, then publish ./out to the gh-pages branch
```

## Architecture

**Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS v3. Output is a fully
static export (`output: 'export'` in `next.config.mjs`) — no server, no API
routes — so it can be hosted on GitHub Pages.

**Routing** is file-based under `src/app`:

- `src/app/page.tsx` — home (the long single-page landing) composed from section
  components in `src/components/`.
- `src/app/aniversario/page.tsx` — the 7º Aniversario event page, composed from
  `src/components/aniversario/`.
- `src/app/layout.tsx` — `<html>`, metadata, and the Manrope font (`next/font`).

**Client behaviour:** sections are server components by default. Browser-only
logic lives in `"use client"` components:

- `src/components/SiteEffects.tsx` — scroll-reveal, count-up stats, hero parallax
  for the home page. Markup stays declarative and opts in via the `.reveal` class
  and `data-count` attributes. Always clean up listeners/observers (React Strict
  Mode double-invokes effects in dev).
- `src/components/aniversario/Countdown.tsx` and `Registro.tsx` — the live
  countdown and the RSVP form.

**Styling:** Tailwind with a custom theme in `tailwind.config.ts` — use the
`navy` / `sunset` / `ocean` / `cream` tokens instead of hardcoding hex. The
animation/effect CSS (mesh gradients, blobs, marquee, reveal, glass, grain) is
plain CSS in `src/app/globals.css`, intentionally outside Tailwind layers so it
is never purged.

**Content** (events, videos, stats, agenda, sponsor tiers, nav, footer links) is
defined as local arrays at the top of each section component — edit there, not in
the JSX.

**Assets:** in `public/` (referenced as `/assets/...`). `public/CNAME` pins the
custom domain and `public/.nojekyll` stops GitHub Pages from stripping the
`_next/` build folder.

## Deploying (GitHub Pages)

`npm run deploy` runs `next build` (producing `./out`, including `CNAME` and
`.nojekyll`) and publishes it to the `gh-pages` branch via the `gh-pages`
package. The live site (`playasontech.com`) is served from `gh-pages`, so
merging to `main` does **not** change the live site until someone runs
`npm run deploy`.

## Conventions

- All content is in Spanish (community based in Manzanillo, Colima, Mexico).
- `npm run build` must pass (type-check + lint) before opening a PR.
- Branch from `main` per feature; keep PRs focused.
- **Never push to `main` or deploy without explicit approval.**

## Follow-ups (not in this migration)

- Port the old pages into the new design: `código de conducta` (full text),
  plus dedicated `sobre nosotros` / `venue` / `donaciones` pages if still wanted
  (home currently covers these as sections).
- Re-port the easter-egg mini-games (Snake, Conway's Life, Doom, Flappy,
  Pokémon) and their key-sequence / logo / dark-mode triggers.
- Re-add the dark-mode toggle if desired (the new design is single-theme).
- Wire the RSVP form and the sponsor/"propón una charla" CTAs to a real backend.
