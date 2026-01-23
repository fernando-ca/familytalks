import { z } from 'zod'

// Types
export type MealsCategory = 'disconnected' | 'building' | 'engaged' | 'connected'
export type ScreensPresence = 'never' | 'sometimes' | 'always'
export type MealDuration = 'less10' | '10to20' | '20to30' | 'more30'

export interface RefeicoesInput {
  breakfastPerWeek: number
  lunchPerWeek: number
  dinnerPerWeek: number
  averageDuration: MealDuration
  screensPresent: ScreensPresence
  bothParentsPresent: boolean
  conversationQuality: number  // 1-5
}

export interface ProtectionFactor {
  current: number
  potential: number
  label: string
  description: string
}

export interface ImpactOfOne {
  yearlyHours: number
  vocabularyExposure: number
  riskReduction: number
  description: string
}

export interface NationalComparison {
  yourFamily: number
  nationalAverage: number
  highConnectionFamilies: number
  percentile: number
}

export interface WeeklyMilestone {
  week: number
  goal: number
  tip: string
}

export interface ConversationStarter {
  category: string
  question: string
}

export interface RefeicoesResult {
  currentStatus: {
    totalMealsPerWeek: number
    category: MealsCategory
    categoryLabel: string
    categoryColor: string
    categoryBgColor: string
    totalConnectionMinutes: number
    qualityScore: number
    qualityMultiplier: number
  }
  protectionFactors: {
    obesity: ProtectionFactor
    unhealthyEating: ProtectionFactor
    eatingDisorders: ProtectionFactor
    substanceUse: ProtectionFactor
    mentalHealth: ProtectionFactor
  }
  impactOfOne: ImpactOfOne
  nationalComparison: NationalComparison
  actionPlan: {
    currentMeals: number
    goalMeals: number
    weeklyPlan: WeeklyMilestone[]
    goldenRules: string[]
  }
  conversationStarters: ConversationStarter[]
  insights: string[]
  recommendations: string[]
  sources: string[]
}

// Validation Schema
export const refeicoesSchema = z.object({
  breakfastPerWeek: z
    .number()
    .min(0, 'Minimo e 0')
    .max(7, 'Maximo e 7 cafes da manha por semana'),
  lunchPerWeek: z
    .number()
    .min(0, 'Minimo e 0')
    .max(7, 'Maximo e 7 almocos por semana'),
  dinnerPerWeek: z
    .number()
    .min(0, 'Minimo e 0')
    .max(7, 'Maximo e 7 jantares por semana'),
  averageDuration: z.enum(['less10', '10to20', '20to30', 'more30']),
  screensPresent: z.enum(['never', 'sometimes', 'always']),
  bothParentsPresent: z.boolean(),
  conversationQuality: z.number().min(1).max(5),
})

// Duration mapping (in minutes)
export const durationMap: Record<MealDuration, number> = {
  less10: 8,
  '10to20': 15,
  '20to30': 25,
  more30: 40,
}

export const durationLabels: Record<MealDuration, string> = {
  less10: 'Menos de 10 minutos',
  '10to20': '10-20 minutos',
  '20to30': '20-30 minutos',
  more30: 'Mais de 30 minutos',
}

export const screensLabels: Record<ScreensPresence, string> = {
  never: 'Nunca',
  sometimes: 'As vezes',
  always: 'Sempre',
}

// Category thresholds
const CATEGORY_THRESHOLDS = {
  disconnected: 2,  // <= 2
  building: 4,      // 3-4
  engaged: 6,       // 5-6
  // connected: > 6
}

// National benchmarks (Brazil estimates)
const NATIONAL_AVERAGE = 4  // refeicoes/semana
const HIGH_CONNECTION = 10  // refeicoes/semana (familias altamente conectadas)

/**
 * Get category based on total meals per week
 */
export function getCategory(totalMeals: number): MealsCategory {
  if (totalMeals <= CATEGORY_THRESHOLDS.disconnected) return 'disconnected'
  if (totalMeals <= CATEGORY_THRESHOLDS.building) return 'building'
  if (totalMeals <= CATEGORY_THRESHOLDS.engaged) return 'engaged'
  return 'connected'
}

/**
 * Get category label in Portuguese
 */
export function getCategoryLabel(category: MealsCategory): string {
  const labels: Record<MealsCategory, string> = {
    disconnected: 'Familia Desconectada',
    building: 'Em Construcao',
    engaged: 'Familia Engajada',
    connected: 'Familia Conectada',
  }
  return labels[category]
}

/**
 * Get category color for styling
 */
export function getCategoryColor(category: MealsCategory): string {
  const colors: Record<MealsCategory, string> = {
    disconnected: 'text-red-500',
    building: 'text-yellow-600',
    engaged: 'text-green-500',
    connected: 'text-primary-500',
  }
  return colors[category]
}

/**
 * Get category background color for styling
 */
export function getCategoryBgColor(category: MealsCategory): string {
  const colors: Record<MealsCategory, string> = {
    disconnected: 'bg-red-50 border-red-200',
    building: 'bg-yellow-50 border-yellow-200',
    engaged: 'bg-green-50 border-green-200',
    connected: 'bg-primary-50 border-primary-200',
  }
  return colors[category]
}

/**
 * Calculate quality multiplier based on factors
 */
export function calculateQualityMultiplier(
  duration: MealDuration,
  screens: ScreensPresence,
  bothParents: boolean,
  conversationQuality: number
): number {
  // Duration factor (20+ min = 1.3x)
  const durationFactor = duration === '20to30' || duration === 'more30' ? 1.3 : 1.0

  // Screens factor (never = 1.4x, sometimes = 1.0x, always = 0.7x)
  const screensFactor = screens === 'never' ? 1.4 : screens === 'sometimes' ? 1.0 : 0.7

  // Both parents factor (1.25x if both present regularly)
  const parentsFactor = bothParents ? 1.25 : 1.0

  // Conversation quality factor (0.8 to 1.2 based on 1-5 scale)
  const conversationFactor = 0.8 + (conversationQuality - 1) * 0.1

  return durationFactor * screensFactor * parentsFactor * conversationFactor
}

/**
 * Calculate protection factors based on meals and quality
 */
export function calculateProtectionFactors(
  totalMeals: number,
  qualityMultiplier: number
): RefeicoesResult['protectionFactors'] {
  // Base protection values (from research)
  const baseProtection = {
    obesity: totalMeals >= 3 ? -12 : Math.round(-8 * (totalMeals / 3)),
    unhealthyEating: totalMeals >= 3 ? -20 : Math.round(-15 * (totalMeals / 3)),
    eatingDisorders: totalMeals >= 3 ? -35 : Math.round(-25 * (totalMeals / 3)),
    substanceUse: totalMeals >= 5 ? -15 : Math.round(-10 * (totalMeals / 5)),
    mentalHealth: totalMeals >= 5 ? -25 : Math.round(-15 * (totalMeals / 5)),
  }

  // Potential protection (with 7+ meals and quality)
  const potentialProtection = {
    obesity: -12,
    unhealthyEating: -20,
    eatingDisorders: -35,
    substanceUse: -15,
    mentalHealth: -25,
  }

  // Apply quality multiplier
  const currentWithQuality = {
    obesity: Math.round(baseProtection.obesity * qualityMultiplier),
    unhealthyEating: Math.round(baseProtection.unhealthyEating * qualityMultiplier),
    eatingDisorders: Math.round(baseProtection.eatingDisorders * qualityMultiplier),
    substanceUse: Math.round(baseProtection.substanceUse * qualityMultiplier),
    mentalHealth: Math.round(baseProtection.mentalHealth * qualityMultiplier),
  }

  return {
    obesity: {
      current: currentWithQuality.obesity,
      potential: Math.round(potentialProtection.obesity * 1.5),  // With max quality
      label: 'Reducao Risco de Obesidade',
      description: 'Refeicoes em familia reduzem o risco de sobrepeso e obesidade infantil.',
    },
    unhealthyEating: {
      current: currentWithQuality.unhealthyEating,
      potential: Math.round(potentialProtection.unhealthyEating * 1.5),
      label: 'Reducao Alimentacao Nao Saudavel',
      description: 'Criancas que comem em familia tendem a ter dietas mais equilibradas.',
    },
    eatingDisorders: {
      current: currentWithQuality.eatingDisorders,
      potential: Math.round(potentialProtection.eatingDisorders * 1.5),
      label: 'Protecao Contra Transtornos Alimentares',
      description: 'Refeicoes familiares criam relacao saudavel com alimentacao.',
    },
    substanceUse: {
      current: currentWithQuality.substanceUse,
      potential: Math.round(potentialProtection.substanceUse * 1.5),
      label: 'Reducao Uso de Substancias',
      description: 'Adolescentes que jantam em familia tem menor probabilidade de usar drogas.',
    },
    mentalHealth: {
      current: currentWithQuality.mentalHealth,
      potential: Math.round(potentialProtection.mentalHealth * 1.5),
      label: 'Protecao Saude Mental',
      description: 'Refeicoes juntos reduzem risco de depressao e comportamentos de risco.',
    },
  }
}

/**
 * Calculate impact of adding one more meal per week
 */
export function calculateImpactOfOne(currentMeals: number): ImpactOfOne {
  return {
    yearlyHours: 52,  // 1h/week * 52 weeks (assuming ~1h per meal with prep/cleanup)
    vocabularyExposure: 2600,  // ~50 words/meal * 52 weeks
    riskReduction: currentMeals < 5 ? 10 : 5,  // Higher impact if below threshold
    description: currentMeals < 3
      ? 'Adicionar uma refeicao pode iniciar a construcao de habitos protetores significativos.'
      : currentMeals < 5
        ? 'Mais uma refeicao pode desbloquear protecoes adicionais contra uso de substancias.'
        : 'Cada refeicao adicional fortalece os vinculos e a comunicacao familiar.',
  }
}

/**
 * Calculate national comparison
 */
export function calculateNationalComparison(totalMeals: number): NationalComparison {
  // Calculate percentile (simplified)
  let percentile: number
  if (totalMeals <= 2) percentile = 15
  else if (totalMeals <= 4) percentile = 40
  else if (totalMeals <= 6) percentile = 65
  else if (totalMeals <= 10) percentile = 85
  else percentile = 95

  return {
    yourFamily: totalMeals,
    nationalAverage: NATIONAL_AVERAGE,
    highConnectionFamilies: HIGH_CONNECTION,
    percentile,
  }
}

/**
 * Generate action plan based on current status
 */
export function generateActionPlan(
  currentMeals: number,
  category: MealsCategory
): RefeicoesResult['actionPlan'] {
  // Set goal based on current level
  let goalMeals: number
  if (currentMeals <= 2) goalMeals = 5
  else if (currentMeals <= 4) goalMeals = 7
  else if (currentMeals <= 6) goalMeals = 10
  else goalMeals = Math.min(currentMeals + 3, 14)

  // Generate weekly milestones
  const weeklyPlan: WeeklyMilestone[] = []
  const increment = Math.ceil((goalMeals - currentMeals) / 4)

  for (let week = 1; week <= 4; week++) {
    const weekGoal = Math.min(currentMeals + increment * week, goalMeals)
    weeklyPlan.push({
      week,
      goal: weekGoal,
      tip: getWeeklyTip(week, weekGoal),
    })
  }

  // Golden rules based on category
  const goldenRules = getGoldenRules(category)

  return {
    currentMeals,
    goalMeals,
    weeklyPlan,
    goldenRules,
  }
}

function getWeeklyTip(week: number, goal: number): string {
  const tips: Record<number, string> = {
    1: 'Comece com o jantar - e a refeicao mais facil de reunir todos.',
    2: 'Adicione um cafe da manha no fim de semana - momento calmo para conversar.',
    3: 'Tente manter a consistencia mesmo nos dias mais corridos.',
    4: 'Celebre o progresso! Cada refeicao juntos e uma vitoria.',
  }
  return tips[week] || `Meta: ${goal} refeicoes esta semana`
}

function getGoldenRules(category: MealsCategory): string[] {
  const baseRules = [
    'Sem telas na mesa - celulares, tablets e TV ficam longe',
    'Todos ajudam - mesmo criancas pequenas podem participar',
    'Conversas positivas - evite criticas e discussoes durante a refeicao',
  ]

  const categoryRules: Record<MealsCategory, string[]> = {
    disconnected: [
      'Comece com apenas 1 refeicao por semana - consistencia importa mais que quantidade',
      'Escolha um dia fixo para ser "sagrado" - o dia da refeicao em familia',
      ...baseRules,
    ],
    building: [
      'Adicione gradualmente - uma nova refeicao a cada 2 semanas',
      'Envolva as criancas no planejamento do cardapio',
      ...baseRules,
    ],
    engaged: [
      'Experimente temas semanais para as conversas',
      'Crie tradicoes como "pizza friday" ou "sopao de domingo"',
      ...baseRules,
    ],
    connected: [
      'Convide amigos e familiares para expandir a experiencia',
      'Ensine receitas de familia - transmita tradicoes',
      ...baseRules,
    ],
  }

  return categoryRules[category]
}

/**
 * Generate conversation starters
 */
export function generateConversationStarters(): ConversationStarter[] {
  return [
    {
      category: 'Dia a Dia',
      question: 'Qual foi a melhor parte do seu dia hoje?',
    },
    {
      category: 'Dia a Dia',
      question: 'O que te fez rir hoje?',
    },
    {
      category: 'Sentimentos',
      question: 'Como voce esta se sentindo sobre [evento proximo]?',
    },
    {
      category: 'Sentimentos',
      question: 'O que te deixou orgulhoso de si mesmo recentemente?',
    },
    {
      category: 'Sonhos',
      question: 'Se pudesse ter qualquer superpoder, qual seria?',
    },
    {
      category: 'Sonhos',
      question: 'O que voce gostaria de aprender a fazer?',
    },
    {
      category: 'Familia',
      question: 'Qual e sua lembranca favorita de familia?',
    },
    {
      category: 'Familia',
      question: 'O que podemos fazer juntos no proximo fim de semana?',
    },
    {
      category: 'Reflexao',
      question: 'Se pudesse mudar uma coisa no mundo, o que seria?',
    },
    {
      category: 'Reflexao',
      question: 'Quem e alguem que voce admira e por que?',
    },
  ]
}

/**
 * Generate insights based on results
 */
export function generateInsights(
  totalMeals: number,
  qualityMultiplier: number,
  category: MealsCategory,
  comparison: NationalComparison
): string[] {
  const insights: string[] = []

  // Total meals insight
  insights.push(
    `Sua familia faz ${totalMeals} refeicoes juntos por semana`
  )

  // Comparison insight
  if (totalMeals > comparison.nationalAverage) {
    const diff = totalMeals - comparison.nationalAverage
    insights.push(
      `Isso e ${diff} refeicao${diff > 1 ? 'es' : ''} a mais que a media nacional (${comparison.nationalAverage}/semana)`
    )
  } else if (totalMeals < comparison.nationalAverage) {
    const diff = comparison.nationalAverage - totalMeals
    insights.push(
      `Isso e ${diff} refeicao${diff > 1 ? 'es' : ''} a menos que a media nacional (${comparison.nationalAverage}/semana)`
    )
  } else {
    insights.push('Voce esta na media nacional de refeicoes em familia')
  }

  // Percentile insight
  insights.push(
    `Voce esta no percentil ${comparison.percentile} das familias brasileiras`
  )

  // Quality insight
  if (qualityMultiplier >= 1.5) {
    insights.push('A qualidade das suas refeicoes e excelente - potencializando os beneficios!')
  } else if (qualityMultiplier < 1.0) {
    insights.push('Melhorar a qualidade (menos telas, mais conversa) pode multiplicar os beneficios')
  }

  return insights
}

/**
 * Generate recommendations based on category and factors
 */
export function generateRecommendations(
  category: MealsCategory,
  screens: ScreensPresence,
  duration: MealDuration,
  conversationQuality: number
): string[] {
  const recommendations: string[] = []

  // Category-based recommendations
  const categoryRecs: Record<MealsCategory, string> = {
    disconnected: 'Priorize adicionar pelo menos 3 refeicoes em familia por semana - este e o limiar para beneficios significativos',
    building: 'Voce esta no caminho certo! Tente adicionar mais 1-2 refeicoes semanais para alcancar o nivel "engajado"',
    engaged: 'Excelente frequencia! Foque agora em melhorar a qualidade das interacoes',
    connected: 'Parabens! Mantenha a consistencia e considere envolver mais familia estendida',
  }
  recommendations.push(categoryRecs[category])

  // Screens recommendation
  if (screens === 'always') {
    recommendations.push('Remover telas durante as refeicoes pode aumentar os beneficios em ate 40%')
  } else if (screens === 'sometimes') {
    recommendations.push('Tente estabelecer a regra de "sem telas" para todas as refeicoes em familia')
  }

  // Duration recommendation
  if (duration === 'less10' || duration === '10to20') {
    recommendations.push('Estender as refeicoes para 20+ minutos permite conversas mais significativas')
  }

  // Conversation quality recommendation
  if (conversationQuality <= 2) {
    recommendations.push('Use as sugestoes de conversa para melhorar o engajamento durante as refeicoes')
  } else if (conversationQuality <= 3) {
    recommendations.push('Experimente perguntas mais profundas para elevar a qualidade das conversas')
  }

  return recommendations.slice(0, 4)
}

/**
 * Main calculation function
 */
export function calculateRefeicoes(input: RefeicoesInput): RefeicoesResult {
  const {
    breakfastPerWeek,
    lunchPerWeek,
    dinnerPerWeek,
    averageDuration,
    screensPresent,
    bothParentsPresent,
    conversationQuality,
  } = input

  // Calculate total meals
  const totalMeals = breakfastPerWeek + lunchPerWeek + dinnerPerWeek

  // Get category
  const category = getCategory(totalMeals)

  // Calculate quality multiplier
  const qualityMultiplier = calculateQualityMultiplier(
    averageDuration,
    screensPresent,
    bothParentsPresent,
    conversationQuality
  )

  // Calculate connection time (minutes per week)
  const minutesPerMeal = durationMap[averageDuration]
  const totalConnectionMinutes = totalMeals * minutesPerMeal

  // Calculate quality score (0-100)
  const qualityScore = Math.min(Math.round(qualityMultiplier * 50), 100)

  // Calculate protection factors
  const protectionFactors = calculateProtectionFactors(totalMeals, qualityMultiplier)

  // Calculate impact of adding one more meal
  const impactOfOne = calculateImpactOfOne(totalMeals)

  // Calculate national comparison
  const nationalComparison = calculateNationalComparison(totalMeals)

  // Generate action plan
  const actionPlan = generateActionPlan(totalMeals, category)

  // Generate conversation starters
  const conversationStarters = generateConversationStarters()

  // Generate insights
  const insights = generateInsights(totalMeals, qualityMultiplier, category, nationalComparison)

  // Generate recommendations
  const recommendations = generateRecommendations(
    category,
    screensPresent,
    averageDuration,
    conversationQuality
  )

  // Scientific sources
  const sources = [
    'Hammons, A. J., & Fiese, B. H. (2011). Is frequency of shared family meals related to the nutritional health of children and adolescents? Pediatrics.',
    'CASA Columbia (2011). The Importance of Family Dinners VIII.',
    'Eisenberg, M. E., et al. (2004). Family meals and substance use. Journal of Adolescent Health.',
    'Harvard Research (2005). Family dinner and academic achievement.',
  ]

  return {
    currentStatus: {
      totalMealsPerWeek: totalMeals,
      category,
      categoryLabel: getCategoryLabel(category),
      categoryColor: getCategoryColor(category),
      categoryBgColor: getCategoryBgColor(category),
      totalConnectionMinutes,
      qualityScore,
      qualityMultiplier: Math.round(qualityMultiplier * 100) / 100,
    },
    protectionFactors,
    impactOfOne,
    nationalComparison,
    actionPlan,
    conversationStarters,
    insights,
    recommendations,
    sources,
  }
}

/**
 * Format time in minutes to readable string
 */
export function formatConnectionTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`
  }
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (mins === 0) {
    return `${hours}h`
  }
  return `${hours}h ${mins}min`
}

/**
 * Get yearly projection
 */
export function getYearlyProjection(weeklyMinutes: number): {
  hours: number
  days: number
} {
  const yearlyMinutes = weeklyMinutes * 52
  return {
    hours: Math.round(yearlyMinutes / 60),
    days: Math.round((yearlyMinutes / 60) / 24 * 10) / 10,
  }
}
