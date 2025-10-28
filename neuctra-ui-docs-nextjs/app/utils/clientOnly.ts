// utils/clientOnly.ts
import dynamic from "next/dynamic";
import type { ComponentType } from "react";

export function clientOnly<T extends ComponentType<any>>(importFunc: () => Promise<{ default: T }>) {
  return dynamic(importFunc, { ssr: false }) as T;
}
