'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { tempoFamiliarSchema } from '@/lib/calculators/tempo-familiar'
import type { TempoFamiliarInput } from '@/types'

interface TempoFamiliarFormProps {
  onSubmit: (data: TempoFamiliarInput) => void
  isLoading?: boolean
}

export function TempoFamiliarForm({ onSubmit, isLoading }: TempoFamiliarFormProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<TempoFamiliarInput>({
    resolver: zodResolver(tempoFamiliarSchema),
    defaultValues: {
      weekdayMinutes: 60,
      weekendMinutes: 120,
      qualityMultiplier: 1,
      familySize: 2,
    },
  })

  const qualityMultiplier = watch('qualityMultiplier')

  const getQualityLabel = (value: number) => {
    if (value < 0.75) return 'Baixa (muitas distrações)'
    if (value < 1) return 'Moderada'
    if (value < 1.25) return 'Boa'
    if (value < 1.5) return 'Alta'
    return 'Excelente (totalmente focado)'
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Weekday Time */}
      <div>
        <Input
          type="number"
          label="Tempo em dias de semana (minutos/dia)"
          hint="Quanto tempo de qualidade você passa com a família em um dia útil típico?"
          error={errors.weekdayMinutes?.message}
          {...register('weekdayMinutes', { valueAsNumber: true })}
        />
      </div>

      {/* Weekend Time */}
      <div>
        <Input
          type="number"
          label="Tempo em fins de semana (minutos/dia)"
          hint="Quanto tempo de qualidade você passa com a família em um dia de fim de semana?"
          error={errors.weekendMinutes?.message}
          {...register('weekendMinutes', { valueAsNumber: true })}
        />
      </div>

      {/* Quality Multiplier */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-neutral-700">
          Qualidade do tempo juntos
        </label>
        <Controller
          name="qualityMultiplier"
          control={control}
          render={({ field }) => (
            <div className="space-y-2">
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
              />
              <div className="flex justify-between text-xs text-neutral-500">
                <span>Baixa</span>
                <span>Média</span>
                <span>Alta</span>
              </div>
              <p className="text-sm text-center font-medium text-primary-600">
                {getQualityLabel(qualityMultiplier)}
              </p>
            </div>
          )}
        />
        {errors.qualityMultiplier && (
          <p className="text-sm text-red-500">{errors.qualityMultiplier.message}</p>
        )}
        <p className="text-xs text-neutral-500">
          A qualidade considera atenção focada, ausência de telas e interações significativas.
        </p>
      </div>

      {/* Family Size */}
      <div>
        <Input
          type="number"
          label="Número de filhos"
          hint="Quantos filhos você tem?"
          error={errors.familySize?.message}
          {...register('familySize', { valueAsNumber: true })}
        />
      </div>

      {/* Quick Tips */}
      <div className="rounded-lg bg-primary-50 p-4 border border-primary-100">
        <h4 className="text-sm font-semibold text-primary-900 mb-2">
          O que conta como tempo de qualidade?
        </h4>
        <ul className="text-sm text-primary-700 space-y-1">
          <li>Refeições em família (sem telas)</li>
          <li>Leitura compartilhada</li>
          <li>Brincadeiras e jogos</li>
          <li>Conversas significativas</li>
          <li>Atividades ao ar livre juntos</li>
        </ul>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full"
        isLoading={isLoading}
      >
        Calcular Tempo Familiar
      </Button>
    </motion.form>
  )
}
