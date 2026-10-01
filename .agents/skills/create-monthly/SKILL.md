---
name: create-monthly
description: Use when creating a new monthly work report Slidev deck in the presentation monorepo — `create-monthly [YYYY-MM] <spec-source>`. Supports spec sources: a file path containing notes/tasks, a URL, or raw text. Covers scaffold from monthly template, spec.md → slides.md distillation, slidev-theme-tech dark tech styling, verification, and common pitfalls.
---

# Create Monthly Work Report Slidev Deck

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

Workflow:

1. **Fetch/resolve source** — `spec/*.md`, file path, URL, or raw text
2. **Read the content fully** — understand all material before distilling
3. **Organize & refine** — structure, rephrase, remove noise, keep key points
4. **Write organized content** into the deck's `spec.md`

```
Source ──→ Fetch/organize → Edit/Refine ──→ spec.md (stored in deck directory)
```

- **spec/\*.md** — resolve to `<repo>/spec/<filename>` (e.g. `create-monthly dify-backend dify-backend.md` reads `spec/dify-backend.md`)
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

Template location: `.agents/skills/create-monthly/templates/monthly/`

### Determine deck name

```
month261 = Jan 2026 ... month269 = Sep 2026
month25a = Oct 2025; 25b = Nov; 25c = Dec
```

```bash
TEMPLATE_BASE="/home/tim/githubRepo/presentation/.agents/skills/create-monthly/templates/monthly"
cp -r $TEMPLATE_BASE ./<new-deck>
rm -rf ./<new-deck>/node_modules ./<new-deck>/dist ./<new-deck>/pages ./<new-deck>/snippets
bun install
```

Decks need **no `package.json`** — `scripts/dev.js` discovers a deck by the presence of `slides.md`, and all deps live at the repo root.

**Keep `components/`** — the template ships starting-point slide components (`Slide1Cover`, `AgendaSlide`, `Slide2Overview`, `TopicSlide`, `SlideEnd`). Rename/duplicate `TopicSlide.vue` per topic (`Slide3Xxx.vue` ...) and fill in real content; replace `YYYY-MM` placeholders everywhere.

Replace the `YYYY-MM` placeholder in `slides.md` and `components/` with the actual month (e.g. `2026-10`).

**Note:** All commands run from the repo root (`/home/tim/githubRepo/presentation`). Do NOT `cd` into the deck directory. `bun install` must run at the root.

---

## Step 2: Write spec.md

Organize content and write it into the deck's `spec.md`.

**Monthly deck spec** must include this header:

```markdown
# YYYY-MM 月工作內容

此專案為 slidev 的專案，將內容寫在 slides.md 裡面

# 注意

- 不要使用 icon, 只在必要時用打勾或叉叉讓版面清晰，不需要的話就不用
- 注意每一頁的高度不要超過螢幕高度
- 科技感（使用 slidev-theme-tech 或深色漸層）
- 完成後要確認畫面，確認沒有頁面下方被切掉
- 用繁體中文

# 以下為本月工作內容

<貼上整理後的 task 清單 / 條列規格>
```

---

## Step 3: Distill slides.md from spec

**Style baseline — read first:** open the most recent month deck (e.g. `month268/components/`) before writing. Every monthly deck in this repo is **component-heavy**: `layout: full` + Vue SFCs built from `SlideShell` / `SlideHeader` / `TechCard` / `TechBadge`. Do NOT present monthly content as markdown bullet pages. Fixed page order: `Slide1Cover` → `AgendaSlide` (目錄頁，必加) → `Slide2Overview` (TechCard 主線卡) → 主題頁×N（雙欄 TechCard，可選 footer bar）→ `SlideEnd`.

### Monthly slides.md skeleton (with `theme: tech`)

> **Slidev v52 parser traps (verified against @slidev/parser):**
>
> 1. **Slide 1 lives INSIDE the deck headmatter block** — the first frontmatter block doubles as headmatter + slide 1, so the first component (`<Slide1Cover />`) goes directly after the headmatter-closing `---`. Adding a bare `---` + frontmatter block for slide 1 renders an extra empty first page.
> 2. **Each content slide = `---` + frontmatter + `---` + content + one `---` separator.** Never two consecutive `---` lines (creates an empty slide). Don't put slide body text in YAML `left: |` / `right: |` blocks — a blank line before the closing `---` makes the next slide's frontmatter leak into content.
> 3. **Slot splitting in markdown uses `::right::`** (v52 slot sugar, for `tech-two-cols`). The old MDC `<div slots="right" />` does NOT work.

```markdown
---
theme: tech
colorSchema: dark
highlighter: shiki
css: unocss
title: YYYY-MM 工作報告
info: |
  YYYY-MM 工作報告
  丁吾心
transition: fade
mdc: true
layout: full
---

<Slide1Cover />

---
layout: full
---

<AgendaSlide />

---
layout: full
---

<Slide2Overview />

---
layout: full
---

<TopicSlide />

<!-- 每個主題複製 TopicSlide.vue 改名（如 Slide3Xxx.vue），在此追加 --- layout: full --- 區塊 -->

---
layout: full
---

<SlideEnd />
```

Replace `YYYY-MM` with the actual month.

---

## Slide Writing Conventions

- **Agenda page is mandatory** — right after the cover: two-column numbered list (`01`…`NN` mono index + semibold title + one-line mono summary); the closing item may span both columns (`md:col-span-2`).
- **Topic pages are TechCard components, not markdown bullets** — each slide: `SlideHeader` (eyebrow `產品線 · 英文代號`, title, subtitle) + two `TechCard`s (`h3` + ≤4 `text-sm` bullets each) + optional full-width footer bar (`border-white/10 bg-white/5`,次要工作以「·」分隔).
- **Group by product/topic** — Monthly decks group by `IPTECH`, `WEBPAT`, `TipoMusic`, `AI`.
- **One topic per slide, no overflow** — canvas is ~551px tall: keep each card ≤4 bullets; move extras into the footer bar or a second slide instead of shrinking text.
- **No icons** — Only use checkmarks / crosses to indicate done / pending.
- **Distill, don't copy** — The spec is the full list; slides keep only key highlights.
- **Closing slide** — Always `<SlideEnd />` (THANK YOU pill + `工作報告結束` + `YYYY-MM · 丁吾心`).

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
    └── monthly/          # Monthly report template (theme: tech, dark tech cover & layouts)
        ├── slides.md     # component-heavy shell: Slide1Cover → Agenda → Overview → TopicSlide×N → End
        ├── spec.md
        └── components/   # Slide1Cover / AgendaSlide / Slide2Overview / TopicSlide / SlideEnd 起手元件
```