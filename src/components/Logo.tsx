import React from 'react';

interface LogoProps {
  variant?: 'green' | 'white' | 'dark';
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showIconOnly?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'green',
  showTagline = true,
  size = 'md',
  className = '',
  showIconOnly = false
}) => {
  const isWhite = variant === 'white';
  const textColor = isWhite ? '#FFFFFF' : '#0C3C2C';
  const taglineColor = isWhite ? '#D5E6DE' : '#574A46';

  const iconHeights = {
    sm: 30,
    md: 40,
    lg: 52
  };

  const titleSizes = {
    sm: '1.15rem',
    md: '1.45rem',
    lg: '1.95rem'
  };

  const tagSizes = {
    sm: '0.65rem',
    md: '0.75rem',
    lg: '0.85rem'
  };

  const h = iconHeights[size];
  const w = Math.round(h * (260 / 310));
  const svgSrc = isWhite 
    ? '/svg/botanical_circuit_logo_white.svg' 
    : '/svg/botanical_circuit_logo.svg';

  return (
    <div 
      className={`inline-flex items-center gap-3 select-none ${className}`} 
      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}
    >
      {/* Botanical Circuit SVG Logo directly loaded from /svg folder */}
      <img
        src={svgSrc}
        alt="Pananim Logo"
        width={w}
        height={h}
        style={{
          width: `${w}px`,
          height: `${h}px`,
          flexShrink: 0,
          objectFit: 'contain',
          display: 'block'
        }}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = isWhite
            ? 'https://raw.githubusercontent.com/mhaithan-lee/pananim/main/svg/botanical_circuit_logo_white.svg'
            : 'https://raw.githubusercontent.com/mhaithan-lee/pananim/main/svg/botanical_circuit_logo.svg';
        }}
      />

      {!showIconOnly && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontFamily: 'var(--font-headings)',
              fontWeight: 800,
              fontSize: titleSizes[size],
              color: textColor,
              lineHeight: 1.1,
              letterSpacing: '-0.02em'
            }}
          >
            Pananim
          </span>
          {showTagline && (
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: tagSizes[size],
                fontWeight: 500,
                color: taglineColor,
                letterSpacing: '0.01em',
                marginTop: '0.1rem'
              }}
            >
              Bridging Farms &amp; Markets
            </span>
          )}
        </div>
      )}
    </div>
  );
};
