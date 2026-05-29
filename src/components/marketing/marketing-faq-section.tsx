"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type FaqItem = { question: string; answer: string };

export function MarketingFaqSection({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: FaqItem[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="scroll-mt-24 border-b border-gray-100 bg-white py-20 dark:border-gray-800 dark:bg-gray-950"
    >
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="text-center text-3xl font-bold tracking-tight">{title}</h2>
        <p className="mt-3 text-center text-gray-600 dark:text-gray-400">{subtitle}</p>
        <ul className="mt-10 space-y-3">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <li
                key={item.question}
                className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium text-gray-900 dark:text-gray-100"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  {item.question}
                  <ChevronDown
                    className={cn(
                      "size-5 shrink-0 text-gray-400 transition-transform",
                      isOpen && "rotate-180",
                    )}
                    aria-hidden
                  />
                </button>
                {isOpen && (
                  <p className="border-t border-gray-100 px-5 py-4 text-sm leading-relaxed text-gray-600 dark:border-gray-800 dark:text-gray-400">
                    {item.answer}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
