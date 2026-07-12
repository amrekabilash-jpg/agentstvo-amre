/* ── GA4 event helpers (конверсии для Google Ads) ── */

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
  }
}

/** Безопасная отправка события в GA4 (no-op если GA не подключён) */
export function trackEvent(
  name: string,
  params?: Record<string, string | number>
): void {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}

/** Конверсия: успешная отправка формы заявки */
export function trackLeadSubmit(source: string): void {
  trackEvent("generate_lead", { lead_source: source });
}

/** Конверсия: клик по WhatsApp */
export function trackWhatsAppClick(source: string): void {
  trackEvent("whatsapp_click", { click_source: source });
}
