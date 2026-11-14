import { BadgeProgressMap, CraftExplorationProgress, SpacecraftData } from '../types/spacecraft';

const STORAGE_KEY = 'cosmic-frontlines-mission-badges-v1';

export function emptyCraftProgress(): CraftExplorationProgress {
  return {
    partsVisited: [],
    motionVisited: false,
    timelineVisited: false,
    storyCompleted: false,
  };
}

export function loadBadgeProgress(): BadgeProgressMap {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') return {};
    return parsed as BadgeProgressMap;
  } catch {
    return {};
  }
}

export function saveBadgeProgress(progress: BadgeProgressMap): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Ignore storage quota errors in restricted environments
  }
}

export function getCraftProgress(
  map: BadgeProgressMap,
  craftId: string
): CraftExplorationProgress {
  return map[craftId] ?? emptyCraftProgress();
}

export function isCraftBadgeEarned(
  craft: SpacecraftData,
  progress: CraftExplorationProgress
): boolean {
  const allPartsInspected = craft.parts.every((p) =>
    progress.partsVisited.includes(p.id)
  );
  return (
    allPartsInspected &&
    progress.motionVisited &&
    progress.timelineVisited &&
    progress.storyCompleted
  );
}

export function getCraftCompletionStats(
  craft: SpacecraftData,
  progress: CraftExplorationProgress
): {
  partsDone: boolean;
  partsCount: number;
  partsTotal: number;
  motionDone: boolean;
  timelineDone: boolean;
  storyDone: boolean;
  stepsCompleted: number;
  totalSteps: number;
  earned: boolean;
} {
  const partsCount = craft.parts.filter((p) =>
    progress.partsVisited.includes(p.id)
  ).length;
  const partsTotal = craft.parts.length;
  const partsDone = partsCount >= partsTotal;
  const motionDone = progress.motionVisited;
  const timelineDone = progress.timelineVisited;
  const storyDone = progress.storyCompleted;
  const stepsCompleted =
    (partsDone ? 1 : 0) +
    (motionDone ? 1 : 0) +
    (timelineDone ? 1 : 0) +
    (storyDone ? 1 : 0);

  return {
    partsDone,
    partsCount,
    partsTotal,
    motionDone,
    timelineDone,
    storyDone,
    stepsCompleted,
    totalSteps: 4,
    earned: partsDone && motionDone && timelineDone && storyDone,
  };
}

export function getExplorerRank(earnedCount: number, totalCount: number): {
  title: string;
  nextGoal: string;
} {
  if (earnedCount >= totalCount && totalCount > 0) {
    return {
      title: 'Supreme Galactic Legend',
      nextGoal: 'All 18 Cosmic Frontlines Mission Badges collected!',
    };
  }
  if (earnedCount >= 12) {
    return {
      title: 'Cosmic Frontlines Commander',
      nextGoal: `Earn ${totalCount - earnedCount} more badge${totalCount - earnedCount === 1 ? '' : 's'} for Supreme Galactic Legend`,
    };
  }
  if (earnedCount >= 6) {
    return {
      title: 'Deep Space Navigator',
      nextGoal: `Earn ${12 - earnedCount} more badge${12 - earnedCount === 1 ? '' : 's'} for Cosmic Frontlines Commander`,
    };
  }
  if (earnedCount >= 3) {
    return {
      title: 'Solar System Scout',
      nextGoal: `Earn ${6 - earnedCount} more badge${6 - earnedCount === 1 ? '' : 's'} for Deep Space Navigator`,
    };
  }
  if (earnedCount >= 1) {
    return {
      title: 'Orbital Pathfinder',
      nextGoal: `Earn ${3 - earnedCount} more badge${3 - earnedCount === 1 ? '' : 's'} for Solar System Scout`,
    };
  }
  return {
    title: 'Launchpad Recruit',
    nextGoal: 'Fully explore any 1 spacecraft to earn your first Mission Badge',
  };
}
