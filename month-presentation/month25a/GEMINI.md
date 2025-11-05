# Project Overview

This is a [Slidev](https://sli.dev/) project, a presentation framework that uses Markdown and Vue.js to create interactive slideshows. The main content of the presentation is in `slides.md`.

## Building and Running

To get started with this project, follow these steps:

1.  **Install dependencies:**
    ```bash
    pnpm install
    ```

2.  **Start the development server:**
    ```bash
    pnpm dev
    ```
    This will start a local server and open the presentation in your browser.

3.  **Build the presentation:**
    ```bash
    pnpm build
    ```
    This will create a production-ready build of the presentation in the `dist/` directory.

4.  **Export the presentation:**
    ```bash
    pnpm export
    ```
    This will export the presentation as a PDF or other formats, as configured in the project.

## Development Conventions

*   **Presentation Content:** The main content of the slides is written in Markdown in the `slides.md` file.
*   **Custom Components:** Custom Vue components can be added to the `components/` directory and then used within the slides. The `Counter.vue` file is an example of a custom component.
*   **Static Assets:** Static assets like images can be placed in a `public/` directory (though one is not present currently).
*   **Styling:** Slidev uses [Windi CSS](https://windicss.org/) (or [UnoCSS](https://unocss.dev/)) for styling. You can use utility classes directly in your Markdown and Vue components.
