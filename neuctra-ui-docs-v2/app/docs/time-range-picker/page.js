"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility } from "lucide-react";
import {
  TimeRangePicker,
  Button,
  Card,
  CardHeader,
  CardBody,
} from "@neuctra/ui";

// Recomputed locally rather than imported from ./layout.js (Server Component).
const timeRangeFaq = buildComponentFaq("TimeRangePicker", {
  sizes: ["xs", "sm", "md", "lg"],
});

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function ControlledDemo() {
  const [shift, setShift] = useState({ start: "09:00", end: "17:00" });
  const toMinutes = (time) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };
  const hours =
    shift.start && shift.end
      ? (toMinutes(shift.end) - toMinutes(shift.start)) / 60
      : 0;
  return (
    <div className="w-full max-w-sm space-y-2">
      <TimeRangePicker
        label="Shift"
        value={shift}
        onChange={setShift}
        step={15}
      />
      <p className="text-xs text-muted-foreground">
        {hours > 0 ? `${hours} hours scheduled` : "Choose a start and end time."}
      </p>
    </div>
  );
}

function OpeningHoursDemo() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader
        title="Opening hours"
        description="Customers can book appointments inside these windows."
      />
      <CardBody className="space-y-3">
        {weekdays.map((day) => (
          <div
            key={day}
            className="grid grid-cols-1 gap-1.5 sm:grid-cols-[6.5rem_minmax(0,1fr)] sm:items-center sm:gap-3"
          >
            <span className="text-sm font-medium text-foreground">{day}</span>
            <div className="min-w-0">
              <TimeRangePicker
                size="sm"
                min="07:00"
                max="21:00"
                hour12
                defaultValue={{ start: "09:00", end: "18:00" }}
                startLabel={`${day} opening time`}
                endLabel={`${day} closing time`}
              />
            </div>
          </div>
        ))}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
          <p className="text-xs text-muted-foreground">Closed on Saturday and Sunday.</p>
          <Button size="sm">Save hours</Button>
        </div>
      </CardBody>
    </Card>
  );
}

const timeRangeProps = [
  ["value", "TimeRange", "-", 'Controlled range: { start?: "HH:mm"; end?: "HH:mm" }.'],
  ["defaultValue", "TimeRange", "{}", "Initial range when uncontrolled."],
  ["onChange", "(value: TimeRange) => void", "-", "Called with the next valid range."],
  ["step", "number", "30", "Minutes between options in both time lists."],
  ["min", "string", '"00:00"', 'Earliest selectable time in "HH:mm" form.'],
  ["max", "string", '"23:59"', 'Latest selectable time in "HH:mm" form.'],
  ["separator", "string", '"to"', "Text shown between the two fields."],
  ["hour12", "boolean", "false", 'Shows times on a 12-hour clock. Values stay "HH:mm".'],
  ["label", "string", "-", "Label rendered above both fields."],
  ["helperText", "string", "-", "Helper text rendered below the fields."],
  ["error", "string | boolean", "-", "Error state. A string is shown as the message."],
  ["required", "boolean", "false", "Marks the fields as required and shows a * next to the label."],
  ["disabled", "boolean", "false", "Disables both fields."],
  ["size", '"xs" | "sm" | "md" | "lg"', '"md"', "Field size. Matches Select and Input heights."],
  ["startPlaceholder", "string", '"Start"', "Placeholder of the start field."],
  ["endPlaceholder", "string", '"End"', "Placeholder of the end field."],
  ["startLabel", "string", '"Start time"', "Accessible label of the start field."],
  ["endLabel", "string", '"End time"', "Accessible label of the end field."],
  ["startName", "string", "-", 'Form field name of the start time, submitted as "HH:mm".'],
  ["endName", "string", "-", 'Form field name of the end time, submitted as "HH:mm".'],
  ["className", "string", "-", "Additional classes for the root element."],
  ["style", "CSSProperties", "-", "Inline styles for the root element."],
  ["labelClassName", "string", "-", "Additional classes for the label."],
  ["selectClassName", "string", "-", "Additional classes for both TimePicker trigger buttons."],
  ["panelClassName", "string", "-", "Additional classes for both TimePicker popover panels."],
  ["separatorClassName", "string", "-", "Additional classes for the separator text."],
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

const TimeRangePickerDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            TimeRangePicker Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            Pick a start and end time with two TimePicker fields side by side.
            Times that would create an invalid range are disabled in each list
            up front, steps and bounds are configurable, and values are plain
            "HH:mm" strings.
          </p>
        </header>

        <section aria-labelledby="TimeRangePicker-import">
          <h2 id="TimeRangePicker-import" className="text-xl sm:text-2xl font-semibold mb-3 text-white">
            Import
          </h2>
          <CodeBlock code={`import { TimeRangePicker } from "@neuctra/ui";`} />
        </section>

        <section aria-labelledby="TimeRangePicker-example-0">
          <h2 id="TimeRangePicker-example-0" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Once a start is chosen, earlier end times are disabled, and vice
            versa.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<TimeRangePicker label="Quiet hours" helperText="Notifications are muted during this window." />`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="w-full max-w-sm">
                  <TimeRangePicker
                    label="Quiet hours"
                    helperText="Notifications are muted during this window."
                  />
                </div>
              </div>
            }
          />
        </section>

        <section aria-labelledby="TimeRangePicker-example-1">
          <h2 id="TimeRangePicker-example-1" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Sizes
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Both fields use the TimePicker size scale, which matches Select and
            Input heights.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<TimeRangePicker size="xs" />
<TimeRangePicker size="sm" />
<TimeRangePicker size="md" />
<TimeRangePicker size="lg" />`}
            previewContent={
              <div className="grid w-full max-w-sm gap-3 py-4">
                <TimeRangePicker size="xs" />
                <TimeRangePicker size="sm" />
                <TimeRangePicker size="md" />
                <TimeRangePicker size="lg" />
              </div>
            }
          />
        </section>

        <section aria-labelledby="TimeRangePicker-example-2">
          <h2 id="TimeRangePicker-example-2" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Controlled
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Own the range with value and onChange and derive totals from it.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [shift, setShift] = useState({ start: "09:00", end: "17:00" });
const toMinutes = (time) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};
const hours =
  shift.start && shift.end ? (toMinutes(shift.end) - toMinutes(shift.start)) / 60 : 0;

<TimeRangePicker label="Shift" value={shift} onChange={setShift} step={15} />
<p className="text-xs text-muted-foreground">
  {hours > 0 ? \`\${hours} hours scheduled\` : "Choose a start and end time."}
</p>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <ControlledDemo />
              </div>
            }
          />
        </section>

        <section aria-labelledby="TimeRangePicker-example-3">
          <h2 id="TimeRangePicker-example-3" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            States
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            An error paints both fields and shows one message below the pair.
            Disabled ranges keep their value visible.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<TimeRangePicker label="Delivery window" required error="Choose a delivery window." />
<TimeRangePicker label="Maintenance" disabled defaultValue={{ start: "02:00", end: "04:00" }} />`}
            previewContent={
              <div className="grid w-full gap-4 py-4 sm:grid-cols-2">
                <TimeRangePicker
                  label="Delivery window"
                  required
                  error="Choose a delivery window."
                />
                <TimeRangePicker
                  label="Maintenance"
                  disabled
                  defaultValue={{ start: "02:00", end: "04:00" }}
                />
              </div>
            }
          />
        </section>

        <section aria-labelledby="TimeRangePicker-example-4">
          <h2 id="TimeRangePicker-example-4" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Opening Hours
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Bounded, 12-hour pickers per weekday in a settings card. Each row
            gets its own accessible start and end labels.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

<Card className="w-full max-w-xl">
  <CardHeader
    title="Opening hours"
    description="Customers can book appointments inside these windows."
  />
  <CardBody className="space-y-3">
    {weekdays.map((day) => (
      <div
        key={day}
        className="grid grid-cols-1 gap-1.5 sm:grid-cols-[6.5rem_minmax(0,1fr)] sm:items-center sm:gap-3"
      >
        <span className="text-sm font-medium text-foreground">{day}</span>
        <div className="min-w-0">
          <TimeRangePicker
            size="sm"
            min="07:00"
            max="21:00"
            hour12
            defaultValue={{ start: "09:00", end: "18:00" }}
            startLabel={\`\${day} opening time\`}
            endLabel={\`\${day} closing time\`}
          />
        </div>
      </div>
    ))}
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
      <p className="text-xs text-muted-foreground">Closed on Saturday and Sunday.</p>
      <Button size="sm">Save hours</Button>
    </div>
  </CardBody>
</Card>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <OpeningHoursDemo />
              </div>
            }
          />
        </section>

        <section aria-labelledby="TimeRangePicker-props">
          <h2 id="TimeRangePicker-props" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the TimeRangePicker component.
          </p>
          <PropsTable rows={timeRangeProps} />
        </section>

        <section aria-labelledby="TimeRangePicker-a11y">
          <h2 id="TimeRangePicker-a11y" className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white">
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>
              Each field is a TimePicker: a button with aria-haspopup="listbox"
              and aria-expanded that opens a labelled listbox of times. Arrow
              Down or Arrow Up opens it, Arrow keys, Home and End move between
              times, Enter picks one.
            </li>
            <li>
              Escape or an outside click closes the list and returns focus to
              its field.
            </li>
            <li>
              The pair is a role="group" named by the label; each field has its
              own accessible name (startLabel and endLabel).
            </li>
            <li>
              Times that would make the end earlier than the start are disabled
              with aria-disabled. If an invalid range still slips in, an inline
              error is announced with role="alert" and aria-invalid is set on
              both fields.
            </li>
            <li>
              Helper and error text are linked to the group with
              aria-describedby.
            </li>
          </ul>
        </section>

        <ComponentFaq qa={timeRangeFaq} />
        <DocsFooter />
      </div>
    </div>
  );
};

export default TimeRangePickerDocs;
