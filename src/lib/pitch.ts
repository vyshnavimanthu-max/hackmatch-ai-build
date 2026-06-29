import type { AnalysisResult } from "./types"

export function buildDiscordPitch(result: AnalysisResult, description: string): string {
  const roles = result.missingRoles.map((r) => `\`${r.role}\``).join(", ")
  const skills = Array.from(
    new Set(result.missingRoles.flatMap((r) => r.skills)),
  ).join(", ")

  return [
    `🚀 **Looking for hackathon teammates!**`,
    ``,
    `**Project:** ${result.domainLabel} — ${description || "an ambitious build"}`,
    `**Team strengths:** ${result.strengths.join(", ")}`,
    `**We're missing:** ${roles}`,
    `**Skills we'd love:** ${skills}`,
    ``,
    `If that's you, drop a 👋 in the thread — let's build something that wins.`,
  ].join("\n")
}

export function buildWhatsAppPitch(result: AnalysisResult, description: string): string {
  const roles = result.missingRoles.map((r) => r.role).join(" & ")
  const skills = Array.from(
    new Set(result.missingRoles.flatMap((r) => r.skills)),
  ).join(", ")

  return [
    `Hey! 👋 We're forming a hackathon team and have spots open.`,
    ``,
    `Project: ${result.domainLabel}${description ? ` — ${description}` : ""}`,
    `Our strengths: ${result.strengths.join(", ")}`,
    `Looking for: ${roles} (${skills})`,
    ``,
    `Interested? Reply here and let's chat!`,
  ].join("\n")
}
