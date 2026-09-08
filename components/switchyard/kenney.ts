// Kenney asset integration for the Switchyard world.
//
// RUNTIME MANIFEST (source pack file -> public URL):
//   car-kit/race-future.glb                        -> /assets/switchyard/runner.glb
//   city-kit-roads/road-bridge.glb                 -> /assets/switchyard/bridge.glb
//   city-kit-roads/bridge-pillar.glb               -> /assets/switchyard/pier.glb
//   city-kit-roads/light-square.glb                -> /assets/switchyard/lamp.glb
//   city-kit-roads/road-sign-empty.glb             -> /assets/switchyard/sign.glb
//   city-kit-roads/construction-barrier.glb        -> /assets/switchyard/barrier.glb
//   city-kit-roads/traffic-light.glb               -> /assets/switchyard/signal-post.glb
//   industrial/building-a.glb                      -> /assets/switchyard/hall-a.glb
//   industrial/building-b.glb                      -> /assets/switchyard/hall-b.glb
//   industrial/building-c.glb                      -> /assets/switchyard/hall-c.glb
//   industrial/building-d.glb                      -> /assets/switchyard/hall-d.glb
//   industrial/building-e.glb                      -> /assets/switchyard/hall-e.glb
//   industrial/chimney-large.glb                   -> /assets/switchyard/stack-tall.glb
//   industrial/detail-tank-large.glb               -> /assets/switchyard/tank-big.glb
//   industrial/water-tower.glb                     -> /assets/switchyard/tower-water.glb
//   industrial/shipping-container-a.glb            -> /assets/switchyard/crate-a.glb
//   industrial/shipping-container-b.glb            -> /assets/switchyard/crate-b.glb
//   racing/barrierWhite.glb                        -> /assets/switchyard/rail-white.glb
//   racing/lightPostModern.glb                     -> /assets/switchyard/post-modern.glb
//   racing/overhead.glb                            -> /assets/switchyard/gantry.glb
//   racing/billboard.glb                           -> /assets/switchyard/board.glb
//   racing/treeSmall.glb                           -> /assets/switchyard/tree-s.glb
//   racing/treeLarge.glb                           -> /assets/switchyard/tree-l.glb
//   nature-kit/rock_smallA.glb                     -> /assets/switchyard/rock.glb
//
// The original extracted packs under app/assets stay untouched; only the
// curated files above are copied to public/ for runtime serving.
//
// Why a custom parser instead of three.js: the world renders through one raw
// WebGL context with its own fog/lighting language, and every imported part
// is recolored into the Switchyard palette anyway. We only need geometry +
// palette colors out of the GLBs, so a minimal dependency-free parser keeps
// the architecture (and bundle) unchanged.

export type V3 = [number, number, number];

export type KenneyPrimitive = {
  /** Non-indexed positions, already in model space (node transforms baked). */
  positions: Float32Array;
  /** Per-vertex palette color sampled from the embedded texture (0..1). */
  colors: Float32Array;
  /** Per-vertex emissive flag (0/1) from material emissiveFactor. */
  emissive: Uint8Array;
};

export type KenneyModel = {
  primitives: KenneyPrimitive[];
  min: V3;
  max: V3;
  triCount: number;
};

type GLTF = {
  scene?: number;
  scenes: { nodes: number[] }[];
  nodes: {
    mesh?: number;
    matrix?: number[];
    translation?: number[];
    rotation?: number[];
    scale?: number[];
    children?: number[];
  }[];
  meshes: {
    primitives: {
      attributes: Record<string, number>;
      indices?: number;
      material?: number;
      mode?: number;
    }[];
  }[];
  materials?: {
    pbrMetallicRoughness?: {
      baseColorFactor?: number[];
      baseColorTexture?: { index: number; extensions?: Record<string, { offset?: number[]; scale?: number[]; rotation?: number }> };
    };
    emissiveFactor?: number[];
    alphaMode?: string;
  }[];
  textures?: { source: number }[];
  images?: { bufferView?: number; mimeType?: string; uri?: string }[];
  accessors: {
    bufferView: number;
    byteOffset?: number;
    componentType: number;
    count: number;
    type: string;
  }[];
  bufferViews: {
    buffer: number;
    byteOffset?: number;
    byteLength: number;
    byteStride?: number;
  }[];
};

const COMP_SIZE: Record<number, number> = {
  5120: 1,
  5121: 1,
  5122: 2,
  5123: 2,
  5125: 4,
  5126: 4,
};
const TYPE_COUNT: Record<string, number> = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
};

type AccessorData = {
  count: number;
  comps: number;
  get: (i: number, c: number) => number;
};

function readAcc(
  json: GLTF,
  bin: Uint8Array,
  index: number,
): AccessorData {
  const acc = json.accessors[index]!;
  const view = json.bufferViews[acc.bufferView]!;
  const comps = TYPE_COUNT[acc.type] ?? 1;
  const size = COMP_SIZE[acc.componentType] ?? 4;
  const base = (view.byteOffset ?? 0) + (acc.byteOffset ?? 0);
  const stride = view.byteStride ?? comps * size;
  const dv = new DataView(bin.buffer, bin.byteOffset, bin.byteLength);
  const ct = acc.componentType;
  return {
    count: acc.count,
    comps,
    get: (i: number, c: number) => {
      const o = base + i * stride + c * size;
      switch (ct) {
        case 5121:
          return dv.getUint8(o);
        case 5123:
          return dv.getUint16(o, true);
        case 5125:
          return dv.getUint32(o, true);
        case 5126:
          return dv.getFloat32(o, true);
        case 5120:
          return dv.getInt8(o);
        case 5122:
          return dv.getInt16(o, true);
        default:
          return 0;
      }
    },
  };
}

const IDENTITY = (): number[] => [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

function mulMat(a: number[], b: number[]): number[] {
  const o = new Array(16).fill(0);
  for (let c = 0; c < 4; c++)
    for (let r = 0; r < 4; r++)
      o[c * 4 + r] = a[r] * b[c * 4] + a[4 + r] * b[c * 4 + 1] + a[8 + r] * b[c * 4 + 2] + a[12 + r] * b[c * 4 + 3];
  return o;
}

function nodeMatrix(node: GLTF["nodes"][number]): number[] {
  if (node.matrix) return node.matrix.slice();
  const t = node.translation ?? [0, 0, 0];
  const r = node.rotation ?? [0, 0, 0, 1];
  const s = node.scale ?? [1, 1, 1];
  const [x, y, z, w] = r;
  const m: number[] = [
    1 - 2 * (y * y + z * z),
    2 * (x * y + z * w),
    2 * (x * z - y * w),
    0,
    2 * (x * y - z * w),
    1 - 2 * (x * x + z * z),
    2 * (y * z + x * w),
    0,
    2 * (x * z + y * w),
    2 * (y * z - x * w),
    1 - 2 * (x * x + y * y),
    0,
    t[0]!,
    t[1]!,
    t[2]!,
    1,
  ];
  m[0]! *= s[0]!;
  m[1]! *= s[0]!;
  m[2]! *= s[0]!;
  m[4]! *= s[1]!;
  m[5]! *= s[1]!;
  m[6]! *= s[1]!;
  m[8]! *= s[2]!;
  m[9]! *= s[2]!;
  m[10]! *= s[2]!;
  return m;
}

function xformPoint(m: number[], x: number, y: number, z: number): V3 {
  return [
    m[0]! * x + m[4]! * y + m[8]! * z + m[12]!,
    m[1]! * x + m[5]! * y + m[9]! * z + m[13]!,
    m[2]! * x + m[6]! * y + m[10]! * z + m[14]!,
  ];
}

async function decodePalette(
  bytes: Uint8Array,
  mimeType: string,
): Promise<ImageData | null> {
  try {
    const copy = new Uint8Array(bytes.byteLength);
    copy.set(bytes);
    const blob = new Blob([copy.buffer as ArrayBuffer], {
      type: mimeType || "image/png",
    });
    const bmp = await createImageBitmap(blob);
    const cv = document.createElement("canvas");
    cv.width = bmp.width;
    cv.height = bmp.height;
    const ctx = cv.getContext("2d", { willReadFrequently: true });
    if (!ctx) return null;
    ctx.drawImage(bmp, 0, 0);
    return ctx.getImageData(0, 0, bmp.width, bmp.height);
  } catch {
    return null;
  }
}

const paletteCache = new Map<string, ImageData | null>();

async function paletteFromURL(url: string): Promise<ImageData | null> {
  const hit = paletteCache.get(url);
  if (hit !== undefined) return hit;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      paletteCache.set(url, null);
      return null;
    }
    const blob = await res.blob();
    const bmp = await createImageBitmap(blob);
    const cv = document.createElement("canvas");
    cv.width = bmp.width;
    cv.height = bmp.height;
    const ctx = cv.getContext("2d", { willReadFrequently: true });
    if (!ctx) {
      paletteCache.set(url, null);
      return null;
    }
    ctx.drawImage(bmp, 0, 0);
    const data = ctx.getImageData(0, 0, bmp.width, bmp.height);
    paletteCache.set(url, data);
    return data;
  } catch {
    paletteCache.set(url, null);
    return null;
  }
}

/**
 * Parse a GLB ArrayBuffer into model-space primitives with palette colors.
 * Kenney packs point at an external Textures/colormap.png; pass its runtime
 * URL explicitly since the GLB's relative uri can't resolve from public/.
 */
export async function parseKenneyGLB(
  buf: ArrayBuffer,
  paletteUrl?: string,
): Promise<KenneyModel | null> {
  try {
    const bytes = new Uint8Array(buf);
    const dv = new DataView(buf);
    if (dv.getUint32(0, true) !== 0x46546c67) return null;
    const jsonLen = dv.getUint32(12, true);
    const json: GLTF = JSON.parse(
      new TextDecoder().decode(bytes.subarray(20, 20 + jsonLen)),
    );
    let bin = new Uint8Array(0);
    let cursor = 20 + jsonLen;
    while (cursor + 8 <= bytes.length) {
      const len = dv.getUint32(cursor, true);
      const type = dv.getUint32(cursor + 4, true);
      if (type === 0x004e4942) bin = bytes.subarray(cursor + 8, cursor + 8 + len);
      cursor += 8 + len;
    }

    // Decode palette images once: embedded buffers inline, external uris
    // via the explicit runtime palette URL (shared per pack, cached).
    const palettes = new Map<number, ImageData | null>();
    let externalPalette: ImageData | null | undefined;
    if (json.images) {
      for (let i = 0; i < json.images.length; i++) {
        const img = json.images[i]!;
        if (img.bufferView === undefined) {
          if (img.uri && !img.uri.startsWith("data:")) {
            if (externalPalette === undefined)
              externalPalette = paletteUrl
                ? await paletteFromURL(paletteUrl)
                : null;
            palettes.set(i, externalPalette);
          } else {
            palettes.set(i, null);
          }
          continue;
        }
        const view = json.bufferViews[img.bufferView]!;
        const slice = bin.subarray(
          view.byteOffset ?? 0,
          (view.byteOffset ?? 0) + view.byteLength,
        );
        palettes.set(i, await decodePalette(slice, img.mimeType ?? "image/png"));
      }
    }

    const primitives: KenneyPrimitive[] = [];
    const min: V3 = [Infinity, Infinity, Infinity];
    const max: V3 = [-Infinity, -Infinity, -Infinity];
    let triCount = 0;

    const visit = (nodeIndex: number, parent: number[]) => {
      const node = json.nodes[nodeIndex]!;
      const local = nodeMatrix(node);
      const world = mulMat(parent, local);
      if (node.mesh !== undefined) {
        const mesh = json.meshes[node.mesh]!;
        for (const prim of mesh.primitives) {
          if (prim.mode !== undefined && prim.mode !== 4) continue;
          const posAcc = prim.attributes["POSITION"];
          if (posAcc === undefined) continue;
          const pos = readAcc(json, bin, posAcc);
          const uvAcc = prim.attributes["TEXCOORD_0"];
          const uv = uvAcc !== undefined ? readAcc(json, bin, uvAcc) : null;
          const idxAcc = prim.indices !== undefined ? readAcc(json, bin, prim.indices) : null;
          const mat = prim.material !== undefined ? json.materials?.[prim.material] : undefined;
          const pbr = mat?.pbrMetallicRoughness;
          const base = pbr?.baseColorFactor ?? [1, 1, 1, 1];
          const emissive = mat?.emissiveFactor ?? [0, 0, 0];
          const isEmissive = emissive[0]! + emissive[1]! + emissive[2]! > 0.03;
          const alphaMode = mat?.alphaMode ?? "OPAQUE";
          let palette: ImageData | null = null;
          let texOff = [0, 0];
          let texScale = [1, 1];
          if (pbr?.baseColorTexture) {
            const tex = json.textures?.[pbr.baseColorTexture.index];
            if (tex) palette = palettes.get(tex.source) ?? null;
            const xf = pbr.baseColorTexture.extensions?.["KHR_texture_transform"];
            if (xf) {
              if (xf.offset) texOff = xf.offset;
              if (xf.scale) texScale = xf.scale;
            }
          }
          const n = idxAcc ? idxAcc.count : pos.count;
          const positions = new Float32Array(n * 3);
          const colors = new Float32Array(n * 3);
          const emis = new Uint8Array(n);
          let kept = 0;
          const skipAlpha = alphaMode !== "OPAQUE";
          for (let i = 0; i < n; i += 3) {
            // Gather one triangle first so alpha-cutout tris drop together.
            const tri: number[] = [];
            const cols: number[] = [];
            let drop = false;
            for (let k = 0; k < 3; k++) {
              const vi = idxAcc ? idxAcc.get(i + k, 0) : i + k;
              const p = xformPoint(
                world,
                pos.get(vi, 0),
                pos.get(vi, 1),
                pos.get(vi, 2),
              );
              tri.push(p[0], p[1], p[2]);
              let r = base[0]!;
              let g = base[1]!;
              let b = base[2]!;
              let a = base[3] ?? 1;
              if (palette && uv) {
                let u = uv.get(vi, 0);
                let v = uv.get(vi, 1);
                u = texOff[0]! + u * texScale[0]!;
                v = texOff[1]! + v * texScale[1]!;
                const uu = ((u % 1) + 1) % 1;
                const vv = ((v % 1) + 1) % 1;
                const px = Math.min(palette.width - 1, Math.floor(uu * palette.width));
                const py = Math.min(palette.height - 1, Math.floor((1 - vv) * palette.height));
                const o = (py * palette.width + px) * 4;
                r = palette.data[o]! / 255;
                g = palette.data[o + 1]! / 255;
                b = palette.data[o + 2]! / 255;
                a = palette.data[o + 3]! / 255;
              }
              if (skipAlpha && a < 0.5) drop = true;
              cols.push(r, g, b);
            }
            if (drop) continue;
            for (let k = 0; k < 9; k++) {
              positions[kept + k] = tri[k]!;
              colors[kept + k] = cols[k]!;
            }
            for (let k = 0; k < 3; k++) emis[kept / 3 + k] = isEmissive ? 1 : 0;
            for (let k = 0; k < 3; k++) {
              const x = tri[k * 3]!;
              const y = tri[k * 3 + 1]!;
              const z = tri[k * 3 + 2]!;
              if (x < min[0]) min[0] = x;
              if (y < min[1]) min[1] = y;
              if (z < min[2]) min[2] = z;
              if (x > max[0]) max[0] = x;
              if (y > max[1]) max[1] = y;
              if (z > max[2]) max[2] = z;
            }
            kept += 9;
            triCount++;
          }
          primitives.push({
            positions: positions.subarray(0, kept),
            colors: colors.subarray(0, kept),
            emissive: emis.subarray(0, kept / 3),
          });
        }
      }
      for (const child of node.children ?? []) visit(child, world);
    };

    const scene = json.scenes[json.scene ?? 0];
    if (!scene) return null;
    for (const n of scene.nodes) visit(n, IDENTITY());
    if (!primitives.length) return null;
    return { primitives, min, max, triCount };
  } catch (err) {
    console.warn("Kenney GLB parse failed:", err);
    return null;
  }
}

/** Fetch + parse one runtime asset. Null on any failure (caller falls back). */
export async function loadKenneyModel(
  url: string,
  paletteUrl?: string,
): Promise<KenneyModel | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await parseKenneyGLB(await res.arrayBuffer(), paletteUrl);
  } catch {
    return null;
  }
}

export type KenneyEntry = { url: string; palette?: string };

/** Load a set of models with an overall timeout; missing ones resolve null. */
export async function loadKenneySet(
  entries: Record<string, KenneyEntry>,
  timeoutMs = 3500,
): Promise<Record<string, KenneyModel | null>> {
  const out: Record<string, KenneyModel | null> = {};
  const jobs = Object.entries(entries).map(async ([key, entry]) => {
    out[key] = await loadKenneyModel(entry.url, entry.palette);
  });
  await Promise.race([
    Promise.all(jobs),
    new Promise((r) => setTimeout(r, timeoutMs)),
  ]);
  return out;
}

// ---------------------------------------------------------------------------
// Palette normalization: every imported part lands in the Switchyard palette.
// Shader kinds (must match RouteWorld): 2 structure gray, 3 lime node,
// 9 ivory trim, 10 dark ceramic, 11 distant silhouette, 13 signal lime,
// 14 vehicle charcoal, 15 vehicle lime, 16 vehicle ivory.
// ---------------------------------------------------------------------------

/**
 * Architecture: stock-kit hues collapse into the gray family (saturation
 * gate), near-white becomes ivory trim, dark becomes ceramic, emissive
 * becomes signal. Nothing keeps a default bright Kenney color.
 */
export function classifyArchitecture(
  r: number,
  g: number,
  b: number,
  emissive: boolean,
): number {
  if (emissive) return 13;
  const v = Math.max(r, g, b);
  const mn = Math.min(r, g, b);
  const s = v > 0 ? (v - mn) / v : 0;
  if (s > 0.45) return v < 0.25 ? 10 : 2;
  if (v > 0.85) return 9;
  if (v < 0.22) return 10;
  return 2;
}

/** Distant/background placement: everything collapses to silhouette. */
export function classifySilhouette(
  _r: number,
  _g: number,
  _b: number,
  emissive: boolean,
): number {
  return emissive ? 13 : 11;
}

/**
 * Runner vehicle: the whole hull goes matte charcoal (kind 14) no matter
 * what the stock paint was; only true emissive bits stay lime. Identity
 * comes from the procedural lime strips + ivory mast, per spec.
 */
export function classifyVehicle(
  _r: number,
  _g: number,
  _b: number,
  emissive: boolean,
): number {
  return emissive ? 15 : 14;
}
