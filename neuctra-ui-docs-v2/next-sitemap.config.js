const { docsRoutes } = require("./lib/docsNav");

const SITE_URL = "https://ui.neuctra.com";

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  // next build (output: 'export') writes the final static site to ./out —
  // running as a "postbuild" step means ./out already exists, so we must
  // write directly into it rather than into ./public (which is only copied
  // into ./out during the build step, not after).
  outDir: "./out",
  exclude: ["/docs/layout-playground"],
  robotsTxtOptions: {
    additionalSitemaps: [`${SITE_URL}/sitemap.xml`],
  },
  transform: async (config, path) => {
    let priority = 0.7;
    let changefreq = "monthly";

    if (path === "/") {
      priority = 1.0;
      changefreq = "weekly";
    } else if (path === "/docs") {
      priority = 0.9;
      changefreq = "weekly";
    } else if (docsRoutes.includes(path)) {
      priority = 0.8;
      changefreq = "monthly";
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
