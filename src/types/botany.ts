export interface CareProfile {
  wateringFrequencyDays: number;
  waterVolumeMl: number;
  moistureTargetPercent: number;
  lightPPFD: string;
  lightExposure: string;
  temperatureRangeC: string;
  humidityRangePercent: string;
  soilPhRange: string;
  substrateMix: string;
  fertilizerSchedule: string;
  toxicity: string;
  pruningGuide: string;
  propagationMethod: string;
}

export interface SeasonalAdjustment {
  season: string;
  instruction: string;
}

export interface DiagnosticFinding {
  symptom: string;
  probableCause: string;
  remediation: string;
}

export interface PlantAnalysisResult {
  commonName: string;
  scientificName: string;
  family: string;
  origin: string;
  confidence: number;
  summary: string;
  foliarHealthStatus: 'Optimal' | 'Needs Attention' | 'Critical' | string;
  healthDiagnosis: string;
  careProfile: CareProfile;
  seasonalAdjustments: SeasonalAdjustment[];
  diagnosticFindings: DiagnosticFinding[];
}

export interface PlantSpecimen extends PlantAnalysisResult {
  id: string;
  accessionNumber: string;
  addedDate: string;
  lastWateredDate: string;
  potDiameterCm: number;
  locationRoom: string;
  illustrationKey?: 'monstera' | 'ficus' | 'calathea' | 'strelitzia';
  customImageUrl?: string;
  notes?: string;
}

export type GeminiModelOption = 'gemini-4-argon' | 'gemini-3.8-flash' | 'gemini-3.1-flash-lite';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  modelUsed?: string;
  attachedImagePreview?: string;
}
