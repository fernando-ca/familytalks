'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { tempoTelaSchema, getWHORecommendation } from '@/lib/calculators/tempo-tela'
import type { TempoTelaInput } from '@/types'

interface TempoTelaFormProps {
  onSubmit: (data: TempoTelaInput) => void
  isLoading?: boolean
}

export function TempoTelaForm({ onSubmit, isLoading }: TempoTelaFormProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<TempoTelaInput>({
    resolver: zodResolver(tempoTelaSchema),
    defaultValues: {
      childAge: 10,
      dailyScreenMinutes: 120,
      educationalPercent: 30,
      coViewingPercent: 20,
      beforeBedMinutes: 30,
    },
  })

  const childAge = watch('childAge')
  const dailyScreenMinutes = watch('dailyScreenMinutes')
  const educationalPercent = watch('educationalPercent')
  const coViewingPercent = watch('coViewingPercent')

  const recommendation = getWHORecommendation(childAge || 10)
  const isOverLimit = dailyScreenMinutes > recommendation

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Child Age */}
      <div>
        <Input
          type="number"
          label="Idade da criança/adolescente"
          hint="Entre 2 e 17 anos"
          error={errors.childAge?.message}
          {...register('childAge', { valueAsNumber: true })}
        />
      </div>

      {/* Daily Screen Time */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-neutral-700">
          Tempo de tela diário (minutos)
        </label>
        <Controller
          name="dailyScreenMinutes"
          control={control}
          render={({ field }) => (
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="600"
                step="15"
                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
              />
              <div className="flex justify-between text-xs text-neutral-500">
                <span>0h</span>
                <span>2h</span>
                <span>4h</span>
                <span>6h</span>
                <span>8h</span>
                <span>10h</span>
              </div>
              <div className="text-center">
                <span className={`text-lg font-bold ${isOverLimit ? 'text-orange-500' : 'text-green-600'}`}>
                  {Math.floor(dailyScreenMinutes / 60)}h {dailyScreenMinutes % 60}min
                </span>
                <p className={`text-xs ${isOverLimit ? 'text-orange-500' : 'text-green-600'}`}>
                  {isOverLimit
                    ? `${dailyScreenMinutes - recommendation} min acima da recomendação`
                    : 'Dentro da recomendação da OMS'}
                </p>
              </div>
            </div>
          )}
        />
        {errors.dailyScreenMinutes && (
          <p className="text-sm text-red-500">{errors.dailyScreenMinutes.message}</p>
        )}
      </div>

      {/* Educational Percent */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-neutral-700">
          Porcentagem de conteúdo educacional
        </label>
        <Controller
          name="educationalPercent"
          control={control}
          render={({ field }) => (
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
              />
              <div className="flex justify-between text-xs text-neutral-500">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
              <p className="text-sm text-center font-medium text-blue-600">
                {educationalPercent}% educacional
              </p>
            </div>
          )}
        />
        <p className="text-xs text-neutral-500">
          Apps educativos, documentários, conteúdos de aprendizado.
        </p>
      </div>

      {/* Co-Viewing Percent */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-neutral-700">
          Porcentagem assistindo com adultos
        </label>
        <Controller
          name="coViewingPercent"
          control={control}
          render={({ field }) => (
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
              />
              <div className="flex justify-between text-xs text-neutral-500">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
              <p className="text-sm text-center font-medium text-blue-600">
                {coViewingPercent}% com supervisão
              </p>
            </div>
          )}
        />
        <p className="text-xs text-neutral-500">
          Tempo de tela acompanhado por pais ou responsáveis.
        </p>
      </div>

      {/* Before Bed Minutes */}
      <div>
        <Input
          type="number"
          label="Tempo de tela antes de dormir (minutos)"
          hint="Quanto tempo usa telas na hora antes de dormir?"
          error={errors.beforeBedMinutes?.message}
          {...register('beforeBedMinutes', { valueAsNumber: true })}
        />
      </div>

      {/* Warning Card */}
      <div className="rounded-lg bg-blue-50 p-4 border border-blue-100">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">
          Recomendações da OMS
        </h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>2-4 anos: máximo 1 hora/dia</li>
          <li>5-17 anos: máximo 2 horas/dia</li>
          <li>Evitar telas 1h antes de dormir</li>
        </ul>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full bg-blue-500 hover:bg-blue-600"
        isLoading={isLoading}
      >
        Calcular Impacto
      </Button>
    </motion.form>
  )
}
