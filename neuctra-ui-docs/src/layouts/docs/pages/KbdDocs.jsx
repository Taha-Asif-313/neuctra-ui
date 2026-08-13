"use client";

import React from "react";
import ComponentDocPage from "../components/ComponentDocPage";
import { Kbd } from "@neuctra/ui";

const KbdDocs = () => (
  <ComponentDocPage
    name="Kbd"
    title="Kbd Component — React Keyboard Shortcut Keys | Neuctra UI"
    description="React kbd component for rendering keyboard shortcuts and key combinations with a native <kbd> element, styled with Tailwind CSS."
    keywords="react kbd component, keyboard shortcut ui, key combination react, shortcut keys component, neuctra ui kbd"
    importCode={`import { Kbd } from "@neuctra/ui";`}
    examples={[
      {
        title: "Basic Usage",
        code: `<span>Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to search</span>`,
        preview: (
          <span className="text-sm">
            Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to search
          </span>
        ),
      },
      {
        title: "Sizes & Combinations",
        code: `<Kbd size="sm">Esc</Kbd>
<Kbd>Ctrl</Kbd> <Kbd>Shift</Kbd> <Kbd>P</Kbd>`,
        preview: (
          <div className="flex items-center gap-2 text-sm">
            <Kbd size="sm">Esc</Kbd>
            <span className="text-gray-500">·</span>
            <Kbd>Ctrl</Kbd>
            <Kbd>Shift</Kbd>
            <Kbd>P</Kbd>
          </div>
        ),
      },
    ]}
    propsTable={[
      { prop: "children", type: "ReactNode", default: "—", description: "Key text (required)" },
      { prop: "size", type: '"sm" | "md"', default: '"md"', description: "Key cap size" },
    ]}
    a11y={[
      "Uses the semantic <kbd> element, announced as keyboard input by screen readers.",
    ]}
  />
);

export default KbdDocs;
