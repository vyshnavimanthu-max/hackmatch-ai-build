import { motion } from "framer-motion"
import { Hexagon, CheckCircle2, Target } from "lucide-react"
import type { AnalysisResult } from "@/lib/types"

export function RecruitmentCard({
  result,
  description,
}: {
  result: AnalysisResult
  description: string
}) {
  const missingSkills = Array.from(
    new Set(result.missingRoles.flatMap((r) => r.skills)),
  ).slice(0, 6)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl border border-[var(--color-purple)]/40 p-7"
      style={{
        background:
          "radial-gradient(circle at 20% 0%, oklch(0.65 0.24 300/0.18), transparent 55%), radial-gradient(circle at 90% 100%, oklch(0.78 0.16 190/0.16), transparent 55%), var(--color-surface)",
        boxShadow:
          "0 0 50px oklch(0.65 0.24 300/0.3), inset 0 1px 0 oklch(1 0 0/0.06)",
      }}
    >
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--color-surface-2)] ring-1 ring-[var(--color-border)]">
            <Hexagon className="h-5 w-5 text-[var(--color-teal)]" />
          </span>
          <span className="text-sm font-semibold">
            HackMatch <span className="text-[var(--color-purple-soft)]">AI</span>
          </span>
        </div>
        <span className="rounded-full border border-[var(--color-purple)]/40 bg-[var(--color-purple)]/15 px-3 py-1 text-xs font-semibold text-[var(--color-purple-soft)]">
          {result.domainLabel}
        </span>
      </div>

      <p className="text-xs font-medium uppercase tracking-widest text-[var(--color-muted)]">
        Recruiting teammates for
      </p>
      <h3 className="mt-1 text-pretty text-xl font-bold leading-snug">
        {description || `A ${result.domainLabel} hackathon project`}
      </h3>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--color-teal)]">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Team Strengths
          </p>
          <ul className="space-y-1.5">
            {result.strengths.map((s) => (
              <li key={s} className="flex items-center gap-2 text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-teal)]" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--color-purple-soft)]">
            <Target className="h-3.5 w-3.5" />
            Looking For
          </p>
          <ul className="space-y-1.5">
            {result.missingRoles.map((r) => (
              <li key={r.role} className="flex items-center gap-2 text-sm font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-purple)]" />
                {r.role}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 border-t border-[var(--color-border)]/70 pt-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
          Skills we need
        </p>
        <div className="flex flex-wrap gap-1.5">
          {missingSkills.map((skill) => (
            <span
              key={skill}
              className="rounded-md border border-[var(--color-teal)]/40 bg-[var(--color-teal)]/10 px-2 py-1 text-xs font-medium text-[var(--color-teal-soft)]"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
