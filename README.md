# Asili Trails Africa — GitHub upload package

This is the current static website package. Copy the contents of this folder to the root of the GitHub repository that will host the site. The `index.html` file is the home page; no build step or package installation is required.

## Included

- `index.html`, `journeys.html`, `about.html`, and `image-credits.html`
- `style.css` and `journeys.css`
- `about-hero.mp4`, `about.jpg`, `wild_experience.jpg`, `logo.png`, and `brand-mark.png`
- The complete `images/` directory used by the pages and their image selection scripts
- `.gitignore` for common OS and editor files

## Publish

Configure GitHub Pages to publish from the repository root (the `main` branch). Keep the HTML files, stylesheets, media, and `images/` directory together so their relative links continue to work.

## Package notes

- The original `test1/` alternative and unused root images were left out; this package contains the active top-level site.
- `about.html` refers to `images/camping.jpg`, which is not present in the source image directory. Its existing `onerror` handler switches to a Wikimedia image, so that card currently depends on an internet connection unless a local camping image is added.
- The current pages still use the name **Asili Trails Africa**. The possible **Velora Tours** rename has not been applied because the name is not confirmed.
- Fonts, animation libraries, the Tally form, WhatsApp links, and some image fallbacks load from external services.
