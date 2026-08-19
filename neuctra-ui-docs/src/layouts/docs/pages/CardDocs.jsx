"use client";

import React from "react";
import ComponentDocPage from "../components/ComponentDocPage";
import { Card, CardHeader, CardBody, CardFooter, Button } from "@neuctra/ui";
import { Settings } from "lucide-react";

const CardDocs = () => (
  <ComponentDocPage
    name="Card"
    title="Card Component — React Content Container | Neuctra UI"
    description="Composable React card component with header, body and footer sections. Supports outline, elevated and ghost variants, hover states and padding scales — built with Tailwind CSS."
    keywords="react card component, tailwind card ui, card container react, dashboard card component, neuctra ui card"
    importCode={`import { Card, CardHeader, CardBody, CardFooter } from "@neuctra/ui";`}
    examples={[
      {
        title: "Basic Usage",
        description:
          "Compose a card from CardHeader, CardBody and CardFooter. Sections inherit the card's padding scale automatically.",
        code: `<Card className="max-w-sm">
  <CardHeader
    title="Project Settings"
    description="Manage your project configuration"
    icon={<Settings />}
  />
  <CardBody>
    <p className="text-sm">Cards group related content and actions.</p>
  </CardBody>
  <CardFooter>
    <Button size="sm" variant="outline">Cancel</Button>
    <Button size="sm">Save</Button>
  </CardFooter>
</Card>`,
        preview: (
          <Card className="max-w-sm">
            <CardHeader
              title="Project Settings"
              description="Manage your project configuration"
              icon={<Settings />}
            />
            <CardBody>
              <p className="text-sm">Cards group related content and actions.</p>
            </CardBody>
            <CardFooter>
              <Button size="sm" variant="outline">Cancel</Button>
              <Button size="sm">Save</Button>
            </CardFooter>
          </Card>
        ),
      },
      {
        title: "Variants",
        description:
          "Four surface styles: default, outline, elevated and ghost.",
        code: `<Card variant="default"><CardBody>Default</CardBody></Card>
<Card variant="outline"><CardBody>Outline</CardBody></Card>
<Card variant="elevated"><CardBody>Elevated</CardBody></Card>
<Card variant="ghost"><CardBody>Ghost</CardBody></Card>`,
        preview: (
          <>
            <Card variant="default" className="w-36"><CardBody>Default</CardBody></Card>
            <Card variant="outline" className="w-36"><CardBody>Outline</CardBody></Card>
            <Card variant="elevated" className="w-36"><CardBody>Elevated</CardBody></Card>
            <Card variant="ghost" className="w-36"><CardBody>Ghost</CardBody></Card>
          </>
        ),
      },
      {
        title: "Hoverable",
        description: "Add hoverable for a lift effect on interactive cards.",
        code: `<Card hoverable className="max-w-xs">
  <CardBody>Hover me</CardBody>
</Card>`,
        preview: (
          <Card hoverable className="max-w-xs">
            <CardBody>Hover me</CardBody>
          </Card>
        ),
      },
    ]}
    propsTable={[
      { prop: "variant", type: '"default" | "outline" | "elevated" | "ghost"', default: '"default"', description: "Visual style of the card surface" },
      { prop: "padding", type: '"none" | "sm" | "md" | "lg"', default: '"md"', description: "Padding scale inherited by all card sections" },
      { prop: "hoverable", type: "boolean", default: "false", description: "Lift the card with a shadow on hover" },
      { prop: "CardHeader.title", type: "ReactNode", default: "—", description: "Header heading content" },
      { prop: "CardHeader.description", type: "ReactNode", default: "—", description: "Muted line under the title" },
      { prop: "CardHeader.icon", type: "ReactNode", default: "—", description: "Leading icon slot" },
      { prop: "CardHeader.action", type: "ReactNode", default: "—", description: "Right-aligned action slot (menu, button…)" },
      { prop: "CardHeader.iconClassName", type: "string", default: "—", description: "Styles the leading icon wrapper." },
      { prop: "CardHeader.titleClassName", type: "string", default: "—", description: "Styles the title heading." },
      { prop: "CardHeader.descriptionClassName", type: "string", default: "—", description: "Styles the description text." },
      { prop: "CardHeader.actionClassName", type: "string", default: "—", description: "Styles the right-aligned action wrapper." },
      { prop: "className / style", type: "string / CSSProperties", default: "—", description: "Available on Card and every section; native div props are forwarded" },
    ]}
    a11y={[
      "Card renders a plain region — headings inside CardHeader use a semantic <h3>.",
      "All sections forward refs and native attributes (id, aria-*, data-*).",
    ]}
  />
);

export default CardDocs;
