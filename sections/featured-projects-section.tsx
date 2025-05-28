"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Locale } from "@/lib/i18n/settings"
import { MapPin } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  location: string
  image: string
  category: string
}

interface FeaturedProjectsSectionProps {
  lang: Locale
  dictionary: {
    title: string
    description: string
    cta: string
  }
  projects: Project[]
}

export function FeaturedProjectsSection({ lang, dictionary, projects }: FeaturedProjectsSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const isRtl = lang === "ar"

  return (
    <section ref={ref} className="container py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{dictionary.title}</h2>
        <p className="mt-4 text-lg text-muted-foreground">{dictionary.description}</p>
      </motion.div>

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          >
            <Card className="overflow-hidden h-full flex flex-col">
              <div className="relative h-48">
                <Image
                  src={project.image || "/placeholder.svg?height=400&width=600"}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className={`pt-6 flex-1 ${isRtl ? "text-right" : "text-left"}`}>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{project.location}</span>
                </div>
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="mt-2 text-muted-foreground line-clamp-3">{project.description}</p>
              </CardContent>
              <CardFooter className={`pt-0 ${isRtl ? "justify-end" : "justify-start"}`}>
                <Link href={`/${lang}/projects/${project.id}`}>
                  <Button variant="outline">{lang === "en" ? "View Project" : "عرض المشروع"}</Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-12 text-center"
      >
        <Link href={`/${lang}/projects`}>
          <Button size="lg">{dictionary.cta}</Button>
        </Link>
      </motion.div>
    </section>
  )
}
