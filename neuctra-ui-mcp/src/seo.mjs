// Pure, deterministic SEO builders behind the generate_page_seo and
// audit_page_seo tools. No I/O and no LLM calls: the same input always gives
// the same output, so it runs identically on Node and on edge runtimes.
//
// The @id scheme and node shapes mirror neuctra-ui-docs-v2/lib/seo/schemas
// (Organization at `${site}/#organization`, WebSite at `${site}/#website`,
// pages linked via isPartOf), so a site built with these snippets weaves the
// same graph as the Neuctra UI docs do.

export const FRAMEWORKS = [
  "nextjs-app",
  "nextjs-pages",
  "react-vite",
  "react-router",
  "astro",
  "tanstack-start",
  "gatsby",
  "html",
];

export const PAGE_TYPES = [
  "home",
  "docs",
  "blog",
  "product",
  "tool",
  "pricing",
  "landing",
  "faq",
  "about",
  "contact",
  "category",
  "other",
];

export const TITLE_MAX = 60;
export const DESCRIPTION_MAX = 155;

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

function capitalize(text) {
  return text.replace(/^\s*\w/, (c) => c.toUpperCase());
}

const SMALL_WORDS = new Set(["a", "an", "and", "as", "at", "by", "for", "in", "of", "on", "or", "the", "to", "vs", "with"]);

/** "react card component" -> "React Card Component"; keeps words that already have capitals or digits (v4, UI, SaaS). */
function titleCase(text) {
  return text
    .trim()
    .split(/\s+/)
    .map((w, i) =>
      /[A-Z0-9]/.test(w) || (i > 0 && SMALL_WORDS.has(w))
        ? w
        : w[0].toUpperCase() + w.slice(1),
    )
    .join(" ");
}

function titleCaseSlug(segment) {
  return segment
    .split(/[-_]/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

/** Cuts at a word boundary so a trimmed title/description never ends mid-word. */
function trimToWords(text, max) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max + 1);
  const lastSpace = cut.lastIndexOf(" ");
  return cut
    .slice(0, lastSpace > max * 0.6 ? lastSpace : max)
    .replace(/[\s,;:|.-]+$/, "");
}

function normalizeSiteUrl(siteUrl) {
  return siteUrl.replace(/\/+$/, "");
}

function normalizePath(path) {
  if (!path || path === "/") return "/";
  return `/${path.replace(/^\/+/, "")}`;
}

export function absoluteUrl(siteUrl, path) {
  const site = normalizeSiteUrl(siteUrl);
  const p = normalizePath(path);
  return p === "/" ? `${site}/` : `${site}${p}`;
}

/** JSON for a <script type="application/ld+json">: escapes `<` so page text can't close the tag. */
export function jsonLdString(data, space = 2) {
  return JSON.stringify(data, null, space).replace(/</g, "\\u003c");
}

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    // Braces would open a JSX expression inside <title>; entities are valid in both HTML and JSX.
    .replace(/\{/g, "&#123;")
    .replace(/\}/g, "&#125;");
}

// ---------------------------------------------------------------------------
// Title and description
// ---------------------------------------------------------------------------

export function buildTitle({ title, primaryKeyword, pageType, siteName }) {
  const warnings = [];
  let value;

  if (title) {
    value = title.trim();
    const suffix = ` | ${siteName}`;
    if (
      pageType !== "home" &&
      !value.toLowerCase().includes(siteName.toLowerCase()) &&
      value.length + suffix.length <= TITLE_MAX
    ) {
      value += suffix;
    }
    if (
      pageType !== "home" &&
      !value.toLowerCase().includes(siteName.toLowerCase()) &&
      value.length + suffix.length > TITLE_MAX
    ) {
      warnings.push(
        `Brand suffix "${suffix.trim()}" was not added: it would push the title past ${TITLE_MAX} characters. Shorten the title by ${value.length + suffix.length - TITLE_MAX} characters so every page carries the same suffix.`,
      );
    }
  } else if (pageType === "home") {
    value = `${siteName}: ${titleCase(primaryKeyword)}`;
  } else {
    value = `${titleCase(primaryKeyword)} | ${siteName}`;
  }

  if (value.length > TITLE_MAX) {
    warnings.push(
      `Title is ${value.length} characters; trimmed to ${TITLE_MAX}. Shorten the qualifier so the keyword and brand both survive.`,
    );
    value = trimToWords(value, TITLE_MAX);
  }
  if (value.length < 30) {
    warnings.push(
      `Title is only ${value.length} characters. Add a qualifier (benefit, audience or use case) to use the space Google shows.`,
    );
  }
  if (
    primaryKeyword &&
    !value.toLowerCase().includes(primaryKeyword.toLowerCase())
  ) {
    warnings.push(
      `Title does not contain the primary keyword "${primaryKeyword}". Put it near the start.`,
    );
  }
  return { value, length: value.length, warnings };
}

const DESCRIPTION_TEMPLATES = {
  home: (k, s) =>
    `${s} is ${k}. See what it does, how it works and how to get started in minutes.`,
  docs: (k, s) =>
    `Learn how to use ${k} with ${s}: examples, props, accessibility notes and best practices. Copy the code and ship faster.`,
  blog: (k) =>
    `A practical guide to ${k}: what it is, why it matters and step-by-step examples you can apply today.`,
  product: (k, s) =>
    `${capitalize(k)} by ${s}. See features, use cases and how it compares, then start free today.`,
  pricing: (k, s) =>
    `${s} pricing for ${k}: compare plans, features and limits, and pick the plan that fits your team.`,
  landing: (k, s) =>
    `${capitalize(k)} with ${s}. See how it works, what you get and start in minutes.`,
  faq: (k, s) =>
    `Answers to the most common questions about ${k} and ${s}: setup, features, pricing and support.`,
  about: (k, s) =>
    `About ${s}: the team, the mission and the story behind ${k}.`,
  contact: (k, s) =>
    `Contact ${s} about ${k}: sales, support and partnerships. We usually reply within one business day.`,
  category: (k, s) =>
    `Browse ${k} on ${s}: compare options, filter by what matters and find the right fit.`,
  tool: (k, s) =>
    `${capitalize(k)} with ${s}. Works right in your browser: fast, private and free to use. Try it now.`,
  other: (k, s) => `${capitalize(k)} on ${s}.`,
};

export function buildDescription({
  description,
  primaryKeyword,
  pageType,
  siteName,
}) {
  const warnings = [];
  let value;

  if (description) {
    value = description.trim();
  } else {
    value = DESCRIPTION_TEMPLATES[pageType](primaryKeyword, siteName);
    warnings.push(
      "Description was generated from a template. Rewrite it with this page's real, specific value: templates get ignored or rewritten by Google.",
    );
  }

  if (value.length > DESCRIPTION_MAX) {
    warnings.push(
      `Description is ${value.length} characters; trimmed to ${DESCRIPTION_MAX}.`,
    );
    value = trimToWords(value, DESCRIPTION_MAX);
    if (!/[.!?]$/.test(value)) value += ".";
    if (value.length > DESCRIPTION_MAX) value = trimToWords(value, DESCRIPTION_MAX - 1) + ".";
  }
  if (value.length < 120) {
    warnings.push(
      `Description is ${value.length} characters. Aim for 140 to 155 so the full value proposition shows.`,
    );
  }
  if (
    primaryKeyword &&
    !value.toLowerCase().includes(primaryKeyword.toLowerCase())
  ) {
    warnings.push(
      `Description does not mention the primary keyword "${primaryKeyword}". Google bolds matching terms, which lifts clicks.`,
    );
  }
  return { value, length: value.length, warnings };
}

// ---------------------------------------------------------------------------
// Schema weaving
// ---------------------------------------------------------------------------

const WEBPAGE_TYPE = {
  faq: "FAQPage",
  about: "AboutPage",
  contact: "ContactPage",
  category: "CollectionPage",
};

export function defaultBreadcrumbs(path, pageName) {
  const segments = normalizePath(path).split("/").filter(Boolean);
  const crumbs = [{ name: "Home", path: "/" }];
  segments.forEach((segment, i) => {
    const isLast = i === segments.length - 1;
    crumbs.push({
      name: isLast && pageName ? pageName : titleCaseSlug(segment),
      path: `/${segments.slice(0, i + 1).join("/")}`,
    });
  });
  return crumbs;
}

export function buildSchemaGraph(input, meta) {
  const site = normalizeSiteUrl(input.siteUrl);
  const url = absoluteUrl(input.siteUrl, input.path);
  const ids = {
    organization: `${site}/#organization`,
    website: `${site}/#website`,
    webpage: `${url}#webpage`,
    breadcrumb: `${url}#breadcrumb`,
    faq: `${url}#faq`,
  };
  const graph = [];
  const warnings = [];

  const organization = {
    "@type": "Organization",
    "@id": ids.organization,
    name: input.siteName,
    url: `${site}/`,
  };
  if (input.logo) organization.logo = input.logo;
  if (input.sameAs?.length) organization.sameAs = input.sameAs;
  graph.push(organization);

  graph.push({
    "@type": "WebSite",
    "@id": ids.website,
    url: `${site}/`,
    name: input.siteName,
    publisher: { "@id": ids.organization },
    inLanguage: input.language,
  });

  const isFaqPage = input.pageType === "faq";
  const webpage = {
    "@type": WEBPAGE_TYPE[input.pageType] ?? "WebPage",
    "@id": ids.webpage,
    url,
    name: meta.title,
    description: meta.description,
    isPartOf: { "@id": ids.website },
    inLanguage: input.language,
  };
  if (input.pageType !== "home") webpage.breadcrumb = { "@id": ids.breadcrumb };
  if (input.pageType === "home") webpage.about = { "@id": ids.organization };
  if (input.ogImage) webpage.primaryImageOfPage = { "@type": "ImageObject", url: input.ogImage };
  if (input.datePublished) webpage.datePublished = input.datePublished;
  if (input.dateModified) webpage.dateModified = input.dateModified;
  graph.push(webpage);

  if (input.pageType !== "home") {
    const crumbs = input.breadcrumbs?.length
      ? input.breadcrumbs
      : defaultBreadcrumbs(input.path, input.pageName);
    graph.push({
      "@type": "BreadcrumbList",
      "@id": ids.breadcrumb,
      itemListElement: crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: absoluteUrl(input.siteUrl, c.path),
      })),
    });
  }

  const headline = input.pageName ?? titleCase(input.primaryKeyword);
  const common = {
    mainEntityOfPage: { "@id": ids.webpage },
    publisher: { "@id": ids.organization },
    inLanguage: input.language,
  };
  const author = input.author
    ? { "@type": "Person", name: input.author }
    : { "@id": ids.organization };

  if (input.pageType === "docs") {
    graph.push({
      "@type": "TechArticle",
      "@id": `${url}#article`,
      headline,
      description: meta.description,
      author,
      ...(input.datePublished && { datePublished: input.datePublished }),
      ...(input.dateModified && { dateModified: input.dateModified }),
      ...common,
    });
  } else if (input.pageType === "blog") {
    graph.push({
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      headline: trimToWords(headline, 110),
      description: meta.description,
      author,
      ...(input.ogImage && { image: input.ogImage }),
      ...(input.datePublished && { datePublished: input.datePublished }),
      ...(input.dateModified && { dateModified: input.dateModified }),
      ...common,
    });
    if (!input.datePublished) warnings.push("Blog posts need datePublished (and dateModified when updated) for Article rich results and freshness.");
    if (!input.author) warnings.push("Add a real author name: BlogPosting without a Person author is a weak E-E-A-T signal.");
    if (!input.ogImage) warnings.push("Add an ogImage: Article rich results require an image.");
  } else if (["product", "tool", "pricing"].includes(input.pageType)) {
    const isTool = input.pageType === "tool";
    const node = {
      "@type": isTool ? "SoftwareApplication" : input.productType ?? "SoftwareApplication",
      "@id": `${url}#product`,
      name: headline,
      description: meta.description,
      ...(input.ogImage && { image: input.ogImage }),
      ...common,
    };
    delete node.inLanguage;
    if (node["@type"] === "SoftwareApplication") {
      node.applicationCategory =
        input.applicationCategory ?? (isTool ? "UtilitiesApplication" : "DeveloperApplication");
      node.operatingSystem = "Web";
      if (input.features?.length) node.featureList = input.features;
    } else {
      node.brand = { "@id": ids.organization };
    }
    if (input.isFree) node.isAccessibleForFree = true;
    if (input.offers?.length) {
      node.offers = input.offers.map((o) => ({
        "@type": "Offer",
        ...(o.name && { name: o.name }),
        price: String(o.price),
        priceCurrency: o.priceCurrency,
        url,
      }));
    } else if (input.isFree) {
      node.offers = { "@type": "Offer", price: "0", priceCurrency: input.currency ?? "USD", url };
    } else {
      warnings.push(
        `No offers given: the ${node["@type"]} node has no price. Pass isFree for a free tool, or offers with real, visible prices; never invent them.`,
      );
    }
    if (isTool && !input.features?.length) {
      warnings.push("Pass features (3 to 8 short capabilities) so the SoftwareApplication gets a featureList.");
    }
    graph.push(node);
  }

  // Visible usage steps -> HowTo (built from the same array as the on-page <ol>).
  if (input.steps?.length) {
    graph.push({
      "@type": "HowTo",
      "@id": `${url}#howto`,
      name: input.howToName ?? `How to use ${headline}`,
      step: input.steps.map((text, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: text.length > 80 ? trimToWords(text, 80) : text,
        text,
      })),
      isPartOf: { "@id": ids.webpage },
    });
  } else if (input.pageType === "tool") {
    warnings.push("Pass steps (the visible \"How to\" list) to add a HowTo node built from the same data as the page.");
  }

  // Listing pages -> ItemList of the linked pages, in visible order.
  if (input.items?.length) {
    graph.push({
      "@type": "ItemList",
      "@id": `${url}#itemlist`,
      itemListElement: input.items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: it.name,
        url: absoluteUrl(input.siteUrl, it.path),
      })),
    });
    webpage.mainEntity = webpage.mainEntity ?? { "@id": `${url}#itemlist` };
  } else if (input.pageType === "category") {
    warnings.push("Pass items (the pages this category links to) to add an ItemList for the CollectionPage.");
  }

  if (input.faqs?.length) {
    const questions = input.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    }));
    if (isFaqPage) {
      webpage.mainEntity = questions;
    } else {
      graph.push({
        "@type": "FAQPage",
        "@id": ids.faq,
        isPartOf: { "@id": ids.webpage },
        mainEntity: questions,
      });
    }
  } else if (isFaqPage) {
    warnings.push("pageType is \"faq\" but no faqs were given: FAQPage needs its visible questions in mainEntity.");
  }

  return { jsonLd: { "@context": "https://schema.org", "@graph": graph }, warnings };
}

// ---------------------------------------------------------------------------
// Meta tags and framework snippets
// ---------------------------------------------------------------------------

function buildMetaObject(input, meta) {
  const url = absoluteUrl(input.siteUrl, input.path);
  return {
    title: meta.title,
    description: meta.description,
    canonical: url,
    robots: input.noindex
      ? "noindex, follow"
      : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    openGraph: {
      type: input.pageType === "blog" ? "article" : "website",
      siteName: input.siteName,
      title: input.ogTitle ?? meta.title,
      description: input.ogDescription ?? meta.description,
      url,
      ...(input.ogImage && { image: input.ogImage, imageWidth: 1200, imageHeight: 630 }),
      ...(input.pageType === "blog" && input.datePublished && { publishedTime: input.datePublished }),
      ...(input.pageType === "blog" && input.dateModified && { modifiedTime: input.dateModified }),
    },
    twitter: {
      card: input.ogImage ? "summary_large_image" : "summary",
      title: input.ogTitle ?? meta.title,
      description: input.ogDescription ?? meta.description,
      ...(input.ogImage && { image: input.ogImage }),
    },
  };
}

/** The <head> tags shared by every JSX/HTML-style framework. */
function headTags(m) {
  const tags = [
    `<title>${escapeAttr(m.title)}</title>`,
    `<meta name="description" content="${escapeAttr(m.description)}" />`,
    `<link rel="canonical" href="${m.canonical}" />`,
    `<meta name="robots" content="${m.robots}" />`,
    `<meta property="og:type" content="${m.openGraph.type}" />`,
    `<meta property="og:site_name" content="${escapeAttr(m.openGraph.siteName)}" />`,
    `<meta property="og:title" content="${escapeAttr(m.openGraph.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(m.openGraph.description)}" />`,
    `<meta property="og:url" content="${m.canonical}" />`,
  ];
  if (m.openGraph.image) {
    tags.push(
      `<meta property="og:image" content="${m.openGraph.image}" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
    );
  }
  if (m.openGraph.publishedTime) tags.push(`<meta property="article:published_time" content="${m.openGraph.publishedTime}" />`);
  if (m.openGraph.modifiedTime) tags.push(`<meta property="article:modified_time" content="${m.openGraph.modifiedTime}" />`);
  tags.push(
    `<meta name="twitter:card" content="${m.twitter.card}" />`,
    `<meta name="twitter:title" content="${escapeAttr(m.twitter.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(m.twitter.description)}" />`,
  );
  if (m.twitter.image) tags.push(`<meta name="twitter:image" content="${m.twitter.image}" />`);
  return tags;
}

function indent(lines, spaces) {
  const pad = " ".repeat(spaces);
  return lines.map((l) => (l ? pad + l : l)).join("\n");
}

function jsonLdJs(jsonLd) {
  // Pretty JSON is valid JS object-literal syntax, so it can be pasted as `const jsonLd = ...`.
  return JSON.stringify(jsonLd, null, 2);
}

const JSX_SCRIPT = `<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\\\u003c") }}
/>`;

export function renderSnippet(framework, m, jsonLd) {
  const q = JSON.stringify;
  switch (framework) {
    case "nextjs-app": {
      const og = {
        title: m.openGraph.title,
        description: m.openGraph.description,
        url: m.canonical,
        siteName: m.openGraph.siteName,
        type: m.openGraph.type,
        ...(m.openGraph.image && {
          images: [{ url: m.openGraph.image, width: 1200, height: 630 }],
        }),
        ...(m.openGraph.publishedTime && { publishedTime: m.openGraph.publishedTime }),
        ...(m.openGraph.modifiedTime && { modifiedTime: m.openGraph.modifiedTime }),
      };
      const indexable = !m.robots.startsWith("noindex");
      const metadata = {
        // absolute: the title already carries the brand, so a root
        // `title.template` ("%s | Brand") must not add it a second time.
        title: { absolute: m.title },
        description: m.description,
        alternates: { canonical: m.canonical },
        robots: {
          index: indexable,
          follow: true,
          googleBot: {
            index: indexable,
            follow: true,
            // kebab-case keys: camelCase variants are silently ignored.
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
        // Child openGraph/twitter objects REPLACE the parent's, so images are repeated here.
        openGraph: og,
        twitter: {
          card: m.twitter.card,
          title: m.twitter.title,
          description: m.twitter.description,
          ...(m.twitter.image && { images: [m.twitter.image] }),
        },
      };
      return {
        file: "app/<route>/page.jsx (or layout.jsx if the page is \"use client\")",
        language: "jsx",
        code: `// A "use client" page cannot export metadata: move this export to the route's layout.jsx.
// title.absolute: the brand is already in the title, so a root "%s | Brand" template won't double it.
// openGraph/twitter here REPLACE the parent layout's objects entirely, so images are repeated.
// googleBot keys must stay kebab-case ("max-image-preview"); camelCase keys are ignored.
// If the tool widget needs the browser, wrap only the widget in dynamic(..., { ssr: false }).
export const metadata = ${JSON.stringify(metadata, null, 2)};

const jsonLd = ${jsonLdJs(jsonLd)};

export default function Page() {
  return (
    <>
${indent(JSX_SCRIPT.split("\n"), 6)}
      {/* page content */}
    </>
  );
}`,
      };
    }

    case "nextjs-pages":
      return {
        file: "pages/<route>.jsx",
        language: "jsx",
        code: `import Head from "next/head";

const jsonLd = ${jsonLdJs(jsonLd)};

export default function Page() {
  return (
    <>
      <Head>
${indent(headTags(m), 8)}
${indent(JSX_SCRIPT.split("\n"), 8)}
      </Head>
      {/* page content */}
    </>
  );
}`,
      };

    case "react-vite":
      return {
        file: "src/pages/<Page>.jsx",
        language: "jsx",
        code: `// React 19 hoists <title>, <meta> and <link> into <head> automatically.
// On React 18, wrap these tags in <Helmet> from react-helmet-async instead.
// Prerender this route at build time (or use an SSR framework): a client-only
// SPA ships an empty HTML shell that most AI crawlers never render.

const jsonLd = ${jsonLdJs(jsonLd)};

export default function Page() {
  return (
    <>
${indent(headTags(m), 6)}
${indent(JSX_SCRIPT.split("\n"), 6)}
      {/* page content */}
    </>
  );
}`,
      };

    case "react-router": {
      const entries = [
        `{ title: ${q(m.title)} }`,
        `{ name: "description", content: ${q(m.description)} }`,
        `{ tagName: "link", rel: "canonical", href: ${q(m.canonical)} }`,
        `{ name: "robots", content: ${q(m.robots)} }`,
        `{ property: "og:type", content: ${q(m.openGraph.type)} }`,
        `{ property: "og:site_name", content: ${q(m.openGraph.siteName)} }`,
        `{ property: "og:title", content: ${q(m.openGraph.title)} }`,
        `{ property: "og:description", content: ${q(m.openGraph.description)} }`,
        `{ property: "og:url", content: ${q(m.canonical)} }`,
        ...(m.openGraph.image ? [`{ property: "og:image", content: ${q(m.openGraph.image)} }`] : []),
        `{ name: "twitter:card", content: ${q(m.twitter.card)} }`,
        `{ name: "twitter:title", content: ${q(m.twitter.title)} }`,
        `{ name: "twitter:description", content: ${q(m.twitter.description)} }`,
        ...(m.twitter.image ? [`{ name: "twitter:image", content: ${q(m.twitter.image)} }`] : []),
        `{ "script:ld+json": jsonLd }`,
      ];
      return {
        file: "app/routes/<route>.jsx",
        language: "jsx",
        code: `const jsonLd = ${jsonLdJs(jsonLd)};

export function meta() {
  return [
${entries.map((e) => `    ${e},`).join("\n")}
  ];
}`,
      };
    }

    case "astro":
      return {
        file: "src/pages/<route>.astro (or pass these as props to your layout's <head>)",
        language: "astro",
        code: `---
const jsonLd = ${jsonLdJs(jsonLd)};
---
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
${indent(headTags(m), 4)}
    <script type="application/ld+json" set:html={JSON.stringify(jsonLd).replace(/</g, "\\\\u003c")} />
  </head>
  <body>
    <!-- page content; render Neuctra UI components as React islands -->
  </body>
</html>`,
      };

    case "tanstack-start": {
      const meta = [
        `{ title: ${q(m.title)} }`,
        `{ name: "description", content: ${q(m.description)} }`,
        `{ name: "robots", content: ${q(m.robots)} }`,
        `{ property: "og:type", content: ${q(m.openGraph.type)} }`,
        `{ property: "og:site_name", content: ${q(m.openGraph.siteName)} }`,
        `{ property: "og:title", content: ${q(m.openGraph.title)} }`,
        `{ property: "og:description", content: ${q(m.openGraph.description)} }`,
        `{ property: "og:url", content: ${q(m.canonical)} }`,
        ...(m.openGraph.image ? [`{ property: "og:image", content: ${q(m.openGraph.image)} }`] : []),
        `{ name: "twitter:card", content: ${q(m.twitter.card)} }`,
        `{ name: "twitter:title", content: ${q(m.twitter.title)} }`,
        `{ name: "twitter:description", content: ${q(m.twitter.description)} }`,
      ];
      return {
        file: "src/routes/<route>.jsx",
        language: "jsx",
        code: `import { createFileRoute } from "@tanstack/react-router";

const jsonLd = ${jsonLdJs(jsonLd)};

export const Route = createFileRoute("/<route>")({
  head: () => ({
    meta: [
${meta.map((e) => `      ${e},`).join("\n")}
    ],
    links: [{ rel: "canonical", href: ${q(m.canonical)} }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(jsonLd).replace(/</g, "\\\\u003c") },
    ],
  }),
  component: Page,
});

function Page() {
  return <>{/* page content */}</>;
}`,
      };
    }

    case "gatsby":
      return {
        file: "src/pages/<route>.jsx",
        language: "jsx",
        code: `const jsonLd = ${jsonLdJs(jsonLd)};

export const Head = () => (
  <>
${indent(headTags(m), 4)}
${indent(JSX_SCRIPT.split("\n"), 4)}
  </>
);

export default function Page() {
  return <>{/* page content */}</>;
}`,
      };

    case "html":
    default:
      return {
        file: "<head> of the page's HTML",
        language: "html",
        code: `${headTags(m).join("\n")}
<script type="application/ld+json">
${jsonLdString(jsonLd)}
</script>`,
      };
  }
}

function followUps(input) {
  const items = [];
  if (!input.faqs?.length && !["contact", "home"].includes(input.pageType)) {
    items.push("AEO: add 4 to 8 real, page-specific FAQs, render them visibly on the page and pass them back in as faqs so the FAQPage schema matches word for word.");
  }
  if (["docs", "blog", "product", "landing"].includes(input.pageType)) {
    items.push("AEO: phrase key H2s as questions and put a direct 40 to 60 word answer right under each.");
  }
  items.push("GEO: add this URL to /llms.txt and to sitemap.xml (with lastmod) as part of the build.");
  if (!input.sameAs?.length) {
    items.push("GEO: pass sameAs (GitHub, LinkedIn, X, npm, ...) so the Organization entity is unambiguous to search and AI engines.");
  }
  if (["docs", "blog"].includes(input.pageType) && !input.dateModified) {
    items.push("Show a visible \"Last updated\" date and pass dateModified: generative engines favour fresh sources.");
  }
  if (input.pageType === "tool") {
    items.push("Render the H1, lead, article sections, FAQ and JSON-LD on the server; only the interactive widget may be client-only (ssr: false).");
    items.push("Link 3 to 4 related tools from the route registry with the framework's Link component.");
  }
  if (input.pageType === "category") {
    items.push("Put an H2 above the grid of items so headings go H1 > H2 > H3.");
  }
  if (input.framework === "react-vite") {
    items.push("Prerender this route or move to an SSR framework: metadata added on the client is invisible to most AI crawlers.");
  }
  items.push("Validate the JSON-LD with Google's Rich Results Test and validator.schema.org before shipping.");
  return items;
}

export function generatePageSeo(raw) {
  const input = { language: "en", framework: "html", ...raw };
  const title = buildTitle(input);
  const description = buildDescription(input);
  const meta = { title: title.value, description: description.value };
  const schema = buildSchemaGraph(input, meta);
  const m = buildMetaObject(input, meta);
  const snippet = renderSnippet(input.framework, m, schema.jsonLd);

  return {
    title: { value: title.value, length: title.length },
    description: { value: description.value, length: description.length },
    canonical: m.canonical,
    robots: m.robots,
    openGraph: m.openGraph,
    twitter: m.twitter,
    jsonLd: schema.jsonLd,
    snippet: { framework: input.framework, ...snippet },
    warnings: [
      ...title.warnings,
      ...description.warnings,
      ...schema.warnings,
      ...(input.ogImage
        ? []
        : ["No ogImage: every page (including category and static pages) needs a 1200x630 og:image, or shares show no preview."]),
    ],
    followUps: followUps(input),
  };
}

// ---------------------------------------------------------------------------
// Built-HTML parsing (regex-based, good enough for audit extraction)
// ---------------------------------------------------------------------------

function decodeEntities(text) {
  return text
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function stripTags(html) {
  return decodeEntities(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

function attr(tag, name) {
  const m = tag.match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  return m ? decodeEntities(m[1] ?? m[2] ?? m[3] ?? "") : undefined;
}

function findMeta(head, key, value) {
  for (const tag of head.match(/<meta\b[^>]*>/gi) ?? []) {
    if ((attr(tag, key) ?? "").toLowerCase() === value) return attr(tag, "content");
  }
  return undefined;
}

/** Top-level entity types per JSON-LD block: root object, root array items, or @graph items. */
function topLevelJsonLdTypes(html) {
  const types = [];
  const errors = [];
  const blocks = html.match(/<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi) ?? [];
  for (const block of blocks) {
    const body = block.replace(/^<script\b[^>]*>/i, "").replace(/<\/script>$/i, "");
    try {
      const data = JSON.parse(body);
      const roots = Array.isArray(data) ? data : [data];
      for (const root of roots) {
        const nodes = Array.isArray(root?.["@graph"]) ? root["@graph"] : [root];
        for (const node of nodes) {
          const t = node?.["@type"];
          if (Array.isArray(t)) types.push(...t);
          else if (t) types.push(t);
        }
      }
    } catch {
      errors.push(body.slice(0, 60));
    }
  }
  return { types, blocks: blocks.length, errors };
}

/** Extracts every audit input it can from a page's built/server-rendered HTML. */
export function parseHtmlForAudit(html) {
  const headMatch = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i);
  const head = headMatch ? headMatch[1] : html;
  const bodyMatch = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i);
  const body = bodyMatch ? bodyMatch[1] : html;
  const mainMatch = body.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  const content = (mainMatch ? mainMatch[1] : body)
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<svg\b[\s\S]*?<\/svg>/gi, " ");

  const titleMatch = head.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  const canonicalTag = (head.match(/<link\b[^>]*>/gi) ?? []).find((t) => (attr(t, "rel") ?? "").toLowerCase() === "canonical");
  const robots = findMeta(head, "name", "robots") ?? "";
  const headings = [...content.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => ({
    level: Number(m[1]),
    text: stripTags(m[2]),
  }));
  const imgs = content.match(/<img\b[^>]*>/gi) ?? [];
  const firstP = content.match(/<p\b[^>]*>([\s\S]*?)<\/p>/i);
  const text = stripTags(content);
  const jsonLd = topLevelJsonLdTypes(html);

  return {
    title: titleMatch ? stripTags(titleMatch[1]) : undefined,
    description: findMeta(head, "name", "description"),
    canonical: canonicalTag ? attr(canonicalTag, "href") ?? "" : "",
    noindex: /noindex/i.test(robots),
    hasOgImage: !!findMeta(head, "property", "og:image"),
    hasTwitterImage: !!findMeta(head, "name", "twitter:image"),
    h1s: headings.filter((h) => h.level === 1).map((h) => h.text),
    headings,
    jsonLdTypes: jsonLd.types,
    jsonLdErrors: jsonLd.errors,
    imagesMissingAlt: imgs.filter((t) => attr(t, "alt") === undefined).length,
    wordCount: text ? text.split(" ").length : 0,
    firstParagraph: firstP ? stripTags(firstP[1]) : undefined,
  };
}

// ---------------------------------------------------------------------------
// Audit
// ---------------------------------------------------------------------------

function includesKeyword(text, keyword) {
  return !!text && text.toLowerCase().includes(keyword.toLowerCase());
}

function sameUrl(a, b) {
  const norm = (u) => u.replace(/[?#].*$/, "").replace(/\/+$/, "").toLowerCase();
  return norm(a) === norm(b);
}

const WEBPAGE_TYPES = ["WebPage", "AboutPage", "ContactPage", "CollectionPage", "FAQPage", "ItemPage", "ProfilePage", "SearchResultsPage", "CheckoutPage", "QAPage"];

export function auditPageSeo(input) {
  // Built HTML fills in anything not passed explicitly; explicit fields win.
  const parsed = input.html ? parseHtmlForAudit(input.html) : null;
  const p = { ...(parsed ?? {}), ...Object.fromEntries(Object.entries(input).filter(([k, v]) => k !== "html" && v !== undefined)) };
  const results = [];
  const add = (status, check, detail, fix) =>
    results.push({ status, check, detail, ...(fix && { fix }) });

  // Title
  if (!p.title) add("fail", "Title", "No <title>.", "Add a unique 50 to 60 character title: primary keyword first, brand last.");
  else if (p.title.length > 70) add("fail", "Title", `${p.title.length} characters: badly truncated in results.`, "Cut to 60 characters or fewer.");
  else if (p.title.length > TITLE_MAX) add("warn", "Title", `${p.title.length} characters: may be truncated.`, "Aim for 50 to 60 characters.");
  else if (p.title.length < 30) add("warn", "Title", `${p.title.length} characters: too short to compete.`, "Add a qualifier (benefit, audience or use case).");
  else add("pass", "Title", `${p.title.length} characters.`);

  // Brand suffix: exactly once, at the end
  if (p.title) {
    const parts = p.title.split(/\s+[|\u2013\u2014-]\s+/).map((x) => x.trim().toLowerCase());
    const last = parts[parts.length - 1];
    if (parts.length > 2 && parts[parts.length - 2] === last) {
      add("fail", "Title brand suffix", `Suffix is doubled: "${p.title}".`, "Add the brand in one place only (title template or metadata builder), and never hand-type it into page titles. In Next.js use title: { absolute } when the builder already adds it.");
    } else if (p.brandName) {
      const brand = p.brandName.toLowerCase();
      const count = p.title.toLowerCase().split(brand).length - 1;
      if (count === 0) add("warn", "Title brand suffix", `No "${p.brandName}" in the title.`, `End every title with " | ${p.brandName}" from one shared template, so branding is consistent site-wide.`);
      else if (count > 1) add("fail", "Title brand suffix", `"${p.brandName}" appears ${count} times.`, "Remove the hand-typed suffix; let the shared template add it once.");
      else if (!p.title.toLowerCase().trim().endsWith(brand)) add("warn", "Title brand suffix", "Brand is not at the end.", `Use the site-wide pattern "Keyword: Benefit | ${p.brandName}".`);
      else add("pass", "Title brand suffix", "Present once, at the end.");
    }
  }

  // Description
  if (!p.description) add("fail", "Meta description", "Missing.", "Add a unique 140 to 155 character description with the value and a reason to click.");
  else if (p.description.length > 200) add("fail", "Meta description", `${p.description.length} characters.`, "Cut to 155 characters or fewer.");
  else if (p.description.length > 160) add("warn", "Meta description", `${p.description.length} characters: will be truncated.`, "Cut to 155 characters or fewer.");
  else if (p.description.length < 120) add("warn", "Meta description", `${p.description.length} characters: too short.`, "Expand to 140 to 155 characters.");
  else add("pass", "Meta description", `${p.description.length} characters.`);

  // H1
  if (p.h1s) {
    if (p.h1s.length === 0) add("fail", "H1", "No H1 on the page.", (p.wordCount ?? 0) < 150 ? "The page looks client-rendered (almost no text in the HTML). Render the H1, content, FAQ and JSON-LD on the server; wrap only the interactive widget in dynamic(..., { ssr: false })." : "Add exactly one H1 that matches the search intent.");
    else if (p.h1s.length > 1) add("fail", "H1", `${p.h1s.length} H1s found.`, "Keep exactly one H1; demote the others to H2.");
    else add("pass", "H1", `"${p.h1s[0]}"`);
  }

  // Heading order and AEO question headings
  if (p.headings?.length) {
    let prev = 1;
    const skips = [];
    for (const h of p.headings) {
      if (h.level > prev + 1) skips.push(`H${prev} -> H${h.level} ("${h.text}")`);
      prev = h.level;
    }
    if (skips.length) add("warn", "Heading hierarchy", `Skipped levels: ${skips.join("; ")}.`, "Step down one level at a time (H2 -> H3), never skip.");
    else add("pass", "Heading hierarchy", "No skipped levels.");

    const h2s = p.headings.filter((h) => h.level === 2);
    const questions = h2s.filter((h) => /\?\s*$|^(how|what|why|when|where|which|who|can|does|do|is|are|should)\b/i.test(h.text.trim()));
    if (h2s.length && !questions.length) add("warn", "AEO question headings", "No H2 is phrased as a question.", "Rewrite 2 or more H2s as the questions people search, each followed by a 40 to 60 word direct answer.");
    else if (questions.length) add("pass", "AEO question headings", `${questions.length} question-style H2s.`);
  }

  // Keyword placement
  if (p.primaryKeyword) {
    const k = p.primaryKeyword;
    if (p.title !== undefined) includesKeyword(p.title, k) ? add("pass", "Keyword in title", `Contains "${k}".`) : add("warn", "Keyword in title", `Missing "${k}".`, "Put the primary keyword near the start of the title.");
    if (p.h1s?.length) includesKeyword(p.h1s[0], k) ? add("pass", "Keyword in H1", `Contains "${k}".`) : add("warn", "Keyword in H1", `Missing "${k}".`, "Use the primary keyword or a close variant in the H1.");
    if (p.firstParagraph !== undefined) {
      const first100 = p.firstParagraph.split(/\s+/).slice(0, 100).join(" ");
      includesKeyword(first100, k) ? add("pass", "Keyword early in content", "Appears in the first 100 words.") : add("warn", "Keyword early in content", "Not in the first 100 words.", "Mention the primary keyword naturally in the opening paragraph.");
    }
    const slug = p.url.replace(/^https?:\/\/[^/]+/, "").toLowerCase();
    const slugWords = k.toLowerCase().split(/\s+/).filter((w) => w.length > 2);
    if (slugWords.length && !slugWords.some((w) => slug.includes(w))) add("warn", "Keyword in URL", `URL path "${slug || "/"}" has no keyword words.`, "Use a short kebab-case slug containing the keyword (only for new pages; 301 any change).");
  }

  // URL shape
  const path = p.url.replace(/^https?:\/\/[^/]+/, "");
  const urlIssues = [];
  if (/[A-Z]/.test(path)) urlIssues.push("uppercase letters");
  if (/_/.test(path)) urlIssues.push("underscores");
  if (/\?/.test(path)) urlIssues.push("query string");
  if (p.url.length > 100) urlIssues.push(`${p.url.length} characters long`);
  if (!p.url.startsWith("https://")) urlIssues.push("not https");
  urlIssues.length ? add("warn", "URL", `Issues: ${urlIssues.join(", ")}.`, "Use short, lowercase, kebab-case https URLs without parameters.") : add("pass", "URL", "Clean.");

  // Canonical
  if (p.canonical === undefined) add("warn", "Canonical", "Not provided to the audit.", "Check the page has <link rel=\"canonical\"> with an absolute URL.");
  else if (!p.canonical) add("fail", "Canonical", "Missing.", `Add <link rel="canonical" href="${p.url}">.`);
  else if (!/^https?:\/\//.test(p.canonical)) add("fail", "Canonical", `Relative: "${p.canonical}".`, "Use an absolute https URL.");
  else if (!sameUrl(p.canonical, p.url)) add("warn", "Canonical", `Points elsewhere: ${p.canonical}.`, "Fine if intentional (duplicate content); otherwise point it at this URL.");
  else add("pass", "Canonical", "Self-referencing and absolute.");

  // Robots
  if (p.noindex) add("warn", "Indexing", "Page is noindex.", "Remove noindex if this page should rank or be cited.");

  // Social image
  if (p.hasOgImage === false) add("warn", "OpenGraph image", "No og:image.", "Add a 1200x630 og:image and twitter:image. In Next.js, a page-level openGraph object replaces the parent's, so repeat images in it.");
  else if (p.hasOgImage) add("pass", "OpenGraph image", "Present.");

  // Structured data
  if (p.jsonLdErrors?.length) {
    add("fail", "Schema: JSON syntax", `${p.jsonLdErrors.length} JSON-LD block(s) don't parse.`, "Fix the JSON (usually an unescaped quote or trailing comma); invalid blocks are ignored entirely.");
  }
  if (p.jsonLdTypes) {
    const types = p.jsonLdTypes;
    const counts = types.reduce((acc, t) => ({ ...acc, [t]: (acc[t] ?? 0) + 1 }), {});
    const dupes = Object.entries(counts).filter(([t, n]) => n > 1 && t !== "ItemList");
    if (dupes.length) add("fail", "Schema: duplicate nodes", `Duplicated: ${dupes.map(([t, n]) => `${t} x${n}`).join(", ")}.`, "Emit each type once per page. Usually a shared page shell and the page itself both output JSON-LD: keep the shell, pass the data into it, delete the page-level copy.");
    else if (types.length) add("pass", "Schema: duplicate nodes", "No duplicated node types.");
    const pageNodes = types.filter((t) => WEBPAGE_TYPES.includes(t) && t !== "FAQPage");
    if (pageNodes.length) add("pass", "Schema: WebPage", `Present (${pageNodes[0]}).`);
    else if (types.includes("FAQPage")) add("warn", "Schema: WebPage", "Only an FAQPage node stands in for the page.", "Fine for a dedicated FAQ page. Any other page needs its own WebPage (or subtype) node, with the FAQPage linked to it via isPartOf.");
    else add("warn", "Schema: WebPage", "No WebPage (or subtype) node.", "Weave a WebPage node linked to WebSite and Organization (use generate_page_seo).");
    const isHome = sameUrl(p.url, p.url.replace(/^(https?:\/\/[^/]+).*$/, "$1"));
    if (!isHome) types.includes("BreadcrumbList") ? add("pass", "Schema: BreadcrumbList", "Present.") : add("warn", "Schema: BreadcrumbList", "Missing.", "Add a BreadcrumbList matching the visible breadcrumb/URL path.");
    types.includes("Organization") ? add("pass", "Schema: Organization", "Present.") : add("warn", "Schema: Organization", "Missing.", "Add Organization with logo and sameAs, referenced by @id from every page.");
    if (p.faqCount > 0 && !types.includes("FAQPage")) add("warn", "Schema: FAQPage", `${p.faqCount} visible FAQs but no FAQPage schema.`, "Mark up the visible FAQs as FAQPage with identical text.");
    if (types.includes("FAQPage") && p.faqCount === 0) add("fail", "Schema: FAQPage", "FAQPage schema but no visible FAQs.", "Structured data must match visible content: show the FAQs or remove the markup.");
  }

  // FAQs
  if (p.faqCount !== undefined) {
    if (p.faqCount === 0) add("warn", "AEO: FAQs", "No FAQ block.", "Add 4 to 8 real, page-specific questions with 40 to 80 word answers.");
    else if (p.faqCount > 10) add("warn", "AEO: FAQs", `${p.faqCount} FAQs.`, "Keep the 4 to 8 most-asked; move the rest to a dedicated FAQ page.");
    else add("pass", "AEO: FAQs", `${p.faqCount} FAQs.`);
  }

  // Content depth
  if (p.wordCount !== undefined) {
    p.wordCount < 300 ? add("warn", "Content depth", `${p.wordCount} words: thin.`, "Cover the topic fully: the main answer, follow-up questions and objections (usually 600+ words for guides).") : add("pass", "Content depth", `${p.wordCount} words.`);
  }

  // Images
  if (p.imagesMissingAlt !== undefined) {
    p.imagesMissingAlt > 0 ? add("fail", "Image alt text", `${p.imagesMissingAlt} images without alt.`, "Add descriptive alt to meaningful images and alt=\"\" to decorative ones.") : add("pass", "Image alt text", "All images have alt.");
  }

  const weight = { pass: 1, warn: 0.5, fail: 0 };
  const score = results.length
    ? Math.round((results.reduce((s, r) => s + weight[r.status], 0) / results.length) * 100)
    : 0;
  const order = { fail: 0, warn: 1, pass: 2 };
  results.sort((a, b) => order[a.status] - order[b.status]);

  return {
    score,
    ...(parsed && {
      extracted: {
        title: parsed.title,
        description: parsed.description,
        canonical: parsed.canonical,
        h1s: parsed.h1s,
        jsonLdTypes: parsed.jsonLdTypes,
        wordCount: parsed.wordCount,
        imagesMissingAlt: parsed.imagesMissingAlt,
        hasOgImage: parsed.hasOgImage,
      },
    }),
    summary: {
      fail: results.filter((r) => r.status === "fail").length,
      warn: results.filter((r) => r.status === "warn").length,
      pass: results.filter((r) => r.status === "pass").length,
    },
    results,
  };
}
