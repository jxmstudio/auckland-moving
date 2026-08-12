/**
 * Drawing kit for the site's illustrations.
 *
 * These are the pieces that appear in more than one scene — the truck, the
 * crew, the cartons — so a change here keeps every picture on the site
 * consistent. Everything is flat vector in the brand palette: no gradients,
 * no strokes, tonal separation only.
 *
 * Crew are drawn as navy silhouettes in green hi-vis rather than as people
 * with rendered faces. It reads cleanly at small sizes, it matches the logo,
 * and it doesn't stand in for photography of a real team we haven't shot.
 */

export const ink = "#04011e";
export const inkSoft = "#2c2c47";
export const inkFaint = "#3f3f61";
export const green = "#91c73e";
export const greenDark = "#55791f";
export const greenLight = "#b7dc7e";
export const wash = "#f6f6fb";
export const washMid = "#e9e9f4";
export const washDeep = "#d2d2e6";
export const carton = "#e0c7a2";
export const cartonDark = "#c8ac82";
export const cartonTape = "#f2e7d5";
export const glass = "#c9d6e8";

/* ── Crew ─────────────────────────────────────────────────────────────────── */

/**
 * A crew member, feet on the origin, roughly 132 units tall.
 * `pose` changes what the arms are doing; `flip` faces them left.
 */
export function Mover({
  x = 0,
  y = 0,
  scale = 1,
  flip = false,
  pose = "carry",
  capColour = green,
}: {
  x?: number;
  y?: number;
  scale?: number;
  flip?: boolean;
  pose?: "carry" | "stand" | "push" | "lift";
  capColour?: string;
}) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}
    >
      {/* Legs and boots */}
      {pose === "stand" ? (
        <>
          <rect x={-19} y={-58} width={15} height={58} rx={6} fill={ink} />
          <rect x={2} y={-58} width={15} height={58} rx={6} fill={ink} />
        </>
      ) : (
        <>
          <path d="M-20-58h15l-9 58h-15z" fill={ink} />
          <rect x={3} y={-58} width={15} height={58} rx={6} fill={ink} />
        </>
      )}
      <rect x={-32} y={-7} width={26} height={8} rx={4} fill={inkSoft} />
      <rect x={1} y={-7} width={26} height={8} rx={4} fill={inkSoft} />

      {/* Hips and torso */}
      <rect x={-21} y={-70} width={39} height={18} rx={6} fill={ink} />
      <rect x={-20} y={-110} width={38} height={46} rx={10} fill={ink} />

      {/* Hi-vis vest with a reflective band */}
      <path
        d="M-19-108h36a4 4 0 0 1 4 4v30a6 6 0 0 1-6 6h-32a6 6 0 0 1-6-6v-30a4 4 0 0 1 4-4z"
        fill={green}
      />
      <rect x={-23} y={-90} width={44} height={7} rx={3.5} fill="#ffffff" opacity={0.85} />
      <rect x={-3} y={-108} width={6} height={44} fill={greenDark} opacity={0.35} />

      {/* Arms */}
      {pose === "carry" && (
        <rect x={-6} y={-98} width={40} height={13} rx={6.5} fill={ink} />
      )}
      {pose === "lift" && (
        <path d="M-2-100h10l24-26a7 7 0 0 1 11 8l-27 32H-2z" fill={ink} />
      )}
      {pose === "push" && (
        <rect x={-4} y={-92} width={44} height={12} rx={6} fill={ink} />
      )}
      {pose === "stand" && (
        <>
          <rect x={-30} y={-106} width={12} height={40} rx={6} fill={ink} />
          <rect x={18} y={-106} width={12} height={40} rx={6} fill={ink} />
        </>
      )}

      {/* Head and cap */}
      <circle cx={0} cy={-124} r={14} fill={ink} />
      <path
        d="M-14-126a14 14 0 0 1 28 0v2h7a4 4 0 0 1 0 8h-35z"
        fill={capColour}
      />
    </g>
  );
}

/* ── Cartons ──────────────────────────────────────────────────────────────── */

export function Carton({
  x = 0,
  y = 0,
  w = 66,
  h = 54,
  label = true,
}: {
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  label?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={0} y={-h} width={w} height={h} rx={4} fill={carton} />
      <rect x={0} y={-h} width={w} height={h * 0.22} rx={4} fill={cartonDark} />
      <rect
        x={w / 2 - 5}
        y={-h}
        width={10}
        height={h * 0.22}
        fill={cartonTape}
      />
      {label && (
        <rect
          x={w * 0.16}
          y={-h * 0.56}
          width={w * 0.5}
          height={h * 0.26}
          rx={3}
          fill={green}
        />
      )}
    </g>
  );
}

/** Tall wardrobe carton with a hanging rail. */
export function WardrobeCarton({ x = 0, y = 0 }: { x?: number; y?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={0} y={-150} width={78} height={150} rx={5} fill={carton} />
      <rect x={0} y={-150} width={78} height={26} rx={5} fill={cartonDark} />
      <rect x={34} y={-150} width={10} height={26} fill={cartonTape} />
      <rect x={12} y={-108} width={54} height={16} rx={3} fill={green} />
      <rect x={12} y={-84} width={38} height={8} rx={4} fill={cartonDark} />
    </g>
  );
}

/* ── Truck ────────────────────────────────────────────────────────────────── */

/**
 * Box truck in side view, facing right. Origin sits on the ground at the rear
 * of the body. The panel on the side is the logo lockup reduced to its three
 * lines of type, which is all that survives at illustration scale.
 */
export function BoxTruck({
  x = 0,
  y = 0,
  scale = 1,
  ramp = false,
}: {
  x?: number;
  y?: number;
  scale?: number;
  ramp?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {ramp && <path d="M0-46 0-24-86 6-86-14z" fill={inkSoft} />}

      {/* Chassis */}
      <rect x={-2} y={-46} width={312} height={18} rx={4} fill={ink} />

      {/* Cargo body */}
      <rect x={0} y={-168} width={216} height={124} rx={7} fill={green} />
      <rect x={0} y={-168} width={216} height={14} rx={7} fill={greenDark} />
      <rect x={0} y={-60} width={216} height={16} fill={greenDark} opacity={0.5} />

      {/* Logo panel */}
      <rect x={26} y={-146} width={150} height={72} rx={9} fill={ink} />
      <rect x={38} y={-136} width={126} height={16} rx={3} fill={green} />
      <rect x={38} y={-115} width={126} height={22} rx={3} fill={green} />
      <rect x={38} y={-88} width={86} height={9} rx={3} fill={green} />

      {/* Cab */}
      <path
        d="M216-168h46a12 12 0 0 1 9.6 4.8l30 42A16 16 0 0 1 305-112v58a10 10 0 0 1-10 10h-79z"
        fill={green}
      />
      <path d="M228-158h30l26 40h-56z" fill={glass} />
      <rect x={288} y={-96} width={20} height={14} rx={4} fill={greenLight} />
      <rect x={298} y={-46} width={16} height={18} rx={4} fill={ink} />

      {/* Wheels */}
      <circle cx={58} cy={-26} r={27} fill={ink} />
      <circle cx={58} cy={-26} r={12} fill={greenLight} />
      <circle cx={256} cy={-26} r={27} fill={ink} />
      <circle cx={256} cy={-26} r={12} fill={greenLight} />
    </g>
  );
}

/* ── Setting ──────────────────────────────────────────────────────────────── */

/** Auckland villa facade — bay window, verandah, pitched roof. */
export function Villa({ x = 0, y = 0, scale = 1 }: { x?: number; y?: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x={0} y={-150} width={210} height={150} rx={4} fill="#ffffff" />
      <path d="M-14-150 105-214l119 64z" fill={inkSoft} />
      <rect x={0} y={-152} width={210} height={10} fill={washDeep} />

      {/* Bay window */}
      <rect x={20} y={-116} width={72} height={80} rx={4} fill={glass} />
      <rect x={52} y={-116} width={8} height={80} fill="#ffffff" />
      <rect x={20} y={-120} width={72} height={8} rx={3} fill={washDeep} />

      {/* Door, open, with a green mat */}
      <rect x={122} y={-108} width={54} height={108} rx={4} fill={ink} />
      <rect x={130} y={-100} width={38} height={100} rx={3} fill={inkSoft} />
      <rect x={116} y={-8} width={68} height={10} rx={5} fill={green} />

      {/* Verandah posts */}
      <rect x={0} y={-152} width={10} height={152} fill={washDeep} />
      <rect x={200} y={-152} width={10} height={152} fill={washDeep} />
    </g>
  );
}

/** Pōhutukawa — the tree in every Auckland driveway shot. */
export function Pohutukawa({ x = 0, y = 0, scale = 1 }: { x?: number; y?: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M-8 0h16l-4-88h-8z" fill={inkSoft} />
      <circle cx={0} cy={-104} r={44} fill={greenDark} />
      <circle cx={-38} cy={-86} r={30} fill={greenDark} />
      <circle cx={36} cy={-88} r={28} fill={greenDark} />
      <circle cx={-14} cy={-124} r={26} fill={green} opacity={0.55} />
      <circle cx={26} cy={-110} r={18} fill={green} opacity={0.45} />
    </g>
  );
}

/** Sky Tower and a few city blocks, for the skyline behind a scene. */
export function Skyline({ x = 0, y = 0, scale = 1, fill = washDeep }: { x?: number; y?: number; scale?: number; fill?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} fill={fill}>
      <rect x={-150} y={-120} width={54} height={120} rx={3} />
      <rect x={-86} y={-176} width={46} height={176} rx={3} />
      <rect x={64} y={-146} width={50} height={146} rx={3} />
      <rect x={124} y={-96} width={62} height={96} rx={3} />
      {/* Sky Tower */}
      <rect x={12} y={-238} width={16} height={238} />
      <path d="M2-238h36l-6-34a12 12 0 0 0-24 0z" />
      <rect x={-4} y={-206} width={48} height={30} rx={8} />
      <rect x={16} y={-300} width={8} height={64} />
    </g>
  );
}

/** A framed illustration surface. All scenes sit on one of these. */
export function SceneBackdrop({
  width,
  height,
  tone = "light",
}: {
  width: number;
  height: number;
  tone?: "light" | "dark";
}) {
  return (
    <>
      <rect width={width} height={height} fill={tone === "dark" ? ink : wash} />
      <circle
        cx={width * 0.88}
        cy={height * 0.12}
        r={height * 0.2}
        fill={green}
        opacity={tone === "dark" ? 0.18 : 0.16}
      />
    </>
  );
}
