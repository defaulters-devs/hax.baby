import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Volume2, Crown, Sparkle, Stamp, FileText, X } from 'lucide-react';
import { sound } from '../../utils/audio';
import { fireStarConfetti } from '../../utils/confetti';
import { SectionSparkleCrown, CardCuteStarPin } from './CuteSparkleElements';
import './CharacterSheet.css';

interface CuteSticker {
  id: string;
  emoji: string;
  name: string;
  color: string;
  quote: string;
}

interface PetHeartParticle {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

export const CharacterSheet: React.FC = () => {
  const [activeVoiceLine, setActiveVoiceLine] = useState<string | null>(null);
  const [petCount, setPetCount] = useState<number>(0);
  const [petReaction, setPetReaction] = useState<string | null>(null);
  const [activeStickerId, setActiveStickerId] = useState<string | null>(null);
  const [stickerCount, setStickerCount] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [petHearts, setPetHearts] = useState<PetHeartParticle[]>([]);

  // Creed & Motto Card Interactive States (Point 05)
  const [creedTransmuted, setCreedTransmuted] = useState<boolean>(false);
  const [highFiveCount, setHighFiveCount] = useState<number>(0);
  const [highFiveReaction, setHighFiveReaction] = useState<string | null>(null);

  const handleTransmuteCreed = () => {
    sound.playSparkle();
    sound.playChime(640);
    fireStarConfetti();
    setCreedTransmuted((prev) => !prev);
  };

  const handleHighFivePledge = () => {
    sound.playPurr();
    setTimeout(() => sound.playGiggle(), 120);
    fireStarConfetti();
    setHighFiveCount((prev) => prev + 1);
    setHighFiveReaction("🐾 High-five sealed! Morro grants you +100 Starlight Momentum! 💖✨");
    setTimeout(() => setHighFiveReaction(null), 3800);
  };

  // Open Morro Photo Scrapbook Gallery (p1, p2, p3 & classic hero)
  const morroPhotos = [
    {
      id: 'p1',
      src: '/assets/morro/p1.png',
      badge: '💻 BUILDER & CODER',
      title: 'Morro in Action ✨',
      subtitle: 'Brainstorming & coding with Sparky and warm starlight!',
      stamp: 'BUILDER BABY',
    },
    {
      id: 'p2',
      src: '/assets/morro/p2.png',
      badge: '⭐ STAR SORCERER',
      title: 'Starlight Wand 🪄',
      subtitle: 'Reaching out to turn drifting Maybes into Done!',
      stamp: 'MAGIC SPARK',
    },
    {
      id: 'p3',
      src: '/assets/morro/p3.png',
      badge: '🍦 SWEET REWARD',
      title: 'Little Star Prince 👑',
      subtitle: 'Sharing delicious celebration ice cream with Sparky!',
      stamp: 'VERIFIED CUTE',
    },
    {
      id: 'hero',
      src: '/assets/morro/morro-hero.png',
      badge: '🦊 GUARDIAN COMPANION',
      title: 'Morro & Sparky 🪽',
      subtitle: 'Ready to catch tasks with high-five paws and zero guilt!',
      stamp: 'VERIFIED BABY',
    },
  ];
  const [previewPhoto, setPreviewPhoto] = useState<typeof morroPhotos[0] | null>(null);

  useEffect(() => {
    if (isModalOpen || previewPhoto) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsModalOpen(false);
          setPreviewPhoto(null);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isModalOpen, previewPhoto]);

  const voiceLines = [
    "One tiny step today beats a whole mountain tomorrow! 🐾",
    "Don't worry about finishing everything right now — just start with me! ✨",
    "Sparky and I caught your Maybe! It's safe in my pouch now. 🎒",
    "You showed up! That deserves a star in the sky! ⭐",
  ];

  const cuteStickers: CuteSticker[] = [
    { id: 'horns', emoji: '🐉', name: 'Dragon Horns', color: '#F59E0B', quote: 'Golden tips that sense drifting Maybes!' },
    { id: 'crown', emoji: '👑', name: 'Star Crown', color: '#38BDF8', quote: 'Worn by the Little Star Prince!' },
    { id: 'sparky', emoji: '🪽', name: 'Sparky Spirit', color: '#60A5FA', quote: 'Morro\'s loyal chirping companion!' },
    { id: 'paws', emoji: '🐾', name: 'Soft Paws', color: '#F472B6', quote: 'Gentle steps toward your goal!' },
    { id: 'pouch', emoji: '🎒', name: 'Maybe Pouch', color: '#10B981', quote: 'Stores postponed signals safely!' },
    { id: 'star', emoji: '⭐', name: 'Cosmic Sparkle', color: '#EAB308', quote: 'Earned every time you do work today!' },
  ];

  const handlePlayVoice = (index: number) => {
    sound.playChime(520 + index * 90);
    setActiveVoiceLine(voiceLines[index]);
    setTimeout(() => {
      setActiveVoiceLine(null);
    }, 4500);
  };

  const handlePetMorro = (e: React.MouseEvent) => {
    sound.playPurr();
    setTimeout(() => sound.playGiggle(), 120);
    const nextCount = petCount + 1;
    setPetCount(nextCount);

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const emojis = ['💖', '✨', '🐾', '⭐', '🌟', '💕'];
    const newHeart: PetHeartParticle = {
      id: Date.now() + Math.random(),
      x: clickX,
      y: clickY,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    };
    setPetHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setPetHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1200);

    const reactions = [
      "Purrr! Morro happily wiggles his fluffy tail! 🦊✨",
      "Sparky chirps a joyful tune around Morro's golden horns! 🐉💖",
      "Morro gives you a high-five paw! 'We can do anything today!' 🐾⭐",
      "A warm shower of starlight glitters all around you! 🌟",
    ];
    setPetReaction(reactions[nextCount % reactions.length]);
    setTimeout(() => {
      setPetReaction(null);
    }, 3800);
  };

  const handleStickerClick = (sticker: CuteSticker) => {
    sound.playPop();
    setTimeout(() => sound.playSparkle(), 60);
    setActiveStickerId(sticker.id);
    setStickerCount((prev) => prev + 1);
    setTimeout(() => {
      setActiveStickerId(null);
    }, 3000);
  };

  return (
    <section id="about" className="character-sheet-section" aria-labelledby="about-heading">
      {/* Whimsical Background Graphic Elements (Floating Celestial Doodles) */}
      <div className="about-bg-cloud about-bg-cloud-1" aria-hidden="true" />
      <div className="about-bg-cloud about-bg-cloud-2" aria-hidden="true" />

      <div className="about-floating-doodles-layer" aria-hidden="true">
        <div className="about-bg-doodle doodle-crown" title="Star Prince Crown">
          <span className="doodle-emoji">👑</span>
        </div>
        <div className="about-bg-doodle doodle-star-1" title="Golden Star Sparkle">
          <span className="doodle-emoji">✦</span>
        </div>
        <div className="about-bg-doodle doodle-star-2" title="Diamond Glint">
          <span className="doodle-emoji">✧</span>
        </div>
        <div className="about-bg-doodle doodle-paw-1" title="Morro's High-Five Paw">
          <span className="doodle-emoji">🐾</span>
        </div>
        <div className="about-bg-doodle doodle-sparkle-1" title="Magic Starlight">
          <span className="doodle-emoji">✨</span>
        </div>
        <div className="about-bg-doodle doodle-backpack" title="Maybe Signal Pouch">
          <span className="doodle-emoji">🎒</span>
        </div>
      </div>

      <div className="container">
        {/* Cute Section Header & Modal Trigger */}
        <div className="section-header">
          <SectionSparkleCrown label="Character Storybook ✦ Scrapbook" />
          <div className="celestial-badge gold-badge">
            <Sparkles size={14} fill="#F59E0B" /> Meet Our Baby Companion
          </div>
          <h2 id="about-heading">About Morro, The Little Star Prince</h2>
          <p>
            Meet the cheerful baby companion who catches drifting "Maybes" and turns hesitation into joyful starlight momentum.
          </p>
          <div className="sheet-modal-trigger-wrapper">
            <button
              type="button"
              className="open-sheet-modal-btn"
              onClick={() => {
                sound.playChime(660);
                setIsModalOpen(true);
              }}
              title="Open Morro's character profile in a dedicated popup modal"
            >
              <FileText size={16} />
              <span>View Full Character Dossier</span>
              <Sparkles size={14} className="text-gold" />
            </button>
          </div>
        </div>

        {/* Interactive Sticker Collection Banner */}
        <div className="sticker-album-strip">
          <div className="sticker-album-header">
            <div className="sticker-album-title">
              <Sparkles size={16} className="text-gold" />
              <span>Morro's Scrapbook Stickers (Tap to Collect!):</span>
            </div>
            {stickerCount > 0 && (
              <span className="sticker-counter-pill">
                ⭐ {stickerCount} Sparkles Collected!
              </span>
            )}
          </div>
          <div className="sticker-items-row">
            {cuteStickers.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`cute-peel-sticker ${activeStickerId === s.id ? 'peeled-active' : ''}`}
                onClick={() => handleStickerClick(s)}
                title={`Click to peel ${s.name}!`}
              >
                <span className="sticker-emoji">{s.emoji}</span>
                <span className="sticker-name">{s.name}</span>
              </button>
            ))}
          </div>
          {activeStickerId && (
            <div className="sticker-toast-bubble" role="status">
              <Sparkle size={14} className="text-gold" />
              <span>
                {cuteStickers.find((s) => s.id === activeStickerId)?.quote}
              </span>
            </div>
          )}
        </div>

        {/* Beautiful, Fresh, Storybook Scrapbook Grid Layout */}
        <div className="storybook-scrapbook-grid">
          {/* Card 1: Open Scrapbook Photo Gallery & Petting Station */}
          <div className="scrapbook-card polaroid-hero-card">
            <div className="washi-tape-strip washi-gold">
              <span>✦ STAR PRINCE ID • SHIKO CLAN ✦</span>
            </div>
            <CardCuteStarPin text="Baby Prince" glyph="👑⭐" />

            {/* Gallery Intro Bar */}
            <div className="scrapbook-gallery-header">
              <div className="gallery-header-text">
                <div className="gallery-header-tag">
                  <Sparkles size={14} className="text-gold" />
                  <span>MORRO'S SCRAPBOOK ALBUM</span>
                </div>
                <h3 className="gallery-main-title">
                  Little Star Prince Moments 🦊✨
                </h3>
                <p className="gallery-subtitle">
                  All official snapshots of Morro & Sparky! Tap any photo to pet him, hear joyful sounds, and send starlight love.
                </p>
              </div>

              {/* Master Pet Button & Reaction Toast */}
              <div className="gallery-pet-action-wrap">
                <button
                  type="button"
                  className="pet-morro-interactive-btn"
                  onClick={handlePetMorro}
                  title="Click to pet Morro and hear him purr!"
                >
                  <Heart size={16} fill="#EC4899" color="#EC4899" />
                  <span>Pet Morro ({petCount})</span>
                  <span className="btn-sparkle-pill">Purr 🐾</span>
                </button>
                {petReaction && (
                  <div className="polaroid-reaction-toast" role="status">
                    {petReaction}
                  </div>
                )}
              </div>
            </div>

            {/* Open Photo Cards Grid — displayed openly side-by-side, responsive for all screens */}
            <div className="morro-open-gallery-grid" role="region" aria-label="Open photo gallery of Morro">
              {morroPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  className={`open-polaroid-card open-card-tilt-${index % 4}`}
                  onClick={(e) => {
                    handlePetMorro(e);
                  }}
                  title={`Click to pet Morro in "${photo.title}"!`}
                >
                  <div className="open-polaroid-img-frame">
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="open-polaroid-img"
                      loading="lazy"
                    />
                    <div className="open-polaroid-stamp">
                      <Stamp size={11} />
                      <span>{photo.stamp}</span>
                    </div>

                    <button
                      type="button"
                      className="open-polaroid-zoom-trigger"
                      onClick={(e) => {
                        e.stopPropagation();
                        sound.playSparkle();
                        setPreviewPhoto(photo);
                      }}
                      title="View full-size photo"
                      aria-label={`Enlarge photo ${photo.title}`}
                    >
                      <Sparkles size={12} />
                    </button>
                  </div>

                  <div className="open-polaroid-info">
                    <span className="open-polaroid-badge">{photo.badge}</span>
                    <h4 className="open-polaroid-title">{photo.title}</h4>
                    <p className="open-polaroid-subtitle">{photo.subtitle}</p>
                  </div>

                  <div className="open-polaroid-hover-action">
                    <Heart size={13} fill="#EC4899" color="#EC4899" />
                    <span>Tap to Pet 🐾</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Floating Heart Particles when Petted */}
            {petHearts.map((h) => (
              <span
                key={h.id}
                className="polaroid-floating-heart"
                style={{ left: `${h.x}px`, top: `${h.y}px` }}
              >
                {h.emoji}
              </span>
            ))}

            {/* Quick Voice Line Soundboard */}
            <div className="scrapbook-voice-soundboard">
              <div className="voice-soundboard-title">
                <Volume2 size={15} className="text-gold" />
                <span>Tap to Hear Morro's Cheer:</span>
              </div>
              <div className="voice-chips-row">
                {voiceLines.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="voice-chip-btn"
                    onClick={() => handlePlayVoice(idx)}
                    title={`Hear Morro's cheer #${idx + 1}`}
                  >
                    <span>Motto #{idx + 1} 🐾</span>
                  </button>
                ))}
              </div>
              {activeVoiceLine && (
                <div className="active-voice-dialogue-cloud" role="status">
                  <span className="cloud-avatar">🐾</span>
                  <p>"{activeVoiceLine}"</p>
                </div>
              )}
            </div>
          </div>

          {/* Card 2: Identity & Species (Point 1 & 2) */}
          <div className="scrapbook-card identity-card">
            <div className="washi-tape-strip washi-blue">
              <span>✦ IDENTITY & SPECIES ✦</span>
            </div>
            <div className="card-header-badge-row">
              <span className="cute-section-pill">Point 01 & 02</span>
              <span className="species-badge">🐉 Rare SHiko Starborn</span>
            </div>

            <h3 className="scrapbook-character-name">
              Morro <span className="crown-emoji">👑</span>
            </h3>
            <p className="character-sub-title">The Little Star Prince of Earth & Space</p>

            <div className="character-description-text">
              <p>
                A gentle, starborn creature blending soft fox-like features with golden dragon horns and celestial energy.
              </p>
            </div>

            {/* Trait Pills */}
            <div className="traits-pill-cloud">
              <span className="trait-pill pill-blue">💙 Sapphire Eyes</span>
              <span className="trait-pill pill-gold">✨ Golden Horns</span>
              <span className="trait-pill pill-pink">🦊 Dragon-Fox Mix</span>
              <span className="trait-pill pill-purple">🐾 Fluffy Star Tail</span>
              <span className="trait-pill pill-green">👑 Royal Prince Outfit</span>
              <span className="trait-pill pill-cyan">🪽 Sparky Companion</span>
            </div>

            {/* Personality Highlight */}
            <div className="personality-warm-box">
              <div className="warm-box-header">
                <Heart size={15} fill="#F472B6" color="#F472B6" />
                <strong>Heart & Personality: Kind & Playful</strong>
              </div>
              <p>
                A cheerful little adventurer who loves exploring, helping others, and spreading happiness. He never judges you for what wasn't done!
              </p>
            </div>
          </div>

          {/* Card 3: What Morro Does (Point 3 - Mission & Magic) */}
          <div className="scrapbook-card calling-card">
            <div className="washi-tape-strip washi-amber">
              <span>✦ SPECIAL TALENT & MISSION ✦</span>
            </div>
            <div className="card-header-badge-row">
              <span className="cute-section-pill">Point 03</span>
              <span className="calling-badge">🎒 Postponement Transmuter</span>
            </div>

            <h3 className="calling-card-title">Catching Maybes & Creating Stars</h3>

            <p className="calling-card-quote">
              "Morro Baby is a helpful companion that stops us from delaying our work. Whenever a user leaves a task for tomorrow, they create a negative signal called 'maybe.' Morro Baby catches this signal and turns it into a positive reminder, encouraging the user to finish their work."
            </p>

            {/* Candy Flow Diagram */}
            <div className="candy-flow-container">
              <div className="flow-step step-maybe">
                <span className="step-icon">💭</span>
                <span className="step-text">Delayed Task ("Maybe")</span>
              </div>
              <span className="flow-arrow-char">➔</span>
              <div className="flow-step step-pouch">
                <span className="step-icon">🎒</span>
                <span className="step-text">Morro Catches Signal</span>
              </div>
              <span className="flow-arrow-char">➔</span>
              <div className="flow-step step-star">
                <span className="step-icon">⭐</span>
                <span className="step-text">Starlight Momentum!</span>
              </div>
            </div>
          </div>

          {/* Card 4: Cosmic Origin Story (Point 4) */}
          <div className="scrapbook-card origin-card">
            <div className="washi-tape-strip washi-purple">
              <span>✦ COSMIC GENESIS ✦</span>
            </div>
            <div className="card-header-badge-row">
              <span className="cute-section-pill">Point 04</span>
              <span className="origin-badge">🌌 Born From Space</span>
            </div>

            <h3 className="origin-card-title">The Starlight Origin</h3>

            <p className="origin-card-story">
              "Long ago, postponed tasks from around the world released 'Maybe' energy into the sky. It gathered at a single cosmic point in deep space and gave birth to Morro Baby. Today, Morro brings that same energy back to Earth as warm encouragement!"
            </p>

            <div className="origin-milestone-strip">
              <span className="milestone-chip">🌍 1. Drifting Delay</span>
              <span className="milestone-chip">🌌 2. Gathered in Space</span>
              <span className="milestone-chip">👶 3. Morro Born</span>
              <span className="milestone-chip">✨ 4. Inspiring Us Today</span>
            </div>
          </div>

          {/* Card 5: SHiko Magic Matrix (Cute Trait Gauges) */}
          <div className="scrapbook-card magic-matrix-card">
            <div className="washi-tape-strip washi-cyan">
              <span>✦ SHIKO MAGIC MATRIX ✦</span>
            </div>

            <h3 className="matrix-card-title">Morro's Celestial Stats</h3>

            <div className="magic-stats-list">
              <div className="magic-stat-row">
                <div className="stat-label-wrap">
                  <span className="stat-icon">💖</span>
                  <span className="stat-name">Empathy & Kindness</span>
                </div>
                <div className="stat-badge-score score-gold">
                  ★★★★★ 100% (MAX)
                </div>
              </div>

              <div className="magic-stat-row">
                <div className="stat-label-wrap">
                  <span className="stat-icon">🦊</span>
                  <span className="stat-name">Fluffiness Factor</span>
                </div>
                <div className="stat-badge-score score-pink">
                  💖💖💖💖💖 Infinite
                </div>
              </div>

              <div className="magic-stat-row">
                <div className="stat-label-wrap">
                  <span className="stat-icon">🎒</span>
                  <span className="stat-name">Maybe Catch Rate</span>
                </div>
                <div className="stat-badge-score score-blue">
                  ⭐⭐⭐⭐★ 99.4%
                </div>
              </div>

              <div className="magic-stat-row">
                <div className="stat-label-wrap">
                  <span className="stat-icon">🚫</span>
                  <span className="stat-name">Procrastination Guilt</span>
                </div>
                <div className="stat-badge-score score-green">
                  0% (Strictly Forbidden!)
                </div>
              </div>
            </div>
          </div>

          {/* Card 6: Official Slogan & Sacred Creed (Point 5) */}
          <div className="scrapbook-card slogan-policy-card">
            <div className="washi-tape-strip washi-gold">
              <span>✦ OFFICIAL MOTTO & SACRED CREED • POINT 05 ✦</span>
            </div>

            <div className="slogan-card-layout-inner">
              {/* Left Column: The Sacred Creed & Core Action Pillars & Interactive Transmutation */}
              <div className="slogan-creed-col">
                <div className="card-header-badge-row">
                  <div className="creed-badge-group">
                    <span className="cute-section-pill gold-pill">Point 05</span>
                    <span className="motto-badge">👑 The Sacred Creed</span>
                  </div>
                  <span className="creed-status-tag">✨ Instant Momentum</span>
                </div>

                <h3 className="slogan-col-title">The Philosophy of Immediate Action</h3>
                <p className="slogan-col-lead">
                  When work gets delayed, creators don't fail — they simply release a drifting <span className="lore-keyword-maybe">‘maybe’</span> signal. Morro catches that signal with his golden dragon horns and transmutes hesitation into bright starlight momentum!
                </p>

                {/* 3 Core Action Pillars */}
                <div className="creed-pillars-list">
                  <div className="creed-pillar-card">
                    <div className="pillar-icon-box pink">💖</div>
                    <div className="pillar-info">
                      <strong className="pillar-title">Clean Slate Protocol</strong>
                      <p className="pillar-desc">Never feel shame for yesterday. Every moment is a fresh canvas with zero guilt.</p>
                    </div>
                  </div>

                  <div className="creed-pillar-card">
                    <div className="pillar-icon-box gold">⏱️</div>
                    <div className="pillar-info">
                      <strong className="pillar-title">The 2-Minute Spark Rule</strong>
                      <p className="pillar-desc">Just start for 120 seconds today. Once you begin, natural momentum takes over.</p>
                    </div>
                  </div>

                  <div className="creed-pillar-card">
                    <div className="pillar-icon-box blue">🎒</div>
                    <div className="pillar-info">
                      <strong className="pillar-title">The Safe Signal Pouch</strong>
                      <p className="pillar-desc">Your postponed dreams are held safely with care until you're ready to shine.</p>
                    </div>
                  </div>
                </div>

                {/* Interactive Transmutation Mini-Toy */}
                <div className="creed-transmute-toy">
                  <div className="transmute-toy-header">
                    <div className="toy-state-chip">
                      <span className="toy-state-dot" />
                      <span>{creedTransmuted ? '✨ Status: Done & Celebrated!' : '💭 Status: Drifting "Maybe" Signal'}</span>
                    </div>
                    <span className="toy-badge">Interactive Toy 🪄</span>
                  </div>

                  <p className="toy-scenario-text">
                    {creedTransmuted
                      ? '🎉 "Hooray! The maybe was transmuted into a golden star! Morro cheers for your progress!" 🦊✨'
                      : '“I was thinking of postponing this project till tomorrow...” — Tap Morro below to transmute it!'}
                  </p>

                  <button
                    type="button"
                    className={`transmute-magic-btn ${creedTransmuted ? 'is-transmuted' : ''}`}
                    onClick={handleTransmuteCreed}
                  >
                    <Sparkles size={16} />
                    <span>{creedTransmuted ? 'Reset & Transmute Another Maybe 🔄' : 'Turn Maybe Into Done Now! ✨'}</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Grand Golden Banner, Clean Slate Card, and High-Five Pledge */}
              <div className="slogan-banner-col">
                <div className="slogan-golden-banner">
                  <span className="banner-star">✦</span>
                  <div className="banner-text-group">
                    <span className="banner-overhead-label">OFFICIAL HAX BABY MOTTO</span>
                    <h3 className="slogan-main-text">"Make the Work, Done Today"</h3>
                  </div>
                  <span className="banner-star">✦</span>
                </div>

                <div className="slogan-supporting-pill">
                  <Sparkles size={14} className="text-gold" />
                  <span>Supporting Creed: <strong>"Turn Maybe Into Done."</strong> 🌟</span>
                </div>

                {/* Clean Slate Promise Box with High-Five interaction */}
                <div className="zero-guilt-box">
                  <div className="guilt-box-header">
                    <Heart size={18} fill="#EC4899" color="#EC4899" />
                    <strong>Morro's Clean Slate Promise:</strong>
                  </div>
                  <p>
                    "Morro never blames you for what wasn't done yesterday. Every moment is a clean slate to take one tiny, joyful step today."
                  </p>

                  <div className="high-five-interactive-row">
                    <button
                      type="button"
                      className="high-five-paw-btn"
                      onClick={handleHighFivePledge}
                      title="High-five Morro to seal today's clean slate promise!"
                    >
                      <span className="paw-emoji">🐾</span>
                      <span>High-Five Morro ({highFiveCount})</span>
                      <span className="paw-btn-sparkle">High-Five!</span>
                    </button>
                    {highFiveReaction && (
                      <div className="high-five-toast" role="status">
                        {highFiveReaction}
                      </div>
                    )}
                  </div>
                </div>

                {/* Canon Certification Ribbon */}
                <div className="creed-canon-ribbon">
                  <div className="canon-crown-icon">
                    <Crown size={18} fill="#F59E0B" />
                  </div>
                  <div className="canon-ribbon-text">
                    <strong>Official Canon of the SHiko Clan</strong>
                    <span>Woven into Morro's celestial star chart for HAX Baby 2026.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Point Character Sheet Modal Popup */}
      {isModalOpen && (
        <div 
          className="about-modal-backdrop" 
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-sheet-title"
        >
          <div className="about-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="about-modal-close"
              onClick={() => {
                sound.playChime(440);
                setIsModalOpen(false);
              }}
              aria-label="Close dossier modal"
            >
              <X size={20} />
            </button>

            <div className="modal-scroll-inner">
              <div className="modal-sheet-header">
                <div className="modal-crown-chip">
                  <Crown size={16} fill="#F59E0B" />
                  <span>OFFICIAL CHARACTER DOSSIER</span>
                </div>
                <h2 id="modal-sheet-title">Morro — The Little Star Prince</h2>
                <p className="modal-sheet-subhead">
                  Official 5-Point Character Dossier for HAX Baby 2026 (Track 2: Your Own Baby)
                </p>
              </div>

              {/* Complete Official 5 Points inside the Modal */}
              <div className="modal-points-grid">
                <div className="modal-point-card">
                  <div className="modal-point-num">01</div>
                  <h4>Character Name</h4>
                  <p><strong>Morro</strong> (The Little Star Prince • SHiko Starborn)</p>
                  <p className="subtle-note">Accompanied everywhere by his loyal blue spirit companion Sparky.</p>
                </div>

                <div className="modal-point-card">
                  <div className="modal-point-num">02</div>
                  <h4>What They Are</h4>
                  <p><strong>Species:</strong> SHiko — A rare magical celestial creature blending fox-like features with dragon horns and starlight energy.</p>
                  <p><strong>Appearance:</strong> Fluffy white-and-blue fur, sparkling sapphire eyes, golden-tipped horns, a magical fluffy tail, and royal blue outfit with golden embroidery.</p>
                  <p><strong>Personality:</strong> Kind, cheerful, adventurous, and curious. Loves helping others without any shame or pressure.</p>
                </div>

                <div className="modal-point-card">
                  <div className="modal-point-num">03</div>
                  <h4>What They Do</h4>
                  <p><strong>Profession / Talent:</strong> The Postponement Transmuter.</p>
                  <p className="subtle-note">Morro Baby is a helpful companion that stops us from delaying our work. Whenever a user leaves a task for tomorrow, they create a negative signal called 'maybe.' Morro Baby catches this signal and turns it into a positive reminder, encouraging the user to finish their work.</p>
                </div>

                <div className="modal-point-card">
                  <div className="modal-point-num">04</div>
                  <h4>Their Story</h4>
                  <p><strong>Cosmic Origin:</strong> Long ago, delayed tasks across Earth released negative "maybe" energy into space. This energy drifted and converged into a bright warm star, birthing Morro Baby. Today, Morro brings that same energy back to Earth to inspire work today.</p>
                </div>

                <div className="modal-point-card modal-point-gold">
                  <div className="modal-point-num gold">05</div>
                  <h4>Official Slogan & Creed</h4>
                  <p className="modal-tagline-quote">"Make the Work, Done Today"</p>
                  <p className="subtle-note">Supporting Slogan: <em>"Turn Maybe Into Done."</em></p>
                  <p className="zero-guilt-note">Zero Guilt Guarantee: Every moment is a clean slate to take one tiny, joyful step today.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal for Full-Size Photo Preview */}
      {previewPhoto && (
        <div
          className="photo-lightbox-backdrop"
          onClick={() => setPreviewPhoto(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="photo-preview-title"
        >
          <div className="photo-lightbox-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="photo-lightbox-close"
              onClick={() => {
                sound.playChime(440);
                setPreviewPhoto(null);
              }}
              aria-label="Close photo preview"
            >
              <X size={20} />
            </button>
            <div className="photo-lightbox-img-wrap">
              <img
                src={previewPhoto.src}
                alt={previewPhoto.title}
                className="photo-lightbox-img"
              />
            </div>
            <div className="photo-lightbox-details">
              <span className="open-polaroid-badge">{previewPhoto.badge}</span>
              <h3 id="photo-preview-title" className="photo-lightbox-title">{previewPhoto.title}</h3>
              <p className="photo-lightbox-sub">{previewPhoto.subtitle}</p>
              <button
                type="button"
                className="pet-morro-interactive-btn"
                onClick={handlePetMorro}
              >
                <Heart size={16} fill="#EC4899" color="#EC4899" />
                <span>Pet Morro ({petCount})</span>
                <span className="btn-sparkle-pill">Purr 🐾</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
