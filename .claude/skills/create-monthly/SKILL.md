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

Template location: `.claude/skills/create-monthly/templates/monthly/`

### Determine deck name

```
month261 = Jan 2026 ... month269 = Sep 2026
month25a = Oct 2025; 25b = Nov; 25c = Dec
```

```bash
TEMPLATE_BASE="/home/tim/githubRepo/presentation/.claude/skills/create-monthly/templates/monthly"
cp -r $TEMPLATE_BASE ./<new-deck>
rm -rf ./<new-deck>/node_modules ./<new-deck>/dist ./<new-deck>/components ./<new-deck>/pages ./<new-deck>/snippets
# Replace <deck-name> in package.json with <new-deck>
bun install
```

Replace the `<deck-name>` placeholder string in `package.json` with the actual deck directory name.

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

### Monthly slides.md skeleton (with `theme: tech`)

```markdown
---
theme: tech
colorSchema: dark
highlighter: shiki
title: YYYY-MM
---

---
layout: tech-cover
title: YYYY-MM 工作報告
highlight: 月度總結
subtitle: 產品研發與系統維護進度
author: 丁吾心
date: YYYY-MM
tags: [IPTECH, WEBPAT, AI]
---

---
layout: tech-content
eyebrow: Summary
title: 本月概覽
subtitle: 核心產出與重大更新
---

- **Patent Embedding Search** — 研究到正式站台上線
- **快檢通** — WEBPAT 上線與點數機制
- **TipoMusic** — 比對欄位擴充

---
layout: tech-content
eyebrow: WEBPAT / IPTECH
title: 核心系統維護
subtitle: 功能更新與優化
---

- 重點工作一
- 重點工作二

---
layout: center
class: text-center
---

# End
```

Replace `YYYY-MM` with the actual month.

---

## Slide Writing Conventions

- **Group by product/topic** — Monthly decks group by `IPTECH`, `WEBPAT`, `TipoMusic`, `AI`.
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
.claude/skills/create-monthly/
├── SKILL.md
└── templates/
    └── monthly/          # Monthly report template (theme: tech, dark tech cover & layouts)
        ├── slides.md
        ├── spec.md
        ├── package.json
        ├── netlify.toml
        └── vercel.json
```