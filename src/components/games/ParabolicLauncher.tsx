'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, RotateCcw, ChevronRight, Target, Star, Trophy } from 'lucide-react'
import { ParabolicQuestion, getRandomQuestions } from '@/data/parabolicQuestions'

interface ParabolicLauncherProps {
  planetColor: string
  onComplete?: (score: number) => void
}

interface Platform {
  id: number
  x: number
  y: number
  width: number
  height: number
  answer: string
  isCorrect: boolean
  hit: boolean
}

interface Projectile {
  x: number
  y: number
  vx: number
  vy: number
  trail: { x: number; y: number }[]
}

interface GameState {
  phase: 'ready' | 'aiming' | 'flying' | 'result' | 'gameover' | 'victory'
  currentQuestionIndex: number
  questions: ParabolicQuestion[]
  score: number
  attempts: number
  maxAttempts: number
  angle: number
  velocity: number
  projectile: Projectile | null
  platforms: Platform[]
  showTrajectory: boolean
  correctAnswers: number
}

const GAME_WIDTH = 900
const GAME_HEIGHT = 500
const GRAVITY = 9.8
const LAUNCHER_X = 80
const LAUNCHER_Y = GAME_HEIGHT - 60
const SCALE = 3 // metros por pixel

export default function ParabolicLauncher({ planetColor, onComplete }: ParabolicLauncherProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  
  const [gameState, setGameState] = useState<GameState>({
    phase: 'ready',
    currentQuestionIndex: 0,
    questions: [],
    score: 0,
    attempts: 0,
    maxAttempts: 3,
    angle: 45,
    velocity: 30,
    projectile: null,
    platforms: [],
    showTrajectory: false,
    correctAnswers: 0
  })

  const [gameStarted, setGameStarted] = useState(false)

  // Inicializar juego
  const startGame = useCallback(() => {
    const questions = getRandomQuestions(5)
    setGameState({
      phase: 'ready',
      currentQuestionIndex: 0,
      questions,
      score: 0,
      attempts: 0,
      maxAttempts: 3,
      angle: 45,
      velocity: 30,
      projectile: null,
      platforms: [],
      showTrajectory: false,
      correctAnswers: 0
    })
    setGameStarted(true)
  }, [])

  // Generar plataformas para la pregunta actual
  const generatePlatforms = useCallback((question: ParabolicQuestion): Platform[] => {
    const platforms: Platform[] = []
    const baseX = 450
    const spacing = 160
    const baseY = GAME_HEIGHT - 100

    // Mezclar opciones
    const shuffledOptions = question.options
      .map((opt, idx) => ({ opt, originalIdx: idx }))
      .sort(() => Math.random() - 0.5)

    shuffledOptions.forEach((item, index) => {
      platforms.push({
        id: index,
        x: baseX + index * spacing - spacing * 1.5,
        y: baseY - Math.random() * 80,
        width: 140,
        height: 55,
        answer: item.opt,
        isCorrect: item.opt === question.correctAnswer,
        hit: false
      })
    })

    return platforms
  }, [])

  // Calcular trayectoria predicha
  const calculateTrajectory = useCallback((angle: number, velocity: number) => {
    const points: { x: number; y: number }[] = []
    const angleRad = (angle * Math.PI) / 180
    const vx = velocity * Math.cos(angleRad) * SCALE
    const vy = -velocity * Math.sin(angleRad) * SCALE
    
    let x = LAUNCHER_X
    let y = LAUNCHER_Y
    let t = 0
    const dt = 0.02

    while (y < GAME_HEIGHT && x < GAME_WIDTH && t < 10) {
      points.push({ x, y })
      t += dt
      x = LAUNCHER_X + vx * t
      y = LAUNCHER_Y + vy * t + 0.5 * GRAVITY * SCALE * t * t
    }

    return points
  }, [])

  // Lanzar proyectil
  const launchProjectile = useCallback(() => {
    const angleRad = (gameState.angle * Math.PI) / 180
    const vx = gameState.velocity * Math.cos(angleRad) * SCALE
    const vy = -gameState.velocity * Math.sin(angleRad) * SCALE

    setGameState(prev => ({
      ...prev,
      phase: 'flying',
      projectile: {
        x: LAUNCHER_X,
        y: LAUNCHER_Y,
        vx,
        vy,
        trail: []
      }
    }))
  }, [gameState.angle, gameState.velocity])

  // Verificar colisión con plataformas
  const checkCollision = useCallback((projectile: Projectile, platforms: Platform[]): number | null => {
    for (let i = 0; i < platforms.length; i++) {
      const p = platforms[i]
      if (
        projectile.x >= p.x &&
        projectile.x <= p.x + p.width &&
        projectile.y >= p.y &&
        projectile.y <= p.y + p.height
      ) {
        return i
      }
    }
    return null
  }, [])

  // Actualizar física del proyectil
  useEffect(() => {
    if (gameState.phase !== 'flying' || !gameState.projectile) return

    const updatePhysics = () => {
      setGameState(prev => {
        if (!prev.projectile) return prev

        const dt = 0.016
        const newProjectile = { ...prev.projectile }
        
        newProjectile.x += newProjectile.vx * dt
        newProjectile.vy += GRAVITY * SCALE * dt
        newProjectile.y += newProjectile.vy * dt
        
        newProjectile.trail = [...newProjectile.trail.slice(-50), { x: newProjectile.x, y: newProjectile.y }]

        const hitPlatformIndex = checkCollision(newProjectile, prev.platforms)
        if (hitPlatformIndex !== null) {
          const hitPlatform = prev.platforms[hitPlatformIndex]
          const newPlatforms = prev.platforms.map((p, i) => 
            i === hitPlatformIndex ? { ...p, hit: true } : p
          )

          if (hitPlatform.isCorrect) {
            const pointsEarned = Math.max(100 - (prev.attempts * 30), 40)
            return {
              ...prev,
              phase: 'result',
              projectile: newProjectile,
              platforms: newPlatforms,
              score: prev.score + pointsEarned,
              correctAnswers: prev.correctAnswers + 1
            }
          } else {
            if (prev.attempts >= prev.maxAttempts - 1) {
              return {
                ...prev,
                phase: 'result',
                projectile: newProjectile,
                platforms: newPlatforms,
                attempts: prev.attempts + 1
              }
            }
            return {
              ...prev,
              phase: 'aiming',
              projectile: null,
              platforms: prev.platforms.map(p => ({ ...p, hit: false })),
              attempts: prev.attempts + 1
            }
          }
        }

        if (newProjectile.y > GAME_HEIGHT || newProjectile.x > GAME_WIDTH || newProjectile.x < 0) {
          if (prev.attempts >= prev.maxAttempts - 1) {
            return {
              ...prev,
              phase: 'result',
              projectile: null,
              attempts: prev.attempts + 1
            }
          }
          return {
            ...prev,
            phase: 'aiming',
            projectile: null,
            attempts: prev.attempts + 1
          }
        }

        return { ...prev, projectile: newProjectile }
      })

      animationRef.current = requestAnimationFrame(updatePhysics)
    }

    animationRef.current = requestAnimationFrame(updatePhysics)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [gameState.phase, checkCollision])

  // Dibujar en canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

    // Fondo espacial
    const gradient = ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT)
    gradient.addColorStop(0, '#0a0a1a')
    gradient.addColorStop(1, '#1a1a3a')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

    // Estrellas
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
    for (let i = 0; i < 50; i++) {
      const x = (i * 73) % GAME_WIDTH
      const y = (i * 37) % GAME_HEIGHT
      ctx.beginPath()
      ctx.arc(x, y, Math.random() * 1.5 + 0.5, 0, Math.PI * 2)
      ctx.fill()
    }

    // Suelo
    ctx.fillStyle = '#2a2a4a'
    ctx.fillRect(0, GAME_HEIGHT - 30, GAME_WIDTH, 30)
    ctx.strokeStyle = '#4a4a6a'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(0, GAME_HEIGHT - 30)
    ctx.lineTo(GAME_WIDTH, GAME_HEIGHT - 30)
    ctx.stroke()

    // Trayectoria predicha
    if (gameState.phase === 'aiming' || gameState.phase === 'ready') {
      const trajectory = calculateTrajectory(gameState.angle, gameState.velocity)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
      ctx.lineWidth = 2
      ctx.setLineDash([5, 5])
      ctx.beginPath()
      trajectory.forEach((point, i) => {
        if (i === 0) ctx.moveTo(point.x, point.y)
        else ctx.lineTo(point.x, point.y)
      })
      ctx.stroke()
      ctx.setLineDash([])
    }

    // Plataformas
    gameState.platforms.forEach(platform => {
      ctx.fillStyle = platform.hit 
        ? (platform.isCorrect ? '#22c55e' : '#ef4444')
        : '#3b82f6'
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 2
      
      ctx.beginPath()
      ctx.roundRect(platform.x, platform.y, platform.width, platform.height, 8)
      ctx.fill()
      ctx.stroke()

      // Texto
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 11px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      
      let text = platform.answer
      if (text.length > 22) {
        text = text.substring(0, 19) + '...'
      }
      ctx.fillText(text, platform.x + platform.width / 2, platform.y + platform.height / 2)

      // Target indicator
      if (!platform.hit) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(platform.x + platform.width / 2, platform.y + platform.height / 2, 30, 0, Math.PI * 2)
        ctx.stroke()
      }
    })

    // Lanzador
    const angleRad = (gameState.angle * Math.PI) / 180
    const launcherLength = 50

    // Base
    ctx.fillStyle = planetColor
    ctx.beginPath()
    ctx.arc(LAUNCHER_X, LAUNCHER_Y, 20, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = 3
    ctx.stroke()

    // Cañón
    ctx.strokeStyle = planetColor
    ctx.lineWidth = 8
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(LAUNCHER_X, LAUNCHER_Y)
    ctx.lineTo(
      LAUNCHER_X + Math.cos(angleRad) * launcherLength,
      LAUNCHER_Y - Math.sin(angleRad) * launcherLength
    )
    ctx.stroke()

    // Rastro del proyectil
    if (gameState.projectile?.trail) {
      ctx.strokeStyle = '#fbbf24'
      ctx.lineWidth = 3
      ctx.beginPath()
      gameState.projectile.trail.forEach((point, i) => {
        ctx.globalAlpha = i / gameState.projectile!.trail.length
        if (i === 0) ctx.moveTo(point.x, point.y)
        else ctx.lineTo(point.x, point.y)
      })
      ctx.stroke()
      ctx.globalAlpha = 1
    }

    // Proyectil
    if (gameState.projectile) {
      ctx.fillStyle = '#fbbf24'
      ctx.beginPath()
      ctx.arc(gameState.projectile.x, gameState.projectile.y, 10, 0, Math.PI * 2)
      ctx.fill()
      
      ctx.fillStyle = '#ffffff'
      ctx.beginPath()
      ctx.arc(gameState.projectile.x - 3, gameState.projectile.y - 3, 3, 0, Math.PI * 2)
      ctx.fill()
    }

    // Indicadores
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 12px Arial'
    ctx.textAlign = 'left'
    ctx.fillText(`θ = ${gameState.angle}°`, 10, 30)
    ctx.fillText(`v₀ = ${gameState.velocity} m/s`, 10, 50)

  }, [gameState, planetColor, calculateTrajectory])

  // Cargar pregunta
  useEffect(() => {
    if (gameState.questions.length > 0 && gameState.currentQuestionIndex < gameState.questions.length) {
      const question = gameState.questions[gameState.currentQuestionIndex]
      setGameState(prev => ({
        ...prev,
        phase: 'aiming',
        platforms: generatePlatforms(question),
        attempts: 0,
        projectile: null
      }))
    }
  }, [gameState.currentQuestionIndex, gameState.questions, generatePlatforms])

  // Siguiente pregunta
  const nextQuestion = useCallback(() => {
    if (gameState.currentQuestionIndex >= gameState.questions.length - 1) {
      setGameState(prev => ({ ...prev, phase: 'victory' }))
      onComplete?.(gameState.score)
    } else {
      setGameState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }))
    }
  }, [gameState.currentQuestionIndex, gameState.questions.length, gameState.score, onComplete])

  // Pantalla de inicio
  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-white mb-2">🚀 Lanzamiento Parabólico</h3>
          <p className="text-white/60 mb-4">¡Domina la física de proyectiles!</p>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 max-w-md">
          <h4 className="text-white font-semibold mb-3">🎯 Cómo jugar:</h4>
          <ul className="text-white/70 text-sm space-y-2">
            <li>• Ajusta el <strong>ángulo</strong> y <strong>velocidad</strong> de lanzamiento</li>
            <li>• Apunta hacia la plataforma con la respuesta correcta</li>
            <li>• ¡Menos intentos = Más puntos!</li>
            <li>• 5 preguntas por partida</li>
          </ul>
        </div>

        <motion.button
          onClick={startGame}
          className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl text-white font-bold text-lg shadow-lg shadow-orange-500/30"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Play className="w-5 h-5 inline mr-2" />
          Comenzar Juego
        </motion.button>
      </div>
    )
  }

  // Pantalla de victoria
  if (gameState.phase === 'victory') {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-3xl font-bold text-white mb-2">¡Misión Completada!</h3>
          <p className="text-white/60">Has terminado el desafío de proyectiles</p>
        </motion.div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30">
          <div className="text-center space-y-2">
            <p className="text-4xl font-bold text-amber-400">{gameState.score} pts</p>
            <p className="text-white/60">
              Respuestas correctas: {gameState.correctAnswers}/5
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <motion.button
            onClick={startGame}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl text-white font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-4 h-4 inline mr-2" />
            Jugar de Nuevo
          </motion.button>
        </div>
      </div>
    )
  }

  // Juego principal
  const currentQuestion = gameState.questions[gameState.currentQuestionIndex]
  const isCorrect = gameState.platforms.some(p => p.hit && p.isCorrect)

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-white/60 text-sm">
            Pregunta {gameState.currentQuestionIndex + 1}/5
          </span>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <span key={i} className={`text-lg ${i < gameState.maxAttempts - gameState.attempts ? 'text-red-400' : 'text-white/20'}`}>
                ❤️
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-400" />
          <span className="text-white font-bold">{gameState.score} pts</span>
        </div>
      </div>

      {/* Pregunta */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
        <div className="flex items-start gap-2">
          <span className="px-2 py-0.5 rounded text-xs font-medium bg-amber-500/20 text-amber-400 whitespace-nowrap">
            {currentQuestion?.levelName}
          </span>
          <p className="text-white font-medium">{currentQuestion?.question}</p>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative rounded-xl overflow-hidden border border-white/10">
        <canvas
          ref={canvasRef}
          width={GAME_WIDTH}
          height={GAME_HEIGHT}
          className="w-full h-auto"
          style={{ maxHeight: '500px' }}
        />
      </div>

      {/* Controles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <label className="block text-white/60 text-sm mb-2">
            Ángulo (θ): {gameState.angle}°
          </label>
          <input
            type="range"
            min="10"
            max="80"
            value={gameState.angle}
            onChange={(e) => setGameState(prev => ({ ...prev, angle: parseInt(e.target.value) }))}
            className="w-full accent-amber-500"
            disabled={gameState.phase === 'flying'}
          />
          <div className="flex justify-between text-xs text-white/40 mt-1">
            <span>10°</span>
            <span>45°</span>
            <span>80°</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <label className="block text-white/60 text-sm mb-2">
            Velocidad (v₀): {gameState.velocity} m/s
          </label>
          <input
            type="range"
            min="15"
            max="60"
            value={gameState.velocity}
            onChange={(e) => setGameState(prev => ({ ...prev, velocity: parseInt(e.target.value) }))}
            className="w-full accent-orange-500"
            disabled={gameState.phase === 'flying'}
          />
          <div className="flex justify-between text-xs text-white/40 mt-1">
            <span>15 m/s</span>
            <span>40 m/s</span>
            <span>60 m/s</span>
          </div>
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-center gap-4">
        {gameState.phase === 'aiming' && (
          <motion.button
            onClick={launchProjectile}
            className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl text-white font-bold shadow-lg shadow-orange-500/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Target className="w-5 h-5 inline mr-2" />
            ¡Lanzar! ({gameState.attempts + 1}/{gameState.maxAttempts})
          </motion.button>
        )}

        {gameState.phase === 'result' && (
          <motion.button
            onClick={nextQuestion}
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white font-bold shadow-lg shadow-green-500/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ChevronRight className="w-5 h-5 inline mr-2" />
            Siguiente Pregunta
          </motion.button>
        )}
      </div>

      {/* Resultado */}
      <AnimatePresence>
        {gameState.phase === 'result' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`p-4 rounded-xl ${
              isCorrect
                ? 'bg-green-500/20 border-green-500/30'
                : 'bg-red-500/20 border-red-500/30'
            } border`}
          >
            <p className="text-white text-center">
              {isCorrect
                ? `✅ ¡Correcto! +${Math.max(100 - (gameState.attempts * 30), 40)} puntos`
                : `❌ La respuesta correcta era: ${currentQuestion?.correctAnswer}`
              }
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
