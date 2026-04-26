"use client";

import React from "react";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import { Button } from "@neuctra/ui";
import Metadata from "../../MetaData";
import CodeBlock from "../../components/Docs/CodeBlock";
import { Check, X } from "lucide-react";
import DocsFooter from "../../components/Docs/DocsFooter";

const ButtonDocs = () => {
  return (
    <>
      <Metadata
        title="Button Component — Neuctra UI"
        description="Learn how to use the Button component in Neuctra UI — customizable, responsive buttons with variants, sizes, icons, and loading states."
        keywords="Neuctra UI Button, React button component, Tailwind button, responsive button, UI library, React button variants"
      />

      <div className="font-primary min-h-screen">
        <div className="space-y-10">
          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              Button Component
            </h1>

            <p className="text-sm leading-relaxed">
              The <span className="text-primary font-semibold">Button</span>{" "}
              component is a flexible, highly customizable UI primitive built
              with TypeScript. It supports multiple variants, sizes, icon
              positioning, loading states, and full-width layout control —
              making it suitable for modern design systems and production apps.
            </p>

            <p className="text-sm text-gray-300 mt-3 leading-relaxed">
              Use <code>iconBefore</code> and <code>iconAfter</code> for icon
              placement,
              <code>loading</code> for async states, and <code>variant</code> +{" "}
              <code>size</code>
              for consistent design scaling across your UI.
            </p>
          </header>

          {/* Import */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Import Component From Library
            </h2>
            <CodeBlock code={`import { Button } from "@neuctra/ui";`} />
          </section>

          {/* Basic Usage */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Example
            </h2>
            <CodePreviewBlock
              language="jsx"
              code={`<Button>Click Me</Button>`}
              previewContent={
                <Button onClick={() => alert("Hello Designer!")}>
                  Click Me
                </Button>
              }
            />
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
                    <td className="p-3">React.ReactNode</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Content inside the button.</td>
                  </tr>

                  <tr>
                    <td className="p-3">iconBefore</td>
                    <td className="p-3">React.ReactNode</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Icon displayed before the text.</td>
                  </tr>

                  <tr>
                    <td className="p-3">iconAfter</td>
                    <td className="p-3">React.ReactNode</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Icon displayed after the text.</td>
                  </tr>

                  {/* State */}
                  <tr>
                    <td className="p-3">loading</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">
                      Shows loader and disables button automatically.
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">loadingText</td>
                    <td className="p-3">string</td>
                    <td className="p-3">"Loading..."</td>
                    <td className="p-3">Text shown while loading.</td>
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
                    <td className="p-3">
                      Controls visual style of the button.
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">size</td>
                    <td className="p-3">"xs" | "sm" | "md" | "lg" | "xl"</td>
                    <td className="p-3">"sm"</td>
                    <td className="p-3">
                      Controls padding, height, and font size.
                    </td>
                  </tr>

                  {/* Customization */}
                  <tr>
                    <td className="p-3">className</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Root button classes.</td>
                  </tr>

                  <tr>
                    <td className="p-3">contentClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Wrapper around content.</td>
                  </tr>

                  <tr>
                    <td className="p-3">textClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Text styling.</td>
                  </tr>

                  <tr>
                    <td className="p-3">iconClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Icon styling.</td>
                  </tr>

                  <tr>
                    <td className="p-3">loaderClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Loader spinner styling.</td>
                  </tr>

                  {/* Styles */}
                  <tr>
                    <td className="p-3">style</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline styles for button.</td>
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
                    <td className="p-3">Inline styles for loader.</td>
                  </tr>

                  {/* Native */}
                  <tr>
                    <td className="p-3">...rest</td>
                    <td className="p-3">
                      React.ButtonHTMLAttributes&lt;HTMLButtonElement&gt;
                    </td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Native button props like onClick, type, disabled.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Common Mistakes */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Common Mistakes
            </h2>

            <div className="space-y-4 text-sm text-gray-300">
              {/* Wrong size */}
              <div className="flex items-start gap-2 text-red-500">
                <X size={16} className="mt-1" />
                <div>
                  <code>{'<Button size="15px" />'}</code>
                  <p className="text-gray-400 text-xs mt-1">
                    Only predefined sizes are allowed: xs, sm, md, lg, xl
                  </p>
                </div>
              </div>

              {/* Wrong variant */}
              <div className="flex items-start gap-2 text-red-500">
                <X size={16} className="mt-1" />
                <div>
                  <code>{'<Button variant="rounded" />'}</code>
                  <p className="text-gray-400 text-xs mt-1">
                    Variant must be: default, outline, or ghost
                  </p>
                </div>
              </div>

              {/* loading misuse */}
              <div className="flex items-start gap-2 text-red-500">
                <X size={16} className="mt-1" />
                <div>
                  <code>{"<Button loading disabled={false} />"}</code>
                  <p className="text-gray-400 text-xs mt-1">
                    loading automatically disables the button
                  </p>
                </div>
              </div>

              {/* correct usage */}
              <div className="flex items-start gap-2 text-green-500">
                <Check size={16} className="mt-1" />
                <div>
                  <code>{'<Button className="w-full" />'}</code>
                  <p className="text-gray-400 text-xs mt-1">
                    Use className for layout instead of inline hacks
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Pro Tips */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Pro Tips</h2>

            <div className="text-gray-300 space-y-3">
              <ul className="list-disc list-inside space-y-2">
                <li>
                  Combine <code>variant</code> + <code>size</code> for
                  consistent UI system design.
                </li>

                <li>
                  Use <code>iconBefore</code> for actions (like "Save") and{" "}
                  <code>iconAfter</code> for navigation (like arrows).
                </li>

                <li>
                  <code>loading</code> automatically disables the button — no
                  need to manually manage <code>disabled</code>.
                </li>

                <li>
                  Use <code>fullWidth</code> for forms, modals, and mobile
                  layouts.
                </li>

                <li>
                  Prefer <code>type="submit"</code> only inside forms to avoid
                  accidental submits.
                </li>

                <li>
                  Use <code>className</code> for layout control instead of
                  inline styles.
                </li>

                <li>
                  Avoid excessive customization props — stick to variants for
                  scalability.
                </li>
              </ul>
            </div>
          </section>

          {/* Footer */}
          <DocsFooter />
        </div>
      </div>
    </>
  );
};

export default ButtonDocs;
