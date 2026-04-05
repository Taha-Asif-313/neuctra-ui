"use client";

import React from "react";
import Metadata from "../../MetaData";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import CodeBlock from "../../components/Docs/CodeBlock";
import { Badge } from "@neuctra/ui";
import { Check, X } from "lucide-react";

const BadgeDocs = () => {
  return (
    <>
      <Metadata
        title="Badge Component — Neuctra UI"
        description="Learn how to use the Badge component in Neuctra UI — customizable sizes, colors, icons, notification dots, and counts."
        keywords="Neuctra UI Badge, React Badge component, notification badge, icon badge, UI library"
      />

      <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
        <div className="mx-auto px-4 space-y-10">

          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              Badge Component
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed">
              The <span className="text-primary font-semibold">Badge</span> component is a versatile 
              UI element for displaying text, counts, notification dots, and icons.
              Supports multiple sizes, rounded shapes, colors, and click interactions.
            </p>
          </header>

          {/* Import */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Import Component
            </h2>
            <CodeBlock
              language="react"
              code={`import { Badge } from "@neuctra/ui";`}
            />
          </section>

          {/* Basic Usage */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Basic Example</h2>
            <CodePreviewBlock
              language="jsx"
              code={`<Badge text="New" />`}
              previewContent={<Badge text="New" />}
            />
          </section>

          {/* Advanced Examples */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Advanced Usage</h2>
            <div className="space-y-6">

              <CodePreviewBlock
                language="jsx"
                code={`<Badge text="Messages" notificationDot />`}
                previewContent={<Badge text="Messages" notificationDot />}
              />

              <CodePreviewBlock
                language="jsx"
                code={`<Badge text="Alerts" count={5} dotColor="#EF4444" pulse />`}
                previewContent={<Badge text="Alerts" count={5} dotColor="#EF4444" pulse />}
              />

              <CodePreviewBlock
                language="jsx"
                code={`<Badge text="Admin" icon={<span>⭐</span>} iconPosition="right" primaryColor="#10b981" size="lg" />`}
                previewContent={<Badge text="Admin" icon={<span>⭐</span>} iconPosition="right" primaryColor="#10b981" size="lg" />}
              />

            </div>
          </section>

          {/* Props Table */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Props Table</h2>
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
                  <tr><td className="p-3">text</td><td className="p-3">string</td><td className="p-3">—</td><td className="p-3">Text displayed inside the badge</td></tr>
                  <tr><td className="p-3">icon</td><td className="p-3">ReactNode</td><td className="p-3">—</td><td className="p-3">Optional icon displayed alongside the text</td></tr>
                  <tr><td className="p-3">iconPosition</td><td className="p-3">"left" | "right"</td><td className="p-3">"left"</td><td className="p-3">Position of the icon relative to text</td></tr>
                  <tr><td className="p-3">primaryColor</td><td className="p-3">string</td><td className="p-3">"var(--primary)"</td><td className="p-3">Badge background color</td></tr>
                  <tr><td className="p-3">size</td><td className="p-3">"sm" | "md" | "lg"</td><td className="p-3">"md"</td><td className="p-3">Badge size</td></tr>
                  <tr><td className="p-3">rounded</td><td className="p-3">boolean</td><td className="p-3">true</td><td className="p-3">Rounded or pill shape</td></tr>
                  <tr><td className="p-3">notificationDot</td><td className="p-3">boolean</td><td className="p-3">false</td><td className="p-3">Show small dot for notifications</td></tr>
                  <tr><td className="p-3">dotColor</td><td className="p-3">string</td><td className="p-3">"#ef4444"</td><td className="p-3">Color of the notification dot</td></tr>
                  <tr><td className="p-3">count</td><td className="p-3">number | string</td><td className="p-3">—</td><td className="p-3">Number displayed as badge (like notifications)</td></tr>
                  <tr><td className="p-3">pulse</td><td className="p-3">boolean</td><td className="p-3">false</td><td className="p-3">Enable pulse animation on dot</td></tr>
                  <tr><td className="p-3">className</td><td className="p-3">string</td><td className="p-3">—</td><td className="p-3">Custom class for badge</td></tr>
                  <tr><td className="p-3">onClick</td><td className="p-3">() ={`>`} void</td><td className="p-3">—</td><td className="p-3">Click handler function</td></tr>
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
                  <code>{'<Badge notificationDot count={5} />'}</code>
                  <p className="text-gray-500 text-xs mt-1">Using both count and notificationDot can overlap; adjust styling if needed.</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-red-500">
                <X size={16} className="mt-1" />
                <div>
                  <code>{'<Badge size="lg" />'}</code>
                  <p className="text-gray-500 text-xs mt-1">Ensure text fits properly; large size may require padding adjustment.</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-green-500">
                <Check size={16} className="mt-1" />
                <div>
                  <code>{'<Badge primaryColor="#10b981" />'}</code>
                  <p className="text-gray-500 text-xs mt-1">Custom colors can be applied safely via primaryColor prop.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Pro Tips */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Pro Tips</h2>
            <ul className="list-disc list-inside text-gray-200 space-y-1">
              <li>Use <code>notificationDot</code> for subtle alerts.</li>
              <li>Use <code>count</code> for numeric badges like unread messages.</li>
              <li>Combine icons with <code>iconPosition</code> for context.</li>
              <li>Use <code>pulse</code> to attract attention to important badges.</li>
              <li>Adjust <code>size</code> and <code>rounded</code> for different UI contexts.</li>
              <li>Always consider accessibility; clickable badges should have clear context.</li>
            </ul>
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

export default BadgeDocs;