"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility, Bell, Globe, Lock, Mail } from "lucide-react";
import { SettingRow, Switch, Select, Button, Badge, Card, CardBody } from "@neuctra/ui";

const settingRowFaq = buildComponentFaq("SettingRow", {
  sizes: ["sm", "md", "lg"],
});

const settingRowProps = [
  ["label", "ReactNode", "-", "Primary label for the setting (required)."],
  ["description", "ReactNode", "-", "Helper text under the label, linked to the control with aria-describedby."],
  ["control", "ReactNode", "-", "The interactive control, e.g. a Switch or Select (required)."],
  ["htmlFor", "string", "-", "Id of the control. When omitted, the control is wrapped in a group labelled by the row."],
  ["icon", "ReactNode", "-", "Leading icon shown before the label."],
  ["disabled", "boolean", "false", "Dims the row and blocks pointer interaction with the control."],
  ["divider", "boolean", "false", "Bottom border, removed automatically on the last row."],
  ["size", '"sm" | "md" | "lg"', '"md"', "Vertical rhythm and text size."],
  ["stackOnMobile", "boolean", "false", "Stacks the control under the text below the sm breakpoint."],
  ["className", "string", "-", "Additional classes for the row root."],
  ["style", "CSSProperties", "-", "Inline styles for the row root."],
  ["iconClassName", "string", "-", "Additional classes for the icon wrapper."],
  ["labelClassName", "string", "-", "Additional classes for the label."],
  ["descriptionClassName", "string", "-", "Additional classes for the description."],
  ["controlClassName", "string", "-", "Additional classes for the control wrapper."],
  ["...rest", "HTMLAttributes<HTMLDivElement>", "-", "Any other div attribute."],
];

function NotificationSettings() {
  const [email, setEmail] = useState(true);
  const [push, setPush] = useState(false);
  const [digest, setDigest] = useState("weekly");
  return (
    <div className="w-full max-w-xl rounded-xl border border-border bg-card px-5">
      <SettingRow
        divider
        icon={<Mail />}
        label="Email notifications"
        description="Mentions, assignments and replies to your comments."
        control={<Switch mode="single" checked={email} onCheckedChange={setEmail} />}
      />
      <SettingRow
        divider
        icon={<Bell />}
        label="Push notifications"
        description="Delivered to the desktop and mobile apps."
        control={<Switch mode="single" checked={push} onCheckedChange={setPush} />}
      />
      <SettingRow
        divider
        stackOnMobile
        icon={<Globe />}
        label="Activity digest"
        description="A summary of what changed across your projects."
        control={
          <Select
            size="sm"
            value={digest}
            onValueChange={setDigest}
            options={[
              { label: "Daily", value: "daily" },
              { label: "Weekly", value: "weekly" },
              { label: "Never", value: "never" },
            ]}
          />
        }
      />
    </div>
  );
}

const SettingRowDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            SettingRow Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            Lay out preferences pages with a label, helper description and a
            right aligned control. SettingRow handles label association,
            optional icons, dividers between rows and a disabled state.
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="SettingRow-import">
          <h2
            id="SettingRow-import"
            className="text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            Import
          </h2>
          <CodeBlock code={`import { SettingRow } from "@neuctra/ui";`} />
        </section>

        {/* Example: Basic */}
        <section aria-labelledby="SettingRow-example-0">
          <h2
            id="SettingRow-example-0"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Pass any control. Without htmlFor, the control is wrapped in a
            group that takes its accessible name from the label.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<Card className="w-full max-w-xl">
  <CardBody>
    <SettingRow
      label="Two-factor authentication"
      description="Require a code from your authenticator app at sign in."
      control={<Button size="xs" variant="outline">Set up</Button>}
    />
  </CardBody>
</Card>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <Card className="w-full max-w-xl">
                  <CardBody>
                    <SettingRow
                      label="Two-factor authentication"
                      description="Require a code from your authenticator app at sign in."
                      control={
                        <Button size="xs" variant="outline">
                          Set up
                        </Button>
                      }
                    />
                  </CardBody>
                </Card>
              </div>
            }
          />
        </section>

        {/* Example: Settings list */}
        <section aria-labelledby="SettingRow-example-1">
          <h2
            id="SettingRow-example-1"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Notification Preferences
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Stack rows with divider and icon inside a card. The last row
            drops its border automatically.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [email, setEmail] = useState(true);
const [push, setPush] = useState(false);
const [digest, setDigest] = useState("weekly");

<div className="w-full max-w-xl rounded-xl border border-border bg-card px-5">
  <SettingRow
    divider
    icon={<Mail />}
    label="Email notifications"
    description="Mentions, assignments and replies to your comments."
    control={<Switch mode="single" checked={email} onCheckedChange={setEmail} />}
  />
  <SettingRow
    divider
    icon={<Bell />}
    label="Push notifications"
    description="Delivered to the desktop and mobile apps."
    control={<Switch mode="single" checked={push} onCheckedChange={setPush} />}
  />
  <SettingRow
    divider
    stackOnMobile
    icon={<Globe />}
    label="Activity digest"
    description="A summary of what changed across your projects."
    control={
      <Select
        size="sm"
        value={digest}
        onValueChange={setDigest}
        options={[
          { label: "Daily", value: "daily" },
          { label: "Weekly", value: "weekly" },
          { label: "Never", value: "never" },
        ]}
      />
    }
  />
</div>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <NotificationSettings />
              </div>
            }
          />
        </section>

        {/* Example: Sizes */}
        <section aria-labelledby="SettingRow-example-2">
          <h2
            id="SettingRow-example-2"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Sizes
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            sm suits dense drawers, md is the default and lg fits full page
            settings.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<SettingRow size="sm" divider label="Compact mode" control={<Switch mode="single" />} />
<SettingRow size="md" divider label="Show avatars" control={<Switch mode="single" />} />
<SettingRow size="lg" label="Reduce motion" control={<Switch mode="single" />} />`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="w-full max-w-xl rounded-xl border border-border bg-card px-5">
                  <SettingRow
                    size="sm"
                    divider
                    label="Compact mode"
                    control={<Switch mode="single" />}
                  />
                  <SettingRow
                    size="md"
                    divider
                    label="Show avatars"
                    control={<Switch mode="single" />}
                  />
                  <SettingRow
                    size="lg"
                    label="Reduce motion"
                    control={<Switch mode="single" />}
                  />
                </div>
              </div>
            }
          />
        </section>

        {/* Example: Disabled */}
        <section aria-labelledby="SettingRow-example-3">
          <h2
            id="SettingRow-example-3"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Disabled and Plan Gated
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            disabled dims the row and blocks the control. Pair it with a
            badge in the label to explain why.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<SettingRow
  disabled
  icon={<Lock />}
  label={
    <span className="inline-flex items-center gap-2">
      Single sign-on <Badge size="sm" variant="soft" text="Enterprise" />
    </span>
  }
  description="Enforce SAML login for every member of this workspace."
  control={<Switch mode="single" />}
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <SettingRow
                  className="w-full max-w-xl"
                  disabled
                  icon={<Lock />}
                  label={
                    <span className="inline-flex items-center gap-2">
                      Single sign-on{" "}
                      <Badge size="sm" variant="soft" text="Enterprise" />
                    </span>
                  }
                  description="Enforce SAML login for every member of this workspace."
                  control={<Switch mode="single" />}
                />
              </div>
            }
          />
        </section>

        {/* Example: Stack on mobile */}
        <section aria-labelledby="SettingRow-example-4">
          <h2
            id="SettingRow-example-4"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Wide Controls on Mobile
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            stackOnMobile moves wide controls such as selects under the text
            on narrow screens.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<SettingRow
  stackOnMobile
  label="Default timezone"
  description="Used for due dates and scheduled reports."
  control={
    <Select
      size="sm"
      defaultValue="utc"
      options={[
        { label: "UTC", value: "utc" },
        { label: "Europe/Berlin", value: "berlin" },
        { label: "America/New_York", value: "ny" },
      ]}
    />
  }
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <SettingRow
                  className="w-full max-w-xl"
                  stackOnMobile
                  label="Default timezone"
                  description="Used for due dates and scheduled reports."
                  control={
                    <Select
                      size="sm"
                      defaultValue="utc"
                      options={[
                        { label: "UTC", value: "utc" },
                        { label: "Europe/Berlin", value: "berlin" },
                        { label: "America/New_York", value: "ny" },
                      ]}
                    />
                  }
                />
              </div>
            }
          />
        </section>

        {/* Props */}
        <section aria-labelledby="SettingRow-props">
          <h2
            id="SettingRow-props"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the SettingRow component.
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
                {settingRowProps.map(([name, type, def, desc]) => (
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
        <section aria-labelledby="SettingRow-a11y">
          <h2
            id="SettingRow-a11y"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>
              With htmlFor, the label is a native label element pointing at
              the control id, so clicking the text focuses or toggles it.
            </li>
            <li>
              Without htmlFor, the control wrapper gets role="group" and
              aria-labelledby pointing at the label.
            </li>
            <li>
              The description is linked to the control wrapper with
              aria-describedby.
            </li>
            <li>
              disabled sets aria-disabled on the row and blocks pointer
              events; also pass disabled to the control itself to remove it
              from the tab order.
            </li>
            <li>Icons are decorative and hidden from assistive technology.</li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={settingRowFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </div>
  );
};

export default SettingRowDocs;
