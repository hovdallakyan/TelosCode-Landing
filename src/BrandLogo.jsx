import React from 'react';

/** TelosCode wordmark only: TELOS / CODE */
export default function BrandLogo({ className = '' }) {
  return (
    <span className={`brand-logo ${className}`.trim()}>
      <span className="brand-word">
        <span className="brand-telos">TELOS</span>
        <svg
          className="brand-slash"
          viewBox="0 0 8 20"
          fill="none"
          aria-hidden="true"
        >
          {/* Same lean as favicon: ~18° from vertical, top-left → bottom-right */}
          <path
            d="M2.2 1.5 L5.8 18.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
        <span className="brand-code">CODE</span>
      </span>
    </span>
  );
}
