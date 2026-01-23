'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  formatConnectionTime,
  getYearlyProjection,
  type RefeicoesResult as RefeicoesResultType,
} from '@/lib/calculators/refeicoes'

interface RefeicoesResultProps {
  result: RefeicoesResultType
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

export function RefeicoesResult({ result, onRecalculate }: RefeicoesResultProps) {
  const [showConversationStarters, setShowConversationStarters] = useState(false)
  const yearlyProjection = getYearlyProjection(result.currentStatus.totalConnectionMinutes)

  const handleShare = async () => {
    const shareText = `Minha familia faz ${result.currentStatus.totalMealsPerWeek} refeicoes juntos por semana! Somos uma "${result.currentStatus.categoryLabel}". Descubra o impacto das suas refeicoes em familia em FamilyTalks.org`

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Calculadora de Refeicoes em Familia - FamilyTalks',
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
      {/* Main Score Card */}
      <motion.div variants={itemVariants}>
        <Card variant="elevated" className={`border-2 ${result.currentStatus.categoryBgColor}`}>
          <CardContent>
            <div className="text-center py-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-white shadow-lg mb-4"
              >
                <div className="text-center">
                  <span className={`text-4xl font-bold ${result.currentStatus.categoryColor}`}>
                    {result.currentStatus.totalMealsPerWeek}
                  </span>
                  <p className="text-xs text-neutral-500">refeicoes/sem</p>
                </div>
              </motion.div>
              <h3 className={`text-2xl font-bold ${result.currentStatus.categoryColor}`}>
                {result.currentStatus.categoryLabel}
              </h3>
              <p className="text-neutral-600 mt-2">
                Qualidade: {result.currentStatus.qualityScore}/100
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Connection Time */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Tempo de Conexao</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-neutral-50 rounded-lg">
                <p className="text-2xl font-bold text-primary-600">
                  {formatConnectionTime(result.currentStatus.totalConnectionMinutes)}
                </p>
                <p className="text-sm text-neutral-500">por semana</p>
              </div>
              <div className="p-4 bg-neutral-50 rounded-lg">
                <p className="text-2xl font-bold text-primary-600">
                  {yearlyProjection.hours}h
                </p>
                <p className="text-sm text-neutral-500">por ano</p>
              </div>
              <div className="p-4 bg-neutral-50 rounded-lg">
                <p className="text-2xl font-bold text-primary-600">
                  {yearlyProjection.days}
                </p>
                <p className="text-sm text-neutral-500">dias inteiros/ano</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Protection Factors */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Fatores de Protecao</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(result.protectionFactors).map(([key, factor], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-neutral-800 text-sm">{factor.label}</span>
                  <span className={`font-bold ${factor.current < 0 ? 'text-green-600' : 'text-neutral-400'}`}>
                    {factor.current}%
                  </span>
                </div>
                <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-green-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(Math.abs(factor.current) / Math.abs(factor.potential) * 100, 100)}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                  />
                </div>
                <p className="text-xs text-neutral-500">{factor.description}</p>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Impact of One More Meal */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <span className="text-2xl">+1</span>
              Impacto de Mais Uma Refeicao
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-white rounded-lg">
                <p className="text-xl font-bold text-green-600">{result.impactOfOne.yearlyHours}h</p>
                <p className="text-xs text-neutral-500">horas/ano adicionais</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <p className="text-xl font-bold text-green-600">+{result.impactOfOne.vocabularyExposure}</p>
                <p className="text-xs text-neutral-500">palavras/ano</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <p className="text-xl font-bold text-green-600">-{result.impactOfOne.riskReduction}%</p>
                <p className="text-xs text-neutral-500">reducao de risco</p>
              </div>
            </div>
            <p className="text-sm text-green-700">{result.impactOfOne.description}</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* National Comparison */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Comparacao Nacional</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-primary-50 rounded-lg">
                <span className="text-neutral-700">Sua familia</span>
                <span className="font-bold text-primary-600">
                  {result.nationalComparison.yourFamily} refeicoes/semana
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
                <span className="text-neutral-700">Media nacional</span>
                <span className="font-medium text-neutral-600">
                  {result.nationalComparison.nationalAverage} refeicoes/semana
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
                <span className="text-neutral-700">Familias alta conexao</span>
                <span className="font-medium text-neutral-600">
                  {result.nationalComparison.highConnectionFamilies}+ refeicoes/semana
                </span>
              </div>
              <div className="text-center p-4 bg-secondary-50 rounded-lg">
                <p className="text-sm text-secondary-700">
                  Voce esta no <strong className="text-secondary-900">percentil {result.nationalComparison.percentile}</strong> das familias brasileiras
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Action Plan */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Plano de Acao - Proximo Mes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-primary-50 rounded-lg">
              <span>Meta: de {result.actionPlan.currentMeals} para</span>
              <span className="text-2xl font-bold text-primary-600">
                {result.actionPlan.goalMeals} refeicoes/semana
              </span>
            </div>

            <div className="space-y-3">
              {result.actionPlan.weeklyPlan.map((week, index) => (
                <motion.div
                  key={week.week}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-4 p-3 bg-neutral-50 rounded-lg"
                >
                  <div className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">
                    {week.week}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-neutral-800">
                      Semana {week.week}: {week.goal} refeicoes
                    </p>
                    <p className="text-sm text-neutral-500">{week.tip}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Golden Rules */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Regras de Ouro</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {result.actionPlan.goldenRules.map((rule, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100"
                >
                  <span className="text-amber-500 text-lg">
                    <svg className="w-5 h-5 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </span>
                  <span className="text-neutral-700">{rule}</span>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Conversation Starters */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Sugestoes de Conversa</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowConversationStarters(!showConversationStarters)}
              >
                {showConversationStarters ? 'Ocultar' : 'Mostrar'}
              </Button>
            </CardTitle>
          </CardHeader>
          {showConversationStarters && (
            <CardContent>
              <div className="grid gap-3">
                {result.conversationStarters.map((starter, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-3 bg-neutral-50 rounded-lg"
                  >
                    <span className="text-xs font-medium text-primary-600 uppercase">
                      {starter.category}
                    </span>
                    <p className="text-neutral-700 mt-1">{starter.question}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          )}
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
            <CardTitle>Recomendacoes Personalizadas</CardTitle>
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
                  <span className="text-primary-500">
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
            Esta calculadora e baseada em pesquisas sobre refeicoes em familia e desenvolvimento infantil.
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
