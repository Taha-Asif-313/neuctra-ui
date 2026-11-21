"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility } from "lucide-react";
import { Wizard, Input, Select, Button, RadioGroup } from "@neuctra/ui";

const wizardFaq = buildComponentFaq("Wizard", {
  sizes: ["sm", "md"],
});

const wizardProps = [
  ["steps", "WizardStep[]", "-", "Steps rendered in order (required)."],
  ["activeStep", "number", "-", "Controlled active step index."],
  ["defaultActiveStep", "number", "0", "Initial step index in uncontrolled mode."],
  ["onStepChange", "(step: number) => void", "-", "Fired whenever the active step changes."],
  ["onFinish", "() => void | Promise<void>", "-", "Fired when the last step passes validation. The finish button shows a spinner until a returned promise settles."],
  ["orientation", '"horizontal" | "vertical"', '"horizontal"', "Stepper across the top, or as a sidebar from the md breakpoint."],
  ["size", '"sm" | "md"', '"md"', "Scale of the stepper, padding and footer buttons."],
  ["nextLabel", "ReactNode", '"Next"', "Label for the forward button."],
  ["backLabel", "ReactNode", '"Back"', "Label for the backward button."],
  ["finishLabel", "ReactNode", '"Finish"', "Label for the button on the final step."],
  ["showStepCount", "boolean", "true", 'Shows the "Step 2 of 4" counter in the footer (sm and up).'],
  ["allowStepClick", "boolean", "true", "Lets users jump back to completed steps from the stepper."],
  ["stepperLabelVisibility", '"auto" | "all" | "active"', '"auto"', "Which labels the horizontal stepper shows. auto keeps only the markers plus the active step label on narrow screens."],
  ["className", "string", "-", "Additional classes for the root card."],
  ["stepperClassName", "string", "-", "Additional classes for the stepper wrapper."],
  ["contentClassName", "string", "-", "Additional classes for the step content area."],
  ["titleClassName", "string", "-", "Additional classes for the step title."],
  ["descriptionClassName", "string", "-", "Additional classes for the step description."],
  ["footerClassName", "string", "-", "Additional classes for the footer bar."],
  ["...rest", "HTMLAttributes<HTMLDivElement>", "-", "Any other div attribute."],
];

const wizardStepProps = [
  ["title", "ReactNode", "-", "Title shown in the stepper and above the content (required)."],
  ["description", "ReactNode", "-", "Optional line under the title."],
  ["content", "ReactNode", "-", "Content rendered while the step is active (required)."],
  ["validate", "() => boolean | Promise<boolean>", "-", "Return false, or resolve to false, to block moving forward."],
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function WorkspaceOnboarding() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [plan, setPlan] = useState("team");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="w-full max-w-2xl rounded-xl border border-border bg-card p-6 text-center">
        <p className="font-semibold text-foreground">Workspace created</p>
        <p className="mt-1 text-sm text-secondary">
          {name} is ready. Invites are on their way.
        </p>
        <Button size="sm" variant="outline" className="mt-4" onClick={() => setDone(false)}>
          Start over
        </Button>
      </div>
    );
  }

  return (
    <Wizard
      className="w-full max-w-2xl"
      finishLabel="Create workspace"
      onFinish={async () => {
        await delay(800);
        setDone(true);
      }}
      steps={[
        {
          title: "Workspace",
          description: "Name the space your team will share.",
          validate: async () => {
            await delay(400);
            if (!name.trim()) {
              setError("Workspace name is required");
              return false;
            }
            setError("");
            return true;
          },
          content: (
            <Input
              label="Workspace name"
              placeholder="Acme Design"
              value={name}
              onChange={(event) => setName(event.target.value)}
              error={error}
            />
          ),
        },
        {
          title: "Plan",
          description: "You can change plans at any time.",
          content: (
            <RadioGroup
              selectedValue={plan}
              onChange={setPlan}
              options={[
                { label: "Starter, free for 3 members", value: "starter" },
                { label: "Team, $12 per member per month", value: "team" },
                { label: "Business, $24 per member per month", value: "business" },
              ]}
            />
          ),
        },
        {
          title: "Invite",
          description: "Teammates get an email with a join link.",
          content: (
            <Input
              label="Email addresses"
              placeholder="sam@acme.io, lee@acme.io"
            />
          ),
        },
      ]}
    />
  );
}

function ControlledWizard() {
  const [step, setStep] = useState(1);
  return (
    <div className="w-full max-w-2xl space-y-3">
      <p className="text-sm text-muted-foreground">Current step index: {step}</p>
      <Wizard
        size="sm"
        activeStep={step}
        onStepChange={setStep}
        steps={[
          { title: "Upload", content: <p className="text-secondary">Choose a CSV export of your contacts.</p> },
          { title: "Map fields", content: <p className="text-secondary">Match each column to a contact property.</p> },
          { title: "Review", content: <p className="text-secondary">2,148 contacts will be imported.</p> },
        ]}
      />
    </div>
  );
}

const WizardDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            Wizard Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            Guide users through multi step flows such as onboarding, imports
            and checkout. Wizard combines a Stepper with paged content,
            async validation gates, a loading state on the forward button and
            focus management between steps.
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="Wizard-import">
          <h2
            id="Wizard-import"
            className="text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            Import
          </h2>
          <CodeBlock code={`import { Wizard } from "@neuctra/ui";`} />
        </section>

        {/* Example: Validation */}
        <section aria-labelledby="Wizard-example-0">
          <h2
            id="Wizard-example-0"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Onboarding with Async Validation
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            validate can return a promise. While it runs, the Next button
            shows a spinner and further clicks are ignored. Leave the name
            empty and press Next to see the gate.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [name, setName] = useState("");
const [error, setError] = useState("");
const [plan, setPlan] = useState("team");

<Wizard
  finishLabel="Create workspace"
  onFinish={async () => {
    await createWorkspace({ name });
  }}
  steps={[
    {
      title: "Workspace",
      description: "Name the space your team will share.",
      validate: async () => {
        if (!name.trim()) {
          setError("Workspace name is required");
          return false;
        }
        setError("");
        return true;
      },
      content: (
        <Input
          label="Workspace name"
          placeholder="Acme Design"
          value={name}
          onChange={(event) => setName(event.target.value)}
          error={error}
        />
      ),
    },
    {
      title: "Plan",
      description: "You can change plans at any time.",
      content: (
        <RadioGroup
          selectedValue={plan}
          onChange={setPlan}
          options={[
            { label: "Starter, free for 3 members", value: "starter" },
            { label: "Team, $12 per member per month", value: "team" },
            { label: "Business, $24 per member per month", value: "business" },
          ]}
        />
      ),
    },
    {
      title: "Invite",
      description: "Teammates get an email with a join link.",
      content: <Input label="Email addresses" placeholder="sam@acme.io, lee@acme.io" />,
    },
  ]}
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <WorkspaceOnboarding />
              </div>
            }
          />
        </section>

        {/* Example: Vertical */}
        <section aria-labelledby="Wizard-example-1">
          <h2
            id="Wizard-example-1"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Vertical Orientation
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            orientation="vertical" moves the stepper into a sidebar from the
            md breakpoint and stacks it above the content on mobile.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<Wizard
  orientation="vertical"
  finishLabel="Publish"
  steps={[
    { title: "Details", description: "Title and summary", content: <Input label="Listing title" defaultValue="Loft studio in Kreuzberg" /> },
    { title: "Pricing", description: "Nightly rate", content: <Input label="Price per night" prefix="EUR" type="number" defaultValue="95" /> },
    { title: "Availability", description: "Calendar rules", content: <Select label="Minimum stay" defaultValue="2" options={[{ label: "1 night", value: "1" }, { label: "2 nights", value: "2" }, { label: "1 week", value: "7" }]} /> },
  ]}
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <Wizard
                  className="w-full max-w-3xl"
                  orientation="vertical"
                  finishLabel="Publish"
                  steps={[
                    {
                      title: "Details",
                      description: "Title and summary",
                      content: (
                        <Input
                          label="Listing title"
                          defaultValue="Loft studio in Kreuzberg"
                        />
                      ),
                    },
                    {
                      title: "Pricing",
                      description: "Nightly rate",
                      content: (
                        <Input
                          label="Price per night"
                          prefix="EUR"
                          type="number"
                          defaultValue="95"
                        />
                      ),
                    },
                    {
                      title: "Availability",
                      description: "Calendar rules",
                      content: (
                        <Select
                          label="Minimum stay"
                          defaultValue="2"
                          options={[
                            { label: "1 night", value: "1" },
                            { label: "2 nights", value: "2" },
                            { label: "1 week", value: "7" },
                          ]}
                        />
                      ),
                    },
                  ]}
                />
              </div>
            }
          />
        </section>

        {/* Example: Controlled */}
        <section aria-labelledby="Wizard-example-2">
          <h2
            id="Wizard-example-2"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Controlled and Compact
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Pass activeStep and onStepChange to own the index, for example to
            sync it with the URL. size="sm" tightens the layout for drawers.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [step, setStep] = useState(1);

<p className="text-sm text-muted-foreground">Current step index: {step}</p>
<Wizard
  size="sm"
  activeStep={step}
  onStepChange={setStep}
  steps={[
    { title: "Upload", content: <p className="text-secondary">Choose a CSV export of your contacts.</p> },
    { title: "Map fields", content: <p className="text-secondary">Match each column to a contact property.</p> },
    { title: "Review", content: <p className="text-secondary">2,148 contacts will be imported.</p> },
  ]}
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <ControlledWizard />
              </div>
            }
          />
        </section>

        {/* Props */}
        <section aria-labelledby="Wizard-props">
          <h2
            id="Wizard-props"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the Wizard component.
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
                {wizardProps.map(([name, type, def, desc]) => (
                  <tr key={name}>
                    <td className="p-3 font-medium text-primary whitespace-nowrap">
                      {name}
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

          <h3 className="text-lg font-semibold mt-8 mb-3 text-white">
            WizardStep
          </h3>
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
                {wizardStepProps.map(([name, type, def, desc]) => (
                  <tr key={name}>
                    <td className="p-3 font-medium text-primary whitespace-nowrap">
                      {name}
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
        <section aria-labelledby="Wizard-a11y">
          <h2
            id="Wizard-a11y"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>
              After every step change, focus moves to the new step heading
              (tabIndex -1), so keyboard and screen reader users land on the
              new content.
            </li>
            <li>
              The content area is a section labelled by the step heading,
              and the heading is a polite live region.
            </li>
            <li>
              The forward button sets aria-busy while validation or
              onFinish runs, and double activation is ignored.
            </li>
            <li>
              Completed steps in the stepper are buttons, so users can jump
              back with Tab and Enter when allowStepClick is on.
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={wizardFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </div>
  );
};

export default WizardDocs;
