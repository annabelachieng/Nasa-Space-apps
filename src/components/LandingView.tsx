import React from 'react';
import { ArrowRight, Rocket } from 'lucide-react';
import { TwinklingStarfield } from './TwinklingStarfield';

interface LandingViewProps {
  onStartJourney: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onStartJourney }) => {
  return (
    <main className="fixed inset-0 z-30 bg-[#050811] text-slate-100 flex flex-col items-center justify-center overflow-hidden select-none">
      {/* Subtle deep-space backdrop glow + twinkling starfield behind the hero artwork */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 45%, rgba(28, 45, 82, 0.42) 0%, rgba(5, 8, 17, 0.98) 75%)',
        }}
      />
      <TwinklingStarfield count={130} />

      {/* Uploaded Cosmic Frontlines Hero Graphic */}
      <div className="relative w-full h-full max-w-[1680px] flex items-center justify-center">
        <img
          src="/assets/aistudio/image_eedadad5.png"
          alt="Cosmic Frontlines: Made by Spacetroopers"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain md:object-cover object-center"
        />

        {/* Twinkling starlight softly layered into the upper space sky & dark outer edges (clear of center text & rover) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black_0%,black_55%,transparent_84%)]"
        >
          <TwinklingStarfield
            count={80}
            className="mix-blend-screen opacity-85 [mask-image:radial-gradient(ellipse_52%_42%_at_50%_44%,transparent_46%,black_84%)]"
          />
        </div>

        {/* Soft edge scrims so the artwork blends cleanly and bottom CTA has >4.5:1 contrast */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#050811] via-[#050811]/70 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#050811]/60 to-transparent hidden lg:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#050811]/60 to-transparent hidden lg:block"
        />
      </div>

      {/* Primary Action Dock anchored cleanly at bottom center so rover & launch remain visible */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-10 w-full max-w-xl px-4 flex flex-col items-center text-center">
        <button
          type="button"
          onClick={onStartJourney}
          className="group inline-flex items-center gap-3 px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-[0.99] text-slate-950 font-display text-base sm:text-lg font-bold tracking-tight shadow-[0_0_32px_rgba(245,158,11,0.45)] transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
        >
          <Rocket className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          <span>Choose Your Space Journey</span>
          <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
        </button>

        <p className="mt-3 text-xs sm:text-sm text-slate-200/90 max-w-md leading-snug drop-shadow">
          From Trailblazers to Safe at Home · Explore 3D spacecraft, stories, timelines, trivia & custom builds
        </p>
      </div>
    </main>
  );
};
