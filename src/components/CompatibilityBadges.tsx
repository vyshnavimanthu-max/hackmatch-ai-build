import { motion } from "framer-motion"
import { UserPlus, AlertTriangle, Star } from "lucide-react"
import type { MissingRole } from "@/lib/types"

export function CompatibilityBadges({ roles }: { roles: MissingRole[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {roles.map((role, i) => {
        const critical = role.priority === "critical"
        const accent = critical ? "var(--color-purple)" : "var(--color-teal)"
        return (
          <motion.div
            key={role.role}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="group relative overflow-hidden rounded-xl border p-4"
            style={{
              borderColor: `color-mix(in oklch, ${accent} 45%, transparent)`,
              background: `color-mix(in oklch, ${accent} 8%, var(--color-surface))`,
              boxShadow: `0 0 22px color-mix(in oklch, ${accent} 22%, transparent)`,
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-25 blur-2xl transition-opacity group-hover:opacity-40"
              style={{ background: accent }}
            />
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-2 font-semibold">
                <UserPlus className="h-4 w-4" style={{ color: accent }} />
                {role.role}
              </span>
              <span
                className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                style={{
                  color: accent,
                  background: `color-mix(in oklch, ${accent} 16%, transparent)`,
                }}
              >
                {critical ? (
                  <AlertTriangle className="h-3 w-3" />
                ) : (
                  <Star className="h-3 w-3" />
                )}
                {role.priority}
              </span>
            </div>
            <p className="mb-3 text-sm leading-relaxed text-[var(--color-muted)]">
              {role.reason}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {role.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface-2)]/50 px-2 py-0.5 text-xs text-[var(--color-foreground)]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
