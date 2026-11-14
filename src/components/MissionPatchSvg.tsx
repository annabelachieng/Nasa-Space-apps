import React from 'react';
import { CategoryId } from '../types/spacecraft';

interface MissionPatchSvgProps {
  craftShortName: string;
  launchYear: number;
  categoryId: CategoryId;
  accentHex: string;
  earned: boolean;
  patchNumber: number;
}

export const MissionPatchSvg: React.FC<MissionPatchSvgProps> = ({
  craftShortName,
  launchYear,
  categoryId,
  accentHex,
  earned,
  patchNumber,
}) => {
  const code = `CF-${String(patchNumber).padStart(2, '0')}`;
  const strokeColor = earned ? accentHex : '#334155';
  const fillBg = earned ? '#0f172a' : '#090e1a';
  const emblemColor = earned ? accentHex : '#475569';

  return (
    <svg
      viewBox="0 0 120 120"
      className="w-20 h-20 sm:w-22 sm:h-22 shrink-0 select-none"
      aria-hidden="true"
    >
      {/* Outer Hexagonal Mission Patch Shield */}
      <polygon
        points="60,5 108,32 108,88 60,115 12,88 12,32"
        fill={fillBg}
        stroke={strokeColor}
        strokeWidth={earned ? 3 : 1.75}
        strokeDasharray={earned ? undefined : '4 3'}
      />

      {/* Inner Orbital Ring */}
      <circle
        cx="60"
        cy="60"
        r="38"
        fill="none"
        stroke={earned ? accentHex : '#1e293b'}
        strokeOpacity={earned ? 0.45 : 0.7}
        strokeWidth="1.25"
      />

      {/* Elliptical Flight Trajectory */}
      <ellipse
        cx="60"
        cy="60"
        rx="42"
        ry="15"
        transform="rotate(-24 60 60)"
        fill="none"
        stroke={earned ? '#e2e8f0' : '#334155'}
        strokeOpacity={earned ? 0.5 : 0.4}
        strokeWidth="1.2"
      />

      {/* Category-Specific Emblem Centerpiece */}
      {categoryId === 'trailblazers' && (
        <g>
          <circle cx="60" cy="57" r="10" fill={emblemColor} />
          <line x1="53" y1="63" x2="36" y2="79" stroke={emblemColor} strokeWidth="2" />
          <line x1="67" y1="63" x2="84" y2="79" stroke={emblemColor} strokeWidth="2" />
          <line x1="56" y1="65" x2="45" y2="83" stroke={emblemColor} strokeWidth="1.6" />
          <line x1="64" y1="65" x2="75" y2="83" stroke={emblemColor} strokeWidth="1.6" />
        </g>
      )}
      {categoryId === 'record-makers' && (
        <g>
          <path d="M60 39 L67 61 L60 56 L53 61 Z" fill={emblemColor} />
          <circle cx="60" cy="64" r="6" fill="none" stroke={emblemColor} strokeWidth="2" />
          <line x1="40" y1="64" x2="80" y2="64" stroke={emblemColor} strokeWidth="1.6" />
        </g>
      )}
      {categoryId === 'fallen-on-mars' && (
        <g>
          <rect x="46" y="51" width="28" height="11" rx="2" fill={emblemColor} />
          <circle cx="49" cy="67" r="4" fill={emblemColor} />
          <circle cx="60" cy="67" r="4" fill={emblemColor} />
          <circle cx="71" cy="67" r="4" fill={emblemColor} />
          <line x1="66" y1="51" x2="66" y2="41" stroke={emblemColor} strokeWidth="2" />
          <circle cx="66" cy="40" r="2.5" fill={emblemColor} />
        </g>
      )}
      {categoryId === 'gas-giants' && (
        <g>
          <circle cx="60" cy="57" r="11" fill={emblemColor} />
          <ellipse
            cx="60"
            cy="57"
            rx="22"
            ry="6.5"
            transform="rotate(-16 60 57)"
            fill="none"
            stroke={earned ? '#fef08a' : '#475569'}
            strokeWidth="2.2"
          />
        </g>
      )}
      {categoryId === 'bound-by-gravity' && (
        <g>
          <circle cx="60" cy="57" r="6" fill={emblemColor} />
          <line x1="60" y1="57" x2="60" y2="37" stroke={emblemColor} strokeWidth="3.2" />
          <line x1="60" y1="57" x2="77" y2="67" stroke={emblemColor} strokeWidth="3.2" />
          <line x1="60" y1="57" x2="43" y2="67" stroke={emblemColor} strokeWidth="3.2" />
        </g>
      )}
      {categoryId === 'safe-at-home' && (
        <g>
          <path d="M46 66 L54 45 L66 45 L74 66 Z" fill={emblemColor} />
          <path
            d="M44 68 Q60 76 76 68"
            fill="none"
            stroke={earned ? '#fbbf24' : '#475569'}
            strokeWidth="2.5"
          />
        </g>
      )}

      {/* Top Code */}
      <text
        x="60"
        y="25"
        textAnchor="middle"
        fill={earned ? '#cbd5e1' : '#475569'}
        fontSize="8"
        fontWeight="700"
        fontFamily="monospace"
      >
        {code}
      </text>

      {/* Bottom Launch Year */}
      <text
        x="60"
        y="99"
        textAnchor="middle"
        fill={earned ? '#f8fafc' : '#475569'}
        fontSize="9"
        fontWeight="700"
        fontFamily="monospace"
      >
        {launchYear}
      </text>

      <title>{`${craftShortName} Mission Patch`}</title>
    </svg>
  );
};
