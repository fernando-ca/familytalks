# Guia de Início Rápido - FamilyTalks.org

**Versão**: 1.0
**Data**: 21 de janeiro de 2026
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
   - MVP atual: Screen Time + Quiz + Tracker
   - Alternativa: Apenas 2 calculadoras + tracker

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
- [ ] Setup Docker Compose para dev
  ```yaml
  # docker-compose.yml
  version: '3.8'
  services:
    postgres:
      image: postgres:15
      environment:
        POSTGRES_DB: familytalks
        POSTGRES_USER: dev
        POSTGRES_PASSWORD: dev
      ports:
        - "5432:5432"
    redis:
      image: redis:7
      ports:
        - "6379:6379"
  ```

#### Dia 3-4: Frontend Setup

- [ ] Criar projeto Vite + React + TypeScript
  ```bash
  npm create vite@latest frontend -- --template react-ts
  cd frontend
  npm install
  ```
- [ ] Instalar dependências principais
  ```bash
  npm install react-router-dom react-hook-form zod
  npm install @tanstack/react-query
  npm install tailwindcss chart.js framer-motion
  npm install -D @types/node
  ```
- [ ] Configurar TailwindCSS
- [ ] Setup ESLint + Prettier
- [ ] Criar componentes base (Button, Input, Card)
- [ ] Setup Storybook (opcional mas recomendado)

#### Dia 5-7: Backend Setup

- [ ] Criar projeto Node.js + Express + TypeScript
  ```bash
  mkdir backend && cd backend
  npm init -y
  npm install express cors helmet dotenv
  npm install prisma @prisma/client
  npm install -D typescript @types/express @types/node tsx
  npx tsc --init
  ```
- [ ] Setup Prisma
  ```bash
  npx prisma init
  ```
- [ ] Criar schema inicial (ver seção 4.1 das specs)
- [ ] Setup estrutura de pastas
- [ ] Configurar middleware básico
- [ ] Setup testes (Jest + Supertest)

#### Dia 8-10: DevOps

- [ ] Configurar GitHub Actions (.github/workflows/ci.yml)
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
- [ ] Setup ambientes (staging, production)
- [ ] Configurar Vercel (frontend)
- [ ] Configurar Railway/Render (backend)
- [ ] Setup Sentry para error tracking
- [ ] Configurar variáveis de ambiente

### Decisões Arquiteturais

**A decidir antes de começar**:

1. **Monorepo ou Multi-repo?**
   - Recomendação: Monorepo (mais fácil para equipe pequena)

2. **REST ou GraphQL?**
   - Recomendação: REST (mais simples para MVP)

3. **State Management?**
   - Recomendação: React Query + Context API (suficiente)

4. **Testes E2E?**
   - MVP: Apenas testes críticos
   - Fase 2: Playwright completo

---

## Para Desenvolvedores

### Ambiente de Desenvolvimento

#### Pré-requisitos

```bash
# Versões necessárias
node -v   # v20+
npm -v    # v10+
docker -v # v24+
git -v    # v2.40+
```

#### Setup Local (quando código estiver disponível)

```bash
# 1. Clonar repo
git clone https://github.com/familytalks/calculadoras.git
cd calculadoras

# 2. Instalar dependências
npm install

# 3. Subir banco de dados
docker-compose up -d

# 4. Setup do backend
cd backend
cp .env.example .env  # Configurar variáveis
npx prisma migrate dev
npx prisma db seed    # Dados iniciais
npm run dev

# 5. Setup do frontend (outro terminal)
cd ../frontend
cp .env.example .env
npm run dev

# 6. Acessar
# Frontend: http://localhost:5173
# Backend: http://localhost:3000
```

### Padrões de Código

#### Commit Messages (Conventional Commits)

```bash
# Formato
<type>(<scope>): <subject>

# Exemplos
feat(calculator): add screen time calculator
fix(auth): resolve token refresh issue
docs(readme): update setup instructions
test(meals): add unit tests for calculations
refactor(tracker): simplify streak calculation
```

**Types**: feat, fix, docs, test, refactor, style, chore

#### Naming Conventions

**Frontend**:
```typescript
// Componentes: PascalCase
export function ScreenTimeCalculator() {}

// Funções: camelCase
export function calculateRisk() {}

// Constantes: UPPER_SNAKE_CASE
export const MAX_SCREEN_TIME = 12;

// Hooks: camelCase com prefixo 'use'
export function useCalculator() {}
```

**Backend**:
```typescript
// Arquivos: kebab-case
// screen-time.service.ts
// calculator.controller.ts

// Classes: PascalCase
export class CalculatorService {}

// Funções: camelCase
export function validateInput() {}
```

#### Estrutura de Arquivos

**Componente React**:
```typescript
// ScreenTimeCalculator.tsx
import { useState } from 'react';
import { useCalculator } from '@/hooks/useCalculator';
import { Button, Input } from '@/components/shared';

export function ScreenTimeCalculator() {
  // 1. Hooks
  // 2. State
  // 3. Effects
  // 4. Handlers
  // 5. Render
}
```

**Service Backend**:
```typescript
// screen-time.service.ts
export class ScreenTimeService {
  // 1. Constructor
  // 2. Public methods
  // 3. Private helpers
}
```

### Workflow de Desenvolvimento

1. **Pegar task do GitHub Projects**
2. **Criar branch**
   ```bash
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
   git push origin feat/calculator-screen-time
   # Criar PR no GitHub
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

### Exemplo de Texto (Screen Time - Resultado)

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

**Backend** (22h estimadas):
- [ ] Setup autenticação JWT (5pts)
- [ ] Endpoint /register (3pts)
- [ ] Endpoint /login (3pts)
- [ ] Middleware de auth (2pts)
- [ ] Testes (5pts)

**Frontend** (28h estimadas):
- [ ] Landing page (8pts)
- [ ] Página de registro (5pts)
- [ ] Página de login (5pts)
- [ ] Protected routes (3pts)
- [ ] Auth context (3pts)
- [ ] Testes (3pts)

**Design** (10h estimadas):
- [ ] Ilustrações landing (5pts)
- [ ] Iconografia (3pts)
- [ ] Animações (2pts)

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

- [React Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Prisma Docs](https://www.prisma.io/docs)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Chart.js Docs](https://www.chartjs.org/docs/)

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
- [ ] Repositório criado
- [ ] CI/CD configurado
- [ ] Ambientes criados (staging, prod)
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

