"use client";

import React, { useEffect, useRef } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Golden ratio
    const phi = (1 + Math.sqrt(5)) / 2;

    // 12 vertices of an icosahedron
    const rawVertices: Point3D[] = [
      { x: -1, y: phi, z: 0 },
      { x: 1, y: phi, z: 0 },
      { x: -1, y: -phi, z: 0 },
      { x: 1, y: -phi, z: 0 },
      { x: 0, y: -1, z: phi },
      { x: 0, y: 1, z: phi },
      { x: 0, y: -1, z: -phi },
      { x: 0, y: 1, z: -phi },
      { x: phi, y: 0, z: -1 },
      { x: phi, y: 0, z: 1 },
      { x: -phi, y: 0, z: -1 },
      { x: -phi, y: 0, z: 1 },
    ];

    let outerVertices: Point3D[] = [];
    let coreVertices: Point3D[] = [];
    let outerEdges: [number, number][] = [];
    let coreEdges: [number, number][] = [];
    let scale = 140;

    const resize = () => {
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);

      // Responsive scale based on smaller dimension
      scale = Math.min(width, height) * 0.34;

      outerVertices = rawVertices.map((v) => {
        const len = Math.hypot(v.x, v.y, v.z);
        return {
          x: (v.x / len) * scale,
          y: (v.y / len) * scale,
          z: (v.z / len) * scale,
        };
      });

      const coreScale = scale * 0.44;
      coreVertices = [
        { x: coreScale, y: 0, z: 0 },
        { x: -coreScale, y: 0, z: 0 },
        { x: 0, y: coreScale, z: 0 },
        { x: 0, y: -coreScale, z: 0 },
        { x: 0, y: 0, z: coreScale },
        { x: 0, y: 0, z: -coreScale },
      ];

      outerEdges = [];
      const distThreshold = (2 / Math.sqrt(1 + phi * phi)) * scale * 1.15;
      for (let i = 0; i < outerVertices.length; i++) {
        for (let j = i + 1; j < outerVertices.length; j++) {
          const d = Math.hypot(
            outerVertices[i].x - outerVertices[j].x,
            outerVertices[i].y - outerVertices[j].y,
            outerVertices[i].z - outerVertices[j].z
          );
          if (d < distThreshold) {
            outerEdges.push([i, j]);
          }
        }
      }

      coreEdges = [
        [0, 2], [0, 3], [0, 4], [0, 5],
        [1, 2], [1, 3], [1, 4], [1, 5],
        [2, 4], [4, 3], [3, 5], [5, 2],
      ];
    };

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(container);
    resize();

    // Mouse and Touch controls
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    const handlePointerMove = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width - 0.5;
      const y = (clientY - rect.top) / rect.height - 0.5;
      targetRotY = x * 1.2;
      targetRotX = -y * 1.2;
    };

    const onMouseMove = (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    let angle = 0;

    const render = () => {
      angle += 0.006;
      currentRotX += (targetRotX - currentRotX) * 0.06;
      currentRotY += (targetRotY - currentRotY) * 0.06;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      const ax = angle * 0.75 + currentRotX;
      const ay = angle + currentRotY;

      const cosX = Math.cos(ax);
      const sinX = Math.sin(ax);
      const cosY = Math.cos(ay);
      const sinY = Math.sin(ay);

      const project = (p: Point3D) => {
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;

        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        const fov = Math.max(500, Math.min(width, height) * 1.4);
        const depth = z2 + scale * 3;
        const factor = fov / Math.max(depth, 50);

        return {
          px: cx + x1 * factor,
          py: cy + y2 * factor,
          depth: z2,
        };
      };

      // Draw subtle orbital radar circle
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, scale * 1.25, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 51, 72, 0.08)";
      ctx.setLineDash([3, 9]);
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      const projectedOuter = outerVertices.map(project);
      const projectedCore = coreVertices.map(project);

      // Outer wireframe edges
      outerEdges.forEach(([i, j]) => {
        const p1 = projectedOuter[i];
        const p2 = projectedOuter[j];
        if (!p1 || !p2) return;
        const avgDepth = (p1.depth + p2.depth) / 2;
        const alpha = Math.max(0.12, Math.min(0.85, 0.4 + avgDepth / (scale * 2.5)));

        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.strokeStyle = `rgba(255, 51, 72, ${alpha * 0.7})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Connect outer and inner vertices
      for (let i = 0; i < outerVertices.length; i += 2) {
        const pOuter = projectedOuter[i];
        const pCore = projectedCore[i % coreVertices.length];
        if (!pOuter || !pCore) continue;
        ctx.beginPath();
        ctx.moveTo(pOuter.px, pOuter.py);
        ctx.lineTo(pCore.px, pCore.py);
        ctx.strokeStyle = "rgba(166, 0, 25, 0.25)";
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Core octahedron edges
      coreEdges.forEach(([i, j]) => {
        const p1 = projectedCore[i];
        const p2 = projectedCore[j];
        if (!p1 || !p2) return;
        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.strokeStyle = "rgba(255, 51, 72, 0.95)";
        ctx.lineWidth = 1.4;
        ctx.stroke();
      });

      // Outer vertices
      projectedOuter.forEach((p) => {
        const alpha = Math.max(0.2, Math.min(1, 0.5 + p.depth / (scale * 2)));
        ctx.beginPath();
        ctx.arc(p.px, p.py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(247, 242, 243, ${alpha})`;
        ctx.fill();

        if (p.depth > 0) {
          ctx.beginPath();
          ctx.arc(p.px, p.py, 5, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(255, 51, 72, 0.4)";
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });

      // Core vertices
      projectedCore.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.px, p.py, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#FF3348";
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[300px] sm:min-h-[380px] lg:min-h-[480px] flex items-center justify-center select-none"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
