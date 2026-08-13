"use client";

import React, { useState } from "react";
import ComponentDocPage from "../components/ComponentDocPage";
import { Pagination } from "@neuctra/ui";

const InteractiveDemo = ({ size, siblingCount, totalPages = 20 }) => {
  const [page, setPage] = useState(5);
  return (
    <Pagination
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
      size={size}
      siblingCount={siblingCount}
    />
  );
};

const PaginationDocs = () => (
  <ComponentDocPage
    name="Pagination"
    title="Pagination Component — React Page Navigation | Neuctra UI"
    description="Accessible React pagination with smart ellipsis, sibling count control, three sizes and full keyboard support — built with Tailwind CSS."
    keywords="react pagination component, page navigation ui, tailwind pagination, table pagination react, neuctra ui pagination"
    importCode={`import { Pagination } from "@neuctra/ui";`}
    examples={[
      {
        title: "Basic Usage",
        description:
          "Controlled by page + onPageChange. Ellipses appear automatically for long ranges.",
        code: `const [page, setPage] = useState(5);

<Pagination page={page} totalPages={20} onPageChange={setPage} />`,
        preview: <InteractiveDemo />,
      },
      {
        title: "Sibling Count",
        description: "siblingCount controls how many pages flank the current one.",
        code: `<Pagination page={page} totalPages={30} siblingCount={2} onPageChange={setPage} />`,
        preview: <InteractiveDemo siblingCount={2} totalPages={30} />,
      },
      {
        title: "Sizes",
        code: `<Pagination size="sm" page={2} totalPages={5} />
<Pagination size="lg" page={2} totalPages={5} />`,
        preview: (
          <div className="flex flex-col gap-3">
            <InteractiveDemo size="sm" totalPages={5} />
            <InteractiveDemo size="lg" totalPages={5} />
          </div>
        ),
      },
    ]}
    propsTable={[
      { prop: "page", type: "number", default: "—", description: "Current page, 1-based (required)" },
      { prop: "totalPages", type: "number", default: "—", description: "Total number of pages (required)" },
      { prop: "onPageChange", type: "(page: number) => void", default: "—", description: "Fired with the next page" },
      { prop: "siblingCount", type: "number", default: "1", description: "Pages shown on each side of the current page" },
      { prop: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Button size scale" },
      { prop: "disabled", type: "boolean", default: "false", description: "Disable all controls" },
    ]}
    a11y={[
      'Wrapped in <nav aria-label="Pagination">; every button has an aria-label.',
      'The active page carries aria-current="page".',
      "Prev/next disable automatically at the range edges; all buttons show a focus-visible ring.",
    ]}
  />
);

export default PaginationDocs;
