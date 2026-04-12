"use client";

import React from "react";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import { Button } from "@neuctra/ui";
import Metadata from "../../MetaData";
import CodeBlock from "../../components/Docs/CodeBlock";
import { Check, X } from "lucide-react";

const ButtonDocs = () => {
  return (
    <>
      <Metadata
        title="Button Component — Neuctra UI"
        description="Learn how to use the Button component in Neuctra UI — customizable, responsive buttons with variants, sizes, icons, and loading states."
        keywords="Neuctra UI Button, React button component, Tailwind button, responsive button, UI library, React button variants"
      />

      <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
        <div className="mx-auto px-4 space-y-10">
          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              Button Component
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed">
              The <span className="text-primary font-semibold">Button</span>{" "}
              component is a flexible, responsive button primitive. Supports
              variants, sizes, icons, loading states, full-width mode, and
              custom colors — all with TypeScript support.
            </p>
          </header>

          {/* Import */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Import Component From Library
            </h2>
            <CodeBlock
              language="react"
              code={`import { Button } from "@neuctra/ui";`}
              previewContent={
                <Button >Click Me</Button>
              }
            />
          </section>

          {/* Basic Usage */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Example
            </h2>
            <CodePreviewBlock
              language="jsx"
              code={`<Button size="xs" >Click Me</Button>
<Button size="sm" >Click Me</Button>
<Button size="md" >Click Me</Button>
<Button size="lg" >Click Me</Button>`}
              previewContent={<div className="space-x-2">
              <Button size="xs" >Click Me</Button>
              <Button size="sm" >Click Me</Button>
              <Button size="md" >Click Me</Button>
              <Button size="lg" >Click Me</Button>
              </div>}
            />
          </section>

          {/* Advanced Examples */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Advanced Usage
            </h2>

            <div className="space-y-6">
              <CodePreviewBlock
                language="jsx"
                code={`<Button variant="outline" size="lg" iconBefore={<Icon />}>
  Submit
</Button>`}
                previewContent={
                  <Button variant="outline" size="lg">
                    Submit
                  </Button>
                }
              />

              <CodePreviewBlock
                language="jsx"
                code={`<Button variant="ghost" loading loadingText="Processing..." fullWidth>
  Confirm
</Button>`}
                previewContent={
                  <Button variant="ghost" loading fullWidth>
                    Confirm
                  </Button>
                }
              />
            </div>
          </section>

          {/* Props Table */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Props Table
            </h2>
            <p className="text-gray-400 mb-3">
              All available props for the Button component.
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
                  {/* Content */}
                  <tr>
                    <td className="p-3">children</td>
                    <td className="p-3">ReactNode</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Content inside the button.</td>
                  </tr>

                  <tr>
                    <td className="p-3">iconBefore</td>
                    <td className="p-3">ReactNode</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Icon displayed before the text.</td>
                  </tr>

                  <tr>
                    <td className="p-3">iconAfter</td>
                    <td className="p-3">ReactNode</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Icon displayed after the text.</td>
                  </tr>

                  {/* States */}
                  <tr>
                    <td className="p-3">loading</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Shows loading spinner and replaces content.</td>
                  </tr>

                  <tr>
                    <td className="p-3">loadingText</td>
                    <td className="p-3">string</td>
                    <td className="p-3">"Loading..."</td>
                    <td className="p-3">Text shown during loading state.</td>
                  </tr>

                  <tr>
                    <td className="p-3">fullWidth</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Makes button take full width.</td>
                  </tr>

                  {/* Variants */}
                  <tr>
                    <td className="p-3">variant</td>
                    <td className="p-3">"default" | "outline" | "ghost"</td>
                    <td className="p-3">"default"</td>
                    <td className="p-3">Visual style variant.</td>
                  </tr>

                  <tr>
                    <td className="p-3">size</td>
                    <td className="p-3">"xs" | "sm" | "md" | "lg"</td>
                    <td className="p-3">"md"</td>
                    <td className="p-3">Controls padding and font size.</td>
                  </tr>

                  <tr>
                    <td className="p-3">weight</td>
                    <td className="p-3">number | string</td>
                    <td className="p-3">400</td>
                    <td className="p-3">Font weight of button text.</td>
                  </tr>

                  <tr>
                    <td className="p-3">primaryColor</td>
                    <td className="p-3">string</td>
                    <td className="p-3">"var(--primary)"</td>
                    <td className="p-3">Main color for variants (background, border, text).</td>
                  </tr>

                  {/* 🔥 Custom Classes */}
                  <tr>
                    <td className="p-3">className</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Classes for root button.</td>
                  </tr>

                  <tr>
                    <td className="p-3">contentClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Classes for inner content wrapper.</td>
                  </tr>

                  <tr>
                    <td className="p-3">textClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Classes for text content.</td>
                  </tr>

                  <tr>
                    <td className="p-3">iconClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Classes applied to both icons.</td>
                  </tr>

                  <tr>
                    <td className="p-3">loaderClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Classes for loading spinner.</td>
                  </tr>

                  {/* 🎨 Styles */}
                  <tr>
                    <td className="p-3">style</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline styles for root button.</td>
                  </tr>

                  <tr>
                    <td className="p-3">contentStyle</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline styles for content wrapper.</td>
                  </tr>

                  <tr>
                    <td className="p-3">textStyle</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline styles for text.</td>
                  </tr>

                  <tr>
                    <td className="p-3">iconStyle</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline styles for icons.</td>
                  </tr>

                  <tr>
                    <td className="p-3">loaderStyle</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline styles for loader spinner.</td>
                  </tr>

                  {/* Native */}
                  <tr>
                    <td className="p-3">...rest</td>
                    <td className="p-3">ButtonHTMLAttributes&lt;HTMLButtonElement&gt;</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      All native button props (onClick, type, disabled, etc).
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Common Mistakes */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Common Mistakes</h2>
            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex items-start gap-2 text-red-500">
                <X size={16} className="mt-1" />
                <div>
                  <code>{'<Button size="15px" />'}</code>
                  <p className="text-gray-500 text-xs mt-1">
                    Use predefined sizes: sm, md, lg.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-red-500">
                <X size={16} className="mt-1" />
                <div>
                  <code>{'<Button variant="rounded" />'}</code>
                  <p className="text-gray-500 text-xs mt-1">
                    Use only default, outline, or ghost variants.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-green-500">
                <Check size={16} className="mt-1" />
                <div>
                  <code>{'<Button className="w-full p-4" />'}</code>
                  <p className="text-gray-500 text-xs mt-1">
                    Use className for custom sizing or spacing.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Pro Tips */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Pro Tips</h2>
            <div className="text-gray-200 space-y-3">
              <ul className="list-disc list-inside space-y-1">
                <li>Combine with flex/grid for layout alignment.</li>
                <li>Use variant and size props for consistent design.</li>
                <li>Use iconBefore / iconAfter for better UX.</li>
                <li>Use loading prop for async actions feedback.</li>
                <li>Use fullWidth for buttons in forms or banners.</li>
                <li>Prefer semantic HTML: type="submit" for forms.</li>
              </ul>
            </div>
          </section>

          {/* Footer */}
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

export default ButtonDocs;