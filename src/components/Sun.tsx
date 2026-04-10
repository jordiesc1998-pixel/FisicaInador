'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, BookOpen } from 'lucide-react'
import { planets } from '@/data/planets'
import { useState, useEffect } from 'react'

export default function Sun() {
  const [randomPlanet, setRandomPlanet] = useState(planets[0])
  const [isChanging, setIsChanging] = useState(false)

  useEffect(() => {
    // Cambiar el tema mostrado cada 8 segundos
    const interval = setInterval(() => {
      setIsChanging(true)
      setTimeout(() => {
        const activePlanets = planets.filter(p => p.isActive)
        const randomIndex = Math.floor(Math.random() * activePlanets.length)
        setRandomPlanet(activePlanets[randomIndex])
        setIsChanging(false)
      }, 500)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      {/* Outer glow rings */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 200 + i * 50,
            height: 200 + i * 50,
            background: `radial-gradient(circle, ${randomPlanet.color}20 0%, transparent 70%)`,
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

      {/* Corona effect */}
      <motion.div
        className="absolute rounded-full"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 180,
          height: 180,
          background: `radial-gradient(circle, ${randomPlanet.color}30 0%, ${randomPlanet.color}10 50%, transparent 70%)`,
        }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Sun body */}
      <motion.div
        className="relative w-28 h-28 md:w-36 md:h-36 rounded-full flex items-center justify-center"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${randomPlanet.color}60 0%, ${randomPlanet.color}90 50%, ${randomPlanet.color} 100%)`,
          boxShadow: `
            0 0 60px ${randomPlanet.color}80,
            0 0 120px ${randomPlanet.color}50,
            0 0 180px ${randomPlanet.color}30,
            inset -10px -10px 30px rgba(0, 0, 0, 0.3),
            inset 5px 5px 20px rgba(255, 255, 255, 0.2)
          `
        }}
        key={randomPlanet.id}
        animate={{
          boxShadow: [
            `0 0 60px ${randomPlanet.color}80, 0 0 120px ${randomPlanet.color}50, 0 0 180px ${randomPlanet.color}30`,
            `0 0 80px ${randomPlanet.color}90, 0 0 140px ${randomPlanet.color}60, 0 0 200px ${randomPlanet.color}40`,
            `0 0 60px ${randomPlanet.color}80, 0 0 120px ${randomPlanet.color}50, 0 0 180px ${randomPlanet.color}30`
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        {/* Sun surface texture */}
        <div 
          className="absolute inset-0 rounded-full opacity-40"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 20%),
              radial-gradient(circle at 70% 60%, rgba(0, 0, 0, 0.2) 0%, transparent 30%)
            `
          }}
        />
        
        {/* Planet icon inside sun */}
        <AnimatePresence mode="wait">
          <motion.div
            key={randomPlanet.id}
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0, rotate: 180 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl"
          >
            {randomPlanet.icon}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Info card below sun */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 mt-4 w-56 md:w-72 text-center"
        style={{ top: '100%' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={randomPlanet.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isChanging ? 0 : 1, y: isChanging ? -10 : 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-black/40 backdrop-blur-sm rounded-xl p-3 border border-white/10"
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              <BookOpen className="w-4 h-4 text-white/60" />
              <span className="text-xs text-white/60 uppercase tracking-wider">Tema del momento</span>
            </div>
            <h3 className="text-sm md:text-base font-bold text-white mb-1">
              {randomPlanet.theme}
            </h3>
            <p className="text-[10px] md:text-xs text-white/70 line-clamp-2">
              {randomPlanet.description}
            </p>
            {randomPlanet.theory.formulas.length > 0 && (
              <div className="mt-2 px-2 py-1 bg-white/10 rounded-lg">
                <span className="text-[10px] md:text-xs font-mono text-white/90">
                  {randomPlanet.theory.formulas[0].formula}
                </span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Floating particles around sun */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 md:w-2 md:h-2 rounded-full"
          style={{
            left: '50%',
            top: '50%',
            backgroundColor: randomPlanet.color,
          }}
          animate={{
            x: [0, Math.cos(i * Math.PI / 3) * 120],
            y: [0, Math.sin(i * Math.PI / 3) * 120],
            opacity: [0.8, 0, 0.8],
            scale: [1, 0.3, 1]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: i * 0.8,
            ease: 'easeInOut'
          }}
        />
      ))}
    </motion.div>
  )
}
