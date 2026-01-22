# FamilyTalks.org - Calculadoras Interativas

> Transformando pesquisa científica em ferramentas práticas para fortalecer vínculos familiares.

## Sobre o Projeto

O FamilyTalks.org desenvolve calculadoras interativas baseadas em evidências científicas que ajudam famílias a:

- **Mensurar** o impacto de suas escolhas diárias
- **Conscientizar** sobre riscos (tempo de tela, desconexão)
- **Incentivar** hábitos saudáveis (refeições juntos, leitura compartilhada)
- **Transformar** intenções em ações consistentes

### Propósito

Gerar impacto familiar positivo através de:
- Prevenção de problemas sociais (ansiedade, uso de substâncias, evasão escolar)
- Tradução de pesquisas científicas em ferramentas práticas
- Empoderamento de famílias com dados tangíveis sobre suas escolhas

---

## Calculadoras Planejadas

### 1. Calculadora de Tempo Familiar
Mensura o tempo de qualidade dedicado aos filhos e compara com médias nacionais.

**Input**: horas/dia com filhos, idade das crianças
**Output**: comparação com média nacional, projeção de horas/ano, "banco de memórias" acumulado
**Valor**: Conscientização sobre tempo investido + motivação para priorizar família

### 2. Calculadora de Impacto do Tempo de Tela
Baseada no livro "Anxious Generation" de Jonathan Haidt, mostra o impacto do uso excessivo de telas na saúde mental de crianças e adolescentes.

**Input**: horas de tela/dia, idade, tipo de uso (redes sociais vs. educativo)
**Output**: risco relativo de ansiedade/depressão, comparação com recomendações
**Valor**: Conscientização de riscos + plano de redução personalizado

### 3. Calculadora de ROI Social da Parentalidade
Traduz investimento de tempo parental em valor econômico e social para advocacy.

**Input**: tempo investido, atividades (leitura, refeições juntos, etc.)
**Output**: economia estimada em custos públicos (saúde mental, sistema prisional, evasão escolar)
**Valor**: Empoderamento para mudança de políticas públicas + evidência do valor da parentalidade

### 4. Quiz: Estilo de Parentalidade
Diagnóstico não-julgador que identifica padrão atual e sugere ajustes baseados em evidências.

**Valor**: Auto-conhecimento + plano personalizado de desenvolvimento parental

### 5. Calculadora de Refeições em Família
Demonstra os fatores de proteção gerados por refeições compartilhadas.

**Input**: refeições juntos/semana
**Output**: impacto em notas escolares, risco de uso de drogas, vocabulário
**Valor**: Evidência do poder de pequenas mudanças + desafio 21 dias

### 6. Contador de "Momentos de Conexão"
Tracker semanal gamificado de interações significativas.

**Valor**: Accountability + visualização de progresso + conquistas + transformação de hábitos

---

## Documentação

### Documentos Principais

- **[Especificação Técnica](./TECHNICAL_SPECS.md)** - Arquitetura, stack, APIs, modelo de dados
- **[Plano de Implementação](./IMPLEMENTATION_PLAN.md)** - Fases, sprints, timeline, recursos

### Estrutura de Documentação

```
familytalks/
├── README.md                    ← Você está aqui
├── TECHNICAL_SPECS.md          ← Specs técnicas completas
├── IMPLEMENTATION_PLAN.md      ← Plano de implementação detalhado
├── docs/
│   ├── api/                    ← Documentação de API
│   ├── research/               ← Bases científicas e referências
│   └── user-guides/            ← Guias para usuários finais
└── (código será adicionado aqui)
```

---

## Tecnologias (Stack Recomendada)

### Frontend
- **React 18+** com TypeScript
- **Vite** para build
- **TailwindCSS** para styling
- **Chart.js** para visualizações
- **Framer Motion** para animações

### Backend
- **Node.js 20** com Express
- **TypeScript**
- **Prisma** ORM
- **PostgreSQL** database
- **Redis** para cache

### DevOps
- **Vercel** para deployment (frontend + backend serverless)
- **GitHub Actions** para CI/CD
- **Vercel Postgres** ou **Supabase** para database
- **Vercel KV** (Redis) para cache

---

## Roadmap

### Fase 1: MVP (Semanas 1-10) - 2.5 meses
- [x] Setup do projeto (Vercel + GitHub)
- [ ] Autenticação básica
- [ ] **Calculadora de Tempo Familiar**
- [ ] **Calculadora de Impacto do Tempo de Tela**
- [ ] Landing page
- [ ] Deploy no Vercel
- [ ] **Meta**: 50-100 beta testers

### Fase 2: Expansão (Semanas 11-18) - 2 meses
- [ ] **Calculadora de Refeições em Família**
- [ ] **Quiz: Estilo de Parentalidade**
- [ ] **Contador de Momentos de Conexão**
- [ ] Sistema de conquistas
- [ ] Dashboard consolidado
- [ ] **Meta**: 500-1000 usuários ativos

### Fase 3: Impacto Sistêmico (Semanas 19-30) - 3 meses
- [ ] **Calculadora de ROI Social da Parentalidade**
- [ ] API pública para pesquisadores
- [ ] Kit de parcerias (escolas, ONGs)
- [ ] Relatório de impacto
- [ ] **Meta**: 2000+ usuários, 5+ parcerias

**Timeline Total**: 7 meses
**Deploy**: Vercel (frontend + API serverless)

---

## Começando

### Pré-requisitos

- Node.js 20+
- PostgreSQL 15+
- Redis 7+
- Git

### Setup Local (quando o código estiver disponível)

```bash
# Clonar repositório
git clone https://github.com/familytalks/calculadoras.git
cd calculadoras

# Instalar dependências
npm install

# Setup do banco de dados (Vercel Postgres ou local)
npm run db:setup

# Iniciar desenvolvimento (Vercel Dev)
vercel dev
# ou
npm run dev
```

### Deploy no Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (staging)
vercel

# Deploy (production)
vercel --prod
```

### Estrutura do Projeto (futura)

```
familytalks/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Landing page
│   │   ├── calculadoras/
│   │   │   ├── tempo-familiar/
│   │   │   ├── tempo-tela/
│   │   │   ├── roi-social/
│   │   │   ├── refeicoes/
│   │   │   └── momentos/
│   │   ├── quiz/
│   │   └── api/               # API Routes (Vercel Serverless)
│   ├── components/
│   │   ├── calculators/       # Componentes das 6 calculadoras
│   │   ├── shared/            # Componentes reutilizáveis
│   │   └── layout/
│   ├── lib/
│   │   ├── calculations/      # Lógica de cálculo
│   │   └── db/                # Prisma client
│   └── types/
├── prisma/
│   └── schema.prisma
├── public/
├── docs/                      # Documentação
├── vercel.json               # Configuração Vercel
└── package.json
```

---

## Contribuindo

### Como Contribuir

1. **Issues**: Reporte bugs ou sugira features
2. **Pull Requests**: Contribua com código
3. **Documentação**: Ajude a melhorar a documentação
4. **Pesquisa**: Compartilhe estudos científicos relevantes

### Processo de Desenvolvimento

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Add: nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

### Padrões de Código

- **TypeScript** em todo o código
- **ESLint + Prettier** para formatação
- **Conventional Commits** para mensagens
- **Testes** obrigatórios para novas features (coverage > 75%)

---

## Time

### Papéis Necessários

- **Product Owner** (50%) - Visão, priorização
- **Tech Lead** (100%) - Arquitetura, code review
- **Frontend Developer** (100%) - React, UI/UX
- **Backend Developer** (100%) - APIs, cálculos
- **UI/UX Designer** (50%) - Design, protótipos
- **Content Writer** (25%) - Textos, pesquisa científica

**Interessado em participar?** Entre em contato através das issues do GitHub.

---

## Recursos e Pesquisas

### Bases Científicas

As calculadoras são baseadas em pesquisas peer-reviewed de fontes como:

- **PubMed Central / NCBI** - Meta-análises sobre impacto familiar
- **Journal of Marriage and Family** - Dinâmicas familiares
- **Jonathan Haidt** - "The Anxious Generation" (tempo de tela)
- **Ohio State University** - Gap de vocabulário por leitura
- **SAMHSA** - Prevenção de uso de substâncias

Ver [docs/research](./docs/research/) para lista completa de referências.

### Dados Utilizados

- Taxas de ansiedade/depressão em adolescentes (2010-2024)
- Impacto de refeições familiares em saúde mental
- Correlação leitura-vocabulário-QI
- Custos sociais de problemas de conduta
- Efetividade de intervenções preventivas

---

## Licença

*A ser definida*

Opções em consideração:
- **MIT License** - Máxima liberdade
- **Apache 2.0** - Com proteção de patentes
- **GPL v3** - Copyleft, garantindo código aberto

---

## Contato e Suporte

- **Website**: (em construção)
- **Email**: (a definir)
- **GitHub Issues**: Para bugs e sugestões
- **Discussões**: GitHub Discussions para perguntas gerais

---

## Status do Projeto

🚧 **Em Planejamento** - Fase 0 em andamento

Última atualização: 21 de janeiro de 2026

### Próximos Passos

1. [ ] Revisar documentação técnica com stakeholders
2. [ ] Confirmar disponibilidade do time
3. [ ] Setup inicial do repositório
4. [ ] Criar protótipos no Figma
5. [ ] Validar fórmulas com pesquisadores
6. [ ] Kick-off meeting

---

## Apoie o Projeto

Este projeto tem potencial de impacto social genuíno. Se você acredita na missão de fortalecer vínculos familiares através de tecnologia baseada em evidências, considere:

- ⭐ Dar uma estrela neste repositório
- 🤝 Contribuir com código ou pesquisa
- 💬 Compartilhar com pessoas interessadas
- 💰 Apoiar financeiramente (quando disponível)

---

**Feito com propósito para fortalecer famílias** ❤️

