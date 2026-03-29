"use client";

import React from "react";
import { Container } from "@neuctra/ui";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import DocsFooter from "../../components/Docs/DocsFooter";
import Metadata from "../../MetaData";

const ContainerDocs = () => {
  return (
    <>
      <Metadata
        title="Container Component — Neuctra UI"
        description="Learn how to use the Container component — a responsive layout wrapper powered by Tailwind className."
      />

      <div className="bg-zinc-950 text-gray-200 min-h-screen py-12">
        <div className="max-w-5xl mx-auto px-4 space-y-14">

          {/* ---------------- Header ---------------- */}
          <header className="space-y-4">
            <h1 className="text-4xl font-extrabold text-white">
              Container Component
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
              The <span className="text-primary font-semibold">Container</span> is a
              simple wrapper that controls <strong>width, padding, and centering</strong>.
              <br /><br />
              For layouts like <strong>flex, grid, spacing, and responsiveness</strong>,
              you use Tailwind classes via <code>className</code>.
            </p>
          </header>

          {/* ---------------- Key Concept ---------------- */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              💡 Key Concept
            </h2>
            <div className="bg-zinc-900 p-5 rounded-xl text-gray-400 leading-relaxed">
              Container behaves exactly like a <code>&lt;div&gt;</code>.
              <br /><br />
              👉 You control layout using <code>className</code>  
              👉 Container only manages width & spacing  
            </div>
          </section>

          {/* ---------------- Basic ---------------- */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Basic Usage
            </h2>

            <CodePreviewBlock
              language="tsx"
              code={`<Container>
  <h2>Hello from Container</h2>
</Container>`}
              previewContent={
                <div className="bg-zinc-900 p-6 rounded-xl">
                  <Container>
                    <h2 className="text-white">
                      Hello from Container
                    </h2>
                  </Container>
                </div>
              }
            />
          </section>

          {/* ---------------- Sizes ---------------- */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Sizes
            </h2>

            <CodePreviewBlock
              language="tsx"
              code={`<Container size="sm" />
<Container size="lg" />
<Container size="full" />`}
              previewContent={
                <div className="space-y-4">
                  <Container size="sm" className="bg-red-500 p-4">
                    Small
                  </Container>
                  <Container size="lg" className="bg-blue-500 p-4">
                    Large
                  </Container>
                  <Container size="full" className="bg-green-500 p-4">
                    Full Width
                  </Container>
                </div>
              }
            />
          </section>

          {/* ---------------- Flex ---------------- */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Flex Layout (like div)
            </h2>

            <CodePreviewBlock
              language="tsx"
              code={`<Container
  className="flex flex-col md:flex-row items-center justify-between gap-4 bg-zinc-900 rounded-xl"
>
  <div>Left</div>
  <div>Right</div>
</Container>`}
              previewContent={
                <Container className="flex flex-col md:flex-row items-center justify-between gap-4 bg-zinc-900 rounded-xl">
                  <div className="bg-primary px-4 py-2 rounded">Left</div>
                  <div className="bg-primary px-4 py-2 rounded">Right</div>
                </Container>
              }
            />
          </section>

          {/* ---------------- Grid ---------------- */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Grid Layout
            </h2>

            <CodePreviewBlock
              language="tsx"
              code={`<Container
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-zinc-900 rounded-xl"
>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</Container>`}
              previewContent={
                <Container className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-zinc-900 rounded-xl">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-primary p-4 rounded">
                      {i}
                    </div>
                  ))}
                </Container>
              }
            />
          </section>

          {/* ---------------- Responsive ---------------- */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Fully Responsive Layout
            </h2>

            <CodePreviewBlock
              language="tsx"
              code={`<Container
  size="2xl"
  className="flex flex-col md:flex-row gap-6 p-4 md:p-8"
>
  <div className="w-full md:w-1/3">Sidebar</div>
  <div className="w-full md:w-2/3">Content</div>
</Container>`}
              previewContent={
                <Container
                  size="2xl"
                  className="flex flex-col md:flex-row gap-6 p-4 md:p-8"
                >
                  <div className="bg-zinc-800 p-6 rounded w-full md:w-1/3">
                    Sidebar
                  </div>
                  <div className="bg-zinc-700 p-6 rounded w-full md:w-2/3">
                    Content
                  </div>
                </Container>
              }
            />
          </section>

          {/* ---------------- Div Behavior ---------------- */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Works Just Like a div
            </h2>

            <CodePreviewBlock
              language="tsx"
              code={`<Container className="bg-blue-500 p-6 rounded-xl shadow-lg">
  <h2>Just like a div</h2>
</Container>`}
              previewContent={
                <Container className="bg-blue-500 p-6 rounded-xl shadow-lg">
                  <h2 className="text-white font-semibold">
                    Just like a div
                  </h2>
                </Container>
              }
            />
          </section>

          {/* ---------------- Mistakes ---------------- */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              ❗ Common Mistakes
            </h2>

            <div className="bg-zinc-900 p-5 rounded-xl space-y-4 text-sm">
              <div className="text-red-400">
                ❌ {"<Container padding=\"1.5rem\" />"}
              </div>
              <div className="text-red-400">
                ❌ {"<Container width=\"80%\" />"}
              </div>

              <div className="text-green-400 mt-3">
                ✅ {"<Container className=\"p-6 w-[80%]\" />"}
              </div>
            </div>
          </section>

          {/* ---------------- Props ---------------- */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Props
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border border-zinc-800">
                <thead className="bg-zinc-900">
                  <tr>
                    <th className="p-3 border">Prop</th>
                    <th className="p-3 border">Type</th>
                    <th className="p-3 border">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  <tr>
                    <td className="p-3 text-primary">size</td>
                    <td className="p-3">
                      sm | md | lg | xl | 2xl | full
                    </td>
                    <td className="p-3">
                      Controls max-width
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 text-primary">padding</td>
                    <td className="p-3">
                      none | sm | md | lg | xl
                    </td>
                    <td className="p-3">
                      Internal spacing
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 text-primary">center</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">
                      Adds mx-auto
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 text-primary">className</td>
                    <td className="p-3">string</td>
                    <td className="p-3">
                      Tailwind layout (flex, grid, etc.)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 text-primary">children</td>
                    <td className="p-3">ReactNode</td>
                    <td className="p-3">
                      Content
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ---------------- Footer ---------------- */}
          <DocsFooter />
        </div>
      </div>
    </>
  );
};

export default ContainerDocs;