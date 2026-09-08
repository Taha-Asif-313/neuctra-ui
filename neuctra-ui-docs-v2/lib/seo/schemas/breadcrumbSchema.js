import { SITE_URL } from "../site";

/**
 * @param {Array<{ label: string, path: string }>} crumbs - ordered from
 *   Home down to the current page, e.g.
 *   [{ label: "Home", path: "/" }, { label: "Docs", path: "/docs" }, { label: "Button", path: "/docs/button" }]
 */
export function breadcrumbSchema(crumbs) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}
