'use client'

import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  getCategoryLabel,
  getCategoryColor,
  getCategoryBgColor,
  formatCurrency,
  getAlternativeComparisons,
} from '@/lib/calculators/roi-social'
import type { ROISocialResult as TResult } from '@/types'

interface ROISocialResultProps {
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

export function ROISocialResult({ result, onRecalculate }: ROISocialResultProps) {
  const categoryLabel = getCategoryLabel(result.category)
  const categoryColor = getCategoryColor(result.category)
  const categoryBgColor = getCategoryBgColor(result.category)
  const comparisons = getAlternativeComparisons()

  const handleShare = async () => {
    const shareText = `Descobri que meu investimento em tempo parental gera ${formatCurrency(result.totalROI)}/ano em valor social! Categoria: ${categoryLabel}. Calcule o seu em FamilyTalks.org`

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Meu ROI Social da Parentalidade',
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
    alert('Resultado copiado para a área de transferência!')
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Main ROI Card */}
      <motion.div variants={itemVariants}>
        <Card variant="elevated" className={`border-2 ${categoryBgColor}`}>
          <CardContent>
            <div className="text-center py-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="mb-4"
              >
                <span className="text-5xl font-bold text-green-600">
                  {formatCurrency(result.totalROI)}
                </span>
                <p className="text-neutral-600 mt-1">valor social por ano</p>
              </motion.div>
              <h3 className={`text-xl font-bold ${categoryColor}`}>
                {categoryLabel}
              </h3>
              <p className="text-sm text-neutral-500 mt-2">
                Pontuação: {result.score}/100
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Key Metrics */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Métricas de Valor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(result.perFamilyBenefit)}
                </p>
                <p className="text-sm text-neutral-500">por hora</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency(result.societalImpact)}
                </p>
                <p className="text-sm text-neutral-500">impacto 1000 famílias</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Score Progress */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Nível de Investimento</span>
                <span className={`font-medium ${categoryColor}`}>{categoryLabel}</span>
              </div>
              <div className="h-3 bg-neutral-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${result.score}%` }}
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
            <CardTitle>Insights de Valor</CardTitle>
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
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm">
                    {index + 1}
                  </span>
                  <span className="text-neutral-700">{insight}</span>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Comparison Table */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Comparação com Alternativas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-2 text-neutral-600">Intervenção</th>
                    <th className="text-right py-2 text-neutral-600">Custo/Ano</th>
                    <th className="text-right py-2 text-neutral-600">ROI</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((item, index) => (
                    <tr key={index} className={index === 0 ? 'bg-green-50' : ''}>
                      <td className="py-2 font-medium">
                        {item.intervention}
                        {index === 0 && (
                          <span className="ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded">
                            Você
                          </span>
                        )}
                      </td>
                      <td className="text-right py-2 text-neutral-600">
                        {item.costPerChild === 0 ? 'R$0' : formatCurrency(item.costPerChild)}
                      </td>
                      <td className="text-right py-2 font-medium text-green-600">
                        {item.roi}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recommendations */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Recomendações</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {result.recommendations.map((rec, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-100"
                >
                  <span className="text-green-500 text-lg">
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
            Os cálculos são baseados em estudos de custo-benefício que mostram que
            transtornos de conduta custam ~$70.000 por criança em 7 anos (Foster & Jones, 2009).
            Valores adaptados para o contexto brasileiro.
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
          size="lg"
          className="flex-1 bg-green-500 hover:bg-green-600"
          onClick={handleShare}
        >
          Compartilhar
        </Button>
      </motion.div>
    </motion.div>
  )
}
