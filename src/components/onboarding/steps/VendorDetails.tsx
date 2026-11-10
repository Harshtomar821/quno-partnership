"use client"

import {
  Handshake,
  Store,
  Package,
  Layers3,
} from "lucide-react"

import type { OnboardingStepProps } from "../OnboardingWizard"

type FieldConfig = {
  name: string
  label: string
  placeholder: string
  type?: "text" | "textarea"
  wide?: boolean
}

const vendor1Fields: FieldConfig[] = [
  {
    name: "vendor1Name",
    label: "Vendor 01 — Name",
    placeholder: "Enter vendor's name",
  },
  {
    name: "vendor1Domain",
    label: "Vendor 01 — Domain",
    placeholder: "e.g. Uniforms, Books, Stationery, ERP",
  },
  {
    name: "vendor1Offerings",
    label: "Vendor 01 — Offerings",
    placeholder: "Describe the products and services offered by this vendor...",
    type: "textarea",
    wide: true,
  },
]

const vendor2Fields: FieldConfig[] = [
  {
    name: "vendor2Name",
    label: "Vendor 02 — Name",
    placeholder: "Enter vendor's name",
  },
  {
    name: "vendor2Domain",
    label: "Vendor 02 — Domain",
    placeholder: "e.g. ERP, Digital Marketing, Books",
  },
  {
    name: "vendor2Offerings",
    label: "Vendor 02 — Offerings",
    placeholder: "Describe the products and services offered by this vendor...",
    type: "textarea",
    wide: true,
  },
]

export default function VendorDetails({
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
            type="text"
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
          <Handshake size={23} />
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#A3A3A3]">
            Step 04
          </p>

          <h2 className="mt-1 text-xl font-bold tracking-tight text-[#F5F5F5] sm:text-2xl">
            Existing Vendor Ecosystem
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#A3A3A3]">
            Identify the vendors already working with the school,
            their business domains and the services they provide.
          </p>
        </div>
      </div>

      {/* Vendor 01 */}
      <div className="mb-7 rounded-2xl border border-[#454545] bg-[#303030]/70 p-4 sm:p-5">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#525252] bg-[#383838] text-[#E5E5E5]">
            <Store size={19} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#F5F5F5]">
              Vendor 01
            </h3>
            <p className="text-xs text-[#A3A3A3]">
              First existing school vendor (V-1)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
          {vendor1Fields.map(renderField)}
        </div>
      </div>

      {/* Vendor 02 */}
      <div className="rounded-2xl border border-[#454545] bg-[#303030]/70 p-4 sm:p-5">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#525252] bg-[#383838] text-[#E5E5E5]">
            <Package size={19} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#F5F5F5]">
              Vendor 02
            </h3>
            <p className="text-xs text-[#A3A3A3]">
              Second existing school vendor (V-2)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
          {vendor2Fields.map(renderField)}
        </div>
      </div>

      {/* Information Note */}
      <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#454545] bg-[#303030] p-4">
        <Layers3
          size={18}
          className="mt-0.5 shrink-0 text-[#D4D4D4]"
        />

        <p className="text-xs leading-relaxed text-[#A3A3A3]">
          Include vendors currently associated with the school
          and mention their actual domain and offerings.
        </p>
      </div>
    </div>
  )
}
