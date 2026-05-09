import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import TutorialsHeader from "../components/tutorials/TutorialsHeader";
import TutorialsMobileSidebar from "../components/tutorials/TutorialsMobileSidebar";
import TutorialsSidebar from "../components/tutorials/TutorialsSidebar";


const TutorialsLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">

      {/* HEADER */}
      <TutorialsHeader setOpen={setOpen} />

      {/* MOBILE DRAWER */}
      <TutorialsMobileSidebar open={open} setOpen={setOpen} />

      {/* BODY */}
      <div className="flex flex-1 overflow-hidden">

        {/* DESKTOP SIDEBAR */}
        <TutorialsSidebar />

        {/* MAIN */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default TutorialsLayout;