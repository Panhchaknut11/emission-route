export function fillSelects(places) {
  const oSel = document.getElementById("origin");
  const dSel = document.getElementById("destination");
  for (const p of places) {
    const o = document.createElement("option"); o.value = p.id; o.textContent = p.name;
    const d = document.createElement("option"); d.value = p.id; d.textContent = p.name;
    oSel.appendChild(o); dSel.appendChild(d);
  }
  // Prefill a nice demo
  oSel.value = "orchard_mrt";
  dSel.value = "marina_bay_sands";
}

export function renderResults(comparisons, onSelect) {
  const wrap = document.getElementById("results");
  wrap.innerHTML = "";

  if (!comparisons.length) {
    wrap.innerHTML = `<div class="card">No results</div>`;
    return;
  }

  const best = comparisons.reduce((a, b) => (a.emissions_g < b.emissions_g ? a : b));

  comparisons
    .sort((a,b) => a.emissions_g - b.emissions_g)
    .forEach(item => {
      const card = document.createElement("div");
      const isBest = item === best;
      card.className = `card ${isBest ? "best" : ""}`;
      const label = modePretty(item.mode);
      const badge = isBest ? `<span class="badge">Lowest emissions</span>` : "";
      card.innerHTML = `
        <div class="row">
          <div class="mode">${label}</div>
          ${badge}
        </div>
        <div class="meta">${item.distance_km.toFixed(1)} km • ~${item.duration_min} min • ${item.emissions_g.toLocaleString()} g CO₂</div>
        <div class="hint">Click to preview on the mini-map</div>
      `;
      card.addEventListener("click", () => onSelect(item));
      wrap.appendChild(card);
    });

  // Auto-select best
  onSelect(best);
}

function modePretty(m) {
  switch (m) {
    case "DRIVING": return "Car";
    case "TRANSIT": return "Public Transport";
    case "BICYCLING": return "Bicycle";
    case "WALKING":  return "Walk";
    default: return m;
  }
}
