import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

export const HomeIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" />
    <path d="M9.5 21v-6h5v6" />
  </svg>
);

export const PianoIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="2.5" y="6" width="19" height="12" rx="1.5" />
    <path d="M2.5 13h19" />
    <path d="M7 13v5M11 13v5M15 13v5M19 13v5" />
    <path d="M6 6v4M9.5 6v4M13 6v4M16.5 6v4M20 6v4" />
  </svg>
);

export const OfficeIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 21h18" />
    <path d="M5 21V5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v16" />
    <path d="M14 21V10h4a1 1 0 0 1 1 1v10" />
    <path d="M8 8h3M8 12h3M8 16h3" />
  </svg>
);

export const TruckIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M2 7.5A1.5 1.5 0 0 1 3.5 6H14a1 1 0 0 1 1 1v9H2z" />
    <path d="M15 10h3.6a1 1 0 0 1 .83.44L21.6 14a1 1 0 0 1 .4.8V16h-7z" />
    <circle cx="6.5" cy="17.5" r="2" />
    <circle cx="17.5" cy="17.5" r="2" />
  </svg>
);

export const ShieldIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3l7.5 3v5.5c0 4.6-3.1 8.2-7.5 9.5-4.4-1.3-7.5-4.9-7.5-9.5V6z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const BoxIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M21 8.5 12 4 3 8.5v7L12 20l9-4.5z" />
    <path d="M3 8.5 12 13l9-4.5M12 13v7" />
    <path d="M7.5 6.2 16.5 10.8" />
  </svg>
);

export const StarIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="m12 2.5 2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.6 6.1 20.7l1.2-6.6L2.5 9.5l6.6-.9z" />
  </svg>
);

export const PhoneIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6.2 3h3l1.5 4-2 1.3a12 12 0 0 0 5.5 5.5l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.2 5.2 2 2 0 0 1 6.2 3z" />
  </svg>
);

export const MailIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="2.5" y="5" width="19" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export const PinIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const CheckIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m4.5 12.5 5 5 10-11" />
  </svg>
);

export const ChevronIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const ArrowIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

export const ClockIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5.5l3.5 2" />
  </svg>
);

export const pillarIcons = {
  home: HomeIcon,
  piano: PianoIcon,
  office: OfficeIcon,
} as const;
