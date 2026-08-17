---
name: create-tech
description: Use when creating a tech deep-dive or general presentation Slidev deck in the presentation monorepo — `create-tech <topic> <spec-source>`. Supports spec sources: a file path containing notes/tasks, a URL, or raw text. Covers scaffold from topic template, spec.md → slides.md distillation, slidev-theme-tech dark tech styling, verification, and common pitfalls.
---

# Create Tech Deep-Dive Slidev Deck

## Overview

Slides in the `presentation` monorepo are **Slidev decks**, one directory per deck. The core flow:

1. **Read & organize** source content → refined spec
2. Write refined content → `spec.md` (source of truth)
3. **Distill** spec into a concise `slides.md`
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
- **URL** — Google Doc / Azure DevOps / any online content (fetch via `webfetch` / GitHub raw)
- **Raw text** — provided directly in the conversation; the skill will auto-generate the spec

---

## Step 0: Read Source & Organize Spec Content

**Before writing spec.md, always read the source content and distill it.**

Workflow:

1. **Fetch/resolve source** — `spec/*.md`, file path, URL, or raw text
2. **Read the content fully** — understand all material before distilling
3. **Organize & refine** — structure, rephrase, remove noise, keep key points
4. **Write organized content** into the deck's `spec.md`

```
Source ──→ Fetch/organize → Edit/Refine ──→ spec.md (stored in deck directory)
```

- **spec/\*.md** — resolve to `<repo>/spec/<filename>` (e.g. `create-tech dify-backend dify-backend.md` reads `spec/dify-backend.md`)
- **File path** — read directly, organize, format
- **URL** — fetch via `webfetch` (if SPA, fetch the GitHub raw version instead)
- **Raw text** — structure the text into organized content

**Organizing principles:**

- Group related items together
- Remove redundancy and noise
- Keep essential details, rephrase clearly
- Preserve source links / references
- Use consistent structure and formatting

---

## Step 1: Scaffold Deck from Template

**Never** run `npx slidev create` — it produces a standalone project that conflicts with the workspace. Use the built-in template instead.

Template location: `.Codex/skills/create-tech/templates/topic/`

```bash
TEMPLATE_BASE="/home/tim/githubRepo/presentation/.Codex/skills/create-tech/templates/topic"
cp -r $TEMPLATE_BASE ./<topic>
rm -rf ./<topic>/node_modules ./<topic>/dist ./<topic>/components ./<topic>/pages ./<topic>/snippets
# Replace <deck-name> in package.json with <topic>
bun install
```

Replace the `<deck-name>` placeholder string in `package.json` with the actual deck directory name.

**Note:** All commands run from the repo root (`/home/tim/githubRepo/presentation`). Do NOT `cd` into the deck directory. `bun install` must run at the root.

---

## Step 2: Write spec.md

Organize content and write it into the deck's `spec.md`.

**Topic deck spec** format:

```markdown
# <topic> 技術深剖

## 來源文件 / 參考連結

- <link 1>
- <link 2>

## 摘要

<簡短技術摘要>

## 大綱 (Slide Plan)

1. ...
2. ...
```

---

## Step 3: Distill slides.md from spec

### Shared Theme: `slidev-theme-tech` (`theme: tech`)

The repository provides a shared Dark Tech Theme at `packages/slidev-theme-tech` (registered as `slidev-theme-tech` in workspace).

- **Theme identifier:** `theme: tech` (or `theme: slidev-theme-tech`)
- **Auto-registered Components (no manual imports needed):**
  - `<SlideShell center? px? py?>` — Universal dark container with 40px grid and corner glows
  - `<SlideHeader eyebrow? title subtitle? dotColor?>` — Header with status dot, mono eyebrow, bold title, and subtitle
  - `<JsonCard method? path? title? code>` — Code/JSON payload card
  - `<TechCard variant? title? tag?>` — Glassmorphism dark card (variants: default, emerald, blue, rose, amber)
  - `<TechBadge label color? dot? pulse?>` — Tech pill badge
- **Available Layouts:**
  - `layout: full` — Full-bleed zero-padding container for custom Vue SFC slide components
  - `layout: tech-cover` — Rich tech cover with tags, author, date, and keyword highlights
  - `layout: tech-content` — Content slide layout with auto header (`eyebrow`, `title`, `subtitle`)
  - `layout: tech-two-cols` — 2-column layout with left/right slots
  - `layout: tech-section` — Chapter/section break slide
  - `layout: default` — Default tech slide wrapped in `<SlideShell>`

---

### Topic slides.md skeleton (Markdown-heavy)

```markdown
---
theme: tech
colorSchema: dark
highlighter: shiki
title: <topic>
---

---
layout: tech-cover
title: <topic>
highlight: 核心架構
subtitle: 深度技術分享
tag: RD 技術分享 · 2026
author: 丁吾心
date: 2026
tags: [架構設計, 效能優化, 實戰落地]
---

---
layout: tech-content
eyebrow: Background
title: 背景與核心目標
subtitle: 為什麼需要重新設計或引入？
---

- 現有架構瓶頸與限制
- 業務需求與核心改進目標

---
layout: tech-two-cols
eyebrow: Architecture
title: 架構方案比較
---

### 方案 A
- 實作簡便但擴展性受限
- 資源佔用偏高

::right::

### 方案 B (推薦)
- 模組化且支援水平擴展
- 查詢吞吐量提升

---
layout: tech-section
section: "02"
title: 核心實作細節
subtitle: 關鍵流程與設定調校
---

---
layout: tech-content
eyebrow: Summary
title: 總結與後續規劃
subtitle: 關鍵收穫與落地指引
---

- 重點總結一
- 重點總結二

---
layout: center
class: text-center
---

# End
```

---

### Component-heavy Deck Structure (e.g. `opensearch-hybrid-search`)

`slides.md` is a thin shell; each slide is implemented as a Vue SFC in `components/` named `<Topic>Slide.vue` and referenced with `layout: full`:

```markdown
---
theme: tech
colorSchema: dark
highlighter: shiki
title: <topic>
layout: full
---

<TitleSlide />

---
layout: full
---

<ConceptSlide />

---
layout: full
---

<SummarySlide />
```

---

## Slide Writing Conventions

- **Group by product/topic** — Topic decks group by technical sub-topics.
- **Title + subtitle + bullets** — Keep 3–8 bullets per slide.
- **One topic per slide, no overflow** — Split pages or use `layout: tech-two-cols` when content is lengthy.
- **No icons** — Only use checkmarks / crosses to indicate done / pending.
- **Distill, don't copy** — The spec is the full list; slides keep only key highlights.
- **Closing slide** — Always `layout: center` + `class: text-center` + `# End` or `# Thanks`.

---

## Visual Verification (Check for Page Overflow) — Mandatory

Slidev renders each slide on a **fixed-size canvas** (~980×551px, 16:9). Content that exceeds it is hidden by `overflow: hidden`.

### Method 1: Chrome DevTools MCP

1. Start dev server (run from repo root): `bun run dev --root <deck>` (default `http://localhost:3030`, auto-rotates if in use).
2. Open `/export/` route — stacks all slides into a scrollable view:
   `navigate_page` → `http://localhost:<port>/export/`
3. Run overflow check:

    ```js
    () =>
      Array.from(document.querySelectorAll(".slidev-page"))
        .map((el, i) => ({
          slide: i + 1,
          overflowPx: el.scrollHeight - el.clientHeight,
        }))
        .filter((s) => s.overflowPx > 2);
    ```

    Empty array = OK. Any value = that many pixels of overflow on that slide.

4. Fix overflows: split pages, reduce bullets, reduce text size, or switch `layout: tech-two-cols`.
5. End with `take_screenshot` for visual confirmation on suspicious slides.

---

## Canvas-height Trap (Most Common Bug)

Slidev renders on a fixed **~980×551 unit canvas** (16:9), not the browser window. Only ~551px is available after padding.

Defenses:

- Keep padding modest (`py-5`, `p-4`), tight `gap`
- Use `justify-start` instead of `justify-center` for tall content
- Move a bulky side note into a full-width footer bar to shorten column height
- If still overflowing, cut content — don't just shrink text

---

## Common Mistakes

- **Page cut off at bottom** — skipped overflow check before claiming done.
- Forgot to update `package.json` `name` (stays same as template deck).
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
.Codex/skills/create-tech/
├── SKILL.md
└── templates/
    └── topic/            # General topic template (theme: tech, dark tech cover & layouts)
        ├── slides.md
        ├── package.json
        ├── netlify.toml
        └── vercel.json
```