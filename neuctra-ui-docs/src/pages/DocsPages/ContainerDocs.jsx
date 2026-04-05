"use client";

import React from "react";
import { Container } from "@neuctra/ui";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import DocsFooter from "../../components/Docs/DocsFooter";
import Metadata from "../../MetaData";
import { ArrowRight, Check, Lightbulb, X } from "lucide-react";

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
            <p className="text-lg text-gray-200 max-w-3xl leading-relaxed">
              The <span className="text-primary font-semibold">Container</span>{" "}
              is a simple wrapper that controls{" "}
              <strong>width, padding, and centering</strong>.
              <br />
              <br />
              For layouts like{" "}
              <strong>flex, grid, spacing, and responsiveness</strong>, you use
              Tailwind classes via <code>className</code>.
            </p>
          </header>

          {/* ---------------- Key Concept --------------- */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
              <Lightbulb size={20} />
              Key Concept
            </h2>

            <div className="text-gray-200 leading-relaxed space-y-4">
              <p>
                The <code>Container</code> behaves just like a{" "}
                <code>&lt;div&gt;</code>. It does not control layout for you.
              </p>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <ArrowRight size={16} className="mt-1" />
                  <p>
                    Use <code>className</code> to control layout (flex, grid,
                    spacing, etc.)
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <ArrowRight size={16} className="mt-1" />
                  <p>
                    The <code>Container</code> is mainly responsible for width
                    and horizontal spacing
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <ArrowRight size={16} className="mt-1" />
                  <p>Think of it as a wrapper, not a layout system</p>
                </div>
              </div>
            </div>
          </section>

          {/* ---------------- When to Use ---------------- */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              When to Use
            </h2>

            <div className="text-gray-200 space-y-3">
              <p>
                Use <code>Container</code> when you want to:
              </p>

              <ul className="space-y-2 list-disc list-inside">
                <li>Limit content width for better readability</li>
                <li>Center content horizontally</li>
                <li>Add consistent page spacing</li>
                <li>Create layout wrappers for sections</li>
              </ul>

              <p className="text-gray-300 text-sm">
                It is commonly used for page layouts, sections, and content
                blocks.
              </p>
            </div>
          </section>

          {/* ---------------- Mental Model ---------------- */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              Mental Model
            </h2>

            <div className="text-gray-200 space-y-3">
              <p>
                Think of <code>Container</code> like a <strong>frame</strong>{" "}
                around your content.
              </p>

              <p>
                It does <strong>NOT</strong> control layout (flex/grid).
              </p>

              <p>It only controls:</p>

              <ul className="list-disc list-inside space-y-1">
                <li>Max width</li>
                <li>Horizontal centering</li>
                <li>Basic padding</li>
              </ul>

              <p className="text-gray-500 text-sm">
                Layout always belongs to <code>className</code> or{" "}
                <code>style</code>.
              </p>
            </div>
          </section>

          {/* ---------------- Real Example ---------------- */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Real World Example
            </h2>

            <CodePreviewBlock
              language="tsx"
              code={`<Container size="lg" className="py-10">
  <div className="grid md:grid-cols-2 gap-6">
    <div className="bg-zinc-800 p-4 rounded-lg">Left</div>
    <div className="bg-zinc-800 p-4 rounded-lg">Right</div>
  </div>
</Container>`}
              previewContent={
                <Container size="lg" className="py-10">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-zinc-800 p-4 rounded-lg text-white">
                      Left
                    </div>
                    <div className="bg-zinc-800 p-4 rounded-lg text-white">
                      Right
                    </div>
                  </div>
                </Container>
              }
            />
          </section>

          {/* ---------------- Sizes ---------------- */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Sizes</h2>

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
                  <h2 className="text-white font-semibold">Just like a div</h2>
                </Container>
              }
            />
          </section>

          {/* ---------------- Without Tailwind ---------------- */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Without Tailwind
            </h2>

            <CodePreviewBlock
              language="tsx"
              code={`<Container
  style={{
    maxWidth: 800,
    padding: 24,
    margin: "0 auto"
  }}
>
  <h2>Plain CSS usage</h2>
</Container>`}
              previewContent={
                <Container
                  style={{
                    maxWidth: 800,
                    padding: 24,
                    margin: "0 auto",
                    background: "#27272a",
                    color: "white",
                  }}
                >
                  Plain CSS usage
                </Container>
              }
            />
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

            <div className="text-gray-200 space-y-3">
              <p>
                Always combine <code>Container</code> with layout utilities:
              </p>

              <ul className="list-disc list-inside space-y-1">
                <li>flex → for alignment</li>
                <li>grid → for layouts</li>
                <li>gap → for spacing</li>
              </ul>

              <p>
                Use <code>size="lg"</code> or <code>xl</code> for readable
                content width.
              </p>

              <p>
                Use <code>full</code> for full-width sections (hero, banners).
              </p>
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

          {/* ---------------- Footer ---------------- */}
          <DocsFooter />
        </div>
      </div>
    </>
  );
};

export default ContainerDocs;
