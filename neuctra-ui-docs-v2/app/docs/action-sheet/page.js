"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility, Share2, Link2, Mail, Download, MoreHorizontal, Pencil, FolderInput, PenLine, Trash2, Truck, Printer, RotateCcw } from "lucide-react";
import { ActionSheet, Button, Card, CardBody, Avatar } from "@neuctra/ui";

// Recomputed locally rather than imported from ./layout.js: layout.js is a
// Server Component module and this page.js is a Client Component.
const actionSheetFaq = buildComponentFaq("ActionSheet");

function ShareSheetDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="sm" iconBefore={<Share2 size={16} />} onClick={() => setOpen(true)}>
        Share report
      </Button>
      <ActionSheet
        open={open}
        onOpenChange={setOpen}
        title="Share Q3 revenue report"
        description="Choose how you want to send this report to your team."
        actions={[
          { label: "Copy link", icon: <Link2 />, onClick: () => {} },
          { label: "Send by email", icon: <Mail />, onClick: () => {} },
          { label: "Download PDF", icon: <Download />, description: "2.4 MB", onClick: () => {} },
        ]}
      />
    </>
  );
}

function FileActionsDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="sm" variant="outline" iconBefore={<MoreHorizontal size={16} />} onClick={() => setOpen(true)}>
        File actions
      </Button>
      <ActionSheet
        open={open}
        onOpenChange={setOpen}
        title="invoice-2048.pdf"
        actions={[
          { label: "Rename", icon: <Pencil />, onClick: () => {} },
          { label: "Move to folder", icon: <FolderInput />, onClick: () => {} },
          { label: "Request signature", icon: <PenLine />, description: "Upgrade to Pro to unlock", disabled: true },
          { label: "Delete file", icon: <Trash2 />, destructive: true, onClick: () => {} },
        ]}
      />
    </>
  );
}

function OrderRowDemo() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("Processing");
  return (
    <Card className="w-full max-w-md">
      <CardBody className="flex items-center gap-3">
        <Avatar size="sm" fallback="MR" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">Order #10482</p>
          <p className="truncate text-xs text-muted-foreground">Maya Ruiz · $248.00 · {status}</p>
        </div>
        <Button size="xs" variant="outline" className="shrink-0" onClick={() => setOpen(true)}>
          Manage
        </Button>
      </CardBody>
      <ActionSheet
        open={open}
        onOpenChange={setOpen}
        title="Order #10482"
        description="Update fulfilment for this order."
        actions={[
          { label: "Mark as shipped", icon: <Truck />, onClick: () => setStatus("Shipped") },
          { label: "Print packing slip", icon: <Printer />, onClick: () => {} },
          { label: "Refund order", icon: <RotateCcw />, destructive: true, onClick: () => setStatus("Refunded") },
        ]}
        cancelLabel="Close"
      />
    </Card>
  );
}

const ActionSheetDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            ActionSheet Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            A bottom sheet of contextual actions. It slides up from the bottom edge on phones and becomes a centered card on wider screens, traps focus while open, locks page scroll, respects safe-area insets and reduced motion, and supports destructive and disabled actions.
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="ActionSheet-import">
          <h2
            id="ActionSheet-import"
            className="text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            Import
          </h2>
          <CodeBlock code={`import { ActionSheet } from "@neuctra/ui";`} />
        </section>

        {/* Example: Basic Usage */}
        <section aria-labelledby="ActionSheet-example-0">
          <h2
            id="ActionSheet-example-0"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Drive the sheet with open and onOpenChange. Choosing an action runs its onClick and closes the sheet; Cancel, Escape and the overlay close it too.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`function ShareSheetDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="sm" iconBefore={<Share2 size={16} />} onClick={() => setOpen(true)}>
        Share report
      </Button>
      <ActionSheet
        open={open}
        onOpenChange={setOpen}
        title="Share Q3 revenue report"
        description="Choose how you want to send this report to your team."
        actions={[
          { label: "Copy link", icon: <Link2 />, onClick: () => {} },
          { label: "Send by email", icon: <Mail />, onClick: () => {} },
          { label: "Download PDF", icon: <Download />, description: "2.4 MB", onClick: () => {} },
        ]}
      />
    </>
  );
}`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <ShareSheetDemo />
              </div>
            }
          />
        </section>

        {/* Example: Destructive and Disabled Actions */}
        <section aria-labelledby="ActionSheet-example-1">
          <h2
            id="ActionSheet-example-1"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Destructive and Disabled Actions
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Set destructive for irreversible actions and disabled for unavailable ones. A description adds a secondary line, useful for explaining why an action is unavailable.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`function FileActionsDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="sm" variant="outline" iconBefore={<MoreHorizontal size={16} />} onClick={() => setOpen(true)}>
        File actions
      </Button>
      <ActionSheet
        open={open}
        onOpenChange={setOpen}
        title="invoice-2048.pdf"
        actions={[
          { label: "Rename", icon: <Pencil />, onClick: () => {} },
          { label: "Move to folder", icon: <FolderInput />, onClick: () => {} },
          { label: "Request signature", icon: <PenLine />, description: "Upgrade to Pro to unlock", disabled: true },
          { label: "Delete file", icon: <Trash2 />, destructive: true, onClick: () => {} },
        ]}
      />
    </>
  );
}`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <FileActionsDemo />
              </div>
            }
          />
        </section>

        {/* Example: In a List Row */}
        <section aria-labelledby="ActionSheet-example-2">
          <h2
            id="ActionSheet-example-2"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            In a List Row
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            A typical mobile pattern: a compact row with a Manage button that opens order actions. Actions update local state, and cancelLabel renames the dismiss button.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`function OrderRowDemo() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("Processing");
  return (
    <Card className="w-full max-w-md">
      <CardBody className="flex items-center gap-3">
        <Avatar size="sm" fallback="MR" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">Order #10482</p>
          <p className="truncate text-xs text-muted-foreground">Maya Ruiz · $248.00 · {status}</p>
        </div>
        <Button size="xs" variant="outline" className="shrink-0" onClick={() => setOpen(true)}>
          Manage
        </Button>
      </CardBody>
      <ActionSheet
        open={open}
        onOpenChange={setOpen}
        title="Order #10482"
        description="Update fulfilment for this order."
        actions={[
          { label: "Mark as shipped", icon: <Truck />, onClick: () => setStatus("Shipped") },
          { label: "Print packing slip", icon: <Printer />, onClick: () => {} },
          { label: "Refund order", icon: <RotateCcw />, destructive: true, onClick: () => setStatus("Refunded") },
        ]}
        cancelLabel="Close"
      />
    </Card>
  );
}`}
            previewContent={
              <div className="flex w-full items-center justify-center py-4">
                <OrderRowDemo />
              </div>
            }
          />
        </section>

        {/* Props table */}
        <section aria-labelledby="ActionSheet-props">
          <h2
            id="ActionSheet-props"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the ActionSheet components.
          </p>


          <h3 className="text-lg font-semibold text-white mb-3">
            ActionSheet
          </h3>
          <div className="border border-zinc-800 rounded-xl overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-zinc-900 text-gray-200">
                <tr>
                  <th scope="col" className="text-left p-3">
                    Prop
                  </th>
                  <th scope="col" className="text-left p-3">
                    Type
                  </th>
                  <th scope="col" className="text-left p-3">
                    Default
                  </th>
                  <th scope="col" className="text-left p-3">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-gray-300">
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    actions
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ActionSheetAction[]
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Actions listed in the sheet (required).</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    open
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Controlled open state.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    defaultOpen
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">false</td>
                  <td className="p-3">Initial open state in uncontrolled mode.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    onOpenChange
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    (open: boolean) =&gt; void
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Called whenever the sheet opens or closes.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    title
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Heading above the actions; also the dialog's accessible name.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    description
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Supporting text under the title.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    cancelLabel
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">"Cancel"</td>
                  <td className="p-3">Label of the dismiss button.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    hideCancel
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">false</td>
                  <td className="p-3">Hides the separate Cancel button.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    closeOnOverlayClick
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">true</td>
                  <td className="p-3">Close the sheet when the overlay is clicked.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    closeOnEscape
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">true</td>
                  <td className="p-3">Close the sheet with the Escape key.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    className
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Styles the bottom panel.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    style
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    CSSProperties
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Inline styles for the bottom panel.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    overlayClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Styles the dimmed overlay.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    headerClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Styles the title and description block.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    titleClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Styles the title heading.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    descriptionClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Styles the description text.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    actionsClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Styles the list that wraps the action buttons.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    actionClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Applied to every action button.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    cancelClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Styles the Cancel button.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-white mt-8 mb-3">
            ActionSheetAction
          </h3>
          <div className="border border-zinc-800 rounded-xl overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-zinc-900 text-gray-200">
                <tr>
                  <th scope="col" className="text-left p-3">
                    Prop
                  </th>
                  <th scope="col" className="text-left p-3">
                    Type
                  </th>
                  <th scope="col" className="text-left p-3">
                    Default
                  </th>
                  <th scope="col" className="text-left p-3">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-gray-300">
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    label
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Visible action label (required).</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    icon
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Optional leading icon.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    description
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Secondary line under the label.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    onClick
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    () =&gt; void
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Called when the action is chosen; the sheet then closes.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    destructive
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">false</td>
                  <td className="p-3">Styles the action as destructive.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    disabled
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">false</td>
                  <td className="p-3">Disables the action.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Accessibility */}
        <section aria-labelledby="ActionSheet-a11y">
          <h2
            id="ActionSheet-a11y"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>The panel is a modal dialog (role="dialog", aria-modal) named by the title through aria-labelledby, or "Actions" when there is no title, and described by the description.</li>
            <li>Focus moves into the sheet on open, Tab and Shift+Tab stay inside it, and focus returns to the trigger on close.</li>
            <li>Escape closes the sheet unless closeOnEscape is false. Page scroll is locked while it is open.</li>
            <li>Actions are native buttons with a visible focus ring and at least a 44px touch target. Disabled actions use the disabled attribute.</li>
            <li>Slide and fade animations are removed when the user prefers reduced motion.</li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={actionSheetFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </div>
  );
};

export default ActionSheetDocs;
