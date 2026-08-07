import React from 'react';

/** TelosCode mark: open stripe globe (no circle) + wordmark */
export default function BrandLogo({ className = '' }) {
  return (
    <span className={`brand-logo ${className}`.trim()}>
      <svg
        className="brand-mark-svg"
        viewBox="12 14 56 52"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="brand-stripe"
            x1="16"
            y1="16"
            x2="64"
            y2="64"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#5eead4" />
            <stop offset="1" stopColor="#7c6cf0" />
          </linearGradient>
        </defs>
        {[18, 24, 30, 36, 42, 48, 54, 60].map((y, i) => {
          const t = (y - 18) / 42;
          const curve = Math.sin(t * Math.PI);
          const inset = 8 + (1 - curve) * 14;
          const width = 80 - inset * 2;
          return (
            <rect
              key={y}
              x={inset + (i % 2) * 2}
              y={y}
              width={width - (i % 2) * 4}
              height="3.5"
              rx="1"
              fill="url(#brand-stripe)"
              opacity={0.55 + (i % 4) * 0.12}
            />
          );
        })}
      </svg>
      <span className="brand-word">
        <span className="brand-telos">TELOS</span>
        <i className="brand-slash" aria-hidden="true" />
        <span className="brand-code">CODE</span>
      </span>
    </span>
  );
}
