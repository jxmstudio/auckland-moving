import { Container } from "./ui";
import { credentials, site } from "@/config/site";
import { ShieldIcon, TruckIcon, StarIcon, PinIcon } from "./Icons";

const stats = [
  {
    value: `${credentials.yearsExperience}+`,
    label: "Years in the moving industry",
    detail: "A family business since the piano days",
    Icon: TruckIcon,
  },
  {
    value: `${(credentials.propertiesMoved / 1000).toLocaleString()},000+`,
    label: "Properties moved",
    detail: `In the last ${credentials.propertiesMovedWindowYears} years`,
    Icon: ShieldIcon,
  },
  {
    value: credentials.googleRating.toFixed(1),
    label: "Average review rating",
    detail: `From ${credentials.googleReviewCount}+ customers`,
    Icon: StarIcon,
  },
  {
    value: String(site.depots.length),
    label: "Auckland wide depots",
    detail: "Covering every Auckland suburb",
    Icon: PinIcon,
  },
];

export function TrustStats() {
  return (
    <div className="border-y border-navy-100 bg-navy-50 py-10">
      <Container>
        <dl className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map(({ value, label, detail, Icon }) => (
            <div key={label} className="flex items-start gap-3.5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-white text-brand-600 shadow-sm">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <dd className="font-display text-2xl font-extrabold leading-none text-navy-950 sm:text-3xl">
                  {value}
                </dd>
                <dt className="mt-1.5 text-sm font-bold text-navy-900">{label}</dt>
                <p className="mt-0.5 text-xs leading-snug text-navy-500">{detail}</p>
              </div>
            </div>
          ))}
        </dl>
      </Container>
    </div>
  );
}
