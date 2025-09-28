const MODE_LABEL = {
  DRIVING: "Car",
  TRANSIT: "Public Transport",
  BICYCLING: "Bicycle",
  WALKING: "Walking"
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
 * @param {Array} comparisons
 * @param {(item:any)=>void} onSelect
 * @param {string} selectedMode  // "BEST" | "DRIVING" | "TRANSIT" | "WALKING" | "BICYCLING"
 */
export function renderResults(comparisons, onSelect, selectedMode) {
  const wrap = document.getElementById("results");
  wrap.innerHTML = "";

  if (!comparisons || comparisons.length === 0) {
    wrap.innerHTML = `<div class="card">No results</div>`;
    return;
  }

  const showBadge = selectedMode === "BEST";

  comparisons.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
    card.tabIndex = 0;

    const header = document.createElement("div");
    header.className = "row";

    const mode = document.createElement("div");
    mode.className = "mode";
    mode.textContent = MODE_LABEL[item.mode] ?? item.mode;
    header.appendChild(mode);

    if (showBadge) {
      const badge = document.createElement("span");
      badge.className = "badge";
      badge.textContent = "Lowest emissions";
      header.appendChild(badge);
    }

    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent =
      `${item.distance_km.toFixed(1)} km • ~${item.duration_min} min • ${item.emissions_g.toLocaleString()} g CO₂`;

    const hint = document.createElement("div");
    hint.className = "hint";
    hint.textContent = "Click to preview on the mini-map";

    card.appendChild(header);
    card.appendChild(meta);
    card.appendChild(hint);

    card.addEventListener("click", () => onSelect(item));
    card.addEventListener("keypress", e => { if (e.key === "Enter") onSelect(item); });

    wrap.appendChild(card);
  });

  // Auto-select the first rendered item
  onSelect(comparisons[0]);
}
