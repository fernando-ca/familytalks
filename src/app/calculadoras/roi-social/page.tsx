'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import {
  ROISocialForm,
  ROISocialResult,
  ROISocialChart,
} from '@/components/calculators/roi-social'
import { calculateROISocial } from '@/lib/calculators/roi-social'
import type { ROISocialInput, ROISocialResult as TResult } from '@/types'

export default function ROISocialPage() {
  const [result, setResult] = useState<TResult | null>(null)
  const [inputData, setInputData] = useState<ROISocialInput | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showCharts, setShowCharts] = useState(false)

  const handleSubmit = async (data: ROISocialInput) => {
    setIsLoading(true)

    // Simulate a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500))

    const calculatedResult = calculateROISocial(data)
    setResult(calculatedResult)
    setInputData(data)
    setIsLoading(false)

    // Scroll to results
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const handleRecalculate = () => {
    setResult(null)
    setInputData(null)
    setShowCharts(false)

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-500 to-green-600 py-12">
        <div className="container-app">
          <Link
            href="/"
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar para início
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-3xl">
                <span role="img" aria-label="gráfico">📊</span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white">
                Calculadora de ROI Social
              </h1>
            </div>
            <p className="text-white/90 text-lg max-w-2xl">
              Descubra o valor econômico e social do seu investimento em tempo
              parental de qualidade. Traduzindo amor em números.
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
                <CardTitle>Seu Investimento Parental</CardTitle>
                <CardDescription>
                  Informe quantas horas você dedica à família por semana e como esse tempo é distribuído.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ROISocialForm onSubmit={handleSubmit} isLoading={isLoading} />
              </CardContent>
            </Card>

            {/* Info Cards */}
            <div className="mt-6 space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card variant="bordered" className="bg-green-50/50">
                  <CardContent className="py-4">
                    <h4 className="font-semibold text-green-900 mb-2">
                      Por que isso importa?
                    </h4>
                    <p className="text-sm text-green-700">
                      Estudos econômicos mostram que cada hora de tempo parental de qualidade
                      evita custos futuros com saúde mental, sistema de justiça e perda de
                      produtividade. É um investimento com retorno infinito.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card variant="bordered" className="bg-purple-50/50">
                  <CardContent className="py-4">
                    <h4 className="font-semibold text-purple-900 mb-2">
                      Dados Econômicos
                    </h4>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>Transtornos de conduta: $70.000 em 7 anos</li>
                      <li>Prevenção em saúde mental: R$4.120/ano economizados</li>
                      <li>Evasão escolar evitada: R$150.000 (lifetime)</li>
                    </ul>
                    <p className="text-xs text-purple-600 mt-2">
                      Fontes: Foster & Jones (2009), HHS.gov, Alliance for Excellent Education
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Results Column */}
          <div id="results">
            <AnimatePresence mode="wait">
              {result && inputData ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <ROISocialResult result={result} onRecalculate={handleRecalculate} />

                  {/* Toggle Charts Button */}
                  <motion.button
                    onClick={() => setShowCharts(!showCharts)}
                    className="w-full py-3 px-4 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-neutral-700 font-medium flex items-center justify-center gap-2 transition-colors"
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg
                      className={`w-5 h-5 transition-transform ${showCharts ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    {showCharts ? 'Ocultar Gráficos' : 'Ver Gráficos Detalhados'}
                  </motion.button>

                  {/* Charts */}
                  <AnimatePresence>
                    {showCharts && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ROISocialChart result={result} input={inputData} />
                      </motion.div>
                    )}
                  </AnimatePresence>
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
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                        Seu ROI aparecerá aqui
                      </h3>
                      <p className="text-neutral-500">
                        Preencha o formulário ao lado e clique em &quot;Calcular&quot; para descobrir o valor do seu investimento.
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
            Descubra mais sobre como fortalecer os vínculos familiares com nossas outras ferramentas.
          </p>
          <Link href="/">
            <button className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors">
              Ver todas as calculadoras
            </button>
          </Link>
        </div>
      </section>
    </main>
  )
}
