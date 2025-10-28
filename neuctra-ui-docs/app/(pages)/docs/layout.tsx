import type { Metadata } from "next";
import Sidebar from "../../components/docs/Sidebar";

export const metadata: Metadata = {
  title: "Get Started - Neuctra UI a modern UI library with modern designs",
  description:
    "Neuctra UI is a cutting-edge React component library that helps developers build beautiful, responsive, and accessible user interfaces faster. Get started with our comprehensive documentation, customizable components, and modern design system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-zinc-950 w-full min-h-screen text-white">
      {/* Sidebar is fixed, so no flex container needed */}
      <Sidebar />

      {/* Main content with left margin = sidebar width */}
      <main className="ml-64 max-sm:ml-0 max-sm:pt-14 px-4">
        {children}
      </main>
    </div>
  );
}
