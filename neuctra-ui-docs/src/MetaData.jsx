import { useEffect } from "react";

const DEFAULT_IMAGE =
  "https://ui.neuctra.com/docs-default-og.png";

const Metadata = ({
  title,
  description,
  keywords,
  image,
}) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    const ensureMeta = (selector, key, attr, content) => {
      if (!content) return;

      const nodes = Array.from(
        document.querySelectorAll(selector)
      );

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
    const currentUrl = window.location.href;

    // Basic SEO
    ensureMeta(
      'meta[name="description"]',
      "description",
      "name",
      description
    );

    ensureMeta(
      'meta[name="keywords"]',
      "keywords",
      "name",
      keywords
    );

    // Open Graph
    ensureMeta(
      'meta[property="og:title"]',
      "og:title",
      "property",
      title
    );

    ensureMeta(
      'meta[property="og:description"]',
      "og:description",
      "property",
      description
    );

    ensureMeta(
      'meta[property="og:image"]',
      "og:image",
      "property",
      seoImage
    );

    ensureMeta(
      'meta[property="og:url"]',
      "og:url",
      "property",
      currentUrl
    );

    // Twitter
    ensureMeta(
      'meta[name="twitter:card"]',
      "twitter:card",
      "name",
      "summary_large_image"
    );

    ensureMeta(
      'meta[name="twitter:title"]',
      "twitter:title",
      "name",
      title
    );

    ensureMeta(
      'meta[name="twitter:description"]',
      "twitter:description",
      "name",
      description
    );

    ensureMeta(
      'meta[name="twitter:image"]',
      "twitter:image",
      "name",
      seoImage
    );
  }, [title, description, keywords, image]);

  return null;
};

export default Metadata;