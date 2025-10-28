"use client";

import React, { useState, useEffect } from "react";
import { Alert } from "@neuctra/ui"; // Adjust path as needed
import { Info, CheckCircle, AlertCircle, AlertTriangle } from "lucide-react";
import CodeBlock from "@/app/components/docs/CodeBlock";
import CodePreviewBlock from "@/app/components/docs/CodePreviewBlock";

const AlertDocs: React.FC = () => {
  const [visible, setVisible] = useState<{
    success: boolean;
    error: boolean;
    warning: boolean;
    info: boolean;
  }>({
    success: false,
    error: false,
    warning: false,
    info: false,
  });

  // Show alert of a certain type
  const showAlert = (type: keyof typeof visible) => {
    setVisible((v) => ({ ...v, [type]: true }));
  };

  // Close alert of a certain type
  const closeAlert = (type: keyof typeof visible) => {
    setVisible((v) => ({ ...v, [type]: false }));
  };

  // Effect to auto-close alerts that have a duration prop (3000ms here)
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    if (visible.success) {
      timers.push(setTimeout(() => closeAlert("success"), 3000));
    }
    if (visible.error) {
      timers.push(setTimeout(() => closeAlert("error"), 3000));
    }
    if (visible.warning) {
      timers.push(setTimeout(() => closeAlert("warning"), 3000));
    }
    if (visible.info) {
      timers.push(setTimeout(() => closeAlert("info"), 3000));
    }

    return () => timers.forEach(clearTimeout);
  }, [visible]);

  // Props table columns
  const columns = [
    { key: "prop", label: "Prop", sortable: true },
    { key: "type", label: "Type", sortable: true },
    { key: "default", label: "Default", sortable: true },
    { key: "description", label: "Description", sortable: false },
  ];

  // Props table data
  const data = [
    {
      prop: "title",
      type: "string",
      default: `""`,
      description: "Title text displayed at the top of the alert.",
    },
    {
      prop: "description",
      type: "string",
      default: `""`,
      description: "Additional descriptive message inside the alert.",
    },
    {
      prop: "type",
      type: `"success" | "error" | "warning" | "info"`,
      default: `"info"`,
      description: "The style variant of the alert.",
    },
    {
      prop: "dismissible",
      type: "boolean",
      default: "true",
      description: "Shows a close button to manually dismiss the alert.",
    },
    {
      prop: "onClose",
      type: "() => void",
      default: "undefined",
      description: "Callback fired when the alert is closed.",
    },
    {
      prop: "duration",
      type: "number",
      default: "undefined",
      description: "Time in ms after which the alert automatically closes.",
    },
    {
      prop: "icon",
      type: "React.ReactNode",
      default: "Auto from type",
      description: "Custom icon element to replace the default.",
    },
    {
      prop: "actionButton",
      type: "React.ReactNode",
      default: "undefined",
      description: "Button or action element displayed below the message.",
    },
    {
      prop: "position",
      type: `"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"`,
      default: `"top-right"`,
      description: "Position of the alert on the screen.",
    },
    {
      prop: "className",
      type: "string",
      default: `""`,
      description: "Custom CSS class for the root container.",
    },
    {
      prop: "style",
      type: "React.CSSProperties",
      default: "undefined",
      description: "Inline styles applied to the root container.",
    },
  ];

  // Quick reference for type variants
  const typeData = [
    {
      type: "success",
      bg: "#ecfdf5",
      border: "#34d399",
      textColor: "#065f46", // dark green
      icon: <CheckCircle size={18} />,
    },
    {
      type: "error",
      bg: "#fef2f2",
      border: "#f87171",
      textColor: "#991b1b", // dark red
      icon: <AlertCircle size={18} />,
    },
    {
      type: "warning",
      bg: "#fffbeb",
      border: "#facc15",
      textColor: "#92400e", // dark yellow/brown
      icon: <AlertTriangle size={18} />,
    },
    {
      type: "info",
      bg: "#eff6ff",
      border: "#3b82f6",
      textColor: "#1e40af", // dark blue
      icon: <Info size={18} />,
    },
  ];

  // Quick reference for position values
  const positionData = [
    "top-left",
    "top-center",
    "top-right",
    "bottom-left",
    "bottom-center",
    "bottom-right",
  ];

  return (
    <div className="py-10 max-w-5xl font-primary mx-auto bg-zinc-950">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-8">
        <span className="text-primary">Alert</span> Component Documentation
      </h1>

      {/* Import */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Import</h2>
        <CodeBlock
          language="javascript"
          code={`import { Alert } from "@neuctra/ui";`}
        />
      </section>

      {/* Basic Usage */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Basic Usage Example</h2>
        <CodePreviewBlock
          language="jsx"
          code={`<Alert
  title="Information"
  description="This is an info alert — check it out!"
  type="info"
/>`}
          previewContent={
            <button
              className="bg-primary text-sm px-8 py-2 rounded "
              onClick={() => showAlert("success")}
            >
              Show Alert
            </button>
          }
        />
      </section>

      {/* Component Description */}
      <section className="mb-16">
        <p className="text-gray-300 leading-relaxed">
          The <code>Alert</code> component displays contextual feedback messages
          in different styles based on the <code>type</code> prop. It supports
          auto-dismiss timers, different screen positions, custom icons, and
          inline or class-based styling for flexibility.
        </p>
      </section>

      {/* Props Table */}
      <section className="mb-16 overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-6">Props</h2>
        <table className="w-full text-left text-xs text-gray-200 border-collapse">
          <thead>
            <tr className="bg-primary text-white">
              {columns.map(({ label, key }) => (
                <th key={key} className="px-3 py-2 border border-primary">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(({ prop, type, default: def, description }) => (
              <tr key={prop} className="even:bg-zinc-800 odd:bg-zinc-900">
                <td className="border border-primary px-3 py-2 font-mono">
                  {prop}
                </td>
                <td className="border border-primary px-3 py-2 font-mono">
                  {type}
                </td>
                <td className="border border-primary px-3 py-2 font-mono">
                  {def}
                </td>
                <td className="border border-primary px-3 py-2">
                  {description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Quick Reference: Types */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Type Variants</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {typeData.map(({ type, bg, border, icon, textColor }) => (
            <div
              key={type}
              className="flex items-center gap-3 p-4 rounded-lg border"
              style={{
                backgroundColor: bg,
                borderColor: border,
                color: textColor,
              }}
            >
              <div>{icon}</div>
              <div className="font-mono">{type}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Reference: Positions */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Position Options</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-300">
          {positionData.map((pos) => (
            <li key={pos}>
              <code>{pos}</code>
            </li>
          ))}
        </ul>
      </section>

      {/* Usage Examples */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Usage Examples</h2>

        <CodePreviewBlock
          language="jsx"
          code={`const [visible, setVisible] = React.useState({
  success: false,
  error: false,
  warning: false,
  info: false,
});

const showAlert = (type) => setVisible(v => ({ ...v, [type]: true }));
const closeAlert = (type) => setVisible(v => ({ ...v, [type]: false }));

<>
  <div className="flex flex-wrap gap-4 mb-4">
    <button onClick={() => showAlert('success')} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded">Show Success Alert</button>
    <button onClick={() => showAlert('error')} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded">Show Error Alert</button>
    <button onClick={() => showAlert('warning')} className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded">Show Warning Alert</button>
    <button onClick={() => showAlert('info')} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">Show Info Alert</button>
  </div>

  {visible.success && (
    <Alert
      type="success"
      title="Success!"
      description="Your action was completed successfully."
      icon={<CheckCircle size={20} />}
      onClose={() => closeAlert('success')}
      className="text-black"
      style={{ backgroundColor: '#d1fae5', color: '#065f46' }}
    />
  )}
  {visible.error && (
    <Alert
      type="error"
      title="Error!"
      description="Something went wrong."
      icon={<AlertCircle size={20} />}
      onClose={() => closeAlert('error')}
      className="text-black"
      style={{ backgroundColor: '#fee2e2', color: '#991b1b' }}
    />
  )}
  {visible.warning && (
    <Alert
      type="warning"
      title="Warning!"
      description="Check your settings before proceeding."
      icon={<AlertTriangle size={20} />}
      onClose={() => closeAlert('warning')}
      className="text-black"
      style={{ backgroundColor: '#fef3c7', color: '#92400e' }}
    />
  )}
  {visible.info && (
    <Alert
      type="info"
      title="Heads up!"
      description="This alert appears when you click the button."
      icon={<Info size={20} />}
      duration={3000}
      onClose={() => closeAlert('info')}
      className="text-black"
      style={{ backgroundColor: '#dbeafe', color: '#1e40af' }}
    />
  )}
</>`}
          previewContent={
            <div className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => showAlert("success")}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                >
                  Show Success Alert
                </button>
                <button
                  onClick={() => showAlert("error")}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                >
                  Show Error Alert
                </button>
                <button
                  onClick={() => showAlert("warning")}
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded"
                >
                  Show Warning Alert
                </button>
                <button
                  onClick={() => showAlert("info")}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                >
                  Show Info Alert
                </button>
              </div>

              <div className="space-y-4">
                {visible.success && (
                  <Alert
                    type="success"
                    title="Success!"
                    description="Your action was completed successfully."
                    icon={<CheckCircle size={20} />}
                    onClose={() => closeAlert("success")}
                    className="text-black"
                    style={{ backgroundColor: "#d1fae5", color: "#065f46" }}
                  />
                )}

                {visible.error && (
                  <Alert
                    type="error"
                    title="Error!"
                    description="Something went wrong."
                    icon={<AlertCircle size={20} />}
                    onClose={() => closeAlert("error")}
                    className="text-black"
                    style={{ backgroundColor: "#fee2e2", color: "#991b1b" }}
                  />
                )}

                {visible.warning && (
                  <Alert
                    type="warning"
                    title="Warning!"
                    description="Check your settings before proceeding."
                    icon={<AlertTriangle size={20} />}
                    onClose={() => closeAlert("warning")}
                    className="text-black"
                    style={{ backgroundColor: "#fef3c7", color: "#92400e" }}
                  />
                )}

                {visible.info && (
                  <Alert
                    type="info"
                    title="Heads up!"
                    description="This alert appears when you click the button."
                    icon={<Info size={20} />}
                    duration={3000}
                    onClose={() => closeAlert("info")}
                    className="text-black"
                    style={{ backgroundColor: "#dbeafe", color: "#1e40af" }}
                  />
                )}
              </div>
            </div>
          }
        />
      </section>

      {/* Behavior Details */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Behavior Details</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>
            When <code>duration</code> is set, the alert will auto-dismiss after
            the specified milliseconds.
          </li>
          <li>
            If <code>dismissible</code> is true, a close (<code>X</code>) button
            appears to manually dismiss.
          </li>
          <li>
            The <code>position</code> prop controls where the alert appears on
            screen.
          </li>
          <li>
            Inline <code>style</code> prop overrides all other styles.
          </li>
          <li>
            Custom icons and action buttons can be added for extended
            functionality.
          </li>
        </ul>
      </section>

      {/* Animation Details */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Slide-in Animation</h2>
        <pre className="bg-gray-800 rounded p-4 overflow-x-auto text-green-300 text-sm">
          {`@keyframes slideIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}`}
        </pre>
        <p className="text-gray-300 mt-2">
          Alerts use a simple fade-and-slide animation when appearing on screen.
        </p>
      </section>
    </div>
  );
};

export default AlertDocs;
