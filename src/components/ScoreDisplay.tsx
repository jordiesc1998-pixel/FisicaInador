'use client';

import React from 'react';
import { usePoints, USER_LEVELS } from '@/contexts/PointsContext';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ScoreDisplayProps {
  variant?: 'full' | 'compact' | 'minimal';
  showLevel?: boolean;
  showStreak?: boolean;
}

export function ScoreDisplay({ variant = 'full', showLevel = true, showStreak = true }: ScoreDisplayProps) {
  const { stats, currentLevel, currentStreak } = usePoints();

  // Calcular progreso hacia el siguiente nivel
  const nextLevel = USER_LEVELS.find(l => l.level === currentLevel.level + 1);
  const progressToNextLevel = nextLevel
    ? ((stats.totalPoints - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100
    : 100;

  if (variant === 'minimal') {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xl">{currentLevel.icon}</span>
        <span className="font-bold text-yellow-400">{stats.totalPoints} pts</span>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-4 bg-gradient-to-r from-purple-900/50 to-indigo-900/50 px-4 py-2 rounded-full border border-purple-500/30">
        <div className="flex items-center gap-2">
          <span className="text-xl">{currentLevel.icon}</span>
          <span className="font-semibold text-white">Nv.{currentLevel.level}</span>
        </div>
        <div className="h-4 w-px bg-purple-400/30" />
        <div className="flex items-center gap-1">
          <span className="text-yellow-400">⭐</span>
          <span className="font-bold text-yellow-400">{stats.totalPoints}</span>
        </div>
        {showStreak && currentStreak > 0 && (
          <>
            <div className="h-4 w-px bg-purple-400/30" />
            <div className="flex items-center gap-1">
              <span className="text-orange-400">🔥</span>
              <span className="font-medium text-orange-400">{currentStreak} días</span>
            </div>
          </>
        )}
      </div>
    );
  }

  // Full variant
  return (
    <Card className="bg-gradient-to-br from-slate-900 to-purple-900/30 border-purple-500/30 overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-2xl shadow-lg shadow-orange-500/30">
              {currentLevel.icon}
            </div>
            <div>
              <h3 className="font-bold text-white">{currentLevel.title}</h3>
              <p className="text-sm text-purple-300">Nivel {currentLevel.level}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-yellow-400">{stats.totalPoints}</p>
            <p className="text-xs text-purple-300">puntos totales</p>
          </div>
        </div>

        {nextLevel && (
          <div className="mb-3">
            <div className="flex justify-between text-xs text-purple-300 mb-1">
              <span>Progreso al siguiente nivel</span>
              <span>{stats.totalPoints} / {nextLevel.minPoints} pts</span>
            </div>
            <Progress 
              value={Math.min(progressToNextLevel, 100)} 
              className="h-2 bg-purple-900/50"
            />
          </div>
        )}

        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="text-center p-2 bg-green-900/30 rounded-lg">
            <p className="text-lg font-bold text-green-400">{stats.correctExercises}</p>
            <p className="text-xs text-green-300">Correctos</p>
          </div>
          <div className="text-center p-2 bg-blue-900/30 rounded-lg">
            <p className="text-lg font-bold text-blue-400">{stats.totalExercises}</p>
            <p className="text-xs text-blue-300">Ejercicios</p>
          </div>
          <div className="text-center p-2 bg-purple-900/30 rounded-lg">
            <p className="text-lg font-bold text-purple-400">{stats.totalQuizzes}</p>
            <p className="text-xs text-purple-300">Quizzes</p>
          </div>
        </div>

        {showStreak && currentStreak > 0 && (
          <div className="mt-3 flex items-center justify-center gap-2 text-orange-400">
            <span className="text-lg">🔥</span>
            <span className="font-medium">{currentStreak} días de racha</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Componente para mostrar animacion de puntos ganados
interface PointsAnimationProps {
  points: number;
  show: boolean;
  reason?: string;
}

export function PointsAnimation({ points, show, reason }: PointsAnimationProps) {
  if (!show || points <= 0) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
      <div className="animate-bounce">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-6 py-3 rounded-full shadow-2xl shadow-yellow-500/50 text-xl">
          +{points} pts {reason && <span className="text-sm font-normal">({reason})</span>}
        </div>
      </div>
    </div>
  );
}

// Componente para mostrar logro desbloqueado
interface AchievementPopupProps {
  achievement: {
    icon: string;
    name: string;
    description: string;
  } | null;
  onClose: () => void;
}

export function AchievementPopup({ achievement, onClose }: AchievementPopupProps) {
  if (!achievement) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50" onClick={onClose}>
      <div className="bg-gradient-to-br from-purple-900 to-indigo-900 border-2 border-yellow-400/50 rounded-2xl p-6 max-w-sm mx-4 text-center animate-pulse">
        <div className="text-6xl mb-4">{achievement.icon}</div>
        <h3 className="text-xl font-bold text-yellow-400 mb-2">Logro Desbloqueado</h3>
        <p className="text-lg text-white font-semibold mb-1">{achievement.name}</p>
        <p className="text-sm text-purple-300 mb-4">{achievement.description}</p>
        <p className="text-green-400 text-sm">+25 puntos bonus</p>
      </div>
    </div>
  );
}
