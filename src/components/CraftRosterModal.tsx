import React, { useState } from 'react';
import { X } from 'lucide-react';
import { SPACECRAFT_CATEGORIES, SPACECRAFT_LIST } from '../data/spacecraftData';
import { CategoryId, SpacecraftData } from '../types/spacecraft';
import { SpacecraftImage } from './SpacecraftImage';

interface CraftRosterModalProps {
  isOpen: boolean;
  activeCraftId: string;
  onSelectCraft: (craft: SpacecraftData) => void;
  onClose: () => void;
}

export const CraftRosterModal: React.FC<CraftRosterModalProps> = ({
  isOpen,
  activeCraftId,
  onSelectCraft,
  onClose,
}) => {
  const [filterCat, setFilterCat] = useState<CategoryId | 'all'>('all');

  if (!isOpen) return null;

  const visibleCategories =
    filterCat === 'all'
      ? SPACECRAFT_CATEGORIES
      : SPACECRAFT_CATEGORIES.filter((c) => c.id === filterCat);

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/75 p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Spacecraft Roster"
    >
      <div className="w-full max-w-6xl max-h-[88vh] flex flex-col bg-[#0b1020] border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-slate-800">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
              Cosmic Frontlines Spacecraft Roster
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              {SPACECRAFT_CATEGORIES.length} Frontier Categories · {SPACECRAFT_LIST.length} Animated Spacecraft Ready to Explore
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close roster"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filter Buttons */}
        <div className="px-6 py-3 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto cosmic-scroll">
          <button
            type="button"
            onClick={() => setFilterCat('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              filterCat === 'all'
                ? 'bg-amber-500 text-slate-950'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            All Categories ({SPACECRAFT_LIST.length})
          </button>
          {SPACECRAFT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFilterCat(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                filterCat === cat.id
                  ? 'bg-slate-100 text-slate-950'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Spacecraft Grid by Category */}
        <div className="flex-1 overflow-y-auto cosmic-scroll p-6 space-y-8">
          {visibleCategories.map((cat) => {
            const crafts = SPACECRAFT_LIST.filter((c) => c.categoryId === cat.id);
            return (
              <section key={cat.id}>
                <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                  <h3
                    className="font-display text-lg font-bold"
                    style={{ color: cat.accentHex }}
                  >
                    {cat.title}
                  </h3>
                  <span className="text-xs text-slate-400">{cat.subtitle}</span>
                </div>
                <div
                  className={
                    crafts.length >= 4
                      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'
                      : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
                  }
                >
                  {crafts.map((craft) => {
                    const isSelected = craft.id === activeCraftId;
                    return (
                      <button
                        key={craft.id}
                        type="button"
                        onClick={() => {
                          onSelectCraft(craft);
                          onClose();
                        }}
                        className={`text-left p-3.5 rounded-xl border transition-colors cursor-pointer flex flex-col ${
                          isSelected
                            ? 'bg-slate-900/95 border-amber-400'
                            : 'bg-slate-900/60 border-slate-800 hover:border-slate-600 hover:bg-slate-900'
                        }`}
                      >
                        <SpacecraftImage
                          craftId={craft.id}
                          alt={`${craft.name} mission view`}
                          title={craft.shortName}
                          accentHex={cat.accentHex}
                          className="w-full aspect-[16/10] rounded-lg mb-3"
                        />
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-display text-base font-bold text-white">
                            {craft.name}
                          </span>
                          <span className="font-mono-tabular text-xs text-slate-400 shrink-0">
                            {craft.launchYear}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 mb-1.5">
                          {craft.destination} · {craft.parts.length} clickable parts
                        </div>
                        <p className="text-xs sm:text-sm text-slate-300 leading-snug">
                          {craft.tagline}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};
