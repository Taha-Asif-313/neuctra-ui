"use client";
import React, { useState } from "react";
import { Modal, Button } from "@neuctra/ui"; // adjust path if needed
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import DocsFooter from "../../components/Docs/DocsFooter";
import Metadata from "../../MetaData";

const ModalDocs = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Metadata
        title="Modal Component — Neuctra UI"
        description="Learn how to use the Modal component from Neuctra UI — a responsive, accessible, and customizable dialog system for React apps. Includes overlay support, keyboard accessibility, and advanced styling options."
        keywords="Neuctra UI Modal, React modal component, dialog box, modal window, popup, React UI library, Tailwind modal, overlay modal, accessible modal, Neuctra components"
        image="https://ui.neuctra.com/og/modal-docs-preview.png"
        ogTitle="Modal Component — Neuctra UI"
        ogDescription="Discover the Modal component from Neuctra UI — flexible, accessible, and beautiful modals built with React and Tailwind CSS."
        twitterTitle="Modal Component | Neuctra UI"
        twitterDescription="Create responsive, accessible modals with Neuctra UI — a modern React UI library built for speed, flexibility, and clean design."
        canonical="https://ui.neuctra.com/docs/modal"
      />

      <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4 space-y-10">
          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              Modal Component
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
              The <span className="text-primary font-semibold">Modal</span>{" "}
              component provides a flexible dialog container for displaying
              content, forms, or messages. It supports overlay click, escape key
              close, and custom styling.
            </p>
          </header>

          {/* Example 1: Basic Modal */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Example
            </h2>
            <p className="text-gray-300 mb-3">
              A simple modal example with open and close functionality.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<>
  <button onClick={() => setIsOpen(true)}>Open Modal</button>

  <Modal
    isOpen={isOpen}
    onClose={() => setIsOpen(false)}
    title="Demo Modal"
    overlayStyle={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
    modalStyle={{ maxWidth: '500px' }}
  >
    <p>This is a demo modal with text, buttons, and actions.</p>
    <div className="mt-4 flex justify-end gap-2">
      <button onClick={() => setIsOpen(false)}>Close</button>
      <button onClick={() => alert('Action executed!')}>Action</button>
    </div>
  </Modal>
</>`}
              previewContent={
                <>
                  <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

                  <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="Demo Modal"
                    ariaLabel="Demo modal"
                    overlayStyle={{ backgroundColor: "rgba(0,0,0,0.7)" }}
                    modalStyle={{ maxWidth: "500px" }}
                  >
                    <p className="text-gray-800">
                      This is a demo modal. You can place any content here, such
                      as forms, text, images, or buttons.
                    </p>
                    <div className="mt-4 flex justify-end gap-2">
                      <button
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                      >
                        Close
                      </button>
                      <button
                        onClick={() => alert("Action executed!")}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                      >
                        Action
                      </button>
                    </div>
                  </Modal>
                </>
              }
            />
          </section>

         

          {/* Footer */}
          <DocsFooter />
        </div>
      </div>
    </>
  );
};

export default ModalDocs;
