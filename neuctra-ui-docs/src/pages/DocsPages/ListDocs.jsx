"use client";

import React from "react";
import Metadata from "../../MetaData";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import CodeBlock from "../../components/Docs/CodeBlock";
import { List } from "@neuctra/ui";
import { Check, X } from "lucide-react";
import DocsFooter from "../../components/Docs/DocsFooter";

const ListDocs = () => {
  const sampleItems = [
    { text: "First item" },
    { text: "Second item" },
    {
      text: "Third item",
      subItems: [{ text: "Nested A" }, { text: "Nested B" }],
    },
  ];

  return (
    <>
      <Metadata
        title="List Component — Neuctra UI"
        description="Flexible List component with support for nested items, tree view, inline layout, icons, and full customization."
        keywords="React List component, nested list, tree list, inline list, ordered list, UI component"
      />

      <div className="font-primary min-h-screen">
        <div className="space-y-10">
          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              List Component
            </h1>

            <p className="text-sm leading-relaxed text-gray-200">
              The <span className="text-primary font-semibold">List</span>{" "}
              component is a flexible and composable UI primitive built with
              TypeScript. It supports <strong>unordered</strong>,{" "}
              <strong>ordered</strong>, and <strong>inline</strong> layouts,
              along with nested structures, optional tree visualization, icons,
              and interactive items.
            </p>

            <p className="text-sm text-gray-400 mt-3 leading-relaxed">
              Use <code>type</code> to control layout, <code>subItems</code> for
              nesting, <code>showTree</code> for hierarchy visualization, and
              styling props like <code>bulletClassName</code> or{" "}
              <code>itemClassName</code> for customization.
            </p>
          </header>

          {/* Import */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Import Component From Library
            </h2>
            <CodeBlock code={`import { List } from "@neuctra/ui";`} />
          </section>

          {/* Basic Usage */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Usage Code
            </h2>
            <p className="text-gray-300 mb-4">
              Start with a simple list. The component supports unordered, ordered,
              inline layouts, nested structures, and tree visualization.
            </p>
            <CodeBlock
              language="jsx"
              code={`import { List } from '@neuctra/ui';

function BasicExample() {
  const items = [
    { text: "First item" },
    { text: "Second item" },
    {
      text: "Third item",
      subItems: [
        { text: "Nested A" },
        { text: "Nested B" }
      ]
    }
  ];

  return (
    <List items={items} />
  );
}`}
            />
          </section>

          {/* Basic Usage */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Example
            </h2>

            <CodePreviewBlock
              language="jsx"
              code={`<List 
  items={[
    { text: "Item 1" },
    { text: "Item 2" },
    {
      text: "Item 3",
      subItems: [
        { text: "Nested 1" },
        { text: "Nested 2" }
      ]
    }
  ]}
/>`}
              previewContent={<List items={sampleItems} />}
            />
          </section>

          {/* Item Structure */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Item Structure
            </h2>

            <p className="text-sm text-gray-300 mb-3 leading-relaxed">
              Each item in the <code>items</code> array follows the{" "}
              <code>ListItemType</code> structure. This allows you to build
              simple, nested, or interactive lists.
            </p>

            <CodeBlock
              code={`type ListItemType = {
  text: string;                 // Required: label of the item
  icon?: ReactNode;             // Optional: icon before text
  onClick?: () => void;         // Optional: click handler
  subItems?: ListItemType[];    // Optional: nested children
};`}
            />

            <div className="mt-4 space-y-3 text-sm text-gray-300">
              <p>
                <strong className="text-white">text</strong> — The visible label
                of the list item.
              </p>

              <p>
                <strong className="text-white">icon</strong> — Adds a visual
                icon before the text.
              </p>

              <p>
                <strong className="text-white">onClick</strong> — Makes the item
                interactive.
              </p>

              <p>
                <strong className="text-white">subItems</strong> — Creates
                nested lists (supports infinite depth).
              </p>
            </div>
          </section>

          {/* Variants */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              List Types
            </h2>

            <div className="space-y-6">
              <CodePreviewBlock
                language="jsx"
                code={`<List 
  title="Inline Navigation"
  type="inline"
  items={[
    { text: "Home" },
    { text: "About" },
    { text: "Contact" },
  ]}
/>`}
                previewContent={
                  <List
                    title="Inline Navigation"
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
  title="Ordered Steps"
  type="ordered"
  items={[
    { text: "Install dependencies" },
    { text: "Configure project" },
    { text: "Run application" },
  ]}
/>`}
                previewContent={
                  <List
                    title="Ordered Steps"
                    type="ordered"
                    items={[
                      { text: "Install dependencies" },
                      { text: "Configure project" },
                      { text: "Run application" },
                    ]}
                  />
                }
              />
            </div>
          </section>

          {/* Tree Mode */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Tree View (Hierarchy)
            </h2>

            <CodePreviewBlock
              language="jsx"
              code={`<List 
  showTree
  items={[
    {
      text: "Parent",
      subItems: [
        { text: "Child 1" },
        { text: "Child 2" }
      ]
    }
  ]}
/>`}
              previewContent={<List items={sampleItems} showTree />}
            />
          </section>

          {/* Props Table */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Props Table
            </h2>

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
                    <td className="p-3">items</td>
                    <td className="p-3">ListItemType[]</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Main data source for the list. Supports nested{" "}
                      <code>subItems</code>.
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">type</td>
                    <td className="p-3">"unordered" | "ordered" | "inline"</td>
                    <td className="p-3">"unordered"</td>
                    <td className="p-3">
                      Controls layout:
                      <br />• <code>unordered</code> → custom bullets
                      <br />• <code>ordered</code> → numbered list
                      <br />• <code>inline</code> → horizontal layout
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">showTree</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">
                      Enables tree-style hierarchy lines for nested items.
                    </td>
                  </tr>

                  {/* Title */}
                  <tr>
                    <td className="p-3">title</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Optional heading displayed above the list
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">titleIcon</td>
                    <td className="p-3">ReactNode</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Icon displayed before the title</td>
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
                    <td className="p-3">Class for the ul/ol element</td>
                  </tr>

                  <tr>
                    <td className="p-3">itemClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Class applied to each list item (li)
                    </td>
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
                    <td className="p-3">Class for custom bullet dot</td>
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
                    <td className="p-3">Class for all icons (title + items)</td>
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
                    <td className="p-3">Inline styles for wrapper container</td>
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
                    <td className="p-3">Inline styles for each item (li)</td>
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
                    <td className="p-3">Inline styles for bullet dot</td>
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
            <h2 className="text-2xl font-semibold text-white mb-4">
              Common Mistakes
            </h2>

            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex gap-2 text-red-500">
                <X size={16} />
                <div>
                  <code>{'<List primaryColor="#f00" />'}</code>
                  <p className="text-xs text-gray-400">
                    This prop does not exist. Use styling props instead.
                  </p>
                </div>
              </div>

              <div className="flex gap-2 text-red-500">
                <X size={16} />
                <div>
                  <code>{"<List items={[]} />"}</code>
                  <p className="text-xs text-gray-400">
                    Empty list renders nothing.
                  </p>
                </div>
              </div>

              <div className="flex gap-2 text-green-500">
                <Check size={16} />
                <div>
                  <code>{"<List showTree items={[...]} />"}</code>
                  <p className="text-xs text-gray-400">
                    Use showTree for hierarchy visualization.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Pro Tips */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Pro Tips</h2>

            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                Use <code>showTree</code> for nested navigation UIs.
              </li>
              <li>
                Use <code>type="inline"</code> for menus & breadcrumbs.
              </li>
              <li>Add icons for better visual hierarchy.</li>
              <li>
                Use <code>onClick</code> to make items interactive.
              </li>
              <li>
                Customize via className instead of inline styles when possible.
              </li>
            </ul>
          </section>

          {/* Footer */}
          <DocsFooter />
        </div>
      </div>
    </>
  );
};

export default ListDocs;
