'use client'

import { motion } from 'framer-motion'
import { 
  Trophy, Star, Target, Flame, Calendar, 
  Award, ChevronRight, RotateCcw, Lock
} from 'lucide-react'
import { usePoints, USER_LEVELS, ALL_ACHIEVEMENTS, POINTS_CONFIG } from '@/contexts/PointsContext'
import { ScoreDisplay } from '@/components/ScoreDisplay'
import { planets } from '@/data/planets'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useState } from 'react'

export default function PerfilPage() {
  const { stats, currentLevel, achievements, resetProgress, getPlanetProgress } = usePoints()
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  // Calcular precision
  const accuracy = stats.totalExercises > 0 
    ? Math.round((stats.correctExercises / stats.totalExercises) * 100) 
    : 0

  // Calcular progreso del nivel
  const nextLevel = USER_LEVELS.find(l => l.level === currentLevel.level + 1)
  const levelProgress = nextLevel
    ? ((stats.totalPoints - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100
    : 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/30 to-slate-950 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="inline-block"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-5xl shadow-lg shadow-orange-500/30 mb-4">
              {currentLevel.icon}
            </div>
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Tu Perfil</h1>
          <p className="text-purple-300">{currentLevel.title} - Nivel {currentLevel.level}</p>
        </div>

        {/* Tarjeta principal de puntos */}
        <ScoreDisplay variant="full" />

        {/* Grid de estadisticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 text-center">
              <Target className="w-8 h-8 mx-auto mb-2 text-green-400" />
              <p className="text-2xl font-bold text-white">{accuracy}%</p>
              <p className="text-xs text-white/50">Precision</p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 text-center">
              <Star className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
              <p className="text-2xl font-bold text-white">{stats.correctExercises}</p>
              <p className="text-xs text-white/50">Correctos</p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 text-center">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-amber-400" />
              <p className="text-2xl font-bold text-white">{stats.totalQuizzes}</p>
              <p className="text-xs text-white/50">Quizzes</p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 text-center">
              <Flame className="w-8 h-8 mx-auto mb-2 text-orange-400" />
              <p className="text-2xl font-bold text-white">{stats.streakDays}</p>
              <p className="text-xs text-white/50">Racha dias</p>
            </CardContent>
          </Card>
        </div>

        {/* Logros */}
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-400" />
              Logros ({achievements.filter(a => a.unlocked).length}/{achievements.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {achievements.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-3 rounded-xl border ${
                    achievement.unlocked
                      ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30'
                      : 'bg-white/5 border-white/10 opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{achievement.unlocked ? achievement.icon : '🔒'}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium text-sm ${achievement.unlocked ? 'text-white' : 'text-white/50'}`}>
                        {achievement.name}
                      </p>
                      <p className="text-xs text-white/40 truncate">{achievement.description}</p>
                    </div>
                    {achievement.unlocked && (
                      <span className="text-xs text-yellow-400">+{POINTS_CONFIG.ACHIEVEMENT_BONUS} pts</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Progreso por planeta */}
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-green-400" />
              Progreso por Planeta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {planets.filter(p => p.isActive).map((planet) => {
                const progress = getPlanetProgress(planet.id)
                const totalExercises = 10 // Cada planeta tiene 10 ejercicios
                const exerciseProgress = (progress.exercisesCompleted / totalExercises) * 100

                return (
                  <div key={planet.id} className="flex items-center gap-4">
                    <span className="text-2xl">{planet.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-white text-sm">{planet.name}</p>
                        <p className="text-xs text-white/50">{progress.exercisesCompleted}/{totalExercises}</p>
                      </div>
                      <Progress value={exerciseProgress} className="h-2 bg-white/10" />
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-green-400">{progress.exercisesCorrect} correctos</span>
                        <span className="text-xs text-yellow-400">{progress.pointsEarned} pts</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/30" />
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Niveles */}
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              Sistema de Niveles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {USER_LEVELS.map((level) => {
                const isCurrentLevel = level.level === currentLevel.level
                const isUnlocked = stats.totalPoints >= level.minPoints

                return (
                  <div
                    key={level.level}
                    className={`flex items-center gap-4 p-3 rounded-xl ${
                      isCurrentLevel 
                        ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30' 
                        : 'bg-white/5'
                    }`}
                  >
                    <span className="text-2xl">{level.icon}</span>
                    <div className="flex-1">
                      <p className={`font-medium ${isUnlocked ? 'text-white' : 'text-white/50'}`}>
                        Nivel {level.level}: {level.title}
                      </p>
                      <p className="text-xs text-white/40">
                        {level.minPoints} - {level.maxPoints === Infinity ? '∞' : level.maxPoints} puntos
                      </p>
                    </div>
                    {isCurrentLevel && (
                      <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
                        Actual
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Sistema de puntos */}
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              Sistema de Puntos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-semibold text-white mb-3">Ejercicios</h4>
                <div className="flex justify-between text-white/70">
                  <span>Facil</span>
                  <span className="text-yellow-400">+{POINTS_CONFIG.EXERCISE_EASY} pts</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Medio</span>
                  <span className="text-yellow-400">+{POINTS_CONFIG.EXERCISE_MEDIUM} pts</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Dificil</span>
                  <span className="text-yellow-400">+{POINTS_CONFIG.EXERCISE_HARD} pts</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Bonus primer intento</span>
                  <span className="text-green-400">+{POINTS_CONFIG.EXERCISE_FIRST_TRY} pts</span>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-white mb-3">Quizzes</h4>
                <div className="flex justify-between text-white/70">
                  <span>Respuesta correcta</span>
                  <span className="text-yellow-400">+{POINTS_CONFIG.QUIZ_CORRECT} pts</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Quiz perfecto (100%)</span>
                  <span className="text-green-400">+{POINTS_CONFIG.QUIZ_PERFECT} pts</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Logro desbloqueado</span>
                  <span className="text-purple-400">+{POINTS_CONFIG.ACHIEVEMENT_BONUS} pts</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Bonus racha diaria</span>
                  <span className="text-orange-400">+{Math.round(POINTS_CONFIG.STREAK_MULTIPLIER * 100)}% por dia</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reset progress */}
        <Card className="bg-red-500/10 border-red-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">Reiniciar Progreso</p>
                <p className="text-sm text-white/50">Esto borrara todos tus puntos y logros</p>
              </div>
              {showResetConfirm ? (
                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      resetProgress()
                      setShowResetConfirm(false)
                    }}
                  >
                    Confirmar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowResetConfirm(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowResetConfirm(true)}
                  className="border-red-500/30 text-red-400 hover:bg-red-500/20"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reiniciar
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
