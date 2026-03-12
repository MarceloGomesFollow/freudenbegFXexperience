# FX Experience — Glass & Gold UX Implementation Plan

> **PURPOSE:** This document is a step-by-step implementation guide for Claude Code (VS Code). Follow each phase in order. Every instruction includes the exact file path, the exact code to add/modify, and the rationale. Do NOT skip steps. Do NOT invent new patterns — use only what is specified here.

---

## PHASE 0 — DESIGN TOKENS & CSS FOUNDATION

### File: `src/app/globals.css`

**GOAL:** Replace the current CSS custom properties with the Glass & Gold design system. Add new utility classes for glassmorphism, gold accents, and animations.

**REPLACE the entire `:root` block** inside `@layer base` with:

```css
:root {
  /* --- Glass & Gold Design System --- */
  /* Backgrounds */
  --background: 0 0% 97%;            /* #F7F7F7 */
  --foreground: 230 25% 12%;         /* #1A1A2E */

  /* Surfaces (glass) */
  --card: 0 0% 100%;
  --card-foreground: 230 25% 12%;
  --popover: 0 0% 100%;
  --popover-foreground: 230 25% 12%;

  /* Brand */
  --primary: 220 35% 27%;            /* #293B5F Freudenberg Blue */
  --primary-foreground: 0 0% 98%;

  /* Secondary */
  --secondary: 220 15% 92%;          /* #E8EBF0 */
  --secondary-foreground: 230 25% 12%;

  /* Muted */
  --muted: 220 15% 92%;
  --muted-foreground: 220 10% 40%;

  /* Accent - Teal */
  --accent: 166 22% 50%;             /* #6A9993 */
  --accent-foreground: 0 0% 98%;

  /* Destructive */
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 98%;

  /* Borders & inputs */
  --border: 220 15% 88%;
  --input: 220 15% 88%;
  --ring: 43 78% 44%;                /* Gold as ring color */

  /* Gold Accent Tokens */
  --gold: 43 78% 44%;                /* #C5941A */
  --gold-light: 46 78% 59%;          /* #E8C547 */
  --gold-dark: 42 67% 50%;           /* #D4A829 */

  /* Chart colors */
  --chart-1: 220 35% 27%;
  --chart-2: 166 22% 50%;
  --chart-3: 43 78% 44%;
  --chart-4: 220 20% 55%;
  --chart-5: 166 15% 70%;

  --radius: 0.75rem;

  /* Sidebar */
  --sidebar-background: 225 15% 15%;      /* Deep dark blue-gray */
  --sidebar-foreground: 220 14% 95%;
  --sidebar-primary: 43 78% 44%;          /* Gold as sidebar accent */
  --sidebar-primary-foreground: 0 0% 98%;
  --sidebar-accent: 43 78% 44%;           /* Gold */
  --sidebar-accent-foreground: 0 0% 98%;
  --sidebar-border: 225 15% 22%;
  --sidebar-ring: 43 78% 44%;

  /* Glass tokens */
  --glass-bg: 0 0% 100% / 0.7;
  --glass-border: 0 0% 100% / 0.3;
  --glass-blur: 20px;
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
}

.dark {
  --background: 230 25% 4%;          /* #090A10 */
  --foreground: 0 0% 96%;

  --card: 230 20% 8%;
  --card-foreground: 0 0% 96%;
  --popover: 230 20% 6%;
  --popover-foreground: 0 0% 96%;

  --primary: 0 0% 96%;
  --primary-foreground: 220 35% 27%;

  --secondary: 230 20% 12%;
  --secondary-foreground: 0 0% 96%;

  --muted: 230 20% 12%;
  --muted-foreground: 0 0% 64%;

  --accent: 166 22% 50%;
  --accent-foreground: 0 0% 98%;

  --destructive: 0 63% 31%;
  --destructive-foreground: 0 0% 98%;

  --border: 230 20% 14%;
  --input: 230 20% 14%;
  --ring: 46 78% 59%;               /* Lighter gold in dark */

  --gold: 46 78% 59%;               /* Brighter gold for dark mode */
  --gold-light: 46 80% 68%;
  --gold-dark: 43 78% 44%;

  --chart-1: 0 0% 96%;
  --chart-2: 166 22% 50%;
  --chart-3: 46 78% 59%;
  --chart-4: 0 0% 80%;
  --chart-5: 166 15% 70%;

  --sidebar-background: 230 20% 7%;
  --sidebar-foreground: 220 14% 95%;
  --sidebar-primary: 46 78% 59%;
  --sidebar-primary-foreground: 230 25% 4%;
  --sidebar-accent: 46 78% 59%;
  --sidebar-accent-foreground: 230 25% 4%;
  --sidebar-border: 230 20% 12%;
  --sidebar-ring: 46 78% 59%;

  --glass-bg: 0 0% 100% / 0.05;
  --glass-border: 0 0% 100% / 0.08;
  --glass-blur: 20px;
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}
```

**ADD** to `tailwind.config.ts` inside `theme.extend.colors`:

```typescript
gold: {
  DEFAULT: 'hsl(var(--gold))',
  light: 'hsl(var(--gold-light))',
  dark: 'hsl(var(--gold-dark))',
},
```

**REPLACE the entire `@layer utilities` section** in `globals.css` with:

```css
@layer utilities {
  /* ========================================
     DASHBOARD BACKGROUND
     ======================================== */
  .dashboard-bg {
    background-color: hsl(var(--background));
    background-image:
      radial-gradient(ellipse at 20% 50%, hsl(var(--gold) / 0.03) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 20%, hsl(var(--primary) / 0.05) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 80%, hsl(var(--accent) / 0.03) 0%, transparent 50%);
  }
  .dark .dashboard-bg {
    background-image:
      radial-gradient(ellipse at 20% 50%, hsl(var(--gold) / 0.04) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 20%, hsl(var(--primary) / 0.03) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 80%, hsl(var(--accent) / 0.04) 0%, transparent 50%);
  }

  /* ========================================
     GLASSMORPHISM UTILITIES
     ======================================== */
  .glass {
    background: hsl(var(--glass-bg));
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border: 1px solid hsl(var(--glass-border));
    box-shadow: var(--glass-shadow);
  }

  .glass-subtle {
    background: hsl(0 0% 100% / 0.4);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid hsl(0 0% 100% / 0.2);
  }
  .dark .glass-subtle {
    background: hsl(0 0% 100% / 0.03);
    border-color: hsl(0 0% 100% / 0.06);
  }

  .glass-strong {
    background: hsl(0 0% 100% / 0.85);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid hsl(0 0% 100% / 0.4);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
  }
  .dark .glass-strong {
    background: hsl(0 0% 100% / 0.08);
    border-color: hsl(0 0% 100% / 0.1);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5);
  }

  /* ========================================
     GOLD ACCENT UTILITIES
     ======================================== */
  .gold-gradient {
    background: linear-gradient(135deg, hsl(var(--gold-dark)), hsl(var(--gold-light)), hsl(var(--gold)));
  }

  .gold-border {
    border: 2px solid transparent;
    background-image: linear-gradient(hsl(var(--card)), hsl(var(--card))),
                      linear-gradient(135deg, hsl(var(--gold-dark)), hsl(var(--gold-light)), hsl(var(--gold)));
    background-origin: border-box;
    background-clip: padding-box, border-box;
  }

  .gold-glow {
    box-shadow: 0 0 20px hsl(var(--gold) / 0.3), 0 0 40px hsl(var(--gold) / 0.1);
  }
  .dark .gold-glow {
    box-shadow: 0 0 20px hsl(var(--gold) / 0.4), 0 0 60px hsl(var(--gold) / 0.15);
  }

  .gold-text {
    background: linear-gradient(135deg, hsl(var(--gold-dark)), hsl(var(--gold-light)));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ========================================
     GLASS BUTTON (circular, from reference image 1)
     ======================================== */
  .glass-button-circle {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: hsl(0 0% 100% / 0.12);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid hsl(0 0% 100% / 0.2);
    box-shadow:
      inset 0 1px 1px hsl(0 0% 100% / 0.25),
      0 4px 16px rgba(0, 0, 0, 0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    color: white;
  }
  .glass-button-circle:hover {
    background: hsl(0 0% 100% / 0.2);
    box-shadow:
      inset 0 1px 1px hsl(0 0% 100% / 0.3),
      0 8px 24px rgba(0, 0, 0, 0.18);
    transform: translateY(-1px);
  }

  /* ========================================
     ANIMATIONS
     ======================================== */
  @keyframes shimmer-gold {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  .shimmer-gold {
    background: linear-gradient(
      90deg,
      hsl(var(--gold-dark)),
      hsl(var(--gold-light)),
      hsl(var(--gold-dark))
    );
    background-size: 200% 100%;
    animation: shimmer-gold 4s infinite linear;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @keyframes fade-up {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-fade-up {
    animation: fade-up 0.5s ease-out both;
  }

  @keyframes pulse-gold {
    0%, 100% { box-shadow: 0 0 0 0 hsl(var(--gold) / 0.4); }
    50% { box-shadow: 0 0 0 8px hsl(var(--gold) / 0); }
  }

  .animate-pulse-gold {
    animation: pulse-gold 2s ease-in-out infinite;
  }

  @keyframes count-up {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-count-up {
    animation: count-up 0.6s ease-out both;
  }

  /* Stagger children animations */
  .stagger-children > * { opacity: 0; animation: fade-up 0.4s ease-out both; }
  .stagger-children > *:nth-child(1) { animation-delay: 0.05s; }
  .stagger-children > *:nth-child(2) { animation-delay: 0.1s; }
  .stagger-children > *:nth-child(3) { animation-delay: 0.15s; }
  .stagger-children > *:nth-child(4) { animation-delay: 0.2s; }
  .stagger-children > *:nth-child(5) { animation-delay: 0.25s; }
  .stagger-children > *:nth-child(6) { animation-delay: 0.3s; }
  .stagger-children > *:nth-child(7) { animation-delay: 0.35s; }
  .stagger-children > *:nth-child(8) { animation-delay: 0.4s; }

  /* Skeleton shimmer with gold tint */
  @keyframes skeleton-shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  .skeleton-gold {
    background: linear-gradient(90deg, hsl(var(--muted)), hsl(var(--gold) / 0.1), hsl(var(--muted)));
    background-size: 200% 100%;
    animation: skeleton-shimmer 1.5s linear infinite;
  }

  /* Card hover effect */
  .card-hover {
    transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
  }
  .card-hover:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
  }
  .dark .card-hover:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  }
}
```

---

## PHASE 1 — COMPONENT UPGRADES

### 1.1 — Card Component

**File:** `src/components/ui/card.tsx`

**MODIFY** the `Card` component. Replace the `className` in the `Card` div:

```typescript
// BEFORE:
"rounded-xl border bg-card text-card-foreground shadow"

// AFTER:
"rounded-2xl bg-card text-card-foreground glass card-hover transition-all duration-200"
```

This gives every Card component glassmorphism by default, plus the smooth hover lift.

### 1.2 — Button Component

**File:** `src/components/ui/button.tsx`

**ADD a new button variant** `gold` inside the `variants.variant` object in `buttonVariants`:

```typescript
gold: "gold-gradient text-white font-semibold shadow-lg hover:shadow-xl hover:brightness-110 transition-all duration-200 border-0",
```

**ADD a new variant** `glass`:

```typescript
glass: "glass text-foreground hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-200",
```

**MODIFY** the existing `default` variant:

```typescript
// BEFORE:
default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",

// AFTER:
default: "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg transition-all duration-200",
```

### 1.3 — Badge Component

**File:** `src/components/ui/badge.tsx`

**ADD a new badge variant** `gold` inside `badgeVariants`:

```typescript
gold: "gold-gradient text-white border-0 font-semibold shadow-sm",
```

**ADD another variant** `glass`:

```typescript
glass: "glass-subtle text-foreground border-0",
```

### 1.4 — Progress Component

**File:** `src/components/ui/progress.tsx`

**MODIFY** the indicator to use a gold gradient. Change the `ProgressIndicator` styling:

```typescript
// BEFORE (the Indicator className):
"h-full w-full flex-1 bg-primary transition-all"

// AFTER:
"h-full w-full flex-1 gold-gradient transition-all duration-500 rounded-full"
```

Also change the root `Progress` component class:

```typescript
// BEFORE:
"relative h-2 w-full overflow-hidden rounded-full bg-primary/20"

// AFTER:
"relative h-2.5 w-full overflow-hidden rounded-full bg-muted/60 dark:bg-muted/30"
```

### 1.5 — Tabs Component (KEY — matches reference images 2 & 3)

**File:** `src/components/ui/tabs.tsx`

**MODIFY** `TabsList` className:

```typescript
// BEFORE:
"inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground"

// AFTER:
"inline-flex h-11 items-center justify-center rounded-2xl glass p-1.5 text-muted-foreground gap-1"
```

**MODIFY** `TabsTrigger` className:

```typescript
// BEFORE:
"inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"

// AFTER:
"inline-flex items-center justify-center whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-md data-[state=active]:gold-border data-[state=active]:font-semibold"
```

This creates the glass tab bar with gold-bordered active tab from the reference images.

### 1.6 — Dialog Component

**File:** `src/components/ui/dialog.tsx`

**MODIFY** `DialogOverlay` className:

```typescript
// BEFORE:
"fixed inset-0 z-50 bg-black/80 ..."

// AFTER:
"fixed inset-0 z-50 bg-black/60 backdrop-blur-sm ..."
```

**MODIFY** `DialogContent` className:

```typescript
// BEFORE:
"fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 ..."

// AFTER:
"fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 glass-strong rounded-2xl p-6 shadow-2xl duration-300 ..."
```

### 1.7 — Input Component

**File:** `src/components/ui/input.tsx`

**MODIFY** the input className:

```typescript
// BEFORE:
"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors ..."

// AFTER:
"flex h-10 w-full rounded-xl border border-input bg-card/50 backdrop-blur-sm px-4 py-2 text-base shadow-sm transition-all duration-200 focus:ring-2 focus:ring-gold/30 focus:border-gold/50 ..."
```

### 1.8 — Sidebar Component

**File:** `src/components/ui/sidebar.tsx`

**Find the main `Sidebar` div** (the one with `data-sidebar="sidebar"`) and modify its className. Look for where `className` includes `bg-sidebar` and change:

```typescript
// Add these classes to the main sidebar container:
"bg-sidebar/95 backdrop-blur-xl"
// The sidebar should have a slight transparency with backdrop blur
```

**Find the `SidebarMenuButton`** component and modify the active state styling. In its `className`, find the active state and add gold accent:

```typescript
// In the data-[active=true] styles, REPLACE:
"data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground"

// WITH:
"data-[active=true]:bg-sidebar-accent/15 data-[active=true]:text-sidebar-accent-foreground data-[active=true]:font-semibold data-[active=true]:shadow-sm"
```

### 1.9 — Tooltip Component

**File:** `src/components/ui/tooltip.tsx`

**MODIFY** `TooltipContent` className:

```typescript
// BEFORE:
"z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground ..."

// AFTER:
"z-50 overflow-hidden rounded-xl glass-strong px-3 py-2 text-xs text-foreground shadow-xl ..."
```

---

## PHASE 2 — LAYOUT UPGRADES

### 2.1 — Dashboard Layout

**File:** `src/app/dashboard/layout.tsx`

**MODIFY the header**. Find the `<header>` element and change its className:

```typescript
// BEFORE:
"sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-muted/30 px-4 backdrop-blur-lg sm:px-6 border-muted/20"

// AFTER:
"sticky top-0 z-30 flex h-16 items-center justify-between px-4 sm:px-6 glass border-b border-white/10 dark:border-white/5"
```

**MODIFY the RH Support button** styling:

```typescript
// BEFORE:
"hidden sm:inline-flex text-white border-white/20 bg-white/10 hover:bg-white/20 hover:text-white"

// AFTER:
"hidden sm:inline-flex glass-subtle border-0 text-foreground hover:bg-white/20 dark:hover:bg-white/10"
```

**MODIFY the main content area**. Find the `<main>` tag:

```typescript
// BEFORE:
className={cn("flex-1 min-w-0 p-4 sm:p-6 lg:p-8 bg-muted/40 dashboard-bg")}

// AFTER:
className={cn("flex-1 min-w-0 p-4 sm:p-6 lg:p-8 dashboard-bg")}
```

### 2.2 — Sidebar Navigation

**File:** `src/components/sidebar-nav.tsx`

**MODIFY the Freudy IA Dialog**. In the `FreudyIaLink` component, update the DialogContent:

```typescript
// BEFORE:
className="max-w-4xl h-[80vh] p-0 flex flex-col bg-black/10 backdrop-blur-lg border-white/20"

// AFTER:
className="max-w-4xl h-[80vh] p-0 flex flex-col glass-strong !rounded-2xl overflow-hidden"
```

---

## PHASE 3 — PAGE REDESIGNS

### 3.1 — Home Page (MOST IMPORTANT — First Impression)

**File:** `src/app/dashboard/home/page.tsx`

**COMPLETE REWRITE.** Replace the entire component with:

```tsx
"use client";

import dynamic from "next/dynamic";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { kpis, exchangeOpportunities, challenges, activityFeed, type ActivityFeedItem } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, Beaker, Briefcase, Lightbulb, Users, Rss, BookOpen, NotebookText, Star, TrendingUp, Globe } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

const WorldTalentMap = dynamic(
  () => import("@/components/world-talent-map").then((mod) => mod.WorldTalentMap),
  {
    ssr: false,
    loading: () => <div className="aspect-video w-full rounded-2xl skeleton-gold" />,
  }
);

const ActivityIcon = ({ type }: { type: ActivityFeedItem['type'] }) => {
  const iconClass = "h-5 w-5";
  switch (type) {
    case 'idea': return <Lightbulb className={`${iconClass} text-gold`} />;
    case 'course': return <BookOpen className={`${iconClass} text-accent`} />;
    case 'diary': return <NotebookText className={`${iconClass} text-accent`} />;
    case 'challenge': return <Star className={`${iconClass} text-gold`} />;
    case 'user': return <Users className={`${iconClass} text-accent`} />;
    default: return <Rss className={`${iconClass} text-muted-foreground`} />;
  }
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

interface KpiCardProps {
  title: string;
  value: number | string;
  description: string;
  icon: React.ElementType;
  accentGold?: boolean;
}

function KpiCard({ title, value, description, icon: Icon, accentGold }: KpiCardProps) {
  return (
    <motion.div variants={item}>
      <Card className={accentGold ? "gold-border" : ""}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <div className={`rounded-xl p-2.5 ${accentGold ? 'gold-gradient' : 'bg-muted/60 dark:bg-muted/30'}`}>
            <Icon className={`h-4 w-4 ${accentGold ? 'text-white' : 'text-muted-foreground'}`} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold tracking-tight">{value}</div>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <motion.div
      className="space-y-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Hero Section */}
      <motion.div variants={item} className="space-y-3">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          <span className="gold-text">FX</span>{" "}
          <span className="text-foreground">Experience</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl text-base">
          Sua plataforma central para desenvolvimento, inovação e conexão global.
          Explore o que está acontecendo no programa.
        </p>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <KpiCard
          title="Participantes Ativos"
          value={kpis.activeParticipants}
          description="Colaboradores em desenvolvimento"
          icon={Users}
          accentGold
        />
        <KpiCard
          title="Oportunidades Abertas"
          value={exchangeOpportunities.length}
          description="Vagas para intercâmbio"
          icon={Briefcase}
        />
        <KpiCard
          title="Desafios de Inovação"
          value={challenges.filter(c => c.status === 'Aberto').length}
          description="Problemas reais buscando soluções"
          icon={Beaker}
        />
        <KpiCard
          title="Ideias Submetidas"
          value={3}
          description="Novas ideias no último mês"
          icon={Lightbulb}
        />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Activity Feed */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="rounded-lg p-1.5 gold-gradient">
                  <Rss className="h-4 w-4 text-white"/>
                </div>
                Feed de Atividades
              </CardTitle>
              <CardDescription>O que está acontecendo na plataforma.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              {activityFeed.map((item, index) => {
                const userAvatar = PlaceHolderImages.find(p => p.id === item.user.avatar);
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="flex items-start gap-4 p-3 rounded-xl hover:bg-muted/50 dark:hover:bg-muted/20 transition-colors duration-200"
                  >
                    <ActivityIcon type={item.type} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">
                        <span className="font-semibold">{item.user.name}</span>{" "}
                        {item.action}{" "}
                        <Link href={item.link} className="font-semibold text-gold hover:text-gold-light transition-colors hover:underline">
                          {item.target}
                        </Link>.
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.timestamp}</p>
                    </div>
                    <Avatar className="h-8 w-8 ring-2 ring-white/20 dark:ring-white/10">
                      {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={item.user.name} />}
                      <AvatarFallback className="text-xs">{item.user.name.slice(0,2)}</AvatarFallback>
                    </Avatar>
                  </motion.div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* CTA Card */}
          <motion.div variants={item}>
            <Card className="gold-border overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-gold" />
                  Qual o seu próximo passo?
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                <Button variant="gold" size="lg" asChild className="w-full rounded-xl">
                  <Link href="/dashboard/innovation-labs/submit-idea">
                    <Lightbulb className="mr-2 h-4 w-4"/> Submeter uma Ideia
                  </Link>
                </Button>
                <Button variant="glass" size="lg" asChild className="w-full rounded-xl">
                  <Link href="/dashboard/exchange-center">
                    <Globe className="mr-2 h-4 w-4"/> Explorar Intercâmbios
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* World Map */}
          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-accent" />
                  Nossos Talentos
                </CardTitle>
                <CardDescription>
                  Participantes ativos em intercâmbio pelo mundo.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 overflow-hidden rounded-b-2xl">
                <WorldTalentMap />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
```

### 3.2 — Exchange Center

**File:** `src/app/dashboard/exchange-center/page.tsx`

**KEY CHANGES** (modify in place, don't rewrite):

1. Wrap the page content in `motion.div` with the `container`/`item` pattern shown above
2. Add `className="stagger-children"` to the grid of opportunity cards
3. Change opportunity cards to use the glass effect — add `className="gold-border"` to featured/highlighted opportunities
4. Change the "Apply Now" button to `variant="gold"`
5. Change skill badges to `variant="glass"`
6. Add a gold accent bar (`gold-gradient h-1 rounded-full`) at the top of each card
7. Wrap each card in a `motion.div` with `whileHover={{ y: -4 }}` and `transition={{ duration: 0.2 }}`

### 3.3 — Innovation Labs

**File:** `src/app/dashboard/innovation-labs/page.tsx`

**KEY CHANGES:**

1. Wrap the page in motion containers
2. Change the "Submit Idea" button to `variant="gold"`
3. Add a gold gradient progress bar overlay to challenge cards showing idea progress
4. Change status badges: use `variant="gold"` for "Open" status
5. Add `card-hover` class to each challenge card
6. Add `stagger-children` to the grid

### 3.4 — Learning Hub

**File:** `src/app/dashboard/learning/page.tsx`

**KEY CHANGES:**

1. Wrap in motion containers
2. Add `card-hover` to each learning item card
3. Change progress indicators to use gold gradient
4. Change the "Create with AI" button to `variant="gold"`
5. Add `stagger-children` to the grid

### 3.5 — Diary Page

**File:** `src/app/dashboard/diary/page.tsx`

**KEY CHANGES:**

1. The tabs now automatically get Glass & Gold treatment from Phase 1 changes (TabsList/TabsTrigger)
2. Add motion wrappers
3. Change diary entries to show a gold left-border for recent entries: `className="border-l-2 border-gold"`
4. Change the "Generate Summary" AI button to `variant="gold"`

### 3.6 — Mentorship Page

**File:** `src/app/dashboard/mentorship/page.tsx`

**KEY CHANGES:**

1. Tabs get Glass & Gold from Phase 1
2. Mentee cards get `card-hover`
3. Progress bars automatically get gold gradient from Phase 1
4. "Generate Feedback Report" button becomes `variant="gold"`
5. Wrap in motion containers

---

## PHASE 4 — LOGIN PAGE & ENROLLMENT

### 4.1 — Login Page

**File:** `src/app/login/page.tsx`

**KEY CHANGES:**

1. Replace the background with a subtle gradient:
```tsx
// Main container:
className="min-h-screen flex items-center justify-center dashboard-bg p-4"
```

2. Wrap the login card in:
```tsx
<motion.div
  initial={{ opacity: 0, y: 20, scale: 0.98 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
```

3. Add `gold-border` to the login Card
4. Change the Login button to `variant="gold"` with `className="w-full rounded-xl h-11"`
5. Add the "FX" text with `gold-text` class above the form
6. Add a `gold-gradient h-1 rounded-full w-16 mx-auto` divider under the logo

---

## PHASE 5 — CHATBOT UPGRADE

**File:** `src/components/chatbot.tsx`

**KEY CHANGES:**

1. Change the floating chat button (the round button at bottom-right):
```tsx
// Replace the button styling with glass-button-circle:
className="glass-button-circle animate-pulse-gold fixed bottom-6 right-6 z-50"
```

2. Change the chat panel container to use glass:
```tsx
// The main chat container div:
className="fixed bottom-20 right-6 z-50 w-96 max-h-[500px] glass-strong rounded-2xl overflow-hidden flex flex-col"
```

3. Change AI message bubbles to have a subtle gold-left-border:
```tsx
// AI messages:
className="bg-muted/30 rounded-2xl p-3 border-l-2 border-gold/50"
```

4. Change the send button to gold:
```tsx
// Send button:
className="gold-gradient rounded-xl p-2 text-white"
```

---

## PHASE 6 — POLISH & DETAILS

### 6.1 — Logo Component

**File:** `src/components/logo.tsx`

Add a subtle gold underline under the logo:
```tsx
// After the logo image, add:
<div className="gold-gradient h-0.5 rounded-full mt-1 opacity-60" />
```

### 6.2 — User Navigation

**File:** `src/components/user-nav.tsx`

Change the dropdown to glass styling — add `glass-strong` to the DropdownMenuContent.

### 6.3 — DateTime Component

**File:** `src/components/date-time.tsx`

Style the time display with a subtle glass chip:
```tsx
className="glass-subtle rounded-lg px-3 py-1.5 text-sm font-medium"
```

### 6.4 — Theme Toggle

**File:** `src/components/theme-toggle.tsx`

Make the toggle button glass:
```tsx
// Button wrapper:
className="glass-subtle rounded-xl border-0"
```

---

## PHASE 7 — FINAL VERIFICATION CHECKLIST

After all changes, verify:

1. **Light mode:** Cards have white-glass effect, gold accents visible but not overwhelming, subtle shadows
2. **Dark mode:** Cards have dark-glass effect, gold accents "glow" against dark background, no white text on white backgrounds
3. **Tabs:** Glass tab bar with gold-bordered active tab matches the reference images
4. **Buttons:** Gold gradient buttons are the primary CTA, glass buttons are secondary
5. **Sidebar:** Active item has gold accent, sidebar has subtle transparency
6. **Animations:** Page content fades up on load, cards lift on hover, stagger effect on grids
7. **Progress bars:** All progress bars use gold gradient
8. **Login:** Glass card with gold border, premium feel
9. **Chatbot:** Glass panel, gold send button, pulse-gold animation on the FAB
10. **Mobile:** All glass effects degrade gracefully, no performance issues

---

## IMPLEMENTATION ORDER

Execute exactly in this order:

1. `globals.css` (tokens + utilities) — **everything depends on this**
2. `tailwind.config.ts` (gold color token)
3. `card.tsx` → `button.tsx` → `badge.tsx` → `progress.tsx` → `tabs.tsx` → `dialog.tsx` → `input.tsx` → `sidebar.tsx` → `tooltip.tsx`
4. `dashboard/layout.tsx` → `sidebar-nav.tsx`
5. `dashboard/home/page.tsx` (complete rewrite)
6. Other pages: exchange-center, innovation-labs, learning, diary, mentorship
7. `login/page.tsx`
8. `chatbot.tsx` → `logo.tsx` → `user-nav.tsx` → small components

Run `npm run dev` after Phase 1 and Phase 2 to verify core styles before proceeding to page rewrites.

---

*This plan was designed for Claude Code execution. Each instruction is self-contained and can be applied sequentially without ambiguity.*
