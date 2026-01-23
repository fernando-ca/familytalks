'use client'

import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  momentCategories,
  getLevelProgress,
  formatDuration,
  type MomentosResult as MomentosResultType,
  type MomentCategory,
} from '@/lib/calculators/momentos-conexao'

interface MomentosResultProps {
  result: MomentosResultType
  onRecalculate: () => void
}

export function MomentosResult({ result, onRecalculate }: MomentosResultProps) {
  const levelProgress = getLevelProgress(result.weeklyView.totalMoments)

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Main Score Card */}
      <Card variant="elevated" className={`${result.connectionLevel.bgColor} border-2`}>
        <CardContent className="py-6">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white shadow-lg mb-4"
            >
              <span className="text-4xl font-bold text-teal-600">
                {result.weeklyView.totalMoments}
              </span>
            </motion.div>
            <h2 className={`text-2xl font-bold ${result.connectionLevel.color} mb-2`}>
              {result.connectionLevel.label}
            </h2>
            <p className="text-neutral-600 mb-4">
              {result.connectionLevel.description}
            </p>

            {/* Progress to Next Level */}
            {levelProgress.nextLevel && (
              <div className="mt-4 max-w-xs mx-auto">
                <div className="flex justify-between text-sm text-neutral-600 mb-1">
                  <span>{result.connectionLevel.label}</span>
                  <span>{levelProgress.nextLevel.label}</span>
                </div>
                <div className="w-full bg-white rounded-full h-3 shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${levelProgress.percentage}%` }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="bg-teal-500 h-3 rounded-full"
                  />
                </div>
                <p className="text-xs text-neutral-500 mt-1">
                  {levelProgress.target - levelProgress.current} momentos para o proximo nivel
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Weekly View */}
      <Card variant="bordered">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-xl">📅</span>
            Visao Semanal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {result.weeklyView.days.map((day, idx) => (
              <motion.div
                key={day.date}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                className={`p-2 rounded-lg text-center ${
                  day.achieved
                    ? 'bg-teal-100 border-2 border-teal-300'
                    : 'bg-neutral-50 border border-neutral-200'
                }`}
              >
                <p className="text-xs font-medium text-neutral-600">{day.dayOfWeek.slice(0, 3)}</p>
                <p className={`text-lg font-bold ${day.achieved ? 'text-teal-600' : 'text-neutral-400'}`}>
                  {day.momentsCount}
                </p>
                {day.achieved && (
                  <div className="flex justify-center gap-0.5 mt-1">
                    {day.categories.slice(0, 3).map((cat, i) => (
                      <span key={i} className="text-xs">{momentCategories[cat].icon}</span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Weekly Stats */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-teal-50 rounded-lg">
            <div className="text-center">
              <p className="text-2xl font-bold text-teal-700">{result.weeklyView.totalMoments}</p>
              <p className="text-xs text-teal-600">Momentos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-teal-700">
                {formatDuration(result.weeklyView.totalMinutes)}
              </p>
              <p className="text-xs text-teal-600">Tempo Total</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-teal-700">{result.weeklyView.currentStreak}</p>
              <p className="text-xs text-teal-600">Dias Seguidos</p>
            </div>
          </div>

          {/* Goal Progress */}
          {result.weeklyView.goalAchieved ? (
            <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200 text-center">
              <span className="text-green-700 font-medium">
                🎉 Meta semanal atingida! ({result.weeklyView.goalMoments} momentos)
              </span>
            </div>
          ) : (
            <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200 text-center">
              <span className="text-amber-700 font-medium">
                Faltam {result.weeklyView.goalMoments - result.weeklyView.totalMoments} momentos para a meta semanal
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card variant="bordered">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-xl">📊</span>
            Categorias de Momentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {result.categoryBreakdown
              .filter((cat) => cat.count > 0)
              .sort((a, b) => b.count - a.count)
              .map((cat, idx) => {
                const info = momentCategories[cat.category]
                return (
                  <motion.div
                    key={cat.category}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-2xl">{info.icon}</span>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-neutral-800">{info.label}</span>
                        <span className="text-sm text-neutral-600">
                          {cat.count} ({cat.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-neutral-100 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${cat.percentage}%` }}
                          transition={{ delay: 0.2 + 0.05 * idx, duration: 0.4 }}
                          className="bg-teal-500 h-2 rounded-full"
                        />
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-teal-600">
                      {cat.weightedPoints}pts
                    </span>
                  </motion.div>
                )
              })}

            {result.categoryBreakdown.every((cat) => cat.count === 0) && (
              <p className="text-center text-neutral-500 py-4">
                Nenhum momento registrado ainda
              </p>
            )}
          </div>

          {/* Variety Bonus */}
          <div className={`mt-4 p-3 rounded-lg ${
            result.weeklyScore.varietyBonus
              ? 'bg-purple-50 border border-purple-200'
              : 'bg-neutral-50 border border-neutral-200'
          }`}>
            <div className="flex items-center justify-between">
              <span className={result.weeklyScore.varietyBonus ? 'text-purple-700' : 'text-neutral-600'}>
                {result.weeklyScore.varietyBonus ? '🎉 ' : ''}
                Bonus de Variedade (4+ categorias)
              </span>
              <span className={`font-bold ${result.weeklyScore.varietyBonus ? 'text-purple-700' : 'text-neutral-500'}`}>
                {result.weeklyScore.varietyBonus ? '+20%' : `${result.weeklyScore.variety}/4`}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card variant="bordered">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-xl">🏆</span>
            Conquistas
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Unlocked */}
          {result.achievements.unlocked.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-neutral-600 mb-2">Desbloqueadas</h4>
              <div className="grid grid-cols-2 gap-2">
                {result.achievements.unlocked.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-3 bg-yellow-50 rounded-lg border border-yellow-200"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">⭐</span>
                      <span className="font-semibold text-yellow-900">{achievement.name}</span>
                    </div>
                    <p className="text-xs text-yellow-700">{achievement.description}</p>
                    <p className="text-xs text-yellow-600 mt-1">+{achievement.points} pontos</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* In Progress */}
          {result.achievements.inProgress.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-neutral-600 mb-2">Em Progresso</h4>
              <div className="space-y-2">
                {result.achievements.inProgress.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="p-3 bg-neutral-50 rounded-lg border border-neutral-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg opacity-50">🏅</span>
                        <span className="font-medium text-neutral-700">{achievement.name}</span>
                      </div>
                      <span className="text-sm text-neutral-500">
                        {achievement.progress}/{achievement.maxProgress}
                      </span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <div
                        className="bg-teal-400 h-2 rounded-full transition-all"
                        style={{
                          width: `${((achievement.progress || 0) / (achievement.maxProgress || 1)) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-neutral-500 mt-1">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next Milestone */}
          {result.achievements.nextMilestone && !result.achievements.inProgress.find(
            (a) => a.id === result.achievements.nextMilestone?.id
          ) && (
            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
              <h4 className="text-sm font-semibold text-neutral-600 mb-2">Proxima Conquista</h4>
              <div className="flex items-center gap-2">
                <span className="text-lg opacity-30">🏅</span>
                <div>
                  <span className="font-medium text-neutral-600">{result.achievements.nextMilestone.name}</span>
                  <p className="text-xs text-neutral-500">{result.achievements.nextMilestone.description}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Yearly Impact */}
      <Card variant="bordered" className="bg-gradient-to-br from-teal-50 to-cyan-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-xl">📈</span>
            Projecao Anual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-neutral-600 mb-4">
            Se voce mantiver este ritmo durante o ano:
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm text-center">
              <p className="text-3xl font-bold text-teal-600">{result.yearlyImpact.totalMoments}</p>
              <p className="text-sm text-neutral-600">Momentos por ano</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm text-center">
              <p className="text-3xl font-bold text-teal-600">{result.yearlyImpact.totalHours}h</p>
              <p className="text-sm text-neutral-600">Horas de conexao</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm text-center">
              <p className="text-3xl font-bold text-teal-600">{result.yearlyImpact.equivalentDays}</p>
              <p className="text-sm text-neutral-600">Dias inteiros</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm text-center">
              <p className="text-3xl font-bold text-teal-600">{result.yearlyImpact.memoryBankEstimate}</p>
              <p className="text-sm text-neutral-600">Memorias marcantes</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patterns & Insights */}
      <Card variant="bordered">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-xl">💡</span>
            Padroes e Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Patterns */}
          <div className="grid grid-cols-2 gap-3">
            {result.patterns.mostFrequentCategory && (
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-xs text-green-600 font-medium">Categoria Favorita</p>
                <p className="font-semibold text-green-800">
                  {momentCategories[result.patterns.mostFrequentCategory].icon}{' '}
                  {momentCategories[result.patterns.mostFrequentCategory].label}
                </p>
              </div>
            )}
            {result.patterns.bestDay !== '-' && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-600 font-medium">Melhor Dia</p>
                <p className="font-semibold text-blue-800">{result.patterns.bestDay}</p>
              </div>
            )}
            {result.patterns.hardestDay !== '-' && (
              <div className="p-3 bg-amber-50 rounded-lg">
                <p className="text-xs text-amber-600 font-medium">Dia Mais Dificil</p>
                <p className="font-semibold text-amber-800">{result.patterns.hardestDay}</p>
              </div>
            )}
            {result.patterns.leastUsedCategory && (
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-xs text-purple-600 font-medium">Categoria a Explorar</p>
                <p className="font-semibold text-purple-800">
                  {momentCategories[result.patterns.leastUsedCategory].icon}{' '}
                  {momentCategories[result.patterns.leastUsedCategory].label}
                </p>
              </div>
            )}
          </div>

          {/* Insights */}
          <div className="space-y-2">
            {result.insights.map((insight, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm text-neutral-700">
                <span className="text-teal-500 mt-0.5">✓</span>
                <span>{insight}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Suggestions & Recommendations */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card variant="bordered" className="bg-amber-50/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <span>💫</span>
              Sugestoes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.suggestions.map((suggestion, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-amber-900">
                  <span className="text-amber-500 mt-0.5">•</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card variant="bordered" className="bg-teal-50/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <span>🎯</span>
              Recomendacoes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-teal-900">
                  <span className="text-teal-500 mt-0.5">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Sources */}
      <Card variant="bordered">
        <CardHeader>
          <CardTitle className="text-sm text-neutral-600">Referencias Cientificas</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-xs text-neutral-500 space-y-1">
            {result.sources.map((source, idx) => (
              <li key={idx}>{source}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Recalculate Button */}
      <Button
        variant="outline"
        size="lg"
        className="w-full"
        onClick={onRecalculate}
      >
        Registrar Mais Momentos
      </Button>
    </motion.div>
  )
}
