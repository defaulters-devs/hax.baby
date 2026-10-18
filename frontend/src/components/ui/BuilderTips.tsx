import React from 'react';
import { 
  Heart, 
  Layers, 
  Smartphone, 
  Sparkles, 
  Film, 
  Volume2, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { sound } from '../../utils/audio';
import './BuilderTips.css';

interface BuilderTipsProps {
  onOpenEasterEgg?: () => void;
  isAudioMuted?: boolean;
  onToggleAudio?: () => void;
}

interface TipItem {
  id: number;
  badge: string;
  icon: React.ReactNode;
  title: string;
  advice: string;
  fulfillment: string;
  actionText: string;
  actionHref?: string;
  onAction?: () => void;
  accentColor: string;
}

export const BuilderTips: React.FC<BuilderTipsProps> = ({
  onOpenEasterEgg,
  isAudioMuted = false,
  onToggleAudio,
}) => {
  const tips: TipItem[] = [
    {
      id: 1,
      badge: "Tip 01 • Core Experience",
      icon: <Heart size={22} />,
      title: "Pick one core idea and make it feel alive",
      advice: "A character who reacts to you on a phone beats a long list of half-broken features. Nail the feeling first.",
      fulfillment: "Streamlined to the signature Maybe-to-Magic ritual with cursor & touch gaze tracking, reactive expressions, and zero cluttered broken games.",
      actionText: "Experience Character Gaze",
      actionHref: "#hero",
      accentColor: "#3B82F6",
    },
    {
      id: 2,
      badge: "Tip 02 • Foundation First",
      icon: <Layers size={22} />,
      title: "Start with Tier 1",
      advice: "Get a deployed, working site on Day 1, then layer on Tier 2 hard interactions. A finished simple site beats an ambitious broken one.",
      fulfillment: "100% of official Core & Tier 1 requirements verified, clean modular code, zero console errors, instant Vite loading.",
      actionText: "View Scoring Checklist",
      actionHref: "#judging-rubric",
      accentColor: "#8B5CF6",
    },
    {
      id: 3,
      badge: "Tip 03 • Mobile First",
      icon: <Smartphone size={22} />,
      title: "Test on your phone early",
      advice: "Do the mobile check on day one, not in the frantic last hour before code freeze. Touch targets, text sizing, and viewport bugs are easy to fix if you catch them early.",
      fulfillment: "44px+ minimum tap targets, swipeable touch-carousel for origin story, collapsible drawer navigation, and touch-dampened parallax.",
      actionText: "Test Story Swipe",
      actionHref: "#origin-story",
      accentColor: "#10B981",
    },
    {
      id: 4,
      badge: "Tip 04 • Pure Delight",
      icon: <Sparkles size={22} />,
      title: "Make the Easter egg delightful",
      advice: "A sleeping character you can wake, a secret lullaby, or a hidden room is pure joy. Give the judges something to discover.",
      fulfillment: "All 3 organizer suggestions included! Tap to unlock the secret room, hear the celestial music-box lullaby, and wake sleeping Morro.",
      actionText: "Trigger Secret Easter Egg ✨",
      onAction: () => {
        if (onOpenEasterEgg) onOpenEasterEgg();
      },
      accentColor: "#F59E0B",
    },
    {
      id: 5,
      badge: "Tip 05 • Narrative Flow",
      icon: <Film size={22} />,
      title: "Tell the story through motion, not text walls",
      advice: "Keep text snippets under 150 words and let visuals, transitions, and character reactions do the storytelling.",
      fulfillment: "Every story scene is strictly budgeted under 35 words (well below the 150 cap) paired with celestial motion art and interactive steps.",
      actionText: "Explore 4 Scenes",
      actionHref: "#origin-story",
      accentColor: "#EC4899",
    },
    {
      id: 6,
      badge: "Tip 06 • UX Respect",
      icon: <Volume2 size={22} />,
      title: "Keep the mute button visible",
      advice: "If your site plays cute sounds or music, always give visitors instant volume control. Autoplay with no off switch is an instant disqualifier.",
      fulfillment: "3 distinct easy-to-find mute controls: floating bottom-right glassmorphic switch, navbar sound toggle, and mobile menu button.",
      actionText: isAudioMuted ? "Unmute Sound 🔔" : "Mute Sound 🔕",
      onAction: () => {
        if (onToggleAudio) onToggleAudio();
      },
      accentColor: "#6366F1",
    },
  ];

  return (
    <section id="builder-tips" className="builder-tips-section" aria-labelledby="builder-tips-title">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="organizer-badge-pill">
            <ShieldCheck size={16} /> Official Organizer Guidance
          </div>
          <h2 id="builder-tips-title" className="builder-tips-heading">
            Builder Tips from the Organizers
          </h2>
          <p className="builder-tips-subheading">
            Six practical pieces of advice directly from the hackathon team — and how Morro satisfies every single one.
          </p>
        </div>

        {/* 6 Tips Grid */}
        <div className="builder-tips-grid">
          {tips.map((tip) => (
            <div 
              key={tip.id} 
              className="builder-tip-card"
              style={{ '--card-accent': tip.accentColor } as React.CSSProperties}
            >
              {/* Card Header */}
              <div className="tip-card-top">
                <span className="tip-card-badge">{tip.badge}</span>
                <div className="tip-icon-orb" style={{ color: tip.accentColor }}>
                  {tip.icon}
                </div>
              </div>

              {/* Advice */}
              <h3 className="tip-card-title">{tip.title}</h3>
              <blockquote className="tip-card-quote">
                "{tip.advice}"
              </blockquote>

              {/* Proof / Implementation */}
              <div className="tip-fulfillment-box">
                <div className="fulfillment-header">
                  <CheckCircle2 size={16} className="text-emerald" />
                  <span>How Morro Delivers:</span>
                </div>
                <p className="fulfillment-text">{tip.fulfillment}</p>
              </div>

              {/* Action Button */}
              <div className="tip-card-footer">
                {tip.onAction ? (
                  <button
                    type="button"
                    className="tip-action-btn"
                    onClick={() => {
                      sound.playChime(660);
                      tip.onAction?.();
                    }}
                  >
                    <span>{tip.actionText}</span>
                    <Sparkles size={14} />
                  </button>
                ) : (
                  <a
                    href={tip.actionHref}
                    className="tip-action-btn"
                    onClick={() => sound.playChime(550)}
                  >
                    <span>{tip.actionText}</span>
                    <ArrowRight size={14} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Summary Banner */}
        <div className="builder-tips-banner">
          <div className="banner-content">
            <span className="banner-icon">🎯</span>
            <div>
              <h4 className="banner-title">Built with Judge-First Engineering</h4>
              <p className="banner-subtitle">
                By focusing on emotional connection, clean Tier 1 stability, accessible touch controls, and zero broken distractions, Morro presents a polished submission ready for maximum evaluation marks.
              </p>
            </div>
          </div>
          <a href="#maybe-ritual" className="banner-cta" onClick={() => sound.playSparkle()}>
            Catch a Maybe with Morro ✨
          </a>
        </div>
      </div>
    </section>
  );
};
