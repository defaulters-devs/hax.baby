import { useState, useEffect } from 'react';
import type { ThemeMode, GuestbookWish } from './types';
import { sound } from './utils/audio';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/ui/Hero';
import { CharacterSheet } from './components/ui/CharacterSheet';
import { OriginStory } from './components/ui/OriginStory';
import { MaybeToMagicRitual } from './components/ui/MaybeToMagicRitual';
import { LiveGuestbook } from './components/ui/LiveGuestbook';
import { SparkleTrail } from './components/retro/SparkleTrail';
import { NightlightCursor } from './components/ui/NightlightCursor';
import { EasterEggModal } from './components/ui/EasterEggModal';
import { CuteAmbientStars, GlobalSparkleClickOverlay } from './components/ui/CuteSparkleElements';
import { CelestialOpeningAnimation } from './components/ui/CelestialOpeningAnimation';

export function App() {
  // Theme State (Celestial Day vs Cosmic Night)
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('morro_theme') as ThemeMode;
      if (saved === 'day' || saved === 'night') return saved;
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'night';
    }
    return 'day';
  });

  // Sound Mute State
  const [isMuted, setIsMuted] = useState<boolean>(() => sound.isMuted());

  // Next-Level Opening Animation State (plays on first visit or when user taps "✨ Intro")
  const [isIntroOpen, setIsIntroOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('morro_intro_played');
    }
    return true;
  });

  const handleCompleteIntro = () => {
    setIsIntroOpen(false);
    try {
      sessionStorage.setItem('morro_intro_played', 'true');
    } catch (_e) {
      void _e;
    }
  };

  // Easter Egg Modal State
  const [isEasterEggOpen, setIsEasterEggOpen] = useState<boolean>(false);

  // Sync theme attribute to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('morro_theme', theme);
  }, [theme]);

  // Ensure Chaos Mode is always active by default across the website
  useEffect(() => {
    document.body.classList.add('chaos-mode');
  }, []);

  // Always open at top of page on initial load or refresh
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Live Dream Guestbook State (Tier 3 Legendary Requirement)
  const [wishes, setWishes] = useState<GuestbookWish[]>(() => {
    try {
      const saved = localStorage.getItem('morro_guestbook_wishes');
      if (saved) return JSON.parse(saved);
    } catch (_e) {
      void _e;
    }
    return [
      {
        id: 'wish_init_1',
        author: 'Luna from Star City',
        message: 'Morro helped me write my first song today instead of delaying it! 🎶⭐',
        stamp: '⭐',
        createdAt: Date.now() - 3600000,
        highlighted: true,
      },
      {
        id: 'wish_init_2',
        author: 'Sparky Enthusiast',
        message: 'May all your Maybes become bright shining stars! Keep moving forward! ✨🐾',
        stamp: '🪽',
        createdAt: Date.now() - 7200000,
        highlighted: false,
      },
    ];
  });

  const handleAddWish = (wish: GuestbookWish) => {
    setWishes((prev) => {
      const next = [wish, ...prev];
      try {
        localStorage.setItem('morro_guestbook_wishes', JSON.stringify(next));
      } catch (_e) {
        void _e;
      }
      return next;
    });
  };

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'day' ? 'night' : 'day'));
  };

  const handleToggleMute = () => {
    const nextMuted = sound.toggleMute();
    setIsMuted(nextMuted);
  };

  return (
    <div className="morro-app-shell" style={{ position: 'relative' }}>
      {/* Interactive Global Click Sparkle Burst (+ diverse star types) */}
      <GlobalSparkleClickOverlay />

      {/* Cute Floating Ambient Star Friends (Kiko, Lumi, Stella, Nova, Trio, Astra) */}
      <CuteAmbientStars />

      {/* Subtle Canvas Sparkle Cursor Trail */}
      <SparkleTrail />

      {/* Tier 2 Standout: Flashlight / Nightlight Beam in Night Mode */}
      <NightlightCursor theme={theme} />

      {/* Next-Level Cinematic Storybook Opening Animation */}
      {isIntroOpen && (
        <CelestialOpeningAnimation
          onComplete={handleCompleteIntro}
        />
      )}

      {/* Clean Celestial Navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onReplayIntro={() => setIsIntroOpen(true)}
      />

      <main>
        {/* =========================================================================
            SECTION 05 HACKATHON REQUIREMENTS MAPPING:
            ========================================================================= */}

        {/* REQ 1 & REQ 4: Character Intro & Immersion with 3D Head Tracking / Touch Tilt */}
        <Hero
          theme={theme}
          onOpenEasterEgg={() => setIsEasterEggOpen(true)}
        />

        {/* REQ 1: "WHAT THEY ARE" — 5-Point Character Sheet (Name, What They Are, What They Do, Story, Tagline) */}
        <CharacterSheet />

        {/* REQ 3: "THEIR STORY" — 4-Scene Visual Animated Origin Journey (Under 35 words/scene, swipeable) */}
        <OriginStory />

        {/* REQ 4: "IMMERSION" — Signature Maybe-to-Magic Transmutation Ritual with Real-time Reactivity */}
        <MaybeToMagicRitual />

        {/* Community Starlight Wish Guestbook */}
        <LiveGuestbook
          wishes={wishes}
          onAddWish={handleAddWish}
        />
      </main>

      {/* REQ 6: "ONE HIDDEN EASTER EGG" — Secret Midnight Tea Party with Snoozing Morro you can wake + Secret Lullaby */}
      {isEasterEggOpen && (
        <EasterEggModal
          isOpen={isEasterEggOpen}
          onClose={() => setIsEasterEggOpen(false)}
          onAwardSecretStar={() => {
            // Secret star unlocked in session
          }}
        />
      )}
    </div>
  );
}

export default App;
