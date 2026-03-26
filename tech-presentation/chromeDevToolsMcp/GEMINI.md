# Chrome DevTools MCP Presentation

This is a developer-focused presentation project built with **Slidev**. It explores the integration of **Chrome DevTools MCP** with AI models (Claude) to automate and enhance the web debugging and performance optimization workflow.

## Project Overview
- **Topic**: Accelerating Frontend Debugging with Chrome DevTools MCP.
- **Main Technologies**: Slidev, Vue 3, TypeScript, Chrome DevTools Protocol (CDP), Model Context Protocol (MCP).
- **Core Concepts**: Automating performance tracing (LCP/INP/CLS), AI-driven root cause analysis, and cross-MCP collaboration (e.g., with Playwright).

## Architecture
1. **User**: Provides natural language instructions.
2. **Claude (CLI/Code)**: Interprets instructions and calls MCP tools.
3. **Chrome DevTools MCP Server**: Translates MCP calls to CDP commands.
4. **Local Chrome**: Executes commands and returns raw performance/DOM data.

## Key Components
- `slides.md`: The main content of the presentation.
- `components/`: Custom interactive Vue components for the slides.
  - `ToolsLibrary.vue`: Interactive explorer for the 27 MCP tools.
  - `MetricsVisualizer.vue`: Core Web Vitals simulator.
  - `ComparisonView.vue`: Traditional vs. AI-assisted workflow comparison.
- `chrome-devtools-mcp-spec.md`: Detailed specification and demo scenarios.

## Development Workflow
### Prerequisites
- [Bun](https://bun.sh) (preferred) or [pnpm](https://pnpm.io)

### Commands
- `bun install`: Install dependencies.
- `bun run dev`: Start the slide show in development mode (HMR enabled).
- `bun run build`: Build the slides for production (static hosting).
- `bun run export`: Export slides to PDF or PNG.

## Coding Conventions
- **Slides**: Use Markdown with Slidev's frontmatter and directives (e.g., `v-click`).
- **Components**: 
  - Use Vue 3 `<script setup lang="ts">`.
  - Prefer scoped CSS or Tailwind/UnoCSS for styling.
  - Keep components modular and optimized for presentation layouts (e.g., specific heights).
- **Assets**: Store static images or diagrams in the `public/` directory (if applicable) or `assets/`.
