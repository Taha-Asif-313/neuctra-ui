import Link from "next/link";

// No client-only APIs — Server Component.
const Footer = () => {
  return (
    <footer className="bg-zinc-950 border-t border-gray-800">
      <div className="py-5 px-4 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Copyright */}
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Neuctra UI. All rights reserved.
        </p>

        {/* Footer Links */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link href="/privacypolicy" className="text-gray-400 hover:text-white text-sm">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
            Terms of Service
          </Link>
          <Link href="/contact" className="text-gray-400 hover:text-white text-sm">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
