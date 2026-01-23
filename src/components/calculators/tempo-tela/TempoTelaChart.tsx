'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  type TooltipItem,
} from 'chart.js'
import { Doughnut, Bar } from 'react-chartjs-2'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import {
  getWHORecommendation,
  getNationalAverage,
  calculateOpportunityCost,
  calculateProjections,
} from '@/lib/calculators/tempo-tela'
import type { TempoTelaResult, TempoTelaInput } from '@/types'

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
)

interface TempoTelaChartProps {
  result: TempoTelaResult
  input: TempoTelaInput
}

export function TempoTelaChart({ result, input }: TempoTelaChartProps) {
  const recommendation = getWHORecommendation(input.childAge)
  const nationalAvg = getNationalAverage(input.childAge)
  const projections = calculateProjections(input.dailyScreenMinutes, input.childAge)
  const excessMinutes = Math.max(0, input.dailyScreenMinutes - recommendation)
  const opportunityCost = calculateOpportunityCost(excessMinutes)

  // Usage Breakdown Doughnut
  const usageData = useMemo(
    () => ({
      labels: ['Educacional', 'Entretenimento', 'Antes de dormir'],
      datasets: [
        {
          data: [
            Math.round(input.dailyScreenMinutes * (input.educationalPercent / 100)),
            Math.round(input.dailyScreenMinutes * ((100 - input.educationalPercent) / 100)) - input.beforeBedMinutes,
            input.beforeBedMinutes,
          ],
          backgroundColor: [
            'rgba(34, 197, 94, 0.8)',  // green for educational
            'rgba(59, 130, 246, 0.8)', // blue for entertainment
            'rgba(239, 68, 68, 0.8)',  // red for before bed
          ],
          borderColor: [
            'rgba(34, 197, 94, 1)',
            'rgba(59, 130, 246, 1)',
            'rgba(239, 68, 68, 1)',
          ],
          borderWidth: 2,
        },
      ],
    }),
    [input]
  )

  const usageOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'doughnut'>) => {
            const mins = context.parsed
            const hours = Math.floor(mins / 60)
            const remainingMins = mins % 60
            if (hours > 0) {
              return `${context.label}: ${hours}h ${remainingMins}min`
            }
            return `${context.label}: ${mins}min`
          },
        },
      },
    },
  }

  // Comparison Bar Chart
  const comparisonData = useMemo(
    () => ({
      labels: ['Seu uso', 'Recomendação OMS', 'Média Nacional'],
      datasets: [
        {
          label: 'Minutos por dia',
          data: [input.dailyScreenMinutes, recommendation, nationalAvg],
          backgroundColor: [
            input.dailyScreenMinutes <= recommendation
              ? 'rgba(34, 197, 94, 0.8)'
              : 'rgba(239, 68, 68, 0.8)',
            'rgba(34, 197, 94, 0.6)',
            'rgba(156, 163, 175, 0.6)',
          ],
          borderColor: [
            input.dailyScreenMinutes <= recommendation
              ? 'rgba(34, 197, 94, 1)'
              : 'rgba(239, 68, 68, 1)',
            'rgba(34, 197, 94, 1)',
            'rgba(156, 163, 175, 1)',
          ],
          borderWidth: 2,
          borderRadius: 8,
        },
      ],
    }),
    [input.dailyScreenMinutes, recommendation, nationalAvg]
  )

  const comparisonOptions = {
    responsive: true,
    maintainAspectRatio: true,
    indexAxis: 'y' as const,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'bar'>) => {
            const value = context.parsed.x
            if (value === null) return ''
            const mins = Math.round(value)
            const hours = Math.floor(mins / 60)
            const remainingMins = mins % 60
            if (hours > 0) {
              return `${hours}h ${remainingMins}min por dia`
            }
            return `${mins}min por dia`
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Minutos por dia',
        },
      },
    },
  }

  // Opportunity Cost Chart (only show if there's excess)
  const opportunityCostData = useMemo(
    () => ({
      labels: ['Brincadeira livre', 'Tempo em família', 'Atividade física', 'Sono'],
      datasets: [
        {
          label: 'Minutos perdidos por dia',
          data: [
            opportunityCost.freePlay,
            opportunityCost.familyTime,
            opportunityCost.physicalActivity,
            opportunityCost.sleep,
          ],
          backgroundColor: [
            'rgba(139, 92, 246, 0.7)',
            'rgba(236, 72, 153, 0.7)',
            'rgba(34, 197, 94, 0.7)',
            'rgba(59, 130, 246, 0.7)',
          ],
          borderColor: [
            'rgba(139, 92, 246, 1)',
            'rgba(236, 72, 153, 1)',
            'rgba(34, 197, 94, 1)',
            'rgba(59, 130, 246, 1)',
          ],
          borderWidth: 1,
          borderRadius: 6,
        },
      ],
    }),
    [opportunityCost]
  )

  const opportunityCostOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'bar'>) => {
            const value = context.parsed.y
            if (value === null) return ''
            return `${Math.round(value)} min por dia`
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Minutos',
        },
      },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="space-y-6"
    >
      {/* Usage Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Distribuição do Uso</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-64 h-64 mx-auto">
            <Doughnut data={usageData} options={usageOptions} />
          </div>
        </CardContent>
      </Card>

      {/* Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Comparativo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-40">
            <Bar data={comparisonData} options={comparisonOptions} />
          </div>
          <p className="text-sm text-neutral-500 mt-4 text-center">
            Baseado em recomendações da OMS e dados do Common Sense Media (2021)
          </p>
        </CardContent>
      </Card>

      {/* Opportunity Cost Chart */}
      {excessMinutes > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Custo de Oportunidade</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-600 mb-4">
              Atividades que podem estar sendo substituídas pelo tempo de tela excedente:
            </p>
            <div className="h-48">
              <Bar data={opportunityCostData} options={opportunityCostOptions} />
            </div>
            <p className="text-xs text-neutral-500 mt-4 text-center">
              Estimativa baseada em pesquisas sobre deslocamento de atividades (Twenge et al., 2019)
            </p>
          </CardContent>
        </Card>
      )}

      {/* Projections Card */}
      <Card>
        <CardHeader>
          <CardTitle>Projeções no Tempo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-3xl font-bold text-blue-600">
                {projections.yearlyHours}h
              </p>
              <p className="text-sm text-neutral-600">por ano</p>
              <p className="text-xs text-neutral-500 mt-1">
                ({projections.yearlyDays} dias inteiros)
              </p>
            </div>
            {input.childAge < 18 && (
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-3xl font-bold text-orange-600">
                  {projections.hoursUntil18.toLocaleString()}h
                </p>
                <p className="text-sm text-neutral-600">até os 18 anos</p>
                <p className="text-xs text-neutral-500 mt-1">
                  ({projections.daysUntil18} dias inteiros)
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
