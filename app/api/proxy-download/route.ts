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
  const target = searchParams.get("url");
  if (!target || !isValidHttpUrl(target)) {
    return NextResponse.json({ error: "invalid url" }, { status: 400 });
  }
  const u = new URL(target);
  const isAllowedExt = ALLOWED_EXT.some((e) => u.pathname.toLowerCase().endsWith(e));
  if (!isAllowedExt) {
    return NextResponse.json({ error: "only font files allowed" }, { status: 400 });
  }

  const res = await fetch(target, {
    headers: {
      "user-agent":
        "DailysparksSiteInspector/1.0 (+https://dailysparks.in/tools/site-inspector)",
    },
    cache: "no-store",
  });
  if (!res.ok) {
    return NextResponse.json({ error: "failed to download" }, { status: 502 });
  }
  const ct = res.headers.get("content-type") || "application/octet-stream";
  const cd = `attachment; filename="${u.pathname.split("/").pop() || "font"}"`;
  const body = res.body; // stream passthrough
  return new NextResponse(body, {
    status: 200,
    headers: {
      "content-type": ct,
      "content-disposition": cd,
      "cache-control": "no-store",
    },
  });
}

