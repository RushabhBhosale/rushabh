// All distances belong to one world. The opening origin is also the first main-route node.
export type Point3 = [number, number, number];

const x = [0, 0, 1, -3, 4, 2, -5, 0, 4, -2, 0, 0, 0];
const y = [0, 0, 0.3, 0.8, 1, 0.3, -0.3, 0, 0.3, 0, 0, 0, 0];

const cubic = (a: number, b: number, c: number, d: number, t: number) =>
  0.5 *
  (2 * b +
    (-a + c) * t +
    (2 * a - 5 * b + 4 * c - d) * t * t +
    (-a + 3 * b - 3 * c + d) * t * t * t);

export function mainPoint(distance: number): Point3 {
  const z = Math.max(0, Math.min(350, distance));
  const index = Math.floor(z / 30),
    t = z / 30 - index;
  const sample = (values: number[]) =>
    cubic(
      values[Math.max(0, index - 1)],
      values[index],
      values[Math.min(values.length - 1, index + 1)],
      values[Math.min(values.length - 1, index + 2)],
      t,
    );
  return [sample(x), sample(y), z];
}

// Featured work occupies one legible network. Each branch is visible before
// its decision point and rejoins before the next destination.
export const branchStart = (index: number) => 108 + index * 12;
export const branchEnd = (index: number) => branchStart(index) + 10;

export function branchPoint(index: number, t: number): Point3 {
  const p = mainPoint(
    branchStart(index) + (branchEnd(index) - branchStart(index)) * t,
  );
  const q = Math.max(0, Math.min(1, t));
  const excursion = 64 * q ** 3 * (1 - q) ** 3;
  p[0] += (index % 2 === 0 ? 1 : -1) * excursion * 4.2;
  p[1] += excursion * (index % 3 === 0 ? 0.55 : -0.3);
  return p;
}

/** Tangent of the main spline at a distance (normalized). */
export function mainTangent(distance: number): Point3 {
  const e = 0.35;
  const a = mainPoint(Math.max(0, distance - e));
  const b = mainPoint(Math.min(350, distance + e));
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const dz = b[2] - a[2] || 1;
  const n = Math.hypot(dx, dy, dz) || 1;
  return [dx / n, dy / n, dz / n];
}

/** Tangent of a branch spline at t (normalized). */
export function branchTangent(index: number, t: number): Point3 {
  const e = 0.004;
  const a = branchPoint(index, Math.max(0, t - e));
  const b = branchPoint(index, Math.min(1, t + e));
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const dz = b[2] - a[2] || 1;
  const n = Math.hypot(dx, dy, dz) || 1;
  return [dx / n, dy / n, dz / n];
}

/** Lateral curvature (-1..1) used for vehicle / camera banking. */
export function mainCurvature(distance: number): number {
  const t0 = mainTangent(Math.max(0, distance - 1.2));
  const t1 = mainTangent(Math.min(350, distance + 1.2));
  // Change in lateral direction per unit travel.
  return Math.max(-1, Math.min(1, (t1[0] - t0[0]) * 6));
}

export function activePoint(branch: number, branchProgress: number, distance: number): Point3 {
  if (branch >= 0) return branchPoint(branch, branchProgress);
  return mainPoint(distance);
}

export function activeTangent(branch: number, branchProgress: number, distance: number): Point3 {
  if (branch >= 0) return branchTangent(branch, branchProgress);
  return mainTangent(distance);
}

export type WorldState = {
  progress: number;
  distance: number;
  branch: number;
  branchProgress: number;
  map: number;
  activation: number;
  flatten: number;
  preview: number;
  /** Reversible route selection inside a decision zone: -1 MAIN, 0 STACKPORT. */
  selection: number;
  /** 0..1 decision-zone blend (ramps in on approach), written by controller. */
  zone: number;
  /** Smoothed forward speed (distance units / second), for FOV + lean. */
  speed: number;
  /** Smoothed banking (-1..1), written by the renderer, readable by DOM. */
  bank: number;
  /** 0..1 switch throw animation when entering / previewing a branch. */
  switchThrow: number;
  transitionBranch: number;
};

export const worldState: WorldState = {
  progress: 0,
  distance: 0,
  branch: -1,
  branchProgress: 0,
  map: 0,
  activation: 1,
  flatten: 0,
  preview: -1,
  selection: -1,
  zone: 0,
  speed: 0,
  bank: 0,
  switchThrow: 0,
  transitionBranch: 0,
};

export const INTRO_KEY = "switchyard:activation:v1";
export const INTRO_TTL = 30 * 60 * 1000;

// StackPort (branch 0) diverges toward +x, which is screen-right from the
// chase camera (camera looks along +z, screen-right = +x). So the branch is
// taken with Right/D, and staying on the main route is Left/A.
export const STACKPORT_SIDE = "right" as const;

/**
 * Main-unit decision zone for the StackPort junction (see journey-model).
 * Selection inside the zone is reversible; crossing COMMIT is final.
 * `late` allows a short post-fork catch-up that re-aligns onto the branch.
 */
export const JUNCTION_ZONE = { start: 50, enter: 62, late: 66 } as const;
/** Scroll-units of branch travel. Matched to main-road pace so committing
 * never feels like hitting a wall (branch world-speed ≈ main world-speed). */
export const BRANCH_DURATION = 30;
export function inJunctionZone(mainUnit: number): boolean {
  return mainUnit >= JUNCTION_ZONE.start && mainUnit < JUNCTION_ZONE.enter;
}

// ---- World rhythm tables (single source of truth for geometry + DOM) ----

/** Architectural gates marking journey chapters. */
export const GATES = [
  { distance: 8, label: "ENTRY", side: 0 },
  { distance: 30, label: "ORIGIN", side: 1 },
  { distance: 52, label: "JUNCTION", side: -1 },
  { distance: 74, label: "STACKPORT", side: 1 },
  { distance: 112, label: "CONVERGENCE", side: 0 },
] as const;

/** Distant project destination silhouettes beside each branch. */
export const DESTINATIONS = [
  { branch: 0, label: "STACKPORT" },
  { branch: 1, label: "CLIPNOTE" },
  { branch: 2, label: "ANIMESPARKS" },
  { branch: 3, label: "HEADLINE" },
  { branch: 4, label: "EXPENSE" },
  { branch: 5, label: "INSPECTOR" },
] as const;

/**
 * Skill districts: architectural landmarks along the main route that stand
 * in for a skills section. `distance` is world distance, `side` is lateral
 * sign (+1 right, -1 left), `reach` controls how far out the cluster sits.
 * Labels are projected into DOM by the renderer (see Journey `.world-label`).
 */
export const SKILL_DISTRICTS = [
  {
    id: "frontend",
    distance: 48,
    side: 1,
    reach: 8,
    label: "FRONTEND SYSTEMS",
    sub: "INTERFACES & DESIGN ENGINEERING",
    techs: ["React", "Next.js", "TypeScript", "Tailwind"],
  },
  {
    id: "typelogic",
    distance: 58,
    side: -1,
    reach: 9,
    label: "TYPE / LOGIC",
    sub: "STRUCTURED THINKING",
    techs: ["JavaScript", "TypeScript", "Architecture", "State"],
  },
  {
    id: "backend",
    distance: 68,
    side: 1,
    reach: 9,
    label: "BACKEND / DATA",
    sub: "SYSTEMS THAT PERSIST",
    techs: ["Node.js", "Express", "MongoDB", "REST APIs"],
  },
  {
    id: "mobile",
    distance: 78,
    side: -1,
    reach: 8,
    label: "MOBILE BUILDING",
    sub: "SMALL SCREENS, NATIVE FEEL",
    techs: ["React Native", "Angular / Ionic", "Kotlin / Java"],
  },
  {
    id: "tooling",
    distance: 88,
    side: 1,
    reach: 8,
    label: "TOOLING / AUTOMATION",
    sub: "MACHINES THAT SAVE MORNINGS",
    techs: ["Desktop Tools", "Automation", "n8n", "Workflows"],
  },
  {
    id: "writing",
    distance: 98,
    side: -1,
    reach: 9,
    label: "PUBLISHING SYSTEMS",
    sub: "EDITORIAL ENGINEERING",
    techs: ["AnimeSparks", "Headline Thread", "Sanity", "SEO"],
  },
] as const;

/**
 * Secondary projects: inspectable route-side landmarks (◇), not branches.
 * Real portfolio entries; inspection never interrupts travel.
 */
export const LANDMARKS = [
  {
    id: "travel-archive",
    distance: 122,
    side: 1,
    reach: 5.5,
    mapX: 350,
    code: "RB/006",
    label: "TRAVEL MEMORY ARCHIVE",
    sub: "WEB / STORIES & GALLERIES",
    description:
      "A visual travel archive with stories and photo galleries from five journeys across India.",
    stack: ["Web", "Vercel"],
    image: "/projects/travel-archive.svg",
    href: "https://trip-new.vercel.app/",
    github: "https://github.com/RushabhBhosale/trip-new",
  },
  {
    id: "watchlist",
    distance: 141,
    side: -1,
    reach: 5.5,
    mapX: 250,
    code: "RB/007",
    label: "MOVIE WATCHLIST",
    sub: "WEB / TRACK & DISCOVER",
    description:
      "Track favorite movies, manage watch status, and get smart recommendations.",
    stack: ["Web", "Vercel"],
    image: "/projects/watchlist.png",
    href: "https://movies-neon-eight-38.vercel.app/",
    github: "https://github.com/RushabhBhosale/Movies",
  },
  {
    id: "travel-planner",
    distance: 158,
    side: 1,
    reach: 5.5,
    mapX: 465,
    code: "RB/008",
    label: "AI TRAVEL PLANNER",
    sub: "WEB / AI & MAPS",
    description:
      "Explore destinations, generate itineraries, and visualize trips using AI and maps.",
    stack: ["AI", "Maps"],
    image: "/bg.avif",
    href: undefined,
    github: "https://github.com/RushabhBhosale/travel-app",
  },
  {
    id: "n8n-automation",
    distance: 179,
    side: -1,
    reach: 5.5,
    mapX: 565,
    code: "RB/009",
    label: "N8N BLOG AUTOMATION",
    sub: "AUTOMATION / PUBLISHING",
    description:
      "Type a topic and an n8n workflow researches, writes, and posts the blog within minutes.",
    stack: ["n8n", "Automation"],
    image: "/projects/blog.png",
    href: "https://blog.rushabh.in/",
    github: "https://github.com/RushabhBhosale/ecommerce",
  },
  {
    id: "site-inspector",
    distance: 162,
    side: 1,
    reach: 5.5,
    mapX: 610,
    code: "RB/010",
    label: "SITE INSPECTOR",
    sub: "WEB / SEO TOOL",
    description:
      "Inspect a public page's structure, metadata, links, images, and technical signals from one focused interface.",
    stack: ["Next.js", "Web analysis"],
    image: "/projects/site-inspector.png",
    href: "/tools/site-inspector",
    github: "https://github.com/RushabhBhosale/rushabh",
  },
] as const;

/** Route-history milestones for the experience region (world distances). */
export const HISTORY = [
  { distance: 172, label: "APR 2024 → PRESENT", sub: "PERACTO INFOTECH · SOFTWARE DEVELOPER" },
  { distance: 179, label: "OCT 2023 → MAR 2024", sub: "TECHKENDR · FULL STACK DEVELOPER" },
  { distance: 185, label: "2022 → 2023", sub: "SNK WEB SOLUTIONS · FINPLUS" },
] as const;

/** Writing transformation: the route straightens into an editorial rule. */
export const WRITING_ZONE = { start: 204, end: 218 } as const;

/** Final convergence destination at the end of the world. */
export const CONVERGENCE = { distance: 232, label: "BRING ME THE NEXT HARD THING." } as const;
