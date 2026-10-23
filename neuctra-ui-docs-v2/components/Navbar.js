"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, ExternalLink, ArrowRight } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Docs", href: "/docs" },
    { label: "AI Assistant", href: "/docs/ai-assistant" },
    { label: "Local MCP", href: "/docs/mcp" },
    { label: "Remote MCP", href: "/docs/mcp-http" },
    { label: "CLI", href: "/docs/cli" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
  ];

  // Handle scroll background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 rounded-b-lg left-1/2 -translate-x-1/2 w-full z-50 transition-colors duration-300 ${
        isOpen || isScrolled ? "bg-zinc-950" : "bg-transparent"
      } text-white border-b border-transparent`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between lg:px-0 md:px-8 px-4 py-3 lg:py-3">
        {/* Logo */}
        <Link className="flex items-center gap-2 cursor-pointer" href="/">
          <img src="/logo.png" className="w-10 h-10" alt="logo" />
          <h2 className="text-base font-bold tracking-tight">
            Neuctra <span className="text-[#00c214]">UI</span>
          </h2>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden xl:flex items-center gap-4">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="hover:text-primary text-xs 2xl:text-sm transition whitespace-nowrap"
            >
              {label}
            </Link>
          ))}

          <button
            onClick={() => router.push("/docs")}
            className="flex items-center gap-2 px-4 py-1.5 rounded text-sm bg-primary hover:bg-primary/80 hover:border-primary font-semibold transition duration-300"
          >
            Get started <ArrowRight size={18} />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="xl:hidden text-2xl focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Drawer Nav */}
      <div
        id="mobile-navigation"
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`xl:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[560px] pb-4" : "max-h-0"
        }`}
      >
        <div className="mx-auto grid max-w-2xl grid-cols-2 gap-2 px-4 sm:px-6">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className="rounded-lg border border-zinc-800 px-3 py-3 text-center text-sm transition hover:border-primary/40 hover:text-primary"
            >
              {label}
            </Link>
          ))}
          <button
            onClick={() => {
              setIsOpen(false);
              router.push("/docs");
            }}
            className="col-span-2 flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/80"
          >
            Get started <ExternalLink size={14} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
