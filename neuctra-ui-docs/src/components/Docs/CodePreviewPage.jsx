"use client";

import React from "react";
import CodePreviewBlock from "./CodePreviewBlock";

export default function CodePreviewPage({
  title = "Component Preview",
  description,
  code = "",
  preview = null,
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        {description && (
          <p className="text-gray-400 mt-2 max-w-2xl">
            {description}
          </p>
        )}
      </div>

      {/* Preview + Code */}
      <CodePreviewBlock
        language="jsx"
        code={code}
        previewContent={preview}
      />
    </div>
  );
}