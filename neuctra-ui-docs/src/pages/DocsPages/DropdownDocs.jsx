"use client";

import React from "react";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import { Dropdown } from "@neuctra/ui";
import Metadata from "../../MetaData";
import CodeBlock from "../../components/Docs/CodeBlock";
import { MoreVertical, Edit, Trash2, Copy, Eye, Check, X } from "lucide-react";

const DropdownDocs = () => {
  return (
    <>
      <Metadata
        title="Dropdown Component — Neuctra UI"
        description="Learn how to use the Dropdown component in Neuctra UI — fully customizable action menus with icons, separators, and flexible positioning."
        keywords="Neuctra UI Dropdown, React dropdown menu, action menu component, Tailwind dropdown, UI library React"
      />

      <div className="font-primary min-h-screen">
        <div className="space-y-10">
          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-foreground">
              Dropdown Component
            </h1>

            <p className="text-sm leading-relaxed text-muted-foreground">
              The <span className="text-primary font-semibold">Dropdown</span>{" "}
              component is a flexible, fully customizable action menu built for
              modern applications. It supports icons, separators, danger states,
              controlled/uncontrolled behavior, and theme-aware styling.
            </p>

            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              Use <code>items</code> to define menu actions,{" "}
              <code>trigger</code> for the toggle element, and{" "}
              <code>align</code> + <code>width</code> for layout control.
            </p>
          </header>

          {/* Import */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-foreground">
              Import Component From Library
            </h2>
            <CodeBlock code={`import { Dropdown } from "@neuctra/ui";`} />
          </section>

          {/* Basic Usage */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              Basic Example
            </h2>

            <CodePreviewBlock
              language="jsx"
              code={`<Dropdown
  trigger={<button>Open</button>}
  items={[
    { label: "Edit", onClick: () => {} },
    { label: "Delete", danger: true, onClick: () => {} },
  ]}
/>`}
              previewContent={
                <div className="w-full flex items-center justify-center">
                  <Dropdown
                    trigger={<button className="text-sm">Open Dropdown</button>}
                    items={[
                      {
                        label: "Edit",
                        icon: <Edit size={16} />,
                        onClick: () => alert("Edit clicked"),
                      },
                      {
                        label: "Copy",
                        icon: <Copy size={16} />,
                        onClick: () => alert("Copy clicked"),
                      },
                      { separator: true },
                      {
                        label: "Preview",
                        icon: <Eye size={16} />,
                        onClick: () => alert("Preview clicked"),
                      },
                      { separator: true },
                      {
                        label: "Delete",
                        icon: <Trash2 size={16} />,
                        danger: true,
                        onClick: () => alert("Delete clicked"),
                      },
                    ]}
                  />
                </div>
              }
            />
          </section>

          {/* Props Table */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Props Table
            </h2>

            <div className="border border-border rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-accent text-foreground">
                  <tr>
                    <th className="text-left p-3">Prop</th>
                    <th className="text-left p-3">Type</th>
                    <th className="text-left p-3">Default</th>
                    <th className="text-left p-3">Description</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border text-muted-foreground">
                  <tr>
                    <td className="p-3">trigger</td>
                    <td className="p-3">React.ReactNode</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Element that toggles dropdown.</td>
                  </tr>

                  <tr>
                    <td className="p-3">items</td>
                    <td className="p-3">DropdownItem[]</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Array of menu items.</td>
                  </tr>

                  <tr>
                    <td className="p-3">open</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Controlled open state.</td>
                  </tr>

                  <tr>
                    <td className="p-3">onOpenChange</td>
                    <td className="p-3">(open: boolean) =&gt; void</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Triggered when state changes.</td>
                  </tr>

                  <tr>
                    <td className="p-3">align</td>
                    <td className="p-3">"left" | "right"</td>
                    <td className="p-3">"right"</td>
                    <td className="p-3">Menu alignment.</td>
                  </tr>

                  <tr>
                    <td className="p-3">width</td>
                    <td className="p-3">number</td>
                    <td className="p-3">220</td>
                    <td className="p-3">Dropdown width.</td>
                  </tr>

                  <tr>
                    <td className="p-3">closeOnClick</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">true</td>
                    <td className="p-3">
                      Close dropdown when item is clicked.
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">className</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Wrapper styling.</td>
                  </tr>

                  <tr>
                    <td className="p-3">menuClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Dropdown container styling.</td>
                  </tr>

                  <tr>
                    <td className="p-3">itemClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Item styling.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Common Mistakes */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Common Mistakes
            </h2>

            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex items-start gap-2 text-destructive">
                <X size={16} />
                <div>
                  <code>{"<Dropdown items={{}} />"}</code>
                  <p className="text-xs mt-1">
                    items must be an array, not an object
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-destructive">
                <X size={16} />
                <div>
                  <code>{"<Dropdown trigger='Open' />"}</code>
                  <p className="text-xs mt-1">
                    trigger should be a React element, not a string
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-green-500">
                <Check size={16} />
                <div>
                  <code>{'<Dropdown align="left" />'}</code>
                  <p className="text-xs mt-1">
                    Use align prop for positioning instead of hacks
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Pro Tips */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">
              Pro Tips
            </h2>

            <ul className="list-disc list-inside text-muted-foreground space-y-2 text-sm">
              <li>
                Use <code>separator</code> to visually group actions.
              </li>
              <li>
                Use <code>danger</code> for destructive actions like delete.
              </li>
              <li>
                Combine Dropdown with your <code>Button</code> component for
                consistent UI.
              </li>
              <li>
                Use controlled mode (<code>open</code>) for advanced flows.
              </li>
              <li>Keep item labels short and action-focused.</li>
            </ul>
          </section>

          {/* Footer */}
          <footer className="pt-8 border-t border-border text-sm text-muted-foreground">
            Built with <span className="text-primary">React</span>,{" "}
            <span className="text-primary">Tailwind CSS</span> &{" "}
            <span className="text-primary">TypeScript</span>.
          </footer>
        </div>
      </div>
    </>
  );
};

export default DropdownDocs;
