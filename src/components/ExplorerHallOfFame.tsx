import React, { useState } from 'react';
import { Award, CheckCircle2, Circle, Lock, Trophy } from 'lucide-react';
import { SPACECRAFT_CATEGORIES, SPACECRAFT_LIST } from '../data/spacecraftData';
import {
  AppSection,
  BadgeProgressMap,
  ExploreMode,
  SpacecraftData,
} from '../types/spacecraft';
import {
  getCraftCompletionStats,
  getCraftProgress,
  getExplorerRank,
} from '../utils/badgeProgress';
import { MissionPatchSvg } from './MissionPatchSvg';

interface ExplorerHallOfFameProps {
  badgeProgress: BadgeProgressMap;
  onOpenCraftSection: (
    craft: SpacecraftData,
    section: AppSection,
    exploreMode?: ExploreMode
  ) => void;
}

type BadgeFilter = 'all' | 'earned' | 'in-progress';

export const ExplorerHallOfFame: React.FC<ExplorerHallOfFameProps> = ({
  badgeProgress,
  onOpenCraftSection,
}) => {
  const [filter, setFilter] = useState<BadgeFilter>('all');

  const craftEntries = SPACECRAFT_LIST.map((craft, index) => {
    const progress = getCraftProgress(badgeProgress, craft.id);
    const stats = getCraftCompletionStats(craft, progress);
    const category =
      SPACECRAFT_CATEGORIES.find((c) => c.id === craft.categoryId) ??
      SPACECRAFT_CATEGORIES[0];
    return {
      craft,
      index,
      progress,
      stats,
      category,
    };
  });

  const earnedCount = craftEntries.filter((e) => e.stats.earned).length;
  const totalCount = craftEntries.length;
  const completionPct = Math.round((earnedCount / Math.max(totalCount, 1)) * 100);
  const rank = getExplorerRank(earnedCount, totalCount);

  const visibleEntries = craftEntries.filter((entry) => {
    if (filter === 'earned') return entry.stats.earned;
    if (filter === 'in-progress') return !entry.stats.earned;
    return true;
  });

  return (
    <section
      id="explorer-hall-of-fame"
      aria-label="Explorer Hall of Fame"
      className="bg-[#0b1020] border border-slate-800 rounded-2xl p-5 sm:p-7 space-y-6"
    >
      {/* Header & Rank Summary */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-5 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-300">
            <Trophy className="w-4 h-4" />
            Digital Mission Badges Collection
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
            Explorer Hall of Fame
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Earn a digital Mission Badge for every spacecraft you fully explore—inspect all 3D parts, watch it in Space Motion, view its Timeline, and read to the final page of its Story.
          </p>
        </div>

        <div className="bg-slate-900/85 border border-slate-800 rounded-xl px-4 py-3.5 min-w-[260px] shrink-0">
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-xs text-slate-400">Current Fleet Rank</span>
            <span className="font-mono-tabular text-sm font-bold text-amber-300">
              {earnedCount} / {totalCount} Badges
            </span>
          </div>
          <div className="font-display text-lg font-bold text-white mt-0.5">
            {rank.title}
          </div>
          <div className="mt-2.5 h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-amber-400 transition-all duration-300"
              style={{ width: `${completionPct}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-1.5">{rank.nextGoal}</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
              filter === 'all'
                ? 'bg-amber-500 text-slate-950'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            All Badges ({totalCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter('earned')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
              filter === 'earned'
                ? 'bg-emerald-500 text-slate-950'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Earned ({earnedCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter('in-progress')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
              filter === 'in-progress'
                ? 'bg-slate-100 text-slate-950'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            In Progress ({totalCount - earnedCount})
          </button>
        </div>

        <span className="text-xs text-slate-400">
          Tip: Click any missing mission step on a badge to jump right there!
        </span>
      </div>

      {/* Empty Filter State */}
      {visibleEntries.length === 0 && (
        <div className="py-10 text-center border border-slate-800 rounded-xl bg-slate-900/40 px-4">
          <Award className="w-8 h-8 text-slate-500 mx-auto mb-2" />
          <p className="font-display text-base font-bold text-white">
            {filter === 'earned'
              ? 'No Mission Badges collected yet'
              : 'Every single Mission Badge has been unlocked!'}
          </p>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {filter === 'earned'
              ? 'Complete all 4 exploration steps on any spacecraft above to unlock your first digital patch.'
              : 'Congratulations, Supreme Galactic Legend!'}
          </p>
        </div>
      )}

      {/* Badge Grid */}
      {visibleEntries.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {visibleEntries.map(({ craft, index, progress, stats, category }) => {
            const { earned, partsDone, partsCount, partsTotal, motionDone, timelineDone, storyDone } = stats;

            return (
              <div
                key={craft.id}
                className={`rounded-xl border p-4 flex flex-col justify-between transition-colors ${
                  earned
                    ? 'bg-slate-900/95 border-amber-400/70'
                    : 'bg-slate-900/55 border-slate-800'
                }`}
              >
                {/* Patch + Mission Identity */}
                <div className="flex items-start gap-3.5">
                  <MissionPatchSvg
                    craftShortName={craft.shortName}
                    launchYear={craft.launchYear}
                    categoryId={craft.categoryId}
                    accentHex={category.accentHex}
                    earned={earned}
                    patchNumber={index + 1}
                  />

                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-slate-400">
                      <span style={{ color: category.accentHex }}>{category.title}</span>
                      <span aria-hidden="true"> · </span>
                      <span className="font-mono-tabular">
                        {stats.stepsCompleted}/{stats.totalSteps}
                      </span>
                    </div>

                    <h3 className="font-display text-base font-bold text-white truncate mt-0.5">
                      {craft.name}
                    </h3>

                    {earned ? (
                      <div className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300">
                        <Award className="w-3.5 h-3.5 shrink-0" />
                        <span>
                          Badge Earned
                          {progress.badgeEarnedAt ? ` · ${progress.badgeEarnedAt}` : ''}
                        </span>
                      </div>
                    ) : (
                      <div className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-slate-400">
                        <Lock className="w-3.5 h-3.5 shrink-0" />
                        <span>
                          {stats.stepsCompleted === 0
                            ? 'Not started yet'
                            : `${4 - stats.stepsCompleted} step${4 - stats.stepsCompleted === 1 ? '' : 's'} left to unlock`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Interactive 4-Step Mission Checklist */}
                <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => onOpenCraftSection(craft, 'explore', 'inspect')}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer text-left ${
                      partsDone
                        ? 'bg-emerald-500/12 text-emerald-300 border border-emerald-500/25'
                        : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-600'
                    }`}
                  >
                    {partsDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                    )}
                    <span className="truncate">
                      Parts {partsCount}/{partsTotal}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenCraftSection(craft, 'explore', 'motion')}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer text-left ${
                      motionDone
                        ? 'bg-emerald-500/12 text-emerald-300 border border-emerald-500/25'
                        : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-600'
                    }`}
                  >
                    {motionDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                    )}
                    <span className="truncate">Space Motion</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenCraftSection(craft, 'timeline')}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer text-left ${
                      timelineDone
                        ? 'bg-emerald-500/12 text-emerald-300 border border-emerald-500/25'
                        : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-600'
                    }`}
                  >
                    {timelineDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                    )}
                    <span className="truncate">Timeline</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenCraftSection(craft, 'story')}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer text-left ${
                      storyDone
                        ? 'bg-emerald-500/12 text-emerald-300 border border-emerald-500/25'
                        : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-600'
                    }`}
                  >
                    {storyDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                    )}
                    <span className="truncate">Read Story</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
