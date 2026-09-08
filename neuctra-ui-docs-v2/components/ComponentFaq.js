/**
 * Renders the same Q&A pairs that feed a page's FAQPage JSON-LD (see
 * lib/seo/schemas/faqSchema.js) — keeping the visible content and the
 * structured data in sync is the point: an answer engine should be able to
 * cite exactly what a human reader sees.
 */
export default function ComponentFaq({ qa }) {
  if (!qa?.length) return null;

  return (
    <section>
      <h2 className="text-2xl font-semibold text-white mb-4">
        Frequently Asked Questions
      </h2>
      <div className="space-y-5">
        {qa.map((item) => (
          <div key={item.question}>
            <h3 className="text-base font-medium text-white mb-1.5">
              {item.question}
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              {item.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
