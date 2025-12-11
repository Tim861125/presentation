# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Slidev presentation project about IntersectionObserver API. Slidev is a presentation framework powered by Vue.js and Markdown, allowing you to create interactive technical presentations with live demos.

## Development Commands

**Install dependencies:**
```bash
pnpm install
```

**Start dev server:**
```bash
pnpm dev
# Opens at http://localhost:3030
```

**Build for production:**
```bash
pnpm build
```

**Export presentation:**
```bash
pnpm export
```

## Project Structure

- `slides.md` - Main presentation file (currently empty/placeholder)
- `components/` - Custom Vue components for the presentation (e.g., Counter.vue)
- `pages/` - Additional slide pages that can be imported
- `snippets/` - Code snippets to be used in slides
- `ref.md` - Reference file with project requirements (Chinese)

## Key Technologies

- **Slidev**: Presentation framework using Markdown and Vue
- **Vue 3**: For interactive components and demos
- **Themes**: Using both @slidev/theme-default and @slidev/theme-seriph

## Presentation Requirements

Based on ref.md:
- Topic: IntersectionObserver API technical presentation
- Duration: 10-15 minutes
- Language: English only
- Style: Practical, not overly fancy
- Must include Vue demo page
- Content should fit within screen boundaries (no overflow)

## Working with Slidev

- Edit `slides.md` to modify presentation content
- Use `---` to separate slides
- Custom Vue components in `components/` are auto-imported
- Live reload during development shows changes immediately
- Supports frontmatter for slide configuration and layout selection
