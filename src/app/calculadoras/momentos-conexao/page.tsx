'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { MomentosForm, MomentosResult } from '@/components/calculators/momentos-conexao'
import { calculateMomentosConexao, momentCategories, type MomentosInput, type MomentosResult as MomentosResultType } from '@/lib/calculators/momentos-conexao'

export default function MomentosConexaoPage() {
  const [result, setResult] = useState<MomentosResultType | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: MomentosInput) => {
    setIsLoading(true)

    // Simulate a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500))

    const calculatedResult = calculateMomentosConexao(data)
    setResult(calculatedResult)
    setIsLoading(false)

    // Scroll to results
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const handleRecalculate = () => {
    setResult(null)

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-teal-500 to-cyan-500 py-12">
        <div className="container-app">
          <Link
            href="/"
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar para inicio
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-3xl">
                <span role="img" aria-label="momentos">💫</span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white">
                Contador de Momentos de Conexao
              </h1>
            </div>
            <p className="text-white/90 text-lg max-w-2xl">
              Registre e acompanhe seus momentos de conexao com a familia.
              Transforme intencoes em habitos duradouros.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container-app py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form Column */}
          <div>
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Registre seus momentos</CardTitle>
                <CardDescription>
                  Adicione os momentos de conexao com sua familia nesta semana.
                  Cada momento conta!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MomentosForm onSubmit={handleSubmit} isLoading={isLoading} />
              </CardContent>
            </Card>

            {/* Info Cards */}
            <div className="mt-6 space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card variant="bordered" className="bg-teal-50/50">
                  <CardContent className="py-4">
                    <h4 className="font-semibold text-teal-900 mb-2">
                      O que sao momentos de conexao?
                    </h4>
                    <p className="text-sm text-teal-700">
                      Interacoes presenciais de qualidade com duracao minima de 5 minutos,
                      onde voce esta totalmente presente com seus filhos.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card variant="bordered" className="bg-cyan-50/50">
                  <CardContent className="py-4">
                    <h4 className="font-semibold text-cyan-900 mb-2">
                      Tipos de momentos
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm text-cyan-700">
                      <div className="flex items-center gap-2">
                        <span>{momentCategories.conversation.icon}</span>
                        <span>Conversa (1.4x)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>{momentCategories.learning.icon}</span>
                        <span>Aprendizado (1.5x)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>{momentCategories.play.icon}</span>
                        <span>Brincadeira (1.3x)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>{momentCategories.outdoor.icon}</span>
                        <span>Ar livre (1.3x)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>{momentCategories.meal.icon}</span>
                        <span>Refeicao (1.2x)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>{momentCategories.routine.icon}</span>
                        <span>Rotina (1.0x)</span>
                      </div>
                    </div>
                    <p className="text-xs text-cyan-600 mt-2">
                      Os pesos refletem o impacto de cada tipo de momento
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card variant="bordered" className="bg-purple-50/50">
                  <CardContent className="py-4">
                    <h4 className="font-semibold text-purple-900 mb-2">
                      Sistema de conquistas
                    </h4>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>🏆 7 dias consecutivos = Semana Conectada</li>
                      <li>🎯 20+ momentos/semana = Familia Conectada</li>
                      <li>🌈 5+ categorias = Familia Diversificada</li>
                      <li>⭐ 66 dias = Habito Consolidado</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Results Column */}
          <div id="results">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <MomentosResult result={result} onRecalculate={handleRecalculate} />
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex items-center justify-center"
                >
                  <Card variant="bordered" className="w-full">
                    <CardContent className="py-16 text-center">
                      <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                        Seus resultados aparecerao aqui
                      </h3>
                      <p className="text-neutral-500">
                        Adicione seus momentos de conexao ao lado e clique em &quot;Calcular&quot; para ver
                        seu progresso e conquistas.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-neutral-100 py-12">
        <div className="container-app text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            Explore outras calculadoras
          </h2>
          <p className="text-neutral-600 mb-6 max-w-xl mx-auto">
            Descubra mais ferramentas para fortalecer os vinculos familiares.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/calculadoras/tempo-familiar">
              <button className="px-6 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-colors border border-primary-200">
                Tempo Familiar
              </button>
            </Link>
            <Link href="/calculadoras/refeicoes">
              <button className="px-6 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-colors border border-primary-200">
                Refeicoes em Familia
              </button>
            </Link>
            <Link href="/calculadoras/quiz-parentalidade">
              <button className="px-6 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-colors border border-primary-200">
                Quiz de Parentalidade
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
