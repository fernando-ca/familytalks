'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { roiSocialSchema } from '@/lib/calculators/roi-social'
import type { ROISocialInput } from '@/types'

interface ROISocialFormProps {
  onSubmit: (data: ROISocialInput) => void
  isLoading?: boolean
}

export function ROISocialForm({ onSubmit, isLoading }: ROISocialFormProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<ROISocialInput>({
    resolver: zodResolver(roiSocialSchema),
    defaultValues: {
      programInvestment: 10,      // Total weekly hours
      familiesReached: 2,         // Number of children
      avgIncomeIncrease: 3,       // Educational hours
      healthSavings: 2,           // Health activity hours
      educationImprovement: 3,    // Connection hours
    },
  })

  const totalHours = watch('programInvestment')
  const educationalHours = watch('avgIncomeIncrease')
  const healthHours = watch('healthSavings')
  const connectionHours = watch('educationImprovement')

  const allocatedHours = educationalHours + healthHours + connectionHours
  const remainingHours = Math.max(0, totalHours - allocatedHours)

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Total Weekly Hours */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-neutral-700">
          Horas semanais de tempo de qualidade
        </label>
        <Controller
          name="programInvestment"
          control={control}
          render={({ field }) => (
            <div className="space-y-2">
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
              />
              <div className="flex justify-between text-xs text-neutral-500">
                <span>1h</span>
                <span>10h</span>
                <span>20h</span>
                <span>30h</span>
              </div>
              <p className="text-center">
                <span className="text-2xl font-bold text-green-600">{totalHours}h</span>
                <span className="text-neutral-500 ml-1">por semana</span>
              </p>
            </div>
          )}
        />
        {errors.programInvestment && (
          <p className="text-sm text-red-500">{errors.programInvestment.message}</p>
        )}
      </div>

      {/* Number of Children */}
      <div>
        <Input
          type="number"
          label="Número de filhos"
          hint="Quantos filhos você tem?"
          error={errors.familiesReached?.message}
          {...register('familiesReached', { valueAsNumber: true })}
        />
      </div>

      {/* Activity Breakdown Section */}
      <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
        <h4 className="font-semibold text-neutral-900 mb-4">
          Distribuição das Atividades (por semana)
        </h4>

        {/* Educational Hours */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <label className="text-sm font-medium text-neutral-700">
              Atividades Educacionais
            </label>
            <span className="text-sm font-bold text-purple-600">{educationalHours}h</span>
          </div>
          <Controller
            name="avgIncomeIncrease"
            control={control}
            render={({ field }) => (
              <input
                type="range"
                min="0"
                max="15"
                step="0.5"
                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
              />
            )}
          />
          <p className="text-xs text-neutral-500">Leitura, dever de casa, aprendizado (peso 1.5x)</p>
        </div>

        {/* Health Hours */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <label className="text-sm font-medium text-neutral-700">
              Atividades Físicas
            </label>
            <span className="text-sm font-bold text-blue-600">{healthHours}h</span>
          </div>
          <Controller
            name="healthSavings"
            control={control}
            render={({ field }) => (
              <input
                type="range"
                min="0"
                max="15"
                step="0.5"
                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
              />
            )}
          />
          <p className="text-xs text-neutral-500">Esportes, brincadeiras ao ar livre (peso 1.2x)</p>
        </div>

        {/* Connection Hours */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium text-neutral-700">
              Momentos de Conexão
            </label>
            <span className="text-sm font-bold text-pink-600">{connectionHours}h</span>
          </div>
          <Controller
            name="educationImprovement"
            control={control}
            render={({ field }) => (
              <input
                type="range"
                min="0"
                max="15"
                step="0.5"
                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
              />
            )}
          />
          <p className="text-xs text-neutral-500">Refeições, conversas significativas (peso 1.35x)</p>
        </div>

        {/* Summary */}
        <div className="mt-4 pt-4 border-t border-neutral-200">
          <div className="flex justify-between text-sm">
            <span className="text-neutral-600">Alocado:</span>
            <span className={allocatedHours > totalHours ? 'text-red-500 font-bold' : 'text-neutral-900 font-medium'}>
              {allocatedHours}h de {totalHours}h
            </span>
          </div>
          {remainingHours > 0 && (
            <div className="flex justify-between text-sm mt-1">
              <span className="text-neutral-600">Outras atividades:</span>
              <span className="text-neutral-500">{remainingHours}h (peso 1.0x)</span>
            </div>
          )}
          {allocatedHours > totalHours && (
            <p className="text-xs text-red-500 mt-2">
              Reduza as horas das atividades para não exceder o total semanal
            </p>
          )}
        </div>
      </div>

      {/* Info Card */}
      <div className="rounded-lg bg-green-50 p-4 border border-green-100">
        <h4 className="text-sm font-semibold text-green-900 mb-2">
          Como calculamos o ROI?
        </h4>
        <p className="text-sm text-green-700">
          Baseado em estudos econômicos, cada hora de tempo parental de qualidade
          gera aproximadamente R$100 em valor social, evitando custos futuros com
          saúde mental, sistema de justiça e perda de produtividade.
        </p>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full bg-green-500 hover:bg-green-600"
        isLoading={isLoading}
        disabled={allocatedHours > totalHours}
      >
        Calcular ROI Social
      </Button>
    </motion.form>
  )
}
