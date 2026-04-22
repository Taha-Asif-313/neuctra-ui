import React, { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const navSections = [
    {
      title: "Getting Started",
      links: [
        { label: "Overview", href: "/docs" },
        { label: "Quick Start", href: "/docs/quick-start" },
        { label: "Full Setup Guide", href: "/docs/full-setup" },
      ],
    },

    {
      title: "Layout & Structure",
      links: [{ label: "Container", href: "/docs/container" }],
    },

    {
      title: "Typography & Media",
      links: [
        { label: "Text", href: "/docs/text" },
        { label: "Image", href: "/docs/image" },
        { label: "Avatar", href: "/docs/avatar" },
        { label: "Badge", href: "/docs/badge" },
      ],
    },

    {
      title: "Data Display",
      links: [
        { label: "List", href: "/docs/list" },
        { label: "Table", href: "/docs/table" },
        { label: "Accordion", href: "/docs/accordion" },
      ],
    },

    {
      title: "Feedback & Overlay",
      links: [
        { label: "Alert", href: "/docs/alert" },
        { label: "Modal", href: "/docs/modal" },
        { label: "Drawer", href: "/docs/drawer" },
        { label: "Dropdown", href: "/docs/dropdown" },
      ],
    },

    {
      title: "Navigation",
      links: [{ label: "Tabs", href: "/docs/tabs" }],
    },

    {
      title: "Form Components",
      links: [
        { label: "Input", href: "/docs/input" },
        { label: "Textarea", href: "/docs/textarea" },
        { label: "Select", href: "/docs/select" },
        { label: "Checkbox", href: "/docs/checkbox" },
        { label: "Radio", href: "/docs/radio" },
        { label: "Switch", href: "/docs/switch" },
        { label: "Button", href: "/docs/button" },
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

  // Filter sections based on search query
  const filteredSections = searchQuery
    ? navSections
        .map((section) => ({
          ...section,
          links: section.links.filter(
            (link) =>
              link.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
              section.title.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        }))
        .filter((section) => section.links.length > 0)
    : navSections;

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

        {/* Search Input */}
        <div className="px-3 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <nav className="px-3 pb-8 pt-5 space-y-6">
          {filteredSections.map((section) => (
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
                        ? "bg-primary/10 text-primary"
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
