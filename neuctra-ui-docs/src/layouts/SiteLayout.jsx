import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Site/Navbar";
import Footer from "../components/Site/Footer";

const SiteLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-primary">
      {/* Navbar */}
      <Navbar />

      {/* Main Content (where nested routes render) */}
      <main className="flex-grow pt-10">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SiteLayout;
