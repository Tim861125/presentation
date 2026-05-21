# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun run dev      # start dev server with live reload (opens browser)
bun run build    # build static site output
bun run export   # export slides to PDF
```

## Architecture

This is a [Slidev](https://sli.dev/) presentation about Dify (an open-source Agentic Workflow platform), using Vue 3 + UnoCSS.

**Entry point:** `slides.md` — defines the slide deck. Each `---` delimiter is a new slide. Slides reference Vue components via `<ComponentName />` tags.

**Components:** `components/` — each `.vue` file is one slide's full content. The naming convention is `<Topic>Slide.vue`. Shared UI primitives (non-slide) include `Callout.vue`, `InfoCard.vue`, `IssueCard.vue`, and `SectionSlide.vue` (reusable section divider).

**Content source:** `dify-notes.md` contains the raw research notes (official docs + GitHub Issues/Discussions) that the slides are based on.

**Theme:** `default` Slidev theme with `dark` colorSchema and `unocss` for styling. All slide components use Tailwind-compatible utility classes directly.

**Deployment:** Configured for both Netlify (`netlify.toml`) and Vercel (`vercel.json`) via `slidev build` output.
