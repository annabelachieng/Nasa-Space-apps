import { SpacecraftCategory, SpacecraftData } from '../types/spacecraft';

export const SPACECRAFT_CATEGORIES: SpacecraftCategory[] = [
  {
    id: 'trailblazers',
    title: 'Trailblazers',
    subtitle: 'The brave first satellites that opened the Space Age',
    accentHex: '#38BDF8',
  },
  {
    id: 'record-makers',
    title: 'Record Makers',
    subtitle: 'Speed and distance champions pushing past the edge of our solar system',
    accentHex: '#F59E0B',
  },
  {
    id: 'fallen-on-mars',
    title: 'Fallen on Mars',
    subtitle: 'Robotic explorers that roamed and flew across the dusty Red Planet',
    accentHex: '#F97316',
  },
  {
    id: 'gas-giants',
    title: 'Gas Giants',
    subtitle: 'Deep-space detectives studying colossal ringed and stormy worlds',
    accentHex: '#EAB308',
  },
  {
    id: 'bound-by-gravity',
    title: 'Bound by Gravity',
    subtitle: 'Craft shaped by giant planetary gravity wells and slingshot orbits',
    accentHex: '#818CF8',
  },
  {
    id: 'missing-in-action',
    title: 'Missing in Action',
    subtitle: 'Silent craft whose radio fell quiet while still drifting on known cosmic paths',
    accentHex: '#A78BFA',
  },
  {
    id: 'rearguard',
    title: 'Rearguard',
    subtitle: 'They held their ground until the last of their power was gone.',
    accentHex: '#F43F5E',
  },
  {
    id: 'safe-at-home',
    title: 'Safe at Home',
    subtitle: 'Heat-shielded capsules built to survive fiery dives back to Earth',
    accentHex: '#34D399',
  },
];

export const SPACECRAFT_LIST: SpacecraftData[] = [
  // =========================================================================
  // 1. TRAILBLAZERS
  // =========================================================================
  {
    id: 'sputnik-1',
    name: 'Sputnik 1',
    shortName: 'Sputnik 1',
    categoryId: 'trailblazers',
    isFeaturedRequired: true,
    launchYear: 1957,
    launchDate: 'October 4, 1957',
    activeSpan: '21 days transmitting · 92 days in orbit',
    destination: 'Low Earth Orbit',
    statusLabel: 'Burned up safely in Earth atmosphere (Jan 1958)',
    tagline: 'A silver beach-ball star that sang "beep-beep" to the whole world',
    kidOverview:
      'Sputnik 1 was the very first human-made satellite ever launched into space! About the size of a big beach ball, it raced around Earth every 96 minutes and sent out a cheerful radio beep that anyone with a ham radio could hear.',
    motionEnvironment: 'earth-orbit',
    motionCaption: 'Zipping above Earth at 29,000 km/h while pulsing radio beeps toward antennas below.',
    defaultCameraPos: [3.8, 2.2, 4.4],
    parts: [
      {
        id: 'sphere-shell',
        name: 'Polished Aluminum Shell',
        role: 'Heat & Sunlight Shield',
        howItWorked:
          'Made of two shiny half-spheres bolted together, this mirror-bright metal coat bounced harsh sunlight away so the electronics inside would not overheat, while reflecting light so people on Earth could spot it like a moving star!',
        funFact: 'The ball was only 58 centimeters wide—almost the exact size of a playground beach ball.',
        explodeOffset: [0, 0, 0],
        cameraOffset: [2.8, 1.5, 3.2],
      },
      {
        id: 'whip-antennas',
        name: '4 Swept Whip Antennas',
        role: 'Radio Voice',
        howItWorked:
          'Four long, bendy metal rods angled backward like whiskers. As Sputnik spun and tumbled in orbit, the four antennas broadcast radio waves in every direction so scientists on every continent could hear its signal.',
        funFact: 'Two antennas were 2.4 meters long and two were 2.9 meters long—longer than a tall basketball player!',
        explodeOffset: [-1.1, 0.5, -0.8],
        cameraOffset: [-2.8, 1.8, 3.0],
      },
      {
        id: 'radio-core',
        name: 'Radio Transmitter & Batteries',
        role: 'The "Beep-Beep" Heart',
        howItWorked:
          'Inside the sphere sat silver-zinc batteries and a vacuum-tube radio transmitter. It turned electrical power into rhythmic "beep... beep... beep" pulses. Changing the speed of the beeps even told scientists how hot or cold the inside was!',
        funFact: 'Its batteries lasted 21 days before going quiet, after sending millions of beeps back to Earth.',
        explodeOffset: [0, 1.35, 0],
        cameraOffset: [2.2, 2.2, 2.4],
      },
      {
        id: 'nitrogen-seal',
        name: 'Pressurized Nitrogen Chamber',
        role: 'Space Weather Sensor',
        howItWorked:
          'The inside of Sputnik was pumped full of nitrogen gas like a cozy balloon, with a little fan to move warm air around. If a tiny space rock ever poked a hole, the dropping gas pressure would change the radio beep speed!',
        funFact: 'Luckily, no micrometeorites punctured Sputnik 1 during its three months in space.',
        explodeOffset: [0, -1.25, 0],
        cameraOffset: [2.4, -0.4, 2.8],
      },
    ],
    timeline: [
      {
        date: 'October 4, 1957',
        year: 1957,
        title: 'Liftoff from Baikonur',
        description: 'A giant R-7 rocket blasts off at night and carries Sputnik 1 into orbit, starting the Space Age.',
      },
      {
        date: 'October 5, 1957',
        year: 1957,
        title: 'The World Hears the Beep',
        description: 'Families, schools, and radio operators around the globe tune their dials to hear Sputnik chirp overhead.',
      },
      {
        date: 'October 26, 1957',
        year: 1957,
        title: 'Radio Batteries Run Out',
        description: 'After 21 busy days and 326 orbits, Sputnik goes silent—but keeps gliding quietly around Earth.',
      },
      {
        date: 'January 4, 1958',
        year: 1958,
        title: '1,440 Orbits Completed',
        description: 'Air drag pulls Sputnik down into the upper atmosphere, where it streaks across the sky like a shooting star.',
      },
    ],
    story: {
      title: 'The Iron Star That Sang Beep-Beep',
      frontlineCallsign: 'Scout 01 · Orbit Frontier',
      chapters: [
        {
          chapterTitle: 'Chapter 1: Crossing the Invisible Wall',
          setting: 'Upper Atmosphere, October 1957',
          text: 'For all of human history, nothing made by people had ever stayed up in the sky. Everyone thought space was an unreachable ceiling. Then, atop a pillar of orange rocket fire, a gleaming silver sphere broke free of gravity’s tug and slipped onto the Cosmic Frontlines.',
          kidTakeaway: 'To stay in orbit, a spacecraft must fly sideways so fast that as it falls, Earth curves away beneath it!',
        },
        {
          chapterTitle: 'Chapter 2: A Song Over Every Backyard',
          setting: 'Over Oceans and Cities',
          text: 'Sputnik had no cameras and no robot arms. Its job was simpler and bolder: prove that a scout could survive in the freezing dark of space and call home. Every 96 minutes, it raced from sunrise to sunset, whispering "beep-beep-beep" through its four long whiskers to kids listening on backyard radios.',
          kidTakeaway: 'Radio waves travel at the speed of light, letting spacecraft talk across thousands of kilometers.',
        },
        {
          chapterTitle: 'Chapter 3: The Spark That Lit a Thousand Rockets',
          setting: 'Dawn of Exploration',
          text: 'When Sputnik finally blazed home like a meteor three months later, the Cosmic Frontlines were wide open forever. Inspired by that tiny singing sphere, engineers began dreaming of astronauts, Moon landings, and robots sailing to distant stars.',
          kidTakeaway: 'Sometimes the smallest pioneer starts the biggest adventure in history.',
        },
      ],
    },
  },
  {
    id: 'explorer-1',
    name: 'Explorer 1',
    shortName: 'Explorer 1',
    categoryId: 'trailblazers',
    isFeaturedRequired: false,
    launchYear: 1958,
    launchDate: 'January 31, 1958',
    activeSpan: '111 days transmitting · 12 years in orbit',
    destination: 'Elliptical Earth Orbit',
    statusLabel: 'Re-entered Earth atmosphere (March 1970)',
    tagline: 'The pencil-shaped satellite that discovered invisible space shields around Earth',
    kidOverview:
      'Explorer 1 was the first U.S. satellite and carried real science tools into orbit! Its cosmic ray detector surprised scientists by finding giant invisible belts of trapped radiation hugging Earth—now called the Van Allen Belts.',
    motionEnvironment: 'earth-orbit',
    motionCaption: 'Spinning like a steady dart through Earth’s invisible magnetic radiation belts.',
    defaultCameraPos: [3.6, 2.0, 4.2],
    parts: [
      {
        id: 'cylindrical-body',
        name: 'Striped Steel Fuselage',
        role: 'Heat-Balanced Body',
        howItWorked:
          'Explorer 1 looked like a sleek silver-and-white rocket dart. Engineers painted white stripes on the dark steel tube to carefully mix warm and cool patches so the instruments inside stayed comfortable.',
        funFact: 'The whole satellite weighed only 14 kilograms—lighter than a medium-sized dog!',
        explodeOffset: [0, 0, 0],
        cameraOffset: [2.8, 1.4, 3.0],
      },
      {
        id: 'geiger-tube',
        name: 'Cosmic Ray Geiger Counter',
        role: 'Radiation Detective',
        howItWorked:
          'Built by scientist James Van Allen, this tube counted high-speed space particles zooming past Earth. When Explorer 1 flew high, the detector got flooded with so many particles that it maxed out—revealing Earth’s protective radiation belts!',
        funFact: 'Without Earth’s magnetic field trapping those particles, space weather would be much harsher on our planet.',
        explodeOffset: [0, 1.25, 0],
        cameraOffset: [2.2, 2.0, 2.5],
      },
      {
        id: 'micrometeorite-ring',
        name: 'Micrometeorite Wire Grid',
        role: 'Space Dust Counter',
        howItWorked:
          'A ring of tiny fragile wires wrapped around the middle of the hull. Whenever a grain of space dust smacked a wire and snapped it, the spacecraft sent a quick radio note back to Earth.',
        funFact: 'It proved that space is not completely empty—tiny dust grains zip around everywhere!',
        explodeOffset: [0, -1.1, 0],
        cameraOffset: [2.4, 0.2, 2.6],
      },
      {
        id: 'turnstile-antennas',
        name: 'Turnstile Whip Antennas',
        role: 'Spinning Radio Beacon',
        howItWorked:
          'Four springy wire antennas popped outward as Explorer 1 spun like a top at 750 revolutions per minute, keeping the satellite stable while broadcasting science measurements.',
        funFact: 'Spinning fast kept Explorer 1 pointed straight just like a spinning football!',
        explodeOffset: [-1.2, 0.3, 0],
        cameraOffset: [-2.6, 1.5, 2.8],
      },
    ],
    timeline: [
      {
        date: 'January 31, 1958',
        year: 1958,
        title: 'Juno I Rocket Launch',
        description: 'Explorer 1 rides into orbit from Cape Canaveral and begins sending science data immediately.',
      },
      {
        date: 'May 1, 1958',
        year: 1958,
        title: 'Van Allen Belts Announced',
        description: 'Scientists confirm Explorer 1 discovered huge donut-shaped belts of charged particles around Earth.',
      },
      {
        date: 'May 23, 1958',
        year: 1958,
        title: 'Final Radio Signal',
        description: 'After nearly four months of discoveries, Explorer 1’s batteries run out of energy.',
      },
      {
        date: 'March 31, 1970',
        year: 1970,
        title: '12-Year Orbit Ends',
        description: 'After looping Earth more than 58,000 times, Explorer 1 burns up safely over the Pacific Ocean.',
      },
    ],
    story: {
      title: 'The Detective in the Invisible Donuts',
      frontlineCallsign: 'Scout 02 · Magnetosphere Patrol',
      chapters: [
        {
          chapterTitle: 'Chapter 1: A Curious Little Dart',
          setting: 'High Above Earth, 1958',
          text: 'Explorer 1 wasn’t just going into space to wave hello—it was a science detective. Tucked inside its striped metal nose was a tiny listening tube ready to count cosmic rays zooming from distant exploding stars.',
          kidTakeaway: 'Every satellite carries specialized instruments to measure things human eyes cannot see.',
        },
        {
          chapterTitle: 'Chapter 2: The Mysterious Silence',
          setting: '2,500 km Above the Clouds',
          text: 'Wait a second! Whenever Explorer 1 climbed to the top of its oval orbit, its radiation counter suddenly dropped to ZERO. Did it break? No! Scientists realized it wasn’t empty—there were SO MANY particles packed in giant invisible rings that the counter got overwhelmed!',
          kidTakeaway: 'When a scientific instrument acts strangely, it often means you just discovered something brand new.',
        },
        {
          chapterTitle: 'Chapter 3: Mapping the Cosmic Shield',
          setting: 'Mission Control',
          text: 'Thanks to Explorer 1, future astronauts knew exactly where Earth’s radiation belts sat and how to fly safely past them on their way to the Moon.',
          kidTakeaway: 'Scout missions map the dangers first so crewed explorers can travel safely later.',
        },
      ],
    },
  },

  // =========================================================================
  // 2. RECORD MAKERS
  // =========================================================================
  {
    id: 'voyager',
    name: 'Voyager 1 & 2',
    shortName: 'Voyager 1 & 2',
    categoryId: 'record-makers',
    isFeaturedRequired: true,
    launchYear: 1977,
    launchDate: 'Aug 20 & Sep 5, 1977',
    activeSpan: '49+ years and still transmitting!',
    destination: 'Interstellar Space (Beyond the Sun’s Bubble)',
    statusLabel: 'Active · Farthest Human-Made Spacecraft Ever',
    tagline: 'Twin cosmic travelers carrying Earth’s Golden Record between the stars',
    kidOverview:
      'Voyager 1 and Voyager 2 took advantage of a rare planet alignment that happens once every 176 years! They photographed Jupiter, Saturn, Uranus, and Neptune, and today they are the farthest human-made objects in history—sailing in true interstellar space.',
    motionEnvironment: 'interstellar',
    motionCaption: 'Gliding through interstellar space over 24 billion km from home, dish pointed back at Earth.',
    defaultCameraPos: [4.6, 2.8, 5.2],
    parts: [
      {
        id: 'high-gain-dish',
        name: '3.7m High-Gain Dish Antenna',
        role: 'Deep-Space Megaphone',
        howItWorked:
          'This giant white bowl points straight back toward Earth—even from billions of kilometers away! It focuses Voyager’s faint radio whispers into a tight beam that giant dishes on Earth can catch.',
        funFact: 'Voyager 1’s radio signal takes over 22 hours traveling at the speed of light just to reach Earth!',
        explodeOffset: [0, 1.3, 0],
        cameraOffset: [2.8, 2.8, 3.2],
      },
      {
        id: 'golden-record',
        name: 'The Golden Record',
        role: 'Message to the Stars',
        howItWorked:
          'Bolted to the side of the spacecraft is a gold-plated copper phonograph disc inside a protective cover with picture instructions. It holds whale songs, thunder, Mozart, Chuck Berry, and greetings in 55 languages!',
        funFact: 'Because space has no air to rust metal, the Golden Record can last over a billion years.',
        explodeOffset: [1.3, 0.2, 0.9],
        cameraOffset: [3.2, 1.0, 2.5],
      },
      {
        id: 'rtg-boom',
        name: 'RTG Nuclear Power Boom',
        role: 'Sunlight-Free Battery',
        howItWorked:
          'Out beyond Saturn, sunlight is way too dim for solar panels. So Voyager uses three glowing-warm plutonium cylinders on a long boom that turn natural heat directly into electricity—no moving parts required!',
        funFact: 'The RTGs are placed on a long stick so their warmth and tiny radiation don’t bother the sensitive cameras.',
        explodeOffset: [-1.5, -0.4, 0.8],
        cameraOffset: [-3.4, 1.0, 2.8],
      },
      {
        id: 'scan-platform',
        name: 'Science Scan Platform',
        role: 'Planetary Eyes & Sniffers',
        howItWorked:
          'At the end of another boom sits a rotating turret packed with wide-angle cameras, infrared thermometers, and ultraviolet spectrometers. It swiveled smoothly to snap close-up portraits of moons and rings as Voyager zoomed past.',
        funFact: 'Voyager’s cameras spotted active volcanoes erupting on Jupiter’s moon Io—the first ever seen off Earth!',
        explodeOffset: [1.6, 0.6, -0.7],
        cameraOffset: [3.4, 1.4, -2.2],
      },
      {
        id: 'magnetometer-boom',
        name: '13-Meter Magnetometer Boom',
        role: 'Cosmic Wind Sensor',
        howItWorked:
          'This super-long lattice truss stretches far away from the spacecraft body so the ship’s own electronics don’t mess up measurements of magnetic fields—helping Voyager detect the exact moment it left our Sun’s bubble!',
        funFact: 'The thin fiberglass boom folded up like an accordion inside the rocket before springing open in space.',
        explodeOffset: [0, -0.3, -1.6],
        cameraOffset: [2.6, 1.2, -3.8],
      },
    ],
    timeline: [
      {
        date: 'Aug–Sep 1977',
        year: 1977,
        title: 'Twin Launch of the Grand Tour',
        description: 'Voyager 2 launches first, followed by Voyager 1 on a faster path toward Jupiter and Saturn.',
      },
      {
        date: '1979–1981',
        year: 1980,
        title: 'Jupiter & Saturn Discoveries',
        description: 'The twins reveal volcanoes on Io, braided rings around Saturn, and thick hazy skies on Titan.',
      },
      {
        date: '1986 & 1989',
        year: 1989,
        title: 'Voyager 2 Visits Uranus & Neptune',
        description: 'Voyager 2 becomes the only spacecraft in history to visit all four giant outer planets!',
      },
      {
        date: 'August 2012 & Nov 2018',
        year: 2012,
        title: 'Entering Interstellar Space',
        description: 'Both Voyagers cross the heliopause, leaving the Sun’s magnetic bubble behind forever.',
      },
    ],
    story: {
      title: 'The Golden Postcard Beyond the Stars',
      frontlineCallsign: 'Voyager Twins · Interstellar Vanguard',
      chapters: [
        {
          chapterTitle: 'Chapter 1: Once Every 176 Years',
          setting: 'Outer Solar System Highway',
          text: 'In 1977, all four giant outer planets lined up like stepping stones across the night sky. Engineers launched twin scouts—Voyager 1 and Voyager 2—to surf from planet to planet using gravity like cosmic trampolines!',
          kidTakeaway: 'Gravity assists let a spacecraft steal a tiny bit of a planet’s orbital speed to fling itself much farther.',
        },
        {
          chapterTitle: 'Chapter 2: The Pale Blue Dot',
          setting: '6 Billion Kilometers From Home',
          text: 'Before turning off its cameras to save power forever, Voyager 1 looked back over its shoulder and snapped a family portrait of the planets. There was Earth—just a tiny speck smaller than a pixel suspended in a sunbeam.',
          kidTakeaway: 'Every person and story on Earth lives together on one fragile, precious blue world.',
        },
        {
          chapterTitle: 'Chapter 3: Sailing Between the Stars',
          setting: 'Interstellar Dark, Today',
          text: 'Decades later, with power running low, the Voyager twins are still humming along out past the Sun’s frontier. Tucked on their sides, the Golden Records shine patiently—Earth’s friendly hello to whatever future awaits among the stars.',
          kidTakeaway: 'Great engineering can outlast generations and keep exploring for nearly half a century.',
        },
      ],
    },
  },
  {
    id: 'parker-solar-probe',
    name: 'Parker Solar Probe',
    shortName: 'Parker Probe',
    categoryId: 'record-makers',
    isFeaturedRequired: false,
    launchYear: 2018,
    launchDate: 'August 12, 2018',
    activeSpan: '2018–Present (Active)',
    destination: 'The Sun’s Corona',
    statusLabel: 'Active · Fastest Human-Made Object Ever',
    tagline: 'A heat-armored speedster flying straight through the Sun’s outer atmosphere',
    kidOverview:
      'Parker Solar Probe holds the all-time speed record for anything humans have ever built—zooming at 692,000 km/h! Protected by a thick carbon-foam shield, it dives closer to the Sun than Mercury to touch the Sun’s super-hot outer glow.',
    motionEnvironment: 'solar-corona',
    motionCaption: 'Skimming the Sun’s blazing corona at 692,000 km/h with its carbon heat shield facing the blaze.',
    defaultCameraPos: [3.8, 2.2, 4.4],
    parts: [
      {
        id: 'heat-shield',
        name: 'Carbon-Composite Heat Shield',
        role: '1,370°C Thermal Armor',
        howItWorked:
          'This hexagonal sandwich of carbon foam and white ceramic paint faces the Sun nonstop. Even when the front glows at 1,370°C, the instruments hiding in its shadow stay at a comfy room temperature!',
        funFact: 'The shield is 11.4 centimeters thick—about as thick as a big hardcover dictionary—and mostly empty airy carbon.',
        explodeOffset: [0, 0, 1.4],
        cameraOffset: [2.8, 1.5, 3.6],
      },
      {
        id: 'cooling-arrays',
        name: 'Water-Cooled Solar Wings',
        role: 'Tuck-Away Power Panels',
        howItWorked:
          'When close to the Sun, the solar wings fold back behind the heat shield so only a tiny sliver peeks out into the blinding sunlight. Pumped deionized water flows through them like a car radiator to carry away extra heat!',
        funFact: 'Just one gallon of cooling water protects the solar panels from melting near the Sun.',
        explodeOffset: [1.3, 0.2, -0.4],
        cameraOffset: [3.2, 1.6, 2.2],
      },
      {
        id: 'faraday-cup',
        name: 'Solar Wind Faraday Cup',
        role: 'Plasma Scooper',
        howItWorked:
          'Made of ultra-tough titanium-zirconium-molybdenum metal with sapphire crystal insulators, this little cup actually pokes AROUND the edge of the heat shield to taste the Sun’s blazing solar wind directly!',
        funFact: 'It has to survive temperatures hot enough to melt ordinary steel.',
        explodeOffset: [0.9, 0.8, 0.8],
        cameraOffset: [2.5, 2.2, 2.5],
      },
      {
        id: 'main-bus',
        name: 'Shadowed Hexagonal Body',
        role: 'Cool Command Core',
        howItWorked:
          'Tucked safely inside the cone of shadow behind the heat shield, the computer automatically keeps the shield pointed straight at the Sun without waiting for instructions from Earth.',
        funFact: 'Radio signals take 8 minutes from Earth, so Parker has to steer itself like a smart autopilot!',
        explodeOffset: [0, 0, -1.2],
        cameraOffset: [-2.6, 1.6, -2.8],
      },
    ],
    timeline: [
      {
        date: 'August 12, 2018',
        year: 2018,
        title: 'Launch Toward the Sun',
        description: 'Parker blasts off on a Delta IV Heavy rocket to begin seven Venus gravity-assist loops.',
      },
      {
        date: 'April 28, 2021',
        year: 2021,
        title: 'Touching the Sun!',
        description: 'Parker becomes the first spacecraft ever to fly directly inside the Sun’s magnetic corona.',
      },
      {
        date: 'December 24, 2024',
        year: 2024,
        title: 'Record Speed & Closest Pass',
        description: 'Sweeps just 6.1 million km above the solar surface at an astonishing 692,000 km/h!',
      },
      {
        date: '2025–2026+',
        year: 2026,
        title: 'Solving Solar Storm Mysteries',
        description: 'Continues diving around the Sun to help predict space weather that affects satellites and auroras on Earth.',
      },
    ],
    story: {
      title: 'The Shield That Touched a Star',
      frontlineCallsign: 'Solar Vanguard · Corona Runner',
      chapters: [
        {
          chapterTitle: 'Chapter 1: Falling Toward the Fire',
          setting: 'Inner Solar System',
          text: 'Going to the Sun is actually harder than flying to Pluto! Because Earth races sideways so fast around the Sun, Parker Solar Probe had to swing past Venus seven times to slow its sideways speed and dive inward toward the star at the center of our Cosmic Frontlines.',
          kidTakeaway: 'Orbiting closer to the Sun means losing sideways momentum—and picking up incredible dive speed!',
        },
        {
          chapterTitle: 'Chapter 2: Cool in the Shadow',
          setting: '6 Million km Above Solar Storms',
          text: 'As roaring magnetic loops erupted beneath it, Parker held its bright white heat shield steady like an umbrella in a dragon’s breath. Just a meter behind that shield, its computer hummed along at room temperature—cool as a library!',
          kidTakeaway: 'Space has no air, so heat only travels by direct sunlight—stay in the shadow and you stay cool!',
        },
        {
          chapterTitle: 'Chapter 3: Guardian of Earth’s Skies',
          setting: 'Solar Orbit',
          text: 'By scooping up clues inside the Sun’s corona, Parker helps Earth predict solar flares before they knock out GPS satellites or power grids, while painting breathtaking auroras across our poles.',
          kidTakeaway: 'Studying our Sun protects technology and astronauts everywhere in the solar system.',
        },
      ],
    },
  },

  // =========================================================================
  // 3. FALLEN ON MARS
  // =========================================================================
  {
    id: 'opportunity',
    name: 'Opportunity (MER-B)',
    shortName: 'Opportunity',
    categoryId: 'fallen-on-mars',
    isFeaturedRequired: true,
    launchYear: 2003,
    launchDate: 'July 7, 2003',
    activeSpan: '14+ Earth years (5,111 Martian sols)',
    destination: 'Meridiani Planum, Mars',
    statusLabel: 'Mission Complete · Resting on Mars (2018 Dust Storm)',
    tagline: 'Planned for 90 days—roamed across Mars for over 14 unforgettable years!',
    kidOverview:
      'Opportunity landed on Mars wrapped in giant bouncing airbags! Scientists hoped the solar-powered rover would last 90 days, but Martian winds kept cleaning dust off its wings, helping "Oppy" drive a full marathon across the Red Planet.',
    motionEnvironment: 'mars-surface',
    motionCaption: 'Rolling across dusty Martian craters with 6 independent wheels and scanning rocks.',
    defaultCameraPos: [4.2, 2.4, 4.6],
    parts: [
      {
        id: 'pancam-mast',
        name: 'Pancam Mast & Stereo Eyes',
        role: 'Robot Geologist Head',
        howItWorked:
          'Standing tall like a periscope, Opportunity’s "head" held twin panoramic cameras spaced apart just like human eyes so scientists could see Mars in 3D! It also carried a heat-vision spectrometer to tell which minerals were inside rocks.',
        funFact: 'Oppy’s cameras snapped over 217,000 pictures of Mars, including rusty sunsets and crater rims!',
        explodeOffset: [0, 1.35, 0],
        cameraOffset: [2.4, 2.5, 2.6],
      },
      {
        id: 'solar-wings',
        name: 'Gold-Tinted Solar Wings',
        role: 'Sunlight Power Plant',
        howItWorked:
          'Flat solar arrays folded out like butterfly wings after landing, turning Martian sunshine into electricity to charge Oppy’s batteries every day. Helpful Martian wind gusts ("dust devils") blew dust off the panels again and again!',
        funFact: 'In 2018, a planet-wide dust storm blocked the sun for months, finally putting Oppy to sleep after 14 years.',
        explodeOffset: [0, 0.7, 0],
        cameraOffset: [3.2, 2.4, 2.8],
      },
      {
        id: 'rocker-bogie-wheels',
        name: '6 Rocker-Bogie Wheels',
        role: 'Rock-Climbing Legs',
        howItWorked:
          'Six aluminum wheels with bumpy cleats sit on a clever hinged suspension system. Even if one side climbs a boulder twice as tall as the wheel, the rover’s body tilts only half as much so it doesn’t tip over!',
        funFact: 'Opportunity drove 45.16 kilometers on Mars—longer than an Olympic marathon!',
        explodeOffset: [0, -0.95, 0],
        cameraOffset: [3.4, 0.8, 3.2],
      },
      {
        id: 'robotic-arm',
        name: '5-Jointed Robotic Arm',
        role: 'Rock Grinder & Microscope',
        howItWorked:
          'Mounted on the front like an explorer’s hand, this arm folded out to press a tiny magnifying lens and a rock-grinding drill against Martian boulders—proving Mars once had liquid water!',
        funFact: 'Oppy found tiny round mineral pebbles nicknamed "blueberries" that only form in watery rock.',
        explodeOffset: [0, 0, 1.35],
        cameraOffset: [2.6, 1.4, 3.4],
      },
      {
        id: 'warm-box',
        name: 'Warm Electronics Box (WEB)',
        role: 'Insulated Brain',
        howItWorked:
          'Martian nights plunge below -90°C! This gold-lined insulated chest kept the rover’s computer and lithium batteries cozy using aerogel insulation and tiny heaters.',
        funFact: 'Aerogel is 99% air—so light it feels like frozen smoke, yet blocks freezing cold!',
        explodeOffset: [0, 0.2, 0],
        cameraOffset: [2.6, 1.4, -2.6],
      },
    ],
    timeline: [
      {
        date: 'January 25, 2004',
        year: 2004,
        title: 'Airbag Bounce Landing',
        description: 'Opportunity bounces 26 times inside giant airbags and rolls right into Eagle Crater—a "hole in one!"',
      },
      {
        date: 'March 2004',
        year: 2004,
        title: 'Evidence of Ancient Water',
        description: 'Inside Eagle Crater, Oppy discovers layered rocks and mineral "blueberries" formed in ancient Mars water.',
      },
      {
        date: '2011–2015',
        year: 2015,
        title: 'Endeavour Crater & Marathon Record',
        description: 'Reaches huge Endeavour Crater and breaks the all-time off-Earth driving distance record of 42.2 km.',
      },
      {
        date: 'June 10, 2018',
        year: 2018,
        title: 'The Final Transmission',
        description: 'A monstrous global dust storm turns Martian noon into midnight. Oppy sends one last message and rests forever.',
      },
    ],
    story: {
      title: '90 Days That Became 14 Years on the Red Frontier',
      frontlineCallsign: 'Rover Oppy · Meridiani Scout',
      chapters: [
        {
          chapterTitle: 'Chapter 1: A Hole-in-One on Mars',
          setting: 'Eagle Crater, January 2004',
          text: 'Boing! Boing! Boing! Wrapped inside a cluster of giant bouncy airbags, Opportunity skipped across the red Martian sand and rolled gently to a stop right inside a rocky bowl. When its petals unfolded, it saw bedrock sticking right out in front of its wheels!',
          kidTakeaway: 'Airbags let small rovers bounce safely to a stop without needing heavy landing rockets.',
        },
        {
          chapterTitle: 'Chapter 2: Secrets in the Stone',
          setting: 'Victoria & Endeavour Craters',
          text: 'Opportunity’s mission was supposed to last just 90 Martian days. Day 90 came and went. Year 1 turned into Year 5, then Year 10! Swirling dust devils acted like friendly pit crews, sweeping Oppy’s solar wings clean so the little rover could keep climbing crater rims and proving Mars was once wet and warm.',
          kidTakeaway: 'Curiosity and teamwork between engineers on Earth and robots on Mars can shatter every expectation.',
        },
        {
          chapterTitle: 'Chapter 3: Goodnight, Brave Scout',
          setting: 'Perseverance Valley, 2018',
          text: 'When a planet-wrapping dust storm finally darkened the sky in 2018, Opportunity held on as long as its batteries allowed. Today it rests quietly on the Martian hillside—a permanent monument on the Cosmic Frontlines.',
          kidTakeaway: 'Even when a spacecraft’s batteries fade, its discoveries change science forever.',
        },
      ],
    },
  },
  {
    id: 'ingenuity',
    name: 'Ingenuity Mars Helicopter',
    shortName: 'Ingenuity',
    categoryId: 'fallen-on-mars',
    isFeaturedRequired: false,
    launchYear: 2020,
    launchDate: 'July 30, 2020',
    activeSpan: '72 flights across nearly 3 years on Mars',
    destination: 'Jezero Crater, Mars',
    statusLabel: 'Mission Complete · Resting at "Valinor Hills", Mars',
    tagline: 'The Wright Brothers moment on another world—first aircraft to fly on Mars!',
    kidOverview:
      'Mars has air 100 times thinner than Earth’s—like flying at triple the height of Mount Everest! Ingenuity carried a tiny piece of fabric from the 1903 Wright Flyer and proved powered flight works on other planets by completing 72 flights!',
    motionEnvironment: 'mars-flight',
    motionCaption: 'Spinning carbon blades at 2,500 RPM to hover above red Jezero Crater dunes.',
    defaultCameraPos: [3.6, 2.2, 4.0],
    parts: [
      {
        id: 'rotor-blades',
        name: 'Counter-Rotating Carbon Blades',
        role: 'Ultra-Fast Martian Wings',
        howItWorked:
          'Two lightweight carbon-fiber rotor sets spin in opposite directions at over 2,500 revolutions per minute—ten times faster than an Earth helicopter! Spinning in opposite directions cancels twist so Ingenuity doesn’t spin out of control.',
        funFact: 'The blades span 1.2 meters wide, yet the whole helicopter weighs only 1.8 kilograms on Earth!',
        explodeOffset: [0, 1.35, 0],
        cameraOffset: [2.6, 2.6, 2.8],
      },
      {
        id: 'top-solar',
        name: 'Top Solar Charging Panel',
        role: 'Sun-Powered Battery Charger',
        howItWorked:
          'Sitting right above the upper rotor, this thin solar panel charges six lithium-ion batteries during the sunny Martian day. Nearly two-thirds of that power goes just to keeping the electronics warm overnight!',
        funFact: 'Tucked underneath the solar panel sits a postage-stamp-sized cloth square from the Wright Brothers’ first airplane!',
        explodeOffset: [0, 1.95, 0],
        cameraOffset: [2.4, 3.0, 2.4],
      },
      {
        id: 'fuselage-cube',
        name: 'Insulated Electronics Cube',
        role: 'Autopilot Brain & Camera',
        howItWorked:
          'Because Mars is far away, humans cannot fly Ingenuity with a joystick. Its smartphone-grade computer looks at rocks passing below through a downward camera 30 times a second to steer itself smoothly!',
        funFact: 'Ingenuity’s main processor was similar to the chip inside a popular smartphone.',
        explodeOffset: [0, 0, 0],
        cameraOffset: [2.4, 1.2, 2.8],
      },
      {
        id: 'landing-legs',
        name: '4 Springy Carbon-Fiber Legs',
        role: 'Shock-Absorbing Feet',
        howItWorked:
          'Four ultra-light, slightly springy carbon-fiber tubes flare outward from the body cube, cushioning Ingenuity whenever it touches down on uneven Martian sand and pebbles.',
        funFact: 'On Flight 72 in January 2024, a sandy landing tipped a blade tip, turning Ingenuity into a permanent weather station.',
        explodeOffset: [0, -1.0, 0],
        cameraOffset: [2.6, 0.2, 2.8],
      },
    ],
    timeline: [
      {
        date: 'February 18, 2021',
        year: 2021,
        title: 'Rides Belly of Perseverance',
        description: 'Lands safely in Jezero Crater tucked under the Perseverance rover’s protective belly shield.',
      },
      {
        date: 'April 19, 2021',
        year: 2021,
        title: 'First Flight on Another Planet!',
        description: 'Hovers 3 meters above Mars for 39.1 seconds—history’s first powered flight on another world!',
      },
      {
        date: '2021–2023',
        year: 2023,
        title: 'From Test Craft to Aerial Scout',
        description: 'Flies ahead of Perseverance to scout sand traps and boulders across 17 kilometers of terrain.',
      },
      {
        date: 'January 18, 2024',
        year: 2024,
        title: 'Flight 72 Finale',
        description: 'Completes its 72nd and final flight, smashing its original goal of just 5 test hops.',
      },
    ],
    story: {
      title: 'The Little Helicopter That Taught Mars to Fly',
      frontlineCallsign: 'Air Scout Ginny · Jezero Sky',
      chapters: [
        {
          chapterTitle: 'Chapter 1: Impossible Air',
          setting: 'Wright Brothers Field, Mars',
          text: 'Everyone warned that Martian air was almost a vacuum—too thin to lift a bird or an airplane. Ingenuity didn’t listen. With featherlight carbon wings and a computer brain sharper than a hawk, it spun its twin blades into a blur.',
          kidTakeaway: 'To fly in thin air, you must build ultra-light and spin blades much faster!',
        },
        {
          chapterTitle: 'Chapter 2: Rising Above the Red Dust',
          setting: '3 Meters Over Jezero Crater',
          text: 'For 39 breathless seconds, dust swirled beneath four tiny feet as Ingenuity rose straight into the pink Martian sky! Back on Earth, engineers cheered as the first aircraft ever conquered alien skies.',
          kidTakeaway: 'What starts as a tiny 39-second test can unlock a whole new way to explore planets.',
        },
        {
          chapterTitle: 'Chapter 3: 72 Flights Beyond the Plan',
          setting: 'Valinor Hills, 2024',
          text: 'Five flights turned into seventy-two! Ingenuity became Perseverance’s eyes in the sky, leaping over cliffs and sand dunes where no rover wheel could go. Now future rotorcraft are being built to fly on Titan and Mars because Ginny showed the way.',
          kidTakeaway: 'Every bold test flight opens the sky for bigger explorers tomorrow.',
        },
      ],
    },
  },

  // =========================================================================
  // 4. GAS GIANTS
  // =========================================================================
  {
    id: 'cassini',
    name: 'Cassini-Huygens',
    shortName: 'Cassini',
    categoryId: 'gas-giants',
    isFeaturedRequired: true,
    launchYear: 1997,
    launchDate: 'October 15, 1997',
    activeSpan: '20 years in space · 13 years orbiting Saturn',
    destination: 'Saturn & Its Rings and Moons',
    statusLabel: 'Mission Complete · Grand Finale Dive into Saturn (2017)',
    tagline: 'The Ring-Rider that uncovered ocean moons and dove straight into Saturn',
    kidOverview:
      'Cassini spent 13 years dancing around Saturn like a cosmic photographer! It carried a piggyback lander named Huygens that parachuted onto mysterious moon Titan, discovered icy geysers spurting from Enceladus, and ended with a heroic dive right between Saturn and its rings.',
    motionEnvironment: 'saturn-orbit',
    motionCaption: 'Threading the narrow gap between Saturn’s golden cloud tops and icy rings.',
    defaultCameraPos: [4.5, 2.5, 5.0],
    parts: [
      {
        id: 'cassini-dish',
        name: '4-Meter High-Gain Antenna',
        role: 'Data Dish & Sun Shield',
        howItWorked:
          'This big white dish did double duty! While flying past hot Venus early in its trip, Cassini pointed the dish at the Sun like a parasol to keep cool. At Saturn, it beamed stunning ring photos 1.4 billion km back to Earth.',
        funFact: 'When Cassini dove into Saturn’s clouds at the very end, it kept this dish locked on Earth until the last second!',
        explodeOffset: [0, 1.4, 0],
        cameraOffset: [2.8, 2.8, 3.0],
      },
      {
        id: 'huygens-probe',
        name: 'Huygens Titan Lander',
        role: 'Piggyback Moon Explorer',
        howItWorked:
          'Shaped like a copper-gold UFO saucer on Cassini’s side, Huygens detached in 2004 and parachuted through Titan’s thick orange smog. It landed with a soft "splat" on icy mud beside liquid methane rivers!',
        funFact: 'Huygens made the farthest landing from Earth humans have ever achieved!',
        explodeOffset: [1.45, 0.1, 0.6],
        cameraOffset: [3.4, 1.2, 2.6],
      },
      {
        id: 'gold-bus',
        name: 'Gold-Foil Main Body & Engines',
        role: 'Insulated Spacecraft Heart',
        howItWorked:
          'Wrapped in shiny gold-colored Kapton blankets to trap warmth and block micrometeorites, the 12-sided body held twin main rocket engines and fuel tanks for steering between dozens of Saturn’s moons.',
        funFact: 'The gold-colored foil is actually super-strong plastic film coated with thin metal!',
        explodeOffset: [0, 0, 0],
        cameraOffset: [2.8, 1.2, 3.2],
      },
      {
        id: 'mag-boom',
        name: '11-Meter Magnetometer Boom',
        role: 'Invisible Force Mapper',
        howItWorked:
          'This ultra-thin triangular truss stretched far out into space to measure Saturn’s giant invisible magnetic field and track how fast the planet’s deep core rotates.',
        funFact: 'Saturn’s magnetic field is so smooth and symmetric it still puzzles planetary scientists!',
        explodeOffset: [-1.6, 0.2, -0.6],
        cameraOffset: [-3.6, 1.5, 2.6],
      },
      {
        id: 'optical-palette',
        name: 'Camera & Spectrometer Palette',
        role: 'Ice-Geyser Spotter',
        howItWorked:
          'A cluster of sharp cameras and infrared sensors bolted to the side of Cassini. They spotted towering plumes of water ice spraying out of cracks on tiny moon Enceladus—meaning an ocean hides under its ice!',
        funFact: 'Cassini literally flew right through Enceladus’s water spray to taste what was inside!',
        explodeOffset: [-1.1, -0.4, 1.1],
        cameraOffset: [-2.8, 0.8, 3.2],
      },
    ],
    timeline: [
      {
        date: 'October 15, 1997',
        year: 1997,
        title: 'Launch on Titan IVB',
        description: 'Cassini-Huygens lifts off for a 7-year winding journey past Venus, Earth, and Jupiter.',
      },
      {
        date: 'July 1, 2004',
        year: 2004,
        title: 'Arrival Through Saturn’s Rings',
        description: 'Fires its main engine for 96 minutes to enter orbit around the ringed giant.',
      },
      {
        date: 'January 14, 2005',
        year: 2005,
        title: 'Huygens Lands on Titan',
        description: 'Parachutes beneath orange clouds and sends back the first photos from Titan’s surface.',
      },
      {
        date: 'September 15, 2017',
        year: 2017,
        title: 'The Grand Finale Dive',
        description: 'To protect Saturn’s ocean moons from Earth microbes, Cassini plunges heroically into Saturn’s sky.',
      },
    ],
    story: {
      title: 'The Ring-Rider’s Grand Finale',
      frontlineCallsign: 'Orbiter Cassini · Saturn Watch',
      chapters: [
        {
          chapterTitle: 'Chapter 1: Threading the Needle',
          setting: 'Saturn’s Outer Rings',
          text: 'When Cassini reached Saturn, it didn’t just look from far away—it threaded the gap right through the ring plane, firing its engine while using its big white dish like a shield against stray ice pebbles!',
          kidTakeaway: 'Saturn’s rings look solid from afar, but they are made of billions of orbiting ice chunks and snowflakes.',
        },
        {
          chapterTitle: 'Chapter 2: Water Worlds in the Deep Freeze',
          setting: 'Moon Enceladus',
          text: 'Everyone thought moons so far from the Sun would be frozen solid like ice cubes. Then Cassini turned its cameras toward snowy Enceladus—and gasped! Giant silver geysers were erupting into space from a hidden warm saltwater ocean below the crust!',
          kidTakeaway: 'Tidal squeezing from a giant planet can keep oceans warm even in the freezing outer solar system.',
        },
        {
          chapterTitle: 'Chapter 3: Becoming Part of the Planet',
          setting: 'Saturn’s Upper Clouds, 2017',
          text: 'Running low on fuel after 13 glorious years, Cassini wouldn’t risk bumping into Enceladus or Titan. Instead, it dove 22 times between Saturn and its rings before plunging into the golden clouds—sending science whispers home until the very last heartbeat.',
          kidTakeaway: 'Scientists protect ocean worlds by retiring spacecraft safely when their fuel runs out.',
        },
      ],
    },
  },
  {
    id: 'galileo',
    name: 'Galileo Orbiter',
    shortName: 'Galileo',
    categoryId: 'gas-giants',
    isFeaturedRequired: false,
    launchYear: 1989,
    launchDate: 'October 18, 1989',
    activeSpan: '14 years · First Jupiter Orbiter',
    destination: 'Jupiter & Galilean Moons',
    statusLabel: 'Mission Complete · Deorbited into Jupiter (2003)',
    tagline: 'The clever dual-spin explorer that dropped the first probe into Jupiter’s clouds',
    kidOverview:
      'Galileo was the first spacecraft to orbit Jupiter and visit its four biggest moons up close! Even when its main umbrella antenna jammed halfway open, clever engineers reprogrammed it to send amazing discoveries home using a tiny backup antenna.',
    motionEnvironment: 'jupiter-orbit',
    motionCaption: 'Swooping past Jupiter’s swirling Great Red Spot and icy moon Europa.',
    defaultCameraPos: [4.2, 2.4, 4.8],
    parts: [
      {
        id: 'umbrella-dish',
        name: 'Umbrella High-Gain Antenna',
        role: 'Foldable Radio Dish',
        howItWorked:
          'Built out of gold-plated wire mesh stretched over 18 ribs like a camping umbrella, it was designed to unfold in space. Even though three ribs stuck closed, Galileo’s small secondary antenna saved the entire mission!',
        funFact: 'Engineers invented clever data compression software in flight to squeeze huge photos through the tiny backup radio!',
        explodeOffset: [0, 1.3, 0],
        cameraOffset: [2.6, 2.6, 3.0],
      },
      {
        id: 'spun-section',
        name: 'Spinning Instrument Section',
        role: '360° Space Sweeper',
        howItWorked:
          'Most of Galileo rotated steadily 3 times every minute so radiation and magnetic sensors could scan a full circle around Jupiter without needing extra motors.',
        funFact: 'Galileo was the first spacecraft ever built with two halves spinning at different speeds!',
        explodeOffset: [0, 0.2, 0],
        cameraOffset: [2.8, 1.4, 2.8],
      },
      {
        id: 'despun-platform',
        name: 'Despun Camera Platform',
        role: 'Steady Moon Photographer',
        howItWorked:
          'Connected by a special motorized bearing at the bottom, this platform rotated in reverse so Galileo’s cameras stayed rock-steady while the rest of the ship spun above it!',
        funFact: 'This steady eye spotted evidence of a vast salty ocean hidden beneath moon Europa’s cracked ice shell.',
        explodeOffset: [0, -1.1, 0],
        cameraOffset: [2.4, -0.2, 3.0],
      },
      {
        id: 'entry-probe',
        name: 'Jupiter Atmospheric Probe',
        role: 'Cloud-Diving Capsule',
        howItWorked:
          'Released five months before reaching Jupiter, this cone-shaped probe slammed into Jupiter’s clouds at 170,000 km/h—faster than any bullet—then parachuted down for 58 minutes measuring scorching winds and storms!',
        funFact: 'Its heat shield lost more than half its weight from the blazing friction of diving into Jupiter!',
        explodeOffset: [1.3, -0.7, 0.8],
        cameraOffset: [3.0, 0.5, 3.0],
      },
    ],
    timeline: [
      {
        date: 'October 18, 1989',
        year: 1989,
        title: 'Space Shuttle Atlantis Launch',
        description: 'Deployed from Space Shuttle Atlantis cargo bay to begin a 6-year journey to Jupiter.',
      },
      {
        date: '1991 & 1993',
        year: 1993,
        title: 'First Asteroid Close-Ups',
        description: 'Visits asteroids Gaspra and Ida, discovering Dactyl—the first known asteroid moon!',
      },
      {
        date: 'December 7, 1995',
        year: 1995,
        title: 'Probe Plunges Into Jupiter',
        description: 'Atmospheric probe survives fiery entry while Galileo enters orbit around the gas giant.',
      },
      {
        date: 'September 21, 2003',
        year: 2003,
        title: 'Safe Farewell Dive',
        description: 'Plunges into Jupiter after discovering subsurface saltwater oceans on Europa, Ganymede, and Callisto.',
      },
    ],
    story: {
      title: 'The Little Backup Antenna That Could',
      frontlineCallsign: 'Scout Galileo · Jovian Pioneer',
      chapters: [
        {
          chapterTitle: 'Chapter 1: A Stuck Umbrella',
          setting: 'Deep Space, 1991',
          text: 'Disaster struck on the road to Jupiter! Galileo tried to pop open its giant radio umbrella—and it jammed halfway. Without that dish, could it ever send photos home from 800 million kilometers away? Earth’s engineers refused to quit.',
          kidTakeaway: 'Space missions constantly solve surprise problems from millions of kilometers away using smart software.',
        },
        {
          chapterTitle: 'Chapter 2: New Brains in Mid-Flight',
          setting: 'En Route to Jupiter',
          text: 'Scientists beamed brand-new compression code to Galileo’s computer, teaching it to pack pictures 10 times tighter and beam them through a tiny backup antenna no bigger than a coffee can. The mission was saved!',
          kidTakeaway: 'Updating software over radio waves can give a spacecraft brand-new superpowers.',
        },
        {
          chapterTitle: 'Chapter 3: Oceans Under Ice',
          setting: 'Orbiting Europa',
          text: 'Once at Jupiter, Galileo dropped a probe straight into the stormy clouds and then scanned icy moon Europa—revealing magnetic hints of a dark, hidden ocean bigger than all of Earth’s seas combined.',
          kidTakeaway: 'Galileo proved gas giant moons might be some of the best places to look for alien oceans.',
        },
      ],
    },
  },

  // =========================================================================
  // 5. BOUND BY GRAVITY
  // =========================================================================
  {
    id: 'juno',
    name: 'Juno',
    shortName: 'Juno',
    categoryId: 'bound-by-gravity',
    isFeaturedRequired: true,
    launchYear: 2011,
    launchDate: 'August 5, 2011',
    activeSpan: '2011–Present (Active)',
    destination: 'Polar Orbit Around Jupiter',
    statusLabel: 'Active · Diving Through Jupiter’s Gravity Well',
    tagline: 'Giant windmill wings powered by sunlight, locked in thrilling polar dives past Jupiter',
    kidOverview:
      'Juno is bound tightly in a looping polar orbit around Jupiter—the biggest gravity bully in our solar system! Every few weeks, Jupiter’s massive gravity slings Juno down over the cloud tops at 210,000 km/h before whipping it high into space again.',
    motionEnvironment: 'jupiter-orbit',
    motionCaption: 'Swinging in a sweeping polar loop over Jupiter’s glowing blue polar auroras.',
    defaultCameraPos: [5.0, 2.8, 5.4],
    parts: [
      {
        id: 'three-solar-wings',
        name: '3 Giant Solar Windmill Wings',
        role: 'Record-Breaking Sun Catchers',
        howItWorked:
          'Unlike Voyager or Cassini, Juno uses solar power out at Jupiter where sunlight is 25 times weaker than on Earth! Three massive 9-meter wings spin smoothly like a windmill to stay balanced and soak up faint sunbeams.',
        funFact: 'With wings spread, Juno is as wide as a basketball court—making it the farthest solar-powered probe ever!',
        explodeOffset: [0, 0.8, 0],
        cameraOffset: [4.2, 3.2, 4.4],
      },
      {
        id: 'titanium-vault',
        name: 'Titanium Radiation Vault',
        role: '1-cm Armored Safe',
        howItWorked:
          'Jupiter’s fierce gravity traps belts of brutal radiation that would fry normal computers in days. Juno’s brain hides inside a 200-kilogram titanium cube with walls 1 centimeter thick—like a knight’s armor!',
        funFact: 'Even inside the titanium vault, Juno gets hit by radiation equal to millions of dental X-rays!',
        explodeOffset: [0, 0.9, 0],
        cameraOffset: [2.4, 2.0, 2.6],
      },
      {
        id: 'juno-dish',
        name: '2.5m High-Gain Dish',
        role: 'Gravity-Tracking Radio',
        howItWorked:
          'Not only does this dish send JunoCam photos to Earth—scientists listen to tiny shifts in its radio pitch as Jupiter’s gravity tugs Juno faster and slower, letting them weigh Jupiter’s hidden core!',
        funFact: 'Gravity tugs change Juno’s speed by millimeters per second, and Earth’s dishes can measure even that!',
        explodeOffset: [0, 1.45, 0],
        cameraOffset: [2.2, 2.8, 2.4],
      },
      {
        id: 'junocam-sensors',
        name: 'JunoCam & Microwave Eyes',
        role: 'Storm-Peering Scanners',
        howItWorked:
          'Microwave antennas peek hundreds of kilometers beneath Jupiter’s clouds, while JunoCam snaps swirling blue cyclones at Jupiter’s poles—and invites kids and citizen scientists on Earth to vote on photo targets!',
        funFact: 'Juno also carries three tiny aluminum LEGO minifigures: Galileo and the Roman gods Jupiter and Juno!',
        explodeOffset: [0, -1.1, 0.8],
        cameraOffset: [2.5, -0.4, 3.0],
      },
    ],
    timeline: [
      {
        date: 'August 5, 2011',
        year: 2011,
        title: 'Liftoff With Giant Wings',
        description: 'Juno launches on an Atlas V rocket and loops back past Earth in 2013 for a gravity boost.',
      },
      {
        date: 'July 4, 2016',
        year: 2016,
        title: 'Captured by Jupiter’s Gravity',
        description: 'Fires its main engine for 35 minutes to let Jupiter’s immense gravity pull it into a polar orbit.',
      },
      {
        date: '2016–2021',
        year: 2019,
        title: 'Polar Cyclones & Fuzzy Core',
        description: 'Discovers geometric rings of giant cyclones at Jupiter’s poles and a surprisingly "fuzzy" planet core.',
      },
      {
        date: '2021–2026+',
        year: 2026,
        title: 'Extended Moon Flybys',
        description: 'Continues thrilling gravity dives, buzzing past volcanic Io, icy Europa, and giant Ganymede.',
      },
    ],
    story: {
      title: 'Diving Into Jupiter’s Stormy Heart',
      frontlineCallsign: 'Windmill Explorer Juno · Gravity Rider',
      chapters: [
        {
          chapterTitle: 'Chapter 1: Caught by the King of Planets',
          setting: 'Jupiter’s North Pole, July 2016',
          text: 'Jupiter holds more mass than all the other planets combined—its gravity is a giant invisible whirlpool! Juno aimed straight between Jupiter’s clouds and its fiercest radiation belts, letting gravity swing it into a soaring loop over both poles.',
          kidTakeaway: 'Polar orbits let a spacecraft see the entire spinning planet underneath as it passes over the top and bottom.',
        },
        {
          chapterTitle: 'Chapter 2: Spinning Like a Windmill',
          setting: '4,200 km Above the Clouds',
          text: 'With every swoop, Jupiter’s gravity yanked Juno faster and faster until it hit 210,000 kilometers per hour! Safe inside its titanium vault, Juno’s radio beam wobbled subtly over thick spots inside Jupiter—letting scientists "feel" the giant planet’s hidden belly using gravity alone.',
          kidTakeaway: 'Measuring how gravity tugs a spacecraft reveals what is hidden deep inside a planet.',
        },
        {
          chapterTitle: 'Chapter 3: Swirls of Blue and Gold',
          setting: 'Above the Great Red Spot',
          text: 'Every time Juno zooms past the clouds, kids and teachers around the world download its raw JunoCam images and turn them into space art—sharing the frontier of Jupiter with everyone on Earth!',
          kidTakeaway: 'Real space missions invite citizen scientists and kids everywhere to help explore!',
        },
      ],
    },
  },
  {
    id: 'new-horizons',
    name: 'New Horizons',
    shortName: 'New Horizons',
    categoryId: 'bound-by-gravity',
    isFeaturedRequired: false,
    launchYear: 2006,
    launchDate: 'January 19, 2006',
    activeSpan: '2006–Present (Active)',
    destination: 'Pluto & the Kuiper Belt',
    statusLabel: 'Active · Exploring Deep Kuiper Belt',
    tagline: 'Flung past Jupiter by gravity to reveal Pluto’s giant frozen heart!',
    kidOverview:
      'New Horizons left Earth faster than any spacecraft at launch, then used Jupiter’s giant gravity like a cosmic slingshot to shave years off its trip to Pluto! In 2015, it zipped past Pluto and revealed a giant nitrogen-ice heart on the tiny world.',
    motionEnvironment: 'interstellar',
    motionCaption: 'Cruising past icy Kuiper Belt worlds billions of kilometers beyond Neptune.',
    defaultCameraPos: [3.8, 2.3, 4.4],
    parts: [
      {
        id: 'nh-dish',
        name: '2.1-Meter High-Gain Dish',
        role: 'Pluto Photo Broadcaster',
        howItWorked:
          'Mounted right on top of the gold triangular body, this dish sent every picture of Pluto across 5 billion kilometers of dark space back to Earth at a trickle—taking 15 months to download all the flyby data!',
        funFact: 'At Pluto, radio signals took 4.5 hours one-way just to reach NASA’s antennas.',
        explodeOffset: [0, 1.2, 0],
        cameraOffset: [2.4, 2.5, 2.8],
      },
      {
        id: 'gold-triangle',
        name: 'Piano-Sized Gold Body',
        role: 'Cozy Thermos Frame',
        howItWorked:
          'Shaped like a shiny gold grand piano, New Horizons is wrapped in thick thermal blankets so its electronics stay warm like a thermos bottle out where temperatures plunge to -230°C.',
        funFact: 'New Horizons also carries a tiny bit of astronomer Clyde Tombaugh’s ashes—the scientist who discovered Pluto in 1930!',
        explodeOffset: [0, 0, 0],
        cameraOffset: [2.6, 1.4, 2.8],
      },
      {
        id: 'lorri-camera',
        name: 'LORRI Long-Range Telescope',
        role: 'Eagle-Eye Camera',
        howItWorked:
          'A sharp digital telescope bolted to the side. Even as New Horizons rocketed past Pluto at 50,000 km/h without stopping, LORRI snapped crisp mountains of water ice and smooth frozen plains.',
        funFact: 'LORRI could spot a soccer field on the ground from 160 kilometers up!',
        explodeOffset: [1.1, 0.3, 0.9],
        cameraOffset: [3.0, 1.4, 2.8],
      },
      {
        id: 'nh-rtg',
        name: 'RTG Nuclear Power Cylinder',
        role: 'Long-Distance Battery',
        howItWorked:
          'Stick-mounted off the back corner, a plutonium heat battery provides steady electricity for decades—essential because sunlight at Pluto is 1,000 times dimmer than on Earth.',
        funFact: 'It ran on less power than two bright household lightbulbs during the entire Pluto flyby!',
        explodeOffset: [-1.3, -0.2, -0.8],
        cameraOffset: [-2.8, 1.2, -2.8],
      },
    ],
    timeline: [
      {
        date: 'January 19, 2006',
        year: 2006,
        title: 'Fastest Launch Speed',
        description: 'Zooms past the Moon in just 9 hours—10 times faster than Apollo astronauts!',
      },
      {
        date: 'February 28, 2007',
        year: 2007,
        title: 'Jupiter Gravity Slingshot',
        description: 'Borrows orbital speed from Jupiter’s massive gravity, boosting speed by 14,000 km/h.',
      },
      {
        date: 'July 14, 2015',
        year: 2015,
        title: 'Pluto’s Heart Revealed',
        description: 'Sweeps 12,500 km above Pluto, revealing frozen nitrogen glaciers shaped like a giant heart.',
      },
      {
        date: 'January 1, 2019',
        year: 2019,
        title: 'Arrokoth Snowman World',
        description: 'Explores Arrokoth, a reddish peanut-shaped icy relic 6.5 billion km from the Sun.',
      },
    ],
    story: {
      title: 'The Gravity Slingshot to Pluto’s Heart',
      frontlineCallsign: 'Scout New Horizons · Kuiper Frontier',
      chapters: [
        {
          chapterTitle: 'Chapter 1: Catching a Ride From a Giant',
          setting: 'Passing Jupiter, 2007',
          text: 'Pluto was five billion kilometers away. Even at top rocket speed, getting there would take way too long! So New Horizons aimed straight toward giant Jupiter—not to stop, but to borrow a free gravity push like a skateboarder grabbing onto a moving bus.',
          kidTakeaway: 'Planets can act like invisible cosmic slingshots when you fly past them at the right angle.',
        },
        {
          chapterTitle: 'Chapter 2: Asleep in the Deep Freeze',
          setting: 'Crossing Uranus & Neptune',
          text: 'For years at a time, New Horizons went into electronic hibernation to save its parts, checking in once a week with a single green-light tone so Earth knew it was safe.',
          kidTakeaway: 'Resting in sleep mode helps deep-space probes last for decades.',
        },
        {
          chapterTitle: 'Chapter 3: A Heart at the Edge of Night',
          setting: 'Pluto Flyby, 2015',
          text: 'Everyone thought Pluto was just a gray, dead rock. When New Horizons zoomed past at 50,000 km/h, it found towering ice mountains and a bright, snow-white glacier shaped like a giant heart smiling back at Earth!',
          kidTakeaway: 'You never truly know what a distant world looks like until you send an explorer to see it.',
        },
      ],
    },
  },

  // =========================================================================
  // 6. MISSING IN ACTION
  // =========================================================================
  {
    id: 'apollo-10-snoopy',
    name: 'Apollo 10 Lunar Module "Snoopy"',
    shortName: 'Apollo 10 Snoopy',
    categoryId: 'missing-in-action',
    isFeaturedRequired: true,
    launchYear: 1969,
    launchDate: 'May 18, 1969',
    activeSpan: '8 days mission · 55+ years silent in solar orbit',
    destination: 'Heliocentric (Solar) Orbit',
    statusLabel: 'Radio Silent · Still Drifting Around the Sun (2018 AV2 Candidate)',
    tagline: 'The Moon dress-rehearsal lander stage lost in solar orbit for 50 years',
    kidOverview:
      'Before Apollo 11 could land on the Moon, Apollo 10’s Lunar Module "Snoopy" swooped down to just 14 kilometers above the lunar craters in a thrilling dress rehearsal! Afterward, Snoopy’s upper ascent stage fired its engine past the Moon into an orbit around the Sun—where its batteries ran out and it drifted silently for half a century.',
    motionEnvironment: 'solar-orbit',
    motionCaption: 'Circling the Sun in silent solar orbit along a known gravitational path after losing radio contact.',
    defaultCameraPos: [3.6, 2.0, 4.0],
    parts: [
      {
        id: 'snoopy-cabin',
        name: 'Pressurized Crew Ascent Cabin',
        role: 'Lunar Scout Cockpit',
        howItWorked:
          'Inside this lightweight aluminum cabin, astronauts Thomas Stafford and Eugene Cernan stood strapped in at the controls, looking out two tilted triangular windows to inspect Apollo 11’s future landing site.',
        funFact: 'After the astronauts crawled back into Command Module "Charlie Brown," Snoopy flew empty by remote radio command!',
        explodeOffset: [0, 0, 0],
        cameraOffset: [2.6, 1.3, 3.0],
      },
      {
        id: 'snoopy-docking',
        name: 'Top Docking Tunnel & Hatch',
        role: 'Spacecraft Linkup Ring',
        howItWorked:
          'This round ceiling collar locked tightly onto Command Module "Charlie Brown" like a space bridge so the astronauts could float safely between the two ships in lunar orbit.',
        funFact: 'Snoopy and Charlie Brown were named after the famous Peanuts comic strip characters!',
        explodeOffset: [0, 1.15, 0],
        cameraOffset: [2.2, 2.0, 2.4],
      },
      {
        id: 'snoopy-rcs',
        name: 'RCS Steering Quads & Radar',
        role: 'Attitude & Rendezvous Guide',
        howItWorked:
          'Four clusters of four tiny rocket nozzles aimed Snoopy in every direction, while its radar dish tracked Charlie Brown. Once Snoopy’s batteries drained in May 1969, all steering and radio signals stopped forever.',
        funFact: 'In 2019, amateur astronomers spotted a tiny tumbling object named 2018 AV2 on Snoopy’s exact solar path—98% sure it is Snoopy!',
        explodeOffset: [-1.15, 0.55, 0.4],
        cameraOffset: [-2.8, 1.6, 2.8],
      },
      {
        id: 'snoopy-engine',
        name: 'Ascent Engine & Fuel Tanks',
        role: 'Solar Escape Thruster',
        howItWorked:
          'Fed by two silver side tanks, Snoopy’s single ascent rocket engine burned until its fuel ran dry, flinging the empty stage past the Moon and out into an endless orbit around the Sun.',
        funFact: 'Because there is no air in solar orbit to slow it down, Snoopy is the only intact Apollo lunar ascent stage still flying around the Sun!',
        explodeOffset: [0, -1.15, 0],
        cameraOffset: [2.6, -0.6, 2.8],
      },
    ],
    timeline: [
      {
        date: 'May 18, 1969',
        year: 1969,
        title: 'Launch Toward the Moon',
        description: 'Saturn V lifts off carrying Apollo 10 Command Module Charlie Brown and Lunar Module Snoopy.',
      },
      {
        date: 'May 22, 1969',
        year: 1969,
        title: '14 km Low Pass Over Mare Tranquillitatis',
        description: 'Snoopy skims low above the Moon’s craters to test radar and scout Apollo 11’s landing spot.',
      },
      {
        date: 'May 23, 1969',
        year: 1969,
        title: 'Ascent Burn into Solar Orbit',
        description: 'After the crew returns to Charlie Brown, Snoopy fires its engine to depletion and escapes into solar orbit, soon falling radio silent.',
      },
      {
        date: 'June 2019',
        year: 2019,
        title: 'Rediscovered on Path 2018 AV2',
        description: 'Sky-watchers identify a faint solar-orbiting object matching Snoopy’s predicted trajectory after 50 years missing in action.',
      },
    ],
    story: {
      title: 'The Silent Puppy Around the Sun',
      frontlineCallsign: 'LM-4 Snoopy',
      chapters: [
        {
          chapterTitle: 'Chapter 1: Skimming the Craters',
          setting: '14 Kilometers Above the Moon, May 1969',
          text: 'Before Apollo 11 could try the first Moon landing, someone had to fly right down to the treetops—or crater rims—to prove it was safe. Snoopy dove thrillingly close to the gray lunar plains while its crew checked every instrument.',
          kidTakeaway: 'Practice missions catch problems early so the real landing can succeed.',
        },
        {
          chapterTitle: 'Chapter 2: Farewell into Sunshine',
          setting: 'Deep Space Past the Moon',
          text: 'Once the astronauts floated safely back into Charlie Brown, ground control commanded Snoopy’s ascent engine to fire until every drop of fuel was gone. Past the Moon it flew, until its batteries whispered their last radio beep and went quiet.',
          kidTakeaway: 'In space, a spacecraft keeps coasting on its orbit long after its radio goes silent.',
        },
        {
          chapterTitle: 'Chapter 3: Fifty Years of Cosmic Detective Work',
          setting: 'Heliocentric Orbit, 2019',
          text: 'Astronomers never forgot Snoopy. Because gravity follows strict mathematical paths, orbital detectives traced its path for decades until telescopes caught a tiny glint of sunlight—almost certainly Snoopy, still circling our Sun!',
          kidTakeaway: 'Even when contact is lost, gravity lets scientists calculate where a spacecraft is traveling.',
        },
      ],
    },
  },
  {
    id: 'apollo-11-eagle',
    name: 'Apollo 11 Lunar Module "Eagle" (Ascent Stage)',
    shortName: 'Apollo 11 Eagle',
    categoryId: 'missing-in-action',
    isFeaturedRequired: true,
    launchYear: 1969,
    launchDate: 'July 16, 1969',
    activeSpan: '8 days active · Lunar orbit fate uncertain',
    destination: 'Lunar Orbit (Fate Uncertain)',
    statusLabel: 'Contact Lost After Jettison · May Still Orbit the Moon Today',
    tagline: 'The famous Moon lander’s top half—left in lunar orbit with an uncertain fate',
    kidOverview:
      'Everyone knows Eagle’s gold-legged bottom half stayed parked at Tranquility Base on the Moon. But what happened to Eagle’s top ascent cabin after Neil Armstrong and Buzz Aldrin climbed back into Columbia? Left circling the Moon with its radio off, scientists once thought it crashed—until new orbital math in 2021 revealed Eagle might STILL be quietly orbiting the Moon today!',
    motionEnvironment: 'lunar-orbit',
    motionCaption: 'Drifting silently high above lunar craters—either long crashed or still locked in a rare stable lunar orbit.',
    defaultCameraPos: [3.6, 2.1, 4.0],
    parts: [
      {
        id: 'eagle-cabin',
        name: 'Ascent Cabin & Gold Foil Trim',
        role: 'First Moon Return Cockpit',
        howItWorked:
          'Built thin as soda cans to save weight, this cabin carried the lunar soil boxes and both Moonwalkers safely back off the Moon’s surface. Gold Kapton strips shielded delicate corners from extreme heat.',
        funFact: 'The walls of Eagle were so thin that a sharp screwdriver could almost poke right through them!',
        explodeOffset: [0, 0, 0],
        cameraOffset: [2.6, 1.3, 3.0],
      },
      {
        id: 'eagle-tanks',
        name: 'Side Propellant & Helium Bulge Tanks',
        role: 'Hypergolic Fuel Pods',
        howItWorked:
          'Two big rounded side pods held rocket fuel and oxidizer that ignited instantly on contact—no spark plug needed—guaranteeing Eagle could blast off the Moon on the very first try.',
        funFact: 'Astronauts actually broke the engine arming switch accidentally with a bulky spacesuit—and used a felt-tip pen to push it in!',
        explodeOffset: [1.15, 0.2, 0],
        cameraOffset: [3.0, 1.2, 2.6],
      },
      {
        id: 'eagle-antenna',
        name: 'S-Band & Rendezvous Dish Antennas',
        role: 'Historic Signal Relays',
        howItWorked:
          'Eagle’s round dish antennas beamed astronauts’ voices and navigation pings across 384,000 km back to Earth. Once Eagle undocked from Columbia for the final time, its transmitters were powered down for good.',
        funFact: 'After undocking on July 21, 1969, nobody on Earth or in orbit ever received another signal from Eagle.',
        explodeOffset: [-1.05, 0.75, 0.4],
        cameraOffset: [-2.6, 1.8, 2.8],
      },
      {
        id: 'eagle-engine',
        name: 'Ascent Engine Nozzle',
        role: 'Lunar Liftoff Rocket',
        howItWorked:
          'Eagle’s ascent engine fired for 7 minutes and 14 seconds to lift Armstrong and Aldrin from Tranquility Base back to lunar orbit—and was never fired again after they rejoined Columbia.',
        funFact: 'A 2021 computer simulation by researcher James Meador suggested Eagle’s exact orbit could stay stable for decades without crashing!',
        explodeOffset: [0, -1.15, 0],
        cameraOffset: [2.4, -0.6, 2.8],
      },
    ],
    timeline: [
      {
        date: 'July 20, 1969',
        year: 1969,
        title: 'First Humans Land on the Moon',
        description: 'Eagle touches down at Tranquility Base, making history as Neil Armstrong and Buzz Aldrin step onto lunar dust.',
      },
      {
        date: 'July 21, 1969',
        year: 1969,
        title: 'Blasting Off Back to Columbia',
        description: 'Eagle’s ascent stage leaves its landing legs behind, rockets into lunar orbit, and docks with Michael Collins aboard Columbia.',
      },
      {
        date: 'July 21, 1969',
        year: 1969,
        title: 'Jettisoned in Silent Lunar Orbit',
        description: 'With Moon rocks safely aboard Columbia, Eagle’s ascent stage is cast adrift in lunar orbit—and contact is never made again.',
      },
      {
        date: 'August 2021',
        year: 2021,
        title: 'Orbital Mystery Reopened',
        description: 'New computer gravity modeling shows Eagle’s exact starting orbit might be strangely stable—meaning it could still circle the Moon unseen!',
      },
    ],
    story: {
      title: 'The Ghost of Tranquility Base',
      frontlineCallsign: 'LM-5 Eagle',
      chapters: [
        {
          chapterTitle: 'Chapter 1: One Giant Leap, Then Liftoff',
          setting: 'Tranquility Base, Moon, July 1969',
          text: 'After collecting 21.5 kilograms of Moon rocks, Armstrong and Aldrin climbed back inside Eagle’s top cabin. One single rocket engine roared to life, leaving Eagle’s gold legs behind on the dust as the top half soared skyward.',
          kidTakeaway: 'Two-stage landers leave heavy legs behind so the return trip uses far less fuel.',
        },
        {
          chapterTitle: 'Chapter 2: Left Alone Above the Craters',
          setting: 'Lunar Orbit',
          text: 'Back inside Command Module Columbia, the three astronauts sealed the hatch and released empty Eagle into the dark. No camera followed it forever. Engineers guessed bumpy lunar gravity would soon pull it down to crash.',
          kidTakeaway: 'The Moon’s lumpy gravity tugs harder on some places than others, making low orbits tricky.',
        },
        {
          chapterTitle: 'Chapter 3: Could Eagle Still Be Flying?',
          setting: 'Lunar Reconnaissance & Modern Math',
          text: 'Decades later, no crash crater has ever been spotted for Eagle—and new supercomputer orbital math suggests its path might have slipped into a rare stable pocket! Until telescopes catch a glint, Eagle’s final chapter remains a true cosmic mystery.',
          kidTakeaway: 'Science stays exciting when new math helps us search for lost pieces of history.',
        },
      ],
    },
  },
  {
    id: 'apollo-sivb',
    name: 'Apollo S-IVB Rocket Stages (Solar Orbit)',
    shortName: 'Apollo S-IVB',
    categoryId: 'missing-in-action',
    isFeaturedRequired: true,
    launchYear: 1969,
    launchDate: 'November 14, 1969',
    activeSpan: '5 hours active · 55+ years drifting on solar paths',
    destination: 'Heliocentric Solar Orbit (J002E3 & Sisters)',
    statusLabel: 'Silent Rocket Hulks · Tracked Periodically Near Earth–Sun Paths',
    tagline: 'Giant Saturn V third-stage boosters flung past the Moon into silent solar orbit',
    kidOverview:
      'To push Apollo astronauts fast enough to escape Earth’s gravity toward the Moon, the mighty Saturn V rocket used a giant white-and-black third stage called the S-IVB. On early missions like Apollo 8, 9, 10, 11, and 12, those spent empty rocket stages drifted past the Moon into solar orbit—silent, untracked for decades, until Apollo 12’s stage popped back near Earth in 2002 as mystery object J002E3!',
    motionEnvironment: 'solar-orbit',
    motionCaption: 'Tumbling slowly in deep solar orbit, silent since finishing its Moon-bound rocket burn.',
    defaultCameraPos: [4.2, 2.0, 4.6],
    parts: [
      {
        id: 'sivb-tank',
        name: 'Liquid Hydrogen Tank Hull',
        role: '17.8-Meter Cryogenic Booster',
        howItWorked:
          'This massive white cylinder with bold black roll-stripes held super-cold liquid hydrogen and oxygen. After boosting astronauts to the Moon, it vented remaining pressure and became a drifting hollow shell.',
        funFact: 'Even empty, an S-IVB stage is nearly as long as a city bus and weighs over 13 metric tons!',
        explodeOffset: [0, 0, 0],
        cameraOffset: [3.2, 1.2, 3.4],
      },
      {
        id: 'sivb-iu',
        name: 'Instrument Unit Guidance Ring',
        role: 'Saturn V Computer Brain Collar',
        howItWorked:
          'Mounted right at the nose of the S-IVB, this metal ring housed gyroscopes and computers that steered the entire 110-meter Saturn V rocket until its batteries died.',
        funFact: 'In 2002, when astronomers spotted mystery object "J002E3," paint on its hull matched the titanium-white paint of Apollo 12’s S-IVB!',
        explodeOffset: [0, 1.35, 0],
        cameraOffset: [2.6, 2.2, 2.8],
      },
      {
        id: 'sivb-j2',
        name: 'J-2 Restartable Rocket Engine',
        role: 'Trans-Lunar Injection Engine',
        howItWorked:
          'Unlike ordinary rocket engines that only fire once, the J-2 could shut down in Earth orbit and reignite in zero gravity to hurl Apollo crews toward the Moon at 39,000 km/h!',
        funFact: 'Starting with Apollo 13, NASA aimed later S-IVB stages at the Moon instead of solar orbit so moonquake sensors could study impacts!',
        explodeOffset: [0, -1.35, 0],
        cameraOffset: [2.8, -1.0, 3.2],
      },
      {
        id: 'sivb-aps',
        name: 'Auxiliary Roll Thruster Pods',
        role: 'Spin & Separation Jets',
        howItWorked:
          'Two small side pods kept the giant stage steady during firing and then gently pushed it onto a safe slingshot path past the Moon so it wouldn’t bump the astronauts.',
        funFact: 'Slingshotting past the Moon sent Apollo 8, 10, 11, and 12’s S-IVB stages into long, wandering orbits around the Sun.',
        explodeOffset: [1.1, -0.4, 0],
        cameraOffset: [3.0, -0.4, 2.8],
      },
    ],
    timeline: [
      {
        date: 'December 21, 1968',
        year: 1968,
        title: 'Apollo 8 S-IVB Enters Solar Orbit',
        description: 'The first Moon-bound S-IVB pushes Apollo 8 astronauts to lunar orbit and swings past the Moon into solar orbit.',
      },
      {
        date: 'November 14, 1969',
        year: 1969,
        title: 'Apollo 12 S-IVB Slingshots Away',
        description: 'After sending Apollo 12 toward the Moon, its spent S-IVB stage slips past lunar gravity and disappears from tracking.',
      },
      {
        date: 'September 3, 2002',
        year: 2002,
        title: 'Mystery Object J002E3 Appears!',
        description: 'Amateur astronomer Bill Yeung spots an unknown visitor looping around Earth—which spectrum tests reveal is coated in Saturn V white paint!',
      },
      {
        date: 'June 2003',
        year: 2003,
        title: 'Back Out to the Sun Until ~2040s',
        description: 'Earth’s gravity flings the Apollo 12 S-IVB back out into solar orbit, where its silent path continues today.',
      },
    ],
    story: {
      title: 'The Wandering Giant Rocket Boosters',
      frontlineCallsign: 'Saturn V S-IVB',
      chapters: [
        {
          chapterTitle: 'Chapter 1: Twice-Fired Thunder',
          setting: 'Earth Parking Orbit, 1969',
          text: 'Most rocket stages fire once and fall straight into the ocean. Not the S-IVB! It paused high above Earth, waited for the exact second, then roared back to life to hurl Apollo astronauts all the way toward the Moon.',
          kidTakeaway: 'Restarting a rocket engine in space lets astronauts aim precisely at another world.',
        },
        {
          chapterTitle: 'Chapter 2: Lost in the Solar Drift',
          setting: 'Deep Space Past the Moon',
          text: 'After the astronauts pulled away, the empty S-IVB drifted past the Moon like a quiet white whale. Its radio batteries drained in hours, leaving only Newton’s laws of gravity to guide it along huge looping paths around the Sun.',
          kidTakeaway: 'Without fuel or radio, a spent rocket becomes a silent artificial asteroid.',
        },
        {
          chapterTitle: 'Chapter 3: The 2002 Return Surprise',
          setting: 'Sky Survey Telescopes, 2002',
          text: 'Thirty-three years later, astronomers thought they had found a brand-new mini-moon visiting Earth! Then light reflected off its surface matched titanium-white rocket paint—it was Apollo 12’s lost S-IVB saying a silent hello before drifting back into solar orbit!',
          kidTakeaway: 'Every spacecraft leaves a trail of physics—even decades later, math and light reveal who it is.',
        },
      ],
    },
  },

  // =========================================================================
  // 7. REARGUARD
  // =========================================================================
  {
    id: 'venera-13',
    name: 'Venera 13 (Soviet Union)',
    shortName: 'Venera 13',
    categoryId: 'rearguard',
    isFeaturedRequired: true,
    launchYear: 1981,
    launchDate: 'October 30, 1981',
    activeSpan: '127 minutes on Venus surface (4× its 32-min design goal)',
    destination: 'Phoebe Regio, Venus Surface',
    statusLabel: 'Held Out 127 Minutes in 457°C Crushing Heat & 89-Bar Pressure',
    tagline: 'Built to survive 32 minutes in Venus’s oven—yet kept beaming color photos for 127 minutes!',
    kidOverview:
      'Venus is like standing inside a self-cleaning pizza oven at the bottom of the ocean—457°C heat and crushing air pressure 89 times heavier than Earth’s! Soviet engineers built Venera 13 like a rugged titanium diving bell expecting it to last only 32 minutes. Instead, it drilled rock, snapped the first-ever color photos of Venus, and held the line for a heroic 127 minutes!',
    motionEnvironment: 'venus-surface',
    motionCaption: 'Holding firm on scorched Venusian basalt beneath thick amber sulfuric clouds while drilling soil.',
    defaultCameraPos: [3.8, 2.0, 4.2],
    parts: [
      {
        id: 'venera-hull',
        name: 'Titanium Pressure Hull & Quartz Eyes',
        role: '457°C Oven Armor',
        howItWorked:
          'A thick, hollow titanium sphere pre-chilled before landing kept delicate cameras and transmitters cool inside, while quartz-crystal windows peered out through periscopes to capture the first color panoramas of Venus.',
        funFact: 'Venera 13’s cameras revealed an eerie, glowing orange-amber world made of flat dark volcanic rocks!',
        explodeOffset: [0, 0.25, 0],
        cameraOffset: [2.6, 1.4, 2.8],
      },
      {
        id: 'venera-braking-ring',
        name: 'Serrated Aerodynamic Braking Disc',
        role: 'Parachute-Free Air Brake',
        howItWorked:
          'Venus’s sky is so thick near the ground that a parachute would melt and slow the craft too much! Venera 13 folded away its parachute high up and rode down the final 50 km using this notched metal saucer like a giant badminton shuttlecock.',
        funFact: 'The serrated teeth kept the lander from wobbling wildly as it dropped through the dense air!',
        explodeOffset: [0, 1.15, 0],
        cameraOffset: [2.5, 2.2, 2.6],
      },
      {
        id: 'venera-landing-ring',
        name: 'Scalloped Crush-Ring Base',
        role: 'Shock-Absorbing Footpad',
        howItWorked:
          'Instead of spindly legs that could snap on jagged lava rocks, Venera 13 landed on a hollow, dimpled metal donut built to crumple gently and absorb the impact across any uneven rock slab.',
        funFact: 'After touchdown, its microphone even recorded the eerie hiss of Venusian wind and the crunch of its own drill!',
        explodeOffset: [0, -1.0, 0],
        cameraOffset: [2.6, -0.5, 2.8],
      },
      {
        id: 'venera-drill',
        name: 'Rock Drill & Color Bar',
        role: 'First Venus Soil Sampler',
        howItWorked:
          'Its extendable arm drilled into rock-hard basalt, sucked dusty rock grains inside a cooled chamber, and tested their chemistry—while a painted color bar sat nearby so Earth scientists could see Venus’s true colors.',
        funFact: 'Even though the painted bar looked orange in Venus’s thick amber light, computer math revealed the rocks were really dark gray basalt!',
        explodeOffset: [1.1, -0.25, 0.55],
        cameraOffset: [3.2, 0.8, 3.0],
      },
    ],
    timeline: [
      {
        date: 'October 30, 1981',
        year: 1981,
        title: 'Launch Toward Venus',
        description: 'Soviet Venera 13 blasts off aboard a Proton rocket on a four-month cruise toward Earth’s hot twin.',
      },
      {
        date: 'March 1, 1982',
        year: 1982,
        title: 'Plunge Through Sulfuric Clouds',
        description: 'Releases its parachute at 47 km altitude and glides safely down on its serrated metal braking disc.',
      },
      {
        date: 'March 1, 1982 (+127 min)',
        year: 1982,
        title: 'Four Times Longer Than Expected!',
        description: 'Designed for 32 minutes, Venera 13 transmits color panoramas, rock chemistry, and surface sounds for 2 hours and 7 minutes before the oven heat overwhelms its radio.',
      },
    ],
    story: {
      title: '127 Minutes in a Volcanic Oven',
      frontlineCallsign: 'Venera 13 · Rearguard Station',
      chapters: [
        {
          chapterTitle: 'Chapter 1: Into the Amber Pressure Cooker',
          setting: 'Venus Upper Clouds, March 1, 1982',
          text: 'Dropping through thick clouds of sulfuric acid, Venera 13 knew a terrible truth: nothing could survive forever on Venus’s floor. Temperatures there melt lead, and the air presses down like a deep ocean trench.',
          kidTakeaway: 'Pre-chilling a thick titanium sphere buys precious extra minutes before extreme heat leaks inside.',
        },
        {
          chapterTitle: 'Chapter 2: Snapshot of an Alien World',
          setting: 'Phoebe Regio, Surface of Venus',
          text: 'Thump! Venera 13’s crush-ring kissed dark basalt rock. Right away, its camera lens caps popped off, its drill bit buzzed into stone, and the very first full-color photos of Venus’s rocky floor beamed 65 million km back to Earth!',
          kidTakeaway: 'When you only have minutes to work, automated choreography captures science fast.',
        },
        {
          chapterTitle: 'Chapter 3: Holding the Line Past Midnight',
          setting: 'T+127 Minutes on Surface',
          text: 'The 32-minute clock came and went—yet Venera 13 kept singing! Forty minutes, sixty minutes, ninety minutes, 127 whole minutes of precious data poured home before 457°C heat finally silenced its circuits.',
          kidTakeaway: 'Tough, careful engineering lets explorers outlast the harshest worlds long past expectations.',
        },
      ],
    },
  },
  {
    id: 'insight',
    name: 'Mars InSight (NASA)',
    shortName: 'InSight',
    categoryId: 'rearguard',
    isFeaturedRequired: true,
    launchYear: 2018,
    launchDate: 'May 5, 2018',
    activeSpan: '4+ Earth years listening on Mars (Nov 2018 – Dec 2022)',
    destination: 'Elysium Planitia, Mars',
    statusLabel: 'Mission Ended Dec 2022 · Dust Buried Solar Arrays',
    tagline: 'Kept listening for deep marsquakes for months while Martian dust slowly buried its solar wings',
    kidOverview:
      'Instead of driving around like a rover, NASA’s InSight was a robotic doctor checking Mars’s heartbeat! Sitting still in Elysium Planitia, it set a super-sensitive stethoscope right onto the red dirt and listened to over 1,300 marsquakes—even as sticky Martian dust piled thicker and thicker on its solar wings until December 2022.',
    motionEnvironment: 'mars-surface',
    motionCaption: 'Standing vigil on dusty Elysium Planitia while listening for deep seismic marsquakes.',
    defaultCameraPos: [3.8, 2.2, 4.2],
    parts: [
      {
        id: 'insight-deck',
        name: 'Octagonal Deck & Tripod Legs',
        role: 'Stationary Seismic Base',
        howItWorked:
          'Unlike rovers with wheels, InSight planted three sturdy shock-absorbing legs into the dirt so no rolling motors would shake its delicate earthquake sensors.',
        funFact: 'Every bump of wind or temperature creak had to be measured so engineers wouldn’t mistake it for a marsquake!',
        explodeOffset: [0, 0, 0],
        cameraOffset: [2.8, 1.5, 3.0],
      },
      {
        id: 'insight-solar',
        name: 'Twin Fan-Shaped Solar Arrays',
        role: 'Dust-Challenged Power Wings',
        howItWorked:
          'Two wide, umbrella-like solar circles unfolded on landing day to soak up sunlight. Over four years, fine red dust settled across them like snow, slowly shrinking power until only the seismometer could stay awake.',
        funFact: 'Engineers even used InSight’s scoop arm to trickle sand beside the panels—creating tiny wind gusts that blew a little dust away and bought extra weeks of science!',
        explodeOffset: [1.3, 0.25, 0],
        cameraOffset: [3.4, 2.0, 2.8],
      },
      {
        id: 'insight-seis',
        name: 'SEIS Dome Seismometer & Tether',
        role: 'Mars Heartbeat Listener',
        howItWorked:
          'Placed gently onto the ground in front of the lander and covered by a white wind-and-heat dome, SEIS detected vibrations smaller than the width of a single hydrogen atom—revealing Mars’s liquid core and crust layers!',
        funFact: 'SEIS recorded over 1,319 marsquakes, including shockwaves from brand-new meteor impacts!',
        explodeOffset: [0, -0.3, 1.2],
        cameraOffset: [2.2, 0.6, 3.4],
      },
      {
        id: 'insight-arm',
        name: 'Robotic Grapple Arm',
        role: 'Instrument Placer & Dust Trickster',
        howItWorked:
          'InSight became the first spacecraft ever to use a robotic arm to pick science gear off its own back and set it carefully directly onto another planet’s soil.',
        funFact: 'InSight’s arm stayed on duty even near the end, scooping dust to help clean its own solar wings!',
        explodeOffset: [-0.95, 0.9, 0.45],
        cameraOffset: [-2.4, 2.0, 2.8],
      },
    ],
    timeline: [
      {
        date: 'November 26, 2018',
        year: 2018,
        title: 'Touchdown on Elysium Planitia',
        description: 'InSight lands softly on Mars and unfolds its two round decagonal solar wings.',
      },
      {
        date: 'December 19, 2018',
        year: 2018,
        title: 'SEIS Placed Directly on Mars Soil',
        description: 'Robotic arm sets the copper-and-white seismometer onto the Martian dirt to hear underground quakes.',
      },
      {
        date: '2021–2022',
        year: 2022,
        title: 'Listening Through Gathering Dust',
        description: 'Dust storms dim power down to a trickle, yet teams turn off heaters and cameras so SEIS can keep recording giant quakes.',
      },
      {
        date: 'December 21, 2022',
        year: 2022,
        title: 'Final Quiet Sign-Off',
        description: 'After two missed radio check-ins and a farewell selfie ("My power’s really low"), NASA officially concludes the mission.',
      },
    ],
    story: {
      title: 'The Quiet Listener Under Gathering Dust',
      frontlineCallsign: 'InSight · Elysium Vigil',
      chapters: [
        {
          chapterTitle: 'Chapter 1: Listening to a Planet’s Pulse',
          setting: 'Elysium Planitia, 2019',
          text: 'For centuries, humans wondered what lay beneath Mars’s rusty skin. InSight set its dome stethoscope straight onto the dirt—and heard a faint rumble! Mars wasn’t dead inside; it shook with real marsquakes.',
          kidTakeaway: 'Seismic waves bounce off deep underground layers like sonar, revealing a planet’s hidden core.',
        },
        {
          chapterTitle: 'Chapter 2: Fighting Dust With Clever Tricks',
          setting: 'Martian Winter, 2021–2022',
          text: 'Month by month, reddish dust blanketed InSight’s solar fans until power plunged from 5,000 watt-hours to barely enough for a lightbulb. Instead of giving up, engineers shut down everything else so SEIS could keep listening!',
          kidTakeaway: 'When power dwindles, sacrificing non-essential gear lets the main science mission hold out longer.',
        },
        {
          chapterTitle: 'Chapter 3: The Last Farewell Transmission',
          setting: 'December 2022',
          text: 'After spotting a massive magnitude-5 marsquake and meteor impacts, dust finally covered the wings completely. InSight beamed one last dusty sunset photo home—"Don’t worry about me"—and held its post until silence.',
          kidTakeaway: 'InSight measured Mars’s crust, mantle, and core for the very first time in history.',
        },
      ],
    },
  },
  {
    id: 'philae',
    name: 'Philae (ESA/DLR)',
    shortName: 'Philae',
    categoryId: 'rearguard',
    isFeaturedRequired: true,
    launchYear: 2004,
    launchDate: 'March 2, 2004 (Rosetta) · Landed Nov 12, 2014',
    activeSpan: '60 hours on battery + brief 2015 sunlit wake-ups',
    destination: 'Comet 67P / Churyumov-Gerasimenko',
    statusLabel: 'Asleep in Comet Cliff Shadow · Spotted by Rosetta in 2016',
    tagline: 'Bounced into a freezing comet cliff shadow—yet ran 60 hours on battery and woke briefly in 2015!',
    kidOverview:
      'Landing on a giant rubber-duck-shaped comet racing through space was one of the hardest tricks ever attempted! When Philae’s harpoons failed to fire on Comet 67P, it bounced twice and settled wedged beside a dark rocky cliff. Starved of sunlight, Philae fought through its 60-hour battery life—and even surprised Earth by waking up briefly in 2015 when the comet neared the Sun!',
    motionEnvironment: 'comet-surface',
    motionCaption: 'Braced in deep cliff shadow on Comet 67P as faint icy plumes drift past into starry space.',
    defaultCameraPos: [3.8, 2.0, 4.2],
    parts: [
      {
        id: 'philae-body',
        name: 'Solar-Covered Carbon Body',
        role: 'Shadow-Starved Power Box',
        howItWorked:
          'Almost every outer wall of Philae was wrapped in dark solar cells meant to recharge it for months—but wedged under a tall cliff, it received only about 1.5 hours of weak sunlight per comet day instead of 6+ hours.',
        funFact: 'Comet 67P’s icy dust was actually darker than charcoal, making solar reflection super dim!',
        explodeOffset: [0, 0.25, 0],
        cameraOffset: [2.6, 1.4, 2.8],
      },
      {
        id: 'philae-legs',
        name: '3 Tripod Legs & Ice Screws',
        role: 'Low-Gravity Anchor Feet',
        howItWorked:
          'Gravity on Comet 67P is 100,000 times weaker than Earth’s—so a gentle touch makes you bounce! Philae’s three folding spider legs carried ice screws at their toes to grip the snowy crust.',
        funFact: 'Philae actually bounced a full kilometer high off the comet before finally coming to rest at Abydos!',
        explodeOffset: [0, -1.05, 0],
        cameraOffset: [2.8, -0.5, 3.0],
      },
      {
        id: 'philae-instruments',
        name: 'CONSERT Radar & Magnetometer Boom',
        role: 'Comet X-Ray & Organic Sniffers',
        howItWorked:
          'Even wedged sideways, Philae fired radar waves straight through the comet’s heart to orbiter Rosetta, sniffed carbon molecules for life’s building blocks, and hammered to test the rock-hard ice.',
        funFact: 'Philae discovered organic carbon molecules and water vapor on the comet within hours of touchdown!',
        explodeOffset: [-1.0, 0.75, -0.4],
        cameraOffset: [-2.6, 1.8, 2.8],
      },
      {
        id: 'philae-battery',
        name: '60-Hour Primary Battery Core',
        role: 'Emergency Science Reserve',
        howItWorked:
          'Engineers packed an un-rechargeable 60-hour primary battery inside an insulated warm vault so even if solar panels never saw sun, Philae could still rush through all its core experiments before freezing.',
        funFact: 'Just 7 months later in June 2015, sunshine warmed Philae enough to whisper "Hello Earth, I’m awake!" before going silent forever.',
        explodeOffset: [0.95, 0.25, 0.55],
        cameraOffset: [2.6, 1.2, 2.6],
      },
    ],
    timeline: [
      {
        date: 'March 2, 2004',
        year: 2004,
        title: 'Launch Aboard Rosetta',
        description: 'Philae rides piggyback on ESA’s Rosetta orbiter on a 10-year looping chase after Comet 67P.',
      },
      {
        date: 'November 12, 2014',
        year: 2014,
        title: 'First Ever Comet Landing & Bounce',
        description: 'Touches down, bounces twice across the comet, and settles tucked inside dark rocky cliffs at Abydos.',
      },
      {
        date: 'November 15, 2014',
        year: 2014,
        title: '60 Hours of Heroic Science Complete',
        description: 'Beams home panoramas, organic chemistry, and radar scans right before its primary battery drains to zero.',
      },
      {
        date: 'June – July 2015',
        year: 2015,
        title: 'Surprise Summer Wake-Up!',
        description: 'As Comet 67P swoops closer to the Sun, warmth wakes Philae briefly for 8 faint check-ins before eternal hibernation.',
      },
    ],
    story: {
      title: 'Hold Fast in the Comet’s Shadow',
      frontlineCallsign: 'Philae · Abydos Outpost',
      chapters: [
        {
          chapterTitle: 'Chapter 1: Two Giant Bounces',
          setting: 'Comet 67P, November 12, 2014',
          text: 'Imagine jumping off a trampoline on a tiny iceberg with almost no gravity! When Philae’s harpoons didn’t anchor it down, the brave lander bounced high into starry blackness—for two whole hours—before settling wedged sideways beside tall rocky cliffs.',
          kidTakeaway: 'On tiny comets, gravity is so weak that a tiny bounce sends a spacecraft flying like a feather.',
        },
        {
          chapterTitle: 'Chapter 2: Racing the 60-Hour Clock',
          setting: 'Deep Cliff Shadow at Abydos',
          text: 'Surrounding rock walls blocked almost all sunlight, turning Philae’s home into an ice-cold cave at -160°C. Knowing its primary battery had just 60 hours left, Philae skipped sleep, photographed the cliffs, sniffed organic molecules, and sent every byte upward to Rosetta!',
          kidTakeaway: 'Backup battery power lets a lander finish vital discoveries even when landing goes sideways.',
        },
        {
          chapterTitle: 'Chapter 3: A Brief Summer Hello',
          setting: 'Near Perihelion, June 2015',
          text: 'Seven months later, as Comet 67P swung close to the Sun, one stray sunbeam warmed Philae’s solar walls! For a few thrilling days in 2015, Philae woke up and pinged Rosetta before the comet raced back out into deep, cold night.',
          kidTakeaway: 'Even in deep shadow, a smart sleep-and-wake system can give a silent craft one last voice.',
        },
      ],
    },
  },
  {
    id: 'phoenix',
    name: 'Phoenix Mars Lander (NASA)',
    shortName: 'Phoenix',
    categoryId: 'rearguard',
    isFeaturedRequired: true,
    launchYear: 2007,
    launchDate: 'August 4, 2007',
    activeSpan: '5 months in Mars north polar summer (May – Nov 2008)',
    destination: 'Vastitas Borealis (Mars Arctic)',
    statusLabel: 'Outlasted Polar Summer · Overwhelmed by Polar Winter Frost (Nov 2008)',
    tagline: 'Scooped real Martian water ice and kept reporting until polar winter sunlight vanished in late 2008',
    kidOverview:
      'NASA sent Phoenix to the frozen arctic plains of Mars—closer to a planet’s north pole than any lander had ever gone! Phoenix dug trenches right into buried water ice and even watched snow fall from Martian clouds, holding its ground until the polar Sun sank below the horizon and winter darkness froze it solid in November 2008.',
    motionEnvironment: 'mars-polar',
    motionCaption: 'Standing watch on frosty Martian polar permafrost as pale twilight shadows lengthen.',
    defaultCameraPos: [3.8, 2.2, 4.2],
    parts: [
      {
        id: 'phoenix-deck',
        name: 'Gold-Shielded Deck & Tripod Legs',
        role: 'Arctic Ice Base',
        howItWorked:
          'Built partly from spare spacecraft hardware—rising from the ashes like the mythical Phoenix!—this insulated deck sheltered miniature chemistry ovens from sub-zero Martian polar nights.',
        funFact: 'Phoenix’s descent thruster exhaust actually blew away thin dirt right underneath it, uncovering a sheet of bright white ice under its own legs!',
        explodeOffset: [0, 0, 0],
        cameraOffset: [2.8, 1.5, 3.0],
      },
      {
        id: 'phoenix-solar',
        name: 'Twin Octagonal Solar Arrays',
        role: 'Polar Sunlight Collectors',
        howItWorked:
          'Designed to run during 24-hour polar daylight, these blue solar fans powered Phoenix for 152 Martian days—until late-2008 winter brought dust clouds and long freezing nights that starved the batteries.',
        funFact: 'Phoenix’s solar arrays lasted more than two months longer than its original 90-day mission plan!',
        explodeOffset: [1.3, 0.25, 0],
        cameraOffset: [3.4, 2.0, 2.8],
      },
      {
        id: 'phoenix-arm',
        name: '2.3-Meter Digging Arm & TEGA Ovens',
        role: 'Ice Excavator & Taste Tester',
        howItWorked:
          'A tough silver robot arm with a serrated scoop scraped through rock-hard icy permafrost and dropped chunks into tiny ovens that baked them—proving for the first time by direct touch that frozen water ice sits right beneath Martian soil!',
        funFact: 'When Phoenix exposed pale white chunks in a trench named "Dodo-Goldilocks," they vanished in four days—sublimating straight from solid ice into vapor!',
        explodeOffset: [0.95, 0.55, 0.85],
        cameraOffset: [3.0, 1.4, 3.2],
      },
      {
        id: 'phoenix-met',
        name: 'Weather Mast & Green Laser LIDAR',
        role: 'Polar Snow & Wind Watcher',
        howItWorked:
          'Rising above the deck, Canada’s weather station measured freezing temperatures, pressure, and spinning telltale winds—while a green laser shot beams straight into Martian clouds and spotted real snow falling!',
        funFact: 'Phoenix detected snowflakes drifting down from clouds 4 kilometers above Mars before evaporating in midair!',
        explodeOffset: [-0.85, 1.05, -0.45],
        cameraOffset: [-2.6, 2.2, 2.8],
      },
    ],
    timeline: [
      {
        date: 'August 4, 2007',
        year: 2007,
        title: 'Launch to Mars’s Frozen North',
        description: 'Delta II rocket sends Phoenix on a direct polar cruise toward Vastitas Borealis.',
      },
      {
        date: 'May 25, 2008',
        year: 2008,
        title: 'Arctic Touchdown on Polygons',
        description: 'Lands on patterned permafrost ground where buried ice waits just centimeters beneath dusty soil.',
      },
      {
        date: 'June – July 2008',
        year: 2008,
        title: 'Real Water Ice Discovered by Touch!',
        description: 'Phoenix’s scoop digs into bright white permafrost and its TEGA lab confirms pure frozen Martian water.',
      },
      {
        date: 'November 2, 2008',
        year: 2008,
        title: 'Final Signal Before Polar Winter',
        description: 'With the Sun fading and dry-ice frost burying the lander under -120°C polar night, Phoenix transmits its last ping.',
      },
    ],
    story: {
      title: 'Outlasting the Martian Arctic Night',
      frontlineCallsign: 'Phoenix · North Polar Watch',
      chapters: [
        {
          chapterTitle: 'Chapter 1: Treasure Beneath the Frost Cracks',
          setting: 'Vastitas Borealis, May 2008',
          text: 'Phoenix landed in a strange world of giant cracked dirt polygons—just like Earth’s frozen Arctic tundra! When its cameras peeked underneath the lander, everyone gasped: thruster blasts had uncovered shiny white bedrock made of pure ice!',
          kidTakeaway: 'Cracked polygon patterns on the ground are clues that frozen ice expands and shrinks underground.',
        },
        {
          chapterTitle: 'Chapter 2: Snowfall on Mars',
          setting: 'Late Polar Summer, 2008',
          text: 'As Phoenix baked icy soil inside tiny ovens and tasted snow clouds with its green laser beam, days grew shorter and colder. Dust storms dimmed the Sun while Phoenix raced to save every weather measurement.',
          kidTakeaway: 'Phoenix proved Mars has real water ice, snow clouds, and soil minerals near its north pole.',
        },
        {
          chapterTitle: 'Chapter 3: Standing Watch Until Dark',
          setting: 'November 2008',
          text: 'Finally, polar winter closed in. Carbon-dioxide dry ice froze straight out of the sky onto Phoenix’s solar wings. Holding out to its last milliamp of power, Phoenix sent its final whisper on November 2 before sleeping forever under winter ice.',
          kidTakeaway: 'Solar explorers at high latitudes trade long summer sunlight for deep winter darkness.',
        },
      ],
    },
  },

  // =========================================================================
  // 8. SAFE AT HOME
  // =========================================================================
  {
    id: 'apollo-11-cm',
    name: 'Apollo 11 Command Module "Columbia"',
    shortName: 'Apollo 11 CM',
    categoryId: 'safe-at-home',
    isFeaturedRequired: true,
    launchYear: 1969,
    launchDate: 'July 16, 1969',
    activeSpan: '8 days, 3 hours in space (Earth–Moon–Earth)',
    destination: 'Moon Orbit & Pacific Ocean Splashdown',
    statusLabel: 'Safely Returned · Preserved at Smithsonian Museum',
    tagline: 'The only part of the giant Saturn V moon rocket that brought the astronauts safely home',
    kidOverview:
      'While Neil Armstrong and Buzz Aldrin walked on the Moon, Michael Collins piloted Command Module "Columbia" overhead. Built like a tough silver-and-white cone, Columbia was the only piece of the 110-meter Saturn V rocket built to survive the 2,700°C fireball back into Earth’s sky!',
    motionEnvironment: 'reentry-splashdown',
    motionCaption: 'Blazing safely through Earth’s upper atmosphere behind its ablative heat shield before splashdown.',
    defaultCameraPos: [3.8, 2.2, 4.2],
    parts: [
      {
        id: 'heat-shield-base',
        name: 'Ablative Honeycomb Heat Shield',
        role: '2,700°C Fireball Blocker',
        howItWorked:
          'When Columbia returned from the Moon at 40,000 km/h, air in front compressed hotter than the surface of lava! This curved fiberglass honeycomb shield slowly charred and flaked away on purpose ("ablation"), carrying the fiery heat away from the astronauts!',
        funFact: 'Even though the outside burned at 2,700°C, the astronauts inside stayed at a comfortable 21°C!',
        explodeOffset: [0, -1.2, 0],
        cameraOffset: [2.8, -0.4, 3.0],
      },
      {
        id: 'crew-cabin',
        name: 'Conical Crew Cabin',
        role: 'Astronaut Home & Cockpit',
        howItWorked:
          'Inside this double-walled aluminum and steel cone sat three couches, 566 switches, and the Apollo Guidance Computer. It gave Armstrong, Aldrin, and Collins air, water, food, and shelter for 8 days.',
        funFact: 'The cabin had about as much room inside as the front and back seats of a family car!',
        explodeOffset: [0, 0, 0],
        cameraOffset: [2.8, 1.6, 3.2],
      },
      {
        id: 'hatch-windows',
        name: 'Crew Hatch & Thick Quartz Windows',
        role: 'Exit Door & Star Views',
        howItWorked:
          'Five triple-pane heat-resistant glass windows let astronauts navigate by the stars and watch Earth shrink to the size of a marble. The heavy side hatch opened only after splashing down safely in the ocean!',
        funFact: 'During re-entry, astronauts watched glowing orange-pink plasma dance right outside these thick windows!',
        explodeOffset: [1.1, 0.2, 0.9],
        cameraOffset: [2.8, 1.5, 2.8],
      },
      {
        id: 'docking-tunnel',
        name: 'Nose Docking Tunnel & Parachute Bay',
        role: 'Moonship Door & Safe Landing',
        howItWorked:
          'At the pointy tip sat the tunnel that connected Columbia to the Lunar Lander "Eagle." When returning to Earth, this top cone popped off to release three giant orange-and-white parachutes for a soft ocean splashdown!',
        funFact: 'Columbia splashed down in the Pacific Ocean just 24 kilometers from the rescue aircraft carrier!',
        explodeOffset: [0, 1.35, 0],
        cameraOffset: [2.2, 2.6, 2.4],
      },
    ],
    timeline: [
      {
        date: 'July 16, 1969',
        year: 1969,
        title: 'Saturn V Launch',
        description: 'Columbia sits atop the tallest rocket ever flown at the time, blasting off toward the Moon.',
      },
      {
        date: 'July 20, 1969',
        year: 1969,
        title: 'Guarding Lunar Orbit',
        description: 'Michael Collins keeps Columbia orbiting the Moon while Eagle lands Armstrong and Aldrin below.',
      },
      {
        date: 'July 21, 1969',
        year: 1969,
        title: 'Re-Docking With Moon Rocks',
        description: 'Eagle lifts off from the Moon and docks smoothly back onto Columbia’s nose tunnel with 21 kg of moon rocks.',
      },
      {
        date: 'July 24, 1969',
        year: 1969,
        title: 'Pacific Splashdown—Safe at Home!',
        description: 'Survives blazing atmospheric entry, pops three giant parachutes, and splashes safely into the ocean.',
      },
    ],
    story: {
      title: 'Blazing Through the Sky to Home',
      frontlineCallsign: 'Columbia · Return Capsule 107',
      chapters: [
        {
          chapterTitle: 'Chapter 1: One Little Cone From a Giant Rocket',
          setting: 'Leaving Lunar Orbit, July 1969',
          text: 'When Apollo 11 launched, it stood taller than a 36-story building. By the time the astronauts raced back toward Earth, only tiny cone-shaped Columbia remained—carrying three heroes and a precious box of Moon rocks.',
          kidTakeaway: 'Rockets drop empty fuel stages along the way so only the lightest, strongest capsule returns home.',
        },
        {
          chapterTitle: 'Chapter 2: Riding a Comet of Fire',
          setting: '120 km Above the Pacific Ocean',
          text: 'Columbia hit Earth’s air at 40,000 kilometers per hour—so fast that the air itself turned into glowing plasma! Outside the windows, orange fire roared around the curved heat shield. Inside, the honeycomb shield burned away layer by layer so the cabin stayed cool and calm.',
          kidTakeaway: 'Air friction slows a returning spacecraft down without needing heavy braking rockets.',
        },
        {
          chapterTitle: 'Chapter 3: Three Orange Blossoms Over Blue Water',
          setting: 'Pacific Ocean Splashdown',
          text: 'POP! Three huge striped parachutes blossomed overhead, slowing Columbia down to a gentle drift. With a giant splash, the Cosmic Frontlines’ greatest voyage came safely home!',
          kidTakeaway: 'Every great space adventure isn’t finished until the explorers are safely back home.',
        },
      ],
    },
  },
  {
    id: 'osiris-rex-capsule',
    name: 'OSIRIS-REx Sample Capsule',
    shortName: 'OSIRIS-REx SRC',
    categoryId: 'safe-at-home',
    isFeaturedRequired: false,
    launchYear: 2016,
    launchDate: 'September 8, 2016',
    activeSpan: '7-year round-trip · Landed Sept 24, 2023',
    destination: 'Asteroid Bennu to Utah Desert',
    statusLabel: 'Safely Returned · Delivered 121.6g of Asteroid Bennu',
    tagline: 'A tiny treasure-chest capsule that survived re-entry to bring asteroid dust to Earth!',
    kidOverview:
      'OSIRIS-REx flew to asteroid Bennu, scooped up ancient rubble from the birth of our solar system, and tossed this sleek saucer-shaped capsule toward Earth! It dove through our sky at 44,500 km/h and landed gently by parachute in Utah.',
    motionEnvironment: 'reentry-splashdown',
    motionCaption: 'Diving through Earth’s sky behind its glowing heat shield to deliver ancient asteroid treasure.',
    defaultCameraPos: [3.6, 2.0, 4.0],
    parts: [
      {
        id: 'pica-shield',
        name: 'PICA Carbon Heat Shield',
        role: 'Ultra-Hot Entry Armor',
        howItWorked:
          'Made of lightweight phenolic-impregnated carbon ablator ("PICA"), this dark curved saucer took the brunt of 2,900°C heat—hotter than lava—as the capsule plunged back into Earth’s atmosphere.',
        funFact: 'It hit Earth’s atmosphere even faster than Apollo 11—zooming at 36 times the speed of sound!',
        explodeOffset: [0, -1.1, 0],
        cameraOffset: [2.6, -0.3, 2.8],
      },
      {
        id: 'backshell-lid',
        name: 'Protective Backshell Lid',
        role: 'Thermal & Dust Seal',
        howItWorked:
          'Shaped like a gentle cone on top of the heat shield, this aluminum-and-cork lid kept glowing hot air from sneaking around the edges while the capsule slowed down.',
        funFact: 'Special sensors measured the exact altitude so the parachute wouldn’t open too early in the fire!',
        explodeOffset: [0, 1.1, 0],
        cameraOffset: [2.6, 2.2, 2.6],
      },
      {
        id: 'sample-canister',
        name: 'TAGSAM Asteroid Vault',
        role: '4.5-Billion-Year Treasure Box',
        howItWorked:
          'Tucked inside the center sat the airtight round collector head ("TAGSAM") holding 121.6 grams of jet-black dust and pebbles from asteroid Bennu—older than Earth itself!',
        funFact: 'Scientists had aimed to collect 60 grams, and OSIRIS-REx brought back more than double!',
        explodeOffset: [0, 0.25, 0],
        cameraOffset: [2.2, 1.4, 2.4],
      },
      {
        id: 'chute-pack',
        name: 'Drogue & Main Parachute Bay',
        role: 'Soft Desert Touchdown',
        howItWorked:
          'First a small drogue chute stabilized the spin at supersonic speed, then a bright orange-and-white main parachute opened 1.6 km above the desert so the capsule touched down softer than a skydiver!',
        funFact: 'Even while the main spacecraft zoomed away toward asteroid Apophis, this little capsule hit its desert target dead on!',
        explodeOffset: [0, 1.65, 0],
        cameraOffset: [2.4, 2.8, 2.4],
      },
    ],
    timeline: [
      {
        date: 'September 8, 2016',
        year: 2016,
        title: 'Launch to Asteroid Bennu',
        description: 'Blasts off from Cape Canaveral to chase a spinning diamond-shaped asteroid.',
      },
      {
        date: 'October 20, 2020',
        year: 2020,
        title: 'High-Five With an Asteroid!',
        description: 'Touches Bennu for 6 seconds with a nitrogen puff, scooping up way more pebbles than expected!',
      },
      {
        date: 'September 24, 2023',
        year: 2023,
        title: 'Utah Desert Touchdown',
        description: 'Releases the return capsule 100,000 km above Earth; lands safely by parachute 4 hours later.',
      },
      {
        date: '2024–Present',
        year: 2025,
        title: 'Unlocking Solar System Origins',
        description: 'Scientists worldwide study Bennu’s grains, finding carbon and water molecules from the dawn of planets.',
      },
    ],
    story: {
      title: 'The Little Treasure Chest From the Dawn of Time',
      frontlineCallsign: 'Return Capsule SRC · Desert Delivery',
      chapters: [
        {
          chapterTitle: 'Chapter 1: A Six-Second High-Five',
          setting: 'Asteroid Bennu, 320 Million km Away',
          text: 'Asteroid Bennu was like a giant loose ball pit floating in space—try to land hard and you’d sink right in! So the main ship gave Bennu a quick six-second high-five, blew a puff of nitrogen gas, and stuffed a treasure chest full of ancient stardust.',
          kidTakeaway: 'Small asteroids have gravity so weak you could jump off them with a single hop!',
        },
        {
          chapterTitle: 'Chapter 2: Passing the Baton',
          setting: '100,000 km Above Earth',
          text: 'When the mothership zoomed back past Earth, it gently popped open its latches and released the tiny saucer capsule toward home—then fired its thrusters to keep flying toward another asteroid named Apophis!',
          kidTakeaway: 'Sending a tiny capsule home lets the main spacecraft keep exploring new worlds!',
        },
        {
          chapterTitle: 'Chapter 3: Safe in the Utah Sand',
          setting: 'Utah Test and Training Range, 2023',
          text: 'After surviving 2,900°C fire, the little saucer popped its bright parachute and nestled gently onto the Utah desert floor—delivering 4.5-billion-year-old clues about how Earth got its oceans.',
          kidTakeaway: 'Bringing real cosmic samples back to Earth labs lets thousands of scientists study them for decades.',
        },
      ],
    },
  },
  // =========================================================================
  // NEW SPACECRAFT ADDITIONS (1 PER CATEGORY)
  // =========================================================================
  {
    id: 'vanguard-1',
    name: 'Vanguard 1',
    shortName: 'Vanguard 1',
    categoryId: 'trailblazers',
    isFeaturedRequired: false,
    launchYear: 1958,
    launchDate: 'March 17, 1958',
    activeSpan: '6 years transmitting · Still orbiting Earth today!',
    destination: 'High Elliptical Earth Orbit',
    statusLabel: 'In Orbit · Oldest Human-Made Object Still in Space',
    tagline: 'A grapefruit-sized pioneer that proved solar panels work in space—and is still orbiting!',
    kidOverview:
      'Vanguard 1 was the very first spacecraft powered by the Sun! Only 16 centimeters wide—about the size of a grapefruit—it taught scientists that Earth is slightly pear-shaped, and it is still circling our planet more than 68 years later.',
    motionEnvironment: 'earth-orbit',
    motionCaption: 'Soaking up sunbeams on six tiny solar windows while circling high above Earth.',
    defaultCameraPos: [3.4, 1.9, 3.8],
    parts: [
      {
        id: 'grapefruit-hull',
        name: 'Grapefruit Aluminum Sphere',
        role: 'Lightweight Explorer Shell',
        howItWorked:
          'Weighing just 1.47 kilograms, this shiny aluminum ball held a tiny radio inside. Because it orbits so high where there is almost no air drag, Earth’s atmosphere hasn’t pulled it down yet!',
        funFact: 'Vanguard 1 will likely keep orbiting Earth for over 200 years!',
        explodeOffset: [0, 0, 0],
        cameraOffset: [2.4, 1.4, 2.8],
      },
      {
        id: 'solar-windows',
        name: '6 Solar Cell Windows',
        role: 'First Space Solar Power',
        howItWorked:
          'Six small square solar panels sat mounted around the metal ball. Whenever sunlight hit them, they made electricity to keep Vanguard 1’s radio singing for six whole years—long after regular batteries died!',
        funFact: 'Before Vanguard 1, many engineers worried solar cells would break instantly in space!',
        explodeOffset: [0, 0.9, 0.7],
        cameraOffset: [2.4, 1.8, 2.6],
      },
      {
        id: 'six-rod-antennas',
        name: '6 Spring-Out Rod Antennas',
        role: 'Gravity-Shape Tracker',
        howItWorked:
          'Six thin aluminum rods poked out around the sphere like spikes. Ground stations tracked their radio signal precisely enough to notice tiny orbital wobbles—proving Earth bulges slightly around the equator!',
        funFact: 'Tracking Vanguard 1 helped map Earth’s exact shape for the first time.',
        explodeOffset: [-1.0, 0.3, 0],
        cameraOffset: [-2.6, 1.4, 2.6],
      },
    ],
    timeline: [
      {
        date: 'March 17, 1958',
        year: 1958,
        title: 'First Solar Satellite Launch',
        description: 'A Vanguard rocket carries the tiny 1.5-kg sphere into a high orbit above Earth.',
      },
      {
        date: '1959',
        year: 1959,
        title: 'Earth’s Shape Discovered',
        description: 'Orbit measurements reveal Earth is slightly pear-shaped, wider near the equator.',
      },
      {
        date: 'May 1964',
        year: 1964,
        title: 'Last Solar Radio Whisper',
        description: 'After 6 amazing years of solar-powered broadcasting, the radio goes quiet.',
      },
      {
        date: 'Present Day',
        year: 2026,
        title: 'Still Sailing the Cosmic Frontlines',
        description: 'Remains the oldest human-made object still orbiting Earth high above the clouds.',
      },
    ],
    story: {
      title: 'The Little Sun-Powered Grapefruit',
      frontlineCallsign: 'Scout 03 · High Orbit Watch',
      chapters: [
        {
          chapterTitle: 'Chapter 1: Batteries Run Out, Sunlight Doesn’t',
          setting: 'High Above Earth, 1958',
          text: 'Sputnik 1 and Explorer 1 had one big problem: once their chemical batteries ran dry, they went silent forever. Vanguard 1 tried something brand new on the Cosmic Frontlines—catching sunlight with six tiny blue silicon windows!',
          kidTakeaway: 'Solar cells turn light directly into electricity so satellites can work for years instead of days.',
        },
        {
          chapterTitle: 'Chapter 2: Reading Gravity’s Bumps',
          setting: '650 to 3,960 km Altitude',
          text: 'As Vanguard 1 looped high and low, scientists tracked its speed carefully. Wait—why did its path wobble slightly? Because Earth isn’t a perfect smooth ball! Vanguard 1 measured the hidden gravity bumps of our own planet.',
          kidTakeaway: 'Watching how a satellite orbits teaches us secrets about the planet underneath.',
        },
        {
          chapterTitle: 'Chapter 3: The Timeless Veteran',
          setting: 'Still in Orbit Today',
          text: 'Every other early rocket and satellite from the 1950s fell back to Earth long ago. Only tiny Vanguard 1 still glides silently overhead—the oldest scout still flying on the Cosmic Frontlines!',
          kidTakeaway: 'High orbits above Earth’s air drag let satellites stay aloft for centuries.',
        },
      ],
    },
  },
  {
    id: 'pioneer-10',
    name: 'Pioneer 10',
    shortName: 'Pioneer 10',
    categoryId: 'record-makers',
    isFeaturedRequired: false,
    launchYear: 1972,
    launchDate: 'March 3, 1972',
    activeSpan: '30+ years transmitting (Last signal Jan 2003)',
    destination: 'Toward Star Aldebaran (Deep Interstellar Space)',
    statusLabel: 'Quiet · Sailing Past the Kuiper Belt',
    tagline: 'First spacecraft to brave the Asteroid Belt, visit Jupiter, and carry a golden human plaque!',
    kidOverview:
      'Before Voyager, brave Pioneer 10 led the way! Nobody knew if the Asteroid Belt between Mars and Jupiter was an impassable wall of rocks. Pioneer 10 flew straight through it, snapped the first close-ups of Jupiter, and carried a gold picture plaque showing where Earth is.',
    motionEnvironment: 'jupiter-orbit',
    motionCaption: 'Blazing past Jupiter’s stormy bands on its way out of our solar system.',
    defaultCameraPos: [4.2, 2.3, 4.6],
    parts: [
      {
        id: 'pioneer-dish',
        name: '2.7m Deep-Space Dish',
        role: 'Record-Setting Radio Ear',
        howItWorked:
          'This big white parabolic bowl kept Pioneer 10 talking to Earth for over 30 years—sending faint signals from 12 billion kilometers away!',
        funFact: 'Its final signal in 2003 was weaker than a billionth of a billionth of a watt!',
        explodeOffset: [0, 1.1, 0],
        cameraOffset: [2.6, 2.4, 3.0],
      },
      {
        id: 'pioneer-plaque',
        name: 'The Gold Pioneer Plaque',
        role: 'Cosmic Frontlines Greeting Card',
        howItWorked:
          'Bolted to the antenna struts is a gold-anodized aluminum plaque engraved by Carl Sagan and Frank Drake. It shows two humans, our Sun’s distance to pulsing stars, and a map of Earth’s place in the solar system!',
        funFact: 'It was humanity’s very first message designed to travel beyond our solar system forever.',
        explodeOffset: [0.9, 0.2, 0.9],
        cameraOffset: [2.5, 1.3, 2.6],
      },
      {
        id: 'pioneer-rtgs',
        name: 'Twin RTG Power Booms',
        role: 'Nuclear Sun-Free Engines',
        howItWorked:
          'Two long truss arms hold four SNAP-19 plutonium heat generators far away from the sensitive science instruments, supplying steady electricity without needing sunlight.',
        funFact: 'Spinning Pioneer 10 at 4.8 turns per minute kept those long booms balanced like an ice skater’s arms!',
        explodeOffset: [-1.4, -0.3, 0.4],
        cameraOffset: [-3.2, 1.2, 2.8],
      },
    ],
    timeline: [
      {
        date: 'March 3, 1972',
        year: 1972,
        title: 'Launch on Atlas-Centaur',
        description: 'Leaves Earth faster than any previous spacecraft, passing the Moon in just 11 hours.',
      },
      {
        date: 'July 1972 – Feb 1973',
        year: 1972,
        title: 'Surviving the Asteroid Belt',
        description: 'Proves the Asteroid Belt has plenty of empty room between rocks so future ships can pass safely.',
      },
      {
        date: 'December 3, 1973',
        year: 1973,
        title: 'First Close-Up of Jupiter',
        description: 'Braves fierce radiation to snap the first close-up images of Jupiter’s Great Red Spot.',
      },
      {
        date: 'January 23, 2003',
        year: 2003,
        title: 'Final Whisper From Deep Space',
        description: 'Sends its last faint signal from 12.2 billion km away after 31 years on the Cosmic Frontlines.',
      },
    ],
    story: {
      title: 'The Trail-Clearer Through the Asteroid Belt',
      frontlineCallsign: 'Vanguard Pioneer 10 · Deep Horizon',
      chapters: [
        {
          chapterTitle: 'Chapter 1: Into the Unknown Rock Field',
          setting: 'The Asteroid Belt, 1972',
          text: 'In 1972, everyone worried the Asteroid Belt was like a rocky cosmic blender that would smash any spacecraft trying to reach Jupiter. Pioneer 10 stepped up to test the path—counting dust specks as it zoomed through unscathed!',
          kidTakeaway: 'In real space, asteroids are usually separated by millions of kilometers of empty space.',
        },
        {
          chapterTitle: 'Chapter 2: Meeting the Giant King',
          setting: 'Jupiter Flyby, 1973',
          text: 'Jupiter’s invisible radiation belts zapped Pioneer 10’s electronics like lightning, nearly blinding its instruments. Yet Pioneer 10 held steady, sending back the very first close-up portraits of Jupiter’s swirling storms and teaching engineers how to armor Voyager and Galileo!',
          kidTakeaway: 'Every bold pioneer teaches the next mission how to build stronger shields.',
        },
        {
          chapterTitle: 'Chapter 3: Bound for Aldebaran',
          setting: 'Interstellar Space',
          text: 'Flung outward by Jupiter’s gravity, Pioneer 10 became the first spacecraft to cross Neptune’s orbit and head toward the stars—carrying its shiny gold greeting card into eternity.',
          kidTakeaway: 'Pioneer 10 opened the highway to the outer planets for every mission that followed.',
        },
      ],
    },
  },
  {
    id: 'sojourner',
    name: 'Sojourner Rover',
    shortName: 'Sojourner',
    categoryId: 'fallen-on-mars',
    isFeaturedRequired: false,
    launchYear: 1996,
    launchDate: 'December 4, 1996',
    activeSpan: '83 Martian sols (12× longer than planned!)',
    destination: 'Ares Vallis, Mars',
    statusLabel: 'Mission Complete · Resting Beside Pathfinder Lander',
    tagline: 'The microwave-sized pioneer that became the very first rover to roll across Mars!',
    kidOverview:
      'Before Opportunity or Curiosity, tiny Sojourner proved a robot could drive on another planet! About the size of a microwave oven, it rolled down a ramp off the Mars Pathfinder lander in 1997 and sniffed Martian boulders named Barnacle Bill and Yogi.',
    motionEnvironment: 'mars-surface',
    motionCaption: 'Rolling on 6 miniature aluminum wheels beside dusty Martian boulders in Ares Vallis.',
    defaultCameraPos: [3.4, 2.0, 3.8],
    parts: [
      {
        id: 'sojourner-solar-deck',
        name: 'Flat Top Solar Panel',
        role: 'Sunlight Roof',
        howItWorked:
          'Covering the whole top like a flat blue-black lid, this solar array gave Sojourner all the power it needed during sunny Martian afternoons—no bigger than a baking sheet!',
        funFact: 'Sojourner ran on less electricity than a single household nightlight!',
        explodeOffset: [0, 1.0, 0],
        cameraOffset: [2.4, 2.2, 2.4],
      },
      {
        id: 'sojourner-body',
        name: 'Insulated Electronics Box',
        role: 'Laser-Guided Brain',
        howItWorked:
          'Inside its warm aerogel-lined body, Sojourner carried five tiny laser stripes on its front bumper! Whenever the lasers bent over a rock ahead, the rover automatically steered around it.',
        funFact: 'Named after civil rights hero Sojourner Truth by a 12-year-old student essay contest winner!',
        explodeOffset: [0, 0.2, 0],
        cameraOffset: [2.4, 1.2, 2.8],
      },
      {
        id: 'sojourner-wheels',
        name: '6 Miniature Rocker-Bogie Wheels',
        role: 'First Martian Tire Tracks',
        howItWorked:
          'Six 13-centimeter aluminum wheels with stainless-steel cleats invented the famous rocker-bogie climbing system still used on Opportunity, Curiosity, and Perseverance today!',
        funFact: 'Sojourner’s tracks were the very first human-made wheel marks on the Red Planet!',
        explodeOffset: [0, -0.8, 0],
        cameraOffset: [2.6, 0.6, 2.6],
      },
      {
        id: 'apxs-sniffer',
        name: 'APXS Rock Sniffer',
        role: 'Mineral Nose',
        howItWorked:
          'Mounted on the back, this gold cylinder pressed gently against boulders like "Barnacle Bill" and used harmless alpha particles to identify what chemical elements were inside Martian rocks!',
        funFact: 'It proved Ares Vallis was shaped by a massive ancient flood of water on Mars!',
        explodeOffset: [0, 0, -1.1],
        cameraOffset: [2.2, 1.0, -2.6],
      },
    ],
    timeline: [
      {
        date: 'July 4, 1997',
        year: 1997,
        title: 'Independence Day Airbag Landing',
        description: 'Mars Pathfinder bounces onto Mars inside airbags and opens its petals like a flower.',
      },
      {
        date: 'July 6, 1997',
        year: 1997,
        title: 'First Wheel Tracks on Mars',
        description: 'Sojourner rolls cautiously down the metal ramp and touches Martian soil!',
      },
      {
        date: 'July–August 1997',
        year: 1997,
        title: 'Meeting Yogi & Barnacle Bill',
        description: 'Sniffs 16 rocks and sends back 550 photos, proving ancient floods swept across Mars.',
      },
      {
        date: 'September 27, 1997',
        year: 1997,
        title: 'Last Signal From Ares Vallis',
        description: 'After lasting 83 sols instead of 7, the Pathfinder base station falls silent.',
      },
    ],
    story: {
      title: 'Six Little Wheels That Changed Mars Forever',
      frontlineCallsign: 'Micro-Rover Sojourner · Ares Pioneer',
      chapters: [
        {
          chapterTitle: 'Chapter 1: Down the Metal Ramp',
          setting: 'Ares Vallis, July 1997',
          text: 'Until 1997, every robot sent to Mars stayed stuck in one spot forever. Then tiny Sojourner—no bigger than a microwave oven—crept inch by inch down a metal ramp and pressed its cleated wheels into red Martian dust for the first time in history!',
          kidTakeaway: 'A 12-year-old kid named Valerie Ambroise won the contest to name Sojourner!',
        },
        {
          chapterTitle: 'Chapter 2: Nose-to-Rock Science',
          setting: 'Rock Garden on Mars',
          text: 'Sojourner backed carefully right up to weird boulders nicknamed Barnacle Bill, Yogi, and Scooby-Doo, pressing its APXS rock sniffer against them. Every chemical clue revealed that roaring water floods once carved those valleys!',
          kidTakeaway: 'Even tiny rovers can make giant scientific discoveries when they can move to new rocks.',
        },
        {
          chapterTitle: 'Chapter 3: The Mother of All Rovers',
          setting: 'Cosmic Frontlines Legacy',
          text: 'Every giant SUV-sized Mars rover that came later—Spirit, Opportunity, Curiosity, and Perseverance—borrows Sojourner’s clever six-wheel climbing legs. That little pioneer showed humanity how to drive on another world!',
          kidTakeaway: 'Small first prototypes pave the road for giant explorers of the future.',
        },
      ],
    },
  },
  {
    id: 'europa-clipper',
    name: 'Europa Clipper',
    shortName: 'Europa Clipper',
    categoryId: 'gas-giants',
    isFeaturedRequired: false,
    launchYear: 2024,
    launchDate: 'October 14, 2024',
    activeSpan: '2024–Present (En Route to Jupiter)',
    destination: 'Jupiter’s Ocean Moon Europa',
    statusLabel: 'Active · Cruising Toward 2030 Jupiter Arrival',
    tagline: 'NASA’s biggest planetary explorer ever—built to hunt for alien ocean habitats beneath Europa’s ice!',
    kidOverview:
      'Launched in 2024, Europa Clipper has solar wings wider than a basketball court! It is flying out to Jupiter’s frozen moon Europa, which hides a massive salty ocean under its cracked icy shell with twice as much water as all of Earth’s oceans!',
    motionEnvironment: 'jupiter-orbit',
    motionCaption: 'Sweeping low over Europa’s cracked ice shell with Jupiter towering in the sky.',
    defaultCameraPos: [5.2, 2.6, 5.4],
    parts: [
      {
        id: 'clipper-wings',
        name: 'Basketball-Court Solar Wings',
        role: 'Deep-Space Sun Catchers',
        howItWorked:
          'Spanning over 30 meters from tip to tip, these enormous blue wings soak up faint sunlight five times farther from the Sun than Earth—powering nine ocean-hunting instruments!',
        funFact: 'It is the largest spacecraft NASA has ever built for a planetary mission!',
        explodeOffset: [0, 0.8, 0],
        cameraOffset: [4.2, 3.0, 4.4],
      },
      {
        id: 'clipper-vault',
        name: 'Aluminum-Zinc Vault & Dish',
        role: 'Radiation Shield & Radio',
        howItWorked:
          'Because Europa orbits inside Jupiter’s intense radiation belts, Clipper dives in quickly for each flyby and swings back out to cool down and beam data home through its 3-meter dish!',
        funFact: 'Instead of orbiting Europa nonstop, it will make nearly 50 super-close swoops!',
        explodeOffset: [0, 1.1, 0],
        cameraOffset: [2.6, 2.4, 2.8],
      },
      {
        id: 'ice-radar-booms',
        name: 'Ice-Penetrating Radar Booms',
        role: 'Subsurface Ocean Scanner',
        howItWorked:
          'Long cross-shaped antenna booms shoot radio waves straight through kilometers of solid ice on Europa, listening for echoes bouncing off hidden liquid water lakes and ocean floors below!',
        funFact: 'Clipper also carries a metal plate engraved with water waveforms in over 100 Earth languages!',
        explodeOffset: [-1.4, -0.5, 0.8],
        cameraOffset: [-3.2, 1.0, 3.0],
      },
    ],
    timeline: [
      {
        date: 'October 14, 2024',
        year: 2024,
        title: 'Falcon Heavy Liftoff',
        description: 'Blasts off from Kennedy Space Center to begin a 2.9-billion-km gravity-assist journey.',
      },
      {
        date: '2025 & 2026',
        year: 2026,
        title: 'Mars & Earth Gravity Boosts',
        description: 'Swings past Mars (2025) and Earth (2026) like cosmic slingshots to reach Jupiter.',
      },
      {
        date: 'April 2030',
        year: 2030,
        title: 'Entering Jupiter Orbit',
        description: 'Fires its main thrusters to join Juno’s neighborhood around the giant planet.',
      },
      {
        date: '2031–2034',
        year: 2031,
        title: '49 Close Sweeps of Europa',
        description: 'Dives as low as 25 km above Europa’s cracked ice to check if its hidden ocean could support life!',
      },
    ],
    story: {
      title: 'The Giant Winged Scout Hunting a Secret Ocean',
      frontlineCallsign: 'Ocean Hunter Clipper · Europa Sector',
      chapters: [
        {
          chapterTitle: 'Chapter 1: An Ocean World Disguised as Ice',
          setting: 'Deep Space En Route to Jupiter',
          text: 'From far away, Jupiter’s moon Europa looks like a cracked white cue ball. Yet Galileo spotted magnetic clues that a warm, salty ocean twice the size of all Earth’s seas sloshes secretly underneath! Europa Clipper set sail across the Cosmic Frontlines to find out.',
          kidTakeaway: 'Where there is liquid water, chemistry, and warmth, scientists look for the ingredients for life!',
        },
        {
          chapterTitle: 'Chapter 2: Swoop In, Beam Out',
          setting: '25 Kilometers Over Ice Ridges',
          text: 'Orbiting Europa directly would bathe Clipper in dangerous radiation. So Clipper acts like a clever hawk: swooping 25 kilometers over the ice ridges to snap radar echoes and sniff water mist, then soaring high back out to send discoveries safely home.',
          kidTakeaway: 'Smart flight paths protect delicate electronics while still getting super-close science data.',
        },
        {
          chapterTitle: 'Chapter 3: A Message in a Bottle Across Space',
          setting: 'Cosmic Frontlines, 2030s',
          text: 'Tucked on its vault is a message from Earth with the word "water" spoken in over 100 languages—connecting every ocean on Earth to the hidden sea waiting beneath Europa’s stars.',
          kidTakeaway: 'Modern space missions carry humanity’s shared curiosity to distant moons.',
        },
      ],
    },
  },
  {
    id: 'messenger',
    name: 'MESSENGER',
    shortName: 'MESSENGER',
    categoryId: 'bound-by-gravity',
    isFeaturedRequired: false,
    launchYear: 2004,
    launchDate: 'August 3, 2004',
    activeSpan: '11 years · 4,104 orbits around Mercury',
    destination: 'Orbit Around Planet Mercury',
    statusLabel: 'Mission Complete · Impacted Mercury (April 2015)',
    tagline: 'Danced through 6 planetary gravity slingshots just to slow down enough to orbit Mercury!',
    kidOverview:
      'Because Mercury sits right next to the Sun’s colossal gravity well, any spaceship falling inward speeds up like a rollercoaster! MESSENGER performed six daring flybys past Earth, Venus, and Mercury just to tap the brakes and become the very first spacecraft to orbit Mercury.',
    motionEnvironment: 'mercury-orbit',
    motionCaption: 'Skimming over cratered Mercury with its ceramic sunshade guarding against the blazing Sun.',
    defaultCameraPos: [3.8, 2.2, 4.2],
    parts: [
      {
        id: 'ceramic-sunshade',
        name: 'Curved Ceramic Sunshade',
        role: '370°C Solar Umbrella',
        howItWorked:
          'Made of heat-proof Nextel ceramic cloth stretched over a curved frame, this white shield faced the blinding Sun nonstop—keeping instruments behind it at room temperature even when the front baked at 370°C!',
        funFact: 'Near Mercury, sunlight is 11 times brighter than on Earth—hot enough to melt lead!',
        explodeOffset: [0, 0.2, 1.3],
        cameraOffset: [2.6, 1.5, 3.2],
      },
      {
        id: 'mercury-solar-wings',
        name: 'Twin Tilted Solar Wings',
        role: 'Heat-Managing Power Wings',
        howItWorked:
          'Two rectangular solar wings tilted away from the blazing Sun like Venetian blinds whenever things got too hot, using mirrors mixed right in between blue solar cells to stay cool!',
        funFact: 'Two-thirds of each wing’s surface was shiny mirrors instead of solar cells!',
        explodeOffset: [1.3, 0, -0.3],
        cameraOffset: [3.2, 1.6, 2.4],
      },
      {
        id: 'mercury-imagers',
        name: 'MDIS Dual Cameras & Laser Altimeter',
        role: 'Crater & Polar Ice Mapper',
        howItWorked:
          'Tucked safely behind the shade, these cameras mapped 100% of Mercury for the first time and spotted shiny frozen water ice hiding inside deep polar craters that never see sunlight!',
        funFact: 'Yes—even the closest planet to the Sun has real ice hiding in permanent crater shadows!',
        explodeOffset: [0, -1.0, -0.4],
        cameraOffset: [2.4, 0.2, -2.8],
      },
    ],
    timeline: [
      {
        date: 'August 3, 2004',
        year: 2004,
        title: 'Launch Toward the Inner System',
        description: 'Blasts off on a 6.6-year looping cosmic ballet using 6 planetary gravity assists.',
      },
      {
        date: '2005–2009',
        year: 2008,
        title: 'Six Gravity Braking Flybys',
        description: 'Swings past Earth once, Venus twice, and Mercury three times to shed orbital speed.',
      },
      {
        date: 'March 18, 2011',
        year: 2011,
        title: 'First Mercury Orbiter Ever!',
        description: 'Enters orbit around Mercury and discovers polar ice and strange volcanic hollows.',
      },
      {
        date: 'April 30, 2015',
        year: 2015,
        title: 'Final Touchdown Crater',
        description: 'Out of fuel after 4,104 orbits, MESSENGER impacts Mercury at 14,000 km/h.',
      },
    ],
    story: {
      title: 'Taming the Sun’s Gravity Slide',
      frontlineCallsign: 'Shade-Runner MESSENGER · Inner Frontier',
      chapters: [
        {
          chapterTitle: 'Chapter 1: Falling Too Fast Toward the Sun',
          setting: 'Inner Solar System, 2004–2011',
          text: 'Imagine riding a bicycle down the steepest hill in the solar system—that’s what flying to Mercury feels like because the Sun’s huge gravity pulls you faster and faster! MESSENGER couldn’t carry enough fuel to slam on the brakes alone, so it used Earth, Venus, and Mercury as gravity speed bumps six times in a row.',
          kidTakeaway: 'Gravity assists don’t just speed spacecraft up—they can also slow them down carefully!',
        },
        {
          chapterTitle: 'Chapter 2: Ice on the Roasted Planet',
          setting: 'Mercury’s North Pole',
          text: 'Once locked in orbit behind its snowy-white ceramic umbrella, MESSENGER peered into Mercury’s deepest polar craters. Sunlight never reaches the bottom of those bowls—and there, sparkling in the pitch black, sat millions of tons of frozen water ice!',
          kidTakeaway: 'Permanent shadows inside craters can stay freezing cold even right next to the Sun.',
        },
        {
          chapterTitle: 'Chapter 3: Becoming Part of Mercury',
          setting: '4,104 Orbits Complete',
          text: 'After mapping every single cliff and crater on Mercury, MESSENGER gently ran out of thruster gas and etched its own tiny brand-new crater onto the planet it had revealed to Earth.',
          kidTakeaway: 'MESSENGER proved smart gravity navigation can reach even the trickiest worlds.',
        },
      ],
    },
  },
  {
    id: 'soyuz-capsule',
    name: 'Soyuz Descent Module',
    shortName: 'Soyuz Capsule',
    categoryId: 'safe-at-home',
    isFeaturedRequired: false,
    launchYear: 1967,
    launchDate: 'April 23, 1967 (Series) · Active Today',
    activeSpan: '59+ years of crewed spaceflights',
    destination: 'ISS Orbit to Kazakhstan Steppe',
    statusLabel: 'Active · Brought Over 140 Crews Safely Home',
    tagline: 'A tough headlight-shaped capsule with landing retrorockets for soft ground touchdowns!',
    kidOverview:
      'Unlike Apollo capsules that splash into the ocean, the Soyuz Descent Module brings three astronauts safely back onto solid land! Shaped like a rounded car headlight, it fires tiny rockets one meter above the ground for a soft cushion touchdown.',
    motionEnvironment: 'reentry-splashdown',
    motionCaption: 'Diving safely through Earth’s fiery sky behind its lower thermal shield.',
    defaultCameraPos: [3.6, 2.0, 4.0],
    parts: [
      {
        id: 'soyuz-hull',
        name: 'Headlight-Shaped Crew Cabin',
        role: '3-Astronaut Return Pod',
        howItWorked:
          'Its curved bell shape generates a tiny bit of aerodynamic lift as it falls through the air—letting astronauts steer gently and feel much lighter G-forces during re-entry!',
        funFact: 'The rounded shape looks just like an old-fashioned car headlight!',
        explodeOffset: [0, 0.2, 0],
        cameraOffset: [2.6, 1.5, 2.8],
      },
      {
        id: 'soyuz-heat-shield',
        name: 'Drop-Off Heat Shield & Retrorockets',
        role: 'Fire Shield + Soft-Landing Boosters',
        howItWorked:
          'Its bottom ablative shield blocks 1,600°C re-entry heat, then drops off under the parachute to uncover solid-fuel retrorockets! Just 0.7 meters above the grass, they fire "POOF!" to cushion the bump.',
        funFact: 'Astronauts joke that a Soyuz landing feels like "a small car crash followed by a soft pillow!"',
        explodeOffset: [0, -1.1, 0],
        cameraOffset: [2.6, -0.3, 2.8],
      },
      {
        id: 'soyuz-chute-hatch',
        name: 'Top Parachute Cone & Side Hatch',
        role: 'Sky Brakes & Crew Exit',
        howItWorked:
          'First a drogue chute stops spinning, then a huge 1,000-square-meter main orange-and-white parachute slows the pod down over the flat grassy plains of Kazakhstan.',
        funFact: 'Rescue helicopters track its radio beacon and reach the crew within minutes!',
        explodeOffset: [0, 1.2, 0],
        cameraOffset: [2.4, 2.4, 2.4],
      },
    ],
    timeline: [
      {
        date: '1967–1980',
        year: 1967,
        title: 'Soyuz Fleet Begins',
        description: 'Debuts as a versatile 3-module spacecraft for Salyut space stations.',
      },
      {
        date: '1986–2000',
        year: 1986,
        title: 'Mir Space Station Shuttle',
        description: 'Carries international crews safely up and back from Space Station Mir for 15 years.',
      },
      {
        date: '2000–Present',
        year: 2000,
        title: 'International Space Station Lifeline',
        description: 'Serves as an unfailing lifeboat and return ship for ISS astronauts from dozens of nations.',
      },
      {
        date: 'Today (2026)',
        year: 2026,
        title: 'Over 150 Successful Returns',
        description: 'Continues safely delivering Cosmic Frontlines crews home after 6-month orbital missions.',
      },
    ],
    story: {
      title: 'Touchdown With a Soft-Landing Rocket Puff',
      frontlineCallsign: 'Return Pod Soyuz · Steppe Recovery',
      chapters: [
        {
          chapterTitle: 'Chapter 1: Leaving the Space Station',
          setting: '400 km Above Earth',
          text: 'Before heading home from the International Space Station, the Soyuz spacecraft breaks into three pieces. Two modules burn away cleanly in the sky—leaving only the rugged middle Descent Module holding three spacesuited astronauts strapped tightly inside.',
          kidTakeaway: 'Keeping the return pod small and simple makes it much safer and tougher during re-entry.',
        },
        {
          chapterTitle: 'Chapter 2: Popping the Giant Blossom',
          setting: '10 km Above Kazakhstan',
          text: 'After glowing amber-pink through the upper sky, the capsule slows down and pops out a giant striped parachute as big as a movie theater! Beneath it, the heavy lower heat shield drops away to reveal a clever secret.',
          kidTakeaway: 'Dropping the heavy heat shield reduces landing weight and uncovers the landing rockets.',
        },
        {
          chapterTitle: 'Chapter 3: One Meter Before Ground',
          setting: 'Kazakhstan Grasslands',
          text: 'Whoosh! Right before touching the grass, hidden gamma-ray sensors fire tiny soft-landing rockets for half a second—braking the capsule just in time so the astronauts step out smiling under wide blue Earth skies.',
          kidTakeaway: 'Reliable engineering tested over decades keeps astronauts safe on every trip home.',
        },
      ],
    },
  },
];
