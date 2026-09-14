"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"

const interests = ["Sovereign AI strategy", "Private AI architecture", "Compute & infrastructure", "Models & intelligence", "Applications & engineering", "Governance & control", "Production operations", "Enterprise solutions", "Builder or startup partnership", "Enterprise AI pipeline", "Technology provider partnership", "Partnership", "Investment", "Product access", "Careers", "Other"]

export function ContactForm({ initialInterest }: { initialInterest?: string }) {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nOrganisation: ${data.get('company')}\nInterest: ${data.get('interest')}\n\n${data.get('message')}`
    window.location.href = `mailto:contact@ai7lab.net?subject=${encodeURIComponent(`AI7Lab enquiry: ${data.get('interest')}`)}&body=${encodeURIComponent(body)}`
    setSubmitted(true)
  }


  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-5 sm:p-6 md:p-8">
      <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" placeholder="Jane Doe" required />
        <Field label="Work email" name="email" type="email" placeholder="jane@company.com" required />
        <Field label="Organisation" name="company" placeholder="Acme Inc." />
        <div className="flex flex-col gap-2">
          <label htmlFor="interest" className="text-sm font-medium text-foreground">
            I&apos;m interested in
          </label>
          <select
            id="interest"
            name="interest"
            defaultValue={interests.includes(initialInterest ?? '') ? initialInterest : 'Sovereign AI strategy'}
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
          What are you planning to build or improve?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Describe the use case, existing systems, deployment preference, control requirements, and timeline."
          className="rounded-lg border border-border bg-background p-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
        />
      </div>

      <p className="mt-4 text-sm text-muted-foreground">This opens your email app with your enquiry. Review and send it to contact@ai7lab.net.</p>
      {submitted && <p role="status" className="mt-3 text-sm text-primary">Your email draft is ready to open. Send it from your email app to complete your enquiry. If no app opens, email contact@ai7lab.net directly.</p>}
      <button
        type="submit"
        className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 min-h-[44px] sm:min-h-auto"
      >
        Prepare enquiry email
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
