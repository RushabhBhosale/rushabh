"use client";

import { useEffect, useRef } from "react";
import {
  classifyVehicle,
  loadKenneyModel,
  type KenneyModel,
} from "./kenney";

type Vertex = { x: number; y: number; z: number; kind: number };
type Triangle = [Vertex, Vertex, Vertex];

let runnerPromise: Promise<KenneyModel | null> | undefined;
const loadRunner = () =>
  (runnerPromise ??= loadKenneyModel(
    "/assets/switchyard/runner.glb",
    "/assets/switchyard/pal-car.png",
  ));

const vertex = (x: number, y: number, z: number, kind: number): Vertex => ({
  x,
  y,
  z,
  kind,
});

function runnerTriangles(model: KenneyModel): Triangle[] {
  const sx = model.max[0] - model.min[0] || 1;
  const sy = model.max[1] - model.min[1] || 1;
  const sz = model.max[2] - model.min[2] || 1;
  let scale = Math.min(1.3 / sz, 0.56 / sx);
  if (sy * scale > 0.5) scale = 0.5 / sy;
  const cx = (model.min[0] + model.max[0]) / 2;
  const cz = (model.min[2] + model.max[2]) / 2;
  const triangles: Triangle[] = [];

  for (const primitive of model.primitives) {
    for (let i = 0; i < primitive.positions.length; i += 9) {
      const points: Vertex[] = [];
      for (let corner = 0; corner < 3; corner++) {
        const offset = i + corner * 3;
        points.push(
          vertex(
            (primitive.positions[offset]! - cx) * scale,
            (primitive.positions[offset + 1]! - model.min[1]) * scale,
            (primitive.positions[offset + 2]! - cz) * scale,
            classifyVehicle(
              primitive.colors[offset]!,
              primitive.colors[offset + 1]!,
              primitive.colors[offset + 2]!,
              primitive.emissive[(offset / 3) | 0] === 1,
            ),
          ),
        );
      }
      triangles.push(points as Triangle);
    }
  }

  const addQuad = (a: Vertex, b: Vertex, c: Vertex, d: Vertex) => {
    triangles.push([a, b, c], [a, c, d]);
  };
  for (const side of [-1, 1]) {
    addQuad(
      vertex(side * 0.295, 0.1, -0.55, 15),
      vertex(side * 0.295, 0.1, 0.55, 15),
      vertex(side * 0.295, 0.14, 0.55, 15),
      vertex(side * 0.295, 0.14, -0.55, 15),
    );
  }
  addQuad(
    vertex(-0.2, 0.12, -0.63, 15),
    vertex(0.2, 0.12, -0.63, 15),
    vertex(0.2, 0.17, -0.63, 15),
    vertex(-0.2, 0.17, -0.63, 15),
  );
  addQuad(
    vertex(0.16, 0.26, -0.45, 16),
    vertex(0.19, 0.26, -0.45, 16),
    vertex(0.19, 0.42, -0.45, 16),
    vertex(0.16, 0.42, -0.45, 16),
  );
  return triangles;
}

const shade = (kind: number, amount: number) => {
  const colors: Record<number, [number, number, number]> = {
    14: [71, 82, 73],
    15: [211, 238, 128],
    16: [236, 237, 226],
  };
  const color = colors[kind] ?? colors[14]!;
  return `rgb(${color.map((channel) => Math.round(channel * amount)).join(" ")})`;
};

function drawRunner(canvas: HTMLCanvasElement, triangles: Triangle[]) {
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(rect.width, 1);
  const height = Math.max(rect.height, 1);
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  const context = canvas.getContext("2d");
  if (!context) return;
  context.setTransform(dpr, 0, 0, dpr, 0, 0);
  context.clearRect(0, 0, width, height);

  const yaw = -0.08;
  const cos = Math.cos(yaw);
  const sin = Math.sin(yaw);
  const project = (point: Vertex) => {
    const x = point.x * cos - point.z * sin;
    const z = point.x * sin + point.z * cos;
    return {
      x: width * 0.5 + x * width * 1.25,
      y: height * 0.58 - z * height * 0.5 - point.y * height * 0.58,
      depth: z - point.y * 0.55,
    };
  };

  const projected = triangles
    .map((triangle) => {
      const points = triangle.map(project) as ReturnType<typeof project>[];
      return {
        triangle,
        points,
        depth: points.reduce((total, point) => total + point.depth, 0) / 3,
      };
    })
    .sort((a, b) => b.depth - a.depth);

  for (const { triangle, points } of projected) {
    const a = triangle[0];
    const b = triangle[1];
    const c = triangle[2];
    const ux = b.x - a.x;
    const uy = b.y - a.y;
    const uz = b.z - a.z;
    const vx = c.x - a.x;
    const vy = c.y - a.y;
    const vz = c.z - a.z;
    const nx = uy * vz - uz * vy;
    const ny = uz * vx - ux * vz;
    const nz = ux * vy - uy * vx;
    const length = Math.hypot(nx, ny, nz) || 1;
    const light = Math.max(
      0.68,
      0.78 + (nx * -0.35 + ny * 0.88 + nz * -0.3) / length / 3,
    );

    context.beginPath();
    context.moveTo(points[0]!.x, points[0]!.y);
    context.lineTo(points[1]!.x, points[1]!.y);
    context.lineTo(points[2]!.x, points[2]!.y);
    context.closePath();
    context.fillStyle = shade(triangle[0].kind, light);
    context.fill();
  }
}

export default function SwitchyardCar({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let active = true;
    loadRunner().then((model) => {
      if (active && model && canvasRef.current) {
        drawRunner(canvasRef.current, runnerTriangles(model));
      }
    });
    return () => {
      active = false;
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
