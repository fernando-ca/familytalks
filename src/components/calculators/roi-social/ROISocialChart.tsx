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
  calculatePublicSavings,
  calculateCommunityImpact,
  calculateLifetimeROI,
  formatCurrency,
} from '@/lib/calculators/roi-social'
import type { ROISocialResult, ROISocialInput } from '@/types'

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

interface ROISocialChartProps {
  result: ROISocialResult
  input: ROISocialInput
}

export function ROISocialChart({ result, input }: ROISocialChartProps) {
  const publicSavings = calculatePublicSavings(input.programInvestment, input.familiesReached)
  const communityImpact = calculateCommunityImpact(result.totalROI)
  const lifetimeROI = calculateLifetimeROI(result.totalROI, 8)

  // Activity Distribution Doughnut
  const activityData = useMemo(
    () => {
      const educationalHours = input.avgIncomeIncrease
      const healthHours = input.healthSavings
      const connectionHours = input.educationImprovement
      const otherHours = Math.max(0, input.programInvestment - educationalHours - healthHours - connectionHours)

      return {
        labels: ['Educacional (1.5x)', 'Físico (1.2x)', 'Conexão (1.35x)', 'Outros (1.0x)'],
        datasets: [
          {
            data: [educationalHours, healthHours, connectionHours, otherHours],
            backgroundColor: [
              'rgba(147, 51, 234, 0.8)',  // purple
              'rgba(59, 130, 246, 0.8)',  // blue
              'rgba(236, 72, 153, 0.8)',  // pink
              'rgba(156, 163, 175, 0.6)', // gray
            ],
            borderColor: [
              'rgba(147, 51, 234, 1)',
              'rgba(59, 130, 246, 1)',
              'rgba(236, 72, 153, 1)',
              'rgba(156, 163, 175, 1)',
            ],
            borderWidth: 2,
          },
        ],
      }
    },
    [input]
  )

  const activityOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 12,
          font: {
            size: 11,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'doughnut'>) => {
            return `${context.label}: ${context.parsed}h/semana`
          },
        },
      },
    },
  }

  // Public Savings Bar Chart
  const savingsData = useMemo(
    () => ({
      labels: ['Saúde Mental', 'Prevenção Substâncias', 'Educação'],
      datasets: [
        {
          label: 'Economia Anual (R$)',
          data: [publicSavings.mentalHealth, publicSavings.substanceAbuse, publicSavings.education],
          backgroundColor: [
            'rgba(34, 197, 94, 0.7)',
            'rgba(59, 130, 246, 0.7)',
            'rgba(147, 51, 234, 0.7)',
          ],
          borderColor: [
            'rgba(34, 197, 94, 1)',
            'rgba(59, 130, 246, 1)',
            'rgba(147, 51, 234, 1)',
          ],
          borderWidth: 2,
          borderRadius: 8,
        },
      ],
    }),
    [publicSavings]
  )

  const savingsOptions = {
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
            return formatCurrency(value)
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number | string) => {
            if (typeof value === 'number') {
              return `R$${(value / 1000).toFixed(0)}k`
            }
            return value
          },
        },
      },
    },
  }

  // Community Impact Bar Chart
  const communityData = useMemo(
    () => ({
      labels: ['Saúde Pública', 'Sistema de Justiça', 'Educação', 'Produtividade'],
      datasets: [
        {
          label: 'Impacto para 1000 famílias (R$)',
          data: [
            communityImpact.publicHealth,
            communityImpact.justiceSavings,
            communityImpact.educationGains,
            communityImpact.productivityGains,
          ],
          backgroundColor: 'rgba(34, 197, 94, 0.7)',
          borderColor: 'rgba(34, 197, 94, 1)',
          borderWidth: 2,
          borderRadius: 8,
        },
      ],
    }),
    [communityImpact]
  )

  const communityOptions = {
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
            return formatCurrency(value)
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          callback: (value: number | string) => {
            if (typeof value === 'number') {
              if (value >= 1000000) {
                return `R$${(value / 1000000).toFixed(1)}M`
              }
              return `R$${(value / 1000).toFixed(0)}k`
            }
            return value
          },
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
      {/* Activity Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Distribuição das Atividades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-64 h-64 mx-auto">
            <Doughnut data={activityData} options={activityOptions} />
          </div>
          <p className="text-sm text-neutral-500 mt-4 text-center">
            Atividades com maior peso geram mais valor por hora
          </p>
        </CardContent>
      </Card>

      {/* Public Savings */}
      <Card>
        <CardHeader>
          <CardTitle>Economia em Custos Públicos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <Bar data={savingsData} options={savingsOptions} />
          </div>
          <div className="mt-4 p-3 bg-green-50 rounded-lg text-center">
            <p className="text-sm text-neutral-600">Total de economia anual estimada:</p>
            <p className="text-xl font-bold text-green-600">
              {formatCurrency(publicSavings.total)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Community Impact */}
      <Card>
        <CardHeader>
          <CardTitle>Impacto Comunitário (1000 famílias)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <Bar data={communityData} options={communityOptions} />
          </div>
          <p className="text-sm text-neutral-500 mt-4 text-center">
            Se 1000 famílias investissem o mesmo tempo
          </p>
        </CardContent>
      </Card>

      {/* Lifetime Value Card */}
      <Card>
        <CardHeader>
          <CardTitle>Projeção de Longo Prazo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-3xl font-bold text-green-600">
                {formatCurrency(result.totalROI)}
              </p>
              <p className="text-sm text-neutral-600">por ano</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-3xl font-bold text-purple-600">
                {formatCurrency(lifetimeROI)}
              </p>
              <p className="text-sm text-neutral-600">até os 18 anos</p>
            </div>
          </div>
          <p className="text-xs text-neutral-500 mt-4 text-center">
            Baseado em média de idade de 8 anos para os filhos
          </p>
        </CardContent>
      </Card>

      {/* ROI Explanation */}
      <Card>
        <CardContent className="py-4">
          <h4 className="font-semibold text-neutral-900 mb-3">Como o ROI é calculado?</h4>
          <ul className="text-sm text-neutral-600 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-green-500">•</span>
              <span>Estudos mostram que problemas de conduta custam ~$70.000 por criança</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">•</span>
              <span>500 horas/ano de tempo de qualidade pode evitar esses custos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">•</span>
              <span>Isso equivale a ~R$100 de valor social por hora investida</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">•</span>
              <span>Atividades de maior impacto recebem multiplicadores maiores</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  )
}
