import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names, resolving Tailwind conflicts by argument order.
 *
 * `clsx` alone only concatenates, so `clsx("px-5", "px-2")` emits both and the
 * winner is decided by stylesheet order rather than intent. `twMerge` drops the
 * losing utility, which is what makes a consumer's `className` actually
 * override a component's defaults — pass it LAST.
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
