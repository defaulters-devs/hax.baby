import React, { useEffect, useState } from 'react';
import type { ThemeMode } from '../../types';

interface NightlightCursorProps {
  theme: ThemeMode;
}

export const NightlightCursor: React.FC<NightlightCursorProps> = ({ theme }) => {
  const [pos, setPos] = useState({ x: -500, y: -500 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (theme !== 'night') return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [theme, visible]);

  if (theme !== 'night' || !visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 5,
        background: `radial-gradient(circle 260px at ${pos.x}px ${pos.y}px, rgba(56, 189, 248, 0.12) 0%, rgba(245, 158, 11, 0.05) 50%, transparent 100%)`,
        transition: 'opacity 0.2s ease',
      }}
      aria-hidden="true"
    />
  );
};
