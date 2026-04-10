'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Sparkles, Info, Volume2, VolumeX } from 'lucide-react'
import Universe from '@/components/Universe'
import Planet from '@/components/Planet'
import Sun from '@/components/Sun'
import { planets } from '@/data/planets'
import { useAudio, AudioController } from '@/components/AudioContext'

export default function HomePage() {
  const router = useRouter()
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null)
  const [showInfo, setShowInfo] = useState(false)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const { playLandingSound, startAmbientMusic, stopAmbientMusic } = useAudio()

  const handlePlanetClick = useCallback((planetId: string, isActive: boolean) => {
    if (!isActive) return
    
    playLandingSound()
    
    // Navigate to planet page with a delay for the sound
    setTimeout(() => {
      router.push(`/planeta/${planetId}`)
    }, 300)
  }, [playLandingSound, router])

  const toggleAudio = useCallback(() => {
    if (isAudioPlaying) {
      stopAmbientMusic()
      setIsAudioPlaying(false)
    } else {
      startAmbientMusic()
      setIsAudioPlaying(true)
    }
  }, [isAudioPlaying, startAmbientMusic, stopAmbientMusic])

  return (
    <Universe>
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-40 p-4 md:p-6"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
            >
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white">
                FisicaInador
              </h1>
              <p className="text-xs md:text-sm text-white/60">
                Tu universo de física pre-universitaria
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => setShowInfo(!showInfo)}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Info className="w-5 h-5 text-white/70" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Universe content */}
      <div className="fixed inset-0 flex items-center justify-center">
        {/* Sun at center */}
        <Sun />

        {/* Planets orbiting */}
        {planets.map((planet, index) => (
          <Planet
            key={planet.id}
            planet={planet}
            index={index}
            onClick={() => handlePlanetClick(planet.id, planet.isActive)}
            isHovered={hoveredPlanet === planet.id}
            onHover={setHoveredPlanet}
          />
        ))}
      </div>

      {/* Bottom instructions */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="fixed bottom-0 left-0 right-0 z-40 p-4 md:p-6 text-center"
      >
        <div className="max-w-md mx-auto">
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/60 text-sm md:text-base"
          >
            🚀 Haz clic en un planeta para explorar su tema
          </motion.p>
        </div>
      </motion.div>

      {/* Info modal */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowInfo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900/95 border border-white/10 rounded-2xl p-6 max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                Sobre FisicaInador
              </h2>
              <div className="space-y-3 text-white/70 text-sm">
                <p>
                  <strong className="text-white">FisicaInador</strong> es una plataforma educativa 
                  diseñada para estudiantes pre-universitarios que quieren dominar la física 
                  de una manera visual e interactiva.
                </p>
                <p>
                  Cada <strong className="text-white">planeta</strong> representa un tema fundamental 
                  de física. Al hacer clic en un planeta, accederás a:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>📖 Teoría resumida y explicaciones claras</li>
                  <li>🖼️ Imágenes ilustrativas</li>
                  <li>🧮 Ejercicios con IA</li>
                  <li>🎮 Juegos educativos</li>
                  <li>🎬 Videos explicativos</li>
                  <li>🤖 Asistente IA personal</li>
                </ul>
                <p className="pt-2 text-white/50 text-xs">
                  Fase 1: Teoría disponible • Próximamente: más módulos
                </p>
              </div>
              <button
                onClick={() => setShowInfo(false)}
                className="mt-4 w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
              >
                ¡Entendido!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audio controller */}
      <AudioController onToggle={toggleAudio} isPlaying={isAudioPlaying} />
    </Universe>
  )
}
