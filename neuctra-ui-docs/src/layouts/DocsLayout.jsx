import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Docs/Sidebar";

const DocsLayout = () => {
  return (
    <div className="bg-zinc-950 w-full min-h-screen text-white">
      {/* Sidebar is fixed */}
      <Sidebar />

      {/* Main content with left margin = sidebar width */}
      <main className="ml-64 max-sm:ml-0 max-sm:pt-14 px-3">
        {/* React Router will render nested routes here */}
        <Outlet />
      </main>
    </div>
  );
};

export default DocsLayout;
