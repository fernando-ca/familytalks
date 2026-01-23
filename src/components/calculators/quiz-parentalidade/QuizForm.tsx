'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { QuizQuestion } from './QuizQuestion'
import { quizQuestions, type QuizInput } from '@/lib/calculators/quiz-parentalidade'

interface QuizFormProps {
  onSubmit: (data: QuizInput) => void
  isLoading?: boolean
}

export function QuizForm({ onSubmit, isLoading }: QuizFormProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})

  const currentQuestion = quizQuestions[currentQuestionIndex]
  const isFirstQuestion = currentQuestionIndex === 0
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1
  const canProceed = answers[currentQuestion.id] !== undefined
  const allAnswered = Object.keys(answers).length === quizQuestions.length

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))

    // Auto-advance after short delay (for better UX)
    if (!isLastQuestion) {
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1)
      }, 300)
    }
  }

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const handleNext = () => {
    if (canProceed && !isLastQuestion) {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  const handleSubmit = () => {
    if (allAnswered) {
      onSubmit({ answers })
    }
  }

  return (
    <div className="space-y-8">
      {/* Question Container */}
      <AnimatePresence mode="wait">
        <QuizQuestion
          key={currentQuestion.id}
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={quizQuestions.length}
          selectedValue={answers[currentQuestion.id]}
          onAnswer={handleAnswer}
        />
      </AnimatePresence>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-4"
      >
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="flex-1"
          onClick={handlePrevious}
          disabled={isFirstQuestion}
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Anterior
        </Button>

        {isLastQuestion ? (
          <Button
            type="button"
            variant="primary"
            size="lg"
            className="flex-1"
            onClick={handleSubmit}
            disabled={!allAnswered}
            isLoading={isLoading}
          >
            Ver Resultado
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </Button>
        ) : (
          <Button
            type="button"
            variant="primary"
            size="lg"
            className="flex-1"
            onClick={handleNext}
            disabled={!canProceed}
          >
            Proxima
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        )}
      </motion.div>

      {/* Question Navigator (dots) */}
      <div className="flex justify-center gap-2 flex-wrap">
        {quizQuestions.map((q, index) => {
          const isAnswered = answers[q.id] !== undefined
          const isCurrent = index === currentQuestionIndex

          return (
            <button
              key={q.id}
              type="button"
              onClick={() => setCurrentQuestionIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                isCurrent
                  ? 'bg-primary-500 scale-125'
                  : isAnswered
                    ? 'bg-primary-300'
                    : 'bg-neutral-200'
              }`}
              title={`Pergunta ${index + 1}`}
            />
          )
        })}
      </div>

      {/* Quick Stats */}
      <div className="text-center text-sm text-neutral-500">
        {Object.keys(answers).length} de {quizQuestions.length} perguntas respondidas
      </div>
    </div>
  )
}
