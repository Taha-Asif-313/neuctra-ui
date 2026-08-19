"use client";

import React, { useState } from "react";
import ComponentDocPage from "../components/ComponentDocPage";
import { Rating } from "@neuctra/ui";

const ControlledDemo = () => {
  const [value, setValue] = useState(3);
  return (
    <div className="flex items-center gap-3">
      <Rating value={value} onChange={setValue} showValue />
      <span className="text-xs text-gray-400">click a star (again to clear)</span>
    </div>
  );
};

const RatingDocs = () => (
  <ComponentDocPage
    name="Rating"
    title="Rating Component — React Star Rating | Neuctra UI"
    description="React star rating component with keyboard-accessible radio semantics, hover preview, clearable selection and fractional read-only display (e.g. 4.3)."
    keywords="react rating component, star rating react, review stars ui, tailwind rating, fractional star rating, neuctra ui rating"
    importCode={`import { Rating } from "@neuctra/ui";`}
    examples={[
      {
        title: "Basic Usage",
        description: "Interactive mode is a radiogroup of stars with hover preview.",
        code: `const [value, setValue] = useState(3);

<Rating value={value} onChange={setValue} showValue />`,
        preview: <ControlledDemo />,
      },
      {
        title: "Read-Only with Fractions",
        description: "Read-only mode supports fractional values via a clipped overlay.",
        code: `<Rating value={4.3} readOnly showValue />
<Rating value={2.5} readOnly max={5} size="sm" />`,
        preview: (
          <div className="flex flex-col gap-2">
            <Rating value={4.3} readOnly showValue />
            <Rating value={2.5} readOnly max={5} size="sm" />
          </div>
        ),
      },
      {
        title: "Sizes & Custom Max",
        code: `<Rating defaultValue={2} size="sm" />
<Rating defaultValue={3} size="lg" />
<Rating defaultValue={6} max={10} />`,
        preview: (
          <div className="flex flex-col gap-2">
            <Rating defaultValue={2} size="sm" />
            <Rating defaultValue={3} size="lg" />
            <Rating defaultValue={6} max={10} />
          </div>
        ),
      },
    ]}
    propsTable={[
      { prop: "value / defaultValue", type: "number", default: "0", description: "Controlled / uncontrolled rating" },
      { prop: "onChange", type: "(value: number) => void", default: "—", description: "Fired with the selected star (or 0 on clear)" },
      { prop: "max", type: "number", default: "5", description: "Number of stars" },
      { prop: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Star size" },
      { prop: "readOnly", type: "boolean", default: "false", description: "Display mode; supports fractional values" },
      { prop: "allowClear", type: "boolean", default: "true", description: "Clicking the current value resets to 0" },
      { prop: "disabled", type: "boolean", default: "false", description: "Dim and lock the control" },
      { prop: "label", type: "string", default: '"Rating"', description: "Accessible group label" },
      { prop: "showValue", type: "boolean", default: "false", description: "Numeric value next to the stars" },
      { prop: "starClassName", type: "string", default: "—", description: "Styles every star icon, in addition to size/color/state classes." },
      { prop: "emptyStarClassName", type: "string", default: "—", description: "Styles the unfilled star color/class." },
      { prop: "starWrapperClassName", type: "string", default: "—", description: "Styles the clickable wrapper around each star in interactive mode." },
      { prop: "valueClassName", type: "string", default: "—", description: "Styles the numeric value shown when showValue is set." },
    ]}
    a11y={[
      "Interactive stars are real radio inputs (sr-only) inside a radiogroup — keyboard and screen-reader selection work natively.",
      'Read-only mode renders role="img" with a text alternative like "Rating: 4.3 out of 5".',
      "A focus ring is shown on the focused star via peer-focus-visible.",
    ]}
  />
);

export default RatingDocs;
