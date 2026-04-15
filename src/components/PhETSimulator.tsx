'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Maximize2, Minimize2, ExternalLink, Info, ChevronLeft } from 'lucide-react'
import { Simulator } from '@/data/simulators'

interface PhETSimulatorProps {
  simulators: Simulator[]
  planetColor: string
  planetName: string
}

export default function PhETSimulator({ simulators, planetColor, planetName }: PhETSimulatorProps) {
  const [selectedSim, setSelectedSim] = useState<Simulator | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleSelectSim = (sim: Simulator) => {
    setSelectedSim(sim)
    setIsLoading(true)
  }

  const handleBack = () => {
    setSelectedSim(null)
    setIsFullscreen(false)
  }

  const openExternal = () => {
    if (selectedSim) {
      window.open(selectedSim.url, '_blank')
    }
  }

  if (simulators.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white/60">No hay simuladores disponibles para este tema.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div 
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${planetColor}30` }}
        >
          <Play className="w-4 h-4" style={{ color: planetColor }} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Simuladores Interactivos</h2>
          <p className="text-white/60 text-sm">PhET Interactive Simulations - University of Colorado</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!selectedSim ? (
          // Grid de simuladores disponibles
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {simulators.map((sim, index) => (
              <motion.button
                key={sim.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleSelectSim(sim)}
                className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all text-left overflow-hidden"
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Background gradient */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
                  style={{ background: `linear-gradient(135deg, ${planetColor}40, transparent)` }}
                />
                
                {/* Play icon */}
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${planetColor}20` }}
                >
                  <Play className="w-6 h-6" style={{ color: planetColor }} />
                </div>

                {/* Info */}
                <h3 className="text-lg font-semibold text-white mb-2">{sim.name}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{sim.description}</p>

                {/* Hover indicator */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${planetColor}30` }}
                  >
                    <Play className="w-4 h-4" style={{ color: planetColor }} />
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          // Simulador seleccionado
          <motion.div
            key="simulator"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`space-y-4 ${isFullscreen ? 'fixed inset-0 z-50 bg-gray-900 p-4' : ''}`}
          >
            {/* Controls bar */}
            <div className={`flex items-center justify-between ${isFullscreen ? 'mb-2' : ''}`}>
              <motion.button
                onClick={handleBack}
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                whileHover={{ x: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Volver a simuladores</span>
              </motion.button>

              <div className="flex items-center gap-2">
                <motion.button
                  onClick={openExternal}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Abrir en nueva pestaña"
                >
                  <ExternalLink className="w-5 h-5" />
                </motion.button>
                <motion.button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
                >
                  {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                </motion.button>
              </div>
            </div>

            {/* Simulator info */}
            {!isFullscreen && (
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-medium mb-1">{selectedSim.name}</h3>
                    <p className="text-white/60 text-sm">{selectedSim.description}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Iframe container */}
            <div 
              className={`relative rounded-xl overflow-hidden bg-gray-800 ${
                isFullscreen ? 'h-[calc(100vh-120px)]' : 'h-[500px] md:h-[600px]'
              }`}
            >
              {/* Loading indicator */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 z-10">
                  <div className="text-center">
                    <div 
                      className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
                      style={{ borderColor: `${planetColor} transparent transparent transparent` }}
                    />
                    <p className="text-white/70">Cargando simulador...</p>
                    <p className="text-white/40 text-sm mt-1">PhET Interactive Simulations</p>
                  </div>
                </div>
              )}

              {/* PhET iframe */}
              <iframe
                src={selectedSim.url}
                className="w-full h-full border-0"
                allow="fullscreen; autoplay"
                onLoad={() => setIsLoading(false)}
                title={selectedSim.name}
              />
            </div>

            {/* Footer info */}
            {!isFullscreen && (
              <div className="text-center text-white/40 text-xs">
                <p>Simulación proporcionada por PhET Interactive Simulations</p>
                <p>University of Colorado Boulder • https://phet.colorado.edu</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
