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

export default function Planet({ planet, index, onClick, isHovered, onHover }: PlanetProps) {
  const isActive = planet.isActive
  
  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: '50%',
        top: '50%',
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
      }}
      transition={{ 
        delay: index * 0.1,
        duration: 0.5,
        ease: 'easeOut'
      }}
      onMouseEnter={() => onHover(planet.id)}
      onMouseLeave={() => onHover(null)}
      onClick={onClick}
    >
      {/* Orbit ring */}
      <div
        className="absolute border border-white/5 rounded-full pointer-events-none"
        style={{
          width: planet.orbitRadius * 2,
          height: planet.orbitRadius * 2,
          left: -planet.orbitRadius,
          top: -planet.orbitRadius,
        }}
      />
      
      {/* Planet container with orbit animation */}
      <motion.div
        className="relative"
        animate={{
          rotate: [0, 360]
        }}
        transition={{
          duration: planet.orbitSpeed * 10,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        {/* Planet body positioned at orbit radius */}
        <motion.div
          className="absolute"
          style={{
            left: planet.orbitRadius,
            top: 0,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            rotate: [0, -360] // Counter-rotate to keep planet upright
          }}
          transition={{
            duration: planet.orbitSpeed * 10,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          {/* Planet glow effect */}
          <motion.div
            className={`absolute rounded-full bg-gradient-to-br ${planet.gradientFrom} ${planet.gradientTo} blur-md`}
            style={{
              width: planet.size * 1.5,
              height: planet.size * 1.5,
              left: -planet.size * 0.25,
              top: -planet.size * 0.25,
              opacity: isHovered ? 0.8 : 0.4
            }}
            animate={{
              scale: isHovered ? 1.3 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Planet surface */}
          <motion.div
            className={`relative rounded-full bg-gradient-to-br ${planet.gradientFrom} ${planet.gradientTo} flex items-center justify-center shadow-lg`}
            style={{
              width: planet.size,
              height: planet.size,
              boxShadow: `
                inset -${planet.size/6}px -${planet.size/6}px ${planet.size/3}px rgba(0,0,0,0.4),
                inset ${planet.size/10}px ${planet.size/10}px ${planet.size/4}px rgba(255,255,255,0.2),
                0 0 ${isHovered ? planet.size : planet.size/2}px ${planet.color}40
              `
            }}
            animate={{
              scale: isHovered ? 1.15 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Planet icon or lock */}
            {isActive ? (
              <motion.span 
                className="text-lg md:text-xl"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
              >
                {planet.icon}
              </motion.span>
            ) : (
              <Lock className="w-4 h-4 text-gray-400" />
            )}
            
            {/* Surface details */}
            <div 
              className="absolute inset-0 rounded-full opacity-30"
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 50%),
                  radial-gradient(circle at 70% 70%, rgba(0,0,0,0.3) 0%, transparent 50%)
                `
              }}
            />
          </motion.div>
          
          {/* Planet name tooltip */}
          <motion.div
            className="absolute whitespace-nowrap text-center pointer-events-none"
            style={{
              left: '50%',
              top: planet.size / 2 + 10,
              transform: 'translateX(-50%)',
            }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 5 : 0
            }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-xs md:text-sm font-semibold text-white drop-shadow-lg">
              {planet.name}
            </span>
            <br />
            <span className="text-[10px] md:text-xs text-white/70">
              {planet.theme}
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
