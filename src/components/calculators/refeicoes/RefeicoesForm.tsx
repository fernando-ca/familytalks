'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import {
  refeicoesSchema,
  durationLabels,
  screensLabels,
  type RefeicoesInput,
  type MealDuration,
  type ScreensPresence,
} from '@/lib/calculators/refeicoes'

interface RefeicoesFormProps {
  onSubmit: (data: RefeicoesInput) => void
  isLoading?: boolean
}

export function RefeicoesForm({ onSubmit, isLoading }: RefeicoesFormProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<RefeicoesInput>({
    resolver: zodResolver(refeicoesSchema),
    defaultValues: {
      breakfastPerWeek: 2,
      lunchPerWeek: 1,
      dinnerPerWeek: 4,
      averageDuration: '10to20',
      screensPresent: 'sometimes',
      bothParentsPresent: true,
      conversationQuality: 3,
    },
  })

  const conversationQuality = watch('conversationQuality')
  const totalMeals = (watch('breakfastPerWeek') || 0) + (watch('lunchPerWeek') || 0) + (watch('dinnerPerWeek') || 0)

  const getConversationLabel = (value: number) => {
    const labels: Record<number, string> = {
      1: 'Muito baixa - pouca interacao',
      2: 'Baixa - conversas superficiais',
      3: 'Moderada - algumas conversas significativas',
      4: 'Boa - conversas engajadas',
      5: 'Excelente - conversas profundas e conectadas',
    }
    return labels[value] || ''
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Meals per week */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-neutral-800">
          Refeicoes em familia por semana
        </h3>
        <p className="text-sm text-neutral-500">
          Quantas vezes toda a familia (ou a maioria) come junta?
        </p>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Input
              type="number"
              label="Cafe da manha"
              hint="0-7 por semana"
              error={errors.breakfastPerWeek?.message}
              {...register('breakfastPerWeek', { valueAsNumber: true })}
            />
          </div>
          <div>
            <Input
              type="number"
              label="Almoco"
              hint="0-7 por semana"
              error={errors.lunchPerWeek?.message}
              {...register('lunchPerWeek', { valueAsNumber: true })}
            />
          </div>
          <div>
            <Input
              type="number"
              label="Jantar"
              hint="0-7 por semana"
              error={errors.dinnerPerWeek?.message}
              {...register('dinnerPerWeek', { valueAsNumber: true })}
            />
          </div>
        </div>

        {/* Total indicator */}
        <div className="p-3 bg-primary-50 rounded-lg text-center">
          <span className="text-sm text-primary-700">
            Total: <strong className="text-lg">{totalMeals}</strong> refeicoes em familia por semana
          </span>
        </div>
      </div>

      {/* Duration */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-neutral-700">
          Duracao media das refeicoes
        </label>
        <Controller
          name="averageDuration"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(durationLabels) as MealDuration[]).map((duration) => (
                <button
                  key={duration}
                  type="button"
                  onClick={() => field.onChange(duration)}
                  className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                    field.value === duration
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
                  }`}
                >
                  {durationLabels[duration]}
                </button>
              ))}
            </div>
          )}
        />
        {errors.averageDuration && (
          <p className="text-sm text-red-500">{errors.averageDuration.message}</p>
        )}
      </div>

      {/* Screens */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-neutral-700">
          Telas durante as refeicoes (TV, celular, tablet)
        </label>
        <Controller
          name="screensPresent"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(screensLabels) as ScreensPresence[]).map((screen) => (
                <button
                  key={screen}
                  type="button"
                  onClick={() => field.onChange(screen)}
                  className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                    field.value === screen
                      ? screen === 'never'
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : screen === 'always'
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-yellow-500 bg-yellow-50 text-yellow-700'
                      : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
                  }`}
                >
                  {screensLabels[screen]}
                </button>
              ))}
            </div>
          )}
        />
      </div>

      {/* Both parents present */}
      <div className="space-y-2">
        <Controller
          name="bothParentsPresent"
          control={control}
          render={({ field }) => (
            <label className="flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all hover:bg-neutral-50">
              <input
                type="checkbox"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                className="w-5 h-5 text-primary-500 rounded border-neutral-300 focus:ring-primary-500"
              />
              <div>
                <span className="font-medium text-neutral-800">
                  Ambos os pais/responsaveis presentes regularmente
                </span>
                <p className="text-sm text-neutral-500">
                  Quando possivel, a presenca de ambos potencializa os beneficios
                </p>
              </div>
            </label>
          )}
        />
      </div>

      {/* Conversation Quality */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-neutral-700">
          Qualidade das conversas durante as refeicoes
        </label>
        <Controller
          name="conversationQuality"
          control={control}
          render={({ field }) => (
            <div className="space-y-2">
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
              />
              <div className="flex justify-between text-xs text-neutral-500">
                <span>Pouca</span>
                <span>Moderada</span>
                <span>Excelente</span>
              </div>
              <p className="text-sm text-center font-medium text-primary-600">
                {getConversationLabel(conversationQuality)}
              </p>
            </div>
          )}
        />
      </div>

      {/* Info Card */}
      <div className="rounded-lg bg-secondary-50 p-4 border border-secondary-100">
        <h4 className="text-sm font-semibold text-secondary-900 mb-2">
          Voce sabia?
        </h4>
        <ul className="text-sm text-secondary-700 space-y-1">
          <li>3+ refeicoes/semana reduzem em 12% o risco de obesidade</li>
          <li>5+ refeicoes/semana diminuem em 25% risco de depressao</li>
          <li>Refeicoes sem telas aumentam vocabulario em 50+ palavras/semana</li>
        </ul>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full"
        isLoading={isLoading}
      >
        Calcular Impacto das Refeicoes
      </Button>
    </motion.form>
  )
}
