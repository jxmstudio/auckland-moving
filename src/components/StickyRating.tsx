import { site, credentials } from "@/config/site";
import { StarIcon } from "./Icons";

/**
 * Floating Google-rating badge. Fixed to the bottom-left corner so the 4.9
 * stays on screen while scrolling, linking through to the live listing.
 */
export function StickyRating() {
  return (
    <a
      href={site.googleReviewsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Rated ${credentials.googleRating.toFixed(1)} stars from ${credentials.googleReviewCount}+ Google reviews`}
      className="fixed bottom-4 left-4 z-40 flex items-center gap-3 rounded-xl border border-navy-100 bg-white py-2.5 pl-3.5 pr-4 shadow-xl transition-transform hover:-translate-y-0.5"
    >
      <span className="font-display text-2xl font-extrabold leading-none text-navy-950">
        {credentials.googleRating.toFixed(1)}
      </span>
      <span>
        <span className="flex gap-0.5 text-amber-400" aria-hidden>
          {Array.from({ length: 5 }, (_, i) => (
            <StarIcon key={i} className="h-3.5 w-3.5" />
          ))}
        </span>
        <span className="mt-0.5 block text-[11px] font-semibold leading-tight text-navy-600">
          {credentials.googleReviewCount}+ Google reviews
        </span>
      </span>
    </a>
  );
}
