import { z } from 'zod'

// Types
export type MomentCategory = 'conversation' | 'play' | 'meal' | 'learning' | 'outdoor' | 'routine'
export type ConnectionLevel = 'iniciante' | 'emProgresso' | 'engajado' | 'conectado' | 'modelo'

export interface MomentInput {
  type: MomentCategory
  duration: number  // minutes
  date: string      // ISO date string
}

export interface MomentosInput {
  moments: MomentInput[]
  targetMomentsPerWeek?: number  // default: 20
}

export interface MomentCategoryInfo {
  label: string
  minDuration: number
  weight: number
  examples: string[]
  icon: string
}

export interface WeeklyScore {
  rawPoints: number
  finalScore: number
  variety: number
  momentsCount: number
  varietyBonus: boolean
}

export interface Achievement {
  id: string
  name: string
  description: string
  condition: string
  points: number
  unlocked: boolean
  progress?: number
  maxProgress?: number
}

export interface ConnectionLevelInfo {
  level: ConnectionLevel
  label: string
  description: string
  color: string
  bgColor: string
  minMoments: number
  maxMoments: number
}

export interface YearlyImpact {
  totalMoments: number
  totalHours: number
  equivalentDays: number
  memoryBankEstimate: number
}

export interface DayStatus {
  date: string
  dayOfWeek: string
  momentsCount: number
  totalMinutes: number
  categories: MomentCategory[]
  achieved: boolean
}

export interface WeeklyPattern {
  mostFrequentCategory: MomentCategory | null
  leastUsedCategory: MomentCategory | null
  bestDay: string
  hardestDay: string
  averageMomentsPerDay: number
  averageMinutesPerDay: number
}

export interface MomentosResult {
  score: number
  category: 'low' | 'medium' | 'high' | 'excellent'

  weeklyView: {
    days: DayStatus[]
    totalMoments: number
    totalMinutes: number
    goalMoments: number
    goalAchieved: boolean
    currentStreak: number
  }

  weeklyScore: WeeklyScore

  connectionLevel: ConnectionLevelInfo

  categoryBreakdown: {
    category: MomentCategory
    count: number
    totalMinutes: number
    weightedPoints: number
    percentage: number
  }[]

  achievements: {
    unlocked: Achievement[]
    inProgress: Achievement[]
    nextMilestone: Achievement | null
  }

  patterns: WeeklyPattern

  yearlyImpact: YearlyImpact

  suggestions: string[]
  insights: string[]
  recommendations: string[]
  sources: string[]
}

// Validation Schema
export const momentSchema = z.object({
  type: z.enum(['conversation', 'play', 'meal', 'learning', 'outdoor', 'routine']),
  duration: z.number().min(1, 'Duracao minima e 1 minuto').max(480, 'Duracao maxima e 8 horas'),
  date: z.string(),
})

export const momentosInputSchema = z.object({
  moments: z.array(momentSchema),
  targetMomentsPerWeek: z.number().min(1).max(100).optional().default(20),
})

// Category definitions (from documentation)
export const momentCategories: Record<MomentCategory, MomentCategoryInfo> = {
  conversation: {
    label: 'Conversa Significativa',
    minDuration: 5,
    weight: 1.4,
    examples: ['Perguntar sobre o dia', 'Discutir sentimentos', 'Planejar juntos'],
    icon: '💬',
  },
  play: {
    label: 'Brincadeira/Jogo',
    minDuration: 10,
    weight: 1.3,
    examples: ['Jogo de tabuleiro', 'Esporte', 'Brincadeira livre'],
    icon: '🎮',
  },
  meal: {
    label: 'Refeicao Juntos',
    minDuration: 15,
    weight: 1.2,
    examples: ['Jantar em familia', 'Cafe da manha', 'Lanche compartilhado'],
    icon: '🍽️',
  },
  learning: {
    label: 'Momento de Aprendizado',
    minDuration: 10,
    weight: 1.5,
    examples: ['Leitura', 'Dever de casa', 'Ensinar habilidade nova'],
    icon: '📚',
  },
  outdoor: {
    label: 'Atividade ao Ar Livre',
    minDuration: 15,
    weight: 1.3,
    examples: ['Caminhada', 'Parque', 'Passeio de bicicleta'],
    icon: '🌳',
  },
  routine: {
    label: 'Ritual de Rotina',
    minDuration: 5,
    weight: 1.0,
    examples: ['Historia antes de dormir', 'Cafe da manha junto', 'Oracao/meditacao'],
    icon: '🌙',
  },
}

// Level thresholds (from documentation)
export const connectionLevels: ConnectionLevelInfo[] = [
  {
    level: 'iniciante',
    label: 'Iniciante',
    description: 'Comecando a construir habitos de conexao',
    color: 'text-neutral-600',
    bgColor: 'bg-neutral-100 border-neutral-200',
    minMoments: 1,
    maxMoments: 5,
  },
  {
    level: 'emProgresso',
    label: 'Em Progresso',
    description: 'Desenvolvendo consistencia nos momentos de conexao',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50 border-yellow-200',
    minMoments: 6,
    maxMoments: 12,
  },
  {
    level: 'engajado',
    label: 'Engajado',
    description: 'Boa frequencia de momentos de conexao',
    color: 'text-green-600',
    bgColor: 'bg-green-50 border-green-200',
    minMoments: 13,
    maxMoments: 19,
  },
  {
    level: 'conectado',
    label: 'Conectado',
    description: 'Alto nivel de presenca e conexao familiar',
    color: 'text-primary-600',
    bgColor: 'bg-primary-50 border-primary-200',
    minMoments: 20,
    maxMoments: 30,
  },
  {
    level: 'modelo',
    label: 'Modelo',
    description: 'Inspiracao para outras familias! Excelente conexao.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 border-purple-200',
    minMoments: 31,
    maxMoments: Infinity,
  },
]

// Achievement definitions (from documentation)
export const achievementDefinitions: Omit<Achievement, 'unlocked' | 'progress' | 'maxProgress'>[] = [
  {
    id: 'firstWeek',
    name: 'Primeiro Passo',
    description: 'Complete sua primeira semana de tracking',
    condition: 'weeksTracked >= 1',
    points: 10,
  },
  {
    id: 'consistency7',
    name: 'Semana Conectada',
    description: 'Registre ao menos 1 momento por dia durante 7 dias',
    condition: 'consecutiveDays >= 7',
    points: 25,
  },
  {
    id: 'variety',
    name: 'Familia Diversificada',
    description: 'Registre momentos em 5+ categorias diferentes na semana',
    condition: 'categoriesThisWeek >= 5',
    points: 20,
  },
  {
    id: 'habit21',
    name: 'Construtor de Habitos',
    description: 'Mantenha tracking por 21 dias consecutivos',
    condition: 'consecutiveDays >= 21',
    points: 50,
  },
  {
    id: 'habit66',
    name: 'Habito Consolidado',
    description: 'Mantenha tracking por 66 dias consecutivos',
    condition: 'consecutiveDays >= 66',
    points: 100,
  },
  {
    id: 'quality20',
    name: 'Familia Conectada',
    description: 'Alcance 20+ momentos de qualidade em uma semana',
    condition: 'momentsThisWeek >= 20',
    points: 30,
  },
]

// Day names in Portuguese
const dayNames = ['Domingo', 'Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado']

/**
 * Get connection level based on weekly moments count
 */
export function getConnectionLevel(momentsCount: number): ConnectionLevelInfo {
  for (let i = connectionLevels.length - 1; i >= 0; i--) {
    if (momentsCount >= connectionLevels[i].minMoments) {
      return connectionLevels[i]
    }
  }
  return connectionLevels[0]
}

/**
 * Calculate weekly score with variety bonus
 */
export function calculateWeeklyScore(moments: MomentInput[]): WeeklyScore {
  let totalPoints = 0
  const uniqueCategories = new Set<MomentCategory>()

  moments.forEach((moment) => {
    const categoryInfo = momentCategories[moment.type]
    // Full point if duration meets minimum, half point otherwise
    const basePoints = moment.duration >= categoryInfo.minDuration ? 1 : 0.5
    const weightedPoints = basePoints * categoryInfo.weight
    totalPoints += weightedPoints
    uniqueCategories.add(moment.type)
  })

  // Variety bonus: 1.2x if 4+ different categories
  const varietyBonus = uniqueCategories.size >= 4
  const finalScore = varietyBonus ? totalPoints * 1.2 : totalPoints

  return {
    rawPoints: Math.round(totalPoints * 10) / 10,
    finalScore: Math.round(finalScore * 10) / 10,
    variety: uniqueCategories.size,
    momentsCount: moments.length,
    varietyBonus,
  }
}

/**
 * Calculate yearly impact projection
 */
export function calculateYearlyImpact(weeklyMoments: number): YearlyImpact {
  const avgDurationMin = 15 // average minutes per moment
  const yearlyMoments = weeklyMoments * 52
  const yearlyMinutes = yearlyMoments * avgDurationMin
  const yearlyHours = yearlyMinutes / 60

  return {
    totalMoments: yearlyMoments,
    totalHours: Math.round(yearlyHours),
    equivalentDays: Math.round((yearlyHours / 24) * 10) / 10,
    memoryBankEstimate: Math.floor(yearlyMoments * 0.3), // ~30% become significant memories
  }
}

/**
 * Calculate streak (consecutive days with at least 1 moment)
 */
export function calculateStreak(moments: MomentInput[]): number {
  if (moments.length === 0) return 0

  // Group moments by date
  const momentsByDate = new Map<string, number>()
  moments.forEach((m) => {
    const date = m.date.split('T')[0]
    momentsByDate.set(date, (momentsByDate.get(date) || 0) + 1)
  })

  // Sort dates
  const sortedDates = Array.from(momentsByDate.keys()).sort()
  if (sortedDates.length === 0) return 0

  // Calculate streak from most recent date
  let streak = 1
  for (let i = sortedDates.length - 1; i > 0; i--) {
    const current = new Date(sortedDates[i])
    const previous = new Date(sortedDates[i - 1])
    const diffDays = Math.floor((current.getTime() - previous.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 1) {
      streak++
    } else {
      break
    }
  }

  return streak
}

/**
 * Get weekly day statuses
 */
export function getWeeklyDayStatuses(moments: MomentInput[], weekStartDate: Date): DayStatus[] {
  const days: DayStatus[] = []

  for (let i = 0; i < 7; i++) {
    const date = new Date(weekStartDate)
    date.setDate(date.getDate() + i)
    const dateStr = date.toISOString().split('T')[0]

    const dayMoments = moments.filter((m) => m.date.split('T')[0] === dateStr)
    const categories = Array.from(new Set(dayMoments.map((m) => m.type)))
    const totalMinutes = dayMoments.reduce((sum, m) => sum + m.duration, 0)

    days.push({
      date: dateStr,
      dayOfWeek: dayNames[date.getDay()],
      momentsCount: dayMoments.length,
      totalMinutes,
      categories: categories as MomentCategory[],
      achieved: dayMoments.length >= 1,
    })
  }

  return days
}

/**
 * Calculate category breakdown
 */
export function calculateCategoryBreakdown(
  moments: MomentInput[]
): MomentosResult['categoryBreakdown'] {
  const categoryStats = new Map<
    MomentCategory,
    { count: number; totalMinutes: number; weightedPoints: number }
  >()

  // Initialize all categories
  const allCategories: MomentCategory[] = ['conversation', 'play', 'meal', 'learning', 'outdoor', 'routine']
  allCategories.forEach((cat) => {
    categoryStats.set(cat, { count: 0, totalMinutes: 0, weightedPoints: 0 })
  })

  // Calculate stats
  moments.forEach((moment) => {
    const stats = categoryStats.get(moment.type)!
    const categoryInfo = momentCategories[moment.type]
    const basePoints = moment.duration >= categoryInfo.minDuration ? 1 : 0.5

    stats.count++
    stats.totalMinutes += moment.duration
    stats.weightedPoints += basePoints * categoryInfo.weight
  })

  const totalMoments = moments.length || 1 // Avoid division by zero

  return allCategories.map((category) => {
    const stats = categoryStats.get(category)!
    return {
      category,
      count: stats.count,
      totalMinutes: stats.totalMinutes,
      weightedPoints: Math.round(stats.weightedPoints * 10) / 10,
      percentage: Math.round((stats.count / totalMoments) * 100),
    }
  })
}

/**
 * Calculate weekly patterns
 */
export function calculatePatterns(moments: MomentInput[]): WeeklyPattern {
  if (moments.length === 0) {
    return {
      mostFrequentCategory: null,
      leastUsedCategory: null,
      bestDay: '-',
      hardestDay: '-',
      averageMomentsPerDay: 0,
      averageMinutesPerDay: 0,
    }
  }

  // Category frequency
  const categoryCount = new Map<MomentCategory, number>()
  moments.forEach((m) => {
    categoryCount.set(m.type, (categoryCount.get(m.type) || 0) + 1)
  })

  const sortedCategories = Array.from(categoryCount.entries()).sort((a, b) => b[1] - a[1])
  const mostFrequentCategory = sortedCategories.length > 0 ? sortedCategories[0][0] : null

  // Find least used (from categories that exist in moments)
  const allCategories: MomentCategory[] = ['conversation', 'play', 'meal', 'learning', 'outdoor', 'routine']
  const usedCategories = new Set(moments.map((m) => m.type))
  const unusedCategories = allCategories.filter((c) => !usedCategories.has(c))
  const leastUsedCategory = unusedCategories.length > 0
    ? unusedCategories[0]
    : sortedCategories.length > 0
      ? sortedCategories[sortedCategories.length - 1][0]
      : null

  // Day analysis
  const momentsByDay = new Map<string, { count: number; minutes: number }>()
  moments.forEach((m) => {
    const dayOfWeek = dayNames[new Date(m.date).getDay()]
    const current = momentsByDay.get(dayOfWeek) || { count: 0, minutes: 0 }
    current.count++
    current.minutes += m.duration
    momentsByDay.set(dayOfWeek, current)
  })

  let bestDay = '-'
  let hardestDay = '-'
  let maxCount = 0
  let minCount = Infinity

  momentsByDay.forEach((stats, day) => {
    if (stats.count > maxCount) {
      maxCount = stats.count
      bestDay = day
    }
    if (stats.count < minCount) {
      minCount = stats.count
      hardestDay = day
    }
  })

  // Averages (assuming 7-day week)
  const totalMinutes = moments.reduce((sum, m) => sum + m.duration, 0)

  return {
    mostFrequentCategory,
    leastUsedCategory,
    bestDay,
    hardestDay,
    averageMomentsPerDay: Math.round((moments.length / 7) * 10) / 10,
    averageMinutesPerDay: Math.round((totalMinutes / 7) * 10) / 10,
  }
}

/**
 * Calculate achievements
 */
export function calculateAchievements(
  moments: MomentInput[],
  streak: number,
  uniqueCategories: number
): MomentosResult['achievements'] {
  const weeklyMomentsCount = moments.length
  const hasCompletedWeek = moments.length > 0 // Simplified: at least 1 moment = started tracking

  const achievements: Achievement[] = achievementDefinitions.map((def) => {
    let unlocked = false
    let progress: number | undefined
    let maxProgress: number | undefined

    switch (def.id) {
      case 'firstWeek':
        unlocked = hasCompletedWeek
        break
      case 'consistency7':
        unlocked = streak >= 7
        progress = Math.min(streak, 7)
        maxProgress = 7
        break
      case 'variety':
        unlocked = uniqueCategories >= 5
        progress = Math.min(uniqueCategories, 5)
        maxProgress = 5
        break
      case 'habit21':
        unlocked = streak >= 21
        progress = Math.min(streak, 21)
        maxProgress = 21
        break
      case 'habit66':
        unlocked = streak >= 66
        progress = Math.min(streak, 66)
        maxProgress = 66
        break
      case 'quality20':
        unlocked = weeklyMomentsCount >= 20
        progress = Math.min(weeklyMomentsCount, 20)
        maxProgress = 20
        break
    }

    return { ...def, unlocked, progress, maxProgress }
  })

  const unlocked = achievements.filter((a) => a.unlocked)
  const inProgress = achievements.filter((a) => !a.unlocked && (a.progress ?? 0) > 0)
  const notStarted = achievements.filter((a) => !a.unlocked && (a.progress ?? 0) === 0)

  // Next milestone: first not-started or first in-progress
  const nextMilestone = inProgress.length > 0 ? inProgress[0] : notStarted.length > 0 ? notStarted[0] : null

  return {
    unlocked,
    inProgress,
    nextMilestone,
  }
}

/**
 * Generate suggestions based on analysis
 */
export function generateSuggestions(
  patterns: WeeklyPattern,
  weeklyMomentsCount: number,
  uniqueCategories: number
): string[] {
  const suggestions: string[] = []

  // Variety suggestion
  if (uniqueCategories < 4) {
    const unusedCategories = ['conversation', 'play', 'meal', 'learning', 'outdoor', 'routine']
      .filter((c) => !patterns.mostFrequentCategory || c !== patterns.mostFrequentCategory)
      .slice(0, 2)

    if (unusedCategories.length > 0) {
      suggestions.push(
        `Experimente adicionar momentos de ${momentCategories[unusedCategories[0] as MomentCategory].label.toLowerCase()} para ganhar bonus de variedade`
      )
    }
  }

  // Volume suggestion
  if (weeklyMomentsCount < 10) {
    suggestions.push('Tente registrar pelo menos 2 momentos por dia para construir consistencia')
  } else if (weeklyMomentsCount < 20) {
    suggestions.push('Voce esta quase la! Mais alguns momentos para atingir o nivel "Conectado"')
  }

  // Hard day suggestion
  if (patterns.hardestDay !== '-') {
    suggestions.push(
      `${patterns.hardestDay} parece ser seu dia mais dificil. Planeje um momento especifico para esse dia`
    )
  }

  // Learning moments (highest weight)
  if (patterns.mostFrequentCategory !== 'learning') {
    suggestions.push(
      'Momentos de aprendizado tem o maior impacto (peso 1.5x). Considere adicionar leitura ou estudo junto'
    )
  }

  return suggestions.slice(0, 4)
}

/**
 * Generate insights
 */
export function generateInsights(
  weeklyScore: WeeklyScore,
  connectionLevel: ConnectionLevelInfo,
  patterns: WeeklyPattern,
  streak: number
): string[] {
  const insights: string[] = []

  // Score insight
  insights.push(
    `Sua pontuacao semanal e ${weeklyScore.finalScore} pontos${weeklyScore.varietyBonus ? ' (inclui bonus de variedade!)' : ''}`
  )

  // Level insight
  insights.push(`Voce esta no nivel "${connectionLevel.label}": ${connectionLevel.description}`)

  // Streak insight
  if (streak > 0) {
    insights.push(
      `Voce tem uma sequencia de ${streak} dia${streak > 1 ? 's' : ''} consecutivo${streak > 1 ? 's' : ''} com momentos de conexao!`
    )
  }

  // Pattern insight
  if (patterns.mostFrequentCategory) {
    const catInfo = momentCategories[patterns.mostFrequentCategory]
    insights.push(`Seu tipo favorito de momento e "${catInfo.label}"`)
  }

  // Average insight
  if (patterns.averageMomentsPerDay > 0) {
    insights.push(
      `Voce registra em media ${patterns.averageMomentsPerDay} momentos por dia (${patterns.averageMinutesPerDay} minutos)`
    )
  }

  return insights
}

/**
 * Generate recommendations
 */
export function generateRecommendations(
  connectionLevel: ConnectionLevelInfo,
  weeklyMomentsCount: number,
  uniqueCategories: number
): string[] {
  const recommendations: string[] = []

  // Level-based recommendations
  switch (connectionLevel.level) {
    case 'iniciante':
      recommendations.push('Comece estabelecendo 1-2 momentos diarios como habito')
      recommendations.push('Escolha um horario fixo (ex: antes de dormir) para garantir consistencia')
      break
    case 'emProgresso':
      recommendations.push('Aumente gradualmente para 3 momentos por dia')
      recommendations.push('Tente variar as categorias para ganhar bonus de variedade')
      break
    case 'engajado':
      recommendations.push('Excelente progresso! Foque em aumentar a qualidade dos momentos')
      recommendations.push('Envolva outros membros da familia no registro')
      break
    case 'conectado':
      recommendations.push('Parabens! Mantenha a consistencia que voce construiu')
      recommendations.push('Considere ensinar outras familias sobre seus habitos')
      break
    case 'modelo':
      recommendations.push('Voce e uma inspiracao! Compartilhe suas estrategias')
      recommendations.push('Continue documentando para criar memorias duradouras')
      break
  }

  // Variety recommendation
  if (uniqueCategories < 5) {
    recommendations.push(
      `Experimente ${5 - uniqueCategories} categorias novas para desbloquear a conquista "Familia Diversificada"`
    )
  }

  return recommendations.slice(0, 4)
}

/**
 * Main calculation function
 */
export function calculateMomentosConexao(input: MomentosInput): MomentosResult {
  const { moments, targetMomentsPerWeek = 20 } = input

  // Calculate weekly score
  const weeklyScore = calculateWeeklyScore(moments)

  // Get connection level
  const connectionLevel = getConnectionLevel(moments.length)

  // Calculate streak
  const streak = calculateStreak(moments)

  // Get week start (assuming current week)
  const today = new Date()
  const dayOfWeek = today.getDay()
  const weekStart = new Date(today)
  weekStart.setDate(today.getDate() - dayOfWeek)

  // Get daily statuses
  const days = getWeeklyDayStatuses(moments, weekStart)

  // Calculate category breakdown
  const categoryBreakdown = calculateCategoryBreakdown(moments)

  // Calculate patterns
  const patterns = calculatePatterns(moments)

  // Calculate achievements
  const achievements = calculateAchievements(moments, streak, weeklyScore.variety)

  // Calculate yearly impact
  const yearlyImpact = calculateYearlyImpact(moments.length)

  // Total minutes
  const totalMinutes = moments.reduce((sum, m) => sum + m.duration, 0)

  // Generate suggestions
  const suggestions = generateSuggestions(patterns, moments.length, weeklyScore.variety)

  // Generate insights
  const insights = generateInsights(weeklyScore, connectionLevel, patterns, streak)

  // Generate recommendations
  const recommendations = generateRecommendations(connectionLevel, moments.length, weeklyScore.variety)

  // Determine overall category
  let category: 'low' | 'medium' | 'high' | 'excellent'
  if (moments.length <= 5) category = 'low'
  else if (moments.length <= 12) category = 'medium'
  else if (moments.length <= 20) category = 'high'
  else category = 'excellent'

  // Scientific sources
  const sources = [
    'Gottman Institute (2020). The Magic of Everyday Moments.',
    'Lally, P., et al. (2010). How are habits formed. European Journal of Social Psychology.',
    'Pew Research Center (2021). Parenting Children in the Age of Screens.',
    'Abbott, L. (2019). Time Spent Together: Family Activities and Adolescent Well-being. Journal of Family Psychology.',
  ]

  return {
    score: weeklyScore.finalScore,
    category,

    weeklyView: {
      days,
      totalMoments: moments.length,
      totalMinutes,
      goalMoments: targetMomentsPerWeek,
      goalAchieved: moments.length >= targetMomentsPerWeek,
      currentStreak: streak,
    },

    weeklyScore,

    connectionLevel,

    categoryBreakdown,

    achievements,

    patterns,

    yearlyImpact,

    suggestions,
    insights,
    recommendations,
    sources,
  }
}

/**
 * Format duration in minutes to readable string
 */
export function formatDuration(minutes: number): string {
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
 * Get progress towards next level
 */
export function getLevelProgress(
  currentMoments: number
): { current: number; target: number; percentage: number; nextLevel: ConnectionLevelInfo | null } {
  const currentLevel = getConnectionLevel(currentMoments)
  const currentIndex = connectionLevels.findIndex((l) => l.level === currentLevel.level)
  const nextLevel = currentIndex < connectionLevels.length - 1 ? connectionLevels[currentIndex + 1] : null

  if (!nextLevel) {
    return {
      current: currentMoments,
      target: currentMoments,
      percentage: 100,
      nextLevel: null,
    }
  }

  const progressInLevel = currentMoments - currentLevel.minMoments
  const levelRange = nextLevel.minMoments - currentLevel.minMoments
  const percentage = Math.min(Math.round((progressInLevel / levelRange) * 100), 100)

  return {
    current: currentMoments,
    target: nextLevel.minMoments,
    percentage,
    nextLevel,
  }
}

/**
 * Get suggested moments for a given day
 */
export function getSuggestedMoments(dayOfWeek: number): { category: MomentCategory; suggestion: string }[] {
  const suggestions: Record<number, { category: MomentCategory; suggestion: string }[]> = {
    0: [ // Sunday
      { category: 'meal', suggestion: 'Almoco de domingo em familia' },
      { category: 'outdoor', suggestion: 'Passeio no parque ou praca' },
      { category: 'play', suggestion: 'Jogo de tabuleiro a tarde' },
    ],
    1: [ // Monday
      { category: 'routine', suggestion: 'Cafe da manha tranquilo antes da escola' },
      { category: 'conversation', suggestion: 'Pergunte sobre as expectativas da semana' },
    ],
    2: [ // Tuesday
      { category: 'learning', suggestion: 'Ajude com o dever de casa' },
      { category: 'conversation', suggestion: 'Converse sobre algo que aprendeu hoje' },
    ],
    3: [ // Wednesday
      { category: 'play', suggestion: 'Brincadeira rapida apos o jantar' },
      { category: 'routine', suggestion: 'Ritual de leitura antes de dormir' },
    ],
    4: [ // Thursday
      { category: 'conversation', suggestion: 'Planeje o fim de semana juntos' },
      { category: 'learning', suggestion: 'Ensine uma habilidade nova' },
    ],
    5: [ // Friday
      { category: 'meal', suggestion: 'Noite de pizza em familia' },
      { category: 'play', suggestion: 'Sessao de cinema em casa' },
    ],
    6: [ // Saturday
      { category: 'outdoor', suggestion: 'Atividade ao ar livre pela manha' },
      { category: 'play', suggestion: 'Jogo ou esporte em familia' },
      { category: 'meal', suggestion: 'Cozinhem algo juntos' },
    ],
  }

  return suggestions[dayOfWeek] || []
}
