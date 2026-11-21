"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility } from "lucide-react";
import {
  TimePicker,
  Select,
  Button,
  Card,
  CardHeader,
  CardBody,
} from "@neuctra/ui";

// Recomputed locally rather than imported from ./layout.js: layout.js is a
// Server Component module and this page.js is a Client Component. Both files
// call the same pure function with the same args, so they stay in sync.
const timePickerFaq = buildComponentFaq("TimePicker", {
  sizes: ["xs", "sm", "md", "lg"],
});

function ControlledDemo() {
  const [time, setTime] = useState(null);
  return (
    <div className="w-full max-w-xs">
      <TimePicker
        label="Meeting time"
        value={time}
        onChange={setTime}
        clearable
        helperText={
          time
            ? `Starts at ${time.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`
            : "No time selected"
        }
      />
    </div>
  );
}

const booked = ["10:00", "10:30", "14:00"];

function BookCallDemo() {
  const [time, setTime] = useState(null);
  const [length, setLength] = useState("30");
  return (
    <Card className="w-full max-w-md">
      <CardHeader
        title="Book a call"
        description="Pick a free slot. Times already booked are unavailable."
      />
      <CardBody className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TimePicker
            label="Start time"
            value={time}
            onChange={setTime}
            hour12
            minTime="09:00"
            maxTime="17:00"
            isTimeDisabled={(t) =>
              booked.includes(
                `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`,
              )
            }
            required
          />
          <Select
            label="Length"
            value={length}
            onValueChange={setLength}
            options={[
              { label: "15 minutes", value: "15" },
              { label: "30 minutes", value: "30" },
              { label: "1 hour", value: "60" },
            ]}
          />
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          <Button variant="outline" size="sm">
            Cancel
          </Button>
          <Button size="sm" disabled={!time}>
            Confirm booking
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

const timePickerProps = [
  ["value", "Date | null", "-", "Controlled selected time; null means no selection."],
  ["defaultValue", "Date | null", "null", "Initial selected time when uncontrolled."],
  ["onChange", "(date: Date | null) => void", "-", "Fired with a Date carrying the picked hour and minute. An existing value keeps its date; only hours and minutes change."],
  ["placeholder", "string", '"Pick a time"', "Trigger text while no time is selected."],
  ["formatTime", "(date: Date) => string", "-", "Formats the trigger and every option. Defaults to the locale time, or to hour12 when set."],
  ["hour12", "boolean", "-", 'true forces a 12-hour display ("9:30 AM"), false a 24-hour one ("09:30"). Unset follows the locale.'],
  ["step", "number", "30", "Minutes between each option in the list."],
  ["minHour", "number", "0", "Earliest hour offered, 0-23."],
  ["maxHour", "number", "23", "Latest hour offered, 0-23 (inclusive)."],
  ["minTime", "string", "-", 'Earliest time offered in "HH:mm" form (inclusive).'],
  ["maxTime", "string", "-", 'Latest time offered in "HH:mm" form (inclusive).'],
  ["isTimeDisabled", "(time: Date) => boolean", "-", "Return true to show an option disabled, e.g. booked slots or times before a start time."],
  ["label", "string", "-", "Label rendered above the trigger."],
  ["ariaLabel", "string", "-", "Accessible name for the trigger when there is no visible label."],
  ["error", "string | boolean", "-", "Error state. A string is shown as the message; true only applies error styling."],
  ["helperText", "string", "-", "Helper text shown below the trigger when there is no error message."],
  ["required", "boolean", "false", "Shows a * next to the label and sets aria-required."],
  ["name", "string", "-", 'Form field name. A hidden input submits the time as "HH:mm".'],
  ["size", '"xs" | "sm" | "md" | "lg"', '"md"', "Trigger size. Matches the Select and Input size scale."],
  ["disabled", "boolean", "false", "Disables the trigger."],
  ["clearable", "boolean", "false", "Shows an inline clear button while a time is selected."],
  ["id", "string", "-", "Id applied to the trigger button."],
  ["className", "string", "-", "Additional classes for the trigger button."],
  ["wrapperClassName", "string", "-", "Additional classes for the outermost wrapper."],
  ["labelClassName", "string", "-", "Additional classes for the label."],
  ["iconClassName", "string", "-", "Additional classes for the clock icon in the trigger."],
  ["textClassName", "string", "-", "Additional classes for the displayed time text."],
  ["clearButtonClassName", "string", "-", "Additional classes for the clear button."],
  ["clearIconClassName", "string", "-", "Additional classes for the icon inside the clear button."],
  ["panelClassName", "string", "-", "Additional classes for the popover panel containing the time list."],
  ["optionClassName", "string", "-", "Additional classes for every time option."],
  ["activeOptionClassName", "string", "-", "Additional classes for the selected option, on top of its active styling."],
  ["helperClassName", "string", "-", "Additional classes for the helper/error text."],
];

const TimePickerDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            TimePicker Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            A field-style trigger that opens a scrollable, keyboard friendly
            list of times. Values are plain Date objects, so pairing it with a
            DatePicker is just two fields writing into the same Date. Steps,
            bounds, 12-hour display and per-time disabling are built in, and
            the same TimePicker powers TimeRangePicker and DateTimePicker.
          </p>
        </header>

        <section aria-labelledby="TimePicker-import">
          <h2 id="TimePicker-import" className="text-xl sm:text-2xl font-semibold mb-3 text-white">
            Import
          </h2>
          <CodeBlock code={`import { TimePicker } from "@neuctra/ui";`} />
        </section>

        <section aria-labelledby="TimePicker-example-0">
          <h2 id="TimePicker-example-0" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Own the value with value and onChange. clearable adds a button that
            resets it to null.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [time, setTime] = useState(null);

<TimePicker
  label="Meeting time"
  value={time}
  onChange={setTime}
  clearable
  helperText={
    time
      ? \`Starts at \${time.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}\`
      : "No time selected"
  }
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <ControlledDemo />
              </div>
            }
          />
        </section>

        <section aria-labelledby="TimePicker-example-1">
          <h2 id="TimePicker-example-1" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Sizes
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            The size scale matches Select and Input, so mixed fields in one
            row share the same height.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<TimePicker size="xs" placeholder="Extra small" />
<TimePicker size="sm" placeholder="Small" />
<TimePicker size="md" placeholder="Medium" />
<TimePicker size="lg" placeholder="Large" />`}
            previewContent={
              <div className="grid w-full max-w-xs gap-3 py-4">
                <TimePicker size="xs" placeholder="Extra small" />
                <TimePicker size="sm" placeholder="Small" />
                <TimePicker size="md" placeholder="Medium" />
                <TimePicker size="lg" placeholder="Large" />
              </div>
            }
          />
        </section>

        <section aria-labelledby="TimePicker-example-2">
          <h2 id="TimePicker-example-2" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Steps, Bounds and 12-Hour Clock
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            step sets the gap between options. minTime and maxTime (or
            minHour and maxHour) limit the list, and hour12 switches the
            display to AM and PM.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<TimePicker
  label="Appointment slot"
  step={15}
  minTime="09:00"
  maxTime="17:30"
  hour12
  helperText="15-minute slots, 9:00 AM to 5:30 PM"
/>
<TimePicker label="Shift start" step={60} hour12={false} />`}
            previewContent={
              <div className="grid w-full max-w-lg grid-cols-1 gap-4 py-4 sm:grid-cols-2">
                <TimePicker
                  label="Appointment slot"
                  step={15}
                  minTime="09:00"
                  maxTime="17:30"
                  hour12
                  helperText="15-minute slots, 9:00 AM to 5:30 PM"
                />
                <TimePicker label="Shift start" step={60} hour12={false} />
              </div>
            }
          />
        </section>

        <section aria-labelledby="TimePicker-example-3">
          <h2 id="TimePicker-example-3" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            States
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Required and error states use the same tokens as every other
            Neuctra field. Disabled fields keep their value visible.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<TimePicker label="Reminder" required error="Pick a reminder time." />
<TimePicker label="Daily backup" disabled defaultValue={new Date(2025, 0, 1, 2, 0)} hour12={false} />`}
            previewContent={
              <div className="grid w-full max-w-lg grid-cols-1 gap-4 py-4 sm:grid-cols-2">
                <TimePicker label="Reminder" required error="Pick a reminder time." />
                <TimePicker
                  label="Daily backup"
                  disabled
                  defaultValue={new Date(2025, 0, 1, 2, 0)}
                  hour12={false}
                />
              </div>
            }
          />
        </section>

        <section aria-labelledby="TimePicker-example-4">
          <h2 id="TimePicker-example-4" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Disabled Times in a Booking Form
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            isTimeDisabled keeps booked slots visible but unselectable. The
            field sits next to a Select with the same label and height.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const booked = ["10:00", "10:30", "14:00"];
const [time, setTime] = useState(null);
const [length, setLength] = useState("30");

<Card className="w-full max-w-md">
  <CardHeader
    title="Book a call"
    description="Pick a free slot. Times already booked are unavailable."
  />
  <CardBody className="space-y-4">
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <TimePicker
        label="Start time"
        value={time}
        onChange={setTime}
        hour12
        minTime="09:00"
        maxTime="17:00"
        isTimeDisabled={(t) =>
          booked.includes(
            \`\${String(t.getHours()).padStart(2, "0")}:\${String(t.getMinutes()).padStart(2, "0")}\`,
          )
        }
        required
      />
      <Select
        label="Length"
        value={length}
        onValueChange={setLength}
        options={[
          { label: "15 minutes", value: "15" },
          { label: "30 minutes", value: "30" },
          { label: "1 hour", value: "60" },
        ]}
      />
    </div>
    <div className="flex flex-wrap justify-end gap-2">
      <Button variant="outline" size="sm">
        Cancel
      </Button>
      <Button size="sm" disabled={!time}>
        Confirm booking
      </Button>
    </div>
  </CardBody>
</Card>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <BookCallDemo />
              </div>
            }
          />
        </section>

        <section aria-labelledby="TimePicker-props">
          <h2 id="TimePicker-props" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the TimePicker component.
          </p>
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
                {timePickerProps.map(([prop, type, def, desc]) => (
                  <tr key={prop}>
                    <td className="p-3 font-medium text-primary whitespace-nowrap">{prop}</td>
                    <td className="p-3 font-mono text-xs text-gray-300">{type}</td>
                    <td className="p-3 text-gray-400 whitespace-nowrap">{def}</td>
                    <td className="p-3">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="TimePicker-a11y">
          <h2 id="TimePicker-a11y" className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white">
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>
              The trigger is a button with aria-haspopup="listbox",
              aria-expanded and aria-controls, linked to its label (or
              ariaLabel) and helper or error text.
            </li>
            <li>
              Opening moves focus to the selected time (or the first available
              one) and scrolls it into view. Arrow Up, Arrow Down, Home and End
              move between times; Enter or Space picks one.
            </li>
            <li>
              Options use role="option" with aria-selected; times blocked by
              isTimeDisabled are skipped by the keyboard and marked
              aria-disabled.
            </li>
            <li>
              Escape or an outside click closes the list and returns focus to
              the trigger. Escape is handled before outer overlays, so a
              TimePicker inside a popover or modal closes only itself.
            </li>
            <li>
              Required sets aria-required, and an error sets aria-invalid with
              the message announced via role="alert".
            </li>
          </ul>
        </section>

        <ComponentFaq qa={timePickerFaq} />
        <DocsFooter />
      </div>
    </div>
  );
};

export default TimePickerDocs;
