"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const GoToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null; // nothing to render visually
};

export default GoToTop;
