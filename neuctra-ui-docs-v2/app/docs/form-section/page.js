"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility } from "lucide-react";
import { FormSection, Input, Button, Switch } from "@neuctra/ui";

const formSectionFaq = buildComponentFaq("FormSection", {
  variants: ["card", "plain"],
  sizes: ["sm", "md", "lg"],
});

const formSectionProps = [
  ["title", "ReactNode", "-", "Section title rendered as the fieldset legend (required)."],
  ["description", "ReactNode", "-", "Supporting text under the title, linked with aria-describedby."],
  ["actions", "ReactNode", "-", "Slot at the right of the header, e.g. a Reset button."],
  ["disabled", "boolean", "false", "Disables every native control inside the section."],
  ["variant", '"card" | "plain"', '"card"', "Bordered card surface, or no surface for stacking inside one card."],
  ["size", '"sm" | "md" | "lg"', '"md"', "Padding, title size and the gap between controls."],
  ["children", "ReactNode", "-", "Form controls and related content (required)."],
  ["className", "string", "-", "Additional classes for the fieldset root."],
  ["style", "CSSProperties", "-", "Inline styles for the fieldset root."],
  ["headerClassName", "string", "-", "Additional classes for the legend (header row)."],
  ["titleClassName", "string", "-", "Additional classes for the title text."],
  ["descriptionClassName", "string", "-", "Additional classes for the description text."],
  ["actionsClassName", "string", "-", "Additional classes for the actions slot wrapper."],
  ["contentClassName", "string", "-", "Additional classes for the wrapper around children."],
  ["...rest", "FieldsetHTMLAttributes", "-", "Any other fieldset attribute, such as id or name."],
];

function LockedBillingSection() {
  const [locked, setLocked] = useState(true);
  return (
    <div className="w-full max-w-xl space-y-3">
      <Switch
        mode="single"
        label="Lock billing details"
        checked={locked}
        onCheckedChange={setLocked}
      />
      <FormSection
        title="Billing contact"
        description="Invoices and payment receipts are sent to this address."
        disabled={locked}
      >
        <Input label="Billing email" type="email" defaultValue="finance@acme.io" />
        <Input label="Tax ID" placeholder="EU123456789" />
      </FormSection>
    </div>
  );
}

const FormSectionDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            FormSection Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            Group related form controls under a semantic fieldset and legend.
            FormSection adds a title, an optional description and actions slot,
            a disabled state that locks every control at once, and card or
            plain surfaces for long settings forms.
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="FormSection-import">
          <h2
            id="FormSection-import"
            className="text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            Import
          </h2>
          <CodeBlock code={`import { FormSection } from "@neuctra/ui";`} />
        </section>

        {/* Example: Basic Usage */}
        <section aria-labelledby="FormSection-example-0">
          <h2
            id="FormSection-example-0"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Give the section a title and description, then place any inputs
            inside. The legend is announced when focus enters the group.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<FormSection
  title="Project details"
  description="Shown on invoices and in the workspace switcher."
>
  <Input label="Project name" defaultValue="Atlas CRM" />
  <Input label="Project URL" type="url" defaultValue="https://atlas.acme.io" />
</FormSection>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <FormSection
                  className="w-full max-w-xl"
                  title="Project details"
                  description="Shown on invoices and in the workspace switcher."
                >
                  <Input label="Project name" defaultValue="Atlas CRM" />
                  <Input
                    label="Project URL"
                    type="url"
                    defaultValue="https://atlas.acme.io"
                  />
                </FormSection>
              </div>
            }
          />
        </section>

        {/* Example: Header actions */}
        <section aria-labelledby="FormSection-example-1">
          <h2
            id="FormSection-example-1"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Header Actions
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Use actions for section level commands such as resetting values
            or opening documentation.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<FormSection
  title="API access"
  description="Keys inherit the permissions of the member who created them."
  actions={<Button size="xs" variant="outline">Rotate key</Button>}
>
  <Input label="Publishable key" defaultValue="pk_live_51HqT9a" readOnly />
  <Input label="Webhook URL" placeholder="https://api.acme.io/hooks" />
</FormSection>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <FormSection
                  className="w-full max-w-xl"
                  title="API access"
                  description="Keys inherit the permissions of the member who created them."
                  actions={
                    <Button size="xs" variant="outline">
                      Rotate key
                    </Button>
                  }
                >
                  <Input
                    label="Publishable key"
                    defaultValue="pk_live_51HqT9a"
                    readOnly
                  />
                  <Input
                    label="Webhook URL"
                    placeholder="https://api.acme.io/hooks"
                  />
                </FormSection>
              </div>
            }
          />
        </section>

        {/* Example: Sizes */}
        <section aria-labelledby="FormSection-example-2">
          <h2
            id="FormSection-example-2"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Sizes
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            size scales the padding, title and spacing between controls: sm,
            md (default) and lg.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<FormSection size="sm" title="Notifications" description="Compact, for sidebars and drawers.">
  <Input label="Digest email" defaultValue="maya@acme.io" />
</FormSection>
<FormSection size="lg" title="Company profile" description="Roomy, for full page settings.">
  <Input label="Legal name" defaultValue="Acme Labs Inc." />
</FormSection>`}
            previewContent={
              <div className="flex w-full flex-wrap items-start gap-4 py-4">
                <FormSection
                  size="sm"
                  className="w-full max-w-xs"
                  title="Notifications"
                  description="Compact, for sidebars and drawers."
                >
                  <Input label="Digest email" defaultValue="maya@acme.io" />
                </FormSection>
                <FormSection
                  size="lg"
                  className="w-full max-w-md"
                  title="Company profile"
                  description="Roomy, for full page settings."
                >
                  <Input label="Legal name" defaultValue="Acme Labs Inc." />
                </FormSection>
              </div>
            }
          />
        </section>

        {/* Example: Disabled */}
        <section aria-labelledby="FormSection-example-3">
          <h2
            id="FormSection-example-3"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Disabled State
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            disabled is forwarded to the native fieldset, so every input,
            select and button inside becomes non-interactive in one place.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [locked, setLocked] = useState(true);

<Switch
  mode="single"
  label="Lock billing details"
  checked={locked}
  onCheckedChange={setLocked}
/>
<FormSection
  title="Billing contact"
  description="Invoices and payment receipts are sent to this address."
  disabled={locked}
>
  <Input label="Billing email" type="email" defaultValue="finance@acme.io" />
  <Input label="Tax ID" placeholder="EU123456789" />
</FormSection>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <LockedBillingSection />
              </div>
            }
          />
        </section>

        {/* Example: Plain sections inside one card */}
        <section aria-labelledby="FormSection-example-4">
          <h2
            id="FormSection-example-4"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Plain Sections in a Settings Card
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            variant="plain" removes the surface so several sections can share
            one card, separated by dividers.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<form className="w-full max-w-xl divide-y divide-border rounded-xl border border-border bg-card">
  <div className="p-5">
    <FormSection variant="plain" title="Profile" description="How teammates see you.">
      <Input label="Full name" defaultValue="Maya Chen" />
      <Input label="Job title" defaultValue="Product designer" />
    </FormSection>
  </div>
  <div className="p-5">
    <FormSection variant="plain" title="Security" description="Required for admins.">
      <Input label="Recovery email" type="email" defaultValue="maya.chen@proton.me" />
    </FormSection>
  </div>
  <div className="flex justify-end gap-2 p-4">
    <Button size="sm" variant="ghost" type="button">Cancel</Button>
    <Button size="sm" type="submit">Save changes</Button>
  </div>
</form>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <form
                  onSubmit={(event) => event.preventDefault()}
                  className="w-full max-w-xl divide-y divide-border rounded-xl border border-border bg-card"
                >
                  <div className="p-5">
                    <FormSection
                      variant="plain"
                      title="Profile"
                      description="How teammates see you."
                    >
                      <Input label="Full name" defaultValue="Maya Chen" />
                      <Input label="Job title" defaultValue="Product designer" />
                    </FormSection>
                  </div>
                  <div className="p-5">
                    <FormSection
                      variant="plain"
                      title="Security"
                      description="Required for admins."
                    >
                      <Input
                        label="Recovery email"
                        type="email"
                        defaultValue="maya.chen@proton.me"
                      />
                    </FormSection>
                  </div>
                  <div className="flex justify-end gap-2 p-4">
                    <Button size="sm" variant="ghost" type="button">
                      Cancel
                    </Button>
                    <Button size="sm" type="submit">
                      Save changes
                    </Button>
                  </div>
                </form>
              </div>
            }
          />
        </section>

        {/* Props */}
        <section aria-labelledby="FormSection-props">
          <h2
            id="FormSection-props"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the FormSection component.
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
                {formSectionProps.map(([name, type, def, desc]) => (
                  <tr key={name}>
                    <td className="p-3 font-medium text-primary whitespace-nowrap">
                      {name}
                    </td>
                    <td className="p-3 font-mono text-xs text-gray-300">
                      {type}
                    </td>
                    <td className="p-3 text-gray-400 whitespace-nowrap">
                      {def}
                    </td>
                    <td className="p-3">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Accessibility */}
        <section aria-labelledby="FormSection-a11y">
          <h2
            id="FormSection-a11y"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>
              Renders a native fieldset with a legend, so screen readers
              announce the section title when focus enters any control
              inside it.
            </li>
            <li>
              The description is linked to the fieldset with
              aria-describedby.
            </li>
            <li>
              disabled uses the native fieldset attribute, which removes
              every nested form control from the tab order.
            </li>
            <li>
              The legend is floated in normal flow, so the title stays part
              of the fieldset semantics without notching the card border.
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={formSectionFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </div>
  );
};

export default FormSectionDocs;
