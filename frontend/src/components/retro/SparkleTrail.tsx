import React, { useEffect, useRef } from 'react';

type ShapeType = 'star4' | 'star5' | 'star8' | 'diamond' | 'bubble' | 'heart';

interface Particle {
  x: number;
  y: number;
  size: number;
  initialSize: number;
  color: string;
  alpha: number;
  decay: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  shape: ShapeType;
}

export const SparkleTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Particle[] = [];
    let animationId: number;
    let dpr = window.devicePixelRatio || 1;

    const colors = [
      '#F59E0B', // Starlight Gold
      '#FDE047', // Radiant Yellow
      '#38BDF8', // Celestial Cyan
      '#60A5FA', // Sky Blue
      '#EC4899', // Dream Pink
      '#F472B6', // Pastel Pink
      '#C084FC', // Magic Lavender
      '#34D399', // Mint Stardust
      '#FFFFFF', // Pure Starlight White
    ];

    const shapes: ShapeType[] = ['star4', 'star5', 'star8', 'diamond', 'bubble', 'heart'];

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const spawnParticle = (x: number, y: number, extraSpeed = 1) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 1.6 + 0.4) * extraSpeed;
      const size = Math.random() * 6 + 4; // 4px to 10px prominent size
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];

      particles.push({
        x,
        y,
        size,
        initialSize: size,
        color,
        alpha: 1,
        decay: Math.random() * 0.018 + 0.014, // smooth 50-70 frame lifetime
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.5, // gentle upward cosmic float
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.15,
        shape,
      });
    };

    const spawnBurst = (x: number, y: number, count = 10) => {
      for (let i = 0; i < count; i++) {
        spawnParticle(x, y, 2.2);
      }
    };

    let lastX = -100;
    let lastY = -100;

    const handlePointerMove = (x: number, y: number) => {
      const dist = Math.hypot(x - lastX, y - lastY);
      if (dist < 8) return; // avoid stacking when stationary

      lastX = x;
      lastY = y;

      // Spawn 2-3 twinkling particles per move step
      const count = Math.min(3, Math.max(1, Math.floor(dist / 14)));
      for (let i = 0; i < count; i++) {
        const jitterX = x + (Math.random() - 0.5) * 8;
        const jitterY = y + (Math.random() - 0.5) * 8;
        spawnParticle(jitterX, jitterY);
      }

      // Limit particle array to 90 particles for silky 60fps performance
      if (particles.length > 90) {
        particles.splice(0, particles.length - 90);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e && e.touches.length > 0 ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e && e.touches.length > 0 ? e.touches[0].clientY : (e as MouseEvent).clientY;
      if (typeof clientX === 'number' && typeof clientY === 'number') {
        spawnBurst(clientX, clientY, 12);
      }
    };

    // Draw 4-pointed Celestial Sparkle
    const drawStar4 = (x: number, y: number, r: number) => {
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const outerAngle = (i * 90 * Math.PI) / 180;
        const innerAngle = ((i * 90 + 45) * Math.PI) / 180;
        ctx.lineTo(x + Math.cos(outerAngle) * r, y + Math.sin(outerAngle) * r);
        ctx.lineTo(x + Math.cos(innerAngle) * (r * 0.28), y + Math.sin(innerAngle) * (r * 0.28));
      }
      ctx.closePath();
      ctx.fill();
    };

    // Draw 5-pointed Classic Star
    const drawStar5 = (x: number, y: number, r: number) => {
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const outerAngle = ((18 + i * 72) * Math.PI) / 180;
        const innerAngle = ((54 + i * 72) * Math.PI) / 180;
        ctx.lineTo(x + Math.cos(outerAngle) * r, y - Math.sin(outerAngle) * r);
        ctx.lineTo(x + Math.cos(innerAngle) * (r * 0.45), y - Math.sin(innerAngle) * (r * 0.45));
      }
      ctx.closePath();
      ctx.fill();
    };

    // Draw Starlight Diamond
    const drawDiamond = (x: number, y: number, r: number) => {
      ctx.beginPath();
      ctx.moveTo(x, y - r * 1.2);
      ctx.lineTo(x + r * 0.6, y);
      ctx.lineTo(x, y + r * 1.2);
      ctx.lineTo(x - r * 0.6, y);
      ctx.closePath();
      ctx.fill();
    };

    // Draw Stardust Bubble / Disc
    const drawBubble = (x: number, y: number, r: number) => {
      ctx.beginPath();
      ctx.arc(x, y, r * 0.65, 0, Math.PI * 2);
      ctx.fill();
    };

    // Draw 8-pointed Supernova Glint
    const drawStar8 = (x: number, y: number, r: number) => {
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const outerAngle = (i * 45 * Math.PI) / 180;
        const innerAngle = ((i * 45 + 22.5) * Math.PI) / 180;
        const outerRadius = i % 2 === 0 ? r * 1.2 : r * 0.7;
        ctx.lineTo(x + Math.cos(outerAngle) * outerRadius, y + Math.sin(outerAngle) * outerRadius);
        ctx.lineTo(x + Math.cos(innerAngle) * (r * 0.22), y + Math.sin(innerAngle) * (r * 0.22));
      }
      ctx.closePath();
      ctx.fill();
    };

    // Draw Cute Micro-Heart Sparkle
    const drawHeart = (x: number, y: number, r: number) => {
      const s = r * 0.65;
      ctx.beginPath();
      ctx.moveTo(x, y - s * 0.3);
      ctx.bezierCurveTo(x - s, y - s * 1.1, x - s * 1.5, y + s * 0.2, x, y + s * 1.1);
      ctx.bezierCurveTo(x + s * 1.5, y + s * 0.2, x + s, y - s * 1.1, x, y - s * 0.3);
      ctx.closePath();
      ctx.fill();
    };

    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.alpha -= p.decay;
        p.size = p.initialSize * Math.max(0.2, p.alpha);

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.size * 1.6;

        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        switch (p.shape) {
          case 'star4':
            drawStar4(0, 0, p.size);
            break;
          case 'star5':
            drawStar5(0, 0, p.size);
            break;
          case 'star8':
            drawStar8(0, 0, p.size);
            break;
          case 'diamond':
            drawDiamond(0, 0, p.size);
            break;
          case 'bubble':
            drawBubble(0, 0, p.size);
            break;
          case 'heart':
            drawHeart(0, 0, p.size);
            break;
        }

        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('pointerdown', onPointerDown);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="global-sparkle-trail-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 99999,
      }}
      aria-hidden="true"
    />
  );
};

export default SparkleTrail;
