"use client"

import {
  Lightbulb,
  ShieldAlert,
  MessageSquareText,
  TrendingUp,
  AlertTriangle,
} from "lucide-react"

import type { OnboardingStepProps } from "../OnboardingWizard"

type FieldConfig = {
  name: string
  label: string
  placeholder: string
  required?: boolean
}

const resistanceFields: FieldConfig[] = [
  {
    name: "resistance1",
    label: "Resistance Reason 01",
    placeholder: "Describe the first reason for resistance or objection...",
  },
  {
    name: "resistance2",
    label: "Resistance Reason 02",
    placeholder: "Describe the second reason for resistance or objection...",
  },
  {
    name: "resistance3",
    label: "Resistance Reason 03",
    placeholder: "Describe the third reason for resistance or objection...",
  },
]

const insightFields: FieldConfig[] = [
  {
    name: "counterApproach",
    label: "Own Approach for Countering Resistances / Responses Delivered",
    placeholder:
      "Explain how you addressed objections, what responses were delivered and your approach to resolving concerns...",
    required: true,
  },
  {
    name: "positivePoints",
    label: "Additional Positive Points to Highlight",
    placeholder:
      "Mention additional positive observations, opportunities and strengths...",
    required: true,
  },
  {
    name: "negativePoints",
    label: "Additional Negative Points to Highlight",
    placeholder:
      "Mention challenges, concerns, risks or negative observations...",
    required: true,
  },
]

export default function ResistanceInsights({
  values,
  onChange,
  errors,
}: OnboardingStepProps) {
  const renderField = (field: FieldConfig) => {
    const hasError = Boolean(errors[field.name])

    return (
      <div key={field.name}>
        <label
          htmlFor={field.name}
          className="mb-2 block text-sm font-semibold text-[#D4D4D4]"
        >
          {field.label}
          {field.required && (
            <span className="ml-1 text-red-400">*</span>
          )}
        </label>

        <textarea
          id={field.name}
          rows={3}
          value={values[field.name] || ""}
          onChange={(event) =>
            onChange(field.name, event.target.value)
          }
          placeholder={field.placeholder}
          aria-invalid={hasError}
          className={`min-h-[110px] w-full resize-y rounded-xl border bg-[#303030] px-4 py-3 text-sm text-[#F5F5F5] outline-none transition placeholder:text-[#858585] hover:border-[#666666] focus:bg-[#383838] focus:ring-4 ${
            hasError
              ? "border-red-400 focus:border-red-400 focus:ring-red-400/10"
              : "border-[#454545] focus:border-[#A3A3A3] focus:ring-white/[0.06]"
          }`}
        />

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
          <Lightbulb size={23} />
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#A3A3A3]">
            Step 05
          </p>

          <h2 className="mt-1 text-xl font-bold tracking-tight text-[#F5F5F5] sm:text-2xl">
            Resistance & Opportunity Insights
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#A3A3A3]">
            Record the school's concerns, objections, your responses
            and important opportunities identified during discussions.
          </p>
        </div>
      </div>

      {/* Resistance Reasons */}
      <div className="mb-8 rounded-2xl border border-[#454545] bg-[#303030]/70 p-4 sm:p-5">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#525252] bg-[#383838] text-[#E5E5E5]">
            <ShieldAlert size={19} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#F5F5F5]">
              Reasons for Resistance
            </h3>

            <p className="text-xs text-[#A3A3A3]">
              Identify the main objections and concerns raised by the school.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {resistanceFields.map(renderField)}
        </div>
      </div>

      {/* Counter Approach */}
      <div className="mb-8">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#525252] bg-[#383838] text-[#E5E5E5]">
            <MessageSquareText size={19} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#F5F5F5]">
              Counter Approach
            </h3>

            <p className="text-xs text-[#A3A3A3]">
              Document how the concerns were addressed.
            </p>
          </div>
        </div>

        {renderField(insightFields[0])}
      </div>

      <div className="mb-8 border-t border-[#454545]" />

      {/* Positive Insights */}
      <div className="mb-8">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#525252] bg-[#383838] text-[#E5E5E5]">
            <TrendingUp size={19} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#F5F5F5]">
              Positive Points
            </h3>

            <p className="text-xs text-[#A3A3A3]">
              Capture additional strengths and opportunities.
            </p>
          </div>
        </div>

        {renderField(insightFields[1])}
      </div>

      <div className="mb-8 border-t border-[#454545]" />

      {/* Negative Insights */}
      <div>
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#525252] bg-[#383838] text-[#E5E5E5]">
            <AlertTriangle size={19} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#F5F5F5]">
              Negative Points
            </h3>

            <p className="text-xs text-[#A3A3A3]">
              Capture additional challenges and concerns.
            </p>
          </div>
        </div>

        {renderField(insightFields[2])}
      </div>

      <p className="mt-6 text-xs text-[#A3A3A3]">
        <span className="text-red-400">*</span> Required fields
      </p>
    </div>
  )
}
