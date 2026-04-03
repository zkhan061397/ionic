import { scoreMatch, scoreBreakdown } from './matching'

const founder: any = {
  role: 'Visionary / Founder',
  domain: 'B2B SaaS',
  stage: 'Pre-product',
  comms: 'Async first',
  pace: 'Move fast',
  risk: 'High — bet it all',
  hours: 'All hours grind',
  motivation: 'Building great products',
  conflict: 'Direct — say it straight',
  decisions: 'Gut instinct',
  relationship: 'Friendly colleagues',
  ambition: 'Billion dollar company',
  runway: '6-12 months',
  pivot: 'Open to it — ideas evolve',
  previous: 'Yes — it failed',
  commitment: 'Full-time only',
  location: 'Remote only',
  equity: 'Equal split',
  funding: 'Open to raising',
}

const engineer: any = {
  role: 'Builder / Engineer',
  domain: 'B2B SaaS',
  stage: 'Pre-product',
  comms: 'Async first',
  pace: 'Move fast',
  risk: 'Measured — calculated risks',
  hours: 'Flexible / whenever',
  motivation: 'Building great products',
  conflict: 'Direct — say it straight',
  decisions: 'Both equally',
  relationship: 'Friendly colleagues',
  ambition: 'Billion dollar company',
  runway: '6-12 months',
  pivot: 'Open to it — ideas evolve',
  previous: 'No — first time',
  commitment: 'Full-time only',
  location: 'Remote only',
  equity: 'Equal split',
  funding: 'Open to raising',
}

console.log('Score:', scoreMatch(founder, engineer))
console.log('Breakdown:', scoreBreakdown(founder, engineer))
