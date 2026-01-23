import { z } from 'zod'
import type { TempoTelaInput, TempoTelaResult } from '@/types'

// Validation Schema
export const tempoTelaSchema = z.object({
  childAge: z
    .number()
    .min(2, 'A idade mínima é 2 anos')
    .max(17, 'A idade máxima é 17 anos'),
  dailyScreenMinutes: z
    .number()
    .min(0, 'O tempo não pode ser negativo')
    .max(960, 'O tempo máximo é 16 horas (960 minutos) por dia'),
  educationalPercent: z
    .number()
    .min(0, 'A porcentagem mínima é 0%')
    .max(100, 'A porcentagem máxima é 100%'),
  coViewingPercent: z
    .number()
    .min(0, 'A porcentagem mínima é 0%')
    .max(100, 'A porcentagem máxima é 100%'),
  beforeBedMinutes: z
    .number()
    .min(0, 'O tempo não pode ser negativo')
    .max(180, 'O tempo máximo antes de dormir é 3 horas'),
})

// WHO recommendations by age (minutes per day)
const WHO_RECOMMENDATIONS: Record<string, number> = {
  '2-4': 60,    // 1 hour max for 2-4 years
  '5-17': 120,  // 2 hours max for 5-17 years
}

// National averages by age group (minutes per day) - Common Sense Media, 2021
const NATIONAL_AVERAGES: Record<string, number> = {
  '2-4': 180,   // 3 hours
  '5-8': 240,   // 4 hours
  '9-12': 300,  // 5 hours
  '13-17': 480, // 7-9 hours (using 8h average)
}

/**
 * Gets age group string
 */
export function getAgeGroup(age: number): string {
  if (age <= 4) return '2-4'
  if (age <= 8) return '5-8'
  if (age <= 12) return '9-12'
  return '13-17'
}

/**
 * Gets WHO recommendation for age
 */
export function getWHORecommendation(age: number): number {
  return age <= 4 ? WHO_RECOMMENDATIONS['2-4'] : WHO_RECOMMENDATIONS['5-17']
}

/**
 * Gets national average for age group
 */
export function getNationalAverage(age: number): number {
  const ageGroup = getAgeGroup(age)
  return NATIONAL_AVERAGES[ageGroup]
}

/**
 * Calculates base risk factor based on daily screen time
 */
export function getBaseRiskFactor(dailyMinutes: number): number {
  const dailyHours = dailyMinutes / 60
  if (dailyHours <= 2) return 1.0   // Low
  if (dailyHours <= 4) return 1.5   // Moderate
  if (dailyHours <= 6) return 2.2   // Elevated
  return 3.0                         // High
}

/**
 * Calculates risk multipliers based on usage patterns
 */
export function calculateRiskMultipliers(input: TempoTelaInput): {
  educational: number
  coViewing: number
  beforeBed: number
  youngChild: number
  total: number
} {
  // Educational content reduces risk
  const educational = input.educationalPercent >= 50 ? 0.8 :
                      input.educationalPercent >= 25 ? 0.9 : 1.0

  // Co-viewing reduces risk
  const coViewing = input.coViewingPercent >= 50 ? 0.85 :
                    input.coViewingPercent >= 25 ? 0.95 : 1.0

  // Screen time before bed increases risk
  const beforeBed = input.beforeBedMinutes >= 60 ? 1.3 :
                    input.beforeBedMinutes >= 30 ? 1.15 : 1.0

  // Younger children are more vulnerable
  const youngChild = input.childAge < 6 ? 1.3 :
                     input.childAge < 10 ? 1.15 : 1.0

  const total = educational * coViewing * beforeBed * youngChild

  return { educational, coViewing, beforeBed, youngChild, total }
}

/**
 * Determines risk level based on total risk score
 */
export function getRiskLevel(
  riskScore: number
): 'low' | 'moderate' | 'high' | 'critical' {
  if (riskScore <= 1.2) return 'low'
  if (riskScore <= 2.0) return 'moderate'
  if (riskScore <= 3.0) return 'high'
  return 'critical'
}

/**
 * Gets risk level label in Portuguese
 */
export function getRiskLabel(level: 'low' | 'moderate' | 'high' | 'critical'): string {
  const labels = {
    low: 'Baixo',
    moderate: 'Moderado',
    high: 'Elevado',
    critical: 'Crítico',
  }
  return labels[level]
}

/**
 * Gets risk level color for styling
 */
export function getRiskColor(level: 'low' | 'moderate' | 'high' | 'critical'): string {
  const colors = {
    low: 'text-green-500',
    moderate: 'text-yellow-500',
    high: 'text-orange-500',
    critical: 'text-red-500',
  }
  return colors[level]
}

/**
 * Gets risk level background color for styling
 */
export function getRiskBgColor(level: 'low' | 'moderate' | 'high' | 'critical'): string {
  const colors = {
    low: 'bg-green-50 border-green-200',
    moderate: 'bg-yellow-50 border-yellow-200',
    high: 'bg-orange-50 border-orange-200',
    critical: 'bg-red-50 border-red-200',
  }
  return colors[level]
}

/**
 * Checks if screen time is age appropriate
 */
export function isAgeAppropriate(dailyMinutes: number, age: number): boolean {
  const recommendation = getWHORecommendation(age)
  return dailyMinutes <= recommendation
}

/**
 * Calculates suggested daily limit based on age
 */
export function getSuggestedLimit(age: number): number {
  return getWHORecommendation(age)
}

/**
 * Calculates opportunity cost - what activities are being displaced
 */
export function calculateOpportunityCost(excessMinutes: number): {
  freePlay: number
  familyTime: number
  physicalActivity: number
  sleep: number
} {
  // Based on research: excess screen time displaces these activities
  if (excessMinutes <= 0) {
    return { freePlay: 0, familyTime: 0, physicalActivity: 0, sleep: 0 }
  }

  return {
    freePlay: Math.round(excessMinutes * 0.30),        // 30%
    familyTime: Math.round(excessMinutes * 0.25),      // 25%
    physicalActivity: Math.round(excessMinutes * 0.25), // 25%
    sleep: Math.round(excessMinutes * 0.20),           // 20%
  }
}

/**
 * Calculates yearly and lifetime projections
 */
export function calculateProjections(dailyMinutes: number, age: number): {
  weeklyHours: number
  monthlyHours: number
  yearlyHours: number
  yearlyDays: number
  hoursUntil18: number
  daysUntil18: number
} {
  const weeklyHours = (dailyMinutes * 7) / 60
  const monthlyHours = (dailyMinutes * 30) / 60
  const yearlyHours = (dailyMinutes * 365) / 60
  const yearlyDays = yearlyHours / 24
  const yearsRemaining = Math.max(0, 18 - age)
  const hoursUntil18 = yearlyHours * yearsRemaining
  const daysUntil18 = hoursUntil18 / 24

  return {
    weeklyHours: Math.round(weeklyHours),
    monthlyHours: Math.round(monthlyHours),
    yearlyHours: Math.round(yearlyHours),
    yearlyDays: Math.round(yearlyDays * 10) / 10,
    hoursUntil18: Math.round(hoursUntil18),
    daysUntil18: Math.round(daysUntil18 * 10) / 10,
  }
}

/**
 * Calculates score (0-100, inverted - lower screen time = higher score)
 */
export function calculateScore(
  dailyMinutes: number,
  age: number,
  riskMultiplier: number
): number {
  const recommendation = getWHORecommendation(age)

  // Base score: 100 if at or below recommendation, decreases as time increases
  const ratio = dailyMinutes / recommendation
  let baseScore: number

  if (ratio <= 1) {
    baseScore = 100
  } else if (ratio <= 2) {
    baseScore = 100 - ((ratio - 1) * 40) // 100 to 60
  } else if (ratio <= 3) {
    baseScore = 60 - ((ratio - 2) * 30)  // 60 to 30
  } else {
    baseScore = Math.max(0, 30 - ((ratio - 3) * 15)) // 30 to 0
  }

  // Apply risk multiplier adjustments (good habits improve score)
  const adjustedScore = baseScore / riskMultiplier

  return Math.min(100, Math.max(0, Math.round(adjustedScore)))
}

/**
 * Gets category based on score
 */
export function getCategory(score: number): 'low' | 'medium' | 'high' | 'excellent' {
  if (score >= 80) return 'excellent'
  if (score >= 60) return 'high'
  if (score >= 40) return 'medium'
  return 'low'
}

/**
 * Generates personalized recommendations
 */
export function generateRecommendations(
  input: TempoTelaInput,
  riskLevel: 'low' | 'moderate' | 'high' | 'critical'
): string[] {
  const recommendations: string[] = []
  const recommendation = getWHORecommendation(input.childAge)
  const excess = input.dailyScreenMinutes - recommendation

  // Screen time reduction recommendations
  if (excess > 0) {
    if (excess > 120) {
      recommendations.push(
        `Reduza gradualmente o tempo de tela em 30 minutos por semana até atingir ${recommendation / 60}h/dia`
      )
    } else {
      recommendations.push(
        `Tente reduzir ${Math.round(excess / 2)} minutos por dia para se aproximar da recomendação`
      )
    }
  }

  // Before bed recommendations
  if (input.beforeBedMinutes > 0) {
    recommendations.push(
      'Evite telas pelo menos 1 hora antes de dormir para melhorar a qualidade do sono'
    )
  }

  // Educational content recommendations
  if (input.educationalPercent < 50) {
    recommendations.push(
      'Priorize conteúdos educacionais e criativos em vez de consumo passivo'
    )
  }

  // Co-viewing recommendations
  if (input.coViewingPercent < 25) {
    recommendations.push(
      'Assista junto com a criança para transformar telas em momentos de conexão'
    )
  }

  // Age-specific recommendations
  if (input.childAge < 6) {
    recommendations.push(
      'Para crianças pequenas, priorize brincadeiras físicas e interações face a face'
    )
  }

  // Haidt norms (from "The Anxious Generation")
  if (riskLevel === 'high' || riskLevel === 'critical') {
    recommendations.push(
      'Considere adiar o acesso a smartphone até os 14 anos e redes sociais até os 16'
    )
  }

  // General recommendations
  if (recommendations.length < 3) {
    recommendations.push(
      'Crie zonas e horários livres de telas em casa, como durante as refeições'
    )
  }

  return recommendations.slice(0, 4)
}

/**
 * Generates insights based on the calculations
 */
export function generateInsights(
  input: TempoTelaInput,
  projections: ReturnType<typeof calculateProjections>,
  riskLevel: 'low' | 'moderate' | 'high' | 'critical'
): string[] {
  const insights: string[] = []
  const recommendation = getWHORecommendation(input.childAge)
  const nationalAvg = getNationalAverage(input.childAge)
  const dailyHours = input.dailyScreenMinutes / 60

  // Daily usage insight
  insights.push(
    `${input.dailyScreenMinutes} minutos por dia equivalem a ${dailyHours.toFixed(1)} horas diárias`
  )

  // Comparison to recommendation
  if (input.dailyScreenMinutes <= recommendation) {
    insights.push(
      `Dentro da recomendação da OMS de ${recommendation / 60}h/dia para essa faixa etária`
    )
  } else {
    const excess = input.dailyScreenMinutes - recommendation
    insights.push(
      `${excess} minutos acima da recomendação da OMS de ${recommendation / 60}h/dia`
    )
  }

  // Comparison to national average
  if (input.dailyScreenMinutes < nationalAvg) {
    const diff = Math.round(((nationalAvg - input.dailyScreenMinutes) / nationalAvg) * 100)
    insights.push(`${diff}% abaixo da média nacional para essa idade`)
  } else if (input.dailyScreenMinutes > nationalAvg) {
    const diff = Math.round(((input.dailyScreenMinutes - nationalAvg) / nationalAvg) * 100)
    insights.push(`${diff}% acima da média nacional para essa idade`)
  }

  // Yearly projection insight
  insights.push(
    `Em um ano, isso totaliza ${projections.yearlyHours} horas (${projections.yearlyDays} dias inteiros)`
  )

  // Until 18 projection (if applicable)
  if (input.childAge < 18 && projections.hoursUntil18 > 0) {
    insights.push(
      `Até os 18 anos: ${projections.hoursUntil18.toLocaleString()} horas de tela (${projections.daysUntil18} dias)`
    )
  }

  return insights
}

/**
 * Main calculation function
 */
export function calculateTempoTela(input: TempoTelaInput): TempoTelaResult {
  // Calculate risk multipliers
  const multipliers = calculateRiskMultipliers(input)
  const baseRisk = getBaseRiskFactor(input.dailyScreenMinutes)
  const totalRisk = baseRisk * multipliers.total

  // Determine risk level
  const riskLevel = getRiskLevel(totalRisk)

  // Check if age appropriate
  const ageAppropriate = isAgeAppropriate(input.dailyScreenMinutes, input.childAge)

  // Get suggested limit
  const suggestedLimit = getSuggestedLimit(input.childAge)

  // Calculate projections
  const projections = calculateProjections(input.dailyScreenMinutes, input.childAge)

  // Calculate score
  const score = calculateScore(input.dailyScreenMinutes, input.childAge, multipliers.total)
  const category = getCategory(score)

  // Generate recommendations and insights
  const recommendations = generateRecommendations(input, riskLevel)
  const insights = generateInsights(input, projections, riskLevel)

  return {
    score,
    category,
    recommendations,
    insights,
    riskLevel,
    ageAppropriate,
    suggestedLimit,
  }
}

/**
 * Formats minutes to readable time
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
