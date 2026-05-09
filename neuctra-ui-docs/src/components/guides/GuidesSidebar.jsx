import React from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { guides } from "../../constants/guides.data";

const GuidesSidebar = () => {
  return (
    <aside className="w-64 border-r border-white/10 p-4 hidden md:block overflow-y-auto">
      <h2 className="text-xs uppercase text-white/50 mb-3">Guides</h2>

      <nav className="flex flex-col gap-1 text-sm">
        {guides.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-2 px-3 py-2 rounded-md transition",
                  isActive
                    ? "bg-white/10 border border-white/10 text-white font-medium"
                    : "hover:bg-white/5 text-white/70",
                )
              }
            >
              <Icon size={16} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default GuidesSidebar;
