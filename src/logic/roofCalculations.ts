export interface RoofInput {
  roofSizeSqFt: number;
  pitch: 'low' | 'medium' | 'steep';
  material: 'asphalt' | 'metal' | 'tile' | 'slate';
  tearOffRequired: boolean;
  layers: '1' | '2+';
  complexity: 'simple' | 'average' | 'complex';
  locationIndex: 'low' | 'average' | 'high';
  includeGutters: boolean;
  includePermits: boolean;
}

export interface RoofResult {
  totalLow: number;
  totalHigh: number;
  costPerSqFtLow: number;
  costPerSqFtHigh: number;
  materialsLow: number;
  materialsHigh: number;
  laborLow: number;
  laborHigh: number;
  tearOffLow: number;
  tearOffHigh: number;
  permitsLow: number;
  permitsHigh: number;
  guttersLow: number;
  guttersHigh: number;
}

// Material costs per sq ft (low, high)
const MATERIAL_COSTS: Record<string, [number, number]> = {
  asphalt: [4, 7],
  metal: [7, 14],
  tile: [10, 20],
  slate: [15, 30]
};

// Tear-off adder per sq ft
const TEAROFF_COST: [number, number] = [1, 2];

// Extra layers adder per sq ft
const LAYERS_COST: [number, number] = [0.75, 1.50];

// Pitch multipliers
const PITCH_MULTIPLIER: Record<string, number> = {
  low: 1.0,
  medium: 1.10,
  steep: 1.25
};

// Complexity multipliers
const COMPLEXITY_MULTIPLIER: Record<string, number> = {
  simple: 1.0,
  average: 1.10,
  complex: 1.25
};

// Location index multipliers
const LOCATION_MULTIPLIER: Record<string, number> = {
  low: 0.90,
  average: 1.0,
  high: 1.20
};

// Flat adders
const PERMITS_DISPOSAL: [number, number] = [300, 900];
const GUTTERS: [number, number] = [800, 2500];

export function calculateRoofCost(input: RoofInput): RoofResult {
  const { roofSizeSqFt, pitch, material, tearOffRequired, layers, complexity, locationIndex, includeGutters, includePermits } = input;

  // 1) Get material base cost per sq ft
  const [matLow, matHigh] = MATERIAL_COSTS[material];

  // 2) Add tear-off cost if required
  let baseLow = matLow;
  let baseHigh = matHigh;
  let tearOffLow = 0;
  let tearOffHigh = 0;

  if (tearOffRequired) {
    tearOffLow = TEAROFF_COST[0] * roofSizeSqFt;
    tearOffHigh = TEAROFF_COST[1] * roofSizeSqFt;
    baseLow += TEAROFF_COST[0];
    baseHigh += TEAROFF_COST[1];
  }

  // 3) Add extra layers cost
  if (layers === '2+') {
    baseLow += LAYERS_COST[0];
    baseHigh += LAYERS_COST[1];
  }

  // 4) Apply multipliers: pitch * complexity * location
  const pitchMult = PITCH_MULTIPLIER[pitch];
  const complexMult = COMPLEXITY_MULTIPLIER[complexity];
  const locMult = LOCATION_MULTIPLIER[locationIndex];
  const combinedMult = pitchMult * complexMult * locMult;

  const adjLow = baseLow * combinedMult;
  const adjHigh = baseHigh * combinedMult;

  // 5) Calculate roof portion total
  const roofPortionLow = adjLow * roofSizeSqFt;
  const roofPortionHigh = adjHigh * roofSizeSqFt;

  // 6) Add flat adders
  let permitsLow = 0;
  let permitsHigh = 0;
  if (includePermits) {
    permitsLow = PERMITS_DISPOSAL[0];
    permitsHigh = PERMITS_DISPOSAL[1];
  }

  let guttersLow = 0;
  let guttersHigh = 0;
  if (includeGutters) {
    guttersLow = GUTTERS[0];
    guttersHigh = GUTTERS[1];
  }

  // 7) Total costs
  const totalLow = roofPortionLow + permitsLow + guttersLow;
  const totalHigh = roofPortionHigh + permitsHigh + guttersHigh;

  // 8) Cost per sq ft
  const costPerSqFtLow = roofSizeSqFt > 0 ? totalLow / roofSizeSqFt : 0;
  const costPerSqFtHigh = roofSizeSqFt > 0 ? totalHigh / roofSizeSqFt : 0;

  // 9) Breakdown: materials 45%, labor 55% of roof portion
  const materialsLow = roofPortionLow * 0.45;
  const materialsHigh = roofPortionHigh * 0.45;
  const laborLow = roofPortionLow * 0.55;
  const laborHigh = roofPortionHigh * 0.55;

  return {
    totalLow: Math.round(totalLow),
    totalHigh: Math.round(totalHigh),
    costPerSqFtLow: Math.round(costPerSqFtLow * 100) / 100,
    costPerSqFtHigh: Math.round(costPerSqFtHigh * 100) / 100,
    materialsLow: Math.round(materialsLow),
    materialsHigh: Math.round(materialsHigh),
    laborLow: Math.round(laborLow),
    laborHigh: Math.round(laborHigh),
    tearOffLow: Math.round(tearOffLow),
    tearOffHigh: Math.round(tearOffHigh),
    permitsLow,
    permitsHigh,
    guttersLow,
    guttersHigh
  };
}
