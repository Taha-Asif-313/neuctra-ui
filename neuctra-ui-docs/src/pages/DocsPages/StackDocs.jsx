"use client";
import React from "react";
import { Stack, HStack, VStack } from "@neuctra/ui";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import DocsFooter from "../../components/Docs/DocsFooter";
import Metadata from "../../MetaData";

const StackDocs = () => {
  return (
    <>
      <Metadata
        title="Stack, HStack & VStack — Neuctra UI"
        description="Learn how to use Stack, HStack, and VStack in Neuctra UI. Build responsive layouts with simple, flexible flexbox utilities."
      />

      <div className="bg-zinc-950 text-gray-200 min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4 space-y-12">
          
          {/* Header */}
          <header>
            <h1 className="text-4xl font-bold text-white mb-3">
              Stack Components
            </h1>
            <p className="text-gray-400 max-w-3xl">
              <span className="text-primary font-medium">Stack</span>,{" "}
              <span className="text-primary font-medium">HStack</span>, and{" "}
              <span className="text-primary font-medium">VStack</span> are
              flexible layout primitives built on top of flexbox. They simplify
              spacing, alignment, and responsive direction handling.
            </p>
          </header>

          {/* Basic Stack */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Basic Stack
            </h2>
            <p className="text-gray-400 mb-4">
              By default, Stack is vertical on small screens and horizontal on
              medium screens and above.
            </p>

            <CodePreviewBlock
              language="tsx"
              code={`<Stack gap={4}>
  <div className="bg-blue-500 p-4 rounded">Item 1</div>
  <div className="bg-green-500 p-4 rounded">Item 2</div>
  <div className="bg-yellow-500 p-4 rounded">Item 3</div>
</Stack>`}
              previewContent={
                <Stack gap={4}>
                  <div className="bg-blue-500 p-4 rounded text-white">
                    Item 1
                  </div>
                  <div className="bg-green-500 p-4 rounded text-white">
                    Item 2
                  </div>
                  <div className="bg-yellow-500 p-4 rounded text-white">
                    Item 3
                  </div>
                </Stack>
              }
            />
          </section>

          {/* HStack */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              HStack (Horizontal)
            </h2>
            <p className="text-gray-400 mb-4">
              A shortcut for horizontal layout.
            </p>

            <CodePreviewBlock
              language="tsx"
              code={`<HStack gap={4}>
  <div className="bg-blue-500 p-4 rounded">Left</div>
  <div className="bg-green-500 p-4 rounded">Center</div>
  <div className="bg-yellow-500 p-4 rounded">Right</div>
</HStack>`}
              previewContent={
                <HStack gap={4}>
                  <div className="bg-blue-500 p-4 rounded text-white">Left</div>
                  <div className="bg-green-500 p-4 rounded text-white">
                    Center
                  </div>
                  <div className="bg-yellow-500 p-4 rounded text-white">
                    Right
                  </div>
                </HStack>
              }
            />
          </section>

          {/* VStack */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              VStack (Vertical)
            </h2>
            <p className="text-gray-400 mb-4">
              A shortcut for vertical stacking.
            </p>

            <CodePreviewBlock
              language="tsx"
              code={`<VStack gap={3}>
  <div className="bg-red-500 p-4 rounded">Top</div>
  <div className="bg-blue-500 p-4 rounded">Middle</div>
  <div className="bg-green-500 p-4 rounded">Bottom</div>
</VStack>`}
              previewContent={
                <VStack gap={3}>
                  <div className="bg-red-500 p-4 rounded text-white">Top</div>
                  <div className="bg-blue-500 p-4 rounded text-white">
                    Middle
                  </div>
                  <div className="bg-green-500 p-4 rounded text-white">
                    Bottom
                  </div>
                </VStack>
              }
            />
          </section>

          {/* Alignment */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Alignment & Justification
            </h2>
            <p className="text-gray-400 mb-4">
              Control how items are aligned and spaced.
            </p>

            <CodePreviewBlock
              language="tsx"
              code={`<HStack align="center" justify="between" gap={4}>
  <div className="bg-blue-500 p-4 rounded">A</div>
  <div className="bg-green-500 p-4 rounded">B</div>
  <div className="bg-yellow-500 p-4 rounded">C</div>
</HStack>`}
              previewContent={
                <HStack align="center" justify="between" gap={4}>
                  <div className="bg-blue-500 p-4 rounded text-white">A</div>
                  <div className="bg-green-500 p-4 rounded text-white">B</div>
                  <div className="bg-yellow-500 p-4 rounded text-white">C</div>
                </HStack>
              }
            />
          </section>

          {/* Responsive */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Responsive Layout
            </h2>
            <p className="text-gray-400 mb-4">
              All props support responsive values using{" "}
              <code>{`{ sm, md, lg }`}</code>.
            </p>

            <CodePreviewBlock
              language="tsx"
              code={`<Stack
  direction={{ sm: "vertical", md: "horizontal" }}
  gap={{ sm: 2, md: 6 }}
>
  <div className="bg-blue-500 p-4 rounded">Item 1</div>
  <div className="bg-green-500 p-4 rounded">Item 2</div>
  <div className="bg-yellow-500 p-4 rounded">Item 3</div>
</Stack>`}
              previewContent={
                <Stack
                  direction={{ sm: "vertical", md: "horizontal" }}
                  gap={{ sm: 2, md: 6 }}
                >
                  <div className="bg-blue-500 p-4 rounded text-white">
                    Item 1
                  </div>
                  <div className="bg-green-500 p-4 rounded text-white">
                    Item 2
                  </div>
                  <div className="bg-yellow-500 p-4 rounded text-white">
                    Item 3
                  </div>
                </Stack>
              }
            />
          </section>

          {/* Props Table */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Props</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-zinc-800">
                <thead className="bg-zinc-900 text-gray-300">
                  <tr>
                    <th className="px-4 py-2 text-left">Prop</th>
                    <th className="px-4 py-2 text-left">Type</th>
                    <th className="px-4 py-2 text-left">Description</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-800">
                  <tr>
                    <td className="px-4 py-2 text-primary">direction</td>
                    <td className="px-4 py-2">
                      "vertical" | "horizontal" | responsive
                    </td>
                    <td className="px-4 py-2">
                      Layout direction (flex-col / flex-row)
                    </td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 text-primary">gap</td>
                    <td className="px-4 py-2">number | responsive</td>
                    <td className="px-4 py-2">
                      Space between children
                    </td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 text-primary">align</td>
                    <td className="px-4 py-2">
                      start | center | end | stretch
                    </td>
                    <td className="px-4 py-2">
                      Align items (cross-axis)
                    </td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 text-primary">justify</td>
                    <td className="px-4 py-2">
                      start | center | end | between | around | evenly
                    </td>
                    <td className="px-4 py-2">
                      Justify content (main-axis)
                    </td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 text-primary">wrap</td>
                    <td className="px-4 py-2">
                      nowrap | wrap | wrap-reverse
                    </td>
                    <td className="px-4 py-2">
                      Control wrapping behavior
                    </td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 text-primary">className</td>
                    <td className="px-4 py-2">string</td>
                    <td className="px-4 py-2">
                      Additional Tailwind classes
                    </td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 text-primary">children</td>
                    <td className="px-4 py-2">ReactNode</td>
                    <td className="px-4 py-2">
                      Elements inside stack
                    </td>
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

export default StackDocs;