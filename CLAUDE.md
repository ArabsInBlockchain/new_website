# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Arabs in Blockchain** (العرب × بلوكتشين) — a bilingual (Arabic/English) community website for an open, non-profit, volunteer-driven blockchain community founded in 2020. Full design spec and extended rules live in `.claude/design_doc.md` and `.claude/prompt.md` — read those before any significant task.

**Requirements:** Node 20+, Next.js 15.

## Commands

```bash
npm install          # Install deps
npm run dev          # Dev server
npm run build        # Production build
npm run lint         # ESLint — must be zero warnings before merging
npx tsc --noEmit     # Type check — must be zero errors before merging
ANALYZE=true npm run build   # Bundle analysis via @next/bundle-analyzer
```

## Tech Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| Framework | Next.js 15 App Router | All pages under `app/[locale]/` |
| Language | TypeScript strict mode | No `any` types, full interfaces everywhere |
| Styling | Tailwind CSS v4 | Design tokens only — no arbitrary values |
| i18n | next-intl | Locales: `ar` (default, RTL), `en` (LTR) |
| Content | JSON in `/content/` + `messages/*.json` | Git as CMS — no database |
| Forms | Formspree free tier | No custom backend/API routes needed |
| Images | Next.js `<Image>` + Cloudinary URLs | Never local files for community content |
| Icons | Lucide React | |
| Animations | Framer Motion | Minimal — subtle fade-ins (300ms), scroll reveals only |
| Search | Fuse.js | Client-side fuzzy search — no backend |
| Analytics | Umami (self-hosted) | Privacy-first — no Google Analytics |
| SEO | next-sitemap | Auto-generated sitemap |
| Hosting | Netlify free tier | All pages must SSG via `generateStaticParams` |

**Zero paid dependencies.** Never add paid services or APIs without explicit approval. If build minutes (300/month free tier) become a constraint, move builds to GitHub Actions and push the static output to Netlify instead of using Netlify's own build pipeline.

## Architecture

### Routing & i18n
Every page lives under `app/[locale]/`. `middleware.ts` handles locale detection and redirects. Arabic (`ar`) sets `dir="rtl"` on `<html>`; English (`en`) sets `dir="ltr"`. Locale preference is stored in localStorage + cookie. All routes exist as `/ar/...` and `/en/...`.

### Content System — Two Layers

**Layer 1 — `messages/ar.json` + `messages/en.json` (all translatable text)**

Every piece of bilingual text lives here — UI strings AND content (speakers, partners, team, events, opportunities). next-intl loads the correct file per locale. Key convention: `section.subsection.key`.

```json
// messages/en.json
{
  "nav": { "home": "Home", "events": "Events" },
  "speakers": {
    "sarah-ahmed": { "name": "Sarah Ahmed", "title": "...", "bio": "..." }
  },
  "partners": {
    "ethereum-foundation": { "name": "Ethereum Foundation", "description": "..." }
  },
  "team": {
    "eman-herawy": { "name": "Eman Herawy", "role": "Founder" }
  },
  "events": {
    "cairo-meetup-2026": { "title": "...", "description": "...", "location": "Cairo, Egypt" }
  }
}
```

**Layer 2 — `content/` (language-independent metadata)**

Non-translatable fields only — photos, URLs, dates, types, slugs:

```
content/
  events/[slug].json        → date, type, status, registration_url, banner_image, tags, speakers[], contributors[]
  speakers/[slug].json      → photo, twitter, linkedin
  partners/[slug].json      → logo, website, type, status, since
  team/[slug].json          → photo, twitter, linkedin, type (core|volunteer)
  contributors/[slug].json  ��� photo, twitter, linkedin
  opportunities/[slug].json → type, url, deadline
```

`lib/content.ts` merges both layers: reads metadata from `content/[type]/[slug].json` and joins with translations from the active locale's messages file. `lib/events.ts` and `lib/utils.ts` provide domain-specific helpers.

**Never hardcode Arabic or English text** in components or pages — not even as a fallback.

**There is no runtime data fetching.** All content is read at build time. To update content, edit files and push to git — Netlify rebuilds automatically. The only runtime network calls are the Formspree contact form POST and Fuse.js in-browser search.

### Component Structure
```
components/
  ui/       → primitives: Button, Badge, Card, Input, Textarea, Select, Skeleton
  layout/   → Navbar, Footer, MobileMenu, LanguageToggle
  events/   → EventCard, EventCardCompact, EventList, EventFilter, EventBadge
  home/     → Hero, StatsBar, WhatWeDo, PhotoStrip, OpportunitiesTeaser, JoinCTA
  gallery/  → PhotoGrid, PhotoCard, Lightbox
  partners/ → PartnerCard, PartnerLogos
  shared/   → PageHeader, SectionTitle, Timeline, StatCard, SocialLinks, HexagonMesh
```

Each component in its own file. Index files for directory re-exports only.

### SEO Pattern
Every page must export `generateMetadata()` returning bilingual title + description, Open Graph tags, Twitter card, canonical URL, and `hreflang` for `ar` + `en`. JSON-LD structured data types:
- `Organization` — homepage
- `Event` — event pages
- `BreadcrumbList` — all inner pages

## RTL Rules

Use **only** Tailwind logical properties — physical properties break Arabic layout:

| Use | Never use |
|-----|-----------|
| `ms-` / `me-` | `ml-` / `mr-` |
| `ps-` / `pe-` | `pl-` / `pr-` |
| `start-` / `end-` | `left-` / `right-` |

Test every layout change in both `ar` (RTL) and `en` (LTR). Arabic text requires **minimum line-height 1.8** and **zero letter-spacing** (never adjust Arabic letter spacing).

## Design Tokens

All tokens defined in `tailwind.config.ts` + CSS variables in `styles/globals.css`. Never use arbitrary hex values in components (e.g., no `bg-[#3B1F8C]`).

**Brand colors:**

| Token | Hex | Role |
|-------|-----|------|
| `brand-violet` | `#3B1F8C` | Primary brand, buttons, CTAs |
| `brand-gold` | `#F5A623` | Headlines, highlights, CTAs |
| `brand-teal` | `#00D4B4` | Links, badges, hover states |
| `brand-teal-dark` | `#003D5B` | Card surfaces |
| `bg-dark` | `#0D0D1A` | Page background (dark mode default) |
| `bg-light` | `#F8F7FF` | Page background (light mode) |
| `bg-surface` | `#13132A` | Card/nav/footer background |
| `text-primary` | `#E8E6F0` | Body text |
| `text-muted` | `#9B97B8` | Meta text, captions |
| `success` | `#22C55E` | Live badges, confirmations |
| `warning` | `#F59E0B` | Upcoming event notices |
| `error` | `#F43F5E` | Form errors, alerts |

**Event type badge colors:** in-person `#16A34A`, online `#2563EB`, side-event `#7C3AED`.

**Fonts:** Cairo (Arabic), Space Grotesk (English), JetBrains Mono (addresses/code). Load Cairo only when locale is `ar`. Use `font-display: swap` and character subsetting on both fonts.

## Content Schemas

**`content/events/[slug].json`** — metadata only:
```json
{
  "slug": "cairo-meetup-2026",
  "type": "in-person",
  "status": "upcoming",
  "date": "YYYY-MM-DD",
  "time": "HH:MM",
  "timezone": "Africa/Cairo",
  "platform": null,
  "conference": null,
  "registration_url": "",
  "recap_url": null,
  "photos_count": 0,
  "banner_image": "https://res.cloudinary.com/...",
  "tags": [],
  "speakers": ["sarah-ahmed"],
  "contributors": [{ "slug": "omar-hassan", "role_key": "organizer" }]
}
```
Translated fields (title, description, location) live in `messages/[locale].json` under `events.[slug]`.

**`content/speakers/[slug].json`:**
```json
{ "photo": "https://res.cloudinary.com/...", "twitter": "", "linkedin": "" }
```
Translated fields (name, title, bio) in `messages/[locale].json` under `speakers.[slug]`.
> Future work: add `talks[]` array referencing event slugs for per-speaker history.

**`content/partners/[slug].json`:**
```json
{ "logo": "https://res.cloudinary.com/...", "website": "", "type": "technology|event|education|sponsor", "status": "current|past", "since": "YYYY" }
```

**`content/team/[slug].json`:**
```json
{ "photo": "...", "twitter": "", "linkedin": "", "type": "core|volunteer" }
```

**`content/contributors/[slug].json`:**
```json
{ "photo": "...", "twitter": "", "linkedin": "" }
```

## Community Links

| Platform | URL |
|----------|-----|
| Telegram (primary hub) | https://t.me/ArabsInBlockchain |
| X / Twitter | https://x.com/ArabsInBC |
| LinkedIn | https://www.linkedin.com/company/arabs-in-blockchain/ |
| Events (Lu.ma) | https://luma.com/arabsInBlockchain |

These are the canonical URLs — use them exactly when generating content, CTAs, or footer links.

## Community Identity (for content tasks)

These facts are non-negotiable — never contradict, alter, or omit:

- **Founded:** 2020
- **Three membership pillars** (all three must appear together in any "who can join" context):
  1. Arabic speakers
  2. People of Arab origin
  3. People living in Arab countries
- **Primary hub:** Telegram group — always reference it as the main gathering place
- **Non-profit, volunteer-driven, free to join** — never imply paid membership
- **Open and borderless** — not restricted to one country or nationality
- **Member benefits to highlight:** free conference tickets, course scholarships, grants, job opportunities

## Content Rules

- **Arabic is the primary language.** Every content piece needs both MSA Arabic and English versions.
- **Arabic register:** Modern Standard Arabic (MSA) for all website copy. Dialect only for social media captions when explicitly requested.
- **Tone:** Warm · Welcoming · Empowering · Educational. Never corporate, hype-driven, or exclusive.
- **Never use:** "revolutionary", "disruptive", "game-changing", "to the moon", "WAGMI", "aping in", or any financial/investment language.
- **Never fabricate** event details, speaker names, dates, partner names, or community statistics.
- For standard blockchain term translations, refer to the glossary in `.claude/prompt.md` Section 6. New terms not in the glossary should be transliterated until the community votes on a translation.

## Performance Targets

| Metric | Target |
|--------|--------|
| JS bundle (gzipped) | < 200KB |
| Lighthouse Performance | 90+ |
| Lighthouse Accessibility | 95+ |
| Lighthouse SEO | 95+ |
| LCP | < 2.5s |
| CLS | < 0.1 |

Images must use WebP/AVIF (via Cloudinary), lazy loading, and blur placeholder. No client-side data fetching for static content.

## Accessibility

WCAG 2.1 AA minimum. Key requirements:
- Minimum **44×44px touch targets** on mobile
- Minimum **16px** body text
- Visible focus rings on all interactive elements
- `aria-label` (i18n key) on all icon-only buttons
- `prefers-reduced-motion` respected — no forced animations
- Bilingual `alt` text on all images

## Pre-Merge Checklist

- `npx tsc --noEmit` — zero errors
- `npm run lint` — zero warnings
- All strings use i18n keys (no hardcoded text)
- RTL layout verified in Arabic locale
- No `any` types; full TypeScript interfaces
- No `console.log`
- No Tailwind arbitrary color values
- No physical Tailwind spacing (`ml-`, `mr-`, `pl-`, `pr-`, `left-`, `right-`)
- All async components have loading + error states
- All images use `<Image>` with `width`, `height`, `alt` (i18n key)
- `generateStaticParams` on all dynamic pages
- `generateMetadata()` with bilingual SEO + hreflang on all pages
- No paid APIs or dependencies added
- Lighthouse 90+ on changed pages

## File Naming

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase.tsx | `EventCard.tsx` |
| Pages | page.tsx | `app/[locale]/events/page.tsx` |
| Utilities | camelCase.ts | `lib/content.ts` |
| Content / metadata JSON | kebab-case.json | `cairo-meetup-2026.json`, `sarah-ahmed.json` |
| i18n keys | section.subsection.key | `events.card.register` |
| CSS variables | `--color-role-variant` | `--color-brand-violet` |
| Tailwind tokens | `role-variant` | `brand-violet`, `bg-dark` |
