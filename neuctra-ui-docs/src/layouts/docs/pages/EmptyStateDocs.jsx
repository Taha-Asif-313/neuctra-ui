"use client";

import React from "react";
import ComponentDocPage from "../components/ComponentDocPage";
import { EmptyState, Button } from "@neuctra/ui";
import { SearchX, FolderOpen, Plus } from "lucide-react";

const EmptyStateDocs = () => (
  <ComponentDocPage
    name="EmptyState"
    title="EmptyState Component — React No-Data Placeholder | Neuctra UI"
    description="React empty state component with icon, title, description and call-to-action slot for no-results and empty-list screens — built with Tailwind CSS."
    keywords="react empty state component, no data placeholder, no results ui, empty list component, tailwind empty state, neuctra ui"
    importCode={`import { EmptyState } from "@neuctra/ui";`}
    examples={[
      {
        title: "Basic Usage",
        code: `<EmptyState
  title="No projects yet"
  description="Create your first project to get started."
/>`,
        preview: (
          <EmptyState
            title="No projects yet"
            description="Create your first project to get started."
          />
        ),
      },
      {
        title: "With Icon & Action",
        code: `<EmptyState
  icon={<FolderOpen />}
  title="No files uploaded"
  description="Drag and drop files here, or click the button below."
  action={<Button size="sm" iconBefore={<Plus size={14} />}>Upload file</Button>}
/>`,
        preview: (
          <EmptyState
            icon={<FolderOpen />}
            title="No files uploaded"
            description="Drag and drop files here, or click the button below."
            action={<Button size="sm" iconBefore={<Plus size={14} />}>Upload file</Button>}
          />
        ),
      },
      {
        title: "Search Results",
        code: `<EmptyState
  size="sm"
  icon={<SearchX />}
  title="No results for “tabel”"
  description="Check the spelling or try a different keyword."
/>`,
        preview: (
          <EmptyState
            size="sm"
            icon={<SearchX />}
            title="No results for “tabel”"
            description="Check the spelling or try a different keyword."
          />
        ),
      },
    ]}
    propsTable={[
      { prop: "title", type: "ReactNode", default: "—", description: "Headline (required)" },
      { prop: "description", type: "ReactNode", default: "—", description: "Supporting copy under the title" },
      { prop: "icon", type: "ReactNode", default: "Inbox icon", description: "Icon shown in the muted circle" },
      { prop: "action", type: "ReactNode", default: "—", description: "Call-to-action slot (usually a Button)" },
      { prop: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Scales padding, icon and text together" },
      { prop: "iconClassName", type: "string", default: "—", description: "Styles the icon wrapper circle." },
      { prop: "titleClassName", type: "string", default: "—", description: "Styles the title heading." },
      { prop: "descriptionClassName", type: "string", default: "—", description: "Styles the description text." },
      { prop: "actionClassName", type: "string", default: "—", description: "Styles the wrapper around the action slot." },
    ]}
    a11y={[
      "The title renders as a semantic <h3>; the icon is decorative (aria-hidden).",
      "Place focus on the action button after content loads empty, if the state is unexpected.",
    ]}
  />
);

export default EmptyStateDocs;
