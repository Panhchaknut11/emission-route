const CALORIES_PER_HOUR = {
  WALKING: 250,
  BICYCLING: 350,
  DRIVING: 170,        // based on "170 calories to drive 30 miles in an hour"
  TRANSIT: 140
};

/**
 * Estimate calories burned for a trip
 * @param {string} mode - DRIVING | TRANSIT | WALKING | BICYCLING
 * @param {number} durationMin - duration in minutes
 * @param {number} distanceKm - distance in km
 */
export function estimateCalories(mode, durationMin, distanceKm) {
  if (!CALORIES_PER_HOUR[mode]) return 0;

  // driving special case: ~170 calories per 30 miles (48 km)
  if (mode === "DRIVING") {
    const hours = durationMin / 60;
    return (170 / 48) * distanceKm; // scale by distance
  }

  const perHour = CALORIES_PER_HOUR[mode];
  return (durationMin / 60) * perHour;
}
