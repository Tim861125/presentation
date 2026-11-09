---
name: create-monthly
description: Use when creating a new monthly work report Slidev deck in the presentation monorepo — `create-monthly [YYYY-MM] <spec-source>`. Supports spec sources: a file path containing notes/tasks, a URL, or raw text. Covers scaffold from the hand-drawn (rough.js) sketch template, spec.md → slides.md distillation, verification, and common pitfalls.
---

# Create Monthly Work Report Slidev Deck

## Overview

Slides in the `presentation` monorepo are **Slidev decks**, one directory per deck. The core flow:

1. **Read & organize** source content → refined spec
2. Write refined content → `spec.md` (source of truth)
3. **Distill** spec into a concise `slides.md` in the **hand-drawn style**
4. Verify no page overflow

Slides are the distilled highlights, not a verbatim copy of the spec.

Write slide content in **Traditional Chinese** (keep technical terms in their original language).

## Usage

```bash
create-monthly [YYYY-MM] <spec-source>    # Monthly work report (month deck)
```

Example: `create-monthly 2026-08` followed by the user providing raw text.
Example: `create-monthly 2026-08 /path/to/spec.md`

**`<spec-source>`** accepts:

- **File path** — a `.md` file containing notes/tasks
- **URL** — Google Doc / Azure DevOps / any online content (fetch via `webfetch`)
- **Raw text** — provided directly in the conversation; the skill will auto-generate the spec

---

## Step 0: Read Source & Organize Spec Content

**Before writing spec.md, always read the source content and distill it.**

1. **Fetch/resolve source** — `spec/*.md` (resolves to `<repo>/spec/<filename>`), file path, URL (if SPA, fetch the GitHub raw version), or raw text
2. **Read the content fully** — understand all material before distilling
3. **Organize & refine** — group related items, remove redundancy and noise, keep essential details, preserve source links
4. **Write organized content** into the deck's `spec.md`

---

## Step 1: Scaffold Deck from Template

**Never** run `npx slidev create` — it produces a standalone project that conflicts with the workspace. Use the built-in template instead.

Template location: `.agents/skills/create-monthly/templates/sketch/`

### Determine deck name

```
month261 = Jan 2026 ... month269 = Sep 2026
month25a = Oct 2025; 25b = Nov; 25c = Dec
```

```bash
TEMPLATE_BASE="/home/tim/githubRepo/presentation/.agents/skills/create-monthly/templates/sketch"
cp -r $TEMPLATE_BASE ./<new-deck>
bun install
```

Decks need **no `package.json`** — `scripts/dev.js` discovers a deck by the presence of `slides.md`, and all deps (including `roughjs`) live at the repo root.

**Keep every template file** — the hand-drawn look depends on all of them; Slidev picks them up from the deck root by convention:

| File | Role |
| --- | --- |
| `style.css` | 白底、藍 `#4f61ab` + 琥珀 `#f5a700` 調色盤（`--sk-*`）、h1 琥珀底線、`.callout` / `.big-quote` / `.scene-caption` / `.code-sm` |
| `layouts/cover.vue`, `layouts/section.vue` | navy 點陣漸層的封面（預設 slot + `::art::`）與章節頁（`.eyebrow` + `# 標題`） |
| `global-bottom.vue` | 每頁頁尾：`YYYY-MM 工作報告 · 丁吾心` + 頁碼（封面不顯示） |
| `utils/rough-scene.ts` | rough.js 手繪引擎：`Scene`（`layer` / `box` / `arrow` / `curve` / `pill` / `text`…）+ `useRoughScene`，跟著 `$clicks` 一筆筆「畫出來」 |
| `setup/shiki.ts` | `github-light` 程式碼配色 |
| `components/TitleSketch.vue` | 封面右側手繪：本月主線節點＋箭頭（改 `nodes` / `edges` / `tagline`） |
| `components/FlowScene.vue` | 通用手繪流程圖：props `steps` / `notes` / `result`，每 click 畫一格 |

Replace the `YYYY-MM` placeholder in `slides.md`, `global-bottom.vue`, and `components/` with the actual month (e.g. `2026-10`).

**Note:** All commands run from the repo root (`/home/tim/githubRepo/presentation`). Do NOT `cd` into the deck directory. `bun install` must run at the root.

---

## Step 2: Write spec.md

The template's `spec.md` already carries the required header (注意事項：手寫風格、不用 icon、不超出頁高、繁體中文). Paste the organized task list under `# 以下為本月工作內容`.

---

## Step 3: Distill slides.md from spec — hand-drawn style

**Style baseline — read first:** the hand-drawn style comes from `/home/tim/githubRepo/context-propagation-slides` (`slides.md`, `components/*Scene.vue`). Open it before writing to see how pages mix markdown with rough.js scenes. The template's `slides.md` is the page skeleton to fill.

Monthly decks are **markdown-heavy with hand-drawn scenes**: plain `# 標題` + markdown on a white page, and each topic gets at least one rough.js scene that sketches itself in click by click.

Fixed page order:

1. **Cover** (`layout: cover`, lives in the headmatter) — `# YYYY-MM 工作報告` + 一句主軸 + `丁吾心 · YYYY-MM`, `::art::` → `<TitleSketch />`
2. **目錄** — two-column numbered list (`01`…`NN` in `--sk-orange-dark` mono + bold title + one-line grey summary)
3. **本月總結** (`layout: center`) — `.big-quote` one-sentence summary with `<em>` highlights + two `.callout` cards (`.callout.blue` + `.callout`)
4. **Per topic, repeat:**
   - `layout: section` — `<div class="eyebrow">產品線 · NN</div>` + `# 主題` + 一句副標
   - **Scene page** — `# 標題` + a rough.js scene (`<FlowScene … />` or a new `components/<Topic>Scene.vue`) + `.scene-caption`; set `clicks:` in frontmatter and write one `[click]` presenter note per step
   - **Detail page** (optional) — `### 完成項目` / `### 待辦 / 風險` in `grid grid-cols-2 gap-8` with `v-click`, plus a `.callout` for 次要工作（以「·」分隔）
5. **Closing** (`layout: section`) — eyebrow `Thanks` + `# 工作報告結束` + `YYYY-MM · 丁吾心`

### Writing a new scene

Copy `FlowScene.vue` (or a scene from the reference deck, e.g. `IslandsScene.vue`, `WaterfallScene.vue`) to `components/<Topic>Scene.vue` and draw in `useRoughScene(svg, s => { … })`:

- `s.layer(n)` = group shown from click `n` on (`{ to }` hides it later, `{ delay, duration }` paces the sketch-in). Layer 0 is visible on enter, so **frontmatter `clicks:` = highest layer index**.
- Colors come from `C` (`blue`, `blueLight`, `blueTint`, `navy`, `orange`, `orangeDark`, `grey`, `red`, `green`): primary boxes `fill: C.blueTint, fillStyle: 'solid', stroke: C.blue`. **Never fill boxes with `fillStyle: 'hachure'`** (diagonal-line fill) — the user dislikes it; the hand-drawn feel comes from the rough strokes, not the fill; highlights / results in `C.orange`; problems in `C.red`.
- Use a fixed `viewBox` (width 900, height ≤ 330) with `class="w-full"` so the scene fits the canvas under the h1.
- Static decorative scenes (cover) pass `() => 0` as the step function.

### Slidev v52 parser traps (verified against @slidev/parser)

1. **Slide 1 lives INSIDE the deck headmatter block** — the first frontmatter block doubles as headmatter + cover, so cover content goes directly after the headmatter-closing `---`. Adding a bare `---` + frontmatter block for slide 1 renders an extra empty first page.
2. **Each slide = `---` + frontmatter + `---` + content + one `---` separator.** Never two consecutive `---` lines (creates an empty slide).
3. **Named slots in markdown use `::art::`** (v52 slot sugar). The old MDC `<div slots="art" />` does NOT work.
4. **Blank lines around markdown inside HTML** — inside `<div class="callout">` / `<div v-click>`, leave a blank line after the opening tag and before the closing tag, or the markdown renders as raw text.

---

## Slide Writing Conventions

- **Hand-drawn first** — every topic shows its story as a rough.js scene (flow, before/after, architecture, timeline); text pages support the scenes, not the other way round.
- **Group by product/topic** — monthly decks group by `IPTECH`, `WEBPAT`, `TipoMusic`, `AI`; the product line goes in the section `.eyebrow`.
- **One idea per page, no overflow** — canvas is ~551px tall: ≤4 bullets per column, scene height ≤ 330 viewBox units; split into another page instead of shrinking text.
- **Reveal with clicks** — scenes step via `clicks:` + layers; text blocks via `v-click` / `<v-clicks>`.
- **No icons** — only checkmarks / crosses to indicate done / pending.
- **Distill, don't copy** — the spec is the full list; slides keep only key highlights.
- **Stay in the palette** — use `--sk-*` / `C.*` colors and the existing classes; skip `theme: tech` components (`SlideShell`, `TechCard`…), which belong to the old dark tech style.

---

## Visual Verification (Check for Page Overflow) — Mandatory

Slidev renders each slide on a **fixed-size canvas** (~980×551px, 16:9). Content that exceeds it is hidden by `overflow: hidden`.

1. Start dev server (from repo root): `bun run dev <deck>` (default `http://localhost:3030`, auto-rotates if in use).
2. Open `/export/` (Chrome DevTools MCP `navigate_page`, or Playwright if MCP is not connected) — it stacks all slides.
3. Run overflow check:

    ```js
    () =>
      Array.from(document.querySelectorAll(".slidev-page"))
        .map((el, i) => ({ slide: i + 1, overflowPx: el.scrollHeight - el.clientHeight }))
        .filter((s) => s.overflowPx > 2);
    ```

    Empty array = OK.

4. Screenshot every scene page at its **last click** (`http://localhost:<port>/<n>?clicks=<N>`) — confirms every layer draws and nothing collides with the footer. A missing final layer means `clicks:` is lower than the highest layer index.
5. Fix overflows: split pages, cut bullets, or lower the scene's viewBox height. The `Failed to patch FloatingVue` console error comes from Slidev itself and is harmless.

---

## Common Mistakes

- **Page cut off at bottom** — skipped overflow check before claiming done.
- **Last scene step never shows** — `clicks:` set to the step count instead of the highest layer index.
- Deleted `style.css` / `layouts/` / `global-bottom.vue` / `utils/` from the new deck → plain default-theme look.
- Left `YYYY-MM` in `global-bottom.vue` or `TitleSketch.vue`.
- Copy-pasted spec verbatim into slides → page overflow.
- Named 10/11/12 months as `month2610` etc. — should be `month25a`/`b`/`c`.
- Added icons to slides (not allowed in this repo).
- Added real Tailwind (`@tailwindcss/vite`) → build breaks.
- Dynamic class names (`bg-${x}`) → UnoCSS static scan produces nothing.
- Writing slides without a spec.md first (always produce spec → distill).

## Local Preview

```bash
cd /home/tim/githubRepo/presentation
bun run dev <deck>        # dev server with live reload, opens browser
```

## Template Structure

```
.agents/skills/create-monthly/
├── SKILL.md
└── templates/
    ├── sketch/           # 現行：手寫風格月報模板
    │   ├── slides.md     # cover → 目錄 → 總結 → (section → scene → detail)×N → 結束
    │   ├── spec.md
    │   ├── style.css  global-bottom.vue
    │   ├── layouts/      # cover.vue / section.vue
    │   ├── utils/        # rough-scene.ts
    │   ├── setup/        # shiki.ts
    │   └── components/   # TitleSketch.vue / FlowScene.vue
    └── monthly/          # 舊：dark tech（theme: tech）模板，僅供舊 deck 參考
```
