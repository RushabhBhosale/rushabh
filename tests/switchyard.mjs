// End-to-end regression checks for the actual journey, not implementation snapshots.
// Run with the dev server: node tests/switchyard.mjs
import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
const base = process.env.PORTFOLIO_URL || "http://localhost:3000";
const output =
  process.env.PORTFOLIO_SCREENSHOTS || "/private/tmp/switchyard-checks";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const errors = [];
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
const pause = () => page.waitForTimeout(850); // Allow the intentionally timed project reveal to settle.
const noOverflow = async () =>
  assert(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
    "Horizontal overflow",
  );
try {
  await page.goto(`${base}/home`);
  await page.locator('[data-motion="full"]').waitFor();
  await pause();
  await noOverflow();
  assert.equal(await page.getByRole("heading", { name: "RUSHABH BHOSALE", exact: true }).count(), 1);
  assert.equal(await page.locator("canvas").getAttribute("data-ready"), "true");
  await page.screenshot({ path: `${output}/desktop-entry.png` });
  await page.evaluate(() => window.scrollTo(0, innerHeight * 0.75));
  await pause();
  await page.screenshot({ path: `${output}/desktop-travel.png` });
  await page
    .getByRole("navigation", { name: "Main navigation", exact: true })
    .getByRole("link", { name: "01 Work" })
    .click();
  await pause();
  const workTop = await page
    .locator(".work-stage")
    .evaluate((e) => e.getBoundingClientRect().top);
  assert(
    workTop >= 70 && workTop <= 95,
    `Work navigation did not reach the station: ${workTop}`,
  );
  for (const [i, name] of [
    "StackPort",
    "ClipNote",
    "AnimeSparks",
    "Headline Thread",
    "Expense Tracker",
  ].entries()) {
    await page
      .getByRole("button", { name: `0${i + 1} ${name}`, exact: true })
      .click();
    await pause();
    assert.equal(
      await page.locator(".project-panel.is-active h3").innerText(),
      name,
    );
    assert.equal(await page.locator(".project-panel:not([inert])").count(), 1);
    const copy = await page
      .locator(".project-panel.is-active .project-copy")
      .boundingBox();
    const stage = await page.locator(".work-stage").boundingBox();
    assert(
      copy.y >= stage.y && copy.y + copy.height <= stage.y + stage.height,
      `${name} copy escapes pinned viewport`,
    );
    await page.screenshot({ path: `${output}/desktop-project-${i + 1}.png` });
  }
  // Natural scrolling can go backward through the same stations.
  await page.mouse.wheel(0, -1000);
  await pause();
  assert.notEqual(
    await page.locator(".project-panel.is-active h3").innerText(),
    "Expense Tracker",
  );
  await page.getByRole("link", { name: "NEXT: THE SIDE ROUTES ↓" }).click();
  await pause();
  assert(
    await page
      .locator("#experiments")
      .evaluate((e) => Math.abs(e.getBoundingClientRect().top) < 120),
  );
  for (const id of ["writing", "experience", "contact"]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await page.screenshot({ path: `${output}/desktop-${id}.png` });
  }
  // All local links and the résumé are real routes/assets; do not send contact messages.
  const urls = await page.locator("a[href]").evaluateAll((links) => [
    ...new Set(
      links
        .map((a) => a.getAttribute("href"))
        .filter((x) => x.startsWith("/"))
        .map((x) => x.split("#")[0])
        .filter(Boolean),
    ),
  ]);
  for (const path of urls) {
    const response = await page.request.get(`${base}${path}`);
    assert(response.ok(), `${path}: ${response.status()}`);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${base}/home`);
  await pause();
  await noOverflow();
  assert.equal(await page.locator(".project-panel:not([inert])").count(), 5);
  assert.equal(
    await page
      .locator(".entry-stage")
      .evaluate((e) => getComputedStyle(e).position),
    "relative",
  );
  await page.screenshot({ path: `${output}/mobile-entry.png` });
  await page.getByRole("button", { name: "ROUTES +" }).click();
  assert.equal(
    await page
      .getByRole("button", { name: "CLOSE −" })
      .getAttribute("aria-expanded"),
    "true",
  );
  await page.keyboard.press("Escape");
  assert.equal(
    await page
      .getByRole("button", { name: "ROUTES +" })
      .getAttribute("aria-expanded"),
    "false",
  );
  await page.getByRole("button", { name: "ROUTES +" }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "01 Work ↗" })
    .click();
  await pause();
  assert.equal(await page.locator("#mobile-routes").count(), 0);
  await page.locator("#clipnote").scrollIntoViewIfNeeded();
  await page.screenshot({ path: `${output}/mobile-project.png` });
  await page.locator("#writing").scrollIntoViewIfNeeded();
  await page.screenshot({ path: `${output}/mobile-writing.png` });
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await page.screenshot({ path: `${output}/mobile-contact.png` });
  // Keyboard navigation and focus styling on desktop.
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${base}/home`);
  await pause();
  await page.keyboard.press("Tab");
  assert.equal(
    await page.evaluate(() => document.activeElement?.textContent),
    "Skip to content",
  );
  await page.keyboard.press("Enter");
  assert.equal(
    await page.evaluate(() => document.activeElement?.id),
    "main-content",
  );
  // Reduced motion also handles a live preference change, without hidden project content.
  await page.emulateMedia({ reducedMotion: "reduce" });
  await pause();
  assert.equal(await page.locator(".project-panel:not([inert])").count(), 5);
  assert.equal(
    await page
      .locator(".work-stage")
      .evaluate((e) => getComputedStyle(e).position),
    "static",
  );
  assert.equal(
    await page.locator("canvas").evaluate((e) => getComputedStyle(e).display),
    "none",
  );
  await page.locator("#stackport").scrollIntoViewIfNeeded();
  await page.screenshot({ path: `${output}/reduced-motion.png` });
  for (const path of [
    "/projects",
    "/about",
    "/contact",
    "/blogs",
    "/blogs/expense-tracker-sms-automation",
    "/tools/site-inspector",
    "/portfolio",
    "/rushabh-bhosale",
  ]) {
    await page.goto(`${base}${path}`);
    await pause();
    await noOverflow();
    assert.equal(
      await page.locator("[data-nextjs-dialog]").count(),
      0,
      `${path} has an error overlay`,
    );
  }
  // Without WebGL, semantic content and project navigation remain available.
  const fallback = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  await fallback.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      if (type === "webgl") return null;
      return original.call(this, type, ...args);
    };
  });
  const fallbackPage = await fallback.newPage();
  await fallbackPage.goto(`${base}/home`);
  await fallbackPage
    .getByRole("heading", { name: "RUSHABH BHOSALE" })
    .waitFor();
  assert.equal(
    await fallbackPage.locator("canvas").getAttribute("data-ready"),
    null,
  );
  await fallback.close();
  assert.deepEqual(errors, [], "Browser errors");
  console.log(
    JSON.stringify(
      {
        result: "PASS",
        checks: [
          "WebGL entry",
          "scroll travel",
          "five project selectors",
          "pinned viewport",
          "backward scrolling",
          "section navigation",
          "local links and résumé",
          "mobile vertical layout",
          "mobile menu and Escape",
          "keyboard skip link",
          "live reduced motion",
          "secondary routes",
          "WebGL fallback",
          "no browser errors",
        ],
        screenshots: output,
      },
      null,
      2,
    ),
  );
} finally {
  await browser.close();
}
