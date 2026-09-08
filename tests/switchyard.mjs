// Real browser checks for the single-stage prototype. Run against the local dev server.
import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
const base = process.env.PORTFOLIO_URL || "http://[::1]:3000";
const out =
  process.env.PORTFOLIO_SCREENSHOTS || "/private/tmp/switchyard-slice";
await mkdir(out, { recursive: true });
const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const errors = [];
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  recordVideo: { dir: out, size: { width: 1440, height: 900 } },
});
const page = await context.newPage();
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
const pause = () => page.waitForTimeout(900);
const travel = async (unit) => {
  await page.evaluate(
    (unit) =>
      scrollTo({ top: unit * innerHeight * 0.065, behavior: "instant" }),
    unit,
  );
  await pause();
};
const shot = async (name) => page.screenshot({ path: `${out}/${name}.png` });
const stage = async () => {
  const metrics = await page
    .locator(".journey-stage")
    .evaluate((e) => ({
      top: e.getBoundingClientRect().top,
      height: e.clientHeight,
      viewport: innerHeight,
      overflow: document.documentElement.scrollWidth > innerWidth,
    }));
  assert(Math.abs(metrics.top) < 1, `Stage moved vertically: ${metrics.top}`);
  assert.equal(metrics.height, metrics.viewport);
  assert.equal(metrics.overflow, false);
  assert.equal(await page.locator(".waypoint:not([inert])").count(), 1);
  assert.equal(
    await page.locator("footer").count(),
    0,
    "No conventional footer at the end of the scroll track",
  );
};
const active = async (id) =>
  assert.equal(
    await page.locator(".journey").getAttribute("data-active-waypoint"),
    id,
  );
try {
  await page.goto(base + "/home");
  await page.locator("[data-opening=complete]").waitFor();
  assert.equal(await page.locator("canvas").getAttribute("data-ready"), "true");
  await stage();
  await shot("01-entry");
  const canvas = await page.locator("canvas").elementHandle();
  await travel(8);
  await shot("02-through-type");
  await travel(25);
  await active("origin");
  await stage();
  await shot("03-origin");
  await travel(51);
  await active("stackport");
  await stage();
  await shot("04-junction");
  assert.equal(
    await page.locator(".journey").getAttribute("data-route"),
    "main",
  );
  await page.mouse.wheel(0, 2200);
  await pause();
  await active("district");
  await stage();
  await shot("05-passed-junction");
  assert.equal(await page.locator("canvas").getAttribute("data-branch"), "-1");
  // TEST B: reversible selection — D selects StackPort, A returns to MAIN
  // before the commit point, and the runner continues straight.
  await travel(51);
  await page.keyboard.press("d");
  await pause();
  assert.equal(
    await page
      .locator('.junction-choice button[data-selected="true"]')
      .innerText(),
    "STACKPORT →",
  );
  await page.keyboard.press("a");
  await pause();
  assert.equal(
    await page
      .locator('.junction-choice button[data-selected="true"]')
      .innerText(),
    "← MAIN",
  );
  await page.mouse.wheel(0, 1200);
  await pause();
  assert.equal(await page.locator("canvas").getAttribute("data-branch"), "-1");
  await shot("05b-selection-reverted");
  // TEST C: D then cross the commit point locks the StackPort branch.
  await travel(51);
  await page.keyboard.press("d");
  await pause();
  await page.mouse.wheel(0, 1200);
  await pause();
  await active("project");
  assert.equal(await page.locator("canvas").getAttribute("data-branch"), "0");
  await shot("05c-committed-branch");
  // Without the canvas, the homepage is still a pinned waypoint, never a full stacked portfolio.
  await page.locator("canvas").evaluate((e) => (e.style.display = "none"));
  await shot("06-canvas-disabled");
  await stage();
  assert.equal(await page.locator(".journey section").count(), 0);
  assert.equal(await page.locator(".journey-fallback").isVisible(), false);
  await page
    .locator("canvas")
    .evaluate((e) => e.style.removeProperty("display"));
  // Alternative path: explicitly enter, follow the branch, merge, and reverse the same route.
  await travel(51);
  await page.getByRole("button", { name: "ENTER → ↗" }).click();
  await page.waitForTimeout(1800);
  await active("project");
  assert.equal(await page.locator("canvas").getAttribute("data-branch"), "0");
  await stage();
  await shot("07-branch-entry");
  for (const [unit, step] of [
    [70, 1],
    [77, 2],
    [85, 3],
  ]) {
    await travel(unit);
    assert.equal(
      await page.locator(".stage-project").getAttribute("data-step"),
      String(step),
    );
    await stage();
    await shot(`08-branch-step-${step}`);
  }
  // Merge elegance: the branch flag flips exactly once, travel stays
  // monotonic (no backward snap) and bounded (no teleport) across it.
  await travel(86);
  assert.equal(await page.locator("canvas").getAttribute("data-branch"), "0");
  const before = Number(
    await page.locator("canvas").getAttribute("data-distance"),
  );
  await travel(94);
  assert.equal(await page.locator("canvas").getAttribute("data-branch"), "-1");
  const after = Number(
    await page.locator("canvas").getAttribute("data-distance"),
  );
  assert(
    after >= before - 0.3 && after - before < 8,
    `Camera jumped at merge: ${before} -> ${after}`,
  );
  // With the rebalanced pacing the merge lands at the district threshold.
  await active("district");
  await stage();
  await shot("09-rejoined");
  assert.equal(await page.locator("canvas").getAttribute("data-branch"), "-1");
  assert(
    await canvas.evaluate((e) => e === document.querySelector("canvas")),
    "Opening and branches must keep the same canvas",
  );
  await travel(80);
  await active("project");
  await travel(51);
  await active("stackport");
  await page.keyboard.press("m");
  await page.getByRole("dialog").waitFor();
  await pause();
  await shot("10-map");
  await page.keyboard.press("Escape");
  assert.equal(await page.getByRole("dialog").isVisible(), false);
  // Same pinned interaction on phones, with controls and product copy inside the viewport.
  for (const viewport of [
    { width: 390, height: 844 },
    { width: 320, height: 740 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto(base + "/home");
    await page.locator("[data-opening=complete]").waitFor();
    await stage();
    await shot(`mobile-${viewport.width}-entry`);
    await travel(51);
    await stage();
    await shot(`mobile-${viewport.width}-junction`);
    await page.getByRole("button", { name: "ENTER → ↗" }).click();
    await page.waitForTimeout(1800);
    await travel(80);
    await stage();
    const box = await page.locator(".stage-project-layout").boundingBox();
    assert(
      box.y >= 74 && box.y + box.height <= viewport.height - 40,
      `Mobile project does not fit ${JSON.stringify(box)}`,
    );
    await shot(`mobile-${viewport.width}-project`);
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await pause();
  assert(await page.locator(".journey-fallback").isVisible());
  assert.equal(await page.locator(".journey-overlay").isVisible(), false);
  for (const path of [
    "/projects",
    "/about",
    "/blogs",
    "/contact",
    "/Rushabh%20Resume.pdf",
  ]) {
    const response = await page.request.get(base + path);
    assert(response.ok(), `${path}: ${response.status()}`);
  }
  const fallback = await browser.newContext();
  await fallback.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      return type === "webgl" ? null : original.call(this, type, ...args);
    };
  });
  const fp = await fallback.newPage();
  await fp.goto(base + "/home");
  await fp.locator(".journey-fallback").waitFor();
  assert.equal(
    await fp.locator(".journey").getAttribute("data-enhanced"),
    "false",
  );
  await fallback.close();
  const nojs = await browser.newContext({ javaScriptEnabled: false });
  const np = await nojs.newPage();
  await np.goto(base + "/home");
  assert(
    await np
      .getByRole("navigation", { name: "Accessible portfolio index" })
      .isVisible(),
  );
  await nojs.close();
  assert.deepEqual(errors, []);
  console.log(
    "PASS: pinned stage, depth waypoints, natural bypass, branch entry/stages, continuous rejoin, reverse travel, same canvas, canvas-off audit, map, mobile, reduced motion, no WebGL, no JS, direct links, no browser errors",
  );
} finally {
  console.log("browser errors", errors);
  await context.close();
  await browser.close();
}
