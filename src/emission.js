export const EMISSION_FACTORS = {
  DRIVING: 180,   // g CO2 / km
  BUS: 80,
  RAIL: 45,
  DEFAULT_TRANSIT: 60,
  WALKING: 0,
  BICYCLING: 0
};

// Simple speeds (km/h) for prototype duration calculations
export const SPEEDS = {
  DRIVING: 35,
  TRANSIT: 25,     // averaged bus+rail
  BICYCLING: 15,
  WALKING: 4.5
};

export function estimateForModes(km) {
  const modes = [
    { mode: "DRIVING", factor: EMISSION_FACTORS.DRIVING, speed: SPEEDS.DRIVING },
    { mode: "TRANSIT", factor: EMISSION_FACTORS.DEFAULT_TRANSIT, speed: SPEEDS.TRANSIT },
    { mode: "BICYCLING", factor: EMISSION_FACTORS.BICYCLING, speed: SPEEDS.BICYCLING },
    { mode: "WALKING", factor: EMISSION_FACTORS.WALKING, speed: SPEEDS.WALKING }
  ];

  return modes.map(m => {
    const grams = km * m.factor;
    const mins = (km / m.speed) * 60;
    return {
      mode: m.mode,
      distance_km: km,
      duration_min: Math.round(mins),
      emissions_g: Math.round(grams)
    };
  });
}
