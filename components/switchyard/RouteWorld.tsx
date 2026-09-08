"use client";
import { useEffect, useRef } from "react";
import {
  branchPoint,
  branchStart,
  branchEnd,
  mainPoint,
  SKILL_DISTRICTS,
  worldState,
  type Point3,
} from "./world-path";
import {
  classifyArchitecture,
  classifyVehicle,
  loadKenneySet,
  type KenneyEntry,
  type KenneyModel,
} from "./kenney";

/** Curated runtime assets (see kenney.ts manifest). Small set, one fetch each. */
const PAL_CAR = "/assets/switchyard/pal-car.png";
const PAL_IND = "/assets/switchyard/pal-industrial.png";
const PAL_ROAD = "/assets/switchyard/pal-roads.png";
const A = (url: string, palette?: string): KenneyEntry => ({ url, palette });
const KENNEY_ASSETS: Record<string, KenneyEntry> = {
  runner: A("/assets/switchyard/runner.glb", PAL_CAR),
  pier: A("/assets/switchyard/pier.glb", PAL_ROAD),
  lamp: A("/assets/switchyard/lamp.glb", PAL_ROAD),
  sign: A("/assets/switchyard/sign.glb", PAL_ROAD),
  barrier: A("/assets/switchyard/barrier.glb", PAL_ROAD),
  "signal-post": A("/assets/switchyard/signal-post.glb", PAL_ROAD),
  "hall-a": A("/assets/switchyard/hall-a.glb", PAL_IND),
  "hall-b": A("/assets/switchyard/hall-b.glb", PAL_IND),
  "hall-c": A("/assets/switchyard/hall-c.glb", PAL_IND),
  "hall-d": A("/assets/switchyard/hall-d.glb", PAL_IND),
  "hall-e": A("/assets/switchyard/hall-e.glb", PAL_IND),
  "stack-tall": A("/assets/switchyard/stack-tall.glb", PAL_IND),
  "tank-big": A("/assets/switchyard/tank-big.glb", PAL_IND),
  "tower-water": A("/assets/switchyard/tower-water.glb", PAL_IND),
  "crate-a": A("/assets/switchyard/crate-a.glb", PAL_IND),
  "crate-b": A("/assets/switchyard/crate-b.glb", PAL_IND),
  "rail-white": A("/assets/switchyard/rail-white.glb"),
  "post-modern": A("/assets/switchyard/post-modern.glb"),
  gantry: A("/assets/switchyard/gantry.glb"),
  board: A("/assets/switchyard/board.glb"),
  "tree-s": A("/assets/switchyard/tree-s.glb"),
  "tree-l": A("/assets/switchyard/tree-l.glb"),
  rock: A("/assets/switchyard/rock.glb"),
};
/** Yaw applied to the runner hull if the kit forward axis needs rotating. */
const VEHICLE_YAW = 0;

const vertex = `
attribute vec3 aPosition;
attribute vec2 aRoute;
uniform vec3 uCamera;
uniform vec3 uRight;
uniform vec3 uUp;
uniform vec3 uForward;
uniform float uAspect;
uniform float uModel;
uniform vec3 uModelCenter;
uniform vec3 uModelRight;
uniform vec3 uModelUp;
uniform vec3 uModelForward;
uniform mediump float uMap;
varying vec3 vWorld;
varying vec2 vRoute;
varying float vDepth;
varying float vDistance;
void main(){
 vec3 world=mix(aPosition,uModelCenter+uModelRight*aPosition.x+uModelUp*aPosition.y+uModelForward*aPosition.z,uModel);
 vec3 p=world-uCamera;
 vWorld=world;
 float depth=dot(p,uForward);
 vec2 xy=vec2(dot(p,uRight)/uAspect,dot(p,uUp));
 float lens=mix(1.85,1.3,uMap);
 gl_Position=vec4(xy*lens,depth*1.0001-.2,depth);
 vRoute=aRoute;vDepth=depth;vDistance=world.z;
}`;

const fragment = `
#extension GL_OES_standard_derivatives : enable
precision mediump float;
uniform float uActivation;
uniform float uDistance;
uniform float uBranch;
uniform float uPreview;
uniform mediump float uMap;
uniform float uFlatten;
uniform float uTime;
uniform float uSpeed;
uniform float uSwitch;
varying vec3 vWorld;
varying vec2 vRoute;
varying float vDepth;
varying float vDistance;
void main(){
 if(vDepth<.15)discard;
 float a=uActivation;
 vec3 background=mix(vec3(.003),vec3(.20,.25,.225),smoothstep(.5,1.,a));
 vec3 lime=vec3(.77,.87,.46);
 vec3 ivory=vec3(.88,.88,.83);
 vec3 gray=vec3(.58,.65,.56);
 vec3 ceramic=vec3(.46,.52,.44);
 float kind=vRoute.x;
 float main=1.-step(.5,abs(kind-0.));
 float branch=1.-step(.5,abs(kind-1.));
 float structure=1.-step(.5,abs(kind-2.));
 float node=1.-step(.5,abs(kind-3.));
 float edge=1.-step(.5,abs(kind-4.));
 float sleeper=1.-step(.5,abs(kind-5.));
 float bed=1.-step(.5,abs(kind-6.));
 float junction=1.-step(.5,abs(kind-7.));
 float ground=1.-step(.5,abs(kind-8.));
 float gate=1.-step(.5,abs(kind-9.));
 float monolith=1.-step(.5,abs(kind-10.));
 float dest=1.-step(.5,abs(kind-11.));
 float elevated=1.-step(.5,abs(kind-12.));
 float signal=1.-step(.5,abs(kind-13.));
 float vbody=1.-step(.5,abs(kind-14.));
 float vstrip=1.-step(.5,abs(kind-15.));
 float vdetail=1.-step(.5,abs(kind-16.));
 float switcharm=1.-step(.5,abs(kind-17.));
 float route=vRoute.y;
 float selected=1.-step(.5,abs(route-uBranch-1.));
 float preview=1.-smoothstep(.0,1.,abs(route-uPreview-1.));
 float onBranch=step(0.,uBranch);
 // Pre-commit selection is unmistakable: choosing STACKPORT mutes MAIN.
 float selBranch=step(0.5,uPreview+0.5)*(1.-onBranch);
 float front=8.+smoothstep(.14,.58,a)*340.;
 float routeReveal=1.-smoothstep(front-3.,front+1.,vDistance);
 float pulseZ=8.+smoothstep(.14,.72,a)*95.;
 float pulse=exp(-abs(vDistance-pulseZ)*.5)*(1.-smoothstep(.7,.93,a));
 float complexity=smoothstep(12.,90.,uDistance);
 float opacity=mix(.15,.6,complexity)*smoothstep(.43,.95,a);
 // The main line yields gently while a branch is thrown — and dims the
 // moment STACKPORT is selected, before anything commits.
 opacity=mix(opacity,routeReveal*(1.-onBranch*uSwitch*.55)*(1.-selBranch*.5),main);
 opacity=mix(opacity,opacity*mix(.12,.7,complexity)+pulse*.28,structure);
 opacity=mix(opacity,smoothstep(.035,.10,a)*(1.+.2*sin(smoothstep(.08,.24,a)*3.14159)),node);
 // uSwitch eases 0→1 across a branch change: crossfade instead of snapping.
 float mainActive=main*(1.-onBranch*uSwitch);
 float branchGlow=clamp(preview*.7+uSwitch*onBranch,0.,1.);
 float branchActive=selected*branchGlow;
 float active=max(mainActive,branchActive);
 vec3 ink=mix(gray,lime,max(active,preview*.75));
 ink=mix(ink,lime,node);
 float revealed=smoothstep(.34,.86,a)*routeReveal;
 opacity=mix(opacity,(.56+.25*active)*revealed,edge);
 opacity=mix(opacity,.32*revealed,sleeper);
 opacity=mix(opacity,.28*revealed,bed);
 opacity=mix(opacity,(.28+.38*active)*revealed,junction);
 opacity=mix(opacity,.72*revealed,ground);
 ink=mix(ink,mix(gray,lime,.22*active),max(edge,sleeper));
 ink=mix(ink,vec3(.40,.47,.40),max(ground,bed));
 // --- architectural gates: ivory beams, quiet until near ---
 float gateNear=exp(-abs(vDistance-uDistance-14.)*.06);
 opacity=mix(opacity,mix(.55,.95,gateNear)*revealed,gate);
 ink=mix(ink,ivory,gate*.9);
 // --- monoliths / towers: dark ceramic with faint top light ---
 opacity=mix(opacity,(.72+.18*gateNear)*revealed,monolith);
 ink=mix(ink,mix(ceramic,ivory,.14),monolith);
 // --- distant destinations: silhouettes in fog ---
 opacity=mix(opacity,.78*revealed,dest);
 ink=mix(ink,mix(gray,ivory,.25),dest);
 // --- elevated background routes: very dim ---
 opacity=mix(opacity,.38*revealed,elevated);
 ink=mix(ink,gray*.8,elevated);
 // --- signal LEDs: travelling lime dashes, dim on unselected branches ---
 float dash=.5+.5*sin(vDistance*.85-uTime*.7);
 float sigGlow=dash*exp(-abs(vDistance-uDistance-10.)*.12);
 float isMain=1.-step(.5,abs(route));
 float routeActive=max(isMain,max(selected,preview));
 opacity=mix(opacity,clamp(.25+sigGlow,0.,1.)*revealed*mix(.3,1.,routeActive),signal);
 ink=mix(ink,lime*mix(.45,1.,routeActive),signal*clamp(.5+sigGlow,0.,1.));
 // --- switch arm: illuminates with throw ---
 opacity=mix(opacity,(.30+.55*uSwitch)*revealed,switcharm);
 ink=mix(ink,mix(gray,lime,clamp(uSwitch+preview*.5,0.,1.)),switcharm);
 // --- branch lines sit muted gray until selected / previewed ---
 float branchDim=mix(.35,1.,max(selected,max(preview*.8,.45*(1.-onBranch))));
 opacity*=mix(1.,branchDim,branch);
 ink=mix(ink,gray*(1.-branchDim*.5),branch*(1.-branchDim));
 // --- vehicle: always solid, unaffected by reveal ---
 opacity=mix(opacity,.96,vbody);
 ink=mix(ink,vec3(.28,.34,.28),vbody);
 opacity=mix(opacity,1.,vstrip);
 ink=mix(ink,lime*1.25,vstrip);
 opacity=mix(opacity,.9,vdetail);
 ink=mix(ink,ivory,vdetail);
 // --- fog: dense near hero, clearer mid-journey, thick between chapters ---
 float heroFog=(1.-smoothstep(6.,30.,uDistance))*10.;
 float chapterThick=(smoothstep(40.,52.,uDistance)*(1.-smoothstep(52.,64.,uDistance)))*18.;
 float far=mix(38.,150.,smoothstep(.35,.95,a));
 far-=heroFog*.5;
 far-=chapterThick*.12;
 
 float fog=1.-smoothstep(5.,mix(max(far,14.),220.,uMap),vDepth);
 // vehicle resists fog so it stays readable
 fog=mix(fog,1.,max(vbody,max(vstrip,vdetail))*.85);
 opacity=max(opacity,pulse*.15*(1.-structure));
 opacity*=mix(1.,.24,uFlatten);
 vec3 normal=normalize(cross(dFdx(vWorld),dFdy(vWorld)));
 float light=.70+.30*abs(dot(normal,normalize(vec3(-.45,.85,.35))));
 float solid=max(monolith,max(dest,max(gate,vbody)));
 ink*=mix(1.,light,solid);
 gl_FragColor=vec4(mix(background,ink,clamp(opacity*fog,0.,1.)),1.);
}`;

const sub = (a: Point3, b: Point3): Point3 => [
  a[0] - b[0],
  a[1] - b[1],
  a[2] - b[2],
];
const norm = (a: Point3): Point3 => {
  const n = Math.hypot(...a) || 1;
  return a.map((v) => v / n) as Point3;
};
const cross = (a: Point3, b: Point3): Point3 => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
const mixP = (a: Point3, b: Point3, t: number): Point3 =>
  a.map((v, i) => v + (b[i] - v) * t) as Point3;

export default function RouteWorld() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let dispose: (() => void) | undefined;
    const setup = () => {
      dispose?.();
      dispose = undefined;
      if (motion.matches) {
        window.dispatchEvent(new Event("switchyard:world-ready"));
        return;
      }
      const gl = canvas.getContext("webgl", {
        alpha: false,
        antialias: true,
        powerPreference: "low-power",
      });
      if (!gl) {
        window.dispatchEvent(new Event("switchyard:world-ready"));
        return;
      }
      const derivatives=gl.getExtension("OES_standard_derivatives");
      const shaders: WebGLShader[] = [];
      const compile = (type: number, source: string) => {
        const shader = gl.createShader(type);
        if (!shader) return null;
        shaders.push(shader);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          console.warn("Switchyard shader:", gl.getShaderInfoLog(shader));
          return null;
        }
        return shader;
      };
      const vs = compile(gl.VERTEX_SHADER, vertex),
        fs = compile(gl.FRAGMENT_SHADER, derivatives?fragment:fragment.replace("#extension GL_OES_standard_derivatives : enable", "").replace("normalize(cross(dFdx(vWorld),dFdy(vWorld)))", "vec3(0.,1.,0.)")),
        program = gl.createProgram();
      if (!vs || !fs || !program) {
        shaders.forEach((s) => gl.deleteShader(s));
        window.dispatchEvent(new Event("switchyard:world-ready"));
        return;
      }
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.warn("Switchyard program:", gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        shaders.forEach((s) => gl.deleteShader(s));
        window.dispatchEvent(new Event("switchyard:world-ready"));
        return;
      }
      gl.useProgram(program);

      // ---------- static geometry (procedural base; kit streams in below) ----------
      const vertices: number[] = [];
      const triangle = (
        a: Point3,
        b: Point3,
        c: Point3,
        kind: number,
        route: number,
      ) => [a, b, c].forEach((p) => vertices.push(...p, kind, route));
      const ribbon = (
        a: Point3,
        b: Point3,
        width: number,
        kind: number,
        route: number,
      ) => {
        const length = Math.hypot(b[0] - a[0], b[2] - a[2]) || 1;
        const nx = ((b[2] - a[2]) / length) * width,
          nz = (-(b[0] - a[0]) / length) * width;
        const al: Point3 = [a[0] - nx, a[1], a[2] - nz],
          ar: Point3 = [a[0] + nx, a[1], a[2] + nz];
        const bl: Point3 = [b[0] - nx, b[1], b[2] - nz],
          br: Point3 = [b[0] + nx, b[1], b[2] + nz];
        triangle(al, ar, br, kind, route);
        triangle(al, br, bl, kind, route);
      };
      /** Vertical quad facing the camera path (billboard-ish, fixed yaw). */
      const wall = (
        cx: number,
        y0: number,
        z: number,
        w: number,
        h: number,
        kind: number,
        route: number,
      ) => {
        const a: Point3 = [cx - w / 2, y0, z];
        const b: Point3 = [cx + w / 2, y0, z];
        const c: Point3 = [cx + w / 2, y0 + h, z];
        const d: Point3 = [cx - w / 2, y0 + h, z];
        triangle(a, b, c, kind, route);
        triangle(a, c, d, kind, route);
      };
      /** Axis-aligned box from 12 triangles. */
      const box = (
        cx: number,
        cy: number,
        cz: number,
        sx: number,
        sy: number,
        sz: number,
        kind: number,
        route: number,
      ) => {
        const x0 = cx - sx / 2;
        const x1 = cx + sx / 2;
        const y0 = cy - sy / 2;
        const y1 = cy + sy / 2;
        const z0 = cz - sz / 2;
        const z1 = cz + sz / 2;
        // front / back faces (face the travel direction)
        triangle([x0, y0, z1], [x1, y0, z1], [x1, y1, z1], kind, route);
        triangle([x0, y0, z1], [x1, y1, z1], [x0, y1, z1], kind, route);
        triangle([x1, y0, z0], [x0, y0, z0], [x0, y1, z0], kind, route);
        triangle([x1, y0, z0], [x0, y1, z0], [x1, y1, z0], kind, route);
        // top face
        triangle([x0, y1, z0], [x0, y1, z1], [x1, y1, z1], kind, route);
        triangle([x0, y1, z0], [x1, y1, z1], [x1, y1, z0], kind, route);
      };
      const offset = (p: Point3, x: number, y = 0): Point3 => [
        p[0] + x,
        p[1] + y,
        p[2],
      ];
      const track = (a: Point3, b: Point3, kind: number, route: number) => {
        ribbon(a, b, 0.011, kind, route);
        ribbon(offset(a, 0, -0.025), offset(b, 0, -0.025), 0.34, 6, route);
        for (const side of [-1, 1])
          ribbon(
            offset(a, side * 0.34),
            offset(b, side * 0.34),
            0.008,
            4,
            route,
          );
        // embedded signal LEDs along the edge
        ribbon(offset(a, 0.22, 0.005), offset(b, 0.22, 0.005), 0.006, 13, route);
      };
      // ---------- Kenney placements: kit parts recomposed into the palette ----------
      type Classify = (r: number, g: number, b: number, e: boolean) => number;
      const placeAsset = (
        key: string,
        o: {
          x: number;
          y: number;
          z: number;
          yaw?: number;
          scale?: number;
          sy?: number;
          route?: number;
          sink?: number;
          classify?: Classify;
        },
      ) => {
        const m = kitModels[key];
        if (!m) return;
        const yaw = o.yaw ?? 0;
        const s = Math.min(o.scale ?? 1, 5 / Math.max(.1,m.max[1]-m.min[1]), 6 / Math.max(.1,m.max[0]-m.min[0]));
        const road=mainPoint(o.z),side=Math.sign(o.x-road[0])||1;
        const placedX=road[0]+side*Math.max(Math.abs(o.x-road[0]),5+(m.max[0]-m.min[0])*s*.5);
        const centerX=(m.min[0]+m.max[0])*.5,centerZ=(m.min[2]+m.max[2])*.5;
        const syv = o.sy ?? s;
        const cy = Math.cos(yaw);
        const syw = Math.sin(yaw);
        const cls = o.classify ?? classifyArchitecture;
        const route = o.route ?? 0;
        const sink = o.sink ?? 0;
        for (const prim of m.primitives) {
          const P = prim.positions;
          const C = prim.colors;
          const E = prim.emissive;
          for (let i = 0; i < P.length; i += 9) {
            for (let k = 0; k < 3; k++) {
              const lx = (P[i + k * 3]! - centerX) * s;
              const ly = (P[i + k * 3 + 1]! - m.min[1]) * syv;
              const lz = (P[i + k * 3 + 2]! - centerZ) * s;
              vertices.push(
                placedX + lx * cy + lz * syw,
                o.y + ly - sink,
                o.z - lx * syw + lz * cy,
                cls(
                  C[i + k * 3]!,
                  C[i + k * 3 + 1]!,
                  C[i + k * 3 + 2]!,
                  E[(i / 3 + k) | 0] === 1,
                ),
                route,
              );
            }
          }
        }
      };
      /**
       * Normalize the runner hull into vehicle-local space (forward = +z,
       * ~1.3 long, ~0.56 wide so the procedural lime strips still align).
       * Per-vertex Switchyard kinds baked alongside positions.
       */
      const buildRunnerTris = (m: KenneyModel | null): number[] | null => {
        if (!m) return null;
        const sx = m.max[0] - m.min[0] || 1;
        const sz = m.max[2] - m.min[2] || 1;
        const sy = m.max[1] - m.min[1] || 1;
        let s = Math.min(1.3 / sz, 0.56 / sx);
        if (sy * s > 0.5) s = 0.5 / sy;
        const cx = (m.min[0] + m.max[0]) / 2;
        const cz = (m.min[2] + m.max[2]) / 2;
        const cy = Math.cos(VEHICLE_YAW);
        const syw = Math.sin(VEHICLE_YAW);
        const out: number[] = [];
        for (const prim of m.primitives) {
          const P = prim.positions;
          const C = prim.colors;
          const E = prim.emissive;
          for (let i = 0; i < P.length; i += 9) {
            for (let k = 0; k < 3; k++) {
              const nx = (P[i + k * 3]! - cx) * s;
              const ny = (P[i + k * 3 + 1]! - m.min[1]) * s;
              const nz = (P[i + k * 3 + 2]! - cz) * s;
              out.push(
                nx * cy + nz * syw,
                ny,
                -nx * syw + nz * cy,
                classifyVehicle(
                  C[i + k * 3]!,
                  C[i + k * 3 + 1]!,
                  C[i + k * 3 + 2]!,
                  E[(i / 3 + k) | 0] === 1,
                ),
              );
            }
          }
        }
        return out;
      };
      let runnerTris: number[] | null = null;
      let kitModels: Record<string, KenneyModel | null> = {};

      // Main route surface: physical pathway, not just a line.
      for (let z = 8; z < 345; z += 0.4) {
        const a = mainPoint(z);
        const b = mainPoint(z + 0.4);
        track(a, b, 0, 0);
        // vary pathway width subtly + ground plane
        const wobble = 16 + Math.sin(z * 0.05) * 2.5;
        ribbon(offset(a, 0, -0.09), offset(b, 0, -0.09), wobble, 8, 0);
      }
      for (let z = 10; z < 330; z += 2.5) {
        const p = mainPoint(z);
        ribbon(offset(p, -0.44, -0.01), offset(p, 0.44, -0.01), 0.009, 5, 0);
      }
      for (let route = 0; route < 6; route++) {
        for (let i = 0; i < 180; i++)
          track(
            branchPoint(route, i / 180),
            branchPoint(route, (i + 1) / 180),
            1,
            route + 1,
          );
        for (let i = 6; i < 180; i += 18) {
          const p = branchPoint(route, i / 180);
          ribbon(
            offset(p, -0.44, -0.01),
            offset(p, 0.44, -0.01),
            0.009,
            5,
            route + 1,
          );
        }
        for (const q of [0, 1]) {
          const p = branchPoint(route, q);
          for (let i = 0; i < 48; i++) {
            const a = (i / 48) * Math.PI * 2,
              b = ((i + 1) / 48) * Math.PI * 2;
            ribbon(
              [
                p[0] + Math.cos(a) * 0.62,
                p[1] + 0.012,
                p[2] + Math.sin(a) * 0.62,
              ],
              [
                p[0] + Math.cos(b) * 0.62,
                p[1] + 0.012,
                p[2] + Math.sin(b) * 0.62,
              ],
              0.012,
              7,
              route + 1,
            );
          }
          // junction guide rails converging into the switch
          const dir = route % 2 === 0 ? 1 : -1;
          for (const s of [-1, 1]) {
            const a: Point3 = [p[0] + s * 0.2, p[1] + 0.02, p[2] - 1.6];
            const b: Point3 = [
              p[0] + s * 0.05 + dir * 0.3,
              p[1] + 0.02,
              p[2] + 0.4,
            ];
            ribbon(a, b, 0.02, 7, route + 1);
          }
        }
      }
      // Fine outer guide paths and survey marks.
      for (const side of [-1, 1])
        for (let z = 12; z < 180; z += 1) {
          const spread = (d: number) =>
            side * (3.4 + Math.sin(d * 0.045) * 1.3);
          ribbon(
            offset(mainPoint(z), spread(z)),
            offset(mainPoint(z + 1), spread(z + 1)),
            0.006,
            4,
            0,
          );
        }
      for (let z = 18; z < 180; z += 8) {
        const p = mainPoint(z);
        for (const side of [-1, 1]) {
          const x = side * (3.4 + Math.sin(z * 0.045) * 1.3);
          ribbon(offset(p, x - 0.18), offset(p, x + 0.18), 0.008, 5, 0);
        }
      }

      // ---------- architectural gates (portals marking chapters) ----------
      const GATE_Z = [10, 30, 52, 74, 112, 160, 210];
      GATE_Z.forEach((z, gi) => {
        const p = mainPoint(z);
        const asym = gi % 2 === 0 ? 1 : -1;
        const span = 7 + (gi % 3);
        const h = 4.2 + (gi % 4) * 0.7;
        // pillars
        wall(p[0] - span / 2, p[1] - 0.1, z, 0.35, h, 10, 0);
        wall(p[0] + span / 2 + asym * 0.8, p[1] - 0.1, z, 0.35, h + asym * 0.6, 10, 0);
        // Top beam (ivory): ONE thick slab. Stacked thin layers shimmered
        // against each other as they swept pixel rows — the gate-top twitch.
        wall(p[0] + asym * 0.4, p[1] + h, z, span + 1.2, 0.18, 9, 0);
      });

      // ---------- verticality: monoliths, towers, suspended frames ----------
      const MONOLITHS: Array<[number, number, number]> = [
        [46, 1, 3.5],
        [85, -1, 4],
        [129, 1, 2.8],
        [177, -1, 4.5],
        [229, 1, 3],
        [66, -1, 5.2],
        [98, 1, 6.0],
        [145, -1, 5.4],
        [190, 1, 6.4],
        [250, -1, 5.0],
      ];
      for (const [z, side, height] of MONOLITHS) {
        const p = mainPoint(z);
        const x = p[0] + side * 5;
        wall(x, p[1] - 0.1, z, 0.5, height, 10, 0);
        // cap light strip
        wall(x, p[1] + height, z, 0.52, 0.08, 9, 0);
        // suspended beam reaching over the route
        const beamY = p[1] + height;
        wall((x + p[0]) / 2, beamY, z, Math.abs(x - p[0]), 0.06, 2, 0);
      }
      // signal poles: rhythm the visitor constantly moves past (berth widened
      // so close passes whoosh instead of looming)
      for (let z = 14; z < 260; z += 7) {
        const p = mainPoint(z);
        const side = Math.floor(z / 7) % 2 === 0 ? 1 : -1;
        const x = p[0] + side * 2.5;
        wall(x, p[1] - 0.1, z, 0.09, 2.2 + (z % 3) * 0.3, 2, 0);
        wall(x, p[1] + 2.1 + (z % 3) * 0.3, z, 0.22, 0.07, 13, 0);
      }
      // foreground ribs: narrow markers close to the path (thinned for air)
      for (let z = 12; z < 240; z += 16) {
        const p = mainPoint(z);
        const side = Math.floor(z / 16) % 2 === 0 ? -1 : 1;
        wall(p[0] + side * 1.6, p[1] - 0.1, z, 0.12, 1.1, 2, 0);
      }

      // ---------- skill districts: landmarks that stand in for skills ----------
      // Bodies (kind 10) brighten as the runner approaches; trims (kind 9)
      // glow ivory near the camera. Same material language as the route.
      for (const d of SKILL_DISTRICTS) {
        const p = mainPoint(d.distance);
        const x = p[0] + d.side * d.reach;
        const y = p[1];
        const z = d.distance;
        if (d.id === "frontend") {
          // clean modular facades, layered panels
          box(x, y + 1.2, z - 2, 3.4, 2.4, 0.5, 10, 0);
          box(x + 0.7, y + 1.8, z + 0.4, 2.5, 3.6, 0.5, 10, 0);
          box(x - 0.5, y + 0.9, z + 2.8, 1.9, 1.8, 0.5, 10, 0);
          wall(x + 0.2, y + 0.02, z + 0.2, 5.6, 0.08, 9, 0);
          wall(x + 0.2, y + 4.6, z + 0.2, 4.8, 0.08, 2, 0);
        } else if (d.id === "typelogic") {
          // tall segmented logic tower + linked satellite
          for (let i = 0; i < 5; i++)
            box(x, y + 0.8 + i * 1.15, z, 2.3 - i * 0.28, 1.0, 2.3 - i * 0.28, 10, 0);
          wall(x, y + 0.8 + 5 * 1.15, z, 1.4, 0.1, 9, 0);
          box(x + 2.9, y + 1.4, z + 1.6, 1.6, 2.8, 1.6, 10, 0);
          ribbon(
            [x + 1.1, y + 3.4, z + 0.6],
            [x + 2.1, y + 3.1, z + 1.3],
            0.08,
            2,
            0,
          );
        } else if (d.id === "backend") {
          // dark silos with conduits feeding toward the route
          for (let i = 0; i < 3; i++) {
            const sx = x - 1.7 + i * 1.7;
            box(sx, y + 1.5, z, 1.2, 3.0, 1.2, 10, 0);
            const ex = p[0] + d.side * 2.2;
            ribbon([sx, y + 0.15, z + 1], [ex, y + 0.1, z + 3.2], 0.05, 2, 0);
            box(ex, y + 0.35, z + 3.2, 0.28, 0.28, 0.28, 9, 0);
          }
          wall(x, y + 3.1, z, 4.6, 0.08, 9, 0);
        } else if (d.id === "mobile") {
          // twin slim towers + dock kiosk
          box(x - 0.9, y + 2.2, z, 1.0, 4.4, 1.0, 10, 0);
          box(x + 0.9, y + 1.8, z + 0.6, 1.0, 3.6, 1.0, 10, 0);
          wall(x - 0.9, y + 4.4, z, 1.05, 0.08, 9, 0);
          wall(x + 0.9, y + 3.6, z + 0.6, 1.05, 0.08, 9, 0);
          box(x, y + 0.5, z + 2.4, 2.4, 1.0, 1.2, 10, 0);
          wall(x, y + 4.1, z + 0.3, 2.8, 0.08, 2, 0);
        } else if (d.id === "tooling") {
          // workshop gantry with hanging rig + side machines
          wall(x - 1.6, y, z, 0.3, 3.6, 10, 0);
          wall(x + 1.6, y, z, 0.3, 3.6, 10, 0);
          wall(x, y + 3.6, z, 3.8, 0.18, 2, 0);
          box(x + 0.4, y + 2.6, z, 0.9, 1.2, 0.9, 10, 0);
          box(x + 0.4, y + 1.85, z, 0.3, 0.2, 0.3, 9, 0);
          box(x + 3.0, y + 0.7, z + 1, 1.4, 1.4, 1.4, 10, 0);
          box(x - 3.0, y + 0.5, z - 1, 1.0, 1.0, 1.0, 10, 0);
        } else {
          // writing: fanned editorial planes + header bar
          for (let i = 0; i < 4; i++)
            wall(x + i * 0.95, y, z + i * 1.15, 0.14, 3.6 - i * 0.35, 10, 0);
          wall(x + 1.4, y + 3.4, z + 1.7, 4.4, 0.1, 9, 0);
        }
      }

      // ---------- StackPort branch stages: project/service/session/workflow ----------
      for (const t of [0.25, 0.45, 0.65, 0.85]) {
        const bp = branchPoint(0, t);
        box(bp[0] + 1.7, bp[1] + 0.25, bp[2], 1.7, 0.5, 2.3, 10, 1);
        wall(bp[0] + 1.7, bp[1] + 0.5, bp[2] - 1.0, 0.55, 1.7 - t, 10, 1);
        wall(bp[0] + 1.7, bp[1] + 2.1 - t, bp[2] - 1.0, 0.57, 0.08, 9, 1);
      }
      // merge arch where the branch rejoins the main line
      {
        const mp = branchPoint(0, 1);
        wall(mp[0] - 2.2, mp[1], mp[2], 0.3, 3.4, 10, 1);
        wall(mp[0] + 2.2, mp[1], mp[2], 0.3, 3.4, 10, 1);
        wall(mp[0], mp[1] + 3.4, mp[2], 5.0, 0.12, 9, 1);
      }
      // Branch-mouth hardware stays FLAT: the camera passes directly over
      // the fork at the commit moment, and any vertical here would loom
      // across the screen. A ground diamond + decision bar carry the signal.
      {
        const bp = branchPoint(0, 0.02);
        const cx = bp[0] + 0.35;
        const cy = bp[1] + 0.02;
        const cz = bp[2];
        const c: Point3 = [cx, cy, cz];
        const ring: Array<Point3> = [
          [cx - 0.55, cy, cz],
          [cx, cy, cz - 0.55],
          [cx + 0.55, cy, cz],
          [cx, cy, cz + 0.55],
        ];
        for (let i = 0; i < 4; i++)
          triangle(c, ring[i], ring[(i + 1) % 4], 7, 1);
        const mp = mainPoint(52);
        ribbon(
          [mp[0], mp[1] + 0.02, 52],
          [mp[0], mp[1] + 0.02, 52.35],
          0.8,
          13,
          0,
        );
      }

      // ---------- route infrastructure: towers, panels, ribs ----------
      // Signal towers with crossarms — midground vertical rhythm.
      for (let z = 20; z < 250; z += 21) {
        if (z > 206 && z < 224) continue; // writing beat stays clear
        const p = mainPoint(z);
        const side = Math.floor(z / 21) % 2 === 0 ? 1 : -1;
        const x = p[0] + side * 3.1;
        wall(x, p[1] - 0.1, z, 0.14, 3.4, 2, 0);
        wall(x, p[1] + 2.9, z, 1.1, 0.09, 2, 0);
        wall(x + side * 0.45, p[1] + 3.15, z, 0.2, 0.07, 13, 0);
      }
      // Suspended panels drifting above the route edges (thinned for air).
      for (let z = 24; z < 240; z += 23) {
        if (z > 206 && z < 224) continue;
        const p = mainPoint(z);
        const side = Math.floor(z / 23) % 2 === 0 ? -1 : 1;
        box(p[0] + side * 3.4, p[1] + 3.6, z, 1.7, 0.9, 0.08, 2, 0);
        wall(p[0] + side * 3.4, p[1] + 2.55, z, 0.05, 0.6, 2, 0);
      }
      // Overhead arch ribs spanning the route at chapter thresholds.
      for (const z of [40, 96, 144, 178]) {
        const p = mainPoint(z);
        wall(p[0] - 3.4, p[1] - 0.1, z, 0.28, 4.8, 10, 0);
        wall(p[0] + 3.4, p[1] - 0.1, z, 0.28, 4.8, 10, 0);
        wall(p[0], p[1] + 4.8, z, 7.4, 0.16, 2, 0);
        wall(p[0], p[1] + 4.55, z, 1.6, 0.07, 9, 0);
      }
      // Underpass: a lower deck passes beneath the main line (138–148).
      for (let z = 138; z < 148; z += 1) {
        const a = mainPoint(z);
        const b = mainPoint(z + 1);
        ribbon(
          [a[0], a[1] - 1.6, a[2]],
          [b[0], b[1] - 1.6, b[2]],
          1.1,
          6,
          0,
        );
        ribbon([a[0] - 1.1, a[1] - 1.55, a[2]], [b[0] - 1.1, b[1] - 1.55, b[2]], 0.03, 4, 0);
        ribbon([a[0] + 1.1, a[1] - 1.55, a[2]], [b[0] + 1.1, b[1] - 1.55, b[2]], 0.03, 13, 0);
      }
      for (let z = 138; z <= 148; z += 3.4) {
        const p = mainPoint(z);
        placeAsset("pier", { x: p[0] - 1.5, y: p[1] - 1.7, z, scale: 3.4 });
        placeAsset("pier", { x: p[0] + 1.5, y: p[1] - 1.7, z, scale: 3.4 });
      }

      // ---------- secondary landmark: Travel Memory Archive (◇ RB/006) ----------
      {
        const p = mainPoint(122);
        const x = p[0] + 5.5;
        const y = p[1];
        // diamond beacon
        const apex: Point3 = [x, y + 2.5, 122];
        const base: Point3 = [x, y + 1.1, 122];
        const corners: Array<Point3> = [
          [x - 0.45, y + 1.8, 122],
          [x + 0.45, y + 1.8, 122],
          [x, y + 1.8, 122 - 0.45],
          [x, y + 1.8, 122 + 0.45],
        ];
        for (let i = 0; i < 4; i++) {
          const c0 = corners[i];
          const c1 = corners[(i + 1) % 4];
          triangle(apex, c0, c1, 9, 0);
          triangle(base, c1, c0, 10, 0);
        }
        wall(x, y, 122, 0.12, 1.1, 10, 0);
        box(x, y + 0.25, 122 + 1.2, 1.5, 0.5, 1.1, 10, 0);
        wall(x, y + 0.55, 122 + 1.2, 1.52, 0.07, 9, 0);
      }

      // ---------- route history: monumental milestone gates ----------
      for (const [z, tall] of [[186, 6.2], [196, 5.4], [205, 4.6]] as Array<[number, number]>) {
        const p = mainPoint(z);
        wall(p[0] - 4.2, p[1] - 0.1, z, 0.5, tall, 10, 0);
        wall(p[0] + 4.2, p[1] - 0.1, z, 0.5, tall, 10, 0);
        wall(p[0], p[1] + tall, z, 9.4, 0.2, 2, 0);
        wall(p[0], p[1] + tall - 0.35, z, 2.4, 0.09, 9, 0);
      }

      // ---------- writing transformation: the route becomes an editorial rule ----------
      for (let z = 209; z < 222; z += 1.5) {
        const a = mainPoint(z);
        const b = mainPoint(z + 1.5);
        ribbon(
          [a[0] - 2.6, a[1] + 0.55, a[2]],
          [b[0] - 2.6, b[1] + 0.55, b[2]],
          0.025,
          9,
          0,
        );
      }

      // ---------- final convergence: many routes become one ----------
      {
        const c = mainPoint(232);
        for (const sx of [-9, -5.5, -2.5, 2.5, 5.5, 9]) {
          ribbon(
            [c[0] + sx, c[1] + 2.2 + Math.abs(sx) * 0.12, 218],
            [c[0] + sx * 0.12, c[1] + 0.4, 231],
            0.035,
            12,
            0,
          );
        }
        wall(c[0] - 5.2, c[1] - 0.1, 232, 0.6, 7.2, 10, 0);
        wall(c[0] + 5.2, c[1] - 0.1, 232, 0.6, 7.2, 10, 0);
        wall(c[0], c[1] + 7.2, 232, 11.6, 0.24, 2, 0);
        wall(c[0], c[1] + 6.85, 232, 3.2, 0.1, 9, 0);
        // Terminus marker stays FLAT: the camera passes directly over 232 at
        // the end of travel, and any volume here looms across the screen.
        {
          const cy = c[1] + 0.03;
          const cc: Point3 = [c[0], cy, 232];
          const ring: Array<Point3> = [
            [c[0] - 0.7, cy, 232],
            [c[0], cy, 231.3],
            [c[0] + 0.7, cy, 232],
            [c[0], cy, 232.7],
          ];
          for (let i = 0; i < 4; i++)
            triangle(cc, ring[i], ring[(i + 1) % 4], 7, 0);
          const ic: Point3 = [c[0], cy + 0.005, 232];
          const iring: Array<Point3> = [
            [c[0] - 0.28, cy + 0.005, 232],
            [c[0], cy + 0.005, 231.72],
            [c[0] + 0.28, cy + 0.005, 232],
            [c[0], cy + 0.005, 232.28],
          ];
          for (let i = 0; i < 4; i++)
            triangle(ic, iring[i], iring[(i + 1) % 4], 3, 0);
        }
      }

      // ---------- elevated background routes crossing overhead ----------
      for (const [z, h, span] of [
        [58, 7.5, 40],
        [100, 7, 36],
        [120, 9, 50],
        [150, 8.5, 40],
        [185, 8, 44],
        [228, 10, 46],
      ] as Array<[number, number, number]>) {
        const p = mainPoint(z);
        for (let k = -span; k < span; k += 2) {
          const a: Point3 = [p[0] + k, p[1] + h + Math.sin(k * 0.2) * 0.4, z + k * 0.15];
          const b: Point3 = [p[0] + k + 2, p[1] + h + Math.sin((k + 2) * 0.2) * 0.4, z + (k + 2) * 0.15];
          ribbon(a, b, 0.03, 12, 0);
        }
      }

      // ---------- project destinations (silhouettes that resolve on approach) ----------
      const destStyle = (branch: number, base: Point3, out: number) => {
        const dx = out;
        if (branch === 0) {
          // STACKPORT: modular blocks + interconnect frames
          box(base[0] + dx, base[1] + 1.2, base[2], 2.2, 2.4, 2.2, 11, 1);
          box(base[0] + dx + 2.4, base[1] + 0.7, base[2] + 1, 1.4, 1.4, 1.4, 11, 1);
          box(base[0] + dx - 0.4, base[1] + 2.9, base[2] - 0.6, 1.2, 0.8, 1.2, 11, 1);
          wall(base[0] + dx + 1.1, base[1], base[2] + 2.2, 3.4, 0.1, 9, 1);
        } else if (branch === 1) {
          // CLIPNOTE: thin stacked slabs
          for (let s = 0; s < 5; s++)
            box(base[0] + dx, base[1] + 0.5 + s * 0.75, base[2] + s * 0.3, 3.2 - s * 0.35, 0.16, 2.0, 11, 2);
        } else if (branch === 2) {
          // ANIMESPARKS: editorial planes / pages
          for (let s = 0; s < 4; s++)
            wall(base[0] + dx + s * 1.1, base[1], base[2] + s * 0.8, 0.14, 3.4 - s * 0.3, 11, 3);
          wall(base[0] + dx + 1.6, base[1] + 3.2, base[2] + 1, 4.4, 0.1, 9, 3);
        } else if (branch === 3) {
          // HEADLINE THREAD: branching signal paths
          for (const o of [-1.4, 0, 1.4]) {
            const a: Point3 = [base[0] + dx, base[1] + 0.4, base[2]];
            const b: Point3 = [base[0] + dx + o * 1.6, base[1] + 2.6, base[2] + 3];
            ribbon(a, b, 0.05, 11, 4);
          }
          box(base[0] + dx, base[1] + 3.0, base[2] + 3.2, 1.6, 1.0, 0.6, 11, 4);
        } else if (branch === 4) {
          // EXPENSE TRACKER: data nodes through gates
          for (let s = 0; s < 3; s++) {
            wall(base[0] + dx + s * 1.4, base[1], base[2] + s * 1.2, 0.9, 2.2, 11, 5);
            box(base[0] + dx + s * 1.4, base[1] + 1.4, base[2] + s * 1.2 + 0.7, 0.3, 0.3, 0.3, 9, 5);
          }
        } else {
          // SITE INSPECTOR: scanning frames
          for (let s = 0; s < 3; s++) {
            const w = 2.4 - s * 0.4;
            wall(base[0] + dx, base[1] + s * 1.1, base[2] + s * 1.4, w, 0.1, 9, 6);
            wall(base[0] + dx - w / 2, base[1] + s * 1.1, base[2] + s * 1.4, 0.1, 1.6, 11, 6);
            wall(base[0] + dx + w / 2, base[1] + s * 1.1, base[2] + s * 1.4, 0.1, 1.6, 11, 6);
          }
        }
      };
      for (let b = 0; b < 6; b++) {
        const mid = branchPoint(b, 0.82);
        destStyle(b, mid, b % 2 === 0 ? 7.5 : -7.5);
      }

      // ---------- Kenney world dressing (framing, never blocking) ----------
      // Runs once the kit streams in; geometry merges + one buffer re-upload.
      const placeKenneyWorld = () => {
      // Entry: lamps + one blank sign.
      for (const s of [-1, 1]) {
        const p = mainPoint(11);
        placeAsset("lamp", {
          x: p[0] + s * 3.4,
          y: p[1] - 0.05,
          z: 11,
          yaw: s * 0.2,
          scale: 4,
        });
      }
      {
        const p = mainPoint(17);
        placeAsset("sign", {
          x: p[0] + 2.9,
          y: p[1] - 0.05,
          z: 17,
          yaw: -0.35,
          scale: 3,
        });
      }
      // Junction: gantry BEFORE the fork, trackside signal, flanking rails.
      // Gantry is centered to truly span the route; rails stay low + narrow.
      {
        const p = mainPoint(49);
        placeAsset("gantry", {
          x: p[0] - 2.75,
          y: p[1] - 0.05,
          z: 49,
          scale: 5.5,
        });
        const q = mainPoint(52.5);
        placeAsset("signal-post", {
          x: q[0] + 2.0,
          y: q[1] - 0.05,
          z: 52.5,
          yaw: -0.2,
          scale: 5,
        });
        for (const s of [-1, 1])
          for (let k = 0; k < 3; k++) {
            const rp = mainPoint(50.5 + k * 1.9);
            placeAsset("rail-white", {
              x: rp[0] + s * 1.5,
              y: rp[1] - 0.02,
              z: 50.5 + k * 1.9,
              scale: 4,
            });
          }
      }
      // FRONTEND (94, right): clean modular halls + modern posts.
      {
        const p = mainPoint(94);
        const x = p[0] + 11;
        placeAsset("hall-a", {
          x,
          y: p[1] - 0.05,
          z: 92,
          yaw: 0.3,
          scale: 1.6,
        });
        placeAsset("hall-c", {
          x: x + 4.2,
          y: p[1] - 0.05,
          z: 96.5,
          yaw: -0.25,
          scale: 1.3,
        });
        placeAsset("hall-e", {
          x: x - 1.5,
          y: p[1] - 0.05,
          z: 98.5,
          yaw: 0.12,
          scale: 1.2,
        });
        placeAsset("post-modern", {
          x: x - 3.4,
          y: p[1] - 0.05,
          z: 94,
          scale: 5,
        });
      }
      // TYPE/LOGIC (114, left): tall stack + low hall.
      {
        const p = mainPoint(114);
        const x = p[0] - 10.5;
        placeAsset("stack-tall", {
          x,
          y: p[1] - 0.05,
          z: 114,
          scale: 1.8,
        });
        placeAsset("hall-b", {
          x: x + 3.6,
          y: p[1] - 0.05,
          z: 116.5,
          yaw: 0.4,
          scale: 1.1,
        });
      }
      // BACKEND (132, right): tanks + water tower + crates + conduit pulses.
      {
        const p = mainPoint(132);
        const x = p[0] + 11;
        placeAsset("tank-big", {
          x: x - 2.2,
          y: p[1] - 0.05,
          z: 131,
          scale: 1.6,
        });
        placeAsset("tower-water", {
          x: x + 2.6,
          y: p[1] - 0.05,
          z: 134,
          scale: 1.5,
        });
        placeAsset("crate-a", {
          x,
          y: p[1] - 0.05,
          z: 136.5,
          yaw: 0.2,
          scale: 1,
        });
        placeAsset("crate-b", {
          x: x + 2.7,
          y: p[1] - 0.05,
          z: 136.9,
          yaw: -0.2,
          scale: 1,
        });
        for (const dz of [130, 133, 136])
          box(p[0] + 4.6, p[1] + 0.35, dz, 0.3, 0.3, 0.3, 13, 0);
      }
      // MOBILE (150, left): twin halls + dock crate.
      {
        const p = mainPoint(150);
        const x = p[0] - 10.5;
        placeAsset("hall-b", {
          x: x - 1.8,
          y: p[1] - 0.05,
          z: 149,
          yaw: 0.2,
          scale: 1.3,
        });
        placeAsset("hall-d", {
          x: x + 1.8,
          y: p[1] - 0.05,
          z: 151,
          yaw: -0.18,
          scale: 1.3,
        });
        placeAsset("crate-b", {
          x,
          y: p[1] - 0.05,
          z: 154,
          yaw: 0.45,
          scale: 0.9,
        });
      }
      // TOOLING (168, right): crates, barriers, a modern post.
      {
        const p = mainPoint(168);
        const x = p[0] + 9.5;
        placeAsset("crate-a", {
          x,
          y: p[1] - 0.05,
          z: 166.5,
          yaw: 0.3,
          scale: 1,
        });
        placeAsset("crate-b", {
          x: x + 2.7,
          y: p[1] - 0.05,
          z: 167.2,
          yaw: -0.2,
          scale: 1,
        });
        for (let k = 0; k < 3; k++)
          placeAsset("barrier", {
            x: x - 2.5 + k * 1.7,
            y: p[1] - 0.02,
            z: 170.5,
            yaw: 0.1,
            scale: 9,
          });
        placeAsset("post-modern", {
          x: x + 3.6,
          y: p[1] - 0.05,
          z: 169,
          scale: 5,
        });
      }
      // PUBLISHING (201, left): deliberately sparse — one lamp only.
      {
        const p = mainPoint(201);
        placeAsset("lamp", {
          x: p[0] - 4.2,
          y: p[1] - 0.05,
          z: 201,
          yaw: 0.3,
          scale: 4,
        });
      }
      // StackPort branch dressing (route 1): crate stage, sign, merge lamp.
      {
        const s1 = branchPoint(0, 0.45);
        placeAsset("crate-a", {
          x: s1[0] + 3.1,
          y: s1[1] - 0.05,
          z: s1[2],
          yaw: 0.35,
          scale: 0.9,
          route: 1,
        });
        const s2 = branchPoint(0, 0.65);
        placeAsset("sign", {
          x: s2[0] - 2.6,
          y: s2[1] - 0.05,
          z: s2[2],
          yaw: 0.5,
          scale: 0.9,
          route: 1,
        });
        const s3 = branchPoint(0, 0.97);
        placeAsset("lamp", {
          x: s3[0] - 1.8,
          y: s3[1] - 0.05,
          z: s3[2],
          yaw: 0.2,
          scale: 4,
          route: 1,
        });
      }
      // Secondary landmark boards (blank panels; DOM carries identity).
      {
        const l1 = mainPoint(122);
        placeAsset("board", {
          x: l1[0] + 6.6,
          y: l1[1] - 0.05,
          z: 122,
          yaw: -0.4,
          scale: 1,
        });
        const l2 = mainPoint(141);
        placeAsset("sign", {
          x: l2[0] - 5.6,
          y: l2[1] - 0.05,
          z: 141,
          yaw: 0.4,
          scale: 3,
        });
        const l3 = mainPoint(158);
        placeAsset("board", {
          x: l3[0] + 6.2,
          y: l3[1] - 0.05,
          z: 158,
          yaw: -0.45,
          scale: 0.8,
        });
        const l4 = mainPoint(179);
        placeAsset("sign", {
          x: l4[0] - 5.6,
          y: l4[1] - 0.05,
          z: 179,
          yaw: 0.4,
          scale: 3,
        });
      }
      // (Overhead crossings stay procedural ribbons — the kit tile is a
      // 1-unit nub that adds nothing at this scale.)
      // Origin: sparse dark trees + rocks, quiet.
      for (const t of [
        { z: 16, off: -6.5, big: false },
        { z: 21, off: 7, big: true },
        { z: 26, off: -7.5, big: false },
        { z: 31, off: 6, big: false },
        { z: 36, off: -6, big: true },
      ]) {
        const p = mainPoint(t.z);
        placeAsset(t.big ? "tree-l" : "tree-s", {
          x: p[0] + t.off,
          y: p[1] - 0.05,
          z: t.z,
          yaw: t.z,
          scale: 2.2,
        });
      }
      for (const [z, off] of [
        [18, 5.2],
        [29, -5.4],
      ] as Array<[number, number]>) {
        const p = mainPoint(z);
        placeAsset("rock", {
          x: p[0] + off,
          y: p[1] - 0.05,
          z,
          yaw: z * 0.7,
          scale: 2.5,
        });
      }
      // Convergence lamps flanking the final approach.
      {
        const c = mainPoint(232);
        placeAsset("lamp", {
          x: c[0] - 6.2,
          y: c[1] - 0.05,
          z: 230,
          yaw: 0.3,
          scale: 4,
        });
        placeAsset("lamp", {
          x: c[0] + 7.5,
          y: c[1] - 0.05,
          z: 230,
          yaw: -0.3,
          scale: 4,
        });
      }
      }; // end placeKenneyWorld
      // The first signal belongs to the actual route's origin.
      const origin = mainPoint(8);
      for (let i = 0; i < 24; i++) {
        const t = (i / 24) * Math.PI * 2,
          nt = ((i + 1) / 24) * Math.PI * 2;
        triangle(
          origin,
          [
            origin[0] + Math.cos(t) * 0.045,
            origin[1] + Math.sin(t) * 0.045,
            origin[2],
          ],
          [
            origin[0] + Math.cos(nt) * 0.045,
            origin[1] + Math.sin(nt) * 0.045,
            origin[2],
          ],
          3,
          0,
        );
      }

      const staticBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, staticBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(vertices),
        gl.STATIC_DRAW,
      );
      // Kit geometry streams in (local, fast) and merges with one re-upload;
      // the opening reveal covers the arrival. Anything missing simply stays
      // procedural — same identity, strictly richer when present.
      let streamAlive = true;
      loadKenneySet(KENNEY_ASSETS).then((kms) => {
        if (!streamAlive) return;
        const before = vertices.length;
        kitModels = kms;
        placeKenneyWorld();
        runnerTris = buildRunnerTris(kms.runner ?? null);
        if (vertices.length !== before) {
          gl.bindBuffer(gl.ARRAY_BUFFER, staticBuffer);
          gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(vertices),
            gl.STATIC_DRAW,
          );
        }
      });

      // ---------- dynamic buffer: vehicle + switch arms ----------
      const DYN_MAX = 120000; // floats (asset hull ≈2k tris rebuilt per frame)
      const dynArray = new Float32Array(DYN_MAX);
      const dynBuffer = gl.createBuffer();
      const vehicleBuffer=gl.createBuffer();
      let vehicleCount=0,cachedRunner:number[]|null|undefined=undefined;
      gl.bindBuffer(gl.ARRAY_BUFFER, dynBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, DYN_MAX * 4, gl.DYNAMIC_DRAW);

      const pos = gl.getAttribLocation(program, "aPosition"),
        route = gl.getAttribLocation(program, "aRoute");

      const tether =
        canvas.parentElement?.querySelector<SVGPathElement>(
          ".route-tether path",
        );
      const pin = canvas.parentElement?.querySelector<SVGCircleElement>(
        ".route-tether circle",
      );
      const labels = Array.from(
        canvas.parentElement?.querySelectorAll<HTMLElement>(
          ".world-label, .landmark-label, .history-label",
        ) ?? [],
      ).map((el) => ({
        el,
        tech: el.querySelector<HTMLElement>(".world-label-techs"),
        dist: Number(el.dataset.dist ?? 0),
        side: Number(el.dataset.side ?? 1),
        h: Number(el.dataset.h ?? 5),
        mainOnly: el.classList.contains("world-label"),
      }));
      const uniforms = Object.fromEntries(
        [
          "Model", "ModelCenter", "ModelRight", "ModelUp", "ModelForward",
          "Camera",
          "Right",
          "Up",
          "Forward",
          "Aspect",
          "Activation",
          "Distance",
          "Branch",
          "Preview",
          "Map",
          "Flatten",
          "Time",
          "Speed",
          "Switch",
        ].map((n) => [n, gl.getUniformLocation(program, "u" + n)]),
      );
      let frame = 0,
        visible = !document.hidden,
        active = true,
        last = 0,
        slow = 0,
        quality = 1,
        px = 0,
        py = 0,
        tx = 0,
        ty = 0;
      let distance = worldState.distance,
        branchProgress = worldState.branchProgress,
        map = 0,
        flat = 0,
        speed = 0,
        bank = 0,
        switchThrow = 0;
      let routeMix=0;
      let transitionIndex=worldState.transitionBranch;
      let lastBranch=-1;
      let prevSm=-1;
      const startTime = performance.now();

      const pushTri = (
        arr: Float32Array,
        o: number,
        a: Point3,
        b: Point3,
        c: Point3,
        kind: number,
        rt: number,
        kinds?: [number, number, number],
      ) => {
        const pts = [a, b, c];
        for (let i = 0; i < 3; i++) {
          arr[o++] = pts[i][0];
          arr[o++] = pts[i][1];
          arr[o++] = pts[i][2];
          arr[o++] = kinds ? kinds[i]! : kind;
          arr[o++] = rt;
        }
        return o;
      };
      /** Build the Switchyard Runner in world space. Returns float count. */
      const buildVehicle = (
        arr: Float32Array,
        center: Point3,
        fwd: Point3,
        right: Point3,
        up: Point3,
        rt: number,
      ) => {
        let o = 0;
        const P = (lx: number, ly: number, lz: number): Point3 => [
          center[0] + right[0] * lx + up[0] * ly + fwd[0] * lz,
          center[1] + right[1] * lx + up[1] * ly + fwd[1] * lz,
          center[2] + right[2] * lx + up[2] * ly + fwd[2] * lz,
        ];
        // Kit hull (restyled by palette classification) or procedural fallback.
        const y1 = 0.26;
        if (runnerTris) {
          for (let i = 0; i < runnerTris.length; i += 12) {
            const a = P(runnerTris[i]!, runnerTris[i + 1]!, runnerTris[i + 2]!);
            const b = P(runnerTris[i + 4]!, runnerTris[i + 5]!, runnerTris[i + 6]!);
            const c = P(runnerTris[i + 8]!, runnerTris[i + 9]!, runnerTris[i + 10]!);
            o = pushTri(arr, o, a, b, c, 14, rt, [
              runnerTris[i + 3]!,
              runnerTris[i + 7]!,
              runnerTris[i + 11]!,
            ]);
          }
        } else {
          // procedural fallback hull
          const y0 = 0;
          o = pushTri(arr, o, P(-0.26, y0, -0.62), P(0.26, y0, -0.62), P(0.26, y0, 0.62), 14, rt);
          o = pushTri(arr, o, P(-0.26, y0, -0.62), P(0.26, y0, 0.62), P(-0.26, y0, 0.62), 14, rt);
          o = pushTri(arr, o, P(-0.24, y1, -0.55), P(0.24, y1, -0.55), P(0.2, y1, 0.55), 14, rt);
          o = pushTri(arr, o, P(-0.24, y1, -0.55), P(0.2, y1, 0.55), P(-0.2, y1, 0.55), 14, rt);
          o = pushTri(arr, o, P(-0.2, y0, 0.62), P(0.2, y0, 0.62), P(0, y1 + 0.02, 0.86), 14, rt);
        }
        // lime illumination strips along the flanks (fit the normalized hull)
        for (const s of [-1, 1]) {
          o = pushTri(arr, o, P(s * 0.295, 0.1, -0.55), P(s * 0.295, 0.1, 0.55), P(s * 0.295, 0.14, 0.55), 15, rt);
          o = pushTri(arr, o, P(s * 0.295, 0.1, -0.55), P(s * 0.295, 0.14, 0.55), P(s * 0.295, 0.14, -0.55), 15, rt);
        }
        // rear light bar
        o = pushTri(arr, o, P(-0.2, 0.12, -0.63), P(0.2, 0.12, -0.63), P(0.2, 0.17, -0.63), 15, rt);
        o = pushTri(arr, o, P(-0.2, 0.12, -0.63), P(0.2, 0.17, -0.63), P(-0.2, 0.17, -0.63), 15, rt);
        // tiny RB mast
        o = pushTri(arr, o, P(0.16, y1, -0.45), P(0.19, y1, -0.45), P(0.19, y1 + 0.16, -0.45), 16, rt);
        o = pushTri(arr, o, P(0.16, y1, -0.45), P(0.19, y1 + 0.16, -0.45), P(0.16, y1 + 0.16, -0.45), 16, rt);
        return o;
      };

      const resize = () => {
        const dpr =
          Math.min(devicePixelRatio, innerWidth < 800 ? 1 : 1.5) * quality;
        canvas.width = Math.round(canvas.clientWidth * dpr);
        canvas.height = Math.round(canvas.clientHeight * dpr);
        gl.viewport(0, 0, canvas.width, canvas.height);
      };

      const draw = (now: number) => {
        frame = 0;
        if (!active || !visible) return;
        const dt = last ? Math.min(64, now - last) : 16;
        last = now;
        const time = (now - startTime) / 1000;
        const ease = 1 - Math.exp(-dt / 110);
        if (dt > 28) slow++;
        else slow = Math.max(0, slow - 1);
        if (slow > 45 && quality === 1) {
          quality = 0.75;
          resize();
        }
        const prevD = distance;
        distance = worldState.distance;
        branchProgress = worldState.branchProgress;
        // smoothed forward speed (units/sec)
        const inst = Math.abs(distance - prevD) / Math.max(1, dt) * 1000;
        speed += (Math.min(inst, 40) - speed) * ease;
        worldState.speed = speed;
        map += (worldState.map - map) * ease;
        flat += (worldState.flatten - flat) * ease;
        px += (tx - px) * ease;
        py += (ty - py) * ease;

        const branch=worldState.branch;
        if(branch>=0&&branch!==lastBranch){transitionIndex=branch;routeMix=lastBranch<0?routeMix:0;}
        lastBranch=branch;
        const mixTarget=branch>=0?1:0;
        routeMix+=(mixTarget-routeMix)*(1-Math.exp(-dt/440));
        if(Math.abs(routeMix-mixTarget)<.001)routeMix=mixTarget;
        switchThrow+=(mixTarget-switchThrow)*(1-Math.exp(-dt/240));
        worldState.switchThrow=switchThrow;
        prevSm=worldState.preview;
        const path=(d:number):Point3=>{
          const main=mainPoint(d),start=branchStart(transitionIndex),end=branchEnd(transitionIndex);
          if(d<start||d>end)return main;
          return mixP(main,branchPoint(transitionIndex,(d-start)/(end-start)),routeMix);
        };
        const vp=path(distance);
        const tangent=norm(sub(path(distance+.12),path(Math.max(0,distance-.12))));
        const right=norm(cross([0,1,0],tangent)),up=norm(cross(tangent,right));
        const vehicleCenter:Point3=[vp[0],vp[1]+.34,vp[2]];
        // Camera and runner sample the same eased path. No bob, roll, FOV pumping,
        // preview lean, or competing position springs.
        const behind=path(Math.max(0,distance-6));
        const ahead=path(distance+7);
        const camPos:Point3=[behind[0]+.35,behind[1]+3.5,behind[2]-(distance<6?6-distance:0)];
        const lookPos:Point3=[ahead[0],ahead[1]+.8,ahead[2]];
        const camUp:Point3=[0,1,0];
        worldState.bank=0;
        let target: Point3 = lookPos;
        const mapPoint = mainPoint(distance + 25);
        const cam = mixP(camPos, [mapPoint[0], 72, mapPoint[2] - 12], map);
        target = mixP(target, [mapPoint[0], 0, mapPoint[2] + 5], map);
        const forward = norm(sub(target, cam)),
          fRight = norm(cross(camUp, forward)),
          fUp = norm(cross(forward, fRight));

        // ---- rebuild dynamic buffer (vehicle + nearest switch arm) ----
        let dynCount = 0;
        const onBranch = branch >= 0;
        const rt = onBranch ? branch + 1 : 0;
        if(cachedRunner!==runnerTris){
          vehicleCount=buildVehicle(dynArray,[0,0,0],[0,0,1],[1,0,0],[0,1,0],0);
          gl.bindBuffer(gl.ARRAY_BUFFER,vehicleBuffer);
          gl.bufferData(gl.ARRAY_BUFFER,dynArray.subarray(0,vehicleCount),gl.STATIC_DRAW);
          cachedRunner=runnerTris;
        }
        // switch arm: a flat trackside blade swinging MAIN ↔ STACKPORT with
        // selection. Flat so the commit pass-over never billboards.
        const sw = branchPoint(Math.max(0,worldState.selection), 0);
        if (Math.abs(sw[2] - distance) < 60) {
          const bx = sw[0] + 1.05;
          const by = sw[1] + 0.07;
          const bz = sw[2] - 0.2;
          const mx = -0.12;
          const mz = 0.99;
          const rx = 0.55;
          const rz = 0.835;
          const vx = (mx + (rx - mx) * switchThrow) * 0.85;
          const vz = (mz + (rz - mz) * switchThrow) * 0.85;
          const pl = 0.07 / (Math.hypot(vx, vz) || 1);
          const px = -vz * pl;
          const pz = vx * pl;
          const a: Point3 = [bx + px, by, bz + pz];
          const b: Point3 = [bx + vx + px, by, bz + vz + pz];
          const c: Point3 = [bx + vx - px, by, bz + vz - pz];
          const d: Point3 = [bx - px, by, bz - pz];
          dynCount = pushTri(dynArray, dynCount, a, b, c, 17, 1);
          dynCount = pushTri(dynArray, dynCount, a, c, d, 17, 1);
        }

        const dot = (a: Point3, b: Point3) =>
          a.reduce((v, n, i) => v + n * b[i], 0);
        const project = (point: Point3) => {
          const relative = sub(point, cam),
            depth = dot(relative, forward);
          const lens = 1.85 + (1.3 - 1.85) * map;
          return {
            x:
              (0.5 +
                ((dot(relative, fRight) * lens) /
                  (Math.max(0.1, depth) *
                    (Math.max(1, canvas.clientWidth) /
                      Math.max(1, canvas.clientHeight)))) *
                  0.5) *
              canvas.clientWidth,
            y:
              (0.5 -
                ((dot(relative, fUp) * lens) / Math.max(0.1, depth)) * 0.5) *
              canvas.clientHeight,
            depth,
          };
        };
        const anchor =
          worldState.branch >= 0
            ? branchPoint(0, Math.min(1, branchProgress + 0.24))
            : mainPoint(distance < 40 ? 38 : distance < 66 ? 59 : 112);
        const projected = project(anchor);
        if (tether && pin) {
          const width = canvas.clientWidth,
            height = canvas.clientHeight;
          const signX =
            width < 800
              ? width * 0.08
              : distance < 40
                ? width * 0.4
                : worldState.branch >= 0
                  ? width * 0.4
                  : width * 0.55;
          const signY =
            height *
            (width < 800
              ? 0.26
              : distance < 40
                ? 0.64
                : worldState.branch >= 0
                  ? 0.77
                  : 0.3);
          const tVisible =
            width > 0 &&
            height > 0 &&
            distance > 18 &&
            distance < 75 &&
            projected.depth > 1 &&
            map < 0.2;
          tether.parentElement!.style.opacity = tVisible
            ? String(Math.min(1, (distance - 18) / 6) * 0.48)
            : "0";
          tether.setAttribute(
            "d",
            `M ${projected.x} ${projected.y} L ${signX} ${signY + 24} L ${signX + 45} ${signY + 24}`,
          );
          pin.setAttribute("cx", String(projected.x));
          pin.setAttribute("cy", String(projected.y));
        }
        // World annotations: DOM labels riding on anchors. Districts resolve
        // in two phases (silhouette → label → technologies); landmarks and
        // history markers use a single resolving label.
        for (const L of labels) {
          const lb = mainPoint(L.dist);
          const lp = project([lb[0] + L.side * 5.5, lb[1] + Math.min(L.h,2.2), lb[2]]);
          const ahead = L.dist - distance;
          const readable =
            map < 0.2 &&
            lp.depth > 1 &&
            ahead > 4 &&
            ahead < 70 &&
            canvas.clientWidth > 0 &&
            (!L.mainOnly || worldState.branch < 0);
          const fadeIn = Math.min(1, Math.max(0, (ahead - 1) / 6));
          const fadeOut = 1 - Math.min(1, Math.max(0, (ahead - 22) / 14));
          const inFrame=lp.x>80&&lp.x<canvas.clientWidth-80&&lp.y>100&&lp.y<canvas.clientHeight-160;
          const lo = readable&&inFrame ? fadeIn * fadeOut : 0;
          L.el.style.opacity = lo.toFixed(3);
          L.el.style.visibility = lo > 0.02 ? "visible" : "hidden";
          if (lo > 0.02)
            L.el.style.transform = `translate(${lp.x.toFixed(1)}px, ${lp.y.toFixed(1)}px) translate(-50%,-100%)`;
          if (L.tech) {
            // Technologies surface only when close — discovery, not a list.
            const techIn = 1 - Math.min(1, Math.max(0, (ahead - 10) / 8));
            const to = readable ? techIn * fadeOut : 0;
            L.tech.style.opacity = to.toFixed(3);
          }
        }
        const a = worldState.activation;
        const base = Math.max(0, Math.min(1, (a - 0.5) / 0.5));
        gl.clearColor(
          0.003 + (0.20 - 0.003) * base,
          0.003 + (0.25 - 0.003) * base,
          0.003 + (0.225 - 0.003) * base,
          1,
        );
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);
        // FOV widens slightly with speed: shrink lens
        const speedLens = Math.min(0.22, speed * 0.006);
        void speedLens;
        gl.uniform3fv(uniforms.Camera, cam);
        gl.uniform3fv(uniforms.Right, fRight);
        gl.uniform3fv(uniforms.Up, fUp);
        gl.uniform3fv(uniforms.Forward, forward);
        gl.uniform1f(uniforms.Aspect, canvas.width / canvas.height);
        gl.uniform1f(uniforms.Activation, a);
        gl.uniform1f(uniforms.Distance, distance);
        gl.uniform1f(uniforms.Branch, worldState.branch);
        gl.uniform1f(uniforms.Preview, prevSm);
        gl.uniform1f(uniforms.Map, map);
        gl.uniform1f(uniforms.Flatten, flat);
        gl.uniform1f(uniforms.Time, time);
        gl.uniform1f(uniforms.Speed, Math.min(1, speed / 18));
        gl.uniform1f(uniforms.Switch, switchThrow);

        const bindAttribs = (buf: WebGLBuffer) => {
          gl.bindBuffer(gl.ARRAY_BUFFER, buf);
          gl.enableVertexAttribArray(pos);
          gl.vertexAttribPointer(pos, 3, gl.FLOAT, false, 20, 0);
          gl.enableVertexAttribArray(route);
          gl.vertexAttribPointer(route, 2, gl.FLOAT, false, 20, 12);
        };
        gl.uniform1f(uniforms.Model,0);
        bindAttribs(staticBuffer);
        gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 5);
        // dynamic
        gl.bindBuffer(gl.ARRAY_BUFFER, dynBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, dynArray.subarray(0, dynCount));
        bindAttribs(dynBuffer);
        gl.drawArrays(gl.TRIANGLES, 0, dynCount / 5);
        gl.uniform1f(uniforms.Model,1);
        gl.uniform3fv(uniforms.ModelCenter,vehicleCenter);
        gl.uniform3fv(uniforms.ModelRight,right);gl.uniform3fv(uniforms.ModelUp,up);gl.uniform3fv(uniforms.ModelForward,tangent);
        bindAttribs(vehicleBuffer!);gl.drawArrays(gl.TRIANGLES,0,vehicleCount/5);
        gl.uniform1f(uniforms.Model,0);

        canvas.dataset.distance = distance.toFixed(2);
        canvas.dataset.branch = String(worldState.branch);
        canvas.dataset.activation = a.toFixed(3);
        canvas.dataset.camera=cam.map(v=>v.toFixed(4)).join(',');
        canvas.dataset.heading=forward.map(v=>v.toFixed(4)).join(',');
        canvas.dataset.routeMix=routeMix.toFixed(3);
        canvas.dataset.frameMs=dt.toFixed(1);
        frame = requestAnimationFrame(draw);
      };
      const resume = () => {
        if (!frame && active && visible) {
          last = 0;
          frame = requestAnimationFrame(draw);
        }
      };
      const observer = new IntersectionObserver(([entry]) => {
        active = entry.isIntersecting;
        resume();
      });
      observer.observe(canvas);
      const pointer = (e: PointerEvent) => {
        tx = e.clientX / innerWidth - 0.5;
        ty = e.clientY / innerHeight - 0.5;
      };
      const visibility = () => {
        visible = !document.hidden;
        resume();
      };
      const lost = (e: Event) => {
        e.preventDefault();
        active = false;
        canvas.dataset.ready = "false";
        window.dispatchEvent(new Event("switchyard:opening-timeout"));
        window.dispatchEvent(new Event("switchyard:world-ready"));
      };
      const restored = () => setup();
      canvas.addEventListener("webglcontextlost", lost);
      canvas.addEventListener("webglcontextrestored", restored);
      window.addEventListener("resize", resize);
      window.addEventListener("pointermove", pointer, { passive: true });
      document.addEventListener("visibilitychange", visibility);
      resize();
      resume();
      canvas.dataset.ready = "true";
      window.dispatchEvent(new Event("switchyard:world-ready"));
      dispose = () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        canvas.removeEventListener("webglcontextlost", lost);
        canvas.removeEventListener("webglcontextrestored", restored);
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", pointer);
        document.removeEventListener("visibilitychange", visibility);
        gl.deleteBuffer(staticBuffer);
        gl.deleteBuffer(dynBuffer);
        gl.deleteBuffer(vehicleBuffer);
        gl.deleteProgram(program);
        shaders.forEach((s) => gl.deleteShader(s));
        canvas.dataset.ready = "false";
        streamAlive = false;
      };
    };
    setup();
    motion.addEventListener("change", setup);
    return () => {
      dispose?.();
      motion.removeEventListener("change", setup);
    };
  }, []);
  return <canvas ref={ref} className="route-canvas" aria-hidden="true" />;
}
