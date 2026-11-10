
"use client"

import {
  GraduationCap,
  Users,
  Wallet,
  Building2,
  Lightbulb,
} from "lucide-react"

import type { OnboardingStepProps } from "../OnboardingWizard"

type FieldConfig = {
  name: string
  label: string
  placeholder: string
  type?: "number" | "textarea"
  wide?: boolean
  required?: boolean
}

const fields: FieldConfig[] = [
  {
    name: "schoolStrength",
    label: "Strength of School",
    placeholder: "Enter total number of students",
    type: "number",
    required: true,
  },
  {
    name: "meetingsDone",
    label: "Meetings Already Done",
    placeholder: "Enter number of meetings conducted",
    type: "number",
    required: true,
  },
  {
    name: "meetingOpinion",
    label: "Meeting's Opinion",
    placeholder: "Share your observations and feedback from meetings...",
    type: "textarea",
    wide: true,
    required: true,
  },
  {
    name: "feesFrom",
    label: "Fees Range — From",
    placeholder: "Enter minimum fee amount",
    type: "number",
    required: true,
  },
  {
    name: "feesTo",
    label: "Fees Range — To",
    placeholder: "Enter maximum fee amount",
    type: "number",
    required: true,
  },
  {
    name: "buildingCondition",
    label: "Condition of Building",
    placeholder: "Describe the school's building and infrastructure...",
    type: "textarea",
    wide: true,
    required: true,
  },
  {
    name: "schoolReputation",
    label: "Reputation of School",
    placeholder: "Describe the school's reputation in the locality...",
    type: "textarea",
    wide: true,
    required: true,
  },
  {
    name: "areaLocality",
    label: "Area / Locality / Environment",
    placeholder: "Describe the surrounding area, locality and environment...",
    type: "textarea",
    wide: true,
    required: true,
  },
  {
    name: "parentsEducation",
    label: "Parents' Educational Profile (Assumption)",
    placeholder: "Describe the assumed educational background of parents...",
    type: "textarea",
    wide: true,
    required: true,
  },
  {
    name: "distinguishingFactor",
    label: "Other Distinguishing (X) Factor",
    placeholder: "What makes this school different from others?",
    type: "textarea",
    wide: true,
    required: true,
  },
  {
    name: "improvementPotential",
    label: "Potential for Improvement in School",
    placeholder: "Describe the areas where the school can improve...",
    type: "textarea",
    wide: true,
    required: true,
  },
]

export default function SchoolAssessment({
  values,
  onChange,
  errors,
}: OnboardingStepProps) {
  const renderField = (field: FieldConfig) => {
    const hasError = Boolean(errors[field.name])

    const commonClass = `
      w-full rounded-xl border bg-[#303030] px-4
      text-sm text-[#F5F5F5] outline-none transition-all duration-200
      placeholder:text-[#858585]
      border-[#454545]
      hover:border-[#666666]
      focus:border-[#A3A3A3]
      focus:bg-[#383838]
      focus:ring-2 focus:ring-[#737373]/20
      ${
        hasError
          ? "border-red-400 focus:border-red-400 focus:ring-red-400/10"
          : ""
      }
    `

    return (
      <div
        key={field.name}
        id={field.name}
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
            className={`${commonClass} min-h-[110px] resize-y py-3 leading-relaxed`}
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
          <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-400">
            <span className="h-1 w-1 rounded-full bg-red-400" />
            {errors[field.name]}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="text-[#F5F5F5]">
      {/* Section Heading */}
      <div className="mb-8 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#525252] bg-[#303030] text-[#E5E5E5]">
          <GraduationCap size={23} />
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#A3A3A3]">
            Step 02
          </p>

          <h2 className="mt-1 text-xl font-bold tracking-tight text-[#F5F5F5] sm:text-2xl">
            School Assessment
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#A3A3A3]">
            Evaluate the school's current position, infrastructure,
            reputation and opportunities for improvement.
          </p>
        </div>
      </div>

      {/* School Overview */}
      <div className="mb-6 rounded-2xl border border-[#454545] bg-[#262626] p-4 sm:p-5">
        <div className="mb-5 flex items-center gap-3 border-b border-[#454545] pb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#383838] text-[#D4D4D4]">
            <Users size={18} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#F5F5F5]">
              School Overview & Meetings
            </h3>
            <p className="mt-0.5 text-xs text-[#A3A3A3]">
              Student strength and meeting observations
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
          {fields.slice(0, 3).map(renderField)}
        </div>
      </div>

      {/* Fee Structure */}
      <div className="mb-6 rounded-2xl border border-[#454545] bg-[#262626] p-4 sm:p-5">
        <div className="mb-5 flex items-center gap-3 border-b border-[#454545] pb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#383838] text-[#D4D4D4]">
            <Wallet size={18} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#F5F5F5]">
              Fee Structure
            </h3>
            <p className="mt-0.5 text-xs text-[#A3A3A3]">
              School fee range and affordability
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
          {fields.slice(3, 5).map(renderField)}
        </div>
      </div>

      {/* Infrastructure & Reputation */}
      <div className="mb-6 rounded-2xl border border-[#454545] bg-[#262626] p-4 sm:p-5">
        <div className="mb-5 flex items-center gap-3 border-b border-[#454545] pb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#383838] text-[#D4D4D4]">
            <Building2 size={18} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#F5F5F5]">
              Infrastructure & Reputation
            </h3>
            <p className="mt-0.5 text-xs text-[#A3A3A3]">
              Infrastructure, locality and parent profile
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
          {fields.slice(5, 9).map(renderField)}
        </div>
      </div>

      {/* Growth Potential */}
      <div className="rounded-2xl border border-[#454545] bg-[#262626] p-4 sm:p-5">
        <div className="mb-5 flex items-center gap-3 border-b border-[#454545] pb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#383838] text-[#D4D4D4]">
            <Lightbulb size={18} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#F5F5F5]">
              Growth & Improvement Potential
            </h3>
            <p className="mt-0.5 text-xs text-[#A3A3A3]">
              Identify opportunities and areas for improvement
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
          {fields.slice(9).map(renderField)}
        </div>
      </div>

      {/* Required fields note */}
      <p className="mt-6 text-xs text-[#A3A3A3]">
        <span className="mr-1 text-red-400">*</span>
        Required fields
      </p>
    </div>
  )
}
