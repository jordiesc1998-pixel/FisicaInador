'use client'

import { useCallback, useRef } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { motion } from 'framer-motion'

export function useAudio() {
  const audioContextRef = useRef<AudioContext | null>(null)
  const ambientOscillatorRef = useRef<OscillatorNode | null>(null)
  const ambientGainRef = useRef<GainNode | null>(null)
  const isPlayingRef = useRef(false)

  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    return audioContextRef.current
  }, [])

  const playLandingSound = useCallback(() => {
    const ctx = initAudioContext()
    if (ctx.state === 'suspended') {
      ctx.resume()
    }

    // Create a swoosh/landing sound
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    oscillator.connect(filter)
    filter.connect(gainNode)
    gainNode.connect(ctx.destination)

    // Configure the sound
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(800, ctx.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.3)

    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(2000, ctx.currentTime)
    filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.3)

    gainNode.gain.setValueAtTime(0.15, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.3)
  }, [initAudioContext])

  const startAmbientMusic = useCallback(() => {
    if (isPlayingRef.current) return

    const ctx = initAudioContext()
    if (ctx.state === 'suspended') {
      ctx.resume()
    }

    // Create ambient drone
    const oscillator1 = ctx.createOscillator()
    const oscillator2 = ctx.createOscillator()
    const gainNode = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    oscillator1.connect(gainNode)
    oscillator2.connect(gainNode)
    gainNode.connect(filter)
    filter.connect(ctx.destination)

    oscillator1.type = 'sine'
    oscillator1.frequency.setValueAtTime(55, ctx.currentTime) // Low A

    oscillator2.type = 'sine'
    oscillator2.frequency.setValueAtTime(82.5, ctx.currentTime) // E

    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(500, ctx.currentTime)

    gainNode.gain.setValueAtTime(0, ctx.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 2)

    oscillator1.start()
    oscillator2.start()

    ambientOscillatorRef.current = oscillator1
    ambientGainRef.current = gainNode
    isPlayingRef.current = true
  }, [initAudioContext])

  const stopAmbientMusic = useCallback(() => {
    if (ambientGainRef.current && audioContextRef.current) {
      ambientGainRef.current.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + 0.5)
      setTimeout(() => {
        if (ambientOscillatorRef.current) {
          ambientOscillatorRef.current.stop()
          ambientOscillatorRef.current = null
        }
        isPlayingRef.current = false
      }, 600)
    }
  }, [])

  const toggleAmbientMusic = useCallback(() => {
    if (isPlayingRef.current) {
      stopAmbientMusic()
      return false
    } else {
      startAmbientMusic()
      return true
    }
  }, [startAmbientMusic, stopAmbientMusic])

  return {
    playLandingSound,
    startAmbientMusic,
    stopAmbientMusic,
    toggleAmbientMusic,
  }
}

interface AudioControllerProps {
  onToggle: () => void
  isPlaying: boolean
}

export function AudioController({ onToggle, isPlaying }: AudioControllerProps) {
  return (
    <motion.button
      onClick={onToggle}
      className="fixed bottom-4 right-4 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      title={isPlaying ? 'Silenciar música ambiente' : 'Reproducir música ambiente'}
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5 text-white/80" />
      ) : (
        <VolumeX className="w-5 h-5 text-white/60" />
      )}
    </motion.button>
  )
}
