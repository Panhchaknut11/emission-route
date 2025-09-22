import { PLACES } from "./places.js";
import { haversineKm, approximateRoadKm } from "./geo.js";
import { estimateForModes } from "./emission.js";
import { fillSelects, renderResults } from "./ui.js";
import { drawMiniMap } from "./miniMap.js";

function getPlaceById(id) {
  return PLACES.find(p => p.id === id);
}

function compare() {
  const oId = document.getElementById("origin").value;
  const dId = document.getElementById("destination").value;
  if (oId === dId) return;

  const o = getPlaceById(oId);
  const d = getPlaceById(dId);

  // Distance (km): straight-line × road factor
  const straight = haversineKm(o.lat, o.lon, d.lat, d.lon);
  const km = approximateRoadKm(straight, 1.25);

  const comps = estimateForModes(km);

  // Update UI
  renderResults(comps, () => drawMiniMap(o, d));
}

function bootstrap() {
  fillSelects(PLACES);
  document.getElementById("go").addEventListener("click", compare);
  // initial render
  compare();
}

bootstrap();
