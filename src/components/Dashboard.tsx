import { motion } from "framer-motion"
import { Activity, Radar as RadarIcon, Users } from "lucide-react"
import { GlowCard } from "./ui/GlowCard"
import { SynergyMatrix } from "./SynergyMatrix"
import { SynergyRadar } from "./SynergyRadar"
import { CompatibilityBadges } from "./CompatibilityBadges"
import type { AnalysisResult } from "@/lib/types"

function SectionTitle({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: typeof Activity
  title: string
  subtitle: string
}) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[var(--color-surface-2)] ring-1 ring-[var(--color-border)]">
        <Icon className="h-4.5 w-4.5 text-[var(--color-teal)]" />
      </span>
      <div>
        <h3 className="text-base font-semibold leading-tight">{title}</h3>
        <p className="text-sm text-[var(--color-muted)]">{subtitle}</p>
      </div>
    </div>
  )
}

export function Dashboard({ result }: { result: AnalysisResult }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto mt-12 max-w-5xl px-4 sm:mt-16"
    >
      <div className="mb-7 text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Team Synergy Dashboard
        </h2>
        <p className="mt-2 text-[var(--color-muted)]">
          Here&apos;s how your {result.domainLabel} squad stacks up — and who you
          still need.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-5">
        {/* Matrix + overall */}
        <GlowCard glow="teal" className="p-6 lg:col-span-3">
          <SectionTitle
            icon={Activity}
            title="Team Synergy Matrix"
            subtitle="Capability across the three pillars judges score."
          />
          <div className="mb-6 flex items-center gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)]/40 p-4">
            <div className="relative grid h-16 w-16 shrink-0 place-items-center">
              <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
                <circle
                  cx="18"
                  cy="18"
                  r="15.5"
                  fill="none"
                  stroke="var(--color-surface-2)"
                  strokeWidth="3"
                />
                <motion.circle
                  cx="18"
                  cy="18"
                  r="15.5"
                  fill="none"
                  stroke="var(--color-purple)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 15.5}
                  initial={{ strokeDashoffset: 2 * Math.PI * 15.5 }}
                  animate={{
                    strokeDashoffset: 2 * Math.PI * 15.5 * (1 - result.overall / 100),
                  }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  style={{ filter: "drop-shadow(0 0 6px var(--color-purple))" }}
                />
              </svg>
              <span className="absolute font-mono text-sm font-bold">
                {result.overall}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold">Overall Synergy Score</p>
              <p className="text-sm text-[var(--color-muted)]">
                Strengths: {result.strengths.join(", ")}
              </p>
            </div>
          </div>
          <SynergyMatrix scores={result.scores} />
        </GlowCard>

        {/* Radar */}
        <GlowCard glow="purple" className="p-6 lg:col-span-2">
          <SectionTitle
            icon={RadarIcon}
            title="Capability Radar"
            subtitle="Shape of your team at a glance."
          />
          <SynergyRadar scores={result.scores} />
        </GlowCard>
      </div>

      {/* Missing roles */}
      <div className="mt-5">
        <GlowCard className="p-6">
          <SectionTitle
            icon={Users}
            title="Your Missing Pieces"
            subtitle="Glowing badges for the teammates and skills to recruit."
          />
          <CompatibilityBadges roles={result.missingRoles} />
        </GlowCard>
      </div>
    </motion.section>
  )
}
