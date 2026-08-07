"use client";

import { useState } from "react";
import { ChevronIcon } from "./Icons";
import type { Faq } from "@/config/faqs";
import { cn } from "@/lib/cn";

/**
 * Answers stay in the DOM whether open or closed (hidden via max-height, not
 * conditional rendering) so crawlers and AI search engines can read every
 * answer without executing the toggle.
 */
export function FaqAccordion({ items }: { items: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-navy-100 border-y border-navy-100">
      {items.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={faq.question}>
            <h3>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${i}`}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="text-[17px] font-semibold text-navy-950">
                  {faq.question}
                </span>
                <ChevronIcon
                  className={cn(
                    "h-5 w-5 shrink-0 text-navy-400 transition-transform duration-200",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
            </h3>
            <div
              id={`faq-answer-${i}`}
              className={cn(
                "grid transition-all duration-200",
                isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="pr-10 leading-relaxed text-navy-700">{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
