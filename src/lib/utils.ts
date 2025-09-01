import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class values and merges Tailwind CSS classes intelligently
 * @param inputs - Array of class values (strings, objects, arrays, etc.)
 * @returns Merged and deduplicated class string
 * 
 * @example
 * cn("px-2 py-1", "px-3", { "bg-red-500": true }) // "py-1 px-3 bg-red-500"
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}