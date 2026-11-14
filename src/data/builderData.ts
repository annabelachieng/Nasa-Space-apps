import { BuilderComponent, BuilderSlotId, CustomCraftConfig } from '../types/spacecraft';

export const BUILDER_SLOTS: {
  id: BuilderSlotId;
  label: string;
  hint: string;
}[] = [
  {
    id: 'core',
    label: 'Capsule & Body Core',
    hint: 'Protects astronauts or computers from harsh space radiation and heat',
  },
  {
    id: 'power',
    label: 'Power Wings & Batteries',
    hint: 'Gives your spacecraft energy to run cameras, radios, and heaters',
  },
  {
    id: 'instrument',
    label: 'Science Eyes & Antennas',
    hint: 'Scans distant moons and beams discoveries back across Cosmic Frontlines',
  },
  {
    id: 'propulsion',
    label: 'Engines & Landing Gear',
    hint: 'Steers across planetary orbits or brings samples safely down to land',
  },
];

export const BUILDER_COMPONENTS: BuilderComponent[] = [
  // --- CORES & CAPSULES ---
  {
    id: 'core-gold-bus',
    slot: 'core',
    name: 'Gold-Foil Scout Bus',
    role: 'Deep-Space Thermal Armor',
    accentHex: '#F59E0B',
    frontlineExplanation:
      'Wrapped in crinkled gold Kapton blankets just like Voyager and Cassini! On the Cosmic Frontlines, this shiny skin traps cozy warmth inside when flying far from the Sun and bounces away blistering heat near inner planets.',
    missionBonus: 'Great for outer planets and long deep-space voyages!',
    speedRating: 3,
    defenseRating: 3,
    scienceRating: 4,
  },
  {
    id: 'core-crew-capsule',
    slot: 'core',
    name: 'Return Crew Capsule',
    role: 'Heat-Shielded Astronaut Cabin',
    accentHex: '#34D399',
    frontlineExplanation:
      'Shaped like Apollo 11 and Soyuz with an ablative honeycomb base! When diving back into Earth’s atmosphere at 40,000 km/h, its curved bottom chars away slowly so explorers inside stay safe and cool.',
    missionBonus: 'Unlocks safe atmospheric re-entry and return home!',
    speedRating: 2,
    defenseRating: 5,
    scienceRating: 3,
  },
  {
    id: 'core-titanium-vault',
    slot: 'core',
    name: 'Titanium Armor Vault',
    role: 'Radiation Fortress',
    accentHex: '#818CF8',
    frontlineExplanation:
      'Inspired by Juno’s 1-cm thick titanium safe! When diving through fierce magnetic radiation belts around giant Jupiter, these heavy armor walls keep your spacecraft’s computer brain from getting scrambled.',
    missionBonus: 'Survives extreme radiation storms around gas giants!',
    speedRating: 2,
    defenseRating: 5,
    scienceRating: 4,
  },

  // --- POWER SYSTEMS ---
  {
    id: 'power-windmill-solar',
    slot: 'power',
    name: 'Giant Solar Windmill Wings',
    role: 'Sunlight Harvester',
    accentHex: '#38BDF8',
    frontlineExplanation:
      'Long blue photovoltaic panels that unfold like butterfly or windmill wings after rocket launch! They catch sunbeams and turn light straight into electricity without burning any fuel.',
    missionBonus: 'Clean, endless power anywhere from Mercury to Jupiter!',
    speedRating: 3,
    defenseRating: 2,
    scienceRating: 4,
  },
  {
    id: 'power-rtg-battery',
    slot: 'power',
    name: 'RTG Nuclear Power Boom',
    role: 'Sun-Free Cosmic Generator',
    accentHex: '#F97316',
    frontlineExplanation:
      'Out past Saturn and Pluto, sunlight is 1,000 times too dim for solar panels! This steady cylinder turns natural heat into electricity for 40+ years, powering bold missions past the Cosmic Frontlines.',
    missionBonus: 'Works in pitch-black interstellar space and dusty storms!',
    speedRating: 4,
    defenseRating: 4,
    scienceRating: 4,
  },
  {
    id: 'power-shielded-fins',
    slot: 'power',
    name: 'Water-Cooled Solar Fins',
    role: 'Star-Skimming Wings',
    accentHex: '#EAB308',
    frontlineExplanation:
      'Modeled after Parker Solar Probe! Tiny angled solar fins tuck neatly behind a sunshade and pump cooling fluid through themselves so they can gather power right near a blazing star.',
    missionBonus: 'Lets your craft fly super close to the Sun or Mercury!',
    speedRating: 5,
    defenseRating: 4,
    scienceRating: 3,
  },

  // --- SCIENCE INSTRUMENTS ---
  {
    id: 'inst-radio-dish',
    slot: 'instrument',
    name: 'High-Gain Parabolic Dish',
    role: 'Deep-Space Radio Voice',
    accentHex: '#E2E8F0',
    frontlineExplanation:
      'A wide curved bowl antenna that focuses faint radio whispers into a razor-sharp beam aimed at Earth—carrying crystal-clear planetary photos across billions of kilometers of Cosmic Frontlines!',
    missionBonus: 'Sends high-definition data from the edge of the solar system!',
    speedRating: 3,
    defenseRating: 3,
    scienceRating: 5,
  },
  {
    id: 'inst-mars-mast',
    slot: 'instrument',
    name: 'Stereo Mast & Laser Eyes',
    role: 'Robot Geologist Head',
    accentHex: '#F97316',
    frontlineExplanation:
      'Stands tall like Opportunity’s Pancam head with twin 3D camera eyes and mineral-sniffing spectrometers! It spots ancient riverbeds, craters, and safe driving paths on rocky worlds.',
    missionBonus: 'Discovers hidden signs of ancient water and strange rocks!',
    speedRating: 2,
    defenseRating: 3,
    scienceRating: 5,
  },
  {
    id: 'inst-ice-radar',
    slot: 'instrument',
    name: 'Ice-Piercing Ocean Radar',
    role: 'Subsurface World Scanner',
    accentHex: '#38BDF8',
    frontlineExplanation:
      'Just like Europa Clipper’s giant antennas! It beams gentle radio pulses right through miles of solid moon ice to map hidden salty oceans swirling underneath.',
    missionBonus: 'Detects secret underground oceans on icy moons!',
    speedRating: 3,
    defenseRating: 3,
    scienceRating: 5,
  },

  // --- PROPULSION & LANDING ---
  {
    id: 'prop-ion-thruster',
    slot: 'propulsion',
    name: 'Blue Ion Plasma Thruster',
    role: 'High-Efficiency Deep Engine',
    accentHex: '#38BDF8',
    frontlineExplanation:
      'Glows bright electric blue by shooting charged xenon gas atoms! Instead of one big loud explosion, an ion engine pushes gently for months until your Cosmic Frontlines scout reaches blistering speeds.',
    missionBonus: 'Boosts top speed for multi-planet grand tours!',
    speedRating: 5,
    defenseRating: 3,
    scienceRating: 4,
  },
  {
    id: 'prop-rocket-bell',
    slot: 'propulsion',
    name: 'Main Orbital Rocket Bell',
    role: 'Gravity-Capture Engine',
    accentHex: '#F59E0B',
    frontlineExplanation:
      'A rugged metallic nozzle like Cassini and Juno use! When arriving at a giant planet at high speed, firing this powerful brake slows your ship down so gravity can capture it into orbit.',
    missionBonus: 'Brakes safely into orbit around Jupiter, Saturn, or Mercury!',
    speedRating: 4,
    defenseRating: 4,
    scienceRating: 3,
  },
  {
    id: 'prop-rover-wheels',
    slot: 'propulsion',
    name: '6 Rocker-Bogie Rover Wheels',
    role: 'Alien Terrain Climber',
    accentHex: '#34D399',
    frontlineExplanation:
      'Transforms your spacecraft into a rugged surface explorer! Six cleated metal wheels on hinged legs crawl over sharp craters and Martian boulders without tipping over.',
    missionBonus: 'Lets your craft drive directly across alien planets!',
    speedRating: 2,
    defenseRating: 5,
    scienceRating: 5,
  },
];

export const DEFAULT_CUSTOM_CRAFT: CustomCraftConfig = {
  core: 'core-gold-bus',
  power: 'power-windmill-solar',
  instrument: 'inst-radio-dish',
  propulsion: 'prop-ion-thruster',
};

export function evaluateCustomCraft(config: CustomCraftConfig): {
  codename: string;
  readinessSummary: string;
  bestDestination: string;
  speed: number;
  defense: number;
  science: number;
} {
  const core = BUILDER_COMPONENTS.find((c) => c.id === config.core)!;
  const power = BUILDER_COMPONENTS.find((c) => c.id === config.power)!;
  const inst = BUILDER_COMPONENTS.find((c) => c.id === config.instrument)!;
  const prop = BUILDER_COMPONENTS.find((c) => c.id === config.propulsion)!;

  const speed = Math.min(100, Math.round(((core.speedRating + power.speedRating + inst.speedRating + prop.speedRating) / 20) * 100));
  const defense = Math.min(100, Math.round(((core.defenseRating + power.defenseRating + inst.defenseRating + prop.defenseRating) / 20) * 100));
  const science = Math.min(100, Math.round(((core.scienceRating + power.scienceRating + inst.scienceRating + prop.scienceRating) / 20) * 100));

  let bestDestination = 'Deep Outer Solar System';
  let codename = 'Frontline Starfinder';
  if (prop.id === 'prop-rover-wheels') {
    bestDestination = 'Martian Craters & Rocky Moons';
    codename = 'Red Dune Pathfinder';
  } else if (core.id === 'core-crew-capsule') {
    bestDestination = 'Lunar Orbit & Safe Earth Splashdown';
    codename = 'Guardian Return Wing';
  } else if (power.id === 'power-shielded-fins') {
    bestDestination = 'Inner Solar Corona & Mercury Orbit';
    codename = 'Sunflare Skimmer';
  } else if (core.id === 'core-titanium-vault' || inst.id === 'inst-ice-radar') {
    bestDestination = 'Jupiter Radiation Belts & Icy Ocean Moons';
    codename = 'Jovian Ice Diver';
  } else if (power.id === 'power-rtg-battery') {
    bestDestination = 'Interstellar Frontier Beyond Pluto';
    codename = 'Voyager Horizon X';
  }

  const readinessSummary = `Your ${core.name} paired with ${power.name}, ${inst.name}, and ${prop.name} is mission-ready for ${bestDestination}!`;

  return { codename, readinessSummary, bestDestination, speed, defense, science };
}
