'use client'

import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, BookOpen, Image, Calculator, Gamepad2, 
  Video, Bot, Lock, Sparkles, ExternalLink
} from 'lucide-react'
import { getPlanetById } from '@/data/planets'
import { useCallback } from 'react'

const modules = [
  { id: 'teoria', name: 'Teoría Resumida', icon: BookOpen, available: true },
  { id: 'imagen', name: 'Imagen del Tema', icon: Image, available: false },
  { id: 'ejercicios', name: 'Ejercicios IA', icon: Calculator, available: false },
  { id: 'juego', name: 'Juego', icon: Gamepad2, available: false },
  { id: 'video', name: 'Video', icon: Video, available: false },
  { id: 'asistente', name: 'Asistente IA', icon: Bot, available: false },
]

export default function PlanetPage() {
  const params = useParams()
  const router = useRouter()
  const planet = getPlanetById(params.id as string)

  const handleGoBack = useCallback(() => {
    router.push('/')
  }, [router])

  if (!planet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Planeta no encontrado</h1>
          <button
            onClick={handleGoBack}
            className="px-6 py-2 bg-purple-500 rounded-lg text-white"
          >
            Volver al Universo
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      {/* Stars background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-white/10"
      >
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
          <motion.button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Volver al Universo</span>
          </motion.button>

          <div className="flex-1 flex items-center justify-center gap-3">
            <motion.div
              className={`w-12 h-12 rounded-full bg-gradient-to-br ${planet.gradientFrom} ${planet.gradientTo} flex items-center justify-center shadow-lg`}
              style={{
                boxShadow: `0 0 20px ${planet.color}40`
              }}
              animate={{ 
                boxShadow: [`0 0 20px ${planet.color}40`, `0 0 30px ${planet.color}60`, `0 0 20px ${planet.color}40`]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-2xl">{planet.icon}</span>
            </motion.div>
            <div className="text-center">
              <h1 className="text-xl md:text-2xl font-bold text-white">
                {planet.name}
              </h1>
              <p className="text-sm text-white/60">{planet.theme}</p>
            </div>
          </div>

          <div className="w-24" /> {/* Spacer for centering */}
        </div>
      </motion.header>

      {/* Main content */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 py-8">
        {/* Planet description card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
        >
          <p className="text-white/80 text-lg leading-relaxed">
            {planet.description}
          </p>
        </motion.div>

        {/* Modules grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8"
        >
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              {module.available ? (
                <motion.button
                  className={`w-full p-4 rounded-xl bg-gradient-to-br ${planet.gradientFrom} ${planet.gradientTo} bg-opacity-20 border border-white/20 hover:border-white/40 transition-all group relative overflow-hidden`}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <module.icon className="w-8 h-8 mx-auto mb-2 text-white" />
                  <span className="text-sm font-medium text-white">{module.name}</span>
                </motion.button>
              ) : (
                <div className="w-full p-4 rounded-xl bg-white/5 border border-white/10 opacity-60 cursor-not-allowed relative">
                  <Lock className="absolute top-2 right-2 w-4 h-4 text-white/40" />
                  <module.icon className="w-8 h-8 mx-auto mb-2 text-white/50" />
                  <span className="text-sm font-medium text-white/50">{module.name}</span>
                  <span className="block text-xs text-white/30 mt-1">Próximamente</span>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Theory content */}
        {planet.isActive && planet.theory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            {/* Theory header */}
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className={`w-6 h-6 text-transparent bg-gradient-to-r ${planet.gradientFrom} ${planet.gradientTo} bg-clip-text`} />
              <h2 className="text-2xl font-bold text-white">Teoría Resumida</h2>
            </div>

            {/* Definition */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Sparkles className={`w-5 h-5 bg-gradient-to-r ${planet.gradientFrom} ${planet.gradientTo} bg-clip-text`} />
                Definición
              </h3>
              <p className="text-white/80 leading-relaxed">{planet.theory.definition}</p>
            </div>

            {/* Formulas */}
            {planet.theory.formulas.length > 0 && (
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white mb-4">Fórmulas Principales</h3>
                <div className="grid gap-4">
                  {planet.theory.formulas.map((formula, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="p-4 rounded-xl bg-gradient-to-r from-white/5 to-transparent border-l-4 border-l-current"
                      style={{ borderColor: planet.color }}
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                        <span className="text-lg font-mono font-bold text-white bg-white/10 px-3 py-1 rounded-lg inline-block">
                          {formula.formula}
                        </span>
                        <div className="flex-1">
                          <span className="text-sm font-medium text-white/70">{formula.name}: </span>
                          <span className="text-sm text-white/60">{formula.description}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Units */}
            {planet.theory.units && (
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white mb-3">Unidades</h3>
                <p className="text-white/80">{planet.theory.units}</p>
              </div>
            )}

            {/* Applications */}
            {planet.theory.applications && (
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white mb-3">Aplicaciones</h3>
                <p className="text-white/80">{planet.theory.applications}</p>
              </div>
            )}

            {/* Key points */}
            {planet.theory.keyPoints.length > 0 && (
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white mb-4">Puntos Clave</h3>
                <ul className="space-y-3">
                  {planet.theory.keyPoints.map((point, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <span 
                        className={`w-6 h-6 rounded-full bg-gradient-to-br ${planet.gradientFrom} ${planet.gradientTo} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5`}
                      >
                        {index + 1}
                      </span>
                      <span className="text-white/80">{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}

        {/* Coming soon for inactive planet */}
        {!planet.isActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <Lock className="w-16 h-16 mx-auto mb-4 text-white/30" />
            <h2 className="text-2xl font-bold text-white mb-2">Próximamente</h2>
            <p className="text-white/60">Este planeta está siendo explorado...</p>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-6 mt-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-white/40 text-sm">
            FisicaInador © 2024 • Aprende física explorando el universo
          </p>
        </div>
      </footer>
    </div>
  )
}
