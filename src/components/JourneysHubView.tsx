import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Hammer,
  Layers,
  Orbit,
  Trophy,
} from 'lucide-react';
import { SPACECRAFT_CATEGORIES, SPACECRAFT_LIST } from '../data/spacecraftData';
import {
  AppSection,
  BadgeProgressMap,
  CategoryId,
  ExploreMode,
  JourneyStep,
  SpacecraftData,
} from '../types/spacecraft';
import { getCraftCompletionStats, getCraftProgress } from '../utils/badgeProgress';
import { SpacecraftImage } from './SpacecraftImage';
import { ExplorerHallOfFame } from './ExplorerHallOfFame';
import { sfx } from '../utils/soundEffects';

interface JourneysHubViewProps {
  journeyStep: JourneyStep;
  onChangeStep: (step: JourneyStep) => void;
  selectedCategoryId: CategoryId;
  onSelectCategory: (catId: CategoryId) => void;
  selectedCraft: SpacecraftData;
  onSelectCraft: (craft: SpacecraftData) => void;
  onOpenCraftSection: (
    craft: SpacecraftData,
    section: AppSection,
    exploreMode?: ExploreMode
  ) => void;
  onNavigateSection: (section: AppSection) => void;
  onOpenRoster: () => void;
  badgeProgress: BadgeProgressMap;
}

export const JourneysHubView: React.FC<JourneysHubViewProps> = ({
  journeyStep,
  onChangeStep,
  selectedCategoryId,
  onSelectCategory,
  selectedCraft,
  onSelectCraft,
  onOpenCraftSection,
  onNavigateSection,
  onOpenRoster,
  badgeProgress,
}) => {
  const activeCategory =
    SPACECRAFT_CATEGORIES.find((c) => c.id === selectedCategoryId) ??
    SPACECRAFT_CATEGORIES[0];
  const categoryCrafts = SPACECRAFT_LIST.filter(
    (c) => c.categoryId === activeCategory.id
  );
  const craftStats = getCraftCompletionStats(
    selectedCraft,
    getCraftProgress(badgeProgress, selectedCraft.id)
  );
  const earnedTotal = SPACECRAFT_LIST.filter(
    (c) => getCraftCompletionStats(c, getCraftProgress(badgeProgress, c.id)).earned
  ).length;

  // =========================================================================
  // STEP 1: CHOOSE ONE OF THE 6 SPACE JOURNEYS (Trailblazers -> Safe at Home)
  // =========================================================================
  if (journeyStep === 'categories') {
    return (
      <div className="fixed inset-x-0 top-14 bottom-0 z-20 overflow-y-auto cosmic-scroll bg-transparent px-4 sm:px-8 py-6">
        <div className="max-w-6xl mx-auto space-y-6 pb-10">
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-slate-800/80 pb-5">
            <div>
              <button
                type="button"
                onClick={() => onNavigateSection('landing')}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-amber-300 transition-colors cursor-pointer mb-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Cosmic Frontlines Cover
              </button>
              <h1 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
                Choose Your Space Journey
              </h1>
              <p className="mt-1 text-sm sm:text-base text-slate-300 max-w-2xl">
                Pick a frontier chapter below—from Trailblazers to Safe at Home—to meet its spacecraft.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  sfx.playPartSelect();
                  onChangeStep('hall-of-fame');
                }}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-amber-500/15 border border-amber-400/50 text-xs sm:text-sm font-semibold text-amber-300 hover:bg-amber-500/25 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Trophy className="w-4 h-4" />
                <span>Hall of Fame · {earnedTotal}/{SPACECRAFT_LIST.length}</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigateSection('builder')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm font-semibold text-slate-200 hover:border-sky-400 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Hammer className="w-4 h-4 text-sky-400" />
                <span>Build Craft</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigateSection('trivia')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm font-semibold text-slate-200 hover:border-amber-400 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>Trivia</span>
              </button>
              <button
                type="button"
                onClick={onOpenRoster}
                className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm font-semibold text-slate-200 hover:border-slate-500 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                All {SPACECRAFT_LIST.length}
              </button>
            </div>
          </div>

          {/* 6 Category Picture Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SPACECRAFT_CATEGORIES.map((cat, idx) => {
              const crafts = SPACECRAFT_LIST.filter((c) => c.categoryId === cat.id);
              const leadCraft = crafts[0];
              const earnedInCat = crafts.filter(
                (c) => getCraftCompletionStats(c, getCraftProgress(badgeProgress, c.id)).earned
              ).length;
              const numLabel = String(idx + 1).padStart(2, '0');

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    onSelectCategory(cat.id);
                    sfx.playPartSelect();
                    onChangeStep('category-crafts');
                  }}
                  className="group text-left rounded-2xl border border-slate-800 bg-[#0b1020] hover:border-amber-400 hover:bg-slate-900/90 transition-all duration-150 cursor-pointer overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="relative overflow-hidden">
                      <SpacecraftImage
                        craftId={leadCraft.id}
                        alt={`${cat.title} featured spacecraft`}
                        title={cat.title}
                        accentHex={cat.accentHex}
                        className="w-full aspect-[16/9] transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0b1020] to-transparent"
                      />
                    </div>

                    <div className="px-5 pt-2 pb-4">
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <span
                          className="font-display font-bold tracking-wide"
                          style={{ color: cat.accentHex }}
                        >
                          {numLabel}. Frontier Chapter
                        </span>
                        <span className="font-mono-tabular text-slate-400">
                          {earnedInCat}/{crafts.length} Badges
                        </span>
                      </div>

                      <h2 className="font-display text-xl font-bold text-white mt-1 group-hover:text-amber-300 transition-colors">
                        {cat.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-snug">
                        {cat.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 py-3 border-t border-slate-800/90 flex items-center justify-between gap-2 text-xs">
                    <span className="text-slate-400 truncate">
                      {crafts.map((c) => c.shortName).join(' · ')}
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-amber-300 whitespace-nowrap shrink-0">
                      Open
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // STEP 2: CHOOSE A SPACECRAFT INSIDE SELECTED CATEGORY (e.g. Sputnik 1, Explorer 1...)
  // =========================================================================
  if (journeyStep === 'category-crafts') {
    return (
      <div className="fixed inset-x-0 top-14 bottom-0 z-20 overflow-y-auto cosmic-scroll bg-transparent px-4 sm:px-8 py-6">
        <div className="max-w-6xl mx-auto space-y-6 pb-10">
          {/* Header with Back to 6 Space Journeys */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800/80 pb-5">
            <div>
              <button
                type="button"
                onClick={() => onChangeStep('categories')}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-amber-300 hover:text-amber-200 transition-colors cursor-pointer mb-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to All 6 Space Journeys
              </button>
              <div
                className="text-xs font-semibold"
                style={{ color: activeCategory.accentHex }}
              >
                Select a Spacecraft to Begin
              </div>
              <h1 className="font-display text-2xl sm:text-4xl font-bold text-white mt-0.5">
                {activeCategory.title}
              </h1>
              <p className="mt-1 text-sm sm:text-base text-slate-300">
                {activeCategory.subtitle}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onChangeStep('hall-of-fame')}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-amber-500/15 border border-amber-400/50 text-xs sm:text-sm font-semibold text-amber-300 hover:bg-amber-500/25 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Trophy className="w-4 h-4" />
              <span>Hall of Fame · {earnedTotal}/{SPACECRAFT_LIST.length}</span>
            </button>
          </div>

          {/* Clickable Spacecraft Picture Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categoryCrafts.map((craft) => {
              const stats = getCraftCompletionStats(
                craft,
                getCraftProgress(badgeProgress, craft.id)
              );
              return (
                <button
                  key={craft.id}
                  type="button"
                  onClick={() => {
                    onSelectCraft(craft);
                    sfx.playPartSelect();
                    onChangeStep('craft-hub');
                  }}
                  className="group text-left rounded-2xl border border-slate-800 bg-[#0b1020] hover:border-amber-400 hover:bg-slate-900/90 transition-all duration-150 cursor-pointer overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="relative overflow-hidden">
                      <SpacecraftImage
                        craftId={craft.id}
                        alt={`${craft.name} space photograph`}
                        title={craft.shortName}
                        accentHex={activeCategory.accentHex}
                        className="w-full aspect-[4/3] transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0b1020] to-transparent"
                      />
                    </div>

                    <div className="px-5 pt-2 pb-4">
                      <div className="flex items-center justify-between gap-2 text-xs text-slate-400">
                        <div>
                          <span className="font-mono-tabular text-amber-300">
                            {craft.launchYear}
                          </span>
                          <span aria-hidden="true"> · </span>
                          <span>{craft.destination}</span>
                        </div>
                        <span
                          className={`font-mono-tabular font-semibold ${
                            stats.earned ? 'text-emerald-300' : 'text-slate-400'
                          }`}
                        >
                          {stats.earned ? 'Badge Earned' : `${stats.stepsCompleted}/4 Steps`}
                        </span>
                      </div>

                      <h2 className="font-display text-2xl font-bold text-white mt-1.5 group-hover:text-amber-300 transition-colors">
                        {craft.name}
                      </h2>
                      <p className="text-sm text-slate-300 mt-1.5 leading-relaxed">
                        {craft.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 py-3.5 border-t border-slate-800/90 flex items-center justify-between gap-2 text-sm font-semibold text-amber-300">
                    <span>Choose {craft.shortName}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // STEP 3: SELECTED SPACECRAFT PICTURE + 4 LARGE ACTIVITY BUTTONS
  // =========================================================================
  if (journeyStep === 'craft-hub') {
    return (
      <div className="fixed inset-x-0 top-14 bottom-0 z-20 overflow-y-auto cosmic-scroll bg-transparent px-4 sm:px-8 py-6">
        <div className="max-w-6xl mx-auto space-y-6 pb-10">
          {/* Header Navigation Breadcrumb */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onChangeStep('category-crafts')}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-amber-300 hover:text-amber-200 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to {activeCategory.title}
              </button>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <button
                type="button"
                onClick={() => onChangeStep('categories')}
                className="text-xs sm:text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                All 6 Journeys
              </button>
            </div>

            <button
              type="button"
              onClick={() => onChangeStep('hall-of-fame')}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-amber-500/15 border border-amber-400/50 text-xs sm:text-sm font-semibold text-amber-300 hover:bg-amber-500/25 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Trophy className="w-4 h-4" />
              <span>
                {craftStats.earned
                  ? 'Mission Badge Earned!'
                  : `Badge Progress · ${craftStats.stepsCompleted}/4 Steps`}
              </span>
            </button>
          </div>

          {/* 2-Column Split: Realistic Mission Photo (Left) + 4 Large Choice Buttons (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left: Large Photorealistic Spacecraft Visual & Kid Intro */}
            <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-slate-800 bg-[#0b1020] min-h-[320px] flex flex-col justify-end">
              <SpacecraftImage
                craftId={selectedCraft.id}
                alt={`${selectedCraft.name} realistic mission photograph`}
                title={selectedCraft.shortName}
                accentHex={activeCategory.accentHex}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070b16] via-[#070b16]/60 to-transparent"
              />
              <div className="relative z-10 p-6 sm:p-7">
                <div className="text-xs font-medium text-slate-300">
                  <span style={{ color: activeCategory.accentHex }}>
                    {activeCategory.title}
                  </span>
                  <span aria-hidden="true"> · </span>
                  <span className="font-mono-tabular">{selectedCraft.launchYear}</span>
                  <span aria-hidden="true"> · </span>
                  <span>{selectedCraft.destination}</span>
                </div>
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mt-1">
                  {selectedCraft.name}
                </h1>
                <p className="mt-2 text-sm sm:text-base text-slate-200 leading-relaxed max-w-xl">
                  {selectedCraft.kidOverview}
                </p>
              </div>
            </div>

            {/* Right: 4 Large Clickable Activity Buttons */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 1. READ STORY */}
              <button
                type="button"
                onClick={() => onOpenCraftSection(selectedCraft, 'story')}
                className="group text-left rounded-2xl border border-amber-400/50 bg-[#0b1020] hover:bg-amber-500/12 hover:border-amber-400 p-6 transition-all cursor-pointer flex flex-col justify-between min-h-[168px]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="p-3 rounded-xl bg-amber-500/15 text-amber-300">
                    <BookOpen className="w-7 h-7" />
                  </div>
                  {craftStats.storyDone && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-300">
                      <CheckCircle2 className="w-4 h-4" />
                      Done
                    </span>
                  )}
                </div>
                <div className="mt-5">
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    Read the Story
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-snug">
                    {selectedCraft.story.frontlineCallsign}: “{selectedCraft.story.title}”
                  </p>
                </div>
              </button>

              {/* 2. SHOW 3D PARTS */}
              <button
                type="button"
                onClick={() => onOpenCraftSection(selectedCraft, 'explore', 'inspect')}
                className="group text-left rounded-2xl border border-sky-400/50 bg-[#0b1020] hover:bg-sky-500/12 hover:border-sky-400 p-6 transition-all cursor-pointer flex flex-col justify-between min-h-[168px]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="p-3 rounded-xl bg-sky-500/15 text-sky-300">
                    <Layers className="w-7 h-7" />
                  </div>
                  {craftStats.partsDone ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-300">
                      <CheckCircle2 className="w-4 h-4" />
                      All {craftStats.partsTotal}
                    </span>
                  ) : (
                    <span className="font-mono-tabular text-xs text-slate-400">
                      {craftStats.partsCount}/{craftStats.partsTotal} Parts
                    </span>
                  )}
                </div>
                <div className="mt-5">
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-sky-300 transition-colors">
                    Show 3D Parts
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-snug">
                    Spin, separate & tap {selectedCraft.parts.length} parts to see how they worked
                  </p>
                </div>
              </button>

              {/* 3. SEE SPACE MOTION */}
              <button
                type="button"
                onClick={() => onOpenCraftSection(selectedCraft, 'explore', 'motion')}
                className="group text-left rounded-2xl border border-emerald-400/50 bg-[#0b1020] hover:bg-emerald-500/12 hover:border-emerald-400 p-6 transition-all cursor-pointer flex flex-col justify-between min-h-[168px]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="p-3 rounded-xl bg-emerald-500/15 text-emerald-300">
                    <Orbit className="w-7 h-7" />
                  </div>
                  {craftStats.motionDone && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-300">
                      <CheckCircle2 className="w-4 h-4" />
                      Done
                    </span>
                  )}
                </div>
                <div className="mt-5">
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                    See Space Motion
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-snug">
                    Watch {selectedCraft.shortName} move in {selectedCraft.destination}
                  </p>
                </div>
              </button>

              {/* 4. EXPLORE TIMELINE */}
              <button
                type="button"
                onClick={() => onOpenCraftSection(selectedCraft, 'timeline')}
                className="group text-left rounded-2xl border border-indigo-400/50 bg-[#0b1020] hover:bg-indigo-500/12 hover:border-indigo-400 p-6 transition-all cursor-pointer flex flex-col justify-between min-h-[168px]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="p-3 rounded-xl bg-indigo-500/15 text-indigo-300">
                    <Clock className="w-7 h-7" />
                  </div>
                  {craftStats.timelineDone && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-300">
                      <CheckCircle2 className="w-4 h-4" />
                      Done
                    </span>
                  )}
                </div>
                <div className="mt-5">
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                    Explore Timeline
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-snug">
                    Follow milestones from {selectedCraft.launchDate}
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // STEP 4 (DEDICATED SCREEN): EXPLORER HALL OF FAME
  // =========================================================================
  return (
    <div className="fixed inset-x-0 top-14 bottom-0 z-20 overflow-y-auto cosmic-scroll bg-transparent px-4 sm:px-8 py-6">
      <div className="max-w-6xl mx-auto space-y-5 pb-12">
        <div>
          <button
            type="button"
            onClick={() => onChangeStep('categories')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-amber-300 hover:text-amber-200 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All 6 Space Journeys
          </button>
        </div>

        <ExplorerHallOfFame
          badgeProgress={badgeProgress}
          onOpenCraftSection={onOpenCraftSection}
        />
      </div>
    </div>
  );
};
