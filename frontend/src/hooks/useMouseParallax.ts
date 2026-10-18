import { useState, useEffect, type RefObject } from 'react';

interface ParallaxCoordinates {
  x: number; // -1 to 1 normalized
  y: number; // -1 to 1 normalized
  tiltX: number; // degrees
  tiltY: number; // degrees
  eyeShiftX: number; // px shift
  eyeShiftY: number; // px shift
}

export function useMouseParallax(ref: RefObject<HTMLElement | null>): ParallaxCoordinates {
  const [coords, setCoords] = useState<ParallaxCoordinates>({
    x: 0,
    y: 0,
    tiltX: 0,
    tiltY: 0,
    eyeShiftX: 0,
    eyeShiftY: 0,
  });

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) {
        // Fallback to viewport center
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        targetX = (e.clientX - centerX) / (window.innerWidth / 2);
        targetY = (e.clientY - centerY) / (window.innerHeight / 2);
      } else {
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        targetX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (window.innerWidth / 2)));
        targetY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (window.innerHeight / 2)));
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        targetX = (touch.clientX - centerX) / (window.innerWidth / 2) * 0.5;
        targetY = (touch.clientY - centerY) / (window.innerHeight / 2) * 0.5;
      }
    };

    // Smooth lerp loop
    const tick = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      setCoords({
        x: currentX,
        y: currentY,
        tiltX: -currentY * 7, // Max 7 deg tilt
        tiltY: currentX * 7,
        eyeShiftX: currentX * 6, // 6px subtle eye/star follower shift
        eyeShiftY: currentY * 5,
      });

      animationFrameId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    animationFrameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [ref]);

  return coords;
}
