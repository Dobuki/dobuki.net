import React from 'react';
import { Link } from 'react-router-dom';

const navStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  gap: '2rem',
  padding: '1rem 0',
  background: 'rgba(24,18,43,0.7)',
  zIndex: 2000,
  fontFamily: 'Orbitron, sans-serif',
  fontSize: '1.2rem',
  letterSpacing: '0.1em',
};

const linkStyle: React.CSSProperties = {
  color: '#3a4a5a', // muted blue-gray
  textShadow: 'none',
  textDecoration: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '8px',
  transition: 'background 0.2s, color 0.2s, text-shadow 0.2s',
  fontWeight: 700,
  position: 'relative',
  outline: 'none',
};

interface Props {
  sections: [string, string][]
}

export default function Navbar({ sections }: Props) {
  // Add neon glow on hover/focus only
  const [hovered, setHovered] = React.useState<string | null>(null);
  return (
    <nav style={navStyle}>
      {sections.map(([to, label]) => (
        <Link
          key={to}
          to={to}
          style={{
            ...linkStyle,
            color: hovered === to ? '#00fff7' : linkStyle.color,
            textShadow:
              hovered === to
                ? '0 0 24px #00fff7, 0 0 48px #00fff7, 0 0 64px #00fff7, 0 0 96px #00fff7'
                : linkStyle.textShadow,
          }}
          onMouseEnter={() => setHovered(to)}
          onMouseLeave={() => setHovered(null)}
          onFocus={() => setHovered(to)}
          onBlur={() => setHovered(null)}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
} 
