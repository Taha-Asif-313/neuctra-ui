import React from "react";
import { useLocation } from "react-router-dom";
import TemplateAuthPages from "./TemplateAuthPages";
import TemplateDashboardLayout from "./TemplateDashboardLayout";
import TemplateStatCards from "./TemplateStatCards";
import TemplateTableWithActions from "./TemplateTableWithActions";

const TemplatePage = () => {
  const location = useLocation();

  // 🔥 Get full slug (supports /templates/ui/hero)
  const fullSlug = location.pathname.replace("/templates/", "");

  // ✅ Simple check (you can expand later)
  const templateMap = {
    auth: () => <TemplateAuthPages />,
    "dashboard-layout": () => <TemplateDashboardLayout />,
    "stat-cards": () => <TemplateStatCards />,
    "table-with-actions": () => <TemplateTableWithActions />,
  };

  const TemplateComponent = templateMap[fullSlug];

  if (!TemplateComponent) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <h1 className="text-2xl font-bold text-white mb-2">
          Template Not Found
        </h1>
        <p className="text-gray-400">
          This template does not exist or is not created yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-full mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold capitalize text-white">
          Templates for{" "}
          <span className="text-primary"> {fullSlug.replace("/", " / ")}</span>{" "}
          pages
        </h1>
        <p className="text-sm text-gray-300">
          Preview and customize this template
        </p>
      </div>

      {/* Dynamic Template Render */}
      <TemplateComponent />
    </div>
  );
};

export default TemplatePage;
