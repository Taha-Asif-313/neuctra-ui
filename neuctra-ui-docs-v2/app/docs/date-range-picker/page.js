"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility } from "lucide-react";
import {
  DateRangePicker,
  Select,
  Button,
  Card,
  CardHeader,
  CardBody,
} from "@neuctra/ui";

// Recomputed locally rather than imported from ./layout.js (Server Component).
const dateRangePickerFaq = buildComponentFaq("DateRangePicker", {
  sizes: ["xs", "sm", "md", "lg"],
});

const daysAgo = (days) => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - days);
  return date;
};

const presets = [
  { label: "Today", value: { from: daysAgo(0), to: daysAgo(0) } },
  { label: "Last 7 days", value: { from: daysAgo(6), to: daysAgo(0) } },
  { label: "Last 30 days", value: { from: daysAgo(29), to: daysAgo(0) } },
  { label: "Last 90 days", value: { from: daysAgo(89), to: daysAgo(0) } },
];

const formatShort = (date) =>
  date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

function ControlledDemo() {
  const [range, setRange] = useState({});
  const nights =
    range.from && range.to
      ? Math.round((range.to - range.from) / 86400000)
      : 0;
  return (
    <div className="w-full max-w-sm space-y-2">
      <DateRangePicker
        label="Stay"
        value={range}
        onChange={setRange}
        minDate={new Date()}
        placeholder="Check-in - Check-out"
      />
      <p className="text-xs text-muted-foreground">
        {nights > 0
          ? `${nights} night${nights === 1 ? "" : "s"} selected`
          : "Pick a check-in and check-out date."}
      </p>
    </div>
  );
}

function ReportDemo() {
  const [range, setRange] = useState(presets[1].value);
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader
        title="Export revenue report"
        description="Download invoices and payouts as CSV."
      />
      <CardBody className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <DateRangePicker
            label="Period"
            value={range}
            onChange={setRange}
            presets={presets}
            months={2}
            maxDate={new Date()}
            formatDate={formatShort}
          />
          <Select
            label="Currency"
            defaultValue="usd"
            options={[
              { label: "USD", value: "usd" },
              { label: "EUR", value: "eur" },
              { label: "GBP", value: "gbp" },
            ]}
          />
        </div>
        <div className="flex justify-end">
          <Button size="sm" disabled={!range.from || !range.to}>
            Export CSV
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

const dateRangeProps = [
  ["value", "DateRange", "-", "Controlled range: { from?: Date; to?: Date }."],
  ["defaultValue", "DateRange", "{}", "Initial range in uncontrolled mode."],
  ["onChange", "(range: DateRange) => void", "-", "Fired with the next range whenever a day or preset is chosen."],
  ["months", "number", "1", "Number of month grids shown side by side."],
  ["presets", "DateRangePreset[]", "-", "Shortcuts shown next to the grids: { label, value }."],
  ["minDate", "Date", "-", "Earliest selectable date."],
  ["maxDate", "Date", "-", "Latest selectable date."],
  ["isDateDisabled", "(date: Date) => boolean", "-", "Return true to disable a specific day."],
  ["placeholder", "string", '"Select date range"', "Trigger text while no dates are selected."],
  ["formatDate", "(date: Date) => string", "-", "Formats dates in the trigger. Defaults to the locale date string."],
  ["locale", "string", "-", "Locale for weekday, month and day labels."],
  ["weekStartsOn", "0 | 1", "1", "First day of the week: 0 for Sunday, 1 for Monday."],
  ["label", "string", "-", "Label rendered above the trigger."],
  ["helperText", "string", "-", "Helper text rendered below the trigger."],
  ["error", "string | boolean", "-", "Error state. A string is shown as the message."],
  ["success", "boolean", "false", "Applies success styling to the trigger."],
  ["required", "boolean", "false", "Marks the field as required and shows a * next to the label."],
  ["disabled", "boolean", "false", "Disables the trigger."],
  ["size", '"xs" | "sm" | "md" | "lg"', '"md"', "Trigger size. Matches Select and Input heights."],
  ["clearable", "boolean", "true", "Shows a clear button while a range is selected."],
  ["closeOnSelect", "boolean", "true", "Closes the panel once both ends are picked or a preset is chosen."],
  ["className", "string", "-", "Additional classes for the root element."],
  ["style", "CSSProperties", "-", "Inline styles for the root element."],
  ["labelClassName", "string", "-", "Additional classes for the label."],
  ["triggerClassName", "string", "-", "Additional classes for the trigger button."],
  ["triggerStyle", "CSSProperties", "-", "Inline styles for the trigger button."],
  ["iconClassName", "string", "-", "Additional classes for the calendar icon."],
  ["panelClassName", "string", "-", "Additional classes for the floating panel."],
  ["panelStyle", "CSSProperties", "-", "Inline styles for the floating panel."],
  ["presetClassName", "string", "-", "Additional classes for each preset button."],
  ["dayClassName", "string", "-", "Additional classes for each day button."],
  ["helperClassName", "string", "-", "Additional classes for the helper/error text."],
];

function PropsTable({ rows }) {
  return (
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
          {rows.map(([prop, type, def, description]) => (
            <tr key={prop}>
              <td className="p-3 font-medium text-primary whitespace-nowrap">{prop}</td>
              <td className="p-3 font-mono text-xs text-gray-300">{type}</td>
              <td className="p-3 text-gray-400 whitespace-nowrap">{def}</td>
              <td className="p-3">{description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const DateRangePickerDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            DateRangePicker Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            A dependency-free date range field with one or more month grids,
            a live range preview while picking, quick presets, min and max
            bounds and full keyboard navigation. It shares the label, helper
            text and size scale of Select and Input.
          </p>
        </header>

        <section aria-labelledby="DateRangePicker-import">
          <h2 id="DateRangePicker-import" className="text-xl sm:text-2xl font-semibold mb-3 text-white">
            Import
          </h2>
          <CodeBlock code={`import { DateRangePicker } from "@neuctra/ui";`} />
        </section>

        <section aria-labelledby="DateRangePicker-example-0">
          <h2 id="DateRangePicker-example-0" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Click a start day, then an end day. Hovering previews the range,
            and the panel closes once both ends are set.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<DateRangePicker
  label="Campaign dates"
  helperText="Ads run from the first day to the last day inclusive."
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="w-full max-w-sm">
                  <DateRangePicker
                    label="Campaign dates"
                    helperText="Ads run from the first day to the last day inclusive."
                  />
                </div>
              </div>
            }
          />
        </section>

        <section aria-labelledby="DateRangePicker-example-1">
          <h2 id="DateRangePicker-example-1" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Presets and Two Months
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Presets appear in a side column on wider screens and above the
            grids on mobile. months=2 shows two grids that stack when space
            runs out.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const presets = [
  { label: "Today", value: { from: daysAgo(0), to: daysAgo(0) } },
  { label: "Last 7 days", value: { from: daysAgo(6), to: daysAgo(0) } },
  { label: "Last 30 days", value: { from: daysAgo(29), to: daysAgo(0) } },
  { label: "Last 90 days", value: { from: daysAgo(89), to: daysAgo(0) } },
];

<DateRangePicker
  label="Reporting period"
  presets={presets}
  months={2}
  maxDate={new Date()}
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="w-full max-w-sm">
                  <DateRangePicker
                    label="Reporting period"
                    presets={presets}
                    months={2}
                    maxDate={new Date()}
                  />
                </div>
              </div>
            }
          />
        </section>

        <section aria-labelledby="DateRangePicker-example-2">
          <h2 id="DateRangePicker-example-2" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Sizes
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Same height scale as Select and Input.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<DateRangePicker size="xs" />
<DateRangePicker size="sm" />
<DateRangePicker size="md" />
<DateRangePicker size="lg" />`}
            previewContent={
              <div className="grid w-full max-w-sm gap-3 py-4">
                <DateRangePicker size="xs" />
                <DateRangePicker size="sm" />
                <DateRangePicker size="md" />
                <DateRangePicker size="lg" />
              </div>
            }
          />
        </section>

        <section aria-labelledby="DateRangePicker-example-3">
          <h2 id="DateRangePicker-example-3" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Controlled with Bounds
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Own the range with value and onChange. minDate blocks past days
            for a booking flow.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [range, setRange] = useState({});
const nights =
  range.from && range.to ? Math.round((range.to - range.from) / 86400000) : 0;

<DateRangePicker
  label="Stay"
  value={range}
  onChange={setRange}
  minDate={new Date()}
  placeholder="Check-in - Check-out"
/>
<p className="text-xs text-muted-foreground">
  {nights > 0
    ? \`\${nights} night\${nights === 1 ? "" : "s"} selected\`
    : "Pick a check-in and check-out date."}
</p>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <ControlledDemo />
              </div>
            }
          />
        </section>

        <section aria-labelledby="DateRangePicker-example-4">
          <h2 id="DateRangePicker-example-4" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            States
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Required and error states use the same tokens as every other Neuctra field. Disabled pickers keep their range visible.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<DateRangePicker label="Leave dates" required error="Select both a start and an end date." />
<DateRangePicker label="Billing cycle" disabled defaultValue={{ from: daysAgo(30), to: daysAgo(0) }} />`}
            previewContent={
              <div className="grid w-full gap-4 py-4 sm:grid-cols-2">
                <DateRangePicker
                  label="Leave dates"
                  required
                  error="Select both a start and an end date."
                />
                <DateRangePicker
                  label="Billing cycle"
                  disabled
                  defaultValue={{ from: daysAgo(30), to: daysAgo(0) }}
                />
              </div>
            }
          />
        </section>

        <section aria-labelledby="DateRangePicker-example-5">
          <h2 id="DateRangePicker-example-5" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Report Export
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            A realistic export form where the range field lines up with a
            Select of the same height.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [range, setRange] = useState(presets[1].value);

<Card className="w-full max-w-2xl">
  <CardHeader
    title="Export revenue report"
    description="Download invoices and payouts as CSV."
  />
  <CardBody className="space-y-4">
    <div className="grid gap-4 sm:grid-cols-2">
      <DateRangePicker
        label="Period"
        value={range}
        onChange={setRange}
        presets={presets}
        months={2}
        maxDate={new Date()}
        formatDate={(date) =>
          date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
        }
      />
      <Select
        label="Currency"
        defaultValue="usd"
        options={[
          { label: "USD", value: "usd" },
          { label: "EUR", value: "eur" },
          { label: "GBP", value: "gbp" },
        ]}
      />
    </div>
    <div className="flex justify-end">
      <Button size="sm" disabled={!range.from || !range.to}>Export CSV</Button>
    </div>
  </CardBody>
</Card>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <ReportDemo />
              </div>
            }
          />
        </section>

        <section aria-labelledby="DateRangePicker-props">
          <h2 id="DateRangePicker-props" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the DateRangePicker component. Other div
            attributes are forwarded to the root element.
          </p>
          <PropsTable rows={dateRangeProps} />
        </section>

        <section aria-labelledby="DateRangePicker-a11y">
          <h2 id="DateRangePicker-a11y" className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white">
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>
              The trigger exposes aria-haspopup="dialog", aria-expanded and
              aria-controls, and is linked to its label and helper text.
            </li>
            <li>
              Inside the panel only one day is in the tab order. Arrow keys move
              by day and week, Page Up and Page Down by month, Home and End to
              the week edges, crossing into other months as needed.
            </li>
            <li>
              Day buttons have full date labels, aria-pressed for the range
              ends and aria-current="date" for today. Days outside minDate and
              maxDate are disabled and cannot be selected.
            </li>
            <li>
              Escape closes the panel and returns focus to the trigger. The
              clear button is a separate button, not nested in the trigger.
            </li>
          </ul>
        </section>

        <ComponentFaq qa={dateRangePickerFaq} />
        <DocsFooter />
      </div>
    </div>
  );
};

export default DateRangePickerDocs;
