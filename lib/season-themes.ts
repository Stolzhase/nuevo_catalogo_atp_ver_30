import { LucideIcon, Cloud, Sun, Leaf, Snowflake } from 'lucide-react'

export type Season = 'Primavera' | 'Verano' | 'Otoño' | 'Invierno' | 'Todo el año'

export interface SeasonTheme {
  name: Season
  icon: LucideIcon
  color: string
  bgColor: string
  accentColor: string
  description: string
  emoji: string
}

export const SEASON_THEMES: Record<Season, SeasonTheme> = {
  'Primavera': {
    name: 'Primavera',
    icon: Leaf,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    accentColor: 'bg-emerald-600',
    description: 'Renacimiento de sabores frescos',
    emoji: '🌱',
  },
  'Verano': {
    name: 'Verano',
    icon: Sun,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    accentColor: 'bg-amber-600',
    description: 'Calor y vitalidad en cada plato',
    emoji: '☀️',
  },
  'Otoño': {
    name: 'Otoño',
    icon: Leaf,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    accentColor: 'bg-orange-600',
    description: 'Cosecha abundante y acogedora',
    emoji: '🍂',
  },
  'Invierno': {
    name: 'Invierno',
    icon: Snowflake,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    accentColor: 'bg-blue-600',
    description: 'Frescura cristalina del invierno',
    emoji: '❄️',
  },
  'Todo el año': {
    name: 'Todo el año',
    icon: Cloud,
    color: 'text-slate-600',
    bgColor: 'bg-slate-50',
    accentColor: 'bg-slate-600',
    description: 'Disponibles siempre',
    emoji: '🌿',
  },
}

export function getSeasonTheme(season?: string): SeasonTheme {
  if (!season || !(season in SEASON_THEMES)) {
    return SEASON_THEMES['Todo el año']
  }
  return SEASON_THEMES[season as Season]
}
