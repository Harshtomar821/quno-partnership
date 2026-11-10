
"use client"

import {
  CalendarDays,
  Target,
  Users,
  Clock,
  MessageSquareText,
  ClipboardCheck,
  Check,
} from "lucide-react"

import type { OnboardingStepProps } from "../OnboardingWizard"

const demandOptions = [
  {
    label: "Increase the Strength of Students",
    description: "Student admissions and overall school growth",
  },
  {
    label: "Improve the Curriculum of the School",
    description: "Academic quality and curriculum development",
  },
  {
    label: "ERP Support — Efficiency and Productivity",
    description: "School management and operational automation",
  },
  {
    label: "Teacher's Training",
    description: "Teacher development and professional training",
  },
  {
    label: "Digital Support — Website / Digital Marketing",
    description: "Online presence and digital promotion",
  },
]

export default function ActionPlan({
  values,
  onChange,
  errors,
  demands,
  onToggleDemand,
}: OnboardingStepProps) {
  const inputClass =
    "h-12 w-full rounded-xl border border-[#454545] bg-[#303030] px-4 text-sm text-[#F5F5F5] outline-none transition placeholder:text-[#858585] hover:border-[#666666] focus:border-[#A3A3A3] focus:bg-[#383838] focus:ring-4 focus:ring-white/[0.06]"

  const textareaClass =
    "min-h-[110px] w-full resize-y rounded-xl border border-[#454545] bg-[#303030] px-4 py-3 text-sm text-[#F5F5F5] outline-none transition placeholder:text-[#858585] hover:border-[#666666] focus:border-[#A3A3A3] focus:bg-[#383838] focus:ring-4 focus:ring-white/[0.06]"

  return (
    <div>
      {/* Section Heading */}
      <div className="mb-8 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#525252] bg-[#303030] text-[#E5E5E5]">
          <ClipboardCheck size={23} />
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#A3A3A3]">
            Step 06
          </p>

          <h2 className="mt-1 text-xl font-bold tracking-tight text-[#F5F5F5] sm:text-2xl">
            Requirements & Next Meeting
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#A3A3A3]">
            Identify the school's actual needs and define the next
            course of action based on your overall assessment.
          </p>
        </div>
      </div>

      {/* Actual Demand */}
      <div
        id="demands"
        className="mb-8 rounded-2xl border border-[#454545] bg-[#303030]/70 p-4 sm:p-5"
      >
        <div className="mb-5 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#525252] bg-[#383838] text-[#E5E5E5]">
            <Target size={19} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#F5F5F5]">
              Actual Demand / Need of the School
              <span className="ml-1 text-red-400">*</span>
            </h3>

            <p className="mt-1 text-xs text-[#A3A3A3]">
              Select all the requirements that apply to this school.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {demandOptions.map((option) => {
            const checked = demands.includes(option.label)

            return (
              <button
                key={option.label}
                type="button"
                onClick={() => onToggleDemand(option.label)}
                aria-pressed={checked}
                className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition sm:p-4 ${
                  checked
                    ? "border-[#A3A3A3] bg-[#383838]"
                    : "border-[#454545] bg-[#262626] hover:border-[#737373] hover:bg-[#383838]"
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${
                    checked
                      ? "border-[#D4D4D4] bg-[#D4D4D4] text-[#171717]"
                      : "border-[#737373] bg-[#303030]"
                  }`}
                >
                  {checked && <Check size={13} />}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-[#F5F5F5]">
                    {option.label}
                  </span>

                  <span className="mt-1 block text-xs text-[#A3A3A3]">
                    {option.description}
                  </span>
                </span>
              </button>
            )
          })}
        </div>

        {errors.demands && (
          <p className="mt-3 text-xs font-medium text-red-400">
            {errors.demands}
          </p>
        )}

        <p className="mt-4 text-xs text-[#A3A3A3]">
          {demands.length} requirement{demands.length !== 1 ? "s" : ""} selected
        </p>
      </div>

      {/* Other Requirement */}
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-2">
          <MessageSquareText size={18} className="text-[#D4D4D4]" />
          <h3 className="text-sm font-bold text-[#F5F5F5]">
            Other Requirements
          </h3>
        </div>

        <label
          htmlFor="otherDemand"
          className="mb-2 block text-sm font-semibold text-[#D4D4D4]"
        >
          Other School Requirement
        </label>

        <textarea
          id="otherDemand"
          rows={3}
          value={values.otherDemand || ""}
          onChange={(event) =>
            onChange("otherDemand", event.target.value)
          }
          placeholder="Describe any additional requirements not covered above..."
          className={textareaClass}
        />
      </div>

      <div className="mb-8 border-t border-[#454545]" />

      {/* Next Meeting Approach */}
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-2">
          <Target size={18} className="text-[#D4D4D4]" />
          <h3 className="text-sm font-bold text-[#F5F5F5]">
            Approach for Next Meeting
            <span className="ml-1 text-red-400">*</span>
          </h3>
        </div>

        <textarea
          id="nextMeetingApproach"
          rows={4}
          value={values.nextMeetingApproach || ""}
          onChange={(event) =>
            onChange("nextMeetingApproach", event.target.value)
          }
          placeholder="Describe your strategy and action plan for the next meeting based on overall insights..."
          aria-invalid={Boolean(errors.nextMeetingApproach)}
          className={`${textareaClass} ${
            errors.nextMeetingApproach
              ? "border-red-400 focus:border-red-400 focus:ring-red-400/10"
              : ""
          }`}
        />

        {errors.nextMeetingApproach && (
          <p className="mt-1.5 text-xs font-medium text-red-400">
            {errors.nextMeetingApproach}
          </p>
        )}
      </div>

      <div className="mb-8 border-t border-[#454545]" />

      {/* Next Meeting Details */}
      <div className="mb-8">
        <div className="mb-5 flex items-center gap-2">
          <CalendarDays size={18} className="text-[#D4D4D4]" />
          <h3 className="text-sm font-bold text-[#F5F5F5]">
            Next Meeting Details
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label
              htmlFor="nextMeetingPerson"
              className="mb-2 block text-sm font-semibold text-[#D4D4D4]"
            >
              Next Meeting With — Person
            </label>

            <div className="relative">
              <Users
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#858585]"
              />

              <input
                id="nextMeetingPerson"
                type="text"
                value={values.nextMeetingPerson || ""}
                onChange={(event) =>
                  onChange("nextMeetingPerson", event.target.value)
                }
                placeholder="Enter person's name"
                className={`${inputClass} pl-11`}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="nextMeetingDate"
              className="mb-2 block text-sm font-semibold text-[#D4D4D4]"
            >
              Next Meeting Date
            </label>

            <div className="relative">
              <CalendarDays
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#858585]"
              />

              <input
                id="nextMeetingDate"
                type="date"
                value={values.nextMeetingDate || ""}
                onChange={(event) =>
                  onChange("nextMeetingDate", event.target.value)
                }
                className={`${inputClass} pl-11`}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="nextMeetingTime"
              className="mb-2 block text-sm font-semibold text-[#D4D4D4]"
            >
              Next Meeting Time
            </label>

            <div className="relative">
              <Clock
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#858585]"
              />

              <input
                id="nextMeetingTime"
                type="time"
                value={values.nextMeetingTime || ""}
                onChange={(event) =>
                  onChange("nextMeetingTime", event.target.value)
                }
                className={`${inputClass} pl-11`}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 border-t border-[#454545]" />

      {/* Remarks */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <MessageSquareText size={18} className="text-[#D4D4D4]" />
          <h3 className="text-sm font-bold text-[#F5F5F5]">
            Additional Remarks
          </h3>
        </div>

        <label
          htmlFor="remarks"
          className="mb-2 block text-sm font-semibold text-[#D4D4D4]"
        >
          Remarks
        </label>

        <textarea
          id="remarks"
          rows={4}
          value={values.remarks || ""}
          onChange={(event) => onChange("remarks", event.target.value)}
          placeholder="Add any additional observations or remarks..."
          className={textareaClass}
        />
      </div>

      <div className="mt-6 rounded-xl border border-[#454545] bg-[#303030] p-4">
        <p className="text-xs leading-relaxed text-[#A3A3A3]">
          Once all sections are completed, select{" "}
          <strong className="text-[#E5E5E5]">Review Application</strong>{" "}
          to verify the information before submission.
        </p>
      </div>
    </div>
  )
}
