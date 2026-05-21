# CLAUDE.md

用繁體中文回答使用者問題

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository shape

A **bun workspace monorepo** of Slidev decks. The root `package.json` declares `workspaces: ["*"]` and owns the four shared deps (`@slidev/cli`, `@slidev/theme-default`, `@slidev/theme-seriph`, `vue`) at a single pinned version. Each deck has its own `package.json` for deck-specific deps and shares the root `node_modules` via bun hoisting. There is one lockfile at the root.

Two kinds of decks, distinguished by directory name:

- **Technical deep-dives** — topic-named directories (e.g. `dify`, `shadcn-ui`, `chromeDevToolsMcp`, `zod`)
- **Monthly work reports** — `month<YYMM>` directories (e.g. `month264` for 2026-04)

A single root `.gitignore` covers build output, dependencies, and editor/OS noise for every deck.

**First setup:** run `bun install` once at the repo root. After that, `cd` into a deck and use its scripts as usual.

## Commands

Bun is the package manager. Only the repo root has `bun.lock`.

```bash
# At repo root, once after cloning:
bun install

# Inside any deck directory:
cd <deck>
bun run dev        # dev server with live reload, opens browser
bun run build      # static build to dist/
bun run export     # export to PDF
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

**Styling:** UnoCSS (Tailwind-compatible utility classes used directly inline in `.vue` files and markdown). Dark `colorSchema` is the common default.

**Stack:** Slidev + Vue 3 + UnoCSS + Shiki (syntax highlighting).

## Deployment

Each deck deploys independently. `netlify.toml` and `vercel.json` in the deck directory both point at `dist/` produced by `bun run build`. There is no aggregate deployment.

## Conventions when adding a new deck

Do **not** run `npx slidev create` — it produces a standalone project that conflicts with the workspace. Instead:

1. `cp -r shadcn-ui <new-deck>` (or `month264` for a monthly report)
2. Edit `<new-deck>/package.json`: set `name` to `<new-deck>`, and remove any stray `bun.lock` inside the deck if the copy brought one
3. Run `bun install` at the repo root to wire the new deck into the workspace

Then:

- For tech topics, write a `spec.md` of source research before writing slides — this is the project's working pattern.
- Component-heavy structure is preferred when slides have significant custom layout or interactivity; markdown-heavy is fine for text/bullet decks.
