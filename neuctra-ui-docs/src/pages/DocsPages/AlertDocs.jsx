"use client";

import React, { useState } from "react";
import { useToast, ToastProvider } from "@neuctra/ui"; // adjust import if needed
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import DocsFooter from "../../components/Docs/DocsFooter";
import Metadata from "../../MetaData";

const AlertDocsContent = () => {
  const { addToast } = useToast();

  return (
    <>
      {/* Interactive Example */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Trigger Alerts
        </h2>
        <p className="text-gray-300 mb-3">
          Click a button to show an alert. Alerts will automatically disappear after a few seconds.
        </p>

        <CodePreviewBlock
          language="jsx"
          code={`<>
  <button onClick={() => addToast({ type: 'success', title: 'Success!', description: 'Your action worked.' })}>
    Show Success
  </button>
  <button onClick={() => addToast({ type: 'error', title: 'Error!', description: 'Something went wrong.' })}>
    Show Error
  </button>
</>`}
          previewContent={
            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={() =>
                  addToast({
                    type: "success",
                    title: "Success!",
                    description: "Your action worked.",
                    duration: 4000,
                  })
                }
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                Show Success
              </button>
              <button
                onClick={() =>
                  addToast({
                    type: "error",
                    title: "Error!",
                    description: "Something went wrong.",
                    duration: 4000,
                  })
                }
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Show Error
              </button>
              <button
                onClick={() =>
                  addToast({
                    type: "warning",
                    title: "Warning!",
                    description: "Check this carefully.",
                  })
                }
                className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500 transition"
              >
                Show Warning
              </button>
              <button
                onClick={() =>
                  addToast({
                    type: "info",
                    title: "Info",
                    description: "Here is some information.",
                  })
                }
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Show Info
              </button>
            </div>
          }
        />
      </section>

      {/* Props Table */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">All Props (Explained Simply)</h2>
        <p className="text-gray-400 mb-3">
          Use these options to control how alerts look and behave.
        </p>
        <div className="overflow-x-auto border border-zinc-800 rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900 text-gray-400">
              <tr>
                <th className="p-3 text-left">Prop</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">What it does</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              <tr>
                <td className="p-3">title</td>
                <td className="p-3">string</td>
                <td>Heading text for the alert</td>
              </tr>
              <tr>
                <td className="p-3">description</td>
                <td className="p-3">string</td>
                <td>Extra text or message below the title</td>
              </tr>
              <tr>
                <td className="p-3">type</td>
                <td className="p-3">"success" | "error" | "warning" | "info"</td>
                <td>Choose the alert type which changes color and icon</td>
              </tr>
              <tr>
                <td className="p-3">duration</td>
                <td className="p-3">number</td>
                <td>Time in milliseconds before alert disappears automatically (0 = never auto-close)</td>
              </tr>
              <tr>
                <td className="p-3">dismissible</td>
                <td className="p-3">boolean</td>
                <td>If true, shows a close button for manual dismissal</td>
              </tr>
              <tr>
                <td className="p-3">onClose</td>
                <td className="p-3">function</td>
                <td>Function to run when the alert is closed</td>
              </tr>
              <tr>
                <td className="p-3">position</td>
                <td className="p-3">string</td>
                <td>Where the alert appears on the screen (top-left, top-right, bottom-left, bottom-right)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

const AlertDocs = () => {
  return (
    <ToastProvider>
      <>
        <Metadata
          title="Alert Component — Neuctra UI"
          description="Learn how to create alerts in Neuctra UI — for success, error, warning, and info messages."
          keywords="Neuctra UI Alert, React Alert component, notifications, toast messages, UI library"
          image="https://ui.neuctra.com/og-images/alert.png"
        />

        <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
          <div className="max-w-5xl mx-auto px-4 space-y-10">
            {/* Header */}
            <header>
              <h1 className="text-4xl font-extrabold mb-3 text-white">Alert / Toast Component</h1>
              <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
                The <span className="text-primary font-semibold">Alert</span> component allows you to show messages to users in a beautiful, animated way. Supports success, error, warning, and info messages.
              </p>
            </header>

            <AlertDocsContent />

            {/* Footer */}
            <DocsFooter />
          </div>
        </div>
      </>
    </ToastProvider>
  );
};

export default AlertDocs;