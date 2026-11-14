import React from 'react';
import { AppSection } from '../types/spacecraft';

interface TopBarProps {
  activeSection: AppSection;
  onSelectSection: (section: AppSection) => void;
}

const NAV_ITEMS: { id: AppSection; label: string }[] = [
  { id: 'explore', label: 'Explore 3D' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'story', label: 'Story' },
  { id: 'trivia', label: 'Trivia' },
  { id: 'builder', label: 'Build Craft' },
];

export const TopBar: React.FC<TopBarProps> = ({
  activeSection,
  onSelectSection,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 h-14 bg-[#0b1020]/95 border-b border-slate-800/90 px-4 sm:px-6 flex items-center justify-between gap-4 sm:gap-8">
      {/* Zone 1: Brand Title (single text element, returns to Landing Page) */}
      <button
        type="button"
        onClick={() => onSelectSection('landing')}
        className="font-display text-lg sm:text-xl font-bold tracking-tight text-slate-100 whitespace-nowrap shrink-0 cursor-pointer hover:text-amber-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded"
      >
        Cosmic Frontlines
      </button>

      {/* Zone 2: 5 Clean Single-Line Nav Links */}
      <nav className="flex items-center gap-4 sm:gap-7 overflow-x-auto no-scrollbar">
        {NAV_ITEMS.map((item) => {
          const active = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectSection(item.id)}
              className={`relative py-2 text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded ${
                active
                  ? 'text-amber-300'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {item.label}
              {active && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full"
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Zone 3: 1 Primary Action */}
      <div className="shrink-0">
        <button
          type="button"
          onClick={() => onSelectSection('journeys')}
          className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${
            activeSection === 'journeys'
              ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300/60'
              : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
          }`}
        >
          Space Journeys
        </button>
      </div>
    </header>
  );
};
