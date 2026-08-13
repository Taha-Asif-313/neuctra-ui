"use client";

import React from "react";
import ComponentDocPage from "../components/ComponentDocPage";
import { AvatarGroup, Avatar } from "@neuctra/ui";

const people = [
  "https://i.pravatar.cc/80?img=1",
  "https://i.pravatar.cc/80?img=2",
  "https://i.pravatar.cc/80?img=3",
  "https://i.pravatar.cc/80?img=4",
  "https://i.pravatar.cc/80?img=5",
];

const AvatarGroupDocs = () => (
  <ComponentDocPage
    name="AvatarGroup"
    title="AvatarGroup Component — React Stacked Avatars | Neuctra UI"
    description="React avatar group with overlapping stack, background rings and an automatic +N overflow counter — built with Tailwind CSS."
    keywords="react avatar group, stacked avatars ui, team avatars component, avatar stack react, neuctra ui avatar group"
    importCode={`import { AvatarGroup, Avatar } from "@neuctra/ui";`}
    examples={[
      {
        title: "Basic Usage",
        description: "Wrap any avatars; max collapses the rest into a +N counter.",
        code: `<AvatarGroup max={3}>
  <Avatar src="/u1.jpg" alt="Ana Silva" size="md" />
  <Avatar src="/u2.jpg" alt="Ben Cole" size="md" />
  <Avatar src="/u3.jpg" alt="Cara Diaz" size="md" />
  <Avatar src="/u4.jpg" alt="Dev Patel" size="md" />
  <Avatar src="/u5.jpg" alt="Eve Wong" size="md" />
</AvatarGroup>`,
        preview: (
          <AvatarGroup max={3}>
            {people.map((src, i) => (
              <Avatar key={i} src={src} alt={`Team member ${i + 1}`} size="md" />
            ))}
          </AvatarGroup>
        ),
      },
      {
        title: "Spacing",
        code: `<AvatarGroup spacing="tight" max={4}>…</AvatarGroup>`,
        preview: (
          <AvatarGroup spacing="tight" max={4}>
            {people.map((src, i) => (
              <Avatar key={i} src={src} alt={`Team member ${i + 1}`} size="sm" />
            ))}
          </AvatarGroup>
        ),
      },
    ]}
    propsTable={[
      { prop: "children", type: "ReactNode", default: "—", description: "Avatar elements (required)" },
      { prop: "max", type: "number", default: "—", description: "Visible limit; the rest becomes “+N”" },
      { prop: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Size of the overflow counter (match your avatars)" },
      { prop: "spacing", type: '"tight" | "normal"', default: '"normal"', description: "Overlap amount" },
    ]}
    a11y={[
      "Each avatar keeps its own alt text; the overflow counter is labelled “N more”.",
      "Rings use the background token, so the stack works in both themes.",
    ]}
  />
);

export default AvatarGroupDocs;
