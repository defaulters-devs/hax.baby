import React, { useEffect, useState, useCallback } from 'react';
import { sound } from '../../utils/audio';
import './CuteSparkleElements.css';

interface SparkleParticle {
  id: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
  rot: number;
  glyph: string;
  color: string;
}

/**
 * Global Interactive Star Sparkle Burst
 * Spawns charming animated stars whenever the user clicks elements on the page.
 */
export const GlobalSparkleClickOverlay: React.FC = () => {
  const [particles, setParticles] = useState<SparkleParticle[]>([]);

  const handlePointerDown = useCallback((e: MouseEvent) => {
    // Only spawn if not on huge dragging actions
    const glyphs = ['⭐', '✨', '✦', '✧', '🌟', '💫', '⋆'];
    const colors = ['#F59E0B', '#38BDF8', '#EC4899', '#A855F7', '#FBBF24', '#FFFFFF'];

    const newParticles: SparkleParticle[] = [];
    const count = 5 + Math.floor(Math.random() * 3);

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const dist = 28 + Math.random() * 38;
      newParticles.push({
        id: `${Date.now()}_${i}_${Math.random()}`,
        x: e.clientX,
        y: e.clientY,
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist,
        rot: (Math.random() - 0.5) * 60,
        glyph: glyphs[Math.floor(Math.random() * glyphs.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    setParticles((prev) => [...prev.slice(-24), ...newParticles]);

    // Cleanup after animation completes
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.some((np) => np.id === p.id)));
    }, 900);
  }, []);

  useEffect(() => {
    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, [handlePointerDown]);

  return (
    <div aria-hidden="true" style={{ pointerEvents: 'none' }}>
      {particles.map((p) => (
        <span
          key={p.id}
          className="click-sparkle-burst-particle"
          style={
            {
              left: `${p.x}px`,
              top: `${p.y}px`,
              color: p.color,
              '--dx': `${p.dx}px`,
              '--dy': `${p.dy}px`,
              '--rot': `${p.rot}deg`,
            } as React.CSSProperties
          }
        >
          {p.glyph}
        </span>
      ))}
    </div>
  );
};

/**
 * Cute Floating Ambient Star Friends
 * Diverse types of cute stars positioned gently in the margins:
 * 1. Kiko: Chubby Smiling Gold Star (SVG)
 * 2. Lumi: 4-Point Celestial Diamond with orbital satellite
 * 3. Stella: Comet Shooting Star
 * 4. Nova: 8-Point Supernova Twinkle Star
 * 5. Trio: Pastel Stardust Trio
 */
export const CuteAmbientStars: React.FC = () => {
  const [clickedToast, setClickedToast] = useState<string | null>(null);

  const handleStarClick = (name: string, soundType: 'sparkle' | 'chime' | 'giggle') => {
    if (soundType === 'sparkle') sound.playSparkle();
    else if (soundType === 'chime') sound.playChime(920);
    else sound.playGiggle();

    setClickedToast(`${name} says: ⭐ Keep shining!`);
    setTimeout(() => setClickedToast(null), 2200);
  };

  return (
    <div className="cute-ambient-stars-container" aria-hidden="true">
      {/* SVG Definitions for Gradients */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="goldStarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="40%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>
      </svg>

      {/* STAR 1: Chubby Smiling Gold Star (Kiko) */}
      <div
        className="floating-star-friend star-friend-1"
        onClick={() => handleStarClick('Kiko the Chubby Star', 'sparkle')}
        title="Tap Kiko!"
      >
        <svg className="chubby-star-svg" viewBox="0 0 100 100">
          <path
            className="chubby-star-body"
            d="M 50,5 
               C 54,28 62,38 85,42 
               C 62,48 54,58 50,85 
               C 46,58 38,48 15,42 
               C 38,38 46,28 50,5 Z"
          />
          {/* Cute face */}
          <circle className="chubby-star-face" cx="42" cy="42" r="3.2" />
          <circle className="chubby-star-face" cx="58" cy="42" r="3.2" />
          <path
            className="chubby-star-face"
            d="M 44,48 Q 50,54 56,48"
            fill="none"
            stroke="#78350F"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Cute pink blushes */}
          <ellipse className="chubby-star-blush" cx="37" cy="47" rx="4" ry="2" />
          <ellipse className="chubby-star-blush" cx="63" cy="47" rx="4" ry="2" />
        </svg>
        <span className="star-friend-tooltip">⭐ Kiko (Tap me!)</span>
      </div>

      {/* STAR 2: 4-Point Orbital Diamond Sparkle (Lumi) */}
      <div
        className="floating-star-friend star-friend-2"
        onClick={() => handleStarClick('Lumi the Diamond', 'chime')}
        title="Tap Lumi!"
      >
        <div className="orbital-diamond-wrap">
          <span className="orbital-diamond-star">✦</span>
          <span className="orbital-mini-dot" />
        </div>
        <span className="star-friend-tooltip">✦ Lumi's Sparkle</span>
      </div>

      {/* STAR 3: Magical Shooting Comet Star (Stella) */}
      <div
        className="floating-star-friend star-friend-3"
        onClick={() => handleStarClick('Stella the Comet', 'sparkle')}
        title="Tap Stella!"
      >
        <div className="comet-star-badge">
          <span className="comet-star-icon">彡☆</span>
          <span className="comet-star-tail">Stella</span>
        </div>
        <span className="star-friend-tooltip">🌠 Catch the Wish!</span>
      </div>

      {/* STAR 4: 8-Point Supernova Twinkle (Nova) */}
      <div
        className="floating-star-friend star-friend-4"
        onClick={() => handleStarClick('Nova the Supernova', 'giggle')}
        title="Tap Nova!"
      >
        <div className="supernova-twinkle-wrap">
          <svg className="supernova-star-svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14 9L23 12L14 15L12 24L10 15L1 12L10 9L12 0Z" />
            <circle cx="12" cy="12" r="3" fill="#FFF" />
          </svg>
        </div>
        <span className="star-friend-tooltip">✨ Nova's Glint</span>
      </div>

      {/* STAR 5: Stardust Cluster (Trio) */}
      <div
        className="floating-star-friend star-friend-5"
        onClick={() => handleStarClick('The Star Trio', 'chime')}
        title="Tap Trio!"
      >
        <div className="stardust-cluster-box">
          <span className="cluster-dot-1">⋆</span>
          <span className="cluster-dot-2">✦</span>
          <span className="cluster-dot-3">✧</span>
        </div>
        <span className="star-friend-tooltip">🪄 Stardust Trio</span>
      </div>

      {/* STAR 6: Chunky Star with Crown */}
      <div
        className="floating-star-friend star-friend-6"
        onClick={() => handleStarClick('Astra the Star Prince', 'sparkle')}
        title="Tap Astra!"
      >
        <div className="comet-star-badge" style={{ borderColor: '#EC4899' }}>
          <span style={{ fontSize: '1.2rem' }}>👑⭐</span>
          <span className="comet-star-tail" style={{ color: '#BE185D' }}>Astra</span>
        </div>
        <span className="star-friend-tooltip">👑 Royal Star</span>
      </div>

      {/* Cute Toast on Star Interaction */}
      {clickedToast && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
            border: '2px solid #F59E0B',
            borderRadius: '9999px',
            padding: '0.45rem 1.25rem',
            fontFamily: 'var(--font-heading)',
            fontSize: '0.9rem',
            fontWeight: 800,
            color: '#B45309',
            boxShadow: '0 8px 24px rgba(245, 158, 11, 0.35)',
            zIndex: 100000,
            animation: 'fadeIn 0.25s ease',
            pointerEvents: 'none',
          }}
        >
          {clickedToast}
        </div>
      )}
    </div>
  );
};

/**
 * Section Sparkle Crown
 * Renders cute alternating star bookends and micro-twinkles above section titles.
 */
interface SectionSparkleCrownProps {
  label: string;
}

export const SectionSparkleCrown: React.FC<SectionSparkleCrownProps> = ({ label }) => {
  return (
    <div className="cute-section-sparkle-crown">
      <span className="crown-sparkle-item gold">✦</span>
      <span className="crown-sparkle-item blue">✧</span>
      <span className="crown-label-text">{label}</span>
      <span className="crown-sparkle-item pink">⭐</span>
      <span className="crown-sparkle-item purple">⋆</span>
    </div>
  );
};

/**
 * Card Cute Star Pin
 * Cute badge pinned onto top right of cards.
 */
interface CardCuteStarPinProps {
  text?: string;
  glyph?: string;
}

export const CardCuteStarPin: React.FC<CardCuteStarPinProps> = ({
  text = 'Certified Cute',
  glyph = '✦',
}) => {
  return (
    <div className="card-cute-star-pin" title="Star certified!">
      <span className="pin-star-icon">{glyph}</span>
      <span>{text}</span>
    </div>
  );
};
