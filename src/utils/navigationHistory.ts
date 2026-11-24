import { SPACECRAFT_CATEGORIES, SPACECRAFT_LIST } from '../data/spacecraftData';
import {
  AppSection,
  CategoryId,
  ExploreMode,
  JourneyStep,
} from '../types/spacecraft';

export interface NavSnapshot {
  cfNav: true;
  activeSection: AppSection;
  journeyStep: JourneyStep;
  selectedCategoryId: CategoryId;
  activeCraftId: string;
  exploreMode: ExploreMode;
  rosterOpen: boolean;
}

const VALID_SECTIONS: ReadonlySet<AppSection> = new Set([
  'landing',
  'journeys',
  'explore',
  'timeline',
  'story',
  'trivia',
  'builder',
]);

const VALID_JOURNEY_STEPS: ReadonlySet<JourneyStep> = new Set([
  'categories',
  'category-crafts',
  'craft-hub',
  'hall-of-fame',
  'mission-log',
  'route-map',
]);

const VALID_CATEGORIES: ReadonlySet<CategoryId> = new Set(
  SPACECRAFT_CATEGORIES.map((c) => c.id)
);

const VALID_CRAFT_IDS: ReadonlySet<string> = new Set(
  SPACECRAFT_LIST.map((c) => c.id)
);

export const DEFAULT_NAV_SNAPSHOT: NavSnapshot = {
  cfNav: true,
  activeSection: 'landing',
  journeyStep: 'categories',
  selectedCategoryId: 'trailblazers',
  activeCraftId: SPACECRAFT_LIST[0]?.id ?? 'sputnik-1',
  exploreMode: 'inspect',
  rosterOpen: false,
};

export function isValidNavSnapshot(value: unknown): value is NavSnapshot {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<NavSnapshot>;
  return (
    candidate.cfNav === true &&
    typeof candidate.activeSection === 'string' &&
    VALID_SECTIONS.has(candidate.activeSection as AppSection) &&
    typeof candidate.journeyStep === 'string' &&
    VALID_JOURNEY_STEPS.has(candidate.journeyStep as JourneyStep) &&
    typeof candidate.selectedCategoryId === 'string' &&
    VALID_CATEGORIES.has(candidate.selectedCategoryId as CategoryId) &&
    typeof candidate.activeCraftId === 'string' &&
    VALID_CRAFT_IDS.has(candidate.activeCraftId) &&
    (candidate.exploreMode === 'inspect' || candidate.exploreMode === 'motion') &&
    typeof candidate.rosterOpen === 'boolean'
  );
}

export function hashForSnapshot(snapshot: NavSnapshot): string {
  let base = '#landing';

  if (snapshot.activeSection === 'journeys') {
    if (snapshot.journeyStep === 'categories') {
      base = '#journeys';
    } else if (snapshot.journeyStep === 'category-crafts') {
      base = `#journeys/${snapshot.selectedCategoryId}`;
    } else if (snapshot.journeyStep === 'craft-hub') {
      base = `#journeys/${snapshot.selectedCategoryId}/${snapshot.activeCraftId}`;
    } else if (snapshot.journeyStep === 'hall-of-fame') {
      base = '#hall-of-fame';
    } else if (snapshot.journeyStep === 'mission-log') {
      base = '#mission-log';
    } else if (snapshot.journeyStep === 'route-map') {
      base = '#route-map';
    }
  } else if (snapshot.activeSection === 'explore') {
    base = `#explore/${snapshot.activeCraftId}/${snapshot.exploreMode}`;
  } else if (snapshot.activeSection === 'timeline') {
    base = `#timeline/${snapshot.activeCraftId}`;
  } else if (snapshot.activeSection === 'story') {
    base = `#story/${snapshot.activeCraftId}`;
  } else if (snapshot.activeSection === 'trivia') {
    base = '#trivia';
  } else if (snapshot.activeSection === 'builder') {
    base = '#builder';
  }

  return snapshot.rosterOpen ? `${base}?roster=1` : base;
}

export function parseHashToSnapshot(rawHash: string): NavSnapshot | null {
  if (!rawHash || rawHash === '#') return null;
  const withoutHash = rawHash.startsWith('#') ? rawHash.slice(1) : rawHash;
  const [pathPart, queryPart] = withoutHash.split('?');
  const segments = pathPart.split('/').filter(Boolean);
  if (segments.length === 0) return null;

  const rosterOpen = queryPart === 'roster=1';
  const head = segments[0];

  if (head === 'landing') {
    return { ...DEFAULT_NAV_SNAPSHOT, rosterOpen };
  }

  if (head === 'journeys') {
    const cat = segments[1] as CategoryId | undefined;
    const craftId = segments[2];
    if (cat && VALID_CATEGORIES.has(cat)) {
      if (craftId && VALID_CRAFT_IDS.has(craftId)) {
        return {
          ...DEFAULT_NAV_SNAPSHOT,
          activeSection: 'journeys',
          journeyStep: 'craft-hub',
          selectedCategoryId: cat,
          activeCraftId: craftId,
          rosterOpen,
        };
      }
      return {
        ...DEFAULT_NAV_SNAPSHOT,
        activeSection: 'journeys',
        journeyStep: 'category-crafts',
        selectedCategoryId: cat,
        rosterOpen,
      };
    }
    return {
      ...DEFAULT_NAV_SNAPSHOT,
      activeSection: 'journeys',
      journeyStep: 'categories',
      rosterOpen,
    };
  }

  if (head === 'hall-of-fame' || head === 'mission-log' || head === 'route-map') {
    return {
      ...DEFAULT_NAV_SNAPSHOT,
      activeSection: 'journeys',
      journeyStep: head,
      rosterOpen,
    };
  }

  if (head === 'explore') {
    const craftId = segments[1];
    const craft = SPACECRAFT_LIST.find((c) => c.id === craftId) ?? SPACECRAFT_LIST[0];
    const mode: ExploreMode = segments[2] === 'motion' ? 'motion' : 'inspect';
    return {
      ...DEFAULT_NAV_SNAPSHOT,
      activeSection: 'explore',
      selectedCategoryId: craft.categoryId,
      activeCraftId: craft.id,
      exploreMode: mode,
      rosterOpen,
    };
  }

  if (head === 'timeline' || head === 'story') {
    const craftId = segments[1];
    const craft = SPACECRAFT_LIST.find((c) => c.id === craftId) ?? SPACECRAFT_LIST[0];
    return {
      ...DEFAULT_NAV_SNAPSHOT,
      activeSection: head,
      selectedCategoryId: craft.categoryId,
      activeCraftId: craft.id,
      rosterOpen,
    };
  }

  if (head === 'trivia' || head === 'builder') {
    return {
      ...DEFAULT_NAV_SNAPSHOT,
      activeSection: head,
      rosterOpen,
    };
  }

  return null;
}

export function getInitialNavSnapshot(): NavSnapshot {
  if (typeof window === 'undefined') return DEFAULT_NAV_SNAPSHOT;
  if (isValidNavSnapshot(window.history.state)) {
    return window.history.state;
  }
  const fromHash = parseHashToSnapshot(window.location.hash);
  return fromHash ?? DEFAULT_NAV_SNAPSHOT;
}

export function getNavKey(snapshot: NavSnapshot): string {
  return `${snapshot.activeSection}|${snapshot.journeyStep}|${snapshot.selectedCategoryId}|${snapshot.activeCraftId}|${snapshot.exploreMode}|${snapshot.rosterOpen ? 1 : 0}`;
}

export function getPageKey(snapshot: NavSnapshot): string {
  return `${snapshot.activeSection}|${snapshot.journeyStep}|${snapshot.selectedCategoryId}|${snapshot.activeCraftId}|${snapshot.exploreMode}`;
}
