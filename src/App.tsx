import { useRef, useState } from "react"
import { Toaster } from "react-hot-toast"
import { AnimatePresence } from "framer-motion"
import { Background } from "./components/Background"
import { Header } from "./components/Header"
import { Hero } from "./components/Hero"
import { TeamForm } from "./components/TeamForm"
import { Dashboard } from "./components/Dashboard"
import { RecruitmentTools } from "./components/RecruitmentTools"
import { analyzeTeam } from "./lib/analysis"
import type { AnalysisResult, TeamInput } from "./lib/types"

export default function App() {
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [description, setDescription] = useState("")
  const resultsRef = useRef<HTMLDivElement>(null)

  function handleAnalyze(input: TeamInput) {
    setResult(analyzeTeam(input))
    setDescription(input.description)
    requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }

  return (
    <div className="min-h-dvh">
      <Background />
      <Header />
      <main>
        <Hero />
        <TeamForm onAnalyze={handleAnalyze} />

        <div ref={resultsRef}>
          <AnimatePresence mode="wait">
            {result && (
              <div key="results">
                <Dashboard result={result} />
                <RecruitmentTools result={result} description={description} />
              </div>
            )}
          </AnimatePresence>
        </div>

        {!result && (
          <footer className="mx-auto max-w-5xl px-4 py-24 text-center text-sm text-[var(--color-muted)]">
            Fill in your team above to generate a live synergy report.
          </footer>
        )}
      </main>

      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "var(--color-surface-2)",
            color: "var(--color-foreground)",
            border: "1px solid var(--color-border)",
            fontSize: "14px",
          },
          success: { iconTheme: { primary: "oklch(0.78 0.16 190)", secondary: "var(--color-surface-2)" } },
          error: { iconTheme: { primary: "oklch(0.7 0.2 18)", secondary: "var(--color-surface-2)" } },
        }}
      />
    </div>
  )
}
