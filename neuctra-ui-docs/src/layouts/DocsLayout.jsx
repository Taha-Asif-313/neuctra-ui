import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Docs/Sidebar";

const DocsLayout = () => {
  return (
    <div className="bg-white text-zinc-800 dark:bg-zinc-950 dark:text-white w-full min-h-screen">
      {/* Sidebar is fixed */}
      <Sidebar />

      {/* Main content */}
      <main className="ml-60 max-sm:ml-0 max-sm:pt-14 px-5 lg:px-10">
        <Outlet />
      </main>
    </div>
  );
};

export default DocsLayout;