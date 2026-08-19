"use client";

import React from "react";
import { toast, ToastProvider } from "@neuctra/ui";
import CodePreviewBlock from "../components/CodePreviewBlock";
import DocsFooter from "../components/DocsFooter";
import Metadata from "../../../MetaData";
import CodeBlock from "../components/CodeBlock";
import { Check, X } from "lucide-react";

const AlertDocsContent = () => {
  return (
    <>
      {/* Import */}
      <section>
        <h2 className="text-2xl font-semibold mb-2 text-white">
          Import Component From Library
        </h2>
        <p className="text-gray-300 mb-4">
          <code>toast</code> is a standalone function — import it and call it
          from anywhere: event handlers, API clients, utility files. No hook,
          no component wrapper required at the call site (only{" "}
          <code>{"<ToastProvider>"}</code> needs to be mounted once, to
          render the toasts — see Setup below).
        </p>
        <CodeBlock code={`import { toast, ToastProvider } from "@neuctra/ui";`} />
      </section>

      {/* Basic Usage */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Basic Usage Code
        </h2>
        <p className="text-gray-300 mb-4">
          Call <code>toast()</code> directly — this is the whole API for the
          simple case.
        </p>
        <CodeBlock
          language="jsx"
          code={`import { toast } from '@neuctra/ui';

function BasicExample() {
  return (
    <button onClick={() => toast('Hello, this is a toast notification!')}>
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
          <code>ToastProvider</code> renders the toast viewport — mount it{" "}
          <strong>once</strong> near your app root, the same way you'd mount
          a single <code>{"<Toaster />"}</code> in react-hot-toast. It
          doesn't wrap your app in a context you need to opt into:{" "}
          <code>toast()</code> works even in files that never import React,
          as long as a <code>ToastProvider</code> is mounted <em>somewhere</em>{" "}
          in the tree to actually render the notifications.
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

      {/* How it Works */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">How it Works</h2>
        <p className="text-gray-200 mb-3">
          Toasts live in a small module-level store, not React context —
          the same architecture react-hot-toast uses internally. That's
          what makes <code>toast()</code> callable from anywhere:{" "}
          <code>{"<ToastProvider>"}</code> just subscribes to that store and
          renders whatever's in it.
        </p>

        <ul className="list-disc pl-5 space-y-2 text-gray-200">
          <li>
            <code>toast()</code> accepts either a simple string or a
            structured object, and always returns the toast's{" "}
            <code>id</code>.
          </li>
          <li>
            Shorthand methods: <code>toast.success()</code>,{" "}
            <code>toast.error()</code>, <code>toast.warning()</code>,{" "}
            <code>toast.info()</code>, <code>toast.loading()</code>.
          </li>
          <li>
            <code>toast.promise()</code> turns a loading toast into
            success/error automatically once a promise settles.
          </li>
          <li>
            Toasts auto-dismiss after a default duration (4s), configurable
            per toast. <code>loading</code> toasts persist (
            <code>duration: 0</code>) until you resolve or dismiss them.
          </li>
          <li>
            Pass the same <code>id</code> back into a later <code>toast()</code>{" "}
            call to update a toast in place instead of stacking a new one —
            this is exactly what <code>toast.promise()</code> does under the
            hood.
          </li>
          <li>
            Users can close toasts via the close button; if you also use{" "}
            <code>useToast()</code>, it returns the identical global{" "}
            <code>toast</code>/<code>dismiss</code> — both APIs stay in sync.
          </li>
        </ul>
      </section>

      {/* Template Buttons */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Template Buttons
        </h2>

        <p className="text-gray-200 mb-3">
          Pre-built button examples for quickly triggering different toast
          types. These are useful for testing, prototyping, or copying into
          real UI flows.
        </p>

        <CodePreviewBlock
          language="jsx"
          code={`import { toast } from "@neuctra/ui";

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

  <button onClick={() => toast.info("Here's some info")}>
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

      {/* Loading & Promises */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Loading & Promises
        </h2>

        <p className="text-gray-200 mb-3">
          The signature react-hot-toast pattern: show a spinner toast for an
          async action, then let it morph into success or error automatically
          — no manual dismiss-and-replace bookkeeping.
        </p>

        <CodePreviewBlock
          language="jsx"
          code={`toast.promise(
  saveUser(data),
  {
    loading: "Saving...",
    success: "Saved successfully!",
    // or a function: (data) => \`Saved \${data.name}!\`
    error: "Could not save.",
  }
);`}
          previewContent={
            <button
              onClick={() =>
                toast.promise(
                  new Promise((resolve, reject) =>
                    setTimeout(() => (Math.random() > 0.3 ? resolve() : reject()), 1800),
                  ),
                  {
                    loading: "Saving...",
                    success: "Saved successfully!",
                    error: "Could not save — try again.",
                  },
                )
              }
              className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition"
            >
              Simulate Save
            </button>
          }
        />

        <p className="text-gray-400 text-sm mt-4 mb-3">
          For finer control, drive the same in-place update manually with{" "}
          <code>toast.loading()</code> and a matched <code>id</code>:
        </p>

        <CodeBlock
          language="jsx"
          code={`const id = toast.loading("Uploading file...");

try {
  await uploadFile(file);
  toast.success("File uploaded!", { id });
} catch {
  toast.error("Upload failed.", { id });
}`}
        />
      </section>

      {/* String Shortcut */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">
          String Shortcut
        </h2>
        <p className="text-gray-200 mb-3">
          Passing a string is the quickest way to display a toast. The string
          is automatically used as the description, making it perfect for
          simple, one-line notifications.
        </p>

        <p className="text-gray-400 mb-3 text-sm">
          Use this when you don't need titles, types, or advanced
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

        <CodeBlock
          language="jsx"
          code={`toast.success("Saved successfully!");
toast.error("Something went wrong!");
toast.warning("Be careful!");
toast.info("Some information");
toast.loading("Working on it...");`}
        />
      </section>

      {/* Position */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">Position</h2>

        <p className="text-gray-200 mb-3">
          Set where the toast stack anchors on <code>ToastProvider</code>.
          Defaults to <code>"bottom-right"</code>.
        </p>

        <CodeBlock
          language="jsx"
          code={`<ToastProvider position="top-right">
  <App />
</ToastProvider>`}
        />

        <p className="text-gray-400 text-sm mt-3">
          Options: <code>top-left</code>, <code>top-center</code>,{" "}
          <code>top-right</code>, <code>bottom-left</code>,{" "}
          <code>bottom-center</code>, <code>bottom-right</code>.
        </p>
      </section>

      {/* Variants */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">Variants</h2>

        <p className="text-gray-200 mb-3">
          <code>variant</code> controls surface emphasis, independent of{" "}
          <code>type</code> (success/error/warning/info/loading). The
          default, <code>"light"</code>, is a clean neutral card with only
          the icon carrying color — matching react-hot-toast's look.{" "}
          <code>"soft"</code> and <code>"dark"</code> are opt-in for when the
          whole toast should read as its status at a glance.
        </p>

        <CodePreviewBlock
          language="jsx"
          code={`toast.success("Light variant (default)", {
  variant: "light",
  description: "Neutral card, colored icon only",
});

toast.success("Soft variant", {
  variant: "soft",
  description: "Tinted background matching the status",
});

toast.success("Dark variant", {
  variant: "dark",
  description: "Solid status surface, high emphasis",
});`}
          previewContent={
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() =>
                  toast.success("Light variant (default)", {
                    variant: "light",
                    description: "Neutral card, colored icon only",
                  })
                }
                className="px-4 py-2 bg-zinc-200 text-black rounded-lg"
              >
                Light
              </button>

              <button
                onClick={() =>
                  toast.success("Soft variant", {
                    variant: "soft",
                    description: "Tinted background style",
                  })
                }
                className="px-4 py-2 bg-zinc-800 text-white rounded-lg"
              >
                Soft
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
          Toasts are fully customizable using className and style overrides,
          down to individual sections like title, description, and icon —
          and <code>icon</code> lets you swap in any custom node in place of
          the default type icon (pass <code>icon: null</code> to render no
          icon at all).
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
            <strong>light (default):</strong> Everyday feedback — the clean,
            neutral look that fits most apps out of the box.
          </li>
          <li>
            <strong>soft:</strong> When the status itself is the point —
            subtle tinted feedback, background updates.
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
          For full control, pass an object to <code>toast()</code>. This
          allows you to define title, description, type, and duration for
          each notification.
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
          Every <code>toast()</code> call returns the toast's <code>id</code>{" "}
          — capture it to dismiss that specific toast later, or call{" "}
          <code>toast.dismiss()</code> with no arguments to clear everything.
        </p>

        <CodeBlock
          language="jsx"
          code={`import { toast } from "@neuctra/ui";

const id = toast.success("Saved!", { description: "Will close automatically." });

// dismiss that specific toast early
toast.dismiss(id);

// clear all toasts
toast.dismiss();`}
        />

        <p className="text-gray-400 mt-3 text-sm">
          If you're using the hook instead, <code>useToast()</code> exposes
          the identical function as <code>dismiss</code>:{" "}
          <code>{"const { toast, dismiss } = useToast();"}</code>
        </p>
      </section>

      {/* Shorthand with Options */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Shorthand with Options
        </h2>
        <p className="text-gray-200 mb-3">
          Combine shorthand methods with additional options for more
          expressive notifications while keeping your code clean.
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
          title="React Toast Notifications & useToast Hook | Neuctra UI"
          description="Create react-hot-toast-style toast notifications in React with Neuctra UI. Standalone toast() import, loading/promise support, position control, success/error/warning/info types, and full customization."
          keywords="react toast, toast notifications react, react-hot-toast alternative, useToast hook, notification component, react alerts, toast provider, toast promise, toast loading, react ui library, success notification, error notification, neuctra ui"
        />

        <div className="font-primary min-h-screen">
          <div className="space-y-10">
            <header>
              <h1 className="text-4xl font-extrabold mb-3 text-white">
                Toast Component
              </h1>

              <p className="text-sm leading-relaxed">
                The <span className="text-primary font-semibold">Toast</span>{" "}
                component is a lightweight, react-hot-toast-style
                notification system. Call <code>toast()</code> from anywhere
                — no hook required — to trigger <code>success</code>,{" "}
                <code>error</code>, <code>warning</code>, <code>info</code>,
                or <code>loading</code> notifications, each with distinct
                styling and icons for clear visual communication.
              </p>

              <p className="text-sm text-gray-300 mt-3 leading-relaxed">
                Built around a global store rather than React context, so{" "}
                <code>toast()</code> works from event handlers, API clients,
                and utility files alike. Includes auto-dismiss, manual
                dismissal, <code>toast.promise()</code> for async flows, and
                configurable stack position — making it ideal for async
                actions, system alerts, and user feedback flows.
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
                    <strong>Import Anywhere:</strong> <code>toast()</code> is
                    a standalone function — call it outside components, no
                    hook required.
                  </div>
                </div>

                <div className="flex gap-3">
                  <Check size={15} className="text-primary" />
                  <div>
                    <strong>Async-First:</strong> <code>toast.promise()</code>{" "}
                    turns a loading toast into success/error automatically.
                  </div>
                </div>

                <div className="flex gap-3">
                  <Check size={15} className="text-primary" />
                  <div>
                    <strong>Five Types:</strong> Built-in support for
                    success, error, warning, info, and loading states.
                  </div>
                </div>

                <div className="flex gap-3">
                  <Check size={15} className="text-primary" />
                  <div>
                    <strong>Configurable Position:</strong> Anchor the stack
                    to any corner or edge-center.
                  </div>
                </div>

                <div className="flex gap-3">
                  <Check size={15} className="text-primary" />
                  <div>
                    <strong>Auto Dismiss:</strong> Toasts close automatically
                    with configurable duration; loading toasts persist until
                    resolved.
                  </div>
                </div>

                <div className="flex gap-3">
                  <Check size={15} className="text-primary" />
                  <div>
                    <strong>Manual Control:</strong> Close individually
                    (by id) or clear all programmatically.
                  </div>
                </div>

                <div className="flex gap-3">
                  <Check size={15} className="text-primary" />
                  <div>
                    <strong>Accessible:</strong> Proper ARIA live-region and
                    role semantics (errors interrupt, everything else waits).
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
                code={`import { toast, ToastProvider } from "@neuctra/ui";
// Prefer a hook instead? useToast() returns the identical toast/dismiss.
// import { useToast, ToastProvider } from "@neuctra/ui";`}
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
                    <code>{"toast('Hello')"}</code> with no{" "}
                    <code>{"<ToastProvider>"}</code> mounted anywhere
                    <p className="text-gray-200 text-xs mt-1">
                      This no longer throws — the call succeeds, but nothing
                      renders. Mount <code>ToastProvider</code> once near
                      your app root so there's somewhere for toasts to show
                      up.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-red-500">
                  <X size={16} className="mt-1" />
                  <div>
                    <code>{`<ToastProvider>`}</code> mounted more than once
                    <p className="text-gray-200 text-xs mt-1">
                      Every provider renders the same global toast list —
                      mounting two shows every toast twice, the same caveat
                      react-hot-toast's <code>{"<Toaster />"}</code> has.
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
                      Mounted once, near the root — correct setup.
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
                    Reach for <code>toast.promise()</code> for any async
                    action instead of manually pairing a loading toast with
                    a follow-up dismiss — one call, no id bookkeeping.
                  </li>

                  <li>
                    Use <code>toast.success()</code> for positive feedback
                    after user actions.
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
                    Prefer <code>title + description</code> for complex
                    messages instead of long text.
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
