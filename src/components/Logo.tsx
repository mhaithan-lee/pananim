import React from 'react';

interface LogoProps {
  variant?: 'green' | 'white' | 'dark';
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'green',
  showTagline = true,
  size = 'md',
  className = ''
}) => {
  const iconColor = variant === 'white' ? '#FFFFFF' : '#0C3C2C';
  const textColor = variant === 'white' ? '#FFFFFF' : '#0C3C2C';
  const taglineColor = variant === 'white' ? '#D5E6DE' : '#574A46';

  const iconSizes = {
    sm: 28,
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

  return (
    <div className={`flex items-center gap-3 select-none ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
      {/* Circuit Tree Sprout SVG matching the Pananim brand sheet exactly */}
      <svg
        width={iconSizes[size]}
        height={iconSizes[size]}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        {/* Left Leaf Outline */}
        <path
          d="M44 54 C32 53 16 45 12 34 C10 24 22 20 34 26 C42 32 45 44 46 54"
          stroke={iconColor}
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Left Leaf Inner Circuit Trace */}
        <path
          d="M40 50 L28 38 L22 38"
          stroke={iconColor}
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <circle cx="20" cy="38" r="3.2" fill={iconColor} />

        {/* Center Leaf Outline */}
        <path
          d="M47 54 C42 42 38 28 50 14 C62 28 58 42 53 54"
          stroke={iconColor}
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Center Leaf Inner Circuit Fork */}
        <path
          d="M50 52 L50 34 L45 28"
          stroke={iconColor}
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <circle cx="43" cy="27" r="3" fill={iconColor} />
        <path
          d="M50 34 L56 26"
          stroke={iconColor}
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <circle cx="58" cy="25" r="3" fill={iconColor} />

        {/* Right Leaf Outline */}
        <path
          d="M56 54 C68 53 84 45 88 34 C90 24 78 20 66 26 C58 32 55 44 54 54"
          stroke={iconColor}
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Right Leaf Inner Circuit Trace */}
        <path
          d="M60 50 L72 38 L78 38"
          stroke={iconColor}
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <circle cx="80" cy="38" r="3.2" fill={iconColor} />

        {/* Trunk & Left Root Sweep */}
        <path
          d="M44 54 C44 68 34 82 16 82"
          stroke={iconColor}
          strokeWidth="3.6"
          strokeLinecap="round"
        />

        {/* Trunk Middle-Left Vertical Trace with Terminal Node */}
        <path
          d="M49 55 L49 74"
          stroke={iconColor}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="49" cy="76" r="3.2" fill={iconColor} />

        {/* Trunk & Right Root Sweep */}
        <path
          d="M54 54 C54 68 62 82 78 82"
          stroke={iconColor}
          strokeWidth="3.6"
          strokeLinecap="round"
        />

        {/* Right Branch Inner Circuit Trace & Node */}
        <path
          d="M57 62 C62 67 65 70 68 70"
          stroke={iconColor}
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <circle cx="69" cy="70" r="3" fill={iconColor} />

        {/* Standalone Terminal Dot on Far Right Root Baseline */}
        <circle cx="85" cy="82" r="3.2" fill={iconColor} />
      </svg>

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
    </div>
  );
};
