import React from 'react';
import { Award, CheckCircle2, Sparkles } from 'lucide-react';
import './JudgingRubric.css';

interface RubricCard {
  percent: string;
  title: string;
  description: string;
  proofList: string[];
  colorClass: string;
}

export const JudgingRubric: React.FC = () => {
  const cards: RubricCard[] = [
    {
      percent: "35%",
      title: "Functionality & Polish",
      description: "Working buttons, smooth interactions, zero console errors, clean state management.",
      proofList: [
        "Zero console errors & clean TypeScript build",
        "Maybe input validation with fallback prompts",
        "Full keyboard & modal focus trapping",
      ],
      colorClass: "rubric-card-35",
    },
    {
      percent: "30%",
      title: "Early-Web Soul",
      description: "Playful 90s/00s whimsy, distinct creative personality, feeling like a real cozy web place.",
      proofList: [
        "Custom celestial star cursor & sparkle trail",
        "Vintage 90s hit counter odometer embedded",
        "Cozy Starlight Guestbook with stamp collection",
      ],
      colorClass: "rubric-card-30",
    },
    {
      percent: "20%",
      title: "Creativity & Surprises",
      description: "Easter eggs, unexpected toys, fresh storytelling, and creative twists.",
      proofList: [
        "Secret Sparky 3-tap hidden Easter egg modal",
        "Nightlight flashlight beam in night mode",
        "Interactive petting with purr & giggle audio",
      ],
      colorClass: "rubric-card-20",
    },
    {
      percent: "15%",
      title: "Clean Craft",
      description: "Mobile responsiveness, fast rendering, accessible controls, tidy code.",
      proofList: [
        "Crisp responsiveness down to 320px screens",
        "Web Audio API synth (zero heavy mp3 files)",
        "Semantic HTML5 & clean component architecture",
      ],
      colorClass: "rubric-card-15",
    },
  ];

  return (
    <section id="judging-rubric" className="judging-rubric-section">
      <div className="container">
        {/* Header matching the official sheet */}
        <div className="judging-header">
          <div className="celestial-badge gold-badge">
            <Award size={14} fill="#F59E0B" /> Official Evaluation Standards
          </div>
          <h2 className="judging-title">Judging Rubric</h2>
          <p className="judging-subtitle">
            Both tracks are judged on the same rubric and compete on one shared leaderboard.
          </p>
        </div>

        {/* 4 Rubric Cards Grid */}
        <div className="judging-cards-grid">
          {cards.map((card, idx) => (
            <div key={idx} className={`judging-rubric-card ${card.colorClass}`}>
              <div className="rubric-percent-tag">{card.percent}</div>
              <h3 className="rubric-card-title">{card.title}</h3>
              <p className="rubric-card-description">{card.description}</p>

              <div className="rubric-proof-box">
                <span className="proof-box-header">
                  <Sparkles size={12} className="text-gold" />
                  <span>Morro's Fulfillment:</span>
                </span>
                <ul className="proof-list">
                  {card.proofList.map((proof, pIdx) => (
                    <li key={pIdx} className="proof-item">
                      <CheckCircle2 size={12} className="text-check" />
                      <span>{proof}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
