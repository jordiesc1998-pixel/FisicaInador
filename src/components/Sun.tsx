'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function Sun() {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
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
            width: 180 + i * 40,
            height: 180 + i * 40,
            background: `radial-gradient(circle, rgba(255, 200, 50, ${0.15 - i * 0.04}) 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5]
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
          width: 160,
          height: 160,
          background: 'radial-gradient(circle, rgba(255, 220, 100, 0.3) 0%, rgba(255, 180, 50, 0.1) 50%, transparent 70%)',
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
        className="relative w-28 h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center"
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
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        {/* Sun surface texture */}
        <div 
          className="absolute inset-0 rounded-full opacity-50"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.4) 0%, transparent 20%),
              radial-gradient(circle at 70% 60%, rgba(255, 100, 0, 0.3) 0%, transparent 30%),
              radial-gradient(circle at 50% 80%, rgba(255, 150, 50, 0.2) 0%, transparent 25%)
            `
          }}
        />
        
        {/* Sun icon */}
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-amber-900/50" />
        </motion.div>
      </motion.div>

      {/* Floating particles around sun */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-yellow-300"
          style={{
            left: '50%',
            top: '50%',
          }}
          animate={{
            x: [0, Math.cos(i * Math.PI / 4) * 100],
            y: [0, Math.sin(i * Math.PI / 4) * 100],
            opacity: [0.8, 0, 0.8],
            scale: [1, 0.5, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'easeInOut'
          }}
        />
      ))}
    </motion.div>
  )
}
