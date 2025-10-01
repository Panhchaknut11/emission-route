import { PLACES } from "./places.js";
import { haversineKm, approximateRoadKm } from "./geo.js";
import { estimateForModes } from "./emission.js";
import { fillSelects, renderResults } from "./ui.js";
import { drawMiniMap } from "./miniMap.js";

function getPlaceById(id) {
  return PLACES.find(p => p.id === id);
}

function compare(selectedMode) {
  const oId = document.getElementById("origin").value;
  const dId = document.getElementById("destination").value;
  if (!oId || !dId || oId === dId) return;

  const o = getPlaceById(oId);
  const d = getPlaceById(dId);

  const straight = haversineKm(o.lat, o.lon, d.lat, d.lon);
  const km = approximateRoadKm(straight, 1.25);

  const comps = estimateForModes(km);

  // rank by emissions (ascending) and remember rank
  const ranked = [...comps]
    .sort((a, b) => a.emissions_g - b.emissions_g)
    .map((c, i) => ({ ...c, _rank: i + 1 }));

  let display;
  switch (selectedMode) {
    case "BEST":
      display = ranked.slice(0, 3);
      break;
    case "TRANSIT":
      display = ranked.filter(c => c.mode === "BUS" || c.mode === "MRT");
      break;
    case "DRIVING":                     
      display = ranked.filter(c => c.mode === "DIESEL_CAR" || c.mode === "EV_CAR");
      break;
    default:
      display = ranked.filter(c => c.mode === selectedMode);
  }

  renderResults(display, () => drawMiniMap(o, d), selectedMode);
}

function setActiveTab(clicked) {
  const tabs = document.querySelectorAll(".gm-tab");
  tabs.forEach(t => {
    t.classList.remove("is-active");
    t.setAttribute("aria-selected", "false");
  });
  clicked.classList.add("is-active");
  clicked.setAttribute("aria-selected", "true");
}

function setupTabs() {
  const tabs = document.querySelectorAll(".gm-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      setActiveTab(tab);
      compare(tab.dataset.mode);
    });
  });

  // Default active tab (choose what you prefer)
  const defaultTab = document.querySelector('.gm-tab[data-mode="TRANSIT"]') || tabs[0];
  if (defaultTab) {
    setActiveTab(defaultTab);
  }
}

function bootstrap() {
  fillSelects(PLACES);
  document.getElementById("go").addEventListener("click", () => {
    // Re-run using whichever tab is active
    const active = document.querySelector(".gm-tab.is-active");
    const mode = active ? active.dataset.mode : undefined;
    compare(mode);
  });

  setupTabs();
  // Initial render using default active tab
  const active = document.querySelector(".gm-tab.is-active");
  compare(active ? active.dataset.mode : undefined);
}

document.getElementById('swap')?.addEventListener('click', () => {
  const o = document.getElementById('origin');
  const d = document.getElementById('destination');
  [o.value, d.value] = [d.value, o.value];

  // Re-run compare with the current active mode
  const active = document.querySelector('.gm-tab.is-active');
  const mode = active ? active.dataset.mode : undefined;
  compare(mode);
});



bootstrap();
