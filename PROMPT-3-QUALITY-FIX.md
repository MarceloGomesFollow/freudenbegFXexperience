# PROMPT 3 — Quality Fix: Add 3-Layer Visual System + Upgrade Chatbot + Remaining Phases

> **CONTEXT:** Phase 0 (tokens) and Phase 1 (components) are done. Home page rewrite is done. BUT the CSS utilities in `globals.css` are missing TWO of the THREE visual layers. The current `@layer utilities` only has Layer 2 (Glass & Gold). We need to add Layer 1 (Standard Freudenberg) and Layer 3 (Crystal Transparent) classes, then upgrade the chatbot and finish remaining phases.

> **CRITICAL:** Read `QUALITY-UPGRADE-PROMPT.md` in the project root FIRST — it contains the complete 3-layer CSS spec and component mapping table.

---

## TASK 1: Add missing CSS classes to `src/app/globals.css`

In the `@layer utilities` section, ADD these classes (do NOT remove existing ones — ADD alongside them):

### Layer 1 — Standard Freudenberg (add after `.dashboard-bg`):

```css
  /* Standard card — solid Freudenberg feel, no glass */
  .card-standard {
    background: hsl(var(--card));
    border: 1px solid hsl(var(--border));
    border-radius: 16px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  }
  .dark .card-standard {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }
```

### Layer 3 — Crystal Transparent (add after `.glass-button-circle`):

```css
  /* ================================================================
     LAYER 3: CRYSTAL TRANSPARENT — Pure glass orb / chrome rim
     For: Chatbot FAB, quick-action circles, special floating elements
     ================================================================ */

  .crystal-button {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    position: relative;
    background:
      radial-gradient(
        ellipse at 30% 20%,
        hsl(0 0% 100% / 0.6) 0%,
        hsl(0 0% 100% / 0.2) 30%,
        hsl(0 0% 100% / 0.08) 55%,
        hsl(0 0% 100% / 0.03) 75%,
        transparent 100%
      );
    backdrop-filter: blur(20px) saturate(1.6);
    -webkit-backdrop-filter: blur(20px) saturate(1.6);
    border: 1.5px solid;
    border-image: linear-gradient(
      160deg,
      hsl(0 0% 85%) 0%,
      hsl(0 0% 60%) 25%,
      hsl(0 0% 95%) 50%,
      hsl(0 0% 55%) 75%,
      hsl(0 0% 80%) 100%
    ) 1;
    border-radius: 50%;
    box-shadow:
      0 6px 24px rgba(0, 0, 0, 0.18),
      0 2px 8px rgba(0, 0, 0, 0.12),
      inset 0 2px 3px hsl(0 0% 100% / 0.45),
      inset 0 -3px 8px rgba(0, 0, 0, 0.12),
      -1px 0 4px hsl(350 80% 60% / 0.08),
      1px 0 4px hsl(210 80% 60% / 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
    cursor: pointer;
    color: hsl(0 0% 100% / 0.9);
    overflow: hidden;
  }
  .crystal-button::before {
    content: '';
    position: absolute;
    top: 7px;
    left: 18%;
    width: 45%;
    height: 30%;
    background: radial-gradient(
      ellipse,
      hsl(0 0% 100% / 0.6) 0%,
      hsl(0 0% 100% / 0.15) 50%,
      transparent 100%
    );
    border-radius: 50%;
    pointer-events: none;
  }
  .crystal-button::after {
    content: '';
    position: absolute;
    bottom: 5px;
    left: 25%;
    width: 50%;
    height: 12%;
    background: radial-gradient(
      ellipse,
      hsl(0 0% 100% / 0.15) 0%,
      transparent 100%
    );
    border-radius: 50%;
    pointer-events: none;
  }
  .crystal-button:hover {
    transform: translateY(-3px) scale(1.06);
    box-shadow:
      0 12px 36px rgba(0, 0, 0, 0.22),
      0 4px 12px rgba(0, 0, 0, 0.14),
      inset 0 2px 3px hsl(0 0% 100% / 0.55),
      inset 0 -3px 8px rgba(0, 0, 0, 0.1),
      -2px 0 8px hsl(350 80% 60% / 0.12),
      2px 0 8px hsl(210 80% 60% / 0.12);
  }
  .crystal-button:active {
    transform: translateY(0) scale(0.97);
  }
  .dark .crystal-button {
    background:
      radial-gradient(
        ellipse at 30% 20%,
        hsl(0 0% 100% / 0.25) 0%,
        hsl(0 0% 100% / 0.08) 30%,
        hsl(0 0% 100% / 0.03) 55%,
        transparent 75%,
        transparent 100%
      );
    box-shadow:
      0 6px 24px rgba(0, 0, 0, 0.5),
      0 2px 8px rgba(0, 0, 0, 0.4),
      inset 0 2px 3px hsl(0 0% 100% / 0.2),
      inset 0 -3px 8px rgba(0, 0, 0, 0.3),
      -1px 0 4px hsl(350 80% 60% / 0.1),
      1px 0 4px hsl(210 80% 60% / 0.1);
  }

  /* Crystal panel — for floating panels like chat window */
  .crystal-panel {
    background:
      linear-gradient(
        160deg,
        hsl(0 0% 100% / 0.18) 0%,
        hsl(0 0% 100% / 0.06) 40%,
        hsl(0 0% 100% / 0.1) 100%
      );
    backdrop-filter: blur(24px) saturate(1.5);
    -webkit-backdrop-filter: blur(24px) saturate(1.5);
    border: 1px solid hsl(0 0% 100% / 0.2);
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 hsl(0 0% 100% / 0.3),
      inset 0 -1px 0 rgba(0, 0, 0, 0.05);
    border-radius: 20px;
  }
  .dark .crystal-panel {
    border-color: hsl(0 0% 100% / 0.1);
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.5),
      inset 0 1px 0 hsl(0 0% 100% / 0.1),
      inset 0 -1px 0 rgba(0, 0, 0, 0.2);
  }
```

---

## TASK 2: Upgrade Chatbot to Crystal Layer

**File:** `src/components/chatbot.tsx`

### 2A — Floating button (the FAB at bottom-right)

Replace the current Button element and its motion wrapper. The FAB should use `crystal-button`:

```tsx
<motion.button
  onClick={toggleOpen}
  whileHover={{ scale: 1.1, y: -5 }}
  whileTap={{ scale: 0.95, y: 0 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
  className="crystal-button animate-pulse-gold fixed bottom-6 right-6 z-50"
>
  {isOpen ? <X className="h-6 w-6" /> : (
    <Image
      src="https://images.unsplash.com/photo-1764360840282-838414e69953?q=80&w=829&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Freudy IA"
      fill
      className="object-cover rounded-full"
    />
  )}
</motion.button>
```

### 2B — Chat panel container

Replace the Card container with crystal-panel styling:

```tsx
<motion.div
  initial={{ opacity: 0, y: 50, scale: 0.9 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, y: 50, scale: 0.9 }}
  transition={{ type: "spring", stiffness: 300, damping: 30 }}
  className="fixed bottom-24 right-6 z-40 w-full max-w-sm"
>
  <div className="crystal-panel overflow-hidden flex flex-col">
```

### 2C — AI message bubbles

Add gold left-border to AI messages:

```tsx
// Change AI message div from:
className={`rounded-lg px-4 py-2 max-w-[80%] bg-muted text-foreground`}
// To:
className={`rounded-2xl px-4 py-2 max-w-[80%] bg-muted/30 text-foreground border-l-2 border-gold/50`}
```

### 2D — Send button

```tsx
// The send button:
className="h-8 w-8 gold-gradient rounded-lg text-white"
```

---

## TASK 3: Finish Phase 2 — Dashboard Layout

**File:** `src/app/dashboard/layout.tsx`

Apply the changes from `CLAUDE-CODE-IMPLEMENTATION-PLAN.md` Phase 2.1:
- Header: `glass border-b border-white/10 dark:border-white/5` (make sure the header has glass transparency)
- Main content area: `dashboard-bg` (remove any `bg-muted/40`)
- RH Support button: `glass-subtle border-0`

---

## TASK 4: Finish Phase 3.2–3.6 — Page Upgrades

Apply the changes from `CLAUDE-CODE-IMPLEMENTATION-PLAN.md` for:
- **Exchange Center** (3.2): stagger-children on grid, gold-border on featured, `variant="gold"` on Apply button, `variant="glass"` on skill badges
- **Innovation Labs** (3.3): stagger-children, gold Submit Idea button, gold badge for Open status
- **Learning** (3.4): stagger-children, card-hover, gold Create with AI button
- **Diary** (3.5): motion wrappers, gold left-border on recent entries, gold Generate Summary button
- **Mentorship** (3.6): card-hover on mentee cards, gold Generate Feedback button

For ALL pages, wrap page content in:
```tsx
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

// Wrap return JSX in:
<motion.div variants={container} initial="hidden" animate="show">
  {/* page content, wrap sections in <motion.div variants={item}> */}
</motion.div>
```

---

## TASK 5: Phase 4 — Login Page

**File:** `src/app/login/page.tsx`

Apply from `CLAUDE-CODE-IMPLEMENTATION-PLAN.md` Phase 4.1:
- Container: `min-h-screen flex items-center justify-center dashboard-bg p-4`
- Wrap login Card in `motion.div` with fade-up + scale animation
- Add `gold-border` to the login Card
- Login button: `variant="gold"` with `className="w-full rounded-xl h-11"`
- Add `gold-text` to "FX" text
- Add `gold-gradient h-1 rounded-full w-16 mx-auto` divider under logo

---

## TASK 6: Phase 6 — Polish

Apply from `CLAUDE-CODE-IMPLEMENTATION-PLAN.md` Phase 6:
- **logo.tsx**: Add `<div className="gold-gradient h-0.5 rounded-full mt-1 opacity-60" />` after logo
- **user-nav.tsx**: Add `glass-strong` to DropdownMenuContent
- **date-time.tsx**: `className="glass-subtle rounded-lg px-3 py-1.5 text-sm font-medium"`
- **theme-toggle.tsx**: `className="glass-subtle rounded-xl border-0"` on Button wrapper

---

## TASK 7: Update CLAUDE.md

Replace the "Design Language" section in `CLAUDE.md` with:

```markdown
### Design Language: Three Visual Layers

The redesign uses THREE distinct visual layers that coexist in a hierarchy:

1. **Layer 1: Standard Freudenberg (80% of UI)** — Solid corporate blue #293B5F + gray. No transparency. Used for: sidebar, header base, table rows, form fields, labels, inactive nav. CSS: `bg-primary`, `card-standard`, standard Tailwind.

2. **Layer 2: Glass & Gold (15% of UI)** — Translucent glassmorphism + gold gradient borders (#C5941A → #E8C547 → #D4A829). Used for: KPI cards, active tabs, CTA buttons, modals, hero sections. CSS: `glass`, `glass-strong`, `gold-border`, `gold-gradient`, `gold-text`.

3. **Layer 3: Crystal Transparent (5% of UI)** — Pure glass sphere with chrome rim, specular highlights, chromatic aberration. Used for: chatbot FAB, quick-action circles. CSS: `crystal-button`, `crystal-panel`.
```

Also update the CSS Classes table to include:
| `card-standard` | Solid corporate card (Layer 1, no glass) |
| `crystal-button` | Crystal glass orb button (Layer 3) |
| `crystal-panel` | Crystal transparent panel (Layer 3) |

---

## EXECUTION ORDER

1. globals.css — Add `.card-standard`, `.crystal-button`, `.crystal-panel`
2. chatbot.tsx — Crystal FAB + Crystal panel + gold accents
3. dashboard/layout.tsx — Glass header, dashboard-bg
4. exchange-center, innovation-labs, learning, diary, mentorship — Motion + gold accents
5. login/page.tsx — Glass + gold login
6. logo.tsx, user-nav.tsx, date-time.tsx, theme-toggle.tsx — Polish
7. CLAUDE.md — Update design language section

**Do NOT modify:** `src/ai/`, `src/lib/data.ts`, `src/contexts/`, `src/locales/`, `package.json`, any routing or business logic.

**After all changes:** Run `npm run dev` and verify the three layers are visually distinct.
