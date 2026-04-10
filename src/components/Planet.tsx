'use client'

import { motion } from 'framer-motion'
import { Planet as PlanetType } from '@/data/planets'
import { Lock } from 'lucide-react'

interface PlanetProps {
  planet: PlanetType
  index: number
  onClick: () => void
  isHovered: boolean
  onHover: (id: string | null) => void
}

// Posiciones predefinidas para distribuir los planetas por toda la pantalla
const planetPositions = [
  // Fila superior
  { x: 15, y: 15 }, { x: 35, y: 12 }, { x: 55, y: 18 }, { x: 75, y: 14 }, { x: 90, y: 20 },
  // Fila medio-alta
  { x: 8, y: 35 }, { x: 25, y: 38 }, { x: 70, y: 35 }, { x: 85, y: 40 },
  // Fila central (más alejados del centro donde está el sol)
  { x: 5, y: 55 }, { x: 92, y: 52 },
  // Fila medio-baja
  { x: 12, y: 72 }, { x: 30, y: 75 }, { x: 68, y: 73 }, { x: 88, y: 70 },
  // Fila inferior
  { x: 20, y: 88 }, { x: 45, y: 92 }, { x: 80, y: 85 },
]

export default function Planet({ planet, index, onClick, isHovered, onHover }: PlanetProps) {
  const isActive = planet.isActive
  const position = planetPositions[index] || { x: 50, y: 50 }
  
  // Tiempos de animación diferentes para cada planeta
  const floatDuration = 3 + (index % 5)
  const floatDelay = index * 0.3
  
  return (
    <motion.div
      className="absolute cursor-pointer z-10"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
      }}
      transition={{ 
        delay: index * 0.08,
        duration: 0.5,
        ease: 'easeOut'
      }}
      onMouseEnter={() => onHover(planet.id)}
      onMouseLeave={() => onHover(null)}
      onClick={onClick}
    >
      {/* Float animation container */}
      <motion.div
        animate={{
          y: [0, -8, 0, 8, 0],
          x: [0, 4, 0, -4, 0],
        }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: floatDelay,
        }}
      >
        {/* Planet glow effect */}
        <motion.div
          className={`absolute rounded-full bg-gradient-to-br ${planet.gradientFrom} ${planet.gradientTo} blur-xl`}
          style={{
            width: planet.size * 1.8,
            height: planet.size * 1.8,
            left: -planet.size * 0.4,
            top: -planet.size * 0.4,
            opacity: isHovered ? 0.9 : 0.4
          }}
          animate={{
            scale: isHovered ? 1.4 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Planet surface */}
        <motion.div
          className={`relative rounded-full bg-gradient-to-br ${planet.gradientFrom} ${planet.gradientTo} flex items-center justify-center shadow-2xl`}
          style={{
            width: planet.size,
            height: planet.size,
            boxShadow: `
              inset -${planet.size/6}px -${planet.size/6}px ${planet.size/3}px rgba(0,0,0,0.4),
              inset ${planet.size/10}px ${planet.size/10}px ${planet.size/4}px rgba(255,255,255,0.2),
              0 0 ${isHovered ? planet.size * 1.5 : planet.size/2}px ${planet.color}50
            `
          }}
          animate={{
            scale: isHovered ? 1.2 : 1,
          }}
          whileHover={{
            boxShadow: `
              inset -${planet.size/6}px -${planet.size/6}px ${planet.size/3}px rgba(0,0,0,0.4),
              inset ${planet.size/10}px ${planet.size/10}px ${planet.size/4}px rgba(255,255,255,0.2),
              0 0 ${planet.size * 2}px ${planet.color}80
            `
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Planet icon or lock */}
          {isActive ? (
            <motion.span 
              className="text-lg md:text-xl"
              animate={{ 
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: index * 0.15
              }}
            >
              {planet.icon}
            </motion.span>
          ) : (
            <Lock className="w-4 h-4 text-gray-400" />
          )}
          
          {/* Surface details - highlight */}
          <div 
            className="absolute inset-0 rounded-full opacity-30"
            style={{
              background: `
                radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5) 0%, transparent 40%),
                radial-gradient(circle at 70% 70%, rgba(0,0,0,0.4) 0%, transparent 40%)
              `
            }}
          />
        </motion.div>
        
        {/* Planet name tooltip */}
        <motion.div
          className="absolute whitespace-nowrap text-center pointer-events-none"
          style={{
            left: '50%',
            top: planet.size / 2 + 12,
            transform: 'translateX(-50%)',
          }}
          animate={{
            opacity: isHovered ? 1 : 0.7,
            y: isHovered ? 8 : 0
          }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-xs md:text-sm font-bold text-white drop-shadow-lg bg-black/30 px-2 py-0.5 rounded-full">
            {planet.name}
          </span>
          <br />
          <span className="text-[10px] md:text-xs text-white/80 drop-shadow-md">
            {planet.theme}
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
