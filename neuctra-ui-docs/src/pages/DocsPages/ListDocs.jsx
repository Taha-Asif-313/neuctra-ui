"use client";

import React from "react";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import { List } from "@neuctra/ui";
import { CheckCircle, ListTree, ArrowRightCircle } from "lucide-react";
import Metadata from "../../MetaData";

const ListDocs = () => {
  return (
    <>
      {" "}
      <Metadata
        title="List Component — Neuctra UI"
        description="Build modern, customizable lists using the Neuctra UI List component. Supports ordered, unordered, inline, and nested structures with Tailwind-based styling."
        keywords="Neuctra UI List, React list component, Tailwind lists, inline list, ordered list, nested list, UI components"
        image="https://ui.neuctra.com/og/list-docs-preview.png"
        canonical="https://ui.neuctra.com/docs/list"
      />
      <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4 space-y-12">
          {/* ========================================================== */}
          {/* Header */}
          {/* ========================================================== */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              List Component
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
              The <span className="text-primary font-semibold">List</span>{" "}
              component is a flexible and modern way to render structured
              content. Built with Tailwind CSS, it supports multiple layouts,
              nested structures, and full customization using classNames.
            </p>
          </header>

          {/* ========================================================== */}
          {/* Basic Example */}
          {/* ========================================================== */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Usage
            </h2>
            <CodePreviewBlock
              language="jsx"
              code={`<List
title="Main Features"
titleIcon={<CheckCircle />}
items={[
{ text: "Flexible and customizable" },
{ text: "Supports nested lists" },
{ text: "Modern Tailwind styling" },
]}
/>`}
              previewContent={
                <List
                  title="Main Features"
                  titleIcon={<CheckCircle />}
                  items={[
                    { text: "Flexible and customizable" },
                    { text: "Supports nested lists" },
                    { text: "Modern Tailwind styling" },
                  ]}
                />
              }
            />{" "}
          </section>

          {/* ========================================================== */}
          {/* Ordered */}
          {/* ========================================================== */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Ordered List
            </h2>
            <CodePreviewBlock
              language="jsx"
              code={`<List


type="ordered"
title="Setup Steps"
titleIcon={<ArrowRightCircle />}
items={[
{ text: "Install dependencies" },
{ text: "Configure environment" },
{ text: "Run development server" },
]}
/>`}
              previewContent={
                <List
                  type="ordered"
                  title="Setup Steps"
                  titleIcon={<ArrowRightCircle />}
                  items={[
                    { text: "Install dependencies", onClick : ()=>alert("Hello") },
                    { text: "Configure environment" },
                    { text: "Run development server" },
                  ]}
                />
              }
            />{" "}
          </section>

          {/* ========================================================== */}
          {/* Inline */}
          {/* ========================================================== */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Inline List
            </h2>
            <CodePreviewBlock
              language="jsx"
              code={`<List


type="inline"
items={[
{ text: "Home" },
{ text: "About" },
{ text: "Docs" },
{ text: "Contact" },
]}
/>`}
              previewContent={
                <List
                  type="inline"
                  items={[
                    { text: "Home" },
                    { text: "About" },
                    { text: "Docs" },
                    { text: "Contact" },
                  ]}
                />
              }
            />{" "}
          </section>

          {/* ========================================================== */}
          {/* Nested */}
          {/* ========================================================== */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Nested Lists
            </h2>
            <CodePreviewBlock
              language="jsx"
              code={`<List


title="Project Structure"
titleIcon={<ListTree />}
items={[
{
text: "Frontend",
subItems: [
{ text: "UI Components" },
{ text: "Routing & State" },
],
},
{
text: "Backend",
subItems: [
{ text: "API Endpoints" },
{ text: "Database Setup" },
],
},
]}
/>`}
              previewContent={
                <List
                  title="Project Structure"
                  titleIcon={<ListTree />}
                  items={[
                    {
                      text: "Frontend",
                      subItems: [
                        { text: "UI Components" },
                        { text: "Routing & State" },
                      ],
                    },
                    {
                      text: "Backend",
                      subItems: [
                        { text: "API Endpoints" },
                        { text: "Database Setup" },
                      ],
                    },
                  ]}
                />
              }
            />{" "}
          </section>

          {/* ========================================================== */}
          {/* Custom Styling */}
          {/* ========================================================== */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Custom Styling
            </h2>
            <p className="text-gray-400 mb-4">
              Customize everything using Tailwind utility classes.
            </p>
            <CodePreviewBlock
              language="jsx"
              code={`<List


title="Custom Styled"
items={[
{ text: "Dark UI ready" },
{ text: "Fully customizable" },
]}
className="bg-zinc-900 border-zinc-700 p-4 rounded-lg"
itemClassName="text-zinc-300 hover:text-blue-400"
bulletClassName="bg-blue-500"
/>`}
              previewContent={
                <List
                  title="Custom Styled"
                  items={[
                    { text: "Dark UI ready" },
                    { text: "Fully customizable" },
                  ]}
                  className="bg-zinc-900 border-zinc-700 p-4 rounded-lg"
                  itemClassName="text-zinc-300 hover:text-blue-400"
                  bulletClassName="bg-blue-500"
                />
              }
            />{" "}
          </section>

          {/* ========================================================== */}
          {/* Footer */}
          {/* ========================================================== */}
          <footer className="pt-8 border-t border-gray-800 text-sm text-gray-400">
            <p>
              Built with <span className="text-primary">React</span>,{" "}
              <span className="text-primary">Tailwind CSS</span> &{" "}
              <span className="text-primary">Lucide Icons</span>.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default ListDocs;
