# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Slidev** presentation project - a markdown-based slides maker and presenter designed for developers. The project is named "oauth2" and uses Vue 3 for interactive components.

## Development Commands

- **Install dependencies**: `pnpm install`
- **Start dev server**: `pnpm dev` (opens at http://localhost:3030)
- **Build for production**: `pnpm build`
- **Export slides**: `pnpm export` (exports to PDF, PPTX, or PNG)

## Architecture & Structure

### Core Files

- **slides.md**: Main presentation content. All slides are defined here using markdown with YAML frontmatter for configuration. This is the primary file to edit when modifying slide content.
- **package.json**: Project uses `@slidev/cli` with `@slidev/theme-seriph` and `@slidev/theme-default` themes

### Directory Structure

- **components/**: Vue components that can be embedded in slides
  - Components are automatically available in slides (e.g., `<Counter />` from Counter.vue)
  - Use standard Vue 3 SFC (Single File Component) syntax with `<script setup>` and TypeScript

- **snippets/**: External code files that can be referenced in slides
  - Use `<<< @/snippets/filename.ts#region` syntax to embed code blocks in slides
  - Supports region markers (e.g., `#region snippet` / `#endregion snippet`)

- **pages/**: Additional slide pages that can be imported into main slides
  - Import using `src: ./pages/filename.md` in slide frontmatter

### Slidev Features in Use

- **Theme**: Currently using `seriph` theme (configurable in slides.md frontmatter)
- **Transitions**: slide-left, fade-out, slide-up (per-slide basis)
- **Interactive elements**: Vue components with reactivity, v-click animations, v-motion directives
- **Code highlighting**: Supports twoslash for TypeScript hover info and syntax highlighting
- **Diagrams**: Mermaid and PlantUML support for visual diagrams
- **LaTeX**: Math expressions via KaTeX
- **Monaco Editor**: Inline code editor with `{monaco}` or `{monaco-run}` flags

## Development Notes

### Working with Slides

- Each slide is separated by `---` in slides.md
- Slide-specific config goes in YAML frontmatter between `---` markers
- Use `layout:` to specify slide layouts (e.g., `image-right`, `two-cols`, `center`)
- Slide transitions: `transition: slide-left`, `fade-out`, `slide-up`
- Duration set in main frontmatter: `duration: 35min`

### Vue Components

- Place reusable Vue components in `components/` directory
- Use Vue 3 Composition API with `<script setup lang="ts">`
- Components have access to Slidev's special features (v-click, v-motion, etc.)
- UnoCSS utility classes are available for styling

### Code Snippets

- External TypeScript/JavaScript files in `snippets/` can be embedded in slides
- Mark regions with `// #region name` and `// #endregion name` comments
- Reference with `<<< @/snippets/file.ts#region` syntax in slides

### Styling

- UnoCSS for utility-first styling (inline classes)
- Can add `<style>` tags within slides for slide-specific CSS
- Use `class:` in frontmatter for slide-level classes

## Common Tasks

### Adding a New Slide

1. Edit slides.md
2. Add `---` separator
3. Add optional frontmatter (layout, transition, etc.)
4. Write slide content in markdown

### Creating a Custom Component

1. Create .vue file in `components/` directory
2. Use standard Vue 3 SFC syntax with TypeScript
3. Component is automatically available in slides by its filename

### Embedding External Code

1. Create file in `snippets/` directory
2. Mark code sections with `#region` and `#endregion`
3. Reference in slides: `<<< @/snippets/filename.ts#region`
