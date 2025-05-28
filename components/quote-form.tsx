"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { submitQuoteRequest } from "@/lib/actions"
import type { Locale } from "@/lib/i18n/settings"
import { Upload, CheckCircle, AlertCircle } from "lucide-react"

interface QuoteFormProps {
  dictionary: {
    name: string
    email: string
    phone: string
    projectType: string
    description: string
    attachment: string
    attachmentHelp: string
    submit: string
    success: string
    error: string
  }
  lang: Locale
}

export function QuoteForm({ dictionary, lang }: QuoteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const isRtl = lang === "ar"

  const projectTypes = [
    { value: "residential", label: lang === "en" ? "Residential" : "سكني" },
    { value: "commercial", label: lang === "en" ? "Commercial" : "تجاري" },
    { value: "industrial", label: lang === "en" ? "Industrial" : "صناعي" },
    { value: "renovation", label: lang === "en" ? "Renovation" : "تجديد" },
    { value: "other", label: lang === "en" ? "Other" : "أخرى" },
  ]

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    setStatus("idle")

    try {
      await submitQuoteRequest(formData)
      setStatus("success")
    } catch (error) {
      setStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto"
      >
        <Card>
          <CardContent className="pt-6 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">{lang === "en" ? "Request Submitted!" : "تم إرسال الطلب!"}</h3>
            <p className="text-muted-foreground">{dictionary.success}</p>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className={isRtl ? "text-right" : "text-left"}>
            {lang === "en" ? "Project Details" : "تفاصيل المشروع"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">{dictionary.name}</Label>
                <Input id="name" name="name" required className={isRtl ? "text-right" : "text-left"} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{dictionary.email}</Label>
                <Input id="email" name="email" type="email" required className={isRtl ? "text-right" : "text-left"} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">{dictionary.phone}</Label>
                <Input id="phone" name="phone" type="tel" required className={isRtl ? "text-right" : "text-left"} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectType">{dictionary.projectType}</Label>
                <Select name="projectType" required>
                  <SelectTrigger>
                    <SelectValue placeholder={lang === "en" ? "Select project type" : "اختر نوع المشروع"} />
                  </SelectTrigger>
                  <SelectContent>
                    {projectTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">{dictionary.description}</Label>
              <Textarea
                id="description"
                name="description"
                rows={4}
                required
                className={isRtl ? "text-right" : "text-left"}
                placeholder={
                  lang === "en"
                    ? "Please describe your project requirements, timeline, and any specific details..."
                    : "يرجى وصف متطلبات مشروعك والجدول الزمني وأي تفاصيل محددة..."
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="attachment">{dictionary.attachment}</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <Input
                  id="attachment"
                  name="attachment"
                  type="file"
                  className="hidden"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <Label htmlFor="attachment" className="cursor-pointer">
                  <span className="text-sm font-medium">
                    {lang === "en" ? "Click to upload files" : "انقر لتحميل الملفات"}
                  </span>
                  <br />
                  <span className="text-xs text-muted-foreground">{dictionary.attachmentHelp}</span>
                </Label>
              </div>
            </div>

            {status === "error" && (
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{dictionary.error}</span>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (lang === "en" ? "Submitting..." : "جاري الإرسال...") : dictionary.submit}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
