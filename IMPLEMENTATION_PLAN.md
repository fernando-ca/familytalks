# Plano de Implementação - Calculadoras FamilyTalks.org

**Versão**: 1.0
**Data**: 21 de janeiro de 2026
**Status**: Planejamento

---

## Índice

1. [Visão Geral](#1-visão-geral)
2. [Estrutura de Fases](#2-estrutura-de-fases)
3. [Fase 0: Preparação](#3-fase-0-preparação-semanas-1-2)
4. [Fase 1: MVP](#4-fase-1-mvp-semanas-3-10)
5. [Fase 2: Expansão](#5-fase-2-expansão-semanas-11-18)
6. [Fase 3: Impacto Sistêmico](#6-fase-3-impacto-sistêmico-semanas-19-30)
7. [Recursos Necessários](#7-recursos-necessários)
8. [Gestão de Riscos](#8-gestão-de-riscos)
9. [Critérios de Sucesso](#9-critérios-de-sucesso)
10. [Roadmap Visual](#10-roadmap-visual)

---

## 1. Visão Geral

### 1.1 Objetivo do Plano

Este documento detalha a implementação completa do projeto de calculadoras interativas do FamilyTalks.org, desde o setup inicial até o lançamento de todas as funcionalidades planejadas.

### 1.2 Filosofia de Desenvolvimento

- **Iterativo e incremental**: Lançar funcionalidades de forma progressiva
- **Feedback-driven**: Validar com usuários reais em cada fase
- **Quality-first**: Nunca sacrificar qualidade por velocidade
- **User-centric**: Decisões técnicas guiadas por valor ao usuário

### 1.3 Timeline Geral

```
Fase 0: Preparação        ▓▓                    (2 semanas)
Fase 1: MVP              ░░▓▓▓▓▓▓▓▓             (8 semanas)
Fase 2: Expansão         ░░░░░░░░░░▓▓▓▓▓▓▓▓     (8 semanas)
Fase 3: Impacto          ░░░░░░░░░░░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓ (12 semanas)
                         |-------|-------|-------|
                         Mês 1   Mês 2   Mês 3   Mês 4-7
```

**Total**: ~7 meses (30 semanas)

### 1.4 Estratégia de Lançamento

- **Soft launch** (fim da Fase 1): 50-100 beta testers
- **Public launch** (fim da Fase 2): Marketing ativo, meta de 1000 usuários
- **Scale** (Fase 3): Parcerias, advocacy, expansão

---

## 2. Estrutura de Fases

### Fase 0: Preparação (Semanas 1-2)
**Objetivo**: Estabelecer fundações técnicas e validar conceitos

**Entregáveis**:
- [ ] Ambiente de desenvolvimento configurado
- [ ] Protótipos validados com usuários
- [ ] Fórmulas revisadas por especialistas
- [ ] Time alinhado e treinado

### Fase 1: MVP (Semanas 3-10)
**Objetivo**: Lançar versão mínima viável com funcionalidades core

**Entregáveis**:
- [ ] **Calculadora de Tempo Familiar**
- [ ] **Calculadora de Impacto do Tempo de Tela**
- [ ] Autenticação (NextAuth.js)
- [ ] Landing page
- [ ] Deploy no Vercel
- [ ] 50-100 beta testers ativos

### Fase 2: Expansão (Semanas 11-18)
**Objetivo**: Adicionar calculadoras complementares e melhorar engajamento

**Entregáveis**:
- [ ] **Calculadora de Refeições em Família**
- [ ] **Quiz: Estilo de Parentalidade**
- [ ] **Contador de Momentos de Conexão**
- [ ] Dashboard consolidado
- [ ] Sistema de conquistas
- [ ] 500-1000 usuários ativos

### Fase 3: Impacto Sistêmico (Semanas 19-30)
**Objetivo**: Ferramentas de mudança social e escala

**Entregáveis**:
- [ ] **Calculadora de ROI Social da Parentalidade**
- [ ] Ferramentas de advocacy (PDFs, templates)
- [ ] API pública para pesquisadores
- [ ] Parcerias com escolas/ONGs
- [ ] Relatórios mensais por email
- [ ] 2000+ usuários, impacto mensurável

---

## 3. Fase 0: Preparação (Semanas 1-2)

### 3.1 Setup do Projeto

#### Semana 1: Infraestrutura Base

**Dia 1-2: Repositório e Ambiente**
```bash
Tasks:
- [x] Criar repositório GitHub
- [ ] Configurar .gitignore, .editorconfig, .prettierrc
- [ ] Instalar Vercel CLI (npm i -g vercel)
- [ ] Configurar VSCode workspace com extensões recomendadas
- [ ] Criar documentação de onboarding para devs

Responsável: Tech Lead
Tempo estimado: 2 dias
```

**Dia 3-5: Next.js Full-Stack Setup**
```bash
Tasks:
- [ ] Criar projeto Next.js 14 + TypeScript (npx create-next-app@latest)
- [ ] Setup TailwindCSS com design tokens
- [ ] Configurar ESLint + Prettier
- [ ] Setup Prisma ORM com Vercel Postgres
- [ ] Configurar NextAuth.js para autenticação
- [ ] Implementar componentes base (Button, Input, Card)
- [ ] Configurar testes com Vitest

Responsável: Full-Stack Dev
Tempo estimado: 3 dias
```

**Dia 6-7: Vercel Deploy**
```bash
Tasks:
- [ ] Conectar repositório GitHub ao Vercel
- [ ] Configurar Vercel Postgres (database)
- [ ] Configurar Vercel KV (cache) - opcional
- [ ] Setup variáveis de ambiente no Vercel
- [ ] Testar deploy de preview e production
- [ ] Configurar Vercel Analytics

Responsável: Tech Lead
Tempo estimado: 2 dias
```

**Dia 8-10: CI/CD e Qualidade**
```bash
Tasks:
- [ ] Configurar GitHub Actions para CI (lint, test)
- [ ] Vercel já faz deploy automático (integrado)
- [ ] Setup Sentry para error tracking
- [ ] Configurar Vercel Speed Insights
- [ ] Criar runbook para rollback via Vercel

Responsável: Tech Lead
Tempo estimado: 3 dias
```

#### Semana 2: Validação e Preparação

**Dia 1-3: Protótipos e Design**
```bash
Tasks:
- [ ] Criar wireframes de todas as calculadoras no Figma
- [ ] Validar fluxo de usuário com 5-10 pessoas
- [ ] Finalizar design system (cores, tipografia, componentes)
- [ ] Criar protótipos clicáveis das 3 calculadoras MVP
- [ ] Documentar padrões de UI/UX

Responsável: UI/UX Designer
Tempo estimado: 3 dias
```

**Dia 4-5: Validação Científica**
```bash
Tasks:
- [ ] Revisar fórmulas de cálculo com 2-3 pesquisadores
- [ ] Obter feedback sobre credibilidade dos resultados
- [ ] Ajustar fórmulas se necessário
- [ ] Documentar bases científicas de cada cálculo
- [ ] Preparar disclaimers e textos legais

Responsável: Product Owner + Consultores
Tempo estimado: 2 dias
```

**Dia 6-7: Planejamento de Sprint**
```bash
Tasks:
- [ ] Criar backlog detalhado no GitHub Projects
- [ ] Definir DoD (Definition of Done) para cada tipo de task
- [ ] Planejar Sprints 1-4 (Fase 1)
- [ ] Estabelecer rituais ágeis (daily, review, retro)
- [ ] Alinhar expectativas e disponibilidade do time

Responsável: Product Owner + Tech Lead
Tempo estimado: 2 dias
```

### 3.2 Checklist de Conclusão da Fase 0

- [ ] Código base rodando localmente para todos os devs
- [ ] CI/CD pipeline testado e funcional
- [ ] Design system aprovado
- [ ] Fórmulas validadas por especialistas
- [ ] Backlog priorizado
- [ ] Time alinhado e motivado

**Critério de passagem**: Conseguir criar um componente de exemplo, fazer deploy e visualizar em staging.

---

## 4. Fase 1: MVP (Semanas 3-10)

### 4.1 Sprint 1 (Semana 3-4): Autenticação e Landing

**Objetivo**: Permitir que usuários se cadastrem e conheçam o projeto

#### Backend Tasks
```typescript
Sprint 1 - Backend
├── [4h] Implementar registro de usuário (POST /api/auth/register)
├── [4h] Implementar login (POST /api/auth/login)
├── [3h] Implementar refresh token
├── [2h] Middleware de autenticação
├── [3h] Validação de inputs com Joi
├── [4h] Testes unitários e de integração (80%+ coverage)
└── [2h] Documentação de API

Total: ~22 horas (1 dev, 1.5 semanas)
```

#### Frontend Tasks
```typescript
Sprint 1 - Frontend
├── [6h] Landing page (Hero, Features, CTA)
├── [4h] Página de registro com validação
├── [4h] Página de login
├── [3h] Proteção de rotas (ProtectedRoute component)
├── [3h] Context de autenticação
├── [2h] Formulários com React Hook Form + Zod
├── [4h] Responsividade (mobile-first)
└── [2h] Testes de componentes

Total: ~28 horas (1 dev, 1.75 semanas)
```

#### Design Tasks
```typescript
Sprint 1 - Design
├── [4h] Ilustrações para landing page
├── [2h] Iconografia
├── [2h] Imagens de social share
└── [2h] Animações de transição (Framer Motion)

Total: ~10 horas
```

**Entregável**: Usuários podem se cadastrar, fazer login e ver a landing page.

### 4.2 Sprint 2 (Semana 5-6): Calculadora de Tempo Familiar

**Objetivo**: Primeira calculadora - mensura tempo de qualidade com filhos

#### Full-Stack Tasks (Next.js)
```typescript
Sprint 2 - Calculadora de Tempo Familiar
├── [6h] Implementar lógica de cálculo (lib/calculations/tempoFamiliar.ts)
├── [3h] Testes unitários das fórmulas (100% coverage)
├── [4h] API Route POST /api/calculators/tempo-familiar
├── [3h] Salvar resultados no banco (Prisma)
├── [8h] Formulário de input (horas/dia, idades, atividades)
├── [10h] Painel de resultados
│   ├── Summary (média diária, comparação nacional)
│   ├── Memory Bank (projeção até os 18 anos)
│   ├── Activity Breakdown
│   └── Suggestions
├── [4h] Gráficos comparativos (Chart.js)
├── [3h] Animações de transição
├── [2h] Loading states e error handling
└── [4h] Testes de integração

Total: ~47 horas (2 semanas)
```

**Entregável**: Calculadora de Tempo Familiar completamente funcional.

**Validação**: 10 usuários teste devem conseguir completar o fluxo.

### 4.3 Sprint 3 (Semana 7-8): Calculadora de Impacto do Tempo de Tela

**Objetivo**: Segunda calculadora - baseada no "Anxious Generation"

#### Full-Stack Tasks (Next.js)
```typescript
Sprint 3 - Calculadora de Tempo de Tela
├── [6h] Implementar lógica de cálculo (lib/calculations/tempoTela.ts)
├── [3h] Testes unitários das fórmulas
├── [4h] API Route POST /api/calculators/tempo-tela
├── [8h] Formulário de input (horas, idade, tipo de uso)
├── [12h] Painel de resultados
│   ├── Risk Analysis (gráfico de risco)
│   ├── Comparison to Recommendations
│   ├── Opportunity Cost
│   └── Action Plan (redução gradual)
├── [4h] Gráficos de risco (Chart.js)
├── [3h] Referências científicas (Haidt)
└── [4h] Testes

Total: ~44 horas (2 semanas)
```

**Entregável**: Calculadora de Tempo de Tela funcional.

### 4.4 Sprint 4 (Semana 9-10): Polish e Beta Testing

**Objetivo**: Preparar para beta e refinar as duas calculadoras

#### Tasks
```typescript
Sprint 4 - Polish e Beta Prep
├── [8h] Dashboard principal (overview das 2 calculadoras)
├── [4h] Navegação e UX
├── [4h] Perfil de usuário
├── [6h] Refinamentos de UX baseados em feedback interno
├── [4h] Otimizações de performance (Vercel)
├── [4h] Acessibilidade (keyboard navigation, ARIA)
├── [8h] Recrutamento de 50 beta testers
├── [16h] Correção de bugs identificados
├── [4h] Setup de analytics (Vercel Analytics)
└── [4h] Preparação para soft launch

Total: ~48 horas (distribuído entre o time)
```

**Entregável**: Aplicação estável, testada por 50+ usuários.

### 4.7 Checklist de Conclusão da Fase 1 (MVP)

**Funcionalidades**:
- [ ] Usuários podem se registrar e fazer login
- [ ] Calculadora de Tempo de Tela funcional
- [ ] Quiz de Perfil funcional
- [ ] Tracker Semanal funcional
- [ ] Dashboard consolidado
- [ ] Todos os resultados salvos no banco

**Qualidade**:
- [ ] Cobertura de testes > 70%
- [ ] Performance: LCP < 3s
- [ ] Zero bugs críticos
- [ ] Acessibilidade básica (keyboard nav, contrast)

**Validação**:
- [ ] 50 beta testers cadastrados
- [ ] Taxa de conclusão de calculadora > 70%
- [ ] NPS ou satisfação > 7/10
- [ ] Feedback qualitativo positivo

**Critério de passagem**: 80% dos beta testers conseguem usar todas as funcionalidades sem ajuda.

---

## 5. Fase 2: Expansão (Semanas 11-18)

### 5.1 Sprint 5 (Semana 11-12): Calculadora de Refeições em Família

**Objetivo**: Terceira calculadora - fatores de proteção das refeições

#### Full-Stack Tasks (Next.js)
```typescript
Sprint 5 - Calculadora de Refeições em Família
├── [6h] Implementar lógica de cálculo (lib/calculations/refeicoes.ts)
├── [3h] Testes unitários
├── [4h] API Route POST /api/calculators/refeicoes
├── [8h] Formulário de input (refeições/semana)
├── [12h] Painel de resultados
│   ├── Current Status
│   ├── Protection Factors (notas, drogas, vocabulário)
│   ├── Impact of +1 Meal
│   └── 21-Day Challenge
├── [4h] Gráficos comparativos
└── [3h] Testes

Total: ~40 horas (2 semanas)
```

**Entregável**: Calculadora de Refeições funcional.

### 5.2 Sprint 6 (Semana 13-14): Quiz: Estilo de Parentalidade

**Objetivo**: Diagnóstico de estilo parental com sugestões baseadas em evidências

#### Full-Stack Tasks (Next.js)
```typescript
Sprint 6 - Quiz: Estilo de Parentalidade
├── [4h] Modelo de dados QuizResult
├── [4h] Lógica de scoring e estilos (Baumrind)
├── [4h] API Route POST /api/quiz/submit
├── [10h] UI do quiz (20 perguntas, navegação progressiva)
├── [8h] Painel de resultados
│   ├── Estilo Identificado (4 estilos)
│   ├── Dimensões (warmth, structure, autonomy, involvement)
│   ├── Strengths & Growth Areas
│   └── Action Plan
├── [4h] Radar chart das dimensões
└── [4h] Testes

Total: ~42 horas (2 semanas)
```

**Entregável**: Quiz de Parentalidade funcional.

### 5.3 Sprint 7 (Semana 15-16): Contador de Momentos de Conexão

**Objetivo**: Tracker semanal gamificado para criar hábitos

#### Full-Stack Tasks (Next.js)
```typescript
Sprint 7 - Contador de Momentos de Conexão
├── [4h] Modelo TrackerEntry e Achievement
├── [4h] API Routes (check-in, week, achievements)
├── [6h] Formulário de check-in diário (< 30s)
├── [10h] Visualização semanal/mensal (calendário gamificado)
├── [6h] Sistema de conquistas com animações
├── [4h] Análise de padrões
└── [4h] Testes

Total: ~38 horas (2 semanas)
```

**Entregável**: Contador de Momentos funcional e gamificado.

### 5.4 Sprint 8 (Semana 17): Dashboard e Conquistas

**Objetivo**: Gamificação para aumentar engajamento

#### Backend Tasks
```typescript
Sprint 9 - Backend
├── [6h] Lógica de unlock de achievements
├── [4h] Endpoint GET /api/tracker/achievements/:userId
├── [4h] Sistema de notificações (achievement unlocked)
├── [3h] Testes
└── [2h] Documentação

Total: ~19 horas
```

#### Frontend Tasks
```typescript
Sprint 9 - Frontend
├── [8h] Página de achievements com animações
├── [6h] Toast notifications (achievement unlocked)
├── [4h] Badge system (display em perfil)
├── [4h] Progress bars para próximos milestones
└── [3h] Testes

Total: ~25 horas
```

**Entregável**: Sistema de conquistas completo e integrado.

### 5.4 Sprint 10 (Semana 16): Relatórios Mensais

**Objetivo**: Aumentar retenção com emails automatizados

#### Backend Tasks
```typescript
Sprint 10 - Backend
├── [8h] Cron job para geração de relatórios mensais
├── [6h] Template de email HTML responsivo
├── [4h] Lógica de agregação de dados do mês
├── [4h] Integração com serviço de email (SendGrid/Resend)
├── [3h] Testes
└── [2h] Documentação

Total: ~27 horas
```

#### Frontend Tasks
```typescript
Sprint 10 - Frontend
├── [4h] Página web do relatório mensal
├── [3h] Opção de download em PDF
├── [3h] Configurações de preferências de email
└── [2h] Testes

Total: ~12 horas
```

**Entregável**: Relatórios mensais automatizados por email.

### 5.5 Sprint 11 (Semana 17): Dashboard Avançado

**Objetivo**: Visualização consolidada de todas as métricas

#### Frontend Tasks
```typescript
Sprint 11 - Frontend
├── [12h] Dashboard com overview de todas as calculadoras
├── [8h] Gráficos de evolução ao longo do tempo
├── [6h] Comparação: "Você no início vs. Agora"
├── [4h] Sugestões personalizadas baseadas em dados
└── [3h] Testes

Total: ~33 horas
```

**Entregável**: Dashboard consolidado e insights personalizados.

### 5.6 Sprint 12 (Semana 18): Polish e Public Launch

**Objetivo**: Refinamentos finais e lançamento público

#### Tasks
```typescript
Sprint 12 - Launch Preparation
├── [8h] Refinamentos de UX baseados em feedback beta
├── [6h] Otimizações de SEO (meta tags, sitemap)
├── [4h] Setup de analytics avançado (funnels, cohorts)
├── [6h] Materiais de marketing (blog posts, social media)
├── [4h] Press kit e outreach para mídia
├── [4h] Vídeo demo das calculadoras
├── [4h] Documentação de ajuda (help center)
└── [8h] Testes finais e bug fixes

Total: ~44 horas (distribuído entre o time)
```

**Entregável**: Aplicação pronta para lançamento público.

### 5.7 Checklist de Conclusão da Fase 2

**Funcionalidades (5 das 6 calculadoras)**:
- [ ] Calculadora de Tempo Familiar
- [ ] Calculadora de Impacto do Tempo de Tela
- [ ] Calculadora de Refeições em Família
- [ ] Quiz: Estilo de Parentalidade
- [ ] Contador de Momentos de Conexão
- [ ] Sistema de conquistas funcionando
- [ ] Dashboard consolidado

**Qualidade**:
- [ ] Cobertura de testes > 75%
- [ ] Performance: LCP < 2.5s
- [ ] SEO otimizado
- [ ] Acessibilidade WCAG 2.1 AA

**Tração**:
- [ ] 500+ usuários cadastrados
- [ ] Taxa de retenção (D7) > 30%
- [ ] NPS > 40
- [ ] Presença em mídia (pelo menos 3 artigos/menções)

**Critério de passagem**: 1000 usuários únicos usando pelo menos 2 ferramentas cada.

---

## 6. Fase 3: Impacto Sistêmico (Semanas 19-30)

### 6.1 Sprint 13-14 (Semana 19-20): Calculadora de ROI Social

**Objetivo**: Ferramenta para advocacy e políticas públicas

#### Backend Tasks
```typescript
Sprint 13-14 - Backend
├── [8h] Pesquisa e validação de dados econômicos brasileiros
├── [8h] Implementar lógica de cálculo (socialROICalculations.ts)
├── [4h] Testes unitários
├── [4h] Endpoint POST /api/calculators/social-roi
└── [2h] Documentação

Total: ~26 horas
```

#### Frontend Tasks
```typescript
Sprint 13-14 - Frontend
├── [10h] Formulário de input (10 campos)
├── [16h] Painel de resultados (5 cards)
│   ├── Your Investment
│   ├── Economic Value
│   ├── Community Impact (1000 famílias)
│   ├── Comparison with Alternatives
│   └── Advocacy Tools
├── [8h] Geração de PDFs para advocacy
├── [6h] Templates de cartas personalizáveis
└── [4h] Testes

Total: ~44 horas (2 devs, 2 semanas)
```

**Entregável**: Calculadora de ROI Social com ferramentas de advocacy.

### 6.2 Sprint 15-16 (Semana 21-22): API Pública

**Objetivo**: Permitir que pesquisadores e parceiros usem os dados

#### Backend Tasks
```typescript
Sprint 15-16 - Backend
├── [12h] Design de API pública (GraphQL ou REST)
├── [8h] Autenticação via API keys
├── [6h] Rate limiting e quotas
├── [8h] Documentação completa (OpenAPI/Swagger)
├── [6h] Exemplos de uso em múltiplas linguagens
├── [4h] Dashboard para desenvolvedores (API keys, usage)
└── [4h] Testes de carga

Total: ~48 horas
```

**Entregável**: API pública documentada e acessível.

### 6.3 Sprint 17-18 (Semana 23-24): Parcerias

**Objetivo**: Integração com escolas, clínicas, ONGs

#### Tasks
```typescript
Sprint 17-18 - Partnerships
├── [16h] Desenvolver kit de integração para escolas
├── [12h] Criar dashboard para organizações parceiras
├── [8h] Sistema de white-label (personalização básica)
├── [8h] Materiais de treinamento para parceiros
├── [6h] Onboarding automatizado
└── [4h] Documentação de integração

Total: ~54 horas
```

**Entregável**: Kit completo para organizações parceiras.

### 6.4 Sprint 19-22 (Semana 25-28): App Mobile (Opcional)

**Objetivo**: Expandir acesso via mobile nativo

#### Tasks
```typescript
Sprint 19-22 - Mobile App
├── [16h] Setup React Native + Expo
├── [24h] Adaptar calculadoras para mobile
├── [16h] Implementar tracker com notificações push
├── [12h] Sincronização offline-first
├── [8h] Otimizações de performance
├── [8h] Testes em iOS e Android
└── [8h] Publicação nas stores

Total: ~92 horas (4 semanas, 1-2 devs)
```

**Entregável**: App iOS e Android publicado.

### 6.5 Sprint 23-24 (Semana 29-30): Análise de Impacto

**Objetivo**: Mensurar e comunicar impacto real

#### Tasks
```typescript
Sprint 23-24 - Impact Analysis
├── [12h] Coleta e análise de dados agregados
├── [8h] Criação de relatório de impacto público
├── [8h] Case studies de famílias transformadas
├── [6h] Visualizações de dados (mapas, infográficos)
├── [6h] Artigo científico sobre resultados
└── [4h] Apresentação para stakeholders

Total: ~44 horas
```

**Entregável**: Relatório de impacto público e case studies.

### 6.6 Checklist de Conclusão da Fase 3

**Funcionalidades**:
- [ ] Calculadora de ROI Social com advocacy
- [ ] API pública documentada
- [ ] Kit de parcerias pronto
- [ ] App mobile (se aplicável)

**Impacto**:
- [ ] 2000+ usuários ativos mensais
- [ ] 5+ parcerias ativas (escolas, clínicas, ONGs)
- [ ] Presença em eventos e conferências
- [ ] Impacto mensurável (ex: 10.000 check-ins no tracker)

**Sustentabilidade**:
- [ ] Modelo de receita definido (doações, parcerias, grants)
- [ ] Time estável
- [ ] Roadmap para próximo ano

---

## 7. Recursos Necessários

### 7.1 Time Ideal

| Papel | Alocação | Responsabilidades |
|-------|----------|-------------------|
| **Product Owner** | 50% (20h/sem) | Visão, priorização, stakeholders |
| **Tech Lead** | 100% (40h/sem) | Arquitetura, code review, DevOps |
| **Frontend Developer** | 100% (40h/sem) | React, UI/UX implementation |
| **Backend Developer** | 100% (40h/sem) | APIs, database, cálculos |
| **UI/UX Designer** | 50% (20h/sem) | Design, protótipos, testes de usabilidade |
| **Content Writer** | 25% (10h/sem) | Textos, pesquisa científica, traduções |

**Total**: ~4.25 FTEs

**Alternativa para equipe menor**:
- 1 Full-stack dev (foco em backend) - 100%
- 1 Frontend dev / Designer - 100%
- 1 Product Owner / Content - 50%

**Total mínimo**: ~2.5 FTEs

### 7.2 Budget Estimado (7 meses)

#### Desenvolvimento
- **Time (4.25 FTE x 7 meses)**: R$ 100.000 - R$ 200.000
  - Opção low-cost: Desenvolvedores júnior/voluntários
  - Opção realista: Mix de níveis
  - Opção premium: Desenvolvedores sênior

#### Infraestrutura (Vercel)
| Item | Custo Mensal | Custo 7 Meses |
|------|-------------|---------------|
| Vercel Pro | R$ 100 ($20) | R$ 700 |
| Vercel Postgres | R$ 25 (~$5) | R$ 175 |
| Vercel KV (Redis) | R$ 0 (free tier) | R$ 0 |
| Vercel Analytics | R$ 0 (incluso Pro) | R$ 0 |
| Email service (Resend) | R$ 0 (free tier) | R$ 0 |
| Error tracking (Sentry) | R$ 0 (free tier) | R$ 0 |
| Domain | R$ 80 (anual) | R$ 80 |
| **Total Infraestrutura** | **~R$ 125** | **~R$ 955** |

**Alternativa Gratuita (MVP inicial)**:
- Vercel Hobby: R$ 0/mês
- Supabase Free Tier: R$ 0/mês
- Total: R$ 0 para testes/desenvolvimento

#### Outros
- **Design assets** (ilustrações, ícones): R$ 2.000
- **Consultoria científica** (validação de fórmulas): R$ 3.000
- **Marketing** (soft launch + public launch): R$ 5.000
- **Legal** (termos de uso, privacidade): R$ 2.000
- **Contingência** (15%): R$ 2.000

**Total Estimado**: R$ 115.000 - R$ 215.000
**Mínimo Viável** (equipe reduzida + low-cost infra): R$ 20.000 - R$ 40.000

### 7.3 Ferramentas Necessárias

#### Desenvolvimento
- GitHub (grátis para open source)
- VSCode (grátis)
- Figma (grátis para 1 projeto)
- Postman (grátis)

#### Comunicação
- Slack ou Discord (grátis)
- Google Meet (grátis)
- Notion ou Obsidian (grátis)

#### Gestão de Projeto
- GitHub Projects (grátis)
- Linear (alternativa premium - $8/mês)

**Custo de ferramentas**: ~R$ 0 - R$ 300/mês

---

## 8. Gestão de Riscos

### 8.1 Riscos Técnicos

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| **Fórmulas de cálculo contestadas** | Média | Alto | Validação com 3+ pesquisadores, disclaimers claros, transparência nas fontes |
| **Performance degradada com crescimento** | Média | Médio | Caching agressivo, otimização de queries, load testing antes do launch |
| **Bug crítico em produção** | Baixa | Alto | Code review rigoroso, cobertura de testes >75%, rollback fácil |
| **Incompatibilidade mobile** | Média | Médio | Testes em devices reais desde Sprint 1, design mobile-first |
| **Vazamento de dados** | Baixa | Crítico | Auditoria de segurança, penetration testing, criptografia de dados sensíveis |

### 8.2 Riscos de Produto

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| **Baixa adoção inicial** | Alta | Alto | Beta testing com 50+ usuários, feedback loops, marketing direcionado |
| **Usuários não completam calculadoras** | Média | Alto | UX simples, progress indicators, opção de salvar e continuar depois |
| **Resultados não geram ação** | Média | Alto | Action plans claros, micro-hábitos, gamificação |
| **Concorrência** | Baixa | Médio | Foco em evidências científicas, qualidade, comunidade |
| **Perda de interesse após uso inicial** | Alta | Alto | Tracker diário, notificações, relatórios mensais, sistema de conquistas |

### 8.3 Riscos de Negócio

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| **Budget excedido** | Média | Alto | Controle rigoroso, MVP enxuto, priorização constante |
| **Time desfalcado** | Média | Alto | Documentação clara, onboarding facilitado, código limpo |
| **Expectativas não alinhadas** | Média | Médio | Comunicação frequente, demos semanais, envolvimento de stakeholders |
| **Falta de sustentabilidade financeira** | Alta | Crítico | Explorar grants, doações, parcerias, modelo freemium |

### 8.4 Plano de Contingência

**Se houver atraso significativo (>2 semanas)**:
1. Cortar features não-essenciais (ex: app mobile)
2. Reduzir escopo de calculadoras (menos outputs)
3. Lançar MVP ainda mais enxuto (apenas 2 ferramentas)

**Se houver perda de membro chave do time**:
1. Redistribuir tarefas
2. Contratar freelancer temporário
3. Estender timeline

**Se houver baixa adoção**:
1. Entrevistas com usuários (why not using?)
2. Pivotar messaging/positioning
3. Oferecer workshops presenciais
4. Parcerias com influenciadores de família

---

## 9. Critérios de Sucesso

### 9.1 Métricas de Produto

#### Fase 1 (MVP)
- [ ] 50+ beta testers cadastrados
- [ ] Taxa de conclusão de calculadora > 70%
- [ ] Taxa de retorno (D7) > 30%
- [ ] NPS > 40
- [ ] Tempo médio no site > 5 minutos

#### Fase 2 (Expansão)
- [ ] 500+ usuários cadastrados
- [ ] 50+ usuários ativos diariamente (tracker)
- [ ] Taxa de retenção (D30) > 20%
- [ ] 3+ menções em mídia
- [ ] Crescimento orgânico > 10%/semana

#### Fase 3 (Impacto)
- [ ] 2000+ usuários cadastrados
- [ ] 5+ parcerias ativas
- [ ] 10.000+ check-ins no tracker
- [ ] 100+ downloads de materiais de advocacy
- [ ] Presença em 2+ conferências/eventos

### 9.2 Métricas Técnicas

- [ ] Cobertura de testes > 75%
- [ ] Uptime > 99.5%
- [ ] Performance: LCP < 2.5s (p75)
- [ ] Error rate < 0.5%
- [ ] Core Web Vitals: All green
- [ ] Lighthouse score > 90

### 9.3 Métricas de Impacto Social

- [ ] Redução média de tempo de tela relatada: -30%
- [ ] Aumento de refeições familiares: +2/semana
- [ ] Aumento de leitura compartilhada: +20 minutos/semana
- [ ] Usuários reportam melhoria no vínculo familiar: >70%
- [ ] Famílias mantêm hábitos após 3 meses: >40%

### 9.4 Definição de "Sucesso" do Projeto

O projeto será considerado um sucesso se, após 7 meses:

1. **Produto funciona**: Todas as ferramentas planejadas estão operacionais e estáveis
2. **Pessoas usam**: 1000+ usuários únicos, 200+ ativos mensalmente
3. **Gera valor**: 70%+ dos usuários reportam que as ferramentas os ajudaram
4. **É sustentável**: Modelo de financiamento definido para próximo ano
5. **Tem impacto**: Evidência mensurável de mudança de comportamento

---

## 10. Roadmap Visual

### 10.1 Gantt Simplificado

```
Fase 0: Preparação
  Setup Projeto         ▓▓▓▓▓▓▓▓▓▓
  Protótipos/Validação  ░░░░░▓▓▓▓▓
  Semanas               1        2

Fase 1: MVP
  Sprint 1 (Auth)       ▓▓▓▓▓▓▓▓▓▓
  Sprint 2 (Screen)     ░░░░░▓▓▓▓▓▓▓▓▓▓
  Sprint 3 (Quiz)       ░░░░░░░░░░▓▓▓▓▓
  Sprint 4 (Tracker)    ░░░░░░░░░░░░░░░▓▓▓▓▓
  Sprint 5 (Dashboard)  ░░░░░░░░░░░░░░░░░░░░▓▓▓▓▓
  Sprint 6 (Beta)       ░░░░░░░░░░░░░░░░░░░░░░░░░▓▓▓▓▓
  Semanas               3  4  5  6  7  8  9  10

Fase 2: Expansão
  Sprint 7 (Meals)      ▓▓▓▓▓▓▓▓▓▓
  Sprint 8 (Reading)    ░░░░░▓▓▓▓▓▓▓▓▓▓
  Sprint 9 (Achiev.)    ░░░░░░░░░░▓▓▓▓▓
  Sprint 10 (Reports)   ░░░░░░░░░░░░░░░▓▓▓▓▓
  Sprint 11 (Dash)      ░░░░░░░░░░░░░░░░░░░░▓▓▓▓▓
  Sprint 12 (Launch)    ░░░░░░░░░░░░░░░░░░░░░░░░░▓▓▓▓▓
  Semanas               11 12 13 14 15 16 17 18

Fase 3: Impacto
  Sprint 13-14 (ROI)    ▓▓▓▓▓▓▓▓▓▓
  Sprint 15-16 (API)    ░░░░░▓▓▓▓▓▓▓▓▓▓
  Sprint 17-18 (Partner)░░░░░░░░░░▓▓▓▓▓▓▓▓▓▓
  Sprint 19-22 (Mobile) ░░░░░░░░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
  Sprint 23-24 (Impact) ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓▓▓▓▓▓▓▓▓
  Semanas               19 20 21 22 23 24 25 26 27 28 29 30
```

### 10.2 Milestones Chave

```
┌─────────────────────────────────────────────────────────────┐
│  M1: Dev Setup Complete        Semana 2   ✓                 │
│  M2: Soft Launch (Beta)        Semana 10  ○                 │
│  M3: Public Launch             Semana 18  ○                 │
│  M4: 1000 Usuários             Semana 22  ○                 │
│  M5: Primeiras Parcerias       Semana 26  ○                 │
│  M6: Relatório de Impacto      Semana 30  ○                 │
└─────────────────────────────────────────────────────────────┘
```

### 10.3 Dependências Críticas

```
Calculadora Screen Time
  ↓
Tracker Semanal (precisa de base de dados)
  ↓
Sistema de Conquistas (precisa de tracker)
  ↓
Relatórios Mensais (precisa de dados históricos)

---

Calculadora Meals + Reading
  ↓
Dashboard Consolidado (precisa de múltiplas fontes)

---

API Pública
  ↓
Parcerias (dependem de API para integração)
```

---

## 11. Próximos Passos Imediatos

### Semana 1 (Imediato)
1. [ ] Revisar e aprovar este plano com stakeholders
2. [ ] Confirmar disponibilidade do time
3. [ ] Criar repositório GitHub
4. [ ] Setup Next.js + Vercel (npx create-next-app@latest)
5. [ ] Conectar repo ao Vercel para deploy automático
6. [ ] Agendar kick-off meeting

### Semana 2
7. [ ] Configurar Vercel Postgres
8. [ ] Setup NextAuth.js
9. [ ] Validar protótipos com 5-10 usuários
10. [ ] Validar fórmulas com pesquisadores
11. [ ] Planejar Sprint 1 em detalhes
12. [ ] Go/No-Go decision para iniciar desenvolvimento

---

## 12. Conclusão

Este plano de implementação fornece um roadmap claro e acionável para construir as calculadoras interativas do FamilyTalks.org em 7 meses.

**Princípios orientadores**:
- **Iterativo**: Lançar funcionalidades progressivamente
- **Validado**: Testar com usuários reais em cada fase
- **Sustentável**: Não queimar o time, manter qualidade
- **Focado em impacto**: Cada feature deve gerar valor mensurável

**Fatores críticos de sucesso**:
1. Time estável e motivado
2. Feedback loops constantes com usuários
3. Qualidade nunca sacrificada por velocidade
4. Comunicação transparente com stakeholders

**Estamos prontos para começar!** 🚀

---

**Documento vivo**: Este plano será revisado e ajustado ao final de cada sprint, mantendo sempre o foco em valor e impacto.

