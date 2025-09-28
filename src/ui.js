const MODE_LABEL = {
  DRIVING: "Car",
  TRANSIT: "Public Transport",
  BICYCLING: "Bicycle",
  WALKING: "Walking"
};
const MODE_ICON = {
  DRIVING: "🚗",
  TRANSIT: "🚌",
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

    const desc = document.createElement("div");
    desc.className = "gm-result__desc";
    desc.textContent = `${item.distance_km.toFixed(1)} km • ${item.emissions_g.toLocaleString()} g CO₂`;

    const links = document.createElement("div");
    links.className = "gm-result__links";
    const preview = document.createElement("button");
    preview.type = "button";
    preview.className = "gm-link";
    preview.textContent = "Preview";
    preview.addEventListener("click", (e) => { e.stopPropagation(); onPreview(item); });
    links.appendChild(preview);

    body.appendChild(title);
    body.appendChild(desc);
    body.appendChild(links);
    left.appendChild(icon);
    left.appendChild(body);

    // RIGHT — emissions (big), duration, distance
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

    li.addEventListener("click", () => onPreview(item));
    li.addEventListener("keypress", (e) => { if (e.key === "Enter") onPreview(item); });

    list.appendChild(li);
  });

  wrap.appendChild(list);
  onPreview(items[0]);
}