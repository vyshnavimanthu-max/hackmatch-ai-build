import type {
  AnalysisResult,
  Category,
  Domain,
  DomainId,
  MissingRole,
  TeamInput,
} from "./types"

export const DOMAINS: Domain[] = [
  { id: "ai-ml", label: "AI / ML", blurb: "Models, data pipelines & inference" },
  { id: "fintech", label: "FinTech", blurb: "Payments, ledgers & compliance" },
  { id: "web3", label: "Web3", blurb: "Smart contracts & on-chain apps" },
  { id: "edtech", label: "EdTech", blurb: "Learning platforms & content" },
  { id: "saas", label: "SaaS", blurb: "Multi-tenant web products" },
  { id: "healthtech", label: "HealthTech", blurb: "Patient data & devices" },
  { id: "gaming", label: "Gaming", blurb: "Engines, graphics & multiplayer" },
  { id: "social", label: "Social", blurb: "Feeds, realtime & community" },
]

/* Keyword buckets used to score a team's pasted skills / resume text. */
const KEYWORDS: Record<Category, string[]> = {
  technical: [
    "python", "java", "javascript", "typescript", "react", "next", "node",
    "go", "golang", "rust", "c++", "c#", "kotlin", "swift", "sql", "nosql",
    "postgres", "mongodb", "redis", "docker", "kubernetes", "aws", "gcp",
    "azure", "tensorflow", "pytorch", "ml", "machine learning", "ai", "llm",
    "api", "backend", "frontend", "fullstack", "devops", "solidity", "web3",
    "data", "algorithms", "flutter", "android", "ios", "graphql", "express",
  ],
  design: [
    "figma", "ui", "ux", "design", "designer", "prototype", "wireframe",
    "user research", "branding", "illustration", "motion", "animation",
    "tailwind", "css", "accessibility", "design system", "sketch",
    "photoshop", "framer", "visual", "typography",
  ],
  business: [
    "product", "pm", "product manager", "marketing", "growth", "sales",
    "pitch", "business", "strategy", "finance", "startup", "founder",
    "operations", "go-to-market", "gtm", "fundraising", "presentation",
    "storytelling", "analytics", "customer", "market research", "mba",
  ],
}

const CATEGORY_META: { category: Category; label: string }[] = [
  { category: "technical", label: "Technical Stack Capability" },
  { category: "design", label: "UI/UX Design" },
  { category: "business", label: "Business & Pitch Readiness" },
]

/* Roles suggested when a category is weak, tuned slightly per domain. */
const ROLE_LIBRARY: Record<Category, MissingRole> = {
  technical: {
    role: "Backend / Infra Engineer",
    reason: "Your team is light on systems and backend depth to ship a working build under pressure.",
    skills: ["APIs", "Databases", "Cloud / DevOps", "System Design"],
    priority: "critical",
  },
  design: {
    role: "Product Designer",
    reason: "Judges reward polish. You lack a dedicated owner for UI/UX, flows and visual identity.",
    skills: ["Figma", "UI/UX", "Prototyping", "Design Systems"],
    priority: "critical",
  },
  business: {
    role: "Product & Pitch Lead",
    reason: "A sharp narrative wins demos. You need someone to own the story, market framing and pitch.",
    skills: ["Pitching", "Product Strategy", "Market Research", "Storytelling"],
    priority: "recommended",
  },
}

const DOMAIN_BONUS: Record<DomainId, Partial<Record<Category, MissingRole>>> = {
  "ai-ml": {
    technical: {
      role: "ML / Data Engineer",
      reason: "An AI/ML project needs someone fluent in models, datasets and inference.",
      skills: ["PyTorch / TF", "Data Pipelines", "Model Eval", "Prompt / RAG"],
      priority: "critical",
    },
  },
  web3: {
    technical: {
      role: "Smart Contract Engineer",
      reason: "Web3 builds live or die on secure on-chain logic and tooling.",
      skills: ["Solidity", "Wallets", "Security", "The Graph"],
      priority: "critical",
    },
  },
  fintech: {
    business: {
      role: "Compliance & Growth Lead",
      reason: "FinTech judges probe trust, compliance and the business model hard.",
      skills: ["Regulation", "Unit Economics", "Pitching", "Risk"],
      priority: "critical",
    },
  },
  edtech: {},
  saas: {},
  healthtech: {
    business: {
      role: "Domain & Compliance Lead",
      reason: "HealthTech requires credibility on privacy, HIPAA and clinical context.",
      skills: ["HIPAA", "Privacy", "Domain Expertise", "Pitching"],
      priority: "critical",
    },
  },
  gaming: {
    design: {
      role: "Game / Experience Designer",
      reason: "Gaming demos win on feel — you need someone owning mechanics and juice.",
      skills: ["Game Design", "Motion", "Audio", "Playtesting"],
      priority: "critical",
    },
  },
  social: {},
}

function scoreCategory(category: Category, skillsText: string): number {
  const list = KEYWORDS[category]
  const matched = new Set<string>()
  for (const kw of list) {
    if (skillsText.includes(kw)) matched.add(kw)
  }
  const hits = matched.size
  // Diminishing returns: first few skills matter most.
  const raw = Math.min(1, hits / 6)
  const score = Math.round(28 + raw * 64) // 28 floor, up to ~92
  return Math.max(12, Math.min(96, score))
}

export function analyzeTeam(input: TeamInput): AnalysisResult {
  const haystack = (input.skills.join(" ") + " " + input.description)
    .toLowerCase()
    .trim()

  const scores = CATEGORY_META.map(({ category, label }) => ({
    category,
    label,
    score: scoreCategory(category, haystack),
  }))

  const overall = Math.round(
    scores.reduce((sum, s) => sum + s.score, 0) / scores.length,
  )

  const strengths = scores
    .filter((s) => s.score >= 60)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.label)

  const domainLabel = DOMAINS.find((d) => d.id === input.domain)?.label ?? "Hackathon"

  // Anything under 55% surfaces a missing role.
  const missingRoles: MissingRole[] = scores
    .filter((s) => s.score < 55)
    .sort((a, b) => a.score - b.score)
    .map((s) => DOMAIN_BONUS[input.domain]?.[s.category] ?? ROLE_LIBRARY[s.category])

  // Always give at least one suggestion (target the weakest area).
  if (missingRoles.length === 0) {
    const weakest = [...scores].sort((a, b) => a.score - b.score)[0]
    missingRoles.push(
      DOMAIN_BONUS[input.domain]?.[weakest.category] ?? ROLE_LIBRARY[weakest.category],
    )
  }

  return {
    scores,
    overall,
    strengths: strengths.length ? strengths : ["Scrappy generalist energy"],
    missingRoles,
    domainLabel,
  }
}

/* Skill chips shown as quick-add suggestions in the form. */
export const SUGGESTED_SKILLS = [
  "React",
  "TypeScript",
  "Python",
  "Node.js",
  "Figma",
  "UI/UX",
  "Machine Learning",
  "Solidity",
  "Product",
  "Pitching",
  "AWS",
  "Marketing",
]
