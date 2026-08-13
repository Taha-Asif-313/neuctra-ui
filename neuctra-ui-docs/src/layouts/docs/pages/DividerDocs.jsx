"use client";

import React from "react";
import ComponentDocPage from "../components/ComponentDocPage";
import { Divider } from "@neuctra/ui";

const DividerDocs = () => (
  <ComponentDocPage
    name="Divider"
    title="Divider Component — React Separator | Neuctra UI"
    description="React divider component for separating content. Horizontal and vertical orientation, optional centered label, dashed style and spacing scales — built with Tailwind CSS."
    keywords="react divider component, separator react, horizontal rule react, tailwind divider, neuctra ui divider"
    importCode={`import { Divider } from "@neuctra/ui";`}
    examples={[
      {
        title: "Basic Usage",
        code: `<p>Above</p>
<Divider />
<p>Below</p>`,
        preview: (
          <div className="w-full max-w-sm text-sm">
            <p>Above</p>
            <Divider />
            <p>Below</p>
          </div>
        ),
      },
      {
        title: "With Label",
        description: "A centered label between two hairlines — great for auth forms.",
        code: `<Divider label="OR" />
<Divider label="Continue with" dashed />`,
        preview: (
          <div className="w-full max-w-sm">
            <Divider label="OR" />
            <Divider label="Continue with" dashed />
          </div>
        ),
      },
      {
        title: "Vertical",
        description: "Use inside a flex row; it stretches to the row height.",
        code: `<div className="flex items-center h-8">
  <span>Left</span>
  <Divider orientation="vertical" />
  <span>Right</span>
</div>`,
        preview: (
          <div className="flex h-8 items-center text-sm">
            <span>Left</span>
            <Divider orientation="vertical" />
            <span>Right</span>
          </div>
        ),
      },
    ]}
    propsTable={[
      { prop: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Direction of the separator" },
      { prop: "label", type: "ReactNode", default: "—", description: "Centered label (horizontal only)" },
      { prop: "dashed", type: "boolean", default: "false", description: "Dashed line style" },
      { prop: "spacing", type: '"none" | "sm" | "md" | "lg"', default: '"md"', description: "Outer margin along the axis" },
    ]}
    a11y={[
      'Renders role="separator" with the correct aria-orientation.',
      "Decorative hairlines around the label are aria-hidden.",
    ]}
  />
);

export default DividerDocs;
