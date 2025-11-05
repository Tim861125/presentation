# Slidev Presentation

This is a presentation created with [Slidev](https://sli.dev/).

This project is set up to use [Bun](https://bun.sh/) for package management.

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/)

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  Install dependencies:
    ```bash
    bun install
    ```

## Development

To start the development server with hot-reloading, run:

```bash
bun run dev
```

Open your browser and visit <http://localhost:3030>.

Edit the `slides.md` file to see your changes live.

## Building for Production

To build the presentation into a static website, run:

```bash
bun run build
```

The output will be in the `dist/` directory.

## Exporting

To export your slides to PDF or other formats, use the following command:

```bash
bun run export
```

## Customization

-   **Content**: Edit `slides.md` to add or modify slides using Markdown.
-   **Styling**: Customize the look and feel by editing the YAML frontmatter in `slides.md` or by adding custom stylesheets.
-   **Components**: Add custom Vue components to the `components/` directory and use them in your slides.

## Deployment

This project is pre-configured for deployment on:

-   [Netlify](https://www.netlify.com/) (see `netlify.toml`)
-   [Vercel](https://vercel.com/) (see `vercel.json`)

---

### For Other Package Managers

While `bun` is recommended for this project, you can also use `npm` or `pnpm`. The corresponding commands are:

-   **Install**: `npm install` or `pnpm install`
-   **Run scripts**: `npm run <script-name>` or `pnpm <script-name>`

Refer to the official [Slidev documentation](https://sli.dev/) for more information.