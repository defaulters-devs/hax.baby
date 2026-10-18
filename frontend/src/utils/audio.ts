// Web Audio API Synthesizer for Morro's Starbound Workshop
// Zero external mp3 dependencies, lightweight, responsive, and respectful of mute settings.

class SoundEngine {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;

  constructor() {
    // Check initial mute state from localStorage or default to false
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('morro_audio_muted');
      this.muted = saved === 'true';
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public setMuted(muted: boolean) {
    this.muted = muted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('morro_audio_muted', String(muted));
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.muted);
    if (!this.muted) {
      this.playChime(660);
    }
    return this.muted;
  }

  // Play a soft crystal star chime
  public playChime(freq = 880) {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.15);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch (_e) {
      void _e;
    }
  }

  // Play a cascade of stardust sparkles
  public playSparkle() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C5, E5, G5, C6, E6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        if (this.muted || !this.ctx) return;
        try {
          const now = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now);
          osc.stop(now + 0.25);
        } catch (_e) {
          void _e;
        }
      }, idx * 55);
    });
  }

  // Sound when a Maybe is caught into Morro's pouch
  public playCatch() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.3);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.5);

      setTimeout(() => this.playSparkle(), 200);
    } catch (_e) {
      void _e;
    }
  }

  // Celebration fanfare when a star is officially earned
  public playFanfare() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    const chords = [
      { f: 523.25, delay: 0 },
      { f: 659.25, delay: 80 },
      { f: 783.99, delay: 160 },
      { f: 1046.50, delay: 240 },
      { f: 1318.51, delay: 360 },
      { f: 1567.98, delay: 480 },
    ];

    chords.forEach(({ f, delay }) => {
      setTimeout(() => {
        if (this.muted || !this.ctx) return;
        try {
          const now = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now);

          gain.gain.setValueAtTime(0.12, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now);
          osc.stop(now + 0.7);
        } catch (_e) {
          void _e;
        }
      }, delay);
    });
  }

  // Sparky's cheerful chirp
  public playGiggle() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, now);
      osc.frequency.exponentialRampToValueAtTime(1318.51, now + 0.1);
      osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.2);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch (_e) {
      void _e;
    }
  }

  // Music-box lullaby melody for the secret Easter egg
  public playLullaby() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    const notes = [
      { f: 523.25, time: 0 },
      { f: 523.25, time: 300 },
      { f: 783.99, time: 600 },
      { f: 783.99, time: 900 },
      { f: 880.00, time: 1200 },
      { f: 880.00, time: 1500 },
      { f: 783.99, time: 1800 },
    ];

    notes.forEach(({ f, time }) => {
      setTimeout(() => {
        if (this.muted || !this.ctx) return;
        try {
          const now = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now);

          gain.gain.setValueAtTime(0.09, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now);
          osc.stop(now + 0.5);
        } catch (_e) {
          void _e;
        }
      }, time);
    });
  }

  // Side Quest 4: Baby Rattle Shaker (Multi-click bursts)
  public playRattle() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    const clicks = [0, 45, 90, 140];
    clicks.forEach((delay) => {
      setTimeout(() => {
        if (this.muted || !this.ctx) return;
        try {
          const now = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(1400 + Math.random() * 400, now);
          osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);

          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now);
          osc.stop(now + 0.04);
        } catch (_e) {
          void _e;
        }
      }, delay);
    });
  }

  // Side Quest 4: Bubble Pop Click (for stickers, chips, pills)
  public playPop() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(700, now);
      osc.frequency.exponentialRampToValueAtTime(250, now + 0.08);

      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (_e) {
      void _e;
    }
  }

  // Side Quest 4: Gentle Baby Purr (when petting Morro)
  public playPurr() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.linearRampToValueAtTime(130, now + 0.2);
      osc.frequency.linearRampToValueAtTime(105, now + 0.4);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.4);
    } catch (_e) {
      void _e;
    }
  }

  // Side Quest 4: Soft Wind Chime (for scene transitions)
  public playWindChime() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    const chimeFreqs = [784, 880, 1046.5, 1174.66, 1318.51];
    chimeFreqs.forEach((freq, i) => {
      setTimeout(() => {
        if (this.muted || !this.ctx) return;
        try {
          const now = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.07, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now);
          osc.stop(now + 0.6);
        } catch (_e) {
          void _e;
        }
      }, i * 65);
    });
  }
}

export const sound = new SoundEngine();
