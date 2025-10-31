"use client";
import React, { useState } from "react";
import { Alert } from "@neuctra/ui"; // adjust path if needed
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import DocsFooter from "../../components/Docs/DocsFooter";
import Metadata from "../../MetaData";

const AlertDocs = () => {
  const [alerts, setAlerts] = useState([]);

  const addAlert = (type, title, description, duration) => {
    const id = Date.now();
    setAlerts((prev) => [...prev, { id, type, title, description }]);
    if (duration) {
      setTimeout(() => {
        setAlerts((prev) => prev.filter((a) => a.id !== id));
      }, duration);
    }
  };

  const removeAlert = (id) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <>
      <Metadata
        title="Alert Component — Neuctra UI"
        description="Discover the Alert component in Neuctra UI — a dynamic, customizable React notification system for success, error, warning, and info messages with smooth animations and dismissible alerts."
        keywords="Neuctra UI Alert, React Alert component, notifications, toast messages, UI library, Neuctra UI docs, success alert, error alert, warning alert, info alert"
        image="https://ui.neuctra.com/og-images/alert.png"
        ogTitle="Alert Component — Neuctra UI"
        ogDescription="Learn how to create beautiful, flexible alerts in Neuctra UI. Perfect for showing success, error, warning, and info notifications in your React applications."
        twitterTitle="Alert Component — Neuctra UI"
        twitterDescription="Explore the Alert component in Neuctra UI — elegant, customizable alerts for React developers with flexible styles and behavior."
        canonical="https://ui.neuctra.com/docs/alert"
      />

      <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4 space-y-10">
          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              Alert Component
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
              The <span className="text-primary font-semibold">Alert</span>{" "}
              component provides a flexible notification system for success,
              error, warning, and info messages.
            </p>
          </header>

          {/* Example 1: Interactive Buttons */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Interactive Example
            </h2>
            <p className="text-gray-300 mb-3">
              Click a button to trigger an alert with a specific type.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<>
  <button onClick={() => addAlert('success', 'Success!', 'Your action was successful.', 3000)}>Show Success</button>
  <button onClick={() => addAlert('error', 'Error!', 'Something went wrong.', 3000)}>Show Error</button>
  <button onClick={() => addAlert('warning', 'Warning!', 'Please check your input.', 3000)}>Show Warning</button>
  <button onClick={() => addAlert('info', 'Info!', 'Here is some information.', 3000)}>Show Info</button>
</>`}
              previewContent={
                <div className="flex flex-wrap gap-4 mb-6">
                  <button
                    onClick={() =>
                      addAlert("success", "Success!", "Your changes have been saved.", 3000)
                    }
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                  >
                    Show Success
                  </button>
                  <button
                    onClick={() =>
                      addAlert("error", "Error!", "Something went wrong.", 3000)
                    }
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Show Error
                  </button>
                  <button
                    onClick={() =>
                      addAlert("warning", "Warning!", "Be careful with this action.", 3000)
                    }
                    className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500 transition"
                  >
                    Show Warning
                  </button>
                  <button
                    onClick={() =>
                      addAlert("info", "Info!", "Here is some information.", 3000)
                    }
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    Show Info
                  </button>
                </div>
              }
            />
          </section>

          {/* Example 2: Live Alerts */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Live Alerts
            </h2>
            <p className="text-gray-300 mb-3">
              Active alerts will appear below. You can dismiss them individually.
            </p>

            <div className="space-y-4">
              {alerts.map((alert) => (
                <Alert
                  key={alert.id}
                  title={alert.title}
                  description={alert.description}
                  type={alert.type}
                  dismissible
                  onClose={() => removeAlert(alert.id)}
                  position="top-left"
                />
              ))}
            </div>
          </section>

          {/* Footer */}
          <DocsFooter />
        </div>
      </div>
    </>
  );
};

export default AlertDocs;
