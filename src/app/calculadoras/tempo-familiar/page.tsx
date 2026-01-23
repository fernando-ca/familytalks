'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import {
  TempoFamiliarForm,
  TempoFamiliarResult,
  TempoFamiliarChart,
} from '@/components/calculators/tempo-familiar'
import { calculateTempoFamiliar } from '@/lib/calculators/tempo-familiar'
import type { TempoFamiliarInput, TempoFamiliarResult as TResult } from '@/types'

export default function TempoFamiliarPage() {
  const [result, setResult] = useState<TResult | null>(null)
  const [inputData, setInputData] = useState<TempoFamiliarInput | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showCharts, setShowCharts] = useState(false)

  const handleSubmit = async (data: TempoFamiliarInput) => {
    setIsLoading(true)

    // Simulate a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500))

    const calculatedResult = calculateTempoFamiliar(data)
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
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 py-12">
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
                <span role="img" aria-label="família">👨‍👩‍👧‍👦</span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white">
                Calculadora de Tempo Familiar
              </h1>
            </div>
            <p className="text-white/90 text-lg max-w-2xl">
              Descubra quanto tempo de qualidade você dedica à família e receba
              insights personalizados baseados em pesquisas científicas.
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
                <CardTitle>Preencha os dados</CardTitle>
                <CardDescription>
                  Informe o tempo médio que você passa com sua família durante a semana.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TempoFamiliarForm onSubmit={handleSubmit} isLoading={isLoading} />
              </CardContent>
            </Card>

            {/* Info Cards */}
            <div className="mt-6 space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card variant="bordered" className="bg-primary-50/50">
                  <CardContent className="py-4">
                    <h4 className="font-semibold text-primary-900 mb-2">
                      Por que isso importa?
                    </h4>
                    <p className="text-sm text-primary-700">
                      Estudos mostram que adolescentes que passam 6+ horas por semana com os pais
                      têm melhores notas em matemática e menor uso de drogas (Abbott, 2019).
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card variant="bordered" className="bg-secondary-50/50">
                  <CardContent className="py-4">
                    <h4 className="font-semibold text-secondary-900 mb-2">
                      Média Nacional
                    </h4>
                    <ul className="text-sm text-secondary-700 space-y-1">
                      <li>0-5 anos: 2.5 horas/dia</li>
                      <li>6-12 anos: 1.8 horas/dia</li>
                      <li>13-17 anos: 1.2 horas/dia</li>
                    </ul>
                    <p className="text-xs text-secondary-600 mt-2">
                      Fonte: Pew Research Center, 2021
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
                  <TempoFamiliarResult result={result} onRecalculate={handleRecalculate} />

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
                        <TempoFamiliarChart
                          result={result}
                          weekdayMinutes={inputData.weekdayMinutes}
                          weekendMinutes={inputData.weekendMinutes}
                        />
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
                      <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                        Seus resultados aparecerão aqui
                      </h3>
                      <p className="text-neutral-500">
                        Preencha o formulário ao lado e clique em &quot;Calcular&quot; para ver seus insights personalizados.
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
            <button className="px-6 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors">
              Ver todas as calculadoras
            </button>
          </Link>
        </div>
      </section>
    </main>
  )
}
