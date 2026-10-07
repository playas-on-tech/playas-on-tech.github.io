# AGENTS.md

Guidance for agents working in this repository.

## Commands

```bash
pnpm install
pnpm run dev        # Dev server (http://localhost:3000)
pnpm run build      # Static export (./out)
pnpm run lint       # ESLint
pnpm test           # Build + Playwright behaviour tests against ./out
pnpm run deploy-ci  # Deploy static export to GitHub Pages
```

## Architecture

- **Stack:** Next.js (App Router), TypeScript, Tailwind CSS. Fully static export (`output: 'export'`).
- **Routing:** File-based under `src/app`. All routes serve the same path regardless of language — no `/en/...` prefix. Spanish slugs are canonical (`/`, `/merch`, `/aniversario`, `/codigo-conducta`, `/terminos`, `/patrocinadores`, `/aniversario/patrocinadores`).
- **Language Control:** Handled client-side by `LangProvider` (`src/lib/lang.tsx`), which reads the `playasontech_lang` cookie on mount and keeps `<html lang>` in sync. `useLang()` returns `{ lang, t, setLang }` and is the only i18n API components use.
- **Content:** Copy lives in `src/i18n/locales/es.json` and `en.json`. Spanish is canonical; the two dictionaries must hold the same keys (a test enforces it). Locale-independent facts (event dates, ticket price, links) live in `src/lib/event.ts`; structured data for agenda/speakers/sponsors in `src/data/`.
- **Shared primitives:** `src/components/ui/` holds the reusable pieces — `Cta`, `Pill`, `SectionHeader`, `CheckList`, `Blobs`, `WaveDivider`, `PageHero`, `Prose`, `SmartLink`, `Lightbox`. Prefer extending these over adding a one-off variant.
- **Pure helpers:** `src/lib/` keeps testable functions (`metadata.ts`, `schema.ts`, `countdown.ts`, `editions.ts`, `format.ts`, `contact.ts`) separate from components.
- **Client Behavior:** Components are server-rendered by default. Browser-only logic/effects use `"use client"`. Clean up listeners/observers to support React Strict Mode.
- **Styling:** Tailwind CSS with custom theme tokens. Custom animations and effects are in `src/app/globals.css`.
- **Assets:** Stored in `public/` (referenced as `/assets/...`).

## Testing

`pnpm test` serves `./out` with `scripts/serve.js` and runs Playwright specs in `tests/`. Assert what the visitor sees and can do — rendered copy, toggles, form states, keyboard and pointer interactions — not internal structure.

CI runs the suite on every push to `main` and on pull requests, and the deploy workflow runs it against the export before publishing. PostHog is mocked in tests: `scripts/test.js` builds with a mock key and `tests/helpers.ts` answers every PostHog request locally, so the real service is never reached and the anniversary flag can be turned on for the gated components.

## Adding an event

The next meetup is announced on the homepage's next-event card only — don't create new event pages.

1. Add the event flyer image to the assets directory and point the next-event card's flyer at it.
2. Update the card copy in **both locales in the same edit** (es + en). Spanish is canonical.
3. Card content is minimal: date, time, venue, free-entry/sponsor line, and the flyer image. Talk titles and speaker details live on the flyer, not in the card.
4. Don't duplicate flyer information on mobile. Everything the flyer already communicates (date, time, venue, entry) is desktop-only.
5. A venue address links to its Google Maps share URL wherever it appears.

## Deploying

`pnpm run deploy-ci` pushes local commits, triggers the GitHub Actions build/deploy workflow, and verifies the online status of the static export on the `gh-pages` branch.

## Conventions

- Site is bilingual (`es` / `en`). Spanish is the default; English is added in parallel — every visible string lives in both locale dictionaries. When you add or change Spanish copy, add or change the English counterpart in the same edit.
- `pnpm run build` must pass (type-check and lint) before opening a PR, and `pnpm test` must pass.
- Branch from `main` per feature.
- **Always use Next.js `<Link>` component instead of standard `<a>` tags for internal navigation** (`src/components/ui/SmartLink` handles both cases).
- **Never push to `main` or deploy without explicit approval.**
- **Never use `--force` on any git command** (no `git push --force`, no `--force-with-lease`, no `git reset --hard` on shared branches, etc.).
- **Deploys are only authorized by Kevin.** Even with general approval to push, do not run `pnpm run deploy-ci` or trigger the GitHub Actions deploy workflow unless Kevin has explicitly authorized that specific deploy.
