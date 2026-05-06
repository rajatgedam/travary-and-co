# Travary & Co. — Frontend

High-end travel website with a "crushed paper" / parchment aesthetic. Built with React 19, Vite, and TypeScript.

## Table of Contents

- [Quick Start](#quick-start)
- [Scripts](#scripts)
- [Tech Stack](#tech-stack)
- [Pages & Routes](#pages--routes)
- [Project Structure](#project-structure)
- [Design System](#design-system)
- [Forms](#forms)
- [Environment Variables](#environment-variables)
- [Production Build](#production-build)
- [Deployment](#deployment)
- [Browser Support](#browser-support)
- [Contributing](#contributing)
- [Test Coverage](#test-coverage)
- [Future Improvements](#future-improvements)

## Quick Start

```bash
npm install
npm run dev        # http://localhost:5173
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | TypeScript check + production bundle |
| `npm run preview` | Preview production build locally |
| `npm test` | Run all unit tests (Vitest) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint` | ESLint check |

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | React 19 + Vite | Fast HMR, modern React features |
| Language | TypeScript (strict) | Type safety across all components |
| Routing | React Router DOM v7 | URL-based navigation for a public site |
| Styling | Plain CSS + custom properties | Zero-dependency, design-token-driven |
| Carousel | Embla Carousel | Lightweight, accessible, no opinions |
| Testing | Vitest + Testing Library | Fast, Jest-compatible, Vite-native |
| Fonts | Google Fonts (Fraunces + Fira Sans) | Matches editorial "travel journal" brief |
| Backend | Vercel Serverless Functions + Resend | Zero-infra form delivery, colocated with frontend |

## Pages & Routes

| Route | Page | Sections |
|---|---|---|
| `/` | Home | Hero · Past Trips Carousel · Upcoming Featured Trip |
| `/b2b` | B2B Trips | Vision & Stats · Service Tiers · Partnership Inquiry Form |
| `/about` | About Us | Our Story · Two Engines · Team (polaroid-style) |
| `/contact` | Contact | Direct Channels · General Inquiry Form |
| `/*` | — | Redirects to `/` |

## Project Structure

```
src/
├── App.tsx                        React Router shell
├── main.tsx                       Entry point
├── types.ts                       Shared TypeScript interfaces
├── index.css                      Global resets + base typography
├── App.css                        Root layout style
├── styles/
│   └── variables.css              Design tokens (colors, fonts, spacing)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx / .css      Sticky nav with mobile hamburger
│   │   └── Footer.tsx / .css      Newsletter sign-up + copyright
│   └── ui/
│       ├── ServiceTierCard.tsx    B2B service tier display card
│       ├── PolaroidCard.tsx       Team photo polaroid-style card
│       ├── PaperTexture.tsx       Fixed grain/crinkle/vignette overlays
│       └── *.css                  Co-located component styles
├── pages/
│   ├── HomePage.tsx
│   ├── B2BTripsPage.tsx
│   ├── AboutUsPage.tsx
│   └── ContactPage.tsx
└── sections/
    ├── home/
    │   ├── HeroSection.tsx        Full-bleed hero with grain overlay
    │   ├── PastTripsCarousel.tsx  Embla carousel with grainy image cards
    │   └── UpcomingTripsSection.tsx  Featured trip + outlined CTA
    ├── b2b/
    │   ├── VisionSection.tsx      Dark green brand statement + stats
    │   ├── ServiceTiersSection.tsx  3-column service tier grid
    │   └── PartnershipForm.tsx    Validated inquiry form
    ├── about/
    │   ├── OurStorySection.tsx    Manifesto-style brand narrative
    │   ├── TwoEnginesSection.tsx  Dual-brand concept cards
    │   └── TeamSection.tsx        Polaroid grid with rotation effect
    └── contact/
        ├── DirectChannelsSection.tsx  Email/WhatsApp/social list
        └── InquiryForm.tsx             Validated 4-field inquiry form

tests/
├── components/
│   ├── Navbar.test.tsx
│   ├── Footer.test.tsx
│   ├── ServiceTierCard.test.tsx
│   └── PolaroidCard.test.tsx
└── sections/
    ├── PartnershipForm.test.tsx
    └── InquiryForm.test.tsx
```

## Design System

All design tokens live in `src/styles/variables.css` and are consumed globally via CSS custom properties.

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#f4f1ea` | Page background (off-white parchment) |
| `--color-green` | `#2d4a3e` | Primary accent — buttons, active states |
| `--color-sienna` | `#b85c38` | Secondary accent — labels, highlights |
| `--color-text` | `#1c1a17` | Body text |
| `--color-text-muted` | `#6b6358` | Secondary text |
| `--font-serif` | Fraunces | Headlines, brand name |
| `--font-sans` | Fira Sans | Body, labels, forms |
| `--border-thin` | `1px solid #d4cfc4` | All borders |
| `--transition-base` | `200ms ease` | Interactive elements |

**Texture:** Three fixed-position overlay layers via the `PaperTexture` component:
- **Fine grain** — SVG `feTurbulence` (baseFrequency 0.65, 4 octaves) at full SVG opacity + CSS `filter: contrast(400%) brightness(150%)` + `mix-blend-mode: multiply` — collapses gray noise into stark black micro-dots (real paper grain)
- **Coarse crinkle** — low-frequency noise (0.12) at large tile size for paper fold / tonal variation
- **Warm vignette** — radial gradient darkening page edges with sienna brown for an aged, worn-paper feel

Hero and card overlays use the same contrast-boost technique with `mix-blend-mode: screen` for dark backgrounds.

## Backend — Serverless Form Delivery

Form submissions are delivered via **Vercel Serverless Functions** colocated in `api/`. Each function validates the request body and forwards it as a transactional email via the [Resend](https://resend.com) API.

```
frontend/
  api/
    contact.ts        → POST /api/contact       (InquiryForm)
    partnership.ts    → POST /api/partnership   (PartnershipForm)
```

Vercel automatically routes `/api/*` to these functions before the SPA catch-all in `vercel.json` fires — no routing config changes needed.

**Status:** Planned (Phase 10) — see [plan.md](../plan.md) for full to-do list.

## Forms

Both forms (`PartnershipForm`, `InquiryForm`) use local React state only — no external service. Validation runs on submit; field errors clear on correction. On success, the form is replaced with a confirmation message.

**Validation rules:**
- Name — required
- Email — required + format (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- Message / Destination — required

## Environment Variables

For local development with no backend, no variables are needed — forms simulate submission.

To enable real form delivery (Phase 10), add the following to a `.env.local` file (never commit this):

```bash
# .env.local
RESEND_API_KEY=re_xxxxxxxxxxxx
```

On Vercel: **Project Settings → Environment Variables** → add `RESEND_API_KEY` for Production + Preview.

The key is used exclusively inside `api/contact.ts` and `api/partnership.ts` (serverless functions) — it is never exposed to the browser bundle.

## Production Build

```bash
npm run build
# Output: dist/  (~279 kB JS · ~27 kB CSS, gzipped: ~88 kB JS · ~5 kB CSS)
```

## Deployment

### Vercel (recommended)

Vercel is the recommended host. It auto-detects Vite, provides preview URLs per pull request, and handles SPA routing via the included `vercel.json`.

**One-click deploy:**
1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo
3. Vercel detects Vite automatically. Set **Root Directory** to `frontend/`
4. Leave all other settings as default → **Deploy**

**CLI deploy:**
```bash
npm i -g vercel
cd frontend
vercel          # follow prompts — framework detected as Vite
vercel --prod   # promote to production
```

The `vercel.json` rewrite rule ensures all routes (`/b2b`, `/about`, `/contact`) resolve to `index.html` for client-side routing.

### Netlify (alternative)

```bash
# Install Netlify CLI
npm i -g netlify-cli

cd frontend
npm run build
netlify deploy --dir=dist          # draft
netlify deploy --dir=dist --prod   # production
```

Add a `public/_redirects` file if deploying to Netlify:
```
/*  /index.html  200
```

Or use `netlify.toml` at the repo root:
```toml
[build]
  base    = "frontend"
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from   = "/*"
  to     = "/index.html"
  status = 200
```

### Self-hosted (nginx)

```nginx
server {
    root /var/www/travel-web/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Test Coverage

```
Test Files  6 passed (6)
     Tests  34 passed (34)
```

| Suite | File | What's tested |
|---|---|---|
| Navbar | `tests/components/Navbar.test.tsx` | Renders brand + 4 links, hamburger toggle, aria-expanded |
| Footer | `tests/components/Footer.test.tsx` | Newsletter submit, success state, empty guard |
| ServiceTierCard | `tests/components/ServiceTierCard.test.tsx` | Title, description, features list, icon, aria-label |
| PolaroidCard | `tests/components/PolaroidCard.test.tsx` | Name, role, initials, accessible figure label |
| PartnershipForm | `tests/sections/PartnershipForm.test.tsx` | Required field validation, email format, error clearing, loading state, server error, network error, success state |
| InquiryForm | `tests/sections/InquiryForm.test.tsx` | Required field validation, email format, error clearing, loading state, server error, network error, success state |

## Future Improvements

### High Priority

**Real photography**
Replace CSS color-block placeholders with actual trip photography. The grain overlay system is already wired — dropping in real images immediately elevates the aesthetic.

**Form backend** *(Phase 10 — in progress)*
Connect `PartnershipForm` and `InquiryForm` to real email delivery via Vercel Serverless Functions + [Resend](https://resend.com):
- `api/contact.ts` → `POST /api/contact`
- `api/partnership.ts` → `POST /api/partnership`
- One env var: `RESEND_API_KEY` (free tier: 3,000 emails/month)
- No separate server needed — functions deploy alongside the frontend

**Booking / availability**
The "Book Your Spot" CTA currently links to `/contact`. A real booking flow — Calendly embed, Typeform, or a custom step-form — would convert visitors rather than lose them.

---

### Medium Priority

**CMS for trip content**
Trip data is currently hardcoded. Moving it to a headless CMS ([Contentful](https://contentful.com), [Sanity](https://sanity.io), or a fetched JSON file) lets non-developers update destinations, dates, and copy without touching code.

**Per-page SEO & meta tags**
Add `react-helmet-async` for per-page `<title>`, `<meta description>`, and Open Graph tags. All 4 pages currently share the same `<title>` from `index.html`.

**Image optimization**
Add `vite-plugin-image-optimizer` or serve images via Vercel's built-in image CDN (`/_vercel/image`). Add `loading="lazy"` on carousel images.

**Scroll-triggered animations**
The parchment aesthetic suits subtle entrance animations. Use [Motion](https://motion.dev) or CSS `@keyframes` with `IntersectionObserver` for scroll-triggered reveals.

---

### Lower Priority

**Trip detail pages**
Dynamic routes (e.g. `/trips/patagonia-traverse`) with full itinerary, pricing, gallery, and a booking CTA. Requires a CMS or data layer.

**Dark mode**
The design token system in `variables.css` is already structured for it. A `@media (prefers-color-scheme: dark)` block swapping parchment tones to a dark ink palette would be straightforward.

**Internationalisation (i18n)**
`react-i18next` integrates cleanly with the existing component structure for multi-language support.

**Analytics**
Add [Vercel Analytics](https://vercel.com/analytics) (one line, privacy-friendly, free tier) or [Plausible](https://plausible.io) to understand which pages and CTAs get traffic.

**CI/CD pipeline**
GitHub Actions workflow that runs tests and build on every PR before Vercel deploys a preview:

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
        working-directory: frontend
      - run: npm test
        working-directory: frontend
      - run: npm run build
        working-directory: frontend
```

## Browser Support

| Browser | Minimum version |
|---|---|
| Chrome / Edge | 105+ |
| Firefox | 106+ |
| Safari | 16+ |
| Mobile Safari (iOS) | 16+ |

Uses CSS custom properties, `min-height: 100svh`, `aspect-ratio`, and `grid` — all baseline-supported in the above targets. No polyfills required.

## Contributing

```bash
# 1. Clone and install
git clone https://github.com/rajatgedam/journey-and-co.git
cd journey-and-co/frontend
npm install

# 2. Create a feature branch
git checkout -b feat/your-feature-name

# 3. Develop
npm run dev

# 4. Verify before pushing
npm test          # all tests must pass
npm run lint      # no lint errors
npm run build     # no TypeScript errors

# 5. Open a pull request — Vercel will post a preview URL automatically
```

**Branch conventions:**
- `feat/` — new features
- `fix/` — bug fixes
- `chore/` — deps, config, tooling

