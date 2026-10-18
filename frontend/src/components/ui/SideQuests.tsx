import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, MessageSquare, Zap, PartyPopper } from 'lucide-react';
import { sound } from '../../utils/audio';
import { HitCounter } from '../retro/HitCounter';
import './SideQuests.css';

interface SideQuestsProps {
  isMuted: boolean;
  onToggleMute: () => void;
  isChaosMode: boolean;
  onToggleChaosMode: () => void;
}

export const SideQuests: React.FC<SideQuestsProps> = ({
  isMuted,
  onToggleMute,
  isChaosMode,
  onToggleChaosMode,
}) => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [soundFeedback, setSoundFeedback] = useState<string | null>(null);

  const handleTestSound = (type: 'giggle' | 'chime' | 'lullaby') => {
    if (type === 'giggle') {
      sound.playGiggle();
      setSoundFeedback('Baby giggle chirped! 🐾');
    } else if (type === 'chime') {
      sound.playChime(720);
      setSoundFeedback('Soft wind chime played! 🎐');
    } else {
      sound.playLullaby();
      setSoundFeedback('Music box lullaby playing! 🎶');
    }
    setTimeout(() => setSoundFeedback(null), 2500);
  };

  const scrollToGuestbook = () => {
    sound.playChime(660);
    const el = document.querySelector('#guestbook');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="side-quests" className="side-quests-section">
      <div className="container">
        {/* Section Eyebrow & Title matching Section 07 */}
        <div className="side-quests-header">
          <span className="section-eyebrow">SECTION 07</span>
          <h2 className="side-quests-title">Side Quests (Up to +13 Bonus Points)</h2>
          <p className="side-quests-subtitle">
            Optional early-web nostalgic side quests. Points are added directly to your evaluation:
          </p>
        </div>

        {/* 5-Card Horizontal Row */}
        <div className="quests-cards-row">
          {/* Card 1: Live Guestbook (+2 pts) */}
          <div 
            className={`quest-card ${activeCard === 1 ? 'card-focused' : ''}`}
            onClick={() => setActiveCard(1)}
          >
            <div className="quest-pts-pill">+2 pts</div>
            <h3 className="quest-card-title">Live Guestbook</h3>
            <p className="quest-card-description">
              "Leave a message or dream wish for the baby" on a persistent guestbook wall.
            </p>
            <div className="quest-card-action">
              <button 
                type="button" 
                className="quest-action-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToGuestbook();
                }}
              >
                <MessageSquare size={13} />
                <span>Visit Guestbook Wall</span>
              </button>
            </div>
          </div>

          {/* Card 2: Sparkle Cursor Trail (+2 pts) */}
          <div 
            className={`quest-card card-highlighted ${activeCard === 2 ? 'card-focused' : ''}`}
            onClick={() => setActiveCard(2)}
          >
            <div className="quest-pts-pill">+2 pts</div>
            <h3 className="quest-card-title">Sparkle Cursor Trail</h3>
            <p className="quest-card-description">
              Retro stars, dreamy bones, bubbles, or glitter following the pointer.
            </p>
            <div className="quest-card-action">
              <span className="quest-status-badge">
                <Sparkles size={13} className="text-gold" />
                <span>Active on Pointer ✨</span>
              </span>
            </div>
          </div>

          {/* Card 3: Hit Counter Odometer (+1 pt) */}
          <div 
            className={`quest-card ${activeCard === 3 ? 'card-focused' : ''}`}
            onClick={() => setActiveCard(3)}
          >
            <div className="quest-pts-pill">+1 pt</div>
            <h3 className="quest-card-title">Hit Counter Odometer</h3>
            <p className="quest-card-description">
              "Dreams delivered: 1,204" or vintage visitor counter odometer.
            </p>
            <div className="quest-card-action odometer-action">
              <HitCounter count={1204} label="Dreams Delivered: 1,204" />
            </div>
          </div>

          {/* Card 4: Click Sounds + Mute (+3 pts) */}
          <div 
            className={`quest-card ${activeCard === 4 ? 'card-focused' : ''}`}
            onClick={() => setActiveCard(4)}
          >
            <div className="quest-pts-pill">+3 pts</div>
            <h3 className="quest-card-title">Click Sounds + Mute</h3>
            <p className="quest-card-description">
              Baby giggles, rattle clicks, or soft wind chimes. A mute switch is strictly required.
            </p>
            <div className="quest-card-action sound-action-group">
              <button 
                type="button" 
                className="sound-test-chip"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTestSound('giggle');
                }}
                title="Test baby giggle"
              >
                🐾 Giggle
              </button>
              <button 
                type="button" 
                className="sound-test-chip"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTestSound('chime');
                }}
                title="Test wind chime"
              >
                🎐 Chime
              </button>
              <button 
                type="button" 
                className="mute-toggle-chip"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleMute();
                }}
                title="Mute Switch (Required)"
              >
                {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                <span>{isMuted ? 'Muted' : 'Unmuted'}</span>
              </button>
            </div>
            {soundFeedback && (
              <span className="quest-micro-toast">{soundFeedback}</span>
            )}
          </div>

          {/* Card 5: Responsive Chaos Mode (+5 pts) */}
          <div 
            className={`quest-card ${activeCard === 5 ? 'card-focused' : ''}`}
            onClick={() => setActiveCard(5)}
          >
            <div className="quest-pts-pill">+5 pts</div>
            <h3 className="quest-card-title">Responsive Chaos Mode</h3>
            <p className="quest-card-description">
              Whimsical retro personality that reshapes dynamically to any screen dimension.
            </p>
            <div className="quest-card-action">
              <button 
                type="button" 
                className={`quest-chaos-btn ${isChaosMode ? 'chaos-on' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleChaosMode();
                }}
              >
                <Zap size={13} />
                <span>{isChaosMode ? 'Chaos Mode: ON! 🎪' : 'Toggle Chaos Mode ✨'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Chaos Mode Overlay Banner when active */}
        {isChaosMode && (
          <div className="chaos-mode-banner" role="status">
            <PartyPopper size={16} />
            <span className="chaos-marquee">
              ★ RETRO CHAOS MODE ACTIVATED: TURN MAYBE INTO DONE TODAY! ★ SPARKLE OVERDRIVE ★
            </span>
            <PartyPopper size={16} />
          </div>
        )}
      </div>
    </section>
  );
};
