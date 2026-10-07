# PlayasOnTech — playasontech.com

Official site for **PlayasOnTech**, the tech community of Manzanillo, Colima
that meets every two months, frente al mar. 🌊

Built with **Next.js 16** (App Router) + **TypeScript** + **Tailwind CSS**,
exported as a **fully static site** and hosted on **GitHub Pages**.
Bilingual (`es` / `en`) — Spanish default, English added in parallel.

## Getting started

```bash
pnpm install
pnpm run dev        # http://localhost:3000
```

## Scripts

```bash
pnpm run build      # static export → ./out (type-checks + lints)
pnpm run lint       # ESLint
pnpm test           # build + Playwright behaviour tests against ./out
pnpm run deploy-ci  # build + deploy via GitHub Actions CI (on-demand)
```

## Structure

```
src/
├── app/          # App Router pages (home, aniversario, codigo-conducta, etc.)
├── components/   # Section components, aniversario/ subfolder, ui/ shared primitives
├── data/         # agenda, speakers, sponsors
├── i18n/         # locales/es.json + en.json, Lang type
└── lib/          # lang context, metadata, schema, event data, pure helpers
tests/            # Playwright behaviour tests
scripts/          # deploy-ci.js + serve.js (static server for the tests)
public/           # Static assets, CNAME, .nojekyll
```

## i18n

Every visible string lives in `src/i18n/locales/es.json` and `en.json`. Spanish
is canonical and both dictionaries must hold the same keys — a test enforces it.
Components read copy through `useLang()`, which returns `{ lang, t, setLang }`.

`LangProvider` reads the `playasontech_lang` cookie on mount, writes it when the
visitor switches language, and keeps `<html lang>` in sync.

## Testing

`pnpm test` builds the static export and runs Playwright against it through
`scripts/serve.js`. Tests assert behaviour, not implementation: language toggle
and cookie persistence, lightbox navigation, contact form validation and
submission, the anniversary feature-flag gate, and locale key parity.

CI runs the whole suite on every push to `main` and on pull requests
(`.github/workflows/test.yml`), and the deploy workflow runs it against the
export before publishing, so a failing spec blocks the deploy. PostHog is mocked
in tests: `tests/helpers.ts` answers every PostHog request locally, so the real
service is never reached and the anniversary flag can be turned on to test the
gated components.

## Deploying

The live site is served from the `gh-pages` branch. We build and deploy the
site using a GitHub Actions workflow on-demand via the following command:

```bash
pnpm run deploy-ci
```

This triggers the remote workflow using your GitHub Secrets for environment
variables (like `NEXT_PUBLIC_WEB3FORMS_KEY`), ensures your local commits are
pushed, monitors the remote build status in your terminal, and pings the
site once complete to verify it is online.

**Requirements:**

- Ensure `NEXT_PUBLIC_WEB3FORMS_KEY` is added to your repository's GitHub
  Secrets (**Settings > Secrets and variables > Actions**).
- Authenticate locally by running `gh auth login` (GitHub CLI) once, or by
  setting a `GITHUB_TOKEN` environment variable.

> [!NOTE]
> Merging to `main` does not change the live site on its own; you must
> trigger a deployment using the command above.
