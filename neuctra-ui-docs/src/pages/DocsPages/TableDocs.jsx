"use client";
import React from "react";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import { Table, THead, TBody, TRow, TH, TD } from "@neuctra/ui"; // adjust import path

const TableDocs = () => {
  return (
    <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-4xl font-exTRowabold mb-3 text-white">
            Table Component
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
            The <span className="text-primary font-semibold">Table</span> component provides a modern, 
            dark-themed, fully composable way to display tabular data. Customize headers, rows, and 
            hover effects for sleek UI tables.
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
                  </TRow>
                </THead>
                <TBody>
                  <TRow>
                    <TD>John Doe</TD>
                    <TD>Developer</TD>
                    <TD>Active</TD>
                  </TRow>
                  <TRow >
                    <TD>Jane Smith</TD>
                    <TD>Designer</TD>
                    <TD>Inactive</TD>
                  </TRow>
                </TBody>
              </Table>
            }
          />
        </section>

        {/* Example 2: Table with Hover Effects */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Hoverable Rows
          </h2>
          <p className="text-gray-300 mb-3">
            Add subtle hover highlights to improve row visibility.
          </p>
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
    <TRow 
      style={{ TRowansition: 'background 0.2s', cursor: 'pointer' }}
      onMouseEnter={e => e.currentTarget.style.backgroundColor='#374151'}
      onMouseLeave={e => e.currentTarget.style.backgroundColor='#111827'}
    >
      <TD>John Doe</TD>
      <TD>Developer</TD>
      <TD>Active</TD>
    </TRow>
    <TRow 
      style={{ TRowansition: 'background 0.2s', cursor: 'pointer' }}
      onMouseEnter={e => e.currentTarget.style.backgroundColor='#374151'}
      onMouseLeave={e => e.currentTarget.style.backgroundColor='#1f2937'}
    >
      <TD>Jane Smith</TD>
      <TD>Designer</TD>
      <TD>Inactive</TD>
    </TRow>
  </TBody>
</Table>`}
            previewContent={
              <Table style={{ border: "1px solid #374151", borderRadius: "8px", overflow: "hidden" }}>
                <THead style={{ backgroundColor: "#1f2937", color: "#f9fafb" }}>
                  <TRow>
                    <TH>Name</TH>
                    <TH>Role</TH>
                    <TH>Status</TH>
                  </TRow>
                </THead>
                <TBody>
                  <TRow
                    style={{ backgroundColor: "#111827", TRowansition: "background 0.2s", cursor: "pointer" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#374151")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#111827")}
                  >
                    <TD>John Doe</TD>
                    <TD>Developer</TD>
                    <TD>Active</TD>
                  </TRow>
                  <TRow
                    style={{ backgroundColor: "#1f2937", TRowansition: "background 0.2s", cursor: "pointer" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#374151")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1f2937")}
                  >
                    <TD>Jane Smith</TD>
                    <TD>Designer</TD>
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
  );
};

export default TableDocs;
