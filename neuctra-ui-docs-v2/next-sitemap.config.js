const SITE_URL = "https://ui.neuctra.com";

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  output: "export",
  generateRobotsTxt: true,
  transform: async (config, path) => {
    let priority = 0.7;
    let changefreq = "monthly";

    if (path === "/") {
      priority = 1.0;
      changefreq = "daily";
    } else if (path === "/docs") {
      priority = 0.9;
      changefreq = "daily";
    } else if (path.startsWith("/docs/")) {
      priority = 0.8;
      changefreq = "daily";
    } else if (path === "/blog" || path.startsWith("/blog/")) {
      priority = path === "/blog" ? 0.8 : 0.7;
      changefreq = "weekly";
    } else if (["/about", "/contact"].includes(path)) {
      priority = 0.6;
      changefreq = "monthly";
    } else if (["/terms", "/privacypolicy", "/disclaimer"].includes(path)) {
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
