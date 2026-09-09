import { chromium } from "playwright";
import assert from "node:assert/strict";
const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.addInitScript(() => {
  window.activationEvents = [];
  new MutationObserver(() => {
    window.activationEvents.push({
      at: performance.now(),
      phase: document.documentElement.dataset.syOpening || "complete",
    });
  }).observe(document, {
    subtree: true,
    attributes: true,
    attributeFilter: ["data-sy-opening"],
  });
});
const base = process.env.PORTFOLIO_URL || "http://[::1]:3000";
try {
  for (const [name, min, max] of [
    ["first", 1500, 2600],
    ["return", 600, 1100],
  ]) {
    await page.goto(base + "/switchyard", { waitUntil: "domcontentloaded" });
    await page.locator("[data-opening=complete]").waitFor();
    const events = await page.evaluate(() => window.activationEvents);
    const start = events.find((e) => e.phase === "running");
    const end = events.find((e) => e.phase === "complete");
    assert(start && end, `${name}: missing activation phases`);
    const duration = end.at - start.at;
    assert(duration >= min && duration <= max, `${name}: ${duration}ms`);
    assert.equal(
      await page
        .locator(".hero-name")
        .evaluate((e) => getComputedStyle(e).visibility),
      "visible",
    );
    console.log(name, Math.round(duration), "ms");
  }
  await page.evaluate(() => sessionStorage.clear());
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.mouse.wheel(0, 200);
  await page.waitForTimeout(200);
  assert.equal(
    await page.locator("html").getAttribute("data-sy-opening"),
    null,
  );
  console.log(
    "PASS: full and return opening durations, visible final typography, input interruption",
  );
} finally {
  await browser.close();
}
