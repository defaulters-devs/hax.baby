import React, { useState, useRef } from 'react';
import { Send, Sparkles, Star, Compass, LayoutGrid, Sparkle, CheckCircle2 } from 'lucide-react';
import type { GuestbookWish } from '../../types';
import { sound } from '../../utils/audio';
import { fireStarConfetti } from '../../utils/confetti';
import { SectionSparkleCrown, CardCuteStarPin } from './CuteSparkleElements';
import './LiveGuestbook.css';

interface LiveGuestbookProps {
  wishes: GuestbookWish[];
  onAddWish: (wish: GuestbookWish) => void;
}

interface FloatingParticle {
  id: string;
  x: number;
  y: number;
  text: string;
}

export const LiveGuestbook: React.FC<LiveGuestbookProps> = ({ wishes, onAddWish }) => {
  const particleSeq = useRef(0);
  const [authorName, setAuthorName] = useState('');
  const [wishText, setWishText] = useState('');
  const [selectedStamp, setSelectedStamp] = useState('⭐');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'sky'>('grid');
  const [activeSkyWishId, setActiveSkyWishId] = useState<string | null>(null);
  const [floatingParticles, setFloatingParticles] = useState<FloatingParticle[]>([]);

  // LocalStorage reactions map
  const [reactions, setReactions] = useState<Record<string, number>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('morro_guestbook_reactions');
        if (stored) return JSON.parse(stored);
      } catch (_e) {
        void _e;
      }
    }
    return {
      wish_init_1: 14,
      wish_init_2: 21,
    };
  });

  const stampOptions = [
    { symbol: '⭐', label: 'Starlight' },
    { symbol: '🐾', label: 'Paw Print' },
    { symbol: '☁️', label: 'Drifting Cloud' },
    { symbol: '🐉', label: 'SHiko Dragon' },
    { symbol: '🪽', label: 'Sparky Spirit' },
    { symbol: '🍵', label: 'Cozy Tea' },
    { symbol: '✨', label: 'Sparkle' },
    { symbol: '💛', label: 'Golden Heart' },
  ];

  const quickSparks = [
    { label: "Start Today 💻", text: "Morro, help me start coding without overthinking today! 🐾⭐" },
    { label: "Tiny Step 👣", text: "One tiny action today beats a whole mountain tomorrow! ✨" },
    { label: "Courage 🦁", text: "Turning my fear of imperfection into curiosity and joy! 🚀" },
    { label: "Magic 🪄", text: "May all our drifting Maybes become bright shining stars! ⭐" },
  ];

  const handleQuickSpark = (text: string) => {
    sound.playPop();
    setWishText(text);
    if (!authorName) {
      setAuthorName('Star Creator');
    }
    if (errorMsg) setErrorMsg('');
  };

  const handleReactToWish = (wishId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playSparkle();
    const current = reactions[wishId] || 1;
    const nextCount = current + 1;
    const nextMap = { ...reactions, [wishId]: nextCount };
    setReactions(nextMap);

    try {
      localStorage.setItem('morro_guestbook_reactions', JSON.stringify(nextMap));
    } catch (_e) {
      void _e;
    }

    // Spawn floating +1 starlight
    particleSeq.current += 1;
    const particleId = `pt_${particleSeq.current}`;
    setFloatingParticles((prev) => [
      ...prev,
      { id: particleId, x: e.clientX, y: e.clientY, text: '+1 ⭐' },
    ]);
    setTimeout(() => {
      setFloatingParticles((prev) => prev.filter((p) => p.id !== particleId));
    }, 1100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = authorName.trim() || 'A Gentle Creator';
    const message = wishText.trim();

    if (!message) {
      setErrorMsg('Please leave a wish or encouragement for Morro & fellow creators!');
      sound.playChime(380);
      return;
    }

    if (message.length < 3) {
      setErrorMsg('Please write at least a few words.');
      return;
    }

    setErrorMsg('');
    sound.playSparkle();
    sound.playChime(880);
    fireStarConfetti();

    const newWish: GuestbookWish = {
      id: 'wish_' + Date.now(),
      author: name,
      message,
      stamp: selectedStamp,
      createdAt: Date.now(),
      highlighted: true,
    };

    onAddWish(newWish);
    setAuthorName('');
    setWishText('');
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 4500);
  };

  // Filter wishes
  const filteredWishes = wishes.filter((w) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'star') return w.stamp === '⭐' || w.stamp === '✨';
    if (activeFilter === 'paw') return w.stamp === '🐾' || w.stamp === '🐉';
    if (activeFilter === 'spirit') return w.stamp === '🪽' || w.stamp === '☁️';
    if (activeFilter === 'heart') return w.stamp === '💛' || w.stamp === '🍵';
    return true;
  });

  // Calculate sky coordinates for each wish deterministically with safe canvas padding
  const getSkyCoords = (index: number, total: number) => {
    const angle = (index / Math.max(1, total)) * Math.PI * 2 + 0.35;
    const radiusX = 35 + (index % 3) * 5; // %
    const radiusY = 27 + (index % 2) * 6; // %
    const x = 50 + Math.cos(angle) * radiusX;
    const y = 50 + Math.sin(angle) * radiusY;
    return {
      x: Math.max(16, Math.min(84, x)),
      y: Math.max(18, Math.min(80, y)),
    };
  };

  return (
    <section id="guestbook" className="live-guestbook-section" aria-labelledby="guestbook-heading">
      {/* Floating Starlight Particles */}
      {floatingParticles.map((pt) => (
        <div
          key={pt.id}
          className="guestbook-floating-reaction"
          style={{ left: pt.x, top: pt.y }}
        >
          {pt.text}
        </div>
      ))}

      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <SectionSparkleCrown label="Community Constellation ✦ Wishes" />
          <h2 id="guestbook-heading">The Starlight Guestbook</h2>
          <p>
            Leave an encouraging wish or note for Morro, Sparky, and creators visiting from around the world.
          </p>
        </div>

        <div className="guestbook-layout-grid">
          {/* Column 1: Leave a Wish Form */}
          <div className="guestbook-form-card">
            <CardCuteStarPin text="Wishes Wall" glyph="💌⭐" />
            <div className="form-card-header">
              <Sparkles size={18} className="text-gold" />
              <h3>Leave a Wish for Morro</h3>
              <span className="live-online-chip">
                <span className="live-dot" /> Open to All
              </span>
            </div>

            {/* Quick Wish Sparks (One-Click Inspiration Pills) */}
            <div className="quick-sparks-container">
              <span className="quick-sparks-label">Wish Sparks:</span>
              <div className="quick-sparks-pills">
                {quickSparks.map((spark) => (
                  <button
                    key={spark.label}
                    type="button"
                    className="quick-spark-pill"
                    onClick={() => handleQuickSpark(spark.text)}
                    title={`Click to fill: "${spark.text}"`}
                  >
                    {spark.label}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="guestbook-form">
              <div className="form-group">
                <label htmlFor="guest-name">Your Name or Pen Name:</label>
                <input
                  id="guest-name"
                  type="text"
                  placeholder="e.g. Celestial Stargazer, Alex..."
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  maxLength={35}
                />
              </div>

              <div className="form-group">
                <label htmlFor="guest-msg">Your Wish or Encouragement:</label>
                <textarea
                  id="guest-msg"
                  rows={3}
                  placeholder="Share your wish, a kind thought, or greetings for Morro..."
                  value={wishText}
                  onChange={(e) => {
                    setWishText(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  maxLength={240}
                />
                {/* Live Character Mood Reaction Indicator */}
                <div className="char-count-mood">
                  <span className="mood-text">
                    {wishText.length === 0 && "🐾 Morro is listening for your wish..."}
                    {wishText.length > 0 && wishText.length < 25 && "✨ Sparky is readying the pouch..."}
                    {wishText.length >= 25 && "🚀 Ready to launch your wish into the constellation!"}
                  </span>
                  <span className={`char-counter ${wishText.length > 220 ? 'near-limit' : ''}`}>
                    {wishText.length} / 240
                  </span>
                </div>
              </div>

              {/* Stamp Picker with Animated Selection */}
              <div className="stamp-picker-group">
                <label>Choose a Celestial Stamp:</label>
                <div className="stamps-row">
                  {stampOptions.map((stamp) => (
                    <button
                      key={stamp.symbol}
                      type="button"
                      className={`stamp-btn ${selectedStamp === stamp.symbol ? 'selected' : ''}`}
                      onClick={() => {
                        sound.playPop();
                        setSelectedStamp(stamp.symbol);
                      }}
                      title={stamp.label}
                    >
                      <span className="stamp-emoji">{stamp.symbol}</span>
                    </button>
                  ))}
                </div>
              </div>

              {errorMsg && <div className="form-error-alert">{errorMsg}</div>}

              {successMsg && (
                <div className="form-success-alert" role="status">
                  <CheckCircle2 size={16} />
                  <span>Your wish has joined Morro's night sky! ✨</span>
                </div>
              )}

              <button type="submit" className="guestbook-submit-btn">
                <span>Post to Starlight Guestbook</span>
                <Send size={16} />
              </button>
            </form>
          </div>

          {/* Column 2: Interactive Stream of Wishes & Sky View */}
          <div className="guestbook-stream-card">
            {/* Stream Header & View Mode Switcher */}
            <div className="stream-header-row">
              <div className="stream-title-group">
                <h4>Wishes in the Night Sky ({wishes.length})</h4>
                <span className="live-pulse-badge">
                  <span className="pulse-dot" /> Live Web Wall
                </span>
              </div>

              {/* View Switcher: Card Wall vs Sky View */}
              <div className="view-mode-toggle" role="group" aria-label="Guestbook View Mode">
                <button
                  type="button"
                  className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => {
                    sound.playPop();
                    setViewMode('grid');
                  }}
                  title="View wishes as interactive card grid"
                >
                  <LayoutGrid size={15} />
                  <span>Cards</span>
                </button>
                <button
                  type="button"
                  className={`view-mode-btn ${viewMode === 'sky' ? 'active' : ''}`}
                  onClick={() => {
                    sound.playSparkle();
                    setViewMode('sky');
                  }}
                  title="View wishes floating in the interactive night sky"
                >
                  <Compass size={15} />
                  <span>Sky View 🌌</span>
                </button>
              </div>
            </div>

            {/* Interactive Stamp Filter Pills (Only in Grid View) */}
            {viewMode === 'grid' && (
              <div className="wish-filter-bar">
                <button
                  type="button"
                  className={`filter-pill ${activeFilter === 'all' ? 'active' : ''}`}
                  onClick={() => {
                    sound.playPop();
                    setActiveFilter('all');
                  }}
                >
                  All ({wishes.length})
                </button>
                <button
                  type="button"
                  className={`filter-pill ${activeFilter === 'star' ? 'active' : ''}`}
                  onClick={() => {
                    sound.playPop();
                    setActiveFilter('star');
                  }}
                >
                  ⭐ Stars
                </button>
                <button
                  type="button"
                  className={`filter-pill ${activeFilter === 'paw' ? 'active' : ''}`}
                  onClick={() => {
                    sound.playPop();
                    setActiveFilter('paw');
                  }}
                >
                  🐾 Paws
                </button>
                <button
                  type="button"
                  className={`filter-pill ${activeFilter === 'spirit' ? 'active' : ''}`}
                  onClick={() => {
                    sound.playPop();
                    setActiveFilter('spirit');
                  }}
                >
                  🪽 Spirits
                </button>
                <button
                  type="button"
                  className={`filter-pill ${activeFilter === 'heart' ? 'active' : ''}`}
                  onClick={() => {
                    sound.playPop();
                    setActiveFilter('heart');
                  }}
                >
                  💛 Heart & Warmth
                </button>
              </div>
            )}

            {/* View Mode 1: Interactive Grid Wall with Reactions */}
            {viewMode === 'grid' ? (
              <div className="wishes-scroll-list">
                {filteredWishes.length === 0 ? (
                  <div className="empty-filter-state">
                    <p>No wishes with this stamp yet. Be the first to cast one! ✨</p>
                  </div>
                ) : (
                  filteredWishes.map((wish) => {
                    const reactionCount = reactions[wish.id] || 1;
                    return (
                      <div
                        key={wish.id}
                        className={`wish-entry-bubble ${wish.highlighted ? 'new-arrival' : ''}`}
                      >
                        <div className="wish-corner-pin" aria-hidden="true">📌</div>

                        <div className="wish-top">
                          <span className="wish-stamp">{wish.stamp}</span>
                          <span className="wish-author">{wish.author}</span>
                          <span className="wish-time">
                            {new Date(wish.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                          </span>
                        </div>

                        <p className="wish-message">"{wish.message}"</p>

                        <div className="wish-footer-row">
                          <button
                            type="button"
                            className="wish-react-btn"
                            onClick={(e) => handleReactToWish(wish.id, e)}
                            title="Send starlight cheer to this wish!"
                          >
                            <Star size={13} fill="#F59E0B" className="star-icon" />
                            <span className="react-text">Starlight</span>
                            <span className="react-count">{reactionCount}</span>
                          </button>
                          <span className="wish-blessing-tag">
                            <Sparkle size={11} /> Saved in Pouch
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            ) : (
              /* View Mode 2: Interactive Starlight Constellation Sky View */
              <div className="guestbook-sky-stage">
                <div className="sky-canvas-backdrop">
                  <div className="sky-moon-emblem">🌙</div>
                  <span className="sky-hint-banner">
                    ✦ Hover or click on any floating star to open that creator's wish! ✦
                  </span>

                  {/* Constellation Stars */}
                  {wishes.map((wish, idx) => {
                    const coords = getSkyCoords(idx, wishes.length);
                    const isSelected = activeSkyWishId === wish.id;
                    const reactionCount = reactions[wish.id] || 1;

                    // Compute dynamic popover placement so it never clips canvas boundaries
                    const isNearTop = coords.y < 50;
                    const isNearRight = coords.x > 68;
                    const isNearLeft = coords.x < 32;
                    const placementClass = `${isNearTop ? 'place-bottom' : 'place-top'} ${
                      isNearRight ? 'align-right' : isNearLeft ? 'align-left' : 'align-center'
                    }`;

                    return (
                      <div
                        key={wish.id}
                        className={`sky-star-node ${isSelected ? 'active-star' : ''}`}
                        style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
                        onClick={() => {
                          sound.playChime(640 + (idx % 5) * 80);
                          setActiveSkyWishId(isSelected ? null : wish.id);
                        }}
                        role="button"
                        tabIndex={0}
                        title={`Click to view ${wish.author}'s wish`}
                      >
                        <div className="star-orb-halo" />
                        <div className="star-orb-core">
                          <span className="star-stamp-icon">{wish.stamp}</span>
                        </div>
                        <span className="star-author-label">{wish.author}</span>

                        {/* Popover Bubble on Click/Active */}
                        {isSelected && (
                          <div
                            className={`sky-wish-popover ${placementClass}`}
                            role="dialog"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="popover-top">
                              <span className="popover-stamp">{wish.stamp}</span>
                              <strong className="popover-author">{wish.author}</strong>
                              <span className="popover-date">
                                {new Date(wish.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                              </span>
                            </div>
                            <p className="popover-msg">"{wish.message}"</p>
                            <div className="popover-footer">
                              <button
                                type="button"
                                className="wish-react-btn popover-react"
                                onClick={(e) => handleReactToWish(wish.id, e)}
                              >
                                <Star size={13} fill="#F59E0B" />
                                <span>Cheer</span>
                                <span className="react-count">{reactionCount}</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveGuestbook;
