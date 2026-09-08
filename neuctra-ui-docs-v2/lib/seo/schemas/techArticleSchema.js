import { SITE_URL, SITE_NAME } from "../site";

/**
 * @param {object} opts
 * @param {string} opts.name - e.g. "Button" component name, or guide title
 * @param {string} opts.description
 * @param {string} opts.path - route path, e.g. "/docs/button"
 */
export function techArticleSchema({ name, description, path }) {
  return {
    "@type": "TechArticle",
    headline: name,
    description,
    url: `${SITE_URL}${path}`,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    author: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
  };
}
