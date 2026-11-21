"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility, Plus, Search, Settings } from "lucide-react";
import { OnboardingTour, Button, IconButton, Card, CardBody } from "@neuctra/ui";

// Recomputed locally rather than imported from ./layout.js (Server Component).
const onboardingTourFaq = buildComponentFaq("OnboardingTour");

const steps = [
  {
    target: '[data-tour="new-project"]',
    title: "Create your first project",
    content: "Projects group your boards, docs and automations in one place.",
    placement: "bottom",
  },
  {
    target: '[data-tour="search"]',
    title: "Find anything fast",
    content: "Search across projects, people and files. Press / from anywhere.",
    placement: "bottom",
  },
  {
    target: '[data-tour="settings"]',
    title: "Invite your team",
    content: "Add teammates and set roles from workspace settings.",
    placement: "left",
  },
];

function AppToolbar({ suffix }) {
  return (
    <Card padding="sm" className="w-full">
      <CardBody className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-foreground">Acme Workspace</p>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" iconBefore={<Plus />} data-tour={`new-project${suffix}`}>
            New project
          </Button>
          <Button size="sm" variant="outline" iconBefore={<Search />} data-tour={`search${suffix}`}>
            Search
          </Button>
          <IconButton
            variant="ghost"
            size="sm"
            icon={<Settings />}
            aria-label="Settings"
            data-tour={`settings${suffix}`}
          />
        </div>
      </CardBody>
    </Card>
  );
}

function BasicTourDemo() {
  const [open, setOpen] = useState(false);
  const [finished, setFinished] = useState(false);
  return (
    <div className="w-full space-y-4">
      <AppToolbar suffix="" />
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
          Start product tour
        </Button>
        {finished && <span className="text-sm text-muted-foreground">Tour completed</span>}
      </div>
      <OnboardingTour
        steps={steps}
        open={open}
        onOpenChange={setOpen}
        onFinish={() => setFinished(true)}
      />
    </div>
  );
}

const customSteps = steps.map((s) => ({ ...s, target: s.target.replace('"]', '-2"]') }));

function ControlledStepDemo() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  return (
    <div className="w-full space-y-4">
      <AppToolbar suffix="-2" />
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="outline" size="sm" onClick={() => { setStep(0); setOpen(true); }}>
          Start tour
        </Button>
        <Button variant="outline" size="sm" onClick={() => { setStep(2); setOpen(true); }}>
          Jump to team setup
        </Button>
        <span className="text-sm text-muted-foreground">Current step: {step + 1}</span>
      </div>
      <OnboardingTour
        steps={customSteps}
        open={open}
        onOpenChange={setOpen}
        step={step}
        onStepChange={setStep}
        showProgress={false}
        closeOnOverlayClick
        labels={{ next: "Continue", finish: "Got it", skip: "Not now" }}
      />
    </div>
  );
}

function PropsTable({ rows }) {
  return (
    <div className="border border-zinc-800 rounded-xl overflow-x-auto">
      <table className="w-full min-w-[640px] text-sm">
        <thead className="bg-zinc-900 text-gray-200">
          <tr>
            <th scope="col" className="text-left p-3">Prop</th>
            <th scope="col" className="text-left p-3">Type</th>
            <th scope="col" className="text-left p-3">Default</th>
            <th scope="col" className="text-left p-3">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800 text-gray-300">
          {rows.map(([name, type, def, desc]) => (
            <tr key={name}>
              <td className="p-3 font-medium text-primary whitespace-nowrap">{name}</td>
              <td className="p-3 font-mono text-xs text-gray-300">{type}</td>
              <td className="p-3 text-gray-400 whitespace-nowrap">{def}</td>
              <td className="p-3">{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const tourProps = [
  ["steps", "TourStep[]", "-", "Ordered steps (required)."],
  ["open", "boolean", "-", "Controlled open state."],
  ["defaultOpen", "boolean", "false", "Initial open state in uncontrolled mode."],
  ["onOpenChange", "(open: boolean) => void", "-", "Fired when the tour opens or closes."],
  ["step", "number", "-", "Controlled current step index."],
  ["onStepChange", "(step: number) => void", "-", "Fired when the step changes."],
  ["onFinish", "() => void", "-", "Called after the last step is finished."],
  ["spotlight", "boolean", "true", "Dims the page with a cut-out window around the target."],
  ["spotlightPadding", "number", "4", "Space in pixels between the target and the spotlight edge."],
  ["showSkip", "boolean", "true", "Shows a Skip button (hidden on the last step)."],
  ["showBack", "boolean", "true", "Shows a Back button."],
  ["showProgress", "boolean", "true", "Shows step progress dots."],
  ["closeOnEscape", "boolean", "true", "Closes the tour with Escape."],
  ["closeOnOverlayClick", "boolean", "false", "Closes the tour when the backdrop is clicked."],
  ["labels", "{ next?, back?, skip?, finish?, close?: string }", "-", "Overrides the button labels."],
  ["className", "string", "-", "Styles the tooltip card."],
  ["style", "CSSProperties", "-", "Inline styles for the tooltip card."],
  ["overlayClassName", "string", "-", "Styles the backdrop."],
  ["spotlightClassName", "string", "-", "Styles the spotlight ring."],
];

const stepProps = [
  ["target", "string", "-", "CSS selector of the element to highlight (required). The card centers if nothing matches."],
  ["title", "ReactNode", "-", "Step heading (required)."],
  ["content", "ReactNode", "-", "Step body (required)."],
  ["placement", '"top" | "bottom" | "left" | "right"', '"bottom"', "Preferred side; flips when there is no room."],
];

const OnboardingTourDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            OnboardingTour Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            A guided product walkthrough that anchors a tooltip card to real
            elements, dims the rest of the page with a spotlight, and supports
            keyboard navigation, controlled steps and custom labels.
          </p>
        </header>

        <section aria-labelledby="OnboardingTour-import">
          <h2 id="OnboardingTour-import" className="text-xl sm:text-2xl font-semibold mb-3 text-white">
            Import
          </h2>
          <CodeBlock code={`import { OnboardingTour } from "@neuctra/ui";`} />
        </section>

        <section aria-labelledby="OnboardingTour-example-0">
          <h2 id="OnboardingTour-example-0" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Mark targets with a data attribute and reference them by selector.
            The target is scrolled into view and the card flips to stay on screen.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const steps = [
  { target: '[data-tour="new-project"]', title: "Create your first project", content: "Projects group your boards, docs and automations in one place.", placement: "bottom" },
  { target: '[data-tour="search"]', title: "Find anything fast", content: "Search across projects, people and files. Press / from anywhere.", placement: "bottom" },
  { target: '[data-tour="settings"]', title: "Invite your team", content: "Add teammates and set roles from workspace settings.", placement: "left" },
];

const [open, setOpen] = useState(false);
const [finished, setFinished] = useState(false);

<div className="w-full space-y-4">
  <Card padding="sm" className="w-full">
    <CardBody className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm font-semibold text-foreground">Acme Workspace</p>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" iconBefore={<Plus />} data-tour="new-project">New project</Button>
        <Button size="sm" variant="outline" iconBefore={<Search />} data-tour="search">Search</Button>
        <IconButton variant="ghost" size="sm" icon={<Settings />} aria-label="Settings" data-tour="settings" />
      </div>
    </CardBody>
  </Card>
  <div className="flex items-center gap-3">
    <Button variant="outline" size="sm" onClick={() => setOpen(true)}>Start product tour</Button>
    {finished && <span className="text-sm text-muted-foreground">Tour completed</span>}
  </div>
  <OnboardingTour steps={steps} open={open} onOpenChange={setOpen} onFinish={() => setFinished(true)} />
</div>`}
            previewContent={
              <div className="w-full py-4">
                <BasicTourDemo />
              </div>
            }
          />
        </section>

        <section aria-labelledby="OnboardingTour-example-1">
          <h2 id="OnboardingTour-example-1" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Controlled Steps and Custom Labels
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Control step to resume a tour or jump to a section. labels renames
            the buttons; closeOnOverlayClick lets users dismiss by clicking the
            backdrop.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [open, setOpen] = useState(false);
const [step, setStep] = useState(0);

<div className="flex flex-wrap items-center gap-3">
  <Button variant="outline" size="sm" onClick={() => { setStep(0); setOpen(true); }}>Start tour</Button>
  <Button variant="outline" size="sm" onClick={() => { setStep(2); setOpen(true); }}>Jump to team setup</Button>
  <span className="text-sm text-muted-foreground">Current step: {step + 1}</span>
</div>
<OnboardingTour
  steps={steps}
  open={open}
  onOpenChange={setOpen}
  step={step}
  onStepChange={setStep}
  showProgress={false}
  closeOnOverlayClick
  labels={{ next: "Continue", finish: "Got it", skip: "Not now" }}
/>`}
            previewContent={
              <div className="w-full py-4">
                <ControlledStepDemo />
              </div>
            }
          />
        </section>

        <section aria-labelledby="OnboardingTour-example-2">
          <h2 id="OnboardingTour-example-2" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Show Once Per User
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            A common pattern: open the tour on first visit and remember
            completion. Read storage in an effect so server rendering stays safe.
          </p>
          <CodeBlock
            code={`const [open, setOpen] = useState(false);

useEffect(() => {
  if (!localStorage.getItem("tour-done")) setOpen(true);
}, []);

const markDone = () => localStorage.setItem("tour-done", "1");

<OnboardingTour
  steps={steps}
  open={open}
  onOpenChange={(next) => {
    setOpen(next);
    if (!next) markDone();
  }}
/>`}
          />
        </section>

        <section aria-labelledby="OnboardingTour-props">
          <h2 id="OnboardingTour-props" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">All available props for the OnboardingTour component.</p>
          <PropsTable rows={tourProps} />
        </section>

        <section aria-labelledby="TourStep-props">
          <h2 id="TourStep-props" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            TourStep
          </h2>
          <p className="text-sm text-gray-400 mb-4">Shape of each entry in steps.</p>
          <PropsTable rows={stepProps} />
        </section>

        <section aria-labelledby="OnboardingTour-a11y">
          <h2 id="OnboardingTour-a11y" className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white">
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>The card is a role="dialog" with aria-modal, labelled by the step title and described by its content.</li>
            <li>Focus is trapped in the card while open and returns to the element that opened the tour.</li>
            <li>Escape closes the tour; Arrow Right and Arrow Left move to the next and previous step.</li>
            <li>"Step 2 of 3" is a polite live region, so step changes are announced.</li>
            <li>Page scroll is locked while open, and animations are removed under prefers-reduced-motion.</li>
          </ul>
        </section>

        <ComponentFaq qa={onboardingTourFaq} />
        <DocsFooter />
      </div>
    </div>
  );
};

export default OnboardingTourDocs;
