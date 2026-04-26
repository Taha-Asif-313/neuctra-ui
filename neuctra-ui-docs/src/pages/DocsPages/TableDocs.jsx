"use client";

import React from "react";
import Metadata from "../../MetaData";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import CodeBlock from "../../components/Docs/CodeBlock";
import { Table, THead, TBody, TRow, TH, TD } from "@neuctra/ui";
import DocsFooter from "../../components/Docs/DocsFooter";

const TableDocs = () => {
  return (
    <>
      <Metadata
        title="Table Component — Neuctra UI"
        description="Fully customizable, responsive table component optimized for dark mode, with className overrides and inline styles."
        keywords="Neuctra UI Table, React Table component, responsive table, customizable table, Tailwind table"
      />

      <div className="font-primary min-h-screen">
        <div className="space-y-10">
          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              Table Component
            </h1>
            <p className="text-sm leading-relaxed text-gray-300">
              The <span className="text-primary font-semibold">Table</span>{" "}
              component provides a fully responsive and highly customizable data
              table system. Optimized for dark mode, with inline styles,
              className overrides, and flexible structure using head, body,
              rows, and cells.
            </p>
          </header>

          {/* Import */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Import Component From Library
            </h2>
            <CodeBlock
              code={`import { Table, THead, TBody, TRow, TH, TD } from "@neuctra/ui";`}
            />
          </section>

          {/* Basic Example */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Example
            </h2>
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
                <Table striped bordered>
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

                    <TRow>
                      <TD>Ali Khan</TD>
                      <TD>ali@example.com</TD>
                    </TRow>

                    <TRow>
                      <TD>Ahmed Raza</TD>
                      <TD>ahmed@example.com</TD>
                    </TRow>
                  </TBody>
                </Table>
              }
            />
          </section>

          {/* Responsive Example */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Responsive Table
            </h2>
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
                      <TH>Category</TH>
                      <TH>Price</TH>
                      <TH>Stock</TH>
                      <TH>Status</TH>
                      <TH>Rating</TH>
                    </TRow>
                  </THead>

                  <TBody>
                    <TRow>
                      <TD>MacBook Pro</TD>
                      <TD>Laptop</TD>
                      <TD>$2000</TD>
                      <TD>12</TD>
                      <TD>Available</TD>
                      <TD>4.8</TD>
                    </TRow>

                    <TRow>
                      <TD>iPhone 15</TD>
                      <TD>Mobile</TD>
                      <TD>$1200</TD>
                      <TD>30</TD>
                      <TD>Available</TD>
                      <TD>4.7</TD>
                    </TRow>

                    <TRow>
                      <TD>AirPods Pro</TD>
                      <TD>Accessories</TD>
                      <TD>$250</TD>
                      <TD>50</TD>
                      <TD>In Stock</TD>
                      <TD>4.6</TD>
                    </TRow>

                    <TRow>
                      <TD>iPad Air</TD>
                      <TD>Tablet</TD>
                      <TD>$900</TD>
                      <TD>8</TD>
                      <TD>Limited</TD>
                      <TD>4.5</TD>
                    </TRow>
                  </TBody>
                </Table>
              }
            />
          </section>

          {/* Custom Styling */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Custom Styling
            </h2>
            <CodePreviewBlock
              language="tsx"
              code={`<Table className="rounded-xl" striped hoverable>
  <THead>
    <TRow>
      <TH className="text-primary">Name</TH>
      <TH className="text-primary">Role</TH>
      <TH className="text-primary">Status</TH>
    </TRow>
  </THead>
  <TBody>
    <TRow>
      <TD className="font-semibold">Sarah</TD>
      <TD>Developer</TD>
      <TD>Active</TD>
    </TRow>
    <TRow>
      <TD className="font-semibold">Mike</TD>
      <TD>Designer</TD>
      <TD>Active</TD>
    </TRow>
  </TBody>
</Table>`}
              previewContent={
                <Table className="rounded-xl" striped hoverable>
                  <THead>
                    <TRow>
                      <TH className="text-primary">Name</TH>
                      <TH className="text-primary">Role</TH>
                      <TH className="text-primary">Status</TH>
                    </TRow>
                  </THead>
                  <TBody>
                    <TRow>
                      <TD className="font-semibold">Sarah</TD>
                      <TD>Developer</TD>
                      <TD>Active</TD>
                    </TRow>
                    <TRow>
                      <TD className="font-semibold">Mike</TD>
                      <TD>Designer</TD>
                      <TD>Active</TD>
                    </TRow>
                  </TBody>
                </Table>
              }
            />
          </section>

          {/* Table Component Props */}
          <section>
            <h3 className="text-xl font-semibold mb-3 text-white">
              Props Reference
            </h3>

            <div className="space-y-8">
              <div>
                <h4 className="text-lg font-semibold mb-2 text-white">Table</h4>
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
                      <tr>
                        <td className="p-3">responsive</td>
                        <td className="p-3">boolean</td>
                        <td className="p-3">true</td>
                        <td className="p-3">
                          Enable horizontal scrolling on narrow screens.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3">striped</td>
                        <td className="p-3">boolean</td>
                        <td className="p-3">false</td>
                        <td className="p-3">
                          Alternate row backgrounds in the body.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3">hoverable</td>
                        <td className="p-3">boolean</td>
                        <td className="p-3">true</td>
                        <td className="p-3">
                          Apply hover state styling to rows.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3">bordered</td>
                        <td className="p-3">boolean</td>
                        <td className="p-3">false</td>
                        <td className="p-3">Add row border separators.</td>
                      </tr>
                      <tr>
                        <td className="p-3">dense</td>
                        <td className="p-3">boolean</td>
                        <td className="p-3">false</td>
                        <td className="p-3">
                          Use smaller cell padding for compact layouts.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3">className</td>
                        <td className="p-3">string</td>
                        <td className="p-3">—</td>
                        <td className="p-3">
                          Custom wrapper container classes.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3">style</td>
                        <td className="p-3">CSSProperties</td>
                        <td className="p-3">—</td>
                        <td className="p-3">Custom wrapper inline styles.</td>
                      </tr>
                      <tr>
                        <td className="p-3">tableClassName</td>
                        <td className="p-3">string</td>
                        <td className="p-3">—</td>
                        <td className="p-3">
                          Custom class for the inner <code>table</code> element.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3">tableStyle</td>
                        <td className="p-3">CSSProperties</td>
                        <td className="p-3">—</td>
                        <td className="p-3">
                          Custom inline styles for the inner <code>table</code>{" "}
                          element.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2 text-white">THead</h4>
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
                      <tr>
                        <td className="p-3">children</td>
                        <td className="p-3">ReactNode</td>
                        <td className="p-3">—</td>
                        <td className="p-3">Header rows and cells.</td>
                      </tr>
                      <tr>
                        <td className="p-3">className</td>
                        <td className="p-3">string</td>
                        <td className="p-3">—</td>
                        <td className="p-3">
                          Custom class names for the header section.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3">style</td>
                        <td className="p-3">CSSProperties</td>
                        <td className="p-3">—</td>
                        <td className="p-3">
                          Custom inline styles for the header section.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3">bordered</td>
                        <td className="p-3">boolean</td>
                        <td className="p-3">—</td>
                        <td className="p-3">
                          Pass border state into header rows.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2 text-white">TBody</h4>
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
                      <tr>
                        <td className="p-3">children</td>
                        <td className="p-3">ReactNode</td>
                        <td className="p-3">—</td>
                        <td className="p-3">Body rows and cells.</td>
                      </tr>
                      <tr>
                        <td className="p-3">className</td>
                        <td className="p-3">string</td>
                        <td className="p-3">—</td>
                        <td className="p-3">
                          Custom class names for the body section.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3">style</td>
                        <td className="p-3">CSSProperties</td>
                        <td className="p-3">—</td>
                        <td className="p-3">
                          Custom inline styles for the body section.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3">striped</td>
                        <td className="p-3">boolean</td>
                        <td className="p-3">—</td>
                        <td className="p-3">
                          Forward striped state to child rows.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3">hoverable</td>
                        <td className="p-3">boolean</td>
                        <td className="p-3">—</td>
                        <td className="p-3">
                          Forward hoverable state to child rows.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3">bordered</td>
                        <td className="p-3">boolean</td>
                        <td className="p-3">—</td>
                        <td className="p-3">
                          Forward bordered state to child rows.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2 text-white">TRow</h4>
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
                      <tr>
                        <td className="p-3">children</td>
                        <td className="p-3">ReactNode</td>
                        <td className="p-3">—</td>
                        <td className="p-3">Row cells and nested content.</td>
                      </tr>
                      <tr>
                        <td className="p-3">className</td>
                        <td className="p-3">string</td>
                        <td className="p-3">—</td>
                        <td className="p-3">Custom class names for the row.</td>
                      </tr>
                      <tr>
                        <td className="p-3">style</td>
                        <td className="p-3">CSSProperties</td>
                        <td className="p-3">—</td>
                        <td className="p-3">
                          Custom inline styles for the row.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3">onClick</td>
                        <td className="p-3">() =&gt; void</td>
                        <td className="p-3">—</td>
                        <td className="p-3">Add a click handler to the row.</td>
                      </tr>
                      <tr>
                        <td className="p-3">striped</td>
                        <td className="p-3">boolean</td>
                        <td className="p-3">—</td>
                        <td className="p-3">Set striped state on this row.</td>
                      </tr>
                      <tr>
                        <td className="p-3">hoverable</td>
                        <td className="p-3">boolean</td>
                        <td className="p-3">—</td>
                        <td className="p-3">
                          Enable hover styling for this row.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3">bordered</td>
                        <td className="p-3">boolean</td>
                        <td className="p-3">—</td>
                        <td className="p-3">Show the row border in the row.</td>
                      </tr>
                      <tr>
                        <td className="p-3">index</td>
                        <td className="p-3">number</td>
                        <td className="p-3">0</td>
                        <td className="p-3">
                          Row index used for striped styling.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2 text-white">TH</h4>
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
                      <tr>
                        <td className="p-3">children</td>
                        <td className="p-3">ReactNode</td>
                        <td className="p-3">—</td>
                        <td className="p-3">Header cell content.</td>
                      </tr>
                      <tr>
                        <td className="p-3">className</td>
                        <td className="p-3">string</td>
                        <td className="p-3">—</td>
                        <td className="p-3">
                          Custom classes for the header cell.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3">style</td>
                        <td className="p-3">CSSProperties</td>
                        <td className="p-3">—</td>
                        <td className="p-3">
                          Custom inline styles for the header cell.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3">bordered</td>
                        <td className="p-3">boolean</td>
                        <td className="p-3">—</td>
                        <td className="p-3">
                          Apply bottom border to the header cell.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3">dense</td>
                        <td className="p-3">boolean</td>
                        <td className="p-3">false</td>
                        <td className="p-3">
                          Reduce cell padding for compact display.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2 text-white">TD</h4>
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
                      <tr>
                        <td className="p-3">children</td>
                        <td className="p-3">ReactNode</td>
                        <td className="p-3">—</td>
                        <td className="p-3">Cell content.</td>
                      </tr>
                      <tr>
                        <td className="p-3">className</td>
                        <td className="p-3">string</td>
                        <td className="p-3">—</td>
                        <td className="p-3">Custom classes for the cell.</td>
                      </tr>
                      <tr>
                        <td className="p-3">style</td>
                        <td className="p-3">CSSProperties</td>
                        <td className="p-3">—</td>
                        <td className="p-3">
                          Custom inline styles for the cell.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3">dense</td>
                        <td className="p-3">boolean</td>
                        <td className="p-3">false</td>
                        <td className="p-3">
                          Reduce cell padding for compact display.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Tips */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-white">Pro Tips</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>
                Use <code>responsive</code> to enable horizontal scrolling on
                small screens.
              </li>
              <li>
                Combine <code>striped</code> and <code>hoverable</code> for
                better readability.
              </li>
              <li>
                Use <code>dense</code> mode to display more data in limited
                space.
              </li>
              <li>
                Override individual cell styles using <code>className</code> on{" "}
                <code>TH</code> and <code>TD</code>.
              </li>
              <li>
                Add row click handlers with <code>onClick</code> on{" "}
                <code>TRow</code> component.
              </li>
              <li>Combine with pagination components for large datasets.</li>
              <li>Keep columns minimal for better UX on small screens.</li>
            </ul>
          </section>

          {/* Footer */}
          <DocsFooter />
        </div>
      </div>
    </>
  );
};

export default TableDocs;
