import React, { useState } from 'react';
import { Rocket } from 'lucide-react';
import { CRAFT_IMAGES } from '../data/craftImages';

interface SpacecraftImageProps {
  craftId: string;
  alt: string;
  title?: string;
  accentHex?: string;
  className?: string;
}

export const SpacecraftImage: React.FC<SpacecraftImageProps> = ({
  craftId,
  alt,
  title,
  accentHex = '#F59E0B',
  className = '',
}) => {
  const [failed, setFailed] = useState(false);
  const src = CRAFT_IMAGES[craftId];

  if (!src || failed) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-[#0f172a] to-slate-950 border border-slate-800 ${className}`}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${accentHex}, transparent 65%)`,
          }}
        />
        <Rocket className="relative w-8 h-8 mb-1.5" style={{ color: accentHex }} />
        {title && (
          <span className="relative text-xs font-display font-semibold text-slate-200 px-3 text-center">
            {title}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`object-cover bg-slate-950 ${className}`}
    />
  );
};
