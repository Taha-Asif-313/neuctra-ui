import { SITE_URL } from "../site";

export function softwareApplicationSchema() {
  return {
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#software`,
    name: "Neuctra UI",
    description:
      "Modern React UI library for SaaS applications with Tailwind CSS components",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    keywords:
      "React UI library for SaaS, Tailwind React components for SaaS apps, SaaS dashboard UI React Tailwind, React authentication UI Tailwind, React form builder Tailwind, modern React UI kit for startups, reusable SaaS components React, Tailwind admin dashboard React",
  };
}
