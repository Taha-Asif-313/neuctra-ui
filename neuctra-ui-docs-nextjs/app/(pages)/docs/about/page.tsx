"use client";

import React from "react";
import { Code, Rocket, Palette, Cpu, Zap, Shield } from "lucide-react";
import { Button} from "@neuctra/ui";

const AboutPage: React.FC = () => {
  const features = [
    {
      icon: <Code className="h-6 w-6 text-primary" />,
      title: "Developer Experience",
      description: "Built with TypeScript for superior type safety and autocompletion. Clean, intuitive APIs that just make sense.",
    },
    {
      icon: <Palette className="h-6 w-6 text-primary" />,
      title: "Design System",
      description: "Carefully crafted components following modern design principles. Fully customizable to match your brand identity.",
    },
    {
      icon: <Cpu className="h-6 w-6 text-primary" />,
      title: "Performance",
      description: "Optimized for speed with minimal bundle size. Tree-shakable imports to keep your app lean.",
    },
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "Accessibility",
      description: "WCAG compliant components out of the box. Keyboard navigation and screen reader support built in.",
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Reliability",
      description: "Rigorously tested with React Testing Library. Semantic versioning for predictable updates.",
    },
    {
      icon: <Rocket className="h-6 w-6 text-primary" />,
      title: "Rapid Development",
      description: "Pre-built components that save you hundreds of development hours. Focus on your app logic, not UI boilerplate.",
    },
  ];

  return (
    <div className="bg-zinc-950 font-primary text-gray-200 min-h-screen py-10">
      <div className="space-y-16 max-w-5xl mx-auto px-4">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-white">
            About <span className="text-primary">Neuctra UI</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A modern React component library designed to help developers build beautiful, accessible, and high-performance user interfaces faster.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button
              backgroundColor="var(--primary)"
              textColor="white"
              hoverTextColor="white"
            >
              Get Started
            </Button>
            <Button

              textColor="var(--primary)"
              borderColor="var(--primary)"
            >
              View on GitHub
            </Button>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-white">Our Mission</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Neuctra UI was born out of frustration with existing component libraries that were either too opinionated, too heavy, or lacked proper TypeScript support. We wanted to create something that combined the best aspects of modern web development.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Our goal is to provide developers with a comprehensive set of tools that accelerate UI development without sacrificing customization or performance.
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Built on top of Tailwind CSS, Neuctra embraces utility-first styling while providing carefully designed components that work beautifully out of the box.
              </p>
              <p className="text-gray-300 leading-relaxed">
                We're committed to maintaining an accessible, type-safe library that scales from small side projects to large enterprise applications.
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold text-white">Why Choose Neuctra UI?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                </div>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-white">Built With Modern Technologies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              { name: "React", color: "text-blue-400" },
              { name: "TypeScript", color: "text-blue-500" },
              { name: "Tailwind CSS", color: "text-cyan-400" },
              { name: "Radix UI", color: "text-purple-400" },
              { name: "Framer Motion", color: "text-pink-400" },
              { name: "Lucide Icons", color: "text-green-400" },
              { name: "ESBuild", color: "text-yellow-400" },
              { name: "Jest", color: "text-red-400" },
            ].map((tech, index) => (
              <div key={index} className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800 text-center">
                <span className={`font-mono font-medium ${tech.color}`}>{tech.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Team/Call-to-Action */}
        <section className="bg-gradient-to-r from-zinc-900/50 to-zinc-800/50 p-8 rounded-xl border border-zinc-700 space-y-6 text-center">
          <h2 className="text-2xl font-semibold text-white">Join Our Community</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Neuctra UI is an open-source project built by developers for developers. We welcome contributions, feedback, and ideas from the community.
          </p>
          <div className="flex gap-4 justify-center pt-2">
            <Button

              textColor="white"
              borderColor="var(--primary)"

            >
              Contribute on GitHub
            </Button>
            <Button
              backgroundColor="var(--primary)"
              textColor="white"
              hoverTextColor="white"

            >
              Join Discord
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;