"use client"

import {
  Target,
  Heart,
  Building2,
  Users,
  IndianRupee,
} from "lucide-react"

import type { OnboardingStepProps } from "../OnboardingWizard"

type FieldConfig = {
  name: string
  label: string
  placeholder: string
  type?: "text" | "number" | "textarea"
  wide?: boolean
  required?: boolean
}

const purposeFields: FieldConfig[] = [
  {
    name: "purposePassion",
    label: "Passion",
    placeholder: "Describe the passion or vision behind running the school...",
    type: "textarea",
    wide: true,
    required: true,
  },
  {
    name: "purposeIncome",
    label: "Income Source",
    placeholder: "Describe the income perspective behind running the school...",
    type: "textarea",
    wide: true,
    required: true,
  },
  {
    name: "purposeOthers",
    label: "Others",
    placeholder: "Mention any other purpose...",
    type: "textarea",
    wide: true,
  },
]

const competitorFields: FieldConfig[] = [
  {
    name: "competitor1Name",
    label: "Competitor 01 — Name",
    placeholder: "Enter competitor school's name",
  },
  {
    name: "competitor1Strength",
    label: "Competitor 01 — Student Strength",
    placeholder: "Enter approximate student strength",
    type: "number",
  },
  {
    name: "competitor1Fees",
    label: "Competitor 01 — Fees",
    placeholder: "Enter approximate annual fees",
    type: "number",
  },
  {
    name: "competitor1Status",
    label: "Status with Competitor 01 (C-1)",
    placeholder: "Describe competitor's position, relationship and observations...",
    type: "textarea",
    wide: true,
  },
  {
    name: "competitor2Name",
    label: "Competitor 02 — Name",
    placeholder: "Enter competitor school's name",
  },
  {
    name: "competitor2Strength",
    label: "Competitor 02 — Student Strength",
    placeholder: "Enter approximate student strength",
    type: "number",
  },
  {
    name: "competitor2Fees",
    label: "Competitor 02 — Fees",
    placeholder: "Enter approximate annual fees",
    type: "number",
  },
  {
    name: "competitor2Status",
    label: "Status with Competitor 02 (C-2)",
    placeholder: "Describe competitor's position, relationship and observations...",
    type: "textarea",
    wide: true,
  },
]

export default function CompetitorAnalysis({
  values,
  onChange,
  errors,
}: OnboardingStepProps) {
  const renderField = (field: FieldConfig) => {
    const hasError = Boolean(errors[field.name])

    const commonClass = `w-full rounded-xl border bg-[#303030] px-4 text-sm text-[#F5F5F5] outline-none transition placeholder:text-[#858585] hover:border-[#666666] focus:border-[#A3A3A3] focus:bg-[#383838] focus:ring-4 focus:ring-white/[0.06] ${
      hasError
        ? "border-red-400 focus:border-red-400 focus:ring-red-400/10"
        : "border-[#454545]"
    }`

    return (
      <div
        key={field.name}
        className={field.wide ? "sm:col-span-2" : ""}
      >
        <label
          htmlFor={field.name}
          className="mb-2 block text-sm font-semibold text-[#D4D4D4]"
        >
          {field.label}
          {field.required && (
            <span className="ml-1 text-red-400">*</span>
          )}
        </label>

        {field.type === "textarea" ? (
          <textarea
            id={field.name}
            rows={3}
            value={values[field.name] || ""}
            onChange={(event) =>
              onChange(field.name, event.target.value)
            }
            placeholder={field.placeholder}
            aria-invalid={hasError}
            className={`${commonClass} min-h-[105px] resize-y py-3`}
          />
        ) : (
          <input
            id={field.name}
            type={field.type || "text"}
            min={field.type === "number" ? 0 : undefined}
            value={values[field.name] || ""}
            onChange={(event) =>
              onChange(field.name, event.target.value)
            }
            placeholder={field.placeholder}
            aria-invalid={hasError}
            className={`${commonClass} h-12`}
          />
        )}

        {hasError && (
          <p className="mt-1.5 text-xs font-medium text-red-400">
            {errors[field.name]}
          </p>
        )}
      </div>
    )
  }

  return (
    <div>
      {/* Section Heading */}
      <div className="mb-8 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#525252] bg-[#303030] text-[#E5E5E5]">
          <Target size={23} />
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#A3A3A3]">
            Step 03
          </p>

          <h2 className="mt-1 text-xl font-bold tracking-tight text-[#F5F5F5] sm:text-2xl">
            Business Intent & Competitors
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#A3A3A3]">
            Understand the school's purpose and evaluate its
            competitive landscape.
          </p>
        </div>
      </div>

      {/* Purpose of Running School */}
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-2">
          <Heart size={18} className="text-[#D4D4D4]" />
          <h3 className="text-sm font-bold text-[#F5F5F5]">
            Purpose of Running School
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
          {purposeFields.map(renderField)}
        </div>
      </div>

      <div className="mb-7 border-t border-[#454545]" />

      {/* Competitor 01 */}
      <div className="mb-8 rounded-2xl border border-[#454545] bg-[#303030]/70 p-4 sm:p-5">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#525252] bg-[#383838] text-[#E5E5E5]">
            <Building2 size={19} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#F5F5F5]">
              Competitor 01
            </h3>
            <p className="text-xs text-[#A3A3A3]">
              First competing school (C-1)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
          {competitorFields.slice(0, 4).map(renderField)}
        </div>
      </div>

      {/* Competitor 02 */}
      <div className="rounded-2xl border border-[#454545] bg-[#303030]/70 p-4 sm:p-5">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#525252] bg-[#383838] text-[#E5E5E5]">
            <Users size={19} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#F5F5F5]">
              Competitor 02
            </h3>
            <p className="text-xs text-[#A3A3A3]">
              Second competing school (C-2)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
          {competitorFields.slice(4).map(renderField)}
        </div>
      </div>

      <div className="mt-6 flex items-start gap-2 rounded-xl border border-[#454545] bg-[#303030] p-3">
        <IndianRupee
          size={16}
          className="mt-0.5 shrink-0 text-[#D4D4D4]"
        />
        <p className="text-xs leading-relaxed text-[#A3A3A3]">
          Enter approximate fee amounts and student strengths
          wherever exact figures are unavailable.
        </p>
      </div>
    </div>
  )
}
