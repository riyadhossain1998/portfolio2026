// Eleventy builds the site into _site/. Content lives in content/,
// page templates in _includes/. See README.md for how to edit content.

const PASSTHROUGH = ["style.css", "pages.css", "main.js", "avatar.svg", "CNAME", "images"];

export default function (eleventyConfig) {
  for (const path of PASSTHROUGH) eleventyConfig.addPassthroughCopy(path);

  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("**/README.md");
  eleventyConfig.ignores.add(".claude/**");

  eleventyConfig.amendLibrary("md", (md) => {
    md.set({ html: true, typographer: false });
    caseStudyMarkdown(md);
  });

  // Case studies, in the order set by each file's `order` field.
  eleventyConfig.addCollection("caseStudies", (api) =>
    api.getFilteredByGlob("content/projects/*.md").sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999))
  );
  eleventyConfig.addCollection("artworks", (api) =>
    api.getFilteredByGlob("content/artworks/*.md").sort((a, b) => (b.data.year ?? 0) - (a.data.year ?? 0))
  );

  eleventyConfig.addFilter("pad2", (n) => String(n).padStart(2, "0"));
  eleventyConfig.addFilter("json", (v) => JSON.stringify(v, null, 2));
  eleventyConfig.addFilter("stripSlash", (url) => (url || "").replace(/^\//, ""));
  // Relative path for the site's own pages and images, so links keep the
  // exact form the hand-written pages used (project1.html, images/...).
  eleventyConfig.addFilter("localPath", (p) => (p && !/^(https?:)?\/\//.test(p) ? p.replace(/^\//, "") : p));

  // Builds the item list that the home page graph reads at /content/projects.json.
  eleventyConfig.addFilter("graphItems", (caseStudies, artworks) => {
    const toItem = (page, type) => {
      const d = page.data;
      return {
        id: page.fileSlug,
        title: d.listTitle || d.title,
        type: d.type || type,
        regions: d.regions || {},
        related: [...(d.related || [])],
        url: d.link || (page.url && page.url !== false ? page.url : null),
        thumb: d.image ? "/" + d.image.replace(/^\//, "") : d.cover ? "/" + d.cover.src.replace(/^\//, "") : null,
        year: d.year ?? null,
        summary: d.summary || "",
      };
    };
    const items = [...caseStudies.map((p) => toItem(p, "case-study")), ...artworks.map((p) => toItem(p, "artwork"))];
    // Make `related` two way, and drop ids that don't exist.
    const byId = new Map(items.map((i) => [i.id, i]));
    for (const item of items) {
      item.related = item.related.filter((id) => byId.has(id) && id !== item.id);
      for (const id of item.related) {
        const other = byId.get(id);
        if (!other.related.includes(item.id)) other.related.push(item.id);
      }
    }
    return items;
  });

  return {
    dir: { input: ".", includes: "_includes", data: "_data", output: "_site" },
    templateFormats: ["md", "njk"],
    markdownTemplateEngine: false,
  };
}

// Markdown tweaks so plain Markdown comes out matching the hand-written
// case study markup:
//  - top level headings, paragraphs and lists get the `reveal` class
//  - a paragraph of nothing but images becomes a captioned figure grid
//    (the image title, in quotes after the path, is the caption)
//  - links to other sites open in a new tab
function caseStudyMarkdown(md) {
  const addClass = (token, cls) => {
    const current = token.attrGet("class");
    token.attrSet("class", current ? `${current} ${cls}` : cls);
  };

  md.core.ruler.push("case_study", (state) => {
    const tokens = state.tokens;
    for (let i = 0; i < tokens.length; i++) {
      const t = tokens[i];
      if (t.level !== 0) continue;
      if (t.type === "heading_open" || t.type === "ordered_list_open") addClass(t, "reveal");
      if (t.type === "bullet_list_open") addClass(t, "project-list-items reveal");
      if (t.type === "paragraph_open") {
        const inline = tokens[i + 1];
        const images = imageOnly(inline);
        if (images) {
          const html = figureHtml(images, md);
          const block = new state.Token("html_block", "", 0);
          block.content = html;
          tokens.splice(i, 3, block);
        } else {
          addClass(t, "reveal");
        }
      }
    }
  });

  function imageOnly(inline) {
    if (!inline || inline.type !== "inline" || !inline.children) return null;
    const images = [];
    for (const c of inline.children) {
      if (c.type === "image") images.push(c);
      else if (c.type === "softbreak" || c.type === "hardbreak") continue;
      else if (c.type === "text" && !c.content.trim()) continue;
      else return null;
    }
    return images.length ? images : null;
  }

  function figureHtml(images, md) {
    const esc = md.utils.escapeHtml;
    const figure = (img, extra) => {
      const src = img.attrGet("src");
      const alt = img.children ? img.children.map((c) => c.content).join("") : img.content;
      const title = img.attrGet("title");
      return (
        `<figure class="project-figure${extra}">\n` +
        `  <img src="${esc(src)}" alt="${esc(alt)}" loading="lazy">\n` +
        (title ? `  <figcaption>${esc(title)}</figcaption>\n` : "") +
        `</figure>`
      );
    };
    if (images.length === 1) return figure(images[0], " reveal") + "\n";
    const cols = images.length === 3 ? 3 : 2;
    return `<div class="image-grid-${cols} reveal">\n${images.map((img) => figure(img, "")).join("\n")}\n</div>\n`;
  }

  const defaultLink = md.renderer.rules.link_open || ((tokens, idx, opts, env, self) => self.renderToken(tokens, idx, opts));
  md.renderer.rules.link_open = (tokens, idx, opts, env, self) => {
    const href = tokens[idx].attrGet("href") || "";
    if (/^https?:\/\//.test(href)) {
      tokens[idx].attrSet("target", "_blank");
      tokens[idx].attrSet("rel", "noopener");
    }
    return defaultLink(tokens, idx, opts, env, self);
  };
}
