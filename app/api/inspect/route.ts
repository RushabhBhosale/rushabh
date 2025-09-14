/*
  Site Inspector API
  POST /api/inspect { url: string }
*/

import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type InspectRequest = {
  url: string;
};

type InspectResponse = {
  url: string;
  frameworks: string[];
  theme: {
    metaThemeColor?: string | null;
    cssVariables: Record<string, string>;
    topColors: string[];
  };
  fonts: { family: string; src: string[] }[];
  googleFonts: { css: string[]; files: string[] };
  stylesheets: string[];
  images: string[];
  icons: string[];
  scriptsSample: string[];
  notes: string[];
  timings: { renderMs: number; dcl?: number; load?: number };
  page: {
    title: string | null;
    description: string | null;
    canonical: string | null;
    lang: string | null;
    viewport: string | null;
    robotsMeta: string | null;
    manifest: string | null;
  };
  seo: {
    og: Record<string, string>;
    twitter: Record<string, string>;
    jsonLdTypes: string[];
  };
  network: {
    finalUrl: string;
    status: number | null;
    redirects: string[];
    totals: { requests: number; bytes: number };
    byType: Record<string, { requests: number; bytes: number }>;
    headers: { contentType?: string | null; cacheControl?: string | null };
  };
  trackers: string[];
};

// Simple IP rate limiter (in-memory, per-process)
const RATE_LIMIT = { limit: 30, windowMs: 60 * 60 * 1000 };
const rateStore = new Map<string, { count: number; resetAt: number }>();

function getClientIp(req: Request) {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

function isValidHttpUrl(str: string) {
  try {
    const u = new URL(str);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

async function fetchWithTimeout(
  url: string,
  opts: RequestInit & { timeoutMs?: number } = {}
) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), opts.timeoutMs ?? 10000);
  try {
    const res = await fetch(url, {
      ...opts,
      signal: controller.signal,
      headers: {
        "user-agent":
          "DailysparksSiteInspector/1.0 (+https://dailysparks.in/tools/site-inspector)",
        ...(opts.headers || {}),
      },
      cache: "no-store",
    } as RequestInit);
    return res;
  } finally {
    clearTimeout(t);
  }
}

async function robotsAllowUrl(target: string): Promise<boolean | "unknown"> {
  try {
    const { origin } = new URL(target);
    const robotsUrl = `${origin}/robots.txt`;
    const res = await fetchWithTimeout(robotsUrl, { timeoutMs: 6000 });
    if (!res.ok) return "unknown";
    const text = await res.text();

    // Parse very simply: find the User-agent: * group, collect Disallow and Allow patterns
    const lines = text.split(/\r?\n/).map((l) => l.trim());
    let inStar = false;
    const disallow: string[] = [];
    const allow: string[] = [];
    for (const line of lines) {
      if (!line || line.startsWith("#")) continue;
      const [rawKey, ...rest] = line.split(":");
      const key = rawKey?.toLowerCase();
      const value = rest.join(":").trim();
      if (key === "user-agent") {
        inStar = value === "*";
        continue;
      }
      if (!inStar) continue;
      if (key === "disallow") disallow.push(value || "/");
      if (key === "allow") allow.push(value || "/");
      if (key === "sitemap") continue; // ignore
    }

    // If Disallow: / explicitly and not overridden by Allow: / then block
    if (disallow.includes("/")) {
      if (allow.includes("/")) return true; // explicitly allowed
      return false;
    }
    // Otherwise allowed (we are only checking root path level per requirements)
    return true;
  } catch {
    return "unknown";
  }
}

function unique<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

function hex2(n: number) {
  const s = Math.max(0, Math.min(255, Math.round(n)))
    .toString(16)
    .padStart(2, "0");
  return s;
}
function rgbToHex(r: number, g: number, b: number) {
  return `#${hex2(r)}${hex2(g)}${hex2(b)}`.toLowerCase();
}
function hslToRgb(h: number, s: number, l: number) {
  // h: 0..360, s,l: 0..1
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;
  if (h >= 0 && h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}
function parseCssColorToHex(input: string): string | null {
  if (!input) return null;
  const s = input.trim().toLowerCase();
  if (
    s === "transparent" ||
    s === "currentcolor" ||
    s === "inherit" ||
    s === "initial"
  )
    return null;
  // #rgb[a] or #rrggbb[aa]
  if (/^#([0-9a-f]{3,8})$/i.test(s)) {
    const hex = s.replace("#", "");
    if (hex.length === 3 || hex.length === 4) {
      // expand shorthand
      const r = hex[0],
        g = hex[1],
        b = hex[2];
      return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
    }
    if (hex.length === 6 || hex.length === 8) {
      return `#${hex.slice(0, 6)}`.toLowerCase();
    }
  }
  // rgb/rgba
  let m = s.match(/^rgba?\(([^)]+)\)$/);
  if (m) {
    const parts = m[1].split(/\s*,\s*/);
    if (parts.length >= 3) {
      const to255 = (v: string) =>
        v.includes("%") ? (parseFloat(v) / 100) * 255 : parseFloat(v);
      const r = to255(parts[0]);
      const g = to255(parts[1]);
      const b = to255(parts[2]);
      const a = parts[3] !== undefined ? parseFloat(parts[3]) : 1;
      if (isNaN(a) || a <= 0) return null; // ignore fully transparent
      return rgbToHex(r, g, b);
    }
  }
  // hsl/hsla
  m = s.match(/^hsla?\(([^)]+)\)$/);
  if (m) {
    const parts = m[1].split(/\s*,\s*/);
    if (parts.length >= 3) {
      const h = parseFloat(parts[0]);
      const sPct = parts[1].trim();
      const lPct = parts[2].trim();
      const sVal = sPct.endsWith("%")
        ? parseFloat(sPct) / 100
        : parseFloat(sPct);
      const lVal = lPct.endsWith("%")
        ? parseFloat(lPct) / 100
        : parseFloat(lPct);
      const a = parts[3] !== undefined ? parseFloat(parts[3]) : 1;
      if (isNaN(a) || a <= 0) return null;
      const { r, g, b } = hslToRgb(h, sVal, lVal);
      return rgbToHex(r, g, b);
    }
  }
  return null;
}

function countColorsInCss(cssText: string): Map<string, number> {
  const rx = /#([0-9a-fA-F]{3,8})\b|rgba?\([^\)]+\)|hsla?\([^\)]+\)/g;
  const counts = new Map<string, number>();
  let m: RegExpExecArray | null;
  while ((m = rx.exec(cssText))) {
    const raw = m[0];
    const hex = parseCssColorToHex(raw);
    if (!hex) continue;
    counts.set(hex, (counts.get(hex) || 0) + 1);
  }
  return counts;
}

function mergeAndRankColors(
  cssCounts: Map<string, number>,
  computedList: string[],
  metaTheme?: string | null,
  max = 20
): string[] {
  const counts = new Map<string, number>();
  // base from CSS
  for (const [k, v] of cssCounts.entries())
    counts.set(k, (counts.get(k) || 0) + v);
  // computed styles weigh higher
  for (const raw of computedList || []) {
    const hex = parseCssColorToHex(raw);
    if (!hex) continue;
    // de-emphasize near grayscale slightly
    const w = isNearGray(hex) ? 0.4 : 3;
    counts.set(hex, (counts.get(hex) || 0) + w);
  }
  // bump meta theme color
  const metaHex = metaTheme ? parseCssColorToHex(metaTheme) : null;
  if (metaHex) counts.set(metaHex, (counts.get(metaHex) || 0) + 5);

  // deprioritize near white/black dominance
  const result = Array.from(counts.entries())
    .filter(([hex]) => !isTrivial(hex))
    .sort((a, b) => b[1] - a[1])
    .slice(0, max)
    .map(([hex]) => hex);
  return result;
}

function isTrivial(hex: string) {
  const { r, g, b } = parseHex(hex);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  const nearGray = max - min < 8;
  return brightness > 245 || brightness < 10 || nearGray;
}
function isNearGray(hex: string) {
  const { r, g, b } = parseHex(hex);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return max - min < 15;
}
function parseHex(hex: string) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

async function parseCssArtifacts(allCss: string) {
  const out = {
    cssVariables: {} as Record<string, string>,
    fonts: [] as { family: string; src: string[] }[],
    topColors: [] as string[],
  };
  try {
    // dynamic import to avoid bundling at edge
    const css = await import("css");
    const ast = css.parse(allCss);
    const rules: any[] = ast.stylesheet?.rules || [];
    for (const rule of rules) {
      if (
        rule.type === "rule" &&
        Array.isArray(rule.selectors) &&
        rule.selectors.includes(":root")
      ) {
        for (const decl of rule.declarations || []) {
          if (
            decl.type === "declaration" &&
            typeof decl.property === "string" &&
            decl.property.startsWith("--")
          ) {
            out.cssVariables[decl.property] = String(decl.value ?? "");
          }
        }
      }
      if (rule.type === "font-face") {
        let family = "";
        const srcs: string[] = [];
        for (const decl of rule.declarations || []) {
          if (decl.property === "font-family")
            family = String(decl.value || "").replace(/^["']|["']$/g, "");
          if (decl.property === "src") {
            const m = String(decl.value || "").match(/url\(([^)]+)\)/g) || [];
            for (const mm of m) {
              const url = mm
                .replace(/url\(([^)]+)\)/, "$1")
                .replace(/^["']|["']$/g, "");
              srcs.push(url);
            }
          }
        }
        if (family) out.fonts.push({ family, src: unique(srcs) });
      }
    }
  } catch {
    // ignore parse errors
  }
  // legacy fill, will be overridden later with computed weighting
  out.topColors = Array.from(countColorsInCss(allCss).keys()).slice(0, 20);
  return out;
}

function detectFrameworks({
  htmlClasses,
  stylesheets,
  allCss,
}: {
  htmlClasses: string;
  stylesheets: string[];
  allCss: string;
}): { frameworks: string[]; notes: string[] } {
  const frameworks = new Set<string>();
  const notes: string[] = [];
  const lcCss = allCss.toLowerCase();
  const lcSheets = stylesheets.map((s) => s.toLowerCase());

  // Tailwind
  if (
    /\/\*!?\s*tailwindcss/i.test(allCss) ||
    /(\bbg-|\btext-|\bmd:)/.test(htmlClasses)
  ) {
    frameworks.add("TailwindCSS");
    notes.push("Detected Tailwind utility classes");
  }
  // Bootstrap
  if (
    lcCss.includes("--bs-") ||
    lcSheets.some((s) => s.includes("bootstrap"))
  ) {
    frameworks.add("Bootstrap");
    notes.push("Found --bs- variables (Bootstrap)");
  }
  // Material UI
  if (/\bMui[A-Za-z0-9_-]*/.test(htmlClasses) || /data-emotion/.test(allCss)) {
    frameworks.add("Material UI");
  }
  // Font Awesome
  if (
    /\bfa[srldb]?\b/.test(htmlClasses) ||
    lcSheets.some((s) => s.includes("fontawesome"))
  ) {
    frameworks.add("Font Awesome");
  }

  return { frameworks: Array.from(frameworks), notes };
}

export async function POST(req: Request) {
  // Rate limit
  const ip = getClientIp(req);
  const entry = rateStore.get(ip);
  const now = Date.now();
  if (!entry || now > entry.resetAt) {
    rateStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT.windowMs });
  } else {
    if (entry.count >= RATE_LIMIT.limit) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Try later." },
        { status: 429 }
      );
    }
    entry.count += 1;
  }

  let body: InspectRequest | null = null;
  try {
    body = await req.json();
  } catch {}
  const targetUrl = body?.url?.trim();
  if (!targetUrl || !isValidHttpUrl(targetUrl)) {
    return NextResponse.json({ error: "invalid URL" }, { status: 400 });
  }

  const robots = await robotsAllowUrl(targetUrl);
  if (robots === false) {
    return NextResponse.json({ error: "robots.txt disallow" }, { status: 403 });
  }

  const start = Date.now();

  // Defer heavy imports until needed
  let chromium: any;
  try {
    ({ chromium } = await import("playwright"));
  } catch (e) {
    return NextResponse.json(
      { error: "Server missing dependency: playwright. Please install it." },
      { status: 500 }
    );
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      "DailysparksSiteInspector/1.0 (+https://dailysparks.in/tools/site-inspector)",
  });
  const page = await context.newPage();

  const stylesheetUrls = new Set<string>();
  const imageUrls = new Set<string>();
  const iconUrls = new Set<string>();
  const scriptUrls = new Set<string>();
  const gFontsCss = new Set<string>();
  const gFontsFiles = new Set<string>();

  // Network accounting
  let totalRequests = 0;
  let totalBytes = 0;
  const byType = new Map<string, { requests: number; bytes: number }>();

  function addTypeStat(type: string, bytes: number) {
    const cur = byType.get(type) || { requests: 0, bytes: 0 };
    cur.requests += 1;
    cur.bytes += bytes;
    byType.set(type, cur);
  }

  page.on("response", async (res: any) => {
    try {
      const url = res.url();
      const ct = (res.headers()["content-type"] || "").toLowerCase();
      const clHeader = res.headers()["content-length"];
      const bytes = clHeader ? parseInt(clHeader, 10) || 0 : 0;
      totalRequests += 1;
      totalBytes += bytes;
      let kind = "other";
      if (url.includes("fonts.googleapis.com")) gFontsCss.add(url);
      if (url.includes("fonts.gstatic.com")) gFontsFiles.add(url);
      if (ct.includes("text/css") || /\.css(\?|$)/i.test(url)) {
        stylesheetUrls.add(url);
        kind = "css";
      }
      if (
        ct.startsWith("image/") ||
        /(\.png|\.jpe?g|\.webp|\.gif|\.svg)(\?|$)/i.test(url)
      ) {
        imageUrls.add(url);
        kind = "image";
      }
      if (/icon/i.test(url) || /favicon\.(ico|png)/i.test(url)) {
        iconUrls.add(url);
      }
      if (ct.includes("javascript") || /\.js(\?|$)/i.test(url)) {
        scriptUrls.add(url);
        kind = kind === "other" ? "script" : kind;
      }
      if (ct.includes("font") || /(\.woff2?|\.ttf|\.otf)(\?|$)/i.test(url)) {
        kind = "font";
      }
      addTypeStat(kind, bytes);
    } catch {}
  });

  let navRes: any = null;
  try {
    navRes = await page.goto(targetUrl, {
      waitUntil: "networkidle",
      timeout: 20000,
    });
  } catch (e) {
    await browser.close();
    return NextResponse.json({ error: "timeout" }, { status: 504 });
  }

  // DOM extraction
  const {
    metaThemeColor,
    linkStylesheets,
    linkIcons,
    inlineStyles,
    htmlClassSample,
    computedFonts,
    computedColors,
    pageInfo,
    seoInfo,
    perf,
  } = await page.evaluate(() => {
    const meta = document.querySelector(
      'meta[name="theme-color"], meta[name="Theme-Color"]'
    ) as HTMLMetaElement | null;
    const metaThemeColor = meta?.content || null;

    const linkStylesheets = Array.from(
      document.querySelectorAll('link[rel~="stylesheet"]')
    )
      .map((l) => (l as HTMLLinkElement).href)
      .filter(Boolean);

    const linkIcons = Array.from(
      document.querySelectorAll(
        'link[rel~="icon"], link[rel="apple-touch-icon"], link[rel="mask-icon"]'
      )
    )
      .map((l) => (l as HTMLLinkElement).href)
      .filter(Boolean);

    const inlineStyles = Array.from(document.querySelectorAll("style"))
      .map((s) => s.textContent || "")
      .filter(Boolean);

    const classStrings = Array.from(document.querySelectorAll("[class]"))
      .slice(0, 2000)
      .map((el) => (el as HTMLElement).className || "")
      .join(" ");

    const selectors = [
      "body",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "a",
      "button",
      "input",
      ".btn",
      ".title",
    ];
    const computedFonts = Array.from(
      new Set(
        selectors
          .flatMap((sel) => Array.from(document.querySelectorAll(sel)))
          .map((el) => getComputedStyle(el as Element).fontFamily || "")
          .filter(Boolean)
      )
    );

    // Collect computed color usages across elements
    const sampleEls = Array.from(
      document.querySelectorAll(
        "body, header, main, footer, section, nav, button, a, h1, h2, h3, h4, h5, h6, p, div, span"
      )
    ).slice(0, 1500) as HTMLElement[];
    const colorProps = [
      "color",
      "backgroundColor",
      "borderTopColor",
      "borderRightColor",
      "borderBottomColor",
      "borderLeftColor",
      "outlineColor",
      "fill",
      "stroke",
    ] as const;
    const computedColors: string[] = [];
    for (const el of sampleEls) {
      const cs = getComputedStyle(el);
      for (const prop of colorProps) {
        const v = (cs as any)[prop];
        if (v && typeof v === "string") computedColors.push(v);
      }
    }

    const pageInfo = {
      title: document.title || null,
      description:
        (
          document.querySelector(
            'meta[name="description"]'
          ) as HTMLMetaElement | null
        )?.content || null,
      canonical:
        (
          document.querySelector(
            'link[rel="canonical"]'
          ) as HTMLLinkElement | null
        )?.href || null,
      lang: document.documentElement.getAttribute("lang"),
      viewport:
        (
          document.querySelector(
            'meta[name="viewport"]'
          ) as HTMLMetaElement | null
        )?.content || null,
      robotsMeta:
        (
          document.querySelector(
            'meta[name="robots"]'
          ) as HTMLMetaElement | null
        )?.content || null,
      manifest:
        (
          document.querySelector(
            'link[rel="manifest"]'
          ) as HTMLLinkElement | null
        )?.href || null,
    };

    const ogTags: Record<string, string> = {};
    document.querySelectorAll('meta[property^="og:"]').forEach((m) => {
      const p = (m as HTMLMetaElement).getAttribute("property");
      const c = (m as HTMLMetaElement).content;
      if (p && c) ogTags[p] = c;
    });

    const twitterTags: Record<string, string> = {};
    document.querySelectorAll('meta[name^="twitter:"]').forEach((m) => {
      const n = (m as HTMLMetaElement).getAttribute("name");
      const c = (m as HTMLMetaElement).content;
      if (n && c) twitterTags[n] = c;
    });

    const jsonLdTypes: string[] = [];
    document
      .querySelectorAll('script[type="application/ld+json"]')
      .forEach((s) => {
        try {
          const obj = JSON.parse(s.textContent || "{}");
          const t = obj["@type"];
          if (typeof t === "string") jsonLdTypes.push(t);
          else if (Array.isArray(t))
            jsonLdTypes.push(...t.filter((x) => typeof x === "string"));
        } catch {}
      });

    const nav = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    const perf = nav
      ? {
          dcl: Math.round(nav.domContentLoadedEventEnd),
          load: Math.round(nav.loadEventEnd),
        }
      : { dcl: undefined, load: undefined };

    return {
      metaThemeColor,
      linkStylesheets,
      linkIcons,
      inlineStyles,
      htmlClassSample: classStrings,
      computedFonts,
      computedColors,
      pageInfo,
      seoInfo: { og: ogTags, twitter: twitterTags, jsonLdTypes },
      perf,
    };
  });

  // Merge assets
  const stylesheets = unique([
    ...(linkStylesheets || []),
    ...Array.from(stylesheetUrls),
  ]);
  const icons = unique([...(linkIcons || []), ...Array.from(iconUrls)]);
  const images = unique(Array.from(imageUrls));
  const scriptsSample = unique(Array.from(scriptUrls)).slice(0, 10);

  // Fetch stylesheets and assemble CSS corpus
  const cssChunks: string[] = [];
  for (const href of stylesheets) {
    try {
      const res = await fetchWithTimeout(href, { timeoutMs: 10000 });
      if (res.ok) {
        const text = await res.text();
        cssChunks.push(`\n/* ---- ${href} ---- */\n` + text);
      }
    } catch {}
  }
  cssChunks.push(...(inlineStyles || []));
  const allCss = cssChunks.join("\n\n");

  // Parse CSS artifacts
  const parsed = await parseCssArtifacts(allCss);
  // Re-rank colors using computed usage + meta theme
  const cssCounts = countColorsInCss(allCss);
  const topColors = mergeAndRankColors(
    cssCounts,
    computedColors || [],
    metaThemeColor,
    20
  );

  // Theme & frameworks
  const { frameworks, notes } = detectFrameworks({
    htmlClasses: htmlClassSample || "",
    stylesheets,
    allCss,
  });

  // Fonts: Merge @font-face with computed usage families
  const fonts = parsed.fonts;
  for (const fam of computedFonts || []) {
    const clean = fam.replace(/^["']|["']$/g, "");
    if (!fonts.some((f) => f.family.toLowerCase() === clean.toLowerCase())) {
      fonts.push({ family: clean, src: [] });
    }
  }

  // Redirect chain for main document
  const redirects: string[] = [];
  try {
    let req = navRes?.request();
    while (req?.redirectedFrom()) {
      redirects.unshift(req.redirectedFrom()!.url());
      req = req.redirectedFrom();
    }
  } catch {}

  // Trackers
  const trackers = [] as string[];
  const lowerScripts = scriptsSample.map((s) => s.toLowerCase());
  if (
    lowerScripts.some(
      (s) => s.includes("googletagmanager.com/gtm.js") || s.includes("gtag/js")
    )
  )
    trackers.push("Google Analytics/GTM");
  if (lowerScripts.some((s) => s.includes("plausible.io/js")))
    trackers.push("Plausible");
  if (lowerScripts.some((s) => s.includes("js.segment.com")))
    trackers.push("Segment");
  if (lowerScripts.some((s) => s.includes("connect.facebook.net")))
    trackers.push("Facebook Pixel");
  if (
    lowerScripts.some(
      (s) => s.includes("hotjar.com") || s.includes("static.hotjar")
    )
  )
    trackers.push("Hotjar");
  if (lowerScripts.some((s) => s.includes("mixpanel.com")))
    trackers.push("Mixpanel");
  if (lowerScripts.some((s) => s.includes("cloudflareinsights.com")))
    trackers.push("Cloudflare Insights");

  const resp: InspectResponse = {
    url: targetUrl,
    frameworks,
    theme: {
      metaThemeColor,
      cssVariables: parsed.cssVariables,
      topColors,
    },
    fonts,
    googleFonts: {
      css: unique([...Array.from(gFontsCss)]),
      files: unique([...Array.from(gFontsFiles)]),
    },
    stylesheets,
    images,
    icons,
    scriptsSample,
    notes,
    timings: { renderMs: Date.now() - start, dcl: perf?.dcl, load: perf?.load },
    page: pageInfo,
    seo: seoInfo,
    network: {
      finalUrl: page.url(),
      status: navRes?.status?.() ?? null,
      redirects,
      totals: { requests: totalRequests, bytes: totalBytes },
      byType: Object.fromEntries(byType),
      headers: {
        contentType: navRes?.headers?.()["content-type"] ?? null,
        cacheControl: navRes?.headers?.()["cache-control"] ?? null,
      },
    },
    trackers,
  };

  await browser.close();
  return NextResponse.json(resp);
}
