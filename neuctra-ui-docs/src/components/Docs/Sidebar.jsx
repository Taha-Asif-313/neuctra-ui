import React, { useState } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState("Basic Components");

  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // 🌈 Categorized Navigation Links
  const navLinks = [
    { label: "Getting Started", href: "/docs" },

    {
      category: "Basic Components",
      subLinks: [
        { label: "Text", href: "/docs/text" },
        { label: "Button", href: "/docs/button" },
        { label: "Badge", href: "/docs/badge" },
        { label: "Avatar", href: "/docs/avatar" },
        { label: "Image", href: "/docs/image" },
        { label: "List", href: "/docs/list" },
      ],
    },
    {
      category: "Form Components",
      subLinks: [
        { label: "Input", href: "/docs/input" },
        { label: "Radio", href: "/docs/radio" },
        { label: "Check Box", href: "/docs/checkbox" },
        { label: "Switch", href: "/docs/switch" },
        { label: "Dropdown", href: "/docs/dropdown" },
      ],
    },
    {
      category: "Layout Components",
      subLinks: [
        { label: "Container", href: "/docs/container" },
        { label: "GridView", href: "/docs/gridview" },
        { label: "Flexbox", href: "/docs/flexbox" },
                { label: "Stack", href: "/docs/stack" },
        { label: "Tabs", href: "/docs/tabs" },
        { label: "Drawer", href: "/docs/drawer" },
        { label: "Card", href: "/docs/card" },
      ],
    },
    {
      category: "Media Components",
      subLinks: [
        { label: "AudioPlayer", href: "/docs/audioplayer" },
        { label: "AudioGallery", href: "/docs/audiogallery" },
      ],
    },
    {
      category: "Feedback Components",
      subLinks: [
        { label: "Alert", href: "/docs/alert" },
        { label: "Modal", href: "/docs/modal" },
        { label: "Accordion", href: "/docs/accordion" },
      ],
    },
    {
      category: "Data Display",
      subLinks: [{ label: "Table", href: "/docs/table" }],
    },
    { label: "About", href: "/docs/about" },
  ];

  // 🔄 Handlers
  const toggleDropdown = (label) =>
    setActiveDropdown((prev) => (prev === label ? null : label));

  const handleNavigation = (href) => {
    navigate(href);
    setIsOpen(false);
  };

  const isActive = (href) => href === currentPath;

  return (
    <>
      {/* 📱 Mobile Navbar */}
      <nav className="fixed w-full flex items-center justify-between z-50 lg:hidden py-4 px-4 bg-[#0a0a0a] text-white shadow-md border-b border-[#1a1a1a]">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleNavigation("/")}
        >
          <img src="/logo.png" className="w-10 h-10" alt="logo" />
          <h2 className="text-lg font-semibold tracking-tight">
            Neuctra<span className="text-[#00c214]">UI</span>
          </h2>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md hover:bg-[#1a1a1a] transition"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* 🧭 Sidebar */}
      <aside
        className={`fixed z-50 overflow-y-scroll top-0 left-0 h-full w-64 bg-gradient-to-b from-[#0a0a0a] to-[#111] border-r border-[#1a1a1a] text-gray-200 shadow-xl transform transition-transform duration-300 ease-in-out rounded-r-2xl
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Logo Header */}
        <div
          className="p-5 flex items-center justify-between border-b border-[#1a1a1a] cursor-pointer"
          onClick={() => handleNavigation("/")}
        >
          <div className="flex items-center gap-1">
            <img src="/logo.png" className="w-10 h-10" alt="logo" />
            <h2 className="text-lg font-semibold tracking-tight">
              Neuctra<span className="text-[#00c214]">UI</span>
            </h2>
            <span className="ml-1 text-sm text-gray-500">Docs</span>
          </div>
        </div>

        {/* 🔗 Navigation Links */}
        <nav className="p-4 space-y-3">
          {navLinks.map((link) =>
            link.subLinks ? (
              <div key={link.category} className="space-y-1">
                <button
                  onClick={() => toggleDropdown(link.category)}
                  className={`flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-lg transition
                  ${
                    activeDropdown === link.category
                      ? "bg-[var(--primary)] !font-bold border-[#00c214]"
                      : "border-[#1a1a1a] hover:border-primary hover:bg-[var(--primary)]"
                  }`}
                >
                  {link.category}
                  {activeDropdown === link.category ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>

                {/* Dropdown Items */}
                {activeDropdown === link.category && (
                  <div className="ml-3 mt-1 space-y-1 border-l border-[#1a1a1a] pl-3">
                    {link.subLinks.map((sub) => (
                      <div
                        key={sub.href}
                        onClick={() => handleNavigation(sub.href)}
                        className={`block px-2 py-1.5 text-sm rounded-md transition cursor-pointer
                        ${
                          isActive(sub.href)
                            ? "text-primary font-bold"
                            : "text-gray-400 hover:text-primary"
                        }`}
                      >
                        {sub.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div
                key={link.href}
                onClick={() => handleNavigation(link.href)}
                className={`block px-3 py-2 text-sm font-medium rounded-lg cursor-pointer transition
                ${
                  isActive(link.href)
                    ? "text-primary font-bold border-[#00c214]"
                    : "text-gray-300 border-[#1a1a1a] hover:border-primary hover:bg-[var(--primary)]"
                }`}
              >
                {link.label}
              </div>
            )
          )}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
