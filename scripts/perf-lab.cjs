/* eslint-disable @typescript-eslint/no-require-imports */
/* Lab performance check (Playwright, mobile emulation). Usage: node scripts/perf-lab.cjs http://localhost:3000
 * Lab numbers on localhost are for diagnostics only — they are not field Core Web Vitals. */
const { chromium, devices } = require('playwright');
(async () => {
  const base = process.argv[2] || 'http://localhost:3100';
  const paths = ['/', '/services/geo-aeo-optimizaciya', '/blog/chto-takoe-geo-optimizaciya', '/contacts', '/cases'];
  const browser = await chromium.launch();
  const out = [];
  for (const p of paths) {
    const ctx = await browser.newContext({ ...devices['Pixel 5'] });
    const page = await ctx.newPage();
    const errors = []; const failed = [];
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 160)); });
    page.on('requestfailed', r => failed.push(r.url()));
    page.on('response', r => { if (r.status() >= 400) failed.push(`${r.status()} ${r.url().replace(base,'')}`); });
    await page.addInitScript(() => {
      window.__lcp = 0; window.__cls = 0;
      new PerformanceObserver(l => { for (const e of l.getEntries()) window.__lcp = e.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
      new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
    });
    await page.goto(base + p, { waitUntil: 'networkidle' });
    await page.mouse.wheel(0, 3000); await page.waitForTimeout(1500);
    const m = await page.evaluate(() => {
      const r = performance.getEntriesByType('resource');
      const js = r.filter(x => x.initiatorType === 'script').reduce((a, x) => a + (x.transferSize || 0), 0);
      return { lcp: Math.round(window.__lcp), cls: +window.__cls.toFixed(3), jsKB: Math.round(js / 1024), requests: r.length,
        hOverflow: document.documentElement.scrollWidth > window.innerWidth };
    });
    out.push({ path: p, ...m, consoleErrors: errors.length, errors: errors.slice(0, 3), failed: [...new Set(failed)].slice(0, 5) });
    await ctx.close();
  }
  await browser.close();
  console.log(JSON.stringify(out, null, 1));
})();
