
"use client";

import { useEffect, useRef, useState } from "react";

/* PORTAL CANVAS */
function PortalCanvas() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = canvas.width = canvas.offsetWidth;
    let h = canvas.height = canvas.offsetHeight;

    const particles = [];
    const colors = ["#ff2d78", "#00e5ff", "#ffd700", "#ff2d78", "#00e5ff"];

    for (let i = 0; i < 120; i++) {
      particles.push({
        angle: Math.random() * Math.PI * 2,
        radius: 80 + Math.random() * 200,
        speed: 0.002 + Math.random() * 0.008,
        size: 1 + Math.random() * 2.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.2 + Math.random() * 0.6,
        orbitOffset: Math.random() * Math.PI * 2,
      });
    }

    const handleMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener("mousemove", handleMouse);

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", resize);

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const mx = mouseRef.current.x || cx;
      const my = mouseRef.current.y || cy;
      const time = Date.now() * 0.001;

      for (let r = 0; r < 3; r++) {
        const ringRadius = 100 + r * 60;
        const ringAlpha = 0.04 - r * 0.01;
        ctx.beginPath();
        ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 45, 120, " + ringAlpha + ")";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, ringRadius + 20, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(0, 229, 255, " + (ringAlpha * 0.7) + ")";
        ctx.stroke();
      }

      for (const p of particles) {
        p.angle += p.speed;
        const wobble = Math.sin(time * 2 + p.orbitOffset) * 15;
        const r = p.radius + wobble;
        const x = cx + Math.cos(p.angle) * r;
        const y = cy + Math.sin(p.angle) * r;

        const dx = mx - x;
        const dy = my - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const attractX = dist < 200 ? x + dx * 0.02 : x;
        const attractY = dist < 200 ? y + dy * 0.02 : y;

        const flickerAlpha = p.alpha * (0.7 + Math.sin(time * 3 + p.orbitOffset) * 0.3);

        ctx.beginPath();
        ctx.arc(attractX, attractY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = flickerAlpha;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(attractX, attractY, p.size * 3, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(attractX, attractY, 0, attractX, attractY, p.size * 3);
        grad.addColorStop(0, p.color);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.globalAlpha = flickerAlpha * 0.3;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return React.createElement("canvas", { ref: canvasRef, className: "portal-canvas" });
}

export { PortalCanvas };
