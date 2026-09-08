import { SITE_NAME, DEFAULT_OG_IMAGE } from "./site";

/**
 * Builds a Next.js `Metadata` object for one route. Replaces the old
 * client-side `MetaData.jsx` (a useEffect that patched <meta> tags after
 * hydration) with metadata that's baked into the static HTML at build time
 * — the core SEO fix of this migration.
 *
 * @param {object} opts
 * @param {string} opts.title
 * @param {string} opts.description
 * @param {string} [opts.keywords]
 * @param {string} opts.path - route path, e.g. "/docs/button"
 * @param {string} [opts.image] - absolute OG/Twitter image URL
 * @param {boolean} [opts.noIndex]
 */
export function buildMetadata({
  title,
  description,
  keywords,
  path,
  image,
  noIndex = false,
}) {
  const seoImage = image || DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
      images: [{ url: seoImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [seoImage],
    },
  };
}
