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

### 2.1 Arquitetura Geral (Vercel)

```
┌─────────────────────────────────────────────────────────────┐
│                    VERCEL PLATFORM                           │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              NEXT.JS APPLICATION                      │  │
│  │                                                        │  │
│  │   ┌────────────┐  ┌────────────┐  ┌─────────────┐   │  │
│  │   │  Landing   │  │ Calculator │  │   Tracker   │   │  │
│  │   │    Page    │→ │   Pages    │→ │  Dashboard  │   │  │
│  │   └────────────┘  └────────────┘  └─────────────┘   │  │
│  │                                                        │  │
│  │   ┌──────────────────────────────────────────────┐   │  │
│  │   │          API Routes (Serverless)             │   │  │
│  │   │   /api/calculators  /api/auth  /api/tracker  │   │  │
│  │   └──────────────────────────────────────────────┘   │  │
│  │                                                        │  │
│  │         Next.js 14 + TypeScript + TailwindCSS         │  │
│  │              Chart.js + Framer Motion                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                            ↓                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                  VERCEL STORAGE                       │  │
│  │   ┌────────────┐  ┌────────────┐  ┌─────────────┐   │  │
│  │   │  Vercel    │  │  Vercel    │  │   Vercel    │   │  │
│  │   │  Postgres  │  │    KV      │  │    Blob     │   │  │
│  │   │  (Database)│  │  (Cache)   │  │  (Assets)   │   │  │
│  │   └────────────┘  └────────────┘  └─────────────┘   │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Stack Tecnológica (Vercel)

#### Frontend + Backend (Full-Stack Next.js)
| Tecnologia | Versão | Propósito |
|-----------|--------|-----------|
| **Next.js** | 14+ | Framework Full-Stack (App Router) |
| **React** | 18+ | UI Library |
| **TypeScript** | 5+ | Type safety |
| **TailwindCSS** | 3+ | Styling |
| **Chart.js** | 4+ | Visualizações |
| **Recharts** | 2+ | Alternativa para gráficos |
| **Framer Motion** | 11+ | Animações |
| **React Hook Form** | 7+ | Formulários |
| **Zod** | 3+ | Validação |
| **NextAuth.js** | 5+ | Autenticação |
| **Prisma** | 5+ | ORM |

#### Database (Vercel Storage)
| Tecnologia | Propósito |
|-----------|-----------|
| **Vercel Postgres** | Dados principais (PostgreSQL serverless) |
| **Vercel KV** | Cache, sessões (Redis-compatible) |
| **Vercel Blob** | Armazenamento de assets |

**Alternativa de Database:**
- **Supabase** - PostgreSQL com auth integrado
- **PlanetScale** - MySQL serverless

#### DevOps (Vercel Platform)
| Tecnologia | Propósito |
|-----------|-----------|
| **Vercel** | Deploy automático, Preview deployments |
| **GitHub Actions** | CI (testes, linting) |
| **Vercel Analytics** | Web analytics integrado |
| **Vercel Speed Insights** | Performance monitoring |
| **Sentry** | Error tracking |

### 2.3 Estrutura de Pastas (Next.js + Vercel)

```
familytalks/
├── src/
│   ├── app/                              # Next.js App Router
│   │   ├── layout.tsx                    # Layout principal
│   │   ├── page.tsx                      # Landing page (/)
│   │   ├── globals.css
│   │   │
│   │   ├── calculadoras/
│   │   │   ├── tempo-familiar/           # /calculadoras/tempo-familiar
│   │   │   │   └── page.tsx
│   │   │   ├── tempo-tela/               # /calculadoras/tempo-tela
│   │   │   │   └── page.tsx
│   │   │   ├── roi-social/               # /calculadoras/roi-social
│   │   │   │   └── page.tsx
│   │   │   ├── refeicoes/                # /calculadoras/refeicoes
│   │   │   │   └── page.tsx
│   │   │   └── momentos/                 # /calculadoras/momentos
│   │   │       └── page.tsx
│   │   │
│   │   ├── quiz/                         # /quiz
│   │   │   └── page.tsx
│   │   │
│   │   ├── dashboard/                    # /dashboard
│   │   │   └── page.tsx
│   │   │
│   │   └── api/                          # API Routes (Serverless)
│   │       ├── calculators/
│   │       │   ├── tempo-familiar/route.ts
│   │       │   ├── tempo-tela/route.ts
│   │       │   ├── roi-social/route.ts
│   │       │   ├── refeicoes/route.ts
│   │       │   └── momentos/route.ts
│   │       ├── quiz/route.ts
│   │       ├── tracker/route.ts
│   │       └── auth/[...nextauth]/route.ts
│   │
│   ├── components/
│   │   ├── calculators/                  # Componentes das 6 calculadoras
│   │   │   ├── TempoFamiliar/
│   │   │   │   ├── Form.tsx
│   │   │   │   └── Results.tsx
│   │   │   ├── TempoTela/
│   │   │   ├── ROISocial/
│   │   │   ├── Refeicoes/
│   │   │   ├── Quiz/
│   │   │   └── Momentos/
│   │   ├── shared/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Slider.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Chart.tsx
│   │   │   └── ResultCard.tsx
│   │   └── layout/
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       └── Navigation.tsx
│   │
│   ├── lib/
│   │   ├── calculations/                 # Lógica de cálculo das calculadoras
│   │   │   ├── tempoFamiliar.ts
│   │   │   ├── tempoTela.ts
│   │   │   ├── roiSocial.ts
│   │   │   ├── refeicoes.ts
│   │   │   ├── quiz.ts
│   │   │   └── momentos.ts
│   │   ├── db.ts                         # Prisma client
│   │   ├── auth.ts                       # NextAuth config
│   │   └── utils.ts
│   │
│   ├── hooks/
│   │   ├── useCalculator.ts
│   │   ├── useTracker.ts
│   │   └── useAuth.ts
│   │
│   └── types/
│       ├── calculator.types.ts
│       ├── user.types.ts
│       └── api.types.ts
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── public/
│   ├── images/
│   └── icons/
│
├── docs/
│   ├── api/
│   ├── research/
│   └── user-guides/
│
├── tests/
│   ├── unit/
│   │   └── calculations/
│   └── e2e/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── vercel.json                          # Configuração Vercel
├── next.config.js
├── tailwind.config.js
├── package.json
├── tsconfig.json
└── README.md
```

---

## 3. Especificações das Calculadoras

### 3.1 Calculadora de Tempo Familiar

**Propósito**: Mensurar o tempo de qualidade dedicado aos filhos e comparar com médias nacionais, gerando conscientização e motivação.

#### 3.1.1 Inputs

```typescript
interface FamilyTimeInput {
  // Informações básicas
  numberOfChildren: number;           // 1-8
  childrenAges: number[];             // Array de idades (0-17)

  // Tempo de qualidade por dia (horas)
  weekdayHours: number;               // 0-8 horas/dia em dias úteis
  weekendHours: number;               // 0-16 horas/dia em fins de semana

  // Tipo de atividades
  activities: {
    meals: number;                    // Refeições juntos (horas/semana)
    play: number;                     // Brincadeiras/jogos (horas/semana)
    reading: number;                  // Leitura compartilhada (horas/semana)
    homework: number;                 // Dever de casa (horas/semana)
    conversation: number;             // Conversas significativas (horas/semana)
    outdoor: number;                  // Atividades ao ar livre (horas/semana)
  };

  // Contexto familiar
  workSchedule: 'full_time' | 'part_time' | 'remote' | 'stay_at_home';
  familyStructure: 'two_parents' | 'single_parent' | 'shared_custody';
}
```

#### 3.1.2 Cálculos

```typescript
// Média diária ponderada
const dailyAverage = (weekdayHours * 5 + weekendHours * 2) / 7;

// Projeções anuais
const yearlyHours = dailyAverage * 365;
const totalWeeklyActivities = Object.values(activities).reduce((a, b) => a + b, 0);

// Benchmarks por idade (médias nacionais EUA - Pew Research)
const nationalAverageByAge = {
  '0-5': 2.5,   // horas/dia
  '6-12': 1.8,  // horas/dia
  '13-17': 1.2  // horas/dia
};

// Comparação com média nacional
function getAgeGroup(age: number): string {
  if (age <= 5) return '0-5';
  if (age <= 12) return '6-12';
  return '13-17';
}

const avgChildAge = childrenAges.reduce((a, b) => a + b, 0) / childrenAges.length;
const nationalAvg = nationalAverageByAge[getAgeGroup(avgChildAge)];
const comparisonToNational = ((dailyAverage - nationalAvg) / nationalAvg) * 100;

// "Banco de Memórias" - projeção de horas acumuladas até os 18 anos
function calculateMemoryBank(currentAges: number[], hoursPerYear: number) {
  return currentAges.map(age => {
    const yearsRemaining = 18 - age;
    const totalHours = yearsRemaining * hoursPerYear;
    const memorableEvents = Math.floor(totalHours / 2); // ~2h por evento memorável
    return { age, yearsRemaining, totalHours, memorableEvents };
  });
}

// Categoria de engajamento
function getEngagementLevel(dailyHours: number, ageGroup: string) {
  const thresholds = {
    '0-5': { low: 1.5, medium: 2.5, high: 4 },
    '6-12': { low: 1, medium: 1.8, high: 3 },
    '13-17': { low: 0.5, medium: 1.2, high: 2 }
  };

  const t = thresholds[ageGroup];
  if (dailyHours < t.low) return 'needs_attention';
  if (dailyHours < t.medium) return 'building';
  if (dailyHours < t.high) return 'engaged';
  return 'highly_connected';
}
```

#### 3.1.3 Output

```typescript
interface FamilyTimeResult {
  summary: {
    dailyAverage: number;
    weeklyTotal: number;
    yearlyProjection: number;
    comparisonToNational: number;      // % acima/abaixo da média
    engagementLevel: 'needs_attention' | 'building' | 'engaged' | 'highly_connected';
  };

  memoryBank: {
    perChild: {
      childAge: number;
      yearsRemaining: number;
      projectedHours: number;
      memorableEvents: number;         // Eventos memoráveis estimados
    }[];
    totalFamilyHours: number;
    metaphor: string;                  // Ex: "Equivalente a 125 dias inteiros"
  };

  activityBreakdown: {
    activity: string;
    hoursPerWeek: number;
    percentageOfTotal: number;
    recommendation: string;
  }[];

  nationalComparison: {
    yourFamily: number;
    nationalAverage: number;
    topQuartile: number;               // Top 25% de famílias
    percentile: number;                // Em qual percentil você está
  };

  suggestions: {
    quickWins: string[];               // Mudanças fáceis de implementar
    highImpact: string[];              // Mudanças de maior impacto
    byActivity: { activity: string; suggestion: string }[];
  };

  sources: Reference[];
}
```

---

### 3.2 Calculadora de Impacto do Tempo de Tela

**Propósito**: Baseada em dados do "Anxious Generation" (Jonathan Haidt), mostra o impacto do uso de telas na saúde mental.

#### 3.2.1 Inputs

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

#### 3.2.2 Cálculos

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

#### 3.2.3 Output

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

### 3.3 Calculadora de ROI Social da Parentalidade

**Propósito**: Traduz investimento de tempo parental em valor econômico e social para advocacy e políticas públicas.

#### 3.3.1 Inputs

```typescript
interface SocialROIInput {
  // Tempo investido
  weeklyQualityHours: number;           // 0-40 horas/semana

  // Atividades (horas/semana cada)
  activities: {
    reading: number;
    meals: number;
    play: number;
    homework: number;
    sports: number;
    conversations: number;
  };

  // Contexto familiar
  numberOfChildren: number;
  childrenAges: number[];
  familyIncome: 'low' | 'middle' | 'high';
  region: string;                        // Estado/região
  familyStructure: 'biparental' | 'monoparental' | 'shared_custody';
}
```

#### 3.3.2 Cálculos

```typescript
// Valor base por hora (baseado em estudos de custo-benefício)
const VALUE_PER_HOUR_USD = 20;  // Baseado em $70k evitados em 7 anos / 500h/ano
const USD_TO_BRL = 5.0;
const VALUE_PER_HOUR_BRL = VALUE_PER_HOUR_USD * USD_TO_BRL;

// Pesos por tipo de atividade (baseado em evidências)
const activityWeights = {
  reading: 1.5,        // Alto impacto cognitivo
  meals: 1.2,          // Forte evidência protetiva
  play: 1.3,           // Desenvolvimento socioemocional
  homework: 0.8,       // Menor impacto relacional
  sports: 1.1,         // Saúde física + social
  conversations: 1.4   // Saúde mental
};

// Cálculo de ROI anual
function calculateAnnualROI(activities: Activities, children: number) {
  let totalValue = 0;

  Object.entries(activities).forEach(([activity, hours]) => {
    const yearlyHours = hours * 52;
    const weight = activityWeights[activity] || 1.0;
    totalValue += yearlyHours * VALUE_PER_HOUR_BRL * weight;
  });

  return totalValue * children;
}

// Economia em custos públicos
const publicCostSavings = {
  mentalHealthPrevention: 4120,    // R$/pessoa/ano
  substanceAbusePrevention: 7500,  // R$/pessoa/ano
  juvenileJusticeSavings: 25000,   // R$/pessoa (evitado)
  educationalDropoutSavings: 150000 // R$/pessoa (lifetime productivity)
};
```

#### 3.3.3 Output

```typescript
interface SocialROIResult {
  familyInvestment: {
    weeklyHours: number;
    yearlyHours: number;
    activityBreakdown: { activity: string; hours: number; weight: number }[];
  };

  economicValue: {
    annualROI: number;                   // R$/ano
    perHourValue: number;                // R$/hora
    lifetimeValue: number;               // Valor até os 18 anos
  };

  publicSavings: {
    mentalHealth: number;
    substanceAbuse: number;
    juvenileJustice: number;
    educationalOutcomes: number;
    totalSavings: number;
  };

  communityImpact: {
    if1000Families: {
      publicHealthSavings: number;
      justiceSavings: number;
      educationGains: number;
      totalImpact: number;
    };
  };

  comparisonToAlternatives: {
    intervention: string;
    costPerChild: number;
    effectiveness: string;
    roi: string;
  }[];

  advocacyTools: {
    summaryForEmployer: string;
    letterToLegislator: string;
    socialMediaPost: string;
    infographicData: object;
  };

  sources: Reference[];
}
```

---

### 3.4 Quiz: Estilo de Parentalidade

**Propósito**: Diagnóstico não-julgador que identifica padrão atual e sugere ajustes baseados em evidências.

#### 3.4.1 Estrutura de Perguntas

```typescript
interface QuizQuestion {
  id: string;
  dimension: 'warmth' | 'structure' | 'autonomy' | 'involvement';
  question: string;
  options: {
    text: string;
    points: number;  // 0-3
    style: string;   // authoritative, permissive, authoritarian, uninvolved
  }[];
}

// 20 perguntas divididas em 4 dimensões (5 por dimensão)
// Dimensões baseadas em Baumrind's Parenting Styles + pesquisas modernas
```

#### 3.4.2 Cálculos

```typescript
interface QuizScores {
  warmth: number;        // 0-15
  structure: number;     // 0-15
  autonomy: number;      // 0-15
  involvement: number;   // 0-15
  total: number;         // 0-60
}

// Estilos de parentalidade
function getParentingStyle(scores: QuizScores): string {
  const { warmth, structure } = scores;

  if (warmth >= 10 && structure >= 10) return 'authoritative';   // Alto afeto + Alta estrutura
  if (warmth >= 10 && structure < 10) return 'permissive';       // Alto afeto + Baixa estrutura
  if (warmth < 10 && structure >= 10) return 'authoritarian';    // Baixo afeto + Alta estrutura
  return 'uninvolved';                                           // Baixo afeto + Baixa estrutura
}

// Recomendações baseadas em estilo
const styleRecommendations = {
  authoritative: 'Excelente! Continue equilibrando afeto e limites.',
  permissive: 'Tente adicionar mais estrutura e consistência nas regras.',
  authoritarian: 'Considere aumentar demonstrações de afeto e flexibilidade.',
  uninvolved: 'Busque aumentar tanto presença emocional quanto estrutura.'
};
```

#### 3.4.3 Output

```typescript
interface QuizResult {
  profile: {
    primaryStyle: 'authoritative' | 'permissive' | 'authoritarian' | 'uninvolved';
    totalScore: number;
    percentile: number;
  };

  dimensionScores: {
    warmth: { score: number; max: number; description: string };
    structure: { score: number; max: number; description: string };
    autonomy: { score: number; max: number; description: string };
    involvement: { score: number; max: number; description: string };
  };

  styleAnalysis: {
    strengths: string[];
    growthAreas: string[];
    evidenceBased: string;        // O que pesquisas dizem sobre este estilo
  };

  actionPlan: {
    primaryFocus: string;
    weeklyGoals: string[];
    resources: string[];
  };

  retakeDate: Date;               // Sugestão para refazer em 30 dias
  sources: Reference[];
}
```

---

### 3.5 Calculadora de Refeições em Família

**Propósito**: Demonstra os fatores de proteção gerados por refeições compartilhadas com dados de impacto.

#### 3.5.1 Inputs

```typescript
interface FamilyMealsInput {
  mealsPerWeek: number;                  // 0-21 (café + almoço + jantar)
  // Ou detalhado:
  breakfastPerWeek?: number;             // 0-7
  lunchPerWeek?: number;                 // 0-7
  dinnerPerWeek?: number;                // 0-7

  childrenAges?: number[];               // Opcional para contexto
}
```

#### 3.5.2 Cálculos

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

#### 3.5.3 Output

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

### 3.6 Contador de "Momentos de Conexão"

**Propósito**: Tracker semanal gamificado de interações significativas, transformando intenções em hábitos.

#### 3.6.1 Input Diário

```typescript
interface DailyCheckIn {
  date: Date;
  activities: ('family_meal' | 'reading' | 'play' | 'conversation' | 'physical_activity' | 'creative' | 'screen_free_time')[];
  totalMinutes: number; // 15-180+
  mood: 1 | 2 | 3 | 4 | 5; // emoji scale
  notes?: string; // opcional
}
```

#### 3.6.2 Cálculos

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

#### 3.6.3 Output

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

  calculatorType String  // 'family_time', 'screen_time', 'social_roi', 'family_meals', 'moments'
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
POST   /api/calculators/tempo-familiar     # Calculadora de Tempo Familiar
POST   /api/calculators/tempo-tela         # Calculadora de Impacto do Tempo de Tela
POST   /api/calculators/roi-social         # Calculadora de ROI Social da Parentalidade
POST   /api/calculators/refeicoes          # Calculadora de Refeições em Família
POST   /api/calculators/momentos           # Contador de Momentos de Conexão
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

### 8.3 Infraestrutura (Vercel)

**Stack Unificada no Vercel:**
- **Frontend + Backend**: Vercel (Next.js full-stack)
- **Database**: Vercel Postgres (PostgreSQL serverless)
- **Cache**: Vercel KV (Redis-compatible)
- **Storage**: Vercel Blob
- **Analytics**: Vercel Analytics + Speed Insights

**Custo estimado**:
- **Hobby (gratuito)**: Suficiente para desenvolvimento e testes
- **Pro ($20/mês)**: Recomendado para produção com mais recursos
- **Storage**: Postgres ($0.30/GB), KV ($0.50/100k requests)

**Configuração Vercel (vercel.json)**:
```json
{
  "framework": "nextjs",
  "regions": ["gru1"],
  "env": {
    "DATABASE_URL": "@database-url",
    "NEXTAUTH_SECRET": "@nextauth-secret"
  }
}
```

**Alternativa de Database:**
- **Supabase**: PostgreSQL + Auth integrado (mais features, custo similar)
- **PlanetScale**: MySQL serverless (excelente para escala)

---

## 9. Roadmap Técnico

### Fase 1: MVP (Meses 1-3)
- [ ] Setup inicial do projeto (Next.js + Vercel)
- [ ] Autenticação (NextAuth.js)
- [ ] **Calculadora de Tempo Familiar**
- [ ] **Calculadora de Impacto do Tempo de Tela**
- [ ] Landing page
- [ ] Deploy no Vercel

### Fase 2: Expansão (Meses 4-6)
- [ ] **Calculadora de Refeições em Família**
- [ ] **Quiz: Estilo de Parentalidade**
- [ ] **Contador de Momentos de Conexão**
- [ ] Dashboard consolidado
- [ ] Sistema de conquistas

### Fase 3: Impacto Sistêmico (Meses 7-12)
- [ ] **Calculadora de ROI Social da Parentalidade**
- [ ] Ferramentas de advocacy (PDFs, templates)
- [ ] API pública para pesquisadores
- [ ] Integração com parceiros (escolas, clínicas)
- [ ] Relatórios mensais por email

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
