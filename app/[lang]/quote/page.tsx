import type { Locale } from "@/lib/i18n/settings"
import { getDictionary } from "@/lib/i18n"
import { QuoteForm } from "@/components/quote-form"
import { PageHeader } from "@/components/page-header"

export default async function QuotePage(props: { params: Promise<{ lang: Locale }> }) {
  const params = await props.params;
  const dict = await getDictionary(params.lang)

  return (
    <div className="container py-10">
      <PageHeader title={dict.quote.title} description={dict.quote.description} />
      <QuoteForm dictionary={dict.quote.form} lang={params.lang} />
    </div>
  )
}
