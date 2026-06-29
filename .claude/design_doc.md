
# Arabs in Blockchain — Website Design Document
**Version:** 2.0
**Date:** 2026-05-31
**Status:** Approved — Ready for Development
**Prepared by:** UX/UI Consultant · IT Architect · 
               Prompt Engineer · Frontend Team Lead

---

## 1. Project Overview

### 1.1 Community Identity
- **Name:** Arabs in Blockchain (العرب × بلوكتشين)
- **Tagline:** "Connecting Arab Minds in Blockchain | 
               مجتمع البلوكتشين العربي"
- **Founded:** 2020
- **Mission:** An open, borderless community empowering Arabs 
  in blockchain technology — Arabic speakers, people of Arab 
  origin, or those living in Arab countries — regardless of 
  experience level.
- **Core Values:** Openness · Education · Empowerment · 
                   Community · Arab Identity · Borderless

### 1.2 Website Goal
Build a community-first, zero-cost-to-maintain website that:
- Serves as the single source of truth for community identity
- Drives new member discovery and Telegram group joins
- Archives all past events with photos and recaps
- Lists upcoming events with RSVP/registration links
- Showcases partners and sponsors
- Surfaces learning resources and opportunities
- Represents Arab identity authentically in the Web3 space

### 1.3 Constraints
- Zero ongoing infrastructure cost
- Volunteer-maintained
- Open source (public GitHub repo)
- No commercial features or paid memberships

---

## 2. Target Audience

| Segment | Description |
|---|---|
| Curious Newcomers | Arabs interested in blockchain, don't know where to start |
| Students & Developers | Seeking study groups, resources, mentorship |
| Web3 Professionals | Networking at regional/global conferences |
| Partners & Sponsors | Organizations wanting to reach Arab Web3 community |
| International Community | Non-Arabs curious about Arab Web3 ecosystem |
| Diaspora Arabs | Arabs abroad maintaining connection to Arab tech scene |

---

## 3. Brand & Visual Identity

### 3.1 Logo
The official logo uses Arabic calligraphy fused with the word 
"Blockchain" in a bilingual lockup with a red accent element.
- Used in: Navbar, Footer, Favicon, OG images, Loading screen
- Never stretch, recolor, or alter the logo
- Minimum size: 32px height
- Clear space: equal to the height of the logo on all sides

### 3.2 Color System

| Role | Name | Hex | Usage |
|---|---|---|---|
| Primary Brand | Deep Violet | `#3B1F8C` | Buttons, active states, CTAs |
| Secondary Surface | Dark Teal | `#003D5B` | Card backgrounds, surfaces |
| Accent / Heritage | Gold | `#F5A623` | Headlines, highlights, icons |
| Tech Accent | Electric Teal | `#00D4B4` | Links, badges, hover states |
| Background Dark | Near Black | `#0D0D1A` | Page background (dark mode) |
| Background Light | Soft White | `#F8F7FF` | Page background (light mode) |
| Surface Dark | Dark Card | `#13132A` | Card bg, nav bg, footer bg |
| Text Primary | Off White | `#E8E6F0` | Body text, headings |
| Text Secondary | Muted Lavender | `#9B97B8` | Meta text, captions, labels |
| Success | Emerald | `#22C55E` | Live badges, confirmations |
| Warning | Amber | `#F59E0B` | Upcoming event notices |
| Error | Rose | `#F43F5E` | Form errors, alerts |
| In-Person Badge | Green | `#16A34A` | Event type indicator |
| Online Badge | Blue | `#2563EB` | Event type indicator |
| Side Event Badge | Purple | `#7C3AED` | Event type indicator |

### 3.3 Gradients

```css
/* Hero background */
--gradient-hero: linear-gradient(135deg, #0D0D1A 0%, 
                 #1A0F3C 50%, #0D0D1A 100%);

/* CTA button */
--gradient-cta: linear-gradient(135deg, #3B1F8C, #5B2FC0);

/* Gold accent */
--gradient-gold: linear-gradient(135deg, #F5A623, #E8920F);

/* Card hover */
--gradient-card: linear-gradient(135deg, #13132A, #1E1640);

/* Stats bar */
--gradient-stats: linear-gradient(90deg, #3B1F8C, #2D1870);
```

### 3.4 Typography

| Role | Font | Weight | Size | Usage |
|---|---|---|---|---|
| Arabic Primary | Cairo | 400/600/700 | Variable | All Arabic text |
| English Primary | Space Grotesk | 400/500/700 | Variable | All English text |
| Monospace | JetBrains Mono | 400 | 14px | Addresses, code |

**Type Scale:**

| Level | Size | Weight | Color | Font |
|---|---|---|---|---|
| Display | 64px | 700 | Gold `#F5A623` | Cairo/Space Grotesk |
| H1 | 48px | 700 | Off White `#E8E6F0` | Cairo/Space Grotesk |
| H2 | 36px | 600 | Off White `#E8E6F0` | Cairo/Space Grotesk |
| H3 | 24px | 600 | Off White `#E8E6F0` | Cairo/Space Grotesk |
| H4 | 20px | 500 | Off White `#E8E6F0` | Cairo/Space Grotesk |
| Body L | 18px | 400 | Off White `#E8E6F0` | Cairo/Space Grotesk |
| Body M | 16px | 400 | Off White `#E8E6F0` | Cairo/Space Grotesk |
| Body S | 14px | 400 | Muted `#9B97B8` | Cairo/Space Grotesk |
| Caption | 12px | 400 | Muted `#9B97B8` | Cairo/Space Grotesk |
| Label | 11px | 600 | Muted `#9B97B8` | Cairo/Space Grotesk |

**Arabic-specific rules:**
- Line height: 1.8 minimum for Arabic body text
- Letter spacing: 0 (never adjust Arabic letter spacing)
- Always load Cairo before rendering Arabic text
- Font subset: Arabic + Latin extended

### 3.5 Spacing Scale

```
4px · 8px · 12px · 16px · 24px · 32px · 48px · 64px · 80px · 96px · 128px
```

### 3.6 Border Radius

| Element | Radius |
|---|---|
| Page cards | 16px |
| Buttons | 10px |
| Badges / Pills | 999px |
| Input fields | 8px |
| Avatars | 50% |
| Image thumbnails | 12px |
| Modals / Drawers | 20px |

### 3.7 Shadows

```css
/* Card shadow (dark mode) */
--shadow-card: 0 4px 24px rgba(0, 0, 0, 0.4);

/* Card hover */
--shadow-card-hover: 0 8px 40px rgba(59, 31, 140, 0.3);

/* CTA button */
--shadow-cta: 0 4px 20px rgba(59, 31, 140, 0.5);

/* Gold glow (featured elements) */
--shadow-gold: 0 0 20px rgba(245, 166, 35, 0.2);

/* Navbar */
--shadow-nav: 0 1px 0 rgba(255, 255, 255, 0.07);
```

### 3.8 Design Language

- **Default Mode:** Dark mode
- **Toggle:** Light mode available via header toggle
- **Style:** "Web3 Arabesque" — Islamic geometric patterns as 
  subtle background textures; clean modern layout
- **Motion:** Subtle fade-ins (300ms), scroll-triggered reveals; 
  no heavy animations that degrade performance
- **Geometry:** Hexagons (blockchain nodes) + Islamic geometric 
  tessellation as decorative motifs — used sparingly
- **Imagery:** Real community photos always preferred over stock
- **Patterns:** Subtle hexagonal mesh in hero sections; 
  geometric Islamic border patterns as section dividers

---

## 4. Site Architecture

### 4.1 Navigation Map

```
/ (Home)
├── /about
├── /events
│   ├── /events/upcoming
│   └── /events/past
├── /community
│   └── /community/opportunities
├── /partners
├── /gallery
├── /contact
├── /privacy-policy
├── /code-of-conduct
└── /404
```

### 4.2 Navigation Component

```
[Logo]  Home  About  Events  Community  Partners  Gallery  
                                          [AR|EN]  [☀️/🌙]  [Join →]
```

- Sticky on scroll with blur backdrop
- Mobile: hamburger menu → full-screen overlay
- Active page highlighted in off-white
- Language toggle: pill shape, switches full site + dir attribute
- Join button: gold gradient, always visible

---

## 5. Pages — Detailed Specification

---

### PAGE 1: Home (/)

#### Section 1: Hero
- **Background:** Dark gradient + subtle animated hexagon mesh
- **Content:**
  - Arabic headline (Display, Gold): "العرب × بلوكتشين"
  - English headline (H1, Off White): "Arabs in Blockchain"
  - Subtext: Mission statement in Arabic + English
  - Primary CTA: "Join the Community" → Telegram (Gold button)
  - Secondary CTA: "See Our Events →" → /events (Outlined)
- **Height:** 100vh minimum

#### Section 2: Stats Bar
- **Background:** Violet gradient strip (#3B1F8C)
- **Content:** 5 stats in a horizontal row
  - 🗓 Since 2020
  - 👥 500+ Members  
  - 🎪 50+ Events
  - 🌍 15+ Countries
  - 🤝 20+ Partners
- **Style:** Numbers in Teal, labels in Off White

#### Section 3: What We Do
- **Layout:** 3 equal cards
- **Cards:**
  1. 🎓 Learn Together — study groups, workshops, online AMAs
  2. 🤝 Meet & Network — meetups in Egypt, UAE, MENA
  3. 🌍 Represent Arabs in Web3 — Devcon, ETHcc, global events
- **Style:** Teal icon, Gold title, muted description, 
             violet border, dark card bg

#### Section 4: Upcoming Events Preview
- **Layout:** 2 event cards side by side
- **Each card contains:**
  - Banner image placeholder
  - Event type badge (In-Person/Online/Side Event)
  - Title in Arabic + English
  - Date with calendar icon
  - Location with pin icon
  - 2-line description
  - Gold "Register Now" button
  - Grey "Add to Calendar" link
- **Section CTA:** "View All Events →" right-aligned

#### Section 5: Community Photo Strip
- **Layout:** Horizontal scroll row
- **Content:** 6+ real event photos, lazy-loaded
- **Style:** Rounded corners, slight hover zoom (scale 1.03)
- **Caption:** Event name + location below each

#### Section 6: Opportunities Teaser
- **Background:** Subtle violet tint section
- **Layout:** 2×2 icon grid
- **Items:**
  - 🎟 Free Conference Tickets
  - 📚 Course Scholarships
  - 💰 Grants & Funding
  - 💼 Job Opportunities
- **CTA:** "Explore Opportunities →" → /community/opportunities

#### Section 7: Partners Strip
- **Title:** "Trusted Partners & Sponsors"
- **Layout:** Horizontal logo row
- **Style:** Grayscale logos, color on hover

#### Section 8: Join CTA Banner
- **Background:** Gold gradient
- **Content:** Bilingual headline + Telegram button + social icons

#### Section 9: Footer
- **Layout:** 4-column grid
  - Col 1: Logo + mission statement (AR + EN)
  - Col 2: Quick links
  - Col 3: Community links (Telegram, GitHub, Substack)
  - Col 4: Social media icons
- **Bottom bar:** Copyright + "Built by the community · 
                  Open Source"

---

### PAGE 2: Events — Upcoming (/events/upcoming)

#### Section 1: Page Header
- Bilingual title: "الفعاليات القادمة / Upcoming Events"
- Subtitle: "Where the Arab blockchain community comes together"

#### Section 2: Filter System
- **Row 1 — Type tabs (pill-shaped):**
  - All Events · In-Person 🟢 · Online 🔵 · Side Events 🟣
  - Active tab: solid violet fill
  - Inactive: outlined

- **Row 2 — Location tags:**
  - Egypt · UAE · KSA · Lebanon · Global · ETHcc · Devcon · 
    DevConnect
  - Style: Teal outlined small tags

#### Section 3: Event Cards Grid
- **Layout:** 2-column desktop, 1-column mobile
- **Each card:**
  - Banner image (16:9 aspect ratio)
  - Type badge (colored pill)
  - Arabic event title (H3)
  - English event title (H4)
  - 📅 Date line
  - 📍 Location / 💻 Platform
  - 2-line description
  - Gold "Register Now →" button
  - Grey "+ Add to Calendar" link

#### Section 4: Compact List View
- Toggle between grid and list view (icon buttons top right)
- List row: Number badge · Event name · Location · Date · 
            RSVP button
- Alternating row background for readability

#### Section 5: Host an Event CTA
- Dark card, full width
- Text: "Want to host an event with us?"
- Outlined "Contact Us" button

---

### PAGE 3: Events — Past (/events/past)

#### Section 1: Page Header
- "الفعاليات السابقة / Past Events"

#### Section 2: Search + Filters
- 🔍 Search input (searches title, location, description)
- Year tabs: 2020 · 2021 · 2022 · 2023 · 2024 · 2025 · 2026
- Type filter: All · In-Person · Online · Side Event

#### Section 3: Timeline Grid
- Grouped by year (year as section header)
- Each event row:
  - Thumbnail image (left)
  - Event title AR + EN
  - Date + Location + Type badge
  - "View more" link
  - "Photos (24)" link with camera icon

---

### PAGE 4: About (/about)

#### Section 1: Hero
- Bilingual title: "من نحن / About Us"
- Subtitle in AR + EN
- Geometric patterned background

#### Section 2: Mission Block
- **Layout:** 2-column
  - Right: Arabic paragraph (RTL, Cairo font)
  - Left: English paragraph (LTR, Space Grotesk)
  - Teal vertical divider between columns

#### Section 3: Milestone Timeline
- Horizontal scrollable timeline
- 5 nodes: 2020 · 2021 · 2022 · 2023 · 2024–Present
- Each node: Icon above · Year · Short description below
- Gold for current, violet for past

#### Section 4: Who We Welcome
- 3 cards:
  1. 🗣 Arabic Speakers
  2. 🌱 Arab Origin
  3. 📍 Living in Arab Countries
- Teal icon, Gold title, Violet border

#### Section 5: Core Values
- 6-item grid (2 rows × 3):
  Openness · Education · Empowerment · 
  Community · Arab Identity · Borderless

#### Section 6: Core Team
- Avatar cards (circular photo placeholder)
- Name, Role, X/Twitter icon, LinkedIn icon

#### Section 7: Impact Stats
- Large numbers in Gold on dark background
- 500+ Members · 50+ Events · 20+ Countries · Since 2020

#### Section 8: Join CTA
- "Ready to Join?" centered + Gold Telegram button

---

### PAGE 5: Community (/community)

#### Section 1: Page Header
- "Join the Community / انضم إلى المجتمع"

#### Section 2: How It Works
- 3-step horizontal flow:
  1. 🔗 Click the Link
  2. 📱 Join Our Telegram
  3. 👋 Introduce Yourself!
- Teal arrows between steps
- Large Gold Telegram CTA button centered below

#### Section 3: What Happens in the Group
- 4 feature cards in a row:
  - 📚 Study Groups
  - ❓ Ask & Get Help
  - 💼 Job Sharing
  - 🎟 Opportunities

#### Section 4: Opportunities (/community/opportunities)
- "We Open Doors" title
- 2×2 grid:
  - 🎟 Free Conference Tickets
  - 📚 Course Scholarships
  - 💰 Grants & Funding
  - 💼 Job Opportunities
- Each card: icon · title · description · "Learn More →"

#### Section 5: Find Us Everywhere
- "Our Channels" title
- 2-row grid of platform cards:
  Telegram · Twitter/X · LinkedIn · YouTube · 
  Facebook · Substack · GitHub · Meetup
- Each with platform icon + member/follower count placeholder

---

### PAGE 6: Partners (/partners)

#### Section 1: Page Header
- "الشركاء والرعاة / Partners & Sponsors"
- Subtitle: "Organizations that share our mission"

#### Section 2: Current Partners Grid
- 3-column card grid
- Each card:
  - Company logo (light on dark)
  - Partner name (White)
  - Type badge pill (Technology/Event/Education/Sponsor)
  - 2-line description
  - "Visit Website →" teal link

#### Section 3: Past Partners
- "Past Collaborations" title
- Horizontal logo row, 50% opacity

#### Section 4: Become a Partner CTA
- Full-width violet gradient section
- Left: Benefits bullet list
- Right: "Get in Touch" Gold button + email

---

### PAGE 7: Gallery (/gallery)

#### Section 1: Page Header
- "معرض الصور / Gallery"

#### Section 2: Filter Bar
- Pills: All · 2024 · 2023 · 2022 · ETHcc · Devcon · 
         Egypt · UAE
- Active: solid violet

#### Section 3: Masonry Grid
- Mixed portrait/landscape photo placeholders
- Hover overlay: Event name + date + location
- Click → Lightbox (full screen, prev/next, caption)

#### Section 4: Load More
- Centered outlined Gold "Load More Photos" button

---

### PAGE 8: Contact (/contact)

#### Section 1: Page Header
- "تواصل معنا / Get in Touch"

#### Section 2: Two-Column Layout
- **Left:** Contact info
  - Telegram, Email, Twitter/X, LinkedIn
  - GitHub open source note
- **Right:** Contact form
  - Full Name input
  - Email Address input
  - Subject dropdown:
    Partnership · Speaking · Media · General · Other
  - Message textarea
  - Gold "Send Message →" submit button
  - Privacy note below button

---

### UTILITY PAGES

#### /privacy-policy
- Standard privacy policy
- Data collected: minimal (form submissions only)
- No tracking without consent
- Bilingual (AR + EN)

#### /code-of-conduct
- Community rules and values
- Reporting mechanism
- Bilingual (AR + EN)

#### /404
- Branded 404 page
- Bilingual message
- CTA back to Home + Join Telegram

---

## 6. Tech Stack

> Constraint: Zero ongoing cost · Community-maintained · 
> Open source

### 6.1 Core Stack

| Layer | Technology | Justification |
|---|---|---|
| Framework | Next.js 15 (App Router) | SSG/SSR, i18n, React ecosystem |
| Language | TypeScript | Type safety, maintainability |
| Styling | Tailwind CSS v4 | RTL plugin, rapid dev, zero runtime |
| i18n | next-intl | Best Next.js i18n + RTL support |
| Content | MDX + JSON files in /content | Zero CMS cost, Git-as-CMS |
| Images | Cloudinary free tier | CDN, optimization, 25GB free |
| Hosting | Vercel free tier | Auto-deploy, Next.js native |
| Forms | Formspree free tier | No backend needed |
| Analytics | Umami (self-hosted on Railway free) | Privacy-first |
| Search | Fuse.js (client-side) | No backend, fuzzy search |
| Icons | Lucide React | Lightweight, consistent |
| Animations | Framer Motion (minimal use) | Scroll reveals, page transitions |

### 6.2 Additional Free Services

| Service | Purpose | Free Tier |
|---|---|---|
| GitHub | Version control + CI | Free public repos |
| Vercel | Hosting + auto-deploy | 100GB bandwidth/month |
| Cloudinary | Image CDN | 25GB storage + 25GB bandwidth |
| Formspree | Contact form | 50 submissions/month |
| Umami | Analytics | Free self-hosted |

### 6.3 Directory Structure

```
/
├── app/
│   └── [locale]/
│       ├── layout.tsx
│       ├── page.tsx                    → Home
│       ├── about/
│       │   └── page.tsx
│       ├── events/
│       │   ├── upcoming/
│       │   │   └── page.tsx
│       │   └── past/
│       │       └── page.tsx
│       ├── community/
│       │   ├── page.tsx
│       │   └── opportunities/
│       │       └── page.tsx
│       ├── partners/
│       │   └── page.tsx
│       ├── gallery/
│       │   └── page.tsx
│       ├── contact/
│       │   └── page.tsx
│       ├── privacy-policy/
│       │   └── page.tsx
│       ├── code-of-conduct/
│       │   └── page.tsx
│       └── not-found.tsx
│
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── Select.tsx
│   │   └── Skeleton.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileMenu.tsx
│   │   └── LanguageToggle.tsx
│   ├── events/
│   │   ├── EventCard.tsx
│   │   ├── EventCardCompact.tsx
│   │   ├── EventList.tsx
│   │   ├── EventFilter.tsx
│   │   └── EventBadge.tsx
│   ├── gallery/
│   │   ├── PhotoGrid.tsx
│   │   ├── PhotoCard.tsx
│   │   └── Lightbox.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── StatsBar.tsx
│   │   ├── WhatWeDo.tsx
│   │   ├── PhotoStrip.tsx
│   │   ├── OpportunitiesTeaser.tsx
│   │   └── JoinCTA.tsx
│   ├── partners/
│   │   ├── PartnerCard.tsx
│   │   └── PartnerLogos.tsx
│   └── shared/
│       ├── PageHeader.tsx
│       ├── SectionTitle.tsx
│       ├── Timeline.tsx
│       ├── StatCard.tsx
│       ├── SocialLinks.tsx
│       └── HexagonMesh.tsx
│
├── content/
│   ├── events/
│   │   ├── upcoming/
│   │   │   └── [event-slug].mdx
│   │   └── past/
│   │       └── [event-slug].mdx
│   ├── partners/
│   │   └── [partner-slug].json
│   ├── opportunities/
│   │   └── [opportunity-slug].mdx
│   ├── team/
│   │   └── [member-slug].json
│   └── pages/
│       ├── about.mdx
│       └── code-of-conduct.mdx
│
├── messages/
│   ├── ar.json                         → Arabic strings
│   └── en.json                         → English strings
│
├── lib/
│   ├── content.ts                      → MDX/JSON readers
│   ├── events.ts                       → Event data helpers
│   └── utils.ts                        → Shared utilities
│
├── public/
│   ├── logo.svg
│   ├── favicon.ico
│   └── og-default.png
│
├── styles/
│   └── globals.css
│
├── tailwind.config.ts
├── next.config.ts
├── middleware.ts                       → i18n routing
└── tsconfig.json
```

### 6.4 Content Schema — Event MDX

```mdx
---
title_ar: "اسم الفعالية"
title_en: "Event Name"
type: "in-person" | "online" | "side-event"
status: "upcoming" | "past"
date: "2026-06-15"
time: "18:00"
timezone: "Africa/Cairo"
location_ar: "القاهرة، مصر"
location_en: "Cairo, Egypt"
platform: null
conference: null
registration_url: "https://lu.ma/..."
recap_url: null
photos_count: 0
banner_image: "https://res.cloudinary.com/..."
tags: ["networking", "education", "cairo"]
---

Event description in Arabic and English...
```

### 6.5 Content Schema — Partner JSON

```json
{
  "name": "Partner Name",
  "logo": "https://res.cloudinary.com/...",
  "website": "https://...",
  "type": "technology|event|education|sponsor",
  "description_ar": "وصف الشريك بالعربية",
  "description_en": "Partner description in English",
  "status": "current|past",
  "since": "2022"
}
```

---

## 7. Internationalization & RTL

- **Locales:** `ar` (default, RTL) and `en` (LTR)
- **Routing:** `/ar/...` and `/en/...` via next-intl middleware
- **Direction:** `dir="rtl"` at `<html>` level for Arabic
- **Font loading:** Cairo loaded only when locale is `ar`
- **Storage:** Locale preference in localStorage + cookie
- **Date formatting:** Arabic locale for AR, en-GB for EN
- **Number formatting:** Arabic-Indic numerals option for AR
- **RTL Tailwind:** All spacing uses logical properties
  (`ms-`, `me-`, `ps-`, `pe-`) not physical (`ml-`, `mr-`)

---

## 8. Responsive Breakpoints

| Name | Width | Target |
|---|---|---|
| Mobile S | 375px | iPhone SE, small Android |
| Mobile L | 428px | iPhone Pro Max |
| Tablet | 768px | iPad portrait |
| Laptop | 1024px | Small laptops |
| Desktop | 1280px | Standard desktop |
| Wide | 1440px | Large monitors |

**Mobile-first approach:** All components built mobile-up.
MENA users skew heavily mobile — this is critical.

---

## 9. Accessibility (A11y)

- **Standard:** WCAG 2.1 AA minimum
- **Contrast:** All text/background combinations tested
- **Keyboard:** Full keyboard navigation support
- **Screen reader:** All images have bilingual `alt` attributes
- **Focus:** Visible focus rings on all interactive elements
- **ARIA:** `aria-label` on all icon-only buttons
- **Reduced motion:** `prefers-reduced-motion` respected
- **Font size:** Minimum 16px for body text
- **Touch targets:** Minimum 44×44px on mobile

---

## 10. Performance Targets

| Metric | Target |
|---|---|
| Lighthouse Performance | 90+ |
| Lighthouse Accessibility | 95+ |
| Lighthouse SEO | 95+ |
| LCP | < 2.5s |
| CLS | < 0.1 |
| FID / INP | < 100ms |
| Bundle size (JS) | < 200KB gzipped |
| Image format | WebP/AVIF via Cloudinary |

**Optimization strategies:**
- Static generation for all pages (SSG)
- Images lazy-loaded with blur placeholder
- Fonts: `font-display: swap`, subset to used chars only
- No unused CSS (Tailwind purge)
- Bundle analyzed via `@next/bundle-analyzer`

---

## 11. SEO

- Bilingual meta tags per page (AR + EN)
- Open Graph + Twitter Card for every page and event
- JSON-LD structured data:
  - `Organization` on homepage
  - `Event` schema on event pages
  - `BreadcrumbList` on inner pages
- Auto-generated sitemap via `next-sitemap`
- `robots.txt` configured
- Canonical URLs for language variants
- Semantic HTML throughout (proper heading hierarchy)

---

## 12. Security

- HTTPS enforced (Vercel default)
- Rate limiting on contact form (Formspree handles)
- Input sanitization on all form fields
- No sensitive data stored client-side
- Content Security Policy headers via next.config.ts
- No user authentication in Phase 1

---

## 13. Phase 2 Roadmap

| Feature | Notes | Estimated Effort |
|---|---|---|
| Member directory | Opt-in profiles, Supabase free | Medium |
| Newsletter archive | Pull from Substack RSS | Small |
| Blog / Event recaps | MDX blog posts | Small |
| On-chain badges | POAPs / NFT attendance | Large |
| Job board | Curated Web3 jobs | Medium |
| Event submission form | Community-submitted events | Medium |
| Web3 wallet connect | Optional identity layer | Large |
| Discord embed | Community chat widget | Small |

---

## 14. Success Metrics

| Metric | How to Measure |
|---|---|
| Telegram referrals | UTM link tracking |
| Event registration clicks | Umami click events |
| Monthly unique visitors | Umami dashboard |
| Bounce rate | Target < 50% |
| Partner inquiries | Formspree submissions |
| GitHub contributions | GitHub insights |
| Page load speed | Lighthouse CI |

