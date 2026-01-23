import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const badges = [
  // Streak Badges
  {
    name: 'Primeiro Passo',
    description: 'Registrou seu primeiro momento de conexão',
    icon: '🌱',
    requirement: JSON.stringify({ type: 'moments', count: 1 }),
    category: 'milestone',
  },
  {
    name: 'Sequência de 3 Dias',
    description: 'Registrou momentos por 3 dias consecutivos',
    icon: '🔥',
    requirement: JSON.stringify({ type: 'streak', days: 3 }),
    category: 'streak',
  },
  {
    name: 'Sequência de 7 Dias',
    description: 'Registrou momentos por 7 dias consecutivos',
    icon: '⭐',
    requirement: JSON.stringify({ type: 'streak', days: 7 }),
    category: 'streak',
  },
  {
    name: 'Sequência de 30 Dias',
    description: 'Registrou momentos por 30 dias consecutivos',
    icon: '🏆',
    requirement: JSON.stringify({ type: 'streak', days: 30 }),
    category: 'streak',
  },
  // Milestone Badges
  {
    name: '10 Momentos',
    description: 'Registrou 10 momentos de conexão',
    icon: '💫',
    requirement: JSON.stringify({ type: 'moments', count: 10 }),
    category: 'milestone',
  },
  {
    name: '50 Momentos',
    description: 'Registrou 50 momentos de conexão',
    icon: '🌟',
    requirement: JSON.stringify({ type: 'moments', count: 50 }),
    category: 'milestone',
  },
  {
    name: '100 Momentos',
    description: 'Registrou 100 momentos de conexão',
    icon: '💎',
    requirement: JSON.stringify({ type: 'moments', count: 100 }),
    category: 'milestone',
  },
  // Category Badges
  {
    name: 'Mestre da Conversa',
    description: 'Registrou 20 momentos de conversa',
    icon: '💬',
    requirement: JSON.stringify({ type: 'category', category: 'conversation', count: 20 }),
    category: 'special',
  },
  {
    name: 'Parceiro de Atividades',
    description: 'Registrou 20 atividades em família',
    icon: '🎮',
    requirement: JSON.stringify({ type: 'category', category: 'activity', count: 20 }),
    category: 'special',
  },
  {
    name: 'Coração Carinhoso',
    description: 'Registrou 20 momentos de afeto',
    icon: '❤️',
    requirement: JSON.stringify({ type: 'category', category: 'affection', count: 20 }),
    category: 'special',
  },
  {
    name: 'Pilar de Apoio',
    description: 'Registrou 20 momentos de apoio',
    icon: '🤝',
    requirement: JSON.stringify({ type: 'category', category: 'support', count: 20 }),
    category: 'special',
  },
  {
    name: 'Celebrador',
    description: 'Registrou 10 celebrações em família',
    icon: '🎉',
    requirement: JSON.stringify({ type: 'category', category: 'celebration', count: 10 }),
    category: 'special',
  },
  // Calculator Badges
  {
    name: 'Explorador',
    description: 'Usou todas as 6 calculadoras',
    icon: '🧭',
    requirement: JSON.stringify({ type: 'calculators', count: 6 }),
    category: 'special',
  },
  {
    name: 'Família Nota 10',
    description: 'Obteve pontuação excelente em qualquer calculadora',
    icon: '🎯',
    requirement: JSON.stringify({ type: 'score', category: 'excellent' }),
    category: 'special',
  },
]

async function main() {
  console.log('🌱 Seeding database...')

  // Create badges
  for (const badge of badges) {
    await prisma.badge.upsert({
      where: { name: badge.name },
      update: badge,
      create: badge,
    })
  }

  console.log(`✅ Created ${badges.length} badges`)
  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
