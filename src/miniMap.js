// miniMap.js
import { BOUNDS } from "./places.js";

const NSL_COLOR = "#d93025"; // red
const EWL_COLOR = "#188038"; // green
const CCL_COLOR = "#f29900"; // orange

function project({ lat, lon }, width, height) {
  const x = ((lon - BOUNDS.minLon) / (BOUNDS.maxLon - BOUNDS.minLon)) * width;
  const y = height - ((lat - BOUNDS.minLat) / (BOUNDS.maxLat - BOUNDS.minLat)) * height;
  return { x, y };
}
function pLL(lat, lon, w, h) { return project({ lat, lon }, w, h); }

function polyline(svg, pts, stroke, width, dash = null, opacity = 1) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  el.setAttribute("points", pts.map(p => `${p.x},${p.y}`).join(" "));
  el.setAttribute("fill", "none");
  el.setAttribute("stroke", stroke);
  el.setAttribute("stroke-width", width);
  el.setAttribute("stroke-linecap", "round");
  el.setAttribute("stroke-linejoin", "round");
  if (dash) el.setAttribute("stroke-dasharray", dash);
  if (opacity !== 1) el.setAttribute("opacity", opacity);
  svg.appendChild(el);
  return el;
}
function polygon(svg, pts, fill, opacity = 1, stroke = null) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  el.setAttribute("points", pts.map(p => `${p.x},${p.y}`).join(" "));
  el.setAttribute("fill", fill);
  if (stroke) el.setAttribute("stroke", stroke);
  if (opacity !== 1) el.setAttribute("opacity", opacity);
  svg.appendChild(el);
  return el;
}
function circle(svg, cx, cy, r, fill, stroke = null, sw = 0, opacity = 1) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  el.setAttribute("cx", cx); el.setAttribute("cy", cy); el.setAttribute("r", r);
  el.setAttribute("fill", fill);
  if (stroke) { el.setAttribute("stroke", stroke); el.setAttribute("stroke-width", sw); }
  if (opacity !== 1) el.setAttribute("opacity", opacity);
  svg.appendChild(el);
  return el;
}
function text(svg, x, y, label, fill="#5f6368", size=11, anchor="start") {
  const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
  t.setAttribute("x", x); t.setAttribute("y", y);
  t.setAttribute("fill", fill);
  t.setAttribute("font-size", size);
  t.setAttribute("font-family", "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif");
  t.setAttribute("text-anchor", anchor);
  t.textContent = label;
  svg.appendChild(t);
  return t;
}

export function drawMiniMap(origin, destination) {
  const svg = document.getElementById("miniMap");
  const width = svg.viewBox.baseVal.width || 800;
  const height = svg.viewBox.baseVal.height || 600;

  // Clear
  while (svg.firstChild) svg.removeChild(svg.firstChild);

  // Land
  const land = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  land.setAttribute("x", 0); land.setAttribute("y", 0);
  land.setAttribute("width", width); land.setAttribute("height", height);
  land.setAttribute("fill", "#f8f9fb");
  svg.appendChild(land);

  // Singapore Strait (east/right side)
  const sea = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  sea.setAttribute("x", width * 0.74);
  sea.setAttribute("y", 0);
  sea.setAttribute("width", width * 0.26);
  sea.setAttribute("height", height);
  sea.setAttribute("fill", "#d6ebff");
  svg.appendChild(sea);

  // Subtle grid
  for (let i = 1; i < 8; i++) {
    const v = document.createElementNS("http://www.w3.org/2000/svg", "line");
    v.setAttribute("x1", (i / 8) * width);
    v.setAttribute("y1", 0);
    v.setAttribute("x2", (i / 8) * width);
    v.setAttribute("y2", height);
    v.setAttribute("stroke", "#e9edf2");
    v.setAttribute("stroke-width", 1);
    svg.appendChild(v);
  }
  for (let j = 1; j < 6; j++) {
    const h = document.createElementNS("http://www.w3.org/2000/svg", "line");
    h.setAttribute("x1", 0);
    h.setAttribute("y1", (j / 6) * height);
    h.setAttribute("x2", width);
    h.setAttribute("y2", (j / 6) * height);
    h.setAttribute("stroke", "#eef2f6");
    h.setAttribute("stroke-width", 1);
    svg.appendChild(h);
  }

  // --- Green spaces / parks (very approximate) ---
  // Central Catchment Nature Reserve
  polygon(svg, [
    pLL(1.410,103.800,width,height),
    pLL(1.410,103.845,width,height),
    pLL(1.370,103.860,width,height),
    pLL(1.335,103.840,width,height),
    pLL(1.350,103.800,width,height)
  ], "#caefcf", 1, "#b7e5bd");

  // East Coast Park (strip)
  polygon(svg, [
    pLL(1.300,103.880,width,height),
    pLL(1.300,103.970,width,height),
    pLL(1.285,103.970,width,height),
    pLL(1.285,103.880,width,height)
  ], "#d8f4db", 1, "#c2eec7");

  // Singapore Botanic Gardens area
  polygon(svg, [
    pLL(1.317,103.816,width,height),
    pLL(1.317,103.822,width,height),
    pLL(1.310,103.822,width,height),
    pLL(1.310,103.816,width,height)
  ], "#dff5e2", 1, "#cfeecd");

  // --- Water bodies / reservoirs ---
  circle(svg, pLL(1.342,103.832,width,height).x, pLL(1.342,103.832,width,height).y, 40, "#cbe4ff", "#b8dafb", 1);
  circle(svg, pLL(1.405,103.823,width,height).x, pLL(1.405,103.823,width,height).y, 28, "#cbe4ff", "#b8dafb", 1);
  circle(svg, pLL(1.405,103.805,width,height).x, pLL(1.405,103.805,width,height).y, 26, "#cbe4ff", "#b8dafb", 1);
  // Marina Bay (oval)
  circle(svg, pLL(1.285,103.860,width,height).x, pLL(1.285,103.860,width,height).y, 38, "#cbe4ff", "#b8dafb", 1, 0.9);

  // --- CBD tint ---
  polygon(svg, [
    pLL(1.296,103.847,width,height),
    pLL(1.300,103.867,width,height),
    pLL(1.284,103.870,width,height),
    pLL(1.278,103.850,width,height)
  ], "#f2f4f7", 1);

  // --- Expressways (very rough) ---
  const roadStroke = "#cfd6de";
  polyline(svg, [ // PIE
    pLL(1.350,103.710,width,height),
    pLL(1.345,103.760,width,height),
    pLL(1.345,103.820,width,height),
    pLL(1.340,103.900,width,height),
    pLL(1.340,103.960,width,height)
  ], roadStroke, 3);

  polyline(svg, [ // ECP
    pLL(1.290,103.860,width,height),
    pLL(1.295,103.900,width,height),
    pLL(1.300,103.960,width,height)
  ], roadStroke, 3);

  polyline(svg, [ // CTE
    pLL(1.300,103.845,width,height),
    pLL(1.330,103.844,width,height),
    pLL(1.360,103.843,width,height),
    pLL(1.390,103.842,width,height)
  ], roadStroke, 3);

  polyline(svg, [ // AYE
    pLL(1.275,103.740,width,height),
    pLL(1.280,103.780,width,height),
    pLL(1.285,103.820,width,height),
    pLL(1.290,103.860,width,height)
  ], roadStroke, 3);

  polyline(svg, [ // SLE
    pLL(1.410,103.780,width,height),
    pLL(1.410,103.820,width,height),
    pLL(1.405,103.860,width,height)
  ], roadStroke, 3);

  polyline(svg, [ // TPE
    pLL(1.400,103.910,width,height),
    pLL(1.405,103.950,width,height),
    pLL(1.405,103.990,width,height)
  ], roadStroke, 3);

  // --- MRT lines (rough) ---
  polyline(svg, [ // NSL (red)
    pLL(1.430,103.835,width,height),
    pLL(1.385,103.845,width,height),
    pLL(1.352,103.844,width,height),
    pLL(1.335,103.843,width,height),
    pLL(1.305,103.832,width,height),
    pLL(1.300,103.845,width,height),
    pLL(1.285,103.852,width,height)
  ], NSL_COLOR, 2.5, null, 0.9);

  polyline(svg, [ // EWL (green)
    pLL(1.320,103.700,width,height),
    pLL(1.320,103.760,width,height),
    pLL(1.312,103.820,width,height),
    pLL(1.305,103.860,width,height),
    pLL(1.302,103.920,width,height),
    pLL(1.310,103.980,width,height)
  ], EWL_COLOR, 2.5, null, 0.9);

  polyline(svg, [ // CCL (orange loop-ish)
    pLL(1.290,103.820,width,height),
    pLL(1.305,103.830,width,height),
    pLL(1.315,103.850,width,height),
    pLL(1.305,103.870,width,height),
    pLL(1.290,103.865,width,height),
    pLL(1.285,103.845,width,height),
    pLL(1.290,103.820,width,height)
  ], CCL_COLOR, 2.5, "6 4", 0.9);

  // Labels (a few anchor points)
  text(svg, pLL(1.34,103.83,width,height).x + 6, pLL(1.34,103.83,width,height).y - 8, "MacRitchie", "#3c4043", 11);
  text(svg, pLL(1.30,103.90,width,height).x, pLL(1.30,103.90,width,height).y + 14, "East Coast Park", "#3c4043", 11, "middle");
  text(svg, pLL(1.285,103.860,width,height).x, pLL(1.285,103.860,width,height).y - 10, "Marina Bay", "#3c4043", 11, "middle");

  // --- Route & markers ---
  const p1 = project(origin, width, height);
  const p2 = project(destination, width, height);

  // Outer glow for route (nice visibility)
  polyline(svg, [p1, p2], "#1e7f34", 8, null, 0.25);
  // Actual route
  polyline(svg, [p1, p2], "#2f7d32", 5);

  // Markers
  const m1 = circle(svg, p1.x, p1.y, 7, "#1d4ed8", "#fff", 2);
  const m2 = circle(svg, p2.x, p2.y, 7, "#16a34a", "#fff", 2);
  // Small shadows for markers
  m1.setAttribute("filter", "url(#none)");
  m2.setAttribute("filter", "url(#none)");
}
