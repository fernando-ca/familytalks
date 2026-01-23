import { z } from 'zod'
import type { ROISocialInput, ROISocialResult } from '@/types'

// Validation Schema
export const roiSocialSchema = z.object({
  programInvestment: z
    .number()
    .min(0, 'O investimento não pode ser negativo')
    .max(1000, 'O máximo é 1000 horas semanais'),
  familiesReached: z
    .number()
    .int('O número deve ser inteiro')
    .min(1, 'Mínimo de 1 filho')
    .max(10, 'Máximo de 10 filhos'),
  avgIncomeIncrease: z
    .number()
    .min(0, 'O valor não pode ser negativo')
    .max(100, 'Máximo de 100 horas'),
  healthSavings: z
    .number()
    .min(0, 'O valor não pode ser negativo')
    .max(100, 'Máximo de 100 horas'),
  educationImprovement: z
    .number()
    .min(0, 'O valor não pode ser negativo')
    .max(100, 'Máximo de 100 horas'),
})

// Note: The input fields are repurposed for this calculator:
// - programInvestment: Total weekly hours of quality time
// - familiesReached: Number of children
// - avgIncomeIncrease: Hours spent on educational activities (reading, homework)
// - healthSavings: Hours spent on health activities (sports, outdoor)
// - educationImprovement: Hours spent on connection activities (meals, conversations)

// Base value per hour (based on cost-benefit studies)
// $70,000 avoided over 7 years / 500 hours/year = $20/hour = R$100/hour
const VALUE_PER_HOUR_BRL = 100

// Activity weights based on research evidence
const ACTIVITY_WEIGHTS = {
  educational: 1.5,    // Reading, homework help - High cognitive impact
  health: 1.2,         // Sports, outdoor activities - Physical + mental health
  connection: 1.35,    // Meals together, conversations - Emotional bonding
  general: 1.0,        // Other quality time
}

// Public cost savings per person per year (in BRL)
const PUBLIC_SAVINGS = {
  mentalHealthPrevention: 4120,    // R$4,120/person/year
  substanceAbusePrevention: 7500,  // R$7,500/person/year
  juvenileJusticeAvoided: 25000,   // R$25,000/person (one-time if applicable)
  educationalDropoutSavings: 150000, // R$150,000/person (lifetime productivity)
}

// Community impact multipliers
const COMMUNITY_MULTIPLIERS = {
  publicHealth: 0.30,    // 30% goes to public health savings
  justiceSavings: 0.15,  // 15% goes to justice system savings
  educationGains: 0.25,  // 25% goes to educational outcomes
  productivityGains: 0.30, // 30% goes to future productivity
}

/**
 * Calculates the weighted value of activities
 */
export function calculateWeightedValue(
  educationalHours: number,
  healthHours: number,
  connectionHours: number,
  totalHours: number
): { weightedHours: number; breakdown: Record<string, number> } {
  const otherHours = Math.max(0, totalHours - educationalHours - healthHours - connectionHours)

  const breakdown = {
    educational: educationalHours * ACTIVITY_WEIGHTS.educational,
    health: healthHours * ACTIVITY_WEIGHTS.health,
    connection: connectionHours * ACTIVITY_WEIGHTS.connection,
    general: otherHours * ACTIVITY_WEIGHTS.general,
  }

  const weightedHours = Object.values(breakdown).reduce((a, b) => a + b, 0)

  return { weightedHours, breakdown }
}

/**
 * Calculates annual ROI
 */
export function calculateAnnualROI(
  weeklyHours: number,
  weightedMultiplier: number,
  numberOfChildren: number
): number {
  const yearlyHours = weeklyHours * 52
  const baseValue = yearlyHours * VALUE_PER_HOUR_BRL * weightedMultiplier
  return Math.round(baseValue * numberOfChildren)
}

/**
 * Calculates lifetime ROI until children reach 18
 */
export function calculateLifetimeROI(
  annualROI: number,
  averageChildAge: number
): number {
  const yearsRemaining = Math.max(0, 18 - averageChildAge)
  return Math.round(annualROI * yearsRemaining)
}

/**
 * Calculates public savings based on protective factors
 */
export function calculatePublicSavings(
  weeklyHours: number,
  numberOfChildren: number
): {
  mentalHealth: number
  substanceAbuse: number
  education: number
  total: number
} {
  // Higher quality time = higher protective factor
  const protectiveFactor = Math.min(1, weeklyHours / 10) // Max factor at 10+ hours/week

  const mentalHealth = Math.round(
    PUBLIC_SAVINGS.mentalHealthPrevention * protectiveFactor * numberOfChildren
  )
  const substanceAbuse = Math.round(
    PUBLIC_SAVINGS.substanceAbusePrevention * protectiveFactor * 0.5 * numberOfChildren
  )
  const education = Math.round(
    PUBLIC_SAVINGS.educationalDropoutSavings * protectiveFactor * 0.1 * numberOfChildren
  )

  return {
    mentalHealth,
    substanceAbuse,
    education,
    total: mentalHealth + substanceAbuse + education,
  }
}

/**
 * Calculates community impact if scaled to 1000 families
 */
export function calculateCommunityImpact(annualROI: number): {
  publicHealth: number
  justiceSavings: number
  educationGains: number
  productivityGains: number
  totalImpact: number
} {
  const scaledROI = annualROI * 1000 // 1000 families

  return {
    publicHealth: Math.round(scaledROI * COMMUNITY_MULTIPLIERS.publicHealth),
    justiceSavings: Math.round(scaledROI * COMMUNITY_MULTIPLIERS.justiceSavings),
    educationGains: Math.round(scaledROI * COMMUNITY_MULTIPLIERS.educationGains),
    productivityGains: Math.round(scaledROI * COMMUNITY_MULTIPLIERS.productivityGains),
    totalImpact: scaledROI,
  }
}

/**
 * Calculates per-hour value
 */
export function calculatePerHourValue(weightedMultiplier: number): number {
  return Math.round(VALUE_PER_HOUR_BRL * weightedMultiplier)
}

/**
 * Gets category based on weekly hours
 */
export function getCategory(weeklyHours: number): 'low' | 'medium' | 'high' | 'excellent' {
  if (weeklyHours < 3) return 'low'
  if (weeklyHours < 6) return 'medium'
  if (weeklyHours < 10) return 'high'
  return 'excellent'
}

/**
 * Gets category label
 */
export function getCategoryLabel(category: 'low' | 'medium' | 'high' | 'excellent'): string {
  const labels = {
    low: 'Investimento Inicial',
    medium: 'Investimento Moderado',
    high: 'Alto Investimento',
    excellent: 'Investimento Excepcional',
  }
  return labels[category]
}

/**
 * Gets category color
 */
export function getCategoryColor(category: 'low' | 'medium' | 'high' | 'excellent'): string {
  const colors = {
    low: 'text-yellow-500',
    medium: 'text-blue-500',
    high: 'text-green-500',
    excellent: 'text-primary-500',
  }
  return colors[category]
}

/**
 * Gets category background color
 */
export function getCategoryBgColor(category: 'low' | 'medium' | 'high' | 'excellent'): string {
  const colors = {
    low: 'bg-yellow-50 border-yellow-200',
    medium: 'bg-blue-50 border-blue-200',
    high: 'bg-green-50 border-green-200',
    excellent: 'bg-primary-50 border-primary-200',
  }
  return colors[category]
}

/**
 * Calculates score (0-100)
 */
export function calculateScore(weeklyHours: number, weightedMultiplier: number): number {
  // Base score from hours (max at 15 hours/week)
  const hoursScore = Math.min(70, (weeklyHours / 15) * 70)

  // Bonus from activity quality (up to 30 points)
  const qualityBonus = (weightedMultiplier - 1) * 100

  return Math.min(100, Math.round(hoursScore + qualityBonus))
}

/**
 * Generates recommendations
 */
export function generateRecommendations(
  weeklyHours: number,
  educationalHours: number,
  healthHours: number,
  connectionHours: number
): string[] {
  const recommendations: string[] = []

  if (weeklyHours < 6) {
    recommendations.push(
      'Pesquisas mostram que 6+ horas semanais trazem benefícios significativos - tente adicionar mais tempo'
    )
  }

  if (educationalHours < 2) {
    recommendations.push(
      'Adicione leitura compartilhada - tem o maior impacto no desenvolvimento cognitivo (peso 1.5x)'
    )
  }

  if (connectionHours < 3) {
    recommendations.push(
      'Refeições em família e conversas significativas fortalecem vínculos emocionais'
    )
  }

  if (healthHours < 2) {
    recommendations.push(
      'Atividades físicas juntos promovem saúde e momentos memoráveis'
    )
  }

  if (weeklyHours >= 10) {
    recommendations.push(
      'Excelente investimento! Considere documentar esses momentos para criar memórias duradouras'
    )
  }

  recommendations.push(
    'Cada hora de qualidade gera aproximadamente R$100 em valor social evitando custos futuros'
  )

  return recommendations.slice(0, 4)
}

/**
 * Generates insights
 */
export function generateInsights(
  annualROI: number,
  lifetimeROI: number,
  publicSavings: ReturnType<typeof calculatePublicSavings>,
  perHourValue: number,
  numberOfChildren: number
): string[] {
  const insights: string[] = []

  insights.push(
    `Seu investimento anual em tempo parental vale aproximadamente R$${annualROI.toLocaleString()}`
  )

  insights.push(
    `Cada hora de qualidade gera R$${perHourValue} em valor social`
  )

  if (lifetimeROI > 0) {
    insights.push(
      `Até seus filhos completarem 18 anos: R$${lifetimeROI.toLocaleString()} em valor acumulado`
    )
  }

  insights.push(
    `Economia potencial em saúde mental: R$${publicSavings.mentalHealth.toLocaleString()}/ano`
  )

  if (numberOfChildren > 1) {
    insights.push(
      `Com ${numberOfChildren} filhos, o impacto é multiplicado para toda a família`
    )
  }

  return insights
}

/**
 * Main calculation function
 */
export function calculateROISocial(input: ROISocialInput): ROISocialResult {
  // Map input fields to our calculation model
  const weeklyHours = input.programInvestment
  const numberOfChildren = input.familiesReached
  const educationalHours = input.avgIncomeIncrease
  const healthHours = input.healthSavings
  const connectionHours = input.educationImprovement

  // Calculate weighted value
  const { weightedHours, breakdown } = calculateWeightedValue(
    educationalHours,
    healthHours,
    connectionHours,
    weeklyHours
  )

  const weightedMultiplier = weeklyHours > 0 ? weightedHours / weeklyHours : 1

  // Calculate ROI values
  const annualROI = calculateAnnualROI(weeklyHours, weightedMultiplier, numberOfChildren)
  const perHourValue = calculatePerHourValue(weightedMultiplier)

  // Assume average child age of 8 for lifetime calculations
  const lifetimeROI = calculateLifetimeROI(annualROI, 8)

  // Calculate public savings
  const publicSavings = calculatePublicSavings(weeklyHours, numberOfChildren)

  // Calculate community impact
  const communityImpact = calculateCommunityImpact(annualROI)

  // Calculate score and category
  const score = calculateScore(weeklyHours, weightedMultiplier)
  const category = getCategory(weeklyHours)

  // Generate recommendations and insights
  const recommendations = generateRecommendations(
    weeklyHours,
    educationalHours,
    healthHours,
    connectionHours
  )
  const insights = generateInsights(
    annualROI,
    lifetimeROI,
    publicSavings,
    perHourValue,
    numberOfChildren
  )

  return {
    score,
    category,
    recommendations,
    insights,
    totalROI: annualROI,
    perFamilyBenefit: perHourValue,
    societalImpact: communityImpact.totalImpact,
  }
}

/**
 * Formats currency in BRL
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

/**
 * Gets comparison data for alternative interventions
 */
export function getAlternativeComparisons(): {
  intervention: string
  costPerChild: number
  effectiveness: string
  roi: string
}[] {
  return [
    {
      intervention: 'Tempo parental de qualidade',
      costPerChild: 0,
      effectiveness: 'Alta',
      roi: 'Infinito',
    },
    {
      intervention: 'Terapia infantil',
      costPerChild: 12000,
      effectiveness: 'Moderada-Alta',
      roi: '3:1',
    },
    {
      intervention: 'Escola particular',
      costPerChild: 30000,
      effectiveness: 'Moderada',
      roi: '2:1',
    },
    {
      intervention: 'Programa social',
      costPerChild: 5000,
      effectiveness: 'Variável',
      roi: '1.5:1',
    },
  ]
}
