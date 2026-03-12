# FX Experience — Project Instructions for Claude Code

## Project Overview

This is **FX Experience (DPX Digital)**, a Next.js 15 + React 18 + TypeScript platform for the **Freudenberg Group** global exchange and talent development program. It uses Tailwind CSS, shadcn/ui (Radix), Framer Motion, and AI integrations (OpenAI + Gemini via Genkit).

## Current Task: "Glass & Gold" UX Redesign

There is a detailed implementation plan in `CLAUDE-CODE-IMPLEMENTATION-PLAN.md` at the project root. **You MUST read and follow that file for all UX work.**

### Design Language: Three Visual Layers

The platform uses THREE distinct visual layers that coexist in a hierarchy:

1. **Layer 1: Standard Freudenberg (80% of UI)** — Solid corporate blue #293B5F + gray. No transparency. Used for: sidebar background, header base, table rows, form fields, labels, inactive nav items. CSS: `bg-primary`, `card-standard`, standard Tailwind classes.

2. **Layer 2: Glass & Gold (15% of UI)** — Translucent glassmorphism surfaces + gold gradient borders (#C5941A → #E8C547 → #D4A829). Used for: KPI cards, active tabs, CTA buttons, modal dialogs, hero sections, featured badges, progress bars. CSS: `glass`, `glass-strong`, `gold-border`, `gold-gradient`, `gold-text`.

3. **Layer 3: Crystal Transparent (5% of UI)** — Pure glass sphere effect with chrome metallic rim, specular highlights, and chromatic aberration at edges. Used for: chatbot FAB, quick-action floating buttons. CSS: `crystal-button`, `crystal-panel`.

### Key Rules

- **Follow the plan phase by phase.** Do not skip ahead.
- **Phase 0 MUST be completed first** — all other phases depend on the CSS tokens and utility classes defined there.
- **Do not invent new patterns.** Only use the CSS classes and design tokens specified in the plan.
- **Test after Phase 1 and Phase 2** by running `npm run dev` to verify the foundation works before rewriting pages.
- **Preserve all existing functionality.** The redesign is purely visual — do not change business logic, data flows, AI integrations, i18n, or routing.
- **Framer Motion is already installed** (`framer-motion@11.5.7`). Use it for page transitions and micro-interactions as specified.
- **Both light and dark modes must work.** Every glass/gold utility has dark mode variants already defined.

### Implementation Order

```
Phase 0: globals.css → tailwind.config.ts (tokens + utilities)
Phase 1: card.tsx → button.tsx → badge.tsx → progress.tsx → tabs.tsx → dialog.tsx → input.tsx → sidebar.tsx → tooltip.tsx
Phase 2: dashboard/layout.tsx → sidebar-nav.tsx
Phase 3: dashboard/home/page.tsx (full rewrite) → exchange-center → innovation-labs → learning → diary → mentorship
Phase 4: login/page.tsx
Phase 5: chatbot.tsx
Phase 6: logo.tsx → user-nav.tsx → date-time.tsx → theme-toggle.tsx
Phase 7: Verification checklist
```

### New CSS Classes Available (after Phase 0)

| Class | Purpose |
|-------|---------|
| `glass` | Standard glassmorphism (blur + translucent bg + border) |
| `glass-subtle` | Lighter glass effect for small elements |
| `glass-strong` | Stronger glass for modals and elevated surfaces |
| `gold-gradient` | Gold gradient background |
| `gold-border` | Gold gradient border using background-clip trick |
| `gold-glow` | Gold box-shadow glow effect |
| `gold-text` | Gold gradient text (background-clip: text) |
| `glass-button-circle` | Circular glassmorphism button (56px) |
| `card-hover` | Smooth lift + shadow on hover |
| `animate-fade-up` | Fade up entry animation |
| `animate-pulse-gold` | Pulsing gold glow |
| `animate-count-up` | Counter-style entry animation |
| `stagger-children` | Auto-stagger fade-up for child elements |
| `skeleton-gold` | Loading skeleton with gold shimmer |
| `shimmer-gold` | Gold shimmer text effect |
| `dashboard-bg` | Subtle radial gradient background |
| `card-standard` | Solid corporate card — Layer 1, no glass |
| `crystal-button` | Crystal glass orb button — Layer 3 |
| `crystal-panel` | Crystal transparent floating panel — Layer 3 |

### New Button Variants (after Phase 1)

| Variant | Usage |
|---------|-------|
| `gold` | Primary CTA buttons (Submit Idea, Apply Now, Generate Report) |
| `glass` | Secondary actions on glass surfaces |

### New Badge Variants (after Phase 1)

| Variant | Usage |
|---------|-------|
| `gold` | Featured/highlighted status badges |
| `glass` | Skill tags, category labels |

### Tailwind Color Token

```
gold / gold-light / gold-dark → hsl(var(--gold)) / hsl(var(--gold-light)) / hsl(var(--gold-dark))
```

Use as: `text-gold`, `bg-gold`, `border-gold`, `text-gold-light`, etc.

## Tech Stack Reference

- **Framework:** Next.js 15.3.8 (App Router)
- **UI:** shadcn/ui (Radix primitives) in `src/components/ui/`
- **Styling:** Tailwind CSS + CSS custom properties in `src/app/globals.css`
- **Animation:** Framer Motion 11.5.7
- **Icons:** Lucide React
- **Charts:** Recharts
- **Themes:** next-themes (light/dark)
- **i18n:** Custom LanguageContext (PT/EN/DE) in `src/contexts/LanguageContext.tsx`
- **Fonts:** Inter (Google Fonts)

## File Structure

```
src/
├── app/
│   ├── globals.css              ← Design tokens & utilities
│   ├── layout.tsx               ← Root layout (providers)
│   ├── login/page.tsx           ← Login page
│   ├── enrollment/page.tsx      ← Enrollment form
│   └── dashboard/
│       ├── layout.tsx           ← Dashboard shell (sidebar + header)
│       ├── home/page.tsx        ← Home dashboard (PRIORITY)
│       ├── exchange-center/     ← Exchange opportunities
│       ├── innovation-labs/     ← Innovation challenges
│       ├── learning/            ← Learning hub
│       ├── diary/               ← Digital diary
│       ├── mentorship/          ← Mentorship module
│       ├── calendar/            ← Calendar & events
│       ├── reports/             ← Reports & A3
│       ├── admin/               ← Admin dashboard
│       ├── approvals/           ← Approval workflows
│       └── settings/            ← Settings
├── components/
│   ├── ui/                      ← shadcn/ui components
│   ├── chatbot.tsx              ← Freudy AI chatbot
│   ├── sidebar-nav.tsx          ← Navigation menu
│   ├── role-switcher.tsx        ← RBAC role switching
│   ├── logo.tsx                 ← Logo with provider
│   ├── world-talent-map.tsx     ← Interactive world map
│   ├── user-nav.tsx             ← User dropdown
│   ├── date-time.tsx            ← Clock display
│   ├── theme-toggle.tsx         ← Dark/light toggle
│   └── language-toggle.tsx      ← i18n toggle
├── contexts/
│   └── LanguageContext.tsx       ← Multi-language provider
├── lib/
│   ├── data.ts                  ← Mock data & types
│   ├── utils.ts                 ← cn() utility
│   └── placeholder-images.ts    ← Image references
├── locales/
│   ├── en.json, pt.json, de.json
└── ai/
    └── flows/                   ← AI flows (Genkit + OpenAI)
```

## Do NOT Modify

- `src/ai/` — AI flows and integrations
- `src/lib/data.ts` — Mock data structure
- `src/contexts/LanguageContext.tsx` — i18n logic
- `src/locales/*.json` — Translation files
- `package.json` — Dependencies (everything needed is already installed)
- Any routing or business logic
