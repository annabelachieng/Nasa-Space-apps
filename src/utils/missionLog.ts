import { SPACECRAFT_LIST } from '../data/spacecraftData';
import {
  BadgeProgressMap,
  MissionLogEntry,
} from '../types/spacecraft';
import { isCraftBadgeEarned } from './badgeProgress';

const MISSION_LOG_STORAGE_KEY = 'cosmic-frontlines-mission-log-v1';

export function loadMissionLog(): MissionLogEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(MISSION_LOG_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is MissionLogEntry =>
        Boolean(item) &&
        typeof item === 'object' &&
        typeof (item as MissionLogEntry).id === 'string' &&
        typeof (item as MissionLogEntry).timestamp === 'number' &&
        typeof (item as MissionLogEntry).title === 'string'
    );
  } catch {
    return [];
  }
}

export function saveMissionLog(entries: MissionLogEntry[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(MISSION_LOG_STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // Ignore storage quota errors in restricted environments
  }
}

export function clearMissionLogStorage(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(MISSION_LOG_STORAGE_KEY);
  } catch {
    // Ignore storage errors
  }
}

/**
 * Backfills milestones already recorded in badgeProgress if they are not yet
 * represented in the Mission Log (e.g., upgrades from earlier sessions).
 */
export function syncMissionLogWithBadgeProgress(
  existing: MissionLogEntry[],
  badgeProgress: BadgeProgressMap
): MissionLogEntry[] {
  const knownIds = new Set(existing.map((e) => e.id));
  const additions: MissionLogEntry[] = [];
  let syntheticTick = Date.now() - 1000;

  for (const craft of SPACECRAFT_LIST) {
    const progress = badgeProgress[craft.id];
    if (!progress) continue;

    for (const partId of progress.partsVisited) {
      const partMeta = craft.parts.find((p) => p.id === partId);
      if (!partMeta) continue;
      const id = `part:${craft.id}:${partId}`;
      if (!knownIds.has(id)) {
        knownIds.add(id);
        additions.push({
          id,
          kind: 'part-inspected',
          timestamp: syntheticTick++,
          title: `Inspected ${craft.shortName} · ${partMeta.name}`,
          detail: `${partMeta.role} — ${partMeta.funFact}`,
          craftId: craft.id,
          categoryId: craft.categoryId,
          partId: partMeta.id,
          section: 'explore',
          exploreMode: 'inspect',
        });
      }
    }

    if (
      craft.parts.length > 0 &&
      craft.parts.every((p) => progress.partsVisited.includes(p.id))
    ) {
      const allPartsId = `all-parts:${craft.id}`;
      if (!knownIds.has(allPartsId)) {
        knownIds.add(allPartsId);
        additions.push({
          id: allPartsId,
          kind: 'all-parts-completed',
          timestamp: syntheticTick++,
          title: `Completed all 3D parts for ${craft.shortName}`,
          detail: `Inspected every ${craft.parts.length}-part subsystem aboard ${craft.name}.`,
          craftId: craft.id,
          categoryId: craft.categoryId,
          section: 'explore',
          exploreMode: 'inspect',
        });
      }
    }

    if (progress.motionVisited) {
      const motionId = `motion:${craft.id}`;
      if (!knownIds.has(motionId)) {
        knownIds.add(motionId);
        additions.push({
          id: motionId,
          kind: 'motion-watched',
          timestamp: syntheticTick++,
          title: `Watched ${craft.shortName} in Space Motion`,
          detail: craft.motionCaption,
          craftId: craft.id,
          categoryId: craft.categoryId,
          section: 'explore',
          exploreMode: 'motion',
        });
      }
    }

    if (progress.timelineVisited) {
      const timelineId = `timeline:${craft.id}`;
      if (!knownIds.has(timelineId)) {
        knownIds.add(timelineId);
        additions.push({
          id: timelineId,
          kind: 'timeline-explored',
          timestamp: syntheticTick++,
          title: `Explored ${craft.shortName} Timeline`,
          detail: `Traced key milestones from ${craft.launchDate} · ${craft.destination}.`,
          craftId: craft.id,
          categoryId: craft.categoryId,
          section: 'timeline',
        });
      }
    }

    if (progress.storyCompleted) {
      const storyId = `story:${craft.id}`;
      if (!knownIds.has(storyId)) {
        knownIds.add(storyId);
        additions.push({
          id: storyId,
          kind: 'story-completed',
          timestamp: syntheticTick++,
          title: `Completed Story: "${craft.story.title}"`,
          detail: `${craft.story.frontlineCallsign} adventure finished.`,
          craftId: craft.id,
          categoryId: craft.categoryId,
          section: 'story',
        });
      }
    }

    if (isCraftBadgeEarned(craft, progress)) {
      const badgeId = `badge:${craft.id}`;
      if (!knownIds.has(badgeId)) {
        knownIds.add(badgeId);
        additions.push({
          id: badgeId,
          kind: 'badge-earned',
          timestamp: syntheticTick++,
          title: `Unlocked ${craft.name} Mission Badge`,
          detail: `Completed all 4 exploration milestones for ${craft.shortName}.`,
          craftId: craft.id,
          categoryId: craft.categoryId,
          section: 'explore',
          exploreMode: 'inspect',
        });
      }
    }
  }

  if (additions.length === 0) return existing;
  const merged = [...existing, ...additions].sort((a, b) => a.timestamp - b.timestamp);
  saveMissionLog(merged);
  return merged;
}

export function appendMissionMilestone(
  entries: MissionLogEntry[],
  newEntry: Omit<MissionLogEntry, 'timestamp'> & { timestamp?: number },
  allowScoreUpdate = false
): MissionLogEntry[] {
  const existingIdx = entries.findIndex((e) => e.id === newEntry.id);
  const stamped: MissionLogEntry = {
    ...newEntry,
    timestamp: newEntry.timestamp ?? Date.now(),
  };

  if (existingIdx !== -1) {
    if (!allowScoreUpdate) return entries;
    const next = [...entries];
    next[existingIdx] = stamped;
    const sorted = next.sort((a, b) => a.timestamp - b.timestamp);
    saveMissionLog(sorted);
    return sorted;
  }

  const next = [...entries, stamped].sort((a, b) => a.timestamp - b.timestamp);
  saveMissionLog(next);
  return next;
}

export function formatMissionTimestamp(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}
