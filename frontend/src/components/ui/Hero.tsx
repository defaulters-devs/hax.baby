import React, { useRef, useState, useCallback } from 'react';
import { ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { useMouseParallax } from '../../hooks/useMouseParallax';
import { sound } from '../../utils/audio';
import { fireStarConfetti } from '../../utils/confetti';
import type { ThemeMode } from '../../types';
import './Hero.css';

interface HeroProps {
  theme?: ThemeMode;
  onOpenEasterEgg: () => void;
}

interface FloatingPetSpark {
  id: number;
  x: number;
  y: number;
  symbol: string;
}

export const Hero: React.FC<HeroProps> = ({ theme = 'day', onOpenEasterEgg }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sparkCounterRef = useRef<number>(0);
  const parallax = useMouseParallax(containerRef);
  const [sparkyClicks, setSparkyClicks] = useState(0);
  const [morroSpeechIndex, setMorroSpeechIndex] = useState(0);
  const [petSparks, setPetSparks] = useState<FloatingPetSpark[]>([]);
  const [activeTask, setActiveTask] = useState<string | null>(null);
  const [transformedFeedback, setTransformedFeedback] = useState<string | null>(null);

  const morroGreetings = [
    { main: "Heyy, I'm Morro!", sub: "Your baby companion! 🐾✨" },
    { main: "Got a Maybe today?", sub: "I'll catch it in my magical pouch! 🎒⭐" },
    { main: "One tiny step counts!", sub: "No guilt, just starlight momentum! 🌟" },
    { main: "Purrrr! 🦊💖", sub: "Sparky and I believe in you so much!" },
    { main: "Turn Maybe into Done!", sub: "Let's make magic together today! 🚀🌈" },
  ];

  const triggerSparkAtClick = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    const x = rect ? e.clientX - rect.left : e.clientX;
    const y = rect ? e.clientY - rect.top : e.clientY;
    const symbols = ['💖', '✨', '⭐', '🐾', '🌟', '💫', '🎉'];
    sparkCounterRef.current += 1;
    const currentId = sparkCounterRef.current;
    const symbol = symbols[currentId % symbols.length];
    const newSpark: FloatingPetSpark = {
      id: currentId,
      x,
      y,
      symbol,
    };
    setPetSparks((prev) => [...prev, newSpark]);
    setTimeout(() => {
      setPetSparks((prev) => prev.filter((s) => s.id !== currentId));
    }, 1200);
  }, []);

  const handleMorroSpeechClick = (e?: React.MouseEvent) => {
    sound.playGiggle();
    setTimeout(() => sound.playSparkle(), 80);
    setMorroSpeechIndex((prev) => (prev + 1) % morroGreetings.length);

    if (e) {
      triggerSparkAtClick(e);
    }
  };

  const handleMorroPet = (e: React.MouseEvent) => {
    sound.playPurr();
    setTimeout(() => sound.playGiggle(), 120);
    setMorroSpeechIndex((prev) => (prev + 1) % morroGreetings.length);
    triggerSparkAtClick(e);
  };

  // Character remembers visitor: LocalStorage returning-visit memory (Tier 3)
  const [visitCount] = useState<number>(() => {
    if (typeof window === 'undefined') return 1;
    try {
      const stored = localStorage.getItem('morro_visit_count');
      const count = stored ? parseInt(stored, 10) + 1 : 1;
      localStorage.setItem('morro_visit_count', String(count));
      return count;
    } catch {
      return 1;
    }
  });

  const handleQuickCatch = (task: string, e: React.MouseEvent) => {
    sound.playCatch();
    setTimeout(() => sound.playSparkle(), 110);
    setTimeout(() => sound.playGiggle(), 250);
    fireStarConfetti();
    triggerSparkAtClick(e);
    setActiveTask(task);
    setTransformedFeedback(`🎒 Morro caught your "${task}" task! Turned your 'Maybe' into positive momentum! ⭐`);
  };

  const handleMaybePillClick = (e: React.MouseEvent) => {
    sound.playPop();
    triggerSparkAtClick(e);
    setTransformedFeedback(`☁️ Negative "Maybe" caught! Morro is transmuting it into positive encouragement! 🌟`);
  };

  const handleMagicPillClick = (e: React.MouseEvent) => {
    sound.playSparkle();
    sound.playChime(880);
    fireStarConfetti();
    triggerSparkAtClick(e);
    setTransformedFeedback(`🌟 Magic activated! 100% positive reminder sent to brighten your day! ✨`);
  };

  const handleSparkyClick = (e: React.MouseEvent) => {
    sound.playRattle();
    setTimeout(() => sound.playGiggle(), 80);
    triggerSparkAtClick(e);
    const newCount = sparkyClicks + 1;
    setSparkyClicks(newCount);

    if (newCount >= 3) {
      sound.playSparkle();
      onOpenEasterEgg();
      setSparkyClicks(0);
    }
  };

  const handleCatchClick = () => {
    sound.playCatch();
    const ritual = document.querySelector('#ritual');
    if (ritual) {
      const navOffset = 84;
      const topPos = ritual.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top: Math.max(0, topPos), behavior: 'smooth' });
    }
  };

  const handleMeetClick = () => {
    sound.playChime(660);
    const about = document.querySelector('#about');
    if (about) {
      const navOffset = 84;
      const topPos = about.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top: Math.max(0, topPos), behavior: 'smooth' });
    }
  };

  const handleOriginClick = () => {
    sound.playChime(750);
    const story = document.querySelector('#story');
    if (story) {
      const navOffset = 84;
      const topPos = story.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top: Math.max(0, topPos), behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero-section" ref={containerRef}>
      {/* Decorative Floating Background Clouds / Nebulae */}
      <div className="hero-cloud-puff hero-cloud-puff-1" aria-hidden="true" />
      <div className="hero-cloud-puff hero-cloud-puff-2" aria-hidden="true" />

      {/* Floating Pet Sparks / Hearts on Click */}
      {petSparks.map((spark) => (
        <span
          key={spark.id}
          className="hero-floating-pet-spark"
          style={{ left: `${spark.x}px`, top: `${spark.y}px` }}
          aria-hidden="true"
        >
          {spark.symbol}
        </span>
      ))}

      <div className="container hero-container">
        {/* Left Column: Clean, Cute & Deeply Interactive Storybook Showcase */}
        <div className="hero-content-col">
          {/* Unified Adorable Identity Ribbon (Cleaned from fragmented badges) */}
          <div className="hero-identity-ribbon">
            <div className="hero-mascot-pill">
              <span className="mascot-crown-icon">👑</span>
              <span className="mascot-name-label">MORRO</span>
              <span className="mascot-sub-label">The Little Star Prince</span>
              <span className="mascot-sparkle-star">✦</span>
            </div>

            <div className="hero-status-pill">
              <span className="pulse-green-dot" />
              <span>{visitCount > 1 ? `Welcome Back (Visit #${visitCount}) 🐾` : 'Online Companion 🐾'}</span>
            </div>
          </div>

          {/* Bold, Gorgeous Headline with Interactive Words */}
          <div className="hero-headline-wrap">
            <h1 className="hero-headline">
              Turn{' '}
              <span 
                className="highlight-maybe interactive-headline-pill"
                onClick={handleMaybePillClick}
                title="Tap to pop the Maybe cloud! ☁️"
              >
                Maybe
              </span>{' '}
              Into{' '}
              <span 
                className="highlight-done interactive-headline-pill"
                onClick={handleMagicPillClick}
                title="Tap for starlight magic! ✨"
              >
                Done
              </span>.
            </h1>
            <span className="hero-headline-sparkle" aria-hidden="true">✦</span>
          </div>

          {/* Slogan Pill Ribbon */}
          <div className="hero-original-tagline-ribbon">
            <span className="tagline-star">✦</span>
            <span className="tagline-text">"Make the Work, Done Today"</span>
            <span className="tagline-star">✦</span>
          </div>

          {/* Clean, Cute & Highly Interactive Companion Card */}
          <div className="hero-story-card">
            <div className="story-card-top-tag">
              <span className="story-card-tag-emoji">🎒</span>
              <span className="story-card-tag-text">MORRO'S COMPANION MISSION</span>
              <span className="story-card-interactive-cue">tap highlighted words! 🐾</span>
            </div>

            {/* Verbatim Exact Character Info Text with Playful Interactive Keyword Sparks */}
            <p className="hero-description">
              <button
                type="button"
                className="interactive-text-pill morro-pill"
                onClick={(e) => {
                  handleMorroPet(e);
                  setTransformedFeedback("🐾 You petted Morro Baby! He purrs softly and believes in you! 💕");
                }}
                title="Click to pet Morro! 🐾"
              >
                <span className="pill-pulse-dot" />
                Morro Baby
              </button>{' '}
              is a helpful companion that stops us from delaying our work. Whenever a user leaves a task for tomorrow, they create a negative signal called{' '}
              <button
                type="button"
                className="interactive-text-pill maybe-pill"
                onClick={handleMaybePillClick}
                title="Click to catch the 'maybe' cloud! ☁️"
              >
                'maybe' ☁️
              </button>
              . Morro Baby catches this signal and turns it into a{' '}
              <button
                type="button"
                className="interactive-text-pill magic-pill"
                onClick={handleMagicPillClick}
                title="Click for positive starlight sparkle! ✨"
              >
                positive reminder ✨
              </button>
              , encouraging the user to finish their work.
            </p>

            {/* Interactive "Instant Maybe Transformer" Sandbox */}
            <div className="hero-quick-catch-dock">
              <div className="quick-catch-header">
                <span className="quick-catch-label">
                  <Sparkles size={13} className="text-gold" /> Delaying a task right now? Tap to let Morro catch it:
                </span>
              </div>
              <div className="quick-catch-chips-row">
                {[
                  { label: 'Studying', emoji: '📚' },
                  { label: 'Coding', emoji: '💻' },
                  { label: 'Chores', emoji: '🧹' },
                  { label: 'Workout', emoji: '🏃' },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    className={`quick-catch-chip ${activeTask === item.label ? 'active' : ''}`}
                    onClick={(e) => handleQuickCatch(item.label, e)}
                    title={`Let Morro catch your "${item.label}" task`}
                  >
                    <span className="chip-emoji">{item.emoji}</span>
                    <span className="chip-name">{item.label}</span>
                    <span className="chip-badge">Catch 🎒</span>
                  </button>
                ))}
              </div>

              {transformedFeedback && (
                <div className="quick-catch-success-banner" role="status">
                  <span className="success-icon">✨</span>
                  <span className="success-text">{transformedFeedback}</span>
                  <button 
                    type="button" 
                    className="success-close-btn"
                    onClick={() => setTransformedFeedback(null)}
                    aria-label="Close message"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="hero-cta-group">
            <button 
              type="button" 
              className="hero-primary-btn"
              onClick={handleCatchClick}
              aria-label="Catch Your Maybe with Morro"
            >
              <span className="btn-icon-bounce">🎒</span>
              <span>Catch Your Maybe</span>
              <ArrowRight size={18} className="btn-arrow" />
            </button>

            <button 
              type="button" 
              className="hero-secondary-btn"
              onClick={handleMeetClick}
              aria-label="Read About Morro"
            >
              <span className="btn-icon-paw">🐾</span>
              <span>About Morro</span>
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Character Canvas */}
        <div className="hero-visual-col">
          <div className="hero-character-stage">
            {/* Celestial Aura Backdrop */}
            <div className="celestial-halo" />
            <div className="celestial-stardust-ring" />

            {/* Floating Speech Bubble for Morro ("Heyy, I'm Morro!") */}
            <div 
              className="morro-speech-bubble-wrapper"
              onClick={handleMorroSpeechClick}
              role="button"
              tabIndex={0}
              title="Click to hear Morro speak! 🐾"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleMorroSpeechClick();
                }
              }}
              style={{
                transform: `translate(${-parallax.eyeShiftX * 1.3}px, ${-parallax.eyeShiftY * 1.3}px)`,
              }}
            >
              <div className="morro-speech-card">
                <div className="morro-speech-header">
                  <span className="morro-speech-badge">
                    <Sparkles size={11} fill="#F59E0B" /> BABY COMPANION
                  </span>
                  <span className="speech-click-hint">tap me! 🐾</span>
                </div>
                <div className="morro-speech-body">
                  <span className="speech-wave-icon">👋</span>
                  <strong className="speech-main-phrase">{morroGreetings[morroSpeechIndex].main}</strong>
                </div>
                <p className="morro-speech-subtext">
                  {morroGreetings[morroSpeechIndex].sub}
                </p>
                {/* Speech Bubble Arrow pointing towards Morro's face */}
                <span className="morro-speech-arrow" aria-hidden="true" />
              </div>
            </div>

            {/* Floating Spirit Companion (Sparky) — Tap 3 times for Easter Egg! */}
            <div 
              className="spirit-companion-wrapper"
              onClick={handleSparkyClick}
              title="Click Sparky the Spirit Companion! (What happens if you tap 3 times?)"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSparkyClick(e as unknown as React.MouseEvent);
                }
              }}
              style={{
                transform: `translate(${parallax.eyeShiftX * 1.5}px, ${parallax.eyeShiftY * 1.5}px)`,
              }}
            >
              <div className="sparky-bubble">
                <span className="sparky-wing left" />
                <div className="sparky-face">
                  {theme === 'night' ? (
                    <>
                      <span className="sparky-eye sleepy">˘</span>
                      <span className="sparky-smile">‿</span>
                      <span className="sparky-eye sleepy">˘</span>
                    </>
                  ) : (
                    <>
                      <span className="sparky-eye" />
                      <span className="sparky-smile" />
                      <span className="sparky-eye" />
                    </>
                  )}
                </div>
                <span className="sparky-wing right" />
              </div>
              <div className="sparky-hint-bubble">
                {theme === 'night' ? (
                  sparkyClicks === 0 ? "Stargazing mode... 🌙" :
                  sparkyClicks === 1 ? "Sleepy chirp! 🐾" : "Unlocking secrets... 🗝️"
                ) : (
                  sparkyClicks === 0 ? "Hi! I'm Sparky! ✨" :
                  sparkyClicks === 1 ? "Chirp! 🐾" : "Almost unlocked... 🗝️"
                )}
              </div>
            </div>

            {/* Main Morro Character Artwork with 3D Tilt */}
            <div 
              className="hero-character-frame"
              style={{
                transform: `perspective(1000px) rotateX(${parallax.tiltX}deg) rotateY(${parallax.tiltY}deg)`,
                transition: 'transform 0.1s ease-out',
              }}
            >
              <img
                src="/assets/morro/morro-hero.png"
                alt="Morro the Little Star Prince waving cheerfully with his fluffy white and blue fur, golden horns, and sapphire eyes"
                className="hero-morro-img"
                width="540"
                height="570"
                loading="eager"
                onClick={handleMorroPet}
                title="Pet Morro! 🐾 (Click for baby purr & giggle sound effects)"
              />

              {/* Action Buttons under Morro */}
              <div className="morro-bottom-actions-row">
                <div 
                  className="pet-morro-cue-pill" 
                  onClick={handleMorroPet}
                  title="Pet Morro! 🐾 (Click for baby purr & giggle sound effects)"
                >
                  <span>🐾 Tap to Pet Morro! 💕</span>
                </div>

                <a
                  href="#story"
                  className="how-morro-born-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    handleOriginClick();
                  }}
                  title="Discover the origin story of how Morro was born"
                >
                  <BookOpen size={13} />
                  <span>How Morro Born</span>
                  <Sparkles size={12} className="btn-star-sparkle" />
                </a>
              </div>

              {/* Diverse Types of Cute Floating Stars & Sparkles */}
              <div 
                className="floating-star star-1" 
                style={{ transform: `translate(${parallax.eyeShiftX * 2}px, ${parallax.eyeShiftY * 2}px)` }}
                title="5-point gold star"
              >
                ★
              </div>
              <div 
                className="floating-star star-2" 
                style={{ transform: `translate(${-parallax.eyeShiftX * 2.5}px, ${-parallax.eyeShiftY * 2}px)` }}
                title="4-point celestial sparkle"
              >
                ✦
              </div>
              <div 
                className="floating-star star-3" 
                style={{ transform: `translate(${parallax.eyeShiftX * 1.2}px, ${parallax.eyeShiftY * 1.8}px)` }}
                title="Diamond star glint"
              >
                ✧
              </div>
              <div 
                className="floating-star star-4" 
                style={{ transform: `translate(${-parallax.eyeShiftX * 1.5}px, ${parallax.eyeShiftY * 1.5}px)` }}
                title="Chubby starlight star"
              >
                ⭐
              </div>
              <div 
                className="floating-star star-5" 
                style={{ transform: `translate(${parallax.eyeShiftX * 2.2}px, ${-parallax.eyeShiftY * 1.2}px)` }}
                title="Swirling orbital star"
              >
                💫
              </div>
              <div 
                className="floating-star star-6" 
                style={{ transform: `translate(${-parallax.eyeShiftX * 1.8}px, ${parallax.eyeShiftY * 2.2}px)` }}
                title="Magic sparkle cluster"
              >
                ✨
              </div>
              <div 
                className="floating-star star-7" 
                style={{ transform: `translate(${parallax.eyeShiftX * 1.1}px, ${parallax.eyeShiftY * 0.9}px)` }}
                title="Micro constellation star"
              >
                ⋆
              </div>
            </div>

            <div className="character-ground-shadow" />
          </div>
        </div>
      </div>
    </section>
  );
};
