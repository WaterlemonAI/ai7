"use client"

import { useState } from "react"
import { ArrowRight, Check } from "lucide-react"

const interests = ["Enterprise solutions", "Builder or startup partnership", "Enterprise AI pipeline", "Technology provider partnership", "Partnership", "Investment", "Product access", "Careers", "Other"]

export function ContactForm({ initialInterest }: { initialInterest?: string }) {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-card p-8">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/15 text-primary">
          <Check className="h-5 w-5" />
        </div>
        <h3 className="text-xl font-semibold tracking-tight">Thank you.</h3>
        <p className="text-pretty leading-relaxed text-muted-foreground">
          Your message has reached the AI7Lab team. We&apos;ll be in touch shortly.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-5 sm:p-6 md:p-8">
      <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" placeholder="Jane Doe" required />
        <Field label="Work email" name="email" type="email" placeholder="jane@company.com" required />
        <Field label="Company" name="company" placeholder="Acme Inc." />
        <div className="flex flex-col gap-2">
          <label htmlFor="interest" className="text-sm font-medium text-foreground">
            I&apos;m interested in
          </label>
          <select
            id="interest"
            name="interest"
            defaultValue={interests.includes(initialInterest ?? '') ? initialInterest : 'Enterprise solutions'}
            className="min-h-[44px] sm:h-11 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
          >
            {interests.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          How can we help?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell us about your project or goals."
          className="rounded-lg border border-border bg-background p-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
        />
      </div>

      <button
        type="submit"
        className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 min-h-[44px] sm:min-h-auto"
      >
        Send message
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  )
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="min-h-[44px] sm:h-11 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
      />
    </div>
  )
}
