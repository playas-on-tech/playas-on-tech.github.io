# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Dev server (http://localhost:3000)
npm run build      # Production build
npm run lint       # ESLint check
npm run lint:fix   # ESLint auto-fix
npm run format     # Prettier formatting
npm run deploy     # Build + publish to GitHub Pages (gh-pages)
```

No test suite is configured beyond CRA defaults — `npm test` opens Jest in watch mode.

## Architecture

**Stack:** React 18 + Create React App (no ejected config), React Router DOM 7 with `HashRouter` (required for GitHub Pages static hosting).

**Routing** lives in `src/App.js` with 5 routes (`/`, `/sobre-nosotros`, `/codigo-conducta`, `/venue`, `/donaciones`). All state is local `useState`/`useRef` — no Context or external store.

**Easter egg system:** `App.js` registers a global `keydown` listener for three sequences (Konami code, `"vida"`, `"pokemon"`), plus a triple-click on the logo and a long-press on the dark mode toggle. Each unlocks one of five mini-game modals rendered as overlays:

- `src/components/SnakeGame.js` — canvas-based
- `src/components/ConwayLife.js` — Game of Life
- `src/components/DoomMini.js`
- `src/components/FlappyBird.js`
- `src/components/PokemonGame.js`

**Styling:** One `.css` file per component, co-located under `src/css/`. Dark mode is toggled via a class on `<body>` and persisted in `localStorage`. No CSS framework or CSS-in-JS.

**Assets:** SVGs in `src/svg/`, WebP images in `src/img/`, logos in `src/logos/`. The Google Fonts `Montserrat` load is declared in `public/index.html`.

## Code style

- Prettier: 2-space indent, 100-char line width, single quotes, no trailing commas (`.prettierrc.js`)
- ESLint extends `eslint:recommended` + `plugin:react/recommended` + `plugin:prettier/recommended`
- All content is in Spanish (the community is based in Manzanillo, Colima, Mexico)
