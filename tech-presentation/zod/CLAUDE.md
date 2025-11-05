# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Slidev presentation** about Zod, a TypeScript-first schema validation library. Slidev is a presentation framework that converts Markdown into interactive slides.

## Development Commands

```bash
# Install dependencies
bun install

# Start dev server with auto-open browser
bun dev

# Build static site
bun build

# Export presentation (PDF, PPTX, etc.)
bun export
```

The dev server runs at `http://localhost:3030` by default.

## Project Structure

- **`slides.md`** - Main presentation content. This is the primary file containing all slide content, written in Markdown with Slidev-specific features (frontmatter, slide separators `---`, directives like `v-click`, grid layouts, etc.)
- **`components/`** - Vue components used in the presentation
  - `ZodDemo.vue` - Interactive demo component showing Zod validation vs no validation
  - `Counter.vue` - Example component (not actively used)
- **`pages/`** - Additional slide pages that can be imported
- **`snippets/`** - External code snippets
- **`biome.json`** - Biome linter/formatter configuration

## Code Architecture

### Slidev Slide Format

Slides are defined in `slides.md` using triple-dash (`---`) separators:

```md
---
# Frontmatter for slide configuration
layout: center
class: text-center
---

# Slide Title

Content here...

---

# Next Slide
```

### Frontmatter Configuration

The presentation uses:
- **Theme**: `seriph` (defined in frontmatter)
- **Highlighter**: `shiki` for syntax highlighting
- **Transition**: `slide-left`
- **MDC**: enabled (Markdown Components)

### Interactive Components

The `<ZodDemo />` component (slides.md:87) demonstrates runtime validation:
- Two-column layout with input form and validation section
- Compares validation with and without Zod
- Uses Zod's `safeParse()` method for non-throwing validation
- Shows formatted error messages from Zod's error issues

### Biome Configuration

Code formatting uses Biome with:
- 2-space indentation
- Double quotes for JavaScript
- Line width: 120 characters
- LF line endings
- `noForEach` rule disabled

## Working with Slides

When editing the presentation:

1. **Adding new slides**: Insert `---` separator and content in `slides.md`
2. **Using components**: Import Vue components in slides with `<ComponentName />`
3. **Code highlighting**: Use triple backticks with language identifier and optional line ranges:
   ````md
   ```ts {1-5|7-10}
   // Code here
   // Lines 1-5 highlighted first, then 7-10
   ```
   ````
4. **Layouts**: Specify layout in slide frontmatter (e.g., `layout: center`, `layout: end`)
5. **Grids**: Use `<div grid="~ cols-2 gap-4">` for multi-column layouts
6. **Click animations**: Wrap content in `<div v-click>` for sequential reveals

## Dependencies

Core dependencies:
- `@slidev/cli` - Slidev presentation framework
- `@slidev/theme-seriph` - Active theme
- `vue` - Framework for components
- `zod` - Subject of the presentation (v4.1.12)

## Deployment

Configured for deployment to:
- **Netlify** (`netlify.toml`)
- **Vercel** (`vercel.json`)

Both configurations specify build command `bun build` and output directory `dist`.
