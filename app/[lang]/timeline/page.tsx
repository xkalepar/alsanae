import type { Locale } from "@/lib/i18n/settings"
import { getDictionary } from "@/lib/i18n"
import { getProjects } from "@/lib/data"
import { CompanyTimeline } from "@/components/company-timeline"
import { PageHeader } from "@/components/page-header"

export default async function TimelinePage(props: { params: Promise<{ lang: Locale }> }) {
  const params = await props.params;
  const dict = await getDictionary(params.lang)
  const projects = await getProjects(params.lang)

  return (
    <div className="container py-10">
      <PageHeader title={dict.timeline.title} description={dict.timeline.description} />
      <CompanyTimeline projects={projects} lang={params.lang} />
    </div>
  )
}
