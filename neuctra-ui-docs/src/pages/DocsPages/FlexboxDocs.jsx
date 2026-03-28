"use client";

import React from "react";
import { FlexView } from "@neuctra/ui";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import DocsFooter from "../../components/Docs/DocsFooter";
import Metadata from "../../MetaData";

const FlexViewDocs = () => {
  return (
    <>
      <Metadata
        title="FlexView Component — Neuctra UI"
        description="Learn how to use the FlexView component in Neuctra UI — a responsive flexbox layout system for React. Control direction, alignment, spacing, and wrapping with simple props."
        keywords="Neuctra UI FlexView, React flexbox layout, responsive flex layout, Tailwind flex utilities, UI layout system, Neuctra components"
      />

      <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4 space-y-10">
          
          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              FlexView Component
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
              <span className="text-primary font-semibold">FlexView</span> is a
              responsive flexbox wrapper that helps you build layouts easily.
              You can control direction, alignment, spacing, and wrapping using
              simple props — no need to write Tailwind classes manually.
            </p>
          </header>

          {/* Basic Example */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Example
            </h2>
            <p className="text-gray-300 mb-3">
              By default, items are arranged in a responsive layout (column on
              small screens, row on larger screens).
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<FlexView gap={4} padding={4}>
  <div className="bg-blue-600 text-white px-4 py-2 rounded">Item 1</div>
  <div className="bg-green-500 text-white px-4 py-2 rounded">Item 2</div>
  <div className="bg-yellow-500 text-black px-4 py-2 rounded">Item 3</div>
</FlexView>`}
              previewContent={
                <div className="p-6 bg-zinc-900 rounded-xl">
                  <FlexView gap={4} padding={4}>
                    <div className="bg-blue-600 text-white px-4 py-2 rounded">
                      Item 1
                    </div>
                    <div className="bg-green-500 text-white px-4 py-2 rounded">
                      Item 2
                    </div>
                    <div className="bg-yellow-500 text-black px-4 py-2 rounded">
                      Item 3
                    </div>
                  </FlexView>
                </div>
              }
            />
          </section>

          {/* Responsive Direction */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Responsive Direction
            </h2>
            <p className="text-gray-300 mb-3">
              Use responsive values to change layout based on screen size.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<FlexView
  direction={{ sm: "column", md: "row" }}
  gap={4}
>
  <div className="bg-blue-500 text-white px-4 py-2 rounded">Column on mobile</div>
  <div className="bg-emerald-500 text-white px-4 py-2 rounded">Row on desktop</div>
</FlexView>`}
              previewContent={
                <div className="p-6 bg-zinc-900 rounded-xl">
                  <FlexView
                    direction={{ sm: "column", md: "row" }}
                    gap={4}
                  >
                    <div className="bg-blue-500 text-white px-4 py-2 rounded">
                      Column on mobile
                    </div>
                    <div className="bg-emerald-500 text-white px-4 py-2 rounded">
                      Row on desktop
                    </div>
                  </FlexView>
                </div>
              }
            />
          </section>

          {/* Alignment */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Alignment & Justification
            </h2>
            <p className="text-gray-300 mb-3">
              Control how items align and distribute inside the container.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<FlexView align="center" justify="center" gap={4}>
  <div className="bg-red-400 px-4 py-2 rounded">A</div>
  <div className="bg-blue-400 px-4 py-2 rounded">B</div>
  <div className="bg-green-400 px-4 py-2 rounded">C</div>
</FlexView>`}
              previewContent={
                <div className="p-6 bg-zinc-900 rounded-xl">
                  <FlexView align="center" justify="center" gap={4}>
                    <div className="bg-red-400 px-4 py-2 rounded">A</div>
                    <div className="bg-blue-400 px-4 py-2 rounded">B</div>
                    <div className="bg-green-400 px-4 py-2 rounded">C</div>
                  </FlexView>
                </div>
              }
            />
          </section>

          {/* Wrap */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Wrapping Items
            </h2>
            <p className="text-gray-300 mb-3">
              Use <code className="text-primary">wrap</code> to control how items
              behave when they overflow.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<FlexView wrap="wrap" gap={4}>
  {Array.from({ length: 8 }).map((_, i) => (
    <div key={i} className="bg-cyan-500 text-black px-4 py-2 rounded">
      Item {i + 1}
    </div>
  ))}
</FlexView>`}
              previewContent={
                <div className="p-6 bg-zinc-900 rounded-xl">
                  <FlexView wrap="wrap" gap={4}>
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-cyan-500 text-black px-4 py-2 rounded"
                      >
                        Item {i + 1}
                      </div>
                    ))}
                  </FlexView>
                </div>
              }
            />
          </section>

          {/* Props Table */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Props
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left border border-zinc-800 text-sm">
                <thead className="bg-zinc-900 text-gray-300">
                  <tr>
                    <th className="px-4 py-2">Prop</th>
                    <th className="px-4 py-2">Type</th>
                    <th className="px-4 py-2">Description</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-800">
                  <tr>
                    <td className="px-4 py-2 text-primary">direction</td>
                    <td className="px-4 py-2">
                      "row" | "column" | responsive object
                    </td>
                    <td className="px-4 py-2">
                      Layout direction (supports breakpoints).
                    </td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 text-primary">align</td>
                    <td className="px-4 py-2">
                      "start" | "center" | "end" | "stretch"
                    </td>
                    <td className="px-4 py-2">
                      Vertical alignment of items.
                    </td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 text-primary">justify</td>
                    <td className="px-4 py-2">
                      "start" | "center" | "end" | "between" | "around" | "evenly"
                    </td>
                    <td className="px-4 py-2">
                      Horizontal spacing between items.
                    </td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 text-primary">wrap</td>
                    <td className="px-4 py-2">
                      "wrap" | "nowrap" | "wrap-reverse"
                    </td>
                    <td className="px-4 py-2">
                      Controls wrapping behavior.
                    </td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 text-primary">gap</td>
                    <td className="px-4 py-2">number | responsive</td>
                    <td className="px-4 py-2">
                      Space between items.
                    </td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 text-primary">padding</td>
                    <td className="px-4 py-2">number | responsive</td>
                    <td className="px-4 py-2">
                      Inner spacing of container.
                    </td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 text-primary">margin</td>
                    <td className="px-4 py-2">number | responsive</td>
                    <td className="px-4 py-2">
                      Outer spacing of container.
                    </td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 text-primary">className</td>
                    <td className="px-4 py-2">string</td>
                    <td className="px-4 py-2">
                      Additional Tailwind classes.
                    </td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 text-primary">children</td>
                    <td className="px-4 py-2">ReactNode</td>
                    <td className="px-4 py-2">
                      Content inside FlexView.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Footer */}
          <DocsFooter />
        </div>
      </div>
    </>
  );
};

export default FlexViewDocs;