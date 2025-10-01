const COST_RULES = {
  // cars
  DIESEL_CAR: { base: 3.4, perKm: 0.65 },
  EV_CAR:     { base: 3.4, perKm: 0.45 }, 
  // transit
  BUS: { min: 1.19, perKm: 0.18, threshold: 3.2, max: 2.47 },
  MRT: { min: 1.19, perKm: 0.18, threshold: 3.2, max: 2.47 },
  // active
  BICYCLING: { perHour: 1 },
  WALKING:   { }
};

export function estimateCost(mode, durationMin, distanceKm) {
  const r = COST_RULES[mode];
  if (!r) return 0;

  if (mode === "DIESEL_CAR" || mode === "EV_CAR") {
    return r.base + distanceKm * r.perKm;
  }
  if (mode === "BICYCLING") return (durationMin / 60) * r.perHour;
  if (mode === "WALKING") return 0;

  if (mode === "BUS" || mode === "MRT") {
    const base = distanceKm <= r.threshold ? r.min : r.min + (distanceKm - r.threshold) * r.perKm;
    return Math.min(base, r.max);
  }
  return 0;
}
