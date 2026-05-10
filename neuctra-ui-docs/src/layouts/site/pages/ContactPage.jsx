"use client";
import React from "react";
import {
  Mail,
  Github,
  Twitter,
  Linkedin,
  Send,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button, Container, Input, Textarea } from "@neuctra/ui";
import Metadata from "../../../MetaData";

const channels = [
  {
    title: "Email",
    value: "contact@neuctraui.com",
    href: "mailto:contact@neuctraui.com",
    icon: <Mail className="h-5 w-5 text-primary" />,
    helper: "For support, partnerships, and product feedback.",
  },
  {
    title: "GitHub",
    value: "github.com/Taha-Asif-313/neuctra",
    href: "https://github.com/Taha-Asif-313/neuctra",
    icon: <Github className="h-5 w-5 text-primary" />,
    helper: "Issues, discussions, and open-source contributions.",
  },
  {
    title: "Twitter / X",
    value: "@neuctraui",
    href: "https://twitter.com/neuctraui",
    icon: <Twitter className="h-5 w-5 text-primary" />,
    helper: "Release updates, design tips, and announcements.",
  },
  {
    title: "LinkedIn",
    value: "Neuctra UI",
    href: "https://www.linkedin.com",
    icon: <Linkedin className="h-5 w-5 text-primary" />,
    helper: "Professional updates and collaborations.",
  },
];

export default function ContactPage() {
  return (
    <>
      <Metadata
        title="Contact — Neuctra UI"
        description="Get in touch with the Neuctra UI team for support, feedback, contributions, and collaboration."
      />

      <div className="text-gray-100 min-h-screen pt-14 pb-16">
        <Container className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 space-y-10">
          <section className="relative overflow-hidden rounded-2xl border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 p-8 md:p-10">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(0,194,20,0.14),transparent_45%)]" />
            <div className="relative space-y-4">
              <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                Contact
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white">
                Let&apos;s build something great together
              </h1>
              <p className="text-zinc-300 text-base md:text-lg max-w-3xl leading-relaxed">
                Reach out for component support, product feedback, bug reports,
                or collaboration opportunities. We usually respond within 1-2
                business days.
              </p>
              <Link to="/docs">
                <Button variant="outline" iconAfter={<ArrowRight size={16} />}>
                  Explore Documentation
                </Button>
              </Link>
            </div>
          </section>

          <section className="grid lg:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6 md:p-7">
              <h2 className="text-2xl font-semibold text-white mb-5">
                Contact Channels
              </h2>
              <div className="space-y-3">
                {channels.map((channel) => (
                  <a
                    key={channel.title}
                    href={channel.href}
                    target={
                      channel.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      channel.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="block rounded-xl border border-zinc-800 bg-zinc-900/70 p-4 hover:border-zinc-700 hover:bg-zinc-900 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-primary/10 p-2.5">
                        {channel.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">
                          {channel.title}
                        </h3>
                        <p className="text-sm text-zinc-300 mt-0.5">
                          {channel.value}
                        </p>
                        <p className="text-xs text-zinc-400 mt-1">
                          {channel.helper}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6 md:p-7">
              <h2 className="text-2xl font-semibold text-white mb-5">
                Send a Message
              </h2>

              <form
                className="space-y-4"
                onSubmit={(event) => {
                  event.preventDefault();
                }}
              >
                <Input
                  label="Name"
                  name="name"
                  placeholder="Your full name"
                  required
                />

                <Input
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  required
                />

                <Textarea
                  label="Message"
                  name="message"
                  rows={6}
                  placeholder="Tell us what you are building and how we can help."
                  required
                />

                <Button type="submit" iconBefore={<Send className="h-4 w-4" />}>
                  Send Message
                </Button>
              </form>
            </div>
          </section>
        </Container>
      </div>
    </>
  );
}
