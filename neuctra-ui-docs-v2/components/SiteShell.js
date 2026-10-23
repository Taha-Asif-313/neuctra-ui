import Navbar from "./Navbar";
import Footer from "./Footer";

// Chrome shared by every top-level site page (/, /about, /contact, /terms,
// /privacypolicy) — mirrors the old SiteLayout.jsx. Docs pages use
// app/docs/layout.js (Sidebar) instead, never this.
export default function SiteShell({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-primary">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
