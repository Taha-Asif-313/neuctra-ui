"use client";

import React, { useState } from "react";
import ComponentDocPage from "../components/ComponentDocPage";
import { DatePicker, Calendar } from "@neuctra/ui";

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

const DatePickerDocs = () => (
  <ComponentDocPage
    name="DatePicker & Calendar"
    title="DatePicker & Calendar — React Date Selection | Neuctra UI"
    description="Dependency-free React date picker with an inline calendar: min/max ranges, disabled dates, localized month grid, clearable trigger and popover behavior."
    keywords="react date picker, calendar component react, date input ui, tailwind datepicker, month calendar react, neuctra ui date picker"
    importCode={`import { DatePicker, Calendar } from "@neuctra/ui";`}
    intro="A dependency-free date picker: an Input-style trigger opening a popover Calendar. The Calendar is also exported standalone for inline use."
    examples={[
      {
        title: "DatePicker — Basic Usage",
        code: `const [date, setDate] = useState(null);

<DatePicker
  label="Due date"
  value={date}
  onChange={setDate}
  clearable
/>`,
        preview: <ControlledDemo />,
      },
      {
        title: "Ranges & Disabled Dates",
        description: "Constrain with minDate/maxDate or an isDateDisabled callback (e.g. weekends).",
        code: `<DatePicker
  label="Delivery date"
  calendarProps={{
    minDate: new Date(),
    isDateDisabled: (d) => d.getDay() === 0 || d.getDay() === 6,
  }}
  helperText="Weekdays only, starting today"
/>`,
        preview: (
          <div className="w-full max-w-60">
            <DatePicker
              label="Delivery date"
              calendarProps={{
                minDate: new Date(),
                isDateDisabled: (d) => d.getDay() === 0 || d.getDay() === 6,
              }}
              helperText="Weekdays only, starting today"
            />
          </div>
        ),
      },
      {
        title: "Inline Calendar",
        description: "Use Calendar directly when the grid should always be visible.",
        code: `<Calendar
  defaultValue={new Date()}
  weekStartsOn={1}
  onChange={(d) => console.log(d)}
/>`,
        preview: (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-3">
            <Calendar defaultValue={new Date()} weekStartsOn={1} />
          </div>
        ),
      },
    ]}
    propsTable={[
      { prop: "value / defaultValue", type: "Date | null", default: "null", description: "Controlled / uncontrolled selection (both components)" },
      { prop: "onChange", type: "(date) => void", default: "—", description: "DatePicker: Date | null · Calendar: Date" },
      { prop: "placeholder", type: "string", default: '"Pick a date"', description: "Trigger text while empty" },
      { prop: "formatDate", type: "(date: Date) => string", default: "toLocaleDateString", description: "Display formatting" },
      { prop: "clearable", type: "boolean", default: "false", description: "Inline clear button while a date is set" },
      { prop: "calendarProps", type: "CalendarProps", default: "—", description: "minDate, maxDate, isDateDisabled, weekStartsOn, locale…" },
      { prop: "label / error / helperText", type: "string", default: "—", description: "Standard field furniture" },
      { prop: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Trigger height" },
      { prop: "Calendar.weekStartsOn", type: "0 | 1", default: "1", description: "Sunday- or Monday-first weeks" },
      { prop: "Calendar.locale", type: "string", default: "browser", description: "Locale for month/weekday names" },
    ]}
    a11y={[
      'The trigger exposes aria-haspopup="dialog" / aria-expanded; the panel is a labelled dialog closed by Escape or outside click.',
      "Every day button has a full-date aria-label; today is marked aria-current and the selection aria-pressed.",
      "The month grid always renders six rows, so the popover height never jumps while navigating.",
    ]}
  />
);

export default DatePickerDocs;
