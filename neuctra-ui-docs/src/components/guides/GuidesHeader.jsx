import React from "react";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

const GuidesHeader = ({ setOpen }) => {
  return (
    <header className="h-14 border-b border-white/10 flex items-center justify-between px-4 md:px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button className="md:hidden" onClick={() => setOpen(true)}>
          <Menu size={20} />
        </button>

        <div className="font-bold flex items-center gap-3">
          <img className="w-12" src="/logo.png" alt="Logo" />
          <p className="hidden md:block">
            Neuctra Ui <span className="text-primary">Guides</span>
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-xl mx-4 hidden md:block">
        <input
          placeholder="Search guides..."
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-white/30"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button className="text-sm px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10">
          GitHub
        </button>
        <Link
          to="/"
          className="text-sm px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10"
        >
          Home
        </Link>
      </div>
    </header>
  );
};

export default GuidesHeader;
