"use client";

import React, { useState } from "react";
import Metadata from "../../MetaData";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import CodeBlock from "../../components/Docs/CodeBlock";
import { Drawer, DrawerButton } from "@neuctra/ui";
import { Menu, Check, X } from "lucide-react";

/* ---------------- Helper component per drawer example ---------------- */
const DrawerExample = ({
  label = "Open Drawer",
  position = "right",
  children,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <DrawerButton
        label={label}
        className="gap-2"
        icon={<Menu size={20} />}
        onClick={() => setOpen(true)}
      />

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        position={position}
        className="z-[2000]"
      >
        {children ? (
          children
        ) : (
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-2">{position} Drawer</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Hello from {position} drawer 👋
            </p>
          </div>
        )}
      </Drawer>
    </div>
  );
};

const HeadlessDrawerExample = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <DrawerButton label="Open Headless Drawer" onClick={() => setOpen(true)} />

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        showCloseButton={false}
        position="right"
        renderContent={(close) => (
          <div className="p-6">
            <p className="mb-4 text-lg font-semibold">Fully custom content</p>

            <button
              onClick={close}
              className="px-4 py-2 rounded bg-primary text-white hover:opacity-90"
            >
              Close Drawer
            </button>
          </div>
        )}
      />
    </div>
  );
};

const DrawerDocs = () => {
  return (
    <>
      <Metadata
        title="Drawer Component — Neuctra UI"
        description="A fully customizable, headless Drawer component with overlay, positions, animations, and full styling control."
        keywords="Drawer React, sidebar panel, modal drawer, headless drawer, Neuctra UI"
      />

      <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
        <div className="mx-auto px-4 space-y-10">
          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              Drawer Component
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed">
              The <span className="text-primary font-semibold">Drawer</span>{" "}
              component provides a flexible sliding panel from any screen edge.
              It supports full customization via className and inline styles,
              multiple positions, overlay control, and headless rendering.
            </p>
          </header>

          {/* Import */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Import Component
            </h2>
            <CodeBlock
              language="tsx"
              code={`import { Drawer, DrawerButton } from "@neuctra/ui";`}
            />
          </section>

          {/* ---------------- Basic Usage ---------------- */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Example
            </h2>

            <CodePreviewBlock
              language="tsx"
              code={`// 1. Control drawer state
const [open, setOpen] = useState(false);

// 2. Trigger button
<DrawerButton
  label="Open Drawer"
  onClick={() => setOpen(true)}
/>

// 3. Drawer component
<Drawer
  open={open}
  onClose={() => setOpen(false)}
  position="right"
>
  <div className="p-6 text-lg font-semibold">
    Hello from Drawer 👋
  </div>
</Drawer>`}
              previewContent={<DrawerExample />}
            />
          </section>

          {/* ---------------- Headless Mode ----------------  */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Headless Mode (renderContent)
            </h2>

            <CodePreviewBlock
              language="tsx"
              code={`// Headless = you control everything inside
const [open, setOpen] = useState(false);

<DrawerButton
  label="Headless Drawer"
  onClick={() => setOpen(true)}
/>

<Drawer
  open={open}
  onClose={() => setOpen(false)}
  showCloseButton={false}
  position="right"
  renderContent={(close) => (
    <div className="p-6">
      <p className="mb-4 text-lg font-semibold">
        Fully custom content
      </p>

      <button
        onClick={close}
        className="px-4 py-2 rounded bg-primary text-white hover:opacity-90"
      >
        Close Drawer
      </button>
    </div>
  )}
/>`}
              previewContent={<HeadlessDrawerExample />}
            />
          </section>

          {/* ---------------- Helper for Headless Preview ---------------- */}

          {/* Props Table — Drawer */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Drawer Props
            </h2>

            <div className="border border-zinc-800 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-zinc-900 text-gray-200">
                  <tr>
                    <th className="p-3 text-left">Prop</th>
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-left">Default</th>
                    <th className="p-3 text-left">Description</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-800 text-gray-300">
                  <tr>
                    <td className="p-3 font-mono">open</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Controls drawer visibility</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">onClose</td>
                    <td className="p-3">() =&gt; void</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Triggered when overlay or close button is clicked
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">position</td>
                    <td className="p-3">"left" | "right" | "top" | "bottom"</td>
                    <td className="p-3">"right"</td>
                    <td className="p-3">Drawer slide direction</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">size</td>
                    <td className="p-3">string</td>
                    <td className="p-3">"320px"</td>
                    <td className="p-3">
                      Width or height of drawer depending on position
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">showCloseButton</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">true</td>
                    <td className="p-3">Show or hide close button</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">zIndex</td>
                    <td className="p-3">number</td>
                    <td className="p-3">50</td>
                    <td className="p-3">Stacking order of drawer</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">renderContent</td>
                    <td className="p-3">
                      (close: () =&gt; void) =&gt; ReactNode
                    </td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Headless render function with close handler
                    </td>
                  </tr>

                  {/* 🎨 Class Customization */}
                  <tr>
                    <td className="p-3 font-mono">className</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Root wrapper class</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">overlayClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Overlay background styling</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">panelClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Drawer panel container</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">contentClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Scrollable content wrapper</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">closeButtonClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Close button styling</td>
                  </tr>

                  {/* 🎨 Style Customization */}
                  <tr>
                    <td className="p-3 font-mono">style</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Root wrapper inline styles</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">overlayStyle</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Overlay inline styles</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">panelStyle</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Drawer panel inline styles</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">contentStyle</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Content area inline styles</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">closeButtonStyle</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Close button inline styles</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Props Table — DrawerButton */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              DrawerButton Props
            </h2>

            <div className="border border-zinc-800 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-zinc-900 text-gray-200">
                  <tr>
                    <th className="p-3 text-left">Prop</th>
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-left">Default</th>
                    <th className="p-3 text-left">Description</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-800 text-gray-300">
                  <tr>
                    <td className="p-3 font-mono">label</td>
                    <td className="p-3">string</td>
                    <td className="p-3">"Open Drawer"</td>
                    <td className="p-3">Button text content</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">icon</td>
                    <td className="p-3">ReactNode</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Optional icon</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">iconPosition</td>
                    <td className="p-3">"left" | "right"</td>
                    <td className="p-3">"left"</td>
                    <td className="p-3">Icon position relative to label</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">onClick</td>
                    <td className="p-3">() =&gt; void</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Click handler (usually opens drawer)
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">className</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Button root styling</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">style</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline button styles</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">labelClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Label text styling</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">iconClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Icon wrapper styling</td>
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
              <div className="flex gap-2 items-start text-red-500">
                <X size={16} className="mt-0.5 shrink-0" />
                <div>
                  <code className="text-red-500">{`<Drawer open />`}</code>
                  <p className="text-gray-500 text-xs mt-0.5">
                    Always bind open to a state variable and provide onClose.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-start text-red-500">
                <X size={16} className="mt-0.5 shrink-0" />
                <div>
                  <code className="text-red-500">{`<Drawer open={open} />`}</code>
                  <p className="text-gray-500 text-xs mt-0.5">
                    Missing onClose means overlay clicks won't close the drawer.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-start text-red-500">
                <X size={16} className="mt-0.5 shrink-0" />
                <div>
                  <code className="text-red-500">{`<Drawer open={open} onClose={...} />`}</code>
                  <p className="text-gray-500 text-xs mt-0.5">
                    Missing position prop — defaults to "right". Be explicit
                    when using other positions.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-start text-green-500">
                <Check size={16} className="mt-0.5 shrink-0" />
                <div>
                  <code className="text-green-500">{`<Drawer open={open} onClose={() => setOpen(false)} position="left" />`}</code>
                  <p className="text-gray-500 text-xs mt-0.5">
                    Correct — state, close handler, and position all explicit.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-start text-green-500">
                <Check size={16} className="mt-0.5 shrink-0" />
                <div>
                  <code className="text-green-500">{`use zIndex when stacking modals`}</code>
                  <p className="text-gray-500 text-xs mt-0.5">
                    Avoid layering issues with multiple overlays.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Pro Tips */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Pro Tips</h2>
            <ul className="list-disc list-inside text-gray-200 space-y-1">
              <li>
                Use <code className="text-primary">renderContent</code> for full
                control — forms, menus, dashboards.
              </li>
              <li>
                Combine <code className="text-primary">overlayClassName</code>{" "}
                with <code className="text-primary">backdrop-blur-sm</code> for
                a modern frosted glass look.
              </li>
              <li>
                Use <code className="text-primary">zIndex</code> when stacking
                multiple drawers or modals.
              </li>
              <li>
                Prefer <code className="text-primary">top</code> /{" "}
                <code className="text-primary">bottom</code> positions for
                mobile bottom sheets.
              </li>
              <li>
                Set <code className="text-primary">showCloseButton=false</code>{" "}
                with <code className="text-primary">renderContent</code> to own
                the full close UX.
              </li>
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

export default DrawerDocs;
