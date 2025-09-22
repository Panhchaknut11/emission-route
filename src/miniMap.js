import { BOUNDS } from "./places.js";

function project({ lat, lon }, width, height) {
  // Simple linear projection into the SVG viewBox
  const x = ((lon - BOUNDS.minLon) / (BOUNDS.maxLon - BOUNDS.minLon)) * width;
  const y = height - ((lat - BOUNDS.minLat) / (BOUNDS.maxLat - BOUNDS.minLat)) * height;
  return { x, y };
}

export function drawMiniMap(origin, destination) {
  const svg = document.getElementById("miniMap");
  const width = svg.viewBox.baseVal.width || 800;
  const height = svg.viewBox.baseVal.height || 600;

  // Clear
  while (svg.firstChild) svg.removeChild(svg.firstChild);

  // Background grid-ish
  const bg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  bg.setAttribute("x", 0); bg.setAttribute("y", 0);
  bg.setAttribute("width", width); bg.setAttribute("height", height);
  bg.setAttribute("fill", "#eef2f7");
  svg.appendChild(bg);

  const p1 = project(origin, width, height);
  const p2 = project(destination, width, height);

  // Route line (straight for prototype)
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", p1.x); line.setAttribute("y1", p1.y);
  line.setAttribute("x2", p2.x); line.setAttribute("y2", p2.y);
  line.setAttribute("stroke", "#2f7d32");
  line.setAttribute("stroke-width", 6);
  line.setAttribute("stroke-linecap", "round");
  svg.appendChild(line);

  // Markers
  const mk = (p, color) => {
    const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("cx", p.x); c.setAttribute("cy", p.y); c.setAttribute("r", 8);
    c.setAttribute("fill", color); c.setAttribute("stroke", "#fff"); c.setAttribute("stroke-width", 2);
    svg.appendChild(c);
  };
  mk(p1, "#1d4ed8"); // origin
  mk(p2, "#16a34a"); // destination
}
