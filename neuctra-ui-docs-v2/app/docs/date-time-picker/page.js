"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility } from "lucide-react";
import {
  DateTimePicker,
  Select,
  Input,
  Button,
  Card,
  CardHeader,
  CardBody,
} from "@neuctra/ui";

// Recomputed locally rather than imported from ./layout.js (Server Component).
const dateTimePickerFaq = buildComponentFaq("DateTimePicker", {
  sizes: ["xs", "sm", "md", "lg"],
});

const inDays = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

function ControlledDemo() {
  const [publishAt, setPublishAt] = useState(null);
  return (
    <div className="w-full max-w-sm space-y-2">
      <DateTimePicker
        label="Publish at"
        value={publishAt}
        onChange={setPublishAt}
        minDate={new Date()}
        clearable
      />
      <p className="text-xs text-muted-foreground">
        {publishAt
          ? `Goes live ${publishAt.toLocaleString()}`
          : "Not scheduled. The post stays in drafts."}
      </p>
    </div>
  );
}

function ScheduleDemo() {
  const [startsAt, setStartsAt] = useState(null);
  return (
    <Card className="w-full max-w-xl">
      <CardHeader
        title="Schedule a webinar"
        description="Attendees get a calendar invite and a reminder one hour before."
      />
      <CardBody className="space-y-4">
        <Input label="Title" placeholder="Q3 product roadmap" />
        <div className="grid gap-4 sm:grid-cols-2">
          <DateTimePicker
            label="Starts at"
            value={startsAt}
            onChange={setStartsAt}
            minDate={new Date()}
            maxDate={inDays(90)}
            minuteStep={30}
            hour12
            required
          />
          <Select
            label="Duration"
            defaultValue="60"
            options={[
              { label: "30 minutes", value: "30" },
              { label: "1 hour", value: "60" },
              { label: "90 minutes", value: "90" },
            ]}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm">
            Save draft
          </Button>
          <Button size="sm" disabled={!startsAt}>
            Schedule
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

const dateTimeProps = [
  ["value", "Date | null", "-", "Controlled date and time; null means no selection."],
  ["defaultValue", "Date | null", "null", "Initial value when uncontrolled."],
  ["onChange", "(value: Date | null) => void", "-", "Called with the next date/time, or null when cleared."],
  ["minuteStep", "number", "15", "Minutes between each option in the time list."],
  ["minDate", "Date", "-", "Earliest selectable date."],
  ["maxDate", "Date", "-", "Latest selectable date."],
  ["isDateDisabled", "(date: Date) => boolean", "-", "Return true to disable a specific day."],
  ["placeholder", "string", '"Pick date and time"', "Trigger text when no value is selected."],
  ["disabled", "boolean", "false", "Disables the trigger."],
  ["formatValue", "(date: Date) => string", "-", "Formats the trigger text. Defaults to the locale date plus time."],
  ["hour12", "boolean", "false", 'Uses a 12-hour clock (e.g. "9:30 AM") in the time list and the default trigger format.'],
  ["locale", "string", "-", "Locale for the calendar and default trigger format."],
  ["weekStartsOn", "0 | 1", "1", "First day of the week: 0 for Sunday, 1 for Monday."],
  ["label", "string", "-", "Label rendered above the trigger."],
  ["helperText", "string", "-", "Helper text rendered below the trigger."],
  ["error", "string | boolean", "-", "Error state. A string is shown as the message."],
  ["success", "boolean", "false", "Applies success styling to the trigger."],
  ["required", "boolean", "false", "Marks the field as required and shows a * next to the label."],
  ["size", '"xs" | "sm" | "md" | "lg"', '"md"', "Trigger size. Matches Select and Input heights."],
  ["clearable", "boolean", "false", "Shows a clear button while a value is selected."],
  ["doneLabel", "string", '"Done"', "Text of the button that closes the panel."],
  ["className", "string", "-", "Additional classes for the root element."],
  ["style", "CSSProperties", "-", "Inline styles for the root element."],
  ["labelClassName", "string", "-", "Additional classes for the label."],
  ["triggerClassName", "string", "-", "Additional classes for the trigger button."],
  ["triggerStyle", "CSSProperties", "-", "Inline styles for the trigger button."],
  ["iconClassName", "string", "-", "Additional classes for the trigger icon."],
  ["panelClassName", "string", "-", "Additional classes for the floating panel."],
  ["panelStyle", "CSSProperties", "-", "Inline styles for the floating panel."],
  ["timeSelectClassName", "string", "-", "Additional classes for the time field (the inner TimePicker trigger)."],
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

const DateTimePickerDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            DateTimePicker Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            Pick a date and a time in one field. The panel combines the
            Neuctra Calendar with a Neuctra TimePicker, supports 12 or 24
            hour clocks, date bounds and a configurable minute step, and
            returns a plain Date.
          </p>
        </header>

        <section aria-labelledby="DateTimePicker-import">
          <h2 id="DateTimePicker-import" className="text-xl sm:text-2xl font-semibold mb-3 text-white">
            Import
          </h2>
          <CodeBlock code={`import { DateTimePicker } from "@neuctra/ui";`} />
        </section>

        <section aria-labelledby="DateTimePicker-example-0">
          <h2 id="DateTimePicker-example-0" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Picking a day keeps the chosen time (09:00 for a new value).
            Changes apply immediately; Done closes the panel.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<DateTimePicker label="Meeting time" helperText="Shown in your local timezone." />`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="w-full max-w-sm">
                  <DateTimePicker
                    label="Meeting time"
                    helperText="Shown in your local timezone."
                  />
                </div>
              </div>
            }
          />
        </section>

        <section aria-labelledby="DateTimePicker-example-1">
          <h2 id="DateTimePicker-example-1" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            12-Hour Clock and Minute Step
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            hour12 switches the time list and the trigger to a 12-hour clock.
            minuteStep sets the gap between times in the list.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<DateTimePicker label="Pickup" hour12 minuteStep={5} />
<DateTimePicker label="Shift start" minuteStep={30} />`}
            previewContent={
              <div className="grid w-full gap-4 py-4 sm:grid-cols-2">
                <DateTimePicker label="Pickup" hour12 minuteStep={5} />
                <DateTimePicker label="Shift start" minuteStep={30} />
              </div>
            }
          />
        </section>

        <section aria-labelledby="DateTimePicker-example-2">
          <h2 id="DateTimePicker-example-2" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Sizes
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            The trigger follows the Select and Input size scale.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<DateTimePicker size="xs" />
<DateTimePicker size="sm" />
<DateTimePicker size="md" />
<DateTimePicker size="lg" />`}
            previewContent={
              <div className="grid w-full max-w-sm gap-3 py-4">
                <DateTimePicker size="xs" />
                <DateTimePicker size="sm" />
                <DateTimePicker size="md" />
                <DateTimePicker size="lg" />
              </div>
            }
          />
        </section>

        <section aria-labelledby="DateTimePicker-example-3">
          <h2 id="DateTimePicker-example-3" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Controlled and Clearable
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Own the value with value and onChange. clearable adds a button
            that resets it to null.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [publishAt, setPublishAt] = useState(null);

<DateTimePicker
  label="Publish at"
  value={publishAt}
  onChange={setPublishAt}
  minDate={new Date()}
  clearable
/>
<p className="text-xs text-muted-foreground">
  {publishAt
    ? \`Goes live \${publishAt.toLocaleString()}\`
    : "Not scheduled. The post stays in drafts."}
</p>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <ControlledDemo />
              </div>
            }
          />
        </section>

        <section aria-labelledby="DateTimePicker-example-4">
          <h2 id="DateTimePicker-example-4" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            States
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Required and error states use the same tokens as every other Neuctra field. Disabled pickers keep their value visible.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<DateTimePicker label="Deadline" required error="Set a deadline for this task." />
<DateTimePicker label="Created" defaultValue={new Date(2026, 0, 12, 9, 30)} disabled />`}
            previewContent={
              <div className="grid w-full gap-4 py-4 sm:grid-cols-2">
                <DateTimePicker
                  label="Deadline"
                  required
                  error="Set a deadline for this task."
                />
                <DateTimePicker label="Created" defaultValue={new Date(2026, 0, 12, 9, 30)} disabled />
              </div>
            }
          />
        </section>

        <section aria-labelledby="DateTimePicker-example-5">
          <h2 id="DateTimePicker-example-5" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Webinar Scheduling
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            A bounded, 30-minute, 12-hour picker next to a Select with the same
            label and height.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [startsAt, setStartsAt] = useState(null);

<Card className="w-full max-w-xl">
  <CardHeader
    title="Schedule a webinar"
    description="Attendees get a calendar invite and a reminder one hour before."
  />
  <CardBody className="space-y-4">
    <Input label="Title" placeholder="Q3 product roadmap" />
    <div className="grid gap-4 sm:grid-cols-2">
      <DateTimePicker
        label="Starts at"
        value={startsAt}
        onChange={setStartsAt}
        minDate={new Date()}
        maxDate={inDays(90)}
        minuteStep={30}
        hour12
        required
      />
      <Select
        label="Duration"
        defaultValue="60"
        options={[
          { label: "30 minutes", value: "30" },
          { label: "1 hour", value: "60" },
          { label: "90 minutes", value: "90" },
        ]}
      />
    </div>
    <div className="flex justify-end gap-2">
      <Button variant="outline" size="sm">Save draft</Button>
      <Button size="sm" disabled={!startsAt}>Schedule</Button>
    </div>
  </CardBody>
</Card>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <ScheduleDemo />
              </div>
            }
          />
        </section>

        <section aria-labelledby="DateTimePicker-props">
          <h2 id="DateTimePicker-props" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the DateTimePicker component.
          </p>
          <PropsTable rows={dateTimeProps} />
        </section>

        <section aria-labelledby="DateTimePicker-a11y">
          <h2 id="DateTimePicker-a11y" className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white">
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>
              The trigger exposes aria-haspopup="dialog", aria-expanded and
              aria-controls, and is linked to its label and helper text.
            </li>
            <li>
              Opening moves focus to the selected day (or today) inside a
              labelled dialog; Tab moves through the calendar, the time field
              and Done.
            </li>
            <li>
              Day buttons carry full date labels, aria-pressed and
              aria-current="date". The time field is a Neuctra TimePicker: a
              labelled listbox navigated with the Arrow keys, Home and End.
            </li>
            <li>
              Escape or Done closes the panel and returns focus to the trigger.
              While the time list is open, Escape closes only the list and
              returns focus to the time field, so the panel stays open.
            </li>
          </ul>
        </section>

        <ComponentFaq qa={dateTimePickerFaq} />
        <DocsFooter />
      </div>
    </div>
  );
};

export default DateTimePickerDocs;
