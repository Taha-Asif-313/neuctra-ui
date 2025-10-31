"use client";
import React from "react";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import { Table, THead, TBody, TRow, TH, TD } from "@neuctra/ui"; // adjust import path
import Metadata from "../../MetaData";

const TableDocs = () => {
  return (
    <>
      <Metadata
        title="Table Component — Neuctra UI"
        description="Explore the Table component in Neuctra UI — a responsive, dark-themed React table built for modern dashboards and data displays. Customize headers, rows, and hover effects with ease."
        keywords="Neuctra UI Table, React table component, dark table, data display, responsive tables, table hover effects, React UI library, Tailwind CSS UI, modern table design, Neuctra components"
        image="https://ui.neuctra.com/og/table-docs-preview.png"
        ogTitle="Table Component — Neuctra UI"
        ogDescription="Build sleek, dark-themed React tables effortlessly using Neuctra UI’s Table component. Perfect for dashboards, admin panels, and data visualization interfaces."
        twitterTitle="Table Component | Neuctra UI"
        twitterDescription="Discover how to create beautiful, responsive dark tables with Neuctra UI’s Table component — optimized for React apps, dashboards, and data-driven UIs."
        canonical="https://ui.neuctra.com/docs/table"
      />

      <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4 space-y-10">
          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              Table Component
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
              The <span className="text-primary font-semibold">Table</span>{" "}
              component provides a modern, dark-themed, fully composable way to
              display tabular data. Customize headers, rows, and hover effects
              for sleek UI tables.
            </p>
          </header>

          {/* Example 1: Basic Dark Table */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Dark Table
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
                       <TH>Status</TH>
                    </TRow>
                  </THead>
                  <TBody>
                    <TRow>
                      <TD>John Doe</TD>
                      <TD>Developer</TD>
                      <TD>Active</TD>
                       <TD>Active</TD>
                    </TRow>
                    <TRow>
                      <TD>Jane Smith</TD>
                      <TD>Designer</TD>
                      <TD>Inactive</TD>
                             <TD>Inactive</TD>
                    </TRow>
                  </TBody>
                </Table>
              }
            />
          </section>

      

          {/* Footer */}
          <footer className="pt-8 border-t border-gray-800 text-sm text-gray-400">
            <p>
              Built with <span className="text-primary">React</span>,{" "}
              <span className="text-primary">Tailwind CSS</span> &{" "}
              <span className="text-primary">TypeScript</span>.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default TableDocs;
