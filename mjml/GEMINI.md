# GEMINI Project Context: Slidev Presentation

## Project Overview

This directory contains a presentation created using [Slidev](https://sli.dev/), a Markdown-based presentation tool powered by Vue.js. The main content of the slides is located in `slides.md`. The project is configured for deployment as a static website on both Netlify and Vercel.

- **Core Technology:** Slidev, Vue.js, Node.js
- **Main Content:** `slides.md` (Markdown)
- **Custom Components:** Vue components can be added to the `components/` directory (e.g., `Counter.vue`).
- **Deployment:** Configured for Netlify (`netlify.toml`) and Vercel (`vercel.json`).

## Building and Running

To get started with the project, follow these steps.

1.  **Install Dependencies:**
    ```bash
    bun install
    ```
    *(Note: The README mentions `pbun` and a `bun.lock` file exists, so `pbun install` or `bun install` are also valid options.)*

2.  **Run Development Server:**
    This command starts a local development server with hot-reloading.
    ```bash
    bun run dev
    ```
    You can then view the presentation at `http://localhost:3030`.

3.  **Build for Production:**
    This command builds the presentation into a static website in the `dist/` directory.
    ```bash
    bun run build
    ```

4.  **Export Slides:**
    This command can be used to export the slides into PDF or other formats.
    ```bash
    bun run export
    ```

## Development Conventions

- **Content:** Slides are created using Markdown syntax in the `slides.md` file. Each slide is separated by `---`.
- **Configuration:** Presentation-wide settings (like theme, title, and aspect ratio) are configured in the YAML frontmatter block at the top of `slides.md`.
- **Customization:** The presentation's look and feel can be changed by specifying a different theme. Interactive elements can be added by creating and using custom Vue components.
- **Styling:** The project appears to use standard Slidev styling, but it can be extended with custom stylesheets.
