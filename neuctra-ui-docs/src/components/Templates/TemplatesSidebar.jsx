"use client";
import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  LayoutTemplate,
  Blocks,
  Home,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const TemplatesSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // 🔥 Navigation
  const navLinks = [
    { label: "Home", href: "/templates", icon: Home },

    {
      category: "Template Blocks",
      icon: LayoutTemplate,
      subLinks: [
        { label: "Ecommerce", href: "/templates/ecommerce" },
        { label: "Portfolio", href: "/templates/portfolio" },
        { label: "SaaS", href: "/templates/saas" },
        { label: "Agency", href: "/templates/agency" },
      ],
    },

    {
      category: "Neuctra UI Blocks",
      icon: Blocks,
      subLinks: [
        { label: "Auth Pages", href: "/templates/auth" },
        { label: "Login Pages", href: "/templates/loginPages" },
        { label: "Testimonials", href: "/templates/testimonials" },
        { label: "Footers", href: "/templates/footer" },
      ],
    },
  ];

  // ✅ Auto open correct dropdown based on route
  useEffect(() => {
    navLinks.forEach((link) => {
      if (link.subLinks?.some((s) => s.href === currentPath)) {
        setActiveDropdown(link.category);
      }
    });
  }, [currentPath]);

  const toggleDropdown = (label) => {
    setActiveDropdown((prev) => (prev === label ? null : label));
  };

  const handleNavigation = (href) => {
    navigate(href);
    setIsOpen(false);
  };

  const isActive = (href) => currentPath === href;

  return (
    <>
      {/* 📱 Mobile Topbar */}
      <nav className="fixed w-full flex items-center justify-between z-50 lg:hidden py-4 px-4 bg-[#0a0a0a] border-b border-[#1a1a1a]">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleNavigation("/templates")}
        >
          <img src="/logo.png" className="w-9 h-9" alt="logo" />
          <h2 className="text-lg font-semibold">
            Templates <span className="text-primary">Hub</span>
          </h2>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-[#1a1a1a] rounded-md"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* 📱 Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* 🧭 Sidebar */}
      <aside
        className={`fixed z-50 overflow-y-auto top-0 left-0 h-full w-64 bg-gradient-to-b from-[#0a0a0a] to-[#111] border-r border-[#1a1a1a] text-gray-200 shadow-xl transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div
          onClick={() => handleNavigation("/templates")}
          className="p-5 border-b border-[#1a1a1a] cursor-pointer group"
        >
          <div className="flex items-center gap-1">
            {/* Logo */}
            <div className="relative">
              <img src="/logo.png" className="w-10 h-10" alt="logo" />
            </div>

            {/* Text */}
            <div className="flex flex-col leading-tight">
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-semibold tracking-tight text-white">
                  Neuctra<span className="text-primary">UI</span>
                </h2>

                {/* 🔥 Badge */}
                <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                  Templates
                </span>
              </div>

            
            </div>
          </div>
        </div>

        {/* 🔗 Navigation */}
        <nav className="p-4 space-y-2">
          {navLinks.map((link) =>
            link.subLinks ? (
              <div key={link.category}>
                {/* Dropdown Header */}
                <button
                  onClick={() => toggleDropdown(link.category)}
                  className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg transition
                  ${
                    activeDropdown === link.category
                      ? "bg-primary/10 text-primary font-semibold"
                      : "hover:bg-[#1a1a1a]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <link.icon size={16} />
                    {link.category}
                  </div>

                  {activeDropdown === link.category ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>

                {/* Dropdown Items */}
                {activeDropdown === link.category && (
                  <div className="ml-4 mt-2 space-y-1 border-l border-[#1a1a1a] pl-3">
                    {link.subLinks.map((sub) => (
                      <div
                        key={sub.href}
                        onClick={() => handleNavigation(sub.href)}
                        className={`px-2 py-1.5 text-sm rounded-md cursor-pointer transition
                        ${
                          isActive(sub.href)
                            ? "text-primary font-semibold"
                            : "text-gray-400 hover:text-white"
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
                className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg cursor-pointer transition
                ${
                  isActive(link.href)
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-gray-300 hover:bg-[#1a1a1a]"
                }`}
              >
                <link.icon size={16} />
                {link.label}
              </div>
            ),
          )}
        </nav>
      </aside>
    </>
  );
};

export default TemplatesSidebar;
