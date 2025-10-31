"use client";

import React from "react";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import { List } from "@neuctra/ui";
import { CheckCircle, ListTree, ArrowRightCircle } from "lucide-react";
import Metadata from "../../MetaData";

const ListDocs = () => {
  return (
    <>
      <Metadata
        title="List & ListItem Components — Neuctra UI"
        description="Learn how to use the List and ListItem components from Neuctra UI — build flexible, nested, and customizable lists with icons, bullets, and inline display support in React."
        keywords="Neuctra UI List, React list component, list item, ordered list, unordered list, nested lists, Tailwind CSS lists, inline lists, UI components, Neuctra library"
        image="https://ui.neuctra.com/og/list-docs-preview.png"
        ogTitle="List & ListItem Components — Neuctra UI"
        ogDescription="Build beautiful, flexible, and nested lists with icons, bullets, and custom layouts — powered by Neuctra UI and Tailwind CSS."
        twitterTitle="List & ListItem Components | Neuctra UI"
        twitterDescription="Explore powerful React list components — customizable, responsive, and accessible. Create structured lists effortlessly with Neuctra UI."
        canonical="https://ui.neuctra.com/docs/list"
      />

      <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4 space-y-10">
          {/* ========================================================== */}
          {/* Header */}
          {/* ========================================================== */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              List & ListItem Components
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
              The <span className="text-primary font-semibold">List</span> and{" "}
              <span className="text-primary font-semibold">ListItem</span>{" "}
              components provide a flexible way to render structured lists with
              icons, nested items, and multiple display modes. Customize every
              detail — from colors and spacing to typography and borders.
            </p>
          </header>

          {/* ========================================================== */}
          {/* List Component Examples */}
          {/* ========================================================== */}
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-white">
              📋 List Component
            </h2>

            {/* Unordered Example */}
            <CodePreviewBlock
              language="jsx"
              code={`<List
  title="Main Features"
  titleIcon={<CheckCircle />}
  items={[
    { text: "Flexible and customizable" },
    { text: "Supports nested lists" },
    { text: "Beautiful inline layouts" },
  ]}
/>`}
              previewContent={
                <List
                  title="Main Features"
                  titleIcon={<CheckCircle />}
                  items={[
                    { text: "Flexible and customizable" },
                    { text: "Supports nested lists" },
                    { text: "Beautiful inline layouts" },
                  ]}
                />
              }
            />
          </section>

          {/* Ordered Example */}
          <section>
            <h3 className="text-2xl font-semibold mb-4 text-white">
              Ordered List Example
            </h3>
            <p className="text-gray-300 mb-3">
              Set <code className="text-primary">type="ordered"</code> for a
              numbered layout.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<List
  title="Setup Steps"
  titleIcon={<ArrowRightCircle />}
  type="ordered"
  items={[
    { text: "Install dependencies" },
    { text: "Configure environment" },
    { text: "Run development server" },
  ]}
/>`}
              previewContent={
                <List
                  title="Setup Steps"
                  titleIcon={<ArrowRightCircle />}
                  type="ordered"
                  items={[
                    { text: "Install dependencies" },
                    { text: "Configure environment" },
                    { text: "Run development server" },
                  ]}
                />
              }
            />
          </section>

          {/* Inline Example */}
          <section>
            <h3 className="text-2xl font-semibold mb-4 text-white">
              Inline List Example
            </h3>
            <p className="text-gray-300 mb-3">
              For navigation-like lists, use{" "}
              <code className="text-primary">type="inline"</code>.
            </p>

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
            />
          </section>

          {/* Nested Example */}
          <section>
            <h3 className="text-2xl font-semibold mb-4 text-white">
              Nested Lists Example
            </h3>
            <p className="text-gray-300 mb-3">
              Use <code className="text-primary">subItems</code> in a list item
              to render nested lists.
            </p>

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
            />
          </section>

          {/* ========================================================== */}
          {/* ListItem Examples */}
          {/* ========================================================== */}
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-white">
              🪶 ListItem Component
            </h2>
            <p className="text-gray-300 mb-4 max-w-3xl">
              The <span className="text-primary font-semibold">ListItem</span>{" "}
              component can also be used standalone when you need full control
              over each individual list element. You can attach icons, actions,
              or nested items manually.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<ul>
  <ListItem text="Custom bullet color" bulletColor="#10b981" />
  <ListItem text="With icon" icon={<CheckCircle />} />
  <ListItem
    text="Clickable item"
    onClick={() => alert("Item clicked!")}
  />
</ul>`}
              previewContent={
                <ul className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
                  <li>
                    <span className="flex items-center gap-2 text-green-400">
                      ● Custom bullet color
                    </span>
                  </li>
                  <li className="flex items-center gap-2 mt-2">
                    <CheckCircle className="text-primary" size={16} />
                    <span>With icon</span>
                  </li>
                  <li
                    onClick={() => alert("Item clicked!")}
                    className="mt-2 text-blue-400 cursor-pointer hover:underline"
                  >
                    Clickable item
                  </li>
                </ul>
              }
            />
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
