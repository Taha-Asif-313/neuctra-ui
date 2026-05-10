"use client";

import React, { useState } from "react";
import Metadata from "../../../MetaData";
import CodePreviewBlock from "../components/CodePreviewBlock";
import CodeBlock from "../components/CodeBlock";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTriggerButton,
} from "@neuctra/ui";
import { Menu, Check, X } from "lucide-react";
import DocsFooter from "../components/DocsFooter";

/* ---------------- Helper component per drawer example ---------------- */
const ControlledDrawerPreview = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>

      <Drawer isOpen={open} onClose={() => setOpen(false)} position="left">
        <DrawerContent>
          <DrawerHeader title="Manual Drawer" onClose={() => setOpen(false)} />

          <DrawerBody>
            <p className="text-zinc-300">
              This is a controlled drawer example 👋
            </p>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>

            <Button onClick={() => setOpen(false)}>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const HeadlessDrawerExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <DrawerButton
        label="Open Headless Drawer"
        onClick={() => setIsOpen(true)}
      />

      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
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

      <div className="font-primary min-h-screen">
        <div className="space-y-10">


          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              Drawer Component
            </h1>
            <p className="text-sm text-gray-200 leading-relaxed">
              The <span className="text-primary font-semibold">Drawer</span>{" "}
              component creates sliding panels that appear from any screen edge.
              Perfect for sidebars, mobile menus, settings panels, and more.
              Supports both structured layouts with sub-components and fully
              custom headless rendering.
            </p>
          </header>

          {/* Import */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Import Component From Library
            </h2>
            <CodeBlock
              code={`import { 
  Drawer,
  DrawerBody,
  DrawerButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTriggerButton
} from "@neuctra/ui";`}
            />
          </section>

          {/* Basic Usage */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Usage Code
            </h2>
            <p className="text-gray-300 mb-4">
              Start with a simple drawer. The component provides sliding panels
              from any screen edge with customizable content and positioning.
            </p>
            <CodeBlock
              language="jsx"
              code={`import { useState } from 'react';
import { 
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button
} from '@neuctra/ui';

function BasicExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Open Drawer
      </Button>

      <Drawer isOpen={open} onClose={() => setOpen(false)}>
        <DrawerContent>
          <DrawerHeader title="Drawer Title" onClose={() => setOpen(false)} />
          <DrawerBody>
            <p>Drawer content goes here</p>
          </DrawerBody>
          <DrawerFooter>
            <Button onClick={() => setOpen(false)}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}`}
            />
          </section>

          {/* ---------------- Basic Usage ---------------- */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Example
            </h2>

            <CodePreviewBlock
              language="tsx"
              code={`// 1. Trigger-based (Simple)
<DrawerTriggerButton
  drawerContent={({ close }) => (
    <DrawerContent>
      <DrawerHeader title="My Drawer" onClose={close} />

      <DrawerBody>
        <p>Hello from Drawer! 👋</p>
      </DrawerBody>

      <DrawerFooter>
        <Button onClick={close}>Close</Button>
      </DrawerFooter>
    </DrawerContent>
  )}
>
  Open Drawer
</DrawerTriggerButton>

// 2. Controlled Drawer (Recommended for apps)
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>
  Open Drawer
</Button>

<Drawer isOpen={open} onClose={() => setOpen(false)} position="left">
  <DrawerContent>
    <DrawerHeader
      title="Manual Drawer"
      onClose={() => setOpen(false)}
    />

    <DrawerBody>
      <p>This is a controlled drawer example.</p>
    </DrawerBody>

    <DrawerFooter>
      <Button variant="ghost" onClick={() => setOpen(false)}>
        Cancel
      </Button>

      <Button onClick={() => setOpen(false)}>
        Save
      </Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`}
              previewContent={<ControlledDrawerPreview />}
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
  isOpen={open}
  onClose={() => setOpen(false)}
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

          {/* ---------------- Sub-Components ---------------- */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Sub-Components
            </h2>
            <p className="text-gray-200 mb-4">
              Use these helper components to build structured drawer layouts:
            </p>

            <CodePreviewBlock
              language="tsx"
              code={`import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerTriggerButton
} from "@neuctra/ui";

<DrawerTriggerButton
  variant="default"
  drawerContent={({ close }) => (
    <DrawerContent>
      <DrawerHeader title="My Drawer" onClose={close} />
      <DrawerBody>
        <p>Your content here</p>
      </DrawerBody>
      <DrawerFooter>
        <Button variant="ghost" onClick={close}>
          Cancel
        </Button>
        <Button onClick={close}>Save</Button>
      </DrawerFooter>
    </DrawerContent>
  )}
>
  Open Drawer
</DrawerTriggerButton>`}
              previewContent={
                <DrawerTriggerButton
                  variant="default"
                  drawerContent={({ close }) => (
                    <DrawerContent>
                      <DrawerHeader title="My Drawer" onClose={close} />
                      <DrawerBody>
                        <p className="text-sm">
                          This drawer uses sub-components for clean structure.
                        </p>
                      </DrawerBody>
                      <DrawerFooter>
                        <Button variant="ghost" onClick={close}>
                          Cancel
                        </Button>
                        <Button onClick={close}>Save</Button>
                      </DrawerFooter>
                    </DrawerContent>
                  )}
                >
                  Open Structured Drawer
                </DrawerTriggerButton>
              }
            />
          </section>

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
                    <td className="p-3 font-mono">isOpen</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Controls drawer visibility</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">onClose</td>
                    <td className="p-3">() =&gt; void</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Called when drawer closes</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">children</td>
                    <td className="p-3">ReactNode</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Drawer content (static)</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">renderContent</td>
                    <td className="p-3">(close) =&gt; ReactNode</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Render prop with access to close()</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">position</td>
                    <td className="p-3">"left" | "right" | "top" | "bottom"</td>
                    <td className="p-3">"right"</td>
                    <td className="p-3">Slide direction</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">size</td>
                    <td className="p-3">string</td>
                    <td className="p-3">"320px"</td>
                    <td className="p-3">
                      Width or height depending on position
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">disableOverlayClose</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Prevents closing on overlay click</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">overlayClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Overlay styling</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">overlayStyle</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline overlay styles</td>
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
                    <td className="p-3">""</td>
                    <td className="p-3">Button text content</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">icon</td>
                    <td className="p-3">ReactNode</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Optional icon element</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">iconPosition</td>
                    <td className="p-3">"left" | "right"</td>
                    <td className="p-3">"left"</td>
                    <td className="p-3">Controls icon placement</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">onClick</td>
                    <td className="p-3">() =&gt; void</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Click handler</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">className</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Root button classes</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">style</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline styles</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">labelClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Label styling</td>
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

          {/* Props Table — DrawerTriggerButton */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              DrawerTriggerButton Props
            </h2>

            <p className="text-sm text-gray-400 mb-3">
              Extends <code>ButtonProps</code>
            </p>

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
                    <td className="p-3 font-mono">drawerContent</td>
                    <td className="p-3">(close) =&gt; ReactNode</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Function to render drawer with access to close()
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">children</td>
                    <td className="p-3">ReactNode</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Trigger button content</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Props Table — DrawerHeader */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              DrawerHeader Props
            </h2>

            <div className="border border-zinc-800 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-zinc-800 text-gray-300">
                  <tr>
                    <td className="p-3 font-mono">title</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Header title</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono">icon</td>
                    <td className="p-3">ReactNode</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Optional icon</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono">onClose</td>
                    <td className="p-3">() =&gt; void</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Shows close button if provided</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* DrawerContent */}
          <p className="text-sm text-gray-200">
            Wrapper for full-height layout inside Drawer.
          </p>

          {/* DrawerBody */}
          <p className="text-sm text-gray-200">
            Scrollable content area with padding.
          </p>

          {/* DrawerFooter */}
          <p className="text-sm text-gray-200">
            Footer actions container (buttons, etc).
          </p>

          {/* Common Mistakes */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Common Mistakes
            </h2>
            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex gap-2 items-start text-red-500">
                <X size={16} className="mt-0.5 shrink-0" />
                <div>
                  <code className="text-red-500">{`<Drawer isOpen />`}</code>
                  <p className="text-gray-500 text-xs mt-0.5">
                    Always bind isOpen to a state variable and provide onClose.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-start text-red-500">
                <X size={16} className="mt-0.5 shrink-0" />
                <div>
                  <code className="text-red-500">{`<Drawer isOpen={open} />`}</code>
                  <p className="text-gray-500 text-xs mt-0.5">
                    Missing onClose means overlay clicks won't close the drawer.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-start text-red-500">
                <X size={16} className="mt-0.5 shrink-0" />
                <div>
                  <code className="text-red-500">{`<Drawer isOpen={open} onClose={...} />`}</code>
                  <p className="text-gray-500 text-xs mt-0.5">
                    Missing position prop — defaults to "right". Be explicit
                    when using other positions.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-start text-green-500">
                <Check size={16} className="mt-0.5 shrink-0" />
                <div>
                  <code className="text-green-500">{`<Drawer isOpen={open} onClose={() => setOpen(false)} position="left" />`}</code>
                  <p className="text-gray-500 text-xs mt-0.5">
                    Correct — state, close handler, and position all explicit.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-start text-green-500">
                <Check size={16} className="mt-0.5 shrink-0" />
                <div>
                  <code className="text-green-500">{`use disableOverlayClose for modals`}</code>
                  <p className="text-gray-500 text-xs mt-0.5">
                    Prevent accidental closes in critical flows.
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
                Use <code className="text-primary">disableOverlayClose</code>{" "}
                for critical flows to prevent accidental closes.
              </li>
              <li>
                Prefer <code className="text-primary">top</code> /{" "}
                <code className="text-primary">bottom</code> positions for
                mobile bottom sheets.
              </li>
              <li>
                Use <code className="text-primary">DrawerHeader</code> with{" "}
                <code className="text-primary">onClose</code> for consistent
                close UX.
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

export default DrawerDocs;
