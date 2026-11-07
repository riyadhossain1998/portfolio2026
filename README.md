# portfolio2026

Personal portfolio and UX case study site for Riyad Hossain.

Live at [riyadhossain.com](https://riyadhossain.com)

## Tech

Static HTML, CSS and vanilla JavaScript, built with [Eleventy](https://www.11ty.dev/).
Content lives in Markdown files, the page shell in templates, and Eleventy
writes plain static pages to `_site/`. There is no client-side framework. Piazzolla, Azeret Mono and Gochi Hand are requested from Google
Fonts; every other asset is served from this repository.

The design system is "Signal": a periwinkle canvas and an ink blue accent, one
hue family, with no information carried by colour alone anywhere. Piazzolla's
optical size axis is load-bearing — it is interpolated by role rather than set
once. Each page sets `document.documentElement.className = 'js'` in the head,
and that class is what arms the hidden state of the reveal animation, so a
script failure can never leave the page blank.

## Editing content

Every case study is one Markdown file in `content/projects/`. The settings at
the top (title, tags, cover, project details, buttons) fill the page header
and the home page card; the text below is the case study itself. Artworks go
in `content/artworks/`, one file each.

There are two ways to edit:

- **In the browser with [Pages CMS](https://app.pagescms.org).** Sign in with
  GitHub and open this repository. "Case studies" and "Artworks" appear as
  forms, with image upload. Saving commits to `main`, and the site updates
  about a minute later. The forms are defined in `.pages.yml`.
- **By hand.** Edit the Markdown files and push to `main`.

Writing the case study body:

- `## Heading` for a section heading, blank lines between paragraphs, `- ` for
  a bullet list, `**bold**`, `*italic*`, `[text](https://link)`.
- An image is `![description of the image](images/folder/file.jpg "Caption")`.
  One image on its own line becomes a full width figure. Two or more images on
  consecutive lines, with no blank line between them, become a grid (three
  images make a three column grid, any other number a two column one).
- Anything Markdown can't express, such as the data table and pipeline diagram
  in Popified Networks, is written as plain HTML in the same file.

The order of the work list, the Case Study numbers and the previous/next
links all come from each file's `order` field. A new case study is published
at `/<file name>.html`. The first four keep their original addresses
(`project1.html` to `project4.html`) through their `permalink` field.

### Graph data

The build also writes `/content/projects.json`: every case study and artwork
with `id`, `title`, `type`, `regions` (weights from 0 to 1 for `uiux`,
`programming`, `illustration` and `gaming`), `related` (made two way
automatically), `url`, `thumb`, `year` and `summary`. The home page graph reads
this file.

## Structure

### Source files

| Path | What it is |
| --- | --- |
| `content/projects/*.md` | One file per case study. |
| `content/artworks/*.md` | One file per artwork (no page of its own, graph data only). |
| `index.njk` | Home page. The work list is generated from the case studies. |
| `about.njk` | About page. |
| `_includes/layouts/base.njk` | Shared head, nav and footer. |
| `_includes/layouts/case-study.njk` | Case study page template. |
| `_includes/thumbs/*.svg` | The drawn home page thumbnails, chosen by a case study's `thumb` field. |
| `content/projects-feed.njk` | Writes `/content/projects.json`. |
| `eleventy.config.js` | Build settings, including the Markdown rules for figures and links. |
| `.pages.yml` | Pages CMS forms. |

Every page loads `style.css` and `main.js`. All pages except the home page also
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

- `images/musicsurf/` — MusicSurf (`musicsurf.md`): sketches, low fidelity and
  high fidelity screens.
- `images/oms/` — Omni (`omni.md`): sketches, wireframes and final
  screens.
- `images/saladtime/` — Humming Salad Bar (`salad-bar.md`): photography and
  screenshots.
- `images/featurenet/` — Popified Networks (`popified.md`): prototypes,
  graphs and mobile screens.
- `images/intro/` — the portrait used in the home page about teaser and on
  the about page.

Popified Networks also reuses four images from `images/musicsurf/`, where it
refers back to that earlier work.

## Run locally

```sh
npm install
npm start
```

Then open <http://localhost:8080>. The page reloads as you edit.

## Deployment

`.github/workflows/deploy.yml` builds the site and publishes it to GitHub
Pages on every push to `main`. In the repository settings, Pages must use
"GitHub Actions" as its source. The `CNAME` file points the site at the
custom domain `riyadhossain.com`.
