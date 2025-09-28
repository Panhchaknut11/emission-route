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

  // Distance (km): straight-line × road factor
  const straight = haversineKm(o.lat, o.lon, d.lat, d.lon);
  const km = approximateRoadKm(straight, 1.25);

  // All modes for this OD pair
  const comps = estimateForModes(km);

  // Global lowest-emissions mode
  const bestOverall = comps.reduce((min, c) =>
    c.emissions_g < min.emissions_g ? c : min, comps[0]
  );

  let display;
  if (selectedMode === "BEST") {
    display = [bestOverall];   // show only the lowest
  } else if (selectedMode) {
    display = comps.filter(c => c.mode === selectedMode);
  } else {
    display = comps;
  }

  // inside compare(selectedMode)
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
