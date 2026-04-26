"use client";

import React from "react";
import CodePreviewBlock from "./CodePreviewBlock";

export default function CodePreviewPage({
  title = "Component Preview",
  description,
  code = "",
  preview = null,
  compact = false,
  className = "",
}) {
  return (
    <div
      className={`bg-zinc-950 text-white p-6 space-y-6 ${
        compact ? "rounded-xl border border-zinc-800 min-h-0" : "min-h-screen"
      } ${className}`}
    >
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