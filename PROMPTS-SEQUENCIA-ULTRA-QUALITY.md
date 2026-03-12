# FX Experience — Sequência de Prompts para Claude Code (VS Code)

> **Settings:** Execute Immediately | Model: Sonnet | Effort: High | Thinking: Off
>
> **IMPORTANTE:** Cole um prompt por vez. Espere completar + confirmar `npm run dev` sem erros antes de colar o próximo.
>
> **O QUE JÁ FOI FEITO (NÃO repetir):**
> - Phase 0: `:root` + `.dark` tokens ✅
> - Phase 0: `@layer utilities` com Glass & Gold (Layer 2) ✅
> - Phase 1: card, button, badge, progress, tabs, dialog, input, tooltip ✅
> - Phase 2: dashboard/layout.tsx (header glass, dashboard-bg) ✅
> - Phase 3.1: Home page rewrite completo com Framer Motion ✅

---

## PROMPT 1 — CSS Quality Upgrade: Add Layer 1 + Layer 3 (FUNDAÇÃO)

```
URGENT CSS QUALITY FIX. Read QUALITY-UPGRADE-PROMPT.md in the project root first.

The current @layer utilities in src/app/globals.css has Layer 2 (Glass & Gold) but is MISSING Layer 1 (Standard Freudenberg) and Layer 3 (Crystal Transparent). Add the missing classes WITHOUT removing any existing ones.

ADD these classes to @layer utilities in src/app/globals.css:

1. After the .dashboard-bg block, ADD .card-standard:

.card-standard {
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}
.dark .card-standard {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

2. After the .glass-button-circle block, ADD the entire Crystal layer. Copy EXACTLY from QUALITY-UPGRADE-PROMPT.md — the section titled "LAYER 3: CRYSTAL TRANSPARENT". It includes:
- .crystal-button (with ::before specular highlight, ::after rim reflection, chrome border-image, chromatic aberration shadows, hover/active states, dark mode variant)
- .crystal-panel (with dark mode variant)

The crystal-button MUST have:
- Radial gradient background simulating glass orb bulge
- ::before pseudo-element for specular highlight spot at top-left
- ::after pseudo-element for bottom rim reflection
- border-image with chrome metallic gradient (NOT a solid border)
- box-shadow with chromatic aberration: -1px 0 4px hsl(350 80% 60% / 0.08) left, 1px 0 4px hsl(210 80% 60% / 0.08) right
- Hover: translateY(-3px) scale(1.06) with enhanced shadows
- Active: translateY(0) scale(0.97)
- Dark mode variant with reduced opacity highlights

Do NOT modify any existing classes. Only ADD the new ones.
Run npm run dev to verify no CSS errors.
```

---

## PROMPT 2 — Sidebar Active State + Sidebar Nav

```
Apply these two remaining layout fixes:

1. src/components/ui/sidebar.tsx — Find the SidebarMenuButton component. In its className, find the data-[active=true] styles and REPLACE them:

BEFORE (or similar):
data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground

AFTER:
data-[active=true]:bg-sidebar-accent/15 data-[active=true]:text-sidebar-accent-foreground data-[active=true]:font-semibold data-[active=true]:shadow-sm

2. src/components/sidebar-nav.tsx — Find the FreudyIaLink component's DialogContent. Change its className:

BEFORE (find the DialogContent that has backdrop-blur or bg-black):
className="max-w-4xl h-[80vh] p-0 flex flex-col bg-black/10 backdrop-blur-lg border-white/20"

AFTER:
className="max-w-4xl h-[80vh] p-0 flex flex-col glass-strong !rounded-2xl overflow-hidden"

Run npm run dev to verify.
```

---

## PROMPT 3 — Pages 3.2-3.6 (Exchange, Innovation, Learning, Diary, Mentorship)

```
Apply Framer Motion animations and Glass & Gold styling to these 5 pages. For EACH page, add this import at the top if not present:

import { motion } from "framer-motion";

And add these animation constants inside the component (before the return):

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

Then wrap the page's return JSX root in <motion.div variants={container} initial="hidden" animate="show"> and wrap each major section in <motion.div variants={item}>.

Page-specific changes:

A) src/app/dashboard/exchange-center/page.tsx:
- Wrap card grid in stagger-children class
- Any "Apply" or "Apply Now" button → variant="gold"
- Skill/tag badges → variant="glass"
- Each opportunity card: add card-hover class
- If there are featured/highlighted opportunities, add gold-border class to those cards

B) src/app/dashboard/innovation-labs/page.tsx:
- "Submit Idea" or "Submit" button → variant="gold"
- Status badges for "Open"/"Aberto" → variant="gold"
- Challenge cards: add card-hover class
- Grid: add stagger-children class

C) src/app/dashboard/learning/page.tsx:
- Learning item cards: add card-hover class
- "Create with AI" or AI-related buttons → variant="gold"
- Grid: add stagger-children class

D) src/app/dashboard/diary/page.tsx:
- Add border-l-2 border-gold to recent diary entries (the latest 3)
- "Generate Summary" or AI summary button → variant="gold"

E) src/app/dashboard/mentorship/page.tsx:
- Mentee cards: add card-hover class
- "Generate Feedback Report" or AI report button → variant="gold"

IMPORTANT: Do NOT rewrite these pages — modify in place. Only change classNames and add the motion wrappers. Do NOT change any business logic, data flows, or i18n.

Run npm run dev after all changes.
```

---

## PROMPT 4 — Login Page (Premium Entry Point)

```
Upgrade the login page at src/app/login/page.tsx with Glass & Gold premium styling.

Add these imports:
import { motion } from "framer-motion";

Apply these changes:

1. Main container div → className="min-h-screen flex items-center justify-center dashboard-bg p-4"

2. Wrap the login Card (or the main card/form container) in:
<motion.div
  initial={{ opacity: 0, y: 20, scale: 0.98 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>

3. Add gold-border class to the login Card component

4. The login/submit button → variant="gold" className="w-full rounded-xl h-11"

5. If there is "FX" text or logo text in the page, add the gold-text class to the "FX" part:
<span className="gold-text">FX</span>

6. Add a gold gradient divider under the logo or title:
<div className="gold-gradient h-1 rounded-full w-16 mx-auto mt-3 mb-2" />

Do NOT change any form logic, validation, or authentication flow.
Run npm run dev to verify.
```

---

## PROMPT 5 — Chatbot with Crystal Layer (WOW element)

```
CRITICAL: This upgrade uses the CRYSTAL TRANSPARENT layer (Layer 3) — NOT regular glass. Read QUALITY-UPGRADE-PROMPT.md for the crystal layer spec.

Upgrade src/components/chatbot.tsx:

1. FLOATING ACTION BUTTON — Replace the entire FAB (the motion.div + Button at the bottom-right) with:

<motion.button
  onClick={toggleOpen}
  whileHover={{ scale: 1.1, y: -5 }}
  whileTap={{ scale: 0.95, y: 0 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
  className="crystal-button animate-pulse-gold fixed bottom-6 right-6 z-50 w-16 h-16"
>
  {isOpen ? <X className="h-6 w-6 relative z-10" /> : (
    <Image
      src="https://images.unsplash.com/photo-1764360840282-838414e69953?q=80&w=829&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Freudy IA"
      fill
      className="object-cover rounded-full relative z-10"
    />
  )}
</motion.button>

This uses crystal-button (glass orb with chrome rim, specular highlights, chromatic aberration) instead of a regular button. The animate-pulse-gold gives it a breathing gold glow.

2. CHAT PANEL — Replace the Card container with crystal-panel:

The motion.div wrapper stays the same. But inside it, replace:
<Card className="bg-card/60 backdrop-blur-xl ...">
with:
<div className="crystal-panel overflow-hidden flex flex-col max-h-[500px]">

And replace the closing </Card> with </div>.

The CardHeader, CardContent, CardFooter inside should become regular divs with equivalent styling:
- Header: <div className="text-center p-4 border-b border-white/10">
- Content: <div className="p-4 h-96 overflow-y-auto space-y-4">
- Footer: <div className="p-4 border-t border-white/10">

3. AI MESSAGE BUBBLES — Change AI message styling:
FROM: className="rounded-lg px-4 py-2 max-w-[80%] bg-muted text-foreground"
TO: className="rounded-2xl px-4 py-3 max-w-[80%] bg-muted/30 text-foreground border-l-2 border-gold/50"

4. SEND BUTTON — Change to gold:
FROM: <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleSendMessage}...>
TO: <Button size="icon" className="h-8 w-8 gold-gradient rounded-lg text-white" onClick={handleSendMessage}...>

5. SUGGESTED ACTION BUTTONS — Change to glass:
FROM: <Button key={index} variant="outline" size="sm" className="bg-background/70"...>
TO: <Button key={index} variant="glass" size="sm"...>

Keep ALL existing logic (messages, loading, mic permission, etc.) exactly as is.
Run npm run dev to verify.
```

---

## PROMPT 6 — Polish & Details (Finishing Touches)

```
Apply final polish to these 4 small components. These are quick changes — just modify classNames:

1. src/components/logo.tsx:
After the logo image element (the Image or SVG), ADD this gold underline:
<div className="gold-gradient h-0.5 rounded-full mt-1 opacity-60" />

2. src/components/user-nav.tsx:
Find the DropdownMenuContent component and ADD glass-strong to its className:
className="... glass-strong ..."
(Keep any existing classes, just add glass-strong)

3. src/components/date-time.tsx:
Wrap the time display in a glass chip. Find the main container/wrapper div and add:
className="glass-subtle rounded-lg px-3 py-1.5 text-sm font-medium"

4. src/components/theme-toggle.tsx:
Find the DropdownMenuTrigger Button and add glass styling:
className="glass-subtle rounded-xl border-0"
(or add these classes to the existing className)

Run npm run dev to verify all changes compile.
```

---

## PROMPT 7 — Update CLAUDE.md + Final Verification

```
Two tasks:

TASK A — Update CLAUDE.md at the project root.

In the "Design Language" section, REPLACE the current content (which says "Glass & Gold" with 3 points about Standard Base, Glassmorphism, Gold Accents) with:

### Design Language: Three Visual Layers

The platform uses THREE distinct visual layers that coexist in a hierarchy:

1. **Layer 1: Standard Freudenberg (80% of UI)** — Solid corporate blue #293B5F + gray. No transparency. Used for: sidebar background, header base, table rows, form fields, labels, inactive nav items. CSS: `bg-primary`, `card-standard`, standard Tailwind classes.

2. **Layer 2: Glass & Gold (15% of UI)** — Translucent glassmorphism surfaces + gold gradient borders (#C5941A → #E8C547 → #D4A829). Used for: KPI cards, active tabs, CTA buttons, modal dialogs, hero sections, featured badges, progress bars. CSS: `glass`, `glass-strong`, `gold-border`, `gold-gradient`, `gold-text`.

3. **Layer 3: Crystal Transparent (5% of UI)** — Pure glass sphere effect with chrome metallic rim, specular highlights, and chromatic aberration at edges. Used for: chatbot FAB, quick-action floating buttons. CSS: `crystal-button`, `crystal-panel`.

Also update the CSS Classes table to add these rows:
| `card-standard` | Solid corporate card — Layer 1, no glass |
| `crystal-button` | Crystal glass orb button — Layer 3 |
| `crystal-panel` | Crystal transparent floating panel — Layer 3 |

TASK B — Run npm run dev and verify:

1. Light mode: Glass cards have visible translucency with inner highlight line at top, gold borders glow subtly
2. Dark mode: Gold accents glow brighter, glass effects have proper dark variants, no broken text
3. Home page: KPI cards animate in with stagger, gold-text "FX", gold-bordered CTA card
4. Tabs: Glass background bar with gold-bordered active trigger
5. Chatbot FAB: Crystal glass orb effect — specular highlight at top-left, chrome rim, pulse-gold animation — visually DIFFERENT from regular glass cards
6. Chat panel: Crystal-panel transparency
7. Login: Gold-bordered card with motion animation, gold submit button
8. Sidebar: Gold active state on selected nav item
9. All pages: Motion fade-up animations on load

If anything is broken or has errors, fix it now. Report all findings.
```

---

## RESUMO DA SEQUÊNCIA

| # | Prompt | O que faz | Depende de |
|---|--------|-----------|------------|
| 1 | CSS Quality | Adiciona Layer 1 (card-standard) + Layer 3 (crystal-button, crystal-panel) | — |
| 2 | Sidebar + Nav | Gold active state na sidebar, glass-strong no dialog Freudy | #1 |
| 3 | Pages 3.2-3.6 | Framer Motion + gold/glass em 5 páginas | #1 |
| 4 | Login | Glass & Gold premium na login page | #1 |
| 5 | Chatbot Crystal | Crystal FAB + Crystal panel + gold messages | #1 |
| 6 | Polish | Logo, user-nav, datetime, theme-toggle | #1 |
| 7 | CLAUDE.md + Verificação | Atualiza documentação + testa tudo | #1-6 |

**Total: 7 prompts** (reduzido de 9 porque Phases 0, 1 e 3.1 já estão feitas)
