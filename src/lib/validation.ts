/* ── Shared form validation & sanitization ── */

/** Strip HTML tags and dangerous characters */
export function sanitize(input: string): string {
  return input
    .replace(/<[^>]*>/g, "")
    .replace(/[<>"'`]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .trim();
}

/** Validate email format */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Validate phone (at least 6 digits) */
export function isValidPhone(phone: string): boolean {
  return phone.replace(/\D/g, "").length >= 6;
}
