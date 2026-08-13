"use client";

import React, { useState } from "react";
import ComponentDocPage from "../components/ComponentDocPage";
import { Toggle, ToggleGroup } from "@neuctra/ui";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, LayoutGrid } from "lucide-react";

const GroupDemo = () => {
  const [align, setAlign] = useState("left");
  return (
    <ToggleGroup
      value={align}
      onChange={setAlign}
      options={[
        { value: "left", icon: <AlignLeft size={16} />, ariaLabel: "Align left" },
        { value: "center", icon: <AlignCenter size={16} />, ariaLabel: "Align center" },
        { value: "right", icon: <AlignRight size={16} />, ariaLabel: "Align right" },
      ]}
    />
  );
};

const ToggleDocs = () => (
  <ComponentDocPage
    name="Toggle & ToggleGroup"
    title="Toggle & ToggleGroup — React Segmented Controls | Neuctra UI"
    description="React toggle button and segmented toggle group with single and multiple selection, icons, sizes and aria-pressed semantics — built with Tailwind CSS."
    keywords="react toggle button, segmented control react, toggle group ui, toolbar buttons react, view switcher component, neuctra ui toggle"
    importCode={`import { Toggle, ToggleGroup } from "@neuctra/ui";`}
    examples={[
      {
        title: "Toggle — Basic Usage",
        description: "A two-state button. Controlled via pressed/onPressedChange or uncontrolled with defaultPressed.",
        code: `<Toggle defaultPressed><Bold size={16} /> Bold</Toggle>
<Toggle variant="outline"><Italic size={16} /> Italic</Toggle>
<Toggle size="sm"><Underline size={16} /></Toggle>`,
        preview: (
          <>
            <Toggle defaultPressed><Bold size={16} /> Bold</Toggle>
            <Toggle variant="outline"><Italic size={16} /> Italic</Toggle>
            <Toggle size="sm" aria-label="Underline"><Underline size={16} /></Toggle>
          </>
        ),
      },
      {
        title: "ToggleGroup — Single Selection",
        description: "A segmented control: exactly one value at a time (clicking the active one clears it).",
        code: `const [align, setAlign] = useState("left");

<ToggleGroup
  value={align}
  onChange={setAlign}
  options={[
    { value: "left", icon: <AlignLeft size={16} />, ariaLabel: "Align left" },
    { value: "center", icon: <AlignCenter size={16} />, ariaLabel: "Align center" },
    { value: "right", icon: <AlignRight size={16} />, ariaLabel: "Align right" },
  ]}
/>`,
        preview: <GroupDemo />,
      },
      {
        title: "ToggleGroup — Multiple & Full Width",
        code: `<ToggleGroup
  type="multiple"
  defaultValue={["list"]}
  fullWidth
  options={[
    { value: "list", label: "List", icon: <List size={16} /> },
    { value: "grid", label: "Grid", icon: <LayoutGrid size={16} /> },
  ]}
/>`,
        preview: (
          <div className="w-full max-w-xs">
            <ToggleGroup
              type="multiple"
              defaultValue={["list"]}
              fullWidth
              options={[
                { value: "list", label: "List", icon: <List size={16} /> },
                { value: "grid", label: "Grid", icon: <LayoutGrid size={16} /> },
              ]}
            />
          </div>
        ),
      },
    ]}
    propsTable={[
      { prop: "Toggle.pressed / defaultPressed", type: "boolean", default: "false", description: "Controlled / uncontrolled state" },
      { prop: "Toggle.onPressedChange", type: "(pressed) => void", default: "—", description: "Fired with the next state" },
      { prop: "Toggle.variant", type: '"default" | "outline"', default: '"default"', description: "Borderless or bordered" },
      { prop: "ToggleGroup.options", type: "ToggleGroupOption[]", default: "—", description: "{ value, label?, icon?, disabled?, ariaLabel? }" },
      { prop: "ToggleGroup.type", type: '"single" | "multiple"', default: '"single"', description: "Selection model" },
      { prop: "ToggleGroup.value / defaultValue", type: "string | string[]", default: "—", description: "Controlled / uncontrolled selection" },
      { prop: "ToggleGroup.onChange", type: "(value) => void", default: "—", description: "String (single) or string[] (multiple)" },
      { prop: "ToggleGroup.fullWidth", type: "boolean", default: "false", description: "Stretch options evenly" },
      { prop: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Both components" },
    ]}
    a11y={[
      "Every option is a real button with aria-pressed reflecting its state.",
      "Icon-only options should set ariaLabel; focus rings are inset so the segmented border stays clean.",
    ]}
  />
);

export default ToggleDocs;
