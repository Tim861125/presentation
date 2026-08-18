# AGENTS.md

用繁體中文回答使用者問題

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Repository shape

A **Slidev monorepo** managed at the root. The root `package.json` owns the shared deps (`@slidev/cli`, `@slidev/theme-default`, `@slidev/theme-seriph`, `vue`, `element-plus`, `zod`). Decks are lightweight directories containing `slides.md`, `spec.md`, and optional `components/`. There is a single root `bun.lock`.

Two kinds of decks, distinguished by directory name:

- **Technical deep-dives** — topic-named directories (e.g. `dify`, `shadcn-ui`, `chromeDevToolsMcp`, `zod`, `opensearch-hybrid-search`)
- **Monthly work reports** — `month<YYMM>` directories (e.g. `month264` for 2026-04)

A single root `.gitignore` covers build output, dependencies, and editor/OS noise for every deck.

**First setup:** run `bun install` once at the repo root.

## Commands

Bun is the package manager. Only the repo root has `bun.lock`.

```bash
# At repo root:
bun install

# List all available decks:
bun run dev

# Start a specific deck (opens browser):
bun run dev <deck>

# Build or export a specific deck:
bunx --bun slidev build <deck>/slides.md
bunx --bun slidev export <deck>/slides.md
```

## Deck architecture

**Entry point:** `slides.md`. Slides are separated by `---` delimiters. The frontmatter at the top sets `theme`, `colorSchema`, `highlighter`, `css: unocss`, etc.

Two patterns are used in this repo, and individual decks pick whichever fits:

1. **Markdown-heavy** (most `month*` decks, simple tech decks) — slide content lives directly in `slides.md` as markdown between `---` delimiters.
2. **Component-heavy** (e.g. `dify`, `shadcn-ui`) — `slides.md` is a thin shell; each slide is implemented as a Vue SFC in `components/` named `<Topic>Slide.vue` and referenced from `slides.md` as `<TopicSlide />`. Reusable primitives (e.g. `Callout.vue`, `InfoCard.vue`, `SectionSlide.vue`) live alongside the slide components.

Optional per-deck directories:
- `pages/` — additional markdown imported via Slidev's `src:` mechanism
- `snippets/` — external code files imported into slides via Slidev's `<<< @/snippets/...` syntax
- `spec.md` or `<topic>-notes.md` — background research and source material the deck was built from. **Read this first** when editing a deck's content; it's the source of truth, slides are the distillation.

## Shared Theme (slidev-theme-tech)

The repository provides a shared Dark Tech Theme at `packages/slidev-theme-tech` (linked as `slidev-theme-tech` in workspace).

- **Theme identifier:** `theme: tech` (or `theme: slidev-theme-tech`)
- **Auto-registered Components:** `<SlideShell>`, `<SlideHeader>`, `<CoverSlide>`, `<TechCover>`, `<EndSlide>`, `<TechEnd>`, `<JsonCard>`, `<TechCard>`, `<TechBadge>`, `<StatCard>`, `<InfoCard>`, `<Callout>`, `<DiagramNode>`, `<IssueCard>`, `<SectionSlide>` (no manual imports needed in slide Vue components).
- **Available Layouts:**
  - `layout: full` — Full-bleed zero-padding container for custom Vue SFC slide components
  - `layout: tech-cover` — Rich tech cover with tags, author, date, and keyword highlights
  - `layout: tech-end` — Standardized End/Thank You/Q&A slide
  - `layout: tech-content` — Content slide layout with auto header (`eyebrow`, `title`, `subtitle`)
  - `layout: tech-two-cols` — 2-column layout with left/right slots
  - `layout: tech-section` — Chapter/section break slide
  - `layout: default` — Default tech slide wrapped in `<SlideShell>`

**Styling:** UnoCSS (Tailwind-compatible utility classes used directly inline in `.vue` files and markdown). Dark `colorSchema` is the common default.

**Stack:** Slidev + Vue 3 + UnoCSS + Shiki (syntax highlighting).

## Conventions when adding a new deck

Do **not** run `npx slidev create` — it produces a standalone project that conflicts with the monorepo. Instead:

1. Create a new directory `<deck>` (or copy from an existing simple deck like `month264` or `shadcn-ui`)
2. Add `<deck>/slides.md` and optional `<deck>/spec.md`
3. Run `bun run dev <deck>` to start developing

Then:

- For tech topics, write a `spec.md` of source research before writing slides — this is the project's working pattern.
- Component-heavy structure is preferred when slides have significant custom layout or interactivity; markdown-heavy is fine for text/bullet decks.
