import { useState, type FormEvent, type KeyboardEvent } from "react"
import { motion } from "framer-motion"
import { Plus, X, Wand2, FileText, Code2 } from "lucide-react"
import toast from "react-hot-toast"
import { GlowCard } from "./ui/GlowCard"
import { DOMAINS, SUGGESTED_SKILLS } from "@/lib/analysis"
import type { DomainId, TeamInput } from "@/lib/types"
import { cn } from "@/lib/utils"

interface TeamFormProps {
  onAnalyze: (input: TeamInput) => void
}

export function TeamForm({ onAnalyze }: TeamFormProps) {
  const [domain, setDomain] = useState<DomainId>("ai-ml")
  const [description, setDescription] = useState("")
  const [skills, setSkills] = useState<string[]>(["React", "Python"])
  const [draft, setDraft] = useState("")

  function addSkills(raw: string) {
    const parts = raw
      .split(/[,\n;]+/)
      .map((s) => s.trim())
      .filter(Boolean)
    if (!parts.length) return
    setSkills((prev) => {
      const lower = new Set(prev.map((s) => s.toLowerCase()))
      const next = [...prev]
      for (const p of parts) {
        if (!lower.has(p.toLowerCase())) {
          next.push(p)
          lower.add(p.toLowerCase())
        }
      }
      return next
    })
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.nativeEvent.isComposing || e.keyCode === 229) return
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addSkills(draft)
      setDraft("")
    } else if (e.key === "Backspace" && !draft && skills.length) {
      setSkills((prev) => prev.slice(0, -1))
    }
  }

  function removeSkill(skill: string) {
    setSkills((prev) => prev.filter((s) => s !== skill))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const merged = draft.trim() ? [...skills, draft.trim()] : skills
    if (merged.length === 0) {
      toast.error("Add at least one skill to analyze your team.")
      return
    }
    setDraft("")
    onAnalyze({ domain, description: description.trim(), skills: merged })
    toast.success("Team analyzed! Scroll down for your synergy report.")
  }

  return (
    <section id="analyze" className="mx-auto mt-12 max-w-3xl scroll-mt-24 px-4 sm:mt-16">
      <GlowCard glow="purple" className="p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-7">
          {/* Domain selector */}
          <fieldset>
            <legend className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <Code2 className="h-4 w-4 text-[var(--color-teal)]" />
              Project Domain
            </legend>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {DOMAINS.map((d) => {
                const active = d.id === domain
                return (
                  <button
                    type="button"
                    key={d.id}
                    onClick={() => setDomain(d.id)}
                    aria-pressed={active}
                    title={d.blurb}
                    className={cn(
                      "rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition-all",
                      active
                        ? "border-[var(--color-purple)] bg-[var(--color-purple)]/15 text-[var(--color-foreground)] shadow-[0_0_18px_oklch(0.65_0.24_300/0.35)]"
                        : "border-[var(--color-border)] bg-[var(--color-surface-2)]/40 text-[var(--color-muted)] hover:border-[var(--color-purple)]/50 hover:text-[var(--color-foreground)]",
                    )}
                  >
                    {d.label}
                  </button>
                )
              })}
            </div>
          </fieldset>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="mb-3 flex items-center gap-2 text-sm font-semibold"
            >
              <FileText className="h-4 w-4 text-[var(--color-teal)]" />
              Project Short Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="e.g. An AI study buddy that turns lecture recordings into flashcards and quizzes."
              className="w-full resize-none rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)]/40 px-3.5 py-3 text-sm leading-relaxed text-[var(--color-foreground)] outline-none transition-colors placeholder:text-[var(--color-muted)]/60 focus:border-[var(--color-teal)] focus:ring-2 focus:ring-[var(--color-teal)]/20"
            />
          </div>

          {/* Skills */}
          <div>
            <label htmlFor="skills" className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <Wand2 className="h-4 w-4 text-[var(--color-teal)]" />
              Current Team Skills
              <span className="font-normal text-[var(--color-muted)]">
                — type, paste a resume, or tap a chip
              </span>
            </label>

            <div className="flex flex-wrap items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)]/40 p-2.5 focus-within:border-[var(--color-teal)] focus-within:ring-2 focus-within:ring-[var(--color-teal)]/20">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 rounded-md border border-[var(--color-teal)]/40 bg-[var(--color-teal)]/10 px-2 py-1 text-xs font-medium text-[var(--color-teal-soft)]"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    aria-label={`Remove ${skill}`}
                    className="rounded-sm transition-colors hover:text-[var(--color-foreground)]"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              <input
                id="skills"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={handleKeyDown}
                onPaste={(e) => {
                  const text = e.clipboardData.getData("text")
                  if (/[,\n;]/.test(text)) {
                    e.preventDefault()
                    addSkills(text)
                  }
                }}
                placeholder={skills.length ? "Add more…" : "React, Figma, Python…"}
                className="min-w-[8rem] flex-1 bg-transparent px-1 py-1 text-sm text-[var(--color-foreground)] outline-none placeholder:text-[var(--color-muted)]/60"
              />
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {SUGGESTED_SKILLS.filter(
                (s) => !skills.some((x) => x.toLowerCase() === s.toLowerCase()),
              ).map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => addSkills(s)}
                  className="inline-flex items-center gap-1 rounded-md border border-[var(--color-border)] bg-[var(--color-surface-2)]/30 px-2 py-1 text-xs text-[var(--color-muted)] transition-colors hover:border-[var(--color-teal)]/50 hover:text-[var(--color-foreground)]"
                >
                  <Plus className="h-3 w-3" />
                  {s}
                </button>
              ))}
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-[var(--color-purple)] to-[var(--color-teal)] px-4 py-3.5 text-sm font-semibold text-[oklch(0.16_0.012_264)] shadow-[0_0_24px_oklch(0.65_0.24_300/0.4)] transition-shadow hover:shadow-[0_0_36px_oklch(0.65_0.24_300/0.55)]"
          >
            <Wand2 className="h-4 w-4" />
            Analyze Team Synergy
          </motion.button>
        </form>
      </GlowCard>
    </section>
  )
}
