# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Slidev** presentation project. Slidev is a slides maker and presenter designed for developers that uses Markdown for content and Vue components for interactivity.

## Development Commands

### Start development server
```bash
npm run dev
# or
pnpm dev
```
This starts the Slidev dev server and opens the presentation at http://localhost:3030

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
- **`slides.md`** - Main presentation content file containing all slide definitions in Markdown with YAML frontmatter
- **`components/`** - Vue components that can be used within slides (e.g., `Counter.vue`)
- **`pages/`** - Additional slide files that can be imported into `slides.md` using `src:` attribute
- **`snippets/`** - External code snippets that can be embedded in slides using `<<< @/snippets/filename.ts`

### Configuration
- **`package.json`** - Uses `@slidev/cli` with themes: `default` and `seriph`
- **`netlify.toml`** / **`vercel.json`** - Deployment configurations for hosting platforms
- Node version required: 20 (specified in `netlify.toml`)

## Slidev Architecture

### Slide Definition
Slides are defined in `slides.md` with:
- YAML frontmatter at the top for global config (theme, title, transitions, etc.)
- Slides separated by `---` delimiters
- Per-slide frontmatter for individual slide settings (layout, transition, class, etc.)

### Key Features Used
- **Vue Components**: Place `.vue` files in `components/` and use them directly in Markdown
- **Code Snippets**: External snippets in `snippets/` can be referenced with region markers (`#region snippet`)
- **Slide Imports**: Split presentations across files using `src: ./pages/filename.md`
- **Layouts**: Various built-in layouts (e.g., `image-right`, `two-cols`, `center`)
- **Animations**: `v-click`, `v-motion`, `v-mark` directives for interactive elements
- **Monaco Editor**: Code blocks with `{monaco}` or `{monaco-run}` for live editing/execution
- **Diagrams**: Mermaid and PlantUML support for inline diagrams

### Component Development
Custom Vue components in `components/`:
- Use Vue 3 Composition API with `<script setup lang="ts">`
- Support TypeScript
- Can use UnoCSS utility classes inline (e.g., `flex="~"`, `border="~ main"`)
- Are automatically available in all slides without imports

## Package Manager

The project uses **npm** based on the scripts in `package.json`, though `pnpm` is mentioned in the README. Either can be used, but `bun.lock` is present, suggesting Bun may also be used. Stick with the package manager already in use or ask which to use.
