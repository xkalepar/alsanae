"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Locale } from "@/lib/i18n/settings"
import { Calendar, CheckCircle, Clock } from "lucide-react"

interface Milestone {
  id: string
  title: string
  date: string
  completed: boolean
  description?: string
}

interface ProjectTimelineProps {
  startDate: string
  endDate: string
  milestones: Milestone[]
  lang: Locale
}

export function ProjectTimeline({ startDate, endDate, milestones, lang }: ProjectTimelineProps) {
  const isRtl = lang === "ar"
  const isOngoing = new Date(endDate) > new Date()

  // Default milestones if none provided
  const defaultMilestones: Milestone[] = [
    {
      id: "1",
      title: lang === "en" ? "Project Planning & Design" : "تخطيط وتصميم المشروع",
      date: startDate,
      completed: true,
      description:
        lang === "en" ? "Initial planning and architectural design phase" : "مرحلة التخطيط الأولي والتصميم المعماري",
    },
    {
      id: "2",
      title: lang === "en" ? "Foundation & Structure" : "الأساس والهيكل",
      date: new Date(new Date(startDate).getTime() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      completed: true,
      description: lang === "en" ? "Foundation laying and structural framework" : "وضع الأساس والإطار الهيكلي",
    },
    {
      id: "3",
      title: lang === "en" ? "Interior & Finishing" : "الداخلية واللمسات الأخيرة",
      date: new Date(new Date(startDate).getTime() + 180 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      completed: !isOngoing,
      description: lang === "en" ? "Interior work and finishing touches" : "الأعمال الداخلية واللمسات الأخيرة",
    },
    {
      id: "4",
      title: lang === "en" ? "Final Inspection & Handover" : "التفتيش النهائي والتسليم",
      date: endDate,
      completed: !isOngoing,
      description:
        lang === "en" ? "Final quality inspection and project handover" : "التفتيش النهائي على الجودة وتسليم المشروع",
    },
  ]

  const timelineMilestones = milestones.length > 0 ? milestones : defaultMilestones

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mb-12"
    >
      <Card>
        <CardHeader>
          <CardTitle className={isRtl ? "text-right" : "text-left"}>
            {lang === "en" ? "Project Timeline" : "الجدول الزمني للمشروع"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

            {/* Timeline items */}
            <div className="space-y-8">
              {timelineMilestones.map((milestone, index) => (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="relative flex items-start gap-6"
                >
                  {/* Timeline dot */}
                  <div className="relative z-10 flex items-center justify-center">
                    <div
                      className={`w-12 h-12 rounded-full border-4 border-background flex items-center justify-center ${
                        milestone.completed ? "bg-green-500" : "bg-muted"
                      }`}
                    >
                      {milestone.completed ? (
                        <CheckCircle className="h-6 w-6 text-white" />
                      ) : (
                        <Clock className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{milestone.title}</h3>
                      <Badge variant={milestone.completed ? "default" : "secondary"}>
                        {milestone.completed
                          ? lang === "en"
                            ? "Completed"
                            : "مكتمل"
                          : lang === "en"
                            ? "Pending"
                            : "معلق"}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(milestone.date).toLocaleDateString()}</span>
                    </div>

                    {milestone.description && <p className="text-muted-foreground text-sm">{milestone.description}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
