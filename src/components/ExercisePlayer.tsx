'use client'

import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  RefreshCw, Check, X, Lightbulb, Calculator, 
  ChevronDown, ChevronUp, Sparkles, Trophy, ArrowRight
} from 'lucide-react'
import { 
  Exercise, 
  getExercisesByPlanet, 
  generateExerciseInstance 
} from '@/data/exercises'

interface ExercisePlayerProps {
  planetId: string
  planetName: string
  planetColor: string
}

export default function ExercisePlayer({ 
  planetId, 
  planetName, 
  planetColor 
}: ExercisePlayerProps) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [showHints, setShowHints] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [difficulty, setDifficulty] = useState<'facil' | 'medio' | 'dificil' | 'todos'>('todos')
  const [instanceKey, setInstanceKey] = useState(0) // Para forzar regeneración

  // Cargar ejercicios usando useMemo
  const exercises = useMemo(() => getExercisesByPlanet(planetId), [planetId])

  // Filtrar ejercicios por dificultad
  const filteredExercises = useMemo(() => 
    difficulty === 'todos' 
      ? exercises 
      : exercises.filter(e => e.difficulty === difficulty),
    [exercises, difficulty]
  )

  // Generar instancia actual del ejercicio
  const instance = useMemo(() => {
    if (filteredExercises.length === 0) return null
    const exercise = filteredExercises[currentExerciseIndex] || filteredExercises[0]
    return exercise ? generateExerciseInstance(exercise) : null
  }, [filteredExercises, currentExerciseIndex, instanceKey])

  // Generar nuevo ejercicio
  const generateNew = useCallback(() => {
    if (filteredExercises.length === 0) return
    
    let newIndex: number
    if (filteredExercises.length === 1) {
      newIndex = 0
    } else {
      do {
        newIndex = Math.floor(Math.random() * filteredExercises.length)
      } while (newIndex === currentExerciseIndex && filteredExercises.length > 1)
    }
    
    setCurrentExerciseIndex(newIndex)
    setInstanceKey(prev => prev + 1)
    setUserAnswer('')
    setShowResult(false)
    setIsCorrect(false)
    setShowSolution(false)
    setShowHints(false)
  }, [filteredExercises, currentExerciseIndex])

  // Cambiar dificultad
  const handleDifficultyChange = (newDifficulty: typeof difficulty) => {
    setDifficulty(newDifficulty)
    setCurrentExerciseIndex(0)
    setInstanceKey(prev => prev + 1)
    setUserAnswer('')
    setShowResult(false)
    setIsCorrect(false)
    setShowSolution(false)
    setShowHints(false)
  }

  // Verificar respuesta
  const checkAnswer = () => {
    if (!instance || !userAnswer) return
    
    const userNum = parseFloat(userAnswer.replace(',', '.'))
    const tolerance = Math.abs(instance.answer * 0.02) // 2% de tolerancia
    const correct = Math.abs(userNum - instance.answer) <= tolerance
    
    setIsCorrect(correct)
    setShowResult(true)
    setScore(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1
    }))
  }

  // Manejar tecla Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !showResult) {
      checkAnswer()
    }
  }

  // No hay ejercicios para este planeta
  if (exercises.length === 0) {
    return (
      <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center">
        <Calculator className="w-16 h-16 mx-auto mb-4 text-white/30" />
        <h3 className="text-xl font-semibold text-white mb-2">Ejercicios en desarrollo</h3>
        <p className="text-white/60">
          Los ejercicios para {planetName} estarán disponibles próximamente.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header con filtros y puntuación */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Calculator className="w-6 h-6" style={{ color: planetColor }} />
          <h2 className="text-2xl font-bold text-white">Ejercicios de {planetName}</h2>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Filtro de dificultad */}
          <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
            {(['todos', 'facil', 'medio', 'dificil'] as const).map(d => (
              <button
                key={d}
                onClick={() => handleDifficultyChange(d)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  difficulty === d 
                    ? 'bg-white/10 text-white' 
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {d === 'todos' ? 'Todos' : d === 'facil' ? 'Fácil' : d === 'medio' ? 'Medio' : 'Difícil'}
              </button>
            ))}
          </div>
          
          {/* Puntuación */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-white font-medium">{score.correct}/{score.total}</span>
          </div>
        </div>
      </div>

      {/* Tarjeta del ejercicio */}
      {instance && (
        <motion.div
          key={instance.exercise.id + JSON.stringify(instance.values)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
        >
          {/* Encabezado del ejercicio */}
          <div className="p-4 border-b border-white/10 bg-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  instance.exercise.difficulty === 'facil' 
                    ? 'bg-green-500/20 text-green-400' 
                    : instance.exercise.difficulty === 'medio'
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {instance.exercise.difficulty === 'facil' ? 'Fácil' : 
                   instance.exercise.difficulty === 'medio' ? 'Medio' : 'Difícil'}
                </span>
                <h3 className="text-lg font-semibold text-white">
                  {instance.exercise.title}
                </h3>
              </div>
              <button
                onClick={generateNew}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/10 text-white/70 rounded-lg hover:bg-white/20 hover:text-white transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Nuevo
              </button>
            </div>
          </div>

          {/* Contenido del problema */}
          <div className="p-6">
            <div className="mb-6">
              <p className="text-lg text-white/90 leading-relaxed">
                {instance.template}
              </p>
            </div>

            {/* Fórmula principal */}
            <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-sm text-white/50 mb-2">Fórmula principal:</p>
              <p className="text-xl font-mono text-white">
                {instance.exercise.formula}
              </p>
            </div>

            {/* Campo de respuesta */}
            {!showResult ? (
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1">
                    <label className="block text-sm text-white/60 mb-2">
                      {instance.exercise.question}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Tu respuesta..."
                        className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-lg placeholder:text-white/30 focus:border-white/30 focus:outline-none"
                        autoFocus
                      />
                      <span className="flex items-center px-4 bg-white/5 border border-white/10 rounded-xl text-white/60">
                        {instance.exercise.answerUnit}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={checkAnswer}
                    disabled={!userAnswer}
                    className="md:self-end px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    Verificar
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Pistas */}
                <div>
                  <button
                    onClick={() => setShowHints(!showHints)}
                    className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <Lightbulb className="w-4 h-4" />
                    {showHints ? 'Ocultar pistas' : 'Ver pistas'}
                    {showHints ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  
                  <AnimatePresence>
                    {showHints && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl"
                      >
                        <ul className="space-y-2">
                          {instance.exercise.hints.map((hint, i) => (
                            <li key={i} className="flex items-start gap-2 text-amber-200/80 text-sm">
                              <Sparkles className="w-4 h-4 flex-shrink-0 mt-0.5" />
                              {hint}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              /* Resultado */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <div className={`p-4 rounded-xl flex items-center gap-3 ${
                  isCorrect 
                    ? 'bg-green-500/20 border border-green-500/30' 
                    : 'bg-red-500/20 border border-red-500/30'
                }`}>
                  {isCorrect ? (
                    <>
                      <Check className="w-6 h-6 text-green-400" />
                      <div>
                        <p className="font-semibold text-green-400">¡Correcto!</p>
                        <p className="text-green-300/70 text-sm">
                          La respuesta es {instance.answer} {instance.exercise.answerUnit}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <X className="w-6 h-6 text-red-400" />
                      <div>
                        <p className="font-semibold text-red-400">Incorrecto</p>
                        <p className="text-red-300/70 text-sm">
                          Tu respuesta: {userAnswer} {instance.exercise.answerUnit} | 
                          Respuesta correcta: {instance.answer} {instance.exercise.answerUnit}
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {/* Botón para ver solución */}
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                >
                  {showSolution ? 'Ocultar solución' : 'Ver solución detallada'}
                  {showSolution ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {/* Solución detallada */}
                <AnimatePresence>
                  {showSolution && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 bg-white/5 border border-white/10 rounded-xl"
                    >
                      <h4 className="font-semibold text-white mb-3">Solución paso a paso:</h4>
                      <ol className="space-y-2">
                        {instance.exercise.solutionSteps.map((step, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0`}
                              style={{ backgroundColor: `${planetColor}30`, color: planetColor }}
                            >
                              {i + 1}
                            </span>
                            <span className="text-white/80">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Botón para nuevo ejercicio */}
                <button
                  onClick={generateNew}
                  className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Siguiente ejercicio
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}
