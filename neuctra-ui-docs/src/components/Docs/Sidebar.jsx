import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const navSections = [
    {
      title: "Getting Started",
      links: [{ label: "Overview", href: "/docs" }],
    },
    {
      title: "Basic Components",
      links: [
        { label: "Text", href: "/docs/text" },
        { label: "Button", href: "/docs/button" },
        { label: "Image", href: "/docs/image" },
        { label: "Container", href: "/docs/container" },
        { label: "List", href: "/docs/list" },
        { label: "Badge", href: "/docs/badge" },
        { label: "Avatar", href: "/docs/avatar" },
        { label: "Tabs", href: "/docs/tabs" },
        { label: "Drawer", href: "/docs/drawer" },
        { label: "Table", href: "/docs/table" },
        { label: "Alert", href: "/docs/alert" },
        { label: "Modal", href: "/docs/modal" },
        { label: "Accordion", href: "/docs/accordion" },
      ],
    },
    {
      title: "Form Components",
      links: [
        { label: "Input", href: "/docs/input" },
        { label: "Radio", href: "/docs/radio" },
        { label: "Check Box", href: "/docs/checkbox" },
        { label: "Switch", href: "/docs/switch" },
        { label: "Select", href: "/docs/select" },
        { label: "Textarea", href: "/docs/textarea" }
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "UI Creation Bot", href: "/docs/ui-creation-bot" },
        { label: "About", href: "/about" },
      ],
    },
  ];

  const handleNavigation = (href) => {
    navigate(href);
    setIsOpen(false);
  };

  const isActive = (href) => href === currentPath;

  return (
    <>
      <nav className="fixed w-full flex items-center justify-between z-50 lg:hidden py-4 px-4 bg-zinc-950 text-white shadow-sm border-b border-zinc-800">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleNavigation("/")}
        >
          <img src="/logo.png" className="w-10 h-10" alt="logo" />
          <h2 className="text-lg font-semibold tracking-tight">
            Neuctra<span className="text-primary">UI</span>
          </h2>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md hover:bg-zinc-800 transition"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <aside
        className={`fixed z-50 top-0 left-0 h-full w-64 bg-zinc-950 border-r border-zinc-800 shadow-[0_18px_55px_rgba(0,0,0,0.28)] overflow-y-auto transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-5 pt-6 pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <img
              src="/logo.png"
              className="h-10 w-10 object-contain flex-shrink-0"
              alt="logo"
            />

            {/* Text */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-white leading-none">
                  Neuctra<span className="text-primary">UI</span>
                </span>

                {/* Divider */}
                <div className="h-4 w-px bg-zinc-700 rounded-full" />

                <span className="text-xs text-gray-400">v0.2</span>
              </div>

              <span className="text-[11px] text-gray-400 tracking-wide">
                Documentation
              </span>
            </div>
          </div>
        </div>

        <nav className="px-3 pb-8 pt-5 space-y-6">
          {navSections.map((section) => (
            <div key={section.title} className="space-y-2">
              <div className="px-4 text-[11px] capitalize tracking-[0.24em] text-zinc-100">
                {section.title}
              </div>
              <div className="space-y-1">
                {section.links.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNavigation(link.href)}
                    className={`group flex w-full items-center gap-3 rounded-2xl px-4 py-2 text-sm text-left transition ${
                      isActive(link.href)
                        ? "bg-primary/10 text-primary shadow-sm shadow-primary/10"
                        : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
                    }`}
                  >
                    <span
                      className={`block h-2.5 w-2.5 rounded-full transition ${
                        isActive(link.href)
                          ? "bg-primary"
                          : "bg-zinc-600 group-hover:bg-primary"
                      }`}
                    />
                    <span>{link.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
