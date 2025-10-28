import React from "react";
import { Outlet } from "react-router-dom";

const SiteLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-primary">
      {/* Navbar */}
      {/* <Navbar /> */}

      {/* Main Content (where nested routes render) */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
};

export default SiteLayout;
