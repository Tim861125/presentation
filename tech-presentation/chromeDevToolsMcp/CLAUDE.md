# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun install     # Install dependencies
bun dev         # Start dev server at http://localhost:3030
bun build       # Build for production (output: dist/)
bun export      # Export slides to PDF
```

## Architecture

This is a [Slidev](https://sli.dev/) presentation project about Chrome DevTools MCP. The main content is in `slides.md`, which uses the `seriph` theme with Taiwanese Chinese content.

**Key files:**
- `slides.md` — All slide content. Slides are separated by `---` and support Slidev frontmatter (layout, transitions, etc.) and Vue components inline.
- `components/` — Custom Vue 3 components embedded in slides:
  - `ToolsLibrary.vue` — Displays the 27 Chrome DevTools MCP tools
  - `MetricsVisualizer.vue` — Interactive Core Web Vitals metrics demo
  - `DemoController.vue` — Live demo controller UI
  - `ComparisonView.vue` — Before/after comparison layout
- `netlify.toml` / `vercel.json` — Deployment config (publishes `dist/`, uses Node 20)

**Slidev conventions:**
- Components in `components/` are auto-imported and can be used directly in `slides.md` as `<ComponentName />`
- Slide animations use `v-click` directives
- Layouts are set per-slide via frontmatter (`layout: center`, `layout: section`, etc.)
