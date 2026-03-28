"use client";
import React from "react";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import { Table, THead, TBody, TRow, TH, TD } from "@neuctra/ui";
import Metadata from "../../MetaData";

const TableDocs = () => {
  return (
    <>
      <Metadata
        title="Table Component — Neuctra UI"
        description="Learn how to use the Table component in Neuctra UI — a flexible and composable system for building responsive tables in React."
      />

      <div className="bg-zinc-950 text-gray-200 min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4 space-y-10">
          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold text-white mb-3">
              Table Component
            </h1>
            <p className="text-gray-400 max-w-3xl">
              The <span className="text-primary font-semibold">Table</span>{" "}
              component is a fully composable system for displaying structured
              data. It provides separate building blocks like <code>THead</code>
              , <code>TBody</code>, <code>TRow</code>, <code>TH</code>, and{" "}
              <code>TD</code> — giving you complete control over layout and
              styling.
            </p>
          </header>

          {/* Basic Example */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Basic Example
            </h2>

            <CodePreviewBlock
              language="jsx"
              code={`<Table>
  <THead>
    <TRow>
      <TH>Name</TH>
      <TH>Role</TH>
      <TH>Status</TH>
    </TRow>
  </THead>

  <TBody>
    <TRow>
      <TD>John Doe</TD>
      <TD>Developer</TD>
      <TD>Active</TD>
    </TRow>

    <TRow>
      <TD>Jane Smith</TD>
      <TD>Designer</TD>
      <TD>Inactive</TD>
    </TRow>
  </TBody>
</Table>`}
              previewContent={
                <Table>
                  <THead>
                    <TRow>
                      <TH>Name</TH>
                      <TH>Role</TH>
                      <TH>Status</TH>
                    </TRow>
                  </THead>

                  <TBody>
                    <TRow>
                      <TD>John Doe</TD>
                      <TD>Developer</TD>
                      <TD>Active</TD>
                    </TRow>

                    <TRow>
                      <TD>Jane Smith</TD>
                      <TD>Designer</TD>
                      <TD>Inactive</TD>
                    </TRow>
                  </TBody>
                </Table>
              }
            />
          </section>

          {/* Clickable Rows */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Clickable Rows
            </h2>

            <p className="text-gray-400 mb-3">
              You can make rows interactive using{" "}
              <code className="text-primary">onClick</code>.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<TRow onClick={() => alert("Row clicked!")}>
  <TD>John Doe</TD>
  <TD>Developer</TD>
  <TD>Active</TD>
</TRow>`}
              previewContent={
                <Table>
                  <TBody>
                    <TRow onClick={() => alert("Row clicked!")}>
                      <TD>Click Me</TD>
                      <TD>Interactive</TD>
                      <TD>Row</TD>
                    </TRow>
                  </TBody>
                </Table>
              }
            />
          </section>

          {/* Hover Customization */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Hover Effects
            </h2>

            <CodePreviewBlock
              language="jsx"
              code={`<TRow hoverBgColor="#e0f2fe">
  <TD>Custom Hover</TD>
  <TD>Row</TD>
  <TD>Effect</TD>
</TRow>`}
              previewContent={
                <Table>
                  <TBody>
                    <TRow hoverBgColor="#e0f2fe">
                      <TD>Hover Me</TD>
                      <TD>Custom</TD>
                      <TD>Color</TD>
                    </TRow>
                  </TBody>
                </Table>
              }
            />
          </section>

          {/* Dark Mode */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Dark Mode Rows
            </h2>

            <p className="text-gray-400 mb-3">
              Enable dark hover behavior using{" "}
              <code className="text-primary">darkMode</code>.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<TRow darkMode>
  <TD>Dark Mode</TD>
  <TD>Row</TD>
  <TD>Hover</TD>
</TRow>`}
              previewContent={
                <div className="bg-zinc-900 p-4 rounded-lg">
                  <Table className="border-gray-700">
                    <TBody>
                      <TRow darkMode>
                        <TD className="text-gray-300">Dark</TD>
                        <TD className="text-gray-300">Mode</TD>
                        <TD className="text-gray-300">Row</TD>
                      </TRow>
                    </TBody>
                  </Table>
                </div>
              }
            />
          </section>

          {/* Composition Guide */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Component Structure
            </h2>

            <div className="bg-zinc-900 p-4 rounded-lg text-sm text-gray-300">
              <pre>{`Table
 ├── THead
 │    └── TRow
 │         └── TH
 └── TBody
      └── TRow
           └── TD`}</pre>
            </div>
          </section>

          {/* Props */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Props Overview
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border border-zinc-800">
                <thead className="bg-zinc-900 text-gray-300">
                  <tr>
                    <th className="px-4 py-2 border-r border-zinc-800">
                      Component
                    </th>
                    <th className="px-4 py-2 border-r border-zinc-800">Prop</th>
                    <th className="px-4 py-2">Description</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-800">
                  <tr>
                    <td className="px-4 py-2 text-primary">TRow</td>
                    <td className="px-4 py-2">onClick</td>
                    <td>Makes row clickable</td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 text-primary">TRow</td>
                    <td className="px-4 py-2">hoverBgColor</td>
                    <td>Custom hover background</td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 text-primary">TRow</td>
                    <td className="px-4 py-2">darkMode</td>
                    <td>Enables dark hover style</td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 text-primary">All</td>
                    <td className="px-4 py-2">className</td>
                    <td>Custom Tailwind classes</td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 text-primary">All</td>
                    <td className="px-4 py-2">style</td>
                    <td>Inline custom styles</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Footer */}
          <footer className="pt-8 border-t border-zinc-800 text-sm text-gray-400">
            Built with React + Tailwind CSS
          </footer>
        </div>
      </div>
    </>
  );
};

export default TableDocs;
