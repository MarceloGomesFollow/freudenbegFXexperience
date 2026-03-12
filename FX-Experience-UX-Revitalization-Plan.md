# FX Experience - Plano de Revitalização UX Design

**Versão:** 1.0 | **Data:** Março 2026 | **Autor:** FollowAdvisor
**Plataforma:** DPX Digital - Freudenberg Experience Program

---

## 1. Diagnóstico do Estado Atual

### 1.1 O que funciona bem

A plataforma já tem uma base sólida: arquitetura Next.js 15 com App Router, sistema de componentes shadcn/ui (Radix), tema claro/escuro com CSS custom properties, RBAC funcional por papel (Participante, Mentor, RH, Gestor, Admin), internacionalização PT/EN/DE e integração com IA (OpenAI + Gemini via Genkit). A estrutura de módulos cobre o ciclo completo do programa de intercâmbio.

### 1.2 Pontos de melhoria identificados

**Identidade visual genérica:** O design atual segue o padrão shadcn/ui sem customização significativa. Cards, botões e sidebar são funcionais mas não transmitem a sofisticação de um programa global da Freudenberg.

**Hierarquia visual fraca:** Os KPI cards na Home usam o mesmo peso visual, sem diferenciação por prioridade. O background com foto de banco de imagem (Unsplash) com overlay escuro gera um tom "template" que não comunica a marca.

**Navegação densa:** A sidebar tem 15+ itens com sub-menus colapsáveis. Para novos usuários, a curva de aprendizado é desnecessariamente alta. Não há agrupamento visual por jornada do usuário.

**Micro-interações ausentes:** Faltam transições suaves entre estados (hover, active, loading), feedback tátil nos botões e indicadores de progresso contextuais.

**Falta de "wow factor":** Para um decisor nos EUA avaliando a plataforma, a experiência atual não se diferencia de um dashboard administrativo genérico.

---

## 2. Visão de Design: "Glass & Gold"

### 2.1 Conceito

Inspirado nas referências visuais fornecidas, o novo design language da FX Experience combina três camadas:

**Camada Base (Standard):** Design system limpo e funcional baseado nos princípios de Material Design 3 e Apple Human Interface Guidelines. Cards com cantos arredondados (16px), tipografia Inter com escala clara, espaçamento generoso (8px grid), e cores neutras que respeitam a identidade Freudenberg.

**Camada Glass (Glassmorphism):** Elementos-chave da interface — sidebar, header, modais, cards de destaque — recebem tratamento de vidro translúcido: `backdrop-blur(20px)`, backgrounds com `rgba(255,255,255,0.08)` no dark mode e `rgba(255,255,255,0.7)` no light, bordas sutis com `border: 1px solid rgba(255,255,255,0.18)`. Isso cria profundidade sem peso visual.

**Camada Gold (Accent Premium):** Elementos de destaque e estados ativos recebem um gradiente dourado (`linear-gradient(135deg, #C5941A, #E8C547, #D4A829)`) como borda ou indicador. Isso comunica qualidade premium e exclusividade do programa. Usado com moderação: tab ativa, botão CTA principal, ícone do módulo selecionado, badges de conquista.

### 2.2 Referência visual (baseado nos anexos)

- **Botões glassmorphism:** Círculos com efeito de vidro e ícones brancos, sombra interna sutil, borda cromada. Aplicável aos FABs (floating action buttons) e quick-actions.
- **Tab bar glass:** Barra de navegação com fundo translúcido, item ativo com borda dourada arredondada e fundo sólido. Funciona tanto em light quanto dark mode.
- **Dark mode premium:** Fundo profundo (#0A0A0F), cards com glass effect, acentos dourados que "brilham" contra o escuro.

---

## 3. Sistema de Design Proposto

### 3.1 Paleta de Cores

| Token | Light Mode | Dark Mode | Uso |
|-------|-----------|-----------|-----|
| `--bg-primary` | `#F5F5F7` | `#0A0A0F` | Fundo principal |
| `--bg-surface` | `rgba(255,255,255,0.7)` | `rgba(255,255,255,0.06)` | Cards e superfícies glass |
| `--bg-elevated` | `rgba(255,255,255,0.9)` | `rgba(255,255,255,0.10)` | Modais, popovers |
| `--border-glass` | `rgba(0,0,0,0.08)` | `rgba(255,255,255,0.12)` | Bordas glassmorphism |
| `--gold-primary` | `#C5941A` | `#E8C547` | Acento dourado |
| `--gold-gradient` | `135deg, #C5941A → #E8C547 → #D4A829` | Mesmo | Gradiente premium |
| `--text-primary` | `#1A1A2E` | `#F0F0F5` | Texto principal |
| `--text-secondary` | `#6B7280` | `#9CA3AF` | Texto secundário |
| `--freudenberg-blue` | `#293B5F` | `#4A6FA5` | Cor institucional |
| `--accent-teal` | `#6A9993` | `#8BBEB8` | Acento funcional |

### 3.2 Tipografia

| Elemento | Fonte | Peso | Tamanho | Line Height |
|----------|-------|------|---------|-------------|
| Display (hero) | Inter | 700 | 36-48px | 1.1 |
| H1 (título página) | Inter | 600 | 28-32px | 1.2 |
| H2 (título seção) | Inter | 600 | 22-24px | 1.3 |
| H3 (título card) | Inter | 500 | 18px | 1.4 |
| Body | Inter | 400 | 15px | 1.6 |
| Caption | Inter | 400 | 13px | 1.5 |
| Badge/Label | Inter | 600 | 11px | 1 |

### 3.3 Efeitos Glass

```css
/* Card Glass - Light */
.glass-card-light {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
}

/* Card Glass - Dark */
.glass-card-dark {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

/* Gold Active Border */
.gold-active {
  border: 2px solid transparent;
  background-image: linear-gradient(var(--bg-surface), var(--bg-surface)),
                    linear-gradient(135deg, #C5941A, #E8C547, #D4A829);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}

/* Glassmorphism Button (referência anexo 1) */
.glass-button {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: inset 0 1px 1px rgba(255,255,255,0.3),
              0 4px 16px rgba(0,0,0,0.15);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### 3.4 Componentes Chave para Redesign

**Sidebar:** Substituir o fundo sólido cinza por glassmorphism com blur sobre o background da página. Menu items com `padding: 10px 16px`, `border-radius: 12px`. Item ativo com borda dourada e fundo levemente mais opaco. Ícones com 20px, suavização com transição de 200ms.

**Header:** Glass com blur, altura 64px, sombra sutil inferior. RoleSwitcher como um chip glass com animação de troca.

**KPI Cards:** Grid de 4 cards glass com ícone grande (32px) colorido, número em display font (36px bold), e sparkline inline mostrando tendência dos últimos 7 dias. Card em hover eleva com `translateY(-2px)` e sombra mais pronunciada.

**Tab Navigation (referência anexo 2 e 3):** Barra de tabs com fundo glass arredondado (`border-radius: 16px`), padding interno de 4px. Tab ativa com fundo sólido, `border-radius: 12px`, borda dourada com `2px` e transição spring de 300ms. Funciona tanto em light (fundo branco, borda dourada) quanto dark (fundo escuro, borda dourada brilhante).

**Floating Action Buttons (referência anexo 1):** Botões circulares com efeito glass e ícones brancos. Usados para ações rápidas: novo diário, submeter ideia, iniciar chat com Freudy.

**Cards de Conteúdo:** Hover com `scale(1.01)` e glow sutil na borda. Corner badge dourado para conteúdo em destaque ou novo.

---

## 4. Redesign por Módulo

### 4.1 Home / Dashboard Principal

**Antes:** Cards KPI planos + feed linear + mapa estático.
**Depois:** Hero section com saudação personalizada e progress ring dourado mostrando % de conclusão do programa. KPI cards glass com micro-animações (contagem numérica, sparklines). Feed de atividades como timeline vertical com avatares glass. Mapa de talentos com marcadores animados dourados nas localizações ativas.

### 4.2 Exchange Center

**Antes:** Grid de cards com informações densas.
**Depois:** Cards glass com foto da cidade/unidade ao fundo (blur parcial), badge dourado de status ("Aberta", "Seleção"), botão de aplicação com gradient dourado. Filtros como chips glass horizontais com scroll.

### 4.3 Innovation Labs

**Antes:** Layout tabular standard.
**Depois:** "Challenge cards" com gradiente glass escuro, ícone temático grande, barra de progresso dourada mostrando % de participação. Seção "Submit Idea" como um formulário wizard com steps indicados por dots dourados.

### 4.4 Learning Hub

**Antes:** Grid de cursos genérica.
**Depois:** Carousel de destaque com cards glass grandes. Progress bar dourada por curso. Seção "Meu Aprendizado" com rings de conclusão animados. Quiz com cards de resposta glass que animam ao selecionar.

### 4.5 Diário Digital

**Antes:** Feed linear de texto.
**Depois:** Timeline estilo Instagram Stories com thumbnails circulares e borda dourada para entradas recentes. Entradas expandidas como cards glass com suporte a galeria de fotos com lightbox.

### 4.6 Mentorship

**Antes:** Cards de mentor/mentorado estáticos.
**Depois:** Cards de perfil glass com avatar grande, badge dourado de especialidade, indicador de disponibilidade (dot animado). Chat integrado com bubble glass.

---

## 5. Micro-interações e Animações

| Interação | Animação | Duração | Easing |
|-----------|----------|---------|--------|
| Card hover | `translateY(-2px)` + sombra expande | 200ms | `ease-out` |
| Tab switch | Tab ativa desliza (spring) + cor transiciona | 300ms | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| Button press | `scale(0.97)` + brightness sutil | 100ms | `ease-in` |
| Page enter | Fade up (`translateY(12px)` → 0) | 400ms | `ease-out` |
| Modal open | Scale de 0.95→1 + backdrop blur anima | 250ms | `ease-out` |
| KPI counter | Contagem numérica de 0 ao valor | 800ms | `ease-out` |
| Gold glow | `box-shadow` pulsa suavemente | 2s | `ease-in-out`, infinite |
| Loading | Skeleton shimmer com gradiente dourado | 1.5s | linear, infinite |

---

## 6. Roadmap de Implementação

### Fase 1 - Foundation (Semanas 1-2)
- Atualizar CSS custom properties com nova paleta Glass & Gold
- Criar utility classes para glassmorphism e gold accents
- Redesenhar componentes base: Card, Button, Badge, Input
- Implementar novo header glass e sidebar glass

### Fase 2 - Core Pages (Semanas 3-4)
- Redesenhar Home/Dashboard com hero, KPI cards animados e feed
- Redesenhar Exchange Center com cards glass
- Redesenhar Innovation Labs com challenge cards
- Implementar tab navigation glass (conforme referência)

### Fase 3 - Deep Modules (Semanas 5-6)
- Redesenhar Learning Hub com carousel e progress rings
- Redesenhar Diário com timeline visual
- Redesenhar Mentorship com cards de perfil
- Glassmorphism nos modais e dialogs

### Fase 4 - Polish (Semana 7)
- Implementar todas as micro-interações (Framer Motion)
- Otimizar performance (lazy loading, intersection observer para animações)
- Testar dark/light mode em todos os componentes
- Testar responsividade mobile
- QA cross-browser (Chrome, Safari, Edge)

---

## 7. Métricas de Sucesso

**Engajamento:** Aumento de 25% no tempo médio de sessão após redesign.
**Adoção:** Redução de 40% no tempo para primeira ação significativa (submeter ideia, aplicar para intercâmbio).
**Percepção:** Score de satisfação NPS do programa sobe de baseline para +20 pontos.
**Decisor:** Aprovação visual no primeiro walkthrough — a plataforma deve impressionar em 30 segundos.

---

## 8. Considerações Técnicas

A implementação não requer mudança de stack. O glassmorphism é 100% CSS (`backdrop-filter`, `rgba backgrounds`, `box-shadow`) com excelente suporte em browsers modernos (Chrome 76+, Safari 9+, Edge 79+). As animações usam Framer Motion (já presente no projeto) para transições declarativas e springs. O gold gradient usa `background-image` com `background-clip: border-box` para bordas, sem imagens ou SVGs adicionais. O impacto em performance é mínimo — `backdrop-filter` é GPU-accelerated nos browsers modernos.

---

*Documento preparado por FollowAdvisor para Freudenberg Group - Programa FX Experience*
