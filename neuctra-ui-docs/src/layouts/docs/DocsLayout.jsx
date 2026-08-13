import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const DocsLayout = () => {
  return (
    <div className="bg-black text-white w-full min-h-screen">
      {/* Sidebar is fixed */}
      <Sidebar />

      {/* Main content.
          - The sidebar is only visible from lg up, so the margin must be
            lg-only too (ml-64 at tablet widths left a 256px dead gutter).
          - Below lg the top navbar is fixed, so the content needs extra top
            padding to clear it. */}
      <main className="ml-0 lg:ml-64 px-4 sm:px-5 lg:px-9 pt-24 lg:pt-9 pb-9">
        <div className="mx-auto w-full max-w-5xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DocsLayout;
