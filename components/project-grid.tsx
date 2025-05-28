"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Locale } from "@/lib/i18n/settings"
import { MapPin, Calendar } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  location: string
  image: string
  category: string
  startDate: string
  endDate: string
  client: string
}

interface ProjectGridProps {
  projects: Project[]
  lang: Locale
}

export function ProjectGrid({ projects, lang }: ProjectGridProps) {
  const [filter, setFilter] = useState("all")
  const isRtl = lang === "ar"

  const categories = [
    { key: "all", label: lang === "en" ? "All Projects" : "جميع المشاريع" },
    { key: "residential", label: lang === "en" ? "Residential" : "سكني" },
    { key: "commercial", label: lang === "en" ? "Commercial" : "تجاري" },
    { key: "industrial", label: lang === "en" ? "Industrial" : "صناعي" },
    { key: "infrastructure", label: lang === "en" ? "Infrastructure" : "بنية تحتية" },
  ]

  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.category === filter)

  return (
    <div>
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((category) => (
          <Button
            key={category.key}
            variant={filter === category.key ? "default" : "outline-solid"}
            onClick={() => setFilter(category.key)}
            className="text-sm"
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Projects grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden h-full flex flex-col">
              <div className="relative h-48">
                <Image
                  src={project.image || "/placeholder.svg?height=400&width=600"}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <Badge className="absolute top-2 left-2">{project.category}</Badge>
              </div>
              <CardContent className={`pt-6 flex-1 ${isRtl ? "text-right" : "text-left"}`}>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{project.location}</span>
                </div>
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="mt-2 text-muted-foreground line-clamp-3">{project.description}</p>
                <div className="mt-4 flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>
                    {project.startDate} - {project.endDate}
                  </span>
                </div>
              </CardContent>
              <CardFooter className={`pt-0 ${isRtl ? "justify-end" : "justify-start"}`}>
                <Link href={`/${lang}/projects/${project.id}`}>
                  <Button variant="outline">{lang === "en" ? "View Details" : "عرض التفاصيل"}</Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
