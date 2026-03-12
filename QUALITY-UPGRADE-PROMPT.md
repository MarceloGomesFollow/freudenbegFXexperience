# QUALITY UPGRADE — Three Visual Layers System

> **The platform uses THREE distinct visual styles that coexist in a hierarchy. Each has its own CSS classes, colors, and effects. They are NOT alternatives — they work TOGETHER on every page.**

---

## THE THREE LAYERS

### LAYER 1: Standard Freudenberg (80% of UI)
- **Colors:** Deep Blue `#293B5F`, Gray `#6B7280`, Light Gray `#E8EBF0`, Teal accent `#6A9993`
- **Feel:** Corporate, solid, trustworthy, no transparency
- **Where:** Sidebar background, header base, table rows, form fields, body text, labels, navigation items (inactive), footer, pagination, breadcrumbs
- **CSS:** Standard Tailwind classes — `bg-primary`, `text-foreground`, `bg-muted`, `border`, no glass effects

### LAYER 2: Glass & Gold (15% of UI)
- **Colors:** Translucent white/dark + Gold gradient border (`#C5941A → #E8C547 → #D4A829`)
- **Feel:** Premium, elevated, modern — like a luxury product card
- **Where:** KPI cards, active tab in tab bars, CTA buttons (gold gradient), modal dialogs, card highlights, hero sections, badges for "featured" or "new" items, progress bars
- **CSS:** `.glass`, `.glass-strong`, `.gold-border`, `.gold-gradient`, `.gold-text`

### LAYER 3: Crystal Transparent (5% of UI)
- **Colors:** Pure transparent glass — NO background color tint, chrome/silver metallic rim, rainbow chromatic refraction at edges
- **Feel:** Like real glass spheres or crystal orbs — the reference image with the folder/lightning/arrow buttons
- **Where:** Floating action buttons (chatbot FAB, quick-action circles), special overlay elements, Freudy AI avatar border
- **CSS:** `.crystal-button`, `.crystal-panel`

---

## STEP 1: Replace the ENTIRE `@layer utilities` section in `src/app/globals.css`

```css
@layer utilities {

  /* ================================================================
     LAYER 1: STANDARD FREUDENBERG — Solid corporate foundation
     ================================================================ */

  /* Dashboard background with subtle ambient light */
  .dashboard-bg {
    background-color: hsl(var(--background));
    background-image:
      radial-gradient(ellipse at 15% 50%, hsl(var(--gold) / 0.03) 0%, transparent 45%),
      radial-gradient(ellipse at 85% 15%, hsl(220 35% 27% / 0.05) 0%, transparent 45%),
      radial-gradient(ellipse at 50% 85%, hsl(var(--accent) / 0.03) 0%, transparent 45%);
  }
  .dark .dashboard-bg {
    background-image:
      radial-gradient(ellipse at 15% 50%, hsl(var(--gold) / 0.04) 0%, transparent 45%),
      radial-gradient(ellipse at 85% 15%, hsl(220 35% 50% / 0.03) 0%, transparent 45%),
      radial-gradient(ellipse at 50% 85%, hsl(var(--accent) / 0.03) 0%, transparent 45%);
  }

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

  /* ================================================================
     LAYER 2: GLASS & GOLD — Premium elevated surfaces
     ================================================================ */

  /* --- Glass Card (light mode: frosted white, dark mode: frosted dark) --- */
  .glass {
    background:
      linear-gradient(
        145deg,
        hsl(0 0% 100% / 0.78) 0%,
        hsl(0 0% 100% / 0.58) 45%,
        hsl(0 0% 100% / 0.68) 100%
      );
    backdrop-filter: blur(24px) saturate(1.4);
    -webkit-backdrop-filter: blur(24px) saturate(1.4);
    border: 1px solid hsl(0 0% 100% / 0.5);
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.06),
      0 2px 8px rgba(0, 0, 0, 0.04),
      inset 0 1px 0 hsl(0 0% 100% / 0.65),
      inset 0 -1px 0 hsl(0 0% 0% / 0.04);
  }
  .dark .glass {
    background:
      linear-gradient(
        145deg,
        hsl(0 0% 100% / 0.08) 0%,
        hsl(0 0% 100% / 0.03) 45%,
        hsl(0 0% 100% / 0.06) 100%
      );
    border-color: hsl(0 0% 100% / 0.1);
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.45),
      0 2px 8px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 hsl(0 0% 100% / 0.12),
      inset 0 -1px 0 hsl(0 0% 0% / 0.2);
  }

  /* --- Glass Subtle — chips, badges, small UI --- */
  .glass-subtle {
    background:
      linear-gradient(
        145deg,
        hsl(0 0% 100% / 0.55) 0%,
        hsl(0 0% 100% / 0.35) 100%
      );
    backdrop-filter: blur(16px) saturate(1.3);
    -webkit-backdrop-filter: blur(16px) saturate(1.3);
    border: 1px solid hsl(0 0% 100% / 0.35);
    box-shadow:
      0 2px 8px rgba(0, 0, 0, 0.04),
      inset 0 1px 0 hsl(0 0% 100% / 0.5);
  }
  .dark .glass-subtle {
    background:
      linear-gradient(
        145deg,
        hsl(0 0% 100% / 0.06) 0%,
        hsl(0 0% 100% / 0.02) 100%
      );
    border-color: hsl(0 0% 100% / 0.08);
    box-shadow:
      0 2px 8px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 hsl(0 0% 100% / 0.06);
  }

  /* --- Glass Strong — modals, popovers, elevated panels --- */
  .glass-strong {
    background:
      linear-gradient(
        145deg,
        hsl(0 0% 100% / 0.92) 0%,
        hsl(0 0% 100% / 0.78) 45%,
        hsl(0 0% 100% / 0.88) 100%
      );
    backdrop-filter: blur(40px) saturate(1.6);
    -webkit-backdrop-filter: blur(40px) saturate(1.6);
    border: 1px solid hsl(0 0% 100% / 0.6);
    box-shadow:
      0 24px 48px rgba(0, 0, 0, 0.08),
      0 4px 16px rgba(0, 0, 0, 0.04),
      inset 0 1px 0 hsl(0 0% 100% / 0.75),
      inset 0 -1px 0 hsl(0 0% 0% / 0.03);
  }
  .dark .glass-strong {
    background:
      linear-gradient(
        145deg,
        hsl(0 0% 100% / 0.12) 0%,
        hsl(0 0% 100% / 0.05) 45%,
        hsl(0 0% 100% / 0.08) 100%
      );
    border-color: hsl(0 0% 100% / 0.14);
    box-shadow:
      0 24px 48px rgba(0, 0, 0, 0.6),
      0 4px 16px rgba(0, 0, 0, 0.4),
      inset 0 1px 0 hsl(0 0% 100% / 0.12),
      inset 0 -1px 0 hsl(0 0% 0% / 0.3);
  }

  /* --- GOLD ACCENTS --- */
  .gold-gradient {
    background: linear-gradient(
      135deg,
      hsl(var(--gold-dark)) 0%,
      hsl(var(--gold-light)) 45%,
      hsl(var(--gold)) 65%,
      hsl(var(--gold-dark)) 100%
    );
  }

  .gold-border {
    position: relative;
    border: 2px solid transparent;
    background-image:
      linear-gradient(hsl(var(--card)), hsl(var(--card))),
      linear-gradient(
        135deg,
        hsl(var(--gold-dark)) 0%,
        hsl(var(--gold-light)) 35%,
        hsl(var(--gold)) 65%,
        hsl(var(--gold-dark)) 100%
      );
    background-origin: border-box;
    background-clip: padding-box, border-box;
    box-shadow:
      0 0 12px hsl(var(--gold) / 0.15),
      0 0 4px hsl(var(--gold) / 0.1);
  }
  .dark .gold-border {
    box-shadow:
      0 0 18px hsl(var(--gold) / 0.25),
      0 0 6px hsl(var(--gold) / 0.15);
  }

  .gold-glow {
    box-shadow:
      0 0 20px hsl(var(--gold) / 0.3),
      0 0 40px hsl(var(--gold) / 0.1),
      0 0 80px hsl(var(--gold) / 0.05);
  }
  .dark .gold-glow {
    box-shadow:
      0 0 24px hsl(var(--gold) / 0.5),
      0 0 60px hsl(var(--gold) / 0.2),
      0 0 100px hsl(var(--gold) / 0.08);
  }

  .gold-text {
    background: linear-gradient(
      135deg,
      hsl(var(--gold-dark)) 0%,
      hsl(var(--gold-light)) 50%,
      hsl(var(--gold)) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ================================================================
     LAYER 3: CRYSTAL TRANSPARENT — Pure glass orb / chrome rim
     Reference: The three circular buttons (folder, lightning, arrow)
     ================================================================ */

  /* Crystal circular button — like a real glass sphere */
  .crystal-button {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    position: relative;
    /* Radial gradient creates the glass orb "bulge" highlight */
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
    /* Chrome metallic rim */
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
    /* Multi-layer shadow for orb depth */
    box-shadow:
      /* Outer shadow — object rests on surface */
      0 6px 24px rgba(0, 0, 0, 0.18),
      0 2px 8px rgba(0, 0, 0, 0.12),
      /* Chrome rim highlight top */
      inset 0 2px 3px hsl(0 0% 100% / 0.45),
      /* Bottom inner shadow — orb curvature */
      inset 0 -3px 8px rgba(0, 0, 0, 0.12),
      /* Left chromatic aberration (slight red) */
      -1px 0 4px hsl(350 80% 60% / 0.08),
      /* Right chromatic aberration (slight blue) */
      1px 0 4px hsl(210 80% 60% / 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
    cursor: pointer;
    color: hsl(0 0% 100% / 0.9);
    overflow: hidden;
  }
  /* Specular highlight spot — bright dot at top-left like real glass */
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
  /* Bottom rim reflection */
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

  /* Dark mode crystal — brighter highlights against dark */
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

  /* Crystal panel — for floating panels (not buttons) */
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

  /* ================================================================
     SHARED UTILITIES — Used across all layers
     ================================================================ */

  /* Card hover — springy lift */
  .card-hover {
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
                box-shadow 0.3s ease-out;
  }
  .card-hover:hover {
    transform: translateY(-3px);
    box-shadow:
      0 16px 48px rgba(0, 0, 0, 0.08),
      0 4px 12px rgba(0, 0, 0, 0.04),
      inset 0 1px 0 hsl(0 0% 100% / 0.6);
  }
  .dark .card-hover:hover {
    box-shadow:
      0 16px 48px rgba(0, 0, 0, 0.5),
      0 4px 12px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 hsl(0 0% 100% / 0.08);
  }

  /* --- ANIMATIONS --- */
  @keyframes shimmer-gold {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  .shimmer-gold {
    background: linear-gradient(
      90deg,
      hsl(var(--gold-dark)),
      hsl(var(--gold-light)),
      hsl(var(--gold)),
      hsl(var(--gold-dark))
    );
    background-size: 300% 100%;
    animation: shimmer-gold 5s infinite linear;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @keyframes fade-up {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-up {
    animation: fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes pulse-gold {
    0%, 100% { box-shadow: 0 0 0 0 hsl(var(--gold) / 0.5); }
    50% { box-shadow: 0 0 0 10px hsl(var(--gold) / 0); }
  }
  .animate-pulse-gold {
    animation: pulse-gold 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes count-up {
    from { opacity: 0; transform: translateY(10px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  .animate-count-up {
    animation: count-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  .stagger-children > * {
    opacity: 0;
    animation: fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  .stagger-children > *:nth-child(1) { animation-delay: 0.04s; }
  .stagger-children > *:nth-child(2) { animation-delay: 0.08s; }
  .stagger-children > *:nth-child(3) { animation-delay: 0.12s; }
  .stagger-children > *:nth-child(4) { animation-delay: 0.16s; }
  .stagger-children > *:nth-child(5) { animation-delay: 0.20s; }
  .stagger-children > *:nth-child(6) { animation-delay: 0.24s; }
  .stagger-children > *:nth-child(7) { animation-delay: 0.28s; }
  .stagger-children > *:nth-child(8) { animation-delay: 0.32s; }

  @keyframes skeleton-shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  .skeleton-gold {
    background: linear-gradient(
      90deg,
      hsl(var(--muted)) 25%,
      hsl(var(--gold) / 0.12) 50%,
      hsl(var(--muted)) 75%
    );
    background-size: 200% 100%;
    animation: skeleton-shimmer 1.8s ease infinite;
    border-radius: 12px;
  }

  /* Keep old glass-button-circle as alias for crystal-button */
  .glass-button-circle {
    /* Alias — same as crystal-button */
  }
}
```

---

## STEP 2: Component mapping — which layer each component uses

| Component | Layer | Class |
|-----------|-------|-------|
| Card (default) | Glass & Gold | `glass card-hover rounded-2xl` |
| Card (in tables/lists) | Standard | `card-standard` |
| Button `variant="gold"` | Glass & Gold | `gold-gradient` |
| Button `variant="glass"` | Glass & Gold | `glass-subtle` |
| Button default | Standard | `bg-primary` (no glass) |
| Badge `variant="gold"` | Glass & Gold | `gold-gradient` |
| Badge `variant="glass"` | Glass & Gold | `glass-subtle` |
| Badge default | Standard | regular colors |
| Tabs (TabsList) | Glass & Gold | `glass rounded-2xl` |
| Tabs (active trigger) | Glass & Gold | `gold-border shadow-lg` |
| Dialog/Modal | Glass & Gold | `glass-strong rounded-2xl` |
| Chatbot FAB | Crystal | `crystal-button animate-pulse-gold` |
| Chatbot panel | Crystal | `crystal-panel` |
| Quick-action circles | Crystal | `crystal-button` |
| Sidebar | Standard | `bg-sidebar` (solid, no glass) |
| Header | Glass & Gold | `glass` (slight transparency) |
| Progress bar fill | Glass & Gold | `gold-gradient` |
| Input focus ring | Glass & Gold | `ring-gold/30 border-gold/50` |
| KPI highlight card | Glass & Gold | `glass gold-border` |
| Tooltip | Glass & Gold | `glass-strong` |

---

## STEP 3: Update the chatbot to use Crystal layer

In `src/components/chatbot.tsx`:

The floating button should use `crystal-button` (NOT glass-button-circle):
```tsx
className="crystal-button animate-pulse-gold fixed bottom-6 right-6 z-50"
```

The chat panel should use `crystal-panel`:
```tsx
className="crystal-panel fixed bottom-24 right-6 z-50 w-96 max-h-[500px] overflow-hidden flex flex-col"
```

---

## STEP 4: Verify the three layers are visually distinct

After applying, check:
1. **Standard elements** (sidebar, inactive nav items, form labels) → Should look solid, corporate, Freudenberg blue/gray
2. **Glass & Gold elements** (cards, active tabs, gold buttons) → Should have visible translucency, inner highlight line at top, gold border glow
3. **Crystal elements** (chatbot FAB) → Should look like a glass sphere with chrome rim, specular highlight spot, chromatic aberration at edges, clearly different from Glass & Gold

The three layers should be obviously different when viewed side by side.
