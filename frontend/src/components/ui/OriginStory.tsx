import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Play, 
  Pause, 
  RotateCcw, 
  Tv, 
  Scroll, 
  MousePointer, 
  Sparkle,
  ArrowRight
} from 'lucide-react';
import { sound } from '../../utils/audio';
import { SectionSparkleCrown, CardCuteStarPin } from './CuteSparkleElements';
import './OriginStory.css';

interface StoryScene {
  id: number;
  phase: string;
  numberStr: string;
  title: string;
  subtitle: string;
  narrative: string;
  quote?: string;
  icon: string;
  accentColor: string;
  visualType: 'clock' | 'storm' | 'birth' | 'purpose';
}

const SCENE_DURATION_MS = 5500;
const TICK_INTERVAL_MS = 50;

const SCENES: StoryScene[] = [
  {
    id: 1,
    phase: "Milestone 01",
    numberStr: "01",
    title: "Tomorrow, tomorrow...",
    subtitle: "People Putting Tasks Off",
    narrative: "Long ago, people across the world became very lazy and kept delaying their work for tomorrow.",
    quote: "People everywhere got used to saying \"I'll do it tomorrow.\"",
    icon: "🛋️",
    accentColor: "#94A3B8",
    visualType: 'clock',
  },
  {
    id: 2,
    phase: "Milestone 02",
    numberStr: "02",
    title: "Maybe is released",
    subtitle: "Negative Energy in the Air",
    narrative: "Every time someone put off a task, a negative energy called 'maybe' was released into the air.",
    quote: "Every delayed task let out a gloomy puff called Maybe.",
    icon: "☁️",
    accentColor: "#8B5CF6",
    visualType: 'storm',
  },
  {
    id: 3,
    phase: "Milestone 03",
    numberStr: "03",
    title: "Maybes gather in space",
    subtitle: "Collecting at a Single Point in Space",
    narrative: "This energy floated out into space, drifting across galaxies, and slowly collected at one single point.",
    quote: "They floated up and slowly collected at one single point.",
    icon: "🌌",
    accentColor: "#38BDF8",
    visualType: 'storm',
  },
  {
    id: 4,
    phase: "Milestone 04",
    numberStr: "04",
    title: "Morro is born!",
    subtitle: "The Little Star Prince Awakens",
    narrative: "The energy converged, sparkled with celestial warmth, and gave birth to Morro Baby, The Little Star Prince.",
    quote: "The energy converged, sparkled, and a little star prince opened his eyes.",
    icon: "👑",
    accentColor: "#F59E0B",
    visualType: 'birth',
  },
  {
    id: 5,
    phase: "Milestone 05",
    numberStr: "05",
    title: "One task, one step, one star",
    subtitle: "Inspiring People Today",
    narrative: "Today, with Sparky beside him, Morro catches that same 'maybe' energy, turns it into a positive reminder, and inspires people to get their work done.",
    quote: "With Sparky beside him, Morro turns every Maybe into a positive reminder and inspires you to finish your work.",
    icon: "⭐",
    accentColor: "#EAB308",
    visualType: 'purpose',
  },
];

export const OriginStory: React.FC = () => {
  const scenes = SCENES;
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [activeCosmicIndex, setActiveCosmicIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0); // 0 to 100%
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [viewMode, setViewMode] = useState<'timeline' | 'stage' | 'scroll'>('timeline');

  const sectionRef = useRef<HTMLElement | null>(null);
  const lastWheelTime = useRef<number>(0);
  const touchStartX = useRef<number | null>(null);

  const currentScene = scenes[activeSceneIndex];

  // Auto-play timer advances smoothly when section is visible and not hovered
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isPlaying || isHovered || !isInView || viewMode !== 'stage') return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (TICK_INTERVAL_MS / SCENE_DURATION_MS) * 100;
        if (next >= 100) {
          setActiveSceneIndex((idx) => {
            const nextIdx = (idx + 1) % SCENES.length;
            sound.playChime(520 + nextIdx * 75);
            return nextIdx;
          });
          return 0;
        }
        return next;
      });
    }, TICK_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, isInView, viewMode]);

  const handleNext = useCallback(() => {
    sound.playChime(620);
    setProgress(0);
    setActiveSceneIndex((prev) => (prev + 1) % SCENES.length);
  }, []);

  const handlePrev = useCallback(() => {
    sound.playChime(500);
    setProgress(0);
    setActiveSceneIndex((prev) => (prev - 1 + SCENES.length) % SCENES.length);
  }, []);

  const handleSelectScene = (index: number) => {
    sound.playSparkle();
    setProgress(0);
    setActiveSceneIndex(index);
  };

  const handleSelectCosmicStep = (index: number) => {
    sound.playChime(520 + index * 90);
    setActiveCosmicIndex(index);
    setActiveSceneIndex(index);
  };

  const handleTogglePlay = useCallback(() => {
    sound.playPop();
    setIsPlaying((prev) => !prev);
  }, []);

  const handleRestart = () => {
    sound.playSparkle();
    setProgress(0);
    setActiveSceneIndex(0);
    setIsPlaying(true);
  };

  // Mouse wheel scroll to advance or go back without clicking
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaY) < 25) return;
    const now = Date.now();
    if (now - lastWheelTime.current < 650) return;
    lastWheelTime.current = now;

    if (e.deltaY > 0) {
      handleNext();
    } else {
      handlePrev();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === ' ') {
        if (isInView && viewMode === 'stage') {
          e.preventDefault();
          handleTogglePlay();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isInView, viewMode, handleNext, handlePrev, handleTogglePlay]);

  // Touch Swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  // Shared visual scene renderer
  const renderVisual = (scene: StoryScene) => {
    switch (scene.visualType) {
      case 'clock':
        return (
          <div className="scene-visual scene-clock">
            <div className="dusty-clock-circle">
              <span className="clock-hand hour" />
              <span className="clock-hand minute" />
              <span className="clock-center-pin" />
            </div>
            <div className="floating-maybe-particle p1">☁️ Maybe...</div>
            <div className="floating-maybe-particle p2">☁️ Later...</div>
            <div className="floating-maybe-particle p3">☁️ Tomorrow...</div>
          </div>
        );
      case 'storm':
        return (
          <div className="scene-visual scene-storm">
            <div className="cosmic-vortex" />
            <div className="vortex-particle vp1" />
            <div className="vortex-particle vp2" />
            <div className="vortex-particle vp3" />
            <div className="storm-center-glow">🌌</div>
          </div>
        );
      case 'birth':
        return (
          <div className="scene-visual scene-birth">
            <div className="burst-halo" />
            <img
              src="/assets/morro/morro-adventure.png"
              alt="Morro bursting into life with golden horns and outstretched paws"
              className="morro-birth-img"
              width="320"
              height="320"
              loading="lazy"
            />
            <div className="sparkle-orb o1">✨</div>
            <div className="sparkle-orb o2">⭐</div>
          </div>
        );
      case 'purpose':
        return (
          <div className="scene-visual scene-purpose">
            <div className="pouch-absorb-stage">
              <div className="golden-pouch">
                <span className="pouch-seal">🎒</span>
                <span className="pouch-glow" />
              </div>
              <div className="caught-stream">
                <span className="stream-particle s1">☁️</span>
                <span className="stream-particle s2">⚡</span>
                <span className="stream-particle s3">⭐</span>
              </div>
            </div>
            <div className="momentum-badge-pill">
              "Make the Work, Done Today"
            </div>
          </div>
        );
    }
  };

  const handleMeetRitual = () => {
    sound.playCatch();
    const ritual = document.querySelector('#ritual');
    if (ritual) {
      const navOffset = 84;
      const topPos = ritual.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top: Math.max(0, topPos), behavior: 'smooth' });
    }
  };

  return (
    <section id="story" className="origin-story-section" ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <SectionSparkleCrown label="Celestial Chronicles ✦ Origin" />
          <div className="celestial-badge gold-badge">
            <Sparkles size={14} fill="#F59E0B" /> Origin of Morro Baby
          </div>
          <h2 className="origin-story-main-title">The Origin of Morro Baby</h2>
          <p className="origin-story-subtitle">
            From drifting clouds of hesitation to a joyful celestial guardian—discover how Morro was awakened.
          </p>
        </div>
          
        {/* Beautiful Storybook Chronicle Proclamation Card */}
        <div className="origin-storybook-chronicle-card">
          <div className="chronicle-washi-tape">
            <span>✦ THE CANONICAL LEGEND • CHAPTER I ✦</span>
          </div>
          
          <div className="chronicle-inner-content">
            <span className="chronicle-quote-mark open" aria-hidden="true">“</span>
            <div className="chronicle-text-body">
              <p className="chronicle-paragraph lead">
                Long ago, people across the world became weary and kept delaying their work for tomorrow. Every time someone put off a task, a drifting signal of hesitation called <span className="lore-keyword-maybe">‘maybe’</span> was released into the sky.
              </p>
              <p className="chronicle-paragraph resolution">
                This energy floated out into space, gathered together at a single cosmic point, and gave birth to <strong className="lore-keyword-morro">Morro Baby 👑</strong>. Today, Morro Baby catches that same ‘maybe’ energy, turns it into a positive reminder, and inspires people to get their work done.
              </p>
            </div>
            <span className="chronicle-quote-mark close" aria-hidden="true">”</span>
          </div>

          <div className="chronicle-card-footer">
            <div className="chronicle-pill-row">
              <span className="chronicle-pill pill-space">🌌 Space Born</span>
              <span className="chronicle-pill pill-transmuter">🎒 Postponement Transmuter</span>
              <span className="chronicle-pill pill-done">✨ Turn Maybe Into Done</span>
            </div>
            <span className="chronicle-seal-tag">📜 Official Track 2 Storybook Chronicle</span>
          </div>
        </div>

        {/* View Mode Switcher: Cosmic Timeline vs Cinematic Auto-Stage vs Continuous Scroll */}
        <div className="story-view-mode-bar-wrapper">
          <div className="story-view-mode-bar" role="tablist" aria-label="Origin story display mode">
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'timeline'}
              className={`story-mode-tab ${viewMode === 'timeline' ? 'active' : ''}`}
              onClick={() => {
                sound.playPop();
                setViewMode('timeline');
              }}
              title="Cosmic vertical starlight timeline with glowing nodes and Sparky guide"
            >
              <Sparkles size={15} />
              <span>Cosmic Starlight Timeline</span>
              {viewMode === 'timeline' && <span className="active-live-indicator" />}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'stage'}
              className={`story-mode-tab ${viewMode === 'stage' ? 'active' : ''}`}
              onClick={() => {
                sound.playPop();
                setViewMode('stage');
              }}
              title="Watch scenes with automatic progression and interactive controls"
            >
              <Tv size={15} />
              <span>Cinematic Auto-Stage</span>
              {isPlaying && viewMode === 'stage' && (
                <span className="active-live-indicator" />
              )}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'scroll'}
              className={`story-mode-tab ${viewMode === 'scroll' ? 'active' : ''}`}
              onClick={() => {
                sound.playPop();
                setViewMode('scroll');
              }}
              title="Continuous vertical scroll storybook"
            >
              <Scroll size={15} />
              <span>Storybook Cards</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            FEATURED MODE: Cosmic Starlight Timeline (Matching User's Reference!)
            ========================================================================= */}
        {viewMode === 'timeline' && (
          <div className="cosmic-timeline-container" role="region" aria-label="Cosmic origin story timeline">
            <div className="washi-tape-strip washi-gold">
              <span>✦ MORRO'S CELESTIAL ORIGIN CHRONICLE ✦</span>
            </div>
            <CardCuteStarPin text="Cosmic Journey" glyph="🌌⭐" />

            {/* Twinkling ambient starry particles */}
            <div className="cosmic-starfield-layer" aria-hidden="true">
              <span className="cosmic-star star-p1">✦</span>
              <span className="cosmic-star star-p2">✧</span>
              <span className="cosmic-star star-p3">✦</span>
              <span className="cosmic-star star-p4">·</span>
              <span className="cosmic-star star-p5">✧</span>
              <span className="cosmic-star star-p6">·</span>
              <span className="cosmic-star star-p7">✦</span>
              <span className="cosmic-star star-p8">·</span>
            </div>

            <div className="cosmic-timeline-inner">
              {/* Left Vertical Spine with Glowing Gradient & Floating Sparky */}
              <div className="cosmic-rail-track" aria-hidden="true">
                <div className="cosmic-rail-line" />
                
                {/* Floating Sparky Mascot Sprite that hovers smoothly beside the active milestone */}
                <div 
                  className="cosmic-rail-sparky"
                  style={{ 
                    top: `calc(${activeCosmicIndex * (100 / (scenes.length - 1))}% )` 
                  }}
                  title="Sparky the Spirit Companion guiding the origin path! 🪽"
                >
                  <div className="sparky-glow-halo" />
                  <div className="sparky-sprite-body">
                    <span className="sparky-wing sparky-wing-l">🪽</span>
                    <div className="sparky-face">
                      <span className="sparky-eye">^</span>
                      <span className="sparky-smile">◡</span>
                      <span className="sparky-eye">^</span>
                    </div>
                    <span className="sparky-wing sparky-wing-r">🪽</span>
                  </div>
                </div>

                {/* Golden glowing circular node dots along the line */}
                {scenes.map((scene, idx) => (
                  <div 
                    key={scene.id}
                    className={`cosmic-rail-node ${activeCosmicIndex === idx ? 'node-active' : ''}`}
                    style={{ top: `calc(${idx * (100 / (scenes.length - 1))}%)` }}
                    onClick={() => handleSelectCosmicStep(idx)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Jump to ${scene.title}`}
                  />
                ))}
              </div>

              {/* Story Milestones List (Matching User's Reference Layout) */}
              <div className="cosmic-story-steps-list">
                {scenes.map((scene, idx) => {
                  const isActive = activeCosmicIndex === idx;
                  return (
                    <article
                      key={scene.id}
                      className={`cosmic-story-step-item ${isActive ? 'step-active' : ''}`}
                      onClick={() => handleSelectCosmicStep(idx)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleSelectCosmicStep(idx);
                        }
                      }}
                    >
                      {/* Step 3D/Emoji Icon Badge */}
                      <div className="cosmic-step-icon-box">
                        <span className="cosmic-step-icon">{scene.icon}</span>
                        <div className="cosmic-step-icon-glow" style={{ background: scene.accentColor }} />
                      </div>

                      {/* Step Text Details */}
                      <div className="cosmic-step-details">
                        <div className="cosmic-step-header-row">
                          <h3 className="cosmic-step-title">{scene.title}</h3>
                          <span className="cosmic-step-num-pill">{scene.numberStr}</span>
                        </div>
                        <p className="cosmic-step-narrative">{scene.narrative}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            {/* Bottom Celebration & Call to Action Dock */}
            <div className="cosmic-timeline-footer">
              <div className="footer-lore-summary">
                <Sparkles size={16} className="text-gold" />
                <span>
                  <strong>The Mission Today:</strong> Morro catches every postponed "Maybe", turning it into a positive reminder and starlight momentum.
                </span>
              </div>
              <div className="footer-actions-row">
                <button
                  type="button"
                  className="cosmic-ritual-cta-btn"
                  onClick={handleMeetRitual}
                  title="Scroll to Maybe-to-Magic ritual"
                >
                  <Sparkle size={14} className="text-gold" />
                  <span>Start The Ritual</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            MODE 2: Cinematic Interactive Auto-Stage
            ========================================================================= */}
        {viewMode === 'stage' && (
          <div className="story-stage-container">
            {/* Scene Navigation Stepper Tabs with Integrated Progress */}
            <div className="story-timeline-tabs" role="tablist">
              {scenes.map((scene, idx) => {
                const isActive = activeSceneIndex === idx;
                return (
                  <button
                    key={scene.id}
                    role="tab"
                    aria-selected={isActive}
                    className={`timeline-tab-btn ${isActive ? 'active' : ''}`}
                    onClick={() => handleSelectScene(idx)}
                  >
                    <div className="tab-meta-row">
                      <span className="tab-number">{scene.phase}</span>
                      <span className="tab-icon">{scene.icon}</span>
                    </div>
                    <span className="tab-title">{scene.title}</span>
                    
                    {/* Live Progress Bar on Active Tab */}
                    {isActive && isPlaying && !isHovered && (
                      <div 
                        className="tab-progress-indicator" 
                        style={{ width: `${progress}%` }} 
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Main Stage Card with Hover-to-Pause and Wheel Support */}
            <div 
              className="story-stage-card"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onWheel={handleWheel}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Continuous Top Progress Bar */}
              <div className="stage-top-progress-track" aria-hidden="true">
                <div 
                  className="stage-top-progress-fill" 
                  style={{ width: `${progress}%` }} 
                />
              </div>

              {/* Stage Quick Controls Ribbon */}
              <div className="stage-controls-ribbon">
                <div className="controls-left-group">
                  <button
                    type="button"
                    className={`auto-play-toggle-btn ${isPlaying ? 'state-playing' : 'state-paused'}`}
                    onClick={handleTogglePlay}
                    title={isPlaying ? "Click to pause auto-advancing" : "Click to resume auto-advancing"}
                  >
                    {isPlaying ? (
                      <>
                        <Pause size={14} />
                        <span>Auto-Advancing {isHovered ? '(Paused on Hover)' : `(${Math.max(1, Math.ceil(((100 - progress) / 100) * 5.5))}s)`}</span>
                        {!isHovered && <span className="auto-pulse-dot" />}
                      </>
                    ) : (
                      <>
                        <Play size={14} fill="#F59E0B" />
                        <span>Resume Auto-Play</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    className="stage-restart-btn"
                    onClick={handleRestart}
                    title="Restart from Scene 1"
                  >
                    <RotateCcw size={14} />
                    <span>Restart</span>
                  </button>
                </div>

                <div className="controls-right-group">
                  <div className="controls-right-hint">
                    <MousePointer size={13} />
                    <span>Scroll wheel or swipe to turn scenes</span>
                  </div>
                  <CardCuteStarPin text="Origin Star" glyph="✨" />
                </div>
              </div>

              {/* Main Visual & Narrative Grid */}
              <div className="story-stage-grid">
                {/* Visual Canvas */}
                <div className="story-visual-canvas">
                  {renderVisual(currentScene)}
                </div>

                {/* Narrative Text Column */}
                <div className="story-narrative-col">
                  <div className="scene-phase-badge">
                    <span className="scene-icon">{currentScene.icon}</span>
                    <span>{currentScene.phase} of {scenes.length}</span>
                    <span className="scene-number-tag">Ch. {currentScene.numberStr}</span>
                  </div>

                  <h3 className="scene-title">{currentScene.title}</h3>
                  <h4 className="scene-subtitle">{currentScene.subtitle}</h4>

                  <p className="scene-narrative-text">
                    {currentScene.narrative}
                  </p>

                  {/* Scene Navigation & Celebration Row */}
                  <div className="scene-actions-row">
                    <button
                      type="button"
                      className="story-nav-btn prev"
                      onClick={handlePrev}
                      aria-label="Previous scene"
                    >
                      <ChevronLeft size={18} />
                      <span>Previous</span>
                    </button>

                    <div className="scene-dots-indicator" aria-label="Scene selector">
                      {scenes.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          aria-label={`Jump to scene ${i + 1}`}
                          className={`dot ${activeSceneIndex === i ? 'active' : ''}`}
                          onClick={() => handleSelectScene(i)}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      className="story-nav-btn next"
                      onClick={handleNext}
                      aria-label="Next scene"
                    >
                      <span>Next</span>
                      <ChevronRight size={18} />
                    </button>
                  </div>

                  {/* Finale Celebration Badge on Last Milestone */}
                  {activeSceneIndex === scenes.length - 1 && (
                    <div className="scene-completion-banner">
                      <div className="completion-text">
                        <Sparkle size={15} className="text-gold" />
                        <span>Morro's Origin is Complete! Ready to catch your Maybes?</span>
                      </div>
                      <button
                        type="button"
                        className="completion-cta-btn"
                        onClick={handleMeetRitual}
                      >
                        <span>Start The Ritual</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            MODE 2: Continuous Storybook Scroll (View All 4 Scenes Without Clicking)
            ========================================================================= */}
        {viewMode === 'scroll' && (
          <div className="storybook-scroll-timeline">
            <div className="timeline-spine-track" aria-hidden="true" />
            
            {scenes.map((scene, idx) => (
              <article 
                key={scene.id} 
                className={`storybook-chapter-card ${idx % 2 === 1 ? 'reverse-layout' : ''}`}
              >
                {/* Chapter Star Node */}
                <div className="chapter-node-badge">
                  <span className="chapter-number-pill">{scene.numberStr}</span>
                </div>

                {/* Chapter Visual Box */}
                <div className="chapter-visual-box">
                  {renderVisual(scene)}
                </div>

                {/* Chapter Story Details */}
                <div className="chapter-content-box">
                  <div className="chapter-badge-row">
                    <span className="scene-icon">{scene.icon}</span>
                    <span className="chapter-phase-label">{scene.phase}</span>
                    <span className="chapter-meta-tag">Celestial Chronicle</span>
                  </div>
                  <h3 className="chapter-title">{scene.title}</h3>
                  <h4 className="chapter-subtitle">{scene.subtitle}</h4>
                  <p className="chapter-narrative">{scene.narrative}</p>

                  {idx === scenes.length - 1 && (
                    <div className="chapter-final-callout">
                      <div className="callout-sparkle-row">
                        <Sparkles size={16} fill="#F59E0B" color="#F59E0B" />
                        <strong>The Journey Begins Today</strong>
                      </div>
                      <p>Morro is waiting at the Starforge to turn your hesitation into stars.</p>
                      <button
                        type="button"
                        className="completion-cta-btn"
                        onClick={handleMeetRitual}
                      >
                        <span>Enter The Ritual</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
