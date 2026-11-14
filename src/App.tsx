import { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, Award, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { SPACECRAFT_CATEGORIES, SPACECRAFT_LIST } from './data/spacecraftData';
import { DEFAULT_CUSTOM_CRAFT } from './data/builderData';
import {
  AppSection,
  BadgeProgressMap,
  BuilderSlotId,
  CategoryId,
  CraftExplorationProgress,
  CustomCraftConfig,
  ExploreMode,
  JourneyStep,
  SpacecraftData,
} from './types/spacecraft';
import { SpacecraftViewport } from './components/SpacecraftViewport';
import { TopBar } from './components/TopBar';
import { BottomControlDock } from './components/BottomControlDock';
import { CraftRosterModal } from './components/CraftRosterModal';
import { TimelineView } from './components/TimelineView';
import { StoryView } from './components/StoryView';
import { TriviaView } from './components/TriviaView';
import { BuilderView } from './components/BuilderView';
import { SpacecraftImage } from './components/SpacecraftImage';
import { LandingView } from './components/LandingView';
import { JourneysHubView } from './components/JourneysHubView';
import { TwinklingStarfield } from './components/TwinklingStarfield';
import {
  getCraftProgress,
  isCraftBadgeEarned,
  loadBadgeProgress,
  saveBadgeProgress,
} from './utils/badgeProgress';
import { sfx } from './utils/soundEffects';

export default function App() {
  const [activeCraftIdx, setActiveCraftIdx] = useState(0);
  const [activeSection, setActiveSection] = useState<AppSection>('landing');
  const [journeyStep, setJourneyStep] = useState<JourneyStep>('categories');
  const [selectedCategoryId, setSelectedCategoryId] = useState<CategoryId>('trailblazers');
  const [exploreMode, setExploreMode] = useState<ExploreMode>('inspect');
  const [explodeAmount, setExplodeAmount] = useState(0);
  const [motionSpeed, setMotionSpeed] = useState(1);
  const [selectedPartId, setSelectedPartId] = useState<string | null>(null);
  const [rosterOpen, setRosterOpen] = useState(false);
  const [dockCollapsed, setDockCollapsed] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [resetCameraSignal, setResetCameraSignal] = useState(0);

  // Spacecraft Builder state
  const [customCraftConfig, setCustomCraftConfig] =
    useState<CustomCraftConfig>(DEFAULT_CUSTOM_CRAFT);
  const [builderTestLaunch, setBuilderTestLaunch] = useState(false);
  const [builderExplodePreview, setBuilderExplodePreview] = useState(false);
  const [builderActiveSlot, setBuilderActiveSlot] = useState<BuilderSlotId>('core');

  // Digital Mission Badges state
  const [badgeProgress, setBadgeProgress] = useState<BadgeProgressMap>(() =>
    loadBadgeProgress()
  );
  const [unlockedBannerCraft, setUnlockedBannerCraft] =
    useState<SpacecraftData | null>(null);

  const activeCraft = SPACECRAFT_LIST[activeCraftIdx] ?? SPACECRAFT_LIST[0];
  const activeCategory =
    SPACECRAFT_CATEGORIES.find((c) => c.id === activeCraft.categoryId) ??
    SPACECRAFT_CATEGORIES[0];

  const recordCraftMilestone = useCallback(
    (
      craftId: string,
      updater: (prev: CraftExplorationProgress) => CraftExplorationProgress
    ) => {
      const targetCraft = SPACECRAFT_LIST.find((c) => c.id === craftId);
      if (!targetCraft) return;

      setBadgeProgress((prevMap) => {
        const current = getCraftProgress(prevMap, craftId);
        const wasEarned = isCraftBadgeEarned(targetCraft, current);
        const updated = updater(current);

        // Quick bailout if nothing changed
        if (
          updated.motionVisited === current.motionVisited &&
          updated.timelineVisited === current.timelineVisited &&
          updated.storyCompleted === current.storyCompleted &&
          updated.partsVisited.length === current.partsVisited.length
        ) {
          return prevMap;
        }

        const nowEarned = isCraftBadgeEarned(targetCraft, updated);
        if (!wasEarned && nowEarned && !updated.badgeEarnedAt) {
          updated.badgeEarnedAt = new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          });
          sfx.playTriviaCorrect();
          setUnlockedBannerCraft(targetCraft);
        }

        const nextMap: BadgeProgressMap = {
          ...prevMap,
          [craftId]: updated,
        };
        saveBadgeProgress(nextMap);
        return nextMap;
      });
    },
    []
  );

  const handleSelectCraft = useCallback((craft: SpacecraftData) => {
    const idx = SPACECRAFT_LIST.findIndex((c) => c.id === craft.id);
    if (idx !== -1) {
      setActiveCraftIdx(idx);
      setSelectedCategoryId(craft.categoryId);
      setSelectedPartId(null);
      setExplodeAmount(0);
    }
  }, []);

  const handleCycleCraft = useCallback((delta: number) => {
    setActiveCraftIdx((prev) => {
      const nextIdx = (prev + delta + SPACECRAFT_LIST.length) % SPACECRAFT_LIST.length;
      const nextCraft = SPACECRAFT_LIST[nextIdx];
      if (nextCraft) setSelectedCategoryId(nextCraft.categoryId);
      return nextIdx;
    });
    setSelectedPartId(null);
    setExplodeAmount(0);
  }, []);

  const handleSelectPart = useCallback(
    (partId: string | null) => {
      setSelectedPartId(partId);
      if (partId) {
        sfx.playPartSelect();
        setDockCollapsed(false);
        recordCraftMilestone(activeCraft.id, (prev) => {
          if (prev.partsVisited.includes(partId)) return prev;
          return {
            ...prev,
            partsVisited: [...prev.partsVisited, partId],
          };
        });
      }
    },
    [activeCraft.id, recordCraftMilestone]
  );

  const handleViewportPartSelect = useCallback(
    (partId: string | null) => {
      if (activeSection === 'builder') {
        if (
          partId === 'core' ||
          partId === 'power' ||
          partId === 'instrument' ||
          partId === 'propulsion'
        ) {
          setBuilderActiveSlot(partId);
          sfx.playPartSelect();
        }
        return;
      }
      handleSelectPart(partId);
    },
    [activeSection, handleSelectPart]
  );

  const handleChangeMode = useCallback(
    (mode: ExploreMode, targetCraftId?: string) => {
      setExploreMode(mode);
      const craftIdToMark = targetCraftId ?? activeCraft.id;
      if (mode === 'motion') {
        setSelectedPartId(null);
        setExplodeAmount(0);
        setResetCameraSignal((n) => n + 1);
        if (craftIdToMark === 'sputnik-1') {
          sfx.playSputnikBeep();
        }
        recordCraftMilestone(craftIdToMark, (prev) =>
          prev.motionVisited ? prev : { ...prev, motionVisited: true }
        );
      }
    },
    [activeCraft.id, recordCraftMilestone]
  );

  const handleOpenCraftSection = useCallback(
    (craft: SpacecraftData, section: AppSection, targetExploreMode: ExploreMode = 'inspect') => {
      handleSelectCraft(craft);
      setActiveSection(section);
      if (section === 'explore') {
        handleChangeMode(targetExploreMode, craft.id);
      }
    },
    [handleSelectCraft, handleChangeMode]
  );

  const handleToggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      sfx.enabled = next;
      return next;
    });
  }, []);

  // Track Timeline visits and Explore Motion visits automatically
  useEffect(() => {
    if (activeSection === 'timeline') {
      recordCraftMilestone(activeCraft.id, (prev) =>
        prev.timelineVisited ? prev : { ...prev, timelineVisited: true }
      );
    } else if (activeSection === 'explore' && exploreMode === 'motion') {
      recordCraftMilestone(activeCraft.id, (prev) =>
        prev.motionVisited ? prev : { ...prev, motionVisited: true }
      );
    }
  }, [activeSection, exploreMode, activeCraft.id, recordCraftMilestone]);

  // Keyboard shortcut 'H' to collapse/expand bottom HUD
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'h' || e.key === 'H') {
        const tag = (e.target as HTMLElement | null)?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        setDockCollapsed((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const is3DViewportActive =
    activeSection === 'explore' || activeSection === 'builder';
  const [hasEntered3D, setHasEntered3D] = useState(false);

  useEffect(() => {
    if (is3DViewportActive) {
      setHasEntered3D(true);
    }
  }, [is3DViewportActive]);

  const viewportExploreMode: ExploreMode =
    activeSection === 'explore'
      ? exploreMode
      : activeSection === 'builder'
        ? builderTestLaunch
          ? 'motion'
          : 'inspect'
        : 'motion';

  const viewportExplodeAmount =
    activeSection === 'explore'
      ? explodeAmount
      : activeSection === 'builder'
        ? builderExplodePreview && !builderTestLaunch
          ? 1
          : 0
        : 0;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#070b16] text-slate-100">
      {/* Full-Bleed Stable WebGL Canvas (mounts on first 3D entry & pauses cleanly when hidden) */}
      {hasEntered3D && (
        <SpacecraftViewport
          craft={activeCraft}
          customCraftConfig={activeSection === 'builder' ? customCraftConfig : null}
          exploreMode={viewportExploreMode}
          explodeAmount={viewportExplodeAmount}
          motionSpeed={motionSpeed}
          selectedPartId={activeSection === 'builder' ? builderActiveSlot : selectedPartId}
          isActive={is3DViewportActive}
          isInteractive={is3DViewportActive && !rosterOpen}
          onSelectPart={handleViewportPartSelect}
          resetCameraSignal={resetCameraSignal}
        />
      )}

      {/* Twinkling Deep-Space Starfield Backdrop for Journeys, Timeline, Story & Trivia */}
      {!is3DViewportActive && activeSection !== 'landing' && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[15] bg-[#070b16]"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 50% 20%, rgba(28, 45, 82, 0.35) 0%, rgba(7, 11, 22, 0.96) 72%)',
            }}
          />
          <TwinklingStarfield count={140} />
        </div>
      )}

      {/* First Page: Cosmic Frontlines Twinkling Cosmos Landing Cover */}
      {activeSection === 'landing' && (
        <LandingView
          onStartJourney={() => {
            sfx.playPartSelect();
            setJourneyStep('categories');
            setActiveSection('journeys');
          }}
          onOpenBuilder={() => {
            sfx.playPartSelect();
            setActiveSection('builder');
          }}
        />
      )}

      {/* Clean 3-Zone Top Bar (hidden on full-bleed Landing cover) */}
      {activeSection !== 'landing' && (
        <TopBar
          activeSection={activeSection}
          onSelectSection={(sec) => {
            if (sec === 'journeys') {
              setJourneyStep('categories');
            }
            setActiveSection(sec);
          }}
        />
      )}

      {/* Mission Badge Unlocked Toast */}
      {unlockedBannerCraft && activeSection !== 'landing' && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-40 w-[min(92vw,460px)] bg-[#0b1020] border border-amber-400 rounded-xl px-4 py-3 shadow-2xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Award className="w-6 h-6 text-amber-400 shrink-0" />
            <div className="min-w-0">
              <div className="text-xs font-semibold text-amber-300">
                Mission Badge Unlocked
              </div>
              <div className="font-display text-sm font-bold text-white truncate">
                {unlockedBannerCraft.name}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                setUnlockedBannerCraft(null);
                setJourneyStep('hall-of-fame');
                setActiveSection('journeys');
              }}
              className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-semibold hover:bg-amber-400 transition-colors whitespace-nowrap cursor-pointer"
            >
              View Hall of Fame
            </button>
            <button
              type="button"
              onClick={() => setUnlockedBannerCraft(null)}
              aria-label="Dismiss badge notification"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Sequential Space Journeys Flow: Categories -> Spacecraft -> 4 Large Choices */}
      {activeSection === 'journeys' && (
        <JourneysHubView
          journeyStep={journeyStep}
          onChangeStep={setJourneyStep}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
          selectedCraft={activeCraft}
          onSelectCraft={handleSelectCraft}
          onOpenCraftSection={handleOpenCraftSection}
          onNavigateSection={setActiveSection}
          onOpenRoster={() => setRosterOpen(true)}
          badgeProgress={badgeProgress}
        />
      )}

      {/* Explore Mode Overlay: Minimal Top-Left Spec Badge + Real Photo + Collapsible Bottom Dock */}
      {activeSection === 'explore' && (
        <>
          <div className="fixed top-18 left-4 sm:left-6 z-10 max-w-lg pointer-events-auto flex items-start gap-3.5">
            <SpacecraftImage
              craftId={activeCraft.id}
              alt={`${activeCraft.name} real photograph`}
              title={activeCraft.shortName}
              accentHex={activeCategory.accentHex}
              className="hidden sm:block w-24 aspect-[16/10] rounded-xl border border-slate-700/80 shadow-lg shrink-0 mt-1"
            />
            <div>
              <button
                type="button"
                onClick={() => {
                  setJourneyStep('craft-hub');
                  setActiveSection('journeys');
                }}
                className="inline-flex items-center gap-1 text-xs font-semibold text-amber-300 hover:text-amber-200 transition-colors cursor-pointer mb-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to {activeCraft.shortName}
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCycleCraft(-1)}
                  aria-label="Previous spacecraft"
                  className="p-1.5 rounded-lg bg-[#0b1020]/90 border border-slate-700/80 text-slate-300 hover:text-white hover:border-slate-500 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleCycleCraft(1)}
                  aria-label="Next spacecraft"
                  className="p-1.5 rounded-lg bg-[#0b1020]/90 border border-slate-700/80 text-slate-300 hover:text-white hover:border-slate-500 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <div className="text-xs font-medium text-slate-300">
                  <span style={{ color: activeCategory.accentHex }}>
                    {activeCategory.title}
                  </span>
                  <span aria-hidden="true"> · </span>
                  <span className="font-mono-tabular">{activeCraft.launchYear}</span>
                  <span aria-hidden="true"> · </span>
                  <span>{activeCraft.destination}</span>
                </div>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1.5 leading-tight">
                {activeCraft.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-snug max-w-sm">
                {activeCraft.tagline}
              </p>
            </div>
          </div>

          <BottomControlDock
            craft={activeCraft}
            category={activeCategory}
            exploreMode={exploreMode}
            onChangeMode={handleChangeMode}
            explodeAmount={explodeAmount}
            onChangeExplode={setExplodeAmount}
            motionSpeed={motionSpeed}
            onChangeMotionSpeed={setMotionSpeed}
            selectedPartId={selectedPartId}
            visitedPartIds={getCraftProgress(badgeProgress, activeCraft.id).partsVisited}
            onSelectPart={handleSelectPart}
            onResetCamera={() => {
              setSelectedPartId(null);
              setResetCameraSignal((n) => n + 1);
            }}
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
            onPlaySputnikBeep={() => sfx.playSputnikBeep()}
            dockCollapsed={dockCollapsed}
            onToggleCollapse={() => setDockCollapsed((prev) => !prev)}
          />
        </>
      )}

      {/* Drag-and-Drop Spacecraft Builder View */}
      {activeSection === 'builder' && (
        <BuilderView
          config={customCraftConfig}
          onChangeConfig={setCustomCraftConfig}
          testLaunching={builderTestLaunch}
          onToggleLaunch={() => setBuilderTestLaunch((prev) => !prev)}
          explodePreview={builderExplodePreview}
          onToggleExplode={() => setBuilderExplodePreview((prev) => !prev)}
          activeSlot={builderActiveSlot}
          onSelectSlot={setBuilderActiveSlot}
        />
      )}

      {/* Timeline View */}
      {activeSection === 'timeline' && (
        <TimelineView
          craft={activeCraft}
          onSelectCraft={handleSelectCraft}
          onJumpToExplore={() => {
            setActiveSection('explore');
            setExploreMode('inspect');
          }}
          onBackToCraft={() => {
            setJourneyStep('craft-hub');
            setActiveSection('journeys');
          }}
        />
      )}

      {/* Creative Cosmic Frontlines Story View */}
      {activeSection === 'story' && (
        <StoryView
          craft={activeCraft}
          onWatchInSpace={() => {
            setActiveSection('explore');
            handleChangeMode('motion');
          }}
          onStoryCompleted={(craftId) => {
            recordCraftMilestone(craftId, (prev) =>
              prev.storyCompleted ? prev : { ...prev, storyCompleted: true }
            );
          }}
          onBackToCraft={() => {
            setJourneyStep('craft-hub');
            setActiveSection('journeys');
          }}
        />
      )}

      {/* Interactive Trivia Levels View */}
      {activeSection === 'trivia' && (
        <TriviaView
          onInspectCraft={(craft) => {
            handleSelectCraft(craft);
            setActiveSection('explore');
            setExploreMode('inspect');
          }}
        />
      )}

      {/* 6-Category Spacecraft Roster Modal */}
      <CraftRosterModal
        isOpen={rosterOpen}
        activeCraftId={activeCraft.id}
        onSelectCraft={(craft) => {
          handleSelectCraft(craft);
          setJourneyStep('craft-hub');
          setActiveSection('journeys');
        }}
        onClose={() => setRosterOpen(false)}
      />
    </div>
  );
}
