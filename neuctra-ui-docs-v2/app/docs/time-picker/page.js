"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import { TimePicker } from "@neuctra/ui";
import CodeBlock from "@/components/CodeBlock";
import { Accessibility } from "lucide-react";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

// Recomputed locally rather than imported from ./layout.js: layout.js is a
// Server Component module and this page.js is a Client Component — pulling
// a value across that boundary via import would drag the whole server
// module (including its default export) into the client bundle. Both files
// call the same pure function with the same args, so they stay in sync.
const timePickerFaq = buildComponentFaq("TimePicker", {
  sizes: ["sm", "md", "lg"],
});

const ControlledDemo = () => {
  const [time, setTime] = useState(null);
  return (
    <div className="w-full max-w-60">
      <TimePicker
        label="Meeting time"
        value={time}
        onChange={setTime}
        clearable
        helperText={time ? time.toLocaleTimeString() : "No time selected"}
      />
    </div>
  );
};

const TimePickerDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            TimePicker Component
          </h1>

          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            A dependency-free time picker built the same way as DatePicker:
            an Input-style trigger opening a popover list of selectable
            times. Values are plain Date objects, so pairing it with a
            DatePicker for a full datetime is just two fields writing into
            the same Date.
          </p>
        </header>

        {/* Import */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-white">
            Import
          </h2>
          <CodeBlock code={`import { TimePicker } from "@neuctra/ui";`} />
        </section>

        {/* Example: Basic Usage */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Basic Usage
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`const [time, setTime] = useState(null);

<TimePicker
  label="Meeting time"
  value={time}
  onChange={setTime}
  clearable
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <ControlledDemo />
              </div>
            }
          />
        </section>

        {/* Example: Custom Step & Hour Range */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Custom Step & Hour Range
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            step controls the minute granularity of the list; minHour/maxHour
            constrain which hours are offered (e.g. business hours only).
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<TimePicker
  label="Appointment slot"
  step={15}
  minHour={9}
  maxHour={17}
  helperText="15-minute slots, 9 AM - 5 PM"
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="w-full max-w-60">
                  <TimePicker
                    label="Appointment slot"
                    step={15}
                    minHour={9}
                    maxHour={17}
                    helperText="15-minute slots, 9 AM - 5 PM"
                  />
                </div>
              </div>
            }
          />
        </section>

        {/* Example: Custom Format */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Custom Format
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            formatTime overrides the default locale HH:MM display.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<TimePicker
  label="Reminder"
  formatTime={(d) =>
    d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
  }
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="w-full max-w-60">
                  <TimePicker
                    label="Reminder"
                    formatTime={(d) =>
                      d.toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                      })
                    }
                  />
                </div>
              </div>
            }
          />
        </section>

        {/* Props Table */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the TimePicker component.
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
                {[
                  ["value / defaultValue", "Date | null", "null", "Controlled / uncontrolled selection"],
                  ["onChange", "(date: Date | null) => void", "—", "Fired with a Date carrying the picked hour/minute; preserves the rest of an existing value's date"],
                  ["placeholder", "string", '"Pick a time"', "Trigger text while empty"],
                  ["formatTime", "(date: Date) => string", "locale HH:MM", "Display formatting for the trigger and option list"],
                  ["step", "number", "30", "Minutes between each selectable option"],
                  ["minHour / maxHour", "number", "0 / 23", "Restrict the hour range offered in the list"],
                  ["clearable", "boolean", "false", "Inline clear button while a time is set"],
                  ["label / error / helperText", "string", "—", "Standard field furniture"],
                  ["size", '"sm" | "md" | "lg"', '"md"', "Trigger height"],
                  ["disabled", "boolean", "false", "Disables the field"],
                  ["id / className / wrapperClassName", "string", "—", "Field id and outer styling hooks"],
                  ["labelClassName", "string", "—", "Styles the field label"],
                  ["iconClassName", "string", "—", "Styles the clock icon in the trigger"],
                  ["textClassName", "string", "—", "Styles the displayed time text"],
                  ["clearButtonClassName", "string", "—", "Styles the clear button"],
                  ["clearIconClassName", "string", "—", "Styles the icon inside the clear button"],
                  ["panelClassName", "string", "—", "Styles the popover panel containing the time list"],
                  ["optionClassName", "string", "—", "Styles every time option button"],
                  ["activeOptionClassName", "string", "—", "Styles the currently selected time option, in addition to its active styling"],
                  ["helperClassName", "string", "—", "Styles the helper/error text below the trigger"],
                ].map(([prop, type, def, desc]) => (
                  <tr key={prop}>
                    <td className="p-3 font-medium text-primary whitespace-nowrap">
                      {prop}
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
        <section>
          <h2 className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white">
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>
              The trigger exposes aria-haspopup="dialog" / aria-expanded; the
              panel is a labelled dialog closed by Escape or outside click.
            </li>
            <li>
              Every time option is a real, individually focusable button
              with aria-selected on the active one, so no custom keyboard
              handling is needed for Tab/Enter/Space.
            </li>
            <li>
              The panel scrolls the currently selected (or nearest) option
              into view when opened, instead of always starting at the top
              of the list.
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={timePickerFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </div>
  );
};

export default TimePickerDocs;
