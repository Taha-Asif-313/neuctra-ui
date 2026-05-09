import React from "react";
import { Menu } from "lucide-react";

const TutorialsHeader = ({ setOpen }) => {
  return (
    <header className="h-14 border-b border-border flex items-center justify-between px-4 md:px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button className="md:hidden" onClick={() => setOpen(true)}>
          <Menu size={20} />
        </button>

        <div className="font-bold flex items-center gap-2 tracking-tight">
          <img className="w-10" src="/logo.png" alt="logo" />
          <p className="hidden md:block">
            Neuctra Ui <span className="text-primary">Tutorials</span>
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-xl mx-4 hidden md:block">
        <input
          placeholder="Search tutorials..."
          className="w-full bg-accent border border-border rounded-lg px-3 py-2 text-sm outline-none"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button className="text-sm px-3 py-1.5 rounded-md bg-accent hover:bg-border">
          GitHub
        </button>
        <button className="text-sm px-3 py-1.5 rounded-md bg-accent hover:bg-border">
          Theme
        </button>
      </div>
    </header>
  );
};

export default TutorialsHeader;
