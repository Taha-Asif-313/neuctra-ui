"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility, Rocket, KeyRound } from "lucide-react";
import { AlertDialog, Button, Card, CardBody, Badge } from "@neuctra/ui";

// Recomputed locally rather than imported from ./layout.js: layout.js is a
// Server Component module and this page.js is a Client Component.
const alertDialogFaq = buildComponentFaq("AlertDialog");

function PublishDialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>
        Publish changes
      </Button>
      <AlertDialog
        open={open}
        onOpenChange={setOpen}
        title="Publish to production?"
        description="Your 12 pending changes will go live for all visitors on acme.com."
        confirmLabel="Publish"
        icon={<Rocket className="h-5 w-5" />}
        closeOnEscape
        onConfirm={() => {}}
      />
    </>
  );
}

function DeleteProjectDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="sm" variant="destructive" onClick={() => setOpen(true)}>
        Delete project
      </Button>
      <AlertDialog
        open={open}
        onOpenChange={setOpen}
        tone="destructive"
        title="Delete Marketing site?"
        description="This permanently removes the project, its 48 deployments and all environment variables. This cannot be undone."
        confirmLabel="Delete project"
        requireText="marketing-site"
        onConfirm={() => {}}
      />
    </>
  );
}

function RevokeKeyDemo() {
  const [open, setOpen] = useState(false);
  const [revoked, setRevoked] = useState(false);
  return (
    <Card className="w-full max-w-md">
      <CardBody className="flex items-center gap-3">
        <KeyRound size={18} className="shrink-0 text-muted-foreground" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">Production API key</p>
          <p className="truncate text-xs text-muted-foreground" title="sk_live_...9f2a · Last used 2 hours ago">
            sk_live_...9f2a · Last used 2 hours ago
          </p>
        </div>
        {revoked ? (
          <Badge text="Revoked" variant="outline" size="sm" />
        ) : (
          <Button size="xs" variant="outline" className="shrink-0" onClick={() => setOpen(true)}>
            Revoke
          </Button>
        )}
      </CardBody>
      <AlertDialog
        open={open}
        onOpenChange={setOpen}
        tone="destructive"
        title="Revoke this API key?"
        description="Apps using this key will stop working immediately."
        confirmLabel="Revoke key"
        closeOnEscape
        closeOnOverlayClick
        onConfirm={() =>
          new Promise((resolve) => setTimeout(resolve, 1200)).then(() => setRevoked(true))
        }
      >
        <p>3 services used this key in the last 24 hours.</p>
      </AlertDialog>
    </Card>
  );
}

const AlertDialogDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            AlertDialog Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            A confirmation dialog for decisions that need an explicit answer. It is announced as an alert dialog, focuses Cancel first, blocks Escape and overlay clicks by default, and supports a typed confirmation and async confirm actions with a loading state.
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="AlertDialog-import">
          <h2
            id="AlertDialog-import"
            className="text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            Import
          </h2>
          <CodeBlock code={`import { AlertDialog } from "@neuctra/ui";`} />
        </section>

        {/* Example: Basic Usage */}
        <section aria-labelledby="AlertDialog-example-0">
          <h2
            id="AlertDialog-example-0"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Control it with open and onOpenChange. onConfirm runs when the primary button is pressed and the dialog then closes. Escape is opt-in through closeOnEscape.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`function PublishDialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>
        Publish changes
      </Button>
      <AlertDialog
        open={open}
        onOpenChange={setOpen}
        title="Publish to production?"
        description="Your 12 pending changes will go live for all visitors on acme.com."
        confirmLabel="Publish"
        icon={<Rocket className="h-5 w-5" />}
        closeOnEscape
        onConfirm={() => {}}
      />
    </>
  );
}`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <PublishDialogDemo />
              </div>
            }
          />
        </section>

        {/* Example: Destructive with Typed Confirmation */}
        <section aria-labelledby="AlertDialog-example-1">
          <h2
            id="AlertDialog-example-1"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Destructive with Typed Confirmation
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            tone="destructive" switches the confirm button and shows a warning icon. requireText keeps the confirm button disabled until the exact text is typed; Enter in the field confirms once it matches.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`function DeleteProjectDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="sm" variant="destructive" onClick={() => setOpen(true)}>
        Delete project
      </Button>
      <AlertDialog
        open={open}
        onOpenChange={setOpen}
        tone="destructive"
        title="Delete Marketing site?"
        description="This permanently removes the project, its 48 deployments and all environment variables. This cannot be undone."
        confirmLabel="Delete project"
        requireText="marketing-site"
        onConfirm={() => {}}
      />
    </>
  );
}`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <DeleteProjectDemo />
              </div>
            }
          />
        </section>

        {/* Example: Async Confirm in Context */}
        <section aria-labelledby="AlertDialog-example-2">
          <h2
            id="AlertDialog-example-2"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Async Confirm in Context
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Return a promise from onConfirm and the confirm button shows a spinner until it resolves; the dialog stays open if it rejects. Children add extra body content under the description.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`function RevokeKeyDemo() {
  const [open, setOpen] = useState(false);
  const [revoked, setRevoked] = useState(false);
  return (
    <Card className="w-full max-w-md">
      <CardBody className="flex items-center gap-3">
        <KeyRound size={18} className="shrink-0 text-muted-foreground" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">Production API key</p>
          <p className="truncate text-xs text-muted-foreground" title="sk_live_...9f2a · Last used 2 hours ago">
            sk_live_...9f2a · Last used 2 hours ago
          </p>
        </div>
        {revoked ? (
          <Badge text="Revoked" variant="outline" size="sm" />
        ) : (
          <Button size="xs" variant="outline" className="shrink-0" onClick={() => setOpen(true)}>
            Revoke
          </Button>
        )}
      </CardBody>
      <AlertDialog
        open={open}
        onOpenChange={setOpen}
        tone="destructive"
        title="Revoke this API key?"
        description="Apps using this key will stop working immediately."
        confirmLabel="Revoke key"
        closeOnEscape
        closeOnOverlayClick
        onConfirm={() =>
          new Promise((resolve) => setTimeout(resolve, 1200)).then(() => setRevoked(true))
        }
      >
        <p>3 services used this key in the last 24 hours.</p>
      </AlertDialog>
    </Card>
  );
}`}
            previewContent={
              <div className="flex w-full items-center justify-center py-4">
                <RevokeKeyDemo />
              </div>
            }
          />
        </section>

        {/* Props table */}
        <section aria-labelledby="AlertDialog-props">
          <h2
            id="AlertDialog-props"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the AlertDialog component.
          </p>

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
                    title
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Dialog heading and accessible name (required).</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    description
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Supporting copy under the heading.</td>
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
                  <td className="p-3">Called whenever the open state changes.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    confirmLabel
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">"Confirm"</td>
                  <td className="p-3">Label of the primary action button.</td>
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
                    tone
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    "default" | "destructive"
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">"default"</td>
                  <td className="p-3">Visual treatment of the primary action and icon.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    icon
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Leading icon. Defaults to a warning icon for the destructive tone; pass null to hide it.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    requireText
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Keeps confirm disabled until this exact text is typed.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    onConfirm
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    () =&gt; void | Promise&lt;void&gt;
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Runs on confirm. A returned promise shows a spinner and closes the dialog when it resolves.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    onCancel
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    () =&gt; void
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Runs when the dialog is dismissed with Cancel, Escape or the overlay.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    children
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Extra body content between the description and the confirmation input.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    closeOnOverlayClick
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">false</td>
                  <td className="p-3">Allows closing by clicking the overlay.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    closeOnEscape
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">false</td>
                  <td className="p-3">Allows closing with Escape.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    className
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Styles the dialog card.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    style
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    CSSProperties
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Inline styles for the dialog card.</td>
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
                    iconClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Styles the round icon badge.</td>
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
                  <td className="p-3">Styles the description paragraph.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    inputClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Styles the typed-confirmation input.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    footerClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Styles the footer that holds the buttons.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Accessibility */}
        <section aria-labelledby="AlertDialog-a11y">
          <h2
            id="AlertDialog-a11y"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>Rendered with role="alertdialog" and aria-modal, labelled by the title and described by the description.</li>
            <li>Cancel receives focus first, as recommended for destructive confirmations. Focus is trapped inside and returns to the trigger on close.</li>
            <li>Escape and overlay clicks are disabled by default so the user must make a choice; enable them with closeOnEscape and closeOnOverlayClick.</li>
            <li>The typed-confirmation input has a visible label that includes the required text.</li>
            <li>While an async onConfirm is running, both buttons are disabled and the confirm button sets aria-busy.</li>
            <li>Animations are reduced to a simple fade when the user prefers reduced motion.</li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={alertDialogFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </div>
  );
};

export default AlertDialogDocs;
