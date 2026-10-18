import React, { useState } from 'react';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';
import { sound } from '../../utils/audio';
import type { ThemeMode } from '../../types';
import './Navbar.css';

interface NavbarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onReplayIntro?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  isMuted,
  onToggleMute,
  onReplayIntro,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#hero', emoji: '✨', badge: null },
    { label: 'About', href: '#about', emoji: '🐾', badge: 'Morro' },
    { label: 'Origin Story', href: '#story', emoji: '📖', badge: null },
    { label: 'The Ritual', href: '#ritual', emoji: '🎒', badge: 'Magic' },
    { label: 'Guestbook', href: '#guestbook', emoji: '💌', badge: 'Wishes' },
  ];

  const handleLinkClick = (href: string) => {
    sound.playChime(750);
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const navOffset = 84;
      const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: Math.max(0, elementPosition - navOffset),
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className="celestial-navbar-wrapper">
      <nav className="celestial-navbar" aria-label="Main Navigation">
        {/* Brand Logo with Cute Mascot & Crown Shimmer */}
        <a 
          href="#hero" 
          className="navbar-brand"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('#hero');
          }}
          title="Back to Top"
        >
          <div className="brand-star-emblem">
            <span className="brand-mascot-emoji">👑</span>
            <div className="brand-orbit-sparkle">✦</div>
          </div>
          <div className="brand-text-col">
            <div className="brand-name-row">
              <span className="brand-name">MORRO</span>
            </div>
            <span className="brand-subtitle">Little Star Prince</span>
          </div>
        </a>

        {/* Desktop Cute Storybook Nav Dock */}
        <div className="nav-links-desktop" role="menubar">
          <div className="nav-dock-capsule">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                role="menuitem"
                className="nav-link-item"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
              >
                <span className="nav-link-emoji" aria-hidden="true">{link.emoji}</span>
                <span className="nav-link-label">{link.label}</span>
                {link.badge && (
                  <span className="nav-link-microbadge">{link.badge}</span>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Action Controls: Sound & Theme */}
        <div className="nav-actions">
          {/* Replay Cinematic Opening Intro */}
          {onReplayIntro && (
            <button
              type="button"
              className="nav-intro-pill"
              onClick={() => {
                sound.playChime(640);
                onReplayIntro();
              }}
              title="Watch Morro's Magical Opening Intro Animation ✨"
              aria-label="Replay intro animation"
            >
              <span className="intro-pill-emoji" aria-hidden="true">✨</span>
              <span className="intro-pill-text">Intro</span>
            </button>
          )}

          {/* Audio Mute Switch — Cute Celestial Music Pill */}
          <button
            type="button"
            className={`nav-mute-pill ${isMuted ? 'muted' : 'active'}`}
            onClick={onToggleMute}
            title={isMuted ? "Sound is Muted — Click to Play Audio Chimes" : "Sound is Active — Click to Mute"}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          >
            <span className="mute-icon-wrap">
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </span>
            <span className="mute-pill-text">{isMuted ? 'Muted' : 'Sound ON'}</span>
            {!isMuted && <span className="nav-pulse-dot" />}
          </button>

          {/* Theme Toggle (Day / Night) */}
          <button
            type="button"
            className="nav-btn-icon theme-toggle-btn"
            onClick={() => {
              sound.playChime(580);
              onToggleTheme();
            }}
            title={theme === 'day' ? "Switch to Cosmic Night Realm 🌙" : "Switch to Celestial Day ☀️"}
            aria-label="Toggle theme mode"
          >
            {theme === 'day' ? (
              <span className="theme-icon-orb day-orb">🌙</span>
            ) : (
              <span className="theme-icon-orb night-orb">☀️</span>
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            className="nav-btn-icon mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          {/* Dedicated Easy-to-Spot Mobile Sound Switch */}
          <div className="mobile-audio-drawer-box">
            <div className="drawer-sound-label">
              <Volume2 size={16} className="text-gold" />
              <span>Chimes & Music:</span>
            </div>
            <button
              type="button"
              className={`drawer-mute-btn ${isMuted ? 'muted' : 'active'}`}
              onClick={onToggleMute}
            >
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              <span>{isMuted ? 'Muted (Tap to Unmute)' : 'Sound ON (Tap to Mute)'}</span>
            </button>
          </div>

          <div className="mobile-nav-links">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="mobile-nav-item"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
              >
                <span className="mobile-nav-emoji">{link.emoji}</span>
                <span className="mobile-nav-label">{link.label}</span>
                {link.badge && (
                  <span className="mobile-nav-badge">{link.badge}</span>
                )}
              </a>
            ))}

            {onReplayIntro && (
              <button
                type="button"
                className="mobile-nav-item mobile-intro-btn"
                onClick={() => {
                  sound.playChime(640);
                  setMobileMenuOpen(false);
                  onReplayIntro();
                }}
              >
                <span className="mobile-nav-emoji">✨</span>
                <span className="mobile-nav-label">Watch Intro Animation</span>
                <span className="mobile-nav-badge">Story</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
