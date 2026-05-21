# CLAUDE.md

用繁體中文回答使用者問題

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository shape

A mono-repo of **independent Slidev decks**. There is no root `package.json`, no workspace tooling, and no root-level scripts. Every deck sits directly at the repo root as a self-contained Slidev project with its own `package.json`, `bun.lock`, `node_modules`, and deployment config.

Two kinds of decks, distinguished by directory name:

- **Technical deep-dives** — topic-named directories (e.g. `dify`, `shadcn-ui`, `chromeDevToolsMcp`, `zod`)
- **Monthly work reports** — `month<YYMM>` directories (e.g. `month264` for 2026-04)

A single root `.gitignore` covers build output, dependencies, and editor/OS noise for every deck — individual decks don't need their own.

**Always `cd` into a specific deck directory before running any command.** Running commands at the repo root will do nothing useful.

## Commands (run inside a deck directory)

Bun is the package manager (every deck ships a `bun.lock`); `npm`/`pnpm` work as fallbacks.

```bash
bun install        # first-time setup for a deck
bun run dev        # start dev server with live reload, opens browser
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

- Copy structure from a recent deck (`shadcn-ui` or `month264` are current).
- For tech topics, write a `spec.md` of source research before writing slides — this is the project's working pattern.
- Component-heavy structure is preferred when slides have significant custom layout or interactivity; markdown-heavy is fine for text/bullet decks.
