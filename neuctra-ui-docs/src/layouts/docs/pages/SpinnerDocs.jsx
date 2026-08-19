"use client";

import React from "react";
import ComponentDocPage from "../components/ComponentDocPage";
import { Spinner } from "@neuctra/ui";

const SpinnerDocs = () => (
  <ComponentDocPage
    name="Spinner"
    title="Spinner Component — React Loading Indicator | Neuctra UI"
    description="Accessible React spinner component with five sizes, theme-aware colors and a screen-reader label — built with Tailwind CSS."
    keywords="react spinner component, loading indicator react, tailwind spinner, loader ui component, neuctra ui spinner"
    importCode={`import { Spinner } from "@neuctra/ui";`}
    examples={[
      {
        title: "Sizes",
        code: `<Spinner size="xs" />
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="xl" />`,
        preview: (
          <>
            <Spinner size="xs" />
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
            <Spinner size="xl" />
          </>
        ),
      },
      {
        title: "Custom Color & Label",
        description:
          "colorClassName accepts any text-* class; label is announced to screen readers.",
        code: `<Spinner colorClassName="text-foreground" label="Saving changes…" />
<Spinner colorClassName="text-destructive" />`,
        preview: (
          <>
            <Spinner colorClassName="text-foreground" label="Saving changes…" />
            <Spinner colorClassName="text-destructive" />
          </>
        ),
      },
    ]}
    propsTable={[
      { prop: "size", type: '"xs" | "sm" | "md" | "lg" | "xl"', default: '"md"', description: "Spinner diameter; stroke width scales with it" },
      { prop: "label", type: "string", default: '"Loading…"', description: "Screen-reader-only status text" },
      { prop: "colorClassName", type: "string", default: '"text-primary"', description: "Tailwind text color class for the stroke" },
      { prop: "labelClassName", type: "string", default: "—", description: "Styles the visually-hidden (sr-only) accessible label." },
    ]}
    a11y={[
      'Renders role="status" with a visually hidden label, so loading is announced.',
      "The spinning circle itself is aria-hidden.",
    ]}
  />
);

export default SpinnerDocs;
