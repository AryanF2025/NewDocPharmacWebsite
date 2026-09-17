import { useMemo, useRef } from "react";
import { useInView } from "motion/react";
import clsx from "clsx";
import { INDIA_DOTS, INDIA_OUTLINE, INDIA_VIEWBOX, projectIndia } from "@/data/indiaMap";

/**
 * Coverage map on the official India boundary (see src/data/indiaMap.js).
 *
 * Coverage starts at the darkstore cities and reaches every corner:
 *   1. the outline draws and each city lights up in turn,
 *   2. blue waves ripple outward from every city across the country,
 *   3. green delivery lines run from each city to destinations across the whole
 *      of India, each with a rider travelling it; destinations pulse on arrival.
 * Every line is checked point by point to stay over land; North-East routes go
 * through the Siliguri corridor. `active` highlights one city.
 */

export const COVERAGE_CITIES = [
  { name: "Delhi NCR", lon: 77.21, lat: 28.61 },
  { name: "Mumbai", lon: 72.88, lat: 19.08 },
  { name: "Bengaluru", lon: 77.59, lat: 12.97 },
  { name: "Hyderabad", lon: 78.49, lat: 17.39 },
  { name: "Chennai", lon: 80.27, lat: 13.08 },
  { name: "Pune", lon: 73.86, lat: 18.52 },
  { name: "Kolkata", lon: 88.36, lat: 22.57 },
];

/** Siliguri corridor — the land bridge to the North-East. */
const SILIGURI = { lon: 88.43, lat: 26.73 };
/** Malda, West Bengal — on the land route north from Kolkata. */
const MALDA = { lon: 88.14, lat: 25.0 };

const WAVE_SECONDS = 5.2;
const GRID = 10.5; // spacing of the dot grid in src/data/indiaMap.js
const LONGEST_LINE = 420; // map units; scales line timing

export function IndiaCoverageMap({ active, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  const model = useMemo(() => {
    const [sx, sy] = projectIndia(SILIGURI.lon, SILIGURI.lat);

    const cities = COVERAGE_CITIES.map((c, i) => {
      const [x, y] = projectIndia(c.lon, c.lat);
      return { ...c, x, y, appear: 0.9 + i * 0.18 };
    });

    const dots = INDIA_DOTS.map(([x, y]) => ({
      x,
      y,
      nearCity: Math.min(...cities.map((c) => Math.hypot(c.x - x, c.y - y))),
    }));
    const maxNear = Math.max(...dots.map((d) => d.nearCity));

    // Fast land test: the dots sit on a regular grid, so look up nearby cells.
    const cells = new Set(dots.map((d) => `${Math.round(d.x / GRID)},${Math.round(d.y / GRID)}`));
    const onLand = (x, y) => {
      const gx = Math.round(x / GRID);
      const gy = Math.round(y / GRID);
      return (
        cells.has(`${gx},${gy}`) &&
        (cells.has(`${gx + 1},${gy}`) || cells.has(`${gx - 1},${gy}`) || cells.has(`${gx},${gy + 1}`) || cells.has(`${gx},${gy - 1}`))
      );
    };
    const quad = (a, q, b, u) => (1 - u) * (1 - u) * a + 2 * (1 - u) * u * q + u * u * b;
    const segmentOnLand = (x1, y1, qx, qy, x2, y2) => {
      for (let u = 0.05; u < 0.97; u += 0.05) if (!onLand(quad(x1, qx, x2, u), quad(y1, qy, y2, u))) return false;
      return true;
    };
    const control = (x1, y1, x2, y2, bend) => {
      const len = Math.hypot(x2 - x1, y2 - y1) || 1;
      return [(x1 + x2) / 2 + (-(y2 - y1) / len) * len * bend, (y1 + y2) / 2 + ((x2 - x1) / len) * len * bend];
    };
    const BENDS = [0.12, -0.12, 0, 0.24, -0.24, 0.36, -0.36];
    const f = (n) => n.toFixed(1);

    /** A gently curved path that stays over land, or null. */
    const landPath = (x1, y1, x2, y2) => {
      for (const bend of BENDS) {
        const [qx, qy] = control(x1, y1, x2, y2, bend);
        if (segmentOnLand(x1, y1, qx, qy, x2, y2)) return `M${f(x1)} ${f(y1)} Q${f(qx)} ${f(qy)} ${f(x2)} ${f(y2)}`;
      }
      return null;
    };

    // Destinations spread across the whole country: one per region cell, away
    // from the cities, mainland only (island routes would cross the sea).
    const CELL = 52;
    const buckets = new Map();
    for (const d of dots) {
      if (d.nearCity < 40) continue;
      const neighbours = dots.filter((o) => Math.hypot(o.x - d.x, o.y - d.y) < GRID * 1.6).length;
      if (neighbours < 4) continue;
      const gx = Math.floor(d.x / CELL);
      const gy = Math.floor(d.y / CELL);
      const score = Math.hypot(d.x - (gx + 0.5) * CELL, d.y - (gy + 0.5) * CELL);
      const key = `${gx},${gy}`;
      const best = buckets.get(key);
      if (!best || score < best.score) buckets.set(key, { ...d, score });
    }

    // The North-East is served from Kolkata: north along West Bengal via Malda,
    // through the Siliguri corridor, then east. That strip is too narrow for the
    // grid test, so its first two legs are fixed waypoints.
    const kolkata = cities.find((c) => c.name === "Kolkata");
    const [mx, my] = projectIndia(MALDA.lon, MALDA.lat);

    const reach = [];
    for (const dest of buckets.values()) {
      const northEast = dest.x > sx + 12 && dest.y < sy + 40;
      const byDistance = northEast
        ? [kolkata]
        : [...cities].sort((a, b) => Math.hypot(a.x - dest.x, a.y - dest.y) - Math.hypot(b.x - dest.x, b.y - dest.y));

      for (const city of byDistance.slice(0, 3)) {
        let d = null;
        let length = Math.hypot(dest.x - city.x, dest.y - city.y);
        if (northEast) {
          const last = landPath(sx, sy, dest.x, dest.y) ?? `M${f(sx)} ${f(sy)} L${f(dest.x)} ${f(dest.y)}`;
          const tail = last.includes("Q") ? last.slice(last.indexOf("Q")) : last.slice(last.indexOf("L"));
          d = `M${f(city.x)} ${f(city.y)} Q${f(mx + 6)} ${f((city.y + my) / 2)} ${f(mx)} ${f(my)} L${f(sx)} ${f(sy)} ${tail}`;
          length = Math.hypot(mx - city.x, my - city.y) + Math.hypot(sx - mx, sy - my) + Math.hypot(dest.x - sx, dest.y - sy);
        } else {
          d = landPath(city.x, city.y, dest.x, dest.y);
        }
        if (!d) continue;
        const begin = city.appear + 0.5 + (length / LONGEST_LINE) * 2.2;
        const duration = 1.6 + (length / LONGEST_LINE) * 2.4;
        reach.push({ id: `reach-${reach.length}`, city: city.name, d, x: dest.x, y: dest.y, begin, duration });
        break;
      }
    }

    return { cities, dots, maxNear, reach };
  }, []);

  const { cities, dots, maxNear, reach } = model;
  const dim = (city) => (active && active !== city ? 0.1 : 1);

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${INDIA_VIEWBOX.width} ${INDIA_VIEWBOX.height}`}
      className={clsx("cov-map", inView && "is-live", className)}
      role="img"
      aria-label="Map of India showing DocPharma's darkstore cities and delivery reaching 19,000+ pincodes across the country"
    >
      <path d={INDIA_OUTLINE} className="cov-outline" pathLength={1} />

      {/* Dots: blue waves ripple outward from every city, forever. */}
      <g>
        {dots.map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={d.nearCity < 40 ? 2.7 : 2.2}
            className={clsx("cov-dot", d.nearCity < 40 && "is-covered")}
            style={{
              animationDelay: `${0.6 + (d.nearCity / maxNear) * 1.6}s, ${2 + (d.nearCity / maxNear) * (WAVE_SECONDS * 0.6)}s`,
            }}
          />
        ))}
      </g>

      {/* Delivery lines from each city to every corner of India */}
      <g>
        {reach.map((r) => (
          <g key={r.id} style={{ opacity: dim(r.city), transition: "opacity .4s" }}>
            <path
              d={r.d}
              className="cov-reach"
              pathLength={1}
              style={{ animationDelay: `${r.begin}s`, animationDuration: `${r.duration}s` }}
            />
            <circle cx={r.x} cy={r.y} r="3" className="cov-dest" style={{ animationDelay: `${r.begin + r.duration * 0.9}s` }} />
            {inView ? (
              <circle r="2.8" className="cov-rider" style={{ animationDelay: `${r.begin}s` }}>
                <animateMotion dur={`${r.duration + 1.2}s`} begin={`${r.begin}s`} repeatCount="indefinite" path={r.d} />
              </circle>
            ) : null}
          </g>
        ))}
      </g>

      {/* Darkstore cities light up one after another. */}
      <g>
        {cities.map((c) => {
          const isActive = active === c.name;
          return (
            <g key={c.name} transform={`translate(${c.x} ${c.y})`}>
              <g className="cov-city" style={{ animationDelay: `${c.appear}s` }}>
                <circle r="9" className="cov-city-pulse" style={{ animationDelay: `${c.appear + 0.2}s` }} />
                <circle r={isActive ? 8.5 : 6} className="cov-city-dot" />
                <circle r={isActive ? 3.4 : 2.4} fill="#fff" />
              </g>
              {isActive ? (
                <g transform="translate(0 -20)">
                  <rect x={-c.name.length * 3.9 - 11} y="-15" width={c.name.length * 7.8 + 22} height="25" rx="12.5" fill="#052439" />
                  <text textAnchor="middle" y="2" fontSize="12" fontWeight="700" fill="#fff" fontFamily="Open Sans, sans-serif">
                    {c.name}
                  </text>
                </g>
              ) : null}
            </g>
          );
        })}
      </g>
    </svg>
  );
}
