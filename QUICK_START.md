# Guia de Início Rápido - FamilyTalks.org

**Versão**: 1.1
**Data**: 22 de janeiro de 2026
**Propósito**: Onboarding rápido do time e início do projeto

---

## Para o Product Owner / Stakeholders

### Checklist de Aprovação (Semana 1)

- [ ] **Ler [README.md](./README.md)** - Visão geral do projeto
- [ ] **Revisar [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md)** - Timeline e fases
- [ ] **Aprovar escopo do MVP** (Fase 1)
- [ ] **Confirmar budget** (ver seção 7.2 do plano)
- [ ] **Aprovar stack tecnológica** (ver seção 2.2 das specs)
- [ ] **Validar fórmulas científicas** com especialistas
- [ ] **Definir modelo de financiamento**
- [ ] **Confirmar disponibilidade do time**

### Decisões Críticas a Tomar

1. **Open Source ou Proprietário?**
   - Open source = mais contribuições, transparência
   - Proprietário = controle, monetização

2. **Modelo de Receita**
   - Totalmente gratuito (buscar grants/doações)
   - Freemium (funcionalidades básicas grátis)
   - Parcerias B2B (escolas, empresas)

3. **Priorização de Features**
   - MVP atual: Tempo Familiar + Tempo de Tela
   - Alternativa: Apenas 1 calculadora + landing page

4. **Timeline**
   - Agressiva: 5 meses (risco alto)
   - Recomendada: 7 meses
   - Conservadora: 10 meses

---

## Para o Tech Lead

### Checklist de Setup (Semana 1-2)

#### Dia 1-2: Infraestrutura

- [ ] Criar organização no GitHub
- [ ] Criar repositório principal (público ou privado?)
- [ ] Setup branch protection rules (main, develop)
- [ ] Configurar .gitignore, .editorconfig
- [ ] Criar estrutura de pastas (ver seção 2.3 das specs)
- [ ] Criar conta Vercel e linkar ao GitHub
- [ ] Setup Vercel Postgres (database)
- [ ] Setup Vercel KV (Redis - opcional para MVP)

#### Dia 3-5: Setup Next.js (Full-Stack)

- [ ] Criar projeto Next.js 14 com App Router
  ```bash
  npx create-next-app@latest familytalks --typescript --tailwind --eslint --app --src-dir
  cd familytalks
  ```
- [ ] Instalar dependências principais
  ```bash
  npm install @prisma/client next-auth zod
  npm install react-hook-form @tanstack/react-query
  npm install chart.js react-chartjs-2 framer-motion
  npm install -D prisma @types/node
  ```
- [ ] Configurar TailwindCSS (já incluído no create-next-app)
- [ ] Setup ESLint + Prettier
- [ ] Criar componentes base (Button, Input, Card)

#### Dia 6-7: Setup Prisma + API Routes

- [ ] Inicializar Prisma
  ```bash
  npx prisma init
  ```
- [ ] Configurar conexão com Vercel Postgres
  ```env
  # .env (local) ou Vercel Environment Variables
  DATABASE_URL="postgres://..."
  ```
- [ ] Criar schema inicial (ver seção 4.1 das specs)
- [ ] Criar API Routes em `src/app/api/`
- [ ] Setup NextAuth.js para autenticação
- [ ] Setup testes (Jest + React Testing Library)

#### Dia 8-10: DevOps (Vercel)

- [ ] Conectar repositório ao Vercel
  ```bash
  # Instalar Vercel CLI
  npm i -g vercel

  # Login
  vercel login

  # Linkar projeto
  vercel link
  ```
- [ ] Configurar GitHub Actions para CI
  ```yaml
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
        - run: npm test
        - run: npm run build
  ```
- [ ] Setup ambientes no Vercel
  - Preview: deploy automático em PRs
  - Production: deploy em merge para main
- [ ] Configurar variáveis de ambiente no Vercel
  - DATABASE_URL (Vercel Postgres)
  - NEXTAUTH_SECRET
  - NEXTAUTH_URL
- [ ] Setup Sentry para error tracking
- [ ] Configurar domínio customizado (quando disponível)

### Decisões Arquiteturais

**Decisões já tomadas (Next.js + Vercel)**:

1. **Arquitetura**: Full-stack Next.js 14 com App Router
   - Benefício: Frontend e API no mesmo projeto
   - Benefício: Deploy simplificado no Vercel

2. **API**: REST via API Routes do Next.js
   - Endpoints em `src/app/api/`
   - Serverless functions automáticas

3. **State Management**
   - React Query para server state
   - Context API para auth/theme

4. **Testes E2E**
   - MVP: Jest + React Testing Library
   - Fase 2: Playwright para E2E completo

5. **Database**: Vercel Postgres + Prisma ORM

---

## Para Desenvolvedores

### Ambiente de Desenvolvimento

#### Pré-requisitos

```bash
# Versões necessárias
node -v   # v20+
npm -v    # v10+
git -v    # v2.40+
vercel -v # v33+ (Vercel CLI)
```

#### Setup Local (quando código estiver disponível)

```bash
# 1. Clonar repo
git clone https://github.com/familytalks/calculadoras.git
cd calculadoras

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env.local
# Editar .env.local com suas credenciais:
# - DATABASE_URL (Vercel Postgres ou local)
# - NEXTAUTH_SECRET
# - NEXTAUTH_URL=http://localhost:3000

# 4. Setup do banco de dados
npx prisma generate
npx prisma db push    # Criar tabelas
npx prisma db seed    # Dados iniciais (se houver)

# 5. Iniciar servidor de desenvolvimento
npm run dev
# ou usando Vercel CLI para simular ambiente de produção
vercel dev

# 6. Acessar
# http://localhost:3000
```

### Padrões de Código

#### Commit Messages (Conventional Commits)

```bash
# Formato
<type>(<scope>): <subject>

# Exemplos
feat(calculator): add family time calculator
feat(calculator): add screen time impact calculator
fix(auth): resolve token refresh issue
docs(readme): update setup instructions
test(meals): add unit tests for meal calculations
refactor(tracker): simplify connection moments tracking
```

**Types**: feat, fix, docs, test, refactor, style, chore

#### Naming Conventions

**Componentes (Next.js)**:
```typescript
// Componentes: PascalCase
export function FamilyTimeCalculator() {}
export function ScreenTimeCalculator() {}

// Funções: camelCase
export function calculateFamilyTime() {}

// Constantes: UPPER_SNAKE_CASE
export const MAX_SCREEN_TIME = 12;

// Hooks: camelCase com prefixo 'use'
export function useCalculator() {}
```

**API Routes (Next.js)**:
```typescript
// Arquivos: route.ts dentro de pastas nomeadas
// src/app/api/calculators/family-time/route.ts
// src/app/api/calculators/screen-time/route.ts

// Handlers: GET, POST, PUT, DELETE
export async function POST(request: Request) {}

// Services: kebab-case
// src/lib/services/family-time.service.ts
export class FamilyTimeService {}
```

#### Estrutura de Arquivos

**Componente React (Next.js App Router)**:
```typescript
// src/app/calculadoras/tempo-familiar/page.tsx
'use client';

import { useState } from 'react';
import { useCalculator } from '@/hooks/useCalculator';
import { Button, Input } from '@/components/ui';

export default function FamilyTimePage() {
  // 1. Hooks
  // 2. State
  // 3. Effects
  // 4. Handlers
  // 5. Render
}
```

**API Route (Next.js)**:
```typescript
// src/app/api/calculators/family-time/route.ts
import { NextResponse } from 'next/server';
import { FamilyTimeService } from '@/lib/services/family-time.service';

export async function POST(request: Request) {
  const data = await request.json();
  const result = FamilyTimeService.calculate(data);
  return NextResponse.json(result);
}
```

**Service**:
```typescript
// src/lib/services/family-time.service.ts
export class FamilyTimeService {
  static calculate(input: FamilyTimeInput) {
    // 1. Validate input
    // 2. Calculate metrics
    // 3. Return results
  }
}
```

### Workflow de Desenvolvimento

1. **Pegar task do GitHub Projects**
2. **Criar branch**
   ```bash
   git checkout -b feat/calculator-family-time
   # ou
   git checkout -b feat/calculator-screen-time
   ```
3. **Desenvolver com TDD** (quando aplicável)
   ```bash
   # Escrever teste primeiro
   npm run test:watch
   # Desenvolver até passar
   # Refatorar
   ```
4. **Commit incremental**
   ```bash
   git add .
   git commit -m "feat(calculator): add input form"
   ```
5. **Push e PR**
   ```bash
   git push origin feat/calculator-family-time
   # Criar PR no GitHub - Vercel fará deploy de preview automático
   ```
6. **Code review** (pelo menos 1 aprovação)
7. **Merge** (squash preferred)

---

## Para o UI/UX Designer

### Checklist de Design (Semana 1-2)

#### Semana 1: Design System

- [ ] Definir paleta de cores
  - Primary: (sugestão: azul confiança)
  - Secondary: (sugestão: verde esperança)
  - Accent: (sugestão: laranja energia)
  - Neutral: Escala de cinza
  - Semantic: Success, Warning, Error, Info

- [ ] Definir tipografia
  - Font primária: (sugestão: Inter ou Poppins)
  - Font secundária para números: (sugestão: Roboto Mono)
  - Escala: 12, 14, 16, 18, 24, 32, 48, 64px

- [ ] Definir espaçamento
  - Escala: 4, 8, 12, 16, 24, 32, 48, 64, 96px

- [ ] Componentes base no Figma
  - Buttons (Primary, Secondary, Ghost)
  - Inputs (Text, Number, Select, Slider)
  - Cards
  - Progress bars
  - Charts (esboços)

#### Semana 2: Protótipos

- [ ] Wireframes de baixa fidelidade (todas calculadoras)
- [ ] User flow completo (do landing até resultado)
- [ ] Protótipo clicável (pelo menos Screen Time)
- [ ] Validar com 5-10 pessoas
- [ ] Iterar baseado em feedback

### Princípios de Design

1. **Simplicidade**: Cada calculadora deve ter < 10 campos
2. **Clareza**: Resultados devem ser compreensíveis em 30s
3. **Não-julgamento**: Tom de apoio, nunca culpa
4. **Acionável**: Sempre mostrar próximo passo
5. **Acessibilidade**: Contraste 4.5:1, keyboard nav

### Inspirações

- **Visualizações**: [Our World in Data](https://ourworldindata.org/)
- **Calculadoras**: [NerdWallet calculators](https://www.nerdwallet.com/calculator)
- **Tom**: [Headspace](https://www.headspace.com/) (calmo, acolhedor)
- **Gamificação**: [Duolingo](https://www.duolingo.com/) (conquistas, streaks)

---

## Para Content Writer

### Checklist de Conteúdo (Semanas 1-3)

#### Pesquisa Científica (Semana 1)

- [ ] Ler [SCIENTIFIC_FORMULAS.md](./SCIENTIFIC_FORMULAS.md)
- [ ] Validar referências (acessar artigos originais)
- [ ] Buscar estudos brasileiros equivalentes
- [ ] Criar resumos executivos de cada estudo
- [ ] Identificar gaps de evidência

#### Textos das Calculadoras (Semanas 2-3)

Para cada calculadora:

- [ ] **Introdução** (2-3 parágrafos)
  - Por que isso importa
  - O que você vai descobrir
  - Baseado em quais pesquisas

- [ ] **Labels e helpers** de cada campo input
  - Clareza sobre o que preencher
  - Tooltips quando necessário

- [ ] **Resultados** (tom de apoio)
  - Resumo do diagnóstico
  - Interpretação científica simplificada
  - Próximos passos acionáveis

- [ ] **Action plans**
  - Específicos e mensuráveis
  - Realistas (não pedir mudanças radicais)
  - Com micro-hábitos

### Tom de Voz

**Fazer**:
- "Você está no caminho certo"
- "Pequenas mudanças geram grande impacto"
- "Cada família é única"
- "Pesquisas mostram que..."

**Evitar**:
- "Você está falhando"
- "Seu filho está em risco"
- "Você deveria..."
- Linguagem técnica sem explicação

### Exemplo de Texto (Tempo Familiar - Resultado)

```markdown
# Seu Diagnóstico: Família Engajada

## O que isso significa

Com 2.3 horas diárias dedicadas ao seu filho de 8 anos, você está 28% acima
da média nacional para essa faixa etária (1.8h/dia). Isso é excelente!

Seu "banco de memórias" projetado: até os 18 anos, você terá acumulado
aproximadamente 8.400 horas de tempo de qualidade juntos.

## Próximos Passos

Você já está no caminho certo! Para potencializar ainda mais:

**Dica 1**: Adicione 1 atividade de leitura conjunta por semana
**Dica 2**: Proteja o horário do jantar de interrupções digitais
**Dica 3**: Crie 1 tradição semanal única da família
```

### Exemplo de Texto (Tempo de Tela - Resultado)

```markdown
# Seu Diagnóstico: Tempo de Tela Elevado

## O que isso significa

Com 6 horas diárias de tela, seu filho está no percentil 85 do uso nacional.
Pesquisas recentes do psicólogo Jonathan Haidt mostram que jovens com mais de
5h/dia de redes sociais têm o dobro de risco de desenvolver ansiedade e depressão.

Mas aqui está a boa notícia: pequenas reduções já fazem diferença.

## Seu Plano de Ação

Reduzir de 6h para 4h em 4 semanas é uma meta realista e já reduziria o risco
em 35%. Vamos fazer isso juntos?

**Semana 1**: Escolha 1 app para deletar
**Semana 2**: Crie "zona livre de telas" no jantar
**Semana 3**: Estabeleça horário de corte 1h antes de dormir
**Semana 4**: Substitua 30min de tela por atividade em família

Você consegue! Mais de 2.000 famílias já fizeram essa jornada com sucesso.
```

---

## Primeiro Sprint (Semana 3-4)

### Sprint Planning Meeting (Dia 1)

**Agenda** (2 horas):

1. **Alinhamento de visão** (30min)
   - Revisitar objetivos
   - Celebrar conclusão da Fase 0
   - Apresentar backlog priorizado

2. **Definição do Sprint Goal** (15min)
   - "Ao final deste sprint, usuários podem se cadastrar e acessar o sistema"

3. **Seleção de tasks** (45min)
   - Pull tasks do backlog para o sprint
   - Estimar story points (Fibonacci: 1, 2, 3, 5, 8)
   - Atribuir responsáveis

4. **Logística** (30min)
   - Definir horário de daily standup
   - Definir DoD (Definition of Done)
   - Estabelecer canais de comunicação

### Tasks do Sprint 1

**Full-Stack (Next.js)** (30h estimadas):
- [ ] Setup NextAuth.js com providers (5pts)
- [ ] API Route /api/auth/* (3pts)
- [ ] Prisma User model (2pts)
- [ ] Landing page (8pts)
- [ ] Página de registro (5pts)
- [ ] Página de login (5pts)
- [ ] Middleware de auth (2pts)
- [ ] Testes (5pts)

**Design** (10h estimadas):
- [ ] Design system no Figma (5pts)
- [ ] Ilustrações landing (3pts)
- [ ] Iconografia (2pts)

### Daily Standup (15min, mesmo horário todos os dias)

Cada pessoa responde:
1. O que fiz ontem?
2. O que vou fazer hoje?
3. Há algum bloqueio?

**Importante**: Não resolver problemas no standup. Marcar reuniões específicas se necessário.

### Sprint Review (último dia, 1h)

1. **Demo** (30min): Mostrar o que foi construído
2. **Feedback** (20min): Coletar input de stakeholders
3. **Ajuste de backlog** (10min): Repriorizar se necessário

### Sprint Retrospective (após review, 1h)

1. **O que foi bem?**
2. **O que pode melhorar?**
3. **Action items** para próximo sprint

---

## Recursos Úteis

### Documentação

- [Next.js Docs](https://nextjs.org/docs) - Framework principal
- [Vercel Docs](https://vercel.com/docs) - Plataforma de deploy
- [React Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Prisma Docs](https://www.prisma.io/docs)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Chart.js Docs](https://www.chartjs.org/docs/)
- [NextAuth.js Docs](https://next-auth.js.org/) - Autenticação

### Ferramentas

- **Design**: Figma, Excalidraw (wireframes)
- **Gestão**: GitHub Projects, Linear
- **Comunicação**: Slack, Discord
- **Docs colaborativos**: Notion, Google Docs

### Comunidade

- **Dúvidas**: GitHub Discussions
- **Bugs**: GitHub Issues
- **Chat**: Slack #familytalks-dev

---

## Checklist Final Antes de Começar

### Product Owner
- [ ] Aprovação formal do plano
- [ ] Budget confirmado
- [ ] Time confirmado
- [ ] Fórmulas validadas com especialistas

### Tech Lead
- [ ] Repositório criado e linkado ao Vercel
- [ ] CI/CD configurado (GitHub Actions + Vercel)
- [ ] Vercel Postgres configurado
- [ ] Ambientes Vercel criados (Preview, Production)
- [ ] Documentação de setup testada

### Desenvolvedores
- [ ] Ambiente local funcionando
- [ ] Acesso ao repo
- [ ] VSCode configurado
- [ ] Leu padrões de código

### Designer
- [ ] Design system definido
- [ ] Protótipos criados
- [ ] Validação com usuários feita
- [ ] Assets exportados

### Content Writer
- [ ] Pesquisa científica completa
- [ ] Textos da landing page prontos
- [ ] Tom de voz definido
- [ ] FAQs iniciais escritos

---

## Próximos Passos Imediatos

### Esta Semana

1. [ ] **Segunda**: Reunião de kick-off (2h)
   - Apresentar documentação
   - Alinhar expectativas
   - Decidir stack final

2. [ ] **Terça-Quinta**: Fase 0 - Setup técnico
   - Cada pessoa trabalha em seu domínio
   - Check-ins diários de 15min

3. [ ] **Sexta**: Review da Fase 0
   - Validar que tudo funciona
   - Go/No-Go para Sprint 1

### Próxima Semana

4. [ ] **Segunda**: Sprint Planning do Sprint 1
5. [ ] **Terça-Sexta**: Desenvolvimento
6. [ ] **Sexta**: Sprint Review + Retro

---

## Perguntas Frequentes

### "Nunca trabalhei com X tecnologia, consigo contribuir?"

Sim! A documentação está completa e o time vai te ajudar. Reserve tempo para estudar nos primeiros dias.

### "E se eu não conseguir estimar uma task?"

Normal no início. Peça ajuda ao Tech Lead. Com o tempo, as estimativas ficam melhores.

### "Podemos mudar o stack no meio do caminho?"

Possível, mas caro. Qualquer mudança de stack deve ser discutida e aprovada pelo time todo.

### "Como reporto bugs?"

Crie uma issue no GitHub com template:
- **Descrição**: O que aconteceu
- **Esperado**: O que deveria acontecer
- **Passos**: Como reproduzir
- **Screenshots**: Se aplicável

### "E se eu tiver uma ideia de feature?"

Ótimo! Abra uma discussion no GitHub. Se for urgente, traga na próxima daily.

---

## Conclusão

Você agora tem tudo que precisa para começar! 🚀

**Lembre-se**:
- Este é um **projeto com propósito** - vamos impactar famílias reais
- **Qualidade > velocidade** - não sacrificar nunca
- **Comunicação é chave** - dúvidas? Pergunte!
- **Feedback cedo e frequente** - validar com usuários desde o início

**Vamos construir algo incrível juntos!**

---

Se tiver qualquer dúvida, comece pelo [README.md](./README.md) e depois consulte os outros documentos conforme necessário.

Boa sorte! 💪

