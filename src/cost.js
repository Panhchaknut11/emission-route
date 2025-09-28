const COST_RATE = {
  WALKING:   { base: 0,   perKm: 0,    perHour: 0 },
  BICYCLING: { base: 0,   perKm: 0,    perHour: 1 },          // $1 per hour
  TRANSIT:   { base: 0,   perKm: 0.18, perHour: 0, min: 1.19, threshold: 3.2, max: 2.47 },
  DRIVING:   { base: 3.4, perKm: 0.65, perHour: 0 }           // $3.40 base + $0.65/km
};

/**
 * Estimate cost for a trip
 * @param {string} mode - DRIVING | TRANSIT | WALKING | BICYCLING
 * @param {number} durationMin - duration in minutes
 * @param {number} distanceKm - distance in km
 */
export function estimateCost(mode, durationMin, distanceKm) {
  const rate = COST_RATE[mode];
  if (!rate) return 0;

  let cost = 0;

  if (rate.base) cost += rate.base;
  if (rate.perKm && mode !== "TRANSIT") cost += distanceKm * rate.perKm;
  if (rate.perHour) cost += (durationMin / 60) * rate.perHour;

  // 🚇 Public Transport special rules
  if (mode === "TRANSIT") {
    if (distanceKm <= rate.threshold) {
      cost = rate.min;
    } else {
      const extraKm = distanceKm - rate.threshold;
      cost = rate.min + (extraKm * rate.perKm);
    }
    if (rate.max) {
      cost = Math.min(cost, rate.max);
    }
  }

  return cost;
}
