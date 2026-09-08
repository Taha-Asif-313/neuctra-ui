/** Wraps an array of { question, answer } pairs into FAQPage JSON-LD. */
export function faqSchema(qaPairs) {
  return {
    "@type": "FAQPage",
    mainEntity: qaPairs.map((qa) => ({
      "@type": "Question",
      name: qa.question,
      acceptedAnswer: { "@type": "Answer", text: qa.answer },
    })),
  };
}

/**
 * Generates the 3 canned Q&As used on every component doc page (AEO/GEO:
 * consistent, real answers an LLM/answer-engine can cite directly). Also
 * rendered visibly on the page itself (see components/ComponentFaq.js) so
 * the structured data mirrors what a reader actually sees.
 *
 * @param {string} name - component display name, e.g. "Button"
 * @param {object} [opts]
 * @param {string[]} [opts.variants]
 * @param {string[]} [opts.sizes]
 */
export function buildComponentFaq(name, { variants, sizes } = {}) {
  const variantsAndSizes = [];
  if (variants?.length) variantsAndSizes.push(`variants: ${variants.join(", ")}`);
  if (sizes?.length) variantsAndSizes.push(`sizes: ${sizes.join(", ")}`);

  return [
    {
      question: `How do I install and import the ${name} component?`,
      answer: `Install the @neuctra/ui package, then import it with: import { ${name} } from "@neuctra/ui";`,
    },
    {
      question: variantsAndSizes.length
        ? `What variants and sizes does ${name} support?`
        : `Can I customize the ${name} component's appearance?`,
      answer: variantsAndSizes.length
        ? `${name} supports ${variantsAndSizes.join(" and ")}. Use the variant and size props to switch between them, or pass a className to layer on custom Tailwind CSS classes.`
        : `Yes. ${name} accepts a className prop for custom Tailwind CSS classes, so you can adjust spacing, layout, and styling without overriding the component internals.`,
    },
    {
      question: `Is the ${name} component accessible?`,
      answer: `${name} is built with semantic HTML and standard ARIA attributes, and supports keyboard navigation and focus states out of the box, so it works well with screen readers and keyboard-only users.`,
    },
  ];
}
