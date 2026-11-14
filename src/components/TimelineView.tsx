import React from 'react';
import { ArrowLeft, ArrowRight, Calendar, Clock, Compass } from 'lucide-react';
import { SPACECRAFT_CATEGORIES, SPACECRAFT_LIST } from '../data/spacecraftData';
import { SpacecraftData } from '../types/spacecraft';
import { SpacecraftImage } from './SpacecraftImage';

interface TimelineViewProps {
  craft: SpacecraftData;
  onSelectCraft: (craft: SpacecraftData) => void;
  onJumpToExplore: () => void;
  onBackToCraft?: () => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  craft,
  onSelectCraft,
  onJumpToExplore,
  onBackToCraft,
}) => {
  const category = SPACECRAFT_CATEGORIES.find((c) => c.id === craft.categoryId)!;
  const chronologicalCrafts = [...SPACECRAFT_LIST].sort(
    (a, b) => a.launchYear - b.launchYear
  );

  return (
    <div className="fixed inset-x-0 top-14 bottom-0 z-20 overflow-y-auto cosmic-scroll bg-transparent px-4 sm:px-8 py-6">
      <div className="max-w-4xl mx-auto space-y-6 pb-12">
        {onBackToCraft && (
          <button
            type="button"
            onClick={onBackToCraft}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-amber-300 hover:text-amber-200 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {craft.shortName}
          </button>
        )}
        {/* Header Card */}
        <div className="bg-[#0b1020] border border-slate-800 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-5">
            <SpacecraftImage
              craftId={craft.id}
              alt={`${craft.name} mission picture`}
              title={craft.shortName}
              accentHex={category.accentHex}
              className="w-full md:w-52 aspect-[16/10] rounded-xl shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-medium text-slate-400 mb-1">
                    <span style={{ color: category.accentHex }}>{category.title}</span>
                    <span aria-hidden="true"> · </span>
                    <span>{craft.destination}</span>
                  </div>
                  <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">
                    {craft.name} Space Timeline
                  </h1>
                </div>
                <button
                  type="button"
                  onClick={onJumpToExplore}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 text-slate-950 text-xs sm:text-sm font-semibold hover:bg-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Inspect in 3D
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <p className="mt-2.5 text-sm sm:text-base text-slate-300 leading-relaxed">
                {craft.kidOverview}
              </p>
            </div>
          </div>

          {/* Key Space Stats Strip (unboxed clean grid) */}
          <div className="mt-6 pt-5 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                Launch Date
              </div>
              <div className="mt-1 font-mono-tabular text-sm font-semibold text-white">
                {craft.launchDate}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                Time in Space
              </div>
              <div className="mt-1 text-sm font-semibold text-white">
                {craft.activeSpan}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Compass className="w-3.5 h-3.5 text-emerald-400" />
                Mission Status
              </div>
              <div className="mt-1 text-sm font-semibold text-white">
                {craft.statusLabel}
              </div>
            </div>
          </div>
        </div>

        {/* Chronological Milestones */}
        <div className="bg-[#0b1020] border border-slate-800 rounded-2xl p-6">
          <h2 className="font-display text-lg font-bold text-white mb-6">
            Key Milestones in Space
          </h2>
          <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-slate-700">
            {craft.timeline.map((item, idx) => (
              <div key={idx} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-5 top-1.5 w-3 h-3 rounded-full border-2 border-[#0b1020]"
                  style={{ backgroundColor: category.accentHex }}
                />
                <div className="font-mono-tabular text-xs font-semibold text-amber-300">
                  {item.date}
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold text-white mt-0.5">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Master Cosmic Frontlines Era Strip (1957 -> Today) */}
        <div className="bg-[#0b1020] border border-slate-800 rounded-2xl p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
            <h2 className="font-display text-lg font-bold text-white">
              Cosmic Frontlines Through History (1957 – 2026)
            </h2>
            <span className="text-xs text-slate-400">
              Select any craft to view its timeline
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {chronologicalCrafts.map((c) => {
              const isCurrent = c.id === craft.id;
              const cat = SPACECRAFT_CATEGORIES.find((catItem) => catItem.id === c.categoryId);
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onSelectCraft(c)}
                  className={`text-left p-2.5 rounded-xl border transition-colors cursor-pointer ${
                    isCurrent
                      ? 'bg-amber-500/15 border-amber-400 text-white'
                      : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-600 hover:text-white'
                  }`}
                >
                  <SpacecraftImage
                    craftId={c.id}
                    alt={`${c.shortName} preview`}
                    title={c.shortName}
                    accentHex={cat?.accentHex}
                    className="w-full aspect-[16/10] rounded-lg mb-2"
                  />
                  <div className="font-mono-tabular text-xs text-amber-300">
                    {c.launchYear}
                  </div>
                  <div className="font-display text-sm font-bold mt-0.5 truncate">
                    {c.shortName}
                  </div>
                  <div className="text-xs text-slate-400 truncate mt-0.5">
                    {c.destination}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
