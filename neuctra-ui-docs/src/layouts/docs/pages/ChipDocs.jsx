"use client";

import React, { useState } from "react";
import ComponentDocPage from "../components/ComponentDocPage";
import { Chip } from "@neuctra/ui";
import { Tag } from "lucide-react";

const RemovableDemo = () => {
  const [chips, setChips] = useState(["React", "Vue", "Svelte"]);
  return (
    <>
      {chips.map((chip) => (
        <Chip
          key={chip}
          label={chip}
          onRemove={() => setChips((prev) => prev.filter((c) => c !== chip))}
        />
      ))}
      {chips.length === 0 && (
        <button
          className="text-xs text-primary underline"
          onClick={() => setChips(["React", "Vue", "Svelte"])}
        >
          Reset
        </button>
      )}
    </>
  );
};

const ChipDocs = () => (
  <ComponentDocPage
    name="Chip"
    title="Chip Component — React Removable Tags | Neuctra UI"
    description="React chip component for tags and filters. Solid, soft and outline variants, four colors, three sizes, icons and removable state — built with Tailwind CSS."
    keywords="react chip component, removable tag react, filter chip ui, tailwind chip, tag component react, neuctra ui chip"
    importCode={`import { Chip } from "@neuctra/ui";`}
    examples={[
      {
        title: "Basic Usage",
        code: `<Chip label="Design" />
<Chip label="Engineering" variant="outline" />
<Chip label="Marketing" variant="solid" />`,
        preview: (
          <>
            <Chip label="Design" />
            <Chip label="Engineering" variant="outline" />
            <Chip label="Marketing" variant="solid" />
          </>
        ),
      },
      {
        title: "Colors & Sizes",
        code: `<Chip label="Primary" color="primary" />
<Chip label="Neutral" color="neutral" />
<Chip label="Success" color="success" />
<Chip label="Destructive" color="destructive" />
<Chip label="Small" size="sm" />
<Chip label="Large" size="lg" icon={<Tag />} />`,
        preview: (
          <>
            <Chip label="Primary" color="primary" />
            <Chip label="Neutral" color="neutral" />
            <Chip label="Success" color="success" />
            <Chip label="Destructive" color="destructive" />
            <Chip label="Small" size="sm" />
            <Chip label="Large" size="lg" icon={<Tag />} />
          </>
        ),
      },
      {
        title: "Removable",
        description: "Pass onRemove to render an accessible remove button.",
        code: `const [chips, setChips] = useState(["React", "Vue", "Svelte"]);

{chips.map((chip) => (
  <Chip
    key={chip}
    label={chip}
    onRemove={() => setChips((prev) => prev.filter((c) => c !== chip))}
  />
))}`,
        preview: <RemovableDemo />,
      },
    ]}
    propsTable={[
      { prop: "label", type: "ReactNode", default: "—", description: "Chip content (required)" },
      { prop: "variant", type: '"solid" | "soft" | "outline"', default: '"soft"', description: "Visual style" },
      { prop: "color", type: '"primary" | "neutral" | "destructive" | "success"', default: '"primary"', description: "Color palette drawn from the theme tokens" },
      { prop: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Chip height, font and icon size scale together" },
      { prop: "icon", type: "ReactNode", default: "—", description: "Leading icon, auto-sized to the chip size" },
      { prop: "onRemove", type: "() => void", default: "—", description: "Renders a remove button and fires on click" },
      { prop: "disabled", type: "boolean", default: "false", description: "Dims the chip and disables the remove button" },
    ]}
    a11y={[
      'The remove button gets an explicit aria-label ("Remove {label}") and a visible focus ring.',
      "Icons are aria-hidden; the text label is what screen readers announce.",
    ]}
  />
);

export default ChipDocs;
