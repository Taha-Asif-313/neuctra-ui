"use client";
import { motion } from "framer-motion";
import {
  LayoutTemplate,
  Blocks,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Search,
  Grid3x3,
  Zap,
  Layers,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const TemplateHomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredSection, setHoveredSection] = useState(null);

  const sections = [
    {
      id: "templates",
      title: "Template Blocks",
      description:
        "Complete ready-to-use website templates across industries and use cases.",
      icon: LayoutTemplate,
      gradient: "from-blue-500/20 to-cyan-500/20",
      badge: "Popular",
      items: [
        {
          name: "SaaS",
          href: "/templates/saas",
          popular: true,
          tags: ["Business"],
        },
        {
          name: "Startup",
          href: "/templates/startup",
          popular: true,
          tags: ["Business"],
        },
        {
          name: "Ecommerce",
          href: "/templates/ecommerce",
          popular: true,
          tags: ["Commerce"],
        },
        {
          name: "Marketplace",
          href: "/templates/marketplace",
          tags: ["Commerce"],
        },
        { name: "Agency", href: "/templates/agency", tags: ["Business"] },
        { name: "Portfolio", href: "/templates/portfolio", tags: ["Creative"] },
        {
          name: "Personal Brand",
          href: "/templates/personal",
          tags: ["Creative"],
        },
        { name: "Blog / CMS", href: "/templates/blog", tags: ["Content"] },
        {
          name: "Landing Pages",
          href: "/templates/landing",
          popular: true,
          tags: ["Marketing"],
        },
        { name: "AI Tools", href: "/templates/ai", tags: ["Tech"] },
        { name: "Crypto / Web3", href: "/templates/crypto", tags: ["Tech"] },
        {
          name: "Dashboard Apps",
          href: "/templates/dashboard",
          tags: ["Admin"],
        },
        {
          name: "Education / LMS",
          href: "/templates/education",
          tags: ["Education"],
        },
        { name: "Healthcare", href: "/templates/health", tags: ["Healthcare"] },
        {
          name: "Real Estate",
          href: "/templates/realestate",
          tags: ["Real Estate"],
        },
      ],
    },
    {
      id: "ui-blocks",
      title: "Neuctra UI Blocks",
      description:
        "Atomic UI sections to build modern, scalable interfaces faster.",
      icon: Blocks,
      gradient: "from-purple-500/20 to-pink-500/20",
      badge: "400+ Components",
      items: [
        { name: "Hero Sections", href: "/templates/ui/hero", popular: true },
        { name: "Navbars", href: "/templates/ui/navbar", popular: true },
        { name: "Footers", href: "/templates/ui/footer" },
        {
          name: "Pricing Sections",
          href: "/templates/ui/pricing",
          popular: true,
        },
        { name: "Testimonials", href: "/templates/ui/testimonials" },
        {
          name: "Features Sections",
          href: "/templates/ui/features",
          popular: true,
        },
        { name: "FAQs", href: "/templates/ui/faq" },
        { name: "Call To Action", href: "/templates/ui/cta" },
        { name: "Stats / Metrics", href: "/templates/ui/stats" },
        { name: "Logos / Clients", href: "/templates/ui/logos" },
        { name: "Forms", href: "/templates/ui/forms" },
        { name: "Auth Pages", href: "/templates/ui/auth" },
        { name: "Dashboards", href: "/templates/ui/dashboard" },
        { name: "Tables", href: "/templates/ui/tables" },
        { name: "Cards", href: "/templates/ui/cards", popular: true },
        { name: "Modals", href: "/templates/ui/modals" },
        { name: "Dropdowns", href: "/templates/ui/dropdowns" },
        { name: "Sidebars", href: "/templates/ui/sidebar" },
        { name: "Notifications", href: "/templates/ui/notifications" },
        { name: "Loaders", href: "/templates/ui/loaders" },
        { name: "Tabs", href: "/templates/ui/tabs" },
        { name: "Accordions", href: "/templates/ui/accordions" },
        { name: "Search Bars", href: "/templates/ui/search" },
        { name: "Empty States", href: "/templates/ui/empty" },
        { name: "Error Pages", href: "/templates/ui/error" },
      ],
    },
  ];

  // Filter items based on search
  const filteredSections = sections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((section) => section.items.length > 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative px-6 lg:px-12 py-16">
        {/* 🔥 Enhanced HERO */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto text-center mb-10"
        >
         

       


          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-md mx-auto"
          >
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                size={18}
              />
              <input
                type="text"
                placeholder="Search templates or components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition text-sm"
              />
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6 mt-4"
          >
            {[
              { icon: Layers, label: "Components", value: "400+" },
              { icon: Grid3x3, label: "Templates", value: "50+" },
              { icon: Zap, label: "Ready-to-use", value: "100%" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full"
              >
                <stat.icon size={16} className="text-primary" />
                <span className="text-sm text-zinc-400">
                  <span className="text-white font-semibold">{stat.value}</span>{" "}
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* 🔥 CATEGORY CARDS GRID */}
        <div className="grid gap-3">
       <div className="space-y-10 max-w-7xl mx-auto">
  {filteredSections.map((section) => (
    <div key={section.id}>
      
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-4">
        <section.icon className="text-primary" size={20} />
        <h2 className="text-lg font-semibold">{section.title}</h2>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {section.items.map((item) => (
          <motion.div
            key={item.name}
            whileHover={{ y: -4, scale: 1.02 }}
            onClick={() => navigate(item.href)}
            className="group/card relative cursor-pointer"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-primary/10 rounded-xl opacity-0 group-hover/card:opacity-100 transition" />

            {/* Card */}
            <div className="relative p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 h-full flex flex-col justify-between">
              
              {/* Top */}
              <div className="flex items-start justify-between">
                <div className="text-sm font-medium text-white leading-tight">
                  {item.name}
                </div>

                {item.popular && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-yellow-500/20 text-yellow-400">
                    Popular
                  </span>
                )}
              </div>

              {/* Tags */}
              {item.tags && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Arrow */}
              <div className="flex justify-end mt-4">
                <ArrowRight
                  size={14}
                  className="text-zinc-500 group-hover/card:text-primary group-hover/card:translate-x-1 transition"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  ))}
</div>
        </div>

        {/* Show no results message */}
        {filteredSections.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Search size={48} className="mx-auto text-zinc-600 mb-4" />
            <p className="text-zinc-400">
              No templates found matching "{searchQuery}"
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 text-primary hover:text-primary/80 text-sm"
            >
              Clear search
            </button>
          </motion.div>
        )}

        {/* ✨ ENHANCED CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-24"
        >
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 blur-2xl" />
            <div className="relative px-8 py-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
              <TrendingUp size={32} className="mx-auto text-primary mb-4" />
              <h3 className="text-2xl font-semibold mb-2">
                Ready to build something amazing?
              </h3>
              <p className="text-zinc-400 text-sm mb-6">
                100+ Blocks. Infinite Possibilities. Start building today.
              </p>
              <button
                onClick={() => navigate("/templates")}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/80 rounded-lg transition-all duration-200 hover:scale-105"
              >
                Explore All Templates
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TemplateHomePage;
