// End-to-end checks for the pinned Switchyard world.
import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";

const base = process.env.PORTFOLIO_URL || "http://[::1]:3000";
const out = process.env.PORTFOLIO_SCREENSHOTS || "/private/tmp/switchyard";
await mkdir(out, { recursive: true });

const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const errors = [];
const context = await browser.newContext({ viewport: { width: 1440, height: 810 } });
const page = await context.newPage();
page.on("pageerror", (error) => errors.push(error.message));
page.on("console", (message) => {
  if (message.type() === "error") errors.push(message.text());
});

const journey = page.locator(".journey");
const canvas = page.locator("canvas");
const activeWaypoint = async (name) => {
  await page.waitForFunction(
    (value) => document.querySelector(".journey")?.getAttribute("data-active-waypoint") === value,
    name,
  );
};
const jump = async (name, waypoint) => {
  await page.getByRole("button", { name: `Go to ${name}` }).click();
  await activeWaypoint(waypoint);
  await page.waitForTimeout(450);
};
const checkStage = async () => {
  const metrics = await page.locator(".journey-stage").evaluate((element) => ({
    top: element.getBoundingClientRect().top,
    height: element.clientHeight,
    viewport: innerHeight,
    horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
  }));
  assert(Math.abs(metrics.top) < 1, `Pinned stage moved: ${metrics.top}`);
  assert.equal(metrics.height, metrics.viewport);
  assert.equal(metrics.horizontalOverflow, false);
  assert.equal(await page.locator(".waypoint:not([inert])").count(), 1);
  assert.equal(await page.locator(".journey section").count(), 0);
  assert.equal(await page.locator("footer").count(), 0);
};
const shot = (name) => page.screenshot({ path: `${out}/${name}.png` });

try {
  await page.goto(`${base}/switchyard`);
  await page.locator("[data-opening=complete]").waitFor();
  await page.waitForFunction(() => document.querySelector("canvas")?.dataset.ready === "true");
  assert.equal(await journey.getAttribute("data-enhanced"), "true");
  assert.match(await page.locator(".hero-name").innerText(), /RUSHABH\s+BHOSALE/);
  await checkStage();
  await shot("01-entry");

  await jump("Capabilities", "capabilities");
  assert.equal(await page.locator(".skill-focus").isVisible(), true);
  assert.equal(await page.locator(".skill-destinations button").count(), 6);
  await page.getByRole("button", { name: /Type & logic/ }).click();
  await page.waitForTimeout(500);
  assert.match(await page.locator(".skill-focus").innerText(), /JavaScript.*TypeScript/s);
  await shot("02-capabilities");

  await jump("Work network", "work");
  assert.equal(await page.locator(".project-route-list button").count(), 5);
  await shot("03-work-network");

  const originalCanvas = await canvas.elementHandle();
  await page.getByRole("button", { name: "Enter StackPort route" }).click();
  await activeWaypoint("project");
  await page.waitForFunction(() => document.querySelector("canvas")?.dataset.branch === "0");
  await page.waitForTimeout(500);
  assert.match(await page.locator(".stage-project").innerText(), /StackPort/);
  await shot("04-stackport-route");

  // Route changes stay available inside a branch and reuse the same world.
  await page.getByRole("button", { name: /Projects/ }).click();
  await page.getByRole("button", { name: /ClipNote/ }).click();
  await page.waitForFunction(() => document.querySelector("canvas")?.dataset.branch === "1");
  await page.waitForTimeout(650);
  assert.match(await page.locator(".stage-project").innerText(), /ClipNote/);
  const renderState = await canvas.evaluate((element) => ({
    camera: element.dataset.camera?.split(",").map(Number),
    routeMix: Number(element.dataset.routeMix),
    frameMs: Number(element.dataset.frameMs),
  }));
  assert(renderState.camera?.every(Number.isFinite));
  assert(renderState.routeMix > 0.75, `Branch blend did not settle: ${renderState.routeMix}`);
  assert(renderState.frameMs <= 100, `Slow render frame: ${renderState.frameMs}`);
  assert(await originalCanvas.evaluate((element) => element === document.querySelector("canvas")));
  await shot("05-route-changed");

  await page.getByRole("button", { name: "Main route", exact: true }).click();
  await page.waitForFunction(() => document.querySelector("canvas")?.dataset.branch === "-1");

  for (const [label, waypoint] of [
    ["Route history", "history"],
    ["Origin point", "education"],
    ["Dispatches", "dispatches"],
    ["Current position", "current"],
  ]) {
    await jump(label, waypoint);
    await checkStage();
  }

  // Recruiter access reaches every region, route, skill, and landmark.
  await page.getByRole("button", { name: /INDEX/ }).click();
  const index = page.getByRole("dialog", { name: "Routes" });
  await index.waitFor();
  assert.equal(await index.getByRole("button", { name: /StackPort/ }).count(), 1);
  assert.equal(await index.getByRole("button", { name: /Frontend/ }).count(), 1);
  assert.equal(await index.getByRole("button", { name: /SITE INSPECTOR/ }).count(), 1);
  await index.getByRole("button", { name: /SITE INSPECTOR/ }).click();
  const inspector = page.getByRole("dialog", { name: "SITE INSPECTOR details" });
  await inspector.waitFor();
  assert.equal(await inspector.locator("img").isVisible(), true);
  assert.match(await inspector.innerText(), /Next\.js.*Web analysis/is);
  await inspector.getByRole("button", { name: /CLOSE/ }).click();

  await page.getByRole("button", { name: /MAP/ }).click();
  const map = page.getByRole("dialog", { name: /FULL TOPOLOGY/ });
  await map.waitFor();
  assert.equal(await map.locator(".map-featured-route").count(), 5);
  assert.equal(await map.locator(".map-landmark").count(), 5);
  await shot("06-full-map");
  await page.keyboard.press("Escape");

  // With the canvas hidden this remains one spatial stage, not a stacked page.
  await canvas.evaluate((element) => { element.style.display = "none"; });
  await checkStage();
  await canvas.evaluate((element) => { element.style.removeProperty("display"); });

  for (const viewport of [
    { width: 390, height: 844 },
    { width: 320, height: 740 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto(`${base}/switchyard`);
    await page.locator("[data-opening=complete]").waitFor();
    await jump("Capabilities", "capabilities");
    await checkStage();
    await jump("Work network", "work");
    await checkStage();
    const visibleRoutes = await page.locator(".project-route-list button").evaluateAll((buttons) =>
      buttons.every((button) => {
        const box = button.getBoundingClientRect();
        return box.left >= 0 && box.right <= innerWidth;
      }),
    );
    assert(visibleRoutes, `Project choices overflow at ${viewport.width}px`);
    await shot(`mobile-${viewport.width}-work`);
  }

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await page.locator(".journey-fallback").waitFor();
  assert.equal(await page.locator(".journey-overlay").isVisible(), false);

  for (const path of ["/projects", "/about", "/blogs", "/contact", "/Rushabh%20Resume.pdf"]) {
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
  const fallbackPage = await fallback.newPage();
  await fallbackPage.goto(`${base}/switchyard`);
  await fallbackPage.locator(".journey-fallback").waitFor();
  assert.equal(await fallbackPage.locator(".journey").getAttribute("data-enhanced"), "false");
  await fallback.close();

  assert.deepEqual(errors, []);
  console.log("PASS: spatial stage, region focus, direct routing, smooth branch changes, map, landmarks, mobile, fallbacks, and browser console");
} finally {
  console.log("browser errors", errors);
  await context.close();
  await browser.close();
}
