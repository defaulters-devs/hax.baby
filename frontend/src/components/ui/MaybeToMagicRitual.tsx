import React, { useState } from 'react';
import { Sparkles, ArrowRight, Cloud, Copy, Check, Heart, RotateCcw, ShieldAlert } from 'lucide-react';
import { transmuteMaybeTask } from '../../utils/taskTransmuter';
import { sound } from '../../utils/audio';
import { fireStarConfetti } from '../../utils/confetti';
import { SectionSparkleCrown, CardCuteStarPin } from './CuteSparkleElements';
import './MaybeToMagicRitual.css';

interface TransmutedState {
  originalText: string;
  category: string;
  encouragement: string;
  microStep: string;
}

export const MaybeToMagicRitual: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isCatching, setIsCatching] = useState(false);
  const [result, setResult] = useState<TransmutedState | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isReadyStarted, setIsReadyStarted] = useState(false);

  const samplePrompts = [
    "Finish my math assignment",
    "Clean the messy corner of my desk",
    "Write the first paragraph of my essay",
    "Reply to that lingering email",
    "Drink a glass of water and stretch",
  ];

  const handleCatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = inputText.trim();

    if (!text) {
      setErrorMsg("Please enter what you've been putting off — Morro is ready to hold it with zero guilt!");
      sound.playChime(350);
      return;
    }

    setErrorMsg('');
    setIsCatching(true);
    sound.playCatch();

    const transmuted = transmuteMaybeTask(text);

    setTimeout(() => {
      setIsCatching(false);
      setResult({
        originalText: text,
        category: transmuted.category,
        encouragement: transmuted.encouragement,
        microStep: transmuted.microStep,
      });
      setIsReadyStarted(false);
      setIsCopied(false);
      sound.playSparkle();
    }, 600);
  };

  const handleSelectSample = (sample: string) => {
    sound.playChime(600);
    setInputText(sample);
    setErrorMsg('');
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(`First step: ${result.microStep} ("${result.encouragement}")`);
    setIsCopied(true);
    sound.playChime(750);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleReadyToStart = () => {
    sound.playFanfare();
    fireStarConfetti();
    setIsReadyStarted(true);
  };

  const handleReset = () => {
    sound.playChime(500);
    setInputText('');
    setResult(null);
    setIsReadyStarted(false);
    setErrorMsg('');
  };

  return (
    <section id="ritual" className="ritual-section">
      <div className="container">
        <div className="section-header">
          <SectionSparkleCrown label="Signature Ritual ✦ Transmutation" />
          <div className="celestial-badge gold-badge">
            <Sparkles size={14} fill="#F59E0B" /> The Signature Transmutation
          </div>
          <h2>The Maybe-to-Magic Ritual</h2>
          <p>
            Catch a Maybe. Let Morro dissolve the hesitation. Receive your one tiny step today.
          </p>
        </div>

        <div className="ritual-altar-card">
          <CardCuteStarPin text="Celestial Pouch" glyph="🎒⭐" />
          {!result ? (
            /* Input & Catching Stage */
            <div className="ritual-pane input-pane">
              <div className="catcher-visual-stage">
                <div className={`floating-maybe-cloud ${isCatching ? 'absorbing' : ''}`}>
                  <Cloud size={46} className="cloud-icon" />
                  <span className="cloud-label">"Maybe tomorrow..."</span>
                </div>
                <div className="morro-pouch-target">
                  <span className="target-bag">🎒 Morro's Enchanted Pouch</span>
                </div>
              </div>

              <div className="catcher-input-box">
                <h3>Which work are you delaying for tomorrow?</h3>
                <p className="catcher-subcopy">
                  Tell me that task you've been putting off, and Morro will help you transform it into a tiny, achievable step for today.
                </p>

                <form onSubmit={handleCatchSubmit} className="catcher-form">
                  <div className="input-group-row">
                    <input
                      type="text"
                      className="maybe-task-input"
                      placeholder="e.g. Finish my chemistry lab report, clean my desk..."
                      value={inputText}
                      onChange={(e) => {
                        setInputText(e.target.value);
                        if (errorMsg) setErrorMsg('');
                      }}
                      maxLength={140}
                    />
                    <button
                      type="submit"
                      className="catch-action-btn"
                      disabled={isCatching}
                    >
                      <span>Catch the Maybe</span>
                      <ArrowRight size={18} />
                    </button>
                  </div>

                  {errorMsg && (
                    <div className="ritual-error-msg" role="alert">
                      <ShieldAlert size={16} />
                      <span>{errorMsg}</span>
                    </div>
                  )}
                </form>

                <div className="sample-suggestions-row">
                  <span className="sample-label">Or choose an inspiration:</span>
                  <div className="sample-chips">
                    {samplePrompts.map((sample, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="sample-chip-btn"
                        onClick={() => handleSelectSample(sample)}
                      >
                        {sample}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Result & Action Stage */
            <div className="ritual-pane result-pane">
              <div className="transformation-header">
                <div className="celestial-badge gold-badge">
                  <Sparkles size={14} fill="#F59E0B" /> Postponement Safely Transmuted
                </div>
                <h3>Morro's Starlight Guidance</h3>
              </div>

              <div className="transmuted-cards-layout">
                {/* Original Postponed Intent */}
                <div className="transmuted-card original">
                  <div className="card-tag">What you were holding:</div>
                  <div className="original-intent-text">"{result.originalText}"</div>
                  <div className="card-status-note">Status: Caught in Morro's pouch 🎒</div>
                </div>

                {/* Transmuted Micro-Step */}
                <div className="transmuted-card solution">
                  <div className="card-tag solution-tag">Your One Achievable Step Today:</div>
                  <div className="microstep-text">{result.microStep}</div>
                  <div className="encouragement-quote">
                    <em>Morro whispers:</em> "{result.encouragement}"
                  </div>
                </div>
              </div>

              {/* Ready Confirmation Banner */}
              {isReadyStarted && (
                <div className="ready-celebration-banner">
                  <div className="banner-icon"><Heart size={20} fill="#EC4899" color="#EC4899" /></div>
                  <div>
                    <strong>Morro is cheering for you!</strong>
                    <p>Go take that tiny first step right now. You've got this! 🐾✨</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="ritual-result-actions">
                {!isReadyStarted ? (
                  <button
                    type="button"
                    className="ritual-btn-primary"
                    onClick={handleReadyToStart}
                  >
                    <Sparkles size={18} />
                    <span>I'm Ready to Start!</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="ritual-btn-primary ready-done"
                    disabled
                  >
                    <Check size={18} />
                    <span>Momentum Activated!</span>
                  </button>
                )}

                <button
                  type="button"
                  className="ritual-btn-secondary"
                  onClick={handleCopy}
                >
                  {isCopied ? <Check size={16} /> : <Copy size={16} />}
                  <span>{isCopied ? "Copied Step!" : "Copy First Step"}</span>
                </button>

                <button
                  type="button"
                  className="ritual-btn-ghost"
                  onClick={handleReset}
                >
                  <RotateCcw size={16} />
                  <span>Catch Another Maybe</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
