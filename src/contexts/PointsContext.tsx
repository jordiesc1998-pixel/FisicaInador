'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// ============================================
// TIPOS E INTERFACES
// ============================================

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  pointsRequired?: number;
  exercisesRequired?: number;
  quizzesRequired?: number;
  planetId?: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface UserStats {
  totalPoints: number;
  totalExercises: number;
  correctExercises: number;
  totalQuizzes: number;
  correctQuizzes: number;
  streakDays: number;
  lastActiveDate: string;
  planetsProgress: Record<string, PlanetProgress>;
  achievements: string[]; // IDs de logros desbloqueados
}

export interface PlanetProgress {
  exercisesCompleted: number;
  exercisesCorrect: number;
  quizzesCompleted: number;
  quizzesCorrect: number;
  pointsEarned: number;
}

export interface UserLevel {
  level: number;
  title: string;
  minPoints: number;
  maxPoints: number;
  icon: string;
}

// ============================================
// CONFIGURACION DE PUNTOS
// ============================================

export const POINTS_CONFIG = {
  // Puntos por ejercicios
  EXERCISE_EASY: 10,
  EXERCISE_MEDIUM: 20,
  EXERCISE_HARD: 30,
  EXERCISE_BONUS_STREAK: 5, // Bonus por racha de aciertos
  EXERCISE_FIRST_TRY: 15, // Bonus por acertar a la primera
  
  // Puntos por quizzes
  QUIZ_CORRECT: 15,
  QUIZ_PERFECT: 50, // Bonus por 100% en quiz
  
  // Puntos por logros
  ACHIEVEMENT_BONUS: 25,
  
  // Multiplicadores
  STREAK_MULTIPLIER: 0.1, // 10% extra por cada dia de racha
};

// ============================================
// NIVELES DEL USUARIO
// ============================================

export const USER_LEVELS: UserLevel[] = [
  { level: 1, title: 'Explorador Novato', minPoints: 0, maxPoints: 100, icon: '🌟' },
  { level: 2, title: 'Cadete Espacial', minPoints: 100, maxPoints: 300, icon: '🚀' },
  { level: 3, title: 'Piloto Estelar', minPoints: 300, maxPoints: 600, icon: '🛸' },
  { level: 4, title: 'Navegante Cosmico', minPoints: 600, maxPoints: 1000, icon: '🌙' },
  { level: 5, title: 'Cientifico Planetario', minPoints: 1000, maxPoints: 1500, icon: '🔬' },
  { level: 6, title: 'Astrofisico Junior', minPoints: 1500, maxPoints: 2500, icon: '🔭' },
  { level: 7, title: 'Comandante Galactic', minPoints: 2500, maxPoints: 4000, icon: '⭐' },
  { level: 8, title: 'Maestro del Universo', minPoints: 4000, maxPoints: 6000, icon: '🌌' },
  { level: 9, title: 'Leyenda Cosmica', minPoints: 6000, maxPoints: 10000, icon: '👑' },
  { level: 10, title: 'Fisico Supremo', minPoints: 10000, maxPoints: Infinity, icon: '🏆' },
];

// ============================================
// LOGROS DISPONIBLES
// ============================================

export const ALL_ACHIEVEMENTS: Achievement[] = [
  // Logros generales
  { id: 'first-exercise', name: 'Primer Paso', description: 'Completa tu primer ejercicio', icon: '👶', exercisesRequired: 1, unlocked: false },
  { id: 'exercise-10', name: 'Calentando Motores', description: 'Completa 10 ejercicios', icon: '🔥', exercisesRequired: 10, unlocked: false },
  { id: 'exercise-50', name: 'Mente Brillante', description: 'Completa 50 ejercicios', icon: '💡', exercisesRequired: 50, unlocked: false },
  { id: 'exercise-100', name: 'Maquina de Fisica', description: 'Completa 100 ejercicios', icon: '⚙️', exercisesRequired: 100, unlocked: false },
  { id: 'perfect-streak-5', name: 'En Racha', description: 'Acerta 5 ejercicios seguidos', icon: '🎯', unlocked: false },
  { id: 'perfect-streak-10', name: 'Imparable', description: 'Acerta 10 ejercicios seguidos', icon: '💪', unlocked: false },
  
  // Logros de precision
  { id: 'accuracy-80', name: 'Buen Ojo', description: 'Alcanza 80% de precision en ejercicios', icon: '👁️', unlocked: false },
  { id: 'accuracy-90', name: 'Precision Quirurgica', description: 'Alcanza 90% de precision en ejercicios', icon: '🎭', unlocked: false },
  { id: 'accuracy-100', name: 'Perfeccionista', description: 'Alcanza 100% de precision (minimo 20 ejercicios)', icon: '💎', unlocked: false },
  
  // Logros de puntos
  { id: 'points-500', name: 'Recolector de Estrellas', description: 'Acumula 500 puntos', icon: '⭐', pointsRequired: 500, unlocked: false },
  { id: 'points-1000', name: 'Acumulador Cosmico', description: 'Acumula 1000 puntos', icon: '🌟', pointsRequired: 1000, unlocked: false },
  { id: 'points-5000', name: 'Maestro de Puntos', description: 'Acumula 5000 puntos', icon: '💫', pointsRequired: 5000, unlocked: false },
  
  // Logros de quizzes
  { id: 'first-quiz', name: 'Cuestionado', description: 'Completa tu primer quiz', icon: '❓', quizzesRequired: 1, unlocked: false },
  { id: 'quiz-perfect', name: 'Quiz Perfecto', description: 'Obten 100% en un quiz', icon: '💯', unlocked: false },
  { id: 'quiz-10', name: 'Experto en Quizzes', description: 'Completa 10 quizzes', icon: '🎓', quizzesRequired: 10, unlocked: false },
  
  // Logros de planetas (especificos)
  { id: 'planet-hooke', name: 'Maestro de Hooke', description: 'Completa todos los ejercicios del Planeta Hooke', icon: '🔧', planetId: 'hooke', unlocked: false },
  { id: 'planet-newton', name: 'Newton estaria orgulloso', description: 'Completa todos los ejercicios del Planeta Newton', icon: '🍎', planetId: 'newton', unlocked: false },
  { id: 'planet-gravitacion', name: 'Gravedad Dominada', description: 'Completa todos los ejercicios del Planeta Gravitacion', icon: '🪐', planetId: 'gravitacion', unlocked: false },
  
  // Logros especiales
  { id: 'streak-7', name: 'Semana Perfecta', description: 'Mantén una racha de 7 dias', icon: '📅', unlocked: false },
  { id: 'night-owl', name: 'Buho Nocturno', description: 'Estudia despues de las 10 PM', icon: '🦉', unlocked: false },
  { id: 'early-bird', name: 'Madrugador', description: 'Estudia antes de las 6 AM', icon: '🐦', unlocked: false },
];

// ============================================
// CONTEXTO
// ============================================

interface PointsContextType {
  stats: UserStats;
  currentLevel: UserLevel;
  currentStreak: number;
  achievements: Achievement[];
  
  // Acciones
  addExercisePoints: (difficulty: 'facil' | 'medio' | 'dificil', correct: boolean, firstTry: boolean, planetId: string) => number;
  addQuizPoints: (correct: boolean, totalQuestions: number, correctAnswers: number, planetId: string) => number;
  unlockAchievement: (achievementId: string) => void;
  getPlanetProgress: (planetId: string) => PlanetProgress;
  resetProgress: () => void;
}

const defaultStats: UserStats = {
  totalPoints: 0,
  totalExercises: 0,
  correctExercises: 0,
  totalQuizzes: 0,
  correctQuizzes: 0,
  streakDays: 0,
  lastActiveDate: '',
  planetsProgress: {},
  achievements: [],
};

const PointsContext = createContext<PointsContextType | undefined>(undefined);

export function PointsProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState<UserStats>(defaultStats);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [initialized, setInitialized] = useState(false);

  // Cargar datos del localStorage al iniciar
  useEffect(() => {
    const savedStats = localStorage.getItem('fisicainador-stats');
    if (savedStats) {
      try {
        const parsed = JSON.parse(savedStats);
        setStats(parsed);
        
        // Verificar racha diaria
        const today = new Date().toDateString();
        const lastActive = parsed.lastActiveDate;
        
        if (lastActive) {
          const lastDate = new Date(lastActive);
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          
          if (lastDate.toDateString() === yesterday.toDateString()) {
            // Mantener racha
            setCurrentStreak(parsed.streakDays || 0);
          } else if (lastDate.toDateString() !== today) {
            // Racha perdida
            setStats(prev => ({ ...prev, streakDays: 0 }));
            setCurrentStreak(0);
          }
        }
      } catch (e) {
        console.error('Error loading stats:', e);
      }
    }
    setInitialized(true);
  }, []);

  // Guardar en localStorage cuando cambien los stats
  useEffect(() => {
    if (initialized) {
      localStorage.setItem('fisicainador-stats', JSON.stringify(stats));
    }
  }, [stats, initialized]);

  // Obtener nivel actual
  const currentLevel = USER_LEVELS.find(
    level => stats.totalPoints >= level.minPoints && stats.totalPoints < level.maxPoints
  ) || USER_LEVELS[0];

  // Obtener logros desbloqueados
  const achievements = ALL_ACHIEVEMENTS.map(achievement => ({
    ...achievement,
    unlocked: stats.achievements.includes(achievement.id),
  }));

  // Funcion para anadir puntos de ejercicio
  const addExercisePoints = useCallback((
    difficulty: 'facil' | 'medio' | 'dificil',
    correct: boolean,
    firstTry: boolean,
    planetId: string
  ): number => {
    if (!correct) {
      // Registrar ejercicio incorrecto pero sin puntos
      setStats(prev => {
        const planetProgress = prev.planetsProgress[planetId] || {
          exercisesCompleted: 0,
          exercisesCorrect: 0,
          quizzesCompleted: 0,
          quizzesCorrect: 0,
          pointsEarned: 0,
        };
        
        return {
          ...prev,
          totalExercises: prev.totalExercises + 1,
          lastActiveDate: new Date().toISOString(),
          planetsProgress: {
            ...prev.planetsProgress,
            [planetId]: {
              ...planetProgress,
              exercisesCompleted: planetProgress.exercisesCompleted + 1,
            },
          },
        };
      });
      return 0;
    }

    let points = 0;
    switch (difficulty) {
      case 'facil':
        points = POINTS_CONFIG.EXERCISE_EASY;
        break;
      case 'medio':
        points = POINTS_CONFIG.EXERCISE_MEDIUM;
        break;
      case 'dificil':
        points = POINTS_CONFIG.EXERCISE_HARD;
        break;
    }

    // Bonus por primera vez
    if (firstTry) {
      points += POINTS_CONFIG.EXERCISE_FIRST_TRY;
    }

    // Bonus por racha diaria
    const streakBonus = Math.floor(points * POINTS_CONFIG.STREAK_MULTIPLIER * currentStreak);
    points += streakBonus;

    setStats(prev => {
      const planetProgress = prev.planetsProgress[planetId] || {
        exercisesCompleted: 0,
        exercisesCorrect: 0,
        quizzesCompleted: 0,
        quizzesCorrect: 0,
        pointsEarned: 0,
      };

      // Actualizar racha diaria
      const today = new Date().toDateString();
      let newStreakDays = prev.streakDays;
      
      if (prev.lastActiveDate) {
        const lastDate = new Date(prev.lastActiveDate).toDateString();
        if (lastDate !== today) {
          newStreakDays = prev.streakDays + 1;
        }
      } else {
        newStreakDays = 1;
      }

      return {
        ...prev,
        totalPoints: prev.totalPoints + points,
        totalExercises: prev.totalExercises + 1,
        correctExercises: prev.correctExercises + 1,
        streakDays: newStreakDays,
        lastActiveDate: new Date().toISOString(),
        planetsProgress: {
          ...prev.planetsProgress,
          [planetId]: {
            ...planetProgress,
            exercisesCompleted: planetProgress.exercisesCompleted + 1,
            exercisesCorrect: planetProgress.exercisesCorrect + 1,
            pointsEarned: planetProgress.pointsEarned + points,
          },
        },
      };
    });

    // Verificar logros
    checkAchievements();

    return points;
  }, [currentStreak]);

  // Funcion para anadir puntos de quiz
  const addQuizPoints = useCallback((
    correct: boolean,
    totalQuestions: number,
    correctAnswers: number,
    planetId: string
  ): number => {
    let points = 0;

    if (correct) {
      points = POINTS_CONFIG.QUIZ_CORRECT;
      
      // Bonus por quiz perfecto
      if (correctAnswers === totalQuestions) {
        points += POINTS_CONFIG.QUIZ_PERFECT;
      }
    }

    setStats(prev => {
      const planetProgress = prev.planetsProgress[planetId] || {
        exercisesCompleted: 0,
        exercisesCorrect: 0,
        quizzesCompleted: 0,
        quizzesCorrect: 0,
        pointsEarned: 0,
      };

      return {
        ...prev,
        totalPoints: prev.totalPoints + points,
        totalQuizzes: prev.totalQuizzes + 1,
        correctQuizzes: correct ? prev.correctQuizzes + 1 : prev.correctQuizzes,
        lastActiveDate: new Date().toISOString(),
        planetsProgress: {
          ...prev.planetsProgress,
          [planetId]: {
            ...planetProgress,
            quizzesCompleted: planetProgress.quizzesCompleted + 1,
            quizzesCorrect: correct ? planetProgress.quizzesCorrect + 1 : planetProgress.quizzesCorrect,
            pointsEarned: planetProgress.pointsEarned + points,
          },
        },
      };
    });

    return points;
  }, []);

  // Verificar y desbloquear logros
  const checkAchievements = useCallback(() => {
    const newAchievements: string[] = [];

    ALL_ACHIEVEMENTS.forEach(achievement => {
      if (stats.achievements.includes(achievement.id)) return;

      let unlocked = false;

      if (achievement.exercisesRequired && stats.totalExercises >= achievement.exercisesRequired) {
        unlocked = true;
      }
      if (achievement.pointsRequired && stats.totalPoints >= achievement.pointsRequired) {
        unlocked = true;
      }
      if (achievement.quizzesRequired && stats.totalQuizzes >= achievement.quizzesRequired) {
        unlocked = true;
      }

      if (unlocked) {
        newAchievements.push(achievement.id);
      }
    });

    if (newAchievements.length > 0) {
      setStats(prev => ({
        ...prev,
        achievements: [...prev.achievements, ...newAchievements],
        totalPoints: prev.totalPoints + (newAchievements.length * POINTS_CONFIG.ACHIEVEMENT_BONUS),
      }));
    }
  }, [stats]);

  // Desbloquear logro manualmente
  const unlockAchievement = useCallback((achievementId: string) => {
    if (!stats.achievements.includes(achievementId)) {
      setStats(prev => ({
        ...prev,
        achievements: [...prev.achievements, achievementId],
        totalPoints: prev.totalPoints + POINTS_CONFIG.ACHIEVEMENT_BONUS,
      }));
    }
  }, [stats.achievements]);

  // Obtener progreso de un planeta
  const getPlanetProgress = useCallback((planetId: string): PlanetProgress => {
    return stats.planetsProgress[planetId] || {
      exercisesCompleted: 0,
      exercisesCorrect: 0,
      quizzesCompleted: 0,
      quizzesCorrect: 0,
      pointsEarned: 0,
    };
  }, [stats.planetsProgress]);

  // Resetear progreso
  const resetProgress = useCallback(() => {
    setStats(defaultStats);
    setCurrentStreak(0);
    localStorage.removeItem('fisicainador-stats');
  }, []);

  const value: PointsContextType = {
    stats,
    currentLevel,
    currentStreak,
    achievements,
    addExercisePoints,
    addQuizPoints,
    unlockAchievement,
    getPlanetProgress,
    resetProgress,
  };

  return (
    <PointsContext.Provider value={value}>
      {children}
    </PointsContext.Provider>
  );
}

export function usePoints() {
  const context = useContext(PointsContext);
  if (context === undefined) {
    throw new Error('usePoints must be used within a PointsProvider');
  }
  return context;
}
