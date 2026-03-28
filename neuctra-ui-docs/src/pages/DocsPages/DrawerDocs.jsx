"use client";
import React, { useState } from "react";
import { Drawer, DrawerButton } from "@neuctra/ui";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import DocsFooter from "../../components/Docs/DocsFooter";
import Metadata from "../../MetaData";

const DrawerDocs = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Metadata
        title="Drawer Component — Neuctra UI"
        description="Learn how to use the Drawer component from Neuctra UI — a responsive sliding panel for menus, modals, and sidebars."
      />

      <div className="bg-zinc-950 text-gray-200 min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4 space-y-10">
          
          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold text-white mb-3">
              Drawer Component
            </h1>
            <p className="text-gray-400 max-w-3xl">
              The <span className="text-primary font-semibold">Drawer</span>{" "}
              component is a flexible sliding panel that appears from any side
              of the screen. Ideal for navigation menus, filters, and side
              content.
            </p>
          </header>

          {/* Drawer Button */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Drawer Button
            </h2>

            <CodePreviewBlock
              language="jsx"
              code={`<DrawerButton onClick={() => setOpen(true)}>
  Open Drawer
</DrawerButton>`}
              previewContent={
                <DrawerButton onClick={() => setOpen(true)} />
              }
            />
          </section>

          {/* Basic Drawer */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Basic Drawer
            </h2>

            <CodePreviewBlock
              language="jsx"
              code={`<Drawer
  open={open}
  onClose={() => setOpen(false)}
  position="right"
  size="320px"
>
  <h2 className="text-lg font-bold mb-2">Drawer Content</h2>
  <p>This is a simple drawer example.</p>
</Drawer>`}
              previewContent={
                <>
                  <DrawerButton onClick={() => setOpen(true)} />
                  <Drawer
                    open={open}
                    onClose={() => setOpen(false)}
                    position="right"
                    size="320px"
                  >
                    <h2 className="text-lg font-bold mb-2">
                      Drawer Content
                    </h2>
                    <p>This is a simple drawer example.</p>
                  </Drawer>
                </>
              }
            />
          </section>

          {/* Positions */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Positions
            </h2>

            <CodePreviewBlock
              language="jsx"
              code={`<>
  <Drawer position="left" />
  <Drawer position="right" />
  <Drawer position="top" />
  <Drawer position="bottom" />
</>`}
              previewContent={
                <div className="text-gray-400">
                  Supports: left, right, top, bottom
                </div>
              }
            />
          </section>

          {/* Custom Styling */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Custom Styling
            </h2>

            <CodePreviewBlock
              language="jsx"
              code={`<Drawer
  open={open}
  onClose={() => setOpen(false)}
  className="bg-zinc-900 text-white"
  overlayClassName="bg-black/70"
  showCloseButton={true}
>
  <p>Styled drawer</p>
</Drawer>`}
              previewContent={
                <Drawer
                  open={open}
                  onClose={() => setOpen(false)}
                  className="bg-zinc-900 text-white"
                  overlayClassName="bg-black/70"
                >
                  <p>Styled drawer</p>
                </Drawer>
              }
            />
          </section>

          {/* Props Table */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Props
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border border-zinc-800">
                <thead className="bg-zinc-900 text-gray-300">
                  <tr>
                    <th className="px-4 py-2 border-r border-zinc-800">Prop</th>
                    <th className="px-4 py-2 border-r border-zinc-800">Type</th>
                    <th className="px-4 py-2">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">

                  <tr>
                    <td className="px-4 py-2 text-primary">open</td>
                    <td className="px-4 py-2">boolean</td>
                    <td>Controls drawer visibility</td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 text-primary">onClose</td>
                    <td className="px-4 py-2">() =&gt; void</td>
                    <td>Callback when overlay or close button is clicked</td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 text-primary">position</td>
                    <td className="px-4 py-2">
                      "left" | "right" | "top" | "bottom"
                    </td>
                    <td>Drawer slide direction</td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 text-primary">size</td>
                    <td className="px-4 py-2">string</td>
                    <td>Width or height depending on position</td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 text-primary">className</td>
                    <td className="px-4 py-2">string</td>
                    <td>Custom styles for drawer panel</td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 text-primary">
                      overlayClassName
                    </td>
                    <td className="px-4 py-2">string</td>
                    <td>Custom styles for overlay</td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 text-primary">
                      showCloseButton
                    </td>
                    <td className="px-4 py-2">boolean</td>
                    <td>Toggle close button visibility</td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 text-primary">
                      closeButtonClassName
                    </td>
                    <td className="px-4 py-2">string</td>
                    <td>Custom styles for close button</td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 text-primary">children</td>
                    <td className="px-4 py-2">ReactNode</td>
                    <td>Drawer content</td>
                  </tr>

                </tbody>
              </table>
            </div>
          </section>

          <DocsFooter />
        </div>
      </div>
    </>
  );
};

export default DrawerDocs;