"use client";

import React, { useState } from "react";
import ComponentDocPage from "../components/ComponentDocPage";
import { TimePicker } from "@neuctra/ui";

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

const TimePickerDocs = () => (
  <ComponentDocPage
    name="TimePicker"
    title="TimePicker Component — React Time Selection | Neuctra UI"
    description="Dependency-free React time picker: an Input-style trigger opening a scrollable list of time options, configurable step/hour range, clearable trigger and popover behavior, built the same way as DatePicker."
    keywords="react time picker, time input ui, tailwind timepicker, time selection component react, neuctra ui time picker"
    importCode={`import { TimePicker } from "@neuctra/ui";`}
    intro="A dependency-free time picker built the same way as DatePicker: an Input-style trigger opening a popover list of selectable times. Values are plain Date objects, so pairing it with a DatePicker for a full datetime is just two fields writing into the same Date."
    examples={[
      {
        title: "TimePicker — Basic Usage",
        code: `const [time, setTime] = useState(null);

<TimePicker
  label="Meeting time"
  value={time}
  onChange={setTime}
  clearable
/>`,
        preview: <ControlledDemo />,
      },
      {
        title: "Custom Step & Hour Range",
        description: "step controls the minute granularity of the list; minHour/maxHour constrain which hours are offered (e.g. business hours only).",
        code: `<TimePicker
  label="Appointment slot"
  step={15}
  minHour={9}
  maxHour={17}
  helperText="15-minute slots, 9 AM - 5 PM"
/>`,
        preview: (
          <div className="w-full max-w-60">
            <TimePicker
              label="Appointment slot"
              step={15}
              minHour={9}
              maxHour={17}
              helperText="15-minute slots, 9 AM - 5 PM"
            />
          </div>
        ),
      },
      {
        title: "Custom Format",
        description: "formatTime overrides the default locale HH:MM display.",
        code: `<TimePicker
  label="Reminder"
  formatTime={(d) =>
    d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
  }
/>`,
        preview: (
          <div className="w-full max-w-60">
            <TimePicker
              label="Reminder"
              formatTime={(d) =>
                d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
              }
            />
          </div>
        ),
      },
    ]}
    propsTable={[
      { prop: "value / defaultValue", type: "Date | null", default: "null", description: "Controlled / uncontrolled selection" },
      { prop: "onChange", type: "(date: Date | null) => void", default: "—", description: "Fired with a Date carrying the picked hour/minute; preserves the rest of an existing value's date" },
      { prop: "placeholder", type: "string", default: '"Pick a time"', description: "Trigger text while empty" },
      { prop: "formatTime", type: "(date: Date) => string", default: "locale HH:MM", description: "Display formatting for the trigger and option list" },
      { prop: "step", type: "number", default: "30", description: "Minutes between each selectable option" },
      { prop: "minHour / maxHour", type: "number", default: "0 / 23", description: "Restrict the hour range offered in the list" },
      { prop: "clearable", type: "boolean", default: "false", description: "Inline clear button while a time is set" },
      { prop: "label / error / helperText", type: "string", default: "—", description: "Standard field furniture" },
      { prop: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Trigger height" },
      { prop: "disabled", type: "boolean", default: "false", description: "Disables the field" },
      { prop: "id / className / wrapperClassName", type: "string", default: "—", description: "Field id and outer styling hooks" },
      { prop: "labelClassName", type: "string", default: "—", description: "Styles the field label." },
      { prop: "iconClassName", type: "string", default: "—", description: "Styles the clock icon in the trigger." },
      { prop: "textClassName", type: "string", default: "—", description: "Styles the displayed time text." },
      { prop: "clearButtonClassName", type: "string", default: "—", description: "Styles the clear button." },
      { prop: "clearIconClassName", type: "string", default: "—", description: "Styles the icon inside the clear button." },
      { prop: "panelClassName", type: "string", default: "—", description: "Styles the popover panel containing the time list." },
      { prop: "optionClassName", type: "string", default: "—", description: "Styles every time option button." },
      { prop: "activeOptionClassName", type: "string", default: "—", description: "Styles the currently selected time option, in addition to its active styling." },
      { prop: "helperClassName", type: "string", default: "—", description: "Styles the helper/error text below the trigger." },
    ]}
    a11y={[
      'The trigger exposes aria-haspopup="dialog" / aria-expanded; the panel is a labelled dialog closed by Escape or outside click.',
      "Every time option is a real, individually focusable button with aria-selected on the active one, so no custom keyboard handling is needed for Tab/Enter/Space.",
      "The panel scrolls the currently selected (or nearest) option into view when opened, instead of always starting at the top of the list.",
    ]}
  />
);

export default TimePickerDocs;
