// cost.js
const COST_RULES = {
  WALKING: { base: 0, perKm: 0, perHour: 0 },
  BICYCLING: { base: 0, perKm: 0, perHour: 1 },
  DRIVING: { base: 3.4, perKm: 0.65, perHour: 0 },
  BUS: { min: 1.19, perKm: 0.18, threshold: 3.2, max: 2.47 },
  MRT: { min: 1.19, perKm: 0.18, threshold: 3.2, max: 2.47 }
};

export function estimateCost(mode, durationMin, distanceKm) {
  const r = COST_RULES[mode];
  if (!r) return 0;

  // Driving
  if (mode === "DRIVING") {
    return r.base + distanceKm * r.perKm;
  }

  // Cycling
  if (mode === "BICYCLING") {
    return (durationMin / 60) * r.perHour;
  }

  // Walking is free
  if (mode === "WALKING") return 0;

  // Bus & MRT
  if (mode === "BUS" || mode === "MRT") {
    let cost;
    if (distanceKm <= r.threshold) {
      cost = r.min;
    } else {
      cost = r.min + (distanceKm - r.threshold) * r.perKm;
    }
    return Math.min(cost, r.max);
  }

  return 0;
}
