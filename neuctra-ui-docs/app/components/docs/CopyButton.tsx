"use client";
import { Copy, CopyCheck } from "lucide-react";
import React, { useState } from "react";

interface CopyButtonProps {
  code: string;
}

export default function CopyButton({ code }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Failed to copy");
    }
  };

  return (
    <button
      onClick={copyToClipboard}
      className="absolute top-3 right-3 text-white transition select-none cursor-pointer"
      aria-label="Copy code to clipboard"
    >
      {copied ? (
        <CopyCheck className="h-4 w-4"/>
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </button>
  );
}
