"use client";

import React from "react";
import ComponentDocPage from "../components/ComponentDocPage";
import { Timeline } from "@neuctra/ui";
import { Rocket, GitCommit } from "lucide-react";

const TimelineDocs = () => (
  <ComponentDocPage
    name="Timeline"
    title="Timeline Component — React Activity Feed | Neuctra UI"
    description="React timeline component for activity feeds, order tracking and changelogs. Done/active/pending statuses, custom icons and timestamps — built with Tailwind CSS."
    keywords="react timeline component, activity feed ui, order tracking timeline, changelog component react, vertical timeline tailwind, neuctra ui timeline"
    importCode={`import { Timeline } from "@neuctra/ui";`}
    examples={[
      {
        title: "Basic Usage",
        description: "Each item carries a status: done, active or pending.",
        code: `<Timeline
  items={[
    { title: "Order placed", time: "09:12", status: "done" },
    { title: "Payment confirmed", time: "09:14", status: "done" },
    { title: "Out for delivery", time: "12:40", status: "active",
      description: "Your package is on its way." },
    { title: "Delivered", status: "pending" },
  ]}
/>`,
        preview: (
          <Timeline
            className="w-full max-w-sm"
            items={[
              { title: "Order placed", time: "09:12", status: "done" },
              { title: "Payment confirmed", time: "09:14", status: "done" },
              { title: "Out for delivery", time: "12:40", status: "active", description: "Your package is on its way." },
              { title: "Delivered", status: "pending" },
            ]}
          />
        ),
      },
      {
        title: "Custom Icons & Compact Size",
        code: `<Timeline
  size="sm"
  items={[
    { title: "v0.3.0 released", time: "Today", status: "done", icon: <Rocket /> },
    { title: "24 commits merged", time: "Yesterday", status: "done", icon: <GitCommit /> },
    { title: "Next milestone", status: "pending" },
  ]}
/>`,
        preview: (
          <Timeline
            className="w-full max-w-sm"
            size="sm"
            items={[
              { title: "v0.3.0 released", time: "Today", status: "done", icon: <Rocket /> },
              { title: "24 commits merged", time: "Yesterday", status: "done", icon: <GitCommit /> },
              { title: "Next milestone", status: "pending" },
            ]}
          />
        ),
      },
    ]}
    propsTable={[
      { prop: "items", type: "TimelineItem[]", default: "—", description: "Entries to render (required)" },
      { prop: "items[].title", type: "ReactNode", default: "—", description: "Entry heading" },
      { prop: "items[].description", type: "ReactNode", default: "—", description: "Muted body text" },
      { prop: "items[].time", type: "ReactNode", default: "—", description: "Timestamp shown at the right edge" },
      { prop: "items[].icon", type: "ReactNode", default: "check / dot", description: "Custom marker icon" },
      { prop: "items[].status", type: '"done" | "active" | "pending"', default: '"pending"', description: "Controls marker and text emphasis" },
      { prop: "size", type: '"sm" | "md"', default: '"md"', description: "Density of the list" },
    ]}
    a11y={[
      "Renders an ordered list (<ol>), so sequence is conveyed to screen readers.",
      "Connector lines and markers are decorative (aria-hidden); titles carry the meaning.",
    ]}
  />
);

export default TimelineDocs;
