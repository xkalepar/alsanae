import type { Locale } from "@/lib/i18n/settings"
import { getDictionary } from "@/lib/i18n"
import { getProject, getProjects } from "@/lib/data"
import { ProjectDetails } from "@/components/project-details"
import { ProjectGallery } from "@/components/project-gallery"
import { ProjectTimeline } from "@/components/project-timeline"
import { ProjectAchievements } from "@/components/project-achievements"
import { notFound } from "next/navigation"

export async function generateStaticParams({ params }: { params: { lang: Locale } }) {
  const projects = await getProjects(params.lang)

  return projects.map((project) => ({
    id: project.id,
  }))
}

export default async function ProjectPage(
  props: {
    params: Promise<{ lang: Locale; id: string }>
  }
) {
  const params = await props.params;
  const dict = await getDictionary(params.lang)
  const project = await getProject(params.lang, params.id)

  if (!project) {
    notFound()
  }

  return (
    <div className="container py-10">
      <ProjectDetails project={project} lang={params.lang} />
      <ProjectGallery images={project.images} />
      <ProjectTimeline
        startDate={project.startDate}
        endDate={project.endDate}
        milestones={project.milestones}
        lang={params.lang}
      />
      <ProjectAchievements achievements={project.achievements} lang={params.lang} />
    </div>
  )
}
