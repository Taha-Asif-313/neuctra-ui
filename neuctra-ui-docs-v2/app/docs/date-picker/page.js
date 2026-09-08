"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import { DatePicker, Calendar } from "@neuctra/ui";
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
const datePickerFaq = buildComponentFaq("DatePicker", {
  sizes: ["sm", "md", "lg"],
});

const ControlledDemo = () => {
  const [date, setDate] = useState(null);
  return (
    <div className="w-full max-w-60">
      <DatePicker
        label="Due date"
        value={date}
        onChange={setDate}
        clearable
        helperText={date ? date.toDateString() : "No date selected"}
      />
    </div>
  );
};

const DatePickerDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            DatePicker & Calendar Component
          </h1>

          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            A dependency-free date picker: an Input-style trigger opening a
            popover Calendar. The Calendar is also exported standalone for
            inline use.
          </p>
        </header>

        {/* Import */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-white">
            Import
          </h2>
          <CodeBlock code={`import { DatePicker, Calendar } from "@neuctra/ui";`} />
        </section>

        {/* Example: DatePicker — Basic Usage */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            DatePicker — Basic Usage
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`const [date, setDate] = useState(null);

<DatePicker
  label="Due date"
  value={date}
  onChange={setDate}
  clearable
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <ControlledDemo />
              </div>
            }
          />
        </section>

        {/* Example: Ranges & Disabled Dates */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Ranges & Disabled Dates
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Constrain with minDate/maxDate or an isDateDisabled callback
            (e.g. weekends).
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<DatePicker
  label="Delivery date"
  calendarProps={{
    minDate: new Date(),
    isDateDisabled: (d) => d.getDay() === 0 || d.getDay() === 6,
  }}
  helperText="Weekdays only, starting today"
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="w-full max-w-60">
                  <DatePicker
                    label="Delivery date"
                    calendarProps={{
                      minDate: new Date(),
                      isDateDisabled: (d) =>
                        d.getDay() === 0 || d.getDay() === 6,
                    }}
                    helperText="Weekdays only, starting today"
                  />
                </div>
              </div>
            }
          />
        </section>

        {/* Example: Inline Calendar */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Inline Calendar
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Use Calendar directly when the grid should always be visible.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<Calendar
  defaultValue={new Date()}
  weekStartsOn={1}
  onChange={(d) => console.log(d)}
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-3">
                  <Calendar defaultValue={new Date()} weekStartsOn={1} />
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
            All available props for the DatePicker & Calendar component.
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
                    value / defaultValue
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    Date | null
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    null
                  </td>
                  <td className="p-3">
                    Controlled / uncontrolled selection (both components)
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    onChange
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    (date) =&gt; void
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    DatePicker: Date | null · Calendar: Date
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    placeholder
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    "Pick a date"
                  </td>
                  <td className="p-3">Trigger text while empty</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    formatDate
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    (date: Date) =&gt; string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    toLocaleDateString
                  </td>
                  <td className="p-3">Display formatting</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    clearable
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    false
                  </td>
                  <td className="p-3">
                    Inline clear button while a date is set
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    calendarProps
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    CalendarProps
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    minDate, maxDate, isDateDisabled, weekStartsOn, locale…
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    label / error / helperText
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Standard field furniture</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    size
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    "sm" | "md" | "lg"
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    "md"
                  </td>
                  <td className="p-3">Trigger height</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    Calendar.weekStartsOn
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    0 | 1
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">1</td>
                  <td className="p-3">Sunday- or Monday-first weeks</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    Calendar.locale
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    browser
                  </td>
                  <td className="p-3">Locale for month/weekday names</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    labelClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles the field label.</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    iconClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Styles the calendar icon in the trigger.
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    textClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles the displayed date text.</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    clearButtonClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles the clear button.</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    clearIconClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Styles the icon inside the clear button.
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    panelClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Styles the popover panel containing the calendar.
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    helperClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Styles the helper/error text below the trigger.
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    Calendar.headerClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Styles the month header row (prev/next buttons and
                    label).
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    Calendar.navButtonClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Styles the previous/next month buttons.
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    Calendar.monthLabelClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Styles the current month/year label.
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    Calendar.weekdaysClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles the weekday header row.</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    Calendar.weekdayClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles each weekday header cell.</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    Calendar.daysClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles the day grid container.</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    Calendar.dayClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles each individual day cell.</td>
                </tr>
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
              Every day button has a full-date aria-label; today is marked
              aria-current and the selection aria-pressed.
            </li>
            <li>
              The month grid always renders six rows, so the popover height
              never jumps while navigating.
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={datePickerFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </div>
  );
};

export default DatePickerDocs;
