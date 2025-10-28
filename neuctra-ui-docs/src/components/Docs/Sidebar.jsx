import React, { useState } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState("Basic Components");

  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const navLinks = [
    { label: "Getting Started", href: "/docs" },
    {
      label: "Basic Components",
      subLinks: [
        { label: "Text", href: "/docs/text" },
        { label: "Image", href: "/docs/image" },
        { label: "Button", href: "/docs/button" },
        { label: "Input", href: "/docs/input" },
        { label: "List", href: "/docs/list" },
        { label: "Tabs", href: "/docs/tabs" },
        { label: "VideoPlayer", href: "/docs/videoplayer" },
        { label: "AudioPlayer", href: "/docs/audioplayer" },
        { label: "Container", href: "/docs/container" },
        { label: "Accordation", href: "/docs/accordation" },
        { label: "CheckRadio", href: "/docs/checkradio" },
        { label: "Drawer", href: "/docs/drawer" },
        { label: "Dropdown", href: "/docs/dropdown" },
        { label: "Table", href: "/docs/table" },
        { label: "Card", href: "/docs/card" },
        { label: "GridView", href: "/docs/gridview" },
        { label: "Flexbox", href: "/docs/flexbox" },
        { label: "Alert", href: "/docs/alert" },
        { label: "Badge", href: "/docs/badge" },
        { label: "Modal", href: "/docs/modal" },
        { label: "Avatar", href: "/docs/avatar" },
        { label: "AudioGallery", href: "/docs/audiogallery" },
        { label: "VideoGallery", href: "/docs/videogallery" },
        { label: "ImageGallery", href: "/docs/imagegallery" },
      ],
    },
    { label: "About", href: "/docs/about" },
  ];

  const toggleDropdown = (label) => {
    setActiveDropdown((prev) => (prev === label ? null : label));
  };

  const handleNavigation = (href) => {
    navigate(href);
    setIsOpen(false);
  };

  const isActive = (href) => href === currentPath;

  return (
    <>
      {/* Mobile Nav Toggle */}
      <nav className="fixed w-full flex items-center justify-between z-50 lg:hidden py-4 px-4 bg-[#0a0a0a] text-white shadow-md border-b border-[#1a1a1a]">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleNavigation("/")}
        >
          <div className="w-10 h-10 bg-green-600 rounded-full"></div>
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

      {/* Sidebar */}
      <aside
        className={`fixed z-50 overflow-y-scroll top-0 left-0 h-full w-64 bg-gradient-to-b from-[#0a0a0a] to-[#111] border-r border-[#1a1a1a] text-gray-200 shadow-xl transform transition-transform duration-300 ease-in-out rounded-r-2xl
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Logo */}
        <div
          className="p-5 flex items-center justify-between border-b border-[#1a1a1a] cursor-pointer"
          onClick={() => handleNavigation("/")}
        >
          <div className="flex items-center gap-1">
            <div className="w-10 h-10 bg-green-600 rounded-full"></div>
            <h2 className="text-lg font-semibold tracking-tight">
              Neuctra<span className="text-[#00c214]">UI</span>
            </h2>
            <span className="ml-1 text-sm text-gray-500">Docs</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-3">
          {navLinks.map((link) =>
            link.subLinks ? (
              <div key={link.label} className="space-y-1">
                <button
                  onClick={() => toggleDropdown(link.label)}
                  className={`flex items-center justify-between border-l-2 w-full px-3 py-2 text-sm font-medium rounded-lg transition
            ${
              activeDropdown === link.label
                ? "bg-[var(--primary)] !font-bold border-[#00c214]"
                : "border-[#1a1a1a] hover:border-primary hover:bg-[var(--primary)]"
            }`}
                >
                  {link.label}
                  {activeDropdown === link.label ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>

                {activeDropdown === link.label && (
                  <div className="ml-3 mt-1 space-y-1 border-l border-[#1a1a1a] pl-3">
                    {link.subLinks.map((sub) => (
                      <div
                        key={sub.href}
                        onClick={() => handleNavigation(sub.href)}
                        className={`block px-2 py-1.5 text-sm rounded-md transition cursor-pointer
                  ${isActive(sub.href) ? "text-primary font-bold" : "text-gray-400 hover:text-primary"}`}
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
                className="block px-3 py-2 text-sm font-medium rounded-lg border-l-2 border-[#1a1a1a] hover:border-primary hover:bg-[var(--primary)] cursor-pointer transition"
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
