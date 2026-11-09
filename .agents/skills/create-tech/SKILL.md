---
name: create-tech
description: Use when creating a tech deep-dive or general presentation Slidev deck in the presentation monorepo — `create-tech <topic> <spec-source>`. Supports spec sources: a file path containing notes/tasks, a URL, or raw text. Covers scaffold from the hand-drawn (rough.js) sketch template, spec.md → slides.md distillation, verification, and common pitfalls.
---

# Create Tech Deep-Dive Slidev Deck

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
create-tech <topic> <spec-source>    # Tech deep-dive / general presentation (topic deck)
```

Example: `create-tech dify-backend spec/dify-backend.md`

**`<spec-source>`** accepts:

- **File path** — a `.md` file containing notes/tasks
- **`spec/*.md`** — resolves to `<repo>/spec/<filename>`
- **URL** — fetch via `webfetch`; doc sites are often SPAs that return only the nav, so fetch the GitHub raw markdown (`raw.githubusercontent.com/<org>/<repo>/main/<path>.md`) instead
- **Raw text** — provided directly in the conversation; the skill will auto-generate the spec

---

## Step 0: Read Source & Organize Spec Content

**Before writing spec.md, always read the source content and distill it.**

1. **Fetch/resolve source**
2. **Read the content fully** — understand all material before distilling
3. **Organize & refine** — group related items, remove noise, keep essential details, preserve source links; quote JSON / config **verbatim**
4. **Write organized content** into the deck's `spec.md`

---

## Step 1: Scaffold Deck from Template

**Never** run `npx slidev create` — it produces a standalone project that conflicts with the workspace. Use the built-in template instead.

Template location: `.agents/skills/create-tech/templates/sketch/`

```bash
TEMPLATE_BASE="/home/tim/githubRepo/presentation/.agents/skills/create-tech/templates/sketch"
cp -r $TEMPLATE_BASE ./<topic>
bun install
```

Decks need **no `package.json`** — `scripts/dev.js` discovers a deck by the presence of `slides.md`, and all deps (including `roughjs`) live at the repo root.

**Keep every template file** — the hand-drawn look depends on all of them; Slidev picks them up from the deck root by convention:

| File | Role |
| --- | --- |
| `style.css` | 白底、藍 `#4f61ab` + 琥珀 `#f5a700` 調色盤（`--sk-*`）、h1 琥珀底線、`.callout` / `.big-quote` / `.scene-caption` / `.code-sm` |
| `layouts/cover.vue`, `layouts/section.vue` | navy 點陣漸層的封面（預設 slot + `::brand::` + `::art::`）與章節頁（`.eyebrow` + `# 標題`） |
| `global-bottom.vue` | 每頁頁尾：`TOPIC · RD 技術分享` + 頁碼（封面不顯示） |
| `utils/rough-scene.ts` | rough.js 手繪引擎：`Scene`（`layer` / `box` / `arrow` / `curve` / `pill` / `text`…）+ `useRoughScene`，跟著 `$clicks` 一筆筆「畫出來」 |
| `setup/shiki.ts` | `github-light` 程式碼配色 |
| `components/TitleSketch.vue` | 封面右側手繪：核心元件節點＋資料流箭頭（改 `nodes` / `edges` / `tagline`） |
| `components/FlowScene.vue` | 通用手繪流程圖：props `steps` / `notes` / `result`，每 click 畫一格 |

Replace the `TOPIC` placeholder in `slides.md`, `spec.md`, `global-bottom.vue`, and `components/` with the real topic name. Keep placeholders out of angle brackets: a `<topic>` in the `title:` frontmatter is parsed as an HTML tag and fails the build.

**Note:** All commands run from the repo root (`/home/tim/githubRepo/presentation`). Do NOT `cd` into the deck directory. `bun install` must run at the root.

---

## Step 2: Write spec.md

The template's `spec.md` carries the format: 注意事項 → 來源文件 / 參考連結 → 摘要 → 大綱 (Slide Plan). Fill every section; the slide plan names the scene for each part.

---

## Step 3: Distill slides.md from spec — hand-drawn style

**Style baseline — read first:** the hand-drawn style comes from `/home/tim/githubRepo/context-propagation-slides` (`slides.md`, `components/*Scene.vue`). Open it before writing — it is a tech deep-dive in exactly this style, so its page rhythm is the model. The template's `slides.md` is the page skeleton to fill.

Pick **one running example** and carry it through every scene and code page.

Page rhythm:

1. **Cover** (`layout: cover`, lives in the headmatter) — `# 主題` + 一句價值 + `丁吾心 · RD 技術分享`, `::brand::` → `RD Tech Talk`, `::art::` → `<TitleSketch />`
2. **Problem scene** — `# 問題` + a rough.js scene showing the pain (before/after, broken flow) with `clicks:` + `[click]` presenter notes
3. **Definition** (`layout: center`) — `.big-quote` one-sentence definition with `<em>` highlights + two `.callout` cards
4. **Per part, repeat:**
   - `layout: section` — `<div class="eyebrow">Part N</div>` + `# 標題` + 一句副標
   - **Scene page** — the concept as a rough.js scene (`<FlowScene … />` or a new `components/<Concept>Scene.vue`) + `.scene-caption`
   - **Code / table page** — `.code-sm` two-column code, or a markdown table (header gets the amber underline), plus a `.callout` gotcha with `v-click`
5. **Takeaways** (`layout: section`) — eyebrow `Takeaways` + `# 一句話總結` + numbered list (3–4 items)
6. **參考資料** — markdown link list from spec.md 的「來源文件 / 參考連結」

### Writing a new scene

Copy `FlowScene.vue` (or a scene from the reference deck: `IslandsScene` problem framing, `InjectExtractScene` two-party exchange, `WaterfallScene` timeline, `BrokenChainScene` failure mode, `SpanContextCard` field-by-field anatomy) to `components/<Concept>Scene.vue` and draw in `useRoughScene(svg, s => { … })`:

- `s.layer(n)` = group shown from click `n` on (`{ to }` hides it later, `{ delay, duration }` paces the sketch-in). Layer 0 is visible on enter, so **frontmatter `clicks:` = highest layer index**.
- `s.mover([[step, x, y], …])` slides a group between positions per click — use it for a token / request travelling along the flow.
- Colors come from `C` (`blue`, `blueLight`, `blueTint`, `navy`, `orange`, `orangeDark`, `grey`, `red`, `green`): components `fill: C.blueTint, fillStyle: 'solid', stroke: C.blue`. **Never fill boxes with `fillStyle: 'hachure'`** (diagonal-line fill) — the user dislikes it; the hand-drawn feel comes from the rough strokes, not the fill; the thing being traced / the answer in `C.orange`; failures in `C.red`; ids and code in `font: MONO`.
- Use a fixed `viewBox` (width 900, height ≤ 330) with `class="w-full"` so the scene fits the canvas under the h1.
- Static decorative scenes (cover) pass `() => 0` as the step function.

### Slidev v52 parser traps (verified against @slidev/parser)

1. **Slide 1 lives INSIDE the deck headmatter block** — cover content goes directly after the headmatter-closing `---`. Adding a bare `---` + frontmatter block for slide 1 renders an extra empty first page.
2. **Each slide = `---` + frontmatter + `---` + content + one `---` separator.** Never two consecutive `---` lines (creates an empty slide).
3. **Named slots in markdown use `::brand::` / `::art::`** (v52 slot sugar). The old MDC `<div slots="art" />` does NOT work.
4. **Blank lines around markdown inside HTML** — inside `<div class="callout">` / `<div v-click>`, leave a blank line after the opening tag and before the closing tag, or the markdown renders as raw text.

---

## Slide Writing Conventions

- **Hand-drawn first** — every part explains its concept with a rough.js scene; code and tables back the scene up.
- **One idea per page, no overflow** — canvas is ~551px tall: ≤5 bullets or one table per page, scene height ≤ 330 viewBox units; split into another page instead of shrinking text.
- **Reveal with clicks** — scenes step via `clicks:` + layers; text blocks via `v-click` / `<v-clicks>`; code via line highlights (`` ```ts {all|4|12|all} ``).
- **No icons** — only checkmarks / crosses to indicate done / pending.
- **Distill, don't copy** — the spec is the full research; slides keep only key highlights.
- **Stay in the palette** — use `--sk-*` / `C.*` colors and the existing classes; skip `theme: tech` components (`SlideShell`, `TechCard`, `ReferenceCard`…), which belong to the old dark tech style.

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
- **Build fails with `Element is missing end tag`** — an angle-bracket placeholder (`<topic>`) left in frontmatter `title:`.
- Deleted `style.css` / `layouts/` / `global-bottom.vue` / `utils/` from the new deck → plain default-theme look.
- Copy-pasted spec verbatim into slides → page overflow.
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
.agents/skills/create-tech/
├── SKILL.md
└── templates/
    ├── sketch/           # 現行：手寫風格技術分享模板
    │   ├── slides.md     # cover → 問題 scene → 定義 → (section → scene → code)×N → takeaways → 參考資料
    │   ├── spec.md
    │   ├── style.css  global-bottom.vue
    │   ├── layouts/      # cover.vue / section.vue
    │   ├── utils/        # rough-scene.ts
    │   ├── setup/        # shiki.ts
    │   └── components/   # TitleSketch.vue / FlowScene.vue
    └── topic/            # 舊：dark tech（theme: tech）模板，僅供舊 deck 參考
```
