# African Journal Safari Tours

A responsive, static multi-page website for African Journal Safari Tours. The design uses Tanzania as its launch focus and follows the supplied business blueprint. Pages avoid inventing prices, confirmed itineraries, reviews, or contact details.

## Pages

- `index.html` — homepage, hero video, featured journey concept, destinations, and interest selector
- `journeys.html` — journey themes and planning process
- `explore.html` — destination field guide and activities
- `journal.html` — editorial field notes
- `stories.html` — guest stories page, without invented testimonials
- `about.html` — brand and planning approach
- `contact.html` — local trip-brief planner
- `image-credits.html` — image attributions

## Files and assets

- `css/styles.css` — shared responsive styles and page layouts
- `js/script.js` — navigation, video, interest selection, trip-brief, Tally, and WhatsApp interactions
- `images/` — locally stored brand and destination photography
- `video.mp4` — homepage hero film
- `about-hero.mp4` — About page hero film
- `wild_experience.jpg` — homepage video poster/fallback

All page, style, script, image, and video paths are relative to this folder. No build step or package installation is required. The Tally form widget loads from Tally only when a visitor selects the floating form icon.

## Preview locally

Open `index.html` in a browser, or run a local static server from this folder:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish with GitHub Pages

1. Upload the **contents of this folder** to the root of a GitHub repository. Keep `index.html`, `css/`, `js/`, `images/`, and both video files together.
2. In the repository, open **Settings → Pages**.
3. Select **Deploy from a branch**, choose `main` and the `/ (root)` folder, then save.
4. Open the published URL and test the homepage, page navigation, images, videos, and contact planner.

This is a static website; there is no build command.

## Before launch

The floating form and WhatsApp icons use the existing Tally form and business WhatsApp number. The Contact page's trip planner prepares a brief in the browser and lets the visitor copy it; it does not submit or store the brief on a server. Confirm the enquiry form, business contact details, image credits, and destination or itinerary claims before publication.
