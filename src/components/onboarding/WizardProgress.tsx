
"use client"

import { motion } from "motion/react"
import {
  Check,
  School,
  GraduationCap,
  Target,
  Handshake,
  Lightbulb,
  CalendarDays,
} from "lucide-react"

type WizardProgressProps = {
  currentStep: number
  totalSteps: number
  steps: string[]
  progress: number
  reviewMode: boolean
}

const stepIcons = [
  School,
  GraduationCap,
  Target,
  Handshake,
  Lightbulb,
  CalendarDays,
]

export default function WizardProgress({
  currentStep,
  totalSteps,
  steps,
  progress,
  reviewMode,
}: WizardProgressProps) {
  return (
    <div className="mb-7 rounded-2xl border border-[#454545] bg-[#262626] p-4 shadow-xl shadow-black/10 sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#A3A3A3]">
            Application Progress
          </p>

          <p className="mt-1 text-sm font-semibold text-[#F5F5F5]">
            {reviewMode
              ? "Final Review"
              : `Step ${currentStep + 1} of ${totalSteps}`}
          </p>
        </div>

        <span className="text-lg font-bold tabular-nums text-[#E5E5E5]">
          {reviewMode ? "Review" : `${progress}%`}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-2 overflow-hidden rounded-full bg-[#171717]">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#737373] via-[#A3A3A3] to-[#D4D4D4]"
          initial={false}
          animate={{
            width: `${reviewMode ? 100 : progress}%`,
          }}
          transition={{
            duration: 0.45,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Desktop Step Indicators */}
      <div className="mt-4 hidden grid-cols-6 gap-2 md:grid">
        {steps.map((step, index) => {
          const Icon = stepIcons[index] ?? School
          const completed = index < currentStep || reviewMode
          const active = index === currentStep && !reviewMode

          return (
            <div
              key={step}
              className="flex min-w-0 items-center gap-2"
              title={step}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border transition-all duration-200 ${
                  completed
                    ? "border-[#D4D4D4] bg-[#D4D4D4] text-[#171717]"
                    : active
                      ? "border-[#A3A3A3] bg-[#383838] text-[#F5F5F5] ring-1 ring-[#737373]"
                      : "border-[#454545] bg-[#303030] text-[#737373]"
                }`}
              >
                {completed ? <Check size={15} /> : <Icon size={15} />}
              </div>

              <span
                className={`truncate text-[10px] font-semibold ${
                  active
                    ? "text-[#F5F5F5]"
                    : completed
                      ? "text-[#D4D4D4]"
                      : "text-[#737373]"
                }`}
              >
                {`0${index + 1}`}
              </span>
            </div>
          )
        })}
      </div>

      {/* Mobile Step Indicator */}
      <div className="mt-4 flex items-center justify-between md:hidden">
        <p className="text-xs font-medium text-[#A3A3A3]">
          {reviewMode ? "All sections completed" : steps[currentStep]}
        </p>

        <p className="text-xs font-bold text-[#E5E5E5]">
          {reviewMode ? totalSteps : currentStep + 1}/{totalSteps}
        </p>
      </div>
    </div>
  )
}
