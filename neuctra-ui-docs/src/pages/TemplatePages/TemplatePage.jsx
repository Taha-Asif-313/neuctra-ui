import React from "react";
import { useLocation } from "react-router-dom";

const TemplatePage = () => {
  const location = useLocation();

  // 🔥 Get full slug (supports /templates/ui/hero)
  const fullSlug = location.pathname.replace("/templates/", "");

  // ✅ Simple check (you can expand later)
  const validTemplates = [
    "ecommerce",
    "portfolio",
    "saas",
    "agency",
    "ui/hero",
    "ui/pricing",
  ];

  const isValid = validTemplates.includes(fullSlug);

  if (!isValid) {
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
        {fullSlug.replace("/", " / ")}
      </h1>
      <p className="text-sm text-gray-200">
        Preview and customize this template
      </p>
    </div>

    {/* Preview */}
    <div className="bg-black/40 border border-white/10 rounded-xl p-8 text-center">
      <div className="text-lg font-semibold text-white">
        {fullSlug} Template Preview
      </div>
    </div>
  </div>
);
};

export default TemplatePage;