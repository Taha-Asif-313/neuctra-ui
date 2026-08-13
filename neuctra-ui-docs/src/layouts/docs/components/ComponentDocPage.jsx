"use client";

import React from "react";
import Metadata from "../../../MetaData";
import CodeBlock from "./CodeBlock";
import CodePreviewBlock from "./CodePreviewBlock";
import DocsFooter from "./DocsFooter";
import { Accessibility } from "lucide-react";

/**
 * Shared, spec-driven documentation page.
 *
 * Keeps every component page consistent (heading hierarchy, responsive props
 * table, SEO metadata) while each page only supplies data:
 *
 *   <ComponentDocPage
 *     name="Slider"
 *     title="…full SEO title…"
 *     description="…meta + intro description…"
 *     keywords="a, b, c"
 *     importCode={`import { Slider } from "@neuctra/ui";`}
 *     examples={[{ title, description?, code, preview }]}
 *     props={[{ prop, type, default, description }]}
 *     a11y={["…notes…"]}
 *   />
 */
const ComponentDocPage = ({
  name,
  title,
  description,
  keywords,
  importCode,
  intro,
  examples = [],
  propsTable = [],
  propsNote,
  a11y = [],
}) => {
  return (
    <>
      <Metadata title={title} description={description} keywords={keywords} />

      <article className="font-primary min-h-screen">
        <div className="space-y-10">
          {/* Header */}
          <header>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
              {name} Component
            </h1>
            <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
              {intro ?? description}
            </p>
          </header>

          {/* Import */}
          {importCode && (
            <section aria-labelledby={`${name}-import`}>
              <h2
                id={`${name}-import`}
                className="text-xl sm:text-2xl font-semibold mb-3 text-white"
              >
                Import
              </h2>
              <CodeBlock code={importCode} />
            </section>
          )}

          {/* Examples */}
          {examples.map((example, i) => (
            <section key={i} aria-labelledby={`${name}-example-${i}`}>
              <h2
                id={`${name}-example-${i}`}
                className="text-xl sm:text-2xl font-semibold mb-2 text-white"
              >
                {example.title}
              </h2>
              {example.description && (
                <p className="text-sm text-gray-300 mb-4 max-w-3xl">
                  {example.description}
                </p>
              )}
              <CodePreviewBlock
                language="jsx"
                code={example.code}
                previewContent={
                  <div className="flex w-full flex-wrap items-center gap-4 py-4">
                    {example.preview}
                  </div>
                }
              />
            </section>
          ))}

          {/* Props table */}
          {propsTable.length > 0 && (
            <section aria-labelledby={`${name}-props`}>
              <h2
                id={`${name}-props`}
                className="text-xl sm:text-2xl font-semibold mb-2 text-white"
              >
                Props
              </h2>
              <p className="text-sm text-gray-400 mb-4">
                {propsNote ?? `All available props for the ${name} component.`}
              </p>

              {/* overflow-x-auto keeps the table usable on phones. */}
              <div className="border border-zinc-800 rounded-xl overflow-x-auto">
                <table className="w-full min-w-[640px] text-sm">
                  <thead className="bg-zinc-900 text-gray-200">
                    <tr>
                      <th scope="col" className="text-left p-3">Prop</th>
                      <th scope="col" className="text-left p-3">Type</th>
                      <th scope="col" className="text-left p-3">Default</th>
                      <th scope="col" className="text-left p-3">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800 text-gray-300">
                    {propsTable.map((row) => (
                      <tr key={row.prop}>
                        <td className="p-3 font-medium text-primary whitespace-nowrap">
                          {row.prop}
                        </td>
                        <td className="p-3 font-mono text-xs text-gray-300">
                          {row.type}
                        </td>
                        <td className="p-3 text-gray-400 whitespace-nowrap">
                          {row.default ?? "—"}
                        </td>
                        <td className="p-3">{row.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Accessibility */}
          {a11y.length > 0 && (
            <section aria-labelledby={`${name}-a11y`}>
              <h2
                id={`${name}-a11y`}
                className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white"
              >
                <Accessibility className="text-primary" size={22} />
                Accessibility
              </h2>
              <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
                {a11y.map((note, i) => (
                  <li key={i}>{note}</li>
                ))}
              </ul>
            </section>
          )}

          <DocsFooter />
        </div>
      </article>
    </>
  );
};

export default ComponentDocPage;
