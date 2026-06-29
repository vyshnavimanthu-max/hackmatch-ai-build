export type DomainId =
  | "ai-ml"
  | "fintech"
  | "web3"
  | "edtech"
  | "saas"
  | "healthtech"
  | "gaming"
  | "social"

export interface Domain {
  id: DomainId
  label: string
  blurb: string
}

export type Category = "technical" | "design" | "business"

export interface SkillScore {
  category: Category
  label: string
  score: number
}

export interface MissingRole {
  role: string
  reason: string
  skills: string[]
  priority: "critical" | "recommended"
}

export interface TeamInput {
  domain: DomainId
  description: string
  skills: string[]
}

export interface AnalysisResult {
  scores: SkillScore[]
  overall: number
  strengths: string[]
  missingRoles: MissingRole[]
  domainLabel: string
}
