"use client";

import React from "react";
import Metadata from "../../MetaData";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import CodeBlock from "../../components/Docs/CodeBlock";
import { List } from "@neuctra/ui";
import { Check, X } from "lucide-react";

const ListDocs = () => {
  const sampleItems = [
    { text: "First item" },
    { text: "Second item", icon: "⭐" },
    { text: "Third item", subItems: [{ text: "Nested A" }, { text: "Nested B" }] },
  ];

  return (
    <>
      <Metadata
        title="List Component — Neuctra UI"
        description="Learn how to use the List component in Neuctra UI — ordered, unordered, or inline lists with icons, nested items, click handlers, and custom styling."
        keywords="Neuctra UI List, React List component, nested list, icons, inline list, ordered list, UI library"
      />

      <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
        <div className="mx-auto px-4 space-y-10">

          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              List Component
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed">
              The <span className="text-primary font-semibold">List</span> component provides 
              flexible <strong>unordered</strong>, <strong>ordered</strong>, or <strong>inline</strong> lists.
              Supports nested items, icons, click handlers, and theme customization.
            </p>
          </header>

          {/* Import */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Import Component
            </h2>
            <CodeBlock
              language="react"
              code={`import { List } from "@neuctra/ui";`}
              previewContent={<List items={sampleItems} />}
            />
          </section>

          {/* Basic Usage */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Basic Example</h2>
            <CodePreviewBlock
              language="jsx"
              code={`<List 
  items={[
    { text: "Item 1" },
    { text: "Item 2", icon: "⭐" },
    { text: "Item 3", subItems: [{ text: "Nested 1" }, { text: "Nested 2" }] },
  ]}
/>`}
              previewContent={<List items={sampleItems} />}
            />
          </section>

          {/* Advanced Examples */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Advanced Usage</h2>

            <div className="space-y-6">
              <CodePreviewBlock
                language="jsx"
                code={`<List 
  title="Inline List"
  type="inline"
  items={[
    { text: "Home" },
    { text: "About" },
    { text: "Contact" },
  ]}
/>`}
                previewContent={
                  <List
                    title="Inline List"
                    type="inline"
                    items={[
                      { text: "Home" },
                      { text: "About" },
                      { text: "Contact" },
                    ]}
                  />
                }
              />

              <CodePreviewBlock
                language="jsx"
                code={`<List 
  title="Ordered List with Custom Color"
  type="ordered"
  primaryTheme={false}
  primaryColor="#f97316"
  items={[
    { text: "Step 1" },
    { text: "Step 2" },
    { text: "Step 3" },
  ]}
/>`}
                previewContent={
                  <List
                    title="Ordered List with Custom Color"
                    type="ordered"
                    primaryTheme={false}
                    primaryColor="#f97316"
                    items={[
                      { text: "Step 1" },
                      { text: "Step 2" },
                      { text: "Step 3" },
                    ]}
                  />
                }
              />
            </div>
          </section>

        {/* Props Table */}
<section>
  <h2 className="text-2xl font-semibold text-white mb-4">Props Table</h2>
  <p className="text-gray-400 mb-3">
    All available props for the List component.
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
          <td className="p-3">title</td>
          <td className="p-3">string</td>
          <td className="p-3">—</td>
          <td className="p-3">Optional list title</td>
        </tr>
        <tr>
          <td className="p-3">titleIcon</td>
          <td className="p-3">ReactNode</td>
          <td className="p-3">—</td>
          <td className="p-3">Icon displayed next to title</td>
        </tr>
        <tr>
          <td className="p-3">items</td>
          <td className="p-3">ListItemType[]</td>
          <td className="p-3">—</td>
          <td className="p-3">
            Array of items (text, icon, onClick, nested subItems)
          </td>
        </tr>
        <tr>
          <td className="p-3">type</td>
          <td className="p-3">"unordered" | "ordered" | "inline"</td>
          <td className="p-3">"unordered"</td>
          <td className="p-3">Controls list layout and style</td>
        </tr>

        {/* Theme */}
        <tr>
          <td className="p-3">primaryTheme</td>
          <td className="p-3">boolean</td>
          <td className="p-3">true</td>
          <td className="p-3">
            Uses CSS variable (--primary) for colors
          </td>
        </tr>
        <tr>
          <td className="p-3">primaryColor</td>
          <td className="p-3">string</td>
          <td className="p-3">"#3b82f6"</td>
          <td className="p-3">
            Custom color when primaryTheme is disabled
          </td>
        </tr>

        {/* Class Customization */}
        <tr>
          <td className="p-3">className</td>
          <td className="p-3">string</td>
          <td className="p-3">—</td>
          <td className="p-3">Wrapper container class</td>
        </tr>
        <tr>
          <td className="p-3">listClassName</td>
          <td className="p-3">string</td>
          <td className="p-3">—</td>
          <td className="p-3">Class for ul/ol element</td>
        </tr>
        <tr>
          <td className="p-3">itemClassName</td>
          <td className="p-3">string</td>
          <td className="p-3">—</td>
          <td className="p-3">Class for each list item wrapper</td>
        </tr>
        <tr>
          <td className="p-3">titleClassName</td>
          <td className="p-3">string</td>
          <td className="p-3">—</td>
          <td className="p-3">Class for title container</td>
        </tr>
        <tr>
          <td className="p-3">bulletClassName</td>
          <td className="p-3">string</td>
          <td className="p-3">—</td>
          <td className="p-3">Class for bullet indicator</td>
        </tr>
        <tr>
          <td className="p-3">textClassName</td>
          <td className="p-3">string</td>
          <td className="p-3">—</td>
          <td className="p-3">Class for item text</td>
        </tr>
        <tr>
          <td className="p-3">iconClassName</td>
          <td className="p-3">string</td>
          <td className="p-3">—</td>
          <td className="p-3">Class for icons (title + item)</td>
        </tr>
        <tr>
          <td className="p-3">subListClassName</td>
          <td className="p-3">string</td>
          <td className="p-3">—</td>
          <td className="p-3">Class for nested sub-lists</td>
        </tr>

        {/* Style Customization */}
        <tr>
          <td className="p-3">style</td>
          <td className="p-3">CSSProperties</td>
          <td className="p-3">—</td>
          <td className="p-3">Inline styles for container</td>
        </tr>
        <tr>
          <td className="p-3">listStyle</td>
          <td className="p-3">CSSProperties</td>
          <td className="p-3">—</td>
          <td className="p-3">Inline styles for ul/ol</td>
        </tr>
        <tr>
          <td className="p-3">itemStyle</td>
          <td className="p-3">CSSProperties</td>
          <td className="p-3">—</td>
          <td className="p-3">Inline styles for each item row</td>
        </tr>
        <tr>
          <td className="p-3">titleStyle</td>
          <td className="p-3">CSSProperties</td>
          <td className="p-3">—</td>
          <td className="p-3">Inline styles for title</td>
        </tr>
        <tr>
          <td className="p-3">bulletStyle</td>
          <td className="p-3">CSSProperties</td>
          <td className="p-3">—</td>
          <td className="p-3">Inline styles for bullets</td>
        </tr>
        <tr>
          <td className="p-3">textStyle</td>
          <td className="p-3">CSSProperties</td>
          <td className="p-3">—</td>
          <td className="p-3">Inline styles for item text</td>
        </tr>
        <tr>
          <td className="p-3">iconStyle</td>
          <td className="p-3">CSSProperties</td>
          <td className="p-3">—</td>
          <td className="p-3">Inline styles for icons</td>
        </tr>
        <tr>
          <td className="p-3">subListStyle</td>
          <td className="p-3">CSSProperties</td>
          <td className="p-3">—</td>
          <td className="p-3">Inline styles for nested lists</td>
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
                  <code>{'<List type="inline" items={[]} />'}</code>
                  <p className="text-gray-500 text-xs mt-1">Inline lists require proper spacing via gap classes; avoid using margin on items.</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-red-500">
                <X size={16} className="mt-1" />
                <div>
                  <code>{'<List items={[]} />'}</code>
                  <p className="text-gray-500 text-xs mt-1">Always provide items array; empty arrays render nothing.</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-green-500">
                <Check size={16} className="mt-1" />
                <div>
                  <code>{'<List primaryTheme={false} primaryColor="#f00" />'}</code>
                  <p className="text-gray-500 text-xs mt-1">Custom colors can be applied using primaryTheme=false and primaryColor.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Pro Tips */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Pro Tips</h2>
            <ul className="list-disc list-inside text-gray-200 space-y-1">
              <li>Use <code>subItems</code> to create nested lists with proper indentation.</li>
              <li>Inline lists work well for breadcrumbs or horizontal menus.</li>
              <li>Use icons to highlight key items.</li>
              <li>Click handlers allow interactive list items.</li>
              <li>Customize bullets with <code>bulletClassName</code> or disable primaryTheme for custom colors.</li>
              <li>Combine <code>title</code> and <code>titleIcon</code> for sections or group headers.</li>
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

export default ListDocs;