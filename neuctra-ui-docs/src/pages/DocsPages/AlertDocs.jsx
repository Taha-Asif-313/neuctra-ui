"use client";

import React from "react";
import { useToast, ToastProvider } from "@neuctra/ui";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import DocsFooter from "../../components/Docs/DocsFooter";
import Metadata from "../../MetaData";
import CodeBlock from "../../components/Docs/CodeBlock";
import { Check, X } from "lucide-react";

const AlertDocsContent = () => {
  const { toast } = useToast();

  return (
    <>
      {/* Import */}
      <section>
        <h2 className="text-2xl font-semibold mb-2 text-white">
          Import Component From Library
        </h2>
        <CodeBlock code={`import { useToast, ToastProvider } from "@neuctra/ui";`} />
      </section>

      {/* Basic Usage */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Basic Usage Code
        </h2>
        <p className="text-gray-300 mb-4">
          Start with a simple toast notification. The component provides a
          global notification system that can be triggered from any component.
        </p>
        <CodeBlock
          language="jsx"
          code={`import { useToast } from '@neuctra/ui';

function BasicExample() {
  const { toast } = useToast();

  const showToast = () => {
    toast('Hello, this is a toast notification!');
  };

  return (
    <button onClick={showToast}>
      Show Toast
    </button>
  );
}`}
        />
      </section>

      {/* Setup */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">Setup</h2>
        <p className="text-gray-200 mb-3">
          The <code>ToastProvider</code> enables a global notification system
          across your application. It manages toast state, rendering, and
          lifecycle internally — allowing you to trigger notifications from any
          component without manually handling UI placement or state.
        </p>

        <p className="text-gray-400 mb-3 text-sm">
          Wrap your root layout once so all child components can access the
          <code>useToast()</code> hook.
        </p>

        <CodeBlock
          language="jsx"
          code={`import { ToastProvider } from "@neuctra/ui";

export default function App({ Component, pageProps }) {
  return (
    <ToastProvider>
      <Component {...pageProps} />
    </ToastProvider>
  );
}`}
        />
      </section>

      {/* Complete Setup */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Complete Setup
        </h2>
        <p className="text-gray-200 mb-3">
          Place <code>ToastProvider</code> at the highest level of your app
          (typically in your layout or root component). This ensures that
          <code>useToast()</code> has access to the shared context regardless of
          where it is used.
        </p>

        <p className="text-gray-400 mb-3 text-sm">
          This pattern avoids prop drilling and keeps your notification logic
          centralized and predictable.
        </p>

        <CodeBlock
          language="jsx"
          code={`import { ToastProvider } from "@neuctra/ui";
import Layout from "./Layout";

function App() {
  return (
    <ToastProvider>
      <Layout />
    </ToastProvider>
  );
}

export default App;
`}
        />
      </section>

      {/* How it Works */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">How it Works</h2>
        <p className="text-gray-200 mb-3">
          Internally, <code>ToastProvider</code> maintains a list of active
          notifications and renders them inside a fixed container positioned at
          the bottom-right of the viewport. Each toast is automatically managed,
          including animation, stacking, and dismissal timing.
        </p>

        <p className="text-gray-400 mb-3 text-sm">
          The <code>useToast()</code> hook exposes a simple API to create and
          control these notifications without interacting with DOM state
          directly.
        </p>

        <ul className="list-disc pl-5 space-y-2 text-gray-200">
          <li>
            <code>toast()</code> accepts either a simple string or a structured
            object.
          </li>
          <li>
            Built-in variants: <code>success</code>, <code>error</code>,{" "}
            <code>warning</code>, <code>info</code>.
          </li>
          <li>
            Toasts auto-dismiss after a default duration (4s), configurable per
            toast.
          </li>
          <li>
            Set <code>duration: 0</code> to persist a toast until manually
            dismissed.
          </li>
          <li>
            Users can close toasts via the close button or <kbd>Escape</kbd>{" "}
            key.
          </li>
        </ul>
      </section>

      {/* Basic Usage */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">Basic Usage</h2>
        <p className="text-gray-200 mb-3">
          Access the toast API using the <code>useToast()</code> hook. This hook
          provides a simple way to trigger notifications in response to user
          actions, API calls, or system events.
        </p>

        <p className="text-gray-400 mb-3 text-sm">
          Ideal for lightweight feedback such as confirmations, errors, or
          status updates.
        </p>

        <CodeBlock
          language="jsx"
          code={`import { useToast } from "@neuctra/ui";

function Example() {
  const { toast } = useToast();

  return (
    <button onClick={() => toast("Hello world!")}>Show toast</button>
  );
}`}
        />
      </section>

      {/* Template Buttons */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Template Buttons
        </h2>

        <p className="text-gray-200 mb-3">
          Pre-built button examples for quickly triggering different toast
          variants. These are useful for testing, prototyping, or copying into
          real UI flows.
        </p>

        <p className="text-gray-400 text-sm mb-4">
          Each button demonstrates a common use case with meaningful messaging
          and proper variant usage.
        </p>

        <CodePreviewBlock
          language="jsx"
          code={`const { toast } = useToast();

<div className="flex flex-wrap gap-3">
  <button onClick={() => toast.success("Saved successfully!")}>
    Success
  </button>

  <button onClick={() => toast.error("Something went wrong!")}>
    Error
  </button>

  <button onClick={() => toast.warning("Be careful!")}>
    Warning
  </button>

  <button onClick={() => toast.info("Here’s some info")}>
    Info
  </button>
</div>`}
          previewContent={
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() =>
                  toast.success("Saved successfully!", {
                    description: "Your changes have been stored.",
                  })
                }
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Success
              </button>

              <button
                onClick={() =>
                  toast.error("Action failed", {
                    description: "Please try again later.",
                  })
                }
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Error
              </button>

              <button
                onClick={() =>
                  toast.warning("Warning", {
                    description: "This action may have consequences.",
                  })
                }
                className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition"
              >
                Warning
              </button>

              <button
                onClick={() =>
                  toast.info("FYI", {
                    description: "This is some helpful information.",
                  })
                }
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Info
              </button>
            </div>
          }
        />
      </section>

      {/* String Shortcut */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">
          String Shortcut
        </h2>
        <p className="text-gray-200 mb-3">
          Passing a string is the quickest way to display a toast. The string is
          automatically used as the description, making it perfect for simple,
          one-line notifications.
        </p>

        <p className="text-gray-400 mb-3 text-sm">
          Use this when you don’t need titles, variants, or advanced
          customization.
        </p>

        <CodeBlock
          language="jsx"
          code={`toast("This is a notification message.");`}
        />
      </section>

      {/* Shorthand Methods */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Shorthand Methods
        </h2>
        <p className="text-gray-200 mb-3">
          Use built-in helper methods for common notification types. These
          methods automatically apply styling, icons, and semantic meaning.
        </p>

        <p className="text-gray-400 mb-3 text-sm">
          This keeps your code concise and ensures visual consistency across
          your application.
        </p>

        <CodeBlock
          language="jsx"
          code={`toast.success("Saved successfully!");
toast.error("Something went wrong!");
toast.warning("Be careful!");
toast.info("Some information");`}
        />
      </section>

      {/* Variants */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">Variants</h2>

        <p className="text-gray-200 mb-3">
          Toasts support three visual styles using the <code>variant</code>{" "}
          prop. This allows you to match different UI themes such as subtle
          feedback, standard UI alerts, or strong emphasis states.
        </p>

        <p className="text-gray-400 text-sm mb-4">
          Each variant works with all types (<code>success</code>,{" "}
          <code>error</code>, <code>warning</code>, <code>info</code>).
        </p>

        <CodePreviewBlock
          language="jsx"
          code={`toast.success("Soft variant", {
  variant: "soft",
  description: "Subtle background with low contrast"
});

toast.success("Light variant", {
  variant: "light",
  description: "Default clean UI style"
});

toast.success("Dark variant", {
  variant: "dark",
  description: "High contrast bold style"
});`}
          previewContent={
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() =>
                  toast.success("Soft variant", {
                    variant: "soft",
                    description: "Subtle background style",
                  })
                }
                className="px-4 py-2 bg-zinc-800 text-white rounded-lg"
              >
                Soft
              </button>

              <button
                onClick={() =>
                  toast.success("Light variant", {
                    variant: "light",
                    description: "Clean default look",
                  })
                }
                className="px-4 py-2 bg-zinc-200 text-black rounded-lg"
              >
                Light
              </button>

              <button
                onClick={() =>
                  toast.success("Dark variant", {
                    variant: "dark",
                    description: "Strong visual emphasis",
                  })
                }
                className="px-4 py-2 bg-black text-white rounded-lg"
              >
                Dark
              </button>
            </div>
          }
        />
      </section>

      {/* Customization */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Customization
        </h2>

        <p className="text-gray-200 mb-3">
          Toasts are fully customizable using className and style overrides. You
          can modify layout, colors, spacing, typography, and even individual
          sections like title, description, and icon.
        </p>

        <p className="text-gray-400 text-sm mb-4">
          This makes the component flexible enough to integrate into any design
          system or branding requirement.
        </p>

        <CodePreviewBlock
          language="jsx"
          code={`toast({
  title: "Custom Toast",
  description: "Fully styled notification",
  type: "info",
  variant: "soft",

  className: "rounded-2xl border border-zinc-700 bg-zinc-900",
  titleClassName: "text-purple-400 font-semibold",
  descriptionClassName: "text-zinc-300",
  iconClassName: "text-purple-500",

  style: { backdropFilter: "blur(10px)" }
});`}
          previewContent={
            <button
              onClick={() =>
                toast({
                  title: "Custom Toast",
                  description: "Fully styled notification",
                  type: "info",
                  variant: "soft",
                  className:
                    "rounded-2xl !border !border-zinc-700 !bg-zinc-900",
                  titleClassName: "!text-purple-400 font-semibold",
                  descriptionClassName: "!text-zinc-300",
                  iconClassName: "!text-purple-500",
                })
              }
              className="px-4 py-2 bg-purple-600 text-white rounded-lg"
            >
              Show Custom Toast
            </button>
          }
        />
      </section>

      {/* Variant Guidelines */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">
          When to Use Each Variant
        </h2>

        <ul className="list-disc pl-5 space-y-2 text-gray-200">
          <li>
            <strong>soft:</strong> Best for subtle feedback, background updates,
            or low-priority notifications.
          </li>
          <li>
            <strong>light:</strong> Default UI usage, clean and balanced for
            most applications.
          </li>
          <li>
            <strong>dark:</strong> High emphasis alerts, critical actions, or
            important system messages.
          </li>
        </ul>
      </section>

      {/* Advanced Usage */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Advanced Usage
        </h2>
        <p className="text-gray-200 mb-3">
          For full control, pass an object to <code>toast()</code>. This allows
          you to define title, description, type, and duration for each
          notification.
        </p>

        <p className="text-gray-400 mb-3 text-sm">
          Useful for complex scenarios such as form submissions, async flows, or
          multi-line messages.
        </p>

        <CodeBlock
          language="jsx"
          code={`toast({
  type: "success",
  title: "Success!",
  description: "Your changes have been saved.",
  duration: 5000,
});`}
        />
      </section>

      {/* Dismiss Control */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Dismiss Control
        </h2>
        <p className="text-gray-200 mb-3">
          In addition to creating toasts, you can programmatically remove them
          using the <code>dismiss</code> function.
        </p>

        <p className="text-gray-400 mb-3 text-sm">
          This is useful when handling navigation changes, undo actions, or
          clearing stale notifications.
        </p>

        <CodeBlock
          language="jsx"
          code={`const { toast, dismiss } = useToast();

toast.success("Saved!", { description: "Will close automatically." });

// dismiss a specific toast
// dismiss(id);

// clear all toasts
// dismiss();`}
        />
      </section>

      {/* Shorthand with Options */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Shorthand with Options
        </h2>
        <p className="text-gray-200 mb-3">
          Combine shorthand methods with additional options for more expressive
          notifications while keeping your code clean.
        </p>

        <p className="text-gray-400 mb-3 text-sm">
          This pattern is ideal for extending simple alerts with extra context.
        </p>

        <CodeBlock
          language="jsx"
          code={`toast.success("Saved!", {
  description: "Your data is safe",
  duration: 6000,
});`}
        />
      </section>
    </>
  );
};

const AlertDocs = () => {
  return (
    <ToastProvider>
      <>
        <Metadata
          title="Toast Component — Neuctra UI"
          description="Modern toast notifications with simple and powerful API."
        />

        <div className="font-primary min-h-screen">
          <div className="space-y-10">
            <header>
              <h1 className="text-4xl font-extrabold mb-3 text-white">
                Toast Component
              </h1>

              <p className="text-sm leading-relaxed">
                The <span className="text-primary font-semibold">Toast</span>{" "}
                component is a lightweight notification system for delivering
                real-time feedback to users. It supports multiple alert types
                like <code>success</code>, <code>error</code>,{" "}
                <code>warning</code>, and <code>info</code>, each with distinct
                styling and icons for clear visual communication.
              </p>

              <p className="text-sm text-gray-300 mt-3 leading-relaxed">
                Use the <code>useToast</code> hook to trigger notifications with
                simple messages or structured content. The system includes
                auto-dismiss behavior, manual dismissal, and stacked positioning
                — making it ideal for async actions, system alerts, and user
                feedback flows.
              </p>
            </header>

            {/* Overview */}
            <section>
              <h2 className="text-2xl font-semibold mb-2 text-white">
                What It Does
              </h2>

              <div className="text-sm text-gray-200 space-y-3">
                <div className="flex gap-3">
                  <Check size={15} className="text-primary" />
                  <div>
                    <strong>Global Notifications:</strong> Trigger toasts from
                    anywhere using context.
                  </div>
                </div>

                <div className="flex gap-3">
                  <Check size={15} className="text-primary" />
                  <div>
                    <strong>Multiple Variants:</strong> Built-in support for
                    success, error, warning, and info states.
                  </div>
                </div>

                <div className="flex gap-3">
                  <Check size={15} className="text-primary" />
                  <div>
                    <strong>Auto Dismiss:</strong> Toasts close automatically
                    with configurable duration.
                  </div>
                </div>

                <div className="flex gap-3">
                  <Check size={15} className="text-primary" />
                  <div>
                    <strong>Stacked Layout:</strong> Multiple notifications
                    appear in a clean vertical stack.
                  </div>
                </div>

                <div className="flex gap-3">
                  <Check size={15} className="text-primary" />
                  <div>
                    <strong>Manual Control:</strong> Close individually or clear
                    all programmatically.
                  </div>
                </div>

                <div className="flex gap-3">
                  <Check size={15} className="text-primary" />
                  <div>
                    <strong>Accessible:</strong> Keyboard (Escape) support and
                    proper ARIA roles.
                  </div>
                </div>
              </div>
            </section>

            {/* Import */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">
                Import Component From Library
              </h2>

              <CodeBlock
                language="tsx"
                code={`import { ToastProvider, useToast } from "@neuctra/ui";`}
              />
            </section>

            <AlertDocsContent />

            {/* Common Mistakes */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                Common Mistakes
              </h2>

              <div className="space-y-4 text-sm text-gray-200">
                <div className="flex items-start gap-2 text-red-500">
                  <X size={16} className="mt-1" />
                  <div>
                    <code>{"useToast()"}</code>
                    <p className="text-gray-200 text-xs mt-1">
                      Hook used without wrapping app in ToastProvider.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-red-500">
                  <X size={16} className="mt-1" />
                  <div>
                    <code>{"toast.success()"}</code>
                    <p className="text-gray-200 text-xs mt-1">
                      Toast won’t render if provider is missing at root.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-red-500">
                  <X size={16} className="mt-1" />
                  <div>
                    <code>{`toast({ duration: "5000" })`}</code>
                    <p className="text-gray-200 text-xs mt-1">
                      Duration must be a number (milliseconds), not a string.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-green-500">
                  <Check size={16} className="mt-1" />
                  <div>
                    <code>{`<ToastProvider><App /></ToastProvider>`}</code>
                    <p className="text-gray-200 text-xs mt-1">
                      Correct setup with global provider.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Pro Tips */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">
                Pro Tips
              </h2>

              <div className="text-gray-200 space-y-3">
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    Use <code>toast.success()</code> for positive feedback after
                    user actions.
                  </li>

                  <li>
                    Keep messages short — toasts should be quick and
                    non-blocking.
                  </li>

                  <li>
                    Use <code>duration: 0</code> for critical alerts that
                    require manual dismissal.
                  </li>

                  <li>
                    Prefer <code>title + description</code> for complex messages
                    instead of long text.
                  </li>

                  <li>
                    Avoid overusing toasts — too many can overwhelm users.
                  </li>

                  <li>
                    Use error toasts for failures, but consider modals for
                    destructive confirmations.
                  </li>
                </ul>
              </div>
            </section>

            <DocsFooter />
          </div>
        </div>
      </>
    </ToastProvider>
  );
};

export default AlertDocs;
