"use clinet";
import React from "react";
import {
  Code,
  Rocket,
  Palette,
  Cpu,
  Zap,
  Shield,
  ArrowRight,
  Github,
  Mail,
} from "lucide-react";
import Link from "next/link";

const AboutPage: React.FC = () => {
  const features = [
    {
      icon: <Code className="h-6 w-6 text-primary" />,
      title: "Developer Experience",
      description:
        "Built with TypeScript for superior type safety and autocompletion. Clean, intuitive APIs that just make sense.",
    },
    {
      icon: <Palette className="h-6 w-6 text-primary" />,
      title: "Design System",
      description:
        "Carefully crafted components following modern design principles. Fully customizable to match your brand identity.",
    },
    {
      icon: <Cpu className="h-6 w-6 text-primary" />,
      title: "Performance",
      description:
        "Optimized for speed with minimal bundle size. Tree-shakable imports to keep your app lean.",
    },
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "Accessibility",
      description:
        "WCAG compliant components out of the box. Keyboard navigation and screen reader support built in.",
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Reliability",
      description:
        "Rigorously tested with React Testing Library. Semantic versioning for predictable updates.",
    },
    {
      icon: <Rocket className="h-6 w-6 text-primary" />,
      title: "Rapid Development",
      description:
        "Pre-built components that save you hundreds of development hours. Focus on your app logic, not UI boilerplate.",
    },
  ];

  return (
    <div className="bg-zinc-950 font-primary px-4 text-gray-100 min-h-screen">
      <main className="pt-20 pb-16 max-sm:pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
      
          {/* Hero Section */}
          <section className="text-center mb-16 sm:mb-20">
            <h1 className="text-3xl sm:text-3xl font-extrabold mb-4 text-white">
              About <span className="text-primary">Neuctra UI</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              A modern React component library designed to help developers build
              beautiful, accessible, and high-performance user interfaces faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/docs"
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://github.com/Taha-Asif-313/neuctra/tree/main/packages/neuctra-ui"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-primary text-primary hover:bg-primary/10 px-6 py-3 rounded-lg transition-colors flex items-center justify-center text-sm sm:text-base"
              >
                View on GitHub
              </a>
            </div>
          </section>

          {/* Mission Statement */}
          <section className="mb-16 sm:mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-white">
              Our Mission
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  Neuctra UI was born out of frustration with existing component
                  libraries that were either too opinionated, too heavy, or lacked
                  proper TypeScript support.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Our goal is to provide developers with tools that accelerate UI
                  development without sacrificing customization or performance.
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  Built on top of Tailwind CSS, Neuctra embraces utility-first
                  styling with carefully designed components.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  We're committed to maintaining an accessible, type-safe library
                  that scales from small projects to large applications.
                </p>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="mb-16 sm:mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-white">
              Why Choose Neuctra UI?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-all hover:shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-gray-700/50 p-2 rounded-lg">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-300 text-sm sm:text-base">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Tech Stack */}
          <section className="mb-16 sm:mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-white">
              Built With Modern Technologies
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[
                { name: "React", color: "text-blue-400" },
                { name: "TypeScript", color: "text-blue-500" },
                { name: "Tailwind CSS", color: "text-cyan-400" },
                { name: "Lucide Icons", color: "text-green-400" },
              ].map((tech, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 p-4 sm:p-5 rounded-lg border border-gray-700 text-center hover:bg-gray-700/50 transition-colors"
                >
                  <span className={`text-sm sm:text-base font-medium ${tech.color}`}>
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Call-to-Action */}
          <section className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 p-8 rounded-xl border border-gray-700">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">
                Join Our Community
              </h2>
              <p className="text-gray-300 mb-6">
                Neuctra UI is an open-source project built by developers for
                developers. We welcome contributions and feedback.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://github.com/Taha-Asif-313/neuctra/tree/main/packages/neuctra-ui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-primary text-primary hover:bg-primary/10 px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <Github className="h-4 w-4" /> Contribute
                </a>
                <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base">
                  <Mail className="h-4 w-4" /> Join Newsletter
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

  
    </div>
  );
};

export default AboutPage;