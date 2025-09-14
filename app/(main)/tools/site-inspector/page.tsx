"use client";

import React from "react";

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

export default function SiteInspectorPage() {
  const [url, setUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [data, setData] = React.useState<InspectResponse | null>(null);
  const [hideBuildCss, setHideBuildCss] = React.useState(true);
  const classification = React.useMemo(() => {
    if (!data) return null;
    return classifyTheme(data.theme);
  }, [data]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setData(null);
    if (!url) {
      setError("Please enter a URL");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/inspect", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        let msg = j?.error || `Request failed (${res.status})`;
        if (res.status === 400) msg = "Invalid URL";
        if (res.status === 403) msg = "Blocked by robots.txt";
        if (res.status === 504) msg = "Timed out while inspecting";
        throw new Error(msg);
      }
      const j = (await res.json()) as InspectResponse;
      setData(j);
    } catch (e: any) {
      setError(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const downloadJson = () => {
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `site-inspect.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3">
        Site Inspector
      </h1>
      <p className="text-center text-sm text-muted-foreground mb-8">
        Informational only. Respects robots.txt. Does not fetch behind
        authentication.
      </p>

      <form onSubmit={onSubmit} className="flex gap-2 max-w-2xl mx-auto mb-10">
        <input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-input bg-background"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground disabled:opacity-50"
        >
          {loading ? "Inspecting…" : "Inspect"}
        </button>
      </form>

      {error && (
        <div className="max-w-2xl mx-auto mb-8 text-red-600 text-center bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3 rounded-lg">
          {error}
        </div>
      )}

      {data && (
        <div className="space-y-8">
          {/* Page Info */}
          <section className="border border-muted rounded-xl p-5">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-lg font-semibold">Page</h2>
                <p className="text-sm text-muted-foreground">
                  {data.network.finalUrl}
                </p>
              </div>
              <div className="text-sm text-muted-foreground">
                Status {data.network.status ?? "-"} ·{" "}
                {data.timings.dcl ? `DCL ${data.timings.dcl}ms` : "DCL -"} ·{" "}
                {data.timings.load ? `Load ${data.timings.load}ms` : "Load -"}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <InfoRow label="Title" value={data.page.title || "(none)"} />
              <InfoRow label="Lang" value={data.page.lang || "(not set)"} />
              <InfoRow
                label="Description"
                value={data.page.description || "(none)"}
              />
              <InfoRow
                label="Viewport"
                value={data.page.viewport || "(none)"}
              />
              <InfoRow
                label="Canonical"
                value={data.page.canonical || "(none)"}
                isLink
              />
              <InfoRow
                label="Manifest"
                value={data.page.manifest || "(none)"}
                isLink
              />
              <InfoRow
                label="Robots Meta"
                value={data.page.robotsMeta || "(none)"}
              />
            </div>
            {data.network.redirects.length ? (
              <div className="mt-3 text-xs text-muted-foreground">
                Redirects: {data.network.redirects.join(" → ")}
              </div>
            ) : null}
          </section>
          {/* Summary */}
          <section className="border border-muted rounded-xl p-5">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-lg font-semibold">Summary</h2>
                <p className="text-sm text-muted-foreground">{data.url}</p>
              </div>
              <div className="text-sm text-muted-foreground">
                Rendered in {data.timings.renderMs} ms
              </div>
            </div>
            {data.notes?.length ? (
              <div className="mt-3 text-sm text-muted-foreground">
                {data.notes.join(" • ")}
              </div>
            ) : null}
          </section>

          {/* Frameworks */}
          <section className="border border-muted rounded-xl p-5">
            <h3 className="font-semibold mb-3">Frameworks/Libraries</h3>
            <div className="flex flex-wrap gap-2">
              {data.frameworks.length ? (
                data.frameworks.map((fw) => (
                  <span
                    key={fw}
                    className="px-3 py-1 rounded-full text-sm border border-input bg-muted/40"
                  >
                    {fw}
                  </span>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">
                  None detected
                </span>
              )}
            </div>
          </section>

          {/* Theme */}
          <section className="border border-muted rounded-xl p-5">
            <h3 className="font-semibold mb-4">Theme</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-sm text-muted-foreground mb-2">
                  Meta theme-color
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-md border"
                    style={{
                      background: data.theme.metaThemeColor || "transparent",
                    }}
                    title={data.theme.metaThemeColor || "none"}
                  />
                  <code className="text-xs">
                    {data.theme.metaThemeColor || "(none)"}
                  </code>
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="text-sm text-muted-foreground mb-2">Classification</div>
                {classification ? (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {classification.primary && (
                      <ColorBadge label="Primary" color={classification.primary} />
                    )}
                    {classification.secondary && (
                      <ColorBadge label="Secondary" color={classification.secondary} />
                    )}
                    {classification.accents.slice(0, 3).map((c) => (
                      <ColorBadge key={c} label="Accent" color={c} />
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground mb-4">No classification</div>
                )}
                <div className="text-sm text-muted-foreground mb-2">Top Colors</div>
                <div className="flex flex-wrap gap-2">
                  {data.theme.topColors.map((c) => (
                    <div key={c} className="flex items-center gap-2 border rounded-lg p-2">
                      <div className="w-5 h-5 rounded border" style={{ background: c }} />
                      <code className="text-xs">{c}</code>
                    </div>
                  ))}
                  {!data.theme.topColors.length && (
                    <span className="text-sm text-muted-foreground">No colors found</span>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-6">
              <div className="text-sm font-medium mb-2">:root variables</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(data.theme.cssVariables).map(([k, v]) => (
                  <div key={k} className="border rounded-lg p-3 text-sm">
                    <div className="font-mono text-xs text-muted-foreground">
                      {k}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div
                        className="w-4 h-4 rounded border"
                        style={{ background: v }}
                      />
                      <div className="font-mono text-xs break-all">{v}</div>
                    </div>
                  </div>
                ))}
                {!Object.keys(data.theme.cssVariables).length && (
                  <div className="text-sm text-muted-foreground">
                    No CSS vars found
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* SEO */}
          <section className="border border-muted rounded-xl p-5">
            <h3 className="font-semibold mb-3">SEO / Social</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <KeyValueList title="Open Graph" data={data.seo.og} />
              <KeyValueList title="Twitter" data={data.seo.twitter} />
              <div>
                <div className="font-medium mb-2">JSON-LD Types</div>
                {data.seo.jsonLdTypes.length ? (
                  <div className="flex flex-wrap gap-2">
                    {data.seo.jsonLdTypes.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-1 rounded border bg-muted/40 text-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="text-muted-foreground">None</div>
                )}
              </div>
            </div>
          </section>

          {/* Fonts */}
          <section className="border border-muted rounded-xl p-5">
            <h3 className="font-semibold mb-3">Fonts ({data.fonts.length})</h3>
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {data.fonts.length ? (
                data.fonts.map((f, idx) => (
                  <div key={idx} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="font-medium">{f.family}</div>
                        {!f.src.length && (
                          <div className="text-xs text-muted-foreground">
                            (computed usage)
                          </div>
                        )}
                      </div>
                    </div>
                    {f.src.length ? (
                      <div className="mt-3 space-y-2">
                        {f.src.map((s) => (
                          <div
                            key={s}
                            className="flex items-center justify-between gap-2"
                          >
                            <div className="text-xs text-muted-foreground truncate max-w-[48ch]">
                              {s}
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => navigator.clipboard.writeText(s)}
                                className="text-xs px-2 py-1 rounded-md border bg-muted/40"
                              >
                                Copy src
                              </button>
                              <a
                                href={`/api/proxy-download?url=${encodeURIComponent(
                                  s
                                )}`}
                                className="text-xs px-2 py-1 rounded-md border bg-muted/40"
                              >
                                Download
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))
              ) : (
                <div className="text-sm text-muted-foreground">
                  No fonts found
                </div>
              )}
            </div>
          </section>

          {/* Assets */}
          <section className="border border-muted rounded-xl p-5">
            <h3 className="font-semibold mb-4">Assets</h3>
            <div className="mb-3 text-xs text-muted-foreground">
              Total requests: {data.network.totals.requests} · Total bytes:{" "}
              {formatBytes(data.network.totals.bytes)}
            </div>
            <div className="mb-4 flex flex-wrap gap-2 text-[11px]">
              {Object.entries(data.network.byType).map(([k, v]) => (
                <span key={k} className="px-2 py-1 rounded border bg-muted/40">
                  {k}: {v.requests} · {formatBytes(v.bytes)}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-medium">
                    Stylesheets ({data.stylesheets?.length})
                  </div>
                  <label className="flex items-center gap-2 text-xs cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hideBuildCss}
                      onChange={(e) => setHideBuildCss(e.target.checked)}
                    />
                    Hide build/bundled files
                  </label>
                </div>
                <StylesheetsList
                  items={data.stylesheets}
                  hideBuild={hideBuildCss}
                />
              </div>

              <div className="space-y-3">
                <div className="font-medium">
                  Images ({data.images?.length})
                </div>
                <ImagePreviewGrid items={data.images} />
              </div>

              <div className="space-y-3">
                <div className="font-medium">Icons</div>
                <IconPreviewGrid items={data.icons} />
              </div>
              <CollapsibleList
                title="Scripts (sample)"
                items={data.scriptsSample}
              />
            </div>
          </section>

          {/* Google Fonts */}
          <section className="border border-muted rounded-xl p-5">
            <h3 className="font-semibold mb-3">Google Fonts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CollapsibleList title="CSS" items={data.googleFonts.css} />
              <CollapsibleList title="Files" items={data.googleFonts.files} />
            </div>
          </section>

          {/* Raw JSON */}
          <section className="border border-muted rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Raw JSON</h3>
              <button
                onClick={downloadJson}
                className="text-sm px-3 py-1.5 rounded-lg border bg-muted/40"
              >
                Download JSON
              </button>
            </div>
            <pre className="whitespace-pre-wrap text-xs bg-muted/40 p-3 rounded-lg overflow-auto max-h-[400px]">
              {JSON.stringify(data, null, 2)}
            </pre>
          </section>
        </div>
      )}
    </main>
  );
}

function CollapsibleList({ title, items }: { title: string; items: string[] }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="border rounded-lg">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between p-3 text-left"
      >
        <span className="font-medium">{title}</span>
        <span className="text-sm text-muted-foreground">{items.length}</span>
      </button>
      {open && (
        <div className="border-t p-3 space-y-2 max-h-[300px] overflow-auto">
          {items.length ? (
            items.map((u) => (
              <div key={u} className="text-xs break-all">
                <a
                  href={u}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {u}
                </a>
              </div>
            ))
          ) : (
            <div className="text-sm text-muted-foreground">None</div>
          )}
        </div>
      )}
    </div>
  );
}

function InfoRow({
  label,
  value,
  isLink,
}: {
  label: string;
  value: string;
  isLink?: boolean;
}) {
  return (
    <div className="flex flex-col">
      <div className="text-muted-foreground text-xs">{label}</div>
      {isLink && value && value !== "(none)" ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="underline break-all"
        >
          {value}
        </a>
      ) : (
        <div className="break-all">{value}</div>
      )}
    </div>
  );
}

function KeyValueList({
  title,
  data,
}: {
  title: string;
  data: Record<string, string>;
}) {
  const entries = Object.entries(data || {});
  return (
    <div>
      <div className="font-medium mb-2">{title}</div>
      {entries.length ? (
        <div className="space-y-2">
          {entries.map(([k, v]) => (
            <div key={k} className="text-xs">
              <span className="font-mono text-muted-foreground">{k}:</span> {v}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-sm text-muted-foreground">None</div>
      )}
    </div>
  );
}

function formatBytes(n: number) {
  if (!n || n < 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  let val = n;
  while (val >= 1024 && i < units.length - 1) {
    val /= 1024;
    i++;
  }
  return `${val.toFixed(val >= 100 ? 0 : val >= 10 ? 1 : 2)} ${units[i]}`;
}

function ColorBadge({ label, color }: { label: string; color: string }) {
  return (
    <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg border text-xs">
      <span className="w-4 h-4 rounded border" style={{ background: color }} title={color} />
      <span className="font-medium">{label}</span>
      <code className="opacity-70">{color}</code>
    </span>
  );
}

function classifyTheme(theme: InspectResponse["theme"]) {
  const varEntries = Object.entries(theme.cssVariables || {});
  const pickFromVars = (keys: RegExp[]) => {
    for (const [k, v] of varEntries) {
      if (keys.some((rx) => rx.test(k))) {
        const hex = parseCssColorToHex(v);
        if (hex) return hex;
      }
    }
    return null;
  };
  const primaryVar = pickFromVars([/--primary/i, /--brand/i]);
  const secondaryVar = pickFromVars([/--secondary/i]);
  const accentVar = pickFromVars([/--accent/i]);

  const palette = dedupeHex(theme.topColors || []);
  const candidates = palette.filter((h) => !isNeutral(h));

  let primary = primaryVar || candidates[0] || palette[0] || null;
  let secondary = secondaryVar || (primary ? candidates.find((c) => hueDistance(primary!, c) >= 20) : candidates[1]) || null;
  const accents: string[] = [];
  if (accentVar) accents.push(accentVar);
  for (const c of candidates) {
    if (!primary || !secondary) break;
    if ([primary, secondary, accentVar].includes(c)) continue;
    if (hueDistance(primary, c) >= 20 && hueDistance(secondary, c) >= 15) {
      accents.push(c);
    }
    if (accents.length >= 4) break;
  }
  return { primary, secondary, accents } as { primary: string | null; secondary: string | null; accents: string[] };
}

function parseCssColorToHex(s: string): string | null {
  if (!s) return null;
  s = s.trim().toLowerCase();
  if (s === "transparent" || s === "currentcolor" || s === "inherit" || s === "initial") return null;
  if (/^#([0-9a-f]{3,8})$/.test(s)) {
    const h = s.replace("#", "");
    if (h.length === 3 || h.length === 4) return `#${h[0]}${h[0]}${h[1]}${h[1]}${h[2]}${h[2]}`;
    if (h.length >= 6) return `#${h.slice(0, 6)}`;
  }
  let m = s.match(/^rgba?\(([^)]+)\)$/);
  if (m) {
    const parts = m[1].split(/\s*,\s*/);
    if (parts.length >= 3) {
      const to255 = (v: string) => (v.includes("%") ? (parseFloat(v) / 100) * 255 : parseFloat(v));
      const r = to255(parts[0]);
      const g = to255(parts[1]);
      const b = to255(parts[2]);
      const a = parts[3] !== undefined ? parseFloat(parts[3]) : 1;
      if (isNaN(a) || a <= 0) return null;
      return toHex(r, g, b);
    }
  }
  m = s.match(/^hsla?\(([^)]+)\)$/);
  if (m) {
    const parts = m[1].split(/\s*,\s*/);
    if (parts.length >= 3) {
      const h = parseFloat(parts[0]);
      const sPct = parts[1].trim();
      const lPct = parts[2].trim();
      const sVal = sPct.endsWith("%") ? parseFloat(sPct) / 100 : parseFloat(sPct);
      const lVal = lPct.endsWith("%") ? parseFloat(lPct) / 100 : parseFloat(lPct);
      const a = parts[3] !== undefined ? parseFloat(parts[3]) : 1;
      if (isNaN(a) || a <= 0) return null;
      const { r, g, b } = hslToRgb(h, sVal, lVal);
      return toHex(r, g, b);
    }
  }
  return null;
}

function toHex(r: number, g: number, b: number) {
  const hx = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
  return `#${hx(r)}${hx(g)}${hx(b)}`.toLowerCase();
}

function hslToRgb(h: number, s: number, l: number) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h >= 0 && h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return { r: (r + m) * 255, g: (g + m) * 255, b: (b + m) * 255 };
}

function hexToHsl(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const r1 = r / 255, g1 = g / 255, b1 = b / 255;
  const max = Math.max(r1, g1, b1), min = Math.min(r1, g1, b1);
  let h = 0, s = 0, l = (max + min) / 2;
  const d = max - min;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case r1:
        h = 60 * (((g1 - b1) / d) % 6);
        break;
      case g1:
        h = 60 * ((b1 - r1) / d + 2);
        break;
      case b1:
        h = 60 * ((r1 - g1) / d + 4);
        break;
    }
  }
  if (h < 0) h += 360;
  return { h, s, l };
}

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
}

function hueDistance(a: string, b: string) {
  const ha = hexToHsl(a).h;
  const hb = hexToHsl(b).h;
  let d = Math.abs(ha - hb);
  if (d > 180) d = 360 - d;
  return d;
}

function isNeutral(hex: string) {
  const { s, l } = hexToHsl(hex);
  const nearGray = s < 0.12;
  const tooLight = l > 0.93;
  const tooDark = l < 0.07;
  return nearGray || tooLight || tooDark;
}

function dedupeHex(colors: string[]) {
  const set = new Set<string>();
  for (const c of colors) {
    const hex = parseCssColorToHex(c);
    if (!hex) continue;
    set.add(hex);
  }
  return Array.from(set);
}

function StylesheetsList({
  items,
  hideBuild,
}: {
  items: string[];
  hideBuild: boolean;
}) {
  const filtered = React.useMemo(() => {
    return items.filter((u) => (hideBuild ? !isBuildArtifact(u) : true));
  }, [items, hideBuild]);

  const grouped = React.useMemo(() => {
    const groups: Record<string, string[]> = {};
    for (const u of filtered) {
      let label = detectStylesheetLabel(u);
      groups[label] = groups[label] || [];
      groups[label].push(u);
    }
    return groups;
  }, [filtered]);

  const labels = Object.keys(grouped);

  return (
    <div className="border rounded-lg">
      <div className="grid grid-cols-1">
        {labels.length ? (
          labels.map((label) => (
            <div key={label} className="border-b last:border-b-0">
              <div className="px-3 py-2 text-sm font-medium bg-muted/30 flex items-center justify-between">
                <span>{label}</span>
                <span className="text-muted-foreground">
                  {grouped[label].length}
                </span>
              </div>
              <div className="p-3 space-y-2 max-h-[220px] overflow-auto">
                {grouped[label].map((u) => {
                  const url = new URL(u, window.location.href);
                  return (
                    <div
                      key={u}
                      className="text-xs break-all flex items-center gap-2"
                    >
                      <span className="px-1.5 py-0.5 rounded bg-muted/50 border text-[10px]">
                        {url.hostname}
                      </span>
                      <a
                        href={u}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        {url.pathname}
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <div className="p-3 text-sm text-muted-foreground">
            No stylesheets
          </div>
        )}
      </div>
      {hideBuild && (
        <div className="border-t p-2 text-[11px] text-muted-foreground">
          Hiding build artifacts (e.g., /_next/*, hashed chunks)
        </div>
      )}
    </div>
  );
}

function detectStylesheetLabel(u: string): string {
  const l = u.toLowerCase();
  if (l.includes("fonts.googleapis.com")) return "Google Fonts CSS";
  if (l.includes("bootstrap")) return "Bootstrap";
  if (l.includes("tailwind")) return "Tailwind CSS";
  if (l.includes("/_next/")) return "Build/Next.js";
  return "Other";
}

function isBuildArtifact(u: string): boolean {
  try {
    const url = new URL(u, window.location.href);
    return (
      url.pathname.includes("/_next/") ||
      /\.[a-f0-9]{8,}\.css(\?|$)/i.test(url.pathname)
    );
  } catch {
    return false;
  }
}

function ImagePreviewGrid({ items }: { items: string[] }) {
  const [limit, setLimit] = React.useState(12);
  const show = items.slice(0, limit);
  return (
    <div className="border rounded-lg">
      <div className="p-3 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[320px] overflow-auto">
        {show.length ? (
          show.map((u) => (
            <a
              key={u}
              href={u}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="w-full aspect-video bg-muted rounded-md overflow-hidden border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={u}
                  alt="preview"
                  className="w-full h-full object-cover group-hover:opacity-90"
                />
              </div>
              <div className="mt-1 text-[10px] text-muted-foreground line-clamp-1 break-all">
                {u}
              </div>
            </a>
          ))
        ) : (
          <div className="col-span-full text-sm text-muted-foreground">
            No images
          </div>
        )}
      </div>
      {items.length > limit && (
        <div className="border-t p-2 text-center">
          <button
            onClick={() => setLimit(items.length)}
            className="text-xs px-2 py-1 rounded border bg-muted/40"
          >
            Show all ({items.length})
          </button>
        </div>
      )}
    </div>
  );
}

function IconPreviewGrid({ items }: { items: string[] }) {
  const [limit, setLimit] = React.useState(24);
  const show = items.slice(0, limit);
  return (
    <div className="border rounded-lg">
      <div className="p-3 grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-3 max-h-[320px] overflow-auto">
        {show.length ? (
          show.map((u) => (
            <a key={u} href={u} target="_blank" rel="noopener noreferrer" className="group">
              <div className="w-10 h-10 bg-muted rounded-md overflow-hidden border grid place-items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={u} alt="icon" className="max-w-full max-h-full object-contain group-hover:opacity-90" />
              </div>
              <div className="mt-1 text-[9px] text-muted-foreground line-clamp-1 break-all" title={u}>
                {u}
              </div>
            </a>
          ))
        ) : (
          <div className="col-span-full text-sm text-muted-foreground">No icons</div>
        )}
      </div>
      {items.length > limit && (
        <div className="border-t p-2 text-center">
          <button onClick={() => setLimit(items.length)} className="text-xs px-2 py-1 rounded border bg-muted/40">
            Show all ({items.length})
          </button>
        </div>
      )}
    </div>
  );
}
