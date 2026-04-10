'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, BookOpen, GraduationCap, ChevronRight, 
  Building2, Calculator, Puzzle, MessageSquare, Target,
  Trophy, Star, Sparkles, ArrowLeft, Settings, Plus,
  Trash2, Edit, Save, X, CheckCircle, XCircle
} from 'lucide-react'

// ===== TIPOS =====
interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

interface QuestionsDB {
  [category: string]: {
    [university: string]: {
      [type: string]: Question[]
    }
  }
}

// ===== BASE DE DATOS DE PREGUNTAS (INICIAL) =====
const initialQuestionsDB: QuestionsDB = {
  razonamiento: {
    uta: {
      numerico: [
        {
          id: '1',
          question: 'Si un tren viaja a 80 km/h, ¿cuánto tiempo tardará en recorrer 240 km?',
          options: ['2 horas', '3 horas', '4 horas', '5 horas'],
          correctAnswer: 1,
          explanation: 'Tiempo = Distancia / Velocidad = 240 / 80 = 3 horas'
        },
        {
          id: '2',
          question: '¿Cuál es el 25% de 800?',
          options: ['150', '200', '250', '300'],
          correctAnswer: 1,
          explanation: '25% de 800 = 800 × 0.25 = 200'
        },
        {
          id: '3',
          question: 'Si 3x + 7 = 22, ¿cuál es el valor de x?',
          options: ['3', '4', '5', '6'],
          correctAnswer: 2,
          explanation: '3x = 22 - 7 = 15, entonces x = 5'
        },
        {
          id: '4',
          question: 'Un rectángulo tiene 12 cm de base y 8 cm de altura. ¿Cuál es su área?',
          options: ['80 cm²', '96 cm²', '40 cm²', '100 cm²'],
          correctAnswer: 1,
          explanation: 'Área = base × altura = 12 × 8 = 96 cm²'
        },
        {
          id: '5',
          question: '¿Qué número continúa la serie: 2, 6, 18, 54, ...?',
          options: ['108', '162', '216', '144'],
          correctAnswer: 1,
          explanation: 'Cada número se multiplica por 3: 54 × 3 = 162'
        }
      ],
      logico: [
        {
          id: '1',
          question: 'Si todos los perros son animales, y Max es un perro, entonces:',
          options: ['Max no es un animal', 'Max es un animal', 'Max puede ser un animal', 'No se puede determinar'],
          correctAnswer: 1,
          explanation: 'Silogismo básico: si todos los A son B, y C es A, entonces C es B'
        }
      ],
      verbal: [],
      simulacro: []
    },
    unach: {
      numerico: [
        {
          id: '1',
          question: '¿Cuánto es 15³?',
          options: ['2250', '3375', '4500', '3375'],
          correctAnswer: 3,
          explanation: '15³ = 15 × 15 × 15 = 3375'
        }
      ],
      logico: [],
      verbal: [],
      simulacro: []
    }
  },
  conocimiento: {
    general: {
      cultura: [],
      historia: [],
      ciencia: [],
      simulacro: []
    }
  },
  universidad_privada: {
    privada1: {
      numerico: [],
      logico: [],
      verbal: [],
      simulacro: []
    }
  }
}

// ===== COMPONENTES ANIMADOS =====
const FloatingBubble = ({ delay, size, color, left }: { delay: number; size: number; color: string; left: number }) => (
  <motion.div
    className="absolute rounded-full opacity-20"
    style={{ 
      width: size, 
      height: size, 
      background: color,
      left: `${left}%`,
      bottom: -size
    }}
    animate={{
      y: [0, -1000],
      x: [0, Math.sin(delay) * 50],
      opacity: [0.2, 0.5, 0]
    }}
    transition={{
      duration: 8 + delay,
      repeat: Infinity,
      delay: delay,
      ease: 'linear'
    }}
  />
)

const GlowCard = ({ children, onClick, gradient, icon: Icon, disabled }: { 
  children: React.ReactNode; 
  onClick: () => void; 
  gradient: string;
  icon: React.ElementType;
  disabled?: boolean;
}) => (
  <motion.button
    onClick={onClick}
    disabled={disabled}
    className="relative group w-full"
    whileHover={{ scale: disabled ? 1 : 1.02, y: disabled ? 0 : -5 }}
    whileTap={{ scale: disabled ? 1 : 0.98 }}
  >
    <div className={`absolute inset-0 ${gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`} />
    <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex items-center gap-4 group-hover:bg-white/15 transition-colors">
      <div className={`w-14 h-14 rounded-xl ${gradient} flex items-center justify-center shadow-lg`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <div className="flex-1 text-left">
        {children}
      </div>
      <ChevronRight className="w-6 h-6 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
    </div>
  </motion.button>
)

// ===== COMPONENTE PRINCIPAL =====
export default function StudyAssistant() {
  // Estados de navegación
  const [screen, setScreen] = useState<'home' | 'universities' | 'types' | 'quiz' | 'admin'>('home')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedUniversity, setSelectedUniversity] = useState<string>('')
  const [selectedType, setSelectedType] = useState<string>('')
  
  // Estados del quiz
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  
  // Estados de administración
  const [questionsDB, setQuestionsDB] = useState<QuestionsDB>(initialQuestionsDB)
  const [showAdmin, setShowAdmin] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null)
  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0
  })

  // Datos derivados
  const categories = [
    { id: 'razonamiento', name: 'Razonamiento', icon: Brain, gradient: 'bg-gradient-to-br from-purple-500 to-pink-500', description: 'Desarrolla tu mente lógica' },
    { id: 'conocimiento', name: 'Conocimiento', icon: BookOpen, gradient: 'bg-gradient-to-br from-blue-500 to-cyan-500', description: 'Amplía tu cultura general' },
    { id: 'universidad_privada', name: 'Universidad Privada', icon: GraduationCap, gradient: 'bg-gradient-to-br from-amber-500 to-orange-500', description: 'Prepárate para el éxito' }
  ]

  const universities: { [key: string]: { id: string; name: string; fullName: string }[] } = {
    razonamiento: [
      { id: 'uta', name: 'UTA', fullName: 'Universidad Técnica de Ambato' },
      { id: 'unach', name: 'UNACH', fullName: 'Universidad Nacional de Chimborazo' }
    ],
    conocimiento: [
      { id: 'general', name: 'General', fullName: 'Conocimiento General' }
    ],
    universidad_privada: [
      { id: 'privada1', name: 'Universidad A', fullName: 'Universidad Privada A' }
    ]
  }

  const types = [
    { id: 'numerico', name: 'Numérico', icon: Calculator, gradient: 'bg-gradient-to-br from-emerald-500 to-teal-500' },
    { id: 'logico', name: 'Lógico', icon: Puzzle, gradient: 'bg-gradient-to-br from-violet-500 to-purple-500' },
    { id: 'verbal', name: 'Verbal', icon: MessageSquare, gradient: 'bg-gradient-to-br from-rose-500 to-pink-500' },
    { id: 'simulacro', name: 'Simulacro', icon: Target, gradient: 'bg-gradient-to-br from-amber-500 to-yellow-500' }
  ]

  const currentQuestions = questionsDB[selectedCategory]?.[selectedUniversity]?.[selectedType] || []
  const currentQuestion = currentQuestions[currentQuestionIndex]

  // Funciones de navegación
  const goToUniversities = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setScreen('universities')
  }

  const goToTypes = (universityId: string) => {
    setSelectedUniversity(universityId)
    setScreen('types')
  }

  const goToQuiz = (typeId: string) => {
    setSelectedType(typeId)
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnswers([])
    setScreen('quiz')
  }

  const goBack = () => {
    if (screen === 'universities') setScreen('home')
    else if (screen === 'types') setScreen('universities')
    else if (screen === 'quiz') setScreen('types')
    else if (screen === 'admin') setShowAdmin(false)
  }

  // Funciones del quiz
  const handleAnswer = (answerIndex: number) => {
    if (showResult) return
    setSelectedAnswer(answerIndex)
  }

  const confirmAnswer = () => {
    if (selectedAnswer === null) return
    
    const isCorrect = selectedAnswer === currentQuestion?.correctAnswer
    if (isCorrect) setScore(s => s + 1)
    
    setAnswers([...answers, selectedAnswer])
    setShowResult(true)
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(i => i + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      // Quiz terminado
      setScreen('results')
    }
  }

  // Funciones de administración
  const saveQuestion = () => {
    if (!newQuestion.question || !newQuestion.options?.every(o => o)) return
    
    const question: Question = {
      id: Date.now().toString(),
      question: newQuestion.question,
      options: newQuestion.options as string[],
      correctAnswer: newQuestion.correctAnswer || 0
    }

    setQuestionsDB(prev => ({
      ...prev,
      [selectedCategory]: {
        ...prev[selectedCategory],
        [selectedUniversity]: {
          ...prev[selectedCategory]?.[selectedUniversity],
          [selectedType]: [...(prev[selectedCategory]?.[selectedUniversity]?.[selectedType] || []), question]
        }
      }
    }))

    setNewQuestion({ question: '', options: ['', '', '', ''], correctAnswer: 0 })
    setEditingQuestion(null)
  }

  const deleteQuestion = (questionId: string) => {
    setQuestionsDB(prev => ({
      ...prev,
      [selectedCategory]: {
        ...prev[selectedCategory],
        [selectedUniversity]: {
          ...prev[selectedCategory]?.[selectedUniversity],
          [selectedType]: prev[selectedCategory]?.[selectedUniversity]?.[selectedType]?.filter(q => q.id !== questionId) || []
        }
      }
    }))
  }

  // Renderizado condicional de pantallas
  const renderHome = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
    >
      {/* Burbujas flotantes de fondo */}
      {[...Array(10)].map((_, i) => (
        <FloatingBubble
          key={i}
          delay={i * 0.8}
          size={40 + Math.random() * 60}
          color={['#a855f7', '#3b82f6', '#ec4899', '#f59e0b'][i % 4]}
          left={10 + i * 9}
        />
      ))}

      {/* Logo y título */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center mb-12 relative z-10"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="text-6xl mb-4"
        >
          🎓
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent mb-3">
          StudyMaster
        </h1>
        <p className="text-white/60 text-lg">Tu asistente inteligente para estudiar</p>
      </motion.div>

      {/* Tarjetas de categoría */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-full max-w-md space-y-4 relative z-10"
      >
        <p className="text-center text-white/80 text-xl font-medium mb-6">
          ¿Qué quieres estudiar hoy?
        </p>
        
        {categories.map((cat, index) => (
          <motion.div
            key={cat.id}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.15 }}
          >
            <GlowCard
              onClick={() => goToUniversities(cat.id)}
              gradient={cat.gradient}
              icon={cat.icon}
            >
              <h3 className="text-xl font-bold text-white">{cat.name}</h3>
              <p className="text-white/60 text-sm">{cat.description}</p>
            </GlowCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Botón de administración */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={() => setShowAdmin(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors z-20"
      >
        <Settings className="w-6 h-6 text-white/70" />
      </motion.button>
    </motion.div>
  )

  const renderUniversities = () => (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
    >
      {/* Burbujas */}
      {[...Array(8)].map((_, i) => (
        <FloatingBubble
          key={i}
          delay={i * 1}
          size={30 + Math.random() * 50}
          color="#a855f7"
          left={5 + i * 12}
        />
      ))}

      {/* Header */}
      <div className="absolute top-6 left-6 z-20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={goBack}
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Volver</span>
        </motion.button>
      </div>

      {/* Título */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-10 relative z-10"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          {categories.find(c => c.id === selectedCategory)?.icon && (
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              {(() => {
                const Icon = categories.find(c => c.id === selectedCategory)!.icon
                return <Icon className="w-6 h-6 text-white" />
              })()}
            </div>
          )}
          <h2 className="text-3xl font-bold text-white">
            {categories.find(c => c.id === selectedCategory)?.name}
          </h2>
        </div>
        <p className="text-white/60">Selecciona tu universidad</p>
      </motion.div>

      {/* Lista de universidades */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-md space-y-4 relative z-10"
      >
        {universities[selectedCategory]?.map((uni, index) => (
          <motion.div
            key={uni.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <GlowCard
              onClick={() => goToTypes(uni.id)}
              gradient="bg-gradient-to-br from-indigo-500 to-purple-500"
              icon={Building2}
            >
              <h3 className="text-xl font-bold text-white">{uni.name}</h3>
              <p className="text-white/60 text-sm">{uni.fullName}</p>
            </GlowCard>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )

  const renderTypes = () => (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
    >
      {/* Header */}
      <div className="absolute top-6 left-6 z-20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={goBack}
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Volver</span>
        </motion.button>
      </div>

      {/* Título */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-10 relative z-10"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <Building2 className="w-10 h-10 text-purple-400" />
          <h2 className="text-3xl font-bold text-white">
            {universities[selectedCategory]?.find(u => u.id === selectedUniversity)?.name}
          </h2>
        </div>
        <p className="text-white/60">Elige el tipo de ejercicio</p>
      </motion.div>

      {/* Grid de tipos */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-lg grid grid-cols-2 gap-4 relative z-10"
      >
        {types.map((type, index) => {
          const hasQuestions = (questionsDB[selectedCategory]?.[selectedUniversity]?.[type.id]?.length || 0) > 0
          return (
            <motion.button
              key={type.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => goToQuiz(type.id)}
              className="relative group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all"
            >
              <div className={`w-14 h-14 mx-auto mb-4 rounded-xl ${type.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                <type.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{type.name}</h3>
              <p className="text-white/50 text-sm">
                {questionsDB[selectedCategory]?.[selectedUniversity]?.[type.id]?.length || 0} preguntas
              </p>
              {!hasQuestions && (
                <div className="absolute top-2 right-2">
                  <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                </div>
              )}
            </motion.button>
          )
        })}
      </motion.div>
    </motion.div>
  )

  const renderQuiz = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col p-6 relative"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={goBack}
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Salir</span>
        </motion.button>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
            <Star className="w-4 h-4 text-amber-400" />
            <span className="text-white font-bold">{score}</span>
          </div>
          <div className="text-white/60">
            {currentQuestionIndex + 1} / {currentQuestions.length}
          </div>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="w-full h-2 bg-white/10 rounded-full mb-8 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%` }}
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
        />
      </div>

      {currentQuestion ? (
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 flex flex-col"
        >
          {/* Pregunta */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-6">
            <h2 className="text-xl md:text-2xl font-medium text-white leading-relaxed">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Opciones */}
          <div className="grid gap-3 mb-6">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index
              const isCorrect = index === currentQuestion.correctAnswer
              const showCorrect = showResult && isCorrect
              const showWrong = showResult && isSelected && !isCorrect
              
              return (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: showResult ? 1 : 1.02 }}
                  whileTap={{ scale: showResult ? 1 : 0.98 }}
                  onClick={() => handleAnswer(index)}
                  disabled={showResult}
                  className={`
                    relative p-4 rounded-xl border text-left transition-all
                    ${showCorrect ? 'bg-emerald-500/20 border-emerald-500' : ''}
                    ${showWrong ? 'bg-red-500/20 border-red-500' : ''}
                    ${isSelected && !showResult ? 'bg-purple-500/20 border-purple-500' : ''}
                    ${!isSelected && !showResult ? 'bg-white/5 border-white/10 hover:border-white/30' : ''}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                      ${showCorrect ? 'bg-emerald-500 text-white' : ''}
                      ${showWrong ? 'bg-red-500 text-white' : ''}
                      ${isSelected && !showResult ? 'bg-purple-500 text-white' : ''}
                      ${!isSelected && !showResult ? 'bg-white/10 text-white/60' : ''}
                    `}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-white">{option}</span>
                    {showCorrect && <CheckCircle className="w-5 h-5 text-emerald-400 ml-auto" />}
                    {showWrong && <XCircle className="w-5 h-5 text-red-400 ml-auto" />}
                  </div>
                </motion.button>
              )
            })}
          </div>

          {/* Explicación */}
          {showResult && currentQuestion.explanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6"
            >
              <p className="text-blue-200 text-sm">
                💡 <strong>Explicación:</strong> {currentQuestion.explanation}
              </p>
            </motion.div>
          )}

          {/* Botón de acción */}
          {!showResult ? (
            <motion.button
              whileHover={{ scale: selectedAnswer !== null ? 1.02 : 1 }}
              whileTap={{ scale: selectedAnswer !== null ? 0.98 : 1 }}
              onClick={confirmAnswer}
              disabled={selectedAnswer === null}
              className={`
                py-4 rounded-xl font-bold text-lg transition-all
                ${selectedAnswer !== null 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                  : 'bg-white/10 text-white/40 cursor-not-allowed'}
              `}
            >
              Confirmar Respuesta
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={nextQuestion}
              className="py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
            >
              {currentQuestionIndex < currentQuestions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
            </motion.button>
          )}
        </motion.div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center">
          <Sparkles className="w-16 h-16 text-amber-400 mb-4 animate-pulse" />
          <h2 className="text-2xl font-bold text-white mb-2">¡No hay preguntas!</h2>
          <p className="text-white/60 mb-6">Agrega preguntas desde el panel de administración</p>
          <button
            onClick={() => setShowAdmin(true)}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-medium"
          >
            Agregar Preguntas
          </button>
        </div>
      )}
    </motion.div>
  )

  const renderResults = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen flex flex-col items-center justify-center p-6"
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 0.5 }}
        className="text-6xl mb-6"
      >
        🏆
      </motion.div>
      
      <h1 className="text-3xl font-bold text-white mb-2">¡Quiz Completado!</h1>
      <p className="text-white/60 mb-8">Has terminado el ejercicio</p>
      
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8 text-center">
        <div className="text-5xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-2">
          {score} / {currentQuestions.length}
        </div>
        <p className="text-white/60">Respuestas correctas</p>
        <div className="mt-4">
          <div className="w-48 h-3 bg-white/10 rounded-full overflow-hidden mx-auto">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(score / currentQuestions.length) * 100}%` }}
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
            />
          </div>
          <p className="text-white/40 text-sm mt-2">
            {Math.round((score / currentQuestions.length) * 100)}% de aciertos
          </p>
        </div>
      </div>
      
      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => goToQuiz(selectedType)}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-medium"
        >
          Intentar de Nuevo
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setScreen('home')}
          className="px-6 py-3 bg-white/10 rounded-xl text-white font-medium"
        >
          Volver al Inicio
        </motion.button>
      </div>
    </motion.div>
  )

  const renderAdmin = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gray-900 border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Gestión de Preguntas
          </h2>
          <button
            onClick={() => setShowAdmin(false)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>

        <div className="flex h-[calc(90vh-60px)]">
          {/* Sidebar */}
          <div className="w-64 border-r border-white/10 p-4 overflow-y-auto">
            <p className="text-white/40 text-sm mb-4">Selecciona categoría:</p>
            
            {Object.entries(questionsDB).map(([catId, catData]) => (
              <div key={catId} className="mb-4">
                <p className="text-white font-medium mb-2 capitalize">{catId.replace('_', ' ')}</p>
                {Object.entries(catData).map(([uniId, uniData]) => (
                  <div key={uniId} className="ml-2 mb-2">
                    <p className="text-white/60 text-sm mb-1">{uniId.toUpperCase()}</p>
                    {Object.keys(uniData).map(typeId => (
                      <button
                        key={typeId}
                        onClick={() => {
                          setSelectedCategory(catId)
                          setSelectedUniversity(uniId)
                          setSelectedType(typeId)
                        }}
                        className={`
                          w-full text-left px-3 py-2 rounded-lg text-sm mb-1 transition-colors
                          ${selectedCategory === catId && selectedUniversity === uniId && selectedType === typeId
                            ? 'bg-purple-500/20 text-purple-300'
                            : 'text-white/40 hover:bg-white/5'}
                        `}
                      >
                        {typeId} ({uniData[typeId]?.length || 0})
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Contenido principal */}
          <div className="flex-1 p-4 overflow-y-auto">
            {selectedType ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-white">
                    Preguntas de {selectedType}
                  </h3>
                  <button
                    onClick={() => setEditingQuestion({ id: '', question: '', options: ['', '', '', ''], correctAnswer: 0 })}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white text-sm font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    Nueva Pregunta
                  </button>
                </div>

                {/* Lista de preguntas */}
                <div className="space-y-3">
                  {questionsDB[selectedCategory]?.[selectedUniversity]?.[selectedType]?.map((q, index) => (
                    <div key={q.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-white/40 text-sm mb-1">Pregunta {index + 1}</p>
                          <p className="text-white">{q.question}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {q.options.map((opt, i) => (
                              <span
                                key={i}
                                className={`px-3 py-1 rounded-full text-xs ${
                                  i === q.correctAnswer
                                    ? 'bg-emerald-500/20 text-emerald-300'
                                    : 'bg-white/10 text-white/60'
                                }`}
                              >
                                {String.fromCharCode(65 + i)}: {opt}
                              </span>
                            ))}
                          </div>
                        </div>
                        <button
                          onClick={() => deleteQuestion(q.id)}
                          className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {(!questionsDB[selectedCategory]?.[selectedUniversity]?.[selectedType] ||
                    questionsDB[selectedCategory][selectedUniversity][selectedType].length === 0) && (
                    <div className="text-center py-12 text-white/40">
                      <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No hay preguntas en esta categoría</p>
                    </div>
                  )}
                </div>

                {/* Formulario de nueva pregunta */}
                {editingQuestion && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="fixed inset-0 bg-black/60 flex items-center justify-center p-4"
                    style={{ zIndex: 60 }}
                  >
                    <div className="bg-gray-800 border border-white/10 rounded-2xl p-6 w-full max-w-lg">
                      <h4 className="text-lg font-bold text-white mb-4">Nueva Pregunta</h4>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="text-white/60 text-sm mb-1 block">Pregunta</label>
                          <textarea
                            value={newQuestion.question}
                            onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white resize-none"
                            rows={3}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          {newQuestion.options?.map((opt, i) => (
                            <div key={i}>
                              <label className="text-white/60 text-sm mb-1 block">
                                Opción {String.fromCharCode(65 + i)}
                              </label>
                              <input
                                type="text"
                                value={opt}
                                onChange={(e) => {
                                  const newOpts = [...(newQuestion.options || [])]
                                  newOpts[i] = e.target.value
                                  setNewQuestion({ ...newQuestion, options: newOpts })
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                              />
                            </div>
                          ))}
                        </div>

                        <div>
                          <label className="text-white/60 text-sm mb-1 block">Respuesta Correcta</label>
                          <select
                            value={newQuestion.correctAnswer}
                            onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswer: parseInt(e.target.value) })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                          >
                            {[0, 1, 2, 3].map(i => (
                              <option key={i} value={i} className="bg-gray-800">
                                Opción {String.fromCharCode(65 + i)}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 mt-6">
                        <button
                          onClick={() => setEditingQuestion(null)}
                          className="px-4 py-2 bg-white/10 rounded-lg text-white"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={saveQuestion}
                          className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg text-white font-medium"
                        >
                          <Save className="w-4 h-4 inline mr-2" />
                          Guardar
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-white/40">
                <Settings className="w-16 h-16 mb-4 opacity-30" />
                <p>Selecciona una categoría del menú lateral</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      <AnimatePresence mode="wait">
        {screen === 'home' && !showAdmin && (
          <motion.div key="home">{renderHome()}</motion.div>
        )}
        {screen === 'universities' && !showAdmin && (
          <motion.div key="universities">{renderUniversities()}</motion.div>
        )}
        {screen === 'types' && !showAdmin && (
          <motion.div key="types">{renderTypes()}</motion.div>
        )}
        {screen === 'quiz' && !showAdmin && (
          <motion.div key="quiz">{renderQuiz()}</motion.div>
        )}
        {screen === 'results' && !showAdmin && (
          <motion.div key="results">{renderResults()}</motion.div>
        )}
      </AnimatePresence>

      {/* Panel de administración */}
      {showAdmin && renderAdmin()}
    </div>
  )
}
