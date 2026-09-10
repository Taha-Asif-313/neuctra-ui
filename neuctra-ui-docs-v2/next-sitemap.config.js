const { docsRoutes } = require("./lib/docsNav");

const SITE_URL = "https://ui.neuctra.com";

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  // Written to ./public (not ./out) so sitemap.xml/sitemap-0.xml/robots.txt
  // are checked into the repo like llms.txt, instead of only existing
  // inside a gitignored build artifact. Since this runs as a "postbuild"
  // step, ./public's own copy into ./out has already happened by the time
  // this runs — scripts/copy-seo-files-to-out.js (chained after this in
  // package.json's "postbuild") copies these 3 generated files into ./out
  // too, so the actual static export still serves them.
  outDir: "./public",
  exclude: ["/docs/layout-playground"],
  transform: async (config, path) => {
    let priority = 0.7;
    let changefreq = "monthly";

    if (path === "/") {
      priority = 1.0;
      changefreq = "daily";
    } else if (path === "/docs") {
      priority = 0.9;
      changefreq = "daily";
    } else if (docsRoutes.includes(path)) {
      priority = 0.8;
      changefreq = "daily";
    } else if (["/about", "/contact"].includes(path)) {
      priority = 0.6;
      changefreq = "monthly";
    } else if (["/terms", "/privacypolicy"].includes(path)) {
      priority = 0.3;
      changefreq = "yearly";
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
