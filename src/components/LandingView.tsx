import React from 'react';
import { ArrowRight, Hammer, Rocket } from 'lucide-react';
import { TwinklingStarfield } from './TwinklingStarfield';

interface LandingViewProps {
  onStartJourney: () => void;
  onOpenBuilder?: () => void;
}

const CHAPTER_LIST = [
  'Trailblazers',
  'Record Makers',
  'Fallen on Mars',
  'Gas Giants',
  'Bound by Gravity',
  'Safe at Home',
];

export const LandingView: React.FC<LandingViewProps> = ({
  onStartJourney,
  onOpenBuilder,
}) => {
  return (
    <main className="fixed inset-0 z-30 bg-[#050811] text-slate-100 flex flex-col justify-between overflow-hidden select-none">
      {/* 1. Deep-Space Nebula Glow & Full-Screen Twinkling Starfield Sky */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 28%, rgba(30, 58, 110, 0.34) 0%, rgba(7, 11, 22, 0.92) 62%, #050811 100%)',
        }}
      />
      <TwinklingStarfield count={175} />

      {/* 2. Earth Sunrise, Mars Rover & Shuttle Launch Horizon seamlessly blended into the starry sky */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[48vh] sm:h-[54vh] overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.82) 55%, transparent 98%)',
          WebkitMaskImage:
            'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.82) 55%, transparent 98%)',
        }}
      >
        <img
          src="/assets/aistudio/image_eedadad5.png"
          alt=""
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-bottom opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050811]/85 via-[#050811]/25 to-transparent" />
      </div>

      {/* 3. Top Header Row: Spacecraft Emblem + Creator Credit */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 pt-5 sm:pt-7 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-xl overflow-hidden border border-slate-700/80 bg-[#0b1020] shrink-0 shadow-lg">
            <img
              src="/assets/landing-cover.jpg"
              alt="Cosmic Frontlines spacecraft emblem"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <div className="font-display text-sm sm:text-base font-bold text-white tracking-tight truncate">
              Cosmic Frontlines
            </div>
            <div className="text-xs text-amber-300/90 font-medium truncate">
              Made by Spacetroopers
            </div>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300 font-medium">
          <span>18 Spacecraft</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>6 Frontier Chapters</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Interactive 3D</span>
        </div>
      </div>

      {/* 4. Center Hero Focal Anchor */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-5 sm:px-8 my-auto flex flex-col items-center text-center">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-amber-400/40 bg-[#0b1020] shadow-[0_0_40px_rgba(245,158,11,0.22)] mb-5">
          <img
            src="/assets/landing-cover.jpg"
            alt="Spacetroopers explorer craft"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white text-balance leading-[1.05]">
          Cosmic Frontlines
        </h1>

        <blockquote className="mt-4 max-w-2xl">
          <p className="text-sm sm:text-lg text-amber-200/95 font-medium leading-relaxed">
            “That’s one small step for man, a giant leap for mankind.”
          </p>
          <footer className="mt-1 text-xs sm:text-sm text-slate-400">
            — Neil Armstrong
          </footer>
        </blockquote>

        {/* Single Dominant Primary CTA + Optional Secondary Craft Builder Link */}
        <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            type="button"
            onClick={onStartJourney}
            className="group inline-flex items-center gap-3 px-7 py-3.5 sm:px-9 sm:py-4 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-[0.99] text-slate-950 font-display text-base sm:text-lg font-bold tracking-tight shadow-[0_0_32px_rgba(245,158,11,0.42)] transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            <Rocket className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span>Choose Your Space Journey</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          {onOpenBuilder && (
            <button
              type="button"
              onClick={onOpenBuilder}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#0b1020]/90 border border-slate-700 hover:border-sky-400 text-slate-200 hover:text-white font-display text-sm sm:text-base font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <Hammer className="w-4 h-4 text-sky-400" />
              <span>Spacecraft Builder</span>
            </button>
          )}
        </div>
      </div>

      {/* 5. Quiet Unboxed Chapter Strip Anchored Over Horizon Bottom */}
      <footer className="relative z-10 w-full max-w-5xl mx-auto px-5 pb-6 sm:pb-8 text-center">
        <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-xs sm:text-sm text-slate-200/90 drop-shadow">
          {CHAPTER_LIST.map((title, idx) => (
            <React.Fragment key={title}>
              <span>{title}</span>
              {idx < CHAPTER_LIST.length - 1 && (
                <span aria-hidden="true" className="text-amber-400/70">
                  ·
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </footer>
    </main>
  );
};
