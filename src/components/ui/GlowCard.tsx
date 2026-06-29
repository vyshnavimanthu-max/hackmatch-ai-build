import { forwardRef, type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface GlowCardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: "purple" | "teal" | "none"
}

export const GlowCard = forwardRef<HTMLDivElement, GlowCardProps>(
  ({ className, glow = "none", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-[var(--radius-card)] border bg-[var(--color-surface)]/70 backdrop-blur-xl",
          "border-[var(--color-border)] shadow-2xl shadow-black/40",
          className,
        )}
        {...props}
      >
        {glow !== "none" && (
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute -inset-px rounded-[var(--radius-card)] opacity-60 blur-[1px]",
              glow === "purple" &&
                "bg-[radial-gradient(circle_at_50%_0%,oklch(0.65_0.24_300/0.25),transparent_70%)]",
              glow === "teal" &&
                "bg-[radial-gradient(circle_at_50%_0%,oklch(0.78_0.16_190/0.22),transparent_70%)]",
            )}
          />
        )}
        <div className="relative">{children}</div>
      </div>
    )
  },
)
GlowCard.displayName = "GlowCard"
