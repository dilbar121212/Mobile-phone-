export type PtaStatus = 'Official PTA Approved' | 'Non-PTA' | 'PTA Passport Registered';

export interface RetailerListing {
  sourceId: string;
  retailerName: string;
  price: number; // PKR
  ptaStatus: PtaStatus;
  condition: 'Brand New' | 'Like New (Open Box)' | 'Refurbished' | 'Fair';
  inStock: boolean;
  warranty: string;
  url: string;
  imageUrl?: string;
  sellerRating?: number;
  lastVerified: string;
}

export interface OfficialPriceRecord {
  price: number | null; // PKR - null if manufacturer does not publish direct online retail price
  isPublishedByBrand: boolean;
  sourceName: string;
  sourceUrl: string;
  lastVerified: string;
  limitationNote?: string;
}

export interface PriceHistoryPoint {
  date: string;
  officialPrice: number | null;
  lowestMarketPrice: number;
  source: string;
}

export type MobileBrand =
  | 'Samsung'
  | 'Xiaomi'
  | 'Redmi'
  | 'OPPO'
  | 'realme'
  | 'Vivo'
  | 'Apple'
  | 'Infinix'
  | 'Tecno'
  | 'VGo Tel'
  | 'QMobile'
  | 'XMobile'
  | 'Club Mobile'
  | 'Google'
  | 'Motorola'
  | 'OnePlus'
  | 'itel'
  | string;

export interface PhoneCategoryItem {
  label: string;
  value: string;
}

export interface PhoneCategorySpec {
  categoryName: string;
  categoryIcon?: string;
  items: PhoneCategoryItem[];
}

export interface PhoneSpecs {
  display: string;
  processor: string;
  rearCamera: string;
  frontCamera: string;
  battery: string;
  charging: string;
  os: string;
  network: string;
  // Deep WhatMobile extracted fields
  chipset?: string;
  gpu?: string;
  camera_main?: string;
  camera_front?: string;
  display_type?: string;
  display_size?: string;
  resolution?: string;
  protection?: string;
  dimensions?: string;
  weight?: string;
  sim?: string;
  ui?: string;
  cardSlot?: string;
  wlan?: string;
  bluetooth?: string;
  gps?: string;
  nfc?: string;
  sensors?: string;
  audio?: string;
  torch?: string;
  frequency_2g?: string;
  frequency_3g?: string;
  frequency_4g?: string;
  frequency_5g?: string;
  categories?: PhoneCategorySpec[];
}

export interface MobilePhone {
  id: string;
  title: string;
  brand: MobileBrand;
  model: string;
  storage: string;
  ram: string;
  color: string;
  officialPtaStatus: PtaStatus;
  imageUrl?: string;
  images?: string[];
  tagline?: string;
  officialMfr: OfficialPriceRecord;
  marketLowestPrice: number; // Lowest verified new retail/mandi price in PKR
  retailerPrices: RetailerListing[];
  priceHistory: PriceHistoryPoint[];
  marketTrend: 'Falling' | 'Stable' | 'Rising';
  isStale: boolean; // Flagged when update interval exceeded without fresh verification
  lastSuccessfulUpdate: string;
  specs: PhoneSpecs;
}

export interface ScrapeSource {
  name: string;
  brand: string;
  enabled: boolean;
  listingUrls: string[];
  sitemap?: string;
  productPattern?: string;
  skipPattern?: string;
  maxProducts?: number;
  delayMs?: number;
  isOfficial?: boolean;
  isUsedMarket?: boolean;
  // Runtime and metadata fields
  id?: string;
  url?: string;
  domain?: string;
  category?: 'official_mfr' | 'retailer' | 'wholesale';
  region?: string;
  active?: boolean;
  lastRunStart?: string | null;
  lastSuccessfulUpdate?: string | null;
  status?: 'idle' | 'running' | 'success' | 'warning' | 'error';
  lastErrorMessage?: string | null;
  consecutiveFailures?: number;
  productsUpdated?: number;
  productsFailed?: number;
  scrapeIntervalMins?: number;
  robotsPermitted?: boolean;
  apiType?: 'direct_json_api' | 'html_structured_banners' | 'showcase_catalog' | 'retail_feed';
  notes?: string;
}

export interface TradeInValuationPKR {
  brand: string;
  model: string;
  storage: string;
  ptaStatus: PtaStatus;
  estimatedCashValuePKR: number;
  exchangeBonusValuePKR: number;
  wholesaleMandiRatePKR: number;
  grade: 'Grade A+ (Pristine)' | 'Grade A (Good)' | 'Grade B (Fair)' | 'Grade C (Defective)';
  ptaTaxImpactDescription: string;
  recommendation: string;
}
