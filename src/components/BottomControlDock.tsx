import React from 'react';
import {
  Check,
  ChevronDown,
  ChevronUp,
  Orbit,
  Radio,
  RotateCcw,
  Volume2,
  VolumeX,
  Wrench,
  X,
} from 'lucide-react';
import { ExploreMode, SpacecraftCategory, SpacecraftData } from '../types/spacecraft';

interface BottomControlDockProps {
  craft: SpacecraftData;
  category: SpacecraftCategory;
  exploreMode: ExploreMode;
  onChangeMode: (mode: ExploreMode) => void;
  explodeAmount: number;
  onChangeExplode: (val: number) => void;
  motionSpeed: number;
  onChangeMotionSpeed: (val: number) => void;
  selectedPartId: string | null;
  visitedPartIds?: string[];
  onSelectPart: (partId: string | null) => void;
  onResetCamera: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onPlaySputnikBeep: () => void;
  dockCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const BottomControlDock: React.FC<BottomControlDockProps> = ({
  craft,
  category,
  exploreMode,
  onChangeMode,
  explodeAmount,
  onChangeExplode,
  motionSpeed,
  onChangeMotionSpeed,
  selectedPartId,
  visitedPartIds = [],
  onSelectPart,
  onResetCamera,
  soundEnabled,
  onToggleSound,
  onPlaySputnikBeep,
  dockCollapsed,
  onToggleCollapse,
}) => {
  const selectedPart =
    craft.parts.find((p) => p.id === selectedPartId) ?? null;

  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
      style={{ width: 'min(940px, 94vw)' }}
    >
      {/* Part Explanation Card (only shown when a part is selected in Inspect mode and dock isn't collapsed) */}
      {!dockCollapsed && exploreMode === 'inspect' && selectedPart && (
        <div className="pointer-events-auto w-full max-w-2xl bg-[#0b1020]/95 border border-amber-400/40 rounded-xl p-4 shadow-xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs text-amber-300/90 font-medium mb-0.5">
                {craft.shortName} · {selectedPart.role}
              </div>
              <h3 className="font-display text-lg font-bold text-white">
                {selectedPart.name}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onSelectPart(null)}
              aria-label="Close part explanation"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="mt-2 text-sm text-slate-200 leading-relaxed">
            {selectedPart.howItWorked}
          </p>
          <p className="mt-2 text-xs text-sky-300 leading-relaxed">
            <span className="font-semibold text-sky-200">Fun Fact: </span>
            {selectedPart.funFact}
          </p>
        </div>
      )}

      {/* Motion Caption Banner when in Planet/Space Motion mode */}
      {!dockCollapsed && exploreMode === 'motion' && (
        <div className="pointer-events-auto w-full max-w-2xl bg-[#0b1020]/95 border border-slate-700/80 rounded-xl px-4 py-2.5 flex items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-sky-300 mr-2">
              {craft.destination}
            </span>
            <span className="text-xs text-slate-200">
              {craft.motionCaption}
            </span>
          </div>
          {craft.id === 'sputnik-1' && (
            <button
              type="button"
              onClick={onPlaySputnikBeep}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/20 border border-sky-400/40 text-xs font-semibold text-sky-200 hover:bg-sky-500/30 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Radio className="w-3.5 h-3.5" />
              Hear Beep
            </button>
          )}
        </div>
      )}

      {/* Collapse / Expand Toggle Button */}
      <button
        type="button"
        onClick={onToggleCollapse}
        className="pointer-events-auto flex items-center gap-1.5 px-3.5 py-1 rounded-t-lg bg-[#0b1020]/95 border border-b-0 border-slate-700/80 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
      >
        {dockCollapsed ? (
          <>
            <ChevronUp className="w-3.5 h-3.5" />
            Show Controls
          </>
        ) : (
          <>
            <ChevronDown className="w-3.5 h-3.5" />
            Hide Controls
          </>
        )}
      </button>

      {/* Main Collapsible Dock Bar */}
      <div
        className={`pointer-events-auto w-full bg-[#0b1020]/95 border border-slate-700/80 rounded-xl px-4 py-3 transition-transform duration-200 ${
          dockCollapsed ? 'translate-y-[120%] opacity-0 pointer-events-none h-0 overflow-hidden py-0 border-0' : 'translate-y-0 opacity-100'
        }`}
      >
        {/* Row 1: Mode Switch, Context Slider, Utility Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Segmented Mode Switcher */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800">
            <button
              type="button"
              onClick={() => onChangeMode('inspect')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                exploreMode === 'inspect'
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              Inspect Parts
            </button>
            <button
              type="button"
              onClick={() => onChangeMode('motion')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                exploreMode === 'motion'
                  ? 'bg-sky-500 text-slate-950'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Orbit className="w-3.5 h-3.5" />
              Watch in Space
            </button>
          </div>

          {/* Slider: Exploded View (Inspect) or Speed (Motion) */}
          {exploreMode === 'inspect' ? (
            <label className="flex items-center gap-2.5 text-xs text-slate-300 min-w-[190px] flex-1 max-w-xs">
              <span className="whitespace-nowrap font-medium">
                Explode View
              </span>
              <input
                type="range"
                min={0}
                max={100}
                value={Math.round(explodeAmount * 100)}
                onChange={(e) => onChangeExplode(Number(e.target.value) / 100)}
                className="cosmic-slider flex-1"
              />
              <span className="font-mono-tabular text-amber-300 w-9 text-right">
                {Math.round(explodeAmount * 100)}%
              </span>
            </label>
          ) : (
            <label className="flex items-center gap-2.5 text-xs text-slate-300 min-w-[190px] flex-1 max-w-xs">
              <span className="whitespace-nowrap font-medium">
                Mission Speed
              </span>
              <input
                type="range"
                min={25}
                max={250}
                step={25}
                value={Math.round(motionSpeed * 100)}
                onChange={(e) => onChangeMotionSpeed(Number(e.target.value) / 100)}
                className="cosmic-slider flex-1"
              />
              <span className="font-mono-tabular text-sky-300 w-10 text-right">
                {motionSpeed.toFixed(1)}x
              </span>
            </label>
          )}

          {/* Reset Camera & Audio */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onResetCamera}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-xs font-medium text-slate-200 hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset View
            </button>
            <button
              type="button"
              onClick={onToggleSound}
              aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-xs font-medium text-slate-200 hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                  Sound On
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                  Muted
                </>
              )}
            </button>
          </div>
        </div>

        {/* Row 2: Selectable Parts Strip (in Inspect mode) */}
        {exploreMode === 'inspect' && (
          <div className="mt-2.5 pt-2.5 border-t border-slate-800/90 flex items-center gap-2 overflow-x-auto cosmic-scroll pb-0.5">
            <span
              className="text-xs font-medium whitespace-nowrap shrink-0 mr-1"
              style={{ color: category.accentHex }}
            >
              Click 3D part or select:
            </span>
            {craft.parts.map((part) => {
              const isSelected = selectedPartId === part.id;
              const isVisited = visitedPartIds.includes(part.id);
              return (
                <button
                  key={part.id}
                  type="button"
                  onClick={() => onSelectPart(isSelected ? null : part.id)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 font-semibold'
                      : isVisited
                        ? 'bg-slate-900 text-emerald-300 border border-emerald-500/35 hover:border-emerald-400'
                        : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-600 hover:text-white'
                  }`}
                >
                  {isVisited && !isSelected && (
                    <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                  )}
                  <span>{part.name}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
