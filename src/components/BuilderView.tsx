import React, { useState } from 'react';
import { GripVertical, Layers, Play, RotateCcw, Shuffle, Sparkles, Square } from 'lucide-react';
import {
  BUILDER_COMPONENTS,
  BUILDER_SLOTS,
  evaluateCustomCraft,
} from '../data/builderData';
import {
  BuilderComponent,
  BuilderSlotId,
  CustomCraftConfig,
} from '../types/spacecraft';
import { sfx } from '../utils/soundEffects';

interface BuilderViewProps {
  config: CustomCraftConfig;
  onChangeConfig: (next: CustomCraftConfig) => void;
  testLaunching: boolean;
  onToggleLaunch: () => void;
  explodePreview: boolean;
  onToggleExplode: () => void;
  activeSlot: BuilderSlotId;
  onSelectSlot: (slot: BuilderSlotId) => void;
}

export const BuilderView: React.FC<BuilderViewProps> = ({
  config,
  onChangeConfig,
  testLaunching,
  onToggleLaunch,
  explodePreview,
  onToggleExplode,
  activeSlot,
  onSelectSlot,
}) => {
  const [draggingComp, setDraggingComp] = useState<BuilderComponent | null>(null);
  const [hoverSlot, setHoverSlot] = useState<BuilderSlotId | null>(null);
  const [justEquippedSlot, setJustEquippedSlot] = useState<BuilderSlotId | null>(null);

  const report = evaluateCustomCraft(config);
  const activeComponent =
    BUILDER_COMPONENTS.find((c) => c.id === config[activeSlot]) ?? BUILDER_COMPONENTS[0];

  const equipComponent = (comp: BuilderComponent) => {
    onChangeConfig({
      ...config,
      [comp.slot]: comp.id,
    });
    onSelectSlot(comp.slot);
    sfx.playPartSelect();
    setJustEquippedSlot(comp.slot);
    window.setTimeout(() => {
      setJustEquippedSlot((curr) => (curr === comp.slot ? null : curr));
    }, 650);
  };

  const handleRandomize = () => {
    const pick = (slot: BuilderSlotId) => {
      const choices = BUILDER_COMPONENTS.filter((c) => c.slot === slot);
      return choices[Math.floor(Math.random() * choices.length)].id;
    };
    onChangeConfig({
      core: pick('core'),
      power: pick('power'),
      instrument: pick('instrument'),
      propulsion: pick('propulsion'),
    });
    sfx.playTriviaCorrect();
  };

  const handleReset = () => {
    onChangeConfig({
      core: 'core-gold-bus',
      power: 'power-windmill-solar',
      instrument: 'inst-radio-dish',
      propulsion: 'prop-ion-thruster',
    });
    sfx.playPartSelect();
  };

  const slotComponents = BUILDER_COMPONENTS.filter((c) => c.slot === activeSlot);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-14 bottom-0 z-10 flex flex-col justify-between p-3 sm:p-5 overflow-hidden">
      {/* Top-Center Compact Codename + Controls Banner */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="pointer-events-auto bg-[#0b1020]/94 border border-slate-800 rounded-xl px-4 py-2.5 max-w-md">
          <div className="text-xs font-medium text-amber-300">
            Cosmic Frontlines Hangar · {report.bestDestination}
          </div>
          <h1 className="font-display text-lg sm:text-xl font-bold text-white leading-tight mt-0.5">
            {report.codename}
          </h1>
          <p className="text-xs text-slate-300 mt-0.5 leading-snug">
            Drag any part from the left palette onto a slot on the right—or click a part to snap it onto your 3D ship!
          </p>
        </div>

        <div className="pointer-events-auto flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onToggleExplode}
            disabled={testLaunching}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
              explodePreview && !testLaunching
                ? 'bg-sky-500 text-slate-950 border-sky-400'
                : 'bg-[#0b1020]/94 text-slate-200 border-slate-700 hover:border-slate-500'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            {explodePreview && !testLaunching ? 'Assemble View' : 'Separate Parts'}
          </button>

          <button
            type="button"
            onClick={handleRandomize}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-[#0b1020]/94 border border-slate-700 text-slate-200 hover:border-slate-500 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Shuffle className="w-3.5 h-3.5 text-amber-400" />
            Mix Parts
          </button>

          <button
            type="button"
            onClick={handleReset}
            aria-label="Reset custom spacecraft"
            className="p-2 rounded-lg bg-[#0b1020]/94 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => {
              onToggleLaunch();
              if (!testLaunching) {
                sfx.playTriviaCorrect();
              }
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              testLaunching
                ? 'bg-rose-500 text-white hover:bg-rose-400'
                : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
            }`}
          >
            {testLaunching ? (
              <>
                <Square className="w-3.5 h-3.5 fill-current" />
                Return to Hangar
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                Test Launch in Space
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Side Panels leaving center 3D viewport open */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row items-stretch justify-between gap-3 mt-3">
        {/* LEFT: Draggable Component Palette */}
        <aside className="pointer-events-auto w-full lg:w-76 bg-[#0b1020]/94 border border-slate-800 rounded-2xl p-3.5 flex flex-col max-h-56 lg:max-h-full overflow-hidden">
          <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-800">
            <span className="font-display text-sm font-bold text-white">
              Component Parts Dock
            </span>
            <span className="text-[11px] text-slate-400">Drag or Click</span>
          </div>

          {/* Slot Category Filter Tabs */}
          <div className="grid grid-cols-4 gap-1 mt-2.5">
            {BUILDER_SLOTS.map((s) => {
              const selected = activeSlot === s.id;
              const shortLabel =
                s.id === 'core'
                  ? 'Core'
                  : s.id === 'power'
                    ? 'Power'
                    : s.id === 'instrument'
                      ? 'Sensors'
                      : 'Drive';
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onSelectSlot(s.id)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    selected
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                  }`}
                >
                  {shortLabel}
                </button>
              );
            })}
          </div>

          {/* Draggable Cards for Selected Category */}
          <div className="flex-1 overflow-y-auto cosmic-scroll mt-2.5 space-y-2 pr-0.5">
            {slotComponents.map((comp) => {
              const isEquipped = config[comp.slot] === comp.id;
              return (
                <div
                  key={comp.id}
                  draggable
                  onDragStart={(e) => {
                    setDraggingComp(comp);
                    e.dataTransfer.setData('text/plain', comp.id);
                    e.dataTransfer.effectAllowed = 'move';
                  }}
                  onDragEnd={() => {
                    setDraggingComp(null);
                    setHoverSlot(null);
                  }}
                  onClick={() => equipComponent(comp)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      equipComponent(comp);
                    }
                  }}
                  className={`group select-none rounded-xl border p-3 transition-all cursor-grab active:cursor-grabbing ${
                    isEquipped
                      ? 'bg-slate-800/90 border-amber-400'
                      : 'bg-slate-900/75 border-slate-800 hover:border-slate-600 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: comp.accentHex }}
                        />
                        <span className="font-display text-sm font-bold text-white truncate">
                          {comp.name}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {comp.role}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {isEquipped && (
                        <span className="text-[11px] font-semibold text-amber-300">
                          Fitted
                        </span>
                      )}
                      <GripVertical className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 mt-1.5 leading-snug">
                    {comp.missionBonus}
                  </p>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Center Spacer so the 3D spacecraft canvas stays cleanly open */}
        <div className="hidden lg:block flex-1 pointer-events-none" />

        {/* RIGHT: Drop-Zone Assembly Slots + Cosmic Frontlines Explanation + Telemetry */}
        <aside className="pointer-events-auto w-full lg:w-88 bg-[#0b1020]/94 border border-slate-800 rounded-2xl p-3.5 flex flex-col max-h-72 lg:max-h-full overflow-y-auto cosmic-scroll space-y-3">
          <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-800">
            <span className="font-display text-sm font-bold text-white">
              Assembly Bays (Drop Here)
            </span>
            <span className="text-[11px] text-sky-300">4 Slots Connected</span>
          </div>

          {/* 4 Drop Zones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
            {BUILDER_SLOTS.map((slot) => {
              const equipped = BUILDER_COMPONENTS.find((c) => c.id === config[slot.id])!;
              const isDropTarget =
                hoverSlot === slot.id && draggingComp?.slot === slot.id;
              const isCompatibleDrag = draggingComp?.slot === slot.id;
              const isSelectedSlot = activeSlot === slot.id;
              const justSnapped = justEquippedSlot === slot.id;

              return (
                <div
                  key={slot.id}
                  onClick={() => onSelectSlot(slot.id)}
                  onDragOver={(e) => {
                    e.preventDefault();
                    if (draggingComp && draggingComp.slot === slot.id) {
                      setHoverSlot(slot.id);
                      e.dataTransfer.dropEffect = 'move';
                    }
                  }}
                  onDragLeave={() => {
                    if (hoverSlot === slot.id) setHoverSlot(null);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    setHoverSlot(null);
                    const compId = e.dataTransfer.getData('text/plain');
                    const dropped = BUILDER_COMPONENTS.find((c) => c.id === compId) ?? draggingComp;
                    if (dropped) {
                      equipComponent(dropped);
                    }
                    setDraggingComp(null);
                  }}
                  className={`rounded-xl border p-2.5 transition-all cursor-pointer ${
                    isDropTarget
                      ? 'bg-sky-500/20 border-sky-400 scale-[1.01]'
                      : justSnapped
                        ? 'bg-emerald-500/15 border-emerald-400'
                        : isCompatibleDrag
                          ? 'bg-amber-500/10 border-amber-400/70 border-dashed'
                          : isSelectedSlot
                            ? 'bg-slate-800/90 border-amber-400/80'
                            : 'bg-slate-900/75 border-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-medium text-slate-400">
                      {slot.label}
                    </span>
                    <span
                      className="text-[11px] font-semibold"
                      style={{ color: equipped.accentHex }}
                    >
                      {justSnapped ? 'Snapped!' : isCompatibleDrag ? 'Drop to Fit' : 'Installed'}
                    </span>
                  </div>
                  <div className="font-display text-sm font-bold text-white mt-0.5">
                    {equipped.name}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Component Cosmic Frontlines Explanation */}
          <div className="rounded-xl bg-slate-900/90 border border-slate-700/80 p-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
              How It Works on the Cosmic Frontlines
            </div>
            <div className="font-display text-sm font-bold text-white mt-1">
              {activeComponent.name}
            </div>
            <p className="text-xs text-slate-200 mt-1 leading-relaxed">
              {activeComponent.frontlineExplanation}
            </p>
          </div>

          {/* Performance Ratings */}
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Travel Speed</span>
              <span className="font-mono-tabular font-semibold text-sky-300">{report.speed}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-sky-400 transition-all duration-300"
                style={{ width: `${report.speed}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Cosmic Armor</span>
              <span className="font-mono-tabular font-semibold text-emerald-300">{report.defense}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-emerald-400 transition-all duration-300"
                style={{ width: `${report.defense}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Science Power</span>
              <span className="font-mono-tabular font-semibold text-amber-300">{report.science}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-amber-400 transition-all duration-300"
                style={{ width: `${report.science}%` }}
              />
            </div>

            <p className="text-[11px] text-slate-300 pt-1 leading-snug">
              {report.readinessSummary}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};
