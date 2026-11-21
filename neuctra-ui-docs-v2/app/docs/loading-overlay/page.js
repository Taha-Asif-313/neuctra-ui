"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility, RefreshCw, Loader2 } from "lucide-react";
import { LoadingOverlay, Button, Card, CardBody, Badge, Input } from "@neuctra/ui";

// Recomputed locally rather than imported from ./layout.js: layout.js is a
// Server Component module and this page.js is a Client Component.
const loadingOverlayFaq = buildComponentFaq("LoadingOverlay");

function BillingSummaryDemo() {
  const [loading, setLoading] = useState(false);
  const refresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };
  return (
    <LoadingOverlay active={loading} label="Refreshing usage" className="w-full max-w-sm rounded-xl">
      <Card>
        <CardBody className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">Billing summary</p>
            <Badge text="Pro plan" variant="soft" size="sm" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-foreground">$1,284.50</p>
            <p className="text-xs text-muted-foreground">Current period, Oct 1 to Oct 31</p>
          </div>
          <Button size="sm" variant="outline" iconBefore={<RefreshCw size={14} />} onClick={refresh}>
            Refresh usage
          </Button>
        </CardBody>
      </Card>
    </LoadingOverlay>
  );
}

function SettingsFormDemo() {
  const [saving, setSaving] = useState(false);
  const save = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 2000);
  };
  return (
    <LoadingOverlay
      active={saving}
      label="Saving settings"
      description="This takes a few seconds."
      className="w-full max-w-md rounded-xl"
    >
      <Card>
        <CardBody className="space-y-4">
          <div className="space-y-1">
            <p className="text-base font-semibold text-foreground">Project settings</p>
            <p className="text-sm text-secondary">Changes apply to every environment.</p>
          </div>
          <Input label="Project name" defaultValue="Acme storefront" />
          <Input label="Production URL" defaultValue="https://acme.com" />
          <div className="flex justify-end">
            <Button size="sm" onClick={save}>Save changes</Button>
          </div>
        </CardBody>
      </Card>
    </LoadingOverlay>
  );
}

function FullScreenDemo() {
  const [active, setActive] = useState(false);
  const start = () => {
    setActive(true);
    setTimeout(() => setActive(false), 2000);
  };
  return (
    <LoadingOverlay active={active} fullScreen label="Switching workspace" description="Loading Acme Inc.">
      <Button size="sm" variant="outline" onClick={start}>
        Switch workspace
      </Button>
    </LoadingOverlay>
  );
}

const LoadingOverlayDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            LoadingOverlay Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            Covers a region, or the whole viewport, with a scrim, spinner and label while its content loads. Children stay mounted so layout and form state are kept, covered controls are taken out of the tab order, and the label is announced to screen readers.
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="LoadingOverlay-import">
          <h2
            id="LoadingOverlay-import"
            className="text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            Import
          </h2>
          <CodeBlock code={`import { LoadingOverlay } from "@neuctra/ui";`} />
        </section>

        {/* Example: Basic Usage */}
        <section aria-labelledby="LoadingOverlay-example-0">
          <h2
            id="LoadingOverlay-example-0"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Wrap the region and toggle active. Give the overlay the same rounding as its child so the scrim matches its corners.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`function BillingSummaryDemo() {
  const [loading, setLoading] = useState(false);
  const refresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };
  return (
    <LoadingOverlay active={loading} label="Refreshing usage" className="w-full max-w-sm rounded-xl">
      <Card>
        <CardBody className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">Billing summary</p>
            <Badge text="Pro plan" variant="soft" size="sm" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-foreground">$1,284.50</p>
            <p className="text-xs text-muted-foreground">Current period, Oct 1 to Oct 31</p>
          </div>
          <Button size="sm" variant="outline" iconBefore={<RefreshCw size={14} />} onClick={refresh}>
            Refresh usage
          </Button>
        </CardBody>
      </Card>
    </LoadingOverlay>
  );
}`}
            previewContent={
              <div className="flex w-full items-center justify-center py-4">
                <BillingSummaryDemo />
              </div>
            }
          />
        </section>

        {/* Example: Label, Description and Spinner */}
        <section aria-labelledby="LoadingOverlay-example-1">
          <h2
            id="LoadingOverlay-example-1"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Label, Description and Spinner
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Pass an empty label for a spinner only, add a description for progress details, or replace the spinner and turn off the blur.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
  <LoadingOverlay active label="" spinnerSize="md" className="h-40 min-w-0 rounded-xl border border-border bg-card">
    <div className="flex h-full items-end p-4 text-xs text-muted-foreground">Monthly revenue</div>
  </LoadingOverlay>
  <LoadingOverlay
    active
    label="Importing contacts"
    description="1,240 of 3,000 rows"
    className="h-40 min-w-0 rounded-xl border border-border bg-card"
  >
    <div className="flex h-full items-end p-4 text-xs text-muted-foreground">Contacts table</div>
  </LoadingOverlay>
  <LoadingOverlay
    active
    blur={false}
    spinner={<Loader2 size={28} className="animate-spin text-primary" />}
    label="Saving"
    className="h-40 min-w-0 rounded-xl border border-border bg-card"
  >
    <div className="flex h-full items-end p-4 text-xs text-muted-foreground">Invoice draft</div>
  </LoadingOverlay>
</div>`}
            previewContent={
              <div className="w-full py-4">
                <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
                  <LoadingOverlay active label="" spinnerSize="md" className="h-40 min-w-0 rounded-xl border border-border bg-card">
                    <div className="flex h-full items-end p-4 text-xs text-muted-foreground">Monthly revenue</div>
                  </LoadingOverlay>
                  <LoadingOverlay
                    active
                    label="Importing contacts"
                    description="1,240 of 3,000 rows"
                    className="h-40 min-w-0 rounded-xl border border-border bg-card"
                  >
                    <div className="flex h-full items-end p-4 text-xs text-muted-foreground">Contacts table</div>
                  </LoadingOverlay>
                  <LoadingOverlay
                    active
                    blur={false}
                    spinner={<Loader2 size={28} className="animate-spin text-primary" />}
                    label="Saving"
                    className="h-40 min-w-0 rounded-xl border border-border bg-card"
                  >
                    <div className="flex h-full items-end p-4 text-xs text-muted-foreground">Invoice draft</div>
                  </LoadingOverlay>
                </div>
              </div>
            }
          />
        </section>

        {/* Example: Saving a Form */}
        <section aria-labelledby="LoadingOverlay-example-2">
          <h2
            id="LoadingOverlay-example-2"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Saving a Form
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            While saving, the inputs and button under the scrim cannot be clicked or reached with Tab (blockInteraction is on by default).
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`function SettingsFormDemo() {
  const [saving, setSaving] = useState(false);
  const save = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 2000);
  };
  return (
    <LoadingOverlay
      active={saving}
      label="Saving settings"
      description="This takes a few seconds."
      className="w-full max-w-md rounded-xl"
    >
      <Card>
        <CardBody className="space-y-4">
          <div className="space-y-1">
            <p className="text-base font-semibold text-foreground">Project settings</p>
            <p className="text-sm text-secondary">Changes apply to every environment.</p>
          </div>
          <Input label="Project name" defaultValue="Acme storefront" />
          <Input label="Production URL" defaultValue="https://acme.com" />
          <div className="flex justify-end">
            <Button size="sm" onClick={save}>Save changes</Button>
          </div>
        </CardBody>
      </Card>
    </LoadingOverlay>
  );
}`}
            previewContent={
              <div className="flex w-full items-center justify-center py-4">
                <SettingsFormDemo />
              </div>
            }
          />
        </section>

        {/* Example: Full Screen */}
        <section aria-labelledby="LoadingOverlay-example-3">
          <h2
            id="LoadingOverlay-example-3"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Full Screen
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            fullScreen fixes the scrim over the whole viewport, for app-wide transitions like switching workspaces.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`function FullScreenDemo() {
  const [active, setActive] = useState(false);
  const start = () => {
    setActive(true);
    setTimeout(() => setActive(false), 2000);
  };
  return (
    <LoadingOverlay active={active} fullScreen label="Switching workspace" description="Loading Acme Inc.">
      <Button size="sm" variant="outline" onClick={start}>
        Switch workspace
      </Button>
    </LoadingOverlay>
  );
}`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <FullScreenDemo />
              </div>
            }
          />
        </section>

        {/* Props table */}
        <section aria-labelledby="LoadingOverlay-props">
          <h2
            id="LoadingOverlay-props"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the LoadingOverlay component.
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
                    active
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Shows the scrim while true (required).</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    children
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Region covered by the scrim (required).</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    label
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">"Loading..."</td>
                  <td className="p-3">Text shown under the spinner and announced; empty string hides it.</td>
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
                    spinner
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Custom spinner; null shows only the label.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    spinnerSize
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    "sm" | "md" | "lg" | "xl"
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">"lg"</td>
                  <td className="p-3">Size of the built-in spinner.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    blur
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">true</td>
                  <td className="p-3">Blurs the covered content.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    fullScreen
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">false</td>
                  <td className="p-3">Covers the whole viewport instead of the region.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    blockInteraction
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">true</td>
                  <td className="p-3">Makes covered content unreachable by Tab and pointer while active.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    className
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Styles the wrapper around children.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    style
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    CSSProperties
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Inline styles for the wrapper.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    scrimClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Styles the scrim layer.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    contentClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Styles the spinner and label stack.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    labelClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Styles the label text.</td>
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
                    ...rest
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    HTMLAttributes&lt;HTMLDivElement&gt;
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Other attributes are spread on the wrapper.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Accessibility */}
        <section aria-labelledby="LoadingOverlay-a11y">
          <h2
            id="LoadingOverlay-a11y"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>The wrapper sets aria-busy while active.</li>
            <li>An always-mounted role="status" live region announces the label when loading starts, so the message is not missed.</li>
            <li>Covered content is marked inert while active, which removes it from the tab order and the accessibility tree. Turn this off with blockInteraction=&#123;false&#125;.</li>
            <li>The visual scrim is aria-hidden to avoid announcing the label twice. Its fade is removed with reduced motion.</li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={loadingOverlayFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </div>
  );
};

export default LoadingOverlayDocs;
