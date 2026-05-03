"use client";

import React from "react";
import { Container } from "@neuctra/ui";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import DocsFooter from "../../components/Docs/DocsFooter";
import Metadata from "../../MetaData";
import {
  ArrowRight,
  Check,
  Lightbulb,
  X,
  Palette,
  Layout,
  Grid3X3,
  MousePointer,
  Accessibility,
  Database,
} from "lucide-react";
import CodeBlock from "../../components/Docs/CodeBlock";
import { Link } from "react-router-dom";

const ContainerDocs = () => {
  return (
    <>
      <Metadata
        title="Container Component — Neuctra UI"
        description="Learn how to use the Container component — a responsive layout wrapper powered by Tailwind className."
      />

      <div className="min-h-screen">
        <div className="space-y-14">
          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              Container Component
            </h1>

            <p className="text-sm leading-relaxed">
              The <span className="text-primary font-semibold">Container</span>{" "}
              component is a layout utility designed to control content width,
              horizontal alignment, and spacing. It provides a simple and
              consistent way to structure page sections while remaining fully
              flexible for custom layouts and styling.
            </p>

            <p className="text-sm text-gray-300 mt-3 leading-relaxed">
              Use <code>size</code> to define max-width constraints,
              <code>padding</code> for internal spacing, and <code>center</code>{" "}
              to automatically align content horizontally. Combine it with{" "}
              <code>className</code> or <code>style</code> for complete layout
              control.
            </p>

            <div className="mt-5 flex gap-3">
              <Link
                to="/docs/layout-playground"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white font-medium hover:opacity-90 transition"
              >
                Open Layout Playground
                <ArrowRight size={16} />
              </Link>
            </div>
          </header>

          {/* Import */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Import Component From Library
            </h2>
            <CodeBlock code={`import { Container } from "@neuctra/ui";`} />
          </section>

          {/* Basic Usage */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Usage Code
            </h2>
            <p className="text-gray-300 mb-4">
              Start with a simple container. The component provides responsive
              layout control with customizable width, padding, and alignment.
            </p>
            <CodeBlock
              language="tsx"
              code={`import { Container } from '@neuctra/ui';

function BasicExample() {
  return (
    <Container 
      size="md" 
      center 
      className="bg-zinc-800 p-4 rounded-lg"
    >
      Hello Developer! I am a container.
    </Container>
  );
}`}
            />
          </section>

          {/* ---------------- Basic Usage ---------------- */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Basic Example
            </h2>

            <CodePreviewBlock
              language="tsx"
              code={`<Container className="bg-zinc-800 p-4 rounded-lg">
  Hello Developer! I am contianer.
</Container>`}
              previewContent={
                <Container className="bg-zinc-800 p-4 rounded-lg">
                  Hello Developer! I am contianer.
                </Container>
              }
            />
          </section>

          {/* ---------------- Layout Recipes ---------------- */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Layout Recipes
            </h2>

            <p className="text-gray-400 mb-6 text-sm">
              Use <code>Container</code> with utility classes to quickly build
              common layouts. Below are reusable patterns you can copy directly
              into your projects.
            </p>

            <div className="space-y-10">
              {/* Flex Row */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Flex Row (Space Between)
                </h3>

                <CodePreviewBlock
                  language="tsx"
                  code={`<Container className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg">
  <div>Logo</div>
  <div>Actions</div>
</Container>`}
                  previewContent={
                    <Container className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg text-white">
                      <div>Logo</div>
                      <div>Actions</div>
                    </Container>
                  }
                />
              </div>

              {/* Flex Center */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Flex Center (Perfect Centering)
                </h3>

                <CodePreviewBlock
                  language="tsx"
                  code={`<Container className="flex items-center justify-center h-40 bg-zinc-900 rounded-lg">
  Centered Content
</Container>`}
                  previewContent={
                    <Container className="flex items-center justify-center h-40 bg-zinc-900 rounded-lg text-white">
                      Centered Content
                    </Container>
                  }
                />
              </div>

              {/* Flex Column */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Flex Column (Stacked Layout)
                </h3>

                <CodePreviewBlock
                  language="tsx"
                  code={`<Container className="flex flex-col gap-3 p-4 bg-zinc-800 rounded-lg">
  <div>Header</div>
  <div>Content</div>
  <div>Footer</div>
</Container>`}
                  previewContent={
                    <Container className="flex flex-col gap-3 p-4 bg-zinc-800 rounded-lg text-white">
                      <div>Header</div>
                      <div>Content</div>
                      <div>Footer</div>
                    </Container>
                  }
                />
              </div>

              {/* Grid 2 Columns */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Grid (2 Columns)
                </h3>

                <CodePreviewBlock
                  language="tsx"
                  code={`<Container className="grid grid-cols-2 gap-4 p-4 bg-zinc-900 rounded-lg">
  <div className="bg-blue-500 p-3 rounded">1</div>
  <div className="bg-green-500 p-3 rounded">2</div>
</Container>`}
                  previewContent={
                    <Container className="grid grid-cols-2 gap-4 p-4 bg-zinc-900 rounded-lg">
                      <div className="bg-blue-500 p-3 rounded text-white text-center">
                        1
                      </div>
                      <div className="bg-green-500 p-3 rounded text-white text-center">
                        2
                      </div>
                    </Container>
                  }
                />
              </div>

              {/* Grid Responsive */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Responsive Grid
                </h3>

                <CodePreviewBlock
                  language="tsx"
                  code={`<Container className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-zinc-900 rounded-lg">
  <div className="bg-blue-500 p-3 rounded">1</div>
  <div className="bg-green-500 p-3 rounded">2</div>
  <div className="bg-red-500 p-3 rounded">3</div>
</Container>`}
                  previewContent={
                    <Container className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-zinc-900 rounded-lg">
                      {[1, 2, 3].map((n) => (
                        <div
                          key={n}
                          className="bg-blue-500 p-3 rounded text-white text-center"
                        >
                          {n}
                        </div>
                      ))}
                    </Container>
                  }
                />
              </div>

              {/* Card Grid */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Card Grid Layout
                </h3>

                <CodePreviewBlock
                  language="tsx"
                  code={`<Container className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
  <div className="bg-zinc-800 p-4 rounded-lg">Card 1</div>
  <div className="bg-zinc-800 p-4 rounded-lg">Card 2</div>
  <div className="bg-zinc-800 p-4 rounded-lg">Card 3</div>
</Container>`}
                  previewContent={
                    <Container className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                      {[1, 2, 3].map((n) => (
                        <div
                          key={n}
                          className="bg-zinc-800 p-4 rounded-lg text-white"
                        >
                          Card {n}
                        </div>
                      ))}
                    </Container>
                  }
                />
              </div>
            </div>
          </section>

          {/* ---------------- Div Behavior ---------------- */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Works Just Like a div
            </h2>

            <div className="text-gray-200 space-y-6">
              <p>
                <code>Container</code> is a drop-in replacement for{" "}
                <code>&lt;div&gt;</code>. You can use it with{" "}
                <strong>any div props</strong>, <strong>any CSS classes</strong>
                , and <strong>any inline styles</strong>.
              </p>

              <div className="space-y-4">
                {/* Basic Styling */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                    <Palette size={20} />
                    Basic Styling
                  </h3>
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
                </div>

                {/* Layout with Flex */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                    <Layout size={20} />
                    Layout with Flex
                  </h3>
                  <CodePreviewBlock
                    language="tsx"
                    code={`<Container className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
  <span>Left</span>
  <span>Right</span>
</Container>`}
                    previewContent={
                      <Container className="flex items-center justify-between p-4 bg-gray-800 rounded-lg text-white">
                        <span>Left</span>
                        <span>Right</span>
                      </Container>
                    }
                  />
                </div>

                {/* Grid Layout */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                    <Grid3X3 size={20} />
                    Grid Layout
                  </h3>
                  <CodePreviewBlock
                    language="tsx"
                    code={`<Container className="grid grid-cols-3 gap-4 p-4 bg-gray-900 rounded-lg">
  <div className="bg-blue-500 p-3 rounded">1</div>
  <div className="bg-green-500 p-3 rounded">2</div>
  <div className="bg-red-500 p-3 rounded">3</div>
</Container>`}
                    previewContent={
                      <Container className="grid grid-cols-3 gap-4 p-4 bg-gray-900 rounded-lg">
                        <div className="bg-blue-500 p-3 rounded text-white text-center">
                          1
                        </div>
                        <div className="bg-green-500 p-3 rounded text-white text-center">
                          2
                        </div>
                        <div className="bg-red-500 p-3 rounded text-white text-center">
                          3
                        </div>
                      </Container>
                    }
                  />
                </div>

                {/* Event Handlers */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                    <MousePointer size={20} />
                    Event Handlers
                  </h3>
                  <CodePreviewBlock
                    language="tsx"
                    code={`<Container
  className="p-4 bg-purple-500 rounded-lg cursor-pointer hover:bg-purple-600 transition-colors"
  onClick={() => alert('Clicked!')}
  onMouseEnter={() => console.log('Hover')}
>
  Click me (check console)
</Container>`}
                    previewContent={
                      <Container
                        className="p-4 bg-purple-500 rounded-lg cursor-pointer hover:bg-purple-600 transition-colors text-white"
                        onClick={() => alert("Container clicked!")}
                      >
                        Click me
                      </Container>
                    }
                  />
                </div>

                {/* Accessibility */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                    <Accessibility size={20} />
                    Accessibility
                  </h3>
                  <CodePreviewBlock
                    language="tsx"
                    code={`<Container
  className="p-4 bg-indigo-500 rounded-lg"
  role="button"
  tabIndex={0}
  aria-label="Interactive container"
  onKeyDown={(e) => e.key === 'Enter' && alert('Pressed Enter')}
>
  Press Enter or click
</Container>`}
                    previewContent={
                      <Container
                        className="p-4 bg-indigo-500 rounded-lg text-white cursor-pointer"
                        role="button"
                        tabIndex={0}
                        aria-label="Interactive container"
                        onClick={() => alert("Container activated!")}
                      >
                        Press Enter or click
                      </Container>
                    }
                  />
                </div>

                {/* Data Attributes */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                    <Database size={20} />
                    Data Attributes
                  </h3>
                  <CodePreviewBlock
                    language="tsx"
                    code={`<Container
  className="p-4 bg-pink-500 rounded-lg"
  data-component="custom-container"
  data-testid="my-container"
>
  Custom data attributes
</Container>`}
                    previewContent={
                      <Container
                        className="p-4 bg-pink-500 rounded-lg text-white"
                        data-component="custom-container"
                        data-testid="my-container"
                      >
                        Custom data attributes
                      </Container>
                    }
                  />
                </div>
              </div>

              <div className="bg-zinc-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <Lightbulb size={20} />
                  Pro Tip
                </h3>
                <p className="text-gray-300">
                  Use <code>Container</code> anywhere you'd use a{" "}
                  <code>&lt;div&gt;</code>. It accepts all the same props:{" "}
                  <code>id</code>, <code>onClick</code>,<code>style</code>,{" "}
                  <code>aria-*</code>, <code>data-*</code>, etc.
                </p>
              </div>
            </div>
          </section>

          {/* ---------------- Props ---------------- */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Props Table
            </h2>
            <p className="text-gray-400 mb-3">
              All available props for the Container component.
            </p>

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
                  {/* Layout */}
                  <tr>
                    <td className="p-3">size</td>
                    <td className="p-3">
                      "sm" | "md" | "lg" | "xl" | "2xl" | "full"
                    </td>
                    <td className="p-3">"full"</td>
                    <td className="p-3">Controls max-width of the container</td>
                  </tr>

                  <tr>
                    <td className="p-3">padding</td>
                    <td className="p-3">"none" | "sm" | "md" | "lg" | "xl"</td>
                    <td className="p-3">"none"</td>
                    <td className="p-3">Applies internal spacing (padding)</td>
                  </tr>

                  <tr>
                    <td className="p-3">center</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">true</td>
                    <td className="p-3">
                      Centers container horizontally using auto margins
                    </td>
                  </tr>

                  {/* Content */}
                  <tr>
                    <td className="p-3">children</td>
                    <td className="p-3">ReactNode</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Content inside the container</td>
                  </tr>

                  {/* Styling */}
                  <tr>
                    <td className="p-3">className</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Custom Tailwind or CSS classes for layout (flex, grid,
                      etc.)
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">style</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Inline styles (works without Tailwind)
                    </td>
                  </tr>

                  {/* System */}
                  <tr>
                    <td className="p-3">...rest</td>
                    <td className="p-3">HTMLAttributes&lt;div&gt;</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      All native div props (onClick, id, aria-*, data-*, etc.)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ---------------- Mistakes ---------------- */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Common Mistakes
            </h2>

            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex items-start gap-2 text-red-500">
                <X size={16} className="mt-1" />
                <div>
                  <code>{'<Container padding="1.5rem" />'}</code>
                  <p className="text-gray-500 text-xs mt-1">
                    Padding only accepts predefined values (sm, md, lg...)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-red-500">
                <X size={16} className="mt-1" />
                <div>
                  <code>{'<Container width="80%" />'}</code>
                  <p className="text-gray-500 text-xs mt-1">
                    Container does not support custom width props
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-green-500">
                <Check size={16} className="mt-1" />
                <div>
                  <code>{'<Container className="p-6 w-[80%]" />'}</code>
                  <p className="text-gray-500 text-xs mt-1">
                    Use className or style for layout control
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ---------------- Pro Tips ---------------- */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Pro Tips</h2>

            <div className="text-gray-200 leading-relaxed space-y-5">
              {/* Core Concept */}
              <p>
                The <code>Container</code> behaves like a{" "}
                <code>&lt;div&gt;</code> and does not manage layout
                automatically. Its primary responsibility is controlling width
                and horizontal spacing.
              </p>

              {/* Key Points */}
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <ArrowRight size={16} className="mt-1" />
                  <p>
                    Use <code>className</code> to handle layout (flex, grid,
                    spacing, etc.)
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <ArrowRight size={16} className="mt-1" />
                  <p>
                    Think of <code>Container</code> as a wrapper, not a layout
                    system
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <ArrowRight size={16} className="mt-1" />
                  <p>
                    It helps maintain consistent content width across your UI
                  </p>
                </div>
              </div>

              {/* Pro Tips */}
              <div className="pt-2 space-y-3">
                <p className="text-gray-300 font-medium">Best Practices:</p>

                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>
                    Combine with <code>flex</code>, <code>grid</code>, and{" "}
                    <code>gap</code> for layouts
                  </li>
                  <li>
                    Use <code>size="lg"</code> or <code>"xl"</code> for readable
                    content width
                  </li>
                  <li>
                    Use <code>full</code> for edge-to-edge sections (hero,
                    banners)
                  </li>
                  <li>
                    Avoid putting layout logic inside Container — keep it
                    reusable
                  </li>
                  <li>
                    Keep Container consistent across pages to maintain visual
                    rhythm
                  </li>
                </ul>
              </div>
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
