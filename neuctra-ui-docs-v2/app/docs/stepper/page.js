"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import { Stepper, Button, Card, CardBody } from "@neuctra/ui";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility } from "lucide-react";

// Recomputed locally rather than imported from ./layout.js: layout.js is a
// Server Component module and this page.js is a Client Component — pulling
// a value across that boundary via import would drag the whole server
// module (including its default export) into the client bundle. Both files
// call the same pure function with the same args, so they stay in sync.
const stepperFaq = buildComponentFaq("Stepper", { sizes: ["sm", "md"] });

const CHECKOUT_STEPS = [
  { label: "Cart", description: "Review items" },
  { label: "Shipping", description: "Address & method" },
  { label: "Payment", description: "Card details" },
  { label: "Done" },
];

const ONBOARDING_STEPS = [
  { label: "Account", description: "Basic info" },
  { label: "Profile", description: "Photo & bio" },
  { label: "Company", description: "Org details" },
  { label: "Team", description: "Invite members" },
  { label: "Workspace", description: "Name & icon" },
  { label: "Integrations", description: "Connect tools" },
  { label: "Billing", description: "Payment method" },
  { label: "Preferences", description: "Notifications" },
  { label: "Review", description: "Confirm & finish" },
];

const InteractiveDemo = () => {
  const [step, setStep] = useState(1);
  return (
    <div className="w-full space-y-6">
      <Stepper
        steps={CHECKOUT_STEPS}
        activeStep={step}
        onStepClick={setStep}
      />
      <div className="flex gap-2">
        <Button
          size="xs"
          variant="outline"
          disabled={step === 0}
          onClick={() => setStep(step - 1)}
        >
          Back
        </Button>
        <Button
          size="xs"
          disabled={step === CHECKOUT_STEPS.length - 1}
          onClick={() => setStep(step + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

const ManyStepsDemo = () => {
  const [step, setStep] = useState(0);
  const current = ONBOARDING_STEPS[step];
  return (
    <div className="w-full space-y-4">
      <Stepper steps={ONBOARDING_STEPS} activeStep={step} onStepClick={setStep} />

      <Card>
        <CardBody>
          <p className="text-sm font-medium text-white">
            {step + 1}. {current.label}
          </p>
          <p className="mt-1 text-sm text-gray-400">
            {current.description} — this is where that step's fields would
            render.
          </p>
        </CardBody>
      </Card>

      <div className="flex gap-2">
        <Button
          size="xs"
          variant="outline"
          disabled={step === 0}
          onClick={() => setStep(step - 1)}
        >
          Back
        </Button>
        <Button
          size="xs"
          disabled={step === ONBOARDING_STEPS.length - 1}
          onClick={() => setStep(step + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

const StepperDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            Stepper Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            React stepper component for wizards and checkouts. Horizontal
            and vertical orientation, clickable completed steps and
            done/active/pending states.
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="Stepper-import">
          <h2
            id="Stepper-import"
            className="text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            Import
          </h2>
          <CodeBlock code={`import { Stepper } from "@neuctra/ui";`} />
        </section>

        {/* Example: Basic Usage */}
        <section aria-labelledby="Stepper-example-0">
          <h2
            id="Stepper-example-0"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            activeStep is 0-based; earlier steps render as completed. With
            onStepClick, completed steps become clickable.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [step, setStep] = useState(1);

<Stepper
  steps={[
    { label: "Cart", description: "Review items" },
    { label: "Shipping", description: "Address & method" },
    { label: "Payment", description: "Card details" },
    { label: "Done" },
  ]}
  activeStep={step}
  onStepClick={setStep}
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <InteractiveDemo />
              </div>
            }
          />
        </section>

        {/* Example: Vertical Orientation */}
        <section aria-labelledby="Stepper-example-1">
          <h2
            id="Stepper-example-1"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Vertical Orientation
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<Stepper
  orientation="vertical"
  activeStep={1}
  steps={[
    { label: "Create account" },
    { label: "Verify email", description: "We sent you a link" },
    { label: "Set up workspace" },
  ]}
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <Stepper
                  orientation="vertical"
                  activeStep={1}
                  steps={[
                    { label: "Create account" },
                    { label: "Verify email", description: "We sent you a link" },
                    { label: "Set up workspace" },
                  ]}
                />
              </div>
            }
          />
        </section>

        {/* Example: Many Steps */}
        <section aria-labelledby="Stepper-example-2">
          <h2
            id="Stepper-example-2"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Many Steps (Responsive)
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            A horizontal Stepper with many steps doesn't try to squeeze every
            item into one row — the strip scrolls horizontally instead (drag
            it, or use onStepClick / arrow keys), and it keeps the active
            step scrolled into view automatically. Descriptions hide below
            the sm breakpoint so items stay compact on mobile. For a real
            multi-step flow, structure it as: Stepper (progress) → the
            current step's own content, rendered below it → Back/Next
            controls to move between steps.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const STEPS = [
  { label: "Account", description: "Basic info" },
  { label: "Profile", description: "Photo & bio" },
  { label: "Company", description: "Org details" },
  { label: "Team", description: "Invite members" },
  { label: "Workspace", description: "Name & icon" },
  { label: "Integrations", description: "Connect tools" },
  { label: "Billing", description: "Payment method" },
  { label: "Preferences", description: "Notifications" },
  { label: "Review", description: "Confirm & finish" },
];

const [step, setStep] = useState(0);
const current = STEPS[step];

<Stepper steps={STEPS} activeStep={step} onStepClick={setStep} />

<Card>
  <CardBody>
    <p className="font-medium">{step + 1}. {current.label}</p>
    <p className="text-muted-foreground">{current.description}</p>
  </CardBody>
</Card>

<Button variant="outline" disabled={step === 0} onClick={() => setStep(step - 1)}>
  Back
</Button>
<Button disabled={step === STEPS.length - 1} onClick={() => setStep(step + 1)}>
  Next
</Button>`}
            previewContent={
              <div className="w-full py-4">
                <ManyStepsDemo />
              </div>
            }
          />
        </section>

        {/* Props table */}
        <section aria-labelledby="Stepper-props">
          <h2
            id="Stepper-props"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the Stepper component.
          </p>

          <div className="border border-zinc-800 rounded-xl overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-zinc-900 text-gray-200">
                <tr>
                  <th scope="col" className="text-left p-3">
                    Prop
                  </th>
                  <th scope="col" className="text-left p-3">
                    Type
                  </th>
                  <th scope="col" className="text-left p-3">
                    Default
                  </th>
                  <th scope="col" className="text-left p-3">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-gray-300">
                {[
                  ["steps", "StepperStep[]", "—", "Step definitions (required)"],
                  ["steps[].label", "ReactNode", "—", "Step title"],
                  ["steps[].description", "ReactNode", "—", "Muted line under the title"],
                  ["steps[].icon", "ReactNode", "step number", "Custom marker content"],
                  ["activeStep", "number", "—", "Current step index, 0-based (required)"],
                  ["onStepClick", "(index: number) => void", "—", "Makes completed steps clickable"],
                  ["orientation", '"horizontal" | "vertical"', '"horizontal"', "Layout direction"],
                  ["size", '"sm" | "md"', '"md"', "Marker and text scale"],
                  ["itemClassName", "string", "—", "Styles each individual step (indicator + content) wrapper"],
                  ["dotClassName", "string", "—", "Styles the circular step indicator/dot"],
                  ["dotButtonClassName", "string", "—", "Styles the button wrapping a clickable (completed) dot"],
                  ["connectorClassName", "string", "—", "Styles the connector line between steps"],
                  ["contentClassName", "string", "—", "Styles the wrapper around a step's label and description"],
                  ["labelClassName", "string", "—", "Styles a step's label text"],
                  ["descriptionClassName", "string", "—", "Styles a step's description text"],
                ].map(([prop, type, def, desc]) => (
                  <tr key={prop}>
                    <td className="p-3 font-medium text-primary whitespace-nowrap">
                      {prop}
                    </td>
                    <td className="p-3 font-mono text-xs text-gray-300">
                      {type}
                    </td>
                    <td className="p-3 text-gray-400 whitespace-nowrap">
                      {def}
                    </td>
                    <td className="p-3">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Accessibility */}
        <section aria-labelledby="Stepper-a11y">
          <h2
            id="Stepper-a11y"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>The active step label carries aria-current="step".</li>
            <li>
              Clickable completed steps are real buttons with descriptive
              aria-labels and focus rings.
            </li>
            <li>Connector lines are decorative (aria-hidden).</li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={stepperFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </div>
  );
};

export default StepperDocs;
