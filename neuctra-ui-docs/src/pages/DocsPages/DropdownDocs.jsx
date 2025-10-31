"use client";

import React, { useState } from "react";
import { Dropdown } from "@neuctra/ui"; // adjust path if needed
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import DocsFooter from "../../components/Docs/DocsFooter";

const DropdownDocs = () => {
  const [selectedSingle, setSelectedSingle] = useState("apple");
  const [selectedMulti, setSelectedMulti] = useState(["vue"]);
  const [searchableValue, setSearchableValue] = useState("");
  const [customStyled, setCustomStyled] = useState("blue");

  return (
    <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10 relative z-0">
      <div className="max-w-5xl mx-auto px-4 space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-4xl font-extrabold mb-3 text-white">
            Dropdown Component
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
            The{" "}
            <span className="text-primary font-semibold">Dropdown</span>{" "}
            component is a powerful, customizable select input built with
            accessibility, keyboard navigation, and virtualization support.
            It supports single & multi-selection, custom styles, and live search.
          </p>
        </header>

        {/* ===================== Basic Example ===================== */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Basic Example
          </h2>
          <p className="text-gray-300 mb-3">
            A simple dropdown for single selection.
          </p>

          <CodePreviewBlock
            language="jsx"
            code={`<Dropdown
  options={[
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Cherry", value: "cherry" },
  ]}
  value="apple"
  onChange={(value) => console.log(value)}
/>`}
            previewContent={
              <div className="relative z-10">
                <Dropdown
                  options={[
                    { label: "Apple", value: "apple" },
                    { label: "Banana", value: "banana" },
                    { label: "Cherry", value: "cherry" },
                  ]}
                  value={selectedSingle}
                  onChange={setSelectedSingle}
                />
              </div>
            }
          />
        </section>

        {/* ===================== Multi Select ===================== */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">Multi-Select</h2>
          <p className="text-gray-300 mb-3">
            Enable{" "}
            <code className="text-primary">multiSelect</code> to allow selecting
            multiple options.
          </p>

          <CodePreviewBlock
            language="jsx"
            code={`<Dropdown
  multiSelect
  options={[
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
    { label: "Svelte", value: "svelte" },
    { label: "Angular", value: "angular" },
  ]}
  values={["vue"]}
  onChange={(values) => console.log(values)}
/>`}
            previewContent={
              <div className="relative z-10">
                <Dropdown
                  multiSelect
                  options={[
                    { label: "React", value: "react" },
                    { label: "Vue", value: "vue" },
                    { label: "Svelte", value: "svelte" },
                    { label: "Angular", value: "angular" },
                  ]}
                  values={selectedMulti}
                  onChange={setSelectedMulti}
                />
              </div>
            }
          />
        </section>

        {/* ===================== Searchable ===================== */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Searchable Dropdown
          </h2>
          <p className="text-gray-300 mb-3">
            Add{" "}
            <code className="text-primary">searchable</code> to allow users
            to filter options dynamically.
          </p>

          <CodePreviewBlock
            language="jsx"
            code={`<Dropdown
  searchable
  placeholder="Search fruits..."
  options={[
    { label: "Apple", value: "apple" },
    { label: "Orange", value: "orange" },
    { label: "Mango", value: "mango" },
    { label: "Pineapple", value: "pineapple" },
  ]}
  value={searchableValue}
  onChange={setSearchableValue}
/>`}
            previewContent={
              <div className="relative z-10">
                <Dropdown
                  searchable
                  placeholder="Search fruits..."
                  options={[
                    { label: "Apple", value: "apple" },
                    { label: "Orange", value: "orange" },
                    { label: "Mango", value: "mango" },
                    { label: "Pineapple", value: "pineapple" },
                  ]}
                  value={searchableValue}
                  onChange={setSearchableValue}
                />
              </div>
            }
          />
        </section>

        {/* ===================== Disabled ===================== */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">Disabled</h2>
          <p className="text-gray-300 mb-3">
            You can disable the entire dropdown by setting{" "}
            <code className="text-primary">disabled</code>.
          </p>

          <CodePreviewBlock
            language="jsx"
            code={`<Dropdown
  disabled
  options={[
    { label: "Disabled Option", value: "disabled" },
    { label: "Can't select this", value: "nope" },
  ]}
/>`}
            previewContent={
              <div className="relative z-10">
                <Dropdown
                  disabled
                  options={[
                    { label: "Disabled Option", value: "disabled" },
                    { label: "Can't select this", value: "nope" },
                  ]}
                />
              </div>
            }
          />
        </section>

        {/* ===================== Custom Styling ===================== */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Styling & Customization
          </h2>
          <p className="text-gray-300 mb-3">
            Customize colors, radius, and icons with props like{" "}
            <code className="text-primary">borderColor</code>,{" "}
            <code className="text-primary">selectedBackground</code>, and{" "}
            <code className="text-primary">dropdownIcon</code>.
          </p>

          <CodePreviewBlock
            language="jsx"
            code={`<Dropdown
  options={[
    { label: "Blue", value: "blue" },
    { label: "Green", value: "green" },
    { label: "Red", value: "red" },
  ]}
  value="blue"
  borderColor="#3b82f6"
  selectedBackground="#1e3a8a22"
  focusRingColor="#60a5fa"
  dropdownIcon="▼"
  onChange={(value) => console.log(value)}
/>`}
            previewContent={
              <div className="relative z-10">
                <Dropdown
                  options={[
                    { label: "Blue", value: "blue" },
                    { label: "Green", value: "green" },
                    { label: "Red", value: "red" },
                  ]}
                  value={customStyled}
                  onChange={setCustomStyled}
                  borderColor="#3b82f6"
                  selectedBackground="#1e3a8a22"
                  focusRingColor="#60a5fa"
                  dropdownIcon="▼"
                />
              </div>
            }
          />
        </section>

        {/* ===================== Footer ===================== */}
        <DocsFooter />
      </div>
    </div>
  );
};

export default DropdownDocs;
