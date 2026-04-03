export type UserProfile = {
  id?: string
  name?: string
  photo?: string | null
  bio?: string | null
  brings?: string[] | null
  wants?: string[] | null
  location?: string
  role: string
  domain: string
  stage: string
  comms: string
  pace: string
  risk: string
  hours: string
  motivation: string
  conflict: string
  decisions: string
  relationship: string
  ambition: string
  runway: string
  pivot: string
  previous: string
  commitment: string
  equity: string
  funding: string
}

// ── Deal breaker check ──────────────────────────────────────────
export function checkDealBreakers(a: UserProfile, b: UserProfile): boolean {
  // Location conflict
  if (a.location === 'Same city required' && b.location === 'Remote only') return false
  if (b.location === 'Same city required' && a.location === 'Remote only') return false

  // Equity conflict
  if (a.equity === 'I lead — majority equity' && b.equity === 'I lead — majority equity') return false
  if (a.equity === 'Equal split' && b.equity === 'I lead — majority equity') return false
  if (b.equity === 'Equal split' && a.equity === 'I lead — majority equity') return false

  // Commitment conflict
  if (a.commitment === 'Full-time only' && b.commitment === 'Exploring ideas') return false
  if (b.commitment === 'Full-time only' && a.commitment === 'Exploring ideas') return false

  // Funding conflict
  if (a.funding === 'Bootstrapped only' && b.funding === 'Already have investors') return false
  if (b.funding === 'Bootstrapped only' && a.funding === 'Already have investors') return false

  return true
}

// ── Signal 1: Skill complementarity (25 pts) ───────────────────
const roleCompat: Record<string, string[]> = {
  'Builder / Engineer':   ['Seller / Growth', 'Operator / PM', 'Visionary / Founder', 'Investor'],
  'Seller / Growth':      ['Builder / Engineer', 'Operator / PM', 'Creative / Designer', 'Investor'],
  'Operator / PM':        ['Builder / Engineer', 'Seller / Growth', 'Visionary / Founder'],
  'Visionary / Founder':  ['Builder / Engineer', 'Operator / PM', 'Seller / Growth', 'Investor'],
  'Investor':             ['Builder / Engineer', 'Visionary / Founder', 'Seller / Growth'],
  'Creative / Designer':  ['Builder / Engineer', 'Seller / Growth', 'Visionary / Founder'],
}

function scoreSkills(a: UserProfile, b: UserProfile): number {
  let score = 0
  const aCompat = roleCompat[a.role] || []
  if (aCompat.includes(b.role)) score += 20
  else if (a.role !== b.role) score += 8
  else score += 2
  if (a.domain === b.domain) score += 5
  return Math.min(score, 25)
}

// ── Signal 2: Ambition alignment (20 pts) ──────────────────────
function scoreAmbition(a: UserProfile, b: UserProfile): number {
  let score = 0
  if (a.ambition === b.ambition) score += 12
  else if (
    (a.ambition === 'Billion dollar company' && b.ambition === 'Sell in 3-5 years') ||
    (b.ambition === 'Billion dollar company' && a.ambition === 'Sell in 3-5 years')
  ) score += 6
  else score += 2

  if (a.stage === b.stage) score += 5
  else score += 2

  if (a.pivot === b.pivot) score += 3
  else score += 1

  return Math.min(score, 20)
}

// ── Signal 3: Partnership style (20 pts) ───────────────────────
function scorePartnership(a: UserProfile, b: UserProfile): number {
  let score = 0

  if (a.motivation === b.motivation) score += 8
  else if (
    (a.motivation === 'Creating impact' && b.motivation === 'Building great products') ||
    (b.motivation === 'Creating impact' && a.motivation === 'Building great products')
  ) score += 5
  else score += 2

  if (a.conflict === b.conflict) score += 7
  else if (
    (a.conflict === 'Direct — say it straight' && b.conflict === 'Diplomatic — tread carefully') ||
    (b.conflict === 'Direct — say it straight' && a.conflict === 'Diplomatic — tread carefully')
  ) score += 3
  else score += 1

  if (a.decisions === b.decisions) score += 5
  else if (a.decisions === 'Both equally' || b.decisions === 'Both equally') score += 3
  else score += 1

  return Math.min(score, 20)
}

// ── Signal 4: Work style fit (15 pts) ──────────────────────────
function scoreWorkStyle(a: UserProfile, b: UserProfile): number {
  let score = 0

  if (a.comms === b.comms) score += 6
  else if (a.comms === 'Mix of both' || b.comms === 'Mix of both') score += 3
  else score += 1

  if (a.pace === b.pace) score += 5
  else if (a.pace === 'Depends on stakes' || b.pace === 'Depends on stakes') score += 3
  else score += 1

  if (a.hours === b.hours) score += 4
  else if (a.hours === 'Flexible / whenever' || b.hours === 'Flexible / whenever') score += 2
  else score += 1

  return Math.min(score, 15)
}

// ── Signal 5: Experience & background (10 pts) ─────────────────
function scoreExperience(a: UserProfile, b: UserProfile): number {
  let score = 0

  const experienced = ['Yes — exited / sold', 'Yes — still running', 'Yes — it failed']
  const aExp = experienced.includes(a.previous)
  const bExp = experienced.includes(b.previous)
  if (aExp && bExp) score += 5
  else if (!aExp && !bExp) score += 4
  else score += 2

  if (a.risk === b.risk) score += 5
  else if (
    (a.risk === 'Measured — calculated risks' && b.risk !== 'Low — steady wins') ||
    (b.risk === 'Measured — calculated risks' && a.risk !== 'Low — steady wins')
  ) score += 3
  else score += 1

  return Math.min(score, 10)
}

// ── Signal 6: Commitment match (10 pts) ────────────────────────
function scoreCommitment(a: UserProfile, b: UserProfile): number {
  let score = 0

  if (a.commitment === b.commitment) score += 7
  else if (
    (a.commitment === 'Full-time only' && b.commitment === 'Side project') ||
    (b.commitment === 'Full-time only' && a.commitment === 'Side project')
  ) score += 3
  else score += 1

  if (a.funding === b.funding) score += 3
  else if (a.funding === 'Open to raising' || b.funding === 'Open to raising') score += 2
  else score += 0

  return Math.min(score, 10)
}

// ── Master scoring function ─────────────────────────────────────
export function scoreMatch(a: UserProfile, b: UserProfile): number {
  if (!checkDealBreakers(a, b)) return 0

  const skills = scoreSkills(a, b)
  const ambition = scoreAmbition(a, b)
  const partnership = scorePartnership(a, b)
  const workStyle = scoreWorkStyle(a, b)
  const experience = scoreExperience(a, b)
  const commitment = scoreCommitment(a, b)

  const total = skills + ambition + partnership + workStyle + experience + commitment
  return Math.min(Math.round(total), 100)
}

// ── Score breakdown (for showing why they matched) ──────────────
export function scoreBreakdown(a: UserProfile, b: UserProfile) {
  return {
    dealBreakersPass: checkDealBreakers(a, b),
    skills: scoreSkills(a, b),
    ambition: scoreAmbition(a, b),
    partnership: scorePartnership(a, b),
    workStyle: scoreWorkStyle(a, b),
    experience: scoreExperience(a, b),
    commitment: scoreCommitment(a, b),
    total: scoreMatch(a, b),
  }
}