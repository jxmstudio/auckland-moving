/**
 * The site's illustrations.
 *
 * These stand in for photography of the real crew, trucks and jobs, which is
 * being shot once the new uniforms arrive. They are drawn in the brand palette
 * rather than sourced from a stock library, so nothing on the site claims to be
 * a photograph of work we can't show yet.
 *
 * Each scene is a plain SVG with a 4:3 viewBox and no client-side JavaScript.
 * To swap one for a real photograph later, replace the <Scene> usage in the
 * page with next/image — the surrounding frame classes stay the same.
 */
import {
  BoxTruck,
  Carton,
  Mover,
  Pohutukawa,
  SceneBackdrop,
  Skyline,
  Villa,
  WardrobeCarton,
  carton,
  cartonDark,
  glass,
  green,
  greenDark,
  greenLight,
  ink,
  inkFaint,
  inkSoft,
  washDeep,
  washMid,
} from "./parts";

const W = 800;
const H = 600;
const GROUND = 495;

function Frame({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={label}
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      {children}
    </svg>
  );
}

/** Flat floor with a kerb line. */
function Ground({ y = GROUND, tone = washMid }: { y?: number; tone?: string }) {
  return (
    <>
      <rect x={0} y={y} width={W} height={H - y} fill={tone} />
      <rect x={0} y={y} width={W} height={7} fill={washDeep} />
    </>
  );
}

/* ── Hero: a crew loading the truck outside an Auckland villa ─────────────── */

export function LoadingScene({ className }: { className?: string }) {
  return (
    <Frame
      className={className}
      label="An Auckland Moving Professionals crew carrying cartons up the ramp of a branded truck outside a villa"
    >
      <SceneBackdrop width={W} height={H} />
      <Skyline x={640} y={GROUND} scale={0.66} />
      <Villa x={4} y={GROUND} scale={1.06} />
      <Pohutukawa x={766} y={GROUND} scale={0.8} />
      <Ground />

      {/* Driveway the truck is standing on */}
      <rect x={206} y={GROUND} width={490} height={105} rx={8} fill={washDeep} />

      <BoxTruck x={332} y={GROUND - 2} scale={1.14} ramp />

      {/* Crew member walking a carton to the ramp, box held out in front */}
      <Mover x={150} y={GROUND} scale={1.16} pose="carry" />
      <Carton x={170} y={GROUND - 62} w={84} h={70} />

      {/* Crew member stowing a carton at the top of the ramp */}
      <Mover x={276} y={GROUND - 24} scale={1.04} pose="lift" />
      <Carton x={298} y={GROUND - 166} w={62} h={48} label={false} />
    </Frame>
  );
}

/* ── Residential ──────────────────────────────────────────────────────────── */

export function ResidentialScene({ className }: { className?: string }) {
  return (
    <Frame
      className={className}
      label="A crew member wheeling cartons out of a villa on a trolley, with a blanket-wrapped armchair waiting to be loaded"
    >
      <SceneBackdrop width={W} height={H} />
      <Villa x={296} y={GROUND} scale={1.5} />
      <Pohutukawa x={742} y={GROUND} scale={0.9} />
      <Ground />

      {/*
        Blanket-wrapped armchair. The blanket is grey rather than green so it
        doesn't disappear into the tree behind it — and moving blankets are
        grey anyway. The straps carry the brand colour.
      */}
      <g transform={`translate(28 ${GROUND})`}>
        <path
          d="M0-72a22 22 0 0 1 22-22h8v-44a20 20 0 0 1 20-20h74a20 20 0 0 1 20 20v44h8a22 22 0 0 1 22 22v72H0z"
          fill={washDeep}
        />
        <rect x={0} y={-52} width={174} height={12} fill={green} />
        <rect x={68} y={-94} width={12} height={94} fill={green} />
        <rect x={-6} y={-8} width={186} height={12} rx={6} fill={inkSoft} />
      </g>

      {/* Sack trolley loaded with cartons, coming out of the front door */}
      <g transform={`translate(252 ${GROUND})`}>
        <rect x={6} y={-186} width={13} height={172} rx={6} fill={inkSoft} />
        <rect x={6} y={-26} width={92} height={13} rx={6} fill={inkSoft} />
        <circle cx={28} cy={-20} r={20} fill={ink} />
        <circle cx={28} cy={-20} r={8} fill={greenLight} />
      </g>
      <Carton x={264} y={GROUND - 34} w={80} h={64} />
      <Carton x={270} y={GROUND - 98} w={68} h={54} label={false} />

      <Mover x={388} y={GROUND} scale={1.2} pose="push" flip />
    </Frame>
  );
}

/* ── Piano & spa pool ─────────────────────────────────────────────────────── */

export function PianoSpaScene({ className }: { className?: string }) {
  return (
    <Frame
      className={className}
      label="An upright piano strapped onto a piano skate, and a spa pool slung under a lifting gantry"
    >
      <SceneBackdrop width={W} height={H} />
      <Ground />

      {/* Upright piano, strapped and on a skate */}
      <g transform={`translate(96 ${GROUND}) scale(1.16)`}>
        {/* Skate */}
        <rect x={-16} y={-32} width={214} height={20} rx={10} fill={ink} />
        <circle cx={18} cy={-7} r={12} fill={ink} />
        <circle cx={164} cy={-7} r={12} fill={ink} />

        {/* Body */}
        <rect x={0} y={-208} width={182} height={176} rx={7} fill={inkFaint} />
        <rect x={-8} y={-214} width={198} height={20} rx={7} fill={ink} />

        {/* Strapping — drawn before the keyboard so the keys stay readable */}
        <rect x={30} y={-208} width={14} height={176} fill={green} />
        <rect x={132} y={-208} width={14} height={176} fill={green} />

        {/* Keyboard */}
        <rect x={-8} y={-130} width={198} height={24} rx={4} fill={ink} />
        <rect x={2} y={-126} width={178} height={17} fill="#f6f5fa" />
        {[14, 34, 66, 86, 106, 138, 158].map((k) => (
          <rect key={k} x={k} y={-126} width={8} height={11} fill={ink} />
        ))}

        {/* Moving blanket folded over the top */}
        <path d="M-8-214h80v88H-8z" fill={greenLight} />
        <path d="M-8-126h80l-14 22H-8z" fill={green} />
      </g>

      <Mover x={352} y={GROUND} scale={1.16} pose="push" flip />

      {/* Lifting gantry over the spa pool */}
      <g transform={`translate(596 ${GROUND}) scale(1.1)`}>
        <path d="M-116 0h18l66-186h-18z" fill={inkSoft} />
        <path d="M116 0h-18l-66-186h18z" fill={inkSoft} />
        <rect x={-130} y={-198} width={260} height={18} rx={9} fill={ink} />
        <rect x={-7} y={-180} width={14} height={44} fill={inkFaint} />
        <rect x={-26} y={-140} width={52} height={16} rx={8} fill={ink} />
        <rect x={-98} y={-140} width={196} height={11} rx={5.5} fill={ink} />

        {/* Spa pool shell, sitting a little off the ground in the slings */}
        <rect x={-108} y={-110} width={216} height={92} rx={18} fill={ink} />
        <rect x={-108} y={-110} width={216} height={22} rx={11} fill={inkSoft} />
        <rect x={-92} y={-96} width={184} height={56} rx={10} fill={glass} />
        {[-52, 0, 52].map((j) => (
          <circle key={j} cx={j} cy={-68} r={9} fill={green} />
        ))}

        {/* Slings, passing round the outside of the shell */}
        <rect x={-96} y={-136} width={11} height={126} rx={4} fill={inkFaint} />
        <rect x={85} y={-136} width={11} height={126} rx={4} fill={inkFaint} />
      </g>

      <Mover x={742} y={GROUND} scale={1.16} pose="stand" flip />
    </Frame>
  );
}

/* ── Commercial ───────────────────────────────────────────────────────────── */

export function CommercialScene({ className }: { className?: string }) {
  return (
    <Frame
      className={className}
      label="An office relocation in progress — numbered crates stacked and labelled, desks and a server rack ready to move"
    >
      <rect width={W} height={H} fill={washMid} />
      <circle cx={W * 0.88} cy={H * 0.12} r={H * 0.2} fill={green} opacity={0.14} />

      {/* Floor plan pinned to the wall */}
      <g transform="translate(72 74)">
        <rect width={208} height={156} rx={7} fill="#ffffff" />
        <rect x={20} y={22} width={78} height={50} rx={4} fill={washDeep} />
        <rect x={112} y={22} width={76} height={50} rx={4} fill={washDeep} />
        <rect x={20} y={88} width={168} height={46} rx={4} fill={green} opacity={0.55} />
        <circle cx={104} cy={12} r={5} fill={inkSoft} />
      </g>

      <Ground tone={washDeep} />

      {/* Server rack */}
      <g transform={`translate(628 ${GROUND})`}>
        <rect x={0} y={-286} width={134} height={286} rx={9} fill={ink} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i}>
            <rect x={14} y={-270 + i * 46} width={106} height={32} rx={4} fill={inkSoft} />
            <rect x={96} y={-261 + i * 46} width={14} height={7} rx={3.5} fill={green} />
          </g>
        ))}
      </g>

      {/* Desk with a monitor */}
      <g transform={`translate(400 ${GROUND})`}>
        <rect x={0} y={-118} width={200} height={14} rx={5} fill="#ffffff" />
        <rect x={10} y={-104} width={13} height={104} fill={inkSoft} />
        <rect x={177} y={-104} width={13} height={104} fill={inkSoft} />
        <rect x={58} y={-196} width={94} height={62} rx={6} fill={ink} />
        <rect x={67} y={-187} width={76} height={44} rx={3} fill={glass} />
        <rect x={97} y={-134} width={16} height={16} fill={inkSoft} />
      </g>

      {/* Numbered crates */}
      <g transform={`translate(96 ${GROUND}) scale(1.2)`}>
        {[
          { x: 0, y: 0 },
          { x: 100, y: 0 },
          { x: 50, y: -72 },
        ].map((c, i) => (
          <g key={i} transform={`translate(${c.x} ${c.y})`}>
            <rect x={0} y={-70} width={94} height={70} rx={5} fill={green} />
            <rect x={0} y={-70} width={94} height={15} rx={5} fill={greenDark} />
            <rect x={16} y={-48} width={46} height={24} rx={3} fill="#ffffff" />
            <rect x={23} y={-41} width={24} height={10} rx={2} fill={ink} />
          </g>
        ))}
      </g>

      <Mover x={368} y={GROUND} scale={1.12} pose="carry" flip />
      <Carton x={268} y={GROUND - 96} w={72} h={58} label={false} />
    </Frame>
  );
}

/* ── The team ─────────────────────────────────────────────────────────────── */

export function CrewScene({ className }: { className?: string }) {
  return (
    <Frame
      className={className}
      label="Three uniformed Auckland Moving Professionals crew members standing in front of a branded truck"
    >
      <SceneBackdrop width={W} height={H} />

      {/* The depot behind them */}
      <g transform={`translate(24 ${GROUND})`}>
        <rect x={0} y={-214} width={368} height={214} rx={6} fill="#ffffff" />
        <rect x={-10} y={-228} width={388} height={18} rx={7} fill={washDeep} />
        <rect x={30} y={-186} width={148} height={186} rx={5} fill={washMid} />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={30} y={-176 + i * 36} width={148} height={5} fill={washDeep} />
        ))}
        <rect x={214} y={-170} width={124} height={78} rx={5} fill={glass} />
        <rect x={214} y={-206} width={124} height={24} rx={5} fill={green} />
      </g>

      <Pohutukawa x={780} y={GROUND} scale={0.68} />
      <Ground />
      <BoxTruck x={424} y={GROUND - 2} scale={1.04} />

      {/* Forecourt the crew are standing on, in front of the truck */}
      <rect x={0} y={GROUND + 46} width={W} height={H - GROUND - 46} fill={washDeep} />

      <Mover x={96} y={GROUND + 54} scale={1.5} pose="stand" />
      <Mover x={232} y={GROUND + 54} scale={1.5} pose="stand" capColour={greenLight} />
      <Mover x={368} y={GROUND + 54} scale={1.5} pose="stand" />
    </Frame>
  );
}

/* ── Coverage map ─────────────────────────────────────────────────────────── */

export function CoverageScene({ className }: { className?: string }) {
  return (
    <Frame
      className={className}
      label="A stylised map of Auckland showing depots either side of the harbour"
    >
      <rect width={W} height={H} fill={glass} opacity={0.5} />

      {/* Harbour, then the land it wraps around */}
      <path
        d="M0 244c74-8 154 24 226 36 118 18 172-56 268-78 110-26 202 10 306-34v432H0z"
        fill={washMid}
      />
      <path
        d="M0 300c96-4 168 30 244 40 120 16 180-44 272-64 96-22 190 6 284-24v348H0z"
        fill={greenLight}
        opacity={0.3}
      />

      {/* Motorway */}
      <path
        d="M236 600C236 470 300 424 402 386 508 346 566 300 574 214"
        fill="none"
        stroke={washDeep}
        strokeWidth={30}
        strokeLinecap="round"
      />
      <path
        d="M236 600C236 470 300 424 402 386 508 346 566 300 574 214"
        fill="none"
        stroke="#ffffff"
        strokeWidth={4}
        strokeDasharray="18 22"
        strokeLinecap="round"
      />

      <Skyline x={516} y={230} scale={0.4} fill={washDeep} />

      {/* A truck running between the depots */}
      <g transform="translate(322 414) scale(0.52)">
        <BoxTruck />
      </g>

      {/* Depot pins */}
      {[
        { x: 168, y: 322, key: "west" },
        { x: 268, y: 508, key: "south" },
      ].map((pin) => (
        <g key={pin.key} transform={`translate(${pin.x} ${pin.y})`}>
          <ellipse cx={0} cy={6} rx={22} ry={8} fill={ink} opacity={0.18} />
          <path
            d="M0 0c-17-26-28-38-28-54a28 28 0 0 1 56 0c0 16-11 28-28 54z"
            fill={green}
          />
          <circle cx={0} cy={-54} r={12} fill={ink} />
        </g>
      ))}
    </Frame>
  );
}

/* ── Packing ──────────────────────────────────────────────────────────────── */

export function PackingScene({ className }: { className?: string }) {
  return (
    <Frame
      className={className}
      label="Wardrobe cartons, packing boxes, tape and protective wrap laid out ready for a pack-up"
    >
      <SceneBackdrop width={W} height={H} />
      <Ground />

      <g transform={`translate(26 ${GROUND}) scale(1.52)`}>
        <WardrobeCarton />
      </g>
      <g transform={`translate(158 ${GROUND}) scale(1.52)`}>
        <WardrobeCarton />
      </g>

      <Carton x={410} y={GROUND} w={152} h={120} />
      <Carton x={428} y={GROUND - 120} w={118} h={94} label={false} />
      <Carton x={576} y={GROUND} w={128} h={102} label={false} />

      {/* Roll of protective wrap, standing on its end */}
      <g transform={`translate(718 ${GROUND})`}>
        <rect x={0} y={-286} width={68} height={286} rx={14} fill={greenLight} />
        <rect x={0} y={-286} width={68} height={18} rx={9} fill={green} />
        <rect x={26} y={-268} width={18} height={268} fill={green} opacity={0.4} />
      </g>

      {/* Tape rolls, in the foreground */}
      <g transform={`translate(24 ${GROUND + 62})`}>
        <ellipse cx={40} cy={-14} rx={40} ry={15} fill={cartonDark} />
        <ellipse cx={40} cy={-25} rx={40} ry={15} fill={carton} />
        <ellipse cx={40} cy={-25} rx={15} ry={6} fill={washMid} />
        <ellipse cx={40} cy={-55} rx={40} ry={15} fill={green} />
        <ellipse cx={40} cy={-55} rx={15} ry={6} fill={washMid} />
      </g>

      <Mover x={340} y={GROUND} scale={1.42} pose="carry" flip />
    </Frame>
  );
}

/** The scene that belongs to each service pillar. */
export const sceneForService = {
  residential: ResidentialScene,
  "piano-spa": PianoSpaScene,
  commercial: CommercialScene,
} as const;
