"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Locale } from "@/lib/i18n/settings"
import { Calendar, MapPin, User, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

interface Project {
  id: string
  title: string
  description: string
  location: string
  category: string
  startDate: string
  endDate: string
  client: string
}

interface ProjectDetailsProps {
  project: Project
  lang: Locale
}

export function ProjectDetails({ project, lang }: ProjectDetailsProps) {
  const isRtl = lang === "ar"
  const isOngoing = new Date(project.endDate) > new Date()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      {/* Back button */}
      <div className="mb-6">
        <Link href={`/${lang}/projects`}>
          <Button variant="ghost" className="gap-2">
            {isRtl ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
            {lang === "en" ? "Back to Projects" : "العودة إلى المشاريع"}
          </Button>
        </Link>
      </div>

      {/* Project header */}
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant={isOngoing ? "default" : "secondary"}>
                  {isOngoing ? (lang === "en" ? "Ongoing" : "جاري") : lang === "en" ? "Completed" : "مكتمل"}
                </Badge>
                <Badge variant="outline">{project.category}</Badge>
              </div>

              <h1 className={`text-3xl font-bold mb-4 ${isRtl ? "text-right" : "text-left"}`}>{project.title}</h1>

              <p className={`text-lg text-muted-foreground mb-6 ${isRtl ? "text-right" : "text-left"}`}>
                {project.description}
              </p>

              {/* Project metadata */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{lang === "en" ? "Client" : "العميل"}</p>
                    <p className="text-muted-foreground">{project.client}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{lang === "en" ? "Location" : "الموقع"}</p>
                    <p className="text-muted-foreground">{project.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{lang === "en" ? "Start Date" : "تاريخ البداية"}</p>
                    <p className="text-muted-foreground">{new Date(project.startDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {isOngoing
                        ? lang === "en"
                          ? "Expected Completion"
                          : "الإنجاز المتوقع"
                        : lang === "en"
                          ? "Completion Date"
                          : "تاريخ الإنجاز"}
                    </p>
                    <p className="text-muted-foreground">{new Date(project.endDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
