import React, { useMemo } from 'react';

interface StarSpec {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  minOpacity: number;
  maxOpacity: number;
  duration: number;
  delay: number;
  hasCrossGlint: boolean;
}

interface TwinklingStarfieldProps {
  /** Number of stars to scatter across the field */
  count?: number;
  /** Optional className for positioning/masking */
  className?: string;
}

const STAR_COLORS = [
  '#ffffff',
  '#ffffff',
  '#e0f2fe',
  '#bae6fd',
  '#fef3c7',
  '#fde68a',
];

function seededUnit(seed: number): number {
  const s = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return s - Math.floor(s);
}

export const TwinklingStarfield: React.FC<TwinklingStarfieldProps> = ({
  count = 110,
  className = '',
}) => {
  const stars = useMemo<StarSpec[]>(() => {
    const items: StarSpec[] = [];
    for (let i = 0; i < count; i++) {
      const r1 = seededUnit(i * 7 + 1);
      const r2 = seededUnit(i * 7 + 2);
      const r3 = seededUnit(i * 7 + 3);
      const r4 = seededUnit(i * 7 + 4);
      const r5 = seededUnit(i * 7 + 5);
      const r6 = seededUnit(i * 7 + 6);

      const isBright = r3 > 0.82;
      const size = isBright ? 2.4 + r4 * 1.4 : 1.1 + r4 * 1.3;

      items.push({
        id: i,
        x: 1 + r1 * 98,
        y: 1 + r2 * 98,
        size,
        color: STAR_COLORS[Math.floor(r5 * STAR_COLORS.length)] ?? '#ffffff',
        minOpacity: isBright ? 0.18 : 0.08,
        maxOpacity: isBright ? 1 : 0.82,
        duration: 2.2 + r6 * 3.8,
        delay: -(r3 * 6.0),
        hasCrossGlint: r3 > 0.9,
      });
    }
    return items;
  }, [count]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {stars.map((star) => (
        <span
          key={star.id}
          className="cosmic-star"
          style={
            {
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
              boxShadow: star.hasCrossGlint
                ? `0 0 ${Math.round(star.size * 3.5)}px ${star.color}`
                : undefined,
              '--star-min': star.minOpacity,
              '--star-max': star.maxOpacity,
              animationDuration: `${star.duration.toFixed(2)}s`,
              animationDelay: `${star.delay.toFixed(2)}s`,
            } as React.CSSProperties
          }
        >
          {star.hasCrossGlint && (
            <>
              <span
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: `${star.size * 4.5}px`,
                  height: '1px',
                  background: `linear-gradient(90deg, transparent, ${star.color}, transparent)`,
                }}
              />
              <span
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: '1px',
                  height: `${star.size * 4.5}px`,
                  background: `linear-gradient(180deg, transparent, ${star.color}, transparent)`,
                }}
              />
            </>
          )}
        </span>
      ))}
    </div>
  );
};
