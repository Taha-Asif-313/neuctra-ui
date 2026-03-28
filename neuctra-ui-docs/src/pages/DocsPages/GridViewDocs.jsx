"use client";

import React from "react";
import { GridView } from "@neuctra/ui";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import DocsFooter from "../../components/Docs/DocsFooter";
import Metadata from "../../MetaData";

const GridViewDocs = () => {
  return (
    <>
      <Metadata
        title="GridView Component — Neuctra UI"
        description="Learn how to use the GridView component in Neuctra UI — a responsive, prop-driven grid layout system for React."
        keywords="Neuctra UI GridView, React grid layout, CSS grid React, responsive grid, Tailwind grid, Neuctra components"
        image="https://ui.neuctra.com/og/gridview-docs-preview.png"
        canonical="https://ui.neuctra.com/docs/gridview"
      />

      <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4 space-y-10">

          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              GridView Component
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
              The <span className="text-primary font-semibold">GridView</span>{" "}
              component is a simple and powerful way to build responsive layouts
              using CSS Grid. You can control columns, spacing, padding, and alignment
              directly with props — no complex CSS required.
            </p>
          </header>

          {/* Basic Example */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Example
            </h2>
            <p className="text-gray-300 mb-3">
              Create a grid with a fixed number of columns using{" "}
              <code className="text-primary">columns</code>.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<GridView columns={3} gap={4}>
  {[1, 2, 3, 4, 5, 6].map(i => (
    <div key={i} className="bg-blue-600 text-white p-4 rounded-lg text-center">
      Item {i}
    </div>
  ))}
</GridView>`}
              previewContent={
                <div className="p-6 bg-zinc-900 rounded-xl">
                  <GridView columns={3} gap={4}>
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div
                        key={i}
                        className="bg-blue-600 text-white p-4 rounded-lg text-center"
                      >
                        Item {i}
                      </div>
                    ))}
                  </GridView>
                </div>
              }
            />
          </section>

          {/* Responsive Example */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Responsive Layout
            </h2>
            <p className="text-gray-300 mb-3">
              You can define different column counts for different screen sizes
              using an object: <code>{`{ sm, md, lg }`}</code>.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<GridView columns={{ sm: 1, md: 2, lg: 4 }} gap={4}>
  {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
    <div key={i} className="bg-slate-700 text-white p-4 rounded text-center">
      Box {i}
    </div>
  ))}
</GridView>`}
              previewContent={
                <div className="p-6 bg-zinc-900 rounded-xl">
                  <GridView columns={{ sm: 1, md: 2, lg: 4 }} gap={4}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <div
                        key={i}
                        className="bg-slate-700 text-white p-4 rounded text-center"
                      >
                        Box {i}
                      </div>
                    ))}
                  </GridView>
                </div>
              }
            />
          </section>

          {/* Gap & Padding */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Gap & Padding
            </h2>
            <p className="text-gray-300 mb-3">
              Control spacing between items using <code>gap</code> and inner spacing using <code>padding</code>.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<GridView columns={2} gap={6} padding={6}>
  <div className="bg-indigo-500 text-white p-4 rounded">A</div>
  <div className="bg-indigo-500 text-white p-4 rounded">B</div>
</GridView>`}
              previewContent={
                <div className="p-6 bg-zinc-900 rounded-xl">
                  <GridView columns={2} gap={6} padding={6}>
                    <div className="bg-indigo-500 text-white p-4 rounded">A</div>
                    <div className="bg-indigo-500 text-white p-4 rounded">B</div>
                  </GridView>
                </div>
              }
            />
          </section>

          {/* Alignment */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Alignment
            </h2>
            <p className="text-gray-300 mb-3">
              Control how items are aligned inside the grid using{" "}
              <code>alignItems</code> and <code>justifyItems</code>.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<GridView
  columns={3}
  alignItems="center"
  justifyItems="center"
  className="h-40 bg-zinc-800"
>
  {[1, 2, 3].map(i => (
    <div key={i} className="bg-green-500 text-white px-4 py-2 rounded">
      Center {i}
    </div>
  ))}
</GridView>`}
              previewContent={
                <div className="p-6 bg-zinc-900 rounded-xl">
                  <GridView
                    columns={3}
                    alignItems="center"
                    justifyItems="center"
                    className=" bg-zinc-800"
                  >
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                      >
                        Center {i}
                      </div>
                    ))}
                  </GridView>
                </div>
              }
            />
          </section>

          {/* Custom Styling */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Custom Styling
            </h2>
            <p className="text-gray-300 mb-3">
              Use <code>className</code> to fully customize the grid container.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<GridView
  columns={2}
  className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 rounded-xl"
>
  <div className="bg-white text-black p-4 rounded">Card 1</div>
  <div className="bg-white text-black p-4 rounded">Card 2</div>
</GridView>`}
              previewContent={
                <GridView
                  columns={2}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 rounded-xl"
                >
                  <div className="bg-white text-black p-4 rounded text-center">
                    Card 1
                  </div>
                  <div className="bg-white text-black p-4 rounded text-center">
                    Card 2
                  </div>
                </GridView>
              }
            />
          </section>

          {/* Props Table */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Props</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left border border-zinc-800 text-sm">
                <thead className="bg-zinc-900 text-gray-300">
                  <tr>
                    <th className="px-4 py-2 border-r border-zinc-800">Prop</th>
                    <th className="px-4 py-2 border-r border-zinc-800">Type</th>
                    <th className="px-4 py-2">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  <tr>
                    <td className="px-4 py-2 text-primary">columns</td>
                    <td className="px-4 py-2">
                      number | {`{ sm, md, lg }`}
                    </td>
                    <td className="px-4 py-2">
                      Number of columns (supports responsive values).
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-primary">gap</td>
                    <td className="px-4 py-2">number | responsive</td>
                    <td className="px-4 py-2">
                      Space between grid items.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-primary">padding</td>
                    <td className="px-4 py-2">number | responsive</td>
                    <td className="px-4 py-2">
                      Padding inside the grid container.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-primary">alignItems</td>
                    <td className="px-4 py-2">
                      "start" | "center" | "end" | "stretch"
                    </td>
                    <td className="px-4 py-2">Vertical alignment.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-primary">justifyItems</td>
                    <td className="px-4 py-2">
                      "start" | "center" | "end" | "stretch"
                    </td>
                    <td className="px-4 py-2">Horizontal alignment.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-primary">className</td>
                    <td className="px-4 py-2">string</td>
                    <td className="px-4 py-2">Custom Tailwind classes.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-primary">children</td>
                    <td className="px-4 py-2">ReactNode</td>
                    <td className="px-4 py-2">Grid content.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <DocsFooter />
        </div>
      </div>
    </>
  );
};

export default GridViewDocs;