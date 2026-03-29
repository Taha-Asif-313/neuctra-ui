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
        <CodePreviewBlock language="bash" code={`npm install @neuctra/ui`} />
      </section>

      {/* Setup */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">Setup</h2>
        <p className="text-gray-400 mb-3">
          Wrap your app with <code>ToastProvider</code> to enable toasts
          globally.
        </p>

        <CodeBlock
          language="jsx"
          code={`import { ToastProvider } from "@neuctra/ui";

export default function App() {
  return (
    <ToastProvider>
      <YourApp />
    </ToastProvider>
  );
}`}
        />
      </section>

      {/* Basic Usage */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">Basic Usage</h2>

        <p className="text-gray-400 mb-3">
          Use the <code>useToast()</code> hook anywhere in your app.
        </p>

        <CodeBlock
          language="jsx"
          code={`const { toast } = useToast();

toast("Hello world");`}
        />
      </section>

      {/* Shorthand Methods */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Shorthand Methods
        </h2>

        <p className="text-gray-400 mb-3">
          Quickly trigger styled toasts using helper methods:
        </p>

        <CodeBlock
          language="jsx"
          code={`toast.success("Saved successfully!");
toast.error("Something went wrong");
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
          Use full control with the object API:
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

      {/* With Options */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Shorthand with Options
        </h2>

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
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
              >
                Success
              </button>

              <button
                onClick={() => toast.error("Error!")}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Error
              </button>

              <button
                onClick={() => toast.warning("Warning!")}
                className="px-4 py-2 bg-yellow-400 text-black rounded-lg"
              >
                Warning
              </button>

              <button
                onClick={() => toast.info("Info!")}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
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
                <td>Main title</td>
              </tr>
              <tr>
                <td className="p-3">description</td>
                <td className="p-3">string</td>
                <td>Optional message</td>
              </tr>
              <tr>
                <td className="p-3">type</td>
                <td className="p-3">success | error | warning | info</td>
                <td>Toast variant</td>
              </tr>
              <tr>
                <td className="p-3">duration</td>
                <td className="p-3">number</td>
                <td>Auto dismiss time (ms). Use 0 to disable</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">Features</h2>

        <ul className="list-disc pl-5 space-y-2 text-gray-400">
          <li>Simple API: function + shorthand methods</li>
          <li>Auto dismiss with configurable duration</li>
          <li>Manual close support</li>
          <li>Escape key dismiss</li>
          <li>Stacked notifications</li>
          <li>Smooth animations</li>
          <li>Dark mode ready</li>
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

        <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
          <div className="max-w-5xl mx-auto px-4 space-y-10">
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
