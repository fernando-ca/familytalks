// Calculator Types

export interface CalculatorResult {
  score: number
  category: 'low' | 'medium' | 'high' | 'excellent'
  recommendations: string[]
  insights: string[]
}

// Tempo Familiar Types
export interface TempoFamiliarInput {
  weekdayMinutes: number
  weekendMinutes: number
  qualityMultiplier: number
  familySize: number
}

export interface TempoFamiliarResult extends CalculatorResult {
  weeklyTotal: number
  monthlyTotal: number
  yearlyProjection: number
}

// Tempo de Tela Types
export interface TempoTelaInput {
  childAge: number
  dailyScreenMinutes: number
  educationalPercent: number
  coViewingPercent: number
  beforeBedMinutes: number
}

export interface TempoTelaResult extends CalculatorResult {
  riskLevel: 'low' | 'moderate' | 'high' | 'critical'
  ageAppropriate: boolean
  suggestedLimit: number
}

// ROI Social Types
export interface ROISocialInput {
  programInvestment: number
  familiesReached: number
  avgIncomeIncrease: number
  healthSavings: number
  educationImprovement: number
}

export interface ROISocialResult extends CalculatorResult {
  totalROI: number
  perFamilyBenefit: number
  societalImpact: number
}

// Quiz Parentalidade Types
export type QuizProfile = 'alert' | 'building' | 'engaged' | 'connected'
export type QuizDimension = 'presence' | 'quality' | 'consistency' | 'digital'

export interface QuizAnswer {
  questionId: string
  value: number
}

export interface QuizDimensionScore {
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

export interface QuizTopOpportunity {
  dimension: QuizDimension
  dimensionLabel: string
  currentPercent: number
  suggestedAction: string
  expectedImpact: string
}

export interface QuizParentalidadeInput {
  answers: Record<string, number>
}

export interface QuizParentalidadeResult extends CalculatorResult {
  profile: QuizProfileResult
  totalScore: number
  maxScore: number
  percentage: number
  dimensionScores: Record<QuizDimension, QuizDimensionScore>
  strengths: string[]
  growthAreas: string[]
  topOpportunity: QuizTopOpportunity
  weeklyGoals: string[]
  sources: string[]
}

// Refeicoes Types
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
  conversationQuality: number
}

export interface ProtectionFactor {
  current: number
  potential: number
  label: string
  description: string
}

export interface RefeicoesResult extends CalculatorResult {
  currentStatus: {
    totalMealsPerWeek: number
    category: MealsCategory
    categoryLabel: string
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
  impactOfOne: {
    yearlyHours: number
    vocabularyExposure: number
    riskReduction: number
    description: string
  }
  nationalComparison: {
    yourFamily: number
    nationalAverage: number
    highConnectionFamilies: number
    percentile: number
  }
}

// Momentos de Conexão Types
export type MomentCategory = 'conversation' | 'play' | 'meal' | 'learning' | 'outdoor' | 'routine'
export type ConnectionLevel = 'iniciante' | 'emProgresso' | 'engajado' | 'conectado' | 'modelo'

export interface MomentInput {
  type: MomentCategory
  duration: number
  date: string
}

export interface MomentosInput {
  moments: MomentInput[]
  targetMomentsPerWeek?: number
}

export interface MomentCategoryInfo {
  label: string
  minDuration: number
  weight: number
  examples: string[]
  icon: string
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

export interface WeeklyScore {
  rawPoints: number
  finalScore: number
  variety: number
  momentsCount: number
  varietyBonus: boolean
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

export interface YearlyImpact {
  totalMoments: number
  totalHours: number
  equivalentDays: number
  memoryBankEstimate: number
}

export interface MomentosResult extends CalculatorResult {
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
  sources: string[]
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

// User Types
export interface User {
  id: string
  email: string
  name?: string
  image?: string
  createdAt: Date
}

export interface UserSession {
  user: User
  expires: string
}
