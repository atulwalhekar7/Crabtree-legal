import type { Theme, ColorTokens } from "./types";


/**
 * Returns Tailwind class strings for the current theme.
 */
export function getColors(theme: Theme): ColorTokens {
  return {
    bg: theme === "dark" ? "bg-[#121212]" : "bg-white",
    bgAlt: theme === "dark" ? "bg-[#1C1C1C]" : "bg-[#F8F8F8]",
    text: theme === "dark" ? "text-[#F5F5F5]" : "text-[#2B2B2B]",
    textMuted: theme === "dark" ? "text-[#B0B0B0]" : "text-gray-600",
    textLight: theme === "dark" ? "text-gray-400" : "text-gray-500",
    border: theme === "dark" ? "border-[#2D2D2D]" : "border-gray-200",
    cardBg: theme === "dark" ? "bg-[#1A1A1A]" : "bg-white",
    navBg: theme === "dark" ? "bg-[#121212]/95" : "bg-white/95",
  };
}