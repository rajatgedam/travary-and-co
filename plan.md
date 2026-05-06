# Travary & Co. — Project Plan

## Problem Statement

Build a minimal, high-end travel website with a **"crushed paper" / parchment aesthetic** — an editorial, tactile feel that stands out from glossy tourism sites. The site serves two audiences: individual travelers (B2C) and corporate/organizational partners (B2B). It must communicate brand story, showcase curated trips, and generate leads across four pages.

---

## Design System

| Token | Value |
|---|---|
| Background | Crushed paper / parchment texture, `#f4f1ea` off-white tint |
| Title Font | **Fraunces** (Variable Serif) — high weight, high Softness |
| Body Font | **Fira Sans** — descriptions, itineraries, form fields |
| Accent 1 | Deep Forest Green (`#2d4a3e`) |
| Accent 2 | Burnt Sienna (`#b85c38`) |
| UI Elements | Thin 1px borders, no heavy shadows, generous whitespace |

---

## Site Structure

| Page | Key Sections |
|---|---|
| **Home** | Hero (headline + CTA) · Past Trips Carousel · Upcoming Featured Trip |
| **B2B Trips** | Vision · Service Tiers (3) · Partnership Inquiry Form |
| **About Us** | Our Story · Two Engines Concept · Team (polaroid-style) |
| **Contact** | Direct Channels · Inquiry Form · Newsletter Footer |

---

## Tech Stack

- **Framework:** React 19 + Vite + TypeScript
- **Routing:** React Router DOM v7 (URL-based — public website convention)
- **Styling:** Plain CSS + CSS custom properties (design tokens)
- **Fonts:** Google Fonts — Fraunces + Fira Sans
- **Carousel:** Embla Carousel
- **Testing:** Vitest + React Testing Library
- **Linting:** ESLint + TypeScript strict mode
- **Deployment:** Vercel (static SPA, `vercel.json` rewrite rule)
- **Backend (Phase 9):** Vercel Serverless Functions (`api/`) + Resend email API

---

## Project Structure

```
travel-web/
  plan.md
  frontend/
    index.html
    package.json
    vite.config.ts
    vitest.config.ts
    src/
      main.tsx
      App.tsx                   ← React Router setup
      index.css                 ← resets + font imports
      styles/
        variables.css           ← design tokens
      components/
        layout/
          Navbar.tsx / .css
          Footer.tsx / .css
        ui/
          TripCard.tsx / .css
          ServiceTierCard.tsx / .css
          PolaroidCard.tsx / .css
      pages/
        HomePage.tsx
        B2BTripsPage.tsx
        AboutUsPage.tsx
        ContactPage.tsx
      sections/
        home/
          HeroSection.tsx / .css
          PastTripsCarousel.tsx / .css
          UpcomingTripsSection.tsx / .css
        b2b/
          VisionSection.tsx / .css
          ServiceTiersSection.tsx / .css
          PartnershipForm.tsx / .css
        about/
          OurStorySection.tsx / .css
          TwoEnginesSection.tsx / .css
          TeamSection.tsx / .css
        contact/
          DirectChannelsSection.tsx / .css
          InquiryForm.tsx / .css
      types.ts
    tests/
      components/
      sections/
```

---

## To-Do List

### Phase 1 — Project Setup
- [x] `1.1` Scaffold Vite + React + TypeScript project in `travel-web/frontend/`
- [x] `1.2` Install dependencies: `react-router-dom`, `embla-carousel-react`, vitest, testing-library
- [x] `1.3` Configure `eslint.config.js`
- [x] `1.4` Create `src/styles/variables.css` with design tokens
- [x] `1.5` Import Google Fonts (Fraunces + Fira Sans) in `index.html`
- [x] `1.6` Add paper/parchment texture via CSS
- [x] `1.7` Set global resets + base typography in `index.css`

### Phase 2 — Layout Shell
- [x] `2.1` Build `Navbar.tsx` — brand name + 4 nav links; sticky, 1px border-bottom
- [x] `2.2` Build `Footer.tsx` — copyright + newsletter sign-up
- [x] `2.3` Configure React Router in `App.tsx` — 4 routes + 404 redirect
- [x] `2.4` Verify navigation and active state styling

### Phase 3 — Home Page
- [x] `3.1` `HeroSection.tsx` — full-bleed image + Fraunces headline + body copy
- [x] `3.2` `PastTripsCarousel.tsx` — Embla carousel with grainy image overlay
- [x] `3.3` `UpcomingTripsSection.tsx` — Featured Trip card + outlined "Book Your Spot" CTA
- [x] `3.4` Compose `HomePage.tsx`

### Phase 4 — B2B Trips Page
- [x] `4.1` `VisionSection.tsx`
- [x] `4.2` `ServiceTierCard.tsx` component + `ServiceTiersSection.tsx`
- [x] `4.3` `PartnershipForm.tsx` with validation
- [x] `4.4` Compose `B2BTripsPage.tsx`

### Phase 5 — About Us Page
- [x] `5.1` `OurStorySection.tsx`
- [x] `5.2` `TwoEnginesSection.tsx`
- [x] `5.3` `PolaroidCard.tsx` component + `TeamSection.tsx`
- [x] `5.4` Compose `AboutUsPage.tsx`

### Phase 6 — Contact Page
- [x] `6.1` `DirectChannelsSection.tsx`
- [x] `6.2` `InquiryForm.tsx` with validation
- [x] `6.3` Compose `ContactPage.tsx`

### Phase 7 — Polish & Responsive
- [x] `7.1` Mobile-first responsive breakpoints across all pages
- [x] `7.2` Grain overlay depth on hero + carousel images
- [x] `7.3` Hover/focus transitions ≤200ms on all interactive elements
- [x] `7.4` ARIA labels + keyboard navigation

### Phase 8 — Testing & Quality
- [x] `8.1` Unit tests for UI components (`ServiceTierCard`, `PolaroidCard`)
- [x] `8.2` Unit tests for forms (`PartnershipForm`, `InquiryForm`)
- [x] `8.3` Unit tests for `Navbar` and `Footer`
- [x] `8.4` 28/28 tests passing
- [x] `8.5` TypeScript strict — zero errors
- [x] `8.6` Production bundle built (279 kB JS · 27 kB CSS)

---

## Progress Log

| Date | Phase | Status | Notes |
|---|---|---|---|
| 2026-05-05 | Planning | ✅ Complete | Plan created from sample.docx requirements |
| 2026-05-05 | Phase 1 | ✅ Complete | Project scaffolded, deps installed, design tokens set |
| 2026-05-05 | Phase 2 | ✅ Complete | Navbar, Footer, React Router wired |
| 2026-05-05 | Phase 3 | ✅ Complete | Home page — Hero, Carousel, Upcoming Trips |
| 2026-05-05 | Phase 4 | ✅ Complete | B2B page — Vision, Service Tiers, Partnership Form |
| 2026-05-05 | Phase 5 | ✅ Complete | About page — Story, Two Engines, Team polaroids |
| 2026-05-05 | Phase 6 | ✅ Complete | Contact page — Channels, Inquiry Form |
| 2026-05-05 | Phase 7 | ✅ Complete | Responsive breakpoints, grain overlays, ARIA, transitions |
| 2026-05-05 | Phase 8 | ✅ Complete | 28/28 tests pass · zero TS errors · production build clean |
| 2026-05-06 | Phase 9 (post-launch) | ✅ Complete | Crushed paper texture fixed (CSS contrast/brightness technique) |
| 2026-05-06 | Phase 9 (post-launch) | ✅ Complete | Project renamed: Journey & Co. → Travary & Co. across all files + tests |
| 2026-05-06 | Phase 9 (post-launch) | ✅ Complete | GitHub repo created: rajatgedam/journey-and-co · pushed to origin |
| 2026-05-06 | Phase 9 (post-launch) | ✅ Complete | Vercel deployment config verified (vercel.json SPA rewrite, dist gitignored) |
| 2026-05-06 | Phase 10 | 🔄 Planned | Backend: Vercel Serverless Functions + Resend for form delivery |

---

## Phase 9 — Post-Launch Fixes & Deployment ✅

### 9.1 — Crushed Paper Texture Fix
- [x] Diagnosed broken SVG noise: `opacity='0.04'` inside SVG made grain invisible
- [x] Implemented CSS-Tricks technique: SVG at full opacity + `filter: contrast(400%) brightness(150%)` + `mix-blend-mode: multiply`
- [x] Created `PaperTexture` component with 3 fixed overlay layers:
  - Fine grain (baseFrequency 0.65, contrast boost)
  - Coarse crinkle (baseFrequency 0.12, large tiles)
  - Warm vignette (radial gradient, sienna edges)
- [x] Fixed hero + carousel overlays (`mix-blend-mode: screen` for dark backgrounds)
- [x] Removed broken `background-image` noise from `body` in `index.css`

### 9.2 — Project Rename
- [x] Renamed brand from **Journey & Co.** to **Travary & Co.** across:
  - `index.html` title tag
  - `Navbar.tsx`, `Footer.tsx` (brand + copyright)
  - `OurStorySection.tsx`, `TwoEnginesSection.tsx` (narrative copy)
  - `DirectChannelsSection.tsx` (email, Instagram, LinkedIn)
  - `PartnershipForm.tsx` (contact email)
  - Both `README.md` files (root + frontend/)
- [x] Updated Navbar and Footer unit tests to match new brand name
- [x] 28/28 tests still pass after rename

### 9.3 — GitHub & Deployment Setup
- [x] Created GitHub repo: `rajatgedam/journey-and-co`
- [x] Pushed all commits to `origin/main`
- [x] Verified `vercel.json` SPA rewrite rule for React Router
- [x] Verified `dist/` excluded from git (Vercel builds from source)
- [x] Documented Vercel deploy steps in README

---

## Phase 10 — Backend: Form Delivery via Vercel Serverless Functions

### Objective
Replace the current fake form submissions (local React state only) with real email delivery using Vercel Serverless Functions and the [Resend](https://resend.com) email API. No separate server needed — functions live alongside the frontend in `api/`.

### Architecture

```
frontend/
  api/
    contact.ts          ← POST /api/contact  (InquiryForm → hello@travaryandco.com)
    partnership.ts      ← POST /api/partnership  (PartnershipForm → partnerships@travaryandco.com)
  src/
    ...existing code
  vercel.json           ← /api/* already excluded from SPA rewrite by Vercel
```

- Vercel routes `/api/*` to serverless functions **before** the `/(.*) → index.html` catch-all fires, so no `vercel.json` changes needed
- `RESEND_API_KEY` added as a Vercel environment variable (never committed to git)
- Both functions validate the request body server-side before sending

### To-Do

- [ ] `10.1` Create `frontend/api/contact.ts` — POST handler, validates fields, sends via Resend to `hello@travaryandco.com`
- [ ] `10.2` Create `frontend/api/partnership.ts` — POST handler, sends to `partnerships@travaryandco.com`
- [ ] `10.3` Add `RESEND_API_KEY` to Vercel environment variables (dashboard → Settings → Environment Variables)
- [ ] `10.4` Update `InquiryForm.tsx` — replace fake submit with `fetch('/api/contact', { method: 'POST', body: JSON.stringify(fields) })`
- [ ] `10.5` Update `PartnershipForm.tsx` — replace fake submit with `fetch('/api/partnership', ...)`
- [ ] `10.6` Add loading state to both forms (disable submit button, show spinner while fetch is in flight)
- [ ] `10.7` Add server error handling to both forms (show error message if API returns non-2xx)
- [ ] `10.8` Write unit tests for both updated forms (mock `fetch`, test loading + error + success states)
- [ ] `10.9` Add `@types/node` dev dependency (required for Vercel function TypeScript)
- [ ] `10.10` Verify end-to-end in Vercel preview deployment before promoting to production
