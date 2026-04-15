'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { HelpCircle, CheckCircle, XCircle, RefreshCw, Trophy, Sparkles, Star } from 'lucide-react'
import { quizQuestions, QuizQuestion, getRandomQuestions } from '@/data/quizQuestions'
import { usePoints, POINTS_CONFIG } from '@/contexts/PointsContext'

interface QuizState {
  questions: QuizQuestion[];
  currentIndex: number;
  score: number;
  correctAnswers: number;
  selectedAnswer: number | null;
  showResult: boolean;
  isCorrect: boolean | null;
  quizCompleted: boolean;
}

export default function Sun() {
  const { addQuizPoints, unlockAchievement } = usePoints()
  
  const [quizState, setQuizState] = useState<QuizState>({
    questions: [],
    currentIndex: 0,
    score: 0,
    correctAnswers: 0,
    selectedAnswer: null,
    showResult: false,
    isCorrect: null,
    quizCompleted: false
  })
  const [showQuiz, setShowQuiz] = useState(false)
  const [pointsEarned, setPointsEarned] = useState(0)
  const [showPointsAnimation, setShowPointsAnimation] = useState(false)
  const [totalQuizPoints, setTotalQuizPoints] = useState(0)

  const startNewQuiz = useCallback(() => {
    setQuizState({
      questions: getRandomQuestions(5),
      currentIndex: 0,
      score: 0,
      correctAnswers: 0,
      selectedAnswer: null,
      showResult: false,
      isCorrect: null,
      quizCompleted: false
    })
    setShowQuiz(true)
    setTotalQuizPoints(0)
  }, [])

  const handleAnswer = (answerIndex: number) => {
    if (quizState.showResult) return

    const currentQuestion = quizState.questions[quizState.currentIndex]
    const isCorrect = answerIndex === currentQuestion.correctAnswer

    // Calcular puntos
    let points = 0
    if (isCorrect) {
      points = POINTS_CONFIG.QUIZ_CORRECT
      setPointsEarned(points)
      setTotalQuizPoints(prev => prev + points)
      setShowPointsAnimation(true)
      setTimeout(() => setShowPointsAnimation(false), 1500)
    }

    setQuizState(prev => ({
      ...prev,
      selectedAnswer: answerIndex,
      showResult: true,
      isCorrect,
      score: isCorrect ? prev.score + 20 : prev.score,
      correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers
    }))
  }

  const nextQuestion = () => {
    if (quizState.currentIndex >= quizState.questions.length - 1) {
      // Quiz completado - dar puntos
      const isPerfect = quizState.correctAnswers === quizState.questions.length
      const correctCount = quizState.correctAnswers
      
      // Agregar puntos al sistema
      addQuizPoints(true, quizState.questions.length, correctCount, 'quiz-sun')
      
      // Bonus por quiz perfecto
      if (isPerfect) {
        unlockAchievement('quiz-perfect')
      }
      
      setQuizState(prev => ({ ...prev, quizCompleted: true }))
    } else {
      setQuizState(prev => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
        selectedAnswer: null,
        showResult: false,
        isCorrect: null
      }))
    }
  }

  const currentQuestion = quizState.questions[quizState.currentIndex]

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      {/* Animacion de puntos */}
      <AnimatePresence>
        {showPointsAnimation && pointsEarned > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.5 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
          >
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-8 py-4 rounded-full shadow-2xl shadow-yellow-500/50 text-2xl flex items-center gap-2">
              <Star className="w-6 h-6" />
              +{pointsEarned} puntos
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Outer glow rings */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 220 + i * 50,
            height: 220 + i * 50,
            background: 'radial-gradient(circle, rgba(255, 200, 50, 0.15) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5
          }}
        />
      ))}

      {!showQuiz ? (
        // Sun idle state - Click to start quiz
        <motion.div
          className="relative cursor-pointer"
          onClick={startNewQuiz}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Corona effect */}
          <motion.div
            className="absolute rounded-full"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 180,
              height: 180,
              background: 'radial-gradient(circle, rgba(255, 220, 100, 0.3) 0%, rgba(255, 180, 50, 0.1) 50%, transparent 70%)',
            }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Sun body */}
          <motion.div
            className="relative w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #fff7c2 0%, #ffd54f 30%, #ff9800 70%, #ff5722 100%)',
              boxShadow: `
                0 0 60px rgba(255, 152, 0, 0.8),
                0 0 120px rgba(255, 152, 0, 0.5),
                0 0 180px rgba(255, 87, 34, 0.3),
                inset -10px -10px 30px rgba(255, 87, 34, 0.5),
                inset 5px 5px 20px rgba(255, 255, 255, 0.3)
              `
            }}
            animate={{
              boxShadow: [
                '0 0 60px rgba(255, 152, 0, 0.8), 0 0 120px rgba(255, 152, 0, 0.5), 0 0 180px rgba(255, 87, 34, 0.3)',
                '0 0 80px rgba(255, 152, 0, 0.9), 0 0 140px rgba(255, 152, 0, 0.6), 0 0 200px rgba(255, 87, 34, 0.4)',
                '0 0 60px rgba(255, 152, 0, 0.8), 0 0 120px rgba(255, 152, 0, 0.5), 0 0 180px rgba(255, 87, 34, 0.3)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="absolute inset-0 rounded-full opacity-40"
              style={{
                background: `
                  radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.4) 0%, transparent 20%),
                  radial-gradient(circle at 70% 60%, rgba(255, 100, 0, 0.3) 0%, transparent 30%)
                `
              }}
            />
            
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="text-4xl md:text-5xl"
            >
              <HelpCircle className="w-12 h-12 md:w-14 md:h-14 text-amber-900/60" />
            </motion.div>
          </motion.div>

          {/* Label */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 mt-4 text-center whitespace-nowrap"
            style={{ top: '100%' }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 rounded-full shadow-lg">
              <span className="text-white font-bold text-sm md:text-base">QUIZ FISICA</span>
            </div>
            <p className="text-white/60 text-xs mt-2">Click para comenzar</p>
          </motion.div>

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-yellow-300"
              style={{ left: '50%', top: '50%' }}
              animate={{
                x: [0, Math.cos(i * Math.PI / 3) * 120],
                y: [0, Math.sin(i * Math.PI / 3) * 120],
                opacity: [0.8, 0, 0.8],
                scale: [1, 0.5, 1]
              }}
              transition={{ duration: 5, repeat: Infinity, delay: i * 0.8, ease: 'easeInOut' }}
            />
          ))}
        </motion.div>
      ) : quizState.quizCompleted ? (
        // Quiz completed - Show results
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative bg-gray-900/95 backdrop-blur-md rounded-2xl p-6 w-80 md:w-96 border border-amber-500/30"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <Trophy className="w-16 h-16 mx-auto text-yellow-400 mb-4" />
            </motion.div>
            
            <h3 className="text-xl font-bold text-white mb-2">Quiz Completado!</h3>
            
            <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl p-4 mb-4">
              <p className="text-3xl font-bold text-amber-400">{quizState.correctAnswers}/{quizState.questions.length}</p>
              <p className="text-white/60 text-sm">respuestas correctas</p>
            </div>

            {/* Puntos ganados */}
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <p className="text-2xl font-bold text-yellow-400">+{totalQuizPoints + (quizState.correctAnswers === quizState.questions.length ? POINTS_CONFIG.QUIZ_PERFECT : 0)}</p>
              </div>
              <p className="text-white/60 text-sm">puntos ganados</p>
              {quizState.correctAnswers === quizState.questions.length && (
                <p className="text-green-400 text-xs mt-1">+{POINTS_CONFIG.QUIZ_PERFECT} bonus Quiz Perfecto!</p>
              )}
            </div>
            
            <p className="text-white/80 mb-4">
              Respondiste correctamente {quizState.correctAnswers} de {quizState.questions.length} preguntas
            </p>

            <div className="flex gap-2">
              <button
                onClick={startNewQuiz}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity"
              >
                <RefreshCw className="w-4 h-4" />
                Nuevo Quiz
              </button>
              <button
                onClick={() => setShowQuiz(false)}
                className="flex-1 bg-gray-700 text-white font-bold py-3 rounded-xl hover:bg-gray-600 transition-colors"
              >
                Salir
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        // Quiz in progress
        <AnimatePresence mode="wait">
          <motion.div
            key={quizState.currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="relative bg-gray-900/95 backdrop-blur-md rounded-2xl p-4 md:p-6 w-80 md:w-[28rem] border border-amber-500/30"
          >
            {/* Progress bar */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs text-white/60">Pregunta {quizState.currentIndex + 1}/{quizState.questions.length}</span>
              <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${((quizState.currentIndex + 1) / quizState.questions.length) * 100}%` }}
                />
              </div>
              <span className="text-xs text-yellow-400 font-bold flex items-center gap-1">
                <Star className="w-3 h-3" />
                {totalQuizPoints} pts
              </span>
            </div>

            {/* Topic badge */}
            <div className="inline-block px-3 py-1 bg-amber-500/20 rounded-full mb-3">
              <span className="text-xs text-amber-400">{currentQuestion?.topic}</span>
            </div>

            {/* Question */}
            <h3 className="text-white font-semibold text-sm md:text-base mb-4 leading-relaxed">
              {currentQuestion?.question}
            </h3>

            {/* Options */}
            <div className="space-y-2">
              {currentQuestion?.options.map((option, index) => {
                let buttonClass = "bg-gray-800 hover:bg-gray-700 border-gray-700"
                
                if (quizState.showResult) {
                  if (index === currentQuestion.correctAnswer) {
                    buttonClass = "bg-green-500/20 border-green-500 text-green-400"
                  } else if (index === quizState.selectedAnswer && !quizState.isCorrect) {
                    buttonClass = "bg-red-500/20 border-red-500 text-red-400"
                  }
                }

                return (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={quizState.showResult}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${buttonClass} ${!quizState.showResult && 'hover:scale-[1.02]'}`}
                    whileHover={!quizState.showResult ? { scale: 1.02 } : {}}
                    whileTap={!quizState.showResult ? { scale: 0.98 } : {}}
                  >
                    <span className="text-white/60 text-xs mr-2">{String.fromCharCode(65 + index)}.</span>
                    <span className="text-white text-sm">{option}</span>
                    {quizState.showResult && index === currentQuestion.correctAnswer && (
                      <CheckCircle className="inline-block w-4 h-4 ml-2 text-green-400" />
                    )}
                    {quizState.showResult && index === quizState.selectedAnswer && !quizState.isCorrect && (
                      <XCircle className="inline-block w-4 h-4 ml-2 text-red-400" />
                    )}
                  </motion.button>
                )
              })}
            </div>

            {/* Result explanation */}
            <AnimatePresence>
              {quizState.showResult && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`mt-4 p-3 rounded-xl ${quizState.isCorrect ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}
                >
                  <p className="text-xs text-white/80 leading-relaxed">
                    <strong className={quizState.isCorrect ? 'text-green-400' : 'text-red-400'}>
                      {quizState.isCorrect ? 'Correcto! +' + POINTS_CONFIG.QUIZ_CORRECT + ' pts' : 'Incorrecto'}
                    </strong>
                    <br />
                    {currentQuestion?.explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next button */}
            {quizState.showResult && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={nextQuestion}
                className="w-full mt-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
              >
                {quizState.currentIndex >= quizState.questions.length - 1 ? 'Ver Resultados' : 'Siguiente Pregunta'}
              </motion.button>
            )}

            {/* Close button */}
            <button
              onClick={() => setShowQuiz(false)}
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-white/40 hover:text-white/80 transition-colors"
            >
              X
            </button>
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  )
}
