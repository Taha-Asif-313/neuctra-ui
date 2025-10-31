"use client";
import React, { useState } from "react";
import { Drawer, DrawerButton } from "@neuctra/ui"; // adjust import path
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import DocsFooter from "../../components/Docs/DocsFooter";

const DrawerDocs = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-4xl font-extrabold mb-3 text-white">Drawer Component</h1>
          <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
            The <span className="text-primary font-semibold">Drawer</span> component provides a responsive
            sliding panel from any side of the screen. Use it for navigation menus, settings panels, or
            custom modals. Pair it with <span className="text-primary font-semibold">DrawerButton</span> to open the drawer.
          </p>
        </header>

        {/* DrawerButton Example */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">Drawer Button</h2>
          <p className="text-gray-300 mb-3">
            <code className="text-primary">DrawerButton</code> is a customizable button to trigger a drawer.
          </p>

          <CodePreviewBlock
            language="jsx"
            code={`<DrawerButton
  label="Open Drawer"
  color="#2563eb"
  textColor="#fff"
  onClick={() => setOpen(true)}
/>`}
            previewContent={
              <div className="p-6 bg-zinc-900 rounded-xl">
                <DrawerButton
                  label="Open Drawer"
                  color="#2563eb"
                  textColor="#fff"
                  onClick={() => setOpen(true)}
                />
              </div>
            }
          />
        </section>

        {/* Basic Drawer Example */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">Basic Drawer</h2>
          <p className="text-gray-300 mb-3">
            Use the <code className="text-primary">Drawer</code> component to create a panel that slides in from any side.
          </p>

          <CodePreviewBlock
            language="jsx"
            code={`<Drawer
  open={open}
  onClose={() => setOpen(false)}
  position="right"
  width="300px"
>
  <h2 className="text-lg font-bold mb-2">Drawer Content</h2>
  <p>This is a simple drawer example.</p>
</Drawer>`}
            previewContent={
              <>
                <DrawerButton
                  label="Open Drawer"
                  color="#2563eb"
                  textColor="#fff"
                  onClick={() => setOpen(true)}
                />
                <Drawer
                  open={open}
                  onClose={() => setOpen(false)}
                  position="right"
                  width="300px"
                >
                  <h2 className="text-lg font-bold mb-2">Drawer Content</h2>
                  <p>This is a simple drawer example.</p>
                </Drawer>
              </>
            }
          />
        </section>

       

        {/* Custom Styling */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">Custom Styling & Close Button</h2>
          <p className="text-gray-300 mb-3">
            Customize background, backdrop, transition duration, and show/hide the close button.
          </p>

          <CodePreviewBlock
            language="jsx"
            code={`<Drawer
  open={open}
  onClose={() => setOpen(false)}
  width="350px"
  backgroundColor="#1f2937"
  backdropColor="rgba(0,0,0,0.7)"
  transitionDuration={500}
  showCloseButton={true}
  closeIconColor="#fff"
>
  <p>Custom styled drawer content.</p>
</Drawer>`}
            previewContent={
              <Drawer
                open={open}
                onClose={() => setOpen(false)}
                width="350px"
                backgroundColor="#1f2937"
                backdropColor="rgba(0,0,0,0.7)"
                transitionDuration={500}
                showCloseButton={true}
                closeIconColor="#fff"
              >
                <p>Custom styled drawer content.</p>
              </Drawer>
            }
          />
        </section>

        {/* Footer */}
        <DocsFooter />
      </div>
    </div>
  );
};

export default DrawerDocs;
