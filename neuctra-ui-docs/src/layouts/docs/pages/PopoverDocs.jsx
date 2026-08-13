"use client";

import React from "react";
import ComponentDocPage from "../components/ComponentDocPage";
import { Popover, Button, Divider } from "@neuctra/ui";

const PopoverDocs = () => (
  <ComponentDocPage
    name="Popover"
    title="Popover Component — React Click-Triggered Panel | Neuctra UI"
    description="React popover component with rich content, twelve placement combinations, outside-click and Escape dismissal, controlled and uncontrolled modes."
    keywords="react popover component, click popup panel, tailwind popover, floating panel react, neuctra ui popover"
    importCode={`import { Popover } from "@neuctra/ui";`}
    examples={[
      {
        title: "Basic Usage",
        description:
          "Click the trigger to toggle. Clicking outside or pressing Escape closes it.",
        code: `<Popover trigger={<Button size="sm">Open popover</Button>}>
  <p className="font-medium text-foreground mb-1">Team plan</p>
  <p className="text-muted-foreground text-xs">
    Unlimited projects, priority support and SSO.
  </p>
</Popover>`,
        preview: (
          <Popover trigger={<Button size="sm">Open popover</Button>}>
            <p className="mb-1 font-medium text-foreground">Team plan</p>
            <p className="text-xs text-muted-foreground">
              Unlimited projects, priority support and SSO.
            </p>
          </Popover>
        ),
      },
      {
        title: "Placement",
        description: "position sets the side; align sets the edge alignment on that side.",
        code: `<Popover position="right" align="start" trigger={<Button size="xs" variant="outline">Right</Button>}>
  Right / start
</Popover>
<Popover position="top" align="center" trigger={<Button size="xs" variant="outline">Top</Button>}>
  Top / center
</Popover>`,
        preview: (
          <>
            <Popover position="right" align="start" trigger={<Button size="xs" variant="outline">Right</Button>}>
              Right / start
            </Popover>
            <Popover position="top" align="center" trigger={<Button size="xs" variant="outline">Top</Button>}>
              Top / center
            </Popover>
          </>
        ),
      },
      {
        title: "Rich Content",
        code: `<Popover
  trigger={<Button size="sm" variant="outline">Share</Button>}
  contentClassName="w-64"
>
  <p className="font-medium text-foreground">Share this page</p>
  <Divider spacing="sm" />
  <div className="flex gap-2">
    <Button size="xs" fullWidth>Copy link</Button>
    <Button size="xs" variant="outline" fullWidth>Email</Button>
  </div>
</Popover>`,
        preview: (
          <Popover
            trigger={<Button size="sm" variant="outline">Share</Button>}
            contentClassName="w-64"
          >
            <p className="font-medium text-foreground">Share this page</p>
            <Divider spacing="sm" />
            <div className="flex gap-2">
              <Button size="xs" fullWidth>Copy link</Button>
              <Button size="xs" variant="outline" fullWidth>Email</Button>
            </div>
          </Popover>
        ),
      },
    ]}
    propsTable={[
      { prop: "trigger", type: "ReactNode", default: "—", description: "Element that toggles the popover (required)" },
      { prop: "children", type: "ReactNode", default: "—", description: "Panel content (required)" },
      { prop: "position", type: '"top" | "bottom" | "left" | "right"', default: '"bottom"', description: "Side of the trigger" },
      { prop: "align", type: '"start" | "center" | "end"', default: '"center"', description: "Alignment along that side" },
      { prop: "open / defaultOpen", type: "boolean", default: "—", description: "Controlled / uncontrolled open state" },
      { prop: "onOpenChange", type: "(open: boolean) => void", default: "—", description: "Fired on every open/close" },
      { prop: "closeOnClickOutside", type: "boolean", default: "true", description: "Dismiss when clicking outside" },
      { prop: "closeOnEscape", type: "boolean", default: "true", description: "Dismiss with the Escape key" },
      { prop: "disabled", type: "boolean", default: "false", description: "Disable the trigger" },
    ]}
    a11y={[
      'The trigger exposes aria-haspopup="dialog", aria-expanded and aria-controls.',
      "Enter and Space toggle the popover from the keyboard.",
      "Document listeners attach only while open, and never go stale on onOpenChange.",
    ]}
  />
);

export default PopoverDocs;
