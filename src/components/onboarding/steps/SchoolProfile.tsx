
"use client"

import { School, UserRound, GraduationCap } from "lucide-react"
import type { OnboardingStepProps } from "../OnboardingWizard"
import { useEffect, useState } from "react";

type FieldConfig = {
  name: string
  label: string
  placeholder: string
  type?: "text" | "number" | "url" | "select" | "textarea"
  wide?: boolean
  required?: boolean
  options?: string[]
}

const fields: FieldConfig[] = [
  {
    name: "schoolName",
    label: "School Name",
    placeholder: "Enter the school's full name",
    wide: true,
    required: true,
  },
  {
    name: "establishmentYear",
    label: "Establishment Year",
    placeholder: "e.g. 1998",
    type: "number",
    required: true,
  },
  {
    name: "board",
    label: "Board",
    placeholder: "Select school board",
    type: "select",
    options: ["CBSE", "ICSE", "State Board", "IB", "Other"],
  },
  {
    name: "classesUpto",
    label: "Classes Upto",
    placeholder: "e.g. Class 12",
  },
  {
    name: "website",
    label: "School Website",
    placeholder: "https://example.com",
    type: "url",
    wide: true,
  },
  {
    name: "decisionMaker",
    label: "Decision Maker Name",
    placeholder: "Enter full name",
  },
  {
    name: "decisionMakerContact",
    label: "Decision Maker Contact",
    placeholder: "Enter contact number",
  },
  {
    name: "principalName",
    label: "Principal's Name",
    placeholder: "Enter principal's full name",
  },
  {
    name: "principalContact",
    label: "Principal's Contact",
    placeholder: "Enter contact number",
  },
  {
    name: "directorBackground",
    label: "Background of Director / Decision Maker",
    placeholder: "Describe the director or decision maker's background...",
    type: "textarea",
    wide: true,
  },
  {
    name: "education",
    label: "Education",
    placeholder: "Enter educational qualifications and academic background...",
    type: "textarea",
    wide: true,
    required: true,
  },
  {
    name: "personalityAge",
    label: "Personality with Age",
    placeholder: "Describe personality and age...",
    type: "textarea",
    wide: true,
    required: true,
  },
  {
    name: "workProfile",
    label: "Work Profile / History",
    placeholder: "Describe professional history and experience...",
    type: "textarea",
    wide: true,
    required: true,
  },
]

export default function SchoolProfile({
  values,
  onChange,
  errors,
}: OnboardingStepProps) {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

useEffect(() => {
  setCurrentYear(new Date().getFullYear());
}, []);

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
      disabled:cursor-not-allowed disabled:opacity-50
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
        ) : field.type === "select" ? (
          <select
            id={field.name}
            value={values[field.name] || ""}
            onChange={(event) =>
              onChange(field.name, event.target.value)
            }
            aria-invalid={hasError}
            className={`${commonClass} h-12 cursor-pointer`}
          >
            <option value="" className="bg-[#262626] text-[#A3A3A3]">
              Select an option
            </option>

            {field.options?.map((option) => (
              <option
                key={option}
                value={option}
                className="bg-[#262626] text-[#F5F5F5]"
              >
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={field.name}
            type={field.type || "text"}
            min={field.type === "number" ? 1800 : undefined}
            max={
  field.name === "establishmentYear"
    ? currentYear ?? undefined
    : undefined
}
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
          <School size={23} />
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#A3A3A3]">
            Step 01
          </p>

          <h2 className="mt-1 text-xl font-bold tracking-tight text-[#F5F5F5] sm:text-2xl">
            School Profile & Leadership
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#A3A3A3]">
            Let's start by understanding the school, its background
            and the people responsible for its decisions.
          </p>
        </div>
      </div>

      {/* School Information */}
      <div className="mb-7 rounded-2xl border border-[#454545] bg-[#262626] p-4 sm:p-5">
        <div className="mb-5 flex items-center gap-3 border-b border-[#454545] pb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#383838] text-[#D4D4D4]">
            <GraduationCap size={19} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#F5F5F5]">
              School Information
            </h3>
            <p className="mt-0.5 text-xs text-[#A3A3A3]">
              Basic details about the institution
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
          {fields.slice(0, 5).map(renderField)}
        </div>
      </div>

      {/* Leadership Information */}
      <div className="rounded-2xl border border-[#454545] bg-[#262626] p-4 sm:p-5">
        <div className="mb-5 flex items-center gap-3 border-b border-[#454545] pb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#383838] text-[#D4D4D4]">
            <UserRound size={19} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#F5F5F5]">
              Leadership Information
            </h3>
            <p className="mt-0.5 text-xs text-[#A3A3A3]">
              Details about the decision makers and leadership
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
          {fields.slice(5).map(renderField)}
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
