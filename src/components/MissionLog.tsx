import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  ArrowUpDown,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Compass,
  Layers,
  Orbit,
  ScrollText,
  Star,
  Trash2,
} from 'lucide-react';
import { SPACECRAFT_CATEGORIES, SPACECRAFT_LIST } from '../data/spacecraftData';
import {
  AppSection,
  ExploreMode,
  MissionLogEntry,
  MissionMilestoneKind,
  SpacecraftData,
} from '../types/spacecraft';
import { formatMissionTimestamp } from '../utils/missionLog';
import { SpacecraftImage } from './SpacecraftImage';

interface MissionLogProps {
  entries: MissionLogEntry[];
  onOpenCraftSection: (
    craft: SpacecraftData,
    section: AppSection,
    exploreMode?: ExploreMode,
    partId?: string
  ) => void;
  onNavigateSection: (section: AppSection) => void;
  onBrowseJourneys: () => void;
  onClearLog: () => void;
}

type LogFilter = 'all' | 'badges' | 'parts' | 'motion' | 'stories-timelines' | 'trivia';
type SortOrder = 'newest' | 'oldest';

const KIND_META: Record<
  MissionMilestoneKind,
  { label: string; colorClass: string; dotColor: string; Icon: React.ComponentType<{ className?: string }> }
> = {
  'badge-earned': {
    label: 'Mission Badge',
    colorClass: 'text-amber-300',
    dotColor: '#F59E0B',
    Icon: Award,
  },
  'all-parts-completed': {
    label: '3D Mastery',
    colorClass: 'text-emerald-300',
    dotColor: '#34D399',
    Icon: CheckCircle2,
  },
  'part-inspected': {
    label: '3D Part Inspected',
    colorClass: 'text-sky-300',
    dotColor: '#38BDF8',
    Icon: Layers,
  },
  'motion-watched': {
    label: 'Space Motion',
    colorClass: 'text-teal-300',
    dotColor: '#2DD4BF',
    Icon: Orbit,
  },
  'timeline-explored': {
    label: 'Timeline',
    colorClass: 'text-indigo-300',
    dotColor: '#818CF8',
    Icon: Clock,
  },
  'story-completed': {
    label: 'Story Completed',
    colorClass: 'text-orange-300',
    dotColor: '#FB923C',
    Icon: BookOpen,
  },
  'trivia-level-completed': {
    label: 'Trivia Challenge',
    colorClass: 'text-yellow-300',
    dotColor: '#FACC15',
    Icon: Star,
  },
};

function matchesFilter(entry: MissionLogEntry, filter: LogFilter): boolean {
  if (filter === 'all') return true;
  if (filter === 'badges') return entry.kind === 'badge-earned';
  if (filter === 'parts') {
    return entry.kind === 'part-inspected' || entry.kind === 'all-parts-completed';
  }
  if (filter === 'motion') return entry.kind === 'motion-watched';
  if (filter === 'stories-timelines') {
    return entry.kind === 'story-completed' || entry.kind === 'timeline-explored';
  }
  return entry.kind === 'trivia-level-completed';
}

export const MissionLog: React.FC<MissionLogProps> = ({
  entries,
  onOpenCraftSection,
  onNavigateSection,
  onBrowseJourneys,
  onClearLog,
}) => {
  const [filter, setFilter] = useState<LogFilter>('all');
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [confirmClear, setConfirmClear] = useState(false);

  const counts = useMemo(() => {
    let badges = 0;
    let parts = 0;
    let motion = 0;
    let storiesTimelines = 0;
    let trivia = 0;
    for (const e of entries) {
      if (e.kind === 'badge-earned') badges++;
      else if (e.kind === 'part-inspected' || e.kind === 'all-parts-completed') parts++;
      else if (e.kind === 'motion-watched') motion++;
      else if (e.kind === 'story-completed' || e.kind === 'timeline-explored') {
        storiesTimelines++;
      } else if (e.kind === 'trivia-level-completed') trivia++;
    }
    return {
      total: entries.length,
      badges,
      parts,
      motion,
      storiesTimelines,
      trivia,
    };
  }, [entries]);

  const orderedEntries = useMemo(() => {
    const filtered = entries.filter((e) => matchesFilter(e, filter));
    const sorted = [...filtered].sort((a, b) =>
      sortOrder === 'newest'
        ? b.timestamp - a.timestamp
        : a.timestamp - b.timestamp
    );
    return sorted;
  }, [entries, filter, sortOrder]);

  return (
    <section
      id="mission-log"
      aria-label="Mission Log"
      className="bg-[#0b1020] border border-slate-800 rounded-2xl p-5 sm:p-7 space-y-6"
    >
      {/* Header & Clean Summary Strip */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 pb-5 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-300">
            <ScrollText className="w-4 h-4" />
            Chronological Explorer Record
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
            Mission Log
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Every 3D part you inspect, story you finish, timeline you explore, and badge you unlock is recorded here in order along your Cosmic Frontlines journey.
          </p>
        </div>

        {/* Unboxed Tabular Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 shrink-0 pt-2 lg:pt-0">
          <div>
            <div className="text-xs text-slate-400">Milestones</div>
            <div className="font-mono-tabular text-xl font-bold text-white mt-0.5">
              {counts.total}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Badges</div>
            <div className="font-mono-tabular text-xl font-bold text-amber-300 mt-0.5">
              {counts.badges}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400">3D Parts</div>
            <div className="font-mono-tabular text-xl font-bold text-sky-300 mt-0.5">
              {counts.parts}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Stories & Trivia</div>
            <div className="font-mono-tabular text-xl font-bold text-emerald-300 mt-0.5">
              {counts.storiesTimelines + counts.trivia}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs + Chronological Sort & Clear Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800">
          {(
            [
              { id: 'all', label: `All (${counts.total})` },
              { id: 'badges', label: `Badges (${counts.badges})` },
              { id: 'parts', label: `3D Parts (${counts.parts})` },
              { id: 'motion', label: `Motion (${counts.motion})` },
              { id: 'stories-timelines', label: `Stories & Timelines (${counts.storiesTimelines})` },
              { id: 'trivia', label: `Trivia (${counts.trivia})` },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                filter === tab.id
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() =>
              setSortOrder((prev) => (prev === 'newest' ? 'oldest' : 'newest'))
            }
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 hover:border-slate-500 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-sky-400" />
            <span>{sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}</span>
          </button>

          {entries.length > 0 && !confirmClear && (
            <button
              type="button"
              onClick={() => setConfirmClear(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-400 hover:text-rose-300 hover:border-rose-500/40 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Log</span>
            </button>
          )}

          {confirmClear && (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  onClearLog();
                  setConfirmClear(false);
                }}
                className="px-3 py-1.5 rounded-lg bg-rose-500 text-slate-950 text-xs font-bold hover:bg-rose-400 transition-colors whitespace-nowrap cursor-pointer"
              >
                Confirm Clear
              </button>
              <button
                type="button"
                onClick={() => setConfirmClear(false)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Empty State */}
      {orderedEntries.length === 0 && (
        <div className="py-12 text-center border border-slate-800 rounded-xl bg-slate-900/40 px-4">
          <Compass className="w-9 h-9 text-slate-500 mx-auto mb-2.5" />
          <p className="font-display text-lg font-bold text-white">
            {entries.length === 0
              ? 'Your Mission Log is ready for liftoff'
              : 'No milestones in this filter yet'}
          </p>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-md mx-auto">
            {entries.length === 0
              ? `Choose any spacecraft from the ${SPACECRAFT_CATEGORIES.length} Space Journeys to inspect 3D parts, watch it in motion, explore timelines, or finish a story.`
              : 'Try switching to All milestones or explore more missions to log new achievements.'}
          </p>
          {entries.length === 0 && (
            <button
              type="button"
              onClick={onBrowseJourneys}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 text-slate-950 text-xs sm:text-sm font-semibold hover:bg-amber-400 transition-colors cursor-pointer"
            >
              <span>Browse {SPACECRAFT_CATEGORIES.length} Space Journeys</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Chronological Timeline List */}
      {orderedEntries.length > 0 && (
        <ol className="relative pl-7 space-y-5 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-px before:bg-slate-800">
          {orderedEntries.map((entry, idx) => {
            const meta = KIND_META[entry.kind];
            const Icon = meta.Icon;
            const craft = entry.craftId
              ? SPACECRAFT_LIST.find((c) => c.id === entry.craftId)
              : undefined;
            const category = craft
              ? SPACECRAFT_CATEGORIES.find((cat) => cat.id === craft.categoryId)
              : undefined;
            const logNumber =
              sortOrder === 'newest' ? orderedEntries.length - idx : idx + 1;

            return (
              <li key={entry.id} className="relative">
                {/* Timeline node marker */}
                <span
                  aria-hidden="true"
                  className="absolute -left-7 top-3 w-5 h-5 rounded-full bg-[#0b1020] border border-slate-700 flex items-center justify-center"
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: meta.dotColor }}
                  />
                </span>

                <div className="rounded-xl border border-slate-800/90 bg-slate-900/60 hover:border-slate-700 transition-colors p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5 min-w-0 flex-1">
                    {craft && (
                      <SpacecraftImage
                        craftId={craft.id}
                        alt={`${craft.shortName} preview`}
                        title={craft.shortName}
                        accentHex={category?.accentHex}
                        className="hidden sm:block w-20 aspect-[16/10] rounded-lg shrink-0 mt-0.5"
                      />
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs">
                        <span className="font-mono-tabular text-slate-400">
                          #{String(logNumber).padStart(2, '0')}
                        </span>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className={`inline-flex items-center gap-1 font-semibold ${meta.colorClass}`}>
                          <Icon className="w-3.5 h-3.5 shrink-0" />
                          <span>{meta.label}</span>
                        </span>
                        {category && (
                          <>
                            <span aria-hidden="true" className="text-slate-600">·</span>
                            <span style={{ color: category.accentHex }}>
                              {category.title}
                            </span>
                          </>
                        )}
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <time
                          dateTime={new Date(entry.timestamp).toISOString()}
                          className="font-mono-tabular text-slate-400"
                        >
                          {formatMissionTimestamp(entry.timestamp)}
                        </time>
                      </div>

                      <h2 className="font-display text-base sm:text-lg font-bold text-white mt-1 leading-snug">
                        {entry.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                        {entry.detail}
                      </p>
                    </div>
                  </div>

                  {/* Quick Revisit Action */}
                  {craft && entry.section ? (
                    <button
                      type="button"
                      onClick={() =>
                        onOpenCraftSection(
                          craft,
                          entry.section!,
                          entry.exploreMode,
                          entry.partId
                        )
                      }
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:border-amber-400 text-xs font-semibold text-slate-200 hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 self-start sm:self-center cursor-pointer"
                    >
                      <span>Revisit</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : entry.section === 'trivia' ? (
                    <button
                      type="button"
                      onClick={() => onNavigateSection('trivia')}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:border-amber-400 text-xs font-semibold text-slate-200 hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 self-start sm:self-center cursor-pointer"
                    >
                      <span>Open Trivia</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
};
