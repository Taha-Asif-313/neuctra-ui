import Link from "next/link";

// No client-only APIs — Server Component.
const Footer = () => {
  return (
    <footer className="border-t border-border bg-background text-secondary">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 text-center sm:gap-4 md:flex-row md:text-left">
        {/* Copyright */}
        <p className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} Neuctra UI. All rights reserved.
        </p>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 md:justify-end">
          <Link href="/about" className="text-secondary hover:text-primary text-sm">
            About
          </Link>
          <Link href="/blog" className="text-secondary hover:text-primary text-sm">
            Blog
          </Link>
          <Link href="/privacypolicy" className="text-secondary hover:text-primary text-sm">
            Privacy Policy
          </Link>
          <Link href="/disclaimer" className="text-secondary hover:text-primary text-sm">
            Disclaimer
          </Link>
          <Link href="/terms" className="text-secondary hover:text-primary text-sm">
            Terms of Service
          </Link>
          <Link href="/contact" className="text-secondary hover:text-primary text-sm">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
