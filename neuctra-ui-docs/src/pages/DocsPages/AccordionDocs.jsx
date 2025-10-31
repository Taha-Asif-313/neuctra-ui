"use client";
import React from "react";
import { Accordion } from "@neuctra/ui"; // adjust import path
import DocsFooter from "../../components/Docs/DocsFooter";

const AccordionDocs = () => {
  const accordionItems = [
    {
      title: "What is Neuctra?",
      content: (
        <p>
          Neuctra is a modern SaaS platform providing tools for developers, creators, and teams. 
          It includes authentication, cloud tools, AI-powered productivity, and APIs.
        </p>
      ),
    },
    {
      title: "How do I use the Accordion?",
      content: (
        <p>
          Click on any header to expand or collapse the content. You can allow multiple items open at once, 
          or restrict to one open item.
        </p>
      ),
    },
    {
      title: "Customization Options",
      content: (
        <p>
          You can change colors, padding, font size, border radius, icons, and transition animations 
          to fit your app design.
        </p>
      ),
    },
  ];

  return (
    <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-4xl font-extrabold mb-3 text-white">Accordion Component</h1>
          <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
            The <span className="text-primary font-semibold">Accordion</span> component allows you 
            to show and hide content sections with smooth animations. Supports multiple open items, 
            customizable styles, icons, and more.
          </p>
        </header>

        {/* Accordion Demo */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">Demo Accordion</h2>
          <p className="text-gray-300 mb-3">
            Click on any section below to expand or collapse the content.
          </p>

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
        </section>

        <DocsFooter />
      </div>
    </div>
  );
};

export default AccordionDocs;
