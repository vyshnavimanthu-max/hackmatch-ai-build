import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export function Hero() {
  return (
    <section className="mx-auto max-w-3xl px-4 pt-16 text-center sm:pt-24">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/60 px-3.5 py-1.5 text-xs font-medium text-[var(--color-muted)] backdrop-blur"
      >
        <Sparkles className="h-3.5 w-3.5 text-[var(--color-teal)]" />
        AI-powered teammate gap analysis
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.05 }}
        className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl"
      >
        Stop Solo-Hacking.{" "}
        <span className="bg-gradient-to-r from-[var(--color-purple-soft)] to-[var(--color-teal)] bg-clip-text text-transparent">
          Find Your Missing Pieces.
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.12 }}
        className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-[var(--color-muted)] sm:text-lg"
      >
        HackMatch AI reads your team&apos;s skills, maps them against what your
        project actually needs, and pinpoints the exact teammates and roles
        you&apos;re missing — so you walk into the hackathon ready to win.
      </motion.p>
    </section>
  )
}
