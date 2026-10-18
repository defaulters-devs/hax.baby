import React, { useState, useEffect, useCallback } from 'react';
import { Sparkles, ArrowRight, X } from 'lucide-react';
import { sound } from '../../utils/audio';
import { fireStarConfetti } from '../../utils/confetti';
import './CelestialOpeningAnimation.css';

interface CelestialOpeningAnimationProps {
  onComplete: () => void;
}

export const CelestialOpeningAnimation: React.FC<CelestialOpeningAnimationProps> = ({ onComplete }) => {
  // Stage 0: Sleepy Maybe Cloud (0 - 1.4s)
  // Stage 1: Sparky swoops in (1.4s - 2.8s)
  // Stage 2: Morro Baby hatches & greets (2.8s+)
  const [stage, setStage] = useState<0 | 1 | 2>(0);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [tapHearts, setTapHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  // Smooth exit handler
  const handleFinish = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
    sound.playChime(880);
    setTimeout(() => {
      onComplete();
    }, 600);
  }, [isExiting, onComplete]);

  // Stage sequence timer
  useEffect(() => {
    // Initial gentle intro chime
    sound.playChime(520);

    // Stage 1: Sparky swoops in at 1.3s
    const timer1 = setTimeout(() => {
      setStage(1);
      sound.playChime(740);
    }, 1300);

    // Stage 2: Hatch! Morro bursts in at 2.7s
    const timer2 = setTimeout(() => {
      setStage(2);
      sound.playPop();
      sound.playSparkle();
      setTimeout(() => sound.playGiggle(), 300);
      fireStarConfetti();
    }, 2700);

    // Keyboard shortcut to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        handleFinish();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleFinish]);

  // Interactive tap on Morro to giggle & burst hearts
  const handleMorroTap = (e: React.MouseEvent) => {
    sound.playGiggle();
    setTimeout(() => sound.playSparkle(), 80);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newHeart = { id: Date.now() + Math.random(), x, y };
    setTapHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setTapHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1200);
  };

  return (
    <div 
      className={`celestial-intro-overlay ${isExiting ? 'intro-exiting' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Project Morro"
    >
      {/* Background Starlight Constellation Glints */}
      <div className="intro-constellation-bg" aria-hidden="true">
        <span className="intro-bg-star" style={{ top: '15%', left: '12%', fontSize: '1.2rem', animationDelay: '0.2s' }}>★</span>
        <span className="intro-bg-star" style={{ top: '25%', right: '15%', fontSize: '1.6rem', animationDelay: '1.2s', color: '#38BDF8' }}>✦</span>
        <span className="intro-bg-star" style={{ bottom: '20%', left: '18%', fontSize: '1.4rem', animationDelay: '0.7s', color: '#EC4899' }}>✧</span>
        <span className="intro-bg-star" style={{ bottom: '30%', right: '22%', fontSize: '1.8rem', animationDelay: '1.8s' }}>⭐</span>
        <span className="intro-bg-star" style={{ top: '65%', left: '8%', fontSize: '1.1rem', animationDelay: '2.1s', color: '#A855F7' }}>⋆</span>
        <span className="intro-bg-star" style={{ top: '10%', right: '35%', fontSize: '1.3rem', animationDelay: '0.9s' }}>✨</span>
      </div>

      {/* Top Bar with Skip Intro Button */}
      <div className="intro-top-bar">
        <button
          type="button"
          className="intro-skip-btn"
          onClick={handleFinish}
          title="Skip intro and enter website"
          aria-label="Skip introduction animation"
        >
          <span>Skip Intro ✦</span>
          <X size={15} />
        </button>
      </div>

      {/* Central Animated Cinematic Stage */}
      <div className="intro-stage-container">
        <div className="intro-celestial-aura" />

        {/* ACT 1: Sleepy "Maybe" Cloud */}
        {stage < 2 && (
          <div className="intro-maybe-cloud-wrap" onClick={() => setStage(2)}>
            <div className="intro-sleepy-cloud-icon">☁️</div>
            <div className="intro-cloud-thought-pill">
              <span>💭 "maybe tomorrow..."</span>
            </div>

            {/* ACT 2: Sparky swoops in to awaken the cloud */}
            {stage === 1 && (
              <div className="intro-sparky-swoop">
                <div className="intro-sparky-ball">
                  <span className="intro-sparky-wing left" />
                  <div className="intro-sparky-face">
                    <span className="intro-sparky-eye" />
                    <span className="intro-sparky-smile" />
                    <span className="intro-sparky-eye" />
                  </div>
                  <span className="intro-sparky-wing right" />
                </div>
                <div className="intro-sparky-chirp-bubble">
                  <span>Chirp! Found one! ✨</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ACT 3: Morro Baby Hatches & Waving Hello */}
        {stage === 2 && (
          <div className="intro-morro-emerge-wrap">
            <div style={{ position: 'relative' }}>
              <img
                src="/assets/morro/morro-hero.png"
                alt="Morro the Little Star Prince waving cheerful starlight greetings"
                className="intro-morro-img"
                onClick={handleMorroTap}
                title="Tap Morro! 🐾 (Click for baby purr & giggle)"
              />

              {/* Floating Hearts when Tapped */}
              {tapHearts.map((h) => (
                <span
                  key={h.id}
                  className="intro-tap-heart"
                  style={{ left: `${h.x}px`, top: `${h.y}px` }}
                >
                  💖
                </span>
              ))}
            </div>

            {/* Whimsical Welcoming Speech Card */}
            <div className="intro-morro-speech">
              <h2 className="intro-speech-title">
                ✨ Hello Friend! I'm Morro! 🐾
              </h2>
              <p className="intro-speech-body">
                Whenever you feel like putting off a task, I catch your "Maybe" and turn it into starlight. Let's finish your dreams today! ⭐
              </p>
            </div>
          </div>
        )}

        {/* Bottom Enter Button & Step Progress */}
        <div className="intro-bottom-action-col">
          {stage === 2 ? (
            <button
              type="button"
              className="intro-enter-btn"
              onClick={handleFinish}
              autoFocus
            >
              <span>Enter Morro's World</span>
              <Sparkles size={18} fill="#FDE68A" />
              <ArrowRight size={18} />
            </button>
          ) : (
            <span className="intro-hint-subtext">
              {stage === 0 ? "Drifting in deep space..." : "Sparky found a task signal! ✨"}
            </span>
          )}

          {/* Progress Dots */}
          <div className="intro-dots-row">
            <span className={`intro-dot ${stage === 0 ? 'active' : ''}`} />
            <span className={`intro-dot ${stage === 1 ? 'active' : ''}`} />
            <span className={`intro-dot ${stage === 2 ? 'active' : ''}`} />
          </div>
        </div>
      </div>
    </div>
  );
};
