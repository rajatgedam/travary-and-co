# Journey & Co. — Frontend

High-end travel website with a "crushed paper" / parchment aesthetic. Built with React 19, Vite, and TypeScript.

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

**Texture:** SVG fractal noise `feTurbulence` filter applied at `opacity: 0.04` on the body and `opacity: 0.12–0.15` on hero/carousel overlays.

## Forms

Both forms (`PartnershipForm`, `InquiryForm`) use local React state only — no external service. Validation runs on submit; field errors clear on correction. On success, the form is replaced with a confirmation message.

**Validation rules:**
- Name — required
- Email — required + format (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- Message / Destination — required

## Environment Variables

No environment variables are required. The site is entirely static with no backend calls.

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
     Tests  28 passed (28)
```

Tests cover: form validation, success states, error clearing, Navbar toggle, Footer newsletter, component rendering and ARIA attributes.
