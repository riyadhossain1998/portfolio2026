# portfolio2026

Personal portfolio and UX case study site for Riyad Hossain.

Live at [riyadhossain.com](https://riyadhossain.com)

## Tech

Static HTML, CSS and vanilla JavaScript. No framework, no build step, no
dependencies. Piazzolla, Azeret Mono and Gochi Hand are requested from Google
Fonts; every other asset is served from this repository.

The design system is "Signal": a periwinkle canvas and an ink blue accent, one
hue family, with no information carried by colour alone anywhere. Piazzolla's
optical size axis is load-bearing — it is interpolated by role rather than set
once. Each page sets `document.documentElement.className = 'js'` in the head,
and that class is what arms the hidden state of the reveal animation, so a
script failure can never leave the page blank.

## Structure

### Pages

| File | Page |
| --- | --- |
| `index.html` | Home. Hero, the work list linking to the four case studies, an about teaser, and the contact section. |
| `about.html` | About — "The story so far." Intro, split content sections, skills, a timeline, and a closing call to action. |
| `project1.html` | MusicSurf case study. |
| `project2.html` | Omni case study — an order management redesign. |
| `project3.html` | Humming Salad Bar case study. |
| `project4.html` | Popified Networks case study. |

Every page loads `style.css` and `main.js`. All pages except `index.html` also
load `pages.css`.

### Styles

`style.css` holds the global layer and the home page. It opens with the reset,
the browser surfaces (selection, focus ring, scrollbar), and the `:root` custom
properties that define the palette, the type roles and the shared durations and
easing curves, then covers the drawn node-and-edge marker, the reveal states,
the navigation bar and mobile menu, the hero, buttons, the section masthead,
the work list and its four SVG thumbnails, the about teaser, the contact panel,
the footer, the responsive overrides and the reduced-motion block.

`pages.css` holds everything specific to the about and case study pages: the
page hero, the project spec block and cover, the reading sheet with its left
rail, lists, data tables, figures and the inline pipeline diagram, the links
out, the back-to-top control, the image lightbox, the project navigation, the
about page layout (intro, timeline, skills, closing), and its own responsive
and reduced-motion overrides.

Both files end with a `prefers-reduced-motion: reduce` block that is *fewer and
gentler, not none* — opacity and colour transitions survive, spatial movement
does not.

### Scripts

`main.js` runs on `DOMContentLoaded` and initializes four independent
behaviours. Each one does nothing when the elements it targets are absent, so
the same file is safe to load on every page.

- **Navigation** — adds a `scrolled` class past 50px of scroll and drives the
  mobile menu toggle, locking body scroll while the menu is open.
- **Scroll reveal** — an `IntersectionObserver` that reveals `.reveal` elements
  once and then unobserves them, plus a staggered hero title animation on load.
- **Image lightbox** — builds the modal markup once, then opens any case study
  figure full size with its caption, closing on backdrop, button or Escape, and
  holding focus on the dialog while it is open.
- **Back to top** — built only on pages with a `.project-body`, appearing a
  screen and a half in. Moves keyboard focus to the wordmark on activation so
  the next Tab does not resume from a control that is now offscreen.

In-page anchors scroll through CSS `scroll-behavior`, which carries its own
reduced-motion override, rather than through script.

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
