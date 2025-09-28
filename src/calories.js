// calories.js
const CALORIES_PER_HOUR = {
  WALKING: 250,
  BICYCLING: 350,
  DRIVING: 170,   // driving still modeled specially
  BUS: 140,       // bus passenger
  MRT: 140        // rail passenger
};

export function estimateCalories(mode, durationMin, distanceKm) {
  if (!CALORIES_PER_HOUR[mode]) return 0;

  // Driving special: 170 cal per 48 km
  if (mode === "DRIVING") {
    return (170 / 48) * distanceKm;
  }

  const perHour = CALORIES_PER_HOUR[mode];
  return (durationMin / 60) * perHour;
}
