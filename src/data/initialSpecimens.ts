import { PlantSpecimen } from '../types/botany';

export const INITIAL_SPECIMENS: PlantSpecimen[] = [
  {
    id: 'spec-monstera-01',
    accessionNumber: 'VRD-2026-014',
    addedDate: '2026-03-12',
    lastWateredDate: '2026-10-25',
    potDiameterCm: 24,
    locationRoom: 'South Conservatory Window (2m setback)',
    illustrationKey: 'monstera',
    commonName: 'Swiss Cheese Plant',
    scientificName: 'Monstera deliciosa',
    family: 'Araceae',
    origin: 'Southern Mexico to Panama (Montane Cloud Forests)',
    confidence: 99.4,
    summary:
      'Hemiepiphytic evergreen climber prized for its deeply fenestrated, glossy coriaceous leaves and aerial root architecture. Thrives in aerated aroid substrates with filtered canopy light.',
    foliarHealthStatus: 'Optimal',
    healthDiagnosis:
      'Lamina displays deep chlorophyll saturation, symmetrical secondary fenestrations, and firm petiole turgor. No marginal necrosis or thrips stippling observed.',
    careProfile: {
      wateringFrequencyDays: 8,
      waterVolumeMl: 650,
      moistureTargetPercent: 45,
      lightPPFD: '220–420 µmol/m²/s',
      lightExposure: 'Bright indirect light; morning eastern sun or filtered southern exposure.',
      temperatureRangeC: '18–29 °C (65–84 °F)',
      humidityRangePercent: '60–75% RH',
      soilPhRange: '5.5–6.5 pH',
      substrateMix: '35% chunky pine bark, 30% coco coir, 20% coarse perlite, 10% worm castings, 5% horticultural charcoal',
      fertilizerSchedule: 'Balanced 3-1-2 liquid foliage feed diluted to 1/2 strength every 14 days from March through September.',
      toxicity: 'Insoluble calcium oxalate raphides in all tissues; toxic to cats and dogs upon mastication.',
      pruningGuide: 'Make clean 45° internodal cuts 1.5 cm above an axillary bud using sterilized bypass pruners in mid-spring.',
      propagationMethod: 'Single-node stem cuttings with an existing aerial root rooted in moist sphagnum moss or aerated water.',
    },
    seasonalAdjustments: [
      {
        season: 'Spring (Vernal Flush)',
        instruction: 'Inspect root ball for pot-bound circling; top-dress with 2 cm worm castings and resume biweekly nitrogen-forward feeding.',
      },
      {
        season: 'Summer (Peak Canopy)',
        instruction: 'Monitor VPD during heatwaves; mist aerial roots attached to moss poles and flush substrate monthly to prevent salt buildup.',
      },
      {
        season: 'Autumn (Photoperiod Decline)',
        instruction: 'Extend watering interval by 2–3 days as transpiration slows; taper fertilizer concentration to quarter strength.',
      },
      {
        season: 'Winter (Dormancy Rest)',
        instruction: 'Allow top 6–8 cm of substrate to dry completely between waterings; keep foliage away from cold window drafts (< 15 °C).',
      },
    ],
    diagnosticFindings: [
      {
        symptom: 'Healthy turgor & uniform deep green lamina',
        probableCause: 'Balanced root-zone oxygenation and appropriate PPFD exposure.',
        remediation: 'Maintain current 8-day hydration cycle; wipe adaxial leaf surfaces monthly with damp microfiber cloth.',
      },
      {
        symptom: 'Lower petiole guttation at dawn',
        probableCause: 'Normal xylem root pressure following deep irrigation when night humidity exceeds 65%.',
        remediation: 'No intervention required; avoid over-saturating if guttation persists more than 48 hours post-watering.',
      },
    ],
  },
  {
    id: 'spec-ficus-02',
    accessionNumber: 'VRD-2026-029',
    addedDate: '2026-04-08',
    lastWateredDate: '2026-10-19',
    potDiameterCm: 28,
    locationRoom: 'East Drawing Room Corner',
    illustrationKey: 'ficus',
    commonName: 'Fiddle-Leaf Fig',
    scientificName: 'Ficus lyrata',
    family: 'Moraceae',
    origin: 'Western Africa Lowland Tropical Rainforests',
    confidence: 98.7,
    summary:
      'Architectural broad-leaved evergreen tree bearing large, panduriform (violin-shaped) leaves with prominent pale pinnate venation. Highly responsive to consistent light orientation and rapid drainage.',
    foliarHealthStatus: 'Needs Attention',
    healthDiagnosis:
      'Mild reddish-brown petiole edema speckling on newest apical leaf; lower leaves show slight inward cupping indicative of overdue hydration.',
    careProfile: {
      wateringFrequencyDays: 9,
      waterVolumeMl: 850,
      moistureTargetPercent: 40,
      lightPPFD: '350–650 µmol/m²/s',
      lightExposure: 'High-intensity bright indirect light with 2–3 hours of direct morning sun; rotate pot 90° every 14 days.',
      temperatureRangeC: '18–27 °C (65–80 °F)',
      humidityRangePercent: '55–70% RH',
      soilPhRange: '6.0–6.8 pH',
      substrateMix: '45% high-porosity peat/coir base, 30% aged pine bark fines, 25% pumice or coarse perlite',
      fertilizerSchedule: '3-1-2 ratio liquid fertilizer once monthly during active spring and summer leaf flushes.',
      toxicity: 'Ficus latex sap contains proteolytic enzymes (ficin) and psoralens; irritating to skin and GI tract of pets.',
      pruningGuide: 'Notch above dormant nodes or pinch apical meristem in late spring to stimulate lateral branching.',
      propagationMethod: 'Woody stem cuttings with 2 leaves or air layering of mature branches wrapped in damp sphagnum.',
    },
    seasonalAdjustments: [
      {
        season: 'Spring (Apical Bud Break)',
        instruction: 'Maintain strict watering consistency during bud expansion to prevent physiological edema (reddish pinpoint spots).',
      },
      {
        season: 'Summer (Active Lignification)',
        instruction: 'Gently shake main trunk for 60 seconds twice weekly to simulate wind stress and strengthen vascular cambium.',
      },
      {
        season: 'Autumn (Acclimation)',
        instruction: 'Relocate away from HVAC heating vents before furnace season begins to prevent sudden abscission.',
      },
      {
        season: 'Winter (Low-Light Conservation)',
        instruction: 'Supplement with a 5000K full-spectrum horticultural LED if natural photoperiod drops below 9 hours.',
      },
    ],
    diagnosticFindings: [
      {
        symptom: 'Fine rust-colored flecking on emerging apical leaf',
        probableCause: 'Physiological edema caused by uneven soil moisture uptake during cellular expansion.',
        remediation: 'Water on a strict moisture-meter threshold (when top 5 cm reads 30%) rather than letting soil bone-dry then flooding.',
      },
      {
        symptom: 'Slight adaxial curling along midrib',
        probableCause: 'Ambient relative humidity dropping below 45% near afternoon sun exposure.',
        remediation: 'Group with broadleaf companions or operate an evaporative humidifier to hold 55–65% RH.',
      },
    ],
  },
  {
    id: 'spec-calathea-03',
    accessionNumber: 'VRD-2026-041',
    addedDate: '2026-06-19',
    lastWateredDate: '2026-10-27',
    potDiameterCm: 18,
    locationRoom: 'North Study Terrarium Shelf',
    illustrationKey: 'calathea',
    commonName: 'Round-Leaf Prayer Plant',
    scientificName: 'Goeppertia orbifolia',
    family: 'Marantaceae',
    origin: 'Eastern Bolivia Humid Understory',
    confidence: 97.9,
    summary:
      'Rhizomatous perennial herb renowned for broad, pleated orbicular blades banded with metallic silver-green striations and diurnal nyctinastic pulvinus movement.',
    foliarHealthStatus: 'Optimal',
    healthDiagnosis:
      'Active nyctinastic leaf elevation at dusk confirms healthy motor cell turgor in the petiole pulvinus. Margins are crisp and free of fluoride tip burn.',
    careProfile: {
      wateringFrequencyDays: 5,
      waterVolumeMl: 380,
      moistureTargetPercent: 60,
      lightPPFD: '100–220 µmol/m²/s',
      lightExposure: 'Medium to dappled shade; shield strictly from direct afternoon solar radiation to prevent chlorophyll bleaching.',
      temperatureRangeC: '19–26 °C (66–78 °F)',
      humidityRangePercent: '65–80% RH',
      soilPhRange: '5.5–6.2 pH',
      substrateMix: '50% coco coir, 25% fine orchid bark, 15% perlite, 10% vermiculite for even moisture retention',
      fertilizerSchedule: 'Dilute organic kelp/humic acid feed (1/4 strength) every 3 weeks in spring and summer only.',
      toxicity: 'Non-toxic to cats, dogs, and humans (ASPCA verified pet-safe specimen).',
      pruningGuide: 'Trim senescent outer leaves at the basal sheath near soil line using sanitized micro-snips.',
      propagationMethod: 'Rhizome division during spring repotting, ensuring each division retains 3+ foliage fans and active tubers.',
    },
    seasonalAdjustments: [
      {
        season: 'Spring (Rhizome Expansion)',
        instruction: 'Use exclusively distilled, RO, or collected rainwater (< 30 ppm TDS) as new rolled leaf spikes emerge.',
      },
      {
        season: 'Summer (Humid Canopy)',
        instruction: 'Keep substrate evenly damp like a wrung-out sponge; ensure gentle air circulation to prevent fungal leaf spot.',
      },
      {
        season: 'Autumn (Steady Moisture)',
        instruction: 'Check undersides of leaves along the midrib for spider mites as indoor heating lowers ambient humidity.',
      },
      {
        season: 'Winter (Thermal Protection)',
        instruction: 'Never allow root zone temperature to fall below 17 °C; use room-temperature distilled water.',
      },
    ],
    diagnosticFindings: [
      {
        symptom: 'Strong diurnal pulvinus movement (leaves rise 40° at dusk)',
        probableCause: 'Healthy potassium-ion osmotic transport within petiole motor cells.',
        remediation: 'Continue irrigating exclusively with distilled or reverse-osmosis water.',
      },
    ],
  },
  {
    id: 'spec-strelitzia-04',
    accessionNumber: 'VRD-2026-053',
    addedDate: '2026-08-04',
    lastWateredDate: '2026-10-22',
    potDiameterCm: 30,
    locationRoom: 'Atrium Skylight Alcove',
    illustrationKey: 'strelitzia',
    commonName: 'White Bird of Paradise',
    scientificName: 'Strelitzia nicolai',
    family: 'Strelitziaceae',
    origin: 'Coastal Southeastern Africa (KwaZulu-Natal to Mozambique)',
    confidence: 99.1,
    summary:
      'Vigorous arborescent monocot forming distichous fans of coriaceous, blue-green paddle leaves atop pseudostems. Natural marginal leaf splitting reduces wind resistance in native coastal habitats.',
    foliarHealthStatus: 'Optimal',
    healthDiagnosis:
      'Strong central midrib rigidity and glaucous cuticle bloom. Minor natural wind-relief splits along right mature blade follow normal anatomical cleavage lines.',
    careProfile: {
      wateringFrequencyDays: 7,
      waterVolumeMl: 950,
      moistureTargetPercent: 50,
      lightPPFD: '450–850 µmol/m²/s',
      lightExposure: 'Full sun to high-intensity bright light; requires minimum 4 hours of direct sunlight daily for compact petiole growth.',
      temperatureRangeC: '16–30 °C (60–86 °F)',
      humidityRangePercent: '55–70% RH',
      soilPhRange: '5.8–6.8 pH',
      substrateMix: '45% rich loam/coco base, 25% composted bark, 20% coarse pumice, 10% river sand for ballast',
      fertilizerSchedule: 'Slow-release granular 10-10-10 in spring plus biweekly liquid potassium-rich feed during summer.',
      toxicity: 'Mildly toxic to pets; ingestion of leaves or arils causes gastrointestinal discomfort and drowsiness.',
      pruningGuide: 'Excise outermost yellowing petioles flush against the basal fan with a sharp sterilized pruning knife.',
      propagationMethod: 'Basal sucker division in late spring with a clean spade, keeping fleshy tuberous roots intact.',
    },
    seasonalAdjustments: [
      {
        season: 'Spring (Vigorous Unfurling)',
        instruction: 'Apply a warm damp cloth along tightly furled central spears if low indoor humidity causes sticking during unfurling.',
      },
      {
        season: 'Summer (High Solar Demand)',
        instruction: 'Provide deep soaking irrigation until 15% runoff appears in saucer, then discard excess standing water.',
      },
      {
        season: 'Autumn (Root Consolidation)',
        instruction: 'Discontinue high-nitrogen fertilizers to prevent weak, etiolated winter petioles.',
      },
      {
        season: 'Winter (Cool Bright Rest)',
        instruction: 'Position in the brightest south-facing window available; allow top 5 cm of soil to dry before watering.',
      },
    ],
    diagnosticFindings: [
      {
        symptom: 'Clean lateral splits along mature leaf blade margins',
        probableCause: 'Programmed anatomical cleavage lines evolved to prevent petiole snapping in wind.',
        remediation: 'Normal morphology; avoid manually tearing partial splits to prevent vascular bruising.',
      },
    ],
  },
];
