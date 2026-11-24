import React from 'react';
import { ArrowRight, Rocket } from 'lucide-react';
import { SPACECRAFT_CATEGORIES, SPACECRAFT_LIST } from '../data/spacecraftData';
import { TwinklingStarfield } from './TwinklingStarfield';

interface LandingViewProps {
  onStartJourney: () => void;
}

const CHAPTER_LIST = SPACECRAFT_CATEGORIES.map((c) => c.title);

export const LandingView: React.FC<LandingViewProps> = ({
  onStartJourney,
}) => {
  return (
    <main className="fixed inset-0 z-30 bg-[#050811] text-slate-100 flex flex-col justify-between overflow-hidden select-none">
      {/* 1. Deep-Space Nebula Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 28%, rgba(30, 58, 110, 0.34) 0%, rgba(7, 11, 22, 0.92) 62%, #050811 100%)',
        }}
      />

      {/* 2. Background Cover Art (quote + Earth sunrise + Mars rover + shuttle) kept bright & unobstructed */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <img
          src="/assets/aistudio/image_eedadad5.png"
          alt=""
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain sm:object-cover object-center opacity-95"
        />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#050811]/75 via-[#050811]/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050811]/90 via-[#050811]/45 to-transparent" />
      </div>

      {/* 3. Full-Screen Twinkling Starfield Sky */}
      <TwinklingStarfield count={175} />

      <h1 className="sr-only">Cosmic Frontlines</h1>

      {/* 4. Top Section: Header Credit Row */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 pt-4 sm:pt-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden border border-slate-700/80 bg-[#0b1020] shrink-0 shadow-lg">
              <img
                src="/assets/landing-cover.jpg"
                alt="Spacecraft emblem"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="text-xs sm:text-sm text-amber-300/95 font-medium truncate">
                Made by Spacetroopers
              </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300 font-medium">
            <span>{SPACECRAFT_LIST.length} Spacecraft</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>{SPACECRAFT_CATEGORIES.length} Frontier Chapters</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Interactive 3D</span>
          </div>
        </div>
      </div>

      {/* 5. Open Center Window so Background Artwork & Quote Stay Clearly Visible */}
      <div className="flex-1 min-h-[140px]" aria-hidden="true" />

      {/* 6. Bottom Primary CTA + Quiet Unboxed Chapter Strip */}
      <footer className="relative z-10 w-full max-w-5xl mx-auto px-5 pb-5 sm:pb-7 text-center space-y-4">
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={onStartJourney}
            className="group inline-flex items-center gap-3 px-7 py-3.5 sm:px-9 sm:py-4 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-[0.99] text-slate-950 font-display text-base sm:text-lg font-bold tracking-tight shadow-[0_0_32px_rgba(245,158,11,0.42)] transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            <Rocket className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span>Choose Your Space Journey</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

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
