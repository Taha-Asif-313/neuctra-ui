/**
 * Renders one or more JSON-LD objects as a single <script type="application/ld+json">.
 * Server Component — safe to render from any layout.js/page.js. Pass an
 * object or an array of objects (each without "@context", added here once).
 */
export default function JsonLd({ data }) {
  const items = Array.isArray(data) ? data : [data];
  // Several schemas here cross-reference each other via "@id" (e.g. the
  // TechArticle's publisher points at "#organization"), which only resolves
  // correctly when they share one @context — hence @graph instead of
  // multiple independent top-level objects.
  const payload =
    items.length === 1
      ? { "@context": "https://schema.org", ...items[0] }
      : { "@context": "https://schema.org", "@graph": items };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
