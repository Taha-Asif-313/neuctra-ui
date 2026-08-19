"use client";

import React from "react";
import ComponentDocPage from "../components/ComponentDocPage";
import { Breadcrumb } from "@neuctra/ui";
import { Home } from "lucide-react";

const BreadcrumbDocs = () => (
  <ComponentDocPage
    name="Breadcrumb"
    title="Breadcrumb Component — React Navigation Trail | Neuctra UI"
    description="Accessible React breadcrumb navigation with icons, custom separators, SPA click handlers and automatic ellipsis collapsing for deep paths."
    keywords="react breadcrumb component, breadcrumb navigation ui, tailwind breadcrumbs, navigation trail react, neuctra ui breadcrumb"
    importCode={`import { Breadcrumb } from "@neuctra/ui";`}
    examples={[
      {
        title: "Basic Usage",
        code: `<Breadcrumb
  items={[
    { label: "Home", href: "/", icon: <Home /> },
    { label: "Docs", href: "/docs" },
    { label: "Breadcrumb" },
  ]}
/>`,
        preview: (
          <Breadcrumb
            items={[
              { label: "Home", href: "#", icon: <Home /> },
              { label: "Docs", href: "#" },
              { label: "Breadcrumb" },
            ]}
          />
        ),
      },
      {
        title: "Collapsed Deep Paths",
        description:
          "maxItems keeps long paths short: the first crumb stays, the middle collapses into an ellipsis.",
        code: `<Breadcrumb
  maxItems={3}
  items={[
    { label: "Home", href: "/" },
    { label: "Workspace", href: "/w" },
    { label: "Projects", href: "/w/p" },
    { label: "Website", href: "/w/p/site" },
    { label: "Settings" },
  ]}
/>`,
        preview: (
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
        ),
      },
      {
        title: "SPA Navigation",
        description:
          "Omit href and pass onClick to integrate with react-router or Next.js without full page loads.",
        code: `const navigate = useNavigate();

<Breadcrumb
  items={[
    { label: "Dashboard", onClick: () => navigate("/dashboard") },
    { label: "Reports", onClick: () => navigate("/reports") },
    { label: "Q3 Summary" },
  ]}
/>`,
        preview: (
          <Breadcrumb
            size="sm"
            items={[
              { label: "Dashboard", onClick: () => {} },
              { label: "Reports", onClick: () => {} },
              { label: "Q3 Summary" },
            ]}
          />
        ),
      },
    ]}
    propsTable={[
      { prop: "items", type: "BreadcrumbItem[]", default: "—", description: "Trail entries (required); last item is the current page" },
      { prop: "items[].label", type: "ReactNode", default: "—", description: "Crumb text" },
      { prop: "items[].href", type: "string", default: "—", description: "Renders an <a>; omit for a button" },
      { prop: "items[].icon", type: "ReactNode", default: "—", description: "Leading icon" },
      { prop: "items[].onClick", type: "(e) => void", default: "—", description: "SPA navigation handler" },
      { prop: "separator", type: "ReactNode", default: "chevron", description: "Custom separator between crumbs" },
      { prop: "maxItems", type: "number", default: "—", description: "Collapse the middle into an ellipsis beyond this count" },
      { prop: "size", type: '"sm" | "md"', default: '"md"', description: "Text and icon scale" },
      { prop: "listClassName", type: "string", default: "—", description: "Styles the ordered list (<ol>) wrapping all crumbs." },
      { prop: "itemClassName", type: "string", default: "—", description: "Styles each crumb's list item (<li>)." },
      { prop: "activeItemClassName", type: "string", default: "—", description: "Styles the current-page crumb (last item)." },
      { prop: "triggerClassName", type: "string", default: "—", description: "Styles each clickable crumb's link/button." },
      { prop: "iconClassName", type: "string", default: "—", description: "Styles a crumb's leading icon wrapper." },
      { prop: "labelClassName", type: "string", default: "—", description: "Styles a crumb's label text." },
      { prop: "separatorClassName", type: "string", default: "—", description: "Styles the separator between crumbs." },
      { prop: "ellipsisClassName", type: "string", default: "—", description: "Styles the collapsed-middle ellipsis item." },
    ]}
    a11y={[
      'Wrapped in <nav aria-label="Breadcrumb"> with an ordered list.',
      'The current page carries aria-current="page" and is not a link.',
      "Separators and the ellipsis are aria-hidden.",
    ]}
  />
);

export default BreadcrumbDocs;
