"use client";

import React from "react";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import { Text } from "@neuctra/ui";
import Metadata from "../../MetaData";
import CodeBlock from "../../components/Docs/CodeBlock";
import { X, Check } from "lucide-react";
import DocsFooter from "../../components/Docs/DocsFooter";

const TextDocs = () => {
  return (
    <>
      <Metadata
        title="Text Component — Neuctra UI"
        description="Learn how to use the Text component in Neuctra UI — a polymorphic React typography component with responsive font sizes, line clamping, text styling, and Tailwind CSS support."
        keywords="Neuctra UI Text, React typography component, responsive text React, polymorphic component React, Tailwind typography, line clamp React, truncate text UI"
      />

      <div className="font-primary min-h-screen">
        <div className="space-y-12">
          {/* ---------------- Header ---------------- */}
          <header>
            <Text
              as="h1"
              size="2xl"
              className="text-4xl mb-3 font-extrabold! text-white"
            >
              Text Component
            </Text>

            <Text as="p" size="sm" className="leading-relaxed">
              The{" "}
              <Text as="span" weight={600} color="primary">
                Text
              </Text>{" "}
              component is a modern, polymorphic typography primitive for React.
              It allows you to render any HTML text element while controlling
              font size, weight, alignment, truncation, and styling — all with
              Tailwind-powered utilities and full TypeScript support.
            </Text>
          </header>

          {/* ---------------- Import ---------------- */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-white">
              Import Component From Library
            </h2>
            <CodeBlock code={`import { Text } from "@neuctra/ui";`} />
          </section>

          {/* ---------------- Basic ---------------- */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Usage
            </h2>

            <CodePreviewBlock
              language="tsx"
              code={`<Text>
  Welcome to <Text weight={700}>Neuctra UI</Text>
</Text>`}
              previewContent={
                <Text>
                  Welcome to <Text weight={700}>Neuctra UI</Text>
                </Text>
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
              code={`<Text as="a" href="https://www.neuctra.com" target="_blank">
  Visit Neuctra
</Text>`}
              previewContent={
                <Text as="a" href="https://www.neuctra.com" target="_blank">
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
              Detailed list of all available props for the <code>Text</code>{" "}
              component.
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
                  {/* Core */}
                  <tr>
                    <td className="p-3">as</td>
                    <td className="p-3">HTMLElementTag</td>
                    <td className="p-3">"span"</td>
                    <td className="p-3">
                      Element type to render (e.g., "p", "span", "h1", "a").
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">children</td>
                    <td className="p-3">React.ReactNode</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Content inside the Text component.</td>
                  </tr>

                  {/* Typography */}
                  <tr>
                    <td className="p-3">size</td>
                    <td className="p-3">
                      "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
                    </td>
                    <td className="p-3">"md"</td>
                    <td className="p-3">Predefined font size.</td>
                  </tr>

                  <tr>
                    <td className="p-3">weight</td>
                    <td className="p-3">400 | 500 | 600 | 700</td>
                    <td className="p-3">400</td>
                    <td className="p-3">Font weight.</td>
                  </tr>

                  <tr>
                    <td className="p-3">align</td>
                    <td className="p-3">"left" | "center" | "right"</td>
                    <td className="p-3">"left"</td>
                    <td className="p-3">Text alignment.</td>
                  </tr>

                  <tr>
                    <td className="p-3">transform</td>
                    <td className="p-3">
                      "uppercase" | "lowercase" | "capitalize"
                    </td>
                    <td className="p-3">—</td>
                    <td className="p-3">Text transformation.</td>
                  </tr>

                  {/* Decorations */}
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
                    <td className="p-3">Adds underline.</td>
                  </tr>

                  <tr>
                    <td className="p-3">strikethrough</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Applies line-through decoration.</td>
                  </tr>

                  {/* Truncate */}
                  <tr>
                    <td className="p-3">truncate</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">
                      Applies single-line truncation (ellipsis).
                    </td>
                  </tr>

                  {/* Color */}
                  <tr>
                    <td className="p-3">color</td>
                    <td className="p-3">
                      "default" | "muted" | "primary" | string
                    </td>
                    <td className="p-3">"default"</td>
                    <td className="p-3">
                      Text color. Accepts predefined keys or custom class.
                    </td>
                  </tr>

                  {/* Styling */}
                  <tr>
                    <td className="p-3">className</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Custom Tailwind or CSS classes.</td>
                  </tr>

                  <tr>
                    <td className="p-3">...rest</td>
                    <td className="p-3">ComponentPropsWithoutRef&lt;T&gt;</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Native props of the rendered element (href, onClick,
                      etc.).
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
                  <code>{"<Text size={18} />"}</code>
                  <p className="text-gray-500 text-xs mt-1">
                    Size must be one of: xs, sm, md, lg, xl, 2xl
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-red-500">
                <X size={16} className="mt-1" />
                <div>
                  <code>{"<Text truncate={3} />"}</code>
                  <p className="text-gray-500 text-xs mt-1">
                    truncate only supports boolean (true/false)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-red-500">
                <X size={16} className="mt-1" />
                <div>
                  <code>{'<Text as="a" color="muted" />'}</code>
                  <p className="text-gray-500 text-xs mt-1">
                    Anchor elements automatically get primary color styling
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-green-500">
                <Check size={16} className="mt-1" />
                <div>
                  <code>{'<Text size="lg" weight={600} />'}</code>
                  <p className="text-gray-500 text-xs mt-1">
                    Use predefined tokens for consistent typography
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ---------------- Pro Tips ---------------- */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Pro Tips</h2>

            <ul className="text-gray-200 space-y-2 list-disc list-inside">
              <li>
                Use <code>as</code> to keep semantic HTML:
                <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                  <li>h1 → headings</li>
                  <li>p → paragraphs</li>
                  <li>a → links</li>
                </ul>
              </li>

              <li>
                Use predefined sizes (<code>sm</code>, <code>lg</code>) for
                consistency across your design system.
              </li>

              <li>
                Anchor elements (<code>as="a"</code>) automatically get primary
                color + underline styling.
              </li>

              <li>
                Use <code>truncate</code> for single-line ellipsis in cards,
                tables, and tight layouts.
              </li>

              <li>
                Combine <code>weight</code> and <code>size</code> instead of
                adding custom classes.
              </li>

              <li>
                Use <code>className</code> only when you need something outside
                the system.
              </li>

              <li>
                Keep the API simple — avoid over-engineering responsive props
                unless necessary.
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
