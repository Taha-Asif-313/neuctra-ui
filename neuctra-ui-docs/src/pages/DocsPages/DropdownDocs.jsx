"use client";

import React, { useState } from "react";
import { Select } from "@neuctra/ui"; // adjust path if needed
import {
  User,
  Mail,
  Globe,
  Shield,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import DocsFooter from "../../components/Docs/DocsFooter";
import Metadata from "../../MetaData";

const DropdownDocs = () => {
  const [selectedBasic, setSelectedBasic] = useState("frontend");
  const [selectedControlled, setSelectedControlled] = useState("active");
  const [selectedLabelIcon, setSelectedLabelIcon] = useState("");
  const [selectedPrefixIcon, setSelectedPrefixIcon] = useState("");
  const [selectedOptionsIcon, setSelectedOptionsIcon] = useState("work");
  const [selectedRequired, setSelectedRequired] = useState("");
  const [selectedError, setSelectedError] = useState("");
  const [selectedSuccess, setSelectedSuccess] = useState("approved");
  const [selectedHelper, setSelectedHelper] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("light-1");
  const [selectedMultiple, setSelectedMultiple] = useState([]);

  return (
    <>
      <Metadata
        title="Select Component — Neuctra UI"
        description="Learn how to use Neuctra UI Select component with controlled and uncontrolled patterns, validation states, variants, icons, and class overrides."
        keywords="Neuctra UI Select tutorial, React select docs, controlled select, uncontrolled select, Tailwind select component, React select UI"
        image="https://ui.neuctra.com/og/dropdown-docs-preview.png"
        ogTitle="Select Component — Neuctra UI"
        ogDescription="Step-by-step Select docs for Neuctra UI: props, examples, validation, themes, and customization."
        twitterTitle="Select Component | Neuctra UI"
        twitterDescription="Use Select in React with Neuctra UI: API guide, examples, and customization patterns."
      />

      <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4 space-y-10">
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              Select Component
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
              The <span className="text-primary font-semibold">Select</span>{" "}
              component is a fully customizable input for React apps. It supports
              controlled and uncontrolled patterns, multiple selection, helper
              and validation states, icon slots, theme variants, and class-level
              style overrides.
            </p>
          </header>

          {/* Quick Start */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Quick Start
            </h2>
            <CodePreviewBlock
              language="jsx"
              code={`<Select
  label="Select Role"
  name="role"
  options={[
    { label: "Frontend Engineer", value: "frontend" },
    { label: "Backend Engineer", value: "backend" },
    { label: "Designer", value: "design" },
  ]}
  value={selectedBasic}
  onValueChange={(val, name) => setSelectedBasic(val)}
/>`}
              previewContent={
                <Select
                  label="Select Role"
                  name="role"
                  options={[
                    { label: "Frontend Engineer", value: "frontend" },
                    { label: "Backend Engineer", value: "backend" },
                    { label: "Designer", value: "design" },
                  ]}
                  value={selectedBasic}
                  onValueChange={(val) => setSelectedBasic(val)}
                />
              }
            />
          </section>

          {/* Controlled vs Uncontrolled */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Controlled vs Uncontrolled
            </h2>
            <CodePreviewBlock
              language="jsx"
              code={`// Controlled
<Select
  label="Account Status"
  value={selectedControlled}
  onValueChange={val => setSelectedControlled(val as string)}
  options={[
    { label: "Active", value: "active" },
    { label: "Suspended", value: "suspended" },
  ]}
/>

// Uncontrolled
<Select
  label="Plan"
  defaultValue="pro"
  options={[
    { label: "Starter", value: "starter" },
    { label: "Pro", value: "pro" },
    { label: "Enterprise", value: "enterprise" },
  ]}
/>`}
              previewContent={
                <div className="space-y-4">
                  <Select
                    label="Account Status"
                    value={selectedControlled}
                    onValueChange={(val) =>
                      setSelectedControlled(val)
                    }
                    options={[
                      { label: "Active", value: "active" },
                      { label: "Suspended", value: "suspended" },
                    ]}
                  />
                  <Select
                    label="Plan"
                    defaultValue="pro"
                    options={[
                      { label: "Starter", value: "starter" },
                      { label: "Pro", value: "pro" },
                      { label: "Enterprise", value: "enterprise" },
                    ]}
                  />
                </div>
              }
            />
          </section>

          {/* Multiple Selection */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Multiple Selection
            </h2>
            <CodePreviewBlock
              language="jsx"
              code={`<Select
  label="Select Skills"
  multiple
  value={selectedMultiple}
  onValueChange={val => setSelectedMultiple(val as string[])}
  options={[
    { label: "React", value: "react" },
    { label: "Node.js", value: "node" },
    { label: "Tailwind", value: "tailwind" },
  ]}
/>`}
              previewContent={
                <Select
                  label="Select Skills"
                  multiple
                  value={selectedMultiple}
                  onValueChange={(val) => setSelectedMultiple(val)}
                  options={[
                    { label: "React", value: "react" },
                    { label: "Node.js", value: "node" },
                    { label: "Tailwind", value: "tailwind" },
                  ]}
                />
              }
            />
          </section>

          {/* Label Icon */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              With Label Icon
            </h2>
            <Select
              label="Select User"
              labelIcon={User}
              value={selectedLabelIcon}
              onValueChange={(val) => setSelectedLabelIcon(val)}
              options={[
                { label: "John Doe", value: "john" },
                { label: "Jane Smith", value: "jane" },
              ]}
            />
          </section>

          {/* Prefix Icon */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              With Prefix Icon
            </h2>
            <Select
              label="Select User"
              prefixIcon={User}
              value={selectedPrefixIcon}
              onValueChange={(val) => setSelectedPrefixIcon(val)}
              options={[
                { label: "John Doe", value: "john" },
                { label: "Jane Smith", value: "jane" },
              ]}
            />
          </section>

          <DocsFooter />
        </div>
      </div>
    </>
  );
};

export default DropdownDocs;