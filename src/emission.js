export const EMISSION_FACTORS = {
  DIESEL_CAR: 170,   
  EV_CAR: 75,        
  BUS: 70,
  MRT: 13,
  WALKING: 0,
  BICYCLING: 0
};

export const SPEEDS = {
  DIESEL_CAR: 35,
  EV_CAR: 35,
  BUS: 22,
  MRT: 35,
  BICYCLING: 15,
  WALKING: 4.5
};

export function estimateForModes(km) {
  const modes = [
    { mode: "DIESEL_CAR", factor: EMISSION_FACTORS.DIESEL_CAR, speed: SPEEDS.DIESEL_CAR },
    { mode: "EV_CAR",     factor: EMISSION_FACTORS.EV_CAR,     speed: SPEEDS.EV_CAR },
    { mode: "BUS",        factor: EMISSION_FACTORS.BUS,        speed: SPEEDS.BUS },
    { mode: "MRT",        factor: EMISSION_FACTORS.MRT,        speed: SPEEDS.MRT },
    { mode: "BICYCLING",  factor: EMISSION_FACTORS.BICYCLING,  speed: SPEEDS.BICYCLING },
    { mode: "WALKING",    factor: EMISSION_FACTORS.WALKING,    speed: SPEEDS.WALKING }
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
