import React from 'react';

/* Icon marks inspired by sphere / tech / network style */

function IconStripes({ id = 's', from = '#5eead4', to = '#7c6cf0' }) {
  const g = `sg-${id}`;
  return (
    <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={g} x1="16" y1="16" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      {/* Open stripe globe — no outer circle ring */}
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
            fill={`url(#${g})`}
            opacity={0.55 + (i % 4) * 0.12}
          />
        );
      })}
    </svg>
  );
}

function IconFingerprint({ id = 'f', from = '#5eead4', to = '#7c6cf0' }) {
  const g = `fg-${id}`;
  return (
    <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={g} x1="16" y1="16" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      {[10, 14, 18, 22, 26].map((r, i) => (
        <path
          key={r}
          d={`M${40 - r} 40 A${r} ${r} 0 0 1 ${40 + r * 0.85} ${40 - r * 0.4}`}
          stroke={`url(#${g})`}
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity={0.45 + i * 0.1}
        />
      ))}
      {[10, 14, 18, 22].map((r, i) => (
        <path
          key={`b${r}`}
          d={`M${40 + r * 0.2} ${40 + r * 0.75} A${r} ${r} 0 0 1 ${40 - r * 0.9} ${40 + r * 0.2}`}
          stroke={`url(#${g})`}
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity={0.4 + i * 0.1}
        />
      ))}
      <circle cx="40" cy="40" r="3" fill={`url(#${g})`} />
    </svg>
  );
}

function IconNetwork({ id = 'n', from = '#5eead4', to = '#7c6cf0' }) {
  const g = `ng-${id}`;
  const nodes = [
    [40, 16],
    [58, 24],
    [64, 42],
    [54, 58],
    [28, 60],
    [16, 44],
    [18, 26],
    [40, 40],
    [48, 34],
    [32, 48],
  ];
  const edges = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [6, 0],
    [7, 0],
    [7, 1],
    [7, 2],
    [7, 3],
    [7, 4],
    [7, 5],
    [7, 6],
    [8, 1],
    [8, 7],
    [9, 4],
    [9, 7],
  ];
  return (
    <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={g} x1="16" y1="16" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <circle cx="40" cy="40" r="28" stroke={`url(#${g})`} strokeWidth="1" opacity="0.25" />
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke={`url(#${g})`}
          strokeWidth="1.4"
          opacity="0.75"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 7 ? 3.5 : 2.4} fill={`url(#${g})`} />
      ))}
    </svg>
  );
}

function Wordmark({
  caseStyle = 'upper',
  light = false,
  accentRight = false,
}) {
  const map = {
    upper: ['TELOS', 'CODE'],
    lower: ['telos', 'code'],
    title: ['Telos', 'Code'],
  };
  const [left, right] = map[caseStyle];
  const main = light ? '#0a0a0a' : '#f4f7f6';
  const soft = light ? '#5a5a5a' : '#9eb0ab';
  const rightColor = accentRight ? '#5eead4' : soft;

  return (
    <div className={`wm ${light ? 'light' : 'dark'}`}>
      <span style={{ color: main }}>{left}</span>
      <i style={{ background: '#5eead4' }} />
      <span style={{ color: rightColor }}>{right}</span>
    </div>
  );
}

const logos = [
  {
    id: 1,
    name: 'Stripes · light',
    note: 'Horizontal globe lines on light',
    theme: 'light',
    icon: <IconStripes id="1" />,
    mark: <Wordmark caseStyle="upper" light />,
  },
  {
    id: 2,
    name: 'Fingerprint · gradient',
    note: 'Concentric arcs, bold field',
    theme: 'gradient',
    icon: <IconFingerprint id="2" from="#ffffff" to="#d8fff7" />,
    mark: <Wordmark caseStyle="upper" light={false} />,
  },
  {
    id: 3,
    name: 'Network · light',
    note: 'Connected nodes sphere',
    theme: 'light',
    icon: <IconNetwork id="3" />,
    mark: <Wordmark caseStyle="upper" light />,
  },
  {
    id: 4,
    name: 'Stripes · dark',
    note: 'Globe lines on dark',
    theme: 'dark',
    icon: <IconStripes id="4" />,
    mark: <Wordmark caseStyle="upper" />,
  },
  {
    id: 5,
    name: 'Fingerprint · light',
    note: 'Arc identity mark',
    theme: 'light',
    icon: <IconFingerprint id="5" />,
    mark: <Wordmark caseStyle="upper" light />,
  },
  {
    id: 6,
    name: 'Network · dark',
    note: 'Agents / systems network',
    theme: 'dark',
    icon: <IconNetwork id="6" />,
    mark: <Wordmark caseStyle="upper" />,
  },
  {
    id: 7,
    name: 'Stripes · title case',
    note: 'Telos / Code under stripes',
    theme: 'dark',
    icon: <IconStripes id="7" from="#5eead4" to="#5eead4" />,
    mark: <Wordmark caseStyle="title" accentRight />,
  },
  {
    id: 8,
    name: 'Network · lowercase',
    note: 'telos / code mono feel',
    theme: 'light',
    icon: <IconNetwork id="8" from="#5eead4" to="#5eead4" />,
    mark: <Wordmark caseStyle="lower" light accentRight />,
  },
  {
    id: 9,
    name: 'Fingerprint · teal only',
    note: 'Single accent color system',
    theme: 'dark',
    icon: <IconFingerprint id="9" from="#5eead4" to="#5eead4" />,
    mark: <Wordmark caseStyle="upper" accentRight />,
  },
  {
    id: 10,
    name: 'Stripes · lowercase',
    note: 'Compact brand lockup',
    theme: 'gradient',
    icon: <IconStripes id="10" from="#ffffff" to="#b8fff3" />,
    mark: <Wordmark caseStyle="lower" />,
  },
  {
    id: 11,
    name: 'Network · title',
    note: 'Telos / Code network',
    theme: 'gradient',
    icon: <IconNetwork id="11" from="#ffffff" to="#c9c4ff" />,
    mark: <Wordmark caseStyle="title" />,
  },
  {
    id: 12,
    name: 'Fingerprint · title',
    note: 'Telos / Code identity arcs',
    theme: 'dark',
    icon: <IconFingerprint id="12" from="#5eead4" to="#9b8cff" />,
    mark: <Wordmark caseStyle="title" accentRight />,
  },
];

export default function LogoOptions() {
  return (
    <section className="logo-picker" id="logo-picker" aria-label="Sphere tech logo options">
      <div className="wrap">
        <div className="logo-picker-head">
          <p className="kicker">Logo options · sphere tech style</p>
          <h2>Pick a mark. Reply with a number 1–12.</h2>
          <p>
            Three icon systems (stripes, fingerprint arcs, network) with TelosCode
            wordmarks. Temporary gallery only.
          </p>
        </div>
        <div className="logo-grid logo-grid-sphere">
          {logos.map((item) => (
            <article key={item.id} className={`logo-card sphere ${item.theme}`}>
              <div className="logo-num">Option {String(item.id).padStart(2, '0')}</div>
              <div className="logo-sphere-preview">
                <div className="logo-icon">{item.icon}</div>
                {item.mark}
              </div>
              <h3>{item.name}</h3>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
