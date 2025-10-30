import React from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-zinc-950 border-t border-gray-800">
      <div className="py-5 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Copyright */}
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Neuctra UI. All rights reserved.
        </p>

        {/* Footer Links */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link to="/privacypolicy" className="text-gray-400 hover:text-white text-sm">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-gray-400 hover:text-white text-sm">
            Terms of Service
          </Link>
          <Link to="/contact" className="text-gray-400 hover:text-white text-sm">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
