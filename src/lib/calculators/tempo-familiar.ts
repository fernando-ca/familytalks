import { z } from 'zod'
import type { TempoFamiliarInput, TempoFamiliarResult } from '@/types'

// Validation Schema
export const tempoFamiliarSchema = z.object({
  weekdayMinutes: z
    .number()
    .min(0, 'O tempo não pode ser negativo')
    .max(480, 'O tempo máximo é 8 horas (480 minutos) por dia'),
  weekendMinutes: z
    .number()
    .min(0, 'O tempo não pode ser negativo')
    .max(960, 'O tempo máximo é 16 horas (960 minutos) por dia'),
  qualityMultiplier: z
    .number()
    .min(0.5, 'O multiplicador mínimo é 0.5')
    .max(2, 'O multiplicador máximo é 2'),
  familySize: z
    .number()
    .int('O tamanho da família deve ser um número inteiro')
    .min(1, 'A família deve ter pelo menos 1 filho')
    .max(10, 'O máximo de filhos é 10'),
})

// National averages by age group (hours/day) - Pew Research, 2021
const NATIONAL_AVERAGE_HOURS_PER_DAY = 1.8 // Average across all age groups

// Activity weights based on evidence
const ACTIVITY_WEIGHTS = {
  meals: 1.2,      // Strong protective evidence
  reading: 1.5,    // High cognitive impact
  freePlay: 1.3,   // Socioemotional development
  conversation: 1.4, // Mental health, bonding
  outdoor: 1.2,    // Physical + mental health
  homework: 0.8,   // Lower relational impact
}

// Category thresholds (in minutes per day)
interface CategoryThresholds {
  needsAttention: number
  building: number
  engaged: number
}

const CATEGORY_THRESHOLDS: CategoryThresholds = {
  needsAttention: 60,  // < 1 hour
  building: 90,        // 1-1.5 hours
  engaged: 150,        // 1.5-2.5 hours
  // Above 2.5 hours = highly connected
}

/**
 * Calculates the daily average time in minutes
 */
export function calculateDailyAverage(
  weekdayMinutes: number,
  weekendMinutes: number
): number {
  return (weekdayMinutes * 5 + weekendMinutes * 2) / 7
}

/**
 * Determines the engagement category based on daily average minutes
 */
export function getCategory(
  dailyAverageMinutes: number
): 'low' | 'medium' | 'high' | 'excellent' {
  if (dailyAverageMinutes < CATEGORY_THRESHOLDS.needsAttention) {
    return 'low'
  }
  if (dailyAverageMinutes < CATEGORY_THRESHOLDS.building) {
    return 'medium'
  }
  if (dailyAverageMinutes < CATEGORY_THRESHOLDS.engaged) {
    return 'high'
  }
  return 'excellent'
}

/**
 * Gets the category label in Portuguese
 */
export function getCategoryLabel(category: 'low' | 'medium' | 'high' | 'excellent'): string {
  const labels = {
    low: 'Precisa Atenção',
    medium: 'Em Construção',
    high: 'Engajado',
    excellent: 'Altamente Conectado',
  }
  return labels[category]
}

/**
 * Gets the category color for styling
 */
export function getCategoryColor(category: 'low' | 'medium' | 'high' | 'excellent'): string {
  const colors = {
    low: 'text-red-500',
    medium: 'text-yellow-500',
    high: 'text-green-500',
    excellent: 'text-primary-500',
  }
  return colors[category]
}

/**
 * Gets the category background color for styling
 */
export function getCategoryBgColor(category: 'low' | 'medium' | 'high' | 'excellent'): string {
  const colors = {
    low: 'bg-red-50 border-red-200',
    medium: 'bg-yellow-50 border-yellow-200',
    high: 'bg-green-50 border-green-200',
    excellent: 'bg-primary-50 border-primary-200',
  }
  return colors[category]
}

/**
 * Calculates the score (0-100)
 */
export function calculateScore(
  dailyAverageMinutes: number,
  qualityMultiplier: number
): number {
  // Max score is achieved at 180 minutes (3 hours) of quality time
  const maxMinutes = 180
  const baseScore = Math.min((dailyAverageMinutes / maxMinutes) * 100, 100)

  // Apply quality multiplier (0.5 to 2.0)
  const adjustedScore = baseScore * qualityMultiplier

  return Math.min(Math.round(adjustedScore), 100)
}

/**
 * Calculates comparison to national average
 */
export function calculateNationalComparison(dailyAverageMinutes: number): number {
  const nationalAverageMinutes = NATIONAL_AVERAGE_HOURS_PER_DAY * 60 // 108 minutes
  const difference = dailyAverageMinutes - nationalAverageMinutes
  const percentageDiff = (difference / nationalAverageMinutes) * 100
  return Math.round(percentageDiff)
}

/**
 * Generates personalized recommendations based on results
 */
export function generateRecommendations(
  category: 'low' | 'medium' | 'high' | 'excellent',
  dailyAverageMinutes: number,
  qualityMultiplier: number
): string[] {
  const recommendations: string[] = []

  if (category === 'low') {
    recommendations.push(
      'Comece adicionando 15 minutos de tempo de qualidade por dia',
      'Estabeleça um ritual diário inegociável, como uma refeição em família',
      'Crie zonas livres de telas durante o tempo em família'
    )
  } else if (category === 'medium') {
    recommendations.push(
      'Aumente o tempo nos fins de semana com atividades ao ar livre',
      'Adicione leitura compartilhada antes de dormir',
      'Envolva toda a família em atividades de culinária'
    )
  } else if (category === 'high') {
    recommendations.push(
      'Continue mantendo a consistência do tempo em família',
      'Experimente novas atividades para aumentar o engajamento',
      'Crie tradições familiares mensais especiais'
    )
  } else {
    recommendations.push(
      'Excelente! Continue mantendo esse nível de conexão',
      'Considere documentar esses momentos em um álbum familiar',
      'Compartilhe suas práticas com outras famílias como inspiração'
    )
  }

  // Quality-specific recommendations
  if (qualityMultiplier < 1) {
    recommendations.push(
      'Foque em aumentar a qualidade das interações diminuindo distrações'
    )
  }

  return recommendations
}

/**
 * Generates insights based on the calculations
 */
export function generateInsights(
  dailyAverageMinutes: number,
  weeklyTotal: number,
  yearlyProjection: number,
  nationalComparison: number,
  familySize: number
): string[] {
  const insights: string[] = []

  // Daily average insight
  const hours = Math.floor(dailyAverageMinutes / 60)
  const mins = Math.round(dailyAverageMinutes % 60)
  if (hours > 0) {
    insights.push(
      `Você dedica em média ${hours}h${mins > 0 ? ` e ${mins}min` : ''} por dia à família`
    )
  } else {
    insights.push(`Você dedica em média ${mins} minutos por dia à família`)
  }

  // National comparison insight
  if (nationalComparison > 0) {
    insights.push(
      `Isso é ${nationalComparison}% acima da média nacional`
    )
  } else if (nationalComparison < 0) {
    insights.push(
      `Isso está ${Math.abs(nationalComparison)}% abaixo da média nacional`
    )
  } else {
    insights.push('Você está na média nacional de tempo familiar')
  }

  // Yearly projection insight
  const yearlyHours = Math.round(yearlyProjection / 60)
  insights.push(
    `Em um ano, isso totaliza aproximadamente ${yearlyHours} horas em família`
  )

  // Memory bank insight (based on family size)
  const memorableEvents = Math.floor((yearlyProjection / 60) / 2) // ~2h per memorable event
  insights.push(
    `Potencial de criar ${memorableEvents * familySize} momentos memoráveis por ano`
  )

  return insights
}

/**
 * Main calculation function
 */
export function calculateTempoFamiliar(input: TempoFamiliarInput): TempoFamiliarResult {
  // Calculate daily average in minutes
  const dailyAverageMinutes = calculateDailyAverage(
    input.weekdayMinutes,
    input.weekendMinutes
  )

  // Calculate projections (in minutes)
  const weeklyTotal = Math.round(dailyAverageMinutes * 7)
  const monthlyTotal = Math.round(dailyAverageMinutes * 30)
  const yearlyProjection = Math.round(dailyAverageMinutes * 365)

  // Apply quality multiplier for adjusted calculations
  const adjustedDailyAverage = dailyAverageMinutes * input.qualityMultiplier

  // Determine category and score
  const category = getCategory(adjustedDailyAverage)
  const score = calculateScore(dailyAverageMinutes, input.qualityMultiplier)

  // Calculate national comparison
  const nationalComparison = calculateNationalComparison(dailyAverageMinutes)

  // Generate recommendations and insights
  const recommendations = generateRecommendations(
    category,
    dailyAverageMinutes,
    input.qualityMultiplier
  )
  const insights = generateInsights(
    dailyAverageMinutes,
    weeklyTotal,
    yearlyProjection,
    nationalComparison,
    input.familySize
  )

  return {
    score,
    category,
    recommendations,
    insights,
    weeklyTotal,
    monthlyTotal,
    yearlyProjection,
  }
}

/**
 * Formats time in minutes to a readable string
 */
export function formatTime(minutes: number): string {
  if (minutes < 60) {
    return `${Math.round(minutes)} min`
  }
  const hours = Math.floor(minutes / 60)
  const mins = Math.round(minutes % 60)
  if (mins === 0) {
    return `${hours}h`
  }
  return `${hours}h ${mins}min`
}

/**
 * Gets progress percentage towards "highly connected" status
 */
export function getProgressToExcellent(dailyAverageMinutes: number): number {
  const target = CATEGORY_THRESHOLDS.engaged // 150 minutes
  const progress = (dailyAverageMinutes / target) * 100
  return Math.min(Math.round(progress), 100)
}
