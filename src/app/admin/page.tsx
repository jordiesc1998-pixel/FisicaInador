'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowLeft, Image as ImageIcon, Video, Gamepad2, Save, Plus, Trash2, 
  Edit, Upload, ExternalLink, Check, X, Settings, Users
} from 'lucide-react'
import { planets } from '@/data/planets'

interface VideoLink {
  id: string;
  title: string;
  url: string;
  planetId: string;
}

interface GameConfig {
  id: string;
  title: string;
  type: 'quiz' | 'simulation' | 'puzzle' | 'match';
  planetId: string;
  isActive: boolean;
}

interface ImageConfig {
  planetId: string;
  url: string;
  uploadedAt: string;
}

// Mock data - En producción esto vendría de una base de datos
const initialVideos: VideoLink[] = [
  { id: '1', title: 'Introducción a la Ley de Hooke', url: 'https://www.youtube.com/watch?v=example1', planetId: 'hooke' },
  { id: '2', title: 'Circuitos en serie y paralelo', url: 'https://www.youtube.com/watch?v=example2', planetId: 'circuitos' },
]

const initialGames: GameConfig[] = [
  { id: '1', title: 'Calculadora de Resortes', type: 'simulation', planetId: 'hooke', isActive: true },
  { id: '2', title: 'Arma Circuitos', type: 'puzzle', planetId: 'circuitos', isActive: false },
]

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'imagenes' | 'videos' | 'juegos'>('imagenes')
  const [selectedPlanet, setSelectedPlanet] = useState<string>(planets[0].id)
  const [videos, setVideos] = useState<VideoLink[]>(initialVideos)
  const [games, setGames] = useState<GameConfig[]>(initialGames)
  const [images, setImages] = useState<ImageConfig[]>([])
  const [newVideoUrl, setNewVideoUrl] = useState('')
  const [newVideoTitle, setNewVideoTitle] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const activePlanets = planets.filter(p => p.isActive)

  const handleSave = async () => {
    setSaving(true)
    // Simular guardado
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const addVideo = () => {
    if (!newVideoUrl || !newVideoTitle) return
    const newVideo: VideoLink = {
      id: Date.now().toString(),
      title: newVideoTitle,
      url: newVideoUrl,
      planetId: selectedPlanet
    }
    setVideos([...videos, newVideo])
    setNewVideoUrl('')
    setNewVideoTitle('')
  }

  const deleteVideo = (id: string) => {
    setVideos(videos.filter(v => v.id !== id))
  }

  const toggleGame = (id: string) => {
    setGames(games.map(g => g.id === id ? { ...g, isActive: !g.isActive } : g))
  }

  const deleteGame = (id: string) => {
    setGames(games.filter(g => g.id !== id))
  }

  const getVideosForPlanet = () => videos.filter(v => v.planetId === selectedPlanet)
  const getGamesForPlanet = () => games.filter(g => g.planetId === selectedPlanet)
  const getImageForPlanet = () => images.find(i => i.planetId === selectedPlanet)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // En producción, subir a storage y obtener URL
      const newImage: ImageConfig = {
        planetId: selectedPlanet,
        url: URL.createObjectURL(file),
        uploadedAt: new Date().toISOString()
      }
      setImages(prev => {
        const filtered = prev.filter(i => i.planetId !== selectedPlanet)
        return [...filtered, newImage]
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Volver al Universo</span>
            </Link>
            <div className="h-6 w-px bg-white/20" />
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <Settings className="w-5 h-5 text-amber-400" />
              Panel de Administración
            </h1>
          </div>
          
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Save className="w-4 h-4" />
                </motion.div>
                Guardando...
              </>
            ) : saved ? (
              <>
                <Check className="w-4 h-4" />
                ¡Guardado!
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Guardar Cambios
              </>
            )}
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Planet Selector */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 rounded-xl border border-white/10 p-4 sticky top-24">
              <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
                Seleccionar Planeta
              </h2>
              <div className="space-y-1 max-h-96 overflow-y-auto">
                {activePlanets.map(planet => (
                  <button
                    key={planet.id}
                    onClick={() => setSelectedPlanet(planet.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                      selectedPlanet === planet.id 
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                        : 'text-white/70 hover:bg-white/5'
                    }`}
                  >
                    <span className="text-lg">{planet.icon}</span>
                    <div className="text-left">
                      <div className="text-sm font-medium">{planet.name}</div>
                      <div className="text-xs text-white/40">{planet.theme}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              {[
                { id: 'imagenes', label: 'Imágenes', icon: ImageIcon },
                { id: 'videos', label: 'Videos', icon: Video },
                { id: 'juegos', label: 'Juegos', icon: Gamepad2 },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-amber-500 text-white'
                      : 'bg-gray-800/50 text-white/60 hover:bg-gray-700/50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'imagenes' && (
                <motion.div
                  key="imagenes"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-gray-800/50 rounded-xl border border-white/10 p-6"
                >
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-amber-400" />
                    Imagen del Tema
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Upload Area */}
                    <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-amber-500/50 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <Upload className="w-12 h-12 text-white/30 mx-auto mb-4" />
                        <p className="text-white/60 mb-2">Click para subir imagen</p>
                        <p className="text-xs text-white/40">PNG, JPG, GIF hasta 5MB</p>
                      </label>
                    </div>

                    {/* Preview */}
                    <div className="bg-gray-900/50 rounded-xl p-4">
                      <p className="text-sm text-white/60 mb-2">Vista previa actual:</p>
                      {getImageForPlanet() ? (
                        <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-800">
                          <img 
                            src={getImageForPlanet()?.url} 
                            alt={`Imagen del ${planets.find(p => p.id === selectedPlanet)?.theme || 'tema'}`}
                            className="w-full h-full object-cover"
                          />
                          <button 
                            onClick={() => setImages(images.filter(i => i.planetId !== selectedPlanet))}
                            className="absolute top-2 right-2 p-1 bg-red-500 rounded-lg text-white hover:bg-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="aspect-video rounded-lg bg-gray-800 flex items-center justify-center">
                          <p className="text-white/30">Sin imagen</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Image Guidelines */}
                  <div className="mt-6 p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                    <h4 className="text-sm font-semibold text-amber-400 mb-2">💡 Recomendaciones</h4>
                    <ul className="text-xs text-white/60 space-y-1">
                      <li>• Usar imágenes ilustrativas que representen el tema visualmente</li>
                      <li>• Resolución recomendada: 1920x1080 px (16:9)</li>
                      <li>• Estilo cartoon pero educativo y claro</li>
                      <li>• Incluir fórmulas o diagramas cuando sea relevante</li>
                    </ul>
                  </div>
                </motion.div>
              )}

              {activeTab === 'videos' && (
                <motion.div
                  key="videos"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-gray-800/50 rounded-xl border border-white/10 p-6"
                >
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Video className="w-5 h-5 text-amber-400" />
                    Videos de YouTube
                  </h3>

                  {/* Add new video */}
                  <div className="bg-gray-900/50 rounded-xl p-4 mb-6">
                    <h4 className="text-sm font-medium text-white/80 mb-3">Agregar nuevo video</h4>
                    <div className="flex flex-col md:flex-row gap-3">
                      <input
                        type="text"
                        placeholder="Título del video"
                        value={newVideoTitle}
                        onChange={e => setNewVideoTitle(e.target.value)}
                        className="flex-1 px-4 py-2 bg-gray-800 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:border-amber-500 focus:outline-none"
                      />
                      <input
                        type="url"
                        placeholder="https://www.youtube.com/watch?v=..."
                        value={newVideoUrl}
                        onChange={e => setNewVideoUrl(e.target.value)}
                        className="flex-1 px-4 py-2 bg-gray-800 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:border-amber-500 focus:outline-none"
                      />
                      <button
                        onClick={addVideo}
                        disabled={!newVideoUrl || !newVideoTitle}
                        className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus className="w-4 h-4" />
                        Agregar
                      </button>
                    </div>
                  </div>

                  {/* Video list */}
                  <div className="space-y-3">
                    {getVideosForPlanet().length === 0 ? (
                      <div className="text-center py-8 text-white/40">
                        No hay videos configurados para este planeta
                      </div>
                    ) : (
                      getVideosForPlanet().map(video => (
                        <div 
                          key={video.id}
                          className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-xl border border-white/5"
                        >
                          <div className="flex-1">
                            <h4 className="text-white font-medium">{video.title}</h4>
                            <a 
                              href={video.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm text-amber-400 hover:underline flex items-center gap-1"
                            >
                              {video.url}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="p-2 text-white/40 hover:text-white transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => deleteVideo(video.id)}
                              className="p-2 text-white/40 hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === 'juegos' && (
                <motion.div
                  key="juegos"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-gray-800/50 rounded-xl border border-white/10 p-6"
                >
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Gamepad2 className="w-5 h-5 text-amber-400" />
                    Configuración de Juegos
                  </h3>

                  {/* Add new game */}
                  <button className="w-full mb-6 p-4 border-2 border-dashed border-white/20 rounded-xl text-white/40 hover:border-amber-500/50 hover:text-amber-400 transition-colors flex items-center justify-center gap-2">
                    <Plus className="w-5 h-5" />
                    Agregar nuevo juego
                  </button>

                  {/* Game list */}
                  <div className="space-y-3">
                    {getGamesForPlanet().length === 0 ? (
                      <div className="text-center py-8 text-white/40">
                        No hay juegos configurados para este planeta
                      </div>
                    ) : (
                      getGamesForPlanet().map(game => (
                        <div 
                          key={game.id}
                          className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-xl border border-white/5"
                        >
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <Gamepad2 className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-medium">{game.title}</h4>
                            <span className="text-xs text-white/40 uppercase">{game.type}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => toggleGame(game.id)}
                              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                                game.isActive 
                                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                                  : 'bg-gray-700 text-white/40 border border-white/10'
                              }`}
                            >
                              {game.isActive ? 'Activo' : 'Inactivo'}
                            </button>
                            <button className="p-2 text-white/40 hover:text-white transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => deleteGame(game.id)}
                              className="p-2 text-white/40 hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Game Types Info */}
                  <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { type: 'quiz', label: 'Quiz', desc: 'Preguntas de opción múltiple' },
                      { type: 'simulation', label: 'Simulación', desc: 'Experimentos virtuales' },
                      { type: 'puzzle', label: 'Puzzle', desc: 'Ordenar o armar' },
                      { type: 'match', label: 'Match', desc: 'Relacionar conceptos' },
                    ].map(g => (
                      <div key={g.type} className="bg-gray-900/50 rounded-xl p-3 text-center">
                        <h5 className="text-white font-medium text-sm">{g.label}</h5>
                        <p className="text-xs text-white/40">{g.desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
