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

// Refeições Types
export interface RefeicoesInput {
  weeklyMeals: number
  avgDurationMinutes: number
  noScreens: boolean
  conversationQuality: number
  allFamilyPresent: number
}

export interface RefeicoesResult extends CalculatorResult {
  qualityIndex: number
  frequencyScore: number
  engagementScore: number
}

// Momentos de Conexão Types
export interface MomentoConexao {
  id: string
  type: 'conversation' | 'activity' | 'affection' | 'support' | 'celebration'
  description: string
  timestamp: Date
  participants: string[]
  durationMinutes: number
  emotionalIntensity: number
}

export interface MomentosResult extends CalculatorResult {
  totalMoments: number
  streakDays: number
  badges: Badge[]
  weeklyTrend: number[]
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt?: Date
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
