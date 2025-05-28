"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n/settings";

interface TimelineSectionProps {
  lang: Locale;
  dictionary: {
    title: string;
    description: string;
    cta: string;
  };
}

export function TimelineSection({ lang, dictionary }: TimelineSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const isRtl = lang === "ar";

  const timelineItems = [
    {
      year: "2023",
      title: lang === "en" ? "City Center Tower" : "برج وسط المدينة",
      status: lang === "en" ? "In Progress" : "قيد التنفيذ",
    },
    {
      year: "2022",
      title: lang === "en" ? "Green Valley Residences" : "مساكن الوادي الأخضر",
      status: lang === "en" ? "Completed" : "مكتمل",
    },
    {
      year: "2021",
      title: lang === "en" ? "Tech Hub Campus" : "حرم مركز التكنولوجيا",
      status: lang === "en" ? "Completed" : "مكتمل",
    },
    {
      year: "2020",
      title: lang === "en" ? "Harbor Bridge" : "جسر الميناء",
      status: lang === "en" ? "Completed" : "مكتمل",
    },
  ];

  return (
    <section ref={ref} className="container py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {dictionary.title}
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          {dictionary.description}
        </p>
      </motion.div>

      <div className="mt-16 relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 h-full w-0.5 bg-border -translate-x-1/2" />

        {/* Timeline items */}
        <div className="relative">
          {timelineItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={
                isInView
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }
              }
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className={`mb-12 flex ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              } relative`}
            >
              <div
                className={`w-5/12 ${
                  isRtl
                    ? index % 2 === 0
                      ? "text-right"
                      : "text-left"
                    : index % 2 === 0
                    ? "text-left"
                    : "text-right"
                }`}
              >
                <div className="bg-background border rounded-lg p-6 shadow-2xs">
                  <span className="text-sm font-medium text-muted-foreground">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-bold mt-1">{item.title}</h3>
                  <p
                    className={`mt-2 inline-block px-3 py-1 text-xs rounded-full ${
                      item.status.includes("Progress")
                        ? "bg-amber-100 text-amber-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {item.status}
                  </p>
                </div>
              </div>

              {/* Timeline dot */}
              <div
                className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background"
                style={{ top: "2rem" }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-8 text-center"
      >
        <Link href={`/${lang}/timeline`}>
          <Button size="lg">{dictionary.cta}</Button>
        </Link>
      </motion.div>
    </section>
  );
}
