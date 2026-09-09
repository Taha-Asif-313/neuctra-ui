"use client";

import CodePreviewBlock from "@/components/CodePreviewBlock";
import { Breadcrumb } from "@neuctra/ui";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility, Home } from "lucide-react";

// Recomputed locally rather than imported from ./layout.js: layout.js is a
// Server Component module and this page.js is a Client Component — pulling
// a value across that boundary via import would drag the whole server
// module (including its default export) into the client bundle. Both files
// call the same pure function with the same args, so they stay in sync.
const breadcrumbFaq = buildComponentFaq("Breadcrumb", { sizes: ["sm", "md"] });

const BreadcrumbDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            Breadcrumb Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            Accessible React breadcrumb navigation with icons, custom
            separators, SPA click handlers and automatic ellipsis collapsing
            for deep paths — built with Tailwind CSS.
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="Breadcrumb-import">
          <h2
            id="Breadcrumb-import"
            className="text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            Import
          </h2>
          <CodeBlock code={`import { Breadcrumb } from "@neuctra/ui";`} />
        </section>

        {/* Example: Basic Usage */}
        <section aria-labelledby="Breadcrumb-example-0">
          <h2
            id="Breadcrumb-example-0"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Basic Usage
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<Breadcrumb
  items={[
    { label: "Home", href: "/", icon: <Home /> },
    { label: "Docs", href: "/docs" },
    { label: "Breadcrumb" },
  ]}
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <Breadcrumb
                  items={[
                    { label: "Home", href: "#", icon: <Home /> },
                    { label: "Docs", href: "#" },
                    { label: "Breadcrumb" },
                  ]}
                />
              </div>
            }
          />
        </section>

        {/* Example: Collapsed Deep Paths */}
        <section aria-labelledby="Breadcrumb-example-1">
          <h2
            id="Breadcrumb-example-1"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Collapsed Deep Paths
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            maxItems keeps long paths short: the first crumb stays, the
            middle collapses into an ellipsis.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<Breadcrumb
  maxItems={3}
  items={[
    { label: "Home", href: "/" },
    { label: "Workspace", href: "/w" },
    { label: "Projects", href: "/w/p" },
    { label: "Website", href: "/w/p/site" },
    { label: "Settings" },
  ]}
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <Breadcrumb
                  maxItems={3}
                  items={[
                    { label: "Home", href: "#" },
                    { label: "Workspace", href: "#" },
                    { label: "Projects", href: "#" },
                    { label: "Website", href: "#" },
                    { label: "Settings" },
                  ]}
                />
              </div>
            }
          />
        </section>

        {/* Example: SPA Navigation */}
        <section aria-labelledby="Breadcrumb-example-2">
          <h2
            id="Breadcrumb-example-2"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            SPA Navigation
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Omit href and pass onClick to integrate with react-router or
            Next.js without full page loads.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const navigate = useNavigate();

<Breadcrumb
  items={[
    { label: "Dashboard", onClick: () => navigate("/dashboard") },
    { label: "Reports", onClick: () => navigate("/reports") },
    { label: "Q3 Summary" },
  ]}
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <Breadcrumb
                  size="sm"
                  items={[
                    { label: "Dashboard", onClick: () => {} },
                    { label: "Reports", onClick: () => {} },
                    { label: "Q3 Summary" },
                  ]}
                />
              </div>
            }
          />
        </section>

        {/* Props table */}
        <section aria-labelledby="Breadcrumb-props">
          <h2
            id="Breadcrumb-props"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the Breadcrumb component.
          </p>

          <div className="border border-zinc-800 rounded-xl overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-zinc-900 text-gray-200">
                <tr>
                  <th scope="col" className="text-left p-3">
                    Prop
                  </th>
                  <th scope="col" className="text-left p-3">
                    Type
                  </th>
                  <th scope="col" className="text-left p-3">
                    Default
                  </th>
                  <th scope="col" className="text-left p-3">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-gray-300">
                {[
                  ["items", "BreadcrumbItem[]", "—", "Trail entries (required); last item is the current page"],
                  ["items[].label", "ReactNode", "—", "Crumb text"],
                  ["items[].href", "string", "—", "Renders an <a>; omit for a button"],
                  ["items[].icon", "ReactNode", "—", "Leading icon"],
                  ["items[].onClick", "(e) => void", "—", "SPA navigation handler"],
                  ["separator", "ReactNode", "chevron", "Custom separator between crumbs"],
                  ["maxItems", "number", "—", "Collapse the middle into an ellipsis beyond this count"],
                  ["size", '"sm" | "md"', '"md"', "Text and icon scale"],
                  ["listClassName", "string", "—", "Styles the ordered list (<ol>) wrapping all crumbs"],
                  ["itemClassName", "string", "—", "Styles each crumb's list item (<li>)"],
                  ["activeItemClassName", "string", "—", "Styles the current-page crumb (last item)"],
                  ["triggerClassName", "string", "—", "Styles each clickable crumb's link/button"],
                  ["iconClassName", "string", "—", "Styles a crumb's leading icon wrapper"],
                  ["labelClassName", "string", "—", "Styles a crumb's label text"],
                  ["separatorClassName", "string", "—", "Styles the separator between crumbs"],
                  ["ellipsisClassName", "string", "—", "Styles the collapsed-middle ellipsis item"],
                ].map(([prop, type, def, desc]) => (
                  <tr key={prop}>
                    <td className="p-3 font-medium text-primary whitespace-nowrap">
                      {prop}
                    </td>
                    <td className="p-3 font-mono text-xs text-gray-300">
                      {type}
                    </td>
                    <td className="p-3 text-gray-400 whitespace-nowrap">
                      {def}
                    </td>
                    <td className="p-3">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Accessibility */}
        <section aria-labelledby="Breadcrumb-a11y">
          <h2
            id="Breadcrumb-a11y"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>
              Wrapped in {'<nav aria-label="Breadcrumb">'} with an ordered
              list.
            </li>
            <li>
              The current page carries aria-current="page" and is not a
              link.
            </li>
            <li>Separators and the ellipsis are aria-hidden.</li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={breadcrumbFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </div>
  );
};

export default BreadcrumbDocs;
