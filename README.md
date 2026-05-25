# Playas on Tech — playasontech.com

Official site for **Playas on Tech**, the tech community of Manzanillo, Colima
that meets every two months, frente al mar. 🌊

Built with **Next.js 15** (App Router) + **TypeScript** + **Tailwind CSS**,
exported as a static site and hosted on **GitHub Pages**.

> Previously a Create React App project — see [AGENTS.md](./AGENTS.md) for the
> migration notes and remaining follow-ups (porting the old pages and the hidden
> mini-games into the new design).

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

```bash
npm run build      # static export → ./out (type-checks + lints)
npm run lint       # ESLint
npm run deploy     # build + publish ./out to the gh-pages branch
```

## Structure

```
src/
├── app/
│   ├── layout.tsx            # <html>, metadata, Manrope font
│   ├── page.tsx              # home (landing) — composes section components
│   ├── globals.css           # Tailwind + animation/effect CSS
│   └── aniversario/page.tsx  # 7º Aniversario event page
└── components/
    ├── Header, Hero, Statement, Marquee, StatsStrip, Comunidad,
    │   CodeOfConduct, Eventos, Venue, Videos, Donaciones, Footer
    ├── SiteEffects.tsx       # "use client" — scroll-reveal, count-up, parallax
    └── aniversario/          # AnivHeader, AnivHero, Countdown, Agenda,
                              # Ponentes, Ubicacion, Patrocinadores, Registro
public/
├── assets/                   # app-icon.webp, app-logo.webp
├── CNAME                     # playasontech.com
└── .nojekyll                 # keep _next/ on GitHub Pages
```

## Deploying

The live site is served from the `gh-pages` branch. Run `npm run deploy` to
build and publish. Merging to `main` does not change the live site on its own.
