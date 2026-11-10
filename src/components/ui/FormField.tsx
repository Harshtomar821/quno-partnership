
"use client"

import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
} from "react"

export type FormFieldOption = {
  label: string
  value: string
}

type BaseProps = {
  name: string
  label: string
  value: string
  onChange: (name: string, value: string) => void
  placeholder?: string
  error?: string
  required?: boolean
  wide?: boolean
  className?: string
}

type InputFieldProps = BaseProps & {
  type?:
    | "text"
    | "number"
    | "email"
    | "url"
    | "date"
    | "time"
  options?: never
  rows?: never
  min?: InputHTMLAttributes<HTMLInputElement>["min"]
  max?: InputHTMLAttributes<HTMLInputElement>["max"]
}

type TextareaFieldProps = BaseProps & {
  type: "textarea"
  rows?: number
  options?: never
}

type SelectFieldProps = BaseProps & {
  type: "select"
  options: FormFieldOption[]
  rows?: never
}

export type FormFieldProps =
  | InputFieldProps
  | TextareaFieldProps
  | SelectFieldProps

export default function FormField(props: FormFieldProps) {
  const {
    name,
    label,
    value,
    onChange,
    placeholder,
    error,
    required = false,
    wide = false,
    className = "",
  } = props

  const hasError = Boolean(error)

  const baseClass = `
    w-full rounded-xl border bg-slate-50/70 px-4
    text-sm text-slate-800 outline-none transition
    placeholder:text-slate-400
    hover:border-slate-300
    focus:border-emerald-500 focus:bg-white
    focus:ring-4 focus:ring-emerald-500/10
    ${hasError
      ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
      : "border-slate-200"
    }
    ${className}
  `

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    onChange(name, event.target.value)
  }

  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-slate-700"
      >
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      {props.type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          rows={props.rows ?? 3}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${name}-error` : undefined}
          className={`${baseClass} min-h-[105px] resize-y py-3`}
        />
      ) : props.type === "select" ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          required={required}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${name}-error` : undefined}
          className={`${baseClass} h-12`}
        >
          <option value="">
            {placeholder || "Select an option"}
          </option>

          {props.options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={props.type ?? "text"}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          min={props.min}
          max={props.max}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${name}-error` : undefined}
          className={`${baseClass} h-12`}
        />
      )}

      {hasError && (
        <p
          id={`${name}-error`}
          role="alert"
          className="mt-1.5 text-xs font-medium text-red-500"
        >
          {error}
        </p>
      )}
    </div>
  )
}
