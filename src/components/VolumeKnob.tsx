import React, { useRef, useState, useEffect } from 'react';

const audioSrc = '/assets/beep-bop-sci-fi.mp3';

const VolumeKnob: React.FC = () => {
  const [volume, setVolume] = useState(0);
  const [active, setActive] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioSrc);
      audioRef.current.loop = true;
    }
  }, []);

  // Handle volume changes and playback
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    if (volume > 0) {
      if (audio.paused) {
        audio.play();
      }
    } else {
      audio.pause();
    }
  }, [volume]);

  // Speaker emoji: on if volume > 0, off if 0
  const speakerEmoji = volume > 0 ? '🔊' : '🔇';

  // Horizontal knob UI at the top right, faded when not active
  return (
    <div
      style={{
        position: 'fixed',
        right: 12,
        top: 12,
        zIndex: 3000,
        background: 'rgba(24,18,43,0.8)',
        borderRadius: 16,
        padding: '12px 24px',
        boxShadow: '0 2px 16px #0008',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        opacity: active ? 1 : 0.5,
        transition: 'opacity 0.3s',
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      tabIndex={-1}
    >
      <span style={{ fontSize: 22, marginRight: 8 }}>{speakerEmoji}</span>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={e => setVolume(Number(e.target.value))}
        style={{
          width: 100,
          accentColor: '#00fff7',
        }}
        aria-label="Volume knob"
      />
    </div>
  );
};

export default VolumeKnob; 
