
"use client"

import Image from "next/image"
import { useState, type FormEvent } from "react"
import { Printer, School, Building2, Send } from "lucide-react"

export default function SchoolOnboardingForm() {
  const [formData, setFormData] = useState({
    schoolName: "",
    schoolAddress: "",
    affiliation: "",
    signatoryName: "",
    designation: "",
    contactNumber: "",
    email: "",
    studentStrength: "",
    relationshipManager: "",
    managerContact: "",
    managerEmail: "",
    onboardingDate: "",
  })

  const [submitting, setSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const [agreement, setAgreement] = useState({
    uniforms: false,
    booksAndStationery: false,
  })

  const updateField = (
    field: keyof typeof formData,
    value: string
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (submitting) return

    setSubmitting(true)
    setSubmitMessage("")
    setSubmitSuccess(false)

    const payload = {
      ...formData,
      studentStrength: Number(formData.studentStrength),
      services: {
        uniforms: agreement.uniforms,
        booksAndStationery: agreement.booksAndStationery,
      },
    }

    try {
      const response = await fetch("/api/schools", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Failed to submit onboarding form"
        )
      }

      setSubmitSuccess(true)

      if (result.school?.github?.status === "created") {
        setSubmitMessage(
          "School onboarded successfully! GitHub Pull Request has also been created."
        )
      } else if (result.school?.githubStatus === "failed") {
        setSubmitMessage(
          "School details saved successfully, but GitHub integration failed. The GitHub operation can be retried."
        )
      } else {
        setSubmitMessage(
          result.message || "School onboarding form submitted successfully!"
        )
      }
    } catch (error) {
      setSubmitSuccess(false)

      setSubmitMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="onboarding-page min-h-screen bg-slate-100 px-4 py-8 text-slate-800 sm:px-8">
      {/* Toolbar */}
      <div className="no-print mx-auto mb-6 flex max-w-[850px] items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">School Onboarding</h1>
          <p className="text-xs text-slate-500">
            Create a new school onboarding document
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            <Printer size={16} />
            Print Form
          </button>

          <button
            type="submit"
            form="school-onboarding-form"
            disabled={submitting}
            className="flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Send size={16} />
            {submitting ? "Submitting..." : "Submit Form"}
          </button>
        </div>
      </div>

      {/* A4 Document */}
      <form
        id="school-onboarding-form"
        onSubmit={handleSubmit}
        className="onboarding-paper mx-auto w-full max-w-[850px] bg-white px-7 py-8 shadow-xl sm:px-12 sm:py-10"
      >
        {/* Document Header */}
        <header className="border-b-2 border-slate-800 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <Image
                src="/quno-logo.png"
                alt="Quno"
                width={150}
                height={65}
                priority
                className="h-auto w-[125px] object-contain"
              />

              <p className="text-[9px] font-semibold tracking-wide text-slate-500">
                INDIA&apos;S FIRST KID&apos;S ESSENTIALS PLATFORM
              </p>
            </div>

            <div className="text-right">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                Document
              </p>

              <p className="mt-1 text-xs font-bold text-slate-800">
                SCHOOL ONBOARDING
              </p>
            </div>
          </div>

          <div className="mt-5 text-center">
            <h2 className="text-xl font-extrabold tracking-wide text-slate-900">
              SCHOOL ONBOARDING FORM
            </h2>

            <p className="mt-1 text-[11px] font-semibold text-slate-600">
              Uniform Vendor & Book Vendor Partnership Agreement
            </p>
          </div>

          <p className="mt-4 text-[10px] leading-relaxed text-slate-600">
            This Vendor Onboarding Form sets out the terms of the commercial
            arrangement between the School identified below and QunoIndia, a
            product of Netlarx Softwares Pvt. Ltd. for the supply and
            distribution of school uniforms, books, and other agreed school
            essentials.
          </p>
        </header>

        {/* Party A */}
        <section className="mt-7">
          <div className="mb-3 flex items-center gap-2">
            <School size={16} />
            <h3 className="text-[13px] font-extrabold tracking-wide">
              1. PARTY A - SCHOOL DETAILS
            </h3>
          </div>

          <div className="onboarding-table">
            {[
              {
                label: "School Name",
                field: "schoolName",
                placeholder: "Enter school name",
                type: "text",
              },
              {
                label: "School Address",
                field: "schoolAddress",
                placeholder: "Enter complete school address",
                type: "textarea",
              },
            ].map((item) => (
              <div className="onboarding-row" key={item.field}>
                <label htmlFor={item.field}>{item.label}</label>

                <div>
                  {item.type === "textarea" ? (
                    <textarea
                      id={item.field}
                      rows={2}
                      placeholder={item.placeholder}
                      value={
                        formData[item.field as keyof typeof formData]
                      }
                      onChange={(e) =>
                        updateField(
                          item.field as keyof typeof formData,
                          e.target.value
                        )
                      }
                      required
                    />
                  ) : (
                    <input
                      id={item.field}
                      type="text"
                      placeholder={item.placeholder}
                      value={
                        formData[item.field as keyof typeof formData]
                      }
                      onChange={(e) =>
                        updateField(
                          item.field as keyof typeof formData,
                          e.target.value
                        )
                      }
                      required
                    />
                  )}
                </div>
              </div>
            ))}

            <div className="onboarding-row">
              <label htmlFor="affiliation">Affiliation / Board</label>

              <div>
                <select
                  id="affiliation"
                  value={formData.affiliation}
                  onChange={(e) =>
                    updateField("affiliation", e.target.value)
                  }
                  required
                >
                  <option value="">Select Board</option>
                  <option value="CBSE">CBSE</option>
                  <option value="ICSE">ICSE</option>
                  <option value="State">State Board</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {[
              ["Authorized Signatory Name", "signatoryName", "Enter full name"],
              ["Designation", "designation", "Enter designation"],
              ["Contact Number", "contactNumber", "Enter contact number"],
              ["Email Address", "email", "Enter email address"],
              ["Approx. Student Strength", "studentStrength", "Enter student count"],
            ].map(([label, field, placeholder]) => (
              <div className="onboarding-row" key={field}>
                <label htmlFor={field}>{label}</label>

                <div>
                  <input
                    id={field}
                    type={
                      field === "email"
                        ? "email"
                        : field === "studentStrength"
                          ? "number"
                          : "text"
                    }
                    min={field === "studentStrength" ? 1 : undefined}
                    step={field === "studentStrength" ? 1 : undefined}
                    placeholder={placeholder}
                    value={formData[field as keyof typeof formData]}
                    onChange={(e) =>
                      updateField(
                        field as keyof typeof formData,
                        e.target.value
                      )
                    }
                    required
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Party B */}
        <section className="mt-7">
          <div className="mb-3 flex items-center gap-2">
            <Building2 size={16} />

            <h3 className="text-[13px] font-extrabold tracking-wide">
              2. PARTY B - QUNOINDIA (NETLARX SOFTWARES PVT. LTD.) DETAILS
            </h3>
          </div>

          <div className="onboarding-table">
            <div className="onboarding-row">
              <label>Platform Name</label>
              <div className="font-semibold">QunoIndia</div>
            </div>

            <div className="onboarding-row">
              <label>Operated By</label>
              <div>
                Netlarx Softwares Pvt. Ltd., Gwalior, Madhya Pradesh
              </div>
            </div>

            {[
              ["Relationship Manager Name", "relationshipManager"],
              ["Contact Number", "managerContact"],
              ["Email Address", "managerEmail"],
            ].map(([label, field]) => (
              <div className="onboarding-row" key={field}>
                <label htmlFor={field}>{label}</label>

                <div>
                  <input
                    id={field}
                    type={field === "managerEmail" ? "email" : "text"}
                    placeholder={`Enter ${label.toLowerCase()}`}
                    value={formData[field as keyof typeof formData]}
                    onChange={(e) =>
                      updateField(
                        field as keyof typeof formData,
                        e.target.value
                      )
                    }
                    required
                  />
                </div>
              </div>
            ))}

            <div className="onboarding-row">
              <label htmlFor="onboardingDate">Onboarding Date</label>

              <div>
                <input
                  id="onboardingDate"
                  type="date"
                  value={formData.onboardingDate}
                  onChange={(e) =>
                    updateField("onboardingDate", e.target.value)
                  }
                  required
                />
              </div>
            </div>
          </div>
        </section>

        {/* Agreement */}
        <section className="mt-8 border-y border-slate-300 py-5">
          <p className="text-[11px] leading-relaxed text-slate-700">
            The School and QunoIndia agree to collaborate on the following
            two categories of school essentials, based on the mutually
            agreed terms and conditions between both parties.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <label className="flex items-center gap-2 text-[11px] font-semibold">
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={agreement.uniforms}
                onChange={(e) =>
                  setAgreement((previous) => ({
                    ...previous,
                    uniforms: e.target.checked,
                  }))
                }
              />
              School Uniforms
            </label>

            <label className="flex items-center gap-2 text-[11px] font-semibold">
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={agreement.booksAndStationery}
                onChange={(e) =>
                  setAgreement((previous) => ({
                    ...previous,
                    booksAndStationery: e.target.checked,
                  }))
                }
              />
              Books & Stationery
            </label>
          </div>
        </section>

        {/* Submission Message */}
        {submitMessage && (
          <div
            role="status"
            aria-live="polite"
            className={`no-print mt-5 rounded-lg p-3 text-sm ${
              submitSuccess
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {submitMessage}
          </div>
        )}

        {/* Signatures */}
        <section className="mt-12 grid grid-cols-2 gap-10">
          <div>
            <div className="h-12 border-b border-slate-500" />

            <p className="mt-2 text-[10px] font-bold uppercase">
              Authorized Signatory
            </p>

            <p className="mt-1 text-[9px] text-slate-500">
              For and on behalf of the School
            </p>
          </div>

          <div>
            <div className="h-12 border-b border-slate-500" />

            <p className="mt-2 text-[10px] font-bold uppercase">
              Authorized Representative
            </p>

            <p className="mt-1 text-[9px] text-slate-500">
              For and on behalf of QunoIndia
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 flex flex-wrap items-end justify-between gap-3 border-t border-slate-300 pt-4 text-[10px] text-slate-600">
          <div>
            <p className="font-semibold">support@qunoindia.com</p>
            <p className="mt-1">www.qunoindia.com</p>
          </div>

          <p className="font-semibold">
            Netlarx Softwares Pvt. Ltd.
          </p>
        </footer>

        <p className="mt-5 text-center text-[9px] text-slate-400">
          This document is intended for school onboarding and partnership records.
        </p>
      </form>
    </main>
  )
}
