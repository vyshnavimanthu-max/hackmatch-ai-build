import { motion } from "framer-motion"
import type { SkillScore } from "@/lib/types"

function tone(score: number) {
  if (score >= 70) return "var(--color-teal)"
  if (score >= 50) return "var(--color-purple-soft)"
  return "var(--color-warning)"
}

export function SynergyMatrix({ scores }: { scores: SkillScore[] }) {
  return (
    <div className="space-y-5">
      {scores.map((s, i) => (
        <div key={s.category}>
          <div className="mb-1.5 flex items-baseline justify-between">
            <span className="text-sm font-medium">{s.label}</span>
            <motion.span
              className="font-mono text-sm font-semibold tabular-nums"
              style={{ color: tone(s.score) }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.12 }}
            >
              {s.score}%
            </motion.span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-[var(--color-surface-2)]">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${tone(s.score)}, ${tone(s.score)})`,
                boxShadow: `0 0 12px ${tone(s.score)}`,
              }}
              initial={{ width: 0 }}
              animate={{ width: `${s.score}%` }}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: "easeOut" }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
