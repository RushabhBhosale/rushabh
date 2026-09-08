"use client";

import { useEffect, useRef } from "react";

// Small real 3D scene: triangle ribbons and portal edges projected in the vertex
// shader. No texture downloads, particle system, or per-frame React rendering.
const vertex = `
attribute vec3 aPosition;
attribute vec3 aColor;
uniform float uAspect;
uniform float uTravel;
uniform vec2 uPointer;
varying vec3 vColor;
varying float vDepth;
void main() {
  float z = mod(aPosition.z - uTravel, 120.0) + 0.5;
  float bend = sin(z * 0.025 + uTravel * 0.006) * 2.1;
  vec3 p = vec3(aPosition.x + bend - uPointer.x * 0.6, aPosition.y - uPointer.y * 0.25, z);
  float y = p.y * 0.996 + p.z * 0.085;
  float depth = p.z * 0.996 - p.y * 0.085;
  gl_Position = vec4(p.x * 1.9 / uAspect, y * 1.9, depth * 0.999 - 0.2, depth);
  vColor = aColor;
  vDepth = z;
}`;
const fragment = `
precision mediump float;
varying vec3 vColor;
varying float vDepth;
void main() {
  float fog = 1.0 - smoothstep(8.0, 110.0, vDepth);
  gl_FragColor = vec4(mix(vec3(0.047, 0.055, 0.051), vColor, fog * 0.85), 1.0);
}`;

export default function RouteWorld() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let dispose: (() => void) | undefined;
    const setup = () => {
      dispose?.();
      if (motion.matches) return;
      const gl = canvas.getContext("webgl", {
        alpha: false,
        antialias: true,
        powerPreference: "low-power",
      });
      if (!gl) return;
      const shaders: WebGLShader[] = [];
      const compile = (type: number, source: string) => {
        const shader = gl.createShader(type);
        if (!shader) return null;
        shaders.push(shader);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
      };
      const vs = compile(gl.VERTEX_SHADER, vertex),
        fs = compile(gl.FRAGMENT_SHADER, fragment);
      const program = gl.createProgram();
      if (!vs || !fs || !program) {
        shaders.forEach((s) => gl.deleteShader(s));
        return;
      }
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        gl.deleteProgram(program);
        shaders.forEach((s) => gl.deleteShader(s));
        return;
      }
      gl.useProgram(program);
      const vertices: number[] = [];
      const acid = [0.81, 0.94, 0.35],
        ivory = [0.39, 0.43, 0.37],
        blue = [0.24, 0.37, 0.78];
      const quad = (
        a: number[],
        b: number[],
        c: number[],
        d: number[],
        color: number[],
      ) => {
        [a, b, c, a, c, d].forEach((p) => vertices.push(...p, ...color));
      };
      for (let lane = -4; lane <= 4; lane++) {
        for (let z = 0; z < 120; z += 0.5) {
          const branch = (depth: number) =>
            lane * 1.65 +
            Math.sign(lane) * Math.pow(Math.max(0, 48 - depth) / 22, 2);
          const x = branch(z),
            nx = branch(z + 0.5),
            w = lane === 0 ? 0.035 : 0.018;
          quad(
            [x - w, -1.9, z],
            [x + w, -1.9, z],
            [nx + w, -1.9, z + 0.5],
            [nx - w, -1.9, z + 0.5],
            lane === 0 || lane === -2 ? acid : lane === 2 ? blue : ivory,
          );
        }
      }
      for (let z = 8; z < 120; z += 16) {
        const w = 0.024,
          x = 6.6;
        quad(
          [-x, 2.6, z],
          [x, 2.6, z],
          [x, 2.6 + w, z],
          [-x, 2.6 + w, z],
          ivory,
        );
        quad(
          [-x, -1.9, z],
          [-x + w, -1.9, z],
          [-x + w, 2.6, z],
          [-x, 2.6, z],
          ivory,
        );
        quad(
          [x, -1.9, z],
          [x + w, -1.9, z],
          [x + w, 2.6, z],
          [x, 2.6, z],
          blue,
        );
        quad(
          [-0.13, -1.9, z],
          [0.13, -1.9, z],
          [0.13, -1.9, z + 0.7],
          [-0.13, -1.9, z + 0.7],
          acid,
        );
      }
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(vertices),
        gl.STATIC_DRAW,
      );
      const pos = gl.getAttribLocation(program, "aPosition"),
        color = gl.getAttribLocation(program, "aColor");
      gl.enableVertexAttribArray(pos);
      gl.vertexAttribPointer(pos, 3, gl.FLOAT, false, 24, 0);
      gl.enableVertexAttribArray(color);
      gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 24, 12);
      const aspect = gl.getUniformLocation(program, "uAspect"),
        travel = gl.getUniformLocation(program, "uTravel"),
        pointer = gl.getUniformLocation(program, "uPointer");
      let frame = 0,
        active = true,
        visible = !document.hidden,
        px = 0,
        py = 0,
        tx = 0,
        ty = 0,
        last = 0;
      const resize = () => {
        const dpr = Math.min(devicePixelRatio, innerWidth < 800 ? 1 : 1.5);
        canvas.width = Math.round(canvas.clientWidth * dpr);
        canvas.height = Math.round(canvas.clientHeight * dpr);
        gl.viewport(0, 0, canvas.width, canvas.height);
      };
      const draw = (now: number) => {
        frame = 0;
        if (!active || !visible) return;
        if (now - last > 30) {
          last = now;
          px += (tx - px) * 0.09;
          py += (ty - py) * 0.09;
          gl.clearColor(0.047, 0.055, 0.051, 1);
          gl.clear(gl.COLOR_BUFFER_BIT);
          gl.uniform1f(aspect, canvas.width / canvas.height);
          gl.uniform1f(travel, (scrollY / innerHeight) * 13);
          gl.uniform2f(pointer, px, py);
          gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 6);
        }
        frame = requestAnimationFrame(draw);
      };
      const resume = () => {
        if (!frame && active && visible) frame = requestAnimationFrame(draw);
      };
      const observer = new IntersectionObserver(
        ([entry]) => {
          active = entry.isIntersecting;
          resume();
        },
        { rootMargin: "100px" },
      );
      observer.observe(canvas.parentElement!);
      const mouse = (e: PointerEvent) => {
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
      };
      const restored = () => setup();
      canvas.addEventListener("webglcontextlost", lost);
      canvas.addEventListener("webglcontextrestored", restored);
      window.addEventListener("pointermove", mouse, { passive: true });
      window.addEventListener("resize", resize);
      document.addEventListener("visibilitychange", visibility);
      resize();
      resume();
      canvas.dataset.ready = "true";
      dispose = () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        window.removeEventListener("pointermove", mouse);
        window.removeEventListener("resize", resize);
        document.removeEventListener("visibilitychange", visibility);
        canvas.removeEventListener("webglcontextlost", lost);
        canvas.removeEventListener("webglcontextrestored", restored);
        gl.deleteBuffer(buffer);
        gl.deleteProgram(program);
        shaders.forEach((s) => gl.deleteShader(s));
        canvas.dataset.ready = "false";
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
