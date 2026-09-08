import SiteShell from "@/components/SiteShell";

// Route group — doesn't affect the URL (this still serves "/", "/about",
// etc.) — only its purpose is sharing SiteShell (Navbar+Footer) across the
// top-level site pages without it leaking into /docs/*, which has its own
// Sidebar-based shell in app/docs/layout.js.
export default function SiteGroupLayout({ children }) {
  return <SiteShell>{children}</SiteShell>;
}
