"use client";

import React from "react";
import ComponentDocPage from "../components/ComponentDocPage";
import { Skeleton } from "@neuctra/ui";

const SkeletonDocs = () => (
  <ComponentDocPage
    name="Skeleton"
    title="Skeleton Component — React Loading Placeholders | Neuctra UI"
    description="React skeleton loading component with text, circular and rectangular variants, multi-line paragraphs and reduced-motion support — built with Tailwind CSS."
    keywords="react skeleton loader, loading placeholder react, shimmer ui, skeleton screen component, tailwind skeleton, neuctra ui skeleton"
    importCode={`import { Skeleton } from "@neuctra/ui";`}
    examples={[
      {
        title: "Basic Usage",
        description: "Three shapes cover most layouts: text, circular and rectangular.",
        code: `<Skeleton width={220} />
<Skeleton variant="circular" width={48} height={48} />
<Skeleton variant="rectangular" width={220} height={96} />`,
        preview: (
          <div className="flex flex-col gap-4">
            <Skeleton width={220} />
            <Skeleton variant="circular" width={48} height={48} />
            <Skeleton variant="rectangular" width={220} height={96} />
          </div>
        ),
      },
      {
        title: "Paragraph Placeholder",
        description: "lines renders a stacked paragraph with a shorter final line.",
        code: `<Skeleton lines={3} width={280} />`,
        preview: <Skeleton lines={3} width={280} />,
      },
      {
        title: "Composed Card Placeholder",
        code: `<div className="flex items-center gap-3">
  <Skeleton variant="circular" width={40} height={40} />
  <div className="flex-1 space-y-2">
    <Skeleton width="60%" />
    <Skeleton width="40%" />
  </div>
</div>`,
        preview: (
          <div className="flex w-64 items-center gap-3">
            <Skeleton variant="circular" width={40} height={40} />
            <div className="flex-1 space-y-2">
              <Skeleton width="60%" />
              <Skeleton width="40%" />
            </div>
          </div>
        ),
      },
    ]}
    propsTable={[
      { prop: "variant", type: '"text" | "circular" | "rectangular"', default: '"text"', description: "Placeholder shape" },
      { prop: "width", type: "number | string", default: "—", description: "Explicit width (px or any CSS value)" },
      { prop: "height", type: "number | string", default: "—", description: "Explicit height" },
      { prop: "lines", type: "number", default: "1", description: "Stacked text lines (text variant)" },
      { prop: "animated", type: "boolean", default: "true", description: "Toggle the pulse animation" },
      { prop: "lineClassName", type: "string", default: "—", description: "Styles each individual line when variant=\"text\" and lines > 1." },
    ]}
    a11y={[
      "Skeletons are aria-hidden — announce loading state separately (e.g. aria-busy on the container).",
      "The pulse animation is disabled automatically for users with prefers-reduced-motion.",
    ]}
  />
);

export default SkeletonDocs;
