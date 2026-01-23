'use client'

import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  getProgressColor,
  getDimensionEmoji,
  type QuizResult as QuizResultType,
  type Dimension,
} from '@/lib/calculators/quiz-parentalidade'

interface QuizResultProps {
  result: QuizResultType
  onRecalculate: () => void
}

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
}

export function QuizResult({ result, onRecalculate }: QuizResultProps) {
  const handleShare = async () => {
    const shareText = `Descobri que sou uma "${result.profile.label}" com ${result.percentage}% de conexao familiar! Faca o Quiz de Parentalidade em FamilyTalks.org`

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Meu Resultado - Quiz de Estilo de Parentalidade',
          text: shareText,
          url: window.location.href,
        })
      } catch {
        copyToClipboard(shareText)
      }
    } else {
      copyToClipboard(shareText)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Resultado copiado para a area de transferencia!')
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Profile Card */}
      <motion.div variants={itemVariants}>
        <Card variant="elevated" className={`border-2 ${result.profile.bgColor}`}>
          <CardContent>
            <div className="text-center py-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className={`inline-flex items-center justify-center w-28 h-28 rounded-full bg-white shadow-lg mb-4`}
              >
                <div className="text-center">
                  <span className={`text-4xl font-bold ${result.profile.color}`}>
                    {result.percentage}%
                  </span>
                </div>
              </motion.div>
              <h3 className={`text-2xl font-bold ${result.profile.color}`}>
                {result.profile.label}
              </h3>
              <p className="text-neutral-600 mt-3 max-w-md mx-auto">
                {result.profile.message}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Dimension Scores */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Suas Dimensoes de Parentalidade</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {(Object.entries(result.dimensionScores) as [Dimension, typeof result.dimensionScores.presence][]).map(
              ([dim, score], index) => (
                <motion.div
                  key={dim}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{getDimensionEmoji(dim)}</span>
                      <span className="font-medium text-neutral-800">{score.label}</span>
                    </div>
                    <span className="font-semibold text-neutral-900">
                      {score.percentage}%
                    </span>
                  </div>
                  <div className="h-3 bg-neutral-200 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${getProgressColor(score.percentage)}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${score.percentage}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                    />
                  </div>
                  <p className="text-sm text-neutral-600">{score.description}</p>
                </motion.div>
              )
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Top Opportunity */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <svg className="w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Sua Maior Oportunidade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getDimensionEmoji(result.topOpportunity.dimension)}</span>
                <div>
                  <p className="font-semibold text-neutral-900">
                    {result.topOpportunity.dimensionLabel}
                  </p>
                  <p className="text-sm text-neutral-600">
                    Atualmente em {result.topOpportunity.currentPercent}%
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-primary-100">
                <p className="font-medium text-primary-900 mb-2">
                  Acao Sugerida:
                </p>
                <p className="text-neutral-700">{result.topOpportunity.suggestedAction}</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-secondary-100">
                <p className="font-medium text-secondary-900 mb-2">
                  Impacto Esperado:
                </p>
                <p className="text-neutral-700">{result.topOpportunity.expectedImpact}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Strengths & Growth Areas */}
      <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-4">
        {/* Strengths */}
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Seus Pontos Fortes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2 text-green-800">
                  <span className="text-green-500 mt-1">+</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Growth Areas */}
        <Card className="bg-amber-50 border-amber-200">
          <CardHeader>
            <CardTitle className="text-amber-800 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Areas de Crescimento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.growthAreas.map((area, index) => (
                <li key={index} className="flex items-start gap-2 text-amber-800">
                  <span className="text-amber-500 mt-1">+</span>
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Weekly Goals */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Metas Para Esta Semana</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {result.weeklyGoals.map((goal, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-start gap-3 p-3 bg-primary-50 rounded-lg border border-primary-100"
                >
                  <span className="flex-shrink-0 w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <span className="text-neutral-700">{goal}</span>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Insights */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {result.insights.map((insight, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="flex-shrink-0 w-6 h-6 bg-neutral-100 text-neutral-600 rounded-full flex items-center justify-center text-sm">
                    {index + 1}
                  </span>
                  <span className="text-neutral-700">{insight}</span>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recommendations */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Recomendacoes Personalizadas</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {result.recommendations.map((rec, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-start gap-3 p-3 bg-secondary-50 rounded-lg border border-secondary-100"
                >
                  <span className="text-secondary-500">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <span className="text-neutral-700">{rec}</span>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Scientific Disclaimer */}
      <motion.div variants={itemVariants}>
        <div className="p-4 bg-neutral-100 rounded-lg text-sm text-neutral-600">
          <p className="font-medium mb-2">Base Cientifica</p>
          <p className="mb-2">
            Este quiz e baseado em pesquisas sobre estilos parentais e desenvolvimento infantil.
            Nao e um diagnostico clinico ou psicologico.
          </p>
          <ul className="text-xs space-y-1 text-neutral-500">
            {result.sources.map((source, index) => (
              <li key={index}>- {source}</li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div variants={itemVariants} className="flex gap-4">
        <Button
          variant="outline"
          size="lg"
          className="flex-1"
          onClick={onRecalculate}
        >
          Refazer Quiz
        </Button>
        <Button
          variant="primary"
          size="lg"
          className="flex-1"
          onClick={handleShare}
        >
          Compartilhar
        </Button>
      </motion.div>
    </motion.div>
  )
}
