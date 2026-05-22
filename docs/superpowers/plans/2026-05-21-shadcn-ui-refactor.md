# shadcn-ui Deck Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild empty `slides.md`, replace self-made `ShadCard`/`ShadBadge` wrappers with native shadcn-vue components across 11 slide files, add a `success` variant to `Badge`, and clean pnpm-era residue — so the deck actually runs and the presentation truly dogfoods shadcn-vue.

**Architecture:** Each slide file directly imports `{ Card, CardHeader, CardTitle, CardContent }` and `{ Badge }` from `@/components/ui/*` and uses them as authored. The `dot color` visual cue (a colored dot inside `<CardTitle>`) is inlined per usage; ShadCard's `size` prop expands to explicit padding utility classes on `<Card>` and its children. No wrapper layer is reintroduced. The `success` Badge variant is added by editing `components/ui/badge/index.ts` directly — this *is* the spec's "Open Code" demonstration.

**Tech Stack:** Slidev 52.x, Vue 3, shadcn-vue (alert/badge/button/card/separator already installed), reka-ui, UnoCSS, Tailwind v4 conventions, bun workspace monorepo.

**Working directory:** All paths are relative to `/home/tim/githubRepo/presentation/shadcn-ui/` unless absolute. Run `bun install` commands from repo root `/home/tim/githubRepo/presentation/`.

**Verification model:** No unit-test infrastructure exists for this Slidev deck. Each slide-refactor task's verification step is **visual + HMR console**: with `bun run dev` running in the background, save the file, reload `localhost:3030/<slide-number>`, confirm no browser console errors and that the visual matches the pre-refactor reference. Reference for pre-refactor visuals: each `*Slide.vue` file in git history at commit `e5908a5c` (the spec commit).

**Reference tables (used repeatedly below):**

Padding override per ShadCard `size` prop (from spec § 7.1):

| ShadCard `size` | `<Card>` add class | `<CardHeader>` add class | `<CardContent>` add class |
|---|---|---|---|
| `size="sm"` | `gap-1 py-2 rounded-lg shadow-none` | `px-2 gap-0.5` | `px-2` |
| `size="md"` (default) | `gap-2 py-2.5 rounded-lg shadow-none` | `px-3 gap-0.5` | `px-3` |
| `size="lg"` | `gap-2 py-3 rounded-lg shadow-none` | `px-4 gap-0.5` | `px-4` |

Dot color palette (from spec § 7.2):

| ShadCard `color` | inline span class |
|---|---|
| `blue` | `bg-blue-400` |
| `green` | `bg-emerald-400` |
| `purple` | `bg-purple-400` |
| `orange` | `bg-orange-400` |
| `red` | `bg-red-400` |
| `yellow` | `bg-yellow-400` |
| `cyan` | `bg-cyan-400` |
| `pink` | `bg-pink-400` |
| `zinc` | `bg-zinc-400` |

Standard ShadCard → native Card rewrite recipe:

```vue
<!-- Before -->
<ShadCard v-click title="<TITLE>" dot color="<COLOR>" size="md">
  <slot-content />
</ShadCard>

<!-- After -->
<Card v-click class="bg-white/[0.03] border-white/10 gap-2 py-2.5 rounded-lg shadow-none">
  <CardHeader class="px-3 gap-0.5">
    <CardTitle class="text-xs flex items-center gap-1.5 text-zinc-100">
      <span class="size-1.5 rounded-full bg-<COLOR>-400" />
      <TITLE>
    </CardTitle>
  </CardHeader>
  <CardContent class="px-3">
    <slot-content />
  </CardContent>
</Card>
```

(If `dot` is absent, drop the `<span>` line. If `title` is absent, drop `<CardHeader>` entirely. If only `header` slot is used — see PainPointsSlide which has none — adapt accordingly.)

Standard ShadBadge → native Badge import swap:

```vue
<!-- Before -->
import ShadBadge from './ShadBadge.vue'
<ShadBadge variant="outline">X</ShadBadge>

<!-- After -->
import { Badge } from '@/components/ui/badge'
<Badge variant="outline">X</Badge>
```

`variant` values map 1:1 (`default` / `outline` / `secondary` / `destructive` / `success`).

---

## Task 1: Clean up pnpm residue and rebuild root install

**Files:**
- Delete: `shadcn-ui/pnpm-lock.yaml`
- Delete: `shadcn-ui/pnpm-workspace.yaml`
- Delete: `shadcn-ui/node_modules/` (entire directory)

- [ ] **Step 1: Delete pnpm residue and local node_modules**

Run from repo root:

```bash
cd /home/tim/githubRepo/presentation
rm shadcn-ui/pnpm-lock.yaml
rm shadcn-ui/pnpm-workspace.yaml
rm -rf shadcn-ui/node_modules
```

Expected: all three paths removed, no errors.

- [ ] **Step 2: Re-install via root bun workspace**

```bash
cd /home/tim/githubRepo/presentation
bun install
```

Expected output: bun install succeeds (creates/updates root `node_modules`). No deck-specific lockfile or `node_modules` is created under `shadcn-ui/`.

- [ ] **Step 3: Verify workspace hoisting**

```bash
ls /home/tim/githubRepo/presentation/shadcn-ui/node_modules 2>&1
ls /home/tim/githubRepo/presentation/node_modules/reka-ui 2>&1
ls /home/tim/githubRepo/presentation/node_modules/lucide-vue-next 2>&1
```

Expected: first command says "No such file or directory"; second and third list real package contents.

- [ ] **Step 4: Sanity-check that Slidev still boots (slides.md still empty here)**

```bash
cd /home/tim/githubRepo/presentation/shadcn-ui
timeout 20 bun run dev 2>&1 | head -40
```

Expected: Slidev banner appears, "public slide show > http://localhost:3030/" prints, no module-resolution errors before SIGTERM. (slides.md is still 0 bytes, so the browser would be blank — that's expected at this stage.)

- [ ] **Step 5: Commit**

```bash
cd /home/tim/githubRepo/presentation
git add -A shadcn-ui/
git commit -m "chore(shadcn-ui): remove pnpm residue and local node_modules

Deck now uses root bun workspace hoisting exclusively.
"
```

---

## Task 2: Add `success` variant to Badge

**Files:**
- Modify: `shadcn-ui/components/ui/badge/index.ts`

- [ ] **Step 1: Read the current variant definitions**

```bash
cat /home/tim/githubRepo/presentation/shadcn-ui/components/ui/badge/index.ts
```

Expected: see four variants (`default`, `secondary`, `destructive`, `outline`) inside `badgeVariants` cva config.

- [ ] **Step 2: Add the `success` variant**

Edit `shadcn-ui/components/ui/badge/index.ts`. After the `outline` line inside `variant: { ... }`, add a `success` entry. The final block should look like:

```ts
variants: {
  variant: {
    default:
      "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
    secondary:
      "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
    destructive:
     "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
    outline:
      "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
    success:
      "border-transparent bg-emerald-500/15 text-emerald-300 [a&]:hover:bg-emerald-500/20",
  },
},
```

Rationale for the class choices: `emerald-500/15` matches the existing 「green accent」 the deck uses; `text-emerald-300` matches `ShadBadge`'s previous success color; `[a&]:` prefix is consistent with sibling variants (only applies hover when Badge renders as `<a>`).

- [ ] **Step 3: Verify TypeScript happily includes the new variant**

The `BadgeVariants` type is derived from `VariantProps<typeof badgeVariants>` — adding `success` to cva auto-extends the type. No further change required.

Quick check that nothing else broke:

```bash
cd /home/tim/githubRepo/presentation/shadcn-ui
timeout 15 bun run dev 2>&1 | tail -20
```

Expected: dev server still boots; no TS error about `badgeVariants`. (slides.md is still empty, so nothing renders yet.)

- [ ] **Step 4: Commit**

```bash
cd /home/tim/githubRepo/presentation
git add shadcn-ui/components/ui/badge/index.ts
git commit -m "feat(shadcn-ui): add success variant to Badge

Demonstrates the 'Open Code' principle from spec §2 — editing
components/ui/badge/index.ts directly is exactly what shadcn/ui
is designed for.
"
```

---

## Task 3: Write `slides.md` with frontmatter and all 14 slide references

**Files:**
- Modify: `shadcn-ui/slides.md` (currently 0 bytes; full overwrite)

- [ ] **Step 1: Write the full `slides.md`**

Replace the entire contents of `shadcn-ui/slides.md` with:

```markdown
---
theme: default
colorSchema: dark
highlighter: shiki
css: unocss
title: shadcn/ui — The Foundation for your Design System
info: |
  shadcn/ui — The Foundation for your Design System

  Open Source · Open Code · 2026 RD Tech Sharing
transition: fade
mdc: true
---

<TitleSlide />

---

<PainPointsSlide />

---

<SolutionSlide />

---

<CoreMessageSlide />

---

<PrinciplesSlide />

---

<TechStackSlide />

---

<CLISlide />

---

<ComponentsOverviewSlide />

---

<BlocksSlide />

---

<ThemingSlide />

---

<RegistrySlide />

---

<MCPSlide />

---

<LatestUpdatesSlide />

---

<SummarySlide />
```

Slide order: Title → PainPoints → Solution → CoreMessage → Principles → TechStack → CLI → ComponentsOverview → Blocks → Theming → Registry → MCP → LatestUpdates → Summary (14 total). This is the "傳統三段式" (Pain → Solution → Core Message) confirmed during brainstorming.

- [ ] **Step 2: Start dev server and verify all 14 slides render**

In one terminal:

```bash
cd /home/tim/githubRepo/presentation/shadcn-ui
bun run dev
```

In a browser at `http://localhost:3030/`:
- Slide 1 (Title) renders.
- Press → 13 times. Each slide renders without browser console errors.
- All slides still use the existing `ShadCard` / `ShadBadge` wrappers — visuals should look exactly as they did when authored. (Native-shadcn refactor comes in Tasks 4–14.)

Expected: 14 visible slides, no `Failed to resolve component` or `import` errors in browser DevTools console.

If any slide errors out, fix the reference in `slides.md` (typo in component name) before continuing.

- [ ] **Step 3: Leave the dev server running**

Subsequent tasks rely on HMR to verify each slide's refactor visually. Keep the `bun run dev` process running in the background; do not kill it between tasks. If it is killed, restart it.

- [ ] **Step 4: Commit**

```bash
cd /home/tim/githubRepo/presentation
git add shadcn-ui/slides.md
git commit -m "feat(shadcn-ui): wire up slides.md with 14 slide references

Restores the deck's entry point. Slide order follows the traditional
Pain → Solution → Core Message structure.
"
```

---

## Task 4: Refactor `TitleSlide.vue` — ShadBadge → Badge

**Files:**
- Modify: `shadcn-ui/components/TitleSlide.vue`

This slide uses **6 ShadBadge** instances, **0 ShadCard**. It has no `<script>` block currently. We need to add one for the Badge import.

- [ ] **Step 1: Add the Badge import**

At the top of `TitleSlide.vue`, before the `<template>` block, add:

```vue
<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
</script>
```

- [ ] **Step 2: Replace all `<ShadBadge>` tags with `<Badge>`**

Inside the template, replace every occurrence:

| Before | After |
|---|---|
| `<ShadBadge variant="outline">MIT · 114k★</ShadBadge>` | `<Badge variant="outline">MIT · 114k★</Badge>` |
| `<ShadBadge variant="secondary">Open Source</ShadBadge>` | `<Badge variant="secondary">Open Source</Badge>` |
| `<ShadBadge variant="secondary">Open Code</ShadBadge>` | `<Badge variant="secondary">Open Code</Badge>` |
| `<ShadBadge variant="secondary">Radix UI</ShadBadge>` | `<Badge variant="secondary">Radix UI</Badge>` |
| `<ShadBadge variant="secondary">Tailwind v4</ShadBadge>` | `<Badge variant="secondary">Tailwind v4</Badge>` |
| `<ShadBadge variant="secondary">AI-Ready</ShadBadge>` | `<Badge variant="secondary">AI-Ready</Badge>` |

(Easy: `replace_all` of `ShadBadge` → `Badge` is safe here since no other identifier shares that prefix in this file.)

- [ ] **Step 3: Visual verify**

Browser at `http://localhost:3030/1` (Title slide). After HMR reloads:
- The `MIT · 114k★` outline badge looks the same.
- The five secondary badges (`Open Source`, `Open Code`, `Radix UI`, `Tailwind v4`, `AI-Ready`) look the same (note: native shadcn-vue `secondary` Badge will look slightly different from ShadBadge's mock — `bg-secondary` vs the previous hand-rolled `border-zinc-700/50 bg-zinc-800/50`. This is acceptable and is part of dogfooding.).
- No browser console errors.

- [ ] **Step 4: Commit**

```bash
cd /home/tim/githubRepo/presentation
git add shadcn-ui/components/TitleSlide.vue
git commit -m "refactor(shadcn-ui): TitleSlide uses native Badge"
```

---

## Task 5: Refactor `PainPointsSlide.vue` — ShadCard + ShadBadge → native

**Files:**
- Modify: `shadcn-ui/components/PainPointsSlide.vue`

This slide uses **4 ShadCard** (all `size="md"` with `dot` and `color`) and **3 ShadBadge**. No `<script>` block currently.

- [ ] **Step 1: Add imports**

Add to top of file:

```vue
<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
</script>
```

- [ ] **Step 2: Convert the 4 ShadCards to native Card composition**

The four cards in the 2×2 grid are titled "黑盒子（Black Box）" (red), "客製化困難" (orange), "升級代價高" (yellow), and "設計風格被綁定" (purple). All `size="md"`, all `v-click`, all with `dot`.

Representative conversion (the first card):

```vue
<!-- Before -->
<ShadCard v-click title="黑盒子（Black Box）" dot color="red" size="md">
  <p class="text-[11px] text-zinc-300 leading-relaxed mb-2">
    元件是 npm 套件，內部實作被封裝。
  </p>
  <div class="rounded bg-black/40 p-2 font-mono text-[10px] leading-relaxed">
    <div class="text-zinc-500">// node_modules/some-lib/dist/Button.js</div>
    <div class="text-red-300">// minified · unreadable · untouchable</div>
    <div class="text-zinc-600 truncate">!function(e,t){...}</div>
  </div>
</ShadCard>

<!-- After -->
<Card v-click class="bg-white/[0.03] border-white/10 gap-2 py-2.5 rounded-lg shadow-none">
  <CardHeader class="px-3 gap-0.5">
    <CardTitle class="text-xs flex items-center gap-1.5 text-zinc-100">
      <span class="size-1.5 rounded-full bg-red-400" />
      黑盒子（Black Box）
    </CardTitle>
  </CardHeader>
  <CardContent class="px-3">
    <p class="text-[11px] text-zinc-300 leading-relaxed mb-2">
      元件是 npm 套件，內部實作被封裝。
    </p>
    <div class="rounded bg-black/40 p-2 font-mono text-[10px] leading-relaxed">
      <div class="text-zinc-500">// node_modules/some-lib/dist/Button.js</div>
      <div class="text-red-300">// minified · unreadable · untouchable</div>
      <div class="text-zinc-600 truncate">!function(e,t){...}</div>
    </div>
  </CardContent>
</Card>
```

Apply the same recipe to all 4 cards. Color mapping for the dot `<span>`:
- "黑盒子（Black Box）" → `bg-red-400`
- "客製化困難" → `bg-orange-400`
- "升級代價高" → `bg-yellow-400`
- "設計風格被綁定" → `bg-purple-400`

- [ ] **Step 3: Convert the 3 ShadBadges**

The three badges are inside the "升級代價高" card:

```vue
<!-- Before -->
<ShadBadge variant="secondary">v1.2.3</ShadBadge>
<span class="text-zinc-600">→</span>
<ShadBadge variant="destructive">v2 breaking</ShadBadge>
<span class="text-zinc-600">→</span>
<ShadBadge variant="outline">停留 v1</ShadBadge>

<!-- After -->
<Badge variant="secondary">v1.2.3</Badge>
<span class="text-zinc-600">→</span>
<Badge variant="destructive">v2 breaking</Badge>
<span class="text-zinc-600">→</span>
<Badge variant="outline">停留 v1</Badge>
```

- [ ] **Step 4: Visual verify**

Browser at `http://localhost:3030/2` (PainPoints slide). After HMR:
- 4 cards in 2×2 grid; each card has a colored dot beside its title.
- Click-reveal animation (`v-click`) still works.
- Cards do not overflow the slide canvas (verifies the `gap-2 py-2.5` padding override worked).
- No browser console errors.

- [ ] **Step 5: Commit**

```bash
cd /home/tim/githubRepo/presentation
git add shadcn-ui/components/PainPointsSlide.vue
git commit -m "refactor(shadcn-ui): PainPointsSlide uses native Card and Badge"
```

---

## Task 6: Refactor `SolutionSlide.vue` — only ShadBadge → Badge

**Files:**
- Modify: `shadcn-ui/components/SolutionSlide.vue`

This slide already imports `Card`, `Button`, `Badge` natively for the live-demo block. Only **1 ShadBadge** remains (`variant="destructive"` near "npm install" mock).

- [ ] **Step 1: Confirm `Badge` is already imported**

Check the existing `<script setup>` block — it should already have:

```ts
import { Badge } from '@/components/ui/badge'
```

If yes, no import change is needed.

- [ ] **Step 2: Replace the single ShadBadge**

```vue
<!-- Before -->
<ShadBadge variant="destructive">npm</ShadBadge>

<!-- After -->
<Badge variant="destructive">npm</Badge>
```

- [ ] **Step 3: Visual verify**

Browser at `http://localhost:3030/3` (Solution slide). After HMR:
- Left column "Traditional" panel still shows the red `npm` badge next to the `npm i some-ui-lib` code snippet.
- Right column "shadcn/ui · LIVE" panel renders the existing live Card/Button/Badge demo unchanged.
- No browser console errors.

- [ ] **Step 4: Commit**

```bash
cd /home/tim/githubRepo/presentation
git add shadcn-ui/components/SolutionSlide.vue
git commit -m "refactor(shadcn-ui): SolutionSlide replaces last ShadBadge"
```

---

## Task 7: Refactor `PrinciplesSlide.vue` — 5 ShadCards in v-for → native

**Files:**
- Modify: `shadcn-ui/components/PrinciplesSlide.vue`

This slide uses **1 ShadCard** source (rendered 5× via `v-for`) plus the existing `<script setup>` block. **0 ShadBadge**.

- [ ] **Step 1: Add Card imports**

Update the existing `<script setup lang="ts">` block to include Card pieces. After the existing `principles` const, the script block should read:

```vue
<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const principles = [
  { title: 'Open Code', color: 'green', desc: '元件原始碼直接在你的專案裡，最頂層即可修改。', value: '完全透明、完全掌控。' },
  { title: 'Composition', color: 'blue', desc: '所有元件共用一致、可預測的 API 介面。', value: '易學易記，能互相組合。' },
  { title: 'Distribution', color: 'purple', desc: '透過 flat-file schema + CLI 散佈元件。', value: '跨專案、跨團隊共享容易。' },
  { title: 'Beautiful Defaults', color: 'orange', desc: '開箱即用就很美，預設值用心調過。', value: '不用設計師也能做出像樣 UI。' },
  { title: 'AI-Ready', color: 'cyan', desc: '原始碼公開，LLM 能讀、能理解、能改。', value: 'AI Coding 時代的最佳搭檔。' },
] as const

const dotColor: Record<string, string> = {
  blue: 'bg-blue-400',
  green: 'bg-emerald-400',
  purple: 'bg-purple-400',
  orange: 'bg-orange-400',
  cyan: 'bg-cyan-400',
}
</script>
```

(The `dotColor` map lets us pick the dot class from `p.color` inside the template without inline ternaries.)

- [ ] **Step 2: Replace the ShadCard in the v-for**

```vue
<!-- Before -->
<ShadCard v-for="(p, i) in principles" :key="i" v-click :title="p.title" dot :color="p.color" size="md">
  <div class="text-[10px] font-mono text-zinc-500 mb-1">0{{ i + 1 }}</div>
  <p class="text-[11px] text-zinc-300 leading-relaxed mb-2">{{ p.desc }}</p>
  <div class="border-t border-white/5 pt-1.5">
    <div class="text-[9px] uppercase tracking-wider text-zinc-500 mb-0.5">Value</div>
    <p class="text-[10px] text-zinc-400 leading-snug">{{ p.value }}</p>
  </div>
</ShadCard>

<!-- After -->
<Card v-for="(p, i) in principles" :key="i" v-click
      class="bg-white/[0.03] border-white/10 gap-2 py-2.5 rounded-lg shadow-none">
  <CardHeader class="px-3 gap-0.5">
    <CardTitle class="text-xs flex items-center gap-1.5 text-zinc-100">
      <span class="size-1.5 rounded-full" :class="dotColor[p.color]" />
      {{ p.title }}
    </CardTitle>
  </CardHeader>
  <CardContent class="px-3">
    <div class="text-[10px] font-mono text-zinc-500 mb-1">0{{ i + 1 }}</div>
    <p class="text-[11px] text-zinc-300 leading-relaxed mb-2">{{ p.desc }}</p>
    <div class="border-t border-white/5 pt-1.5">
      <div class="text-[9px] uppercase tracking-wider text-zinc-500 mb-0.5">Value</div>
      <p class="text-[10px] text-zinc-400 leading-snug">{{ p.value }}</p>
    </div>
  </CardContent>
</Card>
```

- [ ] **Step 3: Visual verify**

Browser at `http://localhost:3030/5` (Principles slide). After HMR:
- 5 cards in a 5-column grid; each titled `Open Code` / `Composition` / `Distribution` / `Beautiful Defaults` / `AI-Ready`.
- Each card's dot color: green / blue / purple / orange / cyan.
- "Value" section appears below `border-t` inside each card.
- TL;DR row below the grid still renders.
- No browser console errors.

- [ ] **Step 4: Commit**

```bash
cd /home/tim/githubRepo/presentation
git add shadcn-ui/components/PrinciplesSlide.vue
git commit -m "refactor(shadcn-ui): PrinciplesSlide uses native Card"
```

---

## Task 8: Refactor `TechStackSlide.vue` — 3 ShadCard + 1 ShadBadge → native

**Files:**
- Modify: `shadcn-ui/components/TechStackSlide.vue`

Uses **3 ShadCard** (titled "Headless 基底" blue, "OKLCH 色彩系統" purple, "Tailwind v4 First" cyan) and **1 ShadBadge** rendered in a v-for over the `stack` array.

- [ ] **Step 1: Update imports**

Update the `<script setup>` block:

```vue
<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const stack = [
  { title: 'shadcn/ui Components', desc: '你複製到專案的程式碼（components/ui/*）', tag: 'Your code',
    bgClass: 'border-emerald-500/30 bg-emerald-500/[0.05]', titleClass: 'text-emerald-300' },
  { title: 'Radix UI / Base UI', desc: 'Headless — 行為、a11y、鍵盤導覽', tag: 'Headless',
    bgClass: 'border-white/10 bg-white/[0.03]', titleClass: 'text-white' },
  { title: 'Tailwind CSS v4', desc: 'Utility-first 樣式 + @theme tokens', tag: 'Styling',
    bgClass: 'border-white/10 bg-white/[0.03]', titleClass: 'text-white' },
  { title: 'CSS Variables (OKLCH)', desc: '主題系統 — 改 token，全站同步', tag: 'Theming',
    bgClass: 'border-white/10 bg-white/[0.03]', titleClass: 'text-white' },
] as const
</script>
```

- [ ] **Step 2: Replace `<ShadBadge variant="outline">{{ layer.tag }}</ShadBadge>` with native Badge**

```vue
<!-- Before -->
<ShadBadge variant="outline">{{ layer.tag }}</ShadBadge>

<!-- After -->
<Badge variant="outline">{{ layer.tag }}</Badge>
```

- [ ] **Step 3: Replace the 3 ShadCards**

Each is `size="md"` with `dot`. Mapping:
- "Headless 基底" `color="blue"` → dot `bg-blue-400`
- "OKLCH 色彩系統" `color="purple"` → dot `bg-purple-400`
- "Tailwind v4 First" `color="cyan"` → dot `bg-cyan-400`

Representative conversion (first card):

```vue
<!-- Before -->
<ShadCard v-click title="Headless 基底" dot color="blue" size="md">
  <p class="text-[11px] text-zinc-300 leading-relaxed">
    <span class="text-white font-semibold">Radix UI</span>（預設）或 Base UI 處理行為、無障礙、鍵盤導覽。
  </p>
</ShadCard>

<!-- After -->
<Card v-click class="bg-white/[0.03] border-white/10 gap-2 py-2.5 rounded-lg shadow-none">
  <CardHeader class="px-3 gap-0.5">
    <CardTitle class="text-xs flex items-center gap-1.5 text-zinc-100">
      <span class="size-1.5 rounded-full bg-blue-400" />
      Headless 基底
    </CardTitle>
  </CardHeader>
  <CardContent class="px-3">
    <p class="text-[11px] text-zinc-300 leading-relaxed">
      <span class="text-white font-semibold">Radix UI</span>（預設）或 Base UI 處理行為、無障礙、鍵盤導覽。
    </p>
  </CardContent>
</Card>
```

Apply identical treatment to the OKLCH (purple) and Tailwind v4 (cyan) cards.

- [ ] **Step 4: Visual verify**

Browser at `http://localhost:3030/6`. After HMR:
- Left column: 4 stack-layer rows with outline `<Badge>` on the right of each row (Your code, Headless, Styling, Theming).
- Right column: 3 cards each with a colored dot in title (blue, purple, cyan).
- No browser console errors.

- [ ] **Step 5: Commit**

```bash
cd /home/tim/githubRepo/presentation
git add shadcn-ui/components/TechStackSlide.vue
git commit -m "refactor(shadcn-ui): TechStackSlide uses native Card and Badge"
```

---

## Task 9: Refactor `ComponentsOverviewSlide.vue` — 6 ShadCards in v-for → native

**Files:**
- Modify: `shadcn-ui/components/ComponentsOverviewSlide.vue`

Uses **1 ShadCard** source (rendered 6× via `v-for` over `groups`). **0 ShadBadge**.

- [ ] **Step 1: Update `<script setup>` block**

```vue
<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const groups = [
  { title: '表單與輸入', color: 'blue',
    items: ['Button', 'Checkbox', 'Input', 'OTP', 'Select', 'Slider', 'Switch', 'Textarea', 'Toggle', 'Radio'] },
  { title: '顯示與佈局', color: 'green',
    items: ['Accordion', 'Alert', 'Avatar', 'Badge', 'Breadcrumb', 'Card', 'Carousel', 'Separator', 'Skeleton'] },
  { title: '覆蓋層', color: 'purple',
    items: ['Alert Dialog', 'Dialog', 'Drawer', 'Hover Card', 'Popover', 'Sheet', 'Tooltip'] },
  { title: '導覽', color: 'cyan',
    items: ['Command', 'Context Menu', 'Dropdown', 'Menubar', 'Navigation', 'Pagination'] },
  { title: '資料呈現', color: 'orange',
    items: ['Chart', 'Data Table', 'Progress', 'Scroll Area', 'Table', 'Tabs'] },
  { title: '特殊元件', color: 'pink',
    items: ['Calendar', 'Combobox', 'Date Picker', 'Empty', 'Kbd', 'Resizable', 'Sidebar', 'Sonner'] },
]

const dotColor: Record<string, string> = {
  blue: 'bg-blue-400',
  green: 'bg-emerald-400',
  purple: 'bg-purple-400',
  cyan: 'bg-cyan-400',
  orange: 'bg-orange-400',
  pink: 'bg-pink-400',
}
</script>
```

- [ ] **Step 2: Replace the ShadCard in v-for**

```vue
<!-- Before -->
<ShadCard v-for="group in groups" :key="group.title" v-click
          :title="group.title" dot :color="group.color" size="md">
  <div class="flex flex-wrap gap-1">
    <span v-for="item in group.items" :key="item"
          class="text-[9px] font-mono rounded border border-white/5 bg-white/[0.03] px-1.5 py-0.5 text-zinc-300">
      {{ item }}
    </span>
  </div>
</ShadCard>

<!-- After -->
<Card v-for="group in groups" :key="group.title" v-click
      class="bg-white/[0.03] border-white/10 gap-2 py-2.5 rounded-lg shadow-none">
  <CardHeader class="px-3 gap-0.5">
    <CardTitle class="text-xs flex items-center gap-1.5 text-zinc-100">
      <span class="size-1.5 rounded-full" :class="dotColor[group.color]" />
      {{ group.title }}
    </CardTitle>
  </CardHeader>
  <CardContent class="px-3">
    <div class="flex flex-wrap gap-1">
      <span v-for="item in group.items" :key="item"
            class="text-[9px] font-mono rounded border border-white/5 bg-white/[0.03] px-1.5 py-0.5 text-zinc-300">
        {{ item }}
      </span>
    </div>
  </CardContent>
</Card>
```

- [ ] **Step 3: Visual verify**

Browser at `http://localhost:3030/8`. After HMR:
- 6 cards in 3-column grid: 表單與輸入, 顯示與佈局, 覆蓋層, 導覽, 資料呈現, 特殊元件.
- Each card lists its items as small monospace pills.
- Dot colors: blue / green (emerald) / purple / cyan / orange / pink.
- No browser console errors.

- [ ] **Step 4: Commit**

```bash
cd /home/tim/githubRepo/presentation
git add shadcn-ui/components/ComponentsOverviewSlide.vue
git commit -m "refactor(shadcn-ui): ComponentsOverviewSlide uses native Card"
```

---

## Task 10: Refactor `BlocksSlide.vue` — 4 ShadCards → native

**Files:**
- Modify: `shadcn-ui/components/BlocksSlide.vue`

Uses **4 ShadCard** (Dashboard blue, Sidebar purple, Login green, Calendar orange) — each `size="md"` with its own internal mock content (no v-for). **0 ShadBadge**. No existing `<script>` block.

- [ ] **Step 1: Add Card imports**

Add at top of file:

```vue
<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
</script>
```

- [ ] **Step 2: Convert each of the 4 ShadCards**

Color mapping for dots:
- "Dashboard" → `bg-blue-400`
- "Sidebar" → `bg-purple-400`
- "Login" → `bg-emerald-400`
- "Calendar" → `bg-orange-400`

Representative conversion (first card — Dashboard):

```vue
<!-- Before -->
<ShadCard v-click title="Dashboard" dot color="blue" size="md">
  <div class="aspect-[4/3] rounded bg-black/40 p-1.5 border border-white/5">
    <!-- mock dashboard layout -->
  </div>
  <p class="text-[10px] text-zinc-400 mt-1.5 leading-snug">含 sidebar、charts、data table。</p>
</ShadCard>

<!-- After -->
<Card v-click class="bg-white/[0.03] border-white/10 gap-2 py-2.5 rounded-lg shadow-none">
  <CardHeader class="px-3 gap-0.5">
    <CardTitle class="text-xs flex items-center gap-1.5 text-zinc-100">
      <span class="size-1.5 rounded-full bg-blue-400" />
      Dashboard
    </CardTitle>
  </CardHeader>
  <CardContent class="px-3">
    <div class="aspect-[4/3] rounded bg-black/40 p-1.5 border border-white/5">
      <!-- mock dashboard layout — keep exactly as-is -->
    </div>
    <p class="text-[10px] text-zinc-400 mt-1.5 leading-snug">含 sidebar、charts、data table。</p>
  </CardContent>
</Card>
```

Apply identical treatment to Sidebar (purple), Login (emerald), Calendar (orange). The mock content inside each is unchanged — only the wrapper changes.

- [ ] **Step 3: Visual verify**

Browser at `http://localhost:3030/9`. After HMR:
- 4 cards in 4-column grid, each containing a small visual mock of the block type.
- Dot colors: blue / purple / emerald / orange.
- 3-step explanation row below grid still renders.
- No browser console errors.

- [ ] **Step 4: Commit**

```bash
cd /home/tim/githubRepo/presentation
git add shadcn-ui/components/BlocksSlide.vue
git commit -m "refactor(shadcn-ui): BlocksSlide uses native Card"
```

---

## Task 11: Refactor `RegistrySlide.vue` — 3 ShadCard + 3 ShadBadge → native

**Files:**
- Modify: `shadcn-ui/components/RegistrySlide.vue`

Uses **3 ShadCard** ("公司內部設計系統" blue, "私有元件 + Auth" purple, "跨框架重用" green) and **3 ShadBadge** (`React`, `Vue`, `Svelte` — all `outline`). No existing `<script>` block.

- [ ] **Step 1: Add imports**

Add at top of file:

```vue
<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
</script>
```

- [ ] **Step 2: Convert the 3 ShadCards**

Color mapping for dots:
- "公司內部設計系統" → `bg-blue-400`
- "私有元件 + Auth" → `bg-purple-400`
- "跨框架重用" → `bg-emerald-400`

Representative conversion (first card):

```vue
<!-- Before -->
<ShadCard v-click title="公司內部設計系統" dot color="blue" size="md">
  <p class="text-[11px] text-zinc-300 leading-relaxed mb-1.5">
    把品牌按鈕、表單元件做成 registry。
  </p>
  <code class="block text-[10px] font-mono bg-black/40 rounded p-1.5 text-emerald-300">
    shadcn add @my-co/button
  </code>
  <p class="text-[10px] text-zinc-500 mt-1.5">新專案啟動 = 一行指令</p>
</ShadCard>

<!-- After -->
<Card v-click class="bg-white/[0.03] border-white/10 gap-2 py-2.5 rounded-lg shadow-none">
  <CardHeader class="px-3 gap-0.5">
    <CardTitle class="text-xs flex items-center gap-1.5 text-zinc-100">
      <span class="size-1.5 rounded-full bg-blue-400" />
      公司內部設計系統
    </CardTitle>
  </CardHeader>
  <CardContent class="px-3">
    <p class="text-[11px] text-zinc-300 leading-relaxed mb-1.5">
      把品牌按鈕、表單元件做成 registry。
    </p>
    <code class="block text-[10px] font-mono bg-black/40 rounded p-1.5 text-emerald-300">
      shadcn add @my-co/button
    </code>
    <p class="text-[10px] text-zinc-500 mt-1.5">新專案啟動 = 一行指令</p>
  </CardContent>
</Card>
```

Apply identical treatment to "私有元件 + Auth" (purple) and "跨框架重用" (emerald).

- [ ] **Step 3: Convert the 3 ShadBadges**

Inside the "跨框架重用" card:

```vue
<!-- Before -->
<ShadBadge variant="outline">React</ShadBadge>
<ShadBadge variant="outline">Vue</ShadBadge>
<ShadBadge variant="outline">Svelte</ShadBadge>

<!-- After -->
<Badge variant="outline">React</Badge>
<Badge variant="outline">Vue</Badge>
<Badge variant="outline">Svelte</Badge>
```

- [ ] **Step 4: Visual verify**

Browser at `http://localhost:3030/11`. After HMR:
- 3 cards in 3-column grid: 公司內部設計系統 / 私有元件 + Auth / 跨框架重用.
- React / Vue / Svelte outline badges visible inside third card.
- Top 4-step flow row (Define → Build → Host → Add) and bottom highlight row unchanged.
- No browser console errors.

- [ ] **Step 5: Commit**

```bash
cd /home/tim/githubRepo/presentation
git add shadcn-ui/components/RegistrySlide.vue
git commit -m "refactor(shadcn-ui): RegistrySlide uses native Card and Badge"
```

---

## Task 12: Refactor `MCPSlide.vue` — 3 ShadCard + 1 ShadBadge → native

**Files:**
- Modify: `shadcn-ui/components/MCPSlide.vue`

Uses **3 ShadCard** ("一鍵設定" blue, "支援的 client" purple, "多 registry 串接" green) and **1 ShadBadge** ("MCP connected" outline) in the right column. No existing `<script>` block.

- [ ] **Step 1: Add imports**

```vue
<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
</script>
```

- [ ] **Step 2: Replace the ShadBadge**

```vue
<!-- Before -->
<ShadBadge variant="outline">MCP connected</ShadBadge>

<!-- After -->
<Badge variant="outline">MCP connected</Badge>
```

- [ ] **Step 3: Convert the 3 ShadCards**

Color mapping for dots:
- "一鍵設定" → `bg-blue-400`
- "支援的 client" → `bg-purple-400`
- "多 registry 串接" → `bg-emerald-400`

Representative conversion (first card):

```vue
<!-- Before -->
<ShadCard v-click title="一鍵設定" dot color="blue" size="md">
  <code class="block text-[10px] font-mono bg-black/40 rounded p-1.5 text-emerald-300 leading-relaxed">
    pnpm dlx shadcn@latest<br/>
    &nbsp;&nbsp;mcp init --client claude
  </code>
</ShadCard>

<!-- After -->
<Card v-click class="bg-white/[0.03] border-white/10 gap-2 py-2.5 rounded-lg shadow-none">
  <CardHeader class="px-3 gap-0.5">
    <CardTitle class="text-xs flex items-center gap-1.5 text-zinc-100">
      <span class="size-1.5 rounded-full bg-blue-400" />
      一鍵設定
    </CardTitle>
  </CardHeader>
  <CardContent class="px-3">
    <code class="block text-[10px] font-mono bg-black/40 rounded p-1.5 text-emerald-300 leading-relaxed">
      pnpm dlx shadcn@latest<br/>
      &nbsp;&nbsp;mcp init --client claude
    </code>
  </CardContent>
</Card>
```

Apply identical treatment to "支援的 client" (purple) and "多 registry 串接" (emerald).

- [ ] **Step 4: Visual verify**

Browser at `http://localhost:3030/12`. After HMR:
- Left column: chat panel showing user message + AI response.
- Right column: 3 cards (一鍵設定 / 支援的 client / 多 registry 串接) with dot colors blue / purple / emerald.
- "MCP connected" outline badge visible in the chat panel header.
- No browser console errors.

- [ ] **Step 5: Commit**

```bash
cd /home/tim/githubRepo/presentation
git add shadcn-ui/components/MCPSlide.vue
git commit -m "refactor(shadcn-ui): MCPSlide uses native Card and Badge"
```

---

## Task 13: Refactor `LatestUpdatesSlide.vue` — ShadBadge → Badge (incl. `success`)

**Files:**
- Modify: `shadcn-ui/components/LatestUpdatesSlide.vue`

Uses **2 ShadBadge** sources (one inside `v-if="item.badge"`, one in `v-for`). The first uses `:variant="item.badgeVariant ?? 'success'"` — this is where the new `success` variant added in Task 2 finally renders.

**0 ShadCard** here (timeline rows are bespoke divs, not cards).

- [ ] **Step 1: Update `<script setup>` block to import Badge**

Insert the import; keep the existing `timeline` array unchanged. The block should read:

```vue
<script setup lang="ts">
import { Badge } from '@/components/ui/badge'

const timeline = [
  {
    date: '2026 / 05',
    title: 'Monorepo 友善 + Target Aliases',
    desc: 'CLI 支援 package.json#imports，多套件專案不再需要相對路徑地獄。Registry 支援 target aliases。',
    badge: 'NEW',
    badgeVariant: 'success' as const,
    tags: ['Monorepo', 'CLI', 'Registry'],
  },
  {
    date: '2026 / 04',
    title: 'Preset Commands + Sera Style',
    desc: '新增 decode / resolve / share preset 子指令。推出 Sera Style — serif 字型風格的新主題。',
    badge: '主題',
    tags: ['Preset', 'Sera Style', 'Theming'],
  },
  {
    date: '2025',
    title: 'MCP Server + CLI v3.0',
    desc: 'AI 時代關鍵更新：MCP Server 讓 LLM 直接裝元件；CLI 重寫到 v3；Tailwind v4 相容；RTL 支援。',
    badge: '里程碑',
    badgeVariant: 'default' as const,
    tags: ['MCP', 'Tailwind v4', 'RTL', 'CLI v3'],
  },
] as const
</script>
```

- [ ] **Step 2: Replace the 2 ShadBadge sites in template**

```vue
<!-- Before -->
<ShadBadge v-if="item.badge" :variant="item.badgeVariant ?? 'success'">{{ item.badge }}</ShadBadge>
...
<ShadBadge v-for="t in item.tags" :key="t" variant="outline">{{ t }}</ShadBadge>

<!-- After -->
<Badge v-if="item.badge" :variant="item.badgeVariant ?? 'success'">{{ item.badge }}</Badge>
...
<Badge v-for="t in item.tags" :key="t" variant="outline">{{ t }}</Badge>
```

- [ ] **Step 3: Visual verify — pay attention to the success variant**

Browser at `http://localhost:3030/13`. After HMR:
- 3 timeline rows with a left-aligned date column, central bullet, and right-side card.
- 2026/05 row has a `NEW` badge — **must render with emerald-tinted background and emerald-300 text** (the `success` variant from Task 2). If this badge renders as `default` (white-ish primary) instead, that means Task 2's `success` variant wasn't added correctly — fix `components/ui/badge/index.ts` before continuing.
- 2026/04 row has a `主題` badge in default variant.
- 2025 row has a `里程碑` badge in default variant.
- Tags below each desc render as outline badges.
- No browser console errors.

- [ ] **Step 4: Commit**

```bash
cd /home/tim/githubRepo/presentation
git add shadcn-ui/components/LatestUpdatesSlide.vue
git commit -m "refactor(shadcn-ui): LatestUpdatesSlide uses native Badge

The NEW badge on the 2026/05 row exercises the success variant
added in components/ui/badge/index.ts.
"
```

---

## Task 14: Refactor `SummarySlide.vue` — 3 ShadCards → native

**Files:**
- Modify: `shadcn-ui/components/SummarySlide.vue`

Uses **3 ShadCard** (`1 · Own your components` green, `2 · Tokens > Components` blue, `3 · Registry > NPM` purple) — all `size="md"`. **0 ShadBadge**. No existing `<script>` block.

- [ ] **Step 1: Add Card imports**

```vue
<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const links = [
  { title: '官網',         url: 'ui.shadcn.com' },
  { title: '元件總覽',     url: 'ui.shadcn.com/docs/components' },
  { title: 'Blocks',       url: 'ui.shadcn.com/blocks' },
  { title: 'Themes',       url: 'ui.shadcn.com/themes' },
  { title: 'Registry 文件', url: 'ui.shadcn.com/docs/registry' },
  { title: 'MCP 文件',     url: 'ui.shadcn.com/docs/mcp' },
  { title: 'GitHub',       url: 'github.com/shadcn-ui/ui' },
  { title: '作者 @shadcn', url: 'x.com/shadcn' },
]
</script>
```

- [ ] **Step 2: Convert the 3 ShadCards**

Color mapping for dots:
- "1 · Own your components" → `bg-emerald-400`
- "2 · Tokens > Components" → `bg-blue-400`
- "3 · Registry > NPM" → `bg-purple-400`

Representative conversion (first card):

```vue
<!-- Before -->
<ShadCard v-click title="1 · Own your components" dot color="green" size="md">
  <p class="text-[11px] text-zinc-300 leading-relaxed">
    元件 = 你的程式碼。沒有 vendor lock-in。
  </p>
</ShadCard>

<!-- After -->
<Card v-click class="bg-white/[0.03] border-white/10 gap-2 py-2.5 rounded-lg shadow-none">
  <CardHeader class="px-3 gap-0.5">
    <CardTitle class="text-xs flex items-center gap-1.5 text-zinc-100">
      <span class="size-1.5 rounded-full bg-emerald-400" />
      1 · Own your components
    </CardTitle>
  </CardHeader>
  <CardContent class="px-3">
    <p class="text-[11px] text-zinc-300 leading-relaxed">
      元件 = 你的程式碼。沒有 vendor lock-in。
    </p>
  </CardContent>
</Card>
```

Apply identical treatment to card 2 (blue) and card 3 (purple).

- [ ] **Step 3: Visual verify**

Browser at `http://localhost:3030/14`. After HMR:
- 3 cards in 3-column grid at top: Own your components / Tokens > Components / Registry > NPM.
- Dot colors: emerald / blue / purple.
- Resources grid below + footer thank-you row unchanged.
- No browser console errors.

- [ ] **Step 4: Commit**

```bash
cd /home/tim/githubRepo/presentation
git add shadcn-ui/components/SummarySlide.vue
git commit -m "refactor(shadcn-ui): SummarySlide uses native Card"
```

---

## Task 15: Delete the unused ShadCard.vue and ShadBadge.vue wrappers

**Files:**
- Delete: `shadcn-ui/components/ShadCard.vue`
- Delete: `shadcn-ui/components/ShadBadge.vue`

- [ ] **Step 1: Confirm zero remaining references**

```bash
cd /home/tim/githubRepo/presentation/shadcn-ui
grep -rn "ShadCard\|ShadBadge" components/ slides.md
```

Expected output: empty (no matches anywhere). If anything matches, return to the relevant Task 4–14 and finish that slide's conversion before continuing.

- [ ] **Step 2: Delete the wrapper files**

```bash
rm /home/tim/githubRepo/presentation/shadcn-ui/components/ShadCard.vue
rm /home/tim/githubRepo/presentation/shadcn-ui/components/ShadBadge.vue
```

- [ ] **Step 3: Verify dev server still happy**

Switch to the browser tab running `localhost:3030/`. Navigate through all 14 slides. Each slide must still render with no `Failed to resolve component "ShadCard"` or `"ShadBadge"` errors in browser console.

If a slide errors, that slide's Task did not fully complete — find the leftover `<ShadCard>` / `<ShadBadge>` tag and convert it, then retry.

- [ ] **Step 4: Commit**

```bash
cd /home/tim/githubRepo/presentation
git add -A shadcn-ui/components/
git commit -m "refactor(shadcn-ui): remove ShadCard and ShadBadge wrappers

All 11 slides now use native shadcn-vue Card/Badge directly.
The deck dogfoods its own subject matter.
"
```

---

## Task 16: Final end-to-end verification

**Files:** None modified.

- [ ] **Step 1: Clean restart of dev server**

If the previous `bun run dev` is still running, stop it (Ctrl-C). Then:

```bash
cd /home/tim/githubRepo/presentation/shadcn-ui
bun run dev
```

Expected: Slidev banner appears, server listens on `localhost:3030`, no compile/import errors in terminal output.

- [ ] **Step 2: Walk through all 14 slides in browser**

At `localhost:3030/1` press `→` 13 times to visit slides 2 through 14. For each slide check:
- Renders without browser console errors.
- Layout fits the slide canvas (no content overflow).
- `v-click` step-through animation still works (press → to reveal each `v-click` element).

The 14 slides in order:
1. Title — shadcn/ui logo, badges, footer URLs
2. PainPoints — 2×2 grid of pain cards
3. Solution — Traditional vs LIVE shadcn comparison + live Button/Card/Badge demo
4. CoreMessage — strikethrough headline + bullet point reveal
5. Principles — 5-column grid of principle cards
6. TechStack — 4-row layer list + 3-card column
7. CLI — terminal mock + command reference list
8. ComponentsOverview — 6-card grid of 70+ components by category
9. Blocks — 4-card grid of UI block previews
10. Theming — CSS code block + semantic pairing palette
11. Registry — 4-step flow + 3-card use-case grid
12. MCP — chat panel + 3-card setup column
13. LatestUpdates — 3-row timeline with NEW (success), 主題, 里程碑 badges
14. Summary — 3-card takeaway grid + resources + Q&A footer

- [ ] **Step 3: Test production build**

Stop the dev server. Then:

```bash
cd /home/tim/githubRepo/presentation/shadcn-ui
bun run build
```

Expected: `vite build` completes without errors; `dist/` directory is produced with `index.html` and static assets.

```bash
ls /home/tim/githubRepo/presentation/shadcn-ui/dist/
```

Expected: `index.html` + `assets/` directory present.

- [ ] **Step 4: Summarize completion**

Report to user:
- All 14 slides render via `bun run dev`.
- Production build succeeds.
- 11 slide files now import shadcn-vue Card/Badge directly; ShadCard and ShadBadge wrappers are gone.
- Badge has a working `success` variant defined in `components/ui/badge/index.ts`.
- Deck `node_modules`, `pnpm-lock.yaml`, `pnpm-workspace.yaml` are gone; deck inherits deps from root bun workspace.

(No commit needed — this is a verification-only task.)
