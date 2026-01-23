'use client'

import { motion } from 'framer-motion'
import { pointLabels, getDimensionEmoji, type QuizQuestion as QuizQuestionType, type Dimension } from '@/lib/calculators/quiz-parentalidade'

interface QuizQuestionProps {
  question: QuizQuestionType
  questionNumber: number
  totalQuestions: number
  selectedValue: number | undefined
  onAnswer: (questionId: string, value: number) => void
}

const dimensionColors: Record<Dimension, string> = {
  presence: 'bg-blue-500',
  quality: 'bg-pink-500',
  consistency: 'bg-purple-500',
  digital: 'bg-orange-500',
}

const dimensionBgColors: Record<Dimension, string> = {
  presence: 'bg-blue-50 border-blue-200',
  quality: 'bg-pink-50 border-pink-200',
  consistency: 'bg-purple-50 border-purple-200',
  digital: 'bg-orange-50 border-orange-200',
}

export function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  selectedValue,
  onAnswer,
}: QuizQuestionProps) {
  const progress = (questionNumber / totalQuestions) * 100

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-neutral-600">
          <span>Pergunta {questionNumber} de {totalQuestions}</span>
          <span>{Math.round(progress)}% completo</span>
        </div>
        <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${dimensionColors[question.dimension]} rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Dimension Badge */}
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${dimensionBgColors[question.dimension]}`}>
        <span>{getDimensionEmoji(question.dimension)}</span>
        <span className="capitalize">
          {question.dimension === 'presence' && 'Presenca'}
          {question.dimension === 'quality' && 'Qualidade'}
          {question.dimension === 'consistency' && 'Consistencia'}
          {question.dimension === 'digital' && 'Desconexao Digital'}
        </span>
      </div>

      {/* Question */}
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-neutral-900">
          {question.text}
        </h3>
        {question.hint && (
          <p className="text-sm text-neutral-500">
            {question.hint}
          </p>
        )}
      </div>

      {/* Answer Options */}
      <div className="space-y-3">
        {[0, 1, 2, 3].map((value) => (
          <motion.button
            key={value}
            type="button"
            onClick={() => onAnswer(question.id, value)}
            className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
              selectedValue === value
                ? `${dimensionBgColors[question.dimension]} border-current ring-2 ring-offset-2 ring-${dimensionColors[question.dimension].replace('bg-', '')}`
                : 'bg-white border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
            }`}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  selectedValue === value
                    ? `${dimensionColors[question.dimension]} border-transparent`
                    : 'border-neutral-300 bg-white'
                }`}
              >
                {selectedValue === value && (
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </motion.svg>
                )}
              </div>
              <span className={`font-medium ${selectedValue === value ? 'text-neutral-900' : 'text-neutral-700'}`}>
                {pointLabels[value]}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
