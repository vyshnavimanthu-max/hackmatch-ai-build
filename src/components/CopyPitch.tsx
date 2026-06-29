import { useState } from "react"
import { motion } from "framer-motion"
import { Copy, Check, MessageCircle, Send } from "lucide-react"
import toast from "react-hot-toast"
import { buildDiscordPitch, buildWhatsAppPitch } from "@/lib/pitch"
import type { AnalysisResult } from "@/lib/types"
import { cn } from "@/lib/utils"

type Channel = "discord" | "whatsapp"

export function CopyPitch({
  result,
  description,
}: {
  result: AnalysisResult
  description: string
}) {
  const [channel, setChannel] = useState<Channel>("discord")
  const [copied, setCopied] = useState(false)

  const text =
    channel === "discord"
      ? buildDiscordPitch(result, description)
      : buildWhatsAppPitch(result, description)

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast.success(
        channel === "discord" ? "Discord pitch copied!" : "WhatsApp pitch copied!",
      )
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error("Couldn't access clipboard. Copy manually instead.")
    }
  }

  const tabs: { id: Channel; label: string; icon: typeof MessageCircle }[] = [
    { id: "discord", label: "Discord", icon: MessageCircle },
    { id: "whatsapp", label: "WhatsApp", icon: Send },
  ]

  return (
    <div>
      <div className="mb-3 inline-flex rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)]/40 p-1">
        {tabs.map((t) => {
          const active = t.id === channel
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setChannel(t.id)
                setCopied(false)
              }}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                active
                  ? "bg-[var(--color-purple)]/20 text-[var(--color-foreground)]"
                  : "text-[var(--color-muted)] hover:text-[var(--color-foreground)]",
              )}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          )
        })}
      </div>

      <div className="relative">
        <pre className="max-h-72 overflow-auto whitespace-pre-wrap rounded-xl border border-[var(--color-border)] bg-[var(--color-background)]/60 p-4 pr-4 font-mono text-[13px] leading-relaxed text-[var(--color-foreground)]">
          {text}
        </pre>
      </div>

      <motion.button
        type="button"
        onClick={copy}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-[var(--color-teal)]/50 bg-[var(--color-teal)]/15 px-4 py-3 text-sm font-semibold text-[var(--color-teal-soft)] transition-colors hover:bg-[var(--color-teal)]/25"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4" /> Copied to clipboard
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" /> Copy to Clipboard
          </>
        )}
      </motion.button>
    </div>
  )
}
