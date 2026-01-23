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
import type { TempoFamiliarResult } from '@/types'

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

interface TempoFamiliarChartProps {
  result: TempoFamiliarResult
  weekdayMinutes: number
  weekendMinutes: number
}

export function TempoFamiliarChart({
  result,
  weekdayMinutes,
  weekendMinutes,
}: TempoFamiliarChartProps) {
  // Score Doughnut Chart
  const scoreData = useMemo(
    () => ({
      labels: ['Sua Pontuação', 'Potencial'],
      datasets: [
        {
          data: [result.score, 100 - result.score],
          backgroundColor: [
            'rgba(139, 92, 246, 0.8)', // primary-500
            'rgba(229, 231, 235, 0.5)', // neutral-200
          ],
          borderColor: [
            'rgba(139, 92, 246, 1)',
            'rgba(229, 231, 235, 1)',
          ],
          borderWidth: 2,
          cutout: '70%',
        },
      ],
    }),
    [result.score]
  )

  const scoreOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'doughnut'>) => {
            return `${context.label}: ${context.parsed} pontos`
          },
        },
      },
    },
  }

  // Weekly Distribution Bar Chart
  const weeklyData = useMemo(() => {
    return {
      labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
      datasets: [
        {
          label: 'Minutos por dia',
          data: [
            weekdayMinutes,
            weekdayMinutes,
            weekdayMinutes,
            weekdayMinutes,
            weekdayMinutes,
            weekendMinutes,
            weekendMinutes,
          ],
          backgroundColor: [
            'rgba(139, 92, 246, 0.7)',
            'rgba(139, 92, 246, 0.7)',
            'rgba(139, 92, 246, 0.7)',
            'rgba(139, 92, 246, 0.7)',
            'rgba(139, 92, 246, 0.7)',
            'rgba(236, 72, 153, 0.7)', // Weekend color
            'rgba(236, 72, 153, 0.7)',
          ],
          borderColor: [
            'rgba(139, 92, 246, 1)',
            'rgba(139, 92, 246, 1)',
            'rgba(139, 92, 246, 1)',
            'rgba(139, 92, 246, 1)',
            'rgba(139, 92, 246, 1)',
            'rgba(236, 72, 153, 1)',
            'rgba(236, 72, 153, 1)',
          ],
          borderWidth: 1,
          borderRadius: 6,
        },
      ],
    }
  }, [weekdayMinutes, weekendMinutes])

  const weeklyOptions = {
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
            const mins = Math.round(value)
            const hours = Math.floor(mins / 60)
            const remainingMins = mins % 60
            if (hours > 0) {
              return `${hours}h ${remainingMins}min`
            }
            return `${mins}min`
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

  // Comparison Bar Chart
  const comparisonData = useMemo(() => {
    const dailyAverage = result.weeklyTotal / 7
    const nationalAverage = 108 // 1.8 hours in minutes

    return {
      labels: ['Sua Família', 'Média Nacional'],
      datasets: [
        {
          label: 'Minutos por dia',
          data: [dailyAverage, nationalAverage],
          backgroundColor: [
            'rgba(139, 92, 246, 0.8)',
            'rgba(156, 163, 175, 0.6)',
          ],
          borderColor: [
            'rgba(139, 92, 246, 1)',
            'rgba(156, 163, 175, 1)',
          ],
          borderWidth: 2,
          borderRadius: 8,
        },
      ],
    }
  }, [result.weeklyTotal])

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

  // Daily average reference
  const dailyAverage = (weekdayMinutes * 5 + weekendMinutes * 2) / 7

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="space-y-6"
    >
      {/* Score Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Sua Pontuação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-48 h-48 mx-auto">
            <Doughnut data={scoreData} options={scoreOptions} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="text-3xl font-bold text-primary-600">
                  {result.score}
                </span>
                <span className="text-neutral-500 block text-sm">pontos</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Distribuição Semanal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <Bar data={weeklyData} options={weeklyOptions} />
          </div>
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-primary-500" />
              <span className="text-neutral-600">Dias úteis</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-pink-500" />
              <span className="text-neutral-600">Fim de semana</span>
            </div>
          </div>
          {/* Daily average indicator */}
          <div className="mt-3 text-center text-sm text-neutral-600">
            Média diária: <span className="font-semibold text-green-600">{Math.round(dailyAverage)} min</span>
          </div>
        </CardContent>
      </Card>

      {/* National Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Comparação com Média Nacional</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32">
            <Bar data={comparisonData} options={comparisonOptions} />
          </div>
          <p className="text-sm text-neutral-500 mt-4 text-center">
            Baseado em dados do Pew Research Center (2021)
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
