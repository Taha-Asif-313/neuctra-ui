"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility } from "lucide-react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
  Badge,
} from "@neuctra/ui";

const resizablePanelFaq = buildComponentFaq("ResizablePanelGroup");

const emails = [
  { from: "Priya Shah", subject: "Q4 roadmap review", time: "9:41 AM" },
  { from: "Stripe", subject: "Your payout is on the way", time: "8:12 AM" },
  { from: "Leo Martins", subject: "Design QA notes", time: "Yesterday" },
];

const files = ["page.tsx", "layout.tsx", "globals.css", "api/route.ts"];

const layers = ["Header", "Hero image", "Pricing table", "Footer"];

function LayoutReadoutDemo() {
  const [sizes, setSizes] = useState([30, 70]);
  return (
    <div className="w-full space-y-2">
      <p className="text-xs text-muted-foreground">
        Layers {Math.round(sizes[0])}%, canvas {Math.round(sizes[1])}%
      </p>
      <div className="h-64 w-full overflow-hidden rounded-xl border border-border">
        <ResizablePanelGroup onLayout={setSizes}>
          <ResizablePanel defaultSize={30} minSize={24} collapsible>
            <div className="h-full space-y-2 bg-card p-3">
              <p className="truncate text-sm font-medium text-foreground">Layers</p>
              <ul className="space-y-1">
                {layers.map((layer) => (
                  <li key={layer} className="truncate text-xs text-muted-foreground" title={layer}>
                    {layer}
                  </li>
                ))}
              </ul>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={40}>
            <div className="flex h-full items-center justify-center p-4">
              <p className="text-sm text-secondary">Canvas</p>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

const GROUP_PROPS = [
  ["direction", '"horizontal" | "vertical"', '"horizontal"', "Axis along which panels are laid out and dragged."],
  ["children", "ReactNode", "-", "Alternating ResizablePanel and ResizableHandle children (required)."],
  ["onLayout", "(sizes: number[]) => void", "-", "Called with panel sizes in percent after every resize."],
  ["stackBelow", "number", "-", "Container width in px below which a horizontal group stacks vertically, handles included."],
  ["className", "string", "-", "Styles the group root."],
  ["style", "CSSProperties", "-", "Inline styles for the group root."],
];

const PANEL_PROPS = [
  ["defaultSize", "number", "-", "Initial size in percent. Panels without one split the remaining space."],
  ["minSize", "number", "0", "Minimum size in percent."],
  ["maxSize", "number", "100", "Maximum size in percent."],
  ["collapsible", "boolean", "false", "Snaps the panel to 0 when dragged below half of minSize."],
  ["children", "ReactNode", "-", "Panel content."],
  ["className", "string", "-", "Styles the panel."],
  ["style", "CSSProperties", "-", "Inline styles for the panel."],
];

const HANDLE_PROPS = [
  ["withHandle", "boolean", "false", "Shows a visible grip in the middle of the handle."],
  ["step", "number", "5", "Percent moved per arrow key press; Shift moves 4x."],
  ["disabled", "boolean", "false", "Disables dragging and keyboard resizing."],
  ["aria-label", "string", '"Resize panels"', "Accessible label for the separator."],
  ["className", "string", "-", "Styles the handle."],
  ["gripClassName", "string", "-", "Styles the grip shown with withHandle."],
  ["style", "CSSProperties", "-", "Inline styles for the handle."],
];

const PropsTable = ({ rows }) => (
  <div className="border border-zinc-800 rounded-xl overflow-x-auto">
    <table className="w-full min-w-[640px] text-sm">
      <thead className="bg-zinc-900 text-gray-200">
        <tr>
          <th scope="col" className="text-left p-3">Prop</th>
          <th scope="col" className="text-left p-3">Type</th>
          <th scope="col" className="text-left p-3">Default</th>
          <th scope="col" className="text-left p-3">Description</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-zinc-800 text-gray-300">
        {rows.map(([name, type, def, description]) => (
          <tr key={name}>
            <td className="p-3 font-medium text-primary whitespace-nowrap">{name}</td>
            <td className="p-3 font-mono text-xs text-gray-300">{type}</td>
            <td className="p-3 text-gray-400 whitespace-nowrap">{def}</td>
            <td className="p-3">{description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ResizablePanelDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            ResizablePanel Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            Create draggable split-pane layouts with percentage-based sizing,
            min and max constraints, collapsible panels, keyboard resizing,
            and horizontal or vertical directions.
          </p>
        </header>

        <section aria-labelledby="ResizablePanel-import">
          <h2 id="ResizablePanel-import" className="text-xl sm:text-2xl font-semibold mb-3 text-white">
            Import
          </h2>
          <CodeBlock
            code={`import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@neuctra/ui";`}
          />
        </section>

        <section aria-labelledby="ResizablePanel-example-0">
          <h2 id="ResizablePanel-example-0" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Put panels and handles inside a group with a fixed height. Drag
            the handle, or focus it and use the arrow keys. stackBelow stacks
            the panels vertically when the group is narrower than 480px, so the
            inbox never squeezes into a sliver on phones.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<div className="h-96 overflow-hidden rounded-xl border border-border sm:h-64">
  <ResizablePanelGroup stackBelow={480}>
    <ResizablePanel defaultSize={40} minSize={25}>
      <ul className="h-full divide-y divide-border bg-card">
        {emails.map((email) => (
          <li key={email.subject} className="min-w-0 px-4 py-3">
            <div className="flex items-baseline justify-between gap-2">
              <p className="truncate text-sm font-medium text-foreground">{email.from}</p>
              <span className="shrink-0 whitespace-nowrap text-xs text-muted-foreground">{email.time}</span>
            </div>
            <p className="truncate text-xs text-secondary">{email.subject}</p>
          </li>
        ))}
      </ul>
    </ResizablePanel>
    <ResizableHandle />
    <ResizablePanel minSize={30}>
      <div className="space-y-2 p-4">
        <p className="text-sm font-semibold text-foreground">Q4 roadmap review</p>
        <p className="text-sm text-secondary">
          Hi team, sharing the draft roadmap ahead of Thursday. Please add comments by Wednesday noon.
        </p>
      </div>
    </ResizablePanel>
  </ResizablePanelGroup>
</div>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="h-96 w-full overflow-hidden rounded-xl border border-border sm:h-64">
                  <ResizablePanelGroup stackBelow={480}>
                    <ResizablePanel defaultSize={40} minSize={25}>
                      <ul className="h-full divide-y divide-border bg-card">
                        {emails.map((email) => (
                          <li key={email.subject} className="min-w-0 px-4 py-3">
                            <div className="flex items-baseline justify-between gap-2">
                              <p className="truncate text-sm font-medium text-foreground">{email.from}</p>
                              <span className="shrink-0 whitespace-nowrap text-xs text-muted-foreground">{email.time}</span>
                            </div>
                            <p className="truncate text-xs text-secondary">{email.subject}</p>
                          </li>
                        ))}
                      </ul>
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel minSize={30}>
                      <div className="space-y-2 p-4">
                        <p className="text-sm font-semibold text-foreground">Q4 roadmap review</p>
                        <p className="text-sm text-secondary">
                          Hi team, sharing the draft roadmap ahead of Thursday. Please add comments by Wednesday noon.
                        </p>
                      </div>
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </div>
              </div>
            }
          />
        </section>

        <section aria-labelledby="ResizablePanel-example-1">
          <h2 id="ResizablePanel-example-1" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Vertical and Nested
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Set direction="vertical" to stack panels. Groups can be nested to
            build editor-style layouts. On narrow screens the file list moves
            above the editor thanks to stackBelow.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<div className="h-96 overflow-hidden rounded-xl border border-border sm:h-72">
  <ResizablePanelGroup stackBelow={480}>
    <ResizablePanel defaultSize={28} minSize={20}>
      <ul className="h-full space-y-1 bg-card p-3">
        {files.map((file) => (
          <li key={file} className="truncate font-mono text-xs text-muted-foreground" title={file}>
            {file}
          </li>
        ))}
      </ul>
    </ResizablePanel>
    <ResizableHandle withHandle />
    <ResizablePanel>
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={65} minSize={30}>
          <pre className="p-3 font-mono text-xs text-foreground">{\`export default function Page() {
  return <Dashboard />;
}\`}</pre>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel minSize={20}>
          <div className="flex flex-wrap items-center gap-2 p-3">
            <Badge text="Build passed" variant="soft" size="sm" />
            <span className="whitespace-nowrap text-xs text-muted-foreground">Compiled in 1.2s</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </ResizablePanel>
  </ResizablePanelGroup>
</div>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="h-96 w-full overflow-hidden rounded-xl border border-border sm:h-72">
                  <ResizablePanelGroup stackBelow={480}>
                    <ResizablePanel defaultSize={28} minSize={20}>
                      <ul className="h-full space-y-1 bg-card p-3">
                        {files.map((file) => (
                          <li key={file} className="truncate font-mono text-xs text-muted-foreground" title={file}>
                            {file}
                          </li>
                        ))}
                      </ul>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel>
                      <ResizablePanelGroup direction="vertical">
                        <ResizablePanel defaultSize={65} minSize={30}>
                          <pre className="p-3 font-mono text-xs text-foreground">{`export default function Page() {
  return <Dashboard />;
}`}</pre>
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel minSize={20}>
                          <div className="flex flex-wrap items-center gap-2 p-3">
                            <Badge text="Build passed" variant="soft" size="sm" />
                            <span className="whitespace-nowrap text-xs text-muted-foreground">Compiled in 1.2s</span>
                          </div>
                        </ResizablePanel>
                      </ResizablePanelGroup>
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </div>
              </div>
            }
          />
        </section>

        <section aria-labelledby="ResizablePanel-example-2">
          <h2 id="ResizablePanel-example-2" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Collapsible Panels and onLayout
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            A collapsible panel snaps shut when dragged below half of its
            minSize; press Enter on the focused handle to toggle it. onLayout
            reports the new sizes, handy for saving them.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [sizes, setSizes] = useState([30, 70]);

<div className="w-full space-y-2">
  <p className="text-xs text-muted-foreground">
    Layers {Math.round(sizes[0])}%, canvas {Math.round(sizes[1])}%
  </p>
  <div className="h-64 w-full overflow-hidden rounded-xl border border-border">
    <ResizablePanelGroup onLayout={setSizes}>
      <ResizablePanel defaultSize={30} minSize={24} collapsible>
        <div className="h-full space-y-2 bg-card p-3">
          <p className="truncate text-sm font-medium text-foreground">Layers</p>
          <ul className="space-y-1">
            {layers.map((layer) => (
              <li key={layer} className="truncate text-xs text-muted-foreground" title={layer}>
                {layer}
              </li>
            ))}
          </ul>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel minSize={40}>
        <div className="flex h-full items-center justify-center p-4">
          <p className="text-sm text-secondary">Canvas</p>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
</div>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <LayoutReadoutDemo />
              </div>
            }
          />
        </section>

        <section aria-labelledby="ResizablePanel-props">
          <h2 id="ResizablePanel-props" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            Props for each part. Other HTML attributes are forwarded to the
            underlying div.
          </p>
          <h3 className="text-lg font-semibold mb-3 text-white">ResizablePanelGroup</h3>
          <PropsTable rows={GROUP_PROPS} />
          <h3 className="text-lg font-semibold mt-8 mb-3 text-white">ResizablePanel</h3>
          <PropsTable rows={PANEL_PROPS} />
          <h3 className="text-lg font-semibold mt-8 mb-3 text-white">ResizableHandle</h3>
          <PropsTable rows={HANDLE_PROPS} />
        </section>

        <section aria-labelledby="ResizablePanel-a11y">
          <h2 id="ResizablePanel-a11y" className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white">
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>Each handle is a focusable role="separator" with aria-orientation, aria-controls pointing at the preceding panel, and aria-valuenow, aria-valuemin and aria-valuemax in percent.</li>
            <li>Arrow keys resize by step (Shift for 4x), Home and End jump to the limits, and Enter toggles a collapsible panel.</li>
            <li>Collapsed panels are marked aria-hidden and inert, so their content is skipped by screen readers and by Tab.</li>
            <li>With stackBelow, a narrow group switches to vertical layout and its handles switch aria-orientation and arrow keys (Up and Down) to match.</li>
            <li>During a drag the page cursor is locked and text selection is disabled, and listeners are cleaned up on release, cancel, or unmount.</li>
          </ul>
        </section>

        <ComponentFaq qa={resizablePanelFaq} />
        <DocsFooter />
      </div>
    </div>
  );
};

export default ResizablePanelDocs;
