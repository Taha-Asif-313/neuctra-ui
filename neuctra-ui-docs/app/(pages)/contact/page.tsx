"use client";
import { Mail, Github, Twitter, Linkedin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-zinc-950 text-gray-100 min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">
            Let's Connect
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Have a question or want to work together? Reach out through any of these channels.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="bg-zinc-800/50 backdrop-blur-sm p-8 rounded-2xl border border-zinc-700/50 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-8 relative after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:w-12 after:h-1 after:bg-primary after:rounded-full">
              Contact Info
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 hover:bg-zinc-700/30 rounded-xl transition-all duration-300">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">Email</h3>
                  <a
                    href="mailto:contact@neuctraui.com"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    contact@neuctraui.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 hover:bg-zinc-700/30 rounded-xl transition-all duration-300">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Github className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">
                    GitHub
                  </h3>
                  <a
                    href="https://github.com/Taha-Asif-313/neuctra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    github.com/Taha-Asif-313/neuctra
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 hover:bg-zinc-700/30 rounded-xl transition-all duration-300">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Twitter className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">
                    Twitter
                  </h3>
                  <a
                    href="https://twitter.com/neuctraui"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    @neuctraui
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-800/50 backdrop-blur-sm p-8 rounded-2xl border border-zinc-700/50 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-8 relative after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:w-12 after:h-1 after:bg-primary after:rounded-full">
              Send a Message
            </h2>

            <form className="space-y-5">
              <div className="space-y-1">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Your message here..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 w-full sm:w-auto"
              >
                <Send className="h-4 w-4" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}