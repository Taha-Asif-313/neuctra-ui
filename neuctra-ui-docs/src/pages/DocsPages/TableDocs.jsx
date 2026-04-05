"use client";

import React from "react";
import Metadata from "../../MetaData";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import CodeBlock from "../../components/Docs/CodeBlock";
import { Table, THead, TBody, TRow, TH, TD } from "@neuctra/ui";

const TableDocs = () => {
  return (
    <>
      <Metadata
        title="Table Component — Neuctra UI"
        description="Fully customizable, responsive table component with dark/light support, className overrides, and inline styles."
        keywords="Neuctra UI Table, React Table component, responsive table, customizable table, Tailwind table"
      />

      <div className="bg-white dark:bg-zinc-950 text-gray-900 dark:text-gray-200 font-primary min-h-screen py-10">
        <div className="mx-auto px-4 space-y-10">

          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-gray-900 dark:text-white">
              Table Component
            </h1>
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              The <span className="text-primary font-semibold">Table</span> component provides a fully responsive and highly customizable data table system. 
              Supports dark/light mode, inline styles, className overrides, and flexible structure using head, body, rows, and cells.
            </p>
          </header>

          {/* Import */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">Import Component</h2>
            <CodeBlock
              language="tsx"
              code={`import { Table, THead, TBody, TRow, TH, TD } from "@neuctra/ui";`}
            />
          </section>

          {/* Basic Example */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Basic Example</h2>
            <CodePreviewBlock
              language="tsx"
              code={`<Table>
  <THead>
    <TRow>
      <TH>Name</TH>
      <TH>Email</TH>
    </TRow>
  </THead>
  <TBody>
    <TRow>
      <TD>John</TD>
      <TD>john@example.com</TD>
    </TRow>
  </TBody>
</Table>`}
              previewContent={
                <Table>
                  <THead>
                    <TRow>
                      <TH>Name</TH>
                      <TH>Email</TH>
                    </TRow>
                  </THead>
                  <TBody>
                    <TRow>
                      <TD>John</TD>
                      <TD>john@example.com</TD>
                    </TRow>
                  </TBody>
                </Table>
              }
            />
          </section>

          {/* Responsive Example */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Responsive Table</h2>
            <CodePreviewBlock
              language="tsx"
              code={`<Table responsive>
  {/* content */}
</Table>`}
              previewContent={
                <Table responsive>
                  <THead>
                    <TRow>
                      <TH>Product</TH>
                      <TH>Price</TH>
                      <TH>Status</TH>
                    </TRow>
                  </THead>
                  <TBody>
                    <TRow>
                      <TD>MacBook</TD>
                      <TD>$2000</TD>
                      <TD>Available</TD>
                    </TRow>
                  </TBody>
                </Table>
              }
            />
          </section>

          {/* Custom Styling */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Custom Styling</h2>
            <CodePreviewBlock
              language="tsx"
              code={`<Table className="rounded-xl" style={{ borderColor: "red" }}>
  <THead className="bg-black text-white">
    <TRow>
      <TH>Custom</TH>
      <TH>Styled</TH>
    </TRow>
  </THead>
  <TBody>
    <TRow hoverClassName="hover:bg-blue-100">
      <TD>Row</TD>
      <TD>Style</TD>
    </TRow>
  </TBody>
</Table>`}
              previewContent={
                <Table className="rounded-xl" style={{ borderColor: "red" }}>
                  <THead className="bg-black text-white">
                    <TRow>
                      <TH>Custom</TH>
                      <TH>Styled</TH>
                    </TRow>
                  </THead>
                  <TBody>
                    <TRow hoverClassName="hover:bg-blue-100">
                      <TD>Row</TD>
                      <TD>Style</TD>
                    </TRow>
                  </TBody>
                </Table>
              }
            />
          </section>

          {/* Props Table */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Props Table</h2>
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
                  <tr><td className="p-3">responsive</td><td className="p-3">boolean</td><td className="p-3">true</td><td className="p-3">Enable horizontal scrolling</td></tr>
                  <tr><td className="p-3">className</td><td className="p-3">string</td><td className="p-3">—</td><td className="p-3">Wrapper class</td></tr>
                  <tr><td className="p-3">style</td><td className="p-3">CSSProperties</td><td className="p-3">—</td><td className="p-3">Wrapper styles</td></tr>
                  <tr><td className="p-3">tableClassName</td><td className="p-3">string</td><td className="p-3">—</td><td className="p-3">Table class</td></tr>
                  <tr><td className="p-3">tableStyle</td><td className="p-3">CSSProperties</td><td className="p-3">—</td><td className="p-3">Table styles</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Tips */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">Pro Tips</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Use <code>responsive</code> for mobile-friendly tables.</li>
              <li>Override styles using <code>className</code> or inline styles.</li>
              <li>Use <code>hoverClassName</code> for row interactions.</li>
              <li>Combine with pagination or virtualization for large data.</li>
              <li>Keep columns minimal for better UX on small screens.</li>
            </ul>
          </section>

          {/* Footer */}
          <footer className="pt-8 border-t border-gray-800 text-sm text-gray-400">
            Built with React, Tailwind CSS & TypeScript.
          </footer>

        </div>
      </div>
    </>
  );
};

export default TableDocs;
