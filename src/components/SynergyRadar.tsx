import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts"
import type { SkillScore } from "@/lib/types"

const SHORT: Record<string, string> = {
  "Technical Stack Capability": "Technical",
  "UI/UX Design": "Design",
  "Business & Pitch Readiness": "Business",
}

export function SynergyRadar({ scores }: { scores: SkillScore[] }) {
  const data = scores.map((s) => ({
    axis: SHORT[s.label] ?? s.label,
    value: s.score,
  }))

  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="72%">
          <PolarGrid stroke="oklch(0.3 0.018 264)" />
          <PolarAngleAxis
            dataKey="axis"
            tick={{ fill: "oklch(0.7 0.02 264)", fontSize: 12 }}
          />
          <PolarRadiusAxis
            domain={[0, 100]}
            tick={false}
            axisLine={false}
            tickCount={5}
          />
          <Radar
            name="Synergy"
            dataKey="value"
            stroke="oklch(0.65 0.24 300)"
            strokeWidth={2}
            fill="oklch(0.65 0.24 300)"
            fillOpacity={0.35}
            dot={{ r: 3, fill: "oklch(0.78 0.16 190)" }}
            isAnimationActive
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
