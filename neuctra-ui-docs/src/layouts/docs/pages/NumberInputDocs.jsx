"use client";

import React, { useState } from "react";
import ComponentDocPage from "../components/ComponentDocPage";
import { NumberInput } from "@neuctra/ui";

const ControlledDemo = () => {
  const [qty, setQty] = useState(2);
  return (
    <div className="w-full max-w-45">
      <NumberInput label="Quantity" value={qty} onChange={setQty} min={1} max={10} />
    </div>
  );
};

const NumberInputDocs = () => (
  <ComponentDocPage
    name="NumberInput"
    title="NumberInput Component — React Numeric Stepper | Neuctra UI"
    description="React number input with increment/decrement steppers, min/max clamping, arrow-key support, decimal input and spinbutton semantics — built with Tailwind CSS."
    keywords="react number input, numeric stepper component, quantity input react, tailwind number input, spinbutton react, neuctra ui number input"
    importCode={`import { NumberInput } from "@neuctra/ui";`}
    examples={[
      {
        title: "Basic Usage",
        description:
          "onChange receives the parsed number, or null while the field is empty.",
        code: `const [qty, setQty] = useState(2);

<NumberInput label="Quantity" value={qty} onChange={setQty} min={1} max={10} />`,
        preview: <ControlledDemo />,
      },
      {
        title: "Step & Decimals",
        code: `<NumberInput label="Price" defaultValue={9.99} step={0.5} min={0} />
<NumberInput label="Team size" defaultValue={5} step={5} min={0} max={100}
  helperText="Increments of 5" />`,
        preview: (
          <div className="flex w-full max-w-md flex-wrap gap-4">
            <div className="w-40"><NumberInput label="Price" defaultValue={9.99} step={0.5} min={0} /></div>
            <div className="w-44"><NumberInput label="Team size" defaultValue={5} step={5} min={0} max={100} helperText="Increments of 5" /></div>
          </div>
        ),
      },
      {
        title: "Sizes & Error",
        code: `<NumberInput size="sm" defaultValue={1} />
<NumberInput size="lg" defaultValue={1} />
<NumberInput defaultValue={99} error="Value exceeds your plan limit" />`,
        preview: (
          <div className="flex w-full max-w-md flex-col gap-4">
            <div className="w-36"><NumberInput size="sm" defaultValue={1} /></div>
            <div className="w-44"><NumberInput size="lg" defaultValue={1} /></div>
            <div className="w-56"><NumberInput defaultValue={99} error="Value exceeds your plan limit" /></div>
          </div>
        ),
      },
    ]}
    propsTable={[
      { prop: "value / defaultValue", type: "number | null / number", default: "—", description: "Controlled / uncontrolled value" },
      { prop: "onChange", type: "(value: number | null) => void", default: "—", description: "Parsed number, null when empty" },
      { prop: "min / max", type: "number", default: "—", description: "Clamped on blur and by the steppers" },
      { prop: "step", type: "number", default: "1", description: "Stepper and arrow-key increment" },
      { prop: "label", type: "string", default: "—", description: "Label above the field" },
      { prop: "error", type: "string", default: "—", description: "Error message; paints the border and announces via role=alert" },
      { prop: "helperText", type: "string", default: "—", description: "Muted helper line" },
      { prop: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Field height and button scale" },
      { prop: "disabled", type: "boolean", default: "false", description: "Disable the field and steppers" },
    ]}
    a11y={[
      'The input exposes role="spinbutton" with aria-valuenow / min / max.',
      "ArrowUp / ArrowDown nudge the value by step; steppers are excluded from the tab order (tabIndex -1) so keyboard users aren't forced through three stops.",
      "Errors link to the field with aria-describedby and aria-invalid.",
    ]}
  />
);

export default NumberInputDocs;
