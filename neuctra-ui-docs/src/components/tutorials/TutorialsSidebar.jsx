import React from "react";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { tutorials } from "../../constants/tutorials.data";



const TutorialsSidebar = () => {
  return (
    <aside className="w-64 border-r border-border p-4 hidden md:block overflow-y-auto">

      <h2 className="text-xs uppercase text-accent0 mb-3">
        Tutorials
      </h2>

      <nav className="flex flex-col gap-1 text-sm">

        {tutorials.map((item) => {
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
                    ? "bg-accent text-white font-medium border border-border"
                    : "hover:bg-accent text-white/70"
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

export default TutorialsSidebar;