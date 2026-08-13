"use client";

import React, { useState } from "react";
import ComponentDocPage from "../components/ComponentDocPage";
import { Slider } from "@neuctra/ui";

const ControlledDemo = () => {
  const [value, setValue] = useState(40);
  return (
    <div className="w-full max-w-sm">
      <Slider
        label="Volume"
        value={value}
        onChange={setValue}
        showValue
        formatValue={(v) => `${v}%`}
      />
    </div>
  );
};

const SliderDocs = () => (
  <ComponentDocPage
    name="Slider"
    title="Slider Component — React Range Input | Neuctra UI"
    description="React slider component built on the native range input: labels, live value, custom formatting, tick marks and three sizes with full keyboard support."
    keywords="react slider component, range input react, tailwind slider, volume slider ui, react range slider, neuctra ui slider"
    importCode={`import { Slider } from "@neuctra/ui";`}
    examples={[
      {
        title: "Basic Usage",
        description:
          "Controlled with value + onChange, or uncontrolled with defaultValue.",
        code: `const [value, setValue] = useState(40);

<Slider
  label="Volume"
  value={value}
  onChange={setValue}
  showValue
  formatValue={(v) => \`\${v}%\`}
/>`,
        preview: <ControlledDemo />,
      },
      {
        title: "Steps, Range & Marks",
        code: `<Slider
  label="Price limit"
  defaultValue={250}
  min={0}
  max={1000}
  step={50}
  showValue
  formatValue={(v) => \`$\${v}\`}
  marks={[
    { value: 0, label: "$0" },
    { value: 500, label: "$500" },
    { value: 1000, label: "$1000" },
  ]}
/>`,
        preview: (
          <div className="w-full max-w-sm pb-4">
            <Slider
              label="Price limit"
              defaultValue={250}
              min={0}
              max={1000}
              step={50}
              showValue
              formatValue={(v) => `$${v}`}
              marks={[
                { value: 0, label: "$0" },
                { value: 500, label: "$500" },
                { value: 1000, label: "$1000" },
              ]}
            />
          </div>
        ),
      },
      {
        title: "Sizes & Disabled",
        code: `<Slider size="sm" defaultValue={30} />
<Slider size="lg" defaultValue={70} />
<Slider defaultValue={50} disabled />`,
        preview: (
          <div className="flex w-full max-w-sm flex-col gap-5">
            <Slider size="sm" defaultValue={30} />
            <Slider size="lg" defaultValue={70} />
            <Slider defaultValue={50} disabled />
          </div>
        ),
      },
    ]}
    propsTable={[
      { prop: "value / defaultValue", type: "number", default: "min", description: "Controlled / uncontrolled value" },
      { prop: "onChange", type: "(value: number) => void", default: "—", description: "Fired with the numeric value" },
      { prop: "min / max", type: "number", default: "0 / 100", description: "Range bounds" },
      { prop: "step", type: "number", default: "1", description: "Increment size" },
      { prop: "label", type: "string", default: "—", description: "Label above the track, linked with htmlFor" },
      { prop: "showValue", type: "boolean", default: "false", description: "Show the live value beside the label" },
      { prop: "formatValue", type: "(v: number) => ReactNode", default: "—", description: "Format the displayed value" },
      { prop: "marks", type: "{ value, label? }[]", default: "—", description: "Tick labels under the track" },
      { prop: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Track and thumb scale" },
      { prop: "disabled", type: "boolean", default: "false", description: "Disable interaction" },
    ]}
    a11y={[
      "Built on the native <input type=\"range\">, so arrow keys, Home/End and screen-reader value announcements work out of the box.",
      "The label is associated via htmlFor; a visible focus ring appears on keyboard focus.",
    ]}
  />
);

export default SliderDocs;
