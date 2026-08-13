"use client";

import React, { useState } from "react";
import ComponentDocPage from "../components/ComponentDocPage";
import { Stepper, Button } from "@neuctra/ui";

const CHECKOUT_STEPS = [
  { label: "Cart", description: "Review items" },
  { label: "Shipping", description: "Address & method" },
  { label: "Payment", description: "Card details" },
  { label: "Done" },
];

const InteractiveDemo = () => {
  const [step, setStep] = useState(1);
  return (
    <div className="w-full space-y-6">
      <Stepper steps={CHECKOUT_STEPS} activeStep={step} onStepClick={setStep} />
      <div className="flex gap-2">
        <Button size="xs" variant="outline" disabled={step === 0} onClick={() => setStep(step - 1)}>
          Back
        </Button>
        <Button size="xs" disabled={step === CHECKOUT_STEPS.length - 1} onClick={() => setStep(step + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
};

const StepperDocs = () => (
  <ComponentDocPage
    name="Stepper"
    title="Stepper Component — React Multi-Step Progress | Neuctra UI"
    description="React stepper component for wizards and checkouts. Horizontal and vertical orientation, clickable completed steps and done/active/pending states."
    keywords="react stepper component, wizard steps ui, checkout steps react, multi step form progress, tailwind stepper, neuctra ui stepper"
    importCode={`import { Stepper } from "@neuctra/ui";`}
    examples={[
      {
        title: "Basic Usage",
        description:
          "activeStep is 0-based; earlier steps render as completed. With onStepClick, completed steps become clickable.",
        code: `const [step, setStep] = useState(1);

<Stepper
  steps={[
    { label: "Cart", description: "Review items" },
    { label: "Shipping", description: "Address & method" },
    { label: "Payment", description: "Card details" },
    { label: "Done" },
  ]}
  activeStep={step}
  onStepClick={setStep}
/>`,
        preview: <InteractiveDemo />,
      },
      {
        title: "Vertical Orientation",
        code: `<Stepper
  orientation="vertical"
  activeStep={1}
  steps={[
    { label: "Create account" },
    { label: "Verify email", description: "We sent you a link" },
    { label: "Set up workspace" },
  ]}
/>`,
        preview: (
          <Stepper
            orientation="vertical"
            activeStep={1}
            steps={[
              { label: "Create account" },
              { label: "Verify email", description: "We sent you a link" },
              { label: "Set up workspace" },
            ]}
          />
        ),
      },
    ]}
    propsTable={[
      { prop: "steps", type: "StepperStep[]", default: "—", description: "Step definitions (required)" },
      { prop: "steps[].label", type: "ReactNode", default: "—", description: "Step title" },
      { prop: "steps[].description", type: "ReactNode", default: "—", description: "Muted line under the title" },
      { prop: "steps[].icon", type: "ReactNode", default: "step number", description: "Custom marker content" },
      { prop: "activeStep", type: "number", default: "—", description: "Current step index, 0-based (required)" },
      { prop: "onStepClick", type: "(index: number) => void", default: "—", description: "Makes completed steps clickable" },
      { prop: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Layout direction" },
      { prop: "size", type: '"sm" | "md"', default: '"md"', description: "Marker and text scale" },
    ]}
    a11y={[
      'The active step label carries aria-current="step".',
      "Clickable completed steps are real buttons with descriptive aria-labels and focus rings.",
      "Connector lines are decorative (aria-hidden).",
    ]}
  />
);

export default StepperDocs;
