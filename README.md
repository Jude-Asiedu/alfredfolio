# Alfredfolio

Personal portfolio website for **Jude Asiedu** ("A.L.F.R.E.D") — Senior Full-Stack Developer based in Accra, Ghana. Built as an Angular 16 single-page application.

Live content (bio, skills, projects, contact) is loaded from JSON files under `src/assets/json/`, so updates don't require code changes.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Angular 16 (SPA, lazy-loaded feature modules) |
| UI | Bootstrap 5.2, ng-bootstrap 15.1 (carousel, dropdown) |
| Icons | FontAwesome 5.15 (free) |
| Reactivity | RxJS 7.8 |
| Fonts | Nunito (Google Fonts, weights 200/400/800) |
| SSG | `@scullyio/init` is installed but **not configured** (pure CSR today) |

---

## Project Structure

```
alfredfolio/
├── src/
│   ├── app/
│   │   ├── core/           # Header, Footer, shared services (bio, projects, HTTP)
│   │   ├── features/       # Lazy routes: home, about, projects, blog, site-settings
│   │   ├── app.component.* # Root layout
│   │   └── app-routing.*   # Root routes → FeaturesModule
│   ├── assets/
│   │   ├── json/           # bio.json, projects.json  ← edit here to update content
│   │   ├── img/            # Profile photo, hero graphics, carousel images
│   │   ├── pdf/            # Resume PDF
│   │   └── svg/
│   ├── index.html
│   └── styles.css          # Global theme variables + hover states
└── angular.json
```

Routes: `/` (home), `/about`, `/projects`, `/blog`, `/site-settings`.

---

## Prerequisites

- **Node.js 18** (Angular 16 supports 16.14+ or 18.10+; Node 16 is EOL — use 18). A `.nvmrc` is included.
- npm 9+

---

## Setup

```bash
nvm use                              # picks up Node 18 from .nvmrc
npm install --legacy-peer-deps       # see note below
```

> **Why `--legacy-peer-deps`?** `@scullyio/init@2.1.41` pins `@angular/platform-server@12.2.6`, which conflicts with Angular 16. The flag lets npm resolve past the peer-dep conflict. Removing Scully (if unused) would eliminate the need for this flag.

---

## Scripts

| Command | What it does |
|---|---|
| `npm start` | Dev server at http://localhost:4200 with HMR |
| `npm run build` | Production build into `dist/alfredfolio/` |
| `npm run watch` | Development build in watch mode |
| `npm test` | Run Karma + Jasmine unit tests |

---

## Editing Content

| What | Where |
|---|---|
| Bio, name, title, contact info, skills | `src/assets/json/bio.json` |
| Project cards (carousel) | `src/assets/json/projects.json` |
| Profile photo, project screenshots | `src/assets/img/` |
| Resume | `src/assets/pdf/` |
| Theme colors | `src/styles.css` (CSS vars + `.bg-second`, `.textMain`) |

---

## Deployment

No deploy pipeline is wired up yet. Recommended options:

- **Netlify** (recommended) — drag `dist/alfredfolio/` into the dashboard, or connect the repo. Add `public/_redirects` with `/* /index.html 200` so client-side routes work on refresh.
- **Vercel** — same pattern; set the output directory to `dist/alfredfolio/`.
- **GitHub Pages** — works but requires `--base-href` tweaks for the project subpath.

---

## Roadmap / Known Issues

### SEO (current state is weak — pure CSR with minimal `<head>`)

1. `<title>AAJ</title>` should become something descriptive, e.g. `Jude Asiedu — Senior Full-Stack Developer`.
2. Add `<meta name="description">` (~150 chars from bio).
3. Add Open Graph + Twitter card tags (`og:title`, `og:description`, `og:image`, `og:url`, `twitter:card`).
4. Add `<link rel="canonical">` once a production URL is chosen.
5. Add `robots.txt` and `sitemap.xml` under `src/` and register them in `angular.json → assets`.
6. Add JSON-LD `Person` schema in `index.html` (name, jobTitle, url, sameAs → socials, image).
7. Set per-route `<title>` / meta using Angular's `Title` and `Meta` services from `@angular/platform-browser` in each feature component.
8. Decide on prerendering: either finish Scully, migrate to **Angular SSR** (`@angular/ssr` — the modern path), or accept CSR (Googlebot now runs JS, acceptable for a solo portfolio).
9. Add favicon variants: `apple-touch-icon`, `android-chrome-*`, `manifest.webmanifest`.

### Accessibility

1. **Header logo** uses `<div routerLink="/">` — should be a semantic `<a>`. See `src/app/core/header/header.component.html:7`.
2. **Footer social icons** are bare `<i>` tags with no accessible name. Wrap each in `<a aria-label="LinkedIn">` and mark the icon `aria-hidden="true"`. See `src/app/core/footer/footer.component.html:10-12`.
3. **No skip-to-content link** — add `<a href="#main" class="visually-hidden-focusable">Skip to content</a>` and a `<main id="main">` wrapper in `app.component.html`.
4. **No `<main>` landmark** — wrap `<router-outlet>` in `<main>`.
5. **Color contrast** — cyan `#bae8e8` on `#272643` is fine (~11:1), but hover `#333159a8` on `#272643` needs WCAG AA verification (≥ 4.5:1 for text, ≥ 3:1 for UI).
6. **No `:focus-visible` styles** — add a global outline so keyboard users can see focus.
7. **`prefers-reduced-motion` not respected** — gate CSS transitions behind `@media (prefers-reduced-motion: no-preference)` and disable carousel autoplay for reduced-motion users.
8. **Resume link** should announce file type: add `aria-label="Download resume (PDF)"` or visible "(PDF)" text.
9. **Hero emoji** in `<h1>Hello 👋 ...</h1>` — wrap in `<span role="img" aria-label="waving hand">👋</span>`.

### General project corrections

- **102 npm audit vulnerabilities (7 critical)** — run `npm audit` and patch what's safe without a major bump.
- **Scully is installed but unused** — finish wiring it, or remove `@scullyio/init` to drop the `--legacy-peer-deps` requirement.
- **No linting/formatting** — add ESLint (`ng add @angular-eslint/schematics`) + Prettier.
- **No real test coverage** — Karma is configured but no component specs. Add at least smoke tests.
- **No CI** — add a GitHub Actions workflow running `npm ci --legacy-peer-deps && npm run build`.
- **Angular 16 is end-of-life** (support ended Nov 2024). Plan an upgrade to Angular 18/19 for continued security patches and modern SSR hydration.
