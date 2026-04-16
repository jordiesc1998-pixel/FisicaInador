// Banco de preguntas para el juego de Lanzamiento Parabólico
// 20 preguntas organizadas en 4 niveles de dificultad

export interface ParabolicQuestion {
  id: number;
  level: number;
  levelName: string;
  question: string;
  correctAnswer: string;
  options: string[];
  explanation?: string;
}

export const parabolicQuestions: ParabolicQuestion[] = [
  // Nivel 1: Cadete (Conceptos básicos)
  {
    id: 1,
    level: 1,
    levelName: "Cadete",
    question: "En el movimiento parabólico, ¿cómo se comporta la velocidad en el eje horizontal?",
    correctAnswer: "Permanece constante durante todo el trayecto.",
    options: [
      "Permanece constante durante todo el trayecto.",
      "Aumenta constantemente debido a la gravedad.",
      "Disminuye hasta llegar a cero en el punto más alto.",
      "Es nula al inicio del movimiento."
    ]
  },
  {
    id: 2,
    level: 1,
    levelName: "Cadete",
    question: "¿Qué valor tiene la componente vertical de la velocidad (vᵧ) cuando el proyectil alcanza su altura máxima?",
    correctAnswer: "Cero.",
    options: [
      "Cero.",
      "El mismo valor que la velocidad inicial.",
      "Es igual a la gravedad.",
      "Depende del ángulo de lanzamiento."
    ]
  },
  {
    id: 3,
    level: 1,
    levelName: "Cadete",
    question: "¿Hacia dónde apunta el vector aceleración de un proyectil mientras está en el aire?",
    correctAnswer: "Siempre hacia abajo (hacia el centro de la Tierra).",
    options: [
      "Siempre hacia abajo (hacia el centro de la Tierra).",
      "Siempre en la dirección del movimiento.",
      "Hacia arriba mientras sube y hacia abajo mientras baja.",
      "Es igual a cero en el punto más alto."
    ]
  },
  {
    id: 4,
    level: 1,
    levelName: "Cadete",
    question: "Si se lanza un objeto horizontalmente desde una altura h, su velocidad inicial vertical (v₀ᵧ) es:",
    correctAnswer: "0 m/s",
    options: [
      "0 m/s",
      "9.8 m/s",
      "Igual a la velocidad horizontal.",
      "Infinita."
    ]
  },
  {
    id: 5,
    level: 1,
    levelName: "Cadete",
    question: "En un lanzamiento simétrico (cae al mismo nivel), si el tiempo de subida es de 3 segundos, el tiempo total de vuelo es:",
    correctAnswer: "6 segundos.",
    options: [
      "6 segundos.",
      "3 segundos.",
      "4.5 segundos.",
      "9 segundos."
    ]
  },
  // Nivel 2: Artillero (Cálculos de Precisión)
  {
    id: 6,
    level: 2,
    levelName: "Artillero",
    question: "Un proyectil se lanza con v₀ = 100 m/s a un ángulo de 30°. ¿Cuál es su componente de velocidad inicial en y (v₀ᵧ)? (Dato: sen(30°) = 0.5)",
    correctAnswer: "50 m/s",
    options: [
      "50 m/s",
      "100 m/s",
      "86.6 m/s",
      "0 m/s"
    ]
  },
  {
    id: 7,
    level: 2,
    levelName: "Artillero",
    question: "Para obtener el máximo alcance horizontal (xₘₐₓ), ¿cuál es el ángulo de disparo ideal?",
    correctAnswer: "45°",
    options: [
      "45°",
      "30°",
      "60°",
      "90°"
    ]
  },
  {
    id: 8,
    level: 2,
    levelName: "Artillero",
    question: "Si un proyectil tiene una v₀ᵧ = 40 m/s y g = 10 m/s², ¿cuánto tarda en alcanzar la altura máxima?",
    correctAnswer: "4 s",
    options: [
      "4 s",
      "2 s",
      "8 s",
      "10 s"
    ]
  },
  {
    id: 9,
    level: 2,
    levelName: "Artillero",
    question: "La trayectoria que describe un proyectil en el vacío es una:",
    correctAnswer: "Parábola.",
    options: [
      "Parábola.",
      "Línea recta.",
      "Hipérbola.",
      "Elipse."
    ]
  },
  {
    id: 10,
    level: 2,
    levelName: "Artillero",
    question: "Dos proyectiles se lanzan con la misma rapidez. El proyectil A se lanza a 15° y el B a 75°. ¿Cuál llega más lejos horizontalmente?",
    correctAnswer: "Ambos llegan a la misma distancia (ángulos complementarios).",
    options: [
      "Ambos llegan a la misma distancia (ángulos complementarios).",
      "El proyectil A.",
      "El proyectil B.",
      "El proyectil B, porque tiene más ángulo."
    ]
  },
  // Nivel 3: Comandante (Análisis y Lógica)
  {
    id: 11,
    level: 3,
    levelName: "Comandante",
    question: "En el punto más alto de la trayectoria, la velocidad total del proyectil es:",
    correctAnswer: "Igual a la componente horizontal (vₓ).",
    options: [
      "Igual a la componente horizontal (vₓ).",
      "Cero.",
      "Igual a la componente inicial (v₀).",
      "Igual a la gravedad."
    ]
  },
  {
    id: 12,
    level: 3,
    levelName: "Comandante",
    question: "Si se desprecia la resistencia del aire, ¿qué fuerza actúa sobre el proyectil tras ser disparado?",
    correctAnswer: "Únicamente el peso (fuerza gravitatoria).",
    options: [
      "Únicamente el peso (fuerza gravitatoria).",
      "La fuerza del lanzamiento.",
      "La fuerza de inercia.",
      "Ninguna fuerza."
    ]
  },
  {
    id: 13,
    level: 3,
    levelName: "Comandante",
    question: "Un proyectil se lanza con v₀ y ángulo θ. Si se duplica v₀, el alcance horizontal:",
    correctAnswer: "Se cuadruplica.",
    options: [
      "Se cuadruplica.",
      "Se duplica.",
      "Se mantiene igual.",
      "Se reduce a la mitad."
    ]
  },
  {
    id: 14,
    level: 3,
    levelName: "Comandante",
    question: "¿Cómo es la velocidad de impacto en el suelo comparada con la velocidad de lanzamiento (al mismo nivel)?",
    correctAnswer: "Igual en magnitud, pero con ángulo de dirección invertido.",
    options: [
      "Igual en magnitud, pero con ángulo de dirección invertido.",
      "Mayor.",
      "Menor.",
      "Siempre es cero."
    ]
  },
  {
    id: 15,
    level: 3,
    levelName: "Comandante",
    question: "El movimiento parabólico se puede considerar como la composición de:",
    correctAnswer: "Un MRU horizontal y un MRUV vertical.",
    options: [
      "Un MRU horizontal y un MRUV vertical.",
      "Dos movimientos circulares.",
      "Dos movimientos rectilíneos uniformes.",
      "Un MRUV horizontal y un MRU vertical."
    ]
  },
  // Nivel 4: Maestro (Desafíos Extremos)
  {
    id: 16,
    level: 4,
    levelName: "Maestro",
    question: "Un proyectil se lanza horizontalmente desde un avión que vuela a velocidad constante. Para un observador dentro del avión, la trayectoria del proyectil parece:",
    correctAnswer: "Una línea recta vertical hacia abajo.",
    options: [
      "Una línea recta vertical hacia abajo.",
      "Una parábola hacia adelante.",
      "Una parábola hacia atrás.",
      "Un punto estático."
    ]
  },
  {
    id: 17,
    level: 4,
    levelName: "Maestro",
    question: "Si lanzamos un objeto a 45° en la Luna (donde la gravedad es menor que en la Tierra), su alcance será:",
    correctAnswer: "Mayor que en la Tierra.",
    options: [
      "Mayor que en la Tierra.",
      "Menor que en la Tierra.",
      "Igual que en la Tierra.",
      "Cero."
    ]
  },
  {
    id: 18,
    level: 4,
    levelName: "Maestro",
    question: "¿Cuál es la aceleración horizontal (aₓ) de un proyectil en cualquier momento de su vuelo?",
    correctAnswer: "0 m/s²",
    options: [
      "0 m/s²",
      "9.8 m/s²",
      "Depende de la velocidad inicial.",
      "Variable."
    ]
  },
  {
    id: 19,
    level: 4,
    levelName: "Maestro",
    question: "Un cazador dispara una flecha a 30 m/s con un ángulo de 20°. Al mismo tiempo, se le cae una manzana desde la misma altura. ¿Cuál toca el suelo primero?",
    correctAnswer: "Ambas tocan el suelo al mismo tiempo (si la flecha se dispara horizontalmente).",
    options: [
      "Ambas tocan el suelo al mismo tiempo (si la flecha se dispara horizontalmente).",
      "La flecha.",
      "La manzana.",
      "Depende de la masa de la flecha."
    ]
  },
  {
    id: 20,
    level: 4,
    levelName: "Maestro",
    question: "¿Qué efecto tiene la resistencia del aire en la trayectoria real de un proyectil?",
    correctAnswer: "Reduce tanto el alcance como la altura máxima, y deforma la parábola.",
    options: [
      "Reduce tanto el alcance como la altura máxima, y deforma la parábola.",
      "Aumenta el alcance y la altura.",
      "Solo afecta la velocidad horizontal.",
      "Hace que el objeto suba más lento pero baje más rápido."
    ]
  }
];

// Función para obtener preguntas aleatorias por nivel
export const getRandomQuestions = (count: number = 5): ParabolicQuestion[] => {
  const shuffled = [...parabolicQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Función para obtener preguntas por nivel específico
export const getQuestionsByLevel = (level: number): ParabolicQuestion[] => {
  return parabolicQuestions.filter(q => q.level === level);
};

// Función para obtener una mezcla de preguntas de todos los niveles
export const getMixedQuestions = (count: number = 5): ParabolicQuestion[] => {
  const questionsPerLevel = Math.ceil(count / 4);
  const mixed: ParabolicQuestion[] = [];
  
  for (let level = 1; level <= 4; level++) {
    const levelQuestions = getQuestionsByLevel(level);
    const shuffled = levelQuestions.sort(() => Math.random() - 0.5);
    mixed.push(...shuffled.slice(0, questionsPerLevel));
  }
  
  return mixed.sort(() => Math.random() - 0.5).slice(0, count);
};

// Estadísticas del banco de preguntas
export const questionStats = {
  total: parabolicQuestions.length,
  byLevel: {
    1: parabolicQuestions.filter(q => q.level === 1).length,
    2: parabolicQuestions.filter(q => q.level === 2).length,
    3: parabolicQuestions.filter(q => q.level === 3).length,
    4: parabolicQuestions.filter(q => q.level === 4).length,
  }
};
