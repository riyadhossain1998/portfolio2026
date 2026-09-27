# portfolio2026

Personal portfolio and UX case study site for Riyad Hossain.

Live at [riyadhossain.com](https://riyadhossain.com)

## Tech

Static HTML, CSS and vanilla JavaScript. No framework, no build step, no
dependencies. The DM Serif Display and Inter typefaces are requested from
Google Fonts; every other asset is served from this repository.

## Structure

### Pages

| File | Page |
| --- | --- |
| `index.html` | Home. Hero, a scrolling marquee, the work grid linking to the four case studies, an about teaser, and the contact section. |
| `about.html` | About — "The story so far." Intro, split content sections, skills, a timeline, and a closing call to action. |
| `project1.html` | MusicSurf case study. |
| `project2.html` | Omni case study — an order management redesign. |
| `project3.html` | Humming Salad Bar case study. |
| `project4.html` | Popified Networks case study. |

Every page loads `style.css` and `main.js`. All pages except `index.html` also
load `pages.css`.

### Styles

`style.css` holds the global layer and the home page. It opens with the reset
and the `:root` custom properties that define the colour palette, the two font
stacks and the shared easing curves, then covers the grain texture overlay, the
custom cursor, the reveal animation states, the navigation bar and mobile menu,
the hero, buttons, the marquee, the work grid, the about teaser, the contact
section, the footer, and the responsive overrides.

`pages.css` holds everything specific to the about and case study pages: the
page hero, the about page layout (intro, split sections, skills, timeline,
CTA), the case study layout including data tables, image grids and an inline
pipeline diagram, the image lightbox modal, the project navigation, and its own
responsive overrides.

### Scripts

`main.js` runs on `DOMContentLoaded` and initializes seven independent
behaviours. Each one does nothing when the elements it targets are absent, so
the same file is safe to load on every page.

- **Custom cursor** — moves a dot with the pointer and eases a trailing ring
  toward it, reacting to hover and mousedown. Skipped at viewports 560px and
  under.
- **Navigation** — adds a `scrolled` class past 50px of scroll and drives the
  mobile menu toggle, locking body scroll while the menu is open.
- **Scroll reveal** — an `IntersectionObserver` that reveals `.reveal` elements
  once and then unobserves them, plus a staggered hero title animation on load.
- **Smooth anchor scroll** — intercepts in-page anchor clicks and uses
  `scrollIntoView`.
- **Magnetic buttons** — translates `.magnetic` elements toward the pointer.
- **Contact form** — posts the form with `fetch` to the endpoint in the form's
  `action` attribute and reports success or failure in place, without a page
  reload.
- **Image lightbox** — builds the modal markup once, then opens any case study
  figure full size with its caption, closing on backdrop, button or Escape.

### Assets

`images/` is organized one directory per case study, alongside the photography
used on the home and about pages:

- `images/musicsurf/` — MusicSurf (`project1.html`): sketches, low fidelity and
  high fidelity screens.
- `images/oms/` — Omni (`project2.html`): sketches, wireframes and final
  screens.
- `images/saladtime/` — Humming Salad Bar (`project3.html`): photography and
  screenshots.
- `images/featurenet/` — Popified Networks (`project4.html`): prototypes,
  graphs and mobile screens.
- `images/intro/` — the portrait used in the home page about teaser and on
  `about.html`.

`project4.html` also reuses four images from `images/musicsurf/`, where it
refers back to that earlier work.

## Run locally

There is nothing to install or compile. Serve the directory over HTTP:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Deployment

Hosted on GitHub Pages from the default branch. The `CNAME` file points the
site at the custom domain `riyadhossain.com`. Pushing to the default branch
publishes.
