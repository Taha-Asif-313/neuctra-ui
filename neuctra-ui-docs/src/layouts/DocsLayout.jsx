import React from "react";
import { Link, Outlet } from "react-router-dom";

const DocsLayout = () => {
  return (
    <div className="min-h-screen flex bg-black text-white font-primary">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 p-6 hidden md:block">
        <h2 className="text-xl font-bold text-primary mb-6">Neuctra UI Docs</h2>
        <nav className="flex flex-col space-y-3">
          <Link to="/docs/introduction" className="hover:text-primary">
            Introduction
          </Link>
          <Link to="/docs/installation" className="hover:text-primary">
            Installation
          </Link>
          <Link to="/docs/components" className="hover:text-primary">
            Components
          </Link>
          <Link to="/docs/theme" className="hover:text-primary">
            Theming
          </Link>
        </nav>
      </aside>

      {/* Main Docs Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Outlet renders nested doc routes */}
        <Outlet />
      </main>
    </div>
  );
};

export default DocsLayout;
