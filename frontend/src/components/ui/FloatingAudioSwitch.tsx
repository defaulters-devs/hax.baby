import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import './FloatingAudioSwitch.css';

interface FloatingAudioSwitchProps {
  isMuted: boolean;
  onToggleMute: () => void;
}

export const FloatingAudioSwitch: React.FC<FloatingAudioSwitchProps> = ({
  isMuted,
  onToggleMute,
}) => {
  return (
    <div className="floating-audio-anchor" role="region" aria-label="Interactive Controls">

      {/* Side Quest 4: Sound Mute/Unmute Toggle (+3 pts) */}
      <button
        type="button"
        className={`floating-audio-pill ${isMuted ? 'state-muted' : 'state-active'}`}
        onClick={onToggleMute}
        title={isMuted ? "Sound is Muted — Click to Unmute" : "Sound is Active — Click to Mute"}
        aria-label={isMuted ? "Unmute sound chimes" : "Mute sound chimes"}
      >
        <span className="floating-audio-icon">
          {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
        </span>
        <span className="floating-audio-label">
          {isMuted ? 'Muted' : 'Sound ON'}
        </span>
        <span className="floating-audio-dot" />
      </button>
    </div>
  );
};
