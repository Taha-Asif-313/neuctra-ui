"use client";

import React from "react";
import ComponentDocPage from "../components/ComponentDocPage";
import { Progress } from "@neuctra/ui";

const ProgressDocs = () => (
  <ComponentDocPage
    name="Progress"
    title="Progress Component — React Progress Bar & Ring | Neuctra UI"
    description="React progress component with linear and circular variants, determinate and indeterminate modes, value labels and full ARIA progressbar semantics."
    keywords="react progress bar, circular progress react, progress ring component, indeterminate progress, tailwind progress bar, neuctra ui progress"
    importCode={`import { Progress } from "@neuctra/ui";`}
    examples={[
      {
        title: "Linear",
        code: `<Progress value={30} />
<Progress value={65} showValue />
<Progress value={65} size="lg" colorClassName="bg-success" />`,
        preview: (
          <div className="flex w-full max-w-sm flex-col gap-4">
            <Progress value={30} />
            <Progress value={65} showValue />
            <Progress value={65} size="lg" colorClassName="bg-success" />
          </div>
        ),
      },
      {
        title: "Circular",
        code: `<Progress variant="circular" value={25} size="sm" />
<Progress variant="circular" value={60} showValue />
<Progress variant="circular" value={90} size="lg" showValue />`,
        preview: (
          <>
            <Progress variant="circular" value={25} size="sm" />
            <Progress variant="circular" value={60} showValue />
            <Progress variant="circular" value={90} size="lg" showValue />
          </>
        ),
      },
      {
        title: "Indeterminate",
        description: "Omit value while the duration is unknown.",
        code: `<Progress label="Loading data" />
<Progress variant="circular" label="Loading" />`,
        preview: (
          <div className="flex w-full max-w-sm items-center gap-6">
            <Progress label="Loading data" />
            <Progress variant="circular" label="Loading" />
          </div>
        ),
      },
    ]}
    propsTable={[
      { prop: "value", type: "number", default: "—", description: "Current value; omit for indeterminate" },
      { prop: "max", type: "number", default: "100", description: "Maximum value" },
      { prop: "variant", type: '"linear" | "circular"', default: '"linear"', description: "Bar or ring" },
      { prop: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Track thickness / ring diameter" },
      { prop: "showValue", type: "boolean", default: "false", description: "Show the percentage" },
      { prop: "label", type: "string", default: "—", description: "Accessible name for the progressbar" },
      { prop: "colorClassName", type: "string", default: "bg-primary / stroke-primary", description: "Fill color class" },
    ]}
    a11y={[
      'Renders role="progressbar" with aria-valuemin / aria-valuemax / aria-valuenow.',
      "aria-valuenow is omitted in indeterminate mode, as the ARIA spec requires.",
      "Pass label so the bar has an accessible name.",
    ]}
  />
);

export default ProgressDocs;
