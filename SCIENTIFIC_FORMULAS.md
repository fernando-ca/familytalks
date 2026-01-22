# Fórmulas e Dados Científicos - Calculadoras FamilyTalks.org

**Versão**: 1.1
**Data**: 22 de janeiro de 2026
**Propósito**: Referência rápida para implementação e validação científica

---

## Índice

### Calculadoras
1. [Calculadora de Tempo Familiar](#1-calculadora-de-tempo-familiar)
2. [Calculadora de Impacto do Tempo de Tela](#2-calculadora-de-impacto-do-tempo-de-tela)
3. [Calculadora de ROI Social da Parentalidade](#3-calculadora-de-roi-social-da-parentalidade)
4. [Quiz: Estilo de Parentalidade](#4-quiz-estilo-de-parentalidade)
5. [Calculadora de Refeições em Família](#5-calculadora-de-refeições-em-família)
6. [Contador de Momentos de Conexão](#6-contador-de-momentos-de-conexão)

### Anexos
7. [Referências Científicas](#7-referências-científicas)
8. [Disclaimers Importantes](#8-disclaimers-importantes)
9. [Próximos Passos](#9-próximos-passos)

---

## 1. Calculadora de Tempo Familiar

### 1.1 Dados Base

| Métrica | Valor | Fonte |
|---------|-------|-------|
| Tempo médio pais-filhos (0-5 anos) | 2.5h/dia | Pew Research, 2021 |
| Tempo médio pais-filhos (6-12 anos) | 1.8h/dia | Pew Research, 2021 |
| Tempo médio pais-filhos (13-17 anos) | 1.2h/dia | Pew Research, 2021 |
| Horas/semana ideal para adolescentes | 6h/semana | Abbott, 2019 |
| Impacto de 6h+/semana com pais | Melhores notas em matemática, menor uso de drogas | Abbott, 2019 |

### 1.2 Fórmulas de Cálculo

#### Média Diária Ponderada
```javascript
const dailyAverage = (weekdayHours * 5 + weekendHours * 2) / 7;
```

#### Projeções Anuais
```javascript
const yearlyHours = dailyAverage * 365;
const totalWeeklyActivities = Object.values(activities).reduce((a, b) => a + b, 0);
```

#### Benchmarks por Idade
```javascript
const nationalAverageByAge = {
  '0-5': 2.5,   // horas/dia
  '6-12': 1.8,  // horas/dia
  '13-17': 1.2  // horas/dia
};

function getAgeGroup(age) {
  if (age <= 5) return '0-5';
  if (age <= 12) return '6-12';
  return '13-17';
}
```

#### Comparação com Média Nacional
```javascript
const avgChildAge = childrenAges.reduce((a, b) => a + b, 0) / childrenAges.length;
const nationalAvg = nationalAverageByAge[getAgeGroup(avgChildAge)];
const comparisonToNational = ((dailyAverage - nationalAvg) / nationalAvg) * 100;
```

#### "Banco de Memórias" - Projeção até os 18 Anos
```javascript
function calculateMemoryBank(currentAges, hoursPerYear) {
  return currentAges.map(age => {
    const yearsRemaining = 18 - age;
    const totalHours = yearsRemaining * hoursPerYear;
    const memorableEvents = Math.floor(totalHours / 2); // ~2h por evento memorável
    return { age, yearsRemaining, totalHours, memorableEvents };
  });
}
```

### 1.3 Categorias de Engajamento

| Nível | 0-5 anos | 6-12 anos | 13-17 anos |
|-------|----------|-----------|------------|
| Precisa Atenção | <1.5h/dia | <1h/dia | <0.5h/dia |
| Em Construção | 1.5-2.5h/dia | 1-1.8h/dia | 0.5-1.2h/dia |
| Engajado | 2.5-4h/dia | 1.8-3h/dia | 1.2-2h/dia |
| Altamente Conectado | 4h+/dia | 3h+/dia | 2h+/dia |

### 1.4 Impacto por Tipo de Atividade

| Atividade | Peso | Evidência |
|-----------|------|-----------|
| Refeições juntos | 1.2x | Forte evidência protetiva (meta-análises) |
| Leitura compartilhada | 1.5x | Alto impacto cognitivo mensurável |
| Brincadeira livre | 1.3x | Desenvolvimento socioemocional |
| Conversas significativas | 1.4x | Saúde mental, vínculo |
| Atividades ao ar livre | 1.2x | Saúde física + mental |
| Dever de casa | 0.8x | Menor impacto relacional |

---

## 2. Calculadora de Impacto do Tempo de Tela

### 2.1 Dados Base

| Métrica | Valor | Fonte |
|---------|-------|-------|
| Recomendação OMS (5-17 anos) | 2h/dia | WHO, 2019 |
| Recomendação OMS (3-4 anos) | 1h/dia | WHO, 2019 |
| Média adolescentes EUA | 7-9h/dia | Common Sense Media, 2021 |
| % teens com 3+h/dia | 77% | Pew Research, 2022 |
| Aumento depressão (2010-2021) | +100% em meninas adolescentes | Twenge & Haidt, 2024 |
| Aumento ansiedade (2010-2021) | +134% em meninas adolescentes | CDC, 2023 |

### 2.2 Fórmulas de Cálculo

#### Média Diária
```javascript
dailyAverage = (weekdayHours * 5 + weekendHours * 2) / 7
```

#### Projeções
```javascript
yearlyHours = dailyAverage * 365
hoursUntil18 = dailyAverage * 365 * (18 - currentAge)
daysEquivalent = hoursUntil18 / 24
```

#### Fator de Risco Base
```javascript
function getRiskFactor(dailyHours) {
  if (dailyHours <= 2) return 1.0;      // Baixo
  if (dailyHours <= 4) return 1.5;      // Moderado
  if (dailyHours <= 6) return 2.2;      // Elevado
  return 3.0;                            // Alto
}
```

#### Multiplicadores de Risco
```javascript
const multipliers = {
  socialMedia: primaryUse === 'social_media' ? 1.4 : 1.0,
  earlySmartphone: (hasPhone && ageReceived < 14) ? 1.3 : 1.0,
  beforeSleep: usesBeforeSleep ? 1.25 : 1.0,
  youngChild: age < 10 ? 1.2 : 1.0
};

totalRisk = baseFactor * Object.values(multipliers).reduce((a,b) => a*b, 1);
```

### 2.3 Correlações Documentadas

| Aumento de Tempo de Tela | Impacto | Fonte |
|---------------------------|---------|-------|
| 5h+ redes sociais/dia | 2x risco de ansiedade/depressão | Haidt, 2024 |
| Uso antes de dormir | -22% melatonina, pior qualidade sono | Harvard Medical, 2020 |
| Cada hora adicional | -45min interação presencial | Twenge et al., 2019 |
| 3h+/dia | Correlação negativa com notas | Kaiser Family Foundation |

### 2.4 Custo de Oportunidade

```javascript
// Por hora de tela, estima-se perda de:
const opportunityCost = {
  freePlay: 0.3,        // 30% do tempo poderia ser brincadeira livre
  conversation: 0.2,     // 20% poderia ser conversa familiar
  physicalActivity: 0.25,// 25% poderia ser atividade física
  reading: 0.15,         // 15% poderia ser leitura
  other: 0.1             // 10% outros
};

weeklyLoss = {
  freePlay: (dailyAverage - 2) * 7 * opportunityCost.freePlay,
  // ... aplicar para cada categoria
};
```

### 2.5 Benchmarks por Idade

| Idade | Recomendação | Média Nacional | Alto Risco |
|-------|-------------|----------------|------------|
| 3-4 anos | 0-1h/dia | 3h/dia | 4h+/dia |
| 5-8 anos | 1-2h/dia | 4h/dia | 5h+/dia |
| 9-12 anos | 2h/dia | 5h/dia | 6h+/dia |
| 13-17 anos | 2h/dia | 7-9h/dia | 8h+/dia |

---

## 5. Calculadora de Refeições em Família

### 5.1 Dados Base

| Métrica | Valor | Fonte |
|---------|-------|-------|
| 3+ refeições/semana | -12% risco sobrepeso | PubMed Central, 2018 |
| 3+ refeições/semana | -20% alimentação não saudável | PubMed Central, 2018 |
| 3+ refeições/semana | -35% transtornos alimentares | PubMed Central, 2018 |
| 5-7 refeições/semana | -24% comportamento violento | CASA Columbia, 2011 |
| 5-7 refeições/semana | -25% depressão/suicídio | CASA Columbia, 2011 |
| Refeições frequentes | Mais probabilidade notas A/B | Harvard Research, 2005 |

### 5.2 Fórmulas de Cálculo

#### Total e Categorização
```javascript
totalMeals = breakfast + lunch + dinner;

function getCategory(total) {
  if (total <= 2) return 'disconnected';   // Família Desconectada
  if (total <= 4) return 'building';       // Em Construção
  if (total <= 6) return 'engaged';        // Família Engajada
  return 'connected';                      // Família Conectada
}
```

#### Fator de Qualidade
```javascript
const qualityFactors = {
  duration: duration >= 20 ? 1.3 : 1.0,
  noScreens: screens === 'never' ? 1.4 : screens === 'sometimes' ? 1.0 : 0.7,
  bothParents: participants.includes('mother') &&
               participants.includes('father') ? 1.25 : 1.0
};

qualityMultiplier = Object.values(qualityFactors).reduce((a,b) => a*b, 1);
```

#### Fatores de Proteção
```javascript
function calculateProtection(meals, quality) {
  const baseProtection = {
    obesity: meals >= 3 ? -12 : -8 * (meals/3),
    unhealthyEating: meals >= 3 ? -20 : -15 * (meals/3),
    eatingDisorders: meals >= 3 ? -35 : -25 * (meals/3),
    substanceUse: meals >= 5 ? -15 : -10 * (meals/5),
    mentalHealth: meals >= 5 ? -25 : -15 * (meals/5)
  };

  // Aplicar multiplicador de qualidade
  return Object.fromEntries(
    Object.entries(baseProtection).map(([k, v]) => [k, v * quality])
  );
}
```

### 5.3 Impacto de +1 Refeição

Ao adicionar 1 refeição/semana de 4 para 5:

```javascript
const impactOfOne = {
  yearlyHours: 52,  // 1h/semana * 52 semanas
  vocabularyExposure: 2600,  // ~50 palavras/refeição * 52
  riskReduction: 10,  // % adicional de proteção
  academicImprovement: 'moderate'  // probabilidade de melhora
};
```

### 5.4 Tempo de Conexão

```javascript
// Duração média por refeição
const durationMap = {
  '<10min': 8,
  '10-20min': 15,
  '20-30min': 25,
  '30+min': 40
};

weeklyConnectionTime = totalMeals * durationMap[averageDuration];
yearlyConnectionHours = (weeklyConnectionTime * 52) / 60;
```

### 5.5 Benchmarks Nacionais

| Métrica | Média Brasil | Famílias Alta Conexão |
|---------|-------------|----------------------|
| Refeições/semana | 3-4 | 7+ |
| Duração média | 12-15min | 25-30min |
| Com telas presentes | 60% | 10% |
| Conversa significativa | Raro | Sempre |

---

## 3. Calculadora de ROI Social da Parentalidade

### 3.1 Dados Base de Custos Sociais

| Problema | Custo por Pessoa | Fonte |
|----------|------------------|-------|
| Transtorno de conduta (7 anos) | $70,000 | NCBI, 2009 |
| Transtornos mentais (anual) | $467 bilhões total nos EUA | HHS.gov, 2012 |
| Prevenção de saúde mental | -$824/pessoa/ano economizado | PubMed Central, 2016 |
| Evasão escolar (lifetime) | ~$300,000 em produtividade perdida | Alliance for Excellent Education |
| Sistema de justiça juvenil | $14.4 bilhões/ano (EUA) | Justice Policy Institute |

### 3.2 Fórmulas de Cálculo

#### Valor Base por Hora
```javascript
// Baseado em custo evitado de problemas de conduta
const COST_AVOIDED_7_YEARS = 70000; // USD
const ANNUAL_COST_AVOIDED = COST_AVOIDED_7_YEARS / 7; // $10,000/ano
const QUALITY_TIME_NEEDED = 500; // horas/ano (estimativa conservadora)
const VALUE_PER_HOUR = ANNUAL_COST_AVOIDED / QUALITY_TIME_NEEDED; // $20/hora

// Conversão para BRL (ajustar conforme câmbio)
const USD_TO_BRL = 5.0;
const VALUE_PER_HOUR_BRL = VALUE_PER_HOUR * USD_TO_BRL; // R$100/hora
```

#### Pesos por Atividade
```javascript
const activityWeights = {
  familyMeals: 1.2,         // Forte evidência protetiva
  reading: 1.5,             // Alto impacto cognitivo
  freePlay: 1.3,            // Desenvolvimento socioemocional
  conversations: 1.4,       // Saúde mental
  homework: 0.8,            // Menor impacto relacional
  sports: 1.1               // Saúde física + social
};
```

#### Cálculo de ROI Anual
```javascript
function calculateROI(activities, hours, numberOfChildren) {
  let totalValue = 0;

  activities.forEach(activity => {
    const hoursPerYear = hours[activity] * 52;
    const weight = activityWeights[activity] || 1.0;
    const value = hoursPerYear * VALUE_PER_HOUR_BRL * weight;
    totalValue += value;
  });

  return totalValue * numberOfChildren;
}
```

### 3.3 Economia em Saúde Pública

```javascript
const healthSavings = {
  mentalHealthPrevention: 824 * USD_TO_BRL, // R$4,120/pessoa/ano
  substanceAbusePrevention: 1500 * USD_TO_BRL, // R$7,500/pessoa/ano
  juvenileJusticeAvoided: 5000 * USD_TO_BRL // R$25,000/pessoa (se aplicável)
};

function calculateHealthSavings(familyProfile) {
  let savings = 0;

  if (familyProfile.highQualityTime) {
    savings += healthSavings.mentalHealthPrevention * familyProfile.members;
  }

  if (familyProfile.protectiveFactors > 3) {
    savings += healthSavings.substanceAbusePrevention * familyProfile.children;
  }

  return savings;
}
```

### 3.4 Impacto Comunitário

```javascript
function calculateCommunityImpact(numberOfFamilies, avgROIPerFamily) {
  const totalImpact = numberOfFamilies * avgROIPerFamily;

  return {
    publicHealthSavings: totalImpact * 0.3,  // 30% economia em saúde
    justiceSavings: totalImpact * 0.15,      // 15% economia em justiça
    educationGains: totalImpact * 0.25,      // 25% ganhos educacionais
    productivityGains: totalImpact * 0.3     // 30% produtividade futura
  };
}
```

### 3.5 Comparação com Alternativas

| Intervenção | Custo/Criança/Ano | Efetividade | ROI |
|-------------|-------------------|-------------|-----|
| Tempo parental de qualidade | R$0 (tempo) | Alta | ∞ |
| Terapia infantil | R$12,000 | Moderada-Alta | 3:1 |
| Escola particular | R$30,000 | Moderada | 2:1 |
| Programa social governamental | R$5,000 | Variável | 1.5:1 |
| Medicação (TDAH, ansiedade) | R$2,400 | Moderada | Variável |

---

## 4. Quiz: Estilo de Parentalidade

### 4.1 Sistema de Pontuação

#### Escala de Respostas
```javascript
const pointScale = {
  never: 0,
  rarely: 1,
  sometimes: 2,
  often: 3
};

// Ou para perguntas numéricas:
const frequencyScale = {
  '0-2': 0,
  '3-4': 1,
  '5-6': 2,
  '7+': 3
};
```

#### Dimensões e Pesos
```javascript
const dimensions = {
  presence: {
    maxPoints: 12,
    questions: [1, 2, 3, 4],
    weight: 1.0
  },
  quality: {
    maxPoints: 12,
    questions: [5, 6, 7, 8],
    weight: 1.2  // Qualidade > quantidade
  },
  consistency: {
    maxPoints: 12,
    questions: [9, 10, 11, 12],
    weight: 1.1
  },
  digital: {
    maxPoints: 9,
    questions: [13, 14, 15],
    weight: 1.3  // Desconexão digital é crítica
  }
};
```

### 4.2 Cálculo de Perfil

```javascript
function calculateProfile(answers) {
  const scores = {
    presence: 0,
    quality: 0,
    consistency: 0,
    digital: 0
  };

  // Somar pontos por dimensão
  Object.keys(dimensions).forEach(dim => {
    dimensions[dim].questions.forEach(qNum => {
      scores[dim] += answers[qNum];
    });
  });

  // Calcular total ponderado
  let weightedTotal = 0;
  Object.keys(scores).forEach(dim => {
    weightedTotal += scores[dim] * dimensions[dim].weight;
  });

  // Score sem ponderação (0-45)
  const rawTotal = Object.values(scores).reduce((a,b) => a+b, 0);

  return {
    scores,
    rawTotal,
    weightedTotal,
    profile: getProfileType(rawTotal)
  };
}
```

### 4.3 Categorias de Perfil

```javascript
function getProfileType(total) {
  if (total <= 15) return {
    name: 'alert',
    label: 'Família em Alerta',
    color: 'red',
    message: 'Mudanças urgentes são necessárias para fortalecer vínculos'
  };

  if (total <= 25) return {
    name: 'building',
    label: 'Família em Construção',
    color: 'yellow',
    message: 'Base existe, precisa fortalecer conexões'
  };

  if (total <= 35) return {
    name: 'engaged',
    label: 'Família Engajada',
    color: 'green',
    message: 'Bom caminho, refinamentos possíveis'
  };

  return {
    name: 'connected',
    label: 'Família Conectada',
    color: 'blue',
    message: 'Excelente! Mantenha e inspire outros'
  };
}
```

### 4.4 Identificação de Oportunidade

```javascript
function getTopOpportunity(scores) {
  const percentages = {};

  Object.keys(scores).forEach(dim => {
    percentages[dim] = (scores[dim] / dimensions[dim].maxPoints) * 100;
  });

  // Encontrar dimensão com menor %
  const sorted = Object.entries(percentages)
    .sort((a, b) => a[1] - b[1]);

  const [lowestDim, lowestPercent] = sorted[0];

  return {
    dimension: lowestDim,
    currentPercent: lowestPercent,
    suggestedAction: getActionForDimension(lowestDim),
    expectedImpact: calculateExpectedImpact(lowestDim, lowestPercent)
  };
}

function getActionForDimension(dimension) {
  const actions = {
    presence: 'Adicionar 2 refeições familiares por semana',
    quality: 'Criar zona livre de telas durante refeições',
    consistency: 'Estabelecer 1 ritual semanal inegociável',
    digital: 'Implementar regra de sem celular no quarto à noite'
  };

  return actions[dimension];
}
```

---

## 6. Contador de Momentos de Conexão

### 6.1 Conceito e Objetivos

O Contador de Momentos de Conexão é um tracker semanal gamificado que registra interações significativas entre pais e filhos. Baseado em pesquisas sobre formação de hábitos e reforço positivo.

| Conceito | Definição | Fonte |
|----------|-----------|-------|
| Momento de Conexão | Interação presencial de qualidade ≥5 minutos | Adaptado de Gottman Institute |
| Frequência ideal | 20+ momentos/semana | Estimativa baseada em estudos de vínculo |
| Impacto de consistência | 66 dias para formar hábito | Lally et al., 2010 (UCL) |

### 6.2 Sistema de Tracking

#### Categorias de Momentos
```javascript
const momentCategories = {
  conversation: {
    label: 'Conversa Significativa',
    minDuration: 5,  // minutos
    weight: 1.4,
    examples: ['Perguntar sobre o dia', 'Discutir sentimentos', 'Planejar juntos']
  },
  play: {
    label: 'Brincadeira/Jogo',
    minDuration: 10,
    weight: 1.3,
    examples: ['Jogo de tabuleiro', 'Esporte', 'Brincadeira livre']
  },
  meal: {
    label: 'Refeição Juntos',
    minDuration: 15,
    weight: 1.2,
    examples: ['Jantar em família', 'Café da manhã', 'Lanche compartilhado']
  },
  learning: {
    label: 'Momento de Aprendizado',
    minDuration: 10,
    weight: 1.5,
    examples: ['Leitura', 'Dever de casa', 'Ensinar habilidade nova']
  },
  outdoor: {
    label: 'Atividade ao Ar Livre',
    minDuration: 15,
    weight: 1.3,
    examples: ['Caminhada', 'Parque', 'Passeio de bicicleta']
  },
  routine: {
    label: 'Ritual de Rotina',
    minDuration: 5,
    weight: 1.0,
    examples: ['História antes de dormir', 'Café da manhã junto', 'Oração/meditação']
  }
};
```

### 6.3 Cálculo de Pontuação Semanal

```javascript
function calculateWeeklyScore(moments) {
  let totalPoints = 0;
  let uniqueCategories = new Set();

  moments.forEach(moment => {
    const category = momentCategories[moment.type];
    const basePoints = moment.duration >= category.minDuration ? 1 : 0.5;
    const weightedPoints = basePoints * category.weight;
    totalPoints += weightedPoints;
    uniqueCategories.add(moment.type);
  });

  // Bônus por variedade
  const varietyBonus = uniqueCategories.size >= 4 ? 1.2 : 1.0;

  return {
    rawPoints: totalPoints,
    finalScore: totalPoints * varietyBonus,
    variety: uniqueCategories.size,
    momentsCount: moments.length
  };
}
```

### 6.4 Sistema de Conquistas (Gamificação)

```javascript
const achievements = {
  firstWeek: {
    name: 'Primeiro Passo',
    description: 'Complete sua primeira semana de tracking',
    condition: (stats) => stats.weeksTracked >= 1,
    points: 10
  },
  consistency7: {
    name: 'Semana Conectada',
    description: 'Registre ao menos 1 momento por dia durante 7 dias',
    condition: (stats) => stats.consecutiveDays >= 7,
    points: 25
  },
  variety: {
    name: 'Família Diversificada',
    description: 'Registre momentos em 5+ categorias diferentes na semana',
    condition: (stats) => stats.categoriesThisWeek >= 5,
    points: 20
  },
  habit21: {
    name: 'Construtor de Hábitos',
    description: 'Mantenha tracking por 21 dias consecutivos',
    condition: (stats) => stats.consecutiveDays >= 21,
    points: 50
  },
  habit66: {
    name: 'Hábito Consolidado',
    description: 'Mantenha tracking por 66 dias consecutivos',
    condition: (stats) => stats.consecutiveDays >= 66,
    points: 100
  },
  quality20: {
    name: 'Família Conectada',
    description: 'Alcance 20+ momentos de qualidade em uma semana',
    condition: (stats) => stats.momentsThisWeek >= 20,
    points: 30
  }
};
```

### 6.5 Benchmarks e Níveis

| Nível | Momentos/Semana | Descrição |
|-------|-----------------|-----------|
| Iniciante | 1-5 | Começando a construir hábitos |
| Em Progresso | 6-12 | Desenvolvendo consistência |
| Engajado | 13-19 | Boa frequência de conexão |
| Conectado | 20-30 | Alto nível de presença |
| Modelo | 30+ | Inspiração para outras famílias |

### 6.6 Projeção de Impacto

```javascript
function calculateYearlyImpact(weeklyMoments) {
  const yearlyMoments = weeklyMoments * 52;
  const avgDurationMin = 15; // minutos por momento
  const yearlyHours = (yearlyMoments * avgDurationMin) / 60;

  return {
    totalMoments: yearlyMoments,
    totalHours: yearlyHours,
    equivalentDays: yearlyHours / 24,
    memoryBankEstimate: Math.floor(yearlyMoments * 0.3) // ~30% se tornam memórias significativas
  };
}
```

---

## 7. Referências Científicas

### 7.1 Tempo de Tela

1. **Haidt, J. (2024).** "The Anxious Generation." Penguin Press.
   - Correlação smartphone + redes sociais e saúde mental adolescente

2. **Twenge, J. M., et al. (2019).** "Less in-person social interaction with peers among U.S. adolescents in the 21st century and links to loneliness." *Journal of Social and Personal Relationships*.
   - DOI: 10.1177/0265407519836170

3. **Common Sense Media (2021).** "The Common Sense Census: Media Use by Tweens and Teens."
   - Dados sobre uso médio de telas por faixa etária

4. **CDC (2023).** "Youth Risk Behavior Survey."
   - Aumento de ansiedade e depressão em adolescentes (2011-2021)

### 7.2 Refeições em Família

1. **Hammons, A. J., & Fiese, B. H. (2011).** "Is frequency of shared family meals related to the nutritional health of children and adolescents?" *Pediatrics*, 127(6), e1565-e1574.
   - DOI: 10.1542/peds.2010-1440
   - Meta-análise: refeições familiares e saúde nutricional

2. **Eisenberg, M. E., et al. (2004).** "Family meals and substance use: Is there a long-term protective association?" *Journal of Adolescent Health*, 35(3), 179-183.
   - Correlação refeições e prevenção de uso de substâncias

3. **CASA Columbia (2011).** "The Importance of Family Dinners VIII."
   - Dados sobre impacto em saúde mental e comportamento

### 7.3 Tempo Familiar e Parentalidade

1. **Pew Research Center (2021).** "Parenting Children in the Age of Screens."
   - Dados sobre tempo médio que pais passam com filhos por faixa etária
   - Tendências de 2010-2020

2. **Abbott, L. (2019).** "Time Spent Together: The Role of Family Activities in Adolescent Well-being." *Journal of Family Psychology*.
   - Impacto de 6+ horas/semana em notas e comportamento

3. **Milkie, M. A., et al. (2015).** "Does the Amount of Time Mothers Spend With Children or Adolescents Matter?" *Journal of Marriage and Family*, 77(2), 355-372.
   - Qualidade vs quantidade de tempo parental

4. **Gottman Institute (2020).** "The Magic of Everyday Moments."
   - Pesquisa sobre momentos de conexão e formação de vínculo

### 7.4 ROI Social e Custos

1. **Foster, E. M., & Jones, D. (2009).** "Can prevention trials benefit from including economic evaluations?" *Clinical Trials*, 6(2), 91-96.
   - DOI: 10.1177/1740774509102560
   - Custos de transtornos de conduta

2. **Insel, T. R. (2008).** "Assessing the economic costs of serious mental illness." *American Journal of Psychiatry*, 165(6), 663-665.
   - Custos econômicos de transtornos mentais

3. **Belfield, C., et al. (2006).** "The High/Scope Perry Preschool Program: Cost–benefit analysis using data from the age-40 followup." *Journal of Human Resources*, 41(1), 162-190.
   - ROI de intervenções preventivas early childhood

### 7.5 Bases de Dados Consultadas

- **PubMed Central / NCBI** - Artigos peer-reviewed
- **Google Scholar** - Literatura acadêmica ampla
- **CDC YRBS** - Youth Risk Behavior Surveillance
- **WHO Digital Health** - Recomendações de tempo de tela
- **SAMHSA** - Substance Abuse and Mental Health Services
- **Kaiser Family Foundation** - Dados sobre mídia e saúde

---

## 8. Disclaimers Importantes

### 8.1 Limitações Científicas

⚠️ **IMPORTANTE**:

1. **Correlação ≠ Causação**: Muitos estudos mostram correlação, não causalidade. Fatores confundidores (renda, educação dos pais, etc.) podem influenciar.

2. **Effect Sizes**: São médias populacionais. Resultados individuais variam significativamente.

3. **Contexto Cultural**: Maioria dos estudos é dos EUA/Europa. Aplicabilidade ao Brasil precisa ser validada.

4. **Evolução da Ciência**: Dados de 2015-2025. Novas pesquisas podem alterar conclusões.

### 8.2 Disclaimer para Usuários

**Texto sugerido para o site:**

> "As calculadoras do FamilyTalks.org são baseadas em pesquisas científicas peer-reviewed, mas os resultados são **estimativas educacionais**, não diagnósticos médicos ou psicológicos. Cada família é única, e resultados individuais podem variar. Para questões de saúde mental ou desenvolvimento infantil, consulte sempre um profissional qualificado. Os valores de ROI social são projeções baseadas em estudos populacionais e não garantem resultados específicos."

### 8.3 Fórmulas a Validar com Especialistas

Antes do lançamento, as seguintes fórmulas devem ser revisadas por:
- 2-3 psicólogos infantis/familiares
- 1 pesquisador em desenvolvimento infantil
- 1 economista (para ROI Social)

**Áreas críticas**:
- Multiplicadores de risco (tempo de tela)
- Pesos de atividades (ROI social)
- Benchmarks de tempo familiar por idade
- Sistema de pontuação do Quiz de Parentalidade

---

## 9. Próximos Passos

1. [ ] Validar fórmulas com 3+ especialistas
2. [ ] Buscar dados brasileiros equivalentes (IBGE, Fiocruz, USP)
3. [ ] Implementar fórmulas em TypeScript com testes unitários
4. [ ] Criar suite de testes com casos edge
5. [ ] Documentar todas as fontes no código

---

**Este documento deve ser mantido atualizado conforme novas pesquisas são publicadas.**

Última revisão: 22 de janeiro de 2026

