# PlayasOnTech — playasontech.com

Official site for **PlayasOnTech**, the tech community of Manzanillo, Colima
that meets every two months, frente al mar. 🌊

Built with **Next.js 15** (App Router) + **TypeScript** + **Tailwind CSS**,
exported as a **fully static site** and hosted on **GitHub Pages**.
Bilingual (`es` / `en`) — Spanish default, English added in parallel.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

```bash
npm run build      # static export → ./out (type-checks + lints)
npm run lint       # ESLint
npm run deploy-ci  # build + deploy via GitHub Actions CI (on-demand)
```

## Structure

```
src/
├── app/          # App Router pages (home, aniversario, codigo-conducta, etc.)
├── components/   # Section components + aniversario/ subfolder
├── i18n/         # Lang type & constants
└── lib/          # LangProvider (client-side lang context)
public/           # Static assets, CNAME, .nojekyll
```

## i18n

The site is bilingual (`es` / `en`) with Spanish as the default. Every visible
string lives in a `COPY = { es: ..., en: ... }` constant inside each section
component and is consumed via the `useLang()` hook from `LangProvider`.

Language is detected synchronously before paint via an inline `<head>` script
that reads the `playasontech_lang` cookie, falls back to `navigator.languages`,
then defaults to `"es"` — no flash, no loading state. See
[AGENTS.md](./AGENTS.md) for full architecture details.

## Deploying

The live site is served from the `gh-pages` branch. We build and deploy the
site using a GitHub Actions workflow on-demand via the following command:

```bash
npm run deploy-ci
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


