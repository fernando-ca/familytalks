'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const calculators = [
  {
    id: 'tempo-familiar',
    title: 'Calculadora de Tempo Familiar',
    description: 'Descubra quanto tempo de qualidade você dedica à família e receba insights personalizados.',
    icon: '👨‍👩‍👧‍👦',
    color: 'from-primary-400 to-primary-600',
    href: '/calculadoras/tempo-familiar',
  },
  {
    id: 'tempo-tela',
    title: 'Calculadora de Impacto do Tempo de Tela',
    description: 'Analise o impacto do tempo de tela no desenvolvimento das crianças com base em pesquisas científicas.',
    icon: '📱',
    color: 'from-blue-400 to-blue-600',
    href: '/calculadoras/tempo-tela',
  },
  {
    id: 'roi-social',
    title: 'Calculadora de ROI Social da Parentalidade',
    description: 'Calcule o retorno do investimento em educação parental para a sociedade.',
    icon: '📊',
    color: 'from-green-400 to-green-600',
    href: '/calculadoras/roi-social',
  },
  {
    id: 'quiz-parentalidade',
    title: 'Quiz: Estilo de Parentalidade',
    description: 'Descubra seu estilo parental predominante e receba orientações personalizadas.',
    icon: '🎯',
    color: 'from-purple-400 to-purple-600',
    href: '/calculadoras/quiz-parentalidade',
  },
  {
    id: 'refeicoes',
    title: 'Calculadora de Refeições em Família',
    description: 'Avalie a qualidade das refeições familiares e seu impacto no bem-estar.',
    icon: '🍽️',
    color: 'from-orange-400 to-orange-600',
    href: '/calculadoras/refeicoes',
  },
  {
    id: 'momentos-conexao',
    title: 'Contador de Momentos de Conexão',
    description: 'Registre e acompanhe momentos especiais de conexão familiar com gamificação.',
    icon: '❤️',
    color: 'from-red-400 to-red-600',
    href: '/calculadoras/momentos-conexao',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="container-app py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="font-display text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl lg:text-6xl">
            Fortaleça os{' '}
            <span className="text-gradient">vínculos familiares</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-600 md:text-xl">
            Ferramentas interativas baseadas em ciência para ajudar sua família a crescer junta.
            Descubra insights valiosos sobre tempo de qualidade, desenvolvimento e conexão.
          </p>
        </motion.div>
      </section>

      {/* Calculators Grid */}
      <section className="container-app pb-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {calculators.map((calc) => (
            <motion.div key={calc.id} variants={itemVariants}>
              <Link href={calc.href}>
                <div className="card group h-full cursor-pointer border border-neutral-100">
                  <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${calc.color} text-2xl shadow-lg`}>
                    {calc.icon}
                  </div>
                  <h2 className="text-xl font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                    {calc.title}
                  </h2>
                  <p className="mt-2 text-neutral-600">
                    {calc.description}
                  </p>
                  <div className="mt-4 inline-flex items-center text-sm font-medium text-primary-500 group-hover:text-primary-600">
                    Começar agora
                    <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 py-16">
        <div className="container-app text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
              Pronto para transformar sua família?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
              Comece agora com nossas ferramentas gratuitas e baseadas em pesquisas científicas.
            </p>
            <Link href="/calculadoras/tempo-familiar">
              <button className="mt-8 rounded-lg bg-white px-8 py-3 font-semibold text-primary-600 shadow-lg transition-all hover:bg-neutral-50 hover:shadow-xl">
                Começar Gratuitamente
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white py-12">
        <div className="container-app">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-center md:text-left">
              <p className="font-display text-xl font-bold text-neutral-900">FamilyTalks</p>
              <p className="text-sm text-neutral-500">Fortalecendo famílias através da ciência</p>
            </div>
            <p className="text-sm text-neutral-500">
              © {new Date().getFullYear()} FamilyTalks. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
