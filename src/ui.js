import { estimateCalories } from "./calories.js";
import { estimateCost } from "./cost.js";

const MODE_LABEL = {
  DRIVING: "Car",
  BUS: "Bus",
  MRT: "MRT",
  BICYCLING: "Bicycle",
  WALKING: "Walking"
};

const MODE_ICON = {
  DRIVING: "🚗",
  BUS: "🚌",
  MRT: "🚇",        // or 🛤️ if you prefer
  BICYCLING: "🚴",
  WALKING: "🚶"
};


export function fillSelects(places) {
  const oSel = document.getElementById("origin");
  const dSel = document.getElementById("destination");
  oSel.innerHTML = ""; dSel.innerHTML = "";
  for (const p of places) {
    const opt = document.createElement("option");
    opt.value = p.id; opt.textContent = p.name;
    oSel.appendChild(opt);
    dSel.appendChild(opt.cloneNode(true));
  }
  if (oSel.querySelector('option[value="orchard_mrt"]')) oSel.value = "orchard_mrt";
  if (dSel.querySelector('option[value="marina_bay_sands"]')) dSel.value = "marina_bay_sands";
}

/**
 * Google-Maps-like list
 * @param {Array<{mode:string,distance_km:number,duration_min:number,emissions_g:number}>} items
 * @param {(item:any)=>void} onPreview
 * @param {string} selectedMode  // "BEST" | "DRIVING" | "TRANSIT" | "WALKING" | "BICYCLING"
 */

export function renderResults(items, onPreview, selectedMode) {
  const wrap = document.getElementById("results");
  wrap.innerHTML = "";
  if (!items || items.length === 0) {
    wrap.innerHTML = `<div class="card">No results</div>`;
    return;
  }

  const list = document.createElement("ul");
  list.className = "gm-results";

  items.forEach(item => {
    const li = document.createElement("li");
    li.className = "gm-result";
    li.tabIndex = 0;

    // LEFT
    const left = document.createElement("div");
    left.className = "gm-result__left";

    const icon = document.createElement("div");
    icon.className = "gm-result__icon";
    icon.textContent = MODE_ICON[item.mode] ?? "🧭";

    const body = document.createElement("div");
    body.className = "gm-result__body";

    const title = document.createElement("div");
    title.className = "gm-result__title";
    title.textContent = MODE_LABEL[item.mode] ?? item.mode;

    // 🔶 Impact chips: calories + cost
    const chips = document.createElement("div");
    chips.className = "gm-chips";

    const calories = calcCalories(item); // helper below
    const cost = calcCost(item);

    const calChip = document.createElement("span");
    calChip.className = "gm-chip gm-chip--cal";
    calChip.textContent = `${Math.round(calories)} Calories Burned`;

    const costChip = document.createElement("span");
    if (cost <= 0.0001) {
      costChip.className = "gm-chip gm-chip--free";
      costChip.textContent = "Free";
    } else {
      costChip.className = "gm-chip gm-chip--cost";
      costChip.textContent = `S$${cost.toFixed(2)}`;
    }

    chips.appendChild(calChip);
    chips.appendChild(costChip);

    body.appendChild(title);
    body.appendChild(chips);

    left.appendChild(icon);
    left.appendChild(body);

    // RIGHT — big emissions, then duration, then distance
    const right = document.createElement("div");
    right.className = "gm-result__right";

    const metric = document.createElement("div");
    metric.className = "gm-result__metric";
    metric.textContent = `${item.emissions_g.toLocaleString()} g CO₂`;

    const sub1 = document.createElement("div");
    sub1.className = "gm-result__sub";
    sub1.textContent = `~${item.duration_min} min`;

    const sub2 = document.createElement("div");
    sub2.className = "gm-result__sub";
    sub2.textContent = `${item.distance_km.toFixed(1)} km`;

    right.appendChild(metric);
    right.appendChild(sub1);
    right.appendChild(sub2);

    li.appendChild(left);
    li.appendChild(right);

    // Row click previews map
    li.addEventListener("click", () => onPreview(item));
    li.addEventListener("keypress", (e) => { if (e.key === "Enter") onPreview(item); });

    list.appendChild(li);
  });

  wrap.appendChild(list);
  onPreview(items[0]);
}

// --- tiny helpers using your new modules (import at top if in separate files) ---
function calcCalories(item) {
  return estimateCalories(item.mode, item.duration_min, item.distance_km);
}
function calcCost(item) {
  return estimateCost(item.mode, item.duration_min, item.distance_km);
}