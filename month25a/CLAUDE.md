# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Slidev** presentation project. Slidev is a presentation framework built on Vue 3 and Vite that allows creating slides using Markdown with embedded Vue components. The presentation content is written in Traditional Chinese and covers development highlights for various IP/patent systems (IPTECH, WEBPAT, TIPOMUSIC).

## Key Commands

### Development
- `pnpm install` - Install dependencies
- `pnpm dev` - Start development server with auto-open (runs on http://localhost:3030)
- `pnpm build` - Build the presentation for production
- `pnpm export` - Export slides to PDF or other formats

## Project Structure

### Core Files
- `slides.md` - Main presentation content file with slide definitions
- `package.json` - Project dependencies and scripts

### Content Organization
- **slides.md** - Primary slide deck with YAML frontmatter for transitions and markdown content
- **pages/** - Additional slide pages that can be imported into the main deck using `src` attribute
- **components/** - Custom Vue components used in slides (e.g., Counter.vue)
- **snippets/** - External TypeScript/JavaScript code snippets that can be imported and displayed in slides

### Output Directories (gitignored)
- `dist/` - Production build output
- `.vite-inspect/` - Vite plugin inspection data
- `.remote-assets/` - Cached remote assets
- `components.d.ts` - Auto-generated component type definitions

## Slidev-Specific Conventions

### Slide Syntax
- Slides are separated by `---` dividers
- Each slide can have frontmatter (YAML) for configuration like transitions
- Example transitions used: `slide-up`, `slide-left`, `zoom-in`, `fade-right`, `fade-left`

### Components
- Custom Vue components in `components/` are auto-imported and available in slides
- Components use Vue 3 Composition API with `<script setup>`
- UnoCSS utility classes are used for styling (e.g., `flex="~"`, `border="~ main rounded-md"`)

### Importing External Content
- Use `src: ./path/to/file.md` in slide frontmatter to import other markdown files
- Code snippets can be imported from `snippets/` directory
- Snippets use `#region snippet` / `#endregion snippet` comments to define exportable sections

## Technology Stack

- **Framework**: Slidev (Vue 3 based presentation framework)
- **Package Manager**: pnpm (note: also has bun.lock, indicating bun compatibility)
- **Themes**: Uses both `@slidev/theme-default` and `@slidev/theme-seriph`
- **Styling**: UnoCSS (utility-first CSS, evident from component styling patterns)
- **Vue Version**: 3.5.22

## Development Workflow

When making changes to slides:
1. Edit `slides.md` for main content or create new files in `pages/` for modular slides
2. Add custom Vue components to `components/` if interactive elements are needed
3. Place reusable code snippets in `snippets/` with proper region markers
4. The dev server provides hot-reload - changes appear instantly in browser
5. Use built-in Slidev layouts and transitions defined in frontmatter

## Presentation Content Context

The slides cover product development updates for patent/IP management systems. When editing content, maintain the existing structure of feature descriptions, technical specifications, and system consistency improvements. The presentation uses clear sectioning with transition effects between major topics.
