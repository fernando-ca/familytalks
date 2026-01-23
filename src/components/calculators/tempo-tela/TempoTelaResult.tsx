'use client'

import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  getRiskLabel,
  getRiskColor,
  getRiskBgColor,
  formatTime,
} from '@/lib/calculators/tempo-tela'
import type { TempoTelaResult as TResult } from '@/types'

interface TempoTelaResultProps {
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

export function TempoTelaResult({ result, onRecalculate }: TempoTelaResultProps) {
  const riskLabel = getRiskLabel(result.riskLevel)
  const riskColor = getRiskColor(result.riskLevel)
  const riskBgColor = getRiskBgColor(result.riskLevel)

  const handleShare = async () => {
    const shareText = `Descobri que o nível de risco do tempo de tela é ${riskLabel}. Pontuação: ${result.score}/100. Faça o teste em FamilyTalks.org`

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Meu Resultado - Calculadora de Tempo de Tela',
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
      {/* Risk Level Card */}
      <motion.div variants={itemVariants}>
        <Card variant="elevated" className={`border-2 ${riskBgColor}`}>
          <CardContent>
            <div className="text-center py-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-white shadow-lg mb-4 ${riskColor}`}
              >
                <span className="text-4xl font-bold">{result.score}</span>
              </motion.div>
              <h3 className={`text-2xl font-bold ${riskColor}`}>
                Risco {riskLabel}
              </h3>
              <p className="text-neutral-600 mt-2">
                {result.ageAppropriate
                  ? 'Dentro da recomendação para a idade'
                  : 'Acima da recomendação para a idade'}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Key Metrics */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Limite Recomendado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">
                  {formatTime(result.suggestedLimit)}
                </p>
                <p className="text-sm text-neutral-500">limite diário OMS</p>
              </div>
              <div className={`p-4 rounded-lg ${result.ageAppropriate ? 'bg-green-50' : 'bg-orange-50'}`}>
                <p className={`text-2xl font-bold ${result.ageAppropriate ? 'text-green-600' : 'text-orange-600'}`}>
                  {result.ageAppropriate ? 'OK' : 'Excedido'}
                </p>
                <p className="text-sm text-neutral-500">
                  {result.ageAppropriate ? 'adequado à idade' : 'acima do ideal'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Risk Indicator */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Nível de Risco</span>
                <span className={`font-medium ${riskColor}`}>{riskLabel}</span>
              </div>
              <div className="h-3 bg-neutral-200 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${
                    result.riskLevel === 'low' ? 'bg-green-500' :
                    result.riskLevel === 'moderate' ? 'bg-yellow-500' :
                    result.riskLevel === 'high' ? 'bg-orange-500' :
                    'bg-red-500'
                  }`}
                  initial={{ width: 0 }}
                  animate={{
                    width: `${
                      result.riskLevel === 'low' ? 25 :
                      result.riskLevel === 'moderate' ? 50 :
                      result.riskLevel === 'high' ? 75 :
                      100
                    }%`
                  }}
                  transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
                />
              </div>
              <div className="flex justify-between text-xs text-neutral-400">
                <span>Baixo</span>
                <span>Moderado</span>
                <span>Elevado</span>
                <span>Crítico</span>
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
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">
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
                  className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100"
                >
                  <span className="text-blue-500 text-lg">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
            Esta calculadora é baseada em recomendações da OMS (2019), pesquisas do
            Common Sense Media (2021), e dados de Jonathan Haidt sobre o impacto de
            telas na saúde mental de jovens.
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
          className="flex-1 bg-blue-500 hover:bg-blue-600"
          onClick={handleShare}
        >
          Compartilhar
        </Button>
      </motion.div>
    </motion.div>
  )
}
