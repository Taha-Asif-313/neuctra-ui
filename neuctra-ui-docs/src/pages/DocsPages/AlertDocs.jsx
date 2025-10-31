"use client";
import React, { useState } from "react";
import { Alert } from "@neuctra/ui"; // adjust import path
import DocsFooter from "../../components/Docs/DocsFooter";

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
    <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 space-y-10">
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

        {/* Interactive Buttons */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Show Alerts on Click
          </h2>
          <div className="flex flex-wrap gap-4 mb-6">
            <button
              onClick={() =>
                addAlert(
                  "success",
                  "Success!",
                  "Your changes have been saved.",
                  3000
                )
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
                addAlert(
                  "warning",
                  "Warning!",
                  "Be careful with this action.",
                  3000
                )
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

          {/* Render Alerts */}
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
        </section>

        <DocsFooter />
      </div>
    </div>
  );
};

export default AlertDocs;
