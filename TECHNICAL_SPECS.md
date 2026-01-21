# Especificação Técnica - Calculadoras Interativas FamilyTalks.org

**Versão**: 1.0
**Data**: 21 de janeiro de 2026
**Status**: Planejamento

---

## 1. Visão Geral do Projeto

### 1.1 Objetivo
Desenvolver um conjunto de calculadoras interativas baseadas em evidências científicas que ajudem famílias a:
- Mensurar o impacto de suas escolhas diárias
- Conscientizar sobre riscos (tempo de tela, desconexão)
- Incentivar hábitos saudáveis (refeições juntos, leitura)
- Transformar intenções em ações consistentes

### 1.2 Público-Alvo
- **Primário**: Pais/responsáveis de crianças e adolescentes (0-17 anos)
- **Secundário**: Educadores, formuladores de políticas, pesquisadores
- **Localização**: Inicialmente Brasil, expansível para América Latina
- **Acesso**: Desktop e mobile (responsivo)

### 1.3 Princípios de Design
1. **Não-julgamento**: Tom de apoio, nunca culpabilização
2. **Acionável**: Sempre fornecer próximos passos claros
3. **Baseado em evidência**: Transparência nas fontes científicas
4. **Privacidade first**: Dados sensíveis sobre crianças
5. **Acessibilidade**: WCAG 2.1 AA compliance mínimo
6. **Performance**: < 3s para cálculo, < 2s para load inicial

---

## 2. Arquitetura do Sistema

### 2.1 Arquitetura Geral

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
│  ┌────────────┐  ┌────────────┐  ┌─────────────┐           │
│  │  Landing   │  │ Calculator │  │   Tracker   │           │
│  │    Page    │→ │   Pages    │→ │  Dashboard  │           │
│  └────────────┘  └────────────┘  └─────────────┘           │
│         ↓              ↓                 ↓                   │
│  ┌──────────────────────────────────────────────┐          │
│  │         React + TypeScript + Vite            │          │
│  │      TailwindCSS + Chart.js + Framer Motion  │          │
│  └──────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────┘
                            ↓ REST API / GraphQL
┌─────────────────────────────────────────────────────────────┐
│                         BACKEND                              │
│  ┌────────────┐  ┌────────────┐  ┌─────────────┐           │
│  │ Calculator │  │    User    │  │  Analytics  │           │
│  │   Engine   │  │    Auth    │  │   Service   │           │
│  └────────────┘  └────────────┘  └─────────────┘           │
│         ↓              ↓                 ↓                   │
│  ┌──────────────────────────────────────────────┐          │
│  │         Node.js + Express + TypeScript       │          │
│  │         (ou Python + FastAPI)                │          │
│  └──────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                        DATABASE                              │
│  ┌────────────┐  ┌────────────┐  ┌─────────────┐           │
│  │ PostgreSQL │  │   Redis    │  │     S3      │           │
│  │ (Principal)│  │  (Cache)   │  │   (Assets)  │           │
│  └────────────┘  └────────────┘  └─────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Stack Tecnológica Recomendada

#### Frontend
| Tecnologia | Versão | Propósito |
|-----------|--------|-----------|
| **React** | 18+ | Framework UI |
| **TypeScript** | 5+ | Type safety |
| **Vite** | 5+ | Build tool |
| **TailwindCSS** | 3+ | Styling |
| **Chart.js** | 4+ | Visualizações |
| **Framer Motion** | 11+ | Animações |
| **React Hook Form** | 7+ | Formulários |
| **Zod** | 3+ | Validação |
| **React Query** | 5+ | State management API |

#### Backend
| Tecnologia | Versão | Propósito |
|-----------|--------|-----------|
| **Node.js** | 20 LTS | Runtime |
| **Express** | 4+ | Web framework |
| **TypeScript** | 5+ | Type safety |
| **Prisma** | 5+ | ORM |
| **JWT** | - | Autenticação |
| **Joi** | 17+ | Validação |
| **Winston** | 3+ | Logging |

**Alternativa Python**:
- FastAPI + SQLAlchemy + Pydantic (melhor para cálculos científicos complexos)

#### Database
| Tecnologia | Propósito |
|-----------|-----------|
| **PostgreSQL 15+** | Dados principais |
| **Redis 7+** | Cache, sessões |
| **AWS S3** | Armazenamento de assets |

#### DevOps
| Tecnologia | Propósito |
|-----------|-----------|
| **Docker** | Containerização |
| **GitHub Actions** | CI/CD |
| **Vercel/Railway** | Deploy frontend |
| **Render/Railway** | Deploy backend |
| **Sentry** | Error tracking |
| **PostHog** | Analytics |

### 2.3 Estrutura de Pastas

```
familytalks/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── calculators/
│   │   │   │   ├── ScreenTime/
│   │   │   │   ├── FamilyMeals/
│   │   │   │   ├── Reading/
│   │   │   │   ├── SocialROI/
│   │   │   │   └── ConnectionTracker/
│   │   │   ├── shared/
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Slider.tsx
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Chart.tsx
│   │   │   │   └── ResultCard.tsx
│   │   │   └── layout/
│   │   │       ├── Header.tsx
│   │   │       ├── Footer.tsx
│   │   │       └── Navigation.tsx
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── ScreenTimeCalculator.tsx
│   │   │   ├── FamilyMealsCalculator.tsx
│   │   │   └── Dashboard.tsx
│   │   ├── hooks/
│   │   │   ├── useCalculator.ts
│   │   │   ├── useTracker.ts
│   │   │   └── useAuth.ts
│   │   ├── services/
│   │   │   ├── api.ts
│   │   │   ├── calculations.ts
│   │   │   └── analytics.ts
│   │   ├── types/
│   │   │   ├── calculator.types.ts
│   │   │   ├── user.types.ts
│   │   │   └── api.types.ts
│   │   ├── utils/
│   │   │   ├── formatters.ts
│   │   │   ├── validators.ts
│   │   │   └── constants.ts
│   │   └── App.tsx
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── calculator.controller.ts
│   │   │   ├── user.controller.ts
│   │   │   └── tracker.controller.ts
│   │   ├── services/
│   │   │   ├── screenTime.service.ts
│   │   │   ├── familyMeals.service.ts
│   │   │   ├── reading.service.ts
│   │   │   └── analytics.service.ts
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   ├── CalculatorResult.ts
│   │   │   └── TrackerEntry.ts
│   │   ├── routes/
│   │   │   ├── calculator.routes.ts
│   │   │   ├── user.routes.ts
│   │   │   └── tracker.routes.ts
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts
│   │   │   ├── validation.middleware.ts
│   │   │   └── rateLimit.middleware.ts
│   │   ├── utils/
│   │   │   ├── calculations/
│   │   │   │   ├── screenTimeCalculations.ts
│   │   │   │   ├── mealCalculations.ts
│   │   │   │   └── readingCalculations.ts
│   │   │   └── helpers.ts
│   │   ├── config/
│   │   │   ├── database.ts
│   │   │   └── constants.ts
│   │   └── server.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── tests/
│   ├── package.json
│   └── tsconfig.json
│
├── docs/
│   ├── api/
│   ├── research/
│   └── user-guides/
│
├── docker-compose.yml
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
└── README.md
```

---

## 3. Especificações das Calculadoras

### 3.1 Calculadora de Tempo de Tela

#### 3.1.1 Inputs

```typescript
interface ScreenTimeInput {
  childName: string;
  childAge: number; // 3-17
  weekdayHours: number; // 0-12
  weekendHours: number; // 0-16
  primaryUse: 'social_media' | 'youtube' | 'games' | 'educational';
  hasSmartphone: boolean;
  smartphoneAgeReceived?: number; // 6-16, se hasSmartphone = true
  useBeforeSleep: boolean;
}
```

#### 3.1.2 Cálculos

```typescript
// Média diária ponderada
dailyAverage = (weekdayHours * 5 + weekendHours * 2) / 7;

// Projeções
yearlyHours = dailyAverage * 365;
hoursUntil18 = dailyAverage * 365 * (18 - childAge);

// Fator de risco base
function getBaseFactor(dailyAverage: number): number {
  if (dailyAverage <= 2) return 1.0;
  if (dailyAverage <= 4) return 1.5;
  if (dailyAverage <= 6) return 2.2;
  return 3.0;
}

// Multiplicadores de risco
const multipliers = {
  socialMedia: primaryUse === 'social_media' ? 1.4 : 1.0,
  earlySmartphone: (hasSmartphone && smartphoneAgeReceived < 14) ? 1.3 : 1.0,
  beforeSleep: useBeforeSleep ? 1.25 : 1.0,
  youngAge: childAge < 10 ? 1.2 : 1.0
};

// Score final
const baseFactor = getBaseFactor(dailyAverage);
const totalMultiplier = Object.values(multipliers).reduce((a, b) => a * b, 1);
riskScore = baseFactor * totalMultiplier;
```

#### 3.1.3 Output

```typescript
interface ScreenTimeResult {
  summary: {
    dailyAverage: number;
    comparisonToRecommended: number; // % acima da recomendação OMS
    yearlyProjection: number;
    lifetimeProjection: number;
  };
  riskAnalysis: {
    anxietyRisk: 'low' | 'moderate' | 'elevated' | 'high';
    sleepQuality: 'good' | 'moderate' | 'compromised';
    socialDevelopment: 'good' | 'attention' | 'concerning';
    academicImpact: 'minimal' | 'moderate' | 'significant';
  };
  opportunityCost: {
    freePlay: number; // horas/semana perdidas
    familyConversation: number;
    physicalActivity: number;
    reading: number;
  };
  actionPlan: {
    goalDailyHours: number;
    weeklyReduction: number[];
    milestones: Milestone[];
    haidtNorms: string[];
  };
  sources: Reference[];
}
```

### 3.2 Calculadora de Refeições em Família

#### 3.2.1 Inputs

```typescript
interface FamilyMealsInput {
  numberOfChildren: number; // 1-8
  childrenAges: number[]; // array de idades
  breakfastPerWeek: number; // 0-7
  lunchPerWeek: number; // 0-7
  dinnerPerWeek: number; // 0-7
  averageDuration: '<10min' | '10-20min' | '20-30min' | '30+min';
  screensPresent: 'always' | 'sometimes' | 'never';
  whoParticipates: ('mother' | 'father' | 'grandparents' | 'all')[];
}
```

#### 3.2.2 Cálculos

```typescript
// Total de refeições
totalMealsPerWeek = breakfastPerWeek + lunchPerWeek + dinnerPerWeek;

// Categorização
function getCategory(total: number): string {
  if (total <= 2) return 'disconnected';
  if (total <= 4) return 'building';
  if (total <= 6) return 'engaged';
  return 'connected';
}

// Fator de qualidade
const qualityFactors = {
  duration: averageDuration === '20-30min' || averageDuration === '30+min' ? 1.3 : 1.0,
  noScreens: screensPresent === 'never' ? 1.4 : screensPresent === 'sometimes' ? 1.0 : 0.7,
  bothParents: whoParticipates.includes('mother') && whoParticipates.includes('father') ? 1.25 : 1.0
};

qualityMultiplier = Object.values(qualityFactors).reduce((a, b) => a * b, 1);

// Fatores de proteção (baseado em meta-análises)
function getProtectionFactors(meals: number, quality: number) {
  const base = {
    obesityReduction: meals >= 3 ? -12 : -8 * (meals / 3),
    unhealthyEating: meals >= 3 ? -20 : -15 * (meals / 3),
    eatingDisorders: meals >= 3 ? -35 : -25 * (meals / 3),
    substanceUse: meals >= 5 ? -15 : -10 * (meals / 5),
    mentalHealth: meals >= 5 ? -25 : -15 * (meals / 5)
  };

  // Aplicar multiplicador de qualidade
  return Object.fromEntries(
    Object.entries(base).map(([key, value]) => [key, value * quality])
  );
}
```

#### 3.2.3 Output

```typescript
interface FamilyMealsResult {
  currentStatus: {
    totalMealsPerWeek: number;
    category: 'disconnected' | 'building' | 'engaged' | 'connected';
    totalConnectionTime: number; // minutos/semana
    qualityScore: number; // 0-100
  };
  protectionFactors: {
    obesityProtection: { current: number; potential: number };
    healthyEating: { current: number; potential: number };
    eatingDisordersProtection: { current: number; potential: number };
    substanceUseProtection: { current: number; potential: number };
    mentalHealthProtection: { current: number; potential: number };
    academicImpact: { current: string; potential: string };
  };
  impactOfOne: {
    description: string;
    yearlyHours: number;
    vocabularyExposure: number;
    riskReduction: number;
  };
  nationalComparison: {
    yourFamily: number;
    nationalAverage: number;
    highConnectionFamilies: number;
  };
  actionPlan: {
    goal: number; // refeições/semana
    weeklyPlan: WeeklyMilestone[];
    goldenRules: string[];
  };
  conversationStarters: ConversationPrompt[];
  sources: Reference[];
}
```

### 3.3 Calculadora de Leitura Compartilhada

#### 3.3.1 Inputs

```typescript
interface ReadingInput {
  childName: string;
  childAge: number; // 0-12
  currentFrequency: 'never' | '1-2_per_week' | '3-4_per_week' | 'daily';
  minutesPerSession: number; // 5-60
  whoReads: ('mother' | 'father' | 'grandparents' | 'siblings')[];
  bookType: 'picture_books' | 'stories' | 'educational' | 'varied';
  childParticipation: 'listens_only' | 'points_pictures' | 'asks_questions' | 'reads_along';
}
```

#### 3.3.2 Cálculos

```typescript
// Frequência em número
const frequencyMap = {
  'never': 0,
  '1-2_per_week': 1.5,
  '3-4_per_week': 3.5,
  'daily': 7
};

minutesPerWeek = frequencyMap[currentFrequency] * minutesPerSession;

// Palavras expostas (150 palavras/minuto é média estimada)
wordsPerWeek = minutesPerWeek * 150;
wordsPerYear = wordsPerWeek * 52;

// Palavras acumuladas desde nascimento
yearsReading = Math.max(childAge - 0, 0); // assumindo leitura desde bebê
accumulatedWords = wordsPerYear * yearsReading;

// Benchmark Ohio State (5x/dia, 15 min)
benchmarkPerYear = (5 * 15 * 150) * 52; // ~585,000 palavras/ano
benchmarkUntilAge5 = benchmarkPerYear * 5; // ~2,925,000 palavras

// Gap de vocabulário
if (childAge < 5) {
  projectedUntil5 = wordsPerYear * (5 - childAge) + accumulatedWords;
} else {
  projectedUntil5 = accumulatedWords;
}
vocabularyGap = benchmarkUntilAge5 - projectedUntil5;

// Impacto cognitivo (effect sizes de Weisleder et al., 2017)
function getCognitiveImpact(minutesPerWeek: number) {
  if (minutesPerWeek >= 105) { // 15min/dia
    return {
      receptiveVocabulary: 0.33, // desvios padrão
      workingMemory: 0.46,
      iq: 0.33
    };
  } else {
    const ratio = minutesPerWeek / 105;
    return {
      receptiveVocabulary: 0.33 * ratio,
      workingMemory: 0.46 * ratio,
      iq: 0.33 * ratio
    };
  }
}
```

#### 3.3.3 Output

```typescript
interface ReadingResult {
  currentProfile: {
    frequency: string;
    wordsPerWeek: number;
    wordsPerYear: number;
    accumulatedWords: number;
    benchmark: number;
  };
  vocabularyGap: {
    comparison: {
      neverRead: number;
      yourChild: number;
      dailyReading: number;
      benchmark: number;
    };
    currentGap: number;
    percentile: string;
  };
  cognitiveImpact: {
    currentImpact: {
      vocabulary: string;
      workingMemory: string;
      iq: string;
      schoolReadiness: string;
    };
    potentialImpact: {
      vocabulary: string;
      workingMemory: string;
      iq: string;
      percentileShift: string;
    };
  };
  fifteenMinutePlan: {
    currentMinutesPerWeek: number;
    goalMinutesPerWeek: number; // 105 (15min/dia)
    dailySchedule: DailyReadingSchedule[];
  };
  progressTracker: {
    booksReadThisMonth: number;
    totalPages: number;
    wordsExposed: number;
    currentStreak: number;
    nextMilestone: Milestone;
  };
  sources: Reference[];
}
```

### 3.4 Quiz de Perfil de Conexão Familiar

#### 3.4.1 Estrutura de Perguntas

```typescript
interface QuizQuestion {
  id: string;
  dimension: 'presence' | 'quality' | 'consistency' | 'digital';
  question: string;
  options: {
    text: string;
    points: number; // 0-3
  }[];
}

const quizQuestions: QuizQuestion[] = [
  // Presença (4 perguntas, max 12 pontos)
  {
    id: 'p1',
    dimension: 'presence',
    question: 'Quantas refeições por semana sua família faz junta?',
    options: [
      { text: '0-2 refeições', points: 0 },
      { text: '3-4 refeições', points: 1 },
      { text: '5-6 refeições', points: 2 },
      { text: '7+ refeições', points: 3 }
    ]
  },
  // ... mais 14 perguntas
];
```

#### 3.4.2 Cálculos

```typescript
interface QuizScores {
  presence: number; // 0-12
  quality: number; // 0-12
  consistency: number; // 0-12
  digital: number; // 0-9
  total: number; // 0-45
}

function calculateProfile(answers: number[]): QuizScores {
  const scores = {
    presence: 0,
    quality: 0,
    consistency: 0,
    digital: 0,
    total: 0
  };

  quizQuestions.forEach((q, index) => {
    scores[q.dimension] += answers[index];
    scores.total += answers[index];
  });

  return scores;
}

function getProfileType(total: number): string {
  if (total <= 15) return 'alert';
  if (total <= 25) return 'building';
  if (total <= 35) return 'engaged';
  return 'connected';
}

function getTopOpportunity(scores: QuizScores): string {
  const percentages = {
    presence: (scores.presence / 12) * 100,
    quality: (scores.quality / 12) * 100,
    consistency: (scores.consistency / 12) * 100,
    digital: (scores.digital / 9) * 100
  };

  const lowest = Object.entries(percentages)
    .sort((a, b) => a[1] - b[1])[0][0];

  return lowest;
}
```

#### 3.4.3 Output

```typescript
interface QuizResult {
  profile: {
    name: string;
    totalScore: number;
    maxScore: number;
    type: 'alert' | 'building' | 'engaged' | 'connected';
  };
  dimensionScores: {
    presence: { score: number; max: number; percentage: number };
    quality: { score: number; max: number; percentage: number };
    consistency: { score: number; max: number; percentage: number };
    digital: { score: number; max: number; percentage: number };
  };
  strengths: string[];
  topOpportunity: {
    dimension: string;
    currentScore: number;
    impact: string;
    suggestedAction: string;
  };
  thirtyDayPlan: {
    goal: string;
    weeklyActions: WeeklyAction[];
    expectedImprovement: number;
  };
  retakeDate: Date;
}
```

### 3.5 Tracker Semanal de Momentos de Conexão

#### 3.5.1 Input Diário

```typescript
interface DailyCheckIn {
  date: Date;
  activities: ('family_meal' | 'reading' | 'play' | 'conversation' | 'physical_activity' | 'creative' | 'screen_free_time')[];
  totalMinutes: number; // 15-180+
  mood: 1 | 2 | 3 | 4 | 5; // emoji scale
  notes?: string; // opcional
}
```

#### 3.5.2 Cálculos

```typescript
// Meta semanal (baseado em pesquisa: 6h/semana para adolescentes)
const weeklyGoal = 360; // minutos

function getWeeklyProgress(checkIns: DailyCheckIn[]): WeeklyProgress {
  const totalMinutes = checkIns.reduce((sum, day) => sum + day.totalMinutes, 0);
  const daysWithConnection = checkIns.filter(day => day.totalMinutes > 0).length;

  return {
    totalMinutes,
    averagePerDay: totalMinutes / 7,
    daysActive: daysWithConnection,
    goalPercentage: (totalMinutes / weeklyGoal) * 100,
    currentStreak: calculateStreak(checkIns)
  };
}

function calculateStreak(checkIns: DailyCheckIn[]): number {
  let streak = 0;
  const sorted = checkIns.sort((a, b) => b.date.getTime() - a.date.getTime());

  for (const checkIn of sorted) {
    if (checkIn.totalMinutes > 0) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

// Análise de padrões
function analyzePatterns(history: DailyCheckIn[]): Pattern {
  const byDayOfWeek = groupByDayOfWeek(history);

  const mostFrequentActivity = getMostFrequent(
    history.flatMap(d => d.activities)
  );

  const hardestDay = Object.entries(byDayOfWeek)
    .sort((a, b) => a[1].avgMinutes - b[1].avgMinutes)[0][0];

  const bestDay = Object.entries(byDayOfWeek)
    .sort((a, b) => b[1].avgMinutes - a[1].avgMinutes)[0][0];

  return {
    mostFrequentActivity,
    hardestDay,
    bestDay,
    averageMood: calculateAverageMood(history)
  };
}
```

#### 3.5.3 Output

```typescript
interface TrackerResult {
  weeklyView: {
    days: DayStatus[]; // 7 dias
    totalMinutes: number;
    goalMinutes: number;
    goalAchieved: boolean;
    currentStreak: number;
  };
  monthlyCalendar: {
    month: string;
    days: CalendarDay[];
    completionRate: number;
  };
  patterns: {
    mostFrequentActivity: string;
    hardestDay: string;
    bestDay: string;
    averageMood: number;
    suggestion: string;
  };
  achievements: {
    unlocked: Achievement[];
    nextMilestone: Achievement;
    progress: number;
  };
  monthlyReport: {
    totalDays: number;
    daysWithConnection: number;
    totalHours: number;
    averageDaily: number;
    topActivities: ActivitySummary[];
    moodTrend: number;
    comparisonToPreviousMonth: {
      totalHours: number; // % change
      consistency: number;
      specificActivity: { [key: string]: number };
    };
  };
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}
```

---

## 4. Modelo de Dados

### 4.1 Schema Prisma

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String   @id @default(uuid())
  email         String   @unique
  name          String?
  passwordHash  String
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  profile       UserProfile?
  calculatorResults CalculatorResult[]
  trackerEntries TrackerEntry[]
  quizResults   QuizResult[]

  @@map("users")
}

model UserProfile {
  id              String   @id @default(uuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  numberOfChildren Int
  childrenAges     Int[]
  householdType    String   // 'biparental', 'single', 'shared'
  region           String?

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@map("user_profiles")
}

model CalculatorResult {
  id            String   @id @default(uuid())
  userId        String
  user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  calculatorType String  // 'screen_time', 'family_meals', 'reading', 'social_roi'
  inputData     Json
  outputData    Json

  createdAt     DateTime @default(now())

  @@map("calculator_results")
  @@index([userId, calculatorType])
}

model TrackerEntry {
  id            String   @id @default(uuid())
  userId        String
  user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  date          DateTime @db.Date
  activities    String[] // array of activity types
  totalMinutes  Int
  mood          Int      // 1-5
  notes         String?

  createdAt     DateTime @default(now())

  @@map("tracker_entries")
  @@unique([userId, date])
  @@index([userId, date])
}

model QuizResult {
  id              String   @id @default(uuid())
  userId          String
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  answers         Int[]
  scores          Json     // { presence, quality, consistency, digital, total }
  profileType     String   // 'alert', 'building', 'engaged', 'connected'
  topOpportunity  String

  createdAt       DateTime @default(now())

  @@map("quiz_results")
  @@index([userId, createdAt])
}

model Achievement {
  id              String   @id @default(uuid())
  userId          String
  achievementType String   // 'first_week', '7_day_streak', etc.
  unlockedAt      DateTime @default(now())

  @@map("achievements")
  @@unique([userId, achievementType])
}

model ResearchReference {
  id          String   @id @default(uuid())
  title       String
  authors     String[]
  publication String
  year        Int
  doi         String?
  url         String?
  summary     String   @db.Text

  calculatorType String // qual calculadora usa essa referência

  createdAt   DateTime @default(now())

  @@map("research_references")
  @@index([calculatorType])
}
```

---

## 5. API Endpoints

### 5.1 Autenticação

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
GET    /api/auth/me
```

### 5.2 Calculadoras

```
POST   /api/calculators/screen-time
POST   /api/calculators/family-meals
POST   /api/calculators/reading
POST   /api/calculators/social-roi
GET    /api/calculators/results/:userId
GET    /api/calculators/results/:userId/:type
```

**Request Example (Screen Time)**:
```json
POST /api/calculators/screen-time
{
  "childName": "João",
  "childAge": 12,
  "weekdayHours": 5,
  "weekendHours": 7,
  "primaryUse": "social_media",
  "hasSmartphone": true,
  "smartphoneAgeReceived": 11,
  "useBeforeSleep": true
}
```

**Response Example**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "summary": { ... },
    "riskAnalysis": { ... },
    "opportunityCost": { ... },
    "actionPlan": { ... },
    "sources": [ ... ]
  },
  "savedAt": "2026-01-21T10:30:00Z"
}
```

### 5.3 Quiz

```
POST   /api/quiz/submit
GET    /api/quiz/results/:userId
GET    /api/quiz/results/:userId/latest
```

### 5.4 Tracker

```
POST   /api/tracker/check-in
GET    /api/tracker/week/:userId
GET    /api/tracker/month/:userId/:year/:month
GET    /api/tracker/patterns/:userId
GET    /api/tracker/achievements/:userId
```

### 5.5 User Profile

```
GET    /api/profile/:userId
PUT    /api/profile/:userId
DELETE /api/profile/:userId
```

### 5.6 Analytics (Admin)

```
GET    /api/analytics/usage
GET    /api/analytics/calculators/popular
GET    /api/analytics/user-retention
```

---

## 6. Requisitos Não-Funcionais

### 6.1 Performance

| Métrica | Target | Crítico |
|---------|--------|---------|
| **Time to First Byte (TTFB)** | < 600ms | < 1s |
| **First Contentful Paint (FCP)** | < 1.8s | < 3s |
| **Largest Contentful Paint (LCP)** | < 2.5s | < 4s |
| **Time to Interactive (TTI)** | < 3.8s | < 7.3s |
| **Cálculo de resultado** | < 500ms | < 1s |
| **API response time (p95)** | < 300ms | < 500ms |

### 6.2 Segurança

#### Autenticação e Autorização
- JWT com refresh tokens (access token: 15min, refresh: 7 dias)
- Bcrypt para hash de senhas (cost factor: 12)
- Rate limiting: 100 requests/15min por IP
- CORS configurado para domínios específicos

#### Proteção de Dados
- HTTPS obrigatório em produção
- Sanitização de inputs (XSS prevention)
- Prepared statements (SQL injection prevention)
- Validação server-side de todos os inputs
- GDPR/LGPD compliance:
  - Direito ao esquecimento
  - Exportação de dados
  - Consentimento explícito

#### Dados Sensíveis
- **Nunca armazenar**: Nome completo de crianças (apenas primeiro nome)
- **Criptografar**: Email, notas do tracker
- **Anonimizar para analytics**: Hashing de IDs

### 6.3 Acessibilidade (WCAG 2.1 AA)

- **Contraste**: Mínimo 4.5:1 para texto normal
- **Keyboard navigation**: Todos os elementos interativos acessíveis via teclado
- **Screen readers**: Semantic HTML, ARIA labels
- **Focus indicators**: Visíveis em todos os elementos interativos
- **Forms**: Labels claros, mensagens de erro descritivas
- **Responsive**: Design funcional de 320px até 2560px
- **Motion**: Respeitar `prefers-reduced-motion`

### 6.4 Internacionalização (i18n)

**MVP**: Português (Brasil)
**Fase 2**: Espanhol (América Latina), Inglês (EUA)

```typescript
// Estrutura de tradução
{
  "pt-BR": {
    "calculators": {
      "screenTime": {
        "title": "Calculadora de Tempo de Tela",
        "inputs": { ... },
        "results": { ... }
      }
    }
  }
}
```

### 6.5 Monitoramento e Observabilidade

#### Logs
- **Nível**: Info, Warn, Error
- **Estrutura**: JSON structured logging
- **Retenção**: 30 dias (90 dias para errors)
- **Ferramenta**: Winston + CloudWatch/Datadog

#### Métricas
- **APM**: Request duration, error rate, throughput
- **Business**: Calculadoras mais usadas, taxa de conclusão
- **Infraestrutura**: CPU, memória, disk I/O
- **Ferramenta**: PostHog + Sentry

#### Alertas
- Error rate > 5% em 5 minutos
- API response time p95 > 1s por 10 minutos
- Database connection errors

---

## 7. Testes

### 7.1 Estratégia de Testes

```
                    Manual Testing
                          ↑
                    E2E Tests (5%)
                          ↑
                Integration Tests (15%)
                          ↑
                  Unit Tests (80%)
```

### 7.2 Cobertura Esperada

| Tipo | Cobertura Mínima | Ferramenta |
|------|------------------|------------|
| **Unit** | 80% | Jest / Vitest |
| **Integration** | 60% | Jest + Supertest |
| **E2E** | Critical paths | Playwright |
| **Visual Regression** | Key screens | Percy / Chromatic |

### 7.3 Testes Específicos

#### Cálculos Matemáticos
```typescript
describe('Screen Time Calculations', () => {
  it('should calculate daily average correctly', () => {
    const result = calculateDailyAverage(5, 7);
    expect(result).toBeCloseTo(5.57, 2);
  });

  it('should apply risk multipliers correctly', () => {
    const risk = calculateRisk({
      dailyAverage: 6,
      primaryUse: 'social_media',
      hasSmartphone: true,
      smartphoneAgeReceived: 10,
      useBeforeSleep: true
    });
    expect(risk.baseFactor).toBe(2.2);
    expect(risk.totalMultiplier).toBeGreaterThan(2);
  });
});
```

#### API Endpoints
```typescript
describe('POST /api/calculators/screen-time', () => {
  it('should return 400 for invalid input', async () => {
    const response = await request(app)
      .post('/api/calculators/screen-time')
      .send({ childAge: -5 }); // invalid

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it('should save result to database', async () => {
    const response = await request(app)
      .post('/api/calculators/screen-time')
      .set('Authorization', `Bearer ${token}`)
      .send(validInput);

    expect(response.status).toBe(200);

    const saved = await prisma.calculatorResult.findFirst({
      where: { userId: testUser.id }
    });
    expect(saved).toBeDefined();
  });
});
```

---

## 8. Deployment

### 8.1 Ambientes

| Ambiente | Propósito | Deploy Trigger |
|----------|-----------|----------------|
| **Development** | Desenvolvimento local | Manual |
| **Staging** | Testes e QA | Push to `develop` |
| **Production** | Usuários finais | Tag release `v*` |

### 8.2 CI/CD Pipeline

```yaml
# .github/workflows/ci.yml

name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint
      - run: npm run test:coverage
      - run: npm run build

  deploy-staging:
    needs: test
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Staging
        run: |
          # deploy commands

  deploy-production:
    needs: test
    if: startsWith(github.ref, 'refs/tags/v')
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Production
        run: |
          # deploy commands with extra safety checks
```

### 8.3 Infraestrutura Recomendada

**Opção 1: Serverless (Baixo custo inicial)**
- **Frontend**: Vercel/Netlify
- **Backend**: Railway/Render
- **Database**: Supabase/Neon (Postgres serverless)
- **Cache**: Upstash Redis
- **Storage**: Cloudflare R2

**Custo estimado**: $20-50/mês para MVP

**Opção 2: Cloud Tradicional (Escalável)**
- **Frontend**: AWS S3 + CloudFront
- **Backend**: AWS ECS Fargate
- **Database**: AWS RDS PostgreSQL
- **Cache**: AWS ElastiCache Redis
- **Storage**: AWS S3

**Custo estimado**: $100-300/mês

---

## 9. Roadmap Técnico

### Fase 1: MVP (Meses 1-3)
- [ ] Setup inicial do projeto
- [ ] Autenticação básica
- [ ] Calculadora de Tempo de Tela
- [ ] Quiz de Perfil
- [ ] Tracker Semanal
- [ ] Landing page

### Fase 2: Expansão (Meses 4-6)
- [ ] Calculadora de Refeições
- [ ] Calculadora de Leitura
- [ ] Dashboard consolidado
- [ ] Sistema de conquistas completo
- [ ] Relatórios mensais por email

### Fase 3: Impacto Sistêmico (Meses 7-12)
- [ ] Calculadora de ROI Social
- [ ] Ferramentas de advocacy
- [ ] API pública para pesquisadores
- [ ] Integração com parceiros (escolas, clínicas)
- [ ] App mobile (React Native)

---

## 10. Considerações Finais

### 10.1 Riscos Técnicos

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Fórmulas de cálculo contestadas | Média | Alto | Validação acadêmica, disclaimers claros |
| Performance com grande volume | Baixa | Médio | Caching agressivo, otimização de queries |
| Vazamento de dados sensíveis | Baixa | Crítico | Auditoria de segurança, penetration testing |
| Baixa adoção inicial | Alta | Alto | MVP rápido, feedback loops, marketing |

### 10.2 Próximos Passos

1. **Revisão desta spec** com time de desenvolvimento
2. **Criação de protótipos** (Figma) antes de codificar
3. **Validação das fórmulas** com pesquisadores
4. **Setup do ambiente** de desenvolvimento
5. **Início do desenvolvimento** seguindo o plano de implementação

---

**Documento vivo**: Esta especificação será atualizada conforme o projeto evolui e novos requisitos são descobertos.
