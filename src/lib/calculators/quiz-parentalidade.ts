import { z } from 'zod'

// Types
export type QuizProfile = 'alert' | 'building' | 'engaged' | 'connected'
export type Dimension = 'presence' | 'quality' | 'consistency' | 'digital'

export interface QuizQuestion {
  id: string
  text: string
  dimension: Dimension
  hint?: string
}

export interface DimensionScore {
  score: number
  max: number
  percentage: number
  label: string
  description: string
}

export interface QuizProfileResult {
  type: QuizProfile
  label: string
  color: string
  bgColor: string
  message: string
}

export interface TopOpportunity {
  dimension: Dimension
  dimensionLabel: string
  currentPercent: number
  suggestedAction: string
  expectedImpact: string
}

export interface QuizInput {
  answers: Record<string, number>
}

export interface QuizResult {
  profile: QuizProfileResult
  totalScore: number
  weightedScore: number  // Score ponderado conforme pesos das dimensoes
  maxScore: number
  percentage: number
  dimensionScores: Record<Dimension, DimensionScore>
  strengths: string[]
  growthAreas: string[]
  topOpportunity: TopOpportunity
  weeklyGoals: string[]
  insights: string[]
  recommendations: string[]
  sources: string[]
}

// Validation Schema
export const quizAnswerSchema = z.record(
  z.string(),
  z.number().min(0).max(3)
)

export const quizInputSchema = z.object({
  answers: quizAnswerSchema.refine(
    (answers) => Object.keys(answers).length === 15,
    { message: 'Todas as 15 perguntas devem ser respondidas' }
  ),
})

// Point Scale
export const pointScale = {
  never: 0,
  rarely: 1,
  sometimes: 2,
  often: 3,
} as const

export const pointLabels: Record<number, string> = {
  0: 'Nunca',
  1: 'Raramente',
  2: 'Às vezes',
  3: 'Frequentemente',
}

// Dimensions Configuration
export const dimensions: Record<Dimension, {
  maxPoints: number
  questions: string[]
  weight: number
  label: string
}> = {
  presence: {
    maxPoints: 12,
    questions: ['q1', 'q2', 'q3', 'q4'],
    weight: 1.0,
    label: 'Presenca',
  },
  quality: {
    maxPoints: 12,
    questions: ['q5', 'q6', 'q7', 'q8'],
    weight: 1.2,
    label: 'Qualidade',
  },
  consistency: {
    maxPoints: 12,
    questions: ['q9', 'q10', 'q11', 'q12'],
    weight: 1.1,
    label: 'Consistencia',
  },
  digital: {
    maxPoints: 9,
    questions: ['q13', 'q14', 'q15'],
    weight: 1.3,
    label: 'Desconexao Digital',
  },
}

// Quiz Questions (15 total)
export const quizQuestions: QuizQuestion[] = [
  // Presence (4 questions)
  {
    id: 'q1',
    text: 'Voce janta junto com seus filhos durante a semana?',
    dimension: 'presence',
    hint: 'Considere refeicoes onde todos estao presentes a mesa.',
  },
  {
    id: 'q2',
    text: 'Voce dedica tempo nao-estruturado para brincadeiras com seus filhos?',
    dimension: 'presence',
    hint: 'Tempo livre sem atividades planejadas, apenas curtindo juntos.',
  },
  {
    id: 'q3',
    text: 'Voce esteve presente em eventos importantes dos seus filhos (escola, esportes, apresentacoes)?',
    dimension: 'presence',
    hint: 'Reunioes escolares, jogos, recitais, formaturas.',
  },
  {
    id: 'q4',
    text: 'Voce tem momentos de conversa individual com cada filho durante a semana?',
    dimension: 'presence',
    hint: 'Tempo um-a-um, sem outros irmaos ou distrações.',
  },

  // Quality (4 questions)
  {
    id: 'q5',
    text: 'Suas interacoes com seus filhos envolvem atencao focada (sem celular ou TV)?',
    dimension: 'quality',
    hint: 'Estar 100% presente, sem distrações digitais.',
  },
  {
    id: 'q6',
    text: 'Voce demonstra afeto fisico com seus filhos (abracos, beijos, carinho)?',
    dimension: 'quality',
    hint: 'Expressoes fisicas de amor e cuidado.',
  },
  {
    id: 'q7',
    text: 'Voce faz perguntas abertas e realmente ouve as respostas dos seus filhos?',
    dimension: 'quality',
    hint: 'Perguntas como "Como foi seu dia?" com interesse genuino.',
  },
  {
    id: 'q8',
    text: 'Voce comemora pequenas conquistas e progressos dos seus filhos?',
    dimension: 'quality',
    hint: 'Reconhecer esforços, nao apenas grandes realizacoes.',
  },

  // Consistency (4 questions)
  {
    id: 'q9',
    text: 'Voce tem rituais diarios com seus filhos (historia antes de dormir, oracao, cafe juntos)?',
    dimension: 'consistency',
    hint: 'Habitos que se repetem todos os dias ou semanas.',
  },
  {
    id: 'q10',
    text: 'Suas regras e limites sao consistentes e previsiveis?',
    dimension: 'consistency',
    hint: 'Seus filhos sabem o que esperar das consequencias.',
  },
  {
    id: 'q11',
    text: 'Voce cumpre os compromissos e promessas que faz aos seus filhos?',
    dimension: 'consistency',
    hint: 'Se prometeu, entrega. Confiabilidade.',
  },
  {
    id: 'q12',
    text: 'Seus filhos sabem o que esperar de voce em termos de disponibilidade?',
    dimension: 'consistency',
    hint: 'Rotina previsivel de quando voce esta disponivel.',
  },

  // Digital Disconnection (3 questions)
  {
    id: 'q13',
    text: 'Voce evita usar o celular durante o tempo em familia?',
    dimension: 'digital',
    hint: 'Deixar o celular de lado durante refeicoes e momentos juntos.',
  },
  {
    id: 'q14',
    text: 'Seus filhos tem regras claras sobre tempo de tela (horarios, limites)?',
    dimension: 'digital',
    hint: 'Limites definidos para dispositivos eletronicos.',
  },
  {
    id: 'q15',
    text: 'Dispositivos eletronicos (TV, tablets, celulares) nao participam das refeicoes em familia?',
    dimension: 'digital',
    hint: 'Refeicoes livres de telas para todos.',
  },
]

// Profile Thresholds
const PROFILE_THRESHOLDS = {
  alert: 15,      // <= 15 points
  building: 25,   // 16-25 points
  engaged: 35,    // 26-35 points
  // connected: > 35 points
}

/**
 * Get profile type based on total score
 */
export function getProfileType(totalScore: number): QuizProfileResult {
  if (totalScore <= PROFILE_THRESHOLDS.alert) {
    return {
      type: 'alert',
      label: 'Familia em Alerta',
      color: 'text-red-500',
      bgColor: 'bg-red-50 border-red-200',
      message: 'Mudancas urgentes sao necessarias para fortalecer os vinculos familiares. Pequenos passos consistentes podem fazer grande diferenca.',
    }
  }

  if (totalScore <= PROFILE_THRESHOLDS.building) {
    return {
      type: 'building',
      label: 'Familia em Construcao',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 border-yellow-200',
      message: 'A base existe e e solida. Foque em fortalecer as conexoes existentes e criar novos habitos positivos.',
    }
  }

  if (totalScore <= PROFILE_THRESHOLDS.engaged) {
    return {
      type: 'engaged',
      label: 'Familia Engajada',
      color: 'text-green-500',
      bgColor: 'bg-green-50 border-green-200',
      message: 'Voce esta no caminho certo! Pequenos refinamentos podem elevar ainda mais a qualidade do tempo em familia.',
    }
  }

  return {
    type: 'connected',
    label: 'Familia Conectada',
    color: 'text-primary-500',
    bgColor: 'bg-primary-50 border-primary-200',
    message: 'Excelente! Voce e um modelo de parentalidade presente. Continue inspirando e compartilhe suas praticas com outras familias.',
  }
}

/**
 * Calculate dimension scores from answers
 */
export function calculateDimensionScores(
  answers: Record<string, number>
): Record<Dimension, DimensionScore> {
  const scores: Record<Dimension, DimensionScore> = {} as Record<Dimension, DimensionScore>

  const dimensionDescriptions: Record<Dimension, { low: string; medium: string; high: string }> = {
    presence: {
      low: 'Oportunidade significativa de aumentar sua presenca fisica no dia-a-dia dos seus filhos.',
      medium: 'Voce esta presente, mas ha espaco para aumentar a frequencia dos momentos juntos.',
      high: 'Otima presenca! Seus filhos sentem que voce esta la para eles.',
    },
    quality: {
      low: 'Foque em melhorar a qualidade das interacoes, mesmo que sejam curtas.',
      medium: 'Boa qualidade de interacao. Experimente reduzir distracoes para momentos ainda melhores.',
      high: 'Excelente qualidade de conexao! Suas interacoes sao significativas.',
    },
    consistency: {
      low: 'Criar rituais e rotinas previsiveis pode fortalecer muito o vinculo familiar.',
      medium: 'Voce tem consistencia moderada. Rituais diarios podem solidificar ainda mais.',
      high: 'Seus filhos sabem o que esperar de voce. Isso cria seguranca emocional.',
    },
    digital: {
      low: 'A desconexao digital e uma area critica para melhorar. Telas competem pela atencao familiar.',
      medium: 'Bom progresso na desconexao digital. Continue fortalecendo zonas livres de telas.',
      high: 'Excelente gestao digital! Voce prioriza a presenca sobre as telas.',
    },
  }

  const dimensionLabels: Record<Dimension, string> = {
    presence: 'Presenca',
    quality: 'Qualidade',
    consistency: 'Consistencia',
    digital: 'Desconexao Digital',
  }

  for (const [dim, config] of Object.entries(dimensions) as [Dimension, typeof dimensions.presence][]) {
    let score = 0
    for (const questionId of config.questions) {
      score += answers[questionId] || 0
    }

    const percentage = Math.round((score / config.maxPoints) * 100)

    let description: string
    if (percentage < 40) {
      description = dimensionDescriptions[dim].low
    } else if (percentage < 70) {
      description = dimensionDescriptions[dim].medium
    } else {
      description = dimensionDescriptions[dim].high
    }

    scores[dim] = {
      score,
      max: config.maxPoints,
      percentage,
      label: dimensionLabels[dim],
      description,
    }
  }

  return scores
}

/**
 * Get top opportunity for improvement
 */
export function getTopOpportunity(
  dimensionScores: Record<Dimension, DimensionScore>
): TopOpportunity {
  const actions: Record<Dimension, { action: string; impact: string }> = {
    presence: {
      action: 'Adicione 2 refeicoes familiares por semana',
      impact: 'Aumento de 15-20% no tempo de qualidade e fortalecimento do vinculo',
    },
    quality: {
      action: 'Crie uma zona livre de telas durante as refeicoes',
      impact: 'Melhoria significativa na qualidade das conversas e conexao emocional',
    },
    consistency: {
      action: 'Estabeleca 1 ritual semanal inegociavel (ex: noite de jogos)',
      impact: 'Criacao de memorias duradouras e senso de seguranca para os filhos',
    },
    digital: {
      action: 'Implemente a regra de sem celular no quarto a noite',
      impact: 'Melhoria no sono familiar e reducao de distracoes nos momentos importantes',
    },
  }

  const dimensionLabels: Record<Dimension, string> = {
    presence: 'Presenca',
    quality: 'Qualidade',
    consistency: 'Consistencia',
    digital: 'Desconexao Digital',
  }

  // Find dimension with lowest percentage
  let lowestDim: Dimension = 'presence'
  let lowestPercent = 100

  for (const [dim, score] of Object.entries(dimensionScores) as [Dimension, DimensionScore][]) {
    if (score.percentage < lowestPercent) {
      lowestPercent = score.percentage
      lowestDim = dim
    }
  }

  return {
    dimension: lowestDim,
    dimensionLabel: dimensionLabels[lowestDim],
    currentPercent: lowestPercent,
    suggestedAction: actions[lowestDim].action,
    expectedImpact: actions[lowestDim].impact,
  }
}

/**
 * Generate strengths based on dimension scores
 */
export function generateStrengths(
  dimensionScores: Record<Dimension, DimensionScore>
): string[] {
  const strengths: string[] = []

  const strengthMessages: Record<Dimension, string> = {
    presence: 'Presenca fisica consistente no dia-a-dia dos filhos',
    quality: 'Interacoes de alta qualidade e atencao focada',
    consistency: 'Rotinas e rituais que criam seguranca emocional',
    digital: 'Excelente gestao do uso de tecnologia em familia',
  }

  // Sort dimensions by percentage (highest first)
  const sorted = Object.entries(dimensionScores)
    .sort((a, b) => b[1].percentage - a[1].percentage) as [Dimension, DimensionScore][]

  // Take top 2-3 with percentage >= 60%
  for (const [dim, score] of sorted) {
    if (score.percentage >= 60 && strengths.length < 3) {
      strengths.push(strengthMessages[dim])
    }
  }

  // If no strengths found, add an encouraging message
  if (strengths.length === 0) {
    strengths.push('Voce esta buscando melhorar - isso ja e um grande passo!')
  }

  return strengths
}

/**
 * Generate growth areas based on dimension scores
 */
export function generateGrowthAreas(
  dimensionScores: Record<Dimension, DimensionScore>
): string[] {
  const growthAreas: string[] = []

  const growthMessages: Record<Dimension, string> = {
    presence: 'Aumentar a frequencia de momentos presentes com os filhos',
    quality: 'Melhorar a qualidade das interacoes reduzindo distracoes',
    consistency: 'Criar mais rituais e rotinas previsiveis',
    digital: 'Estabelecer limites mais claros para uso de tecnologia',
  }

  // Sort dimensions by percentage (lowest first)
  const sorted = Object.entries(dimensionScores)
    .sort((a, b) => a[1].percentage - b[1].percentage) as [Dimension, DimensionScore][]

  // Take bottom 2-3 with percentage < 70%
  for (const [dim, score] of sorted) {
    if (score.percentage < 70 && growthAreas.length < 3) {
      growthAreas.push(growthMessages[dim])
    }
  }

  return growthAreas
}

/**
 * Generate weekly goals based on profile
 */
export function generateWeeklyGoals(
  profile: QuizProfile,
  topOpportunity: TopOpportunity
): string[] {
  const baseGoals: Record<QuizProfile, string[]> = {
    alert: [
      'Comece com 1 refeicao em familia esta semana (sem telas)',
      'Reserve 15 minutos por dia para conversa individual com cada filho',
      'Estabeleca um horario fixo para "tempo de familia" no fim de semana',
    ],
    building: [
      'Adicione mais uma refeicao em familia a sua rotina semanal',
      'Crie um ritual de "check-in" diario (pergunte sobre o melhor momento do dia)',
      'Planeje uma atividade especial em familia para o proximo fim de semana',
    ],
    engaged: [
      'Experimente uma nova atividade em familia esta semana',
      'Aumente a duracao das refeicoes em familia para 30+ minutos',
      'Envolva os filhos na escolha das atividades familiares',
    ],
    connected: [
      'Documente momentos especiais em um album ou diario familiar',
      'Compartilhe suas praticas com outras familias que admiram voces',
      'Crie uma tradicao familiar unica para sua familia',
    ],
  }

  const goals = [...baseGoals[profile]]

  // Add specific goal based on top opportunity if not already covered
  if (topOpportunity.currentPercent < 50) {
    goals.unshift(topOpportunity.suggestedAction)
  }

  return goals.slice(0, 3)
}

/**
 * Generate insights based on results
 */
export function generateInsights(
  totalScore: number,
  dimensionScores: Record<Dimension, DimensionScore>,
  profile: QuizProfileResult
): string[] {
  const insights: string[] = []

  // Overall score insight
  const percentage = Math.round((totalScore / 45) * 100)
  insights.push(
    `Sua pontuacao geral de conexao familiar e ${percentage}% (${totalScore} de 45 pontos)`
  )

  // Find strongest dimension
  const strongest = Object.entries(dimensionScores)
    .sort((a, b) => b[1].percentage - a[1].percentage)[0] as [Dimension, DimensionScore]
  insights.push(
    `Seu ponto mais forte e ${strongest[1].label} (${strongest[1].percentage}%)`
  )

  // Find dimension needing most attention
  const weakest = Object.entries(dimensionScores)
    .sort((a, b) => a[1].percentage - b[1].percentage)[0] as [Dimension, DimensionScore]
  if (weakest[1].percentage < 60) {
    insights.push(
      `Area com maior oportunidade de crescimento: ${weakest[1].label} (${weakest[1].percentage}%)`
    )
  }

  // Profile-specific insight
  if (profile.type === 'connected') {
    insights.push('Voce esta entre os pais mais engajados! Continue assim.')
  } else if (profile.type === 'alert') {
    insights.push('Pequenas mudancas consistentes podem transformar sua dinamica familiar em semanas.')
  }

  return insights
}

/**
 * Generate recommendations based on profile
 */
export function generateRecommendations(
  profile: QuizProfile,
  dimensionScores: Record<Dimension, DimensionScore>
): string[] {
  const recommendations: string[] = []

  // Profile-based recommendations
  const profileRecs: Record<QuizProfile, string[]> = {
    alert: [
      'Comece com micro-momentos: 5 minutos de atencao total vale mais que 1 hora distraida',
      'Escolha UMA refeicao por semana para ser sagrada - sem excepcoes',
      'Configure seu celular para modo "nao perturbe" durante o tempo em familia',
    ],
    building: [
      'Transforme tarefas rotineiras em momentos de conexao (cozinhar juntos, arrumar a casa)',
      'Crie um "jar de atividades" com ideias escritas pelos filhos para fins de semana',
      'Estabeleca uma pergunta diaria diferente para o jantar',
    ],
    engaged: [
      'Envolva os filhos no planejamento das atividades familiares',
      'Crie tradicoes mensais que todos aguardem ansiosamente',
      'Considere um "dia especial" individual com cada filho mensalmente',
    ],
    connected: [
      'Documente e celebre os rituais que funcionam para sua familia',
      'Mentore outras familias compartilhando o que funciona para voces',
      'Continue evoluindo os rituais conforme os filhos crescem',
    ],
  }

  recommendations.push(...profileRecs[profile])

  // Add dimension-specific recommendation for lowest scoring area
  const weakest = Object.entries(dimensionScores)
    .sort((a, b) => a[1].percentage - b[1].percentage)[0] as [Dimension, DimensionScore]

  const dimensionRecs: Record<Dimension, string> = {
    presence: 'Pesquisas mostram que quantidade tambem importa - aumente gradualmente o tempo juntos',
    quality: 'Pratique a escuta ativa: repita o que ouviu antes de responder',
    consistency: 'Rituais criam seguranca emocional - comece com um e expanda',
    digital: 'Modele o comportamento: seus filhos copiam seu uso de tecnologia',
  }

  if (weakest[1].percentage < 50) {
    recommendations.unshift(dimensionRecs[weakest[0]])
  }

  return recommendations.slice(0, 4)
}

/**
 * Main calculation function
 */
export function calculateQuizResult(input: QuizInput): QuizResult {
  const { answers } = input

  // Calculate dimension scores
  const dimensionScores = calculateDimensionScores(answers)

  // Calculate total score (raw, without weights - used for profile thresholds)
  let rawTotal = 0
  for (const score of Object.values(dimensionScores)) {
    rawTotal += score.score
  }

  // Calculate weighted total (as per SCIENTIFIC_FORMULAS.md)
  // Weights: presence=1.0, quality=1.2, consistency=1.1, digital=1.3
  let weightedTotal = 0
  for (const [dim, score] of Object.entries(dimensionScores) as [Dimension, DimensionScore][]) {
    weightedTotal += score.score * dimensions[dim].weight
  }

  // Use raw total for profile categorization (thresholds are based on 0-45 scale)
  const totalScore = rawTotal

  // Get profile
  const profile = getProfileType(totalScore)

  // Get top opportunity
  const topOpportunity = getTopOpportunity(dimensionScores)

  // Generate strengths and growth areas
  const strengths = generateStrengths(dimensionScores)
  const growthAreas = generateGrowthAreas(dimensionScores)

  // Generate weekly goals
  const weeklyGoals = generateWeeklyGoals(profile.type, topOpportunity)

  // Generate insights
  const insights = generateInsights(totalScore, dimensionScores, profile)

  // Generate recommendations
  const recommendations = generateRecommendations(profile.type, dimensionScores)

  // Scientific sources
  const sources = [
    'Baumrind, D. (1991). Parenting Styles and Adolescent Development.',
    'Pew Research Center (2021). Parenting Children in the Age of Screens.',
    'Haidt, J. (2024). The Anxious Generation.',
    'Gottman Institute (2020). The Magic of Everyday Moments.',
  ]

  return {
    profile,
    totalScore,
    weightedScore: Math.round(weightedTotal * 10) / 10,  // Arredonda para 1 casa decimal
    maxScore: 45,
    percentage: Math.round((totalScore / 45) * 100),
    dimensionScores,
    strengths,
    growthAreas,
    topOpportunity,
    weeklyGoals,
    insights,
    recommendations,
    sources,
  }
}

/**
 * Get progress bar color based on percentage
 */
export function getProgressColor(percentage: number): string {
  if (percentage < 40) return 'bg-red-500'
  if (percentage < 60) return 'bg-yellow-500'
  if (percentage < 80) return 'bg-green-500'
  return 'bg-primary-500'
}

/**
 * Format dimension label with emoji
 */
export function getDimensionEmoji(dimension: Dimension): string {
  const emojis: Record<Dimension, string> = {
    presence: '🏠',
    quality: '💝',
    consistency: '🔄',
    digital: '📵',
  }
  return emojis[dimension]
}
