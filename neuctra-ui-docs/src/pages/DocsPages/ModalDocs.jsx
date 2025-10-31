"use client";
import React, { useState } from "react";
import { Modal } from "@neuctra/ui"; // adjust import path
import DocsFooter from "../../components/Docs/DocsFooter";

const ModalDocs = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-4xl font-extrabold mb-3 text-white">Modal Component</h1>
          <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
            The <span className="text-primary font-semibold">Modal</span> component is a flexible dialog
            container for displaying content, forms, or messages. Supports overlay click, escape key close, and custom styling.
          </p>
        </header>

        {/* Show Modal Button */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">Open Modal</h2>
          <p className="text-gray-300 mb-3">
            Click the button below to open the modal.
          </p>

          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Open Modal
          </button>

          {/* Modal Component */}
          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="Demo Modal"
            ariaLabel="Demo modal"
            overlayStyle={{ backgroundColor: "rgba(0,0,0,0.7)" }}
            modalStyle={{ maxWidth: "500px" }}
          >
            <p className="text-gray-800">
              This is a demo modal. You can put any content here, such as forms, text, images, or buttons.
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
        </section>

        <DocsFooter />
      </div>
    </div>
  );
};

export default ModalDocs;
