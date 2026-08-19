"use client";

import React from "react";
import ComponentDocPage from "../components/ComponentDocPage";
import { Callout } from "@neuctra/ui";
import { Rocket } from "lucide-react";

const CalloutDocs = () => (
  <ComponentDocPage
    name="Callout"
    title="Callout Component — React Inline Alert Banner | Neuctra UI"
    description="Static React alert banner for inline messages: info, success, warning, error and neutral types, soft and outline variants, dismissible with custom icons. Unlike toasts, callouts live in the page flow."
    keywords="react alert banner, inline alert component, callout ui, notification banner react, tailwind alert, neuctra ui callout"
    importCode={`import { Callout } from "@neuctra/ui";`}
    intro="A static inline alert that lives in the page flow — use it for persistent messages, while the toast system (ToastProvider) handles transient notifications."
    examples={[
      {
        title: "Types",
        code: `<Callout type="info" title="Heads up">A new version is available.</Callout>
<Callout type="success" title="Payment received">Your invoice has been settled.</Callout>
<Callout type="warning" title="Storage almost full">You have used 90% of your quota.</Callout>
<Callout type="error" title="Sync failed">We could not reach the server.</Callout>
<Callout type="neutral">A neutral note without a title.</Callout>`,
        preview: (
          <div className="flex w-full flex-col gap-3">
            <Callout type="info" title="Heads up">A new version is available.</Callout>
            <Callout type="success" title="Payment received">Your invoice has been settled.</Callout>
            <Callout type="warning" title="Storage almost full">You have used 90% of your quota.</Callout>
            <Callout type="error" title="Sync failed">We could not reach the server.</Callout>
            <Callout type="neutral">A neutral note without a title.</Callout>
          </div>
        ),
      },
      {
        title: "Outline, Custom Icon & Dismissible",
        code: `<Callout variant="outline" type="info" icon={<Rocket />} title="v0.4.0 shipped" dismissible>
  Eight new components, including DatePicker and Carousel.
</Callout>`,
        preview: (
          <Callout variant="outline" type="info" icon={<Rocket />} title="v0.4.0 shipped" dismissible className="w-full">
            Eight new components, including DatePicker and Carousel.
          </Callout>
        ),
      },
    ]}
    propsTable={[
      { prop: "type", type: '"info" | "success" | "warning" | "error" | "neutral"', default: '"info"', description: "Semantic color and default icon" },
      { prop: "variant", type: '"soft" | "outline"', default: '"soft"', description: "Tinted background or border-only" },
      { prop: "title", type: "ReactNode", default: "—", description: "Bold headline" },
      { prop: "children", type: "ReactNode", default: "—", description: "Body content" },
      { prop: "icon", type: "ReactNode | null", default: "type icon", description: "Custom icon; null hides it" },
      { prop: "dismissible", type: "boolean", default: "false", description: "Show a close button; self-removes on click" },
      { prop: "onDismiss", type: "() => void", default: "—", description: "Fired when dismissed" },
      { prop: "iconClassName", type: "string", default: "—", description: "Styles the leading icon wrapper." },
      { prop: "contentClassName", type: "string", default: "—", description: "Styles the wrapper around the title and body content." },
      { prop: "titleClassName", type: "string", default: "—", description: "Styles the title text." },
      { prop: "descriptionClassName", type: "string", default: "—", description: "Styles the body content wrapper." },
      { prop: "closeButtonClassName", type: "string", default: "—", description: "Styles the dismiss/close button." },
    ]}
    a11y={[
      'Error callouts render role="alert" (interruptive); all others role="status".',
      "The dismiss button is labelled and focus-ringed; icons are decorative.",
    ]}
  />
);

export default CalloutDocs;
