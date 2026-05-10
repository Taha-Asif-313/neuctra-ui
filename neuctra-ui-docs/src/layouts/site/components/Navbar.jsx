import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ExternalLink, ArrowRight } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Docs", href: "/docs" },
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
        <Link className="flex items-center gap-2 cursor-pointer" to={"/"}>
          <img src="/logo.png" className="w-10 h-10" alt="logo" />
          <h2 className="text-base font-bold tracking-tight">
            Neuctra <span className="text-[#00c214]">UI</span>
          </h2>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              to={href}
              className="hover:text-primary text-sm transition"
            >
              {label}
            </Link>
          ))}

          <button
            onClick={() => navigate("/docs")}
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
              to={href}
              onClick={() => setIsOpen(false)}
              className="hover:text-primary text-sm transition"
            >
              {label}
            </Link>
          ))}
          <button
            onClick={() => {
              setIsOpen(false);
              navigate("/docs");
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
