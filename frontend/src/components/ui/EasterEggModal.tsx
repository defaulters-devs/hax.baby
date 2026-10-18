import React, { useState, useEffect } from 'react';
import { X, Sparkles, Heart, Star, Coffee, Moon, Music, Sun } from 'lucide-react';
import { sound } from '../../utils/audio';
import { fireStarConfetti } from '../../utils/confetti';
import './EasterEggModal.css';

interface EasterEggModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAwardSecretStar: () => void;
}

export const EasterEggModal: React.FC<EasterEggModalProps> = ({
  isOpen,
  onClose,
  onAwardSecretStar,
}) => {
  const [isSleeping, setIsSleeping] = useState<boolean>(true);
  const [teaSipped, setTeaSipped] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      sound.playLullaby();
      fireStarConfetti();
      onAwardSecretStar();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose, onAwardSecretStar]);

  if (!isOpen) return null;

  const handleWakeCharacter = () => {
    setIsSleeping(false);
    sound.playGiggle();
    sound.playSparkle();
    fireStarConfetti();
  };

  const handleSleepCharacter = () => {
    setIsSleeping(true);
    sound.playLullaby();
  };

  const handleSipTea = () => {
    setTeaSipped(true);
    sound.playChime(784);
    setTimeout(() => sound.playSparkle(), 150);
  };

  return (
    <div className="easter-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="egg-title">
      <div className="easter-modal-card" onClick={(e) => e.stopPropagation()}>
        <button 
          type="button"
          className="easter-modal-close" 
          onClick={() => {
            sound.playChime(440);
            onClose();
          }}
          aria-label="Close Secret Chamber"
        >
          <X size={18} />
        </button>

        {/* Fixed Charming Header */}
        <div className="easter-modal-header">
          <div className="easter-header-top-row">
            <div className="celestial-badge gold-badge">
              <Star size={13} fill="#F59E0B" /> Secret Discovery Unlocked
            </div>
          </div>
          <div className="easter-header-title-wrap">
            <div className="easter-icon-bubble">
              <Sparkles size={22} className="spin-slow" />
            </div>
            <div>
              <h3 id="egg-title">Morro & Sparky's Midnight Tea Party</h3>
              <p className="easter-subtitle">You found the secret 3-tap starlight discovery! 🪽☕✨</p>
            </div>
          </div>
        </div>

        {/* Smooth Scrollable Body (prevents top/bottom viewport clipping) */}
        <div className="easter-modal-body">
          {/* Interactive Sleeping / Waking Toy */}
          <div className={`easter-sleeper-box ${isSleeping ? 'is-asleep' : 'is-awake'}`}>
            <div className="sleeper-visual">
              {isSleeping ? (
                <div className="sleeping-morro">
                  <div className="snore-bubbles">
                    <span className="snore-z z1">z</span>
                    <span className="snore-z z2">Z</span>
                    <span className="snore-z z3">Z</span>
                  </div>
                  <div className="sleeping-avatar">
                    <Moon className="sleeping-moon-icon" size={34} />
                    <span className="sleeping-emoji">😴</span>
                    <span className="sleeping-tag">Morro is napping on a star cloud...</span>
                  </div>
                </div>
              ) : (
                <div className="awake-morro">
                  <div className="awake-sparkles">✨ 🐾 ✨</div>
                  <div className="awake-avatar">
                    <Sun className="awake-sun-icon" size={34} />
                    <span className="awake-emoji">🦊✨</span>
                    <span className="awake-tag">
                      {teaSipped ? 'Morro is glowing with Starlight Tea! ☕💖' : 'Morro is awake and delighted to see you!'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="sleeper-actions">
              {isSleeping ? (
                <>
                  <button 
                    type="button"
                    className="sleeper-action-btn wake-btn"
                    onClick={handleWakeCharacter}
                  >
                    <Sparkles size={15} /> Gently Wake Morro 🐾
                  </button>
                  <button 
                    type="button"
                    className="sleeper-action-btn lullaby-btn"
                    onClick={() => sound.playLullaby()}
                    title="Play the celestial music-box lullaby"
                  >
                    <Music size={15} /> Play Lullaby 🎶
                  </button>
                </>
              ) : (
                <>
                  <button 
                    type="button" 
                    className={`sleeper-action-btn tea-btn ${teaSipped ? 'sipped' : ''}`}
                    onClick={handleSipTea}
                  >
                    <Coffee size={15} /> {teaSipped ? 'Cup Sipped! (+100 Energy) ✨' : 'Share Starlight Tea ☕'}
                  </button>
                  <button 
                    type="button" 
                    className="sleeper-action-btn tuck-btn"
                    onClick={handleSleepCharacter}
                  >
                    <Moon size={15} /> Sing Lullaby to Sleep 🌙
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="easter-secret-scroll">
            <div className="scroll-seal">✦ THE STAR PRINCE'S PROMISE ✦</div>
            <p>
              "Whenever you feel stuck, remember that stars don't shine because they try hard. They shine simply by being themselves. Even the smallest two-minute effort today sends ripples across galaxies."
            </p>
            <div className="scroll-signature">— Morro & Sparky 🐾✨</div>
          </div>

          <div className="easter-rewards-box">
            <h4>Your Secret Rewards:</h4>
            <ul>
              <li>
                <div className="reward-icon-wrap amber">
                  <Coffee size={16} />
                </div>
                <div className="reward-text-wrap">
                  <strong>Starlight Tea Blessing</strong>
                  <span>+100 Cosiness and Fresh Momentum</span>
                </div>
              </li>
              <li>
                <div className="reward-icon-wrap gold">
                  <Star size={16} />
                </div>
                <div className="reward-text-wrap">
                  <strong>Celestial Star Node</strong>
                  <span>Added "The Sparky Constellation Star" to your chart</span>
                </div>
              </li>
              <li>
                <div className="reward-icon-wrap pink">
                  <Heart size={16} />
                </div>
                <div className="reward-text-wrap">
                  <strong>Secret Companion Badge</strong>
                  <span>Official Lifetime Friend of the SHiko Clan</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Docked Action Footer */}
        <div className="easter-modal-footer">
          <button 
            type="button"
            className="easter-primary-btn"
            onClick={() => {
              sound.playSparkle();
              onClose();
            }}
          >
            Thank You, Morro & Sparky! ✨
          </button>
        </div>
      </div>
    </div>
  );
};
