# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Slidev** presentation project focused on debounce/throttle concepts. Slidev is a slides maker and presenter designed for developers that uses Markdown for content and Vue components for interactivity.

## Development Commands

### Start development server
```bash
npm run dev
```
Starts the Slidev dev server and opens the presentation at http://localhost:3030

### Build for production
```bash
npm run build
```
Builds the presentation to the `dist/` directory for deployment

### Export slides
```bash
npm run export
```
Exports slides to PDF, PPTX, or PNG formats

## Project Structure

### Core Files
- **`slides.md`** - Main presentation content file (currently empty - this is where slide content goes)
- **`components/Counter.vue`** - Example Vue component demonstrating UnoCSS utility usage
- **`pages/imported-slides.md`** - Example of how to split slides into multiple files
- **`snippets/external.ts`** - Example TypeScript snippets that can be embedded in slides using `<<< @/snippets/external.ts#snippet`

### Configuration
- **`package.json`** - Uses `@slidev/cli` with themes: `default` and `seriph`
- **`netlify.toml`** / **`vercel.json`** - Deployment configurations (Node 20 required)
- **`bun.lock`** - Project uses Bun as package manager

## Slidev Architecture

### Slide Definition
Slides are defined in `slides.md` with:
- YAML frontmatter at the top for global config (theme, title, transitions, etc.)
- Slides separated by `---` delimiters
- Per-slide frontmatter for individual slide settings (layout, transition, class, etc.)

### Code Snippets with Region Markers
External code files can use region markers for embedding specific portions:
```typescript
// #region snippet
export function example() { }
// #endregion snippet
```
Reference in slides: `<<< @/snippets/external.ts#snippet`

### Component Development
Vue components in `components/`:
- Use Vue 3 Composition API with `<script setup lang="ts">`
- UnoCSS utility classes are used as attributes (e.g., `flex="~"`, `border="~ main rounded-md"`)
- Components are automatically available in all slides without imports

### Slide Imports
Split presentations using the `src` attribute:
```markdown
---
src: ./pages/imported-slides.md
---
```

## Package Manager

This project uses **Bun** (evidenced by `bun.lock`). The README mentions `pnpm`, but npm scripts are also available.
