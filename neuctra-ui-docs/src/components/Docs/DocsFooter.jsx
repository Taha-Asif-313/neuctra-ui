"use client";
import React from "react";

const DocsFooter = ({
  technologies = ["React", "Tailwind CSS", "TypeScript"],
  borderColor = "border-gray-800",
  textColor = "text-gray-400",
  highlightColor = "text-primary",
  className = "",
}) => {
  return (
    <footer
      className={`pt-8 border-t ${borderColor} text-sm ${textColor} ${className}`}
    >
      <p>
        Built with{" "}
        {technologies.map((tech, index) => (
          <span key={tech}>
            <span className={highlightColor}>{tech}</span>
            {index < technologies.length - 2
              ? ", "
              : index === technologies.length - 2
              ? " & "
              : ""}
          </span>
        ))}
        .
      </p>
    </footer>
  );
};

export default DocsFooter;
