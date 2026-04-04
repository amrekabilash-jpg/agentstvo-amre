/* ── Shared constants for the Agentsvo project ── */

/** Standard Framer Motion ease curve */
export const EASE = [0.25, 0.46, 0.45, 0.94] as const;

/** Color accent map for service/feature cards */
export const COLOR_MAP = {
  blue: {
    bg: "bg-indigo-50",
    text: "text-[var(--accent-blue)]",
    border: "border-indigo-200",
    hoverBorder: "hover:border-[var(--accent-blue)]",
    iconBg: "bg-[var(--accent-blue)]",
  },
  pink: {
    bg: "bg-pink-50",
    text: "text-[var(--accent-pink)]",
    border: "border-pink-200",
    hoverBorder: "hover:border-[var(--accent-pink)]",
    iconBg: "bg-[var(--accent-pink)]",
  },
  green: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    border: "border-emerald-200",
    hoverBorder: "hover:border-emerald-500",
    iconBg: "bg-emerald-500",
  },
} as const;

export type ColorKey = keyof typeof COLOR_MAP;

/** Max file upload constraints */
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const MAX_FILES = 5;

/** Rate limiting */
export const RATE_LIMIT_MAX = 3;
export const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
