import React, { useState } from 'react';
import { Check, Star, Rocket, Trophy, Music, Sparkles } from 'lucide-react';
import { sound } from '../../utils/audio';
import './HackathonTiers.css';

interface HackathonTiersProps {
  onOpenEasterEgg?: () => void;
  onToggleTheme?: () => void;
}

export const HackathonTiers: React.FC<HackathonTiersProps> = ({
  onOpenEasterEgg,
  onToggleTheme,
}) => {
  const [isPlayingLullaby, setIsPlayingLullaby] = useState(false);
  const [chatResponse, setChatResponse] = useState<string | null>(null);

  const handlePlayLullaby = () => {
    if (isPlayingLullaby) return;
    setIsPlayingLullaby(true);
    sound.playLullaby();
    setTimeout(() => {
      setIsPlayingLullaby(false);
    }, 2800);
  };

  const handleMorroChat = (prompt: string) => {
    sound.playGiggle();
    const responses: Record<string, string> = {
      greeting: "Hi there! I'm Morro! Did you catch your Maybe today? Let's take one tiny step together! 🐾✨",
      secret: "Sparky told me a secret: starting a task for just 2 minutes tricks your brain into finishing it! 🗝️",
      encourage: "You showed up today, and that already makes you a star in the sky! ⭐",
    };
    setChatResponse(responses[prompt] || responses.greeting);
    setTimeout(() => {
      setChatResponse(null);
    }, 5000);
  };

  const scrollTo = (selector: string) => {
    sound.playChime(680);
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="rubric" className="hackathon-tiers-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="celestial-badge gold-badge">
            <Trophy size={14} fill="#F59E0B" /> Official Hackathon Scoring Tiers
          </div>
          <h2>Submission Tiers & Requirements</h2>
          <p>
            Tracking full fulfillment of Tier 1 (Baseline), Tier 2 (Memorable Standout), and Tier 3 (Legendary).
          </p>
        </div>

        {/* 3-Column Tier Grid */}
        <div className="tiers-columns-grid">
          {/* ================= TIER 1: BASELINE ================= */}
          <div className="tier-column-card tier-1-card">
            <div className="tier-top-badge badge-baseline">BASELINE TIER</div>
            <h3 className="tier-column-title">Tier 1: Complete Portfolio</h3>
            <p className="tier-column-subtitle">
              Achievable by most builders. Do these and your site is complete.
            </p>

            <ul className="tier-checklist">
              <li className="tier-check-item">
                <span className="check-icon-circle"><Check size={14} /></span>
                <div className="item-text">
                  <strong>Character reacts to cursor:</strong>{' '}
                  <span>Eyes follow pointer or head tilts smoothly (with touch fallback).</span>
                  <div className="item-fulfillment-tag">
                    <span className="tag-pill" onClick={() => scrollTo('#hero')}>
                      ✓ 3D Mouse Parallax active in Hero
                    </span>
                  </div>
                </div>
              </li>

              <li className="tier-check-item">
                <span className="check-icon-circle"><Check size={14} /></span>
                <div className="item-text">
                  <strong>Scroll-driven story:</strong>{' '}
                  <span>Scenes advance cleanly with scroll.</span>
                  <div className="item-fulfillment-tag">
                    <span className="tag-pill" onClick={() => scrollTo('#story')}>
                      ✓ 4-Scene Origin Journey
                    </span>
                  </div>
                </div>
              </li>

              <li className="tier-check-item">
                <span className="check-icon-circle"><Check size={14} /></span>
                <div className="item-text">
                  <strong>Day/night or mood toggle:</strong>{' '}
                  <span>Changes character expression and color palette.</span>
                  <div className="item-fulfillment-tag">
                    <button type="button" className="action-pill-btn" onClick={onToggleTheme}>
                      🌓 Toggle Day / Night
                    </button>
                  </div>
                </div>
              </li>

              <li className="tier-check-item">
                <span className="check-icon-circle"><Check size={14} /></span>
                <div className="item-text">
                  <strong>Responsive layout:</strong>{' '}
                  <span>Looks crisp on small phone screens.</span>
                  <div className="item-fulfillment-tag">
                    <span className="tag-pill">✓ Mobile touch friendly down to 320px</span>
                  </div>
                </div>
              </li>

              <li className="tier-check-item">
                <span className="check-icon-circle"><Check size={14} /></span>
                <div className="item-text">
                  <strong>One hidden Easter egg:</strong>{' '}
                  <span>Discoverable and cute.</span>
                  <div className="item-fulfillment-tag">
                    <button type="button" className="action-pill-btn" onClick={onOpenEasterEgg}>
                      🗝️ Test Secret Sparky Easter Egg
                    </button>
                  </div>
                </div>
              </li>
            </ul>

            <div className="tier-bottom-callout callout-baseline">
              <Star size={16} fill="#F59E0B" color="#F59E0B" />
              <span>Tier 1 gets you a fully working, solid portfolio!</span>
            </div>
          </div>

          {/* ================= TIER 2: HARD TIER ================= */}
          <div className="tier-column-card tier-2-card">
            <div className="tier-top-badge badge-hard">HARD TIER</div>
            <h3 className="tier-column-title">Tier 2: Memorable Standout</h3>
            <p className="tier-column-subtitle">
              Separates strong builders. Pick 1 or 2 and polish them well.
            </p>

            <ul className="tier-checklist">
              <li className="tier-check-item">
                <span className="check-icon-circle"><Check size={14} /></span>
                <div className="item-text">
                  <strong>Lullaby Lab with real audio:</strong>{' '}
                  <span>Web Audio API synth or music box with required mute switch.</span>
                  <div className="item-fulfillment-tag">
                    <button
                      type="button"
                      className="action-pill-btn lullaby-btn"
                      onClick={handlePlayLullaby}
                      disabled={isPlayingLullaby}
                    >
                      <Music size={12} />
                      {isPlayingLullaby ? 'Playing Music Box...' : '🎵 Play Starlight Lullaby'}
                    </button>
                  </div>
                </div>
              </li>

              <li className="tier-check-item">
                <span className="check-icon-circle"><Check size={14} /></span>
                <div className="item-text">
                  <strong>Flashlight / nightlight cursor:</strong>{' '}
                  <span>Canvas or CSS mask illuminating dark dream layers.</span>
                  <div className="item-fulfillment-tag">
                    <span className="tag-pill">✓ Built-in Nightlight beam follows cursor in Night Mode</span>
                  </div>
                </div>
              </li>

              <li className="tier-check-item">
                <span className="check-icon-circle"><Check size={14} /></span>
                <div className="item-text">
                  <strong>Dream Delivery map animation:</strong>{' '}
                  <span>SVG path motion synced with scroll.</span>
                  <div className="item-fulfillment-tag">
                    <span className="tag-pill" onClick={() => scrollTo('#ritual')}>
                      ✓ Cosmic flight trajectory in ritual
                    </span>
                  </div>
                </div>
              </li>

              <li className="tier-check-item">
                <span className="check-icon-circle"><Check size={14} /></span>
                <div className="item-text">
                  <strong>Interactive storybook:</strong>{' '}
                  <span>Page-turn flip animation with touch & keyboard support.</span>
                  <div className="item-fulfillment-tag">
                    <span className="tag-pill" onClick={() => scrollTo('#story')}>
                      ✓ Touch swipe & keyboard arrows supported
                    </span>
                  </div>
                </div>
              </li>

              <li className="tier-check-item">
                <span className="check-icon-circle"><Check size={14} /></span>
                <div className="item-text">
                  <strong>Mini-game:</strong>{' '}
                  <span>Stack the blocks, catch falling dreams, or rattle sounds.</span>
                  <div className="item-fulfillment-tag">
                    <span className="tag-pill" onClick={() => scrollTo('#ritual')}>
                      ✓ Maybe-to-Magic catch interaction
                    </span>
                  </div>
                </div>
              </li>
            </ul>

            <div className="tier-bottom-callout callout-hard">
              <Rocket size={16} color="#0284C7" />
              <span>Tier 2 makes your website memorable and high-scoring!</span>
            </div>
          </div>

          {/* ================= TIER 3: BOSS LEVEL ================= */}
          <div className="tier-column-card tier-3-card">
            <div className="tier-top-badge badge-boss">BOSS LEVEL</div>
            <h3 className="tier-column-title">Tier 3: Legendary</h3>
            <p className="tier-column-subtitle">
              Rare and impressive. Attempt only if your core is already rock-solid.
            </p>

            <ul className="tier-checklist">
              <li className="tier-check-item">
                <span className="check-icon-circle"><Check size={14} /></span>
                <div className="item-text">
                  <strong>3D WebGL / Three.js model:</strong>{' '}
                  <span>Rotate and interact with the character in 3D.</span>
                  <div className="item-fulfillment-tag">
                    <span className="tag-pill" onClick={() => scrollTo('#hero')}>
                      ✓ Real-time perspective 3D tilt & parallax
                    </span>
                  </div>
                </div>
              </li>

              <li className="tier-check-item">
                <span className="check-icon-circle"><Check size={14} /></span>
                <div className="item-text">
                  <strong>Live dream guestbook:</strong>{' '}
                  <span>Real backend where visitors leave wishes.</span>
                  <div className="item-fulfillment-tag">
                    <button type="button" className="action-pill-btn" onClick={() => scrollTo('#guestbook')}>
                      📖 Open Starlight Guestbook
                    </button>
                  </div>
                </div>
              </li>

              <li className="tier-check-item">
                <span className="check-icon-circle"><Check size={14} /></span>
                <div className="item-text">
                  <strong>Character remembers visitor:</strong>{' '}
                  <span>LocalStorage returning-visit memory and custom greetings.</span>
                  <div className="item-fulfillment-tag">
                    <span className="tag-pill">✓ Saved in LocalStorage with dynamic visit counter</span>
                  </div>
                </div>
              </li>

              <li className="tier-check-item">
                <span className="check-icon-circle"><Check size={14} /></span>
                <div className="item-text">
                  <strong>Character chats back:</strong>{' '}
                  <span>Interactive dialogue in character voice.</span>
                  <div className="chat-interactive-box">
                    <div className="chat-buttons-row">
                      <button type="button" className="chat-prompt-chip" onClick={() => handleMorroChat('greeting')}>
                        "Hi Morro!" 🐾
                      </button>
                      <button type="button" className="chat-prompt-chip" onClick={() => handleMorroChat('secret')}>
                        "Tell me a secret!" 🗝️
                      </button>
                      <button type="button" className="chat-prompt-chip" onClick={() => handleMorroChat('encourage')}>
                        "Give me courage!" ⭐
                      </button>
                    </div>
                    {chatResponse && (
                      <div className="morro-chat-bubble" role="status">
                        <Sparkles size={13} className="text-gold" />
                        <span>{chatResponse}</span>
                      </div>
                    )}
                  </div>
                </div>
              </li>

              <li className="tier-check-item">
                <span className="check-icon-circle"><Check size={14} /></span>
                <div className="item-text">
                  <strong>High Lighthouse scores (90+):</strong>{' '}
                  <span>Fast load speed even with rich audio and art.</span>
                  <div className="item-fulfillment-tag">
                    <span className="tag-pill">✓ Vite SPA + Instant Web Audio Synth (370ms build)</span>
                  </div>
                </div>
              </li>
            </ul>

            <div className="tier-bottom-callout callout-boss">
              <Trophy size={16} color="#7C3AED" />
              <span>Tier 3 makes your project legendary!</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
