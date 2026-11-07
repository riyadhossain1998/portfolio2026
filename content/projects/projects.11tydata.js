// Defaults for every case study in this folder.
export default {
  layout: "layouts/case-study.njk",
  type: "case-study",
  eleventyComputed: {
    // New case studies are published at /<file name>.html unless the
    // file sets its own permalink (the first four keep projectN.html).
    permalink: (data) => data.permalink || `/${data.page.fileSlug}.html`,
  },
};
