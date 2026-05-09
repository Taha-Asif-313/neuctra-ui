import React from "react";
import { X } from "lucide-react";
import { NavLink } from "react-router-dom";

import clsx from "clsx";
import { guides } from "../../constants/guides.data";

const GuidesMobileSidebar = ({ open, setOpen }) => {
  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 md:hidden",
        open ? "visible" : "invisible",
      )}
    >
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={() => setOpen(false)}
      />

      {/* drawer */}
      <div
        className={clsx(
          "absolute left-0 top-0 h-full w-72 bg-zinc-950 border-r border-white/10 p-4 transition-transform",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Guides</h2>
          <button onClick={() => setOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* links */}
        <nav className="flex flex-col gap-1 text-sm">
          {guides.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  clsx(
                    "flex items-center gap-2 px-3 py-2 rounded-md",
                    isActive ? "bg-white/10 font-medium" : "hover:bg-white/5",
                  )
                }
              >
                <Icon size={16} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default GuidesMobileSidebar;
