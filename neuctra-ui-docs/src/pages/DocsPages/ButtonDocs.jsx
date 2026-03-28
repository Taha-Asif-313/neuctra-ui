"use client";

import React from "react";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import { Button } from "@neuctra/ui";
import { ArrowRight, Rocket } from "lucide-react";
import Metadata from "../../MetaData";

const ButtonDocs = () => {
  return (
    <>
      <Metadata
        title="Button Component — Neuctra UI"
        description="Learn how to use the Button component in Neuctra UI — a flexible React button with icons, loading states, custom colors, and full-width layouts."
      />

      <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4 space-y-12">
          
          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold text-white mb-3">
              Button
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
              The <span className="text-primary font-semibold">Button</span> component is a flexible UI element used to trigger actions. 
              It can show loading states, icons, custom colors, and expand to full width if needed.
            </p>
          </header>

          {/* Basic */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Basic Usage</h2>
            <p className="text-gray-400 mb-3">
              A simple button with text. This is the most basic usage.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<Button>Click Me</Button>`}
              previewContent={<Button>Click Me</Button>}
            />
          </section>

          {/* Sizes */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Sizes</h2>
            <p className="text-gray-400 mb-3">
              Adjust the <code className="text-primary">size</code> prop to control padding and font size.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<>
  <Button size="sm">Small</Button>
  <Button size="md">Medium</Button>
  <Button size="lg">Large</Button>
</>`}
              previewContent={
                <div className="flex gap-4">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>
              }
            />
          </section>

          {/* Loading */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Loading State</h2>
            <p className="text-gray-400 mb-3">
              Show a spinner and disable the button automatically while an action is processing.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<Button loading loadingText="Processing...">Submit</Button>`}
              previewContent={
                <Button loading loadingText="Processing...">Submit</Button>
              }
            />
          </section>

          {/* Icons */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Icons</h2>
            <p className="text-gray-400 mb-3">
              Add an icon before or after the text using <code className="text-primary">iconBefore</code> or <code className="text-primary">iconAfter</code>.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<>
  <Button iconBefore={<Rocket size={16} />}>Launch</Button>
  <Button iconAfter={<ArrowRight size={16} />}>Continue</Button>
</>`}
              previewContent={
                <div className="flex gap-4">
                  <Button iconBefore={<Rocket size={16} />}>Launch</Button>
                  <Button iconAfter={<ArrowRight size={16} />}>Continue</Button>
                </div>
              }
            />
          </section>

          {/* Theme & Colors */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Theme & Colors</h2>
            <p className="text-gray-400 mb-3">
              By default, the button uses your global <code className="text-primary">--primary</code> color.
              You can disable the theme and use a custom color with <code className="text-primary">primaryTheme</code> and <code className="text-primary">primaryColor</code>.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<>
  <Button>Primary</Button>
  <Button primaryTheme={false} primaryColor="#10b981">Success</Button>
</>`}
              previewContent={
                <div className="flex gap-4">
                  <Button>Primary</Button>
                  <Button primaryTheme={false} primaryColor="#10b981">Success</Button>
                </div>
              }
            />
          </section>

          {/* Full Width */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Full Width</h2>
            <p className="text-gray-400 mb-3">
              Expand the button to take the full width of its container using <code className="text-primary">fullWidth</code>.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<Button fullWidth>Continue</Button>`}
              previewContent={
                <div className="max-w-sm">
                  <Button fullWidth>Continue</Button>
                </div>
              }
            />
          </section>

          {/* Disabled */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Disabled</h2>
            <p className="text-gray-400 mb-3">
              Disable a button using the <code className="text-primary">disabled</code> prop.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<Button disabled>Disabled</Button>`}
              previewContent={<Button disabled>Disabled</Button>}
            />
          </section>

          {/* Props Table */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Props Table</h2>
            <p className="text-gray-400 mb-3">
              All available props for the Button component.
            </p>

            <div className="border border-zinc-800 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-zinc-900 text-gray-400">
                  <tr>
                    <th className="text-left p-3">Prop</th>
                    <th className="text-left p-3">Type</th>
                    <th className="text-left p-3">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  <tr>
                    <td className="p-3">size</td>
                    <td className="p-3">"sm" | "md" | "lg"</td>
                    <td className="p-3">Controls padding & font size</td>
                  </tr>
                  <tr>
                    <td className="p-3">loading</td>
                    <td className="p-3">boolean</td>
                    <td>Shows spinner & disables button</td>
                  </tr>
                  <tr>
                    <td className="p-3">loadingText</td>
                    <td className="p-3">string</td>
                    <td>Text displayed while loading</td>
                  </tr>
                  <tr>
                    <td className="p-3">iconBefore</td>
                    <td className="p-3">ReactNode</td>
                    <td>Icon displayed before text</td>
                  </tr>
                  <tr>
                    <td className="p-3">iconAfter</td>
                    <td className="p-3">ReactNode</td>
                    <td>Icon displayed after text</td>
                  </tr>
                  <tr>
                    <td className="p-3">primaryTheme</td>
                    <td className="p-3">boolean</td>
                    <td>Use theme color from CSS variable</td>
                  </tr>
                  <tr>
                    <td className="p-3">primaryColor</td>
                    <td className="p-3">string</td>
                    <td>Custom background color when theme is disabled</td>
                  </tr>
                  <tr>
                    <td className="p-3">fullWidth</td>
                    <td className="p-3">boolean</td>
                    <td>Expand button to full width of container</td>
                  </tr>
                  <tr>
                    <td className="p-3">disabled</td>
                    <td className="p-3">boolean</td>
                    <td>Disable button interaction</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Footer */}
          <footer className="pt-10 border-t border-zinc-800 text-gray-500 text-sm">
            Built with React, Tailwind CSS, and TypeScript. Designed to be accessible, responsive, and fully customizable.
          </footer>
        </div>
      </div>
    </>
  );
};

export default ButtonDocs;