# Project Overview

This is a [Slidev](https://sli.dev/) project for creating a presentation named "chromedevtool". Slidev allows for creating interactive, Markdown-based presentations using web technologies.

The main content of the presentation is located in `slides.md`. Custom Vue components, like the `Counter.vue` found in the `components` directory, can be embedded within the slides.

The project is configured for deployment on both Netlify and Vercel, with the build output being directed to the `dist` folder.

## Building and Running

### Prerequisites

Node.js and `bun` are required.

### Installation

To install the project dependencies, run:

```bash
bun install
```

### Development

To start the local development server with live reloading, run:

```bash
bun dev
```

This will open the presentation in your browser at `http://localhost:3030`.

### Building

To build the presentation for production (e.g., for deployment), run:

```bash
npm run build
```

The static site will be generated in the `dist` directory.

### Exporting

To export the presentation as a PDF or PNGs, run:

```bash
npm run export
```

## Development Conventions

*   **Slides:** Presentation slides are written in Markdown in the `slides.md` file. Slides are separated by `---`.
*   **Components:** Custom components are written as Vue 3 components and placed in the `components/` directory.
*   **Styling:** The project uses the default Slidev themes (`@slidev/theme-default` and `@slidev/theme-seriph`).
*   **Dependencies:** Node.js dependencies are managed with `bun` and defined in `package.json`.
