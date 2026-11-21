"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility } from "lucide-react";
import { ErrorBoundary, Button, Card, CardBody, Callout, ToggleGroup } from "@neuctra/ui";

// Recomputed locally rather than imported from ./layout.js (Server Component).
const errorBoundaryFaq = buildComponentFaq("ErrorBoundary");

function RevenueWidget({ broken }) {
  if (broken) throw new Error("Failed to parse revenue response: unexpected token < in JSON");
  return (
    <Card>
      <CardBody>
        <p className="text-xs font-medium text-muted-foreground">Revenue this month</p>
        <p className="mt-1 text-2xl font-bold tabular-nums text-foreground">$48,210</p>
      </CardBody>
    </Card>
  );
}

function DefaultFallbackDemo() {
  const [broken, setBroken] = useState(false);
  return (
    <div className="w-full max-w-md space-y-3">
      <Button size="sm" variant="outline" onClick={() => setBroken(true)} disabled={broken}>
        Break the widget
      </Button>
      <ErrorBoundary showDetails onReset={() => setBroken(false)}>
        <RevenueWidget broken={broken} />
      </ErrorBoundary>
    </div>
  );
}

function CustomFallbackDemo() {
  const [broken, setBroken] = useState(false);
  return (
    <div className="w-full max-w-md space-y-3">
      <Button size="sm" variant="outline" onClick={() => setBroken(true)} disabled={broken}>
        Simulate API error
      </Button>
      <ErrorBoundary
        onReset={() => setBroken(false)}
        fallback={(error, reset) => (
          <Callout type="error" title="Revenue is unavailable">
            <p>{error.message}</p>
            <Button size="xs" variant="outline" onClick={reset} className="mt-3">
              Reload widget
            </Button>
          </Callout>
        )}
      >
        <RevenueWidget broken={broken} />
      </ErrorBoundary>
    </div>
  );
}

const reports = ["Q1", "Q2", "Q3"];

function ResetKeysDemo() {
  const [report, setReport] = useState("Q1");
  return (
    <div className="w-full max-w-md space-y-3">
      <ToggleGroup
        aria-label="Report"
        size="sm"
        value={report}
        onChange={(value) => value && setReport(value)}
        options={reports.map((r) => ({ value: r, label: `${r} report` }))}
      />
      <ErrorBoundary resetKeys={[report]} title={`The ${report} report failed to load`} description="Pick another report or try again later.">
        <RevenueWidget broken={report === "Q2"} />
      </ErrorBoundary>
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

const boundaryProps = [
  ["children", "ReactNode", "-", "Content to protect (required)."],
  ["fallback", "ReactNode | ((error: Error, reset: () => void) => ReactNode)", "-", "Custom error UI: a node or a render function."],
  ["onError", "(error: Error, info: ErrorInfo) => void", "-", "Called with the error and component stack, e.g. to report it."],
  ["onReset", "() => void", "-", "Called after a reset (retry button, reset() or resetKeys)."],
  ["resetKeys", "unknown[]", "-", "When any value changes, a caught error is cleared."],
  ["title", "ReactNode", '"Something went wrong"', "Heading of the default fallback."],
  ["description", "ReactNode", '"An unexpected error occurred. You can try again."', "Body of the default fallback."],
  ["retryLabel", "ReactNode", '"Try again"', "Retry button label of the default fallback."],
  ["showDetails", "boolean", "false", "Shows the error message in the default fallback."],
  ["className", "string", "-", "Styles the wrapper around children or the fallback."],
  ["style", "CSSProperties", "-", "Inline styles for the wrapper."],
  ["fallbackClassName", "string", "-", "Styles the default fallback panel (a Neuctra Card)."],
];

const ErrorBoundaryDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            ErrorBoundary Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            Catches render errors in part of the tree so one broken widget does
            not blank the whole page. Shows a themed fallback with retry,
            accepts custom fallbacks, and resets automatically when keys change.
          </p>
        </header>

        <section aria-labelledby="ErrorBoundary-import">
          <h2 id="ErrorBoundary-import" className="text-xl sm:text-2xl font-semibold mb-3 text-white">
            Import
          </h2>
          <CodeBlock code={`import { ErrorBoundary } from "@neuctra/ui";`} />
        </section>

        <section aria-labelledby="ErrorBoundary-example-0">
          <h2 id="ErrorBoundary-example-0" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Default Fallback
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Wrap a risky widget. The retry button clears the error; onReset is
            where you fix the cause (here, the broken flag).
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`function RevenueWidget({ broken }) {
  if (broken) throw new Error("Failed to parse revenue response: unexpected token < in JSON");
  return (
    <Card>
      <CardBody>
        <p className="text-xs font-medium text-muted-foreground">Revenue this month</p>
        <p className="mt-1 text-2xl font-bold tabular-nums text-foreground">$48,210</p>
      </CardBody>
    </Card>
  );
}

const [broken, setBroken] = useState(false);

<div className="w-full max-w-md space-y-3">
  <Button size="sm" variant="outline" onClick={() => setBroken(true)} disabled={broken}>
    Break the widget
  </Button>
  <ErrorBoundary showDetails onReset={() => setBroken(false)}>
    <RevenueWidget broken={broken} />
  </ErrorBoundary>
</div>`}
            previewContent={
              <div className="w-full py-4">
                <DefaultFallbackDemo />
              </div>
            }
          />
        </section>

        <section aria-labelledby="ErrorBoundary-example-1">
          <h2 id="ErrorBoundary-example-1" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Custom Fallback
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Pass a render function to get the error and a reset callback, or a
            plain node for a static fallback.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [broken, setBroken] = useState(false);

<div className="w-full max-w-md space-y-3">
  <Button size="sm" variant="outline" onClick={() => setBroken(true)} disabled={broken}>
    Simulate API error
  </Button>
  <ErrorBoundary
    onReset={() => setBroken(false)}
    fallback={(error, reset) => (
      <Callout type="error" title="Revenue is unavailable">
        <p>{error.message}</p>
        <Button size="xs" variant="outline" onClick={reset} className="mt-3">
          Reload widget
        </Button>
      </Callout>
    )}
  >
    <RevenueWidget broken={broken} />
  </ErrorBoundary>
</div>`}
            previewContent={
              <div className="w-full py-4">
                <CustomFallbackDemo />
              </div>
            }
          />
        </section>

        <section aria-labelledby="ErrorBoundary-example-2">
          <h2 id="ErrorBoundary-example-2" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Reset on Navigation
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            resetKeys clears the error when a value changes, such as the
            selected report or the route. The Q2 report always fails here.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const reports = ["Q1", "Q2", "Q3"];
const [report, setReport] = useState("Q1");

<div className="w-full max-w-md space-y-3">
  <ToggleGroup
    aria-label="Report"
    size="sm"
    value={report}
    onChange={(value) => value && setReport(value)}
    options={reports.map((r) => ({ value: r, label: \`\${r} report\` }))}
  />
  <ErrorBoundary
    resetKeys={[report]}
    title={\`The \${report} report failed to load\`}
    description="Pick another report or try again later."
  >
    <RevenueWidget broken={report === "Q2"} />
  </ErrorBoundary>
</div>`}
            previewContent={
              <div className="w-full py-4">
                <ResetKeysDemo />
              </div>
            }
          />
        </section>

        <section aria-labelledby="ErrorBoundary-example-3">
          <h2 id="ErrorBoundary-example-3" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Reporting Errors
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Use onError to send the error and component stack to your
            monitoring service.
          </p>
          <CodeBlock
            code={`<ErrorBoundary
  onError={(error, info) => {
    reportError({ message: error.message, stack: info.componentStack });
  }}
>
  <BillingPage />
</ErrorBoundary>`}
          />
        </section>

        <section aria-labelledby="ErrorBoundary-props">
          <h2 id="ErrorBoundary-props" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">All available props for the ErrorBoundary component.</p>
          <PropsTable rows={boundaryProps} />
        </section>

        <section aria-labelledby="ErrorBoundary-a11y">
          <h2 id="ErrorBoundary-a11y" className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white">
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>The default fallback is a role="alert", so screen readers announce the failure when it appears.</li>
            <li>The retry action is a native button with a visible focus ring.</li>
            <li>The warning icon is decorative and aria-hidden; the title and description carry the meaning.</li>
            <li>Custom fallbacks should keep a clear message and a way to recover.</li>
            <li>Error boundaries only catch render and lifecycle errors, not errors in event handlers or async code.</li>
          </ul>
        </section>

        <ComponentFaq qa={errorBoundaryFaq} />
        <DocsFooter />
      </div>
    </div>
  );
};

export default ErrorBoundaryDocs;
