import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isValidHttpUrl(str: string) {
  try {
    const u = new URL(str);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

const ALLOWED_EXT = [".woff2", ".woff", ".ttf", ".otf"];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const targetRaw = searchParams.get("url");
  const baseRaw = searchParams.get("base");
  if (!targetRaw) {
    return NextResponse.json({ error: "invalid url" }, { status: 400 });
  }
  let fullUrl: string | null = null;
  if (isValidHttpUrl(targetRaw)) {
    fullUrl = targetRaw;
  } else if (baseRaw && isValidHttpUrl(baseRaw)) {
    try {
      fullUrl = new URL(targetRaw, baseRaw).toString();
    } catch {}
  }
  if (!fullUrl) {
    return NextResponse.json({ error: "invalid url" }, { status: 400 });
  }
  const u = new URL(fullUrl);
  const isAllowedExt = ALLOWED_EXT.some((e) => u.pathname.toLowerCase().endsWith(e));
  if (!isAllowedExt) {
    return NextResponse.json({ error: "only font files allowed" }, { status: 400 });
  }

  const headers: Record<string, string> = {
    "user-agent":
      "DailysparksSiteInspector/1.0 (+https://dailysparks.in/tools/site-inspector)",
    accept:
      "font/woff2, font/woff, application/font-woff, application/octet-stream;q=0.8, */*;q=0.1",
  };
  // Some CDNs (e.g., fonts.gstatic.com) require a Referer; use Google Fonts as a safe default
  if (u.hostname.endsWith("fonts.gstatic.com")) {
    headers["referer"] = "https://fonts.googleapis.com/";
  }

  const res = await fetch(fullUrl, { headers, cache: "no-store" });
  if (!res.ok) {
    return NextResponse.json({ error: "failed to download" }, { status: 502 });
  }
  const ct = res.headers.get("content-type") || "application/octet-stream";
  const cd = `attachment; filename="${u.pathname.split("/").pop() || "font"}"`;
  const len = res.headers.get("content-length") || undefined;

  // Prefer streaming body; if not available in this runtime, fallback to buffered
  if (res.body) {
    return new NextResponse(res.body as any, {
      status: 200,
      headers: {
        "content-type": ct,
        "content-disposition": cd,
        "cache-control": "no-store",
        ...(len ? { "content-length": len } : {}),
      },
    });
  } else {
    const arr = await res.arrayBuffer();
    return new NextResponse(Buffer.from(arr), {
      status: 200,
      headers: {
        "content-type": ct,
        "content-disposition": cd,
        "cache-control": "no-store",
        "content-length": String(arr.byteLength),
      },
    });
  }
}
