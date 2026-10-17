// Records the pixel size of every screenshot in /public/work and /public/projects
// so frames can match each image's real proportions instead of cropping it.
// Runs before `dev` and `build`; reads image headers only (no dependencies).
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const dirs = ["public/work", "public/projects"];
const out = join(root, "utils/shot-sizes.json");

function size(buf) {
  // PNG: IHDR width/height at 16/20.
  if (buf.readUInt32BE(0) === 0x89504e47) return [buf.readUInt32BE(16), buf.readUInt32BE(20)];
  // WebP (VP8 / VP8L / VP8X).
  if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const chunk = buf.toString("ascii", 12, 16);
    if (chunk === "VP8 ") return [buf.readUInt16LE(26) & 0x3fff, buf.readUInt16LE(28) & 0x3fff];
    if (chunk === "VP8L") {
      const b = buf.readUInt32LE(21);
      return [(b & 0x3fff) + 1, ((b >> 14) & 0x3fff) + 1];
    }
    if (chunk === "VP8X") return [buf.readUIntLE(24, 3) + 1, buf.readUIntLE(27, 3) + 1];
  }
  // JPEG: walk segments to the first start-of-frame marker.
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length) {
      if (buf[i] !== 0xff) { i++; continue; }
      const marker = buf[i + 1];
      const len = buf.readUInt16BE(i + 2);
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return [buf.readUInt16BE(i + 7), buf.readUInt16BE(i + 5)];
      }
      i += 2 + len;
    }
  }
  return null;
}

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, acc);
    else if (/\.(jpe?g|png|webp)$/i.test(name)) acc.push(path);
  }
  return acc;
}

const sizes = {};
for (const dir of dirs) {
  let files = [];
  try {
    files = walk(join(root, dir));
  } catch {
    continue;
  }
  for (const file of files) {
    const s = size(readFileSync(file));
    if (s) sizes["/" + relative(join(root, "public"), file).split(sep).join("/")] = s;
  }
}
const sorted = Object.fromEntries(Object.entries(sizes).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(out, JSON.stringify(sorted, null, 2) + "\n");
console.log(`[shot-sizes] ${Object.keys(sorted).length} images`);
