"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ExternalLink,
  MoveLeft,
  MoveRight,
  ArrowRight,
} from "lucide-react";
import React from "react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Docs", href: "/docs" },
    { label: "About", href: "/about" },
    { label: "Templates", href: "/templates" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 rounded-b-lg left-1/2 -translate-x-1/2 w-full max-w-7xl z-50 transition-colors duration-300 ${
        isOpen || isScrolled ? "bg-zinc-950" : "bg-transparent"
      } text-white border-b ${
        isOpen || isScrolled ? "border-transparent" : "border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between lg:px-0 px-4 py-3 lg:py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-0.5">
          <img src="/logo.png" alt="Logo" className="w-10 object-cover" />
          <h2 className="text-lg font-semibold">
            Neuctra<span className="text-primary">Ui</span>
          </h2>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="hover:text-primary text-sm transition"
            >
              {label}
            </Link>
          ))}

          <button
            onClick={() => router.push("/docs")}
            className="flex items-center gap-2 border border-white px-4 py-1.5 rounded text-sm hover:bg-primary hover:border-primary font-semibold transition duration-300"
          >
            Get started <ArrowRight size={18} />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-2xl focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Drawer Nav */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[500px] pb-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-center gap-4 px-6">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className="hover:text-green-400 text-sm transition"
            >
              {label}
            </Link>
          ))}
          <button
            onClick={() => {
              setIsOpen(false);
              router.push("/docs");
            }}
            className="flex w-full justify-center items-center gap-2 border border-white px-4 py-2 rounded text-sm hover:bg-white hover:text-black transition"
          >
            Get started <ExternalLink size={14} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;