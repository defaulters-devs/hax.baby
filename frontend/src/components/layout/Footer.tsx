import React from 'react';
import { Heart, ArrowUp, Star, ShieldCheck, Compass, Music, Palette } from 'lucide-react';
import { sound } from '../../utils/audio';
import './Footer.css';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sound.playSparkle();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    sound.playChime(660);
    const element = document.querySelector(id);
    if (element) {
      const navOffset = 84;
      const topPos = element.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top: Math.max(0, topPos), behavior: 'smooth' });
    }
  };

  return (
    <footer className="celestial-footer" role="contentinfo">
      {/* Decorative Pastel Wave Top Divider */}
      <div className="footer-wave-divider" aria-hidden="true">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,0 C150,80 350,-30 500,45 C650,110 900,15 1200,45 L1200,120 L0,120 Z"
            className="footer-wave-path"
          />
        </svg>
      </div>

      <div className="container footer-inner-container">
        {/* Cozy Hero Showcase Card */}
        <div className="footer-hero-card">
          <div className="footer-hero-left">
            <div className="footer-avatar-wrap">
              <span className="footer-avatar-star">⭐</span>
              <span className="footer-avatar-sparky">🪽</span>
            </div>
            <div className="footer-title-col">
              <div className="footer-name-badge">
                <span className="footer-badge-dot">✦</span>
                <span>The Little Star Prince</span>
              </div>
              <h3 className="footer-brand-title">MORRO</h3>
              <p className="footer-brand-tagline">"Make the Work, Done Today"</p>
            </div>
          </div>

          <div className="footer-motto-bubble">
            <span className="bubble-quote-glyph">“</span>
            <p className="bubble-quote-text">
              When tomorrow keeps calling, Morro catches your drifting Maybe and helps you take one tiny, joyful step today. You are doing wonderfully!
            </p>
            <span className="bubble-author-sign">🐾 — With love, Morro & Sparky</span>
          </div>
        </div>

        {/* 3 Colorful & Cozy Storybook Cards */}
        <div className="footer-storybook-grid">
          {/* Card 1: Character & Soul (Pastel Rose / Peach) */}
          <div className="storybook-footer-card card-rose">
            <div className="card-header-row">
              <div className="card-cute-icon bg-rose-icon">
                <Palette size={20} />
              </div>
              <div>
                <span className="card-micro-label">ORIGINAL CHARACTER</span>
                <h4 className="card-main-title">Character & Soul</h4>
              </div>
            </div>
            <p className="card-body-text">
              Morro is a rare magical SHiko blending fox-dragon features with a starlight core, catching delayed intentions and turning them into gentle momentum.
            </p>
            <div className="card-pill-tags">
              <span className="cute-tag tag-pink">🦊 SHiko Species</span>
              <span className="cute-tag tag-gold">👑 Star Prince</span>
              <span className="cute-tag tag-purple">🛡️ 100% Original IP</span>
            </div>
          </div>

          {/* Card 2: Handcrafted Magic & Audio (Pastel Celestial Blue) */}
          <div className="storybook-footer-card card-blue">
            <div className="card-header-row">
              <div className="card-cute-icon bg-blue-icon">
                <Music size={20} />
              </div>
              <div>
                <span className="card-micro-label">WEB AUDIO & CANVAS</span>
                <h4 className="card-main-title">Handcrafted Magic</h4>
              </div>
            </div>
            <p className="card-body-text">
              Zero external audio tracks! Handcrafted Web Audio API synthesizer generates baby purrs, wind chimes, rattle shakes, and real-time stardust trails.
            </p>
            <div className="card-pill-tags">
              <span className="cute-tag tag-blue">🎵 Web Audio Synth</span>
              <span className="cute-tag tag-cyan">✨ Canvas Sparkles</span>
              <span className="cute-tag tag-green">🔊 Visible Mute Toggle</span>
            </div>
          </div>

          {/* Card 3: Realm Navigation & Quick Jump (Pastel Buttercup Gold) */}
          <div className="storybook-footer-card card-gold">
            <div className="card-header-row">
              <div className="card-cute-icon bg-gold-icon">
                <Compass size={20} />
              </div>
              <div>
                <span className="card-micro-label">QUICK CELESTIAL JUMPS</span>
                <h4 className="card-main-title">Explore the Realm</h4>
              </div>
            </div>
            <div className="footer-nav-pills">
              <button type="button" onClick={() => scrollToSection('#hero')} className="footer-nav-jump">
                ✦ Home
              </button>
              <button type="button" onClick={() => scrollToSection('#about')} className="footer-nav-jump">
                ✦ About Morro
              </button>
              <button type="button" onClick={() => scrollToSection('#story')} className="footer-nav-jump">
                ✦ Origin Story
              </button>
              <button type="button" onClick={() => scrollToSection('#ritual')} className="footer-nav-jump">
                ✦ The Ritual
              </button>
              <button type="button" onClick={() => scrollToSection('#projects')} className="footer-nav-jump">
                ✦ Projects
              </button>
              <button type="button" onClick={() => scrollToSection('#guestbook')} className="footer-nav-jump">
                ✦ Starlight Guestbook
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Back to Top Rocket */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright-col">
            <p className="copyright-love">
              Crafted with celestial starlight, cozy tea, and zero procrastination guilt for <span className="highlight-hax">HAX Baby 2026</span>.
            </p>
            <div className="footer-trust-chips">
              <span className="trust-chip"><ShieldCheck size={13} /> Original Mascot</span>
              <span className="trust-chip"><Heart size={13} fill="#EC4899" color="#EC4899" /> Made for Creators</span>
              <span className="trust-chip"><Star size={13} fill="#F59E0B" color="#F59E0B" /> Zero Guilt Guaranteed</span>
            </div>
          </div>

          <button
            type="button"
            className="footer-rocket-top-btn"
            onClick={scrollToTop}
            title="Fly back to the top of Morro's Star Realm!"
          >
            <span className="rocket-icon">🚀</span>
            <span>Fly to Top</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
