"use client";

import React from "react";
import { useToast, ToastProvider } from "@neuctra/ui";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import DocsFooter from "../../components/Docs/DocsFooter";
import Metadata from "../../MetaData";
import CodeBlock from "../../components/Docs/CodeBlock";

const AlertDocsContent = () => {
  const { toast } = useToast();

  return (
    <>
      {/* Installation */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">Installation</h2>
        <CodeBlock language="bash" code={`npm install @neuctra/ui`} />
      </section>

      {/* Setup */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">Setup</h2>
        <p className="text-gray-400 mb-3">
          Add <code>ToastProvider</code> once at the root of your app to enable
          toasts globally across all pages and components.
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
        <h2 className="text-2xl font-semibold mb-4 text-white">Complete Setup</h2>
        <p className="text-gray-400 mb-3">
          Use <code>ToastProvider</code> at the top-level so <code>useToast()</code>
          can access the toast context from any child component.
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
        <p className="text-gray-400 mb-3">
          <code>ToastProvider</code> keeps a shared list of notifications and
          renders a fixed toast container in the bottom-right corner. The hook
          returns <code>toast</code> helpers and a <code>dismiss</code> method.
        </p>

        <ul className="list-disc pl-5 space-y-2 text-gray-400">
          <li>
            `toast()` accepts either a simple string or an object with options.
          </li>
          <li>
            Built-in variants: <code>success</code>, <code>error</code>,
            <code>warning</code>, <code>info</code>.
          </li>
          <li>
            Toasts auto-dismiss by default, but you can disable this with
            <code>duration: 0</code>.
          </li>
          <li>
            Individual toasts support manual close buttons and Escape key
            dismissal.
          </li>
        </ul>
      </section>

      {/* Basic Usage */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">Basic Usage</h2>
        <p className="text-gray-400 mb-3">
          Use the <code>useToast()</code> hook from any component wrapped by
          <code>ToastProvider</code>.
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

      {/* String Shortcut */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">String Shortcut</h2>
        <p className="text-gray-400 mb-3">
          Passing a string creates a simple toast where the string is used as the
          description.
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
        <p className="text-gray-400 mb-3">
          Trigger typed notifications with built-in helper methods.
        </p>

        <CodeBlock
          language="jsx"
          code={`toast.success("Saved successfully!");
toast.error("Something went wrong!");
toast.warning("Be careful!");
toast.info("Some information");`}
        />
      </section>

      {/* Advanced Usage */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Advanced Usage
        </h2>
        <p className="text-gray-400 mb-3">
          Use the full object API to customize every toast instance.
        </p>

        <CodeBlock
          language="jsx"
          code={`toast({
  type: "success",
  title: "Success!",
  description: "Your changes have been saved.",
  duration: 5000, // in ms, 0 = never auto dismiss
});`}
        />
      </section>

      {/* Dismiss Control */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">Dismiss Control</h2>
        <p className="text-gray-400 mb-3">
          In addition to toast helpers, you can dismiss one toast or clear all
          active notifications.
        </p>

        <CodeBlock
          language="jsx"
          code={`const { toast, dismiss } = useToast();

toast.success("Saved!", { description: "Will close automatically." });

// remove one toast by id
// dismiss(id);

// clear every notification
// dismiss();`}
        />
      </section>

      {/* Shorthand with Options */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Shorthand with Options
        </h2>
        <p className="text-gray-400 mb-3">
          Extend the helper methods with optional properties for more detail.
        </p>

        <CodeBlock
          language="jsx"
          code={`toast.success("Saved!", {
  description: "Your data is safe",
  duration: 6000,
});`}
        />
      </section>

      {/* Interactive Example */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Interactive Example
        </h2>

        <CodePreviewBlock
          language="jsx"
          code={`<>
  toast.success("Success!");
  toast.error("Error!");
  toast.warning("Warning!");
  toast.info("Info!");
</>`}
          previewContent={
            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={() => toast.success("Success!")}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Success
              </button>

              <button
                onClick={() => toast.error("Error!")}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Error
              </button>

              <button
                onClick={() => toast.warning("Warning!")}
                className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition"
              >
                Warning
              </button>

              <button
                onClick={() => toast.info("Info!")}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Info
              </button>
            </div>
          }
        />
      </section>

      {/* API */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">API</h2>

        <div className="overflow-x-auto border border-zinc-800 rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900 text-gray-400">
              <tr>
                <th className="p-3 text-left">Option</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              <tr>
                <td className="p-3">title</td>
                <td className="p-3">string</td>
                <td>Main title displayed in the toast.</td>
              </tr>
              <tr>
                <td className="p-3">description</td>
                <td className="p-3">string</td>
                <td>Optional supporting text.</td>
              </tr>
              <tr>
                <td className="p-3">type</td>
                <td className="p-3">success | error | warning | info</td>
                <td>Visual variant and icon style.</td>
              </tr>
              <tr>
                <td className="p-3">duration</td>
                <td className="p-3">number</td>
                <td>Auto dismiss time in milliseconds. Use 0 to keep toast open.</td>
              </tr>
              <tr>
                <td className="p-3">toast()</td>
                <td className="p-3">function</td>
                <td>Core function that accepts a string or toast object.</td>
              </tr>
              <tr>
                <td className="p-3">toast.success()</td>
                <td className="p-3">function</td>
                <td>Show a success notification quickly.</td>
              </tr>
              <tr>
                <td className="p-3">toast.error()</td>
                <td className="p-3">function</td>
                <td>Show an error notification quickly.</td>
              </tr>
              <tr>
                <td className="p-3">toast.warning()</td>
                <td className="p-3">function</td>
                <td>Show a warning notification quickly.</td>
              </tr>
              <tr>
                <td className="p-3">toast.info()</td>
                <td className="p-3">function</td>
                <td>Show an info notification quickly.</td>
              </tr>
              <tr>
                <td className="p-3">dismiss(id?)</td>
                <td className="p-3">function</td>
                <td>Remove one toast by id or clear all toasts when called without an id.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">Features</h2>

        <ul className="list-disc pl-5 space-y-2 text-gray-400">
          <li>Provider-based toast context with global access.</li>
          <li>Shorthand and object APIs for flexible notifications.</li>
          <li>Auto dismiss with configurable duration.</li>
          <li>Manual close button and Escape key support.</li>
          <li>Stacked notifications in a fixed container.</li>
          <li>Dark mode friendly styling and smooth animations.</li>
        </ul>
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
              <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
                A flexible toast system with both simple and advanced APIs.
                Designed for modern apps with clean UI and smooth animations.
              </p>
            </header>

            <AlertDocsContent />
            <DocsFooter />
          </div>
        </div>
      </>
    </ToastProvider>
  );
};

export default AlertDocs;
