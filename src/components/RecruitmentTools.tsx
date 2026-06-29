import { motion } from "framer-motion"
import { IdCard, Megaphone } from "lucide-react"
import { GlowCard } from "./ui/GlowCard"
import { RecruitmentCard } from "./RecruitmentCard"
import { CopyPitch } from "./CopyPitch"
import type { AnalysisResult } from "@/lib/types"

export function RecruitmentTools({
  result,
  description,
}: {
  result: AnalysisResult
  description: string
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mx-auto mt-12 max-w-5xl px-4 pb-24 sm:mt-16"
    >
      <div className="mb-7 text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Shareable Recruitment Tools
        </h2>
        <p className="mt-2 text-[var(--color-muted)]">
          A screenshot-ready card and one-click pitches to fill those gaps fast.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div>
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[var(--color-muted)]">
            <IdCard className="h-4 w-4 text-[var(--color-teal)]" />
            Digital Recruitment Card
          </div>
          <RecruitmentCard result={result} description={description} />
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[var(--color-muted)]">
            <Megaphone className="h-4 w-4 text-[var(--color-purple-soft)]" />
            One-Click Copy Pitch
          </div>
          <GlowCard glow="purple" className="p-5">
            <CopyPitch result={result} description={description} />
          </GlowCard>
        </div>
      </div>
    </motion.section>
  )
}
