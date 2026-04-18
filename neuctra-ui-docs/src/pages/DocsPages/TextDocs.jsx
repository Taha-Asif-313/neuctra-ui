"use client";

import React from "react";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import { Text } from "@neuctra/ui";
import Metadata from "../../MetaData";
import CodeBlock from "../../components/Docs/CodeBlock";
import { X, Check } from "lucide-react";

const TextDocs = () => {
  return (
    <>
      <Metadata
        title="Text Component — Neuctra UI"
        description="Learn how to use the Text component in Neuctra UI — a polymorphic React typography component with responsive font sizes, line clamping, text styling, and Tailwind CSS support."
        keywords="Neuctra UI Text, React typography component, responsive text React, polymorphic component React, Tailwind typography, line clamp React, truncate text UI"
      />

      <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
        <div className="mx-auto px-4 space-y-12 max-w-6xl">
          {/* ---------------- Header ---------------- */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              Text Component
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
              The <span className="text-primary font-semibold">Text</span>{" "}
              component is a modern, polymorphic typography primitive for React.
              It allows you to render any HTML text element while controlling
              font size, weight, alignment, truncation, and styling — all with
              Tailwind-powered utilities and full TypeScript support.
            </p>
          </header>

          {/* ---------------- Import ---------------- */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-white">Import</h2>
            <CodeBlock
              language="tsx"
              code={`import { Text } from "@neuctra/ui";`}
              previewContent={
                <Text size="lg" weight={600}>
                  Text component ready to use 🚀
                </Text>
              }
            />
          </section>

          {/* ---------------- Basic ---------------- */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Usage
            </h2>

            <CodePreviewBlock
              language="tsx"
              code={`<Text as="h1" size="xl" weight={700}>
  Welcome to Neuctra UI
</Text>`}
              previewContent={
                <Text as="h1" size="xl" weight={700}>
                  Welcome to Neuctra UI
                </Text>
              }
            />
          </section>

          {/* ---------------- Responsive ---------------- */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Responsive Text
            </h2>

            <CodePreviewBlock
              language="tsx"
              code={`<Text
  size={{ base: "sm", md: "lg", xl: "2xl" }}
  weight={{ base: 400, md: 600 }}
>
  Responsive Typography
</Text>`}
              previewContent={
                <Text
                  size={{ base: "sm", md: "lg", xl: "2xl" }}
                  weight={{ base: 400, md: 600 }}
                >
                  Responsive Typography
                </Text>
              }
            />
          </section>

          {/* ---------------- Truncate ---------------- */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Truncate & Line Clamp
            </h2>

            <CodePreviewBlock
              language="tsx"
              code={`<Text truncate>
  Single line truncated text example...
</Text>

<Text truncate={3}>
  Multi-line clamped text example...
</Text>`}
              previewContent={
                <div className="space-y-2 max-w-sm">
                  <Text truncate>
                    This is a very long text that will truncate in a single line
                  </Text>
                  <Text truncate={3}>
                    This is a longer paragraph that will be clamped after three
                    lines. Perfect for cards, previews, and UI layouts.
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

          {/* ---------------- Custom Values ---------------- */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Custom Styling
            </h2>

            <CodePreviewBlock
              language="tsx"
              code={`<Text size="18px" weight={500} color="#22c55e">
  Custom styled text
</Text>`}
              previewContent={
                <Text size="18px" weight={500} color="#22c55e">
                  Custom styled text
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
                    <td className="p-3">Responsive&lt;string&gt;</td>
                    <td className="p-3">"md"</td>
                    <td className="p-3">
                      Font size. Can use Tailwind keys ("sm", "lg") or CSS
                      values like "14px", "1rem".
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">weight</td>
                    <td className="p-3">Responsive&lt;number | string&gt;</td>
                    <td className="p-3">400</td>
                    <td className="p-3">
                      Font weight (400, 500, 600, 700 or custom).
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">align</td>
                    <td className="p-3">
                      Responsive&lt;"left" | "center" | "right"&gt;
                    </td>
                    <td className="p-3">"left"</td>
                    <td className="p-3">Text alignment.</td>
                  </tr>

                  <tr>
                    <td className="p-3">transform</td>
                    <td className="p-3">
                      Responsive&lt;"uppercase" | "lowercase" | "capitalize"&gt;
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
                    <td className="p-3">
                      Adds underline. Ignored for anchors (already underlined).
                    </td>
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
                    <td className="p-3">boolean | number</td>
                    <td className="p-3">false</td>
                    <td className="p-3">
                      Truncate text: <code>true</code> = single line,{" "}
                      <code>number</code> = multi-line clamp.
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
                      Text color. Can use preset or custom CSS value.
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">darkMode</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">
                      Enable dark mode colors if theme supports it.
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
                    <td className="p-3">style</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Inline styles override defaults (fontSize, fontWeight,
                      etc).
                    </td>
                  </tr>

                  {/* System */}
                  <tr>
                    <td className="p-3">...rest</td>
                    <td className="p-3">ComponentPropsWithoutRef&lt;T&gt;</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      All native props of the rendered element (href, target,
                      onClick, etc.).
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
                    Size must be string ("18px", "1rem") or predefined key
                    ("lg")
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-red-500">
                <X size={16} className="mt-1" />
                <div>
                  <code>{'<Text truncate="3" />'}</code>
                  <p className="text-gray-500 text-xs mt-1">
                    truncate expects a number, not a string
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-red-500">
                <X size={16} className="mt-1" />
                <div>
                  <code>{'<Text as="a" underline />'}</code>
                  <p className="text-gray-500 text-xs mt-1">
                    Anchor already has underline styling by default
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-green-500">
                <Check size={16} className="mt-1" />
                <div>
                  <code>{'<Text size="18px" />'}</code>
                  <p className="text-gray-500 text-xs mt-1">
                    Use valid CSS values for custom sizes
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
                Use <code>as</code> to keep semantic HTML:
              </p>

              <ul className="list-disc list-inside space-y-1">
                <li>h1 → headings</li>
                <li>p → paragraphs</li>
                <li>a → links</li>
              </ul>

              <p>
                Combine responsive props for modern UI:
                <code className="ml-2">
                  {`size={{ base: "sm", md: "lg" }}`}
                </code>
              </p>

              <p>
                Use <code>truncate</code> for cards, tables, and previews.
              </p>

              <p>
                Prefer predefined sizes (<code>sm</code>, <code>lg</code>) for
                consistency across your design system.
              </p>

              <p>
                Use <code>className</code> for advanced styling instead of
                overloading props.
              </p>

              <p>
                Combine with layout components like flex/grid for better UI
                composition.
              </p>
            </div>
          </section>

          {/* ---------------- Footer ---------------- */}
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

export default TextDocs;
