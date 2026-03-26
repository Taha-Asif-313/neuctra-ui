import React from "react";
import { Outlet } from "react-router-dom";
import TemplatesSidebar from "../components/Templates/TemplatesSidebar";

const TemplatesLayout = () => {
  return (
    <div className="bg-zinc-950 min-h-screen text-white">
      {/* Sidebar */}
      <TemplatesSidebar />

      {/* Main Content */}
      <main
        className="
          transition-all duration-300
          lg:ml-64   /* match sidebar width */
          px-4 sm:px-6
          py-6
          pt-20 lg:pt-6   /* mobile navbar spacing */
          max-w-7xl mx-auto
        "
      >
        <Outlet />
      </main>
    </div>
  );
};

export default TemplatesLayout;