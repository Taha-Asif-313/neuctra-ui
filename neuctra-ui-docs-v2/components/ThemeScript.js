import Script from "next/script";

// Runs before hydration (strategy="beforeInteractive") and sets the `.dark`
// class synchronously, before first paint. The Vite SPA applied this class
// in a useEffect (invisible flash in a client-only app), but a statically
// exported, pre-rendered Next.js page needs this inline script or it flashes
// light->dark (or vice versa) on load. Pair with suppressHydrationWarning on
// <html> in app/layout.js.
const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var dark = stored
      ? stored === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", dark);
  } catch (e) {}
})();
`;

export default function ThemeScript() {
  return (
    <Script id="theme-init" strategy="beforeInteractive">
      {THEME_INIT_SCRIPT}
    </Script>
  );
}
