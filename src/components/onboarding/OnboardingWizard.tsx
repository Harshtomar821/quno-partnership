
"use client"

import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  LoaderCircle,
  ShieldCheck,
} from "lucide-react"
import { Toaster, toast } from "react-hot-toast"

import { MagicCard } from "@/components/ui/magic-card"
import { BorderBeam } from "@/components/ui/border-beam"
import { ShimmerButton } from "@/components/ui/shimmer-button"

import WizardProgress from "./WizardProgress"
import SchoolProfile from "./steps/SchoolProfile"
import SchoolAssessment from "./steps/SchoolAssessment"
import CompetitorAnalysis from "./steps/CompetitorAnalysis"
import VendorDetails from "./steps/VendorDetails"
import ResistanceInsights from "./steps/ResistanceInsights"
import ActionPlan from "./steps/ActionPlan"

export type OnboardingStepProps = {
  values: Record<string, string>
  onChange: (name: string, value: string) => void
  errors: Record<string, string>
  demands: string[]
  onToggleDemand: (value: string) => void
}

const steps = [
  { title: "School Profile & Leadership", component: SchoolProfile },
  { title: "School Assessment", component: SchoolAssessment },
  { title: "Business Intent & Competitors", component: CompetitorAnalysis },
  { title: "Existing Vendor Ecosystem", component: VendorDetails },
  { title: "Resistance & Opportunity Insights", component: ResistanceInsights },
  { title: "Requirements & Next Meeting", component: ActionPlan },
]

const requiredFields = [
  "schoolName",
  "establishmentYear",
  "education",
  "personalityAge",
  "workProfile",
  "schoolStrength",
  "meetingsDone",
  "meetingOpinion",
  "feesFrom",
  "feesTo",
  "buildingCondition",
  "schoolReputation",
  "areaLocality",
  "parentsEducation",
  "distinguishingFactor",
  "improvementPotential",
  "purposePassion",
  "purposeIncome",
  "counterApproach",
  "positivePoints",
  "negativePoints",
  "nextMeetingApproach",
]

const initialValues: Record<string, string> = {
  schoolName: "",
  establishmentYear: "",
  board: "",
  classesUpto: "",
  website: "",
  decisionMaker: "",
  decisionMakerContact: "",
  principalName: "",
  principalContact: "",
  directorBackground: "",
  education: "",
  personalityAge: "",
  workProfile: "",

  schoolStrength: "",
  meetingsDone: "",
  meetingOpinion: "",
  feesFrom: "",
  feesTo: "",
  buildingCondition: "",
  schoolReputation: "",
  areaLocality: "",
  parentsEducation: "",
  distinguishingFactor: "",
  improvementPotential: "",

  purposePassion: "",
  purposeIncome: "",
  purposeOthers: "",
  competitor1Name: "",
  competitor1Strength: "",
  competitor1Fees: "",
  competitor1Status: "",
  competitor2Name: "",
  competitor2Strength: "",
  competitor2Fees: "",
  competitor2Status: "",

  vendor1Name: "",
  vendor1Domain: "",
  vendor1Offerings: "",
  vendor2Name: "",
  vendor2Domain: "",
  vendor2Offerings: "",

  resistance1: "",
  resistance2: "",
  resistance3: "",
  counterApproach: "",
  positivePoints: "",
  negativePoints: "",

  otherDemand: "",
  nextMeetingApproach: "",
  nextMeetingPerson: "",
  nextMeetingDate: "",
  nextMeetingTime: "",
  remarks: "",
}

const sectionFields: Record<number, string[]> = {
  0: [
    "schoolName",
    "establishmentYear",
    "board",
    "classesUpto",
    "website",
    "decisionMaker",
    "decisionMakerContact",
    "principalName",
    "principalContact",
    "directorBackground",
    "education",
    "personalityAge",
    "workProfile",
  ],
  1: [
    "schoolStrength",
    "meetingsDone",
    "meetingOpinion",
    "feesFrom",
    "feesTo",
    "buildingCondition",
    "schoolReputation",
    "areaLocality",
    "parentsEducation",
    "distinguishingFactor",
    "improvementPotential",
  ],
  2: [
    "purposePassion",
    "purposeIncome",
    "purposeOthers",
    "competitor1Name",
    "competitor1Strength",
    "competitor1Fees",
    "competitor1Status",
    "competitor2Name",
    "competitor2Strength",
    "competitor2Fees",
    "competitor2Status",
  ],
  3: [
    "vendor1Name",
    "vendor1Domain",
    "vendor1Offerings",
    "vendor2Name",
    "vendor2Domain",
    "vendor2Offerings",
  ],
  4: [
    "resistance1",
    "resistance2",
    "resistance3",
    "counterApproach",
    "positivePoints",
    "negativePoints",
  ],
  5: [
    "otherDemand",
    "nextMeetingApproach",
    "nextMeetingPerson",
    "nextMeetingDate",
    "nextMeetingTime",
    "remarks",
  ],
}

function formatFieldName(name: string) {
  return name
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (letter) => letter.toUpperCase())
}

export default function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] =
    useState<Record<string, string>>(initialValues)
  const [demands, setDemands] = useState<string[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [reviewMode, setReviewMode] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const progress = useMemo(
    () => Math.round(((currentStep + 1) / steps.length) * 100),
    [currentStep]
  )

  const updateField = (name: string, value: string) => {
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))

    if (value.trim()) {
      setErrors((previous) => {
        const updated = { ...previous }
        delete updated[name]
        return updated
      })
    }
  }

  const toggleDemand = (value: string) => {
    setDemands((previous) =>
      previous.includes(value)
        ? previous.filter((item) => item !== value)
        : [...previous, value]
    )

    setErrors((previous) => {
      const updated = { ...previous }
      delete updated.demands
      return updated
    })
  }

  const validateCurrentStep = () => {
    const fieldsByStep = [
      [
        "schoolName",
        "establishmentYear",
        "education",
        "personalityAge",
        "workProfile",
      ],
      [
        "schoolStrength",
        "meetingsDone",
        "meetingOpinion",
        "feesFrom",
        "feesTo",
        "buildingCondition",
        "schoolReputation",
        "areaLocality",
        "parentsEducation",
        "distinguishingFactor",
        "improvementPotential",
      ],
      ["purposePassion", "purposeIncome"],
      [],
      ["counterApproach", "positivePoints", "negativePoints"],
      ["nextMeetingApproach"],
    ]

    const currentFields = fieldsByStep[currentStep] ?? []
    const newErrors: Record<string, string> = {}

    currentFields.forEach((fieldName) => {
      if (
        requiredFields.includes(fieldName) &&
        !formData[fieldName]?.trim()
      ) {
        newErrors[fieldName] = "This field is required"
      }
    })

    if (currentStep === 5 && demands.length === 0) {
      newErrors.demands = "Please select at least one school requirement"
    }

    setErrors((previous) => ({
      ...previous,
      ...newErrors,
    }))

    const firstError = Object.keys(newErrors)[0]

    if (firstError) {
      toast.error("Please complete all required fields.")

      requestAnimationFrame(() => {
        document.getElementById(firstError)?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
      })

      return false
    }

    return true
  }

  const goNext = () => {
    if (!validateCurrentStep()) return

    if (currentStep < steps.length - 1) {
      setCurrentStep((previous) => previous + 1)
    } else {
      setReviewMode(true)
      toast.success("All sections completed. Please review your application.")
    }

    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const goBack = () => {
    if (reviewMode) {
      setReviewMode(false)
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    if (currentStep > 0) {
      setCurrentStep((previous) => previous - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

 
const handleSubmit = async () => {
  if (isSubmitting || submitted) return;

  setIsSubmitting(true);

  try {
    const response = await fetch("/api/schools", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        ...formData,
        demands,
      }),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok || !result.success) {
      const apiErrors: Record<string, string> = {};

      // Prefer detailed Zod validation errors
      if (Array.isArray(result.validationErrors)) {
        result.validationErrors.forEach(
          (issue: { field?: string; message?: string }) => {
            if (issue.field && issue.message) {
              apiErrors[issue.field] = issue.message;
            }
          }
        );
      }

      // Fallback to flattened Zod field errors
      if (
        Object.keys(apiErrors).length === 0 &&
        result.errors &&
        typeof result.errors === "object"
      ) {
        Object.entries(result.errors).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            apiErrors[key] = value.join(", ");
          } else {
            apiErrors[key] = String(value);
          }
        });
      }

      if (Object.keys(apiErrors).length > 0) {
        setErrors((previous) => ({
          ...previous,
          ...apiErrors,
        }));

        // Find the first invalid field
        const firstErrorField = Object.keys(apiErrors)[0];

        // Find which wizard step contains this field
        let errorStep = sectionFields.findIndex((fields) =>
          fields.includes(firstErrorField)
        );

        // Handle school requirements validation
        if (firstErrorField === "demands") {
          errorStep = 5;
        }

        if (errorStep !== -1) {
          // Navigate from review mode to the invalid step
          setReviewMode(false);
          setCurrentStep(errorStep);

          // Scroll to the invalid field after the step renders
          window.setTimeout(() => {
            document.getElementById(firstErrorField)?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }, 350);
        }

        toast.error(
          `${formatFieldName(firstErrorField)}: ${apiErrors[firstErrorField]}`,
          { duration: 6000 }
        );

        return;
      }

      throw new Error(
        result.message ||
          result.error ||
          "Unable to submit application."
      );
    }

    const githubStatus =
      result.school?.githubStatus ?? result.school?.github?.status;

    if (githubStatus === "failed") {
      toast.success(
        "Application saved successfully. GitHub sync is pending.",
        { duration: 5000 }
      );
    } else {
      toast.success("Application submitted successfully!", {
        duration: 5000,
      });
    }

    // Reset only after successful submission
    setFormData({ ...initialValues });
    setDemands([]);
    setErrors({});
    setCurrentStep(0);
    setReviewMode(false);
    setSubmitted(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } catch (error) {
    console.error("School application submission error:", error);

    toast.error(
      error instanceof Error
        ? error.message
        : "Something went wrong. Please try again.",
      { duration: 5000 }
    );
  } finally {
    setIsSubmitting(false);
  }
};


  const ActiveStep = steps[currentStep].component

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#171717] px-4 py-6 text-[#F5F5F5] sm:px-8 sm:py-10">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            border: "1px solid #454545",
            borderRadius: "12px",
            background: "#262626",
            color: "#F5F5F5",
            padding: "14px 18px",
          },
          success: {
            style: {
              background: "#052E16",
              border: "1px solid #166534",
              color: "#DCFCE7",
            },
            iconTheme: {
              primary: "#22C55E",
              secondary: "#052E16",
            },
          },
          error: {
            style: {
              background: "#450A0A",
              border: "1px solid #991B1B",
              color: "#FEE2E2",
            },
            iconTheme: {
              primary: "#EF4444",
              secondary: "#450A0A",
            },
          },
        }}
      />

      {/* Subtle grey background lighting */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-white/[0.025] blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 top-[30rem] h-96 w-96 rounded-full bg-white/[0.02] blur-[120px]" />

      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
        <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#454545] bg-[#262626] text-[#E5E5E5] shadow-lg shadow-black/20">
              <GraduationCap size={28} strokeWidth={1.8} />
            </div>

            <div>
              <p className="text-[11px] font-extrabold tracking-[0.25em] text-[#A3A3A3]">
                QUNO INDIA
              </p>
              <h1 className="mt-1 text-xl font-bold tracking-tight text-[#F5F5F5] sm:text-2xl">
                School Assessment
              </h1>
              <p className="mt-0.5 text-xs text-[#A3A3A3] sm:text-sm">
                School Partnership & Application Portal
              </p>
            </div>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full border border-[#454545] bg-[#262626] px-4 py-2.5 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#A3A3A3]" />
            <span className="text-xs font-semibold text-[#D4D4D4]">
              Detailed Application Form
            </span>
          </div>
        </header>

        {/* Intro */}
        <div className="mb-6">
          <p className="max-w-2xl text-sm leading-6 text-[#A3A3A3]">
            Complete the following sections to create a detailed school
            assessment and partnership application.
          </p>
        </div>

        {/* Progress overview */}
        <div className="mb-7 rounded-2xl border border-[#454545] bg-[#262626] p-4 shadow-xl shadow-black/10 sm:p-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#A3A3A3]">
                Your progress
              </p>
              <p className="mt-1 text-sm font-bold text-[#F5F5F5]">
                {reviewMode
                  ? "Ready for review"
                  : `Section ${currentStep + 1} of ${steps.length}`}
              </p>
            </div>

            <span className="rounded-lg border border-[#525252] bg-[#303030] px-3 py-1.5 text-sm font-bold tabular-nums text-[#F5F5F5]">
              {reviewMode ? "100%" : `${progress}%`}
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-[#171717]">
            <motion.div
              className="h-full rounded-full bg-[#A3A3A3]"
              initial={false}
              animate={{
                width: reviewMode ? "100%" : `${progress}%`,
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Step navigation */}
        <div className="mb-7">
          <WizardProgress
            currentStep={currentStep}
            totalSteps={steps.length}
            steps={steps.map((step) => step.title)}
            progress={progress}
            reviewMode={reviewMode}
          />
        </div>

        {/* Main form */}
        <MagicCard
          mode="gradient"
          gradientSize={320}
          gradientFrom="#525252"
          gradientTo="#262626"
          gradientColor="rgba(255,255,255,0.025)"
          gradientOpacity={0.35}
          className="rounded-3xl border border-[#454545] shadow-[0_25px_80px_rgba(0,0,0,0.3)]"
        >
          <section className="relative overflow-hidden rounded-3xl bg-[#262626] p-5 sm:p-8 lg:p-10">
            <BorderBeam
              size={180}
              duration={15}
              colorFrom="#737373"
              colorTo="#404040"
              borderWidth={1}
            />

            <AnimatePresence mode="wait">
              {!reviewMode ? (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="relative z-10"
                >
                  <div className="mb-7 border-b border-[#454545] pb-5">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="rounded-md border border-[#525252] bg-[#303030] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#E5E5E5]">
                        Section {currentStep + 1}
                      </span>

                      <span className="text-xs text-[#A3A3A3]">
                        {steps.length - currentStep - 1} sections remaining
                      </span>
                    </div>

                    <h2 className="text-xl font-bold tracking-tight text-[#F5F5F5] sm:text-2xl">
                      {steps[currentStep].title}
                    </h2>

                    <p className="mt-1 text-sm text-[#A3A3A3]">
                      Fill in the details below to continue.
                    </p>
                  </div>

                  <ActiveStep
                    values={formData}
                    onChange={updateField}
                    errors={errors}
                    demands={demands}
                    onToggleDemand={toggleDemand}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="relative z-10"
                >
                  {/* Review heading */}
                  <div className="mb-8 flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#525252] bg-[#303030] text-[#E5E5E5]">
                      <ClipboardCheck size={24} />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#A3A3A3]">
                        Final step
                      </p>

                      <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#F5F5F5]">
                        Review Application
                      </h2>

                      <p className="mt-1 text-sm text-[#A3A3A3]">
                        Make sure all the information is correct before
                        submitting.
                      </p>
                    </div>
                  </div>

                  {/* Review sections */}
                  <div className="space-y-4">
                    {steps.map((step, index) => (
                      <div
                        key={step.title}
                        className="overflow-hidden rounded-2xl border border-[#454545] bg-[#303030] transition-colors hover:border-[#666666]"
                      >
                        <div className="flex items-center justify-between gap-3 border-b border-[#454545] bg-[#262626] px-4 py-4 sm:px-5">
                          <div className="flex min-w-0 items-center gap-3">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#525252] bg-[#383838] text-xs font-bold text-[#E5E5E5]">
                              {String(index + 1).padStart(2, "0")}
                            </span>

                            <h3 className="truncate text-sm font-bold text-[#F5F5F5]">
                              {step.title}
                            </h3>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              setReviewMode(false)
                              setCurrentStep(index)
                              window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                              })
                            }}
                            className="shrink-0 rounded-lg px-3 py-2 text-xs font-semibold text-[#D4D4D4] transition hover:bg-[#383838] hover:text-white"
                          >
                            Edit
                          </button>
                        </div>

                        <div className="grid gap-x-6 gap-y-5 p-4 sm:grid-cols-2 sm:p-5">
                          {sectionFields[index]
                            .filter((name) => {
                              if (index === 5 && name === "otherDemand") {
                                return Boolean(formData[name]?.trim())
                              }
                              return true
                            })
                            .map((name) => (
                              <div key={name} className="min-w-0">
                                <p className="text-[11px] font-medium text-[#A3A3A3]">
                                  {formatFieldName(name)}
                                </p>

                                <p className="mt-1 break-words whitespace-pre-wrap text-sm font-medium text-[#E5E5E5]">
                                  {formData[name] || "—"}
                                </p>
                              </div>
                            ))}
                        </div>

                        {index === 5 && (
                          <div className="border-t border-[#454545] bg-[#262626] p-4 sm:p-5">
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#D4D4D4]">
                              Selected School Requirements
                            </p>

                            {demands.length > 0 ? (
                              <div className="mt-3 flex flex-wrap gap-2">
                                {demands.map((demand) => (
                                  <span
                                    key={demand}
                                    className="rounded-full border border-[#525252] bg-[#383838] px-3 py-1.5 text-xs font-medium text-[#E5E5E5]"
                                  >
                                    {demand}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <p className="mt-2 text-sm text-[#A3A3A3]">
                                —
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Submission notice */}
                  <div className="mt-6 flex gap-3 rounded-2xl border border-[#525252] bg-[#303030] p-4">
                    <ShieldCheck
                      size={21}
                      className="mt-0.5 shrink-0 text-[#D4D4D4]"
                    />

                    <div>
                      <p className="text-sm font-semibold text-[#F5F5F5]">
                        Almost there!
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#A3A3A3]">
                        Your application will be saved securely. Please verify
                        the details before submitting.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="relative z-10 mt-9 flex flex-col-reverse gap-3 border-t border-[#454545] pt-6 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={goBack}
                disabled={
                  (currentStep === 0 && !reviewMode) ||
                  isSubmitting ||
                  submitted
                }
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#525252] bg-[#303030] px-5 text-sm font-semibold text-[#E5E5E5] transition hover:border-[#737373] hover:bg-[#383838] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft size={17} />
                Previous
              </button>

              {!reviewMode ? (
                <ShimmerButton
                  type="button"
                  onClick={goNext}
                  shimmerColor="#737373"
                  shimmerDuration="3s"
                  background="linear-gradient(110deg, #383838, #525252, #383838)"
                  className="h-12 rounded-xl border border-[#666666] px-7 text-sm font-semibold text-[#F5F5F5] shadow-lg shadow-black/20"
                >
                  {currentStep === steps.length - 1
                    ? "Review Application"
                    : "Continue"}
                  <ArrowRight size={17} className="ml-2" />
                </ShimmerButton>
              ) : (
                <ShimmerButton
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting || submitted}
                  shimmerColor="#737373"
                  shimmerDuration="3s"
                  background="linear-gradient(110deg, #383838, #525252, #383838)"
                  className="h-12 rounded-xl border border-[#666666] px-7 text-sm font-semibold text-[#F5F5F5] shadow-lg shadow-black/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <LoaderCircle size={17} className="mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : submitted ? (
                    <>
                      <Check size={17} className="mr-2" />
                      Submitted
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={17} className="mr-2" />
                      Submit Application
                    </>
                  )}
                </ShimmerButton>
              )}
            </div>
          </section>
        </MagicCard>

        {/* Footer */}
        <footer className="mt-7 flex flex-col items-center justify-between gap-2 pb-4 text-center text-xs text-[#737373] sm:flex-row">
          <p>© 2026 QUNO INDIA · Netlarx Softwares Pvt. Ltd.</p>

          <p className="flex items-center gap-1.5">
            <ShieldCheck size={13} />
            School Assessment & Partnership Application
          </p>
        </footer>
      </div>
    </main>
  )
}
