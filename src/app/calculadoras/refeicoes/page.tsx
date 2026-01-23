'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { RefeicoesForm, RefeicoesResult } from '@/components/calculators/refeicoes'
import { calculateRefeicoes, type RefeicoesInput, type RefeicoesResult as RefeicoesResultType } from '@/lib/calculators/refeicoes'

export default function RefeicoesPage() {
  const [result, setResult] = useState<RefeicoesResultType | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: RefeicoesInput) => {
    setIsLoading(true)

    // Simulate a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500))

    const calculatedResult = calculateRefeicoes(data)
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
      <section className="bg-gradient-to-r from-orange-500 to-amber-500 py-12">
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
                <span role="img" aria-label="refeicoes">🍽️</span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white">
                Calculadora de Refeicoes em Familia
              </h1>
            </div>
            <p className="text-white/90 text-lg max-w-2xl">
              Descubra os fatores de protecao gerados por refeicoes compartilhadas
              e receba um plano de acao personalizado.
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
                <CardTitle>Suas refeicoes em familia</CardTitle>
                <CardDescription>
                  Informe quantas vezes sua familia come junta e a qualidade dessas refeicoes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RefeicoesForm onSubmit={handleSubmit} isLoading={isLoading} />
              </CardContent>
            </Card>

            {/* Info Cards */}
            <div className="mt-6 space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card variant="bordered" className="bg-orange-50/50">
                  <CardContent className="py-4">
                    <h4 className="font-semibold text-orange-900 mb-2">
                      Por que refeicoes em familia importam?
                    </h4>
                    <p className="text-sm text-orange-700">
                      Pesquisas mostram que familias que fazem 5+ refeicoes juntas por semana
                      tem filhos com 25% menos risco de depressao e comportamentos de risco.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card variant="bordered" className="bg-amber-50/50">
                  <CardContent className="py-4">
                    <h4 className="font-semibold text-amber-900 mb-2">
                      Beneficios comprovados
                    </h4>
                    <ul className="text-sm text-amber-700 space-y-1">
                      <li>-12% risco de obesidade (3+ refeicoes/semana)</li>
                      <li>-35% transtornos alimentares</li>
                      <li>Melhores notas escolares</li>
                      <li>+50 palavras de vocabulario/refeicao</li>
                    </ul>
                    <p className="text-xs text-amber-600 mt-2">
                      Fontes: Hammons & Fiese (2011), CASA Columbia
                    </p>
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
                  <RefeicoesResult result={result} onRecalculate={handleRecalculate} />
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
                      <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                        Seus resultados aparecerao aqui
                      </h3>
                      <p className="text-neutral-500">
                        Preencha o formulario ao lado e clique em &quot;Calcular&quot; para descobrir
                        o impacto das suas refeicoes em familia.
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
            <Link href="/calculadoras/tempo-tela">
              <button className="px-6 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-colors border border-primary-200">
                Tempo de Tela
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
