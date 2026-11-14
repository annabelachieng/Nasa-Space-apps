export type CategoryId =
  | 'trailblazers'
  | 'record-makers'
  | 'fallen-on-mars'
  | 'gas-giants'
  | 'bound-by-gravity'
  | 'safe-at-home';

export type MotionEnvironment =
  | 'earth-orbit'
  | 'interstellar'
  | 'solar-corona'
  | 'mars-surface'
  | 'mars-flight'
  | 'saturn-orbit'
  | 'jupiter-orbit'
  | 'mercury-orbit'
  | 'reentry-splashdown';

export type AppSection = 'landing' | 'journeys' | 'explore' | 'timeline' | 'story' | 'trivia' | 'builder';

export type JourneyStep = 'categories' | 'category-crafts' | 'craft-hub' | 'hall-of-fame';

export type ExploreMode = 'inspect' | 'motion';

export interface SpacecraftCategory {
  id: CategoryId;
  title: string;
  subtitle: string;
  accentHex: string;
}

export interface SpacecraftPart {
  id: string;
  name: string;
  role: string;
  howItWorked: string;
  funFact: string;
  explodeOffset: [number, number, number];
  cameraOffset: [number, number, number];
}

export interface TimelineMilestone {
  date: string;
  year: number;
  title: string;
  description: string;
}

export interface StoryChapter {
  chapterTitle: string;
  setting: string;
  text: string;
  kidTakeaway: string;
}

export interface SpacecraftData {
  id: string;
  name: string;
  shortName: string;
  categoryId: CategoryId;
  isFeaturedRequired: boolean;
  launchYear: number;
  launchDate: string;
  activeSpan: string;
  destination: string;
  statusLabel: string;
  tagline: string;
  kidOverview: string;
  motionEnvironment: MotionEnvironment;
  motionCaption: string;
  defaultCameraPos: [number, number, number];
  parts: SpacecraftPart[];
  timeline: TimelineMilestone[];
  story: {
    title: string;
    frontlineCallsign: string;
    chapters: StoryChapter[];
  };
}

export interface TriviaQuestion {
  id: string;
  craftId: string;
  categoryLabel: string;
  question: string;
  options: string[];
  correctIndex: number;
  hint: string;
  explanation: string;
}

export interface TriviaLevel {
  id: number;
  title: string;
  rankReward: string;
  description: string;
  questions: TriviaQuestion[];
}

export type BuilderSlotId = 'core' | 'power' | 'instrument' | 'propulsion';

export interface BuilderComponent {
  id: string;
  slot: BuilderSlotId;
  name: string;
  role: string;
  accentHex: string;
  frontlineExplanation: string;
  missionBonus: string;
  speedRating: number;
  defenseRating: number;
  scienceRating: number;
}

export interface CustomCraftConfig {
  core: string;
  power: string;
  instrument: string;
  propulsion: string;
}

export interface CraftExplorationProgress {
  partsVisited: string[];
  motionVisited: boolean;
  timelineVisited: boolean;
  storyCompleted: boolean;
  badgeEarnedAt?: string;
}

export type BadgeProgressMap = Record<string, CraftExplorationProgress>;
