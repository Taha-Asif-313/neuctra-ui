"use client";

import React from "react";
import CodePreviewBlock from "../components/CodePreviewBlock";
import { Text } from "@neuctra/ui";
import Metadata from "../../../MetaData";
import CodeBlock from "../components/CodeBlock";
import { X, Check } from "lucide-react";
import DocsFooter from "../components/DocsFooter";

const TextDocs = () => {
  return (
    <>
      <Metadata
        title="Text Component — Neuctra UI"
        description="Learn how to use the Text component in Neuctra UI — a modern polymorphic typography component with semantic rendering, text styling utilities, and Tailwind CSS support."
        keywords="Neuctra UI Text, React typography component, polymorphic component React, Tailwind typography, truncate text UI"
      />

      <div className="font-primary min-h-screen">
        <div className="space-y-12">
          {/* ---------------- Header ---------------- */}
          <header>
            <Text
              as="h1"
              className="text-4xl mb-3 font-extrabold text-white"
            >
              Text Component
            </Text>

            <Text as="p" className="leading-relaxed text-gray-300">
              The{" "}
              <Text as="span" className="font-semibold text-primary">
                Text
              </Text>{" "}
              component is a lightweight and modern typography primitive for
              React. It supports semantic HTML rendering, text decorations,
              transformations, truncation, and full Tailwind CSS customization
              while keeping the API simple and clean.
            </Text>
          </header>

          {/* ---------------- Import ---------------- */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-white">
              Import Component From Library
            </h2>

            <CodeBlock code={`import { Text } from "@neuctra/ui";`} />
          </section>

          {/* ---------------- Basic Code ---------------- */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Usage Code
            </h2>

            <CodeBlock
              language="tsx"
              code={`<Text>
  Welcome to <Text className="font-bold">Neuctra UI</Text>
</Text>`}
            />
          </section>

          {/* ---------------- Basic Preview ---------------- */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Usage
            </h2>

            <CodePreviewBlock
              language="tsx"
              code={`<Text>
  Welcome to <Text className="font-bold">Neuctra UI</Text>
</Text>`}
              previewContent={
                <Text>
                  Welcome to{" "}
                  <Text className="font-bold">Neuctra UI</Text>
                </Text>
              }
            />
          </section>

          {/* ---------------- Transform ---------------- */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Text Transform
            </h2>

            <CodePreviewBlock
              language="tsx"
              code={`<Text transform="uppercase">
  neuctra ui
</Text>`}
              previewContent={
                <Text transform="uppercase">
                  neuctra ui
                </Text>
              }
            />
          </section>

          {/* ---------------- Decorations ---------------- */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Text Decorations
            </h2>

            <CodePreviewBlock
              language="tsx"
              code={`<div className="space-y-2">
  <Text italic>Italic Text</Text>
  <Text underline>Underline Text</Text>
  <Text strikethrough>Strikethrough Text</Text>
</div>`}
              previewContent={
                <div className="space-y-2">
                  <Text italic>Italic Text</Text>
                  <Text underline>Underline Text</Text>
                  <Text strikethrough>Strikethrough Text</Text>
                </div>
              }
            />
          </section>

          {/* ---------------- Colors ---------------- */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Text Colors
            </h2>

            <CodePreviewBlock
              language="tsx"
              code={`<div className="space-y-2">
  <Text color="default">Default Text</Text>
  <Text color="primary">Primary Text</Text>
  <Text color="muted">Muted Text</Text>
</div>`}
              previewContent={
                <div className="space-y-2">
                  <Text color="default">Default Text</Text>
                  <Text color="primary">Primary Text</Text>
                  <Text color="muted">Muted Text</Text>
                </div>
              }
            />
          </section>

          {/* ---------------- Truncate ---------------- */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Truncate Text
            </h2>

            <CodePreviewBlock
              language="tsx"
              code={`<div className="max-w-[220px]">
  <Text truncate>
    This is a very long text that will automatically truncate.
  </Text>
</div>`}
              previewContent={
                <div className="max-w-[220px]">
                  <Text truncate>
                    This is a very long text that will automatically truncate.
                  </Text>
                </div>
              }
            />
          </section>

          {/* ---------------- Anchor ---------------- */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Links (Anchor Mode)
            </h2>

            <CodePreviewBlock
              language="tsx"
              code={`<Text
  as="a"
  href="https://www.neuctra.com"
  target="_blank"
>
  Visit Neuctra
</Text>`}
              previewContent={
                <Text
                  as="a"
                  href="https://www.neuctra.com"
                  target="_blank"
                >
                  Visit Neuctra
                </Text>
              }
            />
          </section>

          {/* ---------------- Props Table ---------------- */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Props Table
            </h2>

            <p className="text-gray-400 mb-3">
              Complete list of available props for the{" "}
              <code>Text</code> component.
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
                  <tr>
                    <td className="p-3">as</td>
                    <td className="p-3">HTMLElementTag</td>
                    <td className="p-3">"p"</td>
                    <td className="p-3">
                      Element type to render such as p, span, h1, or a.
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">children</td>
                    <td className="p-3">React.ReactNode</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Content inside the component.</td>
                  </tr>

                  <tr>
                    <td className="p-3">transform</td>
                    <td className="p-3">
                      "uppercase" | "lowercase" | "capitalize"
                    </td>
                    <td className="p-3">—</td>
                    <td className="p-3">Applies text transformation.</td>
                  </tr>

                  <tr>
                    <td className="p-3">italic</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Applies italic style.</td>
                  </tr>

                  <tr>
                    <td className="p-3">underline</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Adds underline decoration.</td>
                  </tr>

                  <tr>
                    <td className="p-3">strikethrough</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Adds line-through decoration.</td>
                  </tr>

                  <tr>
                    <td className="p-3">truncate</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">
                      Enables single-line text truncation.
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">color</td>
                    <td className="p-3">
                      "default" | "muted" | "primary" | string
                    </td>
                    <td className="p-3">"default"</td>
                    <td className="p-3">
                      Text color or custom Tailwind class.
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">className</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Additional custom classes.</td>
                  </tr>

                  <tr>
                    <td className="p-3">...rest</td>
                    <td className="p-3">Native HTML Props</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Additional props passed to the rendered element.
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
                  <code>{"<Text truncate={3} />"}</code>

                  <p className="text-gray-500 text-xs mt-1">
                    truncate only accepts boolean values.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-red-500">
                <X size={16} className="mt-1" />

                <div>
                  <code>{'<Text as="a" color="muted" />'}</code>

                  <p className="text-gray-500 text-xs mt-1">
                    Anchor elements automatically receive link styling.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-green-500">
                <Check size={16} className="mt-1" />

                <div>
                  <code>{'<Text className="font-bold text-xl" />'}</code>

                  <p className="text-gray-500 text-xs mt-1">
                    Use Tailwind utility classes for typography customization.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ---------------- Pro Tips ---------------- */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              Pro Tips
            </h2>

            <ul className="text-gray-200 space-y-2 list-disc list-inside">
              <li>
                Use <code>as</code> for semantic HTML structure.
              </li>

              <li>
                Use Tailwind utility classes through{" "}
                <code>className</code> for sizing and weight.
              </li>

              <li>
                Anchor elements automatically receive primary color and
                underline styling.
              </li>

              <li>
                Use <code>truncate</code> for compact layouts like tables,
                cards, and navigation items.
              </li>

              <li>
                Keep the API minimal and rely on Tailwind utilities for advanced
                styling.
              </li>

              <li>
                Combine utility classes with the built-in props for maximum
                flexibility.
              </li>
            </ul>
          </section>

          {/* ---------------- Footer ---------------- */}
          <DocsFooter />
        </div>
      </div>
    </>
  );
};

export default TextDocs;