// A tiny set of SG places with lat/lng for distance calculations
export const PLACES = [
  { id: "orchard_mrt", name: "Orchard MRT",        lat: 1.3039,  lon: 103.8318 },
  { id: "marina_bay_sands", name: "Marina Bay Sands", lat: 1.2834,  lon: 103.8607 },
  { id: "changi_airport", name: "Changi Airport",   lat: 1.3644,  lon: 103.9915 },
  { id: "tampines_mrt",  name: "Tampines MRT",     lat: 1.3530,  lon: 103.9450 },
  { id: "clementi_mrt",  name: "Clementi MRT",     lat: 1.3150,  lon: 103.7647 },
  { id: "nus_utown",     name: "NUS UTown",        lat: 1.3041,  lon: 103.7722 }
];

// Bounds for a crude SVG “map” (min/max lat/lon around SG)
export const BOUNDS = {
  minLat: 1.245, maxLat: 1.44,
  minLon: 103.60, maxLon: 104.03
};
