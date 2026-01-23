'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { QuizForm, QuizResult } from '@/components/calculators/quiz-parentalidade'
import { calculateQuizResult, type QuizInput, type QuizResult as QuizResultType } from '@/lib/calculators/quiz-parentalidade'

export default function QuizParentalidadePage() {
  const [result, setResult] = useState<QuizResultType | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: QuizInput) => {
    setIsLoading(true)

    // Simulate a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 800))

    const calculatedResult = calculateQuizResult(data)
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
      <section className="bg-gradient-to-r from-secondary-500 to-primary-500 py-12">
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
                <span role="img" aria-label="quiz">📋</span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white">
                Quiz: Estilo de Parentalidade
              </h1>
            </div>
            <p className="text-white/90 text-lg max-w-2xl">
              Descubra seu perfil parental atraves de 15 perguntas baseadas em pesquisas cientificas.
              Receba insights personalizados e um plano de acao pratico.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container-app py-12">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto"
            >
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Responda com sinceridade</CardTitle>
                  <CardDescription>
                    Nao existem respostas certas ou erradas. O objetivo e entender sua realidade
                    atual para oferecer sugestoes personalizadas.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <QuizForm onSubmit={handleSubmit} isLoading={isLoading} />
                </CardContent>
              </Card>

              {/* Info Cards */}
              <div className="mt-8 grid md:grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card variant="bordered" className="bg-primary-50/50 h-full">
                    <CardContent className="py-4">
                      <h4 className="font-semibold text-primary-900 mb-2">
                        4 Dimensoes Avaliadas
                      </h4>
                      <ul className="text-sm text-primary-700 space-y-1">
                        <li>🏠 Presenca - Tempo investido</li>
                        <li>💝 Qualidade - Atencao e afeto</li>
                        <li>🔄 Consistencia - Rituais e rotinas</li>
                        <li>📵 Digital - Desconexao de telas</li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card variant="bordered" className="bg-secondary-50/50 h-full">
                    <CardContent className="py-4">
                      <h4 className="font-semibold text-secondary-900 mb-2">
                        O que voce recebera
                      </h4>
                      <ul className="text-sm text-secondary-700 space-y-1">
                        <li>Seu perfil de parentalidade</li>
                        <li>Pontos fortes e areas de crescimento</li>
                        <li>Acao prioritaria sugerida</li>
                        <li>Metas praticas para a semana</li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Disclaimer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6 p-4 bg-neutral-100 rounded-lg text-sm text-neutral-600"
              >
                <p className="font-medium mb-1">Importante</p>
                <p>
                  Este quiz e uma ferramenta educacional baseada em pesquisas sobre parentalidade.
                  Nao substitui acompanhamento profissional. Cada familia e unica e os resultados
                  sao diretrizes gerais, nao diagnosticos.
                </p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              id="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto"
            >
              <QuizResult result={result} onRecalculate={handleRecalculate} />
            </motion.div>
          )}
        </AnimatePresence>
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
            <Link href="/calculadoras/roi-social">
              <button className="px-6 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-colors border border-primary-200">
                ROI Social
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
