'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Star {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  animationDelay: number
}

interface ShootingStar {
  id: number
  x: number
  y: number
  angle: number
}

export default function Universe({ children }: { children: React.ReactNode }) {
  const [stars, setStars] = useState<Star[]>([])
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Generate random stars
    const generateStars = () => {
      const newStars: Star[] = []
      for (let i = 0; i < 200; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.7 + 0.3,
          animationDelay: Math.random() * 5
        })
      }
      setStars(newStars)
    }

    generateStars()
  }, [])

  // Create shooting stars periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newStar: ShootingStar = {
          id: Date.now(),
          x: Math.random() * 100,
          y: Math.random() * 50,
          angle: Math.random() * 30 + 15
        }
        setShootingStars(prev => [...prev, newStar])
        
        // Remove after animation
        setTimeout(() => {
          setShootingStars(prev => prev.filter(s => s.id !== newStar.id))
        }, 1500)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #0a0a1a 0%, #000010 40%, #000000 100%)'
      }}
    >
      {/* Deep space nebula effect */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 70%)
          `
        }}
      />

      {/* Static stars */}
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            boxShadow: `0 0 ${star.size * 2}px ${star.size}px rgba(255, 255, 255, ${star.opacity * 0.5})`,
            animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: `${star.animationDelay}s`
          }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map(star => (
        <motion.div
          key={star.id}
          className="absolute"
          initial={{ 
            left: `${star.x}%`, 
            top: `${star.y}%`,
            opacity: 1,
            scale: 1
          }}
          animate={{ 
            left: `${star.x + 30}%`, 
            top: `${star.y + 20}%`,
            opacity: 0,
            scale: 0.5
          }}
          transition={{ duration: 1.5, ease: 'linear' }}
          style={{
            width: 100,
            height: 2,
            background: 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,1) 100%)',
            transform: `rotate(${star.angle}deg)`,
            boxShadow: '0 0 6px 2px rgba(255, 255, 255, 0.5)'
          }}
        />
      ))}

      {/* Animated glow orbs */}
      <div 
        className="absolute w-64 h-64 rounded-full opacity-10"
        style={{
          left: '10%',
          top: '20%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, transparent 70%)',
          animation: 'float 20s ease-in-out infinite'
        }}
      />
      <div 
        className="absolute w-48 h-48 rounded-full opacity-10"
        style={{
          right: '15%',
          bottom: '30%',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.8) 0%, transparent 70%)',
          animation: 'float 25s ease-in-out infinite reverse'
        }}
      />

      {/* Main content */}
      <div className="relative z-10 min-h-screen">
        {children}
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(30px, -30px); }
          50% { transform: translate(-20px, 20px); }
          75% { transform: translate(20px, 10px); }
        }
      `}</style>
    </div>
  )
}
