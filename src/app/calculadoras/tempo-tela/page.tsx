'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import {
  TempoTelaForm,
  TempoTelaResult,
  TempoTelaChart,
} from '@/components/calculators/tempo-tela'
import { calculateTempoTela } from '@/lib/calculators/tempo-tela'
import type { TempoTelaInput, TempoTelaResult as TResult } from '@/types'

export default function TempoTelaPage() {
  const [result, setResult] = useState<TResult | null>(null)
  const [inputData, setInputData] = useState<TempoTelaInput | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showCharts, setShowCharts] = useState(false)

  const handleSubmit = async (data: TempoTelaInput) => {
    setIsLoading(true)

    // Simulate a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500))

    const calculatedResult = calculateTempoTela(data)
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
      <section className="bg-gradient-to-r from-blue-500 to-blue-600 py-12">
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
                <span role="img" aria-label="celular">📱</span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white">
                Calculadora de Impacto do Tempo de Tela
              </h1>
            </div>
            <p className="text-white/90 text-lg max-w-2xl">
              Analise o impacto do tempo de tela no desenvolvimento e bem-estar
              de crianças e adolescentes com base em pesquisas científicas.
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
                  Informe os hábitos de uso de tela para calcular o nível de risco.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TempoTelaForm onSubmit={handleSubmit} isLoading={isLoading} />
              </CardContent>
            </Card>

            {/* Info Cards */}
            <div className="mt-6 space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card variant="bordered" className="bg-blue-50/50">
                  <CardContent className="py-4">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      Por que isso importa?
                    </h4>
                    <p className="text-sm text-blue-700">
                      Estudos mostram que o uso excessivo de telas está associado a
                      aumento de ansiedade, depressão e problemas de sono em jovens.
                      A pesquisa de Jonathan Haidt indica correlação entre 5h+ de
                      redes sociais e 2x mais risco de problemas de saúde mental.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card variant="bordered" className="bg-orange-50/50">
                  <CardContent className="py-4">
                    <h4 className="font-semibold text-orange-900 mb-2">
                      Dados Alarmantes
                    </h4>
                    <ul className="text-sm text-orange-700 space-y-1">
                      <li>Média de adolescentes: 7-9h/dia de tela</li>
                      <li>77% dos teens usam 3h+ por dia</li>
                      <li>+100% aumento em depressão desde 2010</li>
                    </ul>
                    <p className="text-xs text-orange-600 mt-2">
                      Fontes: Common Sense Media, CDC, Twenge & Haidt
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
                  <TempoTelaResult result={result} onRecalculate={handleRecalculate} />

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
                        <TempoTelaChart result={result} input={inputData} />
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
                      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                        Seus resultados aparecerão aqui
                      </h3>
                      <p className="text-neutral-500">
                        Preencha o formulário ao lado e clique em &quot;Calcular&quot; para ver a análise de impacto.
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
            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors">
              Ver todas as calculadoras
            </button>
          </Link>
        </div>
      </section>
    </main>
  )
}
