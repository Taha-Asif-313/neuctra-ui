"use client";

import React from "react";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import CodeBlock from "../../components/Docs/CodeBlock";
import Metadata from "../../MetaData";
import { Accordion } from "@neuctra/ui";
import { Check, X } from "lucide-react";

const items = [
  {
    title: "What is Neuctra UI?",
    content: "Neuctra UI is a modern, customizable React component library.",
  },
  {
    title: "Is it customizable?",
    content: "Yes, fully customizable via className and inline styles.",
  },
  {
    title: "Does it support dark mode?",
    content: "Yes, built-in dark mode support using Tailwind classes.",
  },
];

const AccordionDocs = () => {
  return (
    <>
      <Metadata
        title="Accordion Component — Neuctra UI"
        description="Learn how to use the Accordion component in Neuctra UI — fully customizable, responsive, and supports className & inline styling overrides."
        keywords="Neuctra UI Accordion, React accordion component, collapsible UI, customizable accordion, UI library"
      />

      <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
        <div className="mx-auto px-4 space-y-10">

          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              Accordion Component
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed">
              The <span className="text-primary font-semibold">Accordion</span> component is a flexible,
              fully customizable collapsible UI element. Supports multiple open items, custom rendering,
              className overrides, inline styles, and smooth animations.
            </p>
          </header>

          {/* Import */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Import Component
            </h2>
            <CodeBlock
              language="react"
              code={`import { Accordion } from "@neuctra/ui";`}
            />
          </section>

          {/* Basic Usage */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Example
            </h2>
            <CodePreviewBlock
              language="jsx"
              code={`<Accordion items={items} />`}
              previewContent={<Accordion items={items} />}
            />
          </section>

          {/* Advanced Usage */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Advanced Usage
            </h2>

            <div className="space-y-6">

              <CodePreviewBlock
                language="jsx"
                code={`<Accordion items={items} allowMultiple defaultOpen={[0]} />`}
                previewContent={<Accordion items={items} allowMultiple defaultOpen={[0]} />}
              />

              <CodePreviewBlock
                language="jsx"
                code={`<Accordion
  items={items}
  className="max-w-xl mx-auto"
  itemClassName="rounded-xl border"
  headerClassName="bg-zinc-800 text-white"
  contentClassName="bg-zinc-900"
/>`}
                previewContent={
                  <Accordion
                    items={items}
                    className="max-w-xl mx-auto"
                    itemClassName="rounded-xl border"
                    headerClassName="bg-zinc-800 text-white"
                    contentClassName="bg-zinc-900"
                  />
                }
              />

              <CodePreviewBlock
                language="jsx"
                code={`<Accordion
  items={items}
  headerStyle={{ backgroundColor: "#1f2937", color: "white" }}
  contentStyle={{ backgroundColor: "#111827" }}
/>`}
                previewContent={
                  <Accordion
                    items={items}
                    headerStyle={{ backgroundColor: "#1f2937", color: "white" }}
                    contentStyle={{ backgroundColor: "#111827" }}
                  />
                }
              />

            </div>
          </section>

          {/* Props Table */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Props Table
            </h2>

            <div className="border border-zinc-800 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-zinc-900 text-gray-200">
                  <tr>
                    <th className="text-left p-3">Prop</th>
                    <th className="text-left p-3">Type</th>
                    <th className="text-left p-3">Default</th>
                    <th className="text-left p-3">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800 text-gray-300">

                  <tr><td className="p-3">items</td><td className="p-3">AccordionItem[]</td><td className="p-3">—</td><td className="p-3">List of accordion items</td></tr>
                  <tr><td className="p-3">allowMultiple</td><td className="p-3">boolean</td><td className="p-3">false</td><td className="p-3">Allow multiple open items</td></tr>
                  <tr><td className="p-3">defaultOpen</td><td className="p-3">number[]</td><td className="p-3">[]</td><td className="p-3">Indexes open by default</td></tr>

                  <tr><td className="p-3">className</td><td className="p-3">string</td><td className="p-3">—</td><td className="p-3">Root class</td></tr>
                  <tr><td className="p-3">style</td><td className="p-3">CSSProperties</td><td className="p-3">—</td><td className="p-3">Root inline styles</td></tr>

                  <tr><td className="p-3">itemClassName</td><td className="p-3">string</td><td className="p-3">—</td><td className="p-3">Item wrapper class</td></tr>
                  <tr><td className="p-3">headerClassName</td><td className="p-3">string</td><td className="p-3">—</td><td className="p-3">Header class</td></tr>
                  <tr><td className="p-3">contentClassName</td><td className="p-3">string</td><td className="p-3">—</td><td className="p-3">Content class</td></tr>

                  <tr><td className="p-3">headerStyle</td><td className="p-3">CSSProperties</td><td className="p-3">—</td><td className="p-3">Header inline styles</td></tr>
                  <tr><td className="p-3">contentStyle</td><td className="p-3">CSSProperties</td><td className="p-3">—</td><td className="p-3">Content inline styles</td></tr>

                  <tr><td className="p-3">hoverClassName</td><td className="p-3">string</td><td className="p-3">—</td><td className="p-3">Custom hover classes</td></tr>
                  <tr><td className="p-3">hoverStyle</td><td className="p-3">CSSProperties</td><td className="p-3">—</td><td className="p-3">Custom hover inline styles</td></tr>

                  <tr><td className="p-3">duration</td><td className="p-3">number</td><td className="p-3">300</td><td className="p-3">Animation duration (ms)</td></tr>
                  <tr><td className="p-3">iconOpen</td><td className="p-3">ReactNode</td><td className="p-3">—</td><td className="p-3">Custom open icon</td></tr>
                  <tr><td className="p-3">iconClose</td><td className="p-3">ReactNode</td><td className="p-3">—</td><td className="p-3">Custom close icon</td></tr>

                  <tr><td className="p-3">renderItem</td><td className="p-3">function</td><td className="p-3">—</td><td className="p-3">Fully custom render logic</td></tr>

                </tbody>
              </table>
            </div>
          </section>

          {/* Common Mistakes */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Common Mistakes
            </h2>

            <div className="space-y-4 text-sm text-gray-300">

              <div className="flex items-start gap-2 text-red-500">
                <X size={16} className="mt-1" />
                <div>
                  <code>{'<Accordion defaultOpen={1} />'}</code>
                  <p className="text-gray-500 text-xs mt-1">
                    defaultOpen must be an array of indexes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-red-500">
                <X size={16} className="mt-1" />
                <div>
                  <code>{'<Accordion items={[]} />'}</code>
                  <p className="text-gray-500 text-xs mt-1">
                    Ensure items array is not empty.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-green-500">
                <Check size={16} className="mt-1" />
                <div>
                  <code>{'<Accordion className="max-w-lg" />'}</code>
                  <p className="text-gray-500 text-xs mt-1">
                    Use className for layout control.
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* Pro Tips */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              Pro Tips
            </h2>

            <ul className="list-disc list-inside text-gray-200 space-y-1">
              <li>Use <code>allowMultiple</code> for FAQ-style layouts.</li>
              <li>Use <code>renderItem</code> for full custom UI control.</li>
              <li>Combine className + style for maximum flexibility.</li>
              <li>Keep content lightweight for better performance.</li>
              <li>Use Tailwind dark classes for automatic dark mode.</li>
            </ul>
          </section>

          {/* Footer */}
          <footer className="pt-8 border-t border-gray-800 text-sm text-gray-400">
            Built with <span className="text-primary">React</span>,{" "}
            <span className="text-primary">Tailwind CSS</span> &{" "}
            <span className="text-primary">TypeScript</span>.
          </footer>

        </div>
      </div>
    </>
  );
};

export default AccordionDocs;
