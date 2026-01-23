'use client'

import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  getCategoryLabel,
  getCategoryColor,
  getCategoryBgColor,
  formatTime,
  getProgressToExcellent,
} from '@/lib/calculators/tempo-familiar'
import type { TempoFamiliarResult as TResult } from '@/types'

interface TempoFamiliarResultProps {
  result: TResult
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

export function TempoFamiliarResult({ result, onRecalculate }: TempoFamiliarResultProps) {
  const categoryLabel = getCategoryLabel(result.category)
  const categoryColor = getCategoryColor(result.category)
  const categoryBgColor = getCategoryBgColor(result.category)
  const progress = getProgressToExcellent(result.weeklyTotal / 7)

  const handleShare = async () => {
    const shareText = `Descobri que minha pontuação de tempo familiar é ${result.score}/100! Categoria: ${categoryLabel}. Faça o teste em FamilyTalks.org`

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Meu Resultado - Calculadora de Tempo Familiar',
          text: shareText,
          url: window.location.href,
        })
      } catch {
        // User cancelled or error
        copyToClipboard(shareText)
      }
    } else {
      copyToClipboard(shareText)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Resultado copiado para a área de transferência!')
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Score Card */}
      <motion.div variants={itemVariants}>
        <Card variant="elevated" className={`border-2 ${categoryBgColor}`}>
          <CardContent>
            <div className="text-center py-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-white shadow-lg mb-4 ${categoryColor}`}
              >
                <span className="text-4xl font-bold">{result.score}</span>
              </motion.div>
              <h3 className={`text-2xl font-bold ${categoryColor}`}>
                {categoryLabel}
              </h3>
              <p className="text-neutral-600 mt-2">
                Sua pontuação de tempo familiar
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Time Summary */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Resumo do Tempo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-neutral-50 rounded-lg">
                <p className="text-2xl font-bold text-primary-600">
                  {formatTime(result.weeklyTotal)}
                </p>
                <p className="text-sm text-neutral-500">por semana</p>
              </div>
              <div className="p-4 bg-neutral-50 rounded-lg">
                <p className="text-2xl font-bold text-primary-600">
                  {formatTime(result.monthlyTotal)}
                </p>
                <p className="text-sm text-neutral-500">por mês</p>
              </div>
              <div className="p-4 bg-neutral-50 rounded-lg">
                <p className="text-2xl font-bold text-primary-600">
                  {Math.round(result.yearlyProjection / 60)}h
                </p>
                <p className="text-sm text-neutral-500">por ano</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Progress Bar */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Progresso para &quot;Altamente Conectado&quot;</span>
                <span className="font-medium text-primary-600">{progress}%</span>
              </div>
              <div className="h-3 bg-neutral-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
                />
              </div>
            </div>
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
                  <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm">
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
            <CardTitle>Recomendações Personalizadas</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {result.recommendations.map((rec, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-start gap-3 p-3 bg-primary-50 rounded-lg border border-primary-100"
                >
                  <span className="text-primary-500 text-lg">
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
          <p className="font-medium mb-1">Base Científica</p>
          <p>
            Esta calculadora é baseada em pesquisas do Pew Research Center (2021) sobre tempo
            parental e estudos de Abbott (2019) sobre o impacto de 6+ horas semanais com pais
            em adolescentes.
          </p>
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
          Recalcular
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
