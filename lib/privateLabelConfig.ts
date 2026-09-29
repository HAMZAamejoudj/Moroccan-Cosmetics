/** `null` = not confirmed; hide from UI. `true` = show. `false` = explicitly off (hidden). */
export type ConfigFlag = boolean | null;

export const privateLabelConfig = {
  quoteResponseHours: null as number | null,
  minimumOrderUnits: 50 as number | null,
  leadTimeWeeksMin: null as number | null,
  leadTimeWeeksMax: null as number | null,
  facilityCity: null as string | null,
  exportRegions: null as string[] | null,
  countriesShippedCount: null as number | null,
  certificationsLabel: null as string | null,
  yourStorySentence: null as string | null,
  producerFacilityFact: null as string | null,
  longTermPartnerFact: null as string | null,
  paymentTermsText: null as string | null,
  samplePolicyText: null as string | null,
  startingPriceExample: null as string | null,
  retainedSamplesMonths: null as number | null,
  arganBlendsList: null as string | null,
  blackSoapSizes: null as string | null,
  rhassoulSizes: null as string | null,
  roseWaterSizes: null as string | null,
  powdersSizes: null as string | null,

  coaEveryBatch: null as ConfigFlag,
  msdsProvided: null as ConfigFlag,
  retainedSamples: null as ConfigFlag,
  packagingInspection: null as ConfigFlag,
  designService: null as ConfigFlag,
  samplesAvailable: null as ConfigFlag,
};

export function flagVisible(flag: ConfigFlag): boolean {
  return flag === true;
}

export function visibleCount(flags: ConfigFlag[]): number {
  return flags.filter(flagVisible).length;
}

export function moqLabel(): string {
  return privateLabelConfig.minimumOrderUnits != null
    ? `${privateLabelConfig.minimumOrderUnits} units per product`
    : 'On request';
}

export function leadTimeLabel(): string {
  const { leadTimeWeeksMin, leadTimeWeeksMax } = privateLabelConfig;
  if (leadTimeWeeksMin != null && leadTimeWeeksMax != null) {
    return `${leadTimeWeeksMin}-${leadTimeWeeksMax} weeks`;
  }
  if (leadTimeWeeksMin != null) return `${leadTimeWeeksMin} weeks`;
  if (leadTimeWeeksMax != null) return `${leadTimeWeeksMax} weeks`;
  return 'On request';
}

export function leadTimeRangePhrase(): string | null {
  const { leadTimeWeeksMin, leadTimeWeeksMax } = privateLabelConfig;
  if (leadTimeWeeksMin != null && leadTimeWeeksMax != null) {
    return `${leadTimeWeeksMin}-${leadTimeWeeksMax} weeks`;
  }
  return null;
}

export function quoteResponseLabel(): string | null {
  if (privateLabelConfig.quoteResponseHours == null) return null;
  return `${privateLabelConfig.quoteResponseHours} hours`;
}

export function facilityCityLabel(): string {
  return privateLabelConfig.facilityCity ?? 'Morocco';
}
