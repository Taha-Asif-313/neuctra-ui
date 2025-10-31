"use client";
import React from "react";
import { Accordion } from "@neuctra/ui"; // adjust import path if needed
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import DocsFooter from "../../components/Docs/DocsFooter";
import Metadata from "../../MetaData";

const AccordionDocs = () => {
  const accordionItems = [
    {
      title: "What is Neuctra?",
      content: (
        <p>
          Neuctra is a modern SaaS platform providing tools for developers,
          creators, and teams. It includes authentication, cloud tools,
          AI-powered productivity, and APIs.
        </p>
      ),
    },
    {
      title: "How do I use the Accordion?",
      content: (
        <p>
          Click on any header to expand or collapse the content. You can allow
          multiple items open at once, or restrict it to one at a time.
        </p>
      ),
    },
    {
      title: "Customization Options",
      content: (
        <p>
          You can customize colors, padding, border radius, icons, and
          transitions to match your application’s design system.
        </p>
      ),
    },
  ];

  return (
    <>
      <Metadata
        title="Accordion Component — Neuctra UI"
        description="Learn how to use the Accordion component from Neuctra UI — a flexible, accessible, and customizable React component for expanding and collapsing content sections."
        keywords="Neuctra UI Accordion, React Accordion component, UI library, Neuctra UI docs, Neuctra components, collapsible section, responsive accordion"
        image="https://ui.neuctra.com/og-images/accordion.png"
        ogTitle="Accordion Component — Neuctra UI"
        ogDescription="Explore the Accordion component in Neuctra UI. Beautiful, accessible, and customizable for modern React applications."
        twitterTitle="Accordion Component — Neuctra UI"
        twitterDescription="Master the Accordion component in Neuctra UI — create expandable, elegant content sections with ease."
        canonical="https://ui.neuctra.com/docs/accordion"
      />

      <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4 space-y-10">
          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              Accordion Component
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
              The <span className="text-primary font-semibold">Accordion</span>{" "}
              component provides expandable sections with smooth animations and
              flexible customization options. Ideal for FAQs, settings panels,
              or collapsible layouts.
            </p>
          </header>

          {/* Example 1: Basic Accordion */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Example
            </h2>
            <p className="text-gray-300 mb-3">
              A simple accordion example showing expandable content.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`const items = [
  { title: "What is Neuctra?", content: "Neuctra is a modern SaaS platform..." },
  { title: "How do I use the Accordion?", content: "Click on any header to expand or collapse the content." },
  { title: "Customization Options", content: "Change colors, padding, icons, and animations easily." },
];

<Accordion
  items={items}
  allowMultiple={false}
  defaultOpen={[0]}
  borderColor="#374151"
  backgroundColor="#1f2937"
  textColor="#f9fafb"
  hoverBgColor="#374151"
  hoverTextColor="#fff"
  contentBgColor="#111827"
  contentTextColor="#e5e7eb"
  borderRadius="0.75rem"
  paddingY="1rem"
  paddingX="1rem"
  contentPadding="1rem"
  fontSize="1rem"
  fontWeight={600}
  contentFontSize="0.95rem"
  contentFontWeight={400}
  iconOpen="−"
  iconClose="+"
  transitionDuration="300ms"
/>`}
              previewContent={
                <Accordion
                  items={accordionItems}
                  allowMultiple={false}
                  defaultOpen={[0]}
                  borderColor="#374151"
                  backgroundColor="#1f2937"
                  textColor="#f9fafb"
                  hoverBgColor="#374151"
                  hoverTextColor="#fff"
                  contentBgColor="#111827"
                  contentTextColor="#e5e7eb"
                  borderRadius="0.75rem"
                  paddingY="1rem"
                  paddingX="1rem"
                  contentPadding="1rem"
                  fontSize="1rem"
                  fontWeight={600}
                  contentFontSize="0.95rem"
                  contentFontWeight={400}
                  iconOpen="−"
                  iconClose="+"
                  transitionDuration="300ms"
                />
              }
            />
          </section>

          {/* Example 2: Multiple Open Items */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Allow Multiple Items Open
            </h2>
            <p className="text-gray-300 mb-3">
              Set <code className="text-primary">allowMultiple</code> to{" "}
              <code className="text-primary">true</code> to let users open
              multiple sections at once.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<Accordion items={items} allowMultiple />`}
              previewContent={<Accordion items={accordionItems} allowMultiple />}
            />
          </section>

          {/* Footer */}
          <DocsFooter />
        </div>
      </div>
    </>
  );
};

export default AccordionDocs;
