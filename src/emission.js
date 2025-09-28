export const EMISSION_FACTORS = {
  DRIVING: 170,   // g CO2 / km
  BUS: 70,
  MRT: 13,
  WALKING: 0,
  BICYCLING: 0
};

// Speeds (km/h) for prototype duration calculations
export const SPEEDS = {
  DRIVING: 35,
  BUS: 22,        // average city bus speed
  MRT: 35,        // average MRT speed
  BICYCLING: 15,
  WALKING: 4.5
};

export function estimateForModes(km) {
  const modes = [
    { mode: "DRIVING", factor: EMISSION_FACTORS.DRIVING, speed: SPEEDS.DRIVING },
    { mode: "BUS",     factor: EMISSION_FACTORS.BUS,     speed: SPEEDS.BUS },
    { mode: "MRT",     factor: EMISSION_FACTORS.MRT,     speed: SPEEDS.MRT },
    { mode: "BICYCLING", factor: EMISSION_FACTORS.BICYCLING, speed: SPEEDS.BICYCLING },
    { mode: "WALKING",   factor: EMISSION_FACTORS.WALKING,   speed: SPEEDS.WALKING }
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
