'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import {
  momentCategories,
  type MomentCategory,
  type MomentInput,
  type MomentosInput,
} from '@/lib/calculators/momentos-conexao'

interface MomentosFormProps {
  onSubmit: (data: MomentosInput) => void
  isLoading?: boolean
}

const categoryOrder: MomentCategory[] = ['conversation', 'play', 'meal', 'learning', 'outdoor', 'routine']

const durationOptions = [
  { value: 5, label: '5 min' },
  { value: 10, label: '10 min' },
  { value: 15, label: '15 min' },
  { value: 20, label: '20 min' },
  { value: 30, label: '30 min' },
  { value: 45, label: '45 min' },
  { value: 60, label: '1 hora' },
  { value: 90, label: '1h 30min' },
  { value: 120, label: '2 horas' },
]

export function MomentosForm({ onSubmit, isLoading }: MomentosFormProps) {
  const [moments, setMoments] = useState<MomentInput[]>([])
  const [currentMoment, setCurrentMoment] = useState<Partial<MomentInput>>({
    type: undefined,
    duration: 15,
    date: new Date().toISOString().split('T')[0],
  })
  const [showAddForm, setShowAddForm] = useState(true)

  const handleAddMoment = () => {
    if (!currentMoment.type || !currentMoment.duration || !currentMoment.date) {
      return
    }

    const newMoment: MomentInput = {
      type: currentMoment.type,
      duration: currentMoment.duration,
      date: currentMoment.date,
    }

    setMoments([...moments, newMoment])
    setCurrentMoment({
      type: undefined,
      duration: 15,
      date: new Date().toISOString().split('T')[0],
    })
  }

  const handleRemoveMoment = (index: number) => {
    setMoments(moments.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    if (moments.length === 0) return
    onSubmit({ moments, targetMomentsPerWeek: 20 })
  }

  const getMomentsByDate = () => {
    const grouped = new Map<string, MomentInput[]>()
    moments.forEach((m) => {
      const date = m.date.split('T')[0]
      const existing = grouped.get(date) || []
      grouped.set(date, [...existing, m])
    })
    return Array.from(grouped.entries()).sort((a, b) => b[0].localeCompare(a[0]))
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T12:00:00')
    const today = new Date()
    today.setHours(12, 0, 0, 0)

    const diffTime = today.getTime() - date.getTime()
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Hoje'
    if (diffDays === 1) return 'Ontem'
    if (diffDays === -1) return 'Amanha'

    return date.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' })
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Add Moment Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 p-4 bg-teal-50/50 rounded-xl border border-teal-100"
          >
            <h3 className="font-semibold text-teal-900">Adicionar Momento de Conexao</h3>

            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Quando aconteceu?
              </label>
              <input
                type="date"
                value={currentMoment.date}
                onChange={(e) => setCurrentMoment({ ...currentMoment, date: e.target.value })}
                max={new Date().toISOString().split('T')[0]}
                className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Tipo de momento
              </label>
              <div className="grid grid-cols-2 gap-2">
                {categoryOrder.map((cat) => {
                  const info = momentCategories[cat]
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCurrentMoment({ ...currentMoment, type: cat })}
                      className={`p-3 rounded-lg border-2 text-left transition-all ${
                        currentMoment.type === cat
                          ? 'border-teal-500 bg-teal-50 ring-2 ring-teal-200'
                          : 'border-neutral-200 bg-white hover:border-neutral-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{info.icon}</span>
                        <span className="font-medium text-sm">{info.label}</span>
                      </div>
                      <p className="text-xs text-neutral-500 mt-1">
                        Min: {info.minDuration} min | Peso: {info.weight}x
                      </p>
                    </button>
                  )
                })}
              </div>
              {currentMoment.type && (
                <div className="mt-2 p-2 bg-white rounded-lg border border-neutral-100">
                  <p className="text-xs text-neutral-600">
                    <strong>Exemplos:</strong> {momentCategories[currentMoment.type].examples.join(', ')}
                  </p>
                </div>
              )}
            </div>

            {/* Duration Selection */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Duracao
              </label>
              <div className="flex flex-wrap gap-2">
                {durationOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setCurrentMoment({ ...currentMoment, duration: opt.value })}
                    className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                      currentMoment.duration === opt.value
                        ? 'border-teal-500 bg-teal-50 text-teal-700'
                        : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Add Button */}
            <Button
              type="button"
              variant="outline"
              className="w-full border-teal-300 text-teal-700 hover:bg-teal-50"
              onClick={handleAddMoment}
              disabled={!currentMoment.type || !currentMoment.duration}
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Adicionar Momento
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Add Form */}
      {!showAddForm && (
        <Button
          type="button"
          variant="outline"
          className="w-full border-teal-300 text-teal-700 hover:bg-teal-50"
          onClick={() => setShowAddForm(true)}
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Adicionar Mais Momentos
        </Button>
      )}

      {/* Moments List */}
      {moments.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-neutral-800">
              Seus Momentos ({moments.length})
            </h3>
            {showAddForm && (
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="text-sm text-neutral-500 hover:text-neutral-700"
              >
                Minimizar formulario
              </button>
            )}
          </div>

          <div className="space-y-3">
            {getMomentsByDate().map(([date, dateMoments]) => (
              <div key={date} className="space-y-2">
                <h4 className="text-sm font-medium text-neutral-600">{formatDate(date)}</h4>
                <div className="space-y-2">
                  {dateMoments.map((moment, idx) => {
                    const info = momentCategories[moment.type]
                    const originalIndex = moments.findIndex(
                      (m) => m.date === moment.date && m.type === moment.type && m.duration === moment.duration
                    )
                    return (
                      <motion.div
                        key={`${date}-${idx}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex items-center justify-between p-3 bg-white rounded-lg border border-neutral-200 shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{info.icon}</span>
                          <div>
                            <p className="font-medium text-neutral-800">{info.label}</p>
                            <p className="text-sm text-neutral-500">{moment.duration} minutos</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveMoment(originalIndex)}
                          className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {moments.length === 0 && !showAddForm && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">💫</span>
          </div>
          <p className="text-neutral-600">Nenhum momento registrado ainda.</p>
          <p className="text-sm text-neutral-500">Clique no botao acima para comecar!</p>
        </div>
      )}

      {/* Summary & Submit */}
      {moments.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-neutral-200">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-neutral-50 rounded-lg">
              <p className="text-2xl font-bold text-teal-600">{moments.length}</p>
              <p className="text-xs text-neutral-600">Momentos</p>
            </div>
            <div className="p-3 bg-neutral-50 rounded-lg">
              <p className="text-2xl font-bold text-teal-600">
                {new Set(moments.map((m) => m.type)).size}
              </p>
              <p className="text-xs text-neutral-600">Categorias</p>
            </div>
            <div className="p-3 bg-neutral-50 rounded-lg">
              <p className="text-2xl font-bold text-teal-600">
                {moments.reduce((sum, m) => sum + m.duration, 0)}
              </p>
              <p className="text-xs text-neutral-600">Minutos</p>
            </div>
          </div>

          {/* Variety Bonus Indicator */}
          {new Set(moments.map((m) => m.type)).size >= 4 && (
            <div className="p-3 bg-purple-50 rounded-lg border border-purple-100 text-center">
              <span className="text-purple-700 font-medium">
                🎉 Bonus de Variedade Ativado! (4+ categorias = 1.2x pontos)
              </span>
            </div>
          )}

          <Button
            type="button"
            size="lg"
            className="w-full bg-teal-600 hover:bg-teal-700"
            onClick={handleSubmit}
            isLoading={isLoading}
          >
            Calcular Impacto dos Momentos
          </Button>
        </div>
      )}

      {/* Info Card */}
      <div className="rounded-lg bg-secondary-50 p-4 border border-secondary-100">
        <h4 className="text-sm font-semibold text-secondary-900 mb-2">
          O que sao momentos de conexao?
        </h4>
        <p className="text-sm text-secondary-700 mb-2">
          Momentos de conexao sao interacoes presenciais de qualidade com seus filhos,
          com duracao minima de 5 minutos e atencao plena.
        </p>
        <ul className="text-sm text-secondary-700 space-y-1">
          <li>• 20+ momentos/semana = familia altamente conectada</li>
          <li>• 66 dias consecutivos = habito consolidado</li>
          <li>• Variedade (4+ tipos) = bonus de 20% nos pontos</li>
        </ul>
      </div>
    </motion.div>
  )
}
