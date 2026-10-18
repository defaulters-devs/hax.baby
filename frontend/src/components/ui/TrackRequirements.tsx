import React from 'react';
import { Star, CheckCircle2, Sparkles } from 'lucide-react';
import { sound } from '../../utils/audio';
import './TrackRequirements.css';

interface RequirementCard {
  id: number;
  title: string;
  description: string;
  colorClass: string;
  sticker: string;
  targetHref?: string;
  statusText: string;
}

interface TrackRequirementsProps {
  onOpenEasterEgg?: () => void;
}

export const TrackRequirements: React.FC<TrackRequirementsProps> = ({ onOpenEasterEgg }) => {
  const cards: RequirementCard[] = [
    {
      id: 1,
      title: "What they are",
      description: "An intro that introduces the character's identity, look, and personality",
      colorClass: "card-pink",
      sticker: "🦊👑",
      targetHref: "#about",
      statusText: "Meet Morro & Character Sheet",
    },
    {
      id: 2,
      title: "What they do",
      description: "A projects / work section showing at least 3 things they made (real or fictional).",
      colorClass: "card-blue",
      sticker: "🎒✨",
      targetHref: "#projects",
      statusText: "3 Portfolio Inventions",
    },
    {
      id: 3,
      title: "Their story",
      description: "An origin or journey told through scroll, scenes, or animation (not a wall of text).",
      colorClass: "card-purple",
      sticker: "🌌⭐",
      targetHref: "#story",
      statusText: "4-Scene Visual Chronicles",
    },
    {
      id: 4,
      title: "Immersion",
      description: "At least one moment that reacts to the visitor: mouse tracking, clicks, or sound with a mute toggle.",
      colorClass: "card-mint",
      sticker: "🪄🔊",
      targetHref: "#hero",
      statusText: "Parallax Tilt & Audio Mute",
    },
    {
      id: 5,
      title: "Mobile-friendly layout",
      description: "The site must look great and function smoothly on phones and tablets.",
      colorClass: "card-yellow",
      sticker: "📱💖",
      targetHref: "#about",
      statusText: "Touch Responsive on All Screens",
    },
    {
      id: 6,
      title: "One hidden Easter egg",
      description: "Something delightful for curious visitors to discover (a secret click, a hidden lullaby, a waking animation).",
      colorClass: "card-coral",
      sticker: "🗝️✨",
      statusText: "Tap Sparky 3 Times to Unlock!",
    },
  ];

  const handleCardClick = (card: RequirementCard) => {
    sound.playChime(600 + card.id * 50);
    if (card.id === 6 && onOpenEasterEgg) {
      sound.playSparkle();
      onOpenEasterEgg();
      return;
    }
    if (card.targetHref) {
      const el = document.querySelector(card.targetHref);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="requirements" className="track-requirements-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="celestial-badge gold-badge">
            <Star size={14} fill="#F59E0B" /> Official Track 2 Challenge Checklist
          </div>
          <h2>Track 2: Core Requirements</h2>
          <p>
            Every single mandatory criteria of the HAX Baby Track 2 challenge, handcrafted with love and magic.
          </p>
        </div>

        {/* 6-Card Requirements Grid */}
        <div className="requirements-cards-grid">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`requirement-pill-card ${card.colorClass}`}
              onClick={() => handleCardClick(card)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(card);
                }
              }}
              title={`Click to explore requirement #${card.id}: ${card.title}`}
            >
              {/* Card Header: Number Circle & Title & Sticker */}
              <div className="req-card-top-row">
                <div className="req-num-and-title">
                  <div className="req-number-circle">
                    {card.id}
                  </div>
                  <h3 className="req-card-title">{card.title}</h3>
                </div>
                <span className="req-card-sticker">{card.sticker}</span>
              </div>

              {/* Exact Verbatim Description from Challenge Brief */}
              <p className="req-card-description">
                {card.description}
              </p>

              {/* Cute Interactive Fulfillment Tag */}
              <div className="req-card-footer">
                <span className="req-fulfilled-badge">
                  <CheckCircle2 size={13} className="text-check" />
                  <span>{card.statusText}</span>
                </span>
                <span className="req-explore-hint">
                  <Sparkles size={12} /> Jump
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
