import { useEffect } from "react";

const SITE_URL = "https://ui.neuctra.com";
const SITE_NAME = "Neuctra UI";
const DEFAULT_IMAGE = `${SITE_URL}/docs-default-og.png`;

/**
 * Per-route SEO manager for the SPA.
 *
 * Sets: <title>, meta description/keywords, Open Graph,
 * Twitter cards and robots.
 */
const Metadata = ({
  title,
  description,
  keywords,
  image,
  noIndex = false,
}) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    const ensureMeta = (selector, key, attr, content) => {
      if (!content) return;

      const nodes = Array.from(document.querySelectorAll(selector));

      if (nodes.length === 0) {
        const tag = document.createElement("meta");
        tag.setAttribute(attr, key);
        tag.setAttribute("content", content);
        document.head.appendChild(tag);
        return;
      }

      const first = nodes[0];

      first.setAttribute(attr, key);
      first.setAttribute("content", content);

      nodes.slice(1).forEach((n) => n.remove());
    };

    const seoImage = image || DEFAULT_IMAGE;

    // Basic SEO
    ensureMeta(
      'meta[name="description"]',
      "description",
      "name",
      description,
    );

    ensureMeta(
      'meta[name="keywords"]',
      "keywords",
      "name",
      keywords,
    );

    ensureMeta(
      'meta[name="robots"]',
      "robots",
      "name",
      noIndex ? "noindex, nofollow" : "index, follow",
    );

    // Open Graph
    ensureMeta(
      'meta[property="og:site_name"]',
      "og:site_name",
      "property",
      SITE_NAME,
    );

    ensureMeta(
      'meta[property="og:type"]',
      "og:type",
      "property",
      "website",
    );

    ensureMeta(
      'meta[property="og:title"]',
      "og:title",
      "property",
      title,
    );

    ensureMeta(
      'meta[property="og:description"]',
      "og:description",
      "property",
      description,
    );

    ensureMeta(
      'meta[property="og:image"]',
      "og:image",
      "property",
      seoImage,
    );

    // Twitter
    ensureMeta(
      'meta[name="twitter:card"]',
      "twitter:card",
      "name",
      "summary_large_image",
    );

    ensureMeta(
      'meta[name="twitter:title"]',
      "twitter:title",
      "name",
      title,
    );

    ensureMeta(
      'meta[name="twitter:description"]',
      "twitter:description",
      "name",
      description,
    );

    ensureMeta(
      'meta[name="twitter:image"]',
      "twitter:image",
      "name",
      seoImage,
    );
  }, [title, description, keywords, image, noIndex]);

  return null;
};

export default Metadata;