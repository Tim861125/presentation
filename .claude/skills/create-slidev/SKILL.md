---
name: create-slidev
description: Use when creating a new Slidev deck in the presentation monorepo — either `create-slidev monthly [YYYY-MM] <spec-source>` for a monthly work report or `create-slidev <topic> <spec-source>` for a tech deep-dive / general presentation. Supports spec sources: a file path containing notes/tasks, a URL, or raw text. Covers scaffold from templates, spec.md → slides.md distillation, tech-look styling, verification, and common pitfalls.
---

# Create Slidev Deck

## Overview

Slides in the `presentation` monorepo are **Slidev decks**, one directory per deck. The core flow:

1. **Read & organize** source content → refined spec
2. Write refined content → `spec.md` (source of truth)
3. **Distill** spec into a concise `slides.md`
4. Verify no page overflow

Slides are the distilled highlights, not a verbatim copy of the spec.

Write slide content in **Traditional Chinese** (keep technical terms in their original language).

## Modes

```
create-slidev monthly [YYYY-MM] <spec-source>    # Monthly work report (month deck)
create-slidev <topic> <spec-source>              # Tech deep-dive / general presentation (topic deck)
```

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

- **spec/\*.md** — resolve to `<repo>/spec/<filename>` (e.g. `create-slidev dify-backend dify-backend.md` reads `spec/dify-backend.md`)
- **File path** — read directly, organize, format
- **URL** — fetch via `webfetch` (if SPA, fetch the GitHub raw version instead)
- **Raw text** — structure the text into organized content

**Organizing principles:**

- Group related items together
- Remove redundancy and noise
- Keep essential details, rephrase clearly
- Preserve source links / references
- Use consistent structure and formatting

## Step 1: Scaffold Deck from Template

**Never** run `npx slidev create` — it produces a standalone project that conflicts with the workspace. Use the built-in template instead.

Template location: `.claude/skills/create-slidev/templates/`

### Monthly: copy `templates/monthly/`

```bash
# Determine deck name first
# month261 = Jan 2026
# month25a = Oct 2025; 25b = Nov; 25c = Dec

TEMPLATE_BASE="/home/tim/githubRepo/presentation/.claude/skills/create-slidev/templates/monthly"
cp -r $TEMPLATE_BASE ./<new-deck>
rm -rf ./<new-deck>/node_modules ./<new-deck>/dist ./<new-deck>/components ./<new-deck>/pages ./<new-deck>/snippets
# Replace <deck-name> in package.json with <new-deck>
bun install
```

### Topic: copy `templates/topic/`

```bash
TEMPLATE_BASE="/home/tim/githubRepo/presentation/.claude/skills/create-slidev/templates/topic"
cp -r $TEMPLATE_BASE ./<topic>
rm -rf ./<topic>/node_modules ./<topic>/dist ./<topic>/components ./<topic>/pages ./<topic>/snippets
# Replace <deck-name> in package.json with <topic>
bun install
```

Replace the `<deck-name>` placeholder string in `package.json` with the actual deck directory name.

**Note:** All commands run from the repo root (`/home/tim/githubRepo/presentation`). Do NOT `cd` into the deck directory. `bun install` must run at the root.

## Step 2: Write spec.md

Organize content and write it into the deck's `spec.md`.

**Monthly deck spec** must include this header:

```markdown
# YYYY-MM 月工作內容

此專案為 slidev 的專案，將內容寫在 slides.md 裡面

# 注意

- 不要使用 icon, 只在必要時用打勾或叉叉讓版面清晰，不需要的話就不用
- 注意每一頁的高度不要超過螢幕高度
- 科技感（見 skill 的「科技感」）
- 完成後要確認畫面，確認沒有頁面下方被切掉
- 用繁體中文
- 首頁背景 background: https://cover.sli.dev

# 以下為本月工作內容

<貼上整理後的 task 清單 / 條列規格>
```

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

## Step 3: Distill slides.md from spec

Condense the bulk of spec.md into presentation slides.

### Monthly slides.md skeleton

```markdown
---
theme: seriph
colorSchema: dark
background: https://cover.sli.dev
highlighter: shiki
title: YYYY-MM
class: text-center lineNumbers: false
---

# <span class="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">YYYY-MM 工作報告</span>

丁吾心

---

# <主題／產品>

<副標，如 IPTECH / WEBPAT>

- 重點一
- 重點二

---

layout: center
class: text-center

---

# End
```

Replace `YYYY-MM` with the actual month.

### Topic slides.md skeleton

```markdown
---
theme: default
background: https://cover.sli.dev
class: text-center
highlighter: shiki
title: <topic>
---

# <topic>

<slide content...>

---

layout: center
class: text-center

---

# End
```

---

## Slide Writing Conventions

- **Group by product/topic** — Monthly decks group by `IPTECH`, `WEBPAT`, `TipoMusic`, `AI`; topic decks group by technical sub-topics.
- **Title + subtitle + bullets** — `# Title` with subtitle on the next line, then `-` bullets. Use backticks for API names / code.
- **One topic per slide, no overflow** — Split pages or use `layout: two-cols` when content is lengthy.
- **No icons** — Only use checkmarks / crosses to indicate done / pending.
- **Distill, don't copy** — The spec is the full list; slides keep only 3–8 bullets per slide.
- **Closing slide** — Always `layout: center` + `class: text-center` + `# End` or `# Thanks`.

---

## Tech Aesthetic

Styling uses **UnoCSS** (presetWind3, same syntax as Tailwind classes). Go **dark + cool tones + restrained**.

- **Dark background** — `colorSchema: dark`, `highlighter: shiki` in frontmatter.
- **Gradient title** — cyan→blue gradient text:
  ```
  class="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
  ```
- **Subtle subtitle** — product/classification subtitle: `class="text-sm opacity-60 font-mono"`.
- **Key emphasis** — keywords in `text-cyan-400`; divider line: `<div class="h-px w-16 bg-cyan-400/50 my-3" />`.
- **Background** — use `background: https://cover.sli.dev` on the title slide.
- **Restraint** — one accent color per slide max; keep body text at normal weight.

### UnoCSS Gotchas

- **Do NOT add real Tailwind** — `@tailwindcss/vite` intercepts Slidev's theme CSS and breaks the build.
- **No dynamic class names** — ``:class="`bg-${c.color}-400`"`` produces nothing (UnoCSS scans statically).

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

4. Fix overflows: split pages, reduce bullets, reduce text size, or switch `layout: two-cols`.
5. End with `take_screenshot` for visual confirmation on suspicious slides.

---

## Canvas-height Trap (Most Common Bug)

Slidev renders on a fixed **~980×551 unit canvas** (16:9), not the browser window. Even pixel counts that look fine can be cut off at the bottom — only ~551px is available after padding.

Defenses:

- Keep padding modest (`py-6`, `p-4`), tight `gap`
- Use `justify-start` instead of `justify-center` for tall content
- Move a bulky side note into a full-width footer bar to shorten column height
- If still overflowing, cut content (fold a line into the title row, drop subtitles) — don't just shrink text

---

## Common Mistakes

- **Page cut off at bottom** — skipped overflow check before claiming done.
- Forgot to update `package.json` `name` (stays same as template deck).
- Copy-pasted spec verbatim into slides → page overflow.
- Named 10/11/12 months as `month2610` etc. — should be `month25a`/`b`/`c`.
- Added icons to slides (not allowed in this repo).
- Overdone tech aesthetic: neon colors, multiple accents → hard to read.
- Added real Tailwind → build breaks.
- Dynamic class names (`bg-${x}`) → UnoCSS static scan produces nothing.
- Writing slides without a spec.md first (always produce spec → distill).

## Local Preview

```bash
cd /home/tim/githubRepo/presentation
bun run dev --root <deck>        # dev server with live reload, opens browser
```

## Template Structure

```
.claude/skills/create-slidev/
├── SKILL.md
├── templates/
│   ├── monthly/          # Monthly report template (seriph theme, dark, gradient title)
│   │   ├── slides.md
│   │   ├── spec.md
│   │   ├── package.json
│   │   ├── netlify.toml
│   │   └── vercel.json
│   └── topic/            # General topic template (default theme, clean)
│       ├── slides.md
│       ├── package.json
│       ├── netlify.toml
│       └── vercel.json
```
