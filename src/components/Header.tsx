import { Hexagon } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-border)]/60 bg-[var(--color-background)]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
        <a href="#" className="group flex items-center gap-2.5">
          <span className="relative grid h-9 w-9 place-items-center rounded-lg bg-[var(--color-surface-2)] ring-1 ring-[var(--color-border)]">
            <Hexagon className="h-5 w-5 text-[var(--color-teal)]" />
            <span className="absolute inset-0 rounded-lg bg-[var(--color-teal)] opacity-0 blur-md transition-opacity group-hover:opacity-30" />
          </span>
          <span className="text-[15px] font-semibold tracking-tight">
            HackMatch <span className="text-[var(--color-purple-soft)]">AI</span>
          </span>
        </a>

        <nav className="flex items-center gap-1 text-sm text-[var(--color-muted)]">
          <a
            href="#analyze"
            className="hidden rounded-md px-3 py-1.5 transition-colors hover:bg-[var(--color-surface-2)] hover:text-[var(--color-foreground)] sm:block"
          >
            Analyze
          </a>
        </nav>
      </div>
    </header>
  )
}
