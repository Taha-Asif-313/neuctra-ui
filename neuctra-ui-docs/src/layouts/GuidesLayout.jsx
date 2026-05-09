import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import GuidesHeader from "../components/guides/GuidesHeader";
import GuidesMobileSidebar from "../components/guides/GuidesMobileSidebar";
import GuidesSidebar from "../components/guides/GuidesSidebar";



const GuidesLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">

      {/* HEADER */}
      <GuidesHeader setOpen={setOpen} />

      {/* MOBILE SIDEBAR */}
      <GuidesMobileSidebar open={open} setOpen={setOpen} />

      {/* BODY */}
      <div className="flex flex-1 overflow-hidden">

        {/* DESKTOP SIDEBAR */}
        <GuidesSidebar />

        {/* MAIN */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default GuidesLayout;