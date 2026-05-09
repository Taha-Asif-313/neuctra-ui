import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/docs/Sidebar";

const DocsLayout = () => {
  return (
    <div className="bg-black text-white w-full min-h-screen">
      {/* Sidebar is fixed */}
      <Sidebar />

      {/* Main content */}
      <main className="ml-64 px-5 lg:px-9 max-sm:ml-0 py-9">
        <Outlet />
      </main>
    </div>
  );
};

export default DocsLayout;