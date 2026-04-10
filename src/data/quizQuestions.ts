export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: string;
  difficulty: 'basico' | 'intermedio' | 'avanzado';
}

export const quizQuestions: QuizQuestion[] = [
  // === LEY DE HOOKE ===
  {
    id: 'hooke-1',
    question: 'Un resorte se estira 0.2 m cuando se le aplica una fuerza de 40 N. ¿Cuál es la constante del resorte?',
    options: ['200 N/m', '8 N/m', '0.005 N/m', '80 N/m'],
    correctAnswer: 0,
    explanation: 'Usando F = kx, despejamos k = F/x = 40 N / 0.2 m = 200 N/m',
    topic: 'Ley de Hooke',
    difficulty: 'basico'
  },
  {
    id: 'hooke-2',
    question: '¿Qué significa el signo negativo en la ecuación F = -kx?',
    options: ['La fuerza es restauradora', 'La fuerza siempre es negativa', 'El resorte está comprimido', 'La constante k es negativa'],
    correctAnswer: 0,
    explanation: 'El signo negativo indica que la fuerza del resorte siempre actúa en dirección opuesta a la deformación, tratando de restaurar la posición de equilibrio.',
    topic: 'Ley de Hooke',
    difficulty: 'basico'
  },
  {
    id: 'hooke-3',
    question: '¿Cuál es la energía potencial elástica de un resorte con k=500 N/m comprimido 0.1 m?',
    options: ['2.5 J', '5 J', '25 J', '0.5 J'],
    correctAnswer: 0,
    explanation: 'Ep = ½kx² = ½ × 500 × (0.1)² = ½ × 500 × 0.01 = 2.5 J',
    topic: 'Ley de Hooke',
    difficulty: 'intermedio'
  },

  // === CARGAS ELÉCTRICAS ===
  {
    id: 'cargas-1',
    question: '¿Qué ocurre cuando dos cargas del mismo signo se acercan?',
    options: ['Se repelen', 'Se atraen', 'No interactúan', 'Se anulan'],
    correctAnswer: 0,
    explanation: 'Cargas iguales se repelen, cargas opuestas se atraen. Es una ley fundamental de la electrostática.',
    topic: 'Cargas Eléctricas',
    difficulty: 'basico'
  },
  {
    id: 'cargas-2',
    question: '¿Cuál es el valor de la constante de Coulomb (k)?',
    options: ['9×10⁹ N·m²/C²', '6.67×10⁻¹¹ N·m²/kg²', '8.85×10⁻¹² F/m', '3×10⁸ m/s'],
    correctAnswer: 0,
    explanation: 'La constante de Coulomb k = 9×10⁹ N·m²/C², fundamental para calcular fuerzas eléctricas.',
    topic: 'Cargas Eléctricas',
    difficulty: 'basico'
  },
  {
    id: 'cargas-3',
    question: 'Dos cargas de +2μC y -3μC están separadas 0.5 m. ¿La fuerza entre ellas es de atracción o repulsión?',
    options: ['Atracción', 'Repulsión', 'No hay fuerza', 'Depende de la distancia'],
    correctAnswer: 0,
    explanation: 'Cargas de signos opuestos se atraen. Una es positiva y la otra negativa, por lo tanto se atraen.',
    topic: 'Cargas Eléctricas',
    difficulty: 'intermedio'
  },

  // === CIRCUITOS ===
  {
    id: 'circuitos-1',
    question: 'Según la Ley de Ohm, si V = 12V y R = 4Ω, ¿cuál es la corriente?',
    options: ['3 A', '48 A', '0.33 A', '16 A'],
    correctAnswer: 0,
    explanation: 'V = IR, entonces I = V/R = 12V / 4Ω = 3 A',
    topic: 'Circuitos Eléctricos',
    difficulty: 'basico'
  },
  {
    id: 'circuitos-2',
    question: 'En un circuito en serie, ¿qué magnitud es igual en todos los elementos?',
    options: ['La corriente', 'El voltaje', 'La resistencia', 'La potencia'],
    correctAnswer: 0,
    explanation: 'En un circuito serie, la corriente es la misma que pasa por todos los elementos.',
    topic: 'Circuitos Eléctricos',
    difficulty: 'basico'
  },
  {
    id: 'circuitos-3',
    question: 'Tres resistencias de 6Ω cada una en paralelo. ¿Cuál es la resistencia equivalente?',
    options: ['2 Ω', '18 Ω', '0.5 Ω', '3 Ω'],
    correctAnswer: 0,
    explanation: '1/R_total = 1/6 + 1/6 + 1/6 = 3/6 = 1/2, entonces R_total = 2Ω',
    topic: 'Circuitos Eléctricos',
    difficulty: 'intermedio'
  },

  // === FUERZA ELECTROMOTRIZ ===
  {
    id: 'fem-1',
    question: '¿Qué es la fuerza electromotriz (FEM)?',
    options: ['Trabajo por unidad de carga', 'Una fuerza mecánica', 'Energía cinética', 'Potencia eléctrica'],
    correctAnswer: 0,
    explanation: 'La FEM es el trabajo realizado por unidad de carga que una fuente proporciona al circuito.',
    topic: 'Fuerza Electromotriz',
    difficulty: 'basico'
  },
  {
    id: 'fem-2',
    question: 'Una batería de 12V con resistencia interna de 0.5Ω entrega 2A. ¿Cuál es el voltaje terminal?',
    options: ['11 V', '12 V', '13 V', '10 V'],
    correctAnswer: 0,
    explanation: 'V = ε - Ir = 12V - (2A × 0.5Ω) = 12V - 1V = 11V',
    topic: 'Fuerza Electromotriz',
    difficulty: 'intermedio'
  },

  // === ONDAS ===
  {
    id: 'ondas-1',
    question: 'Una onda tiene frecuencia de 50 Hz y longitud de onda de 4 m. ¿Cuál es su velocidad?',
    options: ['200 m/s', '12.5 m/s', '54 m/s', '0.08 m/s'],
    correctAnswer: 0,
    explanation: 'v = λ × f = 4 m × 50 Hz = 200 m/s',
    topic: 'Ondas Mecánicas',
    difficulty: 'basico'
  },
  {
    id: 'ondas-2',
    question: '¿Qué tipo de onda es el sonido?',
    options: ['Longitudinal', 'Transversal', 'Electromagnética', 'Ninguna'],
    correctAnswer: 0,
    explanation: 'El sonido es una onda mecánica longitudinal porque las partículas vibran paralelo a la dirección de propagación.',
    topic: 'Ondas Mecánicas',
    difficulty: 'basico'
  },
  {
    id: 'ondas-3',
    question: 'Si el período de una onda es 0.02 s, ¿cuál es su frecuencia?',
    options: ['50 Hz', '0.02 Hz', '500 Hz', '5 Hz'],
    correctAnswer: 0,
    explanation: 'f = 1/T = 1/0.02 s = 50 Hz',
    topic: 'Ondas Mecánicas',
    difficulty: 'intermedio'
  },

  // === VECTORES ===
  {
    id: 'vectores-1',
    question: 'Un vector tiene componentes Vx=3 y Vy=4. ¿Cuál es su magnitud?',
    options: ['5', '7', '1', '12'],
    correctAnswer: 0,
    explanation: '|V| = √(Vx² + Vy²) = √(9 + 16) = √25 = 5',
    topic: 'Vectores',
    difficulty: 'basico'
  },
  {
    id: 'vectores-2',
    question: '¿Qué indica el producto escalar de dos vectores cuando el resultado es cero?',
    options: ['Son perpendiculares', 'Son paralelos', 'Son iguales', 'Son nulos'],
    correctAnswer: 0,
    explanation: 'Si A·B = 0, entonces cos(θ) = 0, lo que significa que el ángulo entre ellos es 90°, es decir, son perpendiculares.',
    topic: 'Vectores',
    difficulty: 'intermedio'
  },

  // === GRAVITACIÓN ===
  {
    id: 'grav-1',
    question: '¿Cuál es el valor de la constante de gravitación universal G?',
    options: ['6.67×10⁻¹¹ N·m²/kg²', '9.8 m/s²', '9×10⁹ N·m²/C²', '3×10⁸ m/s'],
    correctAnswer: 0,
    explanation: 'La constante de gravitación universal G = 6.67×10⁻¹¹ N·m²/kg²',
    topic: 'Gravitación Universal',
    difficulty: 'basico'
  },
  {
    id: 'grav-2',
    question: 'La fuerza gravitacional entre dos cuerpos ¿es de atracción o repulsión?',
    options: ['Siempre atracción', 'Siempre repulsión', 'Depende de las masas', 'Depende de la distancia'],
    correctAnswer: 0,
    explanation: 'La gravedad siempre es una fuerza de atracción entre masas, nunca de repulsión.',
    topic: 'Gravitación Universal',
    difficulty: 'basico'
  },

  // === KEPLER ===
  {
    id: 'kepler-1',
    question: '¿Qué establece la primera ley de Kepler?',
    options: ['Los planetas se mueven en órbitas elípticas', 'Los planetas se mueven en círculos', 'Las órbitas son perfectas', 'El Sol gira alrededor de la Tierra'],
    correctAnswer: 0,
    explanation: 'La primera ley de Kepler establece que los planetas se mueven en órbitas elípticas con el Sol en uno de los focos.',
    topic: 'Leyes de Kepler',
    difficulty: 'basico'
  },
  {
    id: 'kepler-2',
    question: 'Según la segunda ley de Kepler, un planeta se mueve más rápido cuando está:',
    options: ['Más cerca del Sol', 'Más lejos del Sol', 'A cualquier distancia', 'En los equinoccios'],
    correctAnswer: 0,
    explanation: 'La ley de las áreas establece que los planetas se mueven más rápido en el perihelio (más cerca del Sol) y más lento en el afelio.',
    topic: 'Leyes de Kepler',
    difficulty: 'intermedio'
  },

  // === CALOR ===
  {
    id: 'calor-1',
    question: '¿Cuáles son las tres formas de transferencia de calor?',
    options: ['Conducción, convección y radiación', 'Conducción, evaporación y radiación', 'Convección, evaporación y fusión', 'Radiación, fusión y conducción'],
    correctAnswer: 0,
    explanation: 'Las tres formas de transferencia de calor son: conducción (contacto), convección (fluidos) y radiación (ondas electromagnéticas).',
    topic: 'Calor y Temperatura',
    difficulty: 'basico'
  },
  {
    id: 'calor-2',
    question: '¿Cuánto calor se necesita para calentar 2 kg de agua de 20°C a 50°C? (c_agua = 4186 J/kg·°C)',
    options: ['251,160 J', '83,720 J', '4,186 J', '167,440 J'],
    correctAnswer: 0,
    explanation: 'Q = m·c·ΔT = 2 kg × 4186 J/kg·°C × 30°C = 251,160 J',
    topic: 'Calor y Temperatura',
    difficulty: 'intermedio'
  },

  // === TRABAJO Y ENERGÍA ===
  {
    id: 'energia-1',
    question: 'Un objeto de 2 kg cae desde 10 m de altura. ¿Cuál es su energía cinética al llegar al suelo? (g=10 m/s²)',
    options: ['200 J', '20 J', '100 J', '400 J'],
    correctAnswer: 0,
    explanation: 'Por conservación de energía: Ec = Ep = mgh = 2 kg × 10 m/s² × 10 m = 200 J',
    topic: 'Trabajo y Energía',
    difficulty: 'intermedio'
  },
  {
    id: 'energia-2',
    question: '¿Cuál es la fórmula de la energía cinética?',
    options: ['Ec = ½mv²', 'Ec = mgh', 'Ec = Fd', 'Ec = kx²'],
    correctAnswer: 0,
    explanation: 'La energía cinética es Ec = ½mv², donde m es la masa y v es la velocidad.',
    topic: 'Trabajo y Energía',
    difficulty: 'basico'
  },

  // === MOMENTO LINEAL ===
  {
    id: 'momento-1',
    question: '¿Cuál es la fórmula del momento lineal?',
    options: ['p = mv', 'p = ma', 'p = Fv', 'p = ½mv²'],
    correctAnswer: 0,
    explanation: 'El momento lineal es p = mv, el producto de la masa por la velocidad.',
    topic: 'Momento Lineal',
    difficulty: 'basico'
  },
  {
    id: 'momento-2',
    question: '¿En qué tipo de colisión se conserva la energía cinética?',
    options: ['Colisión elástica', 'Colisión inelástica', 'Todas las colisiones', 'Ninguna colisión'],
    correctAnswer: 0,
    explanation: 'En las colisiones elásticas se conserva tanto el momento como la energía cinética.',
    topic: 'Momento Lineal',
    difficulty: 'basico'
  },

  // === MOVIMIENTO PARABÓLICO ===
  {
    id: 'parabolico-1',
    question: '¿Con qué ángulo se logra el alcance máximo en un movimiento parabólico?',
    options: ['45°', '90°', '30°', '60°'],
    correctAnswer: 0,
    explanation: 'El alcance máximo se logra con un ángulo de 45°, ya que R = v₀²·sin(2θ)/g y sin(90°) = 1 es el valor máximo.',
    topic: 'Movimiento Parabólico',
    difficulty: 'basico'
  },
  {
    id: 'parabolico-2',
    question: 'En el punto más alto de una trayectoria parabólica:',
    options: ['La velocidad vertical es cero', 'La velocidad horizontal es cero', 'La aceleración es cero', 'La velocidad total es cero'],
    correctAnswer: 0,
    explanation: 'En el punto más alto, la componente vertical de la velocidad es cero, pero la horizontal se mantiene constante.',
    topic: 'Movimiento Parabólico',
    difficulty: 'intermedio'
  },

  // === MAGNETISMO ===
  {
    id: 'magnetismo-1',
    question: '¿Qué ley explica la generación de corriente por un campo magnético variable?',
    options: ['Ley de Faraday', 'Ley de Ohm', 'Ley de Coulomb', 'Ley de Hooke'],
    correctAnswer: 0,
    explanation: 'La Ley de Faraday establece que la FEM inducida es igual a la tasa de cambio del flujo magnético.',
    topic: 'Inducción y Magnetismo',
    difficulty: 'basico'
  },
  {
    id: 'magnetismo-2',
    question: '¿Cuál es la unidad del campo magnético en el SI?',
    options: ['Tesla (T)', 'Weber (Wb)', 'Gauss (G)', 'Henry (H)'],
    correctAnswer: 0,
    explanation: 'La unidad del campo magnético en el Sistema Internacional es el Tesla (T).',
    topic: 'Inducción y Magnetismo',
    difficulty: 'basico'
  },

  // === LANZAMIENTO VERTICAL ===
  {
    id: 'vertical-1',
    question: 'Si se lanza un objeto hacia arriba con velocidad v₀, ¿cuánto tiempo tarda en alcanzar la altura máxima?',
    options: ['t = v₀/g', 't = v₀·g', 't = 2v₀/g', 't = v₀²/g'],
    correctAnswer: 0,
    explanation: 'En el punto más alto v = 0, entonces v = v₀ - gt → 0 = v₀ - gt → t = v₀/g',
    topic: 'Lanzamiento Vertical',
    difficulty: 'intermedio'
  },
  {
    id: 'vertical-2',
    question: 'En lanzamiento vertical, ¿qué ocurre con la velocidad de subida y de bajada al mismo nivel?',
    options: ['Son iguales en magnitud', 'Son diferentes', 'La de bajada es mayor', 'La de subida es mayor'],
    correctAnswer: 0,
    explanation: 'Por conservación de energía, la velocidad de subida y bajada son iguales en magnitud al mismo nivel.',
    topic: 'Lanzamiento Vertical',
    difficulty: 'basico'
  },

  // === MRU ===
  {
    id: 'mru-1',
    question: 'Un auto viaja a 72 km/h. ¿Qué distancia recorre en 2.5 horas?',
    options: ['180 km', '28.8 km', '144 km', '74.5 km'],
    correctAnswer: 0,
    explanation: 'd = v × t = 72 km/h × 2.5 h = 180 km',
    topic: 'MRU',
    difficulty: 'basico'
  },
  {
    id: 'mru-2',
    question: 'En el MRU, ¿cuál es el valor de la aceleración?',
    options: ['Cero', 'Constante positiva', 'Constante negativa', 'Variable'],
    correctAnswer: 0,
    explanation: 'En el Movimiento Rectilíneo Uniforme, la velocidad es constante, por lo tanto la aceleración es cero.',
    topic: 'MRU',
    difficulty: 'basico'
  },

  // === RELATIVIDAD ===
  {
    id: 'relatividad-1',
    question: '¿Cuál es la famosa ecuación de Einstein que relaciona masa y energía?',
    options: ['E = mc²', 'F = ma', 'E = ½mv²', 'p = mv'],
    correctAnswer: 0,
    explanation: 'La ecuación E = mc² establece la equivalencia entre masa y energía, donde c es la velocidad de la luz.',
    topic: 'Relatividad Especial',
    difficulty: 'basico'
  },
  {
    id: 'relatividad-2',
    question: '¿Cuál es el valor de la velocidad de la luz en el vacío?',
    options: ['3×10⁸ m/s', '3×10⁶ m/s', '3×10¹⁰ m/s', '9.8 m/s'],
    correctAnswer: 0,
    explanation: 'La velocidad de la luz en el vacío es aproximadamente 3×10⁸ m/s (300,000 km/s).',
    topic: 'Relatividad Especial',
    difficulty: 'basico'
  },

  // === LEYES DE NEWTON ===
  {
    id: 'newton-1',
    question: '¿Qué establece la segunda ley de Newton?',
    options: ['F = ma', 'F = mv', 'F = mg', 'F = mc²'],
    correctAnswer: 0,
    explanation: 'La segunda ley de Newton establece que la fuerza neta es igual a la masa por la aceleración: F = ma.',
    topic: 'Leyes de Newton',
    difficulty: 'basico'
  },
  {
    id: 'newton-2',
    question: '¿Qué ley de Newton explica el funcionamiento de un cohete?',
    options: ['Tercera ley (acción-reacción)', 'Primera ley (inercia)', 'Segunda ley (F=ma)', 'Ley de gravitación'],
    correctAnswer: 0,
    explanation: 'Los cohetes funcionan por la tercera ley: los gases expulsados hacia atrás crean una fuerza de reacción que impulsa el cohete hacia adelante.',
    topic: 'Leyes de Newton',
    difficulty: 'intermedio'
  },
  {
    id: 'newton-3',
    question: 'Un objeto de 5 kg experimenta una fuerza neta de 20 N. ¿Cuál es su aceleración?',
    options: ['4 m/s²', '100 m/s²', '0.25 m/s²', '25 m/s²'],
    correctAnswer: 0,
    explanation: 'F = ma → a = F/m = 20 N / 5 kg = 4 m/s²',
    topic: 'Leyes de Newton',
    difficulty: 'basico'
  }
];

export const getRandomQuestions = (count: number = 5): QuizQuestion[] => {
  const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export const getQuestionsByTopic = (topic: string): QuizQuestion[] => {
  return quizQuestions.filter(q => q.topic === topic);
};

export const getQuestionsByDifficulty = (difficulty: 'basico' | 'intermedio' | 'avanzado'): QuizQuestion[] => {
  return quizQuestions.filter(q => q.difficulty === difficulty);
};
