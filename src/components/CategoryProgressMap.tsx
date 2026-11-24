import React, { useMemo } from 'react';
import { Check, Compass } from 'lucide-react';
import { SPACECRAFT_CATEGORIES, SPACECRAFT_LIST } from '../data/spacecraftData';
import { BadgeProgressMap, CategoryId } from '../types/spacecraft';
import { getCraftCompletionStats, getCraftProgress } from '../utils/badgeProgress';
import { sfx } from '../utils/soundEffects';

interface CategoryProgressMapProps {
  badgeProgress: BadgeProgressMap;
  selectedCategoryId: CategoryId;
  onSelectCategory: (catId: CategoryId) => void;
}

interface CategoryProgressNode {
  id: CategoryId;
  index: number;
  title: string;
  accentHex: string;
  craftCount: number;
  badgesEarned: number;
  fillPercent: number;
  craftBars: {
    id: string;
    shortName: string;
    percent: number;
    earned: boolean;
  }[];
}

// Desktop SVG coordinate centers for equal columns in viewBox="0 0 {N * 200} 132"
const COL_WIDTH = 200;
const getNodeX = (idx: number) => idx * COL_WIDTH + COL_WIDTH / 2;
const getNodeY = (idx: number) => (idx % 2 === 1 ? 82 : 46);

function buildConnectorPath(idx: number): string {
  const x1 = getNodeX(idx);
  const y1 = getNodeY(idx);
  const x2 = getNodeX(idx + 1);
  const y2 = getNodeY(idx + 1);
  const mx = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
}

export const CategoryProgressMap: React.FC<CategoryProgressMapProps> = ({
  badgeProgress,
  selectedCategoryId,
  onSelectCategory,
}) => {
  const { nodes, totalEarnedBadges, totalCrafts, overallPercent } = useMemo(() => {
    let earnedSum = 0;
    let totalProgressSum = 0;

    const computed: CategoryProgressNode[] = SPACECRAFT_CATEGORIES.map((cat, idx) => {
      const crafts = SPACECRAFT_LIST.filter((c) => c.categoryId === cat.id);
      let catFillSum = 0;
      let catBadges = 0;

      const craftBars = crafts.map((craft) => {
        const stats = getCraftCompletionStats(
          craft,
          getCraftProgress(badgeProgress, craft.id)
        );
        const partsRatio =
          stats.partsTotal > 0 ? stats.partsCount / stats.partsTotal : 0;
        const craftFraction =
          (partsRatio +
            (stats.motionDone ? 1 : 0) +
            (stats.timelineDone ? 1 : 0) +
            (stats.storyDone ? 1 : 0)) /
          4;

        catFillSum += craftFraction;
        totalProgressSum += craftFraction;
        if (stats.earned) {
          catBadges += 1;
          earnedSum += 1;
        }

        return {
          id: craft.id,
          shortName: craft.shortName,
          percent: Math.round(craftFraction * 100),
          earned: stats.earned,
        };
      });

      const fillPercent =
        crafts.length > 0 ? Math.round((catFillSum / crafts.length) * 100) : 0;

      return {
        id: cat.id,
        index: idx,
        title: cat.title,
        accentHex: cat.accentHex,
        craftCount: crafts.length,
        badgesEarned: catBadges,
        fillPercent,
        craftBars,
      };
    });

    const overall =
      SPACECRAFT_LIST.length > 0
        ? Math.round((totalProgressSum / SPACECRAFT_LIST.length) * 100)
        : 0;

    return {
      nodes: computed,
      totalEarnedBadges: earnedSum,
      totalCrafts: SPACECRAFT_LIST.length,
      overallPercent: overall,
    };
  }, [badgeProgress]);

  return (
    <section
      aria-label="Cosmic Frontlines Category Progress Map"
      className="bg-[#0b1020] border border-slate-800 rounded-2xl p-5 sm:p-6"
    >
      {/* Map Header & Overall Mission Completion Readout */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-300">
            <Compass className="w-4 h-4" />
            <span>Frontier Route Map</span>
          </div>
          <h2 className="font-display text-lg sm:text-xl font-bold text-white mt-0.5">
            {nodes.length} Space Chapters Progress
          </h2>
        </div>

        <div className="flex items-center gap-4 text-xs sm:text-sm">
          <div className="text-slate-300">
            <span className="font-mono-tabular font-bold text-white">
              {totalEarnedBadges}/{totalCrafts}
            </span>{' '}
            <span className="text-slate-400">Badges</span>
          </div>
          <span aria-hidden="true" className="text-slate-700">
            ·
          </span>
          <div className="text-slate-300">
            <span className="font-mono-tabular font-bold text-amber-300">
              {overallPercent}%
            </span>{' '}
            <span className="text-slate-400">Complete</span>
          </div>
        </div>
      </div>

      {/* Desktop View (lg+): Interconnected Curved Trajectory Across All 7 Nodes */}
      <div className="hidden lg:block pt-5 pb-1">
        <div className="relative">
          {/* Interconnecting Orbital Trajectory SVG */}
          <svg
            viewBox={`0 0 ${nodes.length * COL_WIDTH} 132`}
            preserveAspectRatio="none"
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 w-full h-[132px]"
          >
            <defs>
              {nodes.slice(0, -1).map((node, idx) => {
                const nextNode = nodes[idx + 1];
                return (
                  <linearGradient
                    key={`grad-${node.id}`}
                    id={`route-grad-${node.id}`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor={node.accentHex} />
                    <stop offset="100%" stopColor={nextNode.accentHex} />
                  </linearGradient>
                );
              })}
            </defs>

            {nodes.slice(0, -1).map((node, idx) => {
              const nextNode = nodes[idx + 1];
              const d = buildConnectorPath(idx);
              const isCompletedLink = node.fillPercent === 100 && nextNode.fillPercent > 0;
              const isActiveLink = node.fillPercent > 0 || nextNode.fillPercent > 0;

              return (
                <g key={`link-${node.id}`}>
                  {/* Base dark dashed orbital track */}
                  <path
                    d={d}
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="2.5"
                    strokeDasharray="6 6"
                  />
                  {/* Illuminated mission progress link */}
                  {isActiveLink && (
                    <path
                      d={d}
                      fill="none"
                      stroke={`url(#route-grad-${node.id})`}
                      strokeWidth={isCompletedLink ? '3' : '2.25'}
                      strokeOpacity={
                        node.fillPercent === 100
                          ? 0.9
                          : Math.max(0.28, (node.fillPercent + nextNode.fillPercent) / 200)
                      }
                      strokeLinecap="round"
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* Equal-Width Columns Aligned to Exact SVG Centers */}
          <div
            className="relative z-10 grid"
            style={{ gridTemplateColumns: `repeat(${nodes.length}, minmax(0, 1fr))` }}
          >
            {nodes.map((node, idx) => {
              const isOdd = idx % 2 === 1;
              const isComplete = node.fillPercent === 100;
              const isStarted = node.fillPercent > 0;
              const isSelected = node.id === selectedCategoryId;

              const radius = 32;
              const circumference = 2 * Math.PI * radius;
              const dashOffset =
                circumference - (circumference * node.fillPercent) / 100;
              // Liquid fill Y inside an 80x80 circle (r=30 internal fill)
              const fillHeight = (60 * node.fillPercent) / 100;
              const fillY = 70 - fillHeight;

              return (
                <div key={node.id} className="px-2 flex flex-col items-center">
                  {/* Fixed 132px Node Ring Stage matching SVG coordinates */}
                  <div className="h-[132px] w-full flex justify-center items-start">
                    <button
                      type="button"
                      onClick={() => {
                        sfx.playPartSelect();
                        onSelectCategory(node.id);
                      }}
                      aria-label={`${node.title}: ${node.fillPercent}% complete, ${node.badgesEarned} of ${node.craftCount} badges earned`}
                      style={{
                        marginTop: isOdd ? '42px' : '6px',
                      }}
                      className={`group relative w-20 h-20 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                        isSelected ? 'ring-1 ring-slate-600/80 ring-offset-2 ring-offset-[#0b1020]' : ''
                      }`}
                    >
                      <svg
                        viewBox="0 0 80 80"
                        className="w-20 h-20 overflow-visible"
                        aria-hidden="true"
                      >
                        <defs>
                          <clipPath id={`node-clip-${node.id}`}>
                            <circle cx="40" cy="40" r="28" />
                          </clipPath>
                        </defs>

                        {/* Solid dark backdrop covering connector line cleanly */}
                        <circle
                          cx="40"
                          cy="40"
                          r="36"
                          fill="#0b1020"
                          stroke={isStarted ? node.accentHex : '#1e293b'}
                          strokeOpacity={isStarted ? 0.35 : 0.9}
                          strokeWidth="1"
                        />

                        {/* Inner liquid/energy rising fill */}
                        <g clipPath={`url(#node-clip-${node.id})`}>
                          <rect
                            x="10"
                            y="10"
                            width="60"
                            height="60"
                            fill="#0f172a"
                          />
                          {node.fillPercent > 0 && (
                            <rect
                              x="10"
                              y={fillY}
                              width="60"
                              height={fillHeight + 2}
                              fill={node.accentHex}
                              fillOpacity={isComplete ? 0.36 : 0.28}
                              style={{
                                transition: 'y 400ms ease, height 400ms ease',
                              }}
                            />
                          )}
                          {node.fillPercent > 0 && node.fillPercent < 100 && (
                            <line
                              x1="10"
                              y1={fillY}
                              x2="70"
                              y2={fillY}
                              stroke={node.accentHex}
                              strokeWidth="1.5"
                              strokeOpacity="0.85"
                            />
                          )}
                        </g>

                        {/* Outer track ring */}
                        <circle
                          cx="40"
                          cy="40"
                          r={radius}
                          fill="none"
                          stroke="#1e293b"
                          strokeWidth="4.5"
                        />

                        {/* Outer filling progress arc */}
                        {node.fillPercent > 0 && (
                          <circle
                            cx="40"
                            cy="40"
                            r={radius}
                            fill="none"
                            stroke={node.accentHex}
                            strokeWidth="4.5"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={dashOffset}
                            transform="rotate(-90 40 40)"
                            style={{
                              transition: 'stroke-dashoffset 400ms ease',
                            }}
                          />
                        )}
                      </svg>

                      {/* Center Value Overlay */}
                      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                        {isComplete ? (
                          <Check
                            className="w-6 h-6"
                            style={{ color: node.accentHex }}
                          />
                        ) : (
                          <span className="font-mono-tabular text-sm font-bold text-white">
                            {node.fillPercent}%
                          </span>
                        )}
                      </div>
                    </button>
                  </div>

                  {/* Node Label & Per-Craft Sub-Progress Bars */}
                  <button
                    type="button"
                    onClick={() => {
                      sfx.playPartSelect();
                      onSelectCategory(node.id);
                    }}
                    className="mt-2 text-center w-full cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg px-1 py-1"
                  >
                    <div
                      className="font-mono-tabular text-[11px] font-semibold"
                      style={{ color: node.accentHex }}
                    >
                      0{idx + 1} · {node.badgesEarned}/{node.craftCount} Badges
                    </div>
                    <div className="font-display text-sm font-bold text-white group-hover:text-amber-300 transition-colors truncate mt-0.5">
                      {node.title}
                    </div>

                    {/* Individual Spacecraft Fill Bars */}
                    <div
                      className="mt-2 grid gap-1 max-w-[116px] mx-auto"
                      style={{
                        gridTemplateColumns: `repeat(${node.craftBars.length}, minmax(0, 1fr))`,
                      }}
                      title={node.craftBars
                        .map((b) => `${b.shortName}: ${b.percent}%`)
                        .join(' | ')}
                    >
                      {node.craftBars.map((bar) => (
                        <div
                          key={bar.id}
                          className="h-1.5 rounded-full bg-slate-800 overflow-hidden"
                        >
                          <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{
                              width: `${bar.percent}%`,
                              backgroundColor: node.accentHex,
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile & Tablet View (< lg): Vertical Interconnected Route */}
      <div className="lg:hidden pt-4">
        <ol className="relative space-y-3">
          {nodes.map((node, idx) => {
            const isComplete = node.fillPercent === 100;
            const isLast = idx === nodes.length - 1;
            const radius = 20;
            const circumference = 2 * Math.PI * radius;
            const dashOffset =
              circumference - (circumference * node.fillPercent) / 100;
            const fillHeight = (36 * node.fillPercent) / 100;
            const fillY = 42 - fillHeight;

            return (
              <li key={node.id} className="relative flex items-stretch gap-3">
                {/* Interconnecting Vertical Line Between Nodes */}
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-[34px] -translate-x-1/2 top-1/2 bottom-[-26px] w-0.5 z-0"
                    style={{
                      backgroundColor:
                        node.fillPercent > 0 ? node.accentHex : '#1e293b',
                      opacity: node.fillPercent === 100 ? 0.8 : node.fillPercent > 0 ? 0.4 : 1,
                    }}
                  />
                )}

                {/* Clickable Node Row */}
                <button
                  type="button"
                  onClick={() => {
                    sfx.playPartSelect();
                    onSelectCategory(node.id);
                  }}
                  className="relative z-10 w-full flex items-center gap-3.5 p-2.5 rounded-xl border border-slate-800/90 bg-[#0f1628] hover:border-amber-400/60 hover:bg-slate-900 transition-colors text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  {/* Circular Fill Node */}
                  <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
                    <svg viewBox="0 0 48 48" className="w-12 h-12" aria-hidden="true">
                      <defs>
                        <clipPath id={`mobile-clip-${node.id}`}>
                          <circle cx="24" cy="24" r="18" />
                        </clipPath>
                      </defs>
                      <circle cx="24" cy="24" r="22" fill="#0b1020" />
                      <g clipPath={`url(#mobile-clip-${node.id})`}>
                        <rect x="6" y="6" width="36" height="36" fill="#0f172a" />
                        {node.fillPercent > 0 && (
                          <rect
                            x="6"
                            y={fillY}
                            width="36"
                            height={fillHeight + 2}
                            fill={node.accentHex}
                            fillOpacity="0.32"
                          />
                        )}
                      </g>
                      <circle
                        cx="24"
                        cy="24"
                        r={radius}
                        fill="none"
                        stroke="#1e293b"
                        strokeWidth="3.5"
                      />
                      {node.fillPercent > 0 && (
                        <circle
                          cx="24"
                          cy="24"
                          r={radius}
                          fill="none"
                          stroke={node.accentHex}
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeDasharray={circumference}
                          strokeDashoffset={dashOffset}
                          transform="rotate(-90 24 24)"
                        />
                      )}
                    </svg>
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      {isComplete ? (
                        <Check
                          className="w-4 h-4"
                          style={{ color: node.accentHex }}
                        />
                      ) : (
                        <span className="font-mono-tabular text-[11px] font-bold text-white">
                          {node.fillPercent}%
                        </span>
                      )}
                    </span>
                  </div>

                  {/* Category Info & 3 Craft Bars */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-display text-sm sm:text-base font-bold text-white truncate">
                        0{idx + 1}. {node.title}
                      </span>
                      <span className="font-mono-tabular text-xs text-slate-400 shrink-0">
                        {node.badgesEarned}/{node.craftCount} Badges
                      </span>
                    </div>

                    <div
                      className="mt-2 grid gap-1.5"
                      style={{
                        gridTemplateColumns: `repeat(${node.craftBars.length}, minmax(0, 1fr))`,
                      }}
                    >
                      {node.craftBars.map((bar) => (
                        <div key={bar.id} className="min-w-0">
                          <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-300"
                              style={{
                                width: `${bar.percent}%`,
                                backgroundColor: node.accentHex,
                              }}
                            />
                          </div>
                          <div className="text-[10px] text-slate-400 truncate mt-0.5">
                            {bar.shortName}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};
