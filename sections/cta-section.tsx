"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import type { Locale } from "@/lib/i18n/settings"

interface CtaSectionProps {
  lang: Locale
  dictionary: {
    title: string
    description: string
    button: string
  }
}

export function CtaSection({ lang, dictionary }: CtaSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const isRtl = lang === "ar"

  return (
    <section ref={ref} className="container py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className={`bg-primary text-primary-foreground rounded-xl p-12 text-center ${isRtl ? "text-right" : "text-left"}`}
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center">{dictionary.title}</h2>
        <p className="mt-4 text-lg text-primary-foreground/90 text-center max-w-2xl mx-auto">
          {dictionary.description}
        </p>
        <div className="mt-8 text-center">
          <Link href={`/${lang}/quote`}>
            <Button size="lg" variant="secondary" className="text-lg">
              {dictionary.button}
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
