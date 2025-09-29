const CALORIES_PER_HOUR = {
  WALKING: 250,
  BICYCLING: 350,
  BUS: 140,
  MRT: 140
};

export function estimateCalories(mode, durationMin, distanceKm) {
  if (mode === "DIESEL_CAR" || mode === "EV_CAR") {
    // same driving calorie model as before
    return (170 / 48) * distanceKm;
  }
  const perHour = CALORIES_PER_HOUR[mode];
  return perHour ? (durationMin / 60) * perHour : 0;
}
