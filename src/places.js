// A tiny set of SG places with lat/lng for distance calculations
// A set of SG places with lat/lng for distance calculations
export const PLACES = [
  { id: "orchard_mrt", name: "Orchard MRT", lat: 1.3039, lon: 103.8318 },
  { id: "marina_bay_sands", name: "Marina Bay Sands", lat: 1.2834, lon: 103.8607 },
  { id: "changi_airport", name: "Changi Airport", lat: 1.3644, lon: 103.9915 },
  { id: "yio_chu_kang_stadium", name: "Yio Chu Kang Stadium", lat: 1.3816, lon: 103.8440 },
  { id: "waterway_point", name: "Waterway Point", lat: 1.4065, lon: 103.9023 },
  { id: "newton_food_centre", name: "Newton Food Centre", lat: 1.3126, lon: 103.8395 },
  { id: "ikea_tampines", name: "IKEA Tampines", lat: 1.3721, lon: 103.9296 },
  { id: "smu_cis", name: "SMU College of Integrative Studies", lat: 1.2965, lon: 103.8500 },
  { id: "smu_economics", name: "SMU School of Economics", lat: 1.2968, lon: 103.8496 },
  { id: "one_holland_village", name: "One Holland Village Residence", lat: 1.3111, lon: 103.7960 }
];

// Bounds for a crude SVG “map” (min/max lat/lon around SG)
export const BOUNDS = {
  minLat: 1.245,
  maxLat: 1.44,
  minLon: 103.60,
  maxLon: 104.03
};
