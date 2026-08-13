"use client";

import React from "react";
import ComponentDocPage from "../components/ComponentDocPage";
import { Tooltip, Button, Kbd } from "@neuctra/ui";

const TooltipDocs = () => (
  <ComponentDocPage
    name="Tooltip"
    title="Tooltip Component — React Hover Hints | Neuctra UI"
    description="Accessible React tooltip shown on hover and keyboard focus. Four positions, show delay, Escape dismissal and WCAG-friendly behavior — built with Tailwind CSS."
    keywords="react tooltip component, hover hint ui, accessible tooltip react, tailwind tooltip, neuctra ui tooltip"
    importCode={`import { Tooltip } from "@neuctra/ui";`}
    examples={[
      {
        title: "Basic Usage",
        description: "Wraps its child; appears on hover and on keyboard focus.",
        code: `<Tooltip content="Save your changes">
  <Button size="sm">Save</Button>
</Tooltip>`,
        preview: (
          <Tooltip content="Save your changes">
            <Button size="sm">Save</Button>
          </Tooltip>
        ),
      },
      {
        title: "Positions",
        code: `<Tooltip content="Top" position="top"><Button size="xs" variant="outline">Top</Button></Tooltip>
<Tooltip content="Bottom" position="bottom"><Button size="xs" variant="outline">Bottom</Button></Tooltip>
<Tooltip content="Left" position="left"><Button size="xs" variant="outline">Left</Button></Tooltip>
<Tooltip content="Right" position="right"><Button size="xs" variant="outline">Right</Button></Tooltip>`,
        preview: (
          <>
            <Tooltip content="Top" position="top"><Button size="xs" variant="outline">Top</Button></Tooltip>
            <Tooltip content="Bottom" position="bottom"><Button size="xs" variant="outline">Bottom</Button></Tooltip>
            <Tooltip content="Left" position="left"><Button size="xs" variant="outline">Left</Button></Tooltip>
            <Tooltip content="Right" position="right"><Button size="xs" variant="outline">Right</Button></Tooltip>
          </>
        ),
      },
      {
        title: "Rich Content & Delay",
        code: `<Tooltip
  delay={400}
  content={<span>Search <Kbd size="sm">⌘K</Kbd></span>}
>
  <Button size="sm" variant="ghost">Hover me (400ms)</Button>
</Tooltip>`,
        preview: (
          <Tooltip delay={400} content={<span>Search <Kbd size="sm">⌘K</Kbd></span>}>
            <Button size="sm" variant="ghost">Hover me (400ms)</Button>
          </Tooltip>
        ),
      },
    ]}
    propsTable={[
      { prop: "content", type: "ReactNode", default: "—", description: "Tooltip content (required)" },
      { prop: "children", type: "ReactNode", default: "—", description: "Trigger element (required)" },
      { prop: "position", type: '"top" | "bottom" | "left" | "right"', default: '"top"', description: "Placement relative to the trigger" },
      { prop: "delay", type: "number", default: "150", description: "Show delay in milliseconds" },
      { prop: "disabled", type: "boolean", default: "false", description: "Never show the tooltip" },
      { prop: "contentClassName", type: "string", default: "—", description: "Extra classes for the bubble" },
    ]}
    a11y={[
      'Uses role="tooltip" linked to the trigger with aria-describedby while visible.',
      "Opens on keyboard focus, not just hover, and closes on Escape (WCAG 1.4.13).",
      "The bubble is pointer-events-none, so it never blocks the cursor.",
    ]}
  />
);

export default TooltipDocs;
