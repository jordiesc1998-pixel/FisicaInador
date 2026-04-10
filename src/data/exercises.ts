// Sistema de Ejercicios Base con Variaciones Numéricas
// Cada ejercicio tiene una plantilla con valores variables que se generan aleatoriamente

export interface ExerciseVariable {
  name: string;
  symbol: string;
  min: number;
  max: number;
  decimals?: number;
  unit: string;
  // Para valores que no son aleatorios sino calculados
  isCalculated?: boolean;
  calculateFrom?: string[];
}

export interface Exercise {
  id: string;
  planetId: string;
  title: string;
  difficulty: 'facil' | 'medio' | 'dificil';
  template: string; // Texto del problema con {variable} placeholders
  variables: ExerciseVariable[];
  question: string;
  answerUnit: string;
  // Función para calcular la respuesta correcta
  calculateAnswer: (values: Record<string, number>) => number;
  // Pasos de solución para mostrar al usuario
  solutionSteps: string[];
  // Fórmula principal que se muestra
  formula: string;
  hints: string[];
}

// ============================================
// PLANETA HOOKE - Ley de Hooke
// ============================================
export const hookeExercises: Exercise[] = [
  {
    id: 'hooke-1',
    planetId: 'hooke',
    title: 'Fuerza sobre un resorte',
    difficulty: 'facil',
    template: 'Un resorte tiene una constante elástica de {k} N/m. Si se deforma {x} cm desde su posición de equilibrio, ¿cuál es la magnitud de la fuerza ejercida?',
    variables: [
      { name: 'constante', symbol: 'k', min: 50, max: 500, unit: 'N/m' },
      { name: 'deformacion', symbol: 'x', min: 2, max: 20, decimals: 1, unit: 'cm' }
    ],
    question: 'Calcula la fuerza sobre el resorte.',
    answerUnit: 'N',
    calculateAnswer: (v) => v.k * (v.x / 100), // Convertir cm a m
    solutionSteps: [
      'Identificar los datos: k = {k} N/m, x = {x} cm = {x_m} m',
      'Aplicar la Ley de Hooke: F = k × x',
      'F = {k} × {x_m} = {answer} N'
    ],
    formula: 'F = k × x',
    hints: ['Recuerda convertir cm a metros', 'La fuerza es proporcional a la deformación']
  },
  {
    id: 'hooke-2',
    planetId: 'hooke',
    title: 'Calcular la constante elástica',
    difficulty: 'facil',
    template: 'Se aplica una fuerza de {F} N a un resorte y este se estira {x} cm. ¿Cuál es la constante elástica del resorte?',
    variables: [
      { name: 'fuerza', symbol: 'F', min: 10, max: 100, unit: 'N' },
      { name: 'deformacion', symbol: 'x', min: 5, max: 30, decimals: 1, unit: 'cm' }
    ],
    question: 'Determina la constante elástica.',
    answerUnit: 'N/m',
    calculateAnswer: (v) => v.F / (v.x / 100),
    solutionSteps: [
      'Datos: F = {F} N, x = {x} cm = {x_m} m',
      'Despejar k de la Ley de Hooke: k = F / x',
      'k = {F} / {x_m} = {answer} N/m'
    ],
    formula: 'k = F / x',
    hints: ['Despeja k de la fórmula F = kx', 'No olvides convertir a metros']
  },
  {
    id: 'hooke-3',
    planetId: 'hooke',
    title: 'Energía potencial elástica',
    difficulty: 'medio',
    template: 'Un resorte de constante {k} N/m es comprimido {x} cm. ¿Cuál es la energía potencial elástica almacenada?',
    variables: [
      { name: 'constante', symbol: 'k', min: 100, max: 800, unit: 'N/m' },
      { name: 'deformacion', symbol: 'x', min: 5, max: 25, decimals: 1, unit: 'cm' }
    ],
    question: 'Calcula la energía potencial.',
    answerUnit: 'J',
    calculateAnswer: (v) => 0.5 * v.k * Math.pow(v.x / 100, 2),
    solutionSteps: [
      'Datos: k = {k} N/m, x = {x} cm = {x_m} m',
      'Aplicar la fórmula de energía potencial elástica: Ep = ½kx²',
      'Ep = ½ × {k} × ({x_m})² = {answer} J'
    ],
    formula: 'Ep = ½kx²',
    hints: ['La energía se mide en Joules', 'Recuerda elevar al cuadrado la deformación']
  },
  {
    id: 'hooke-4',
    planetId: 'hooke',
    title: 'Deformación desconocida',
    difficulty: 'medio',
    template: 'Un resorte de constante {k} N/m almacena una energía potencial de {Ep} J. ¿Cuál es la deformación del resorte?',
    variables: [
      { name: 'constante', symbol: 'k', min: 200, max: 600, unit: 'N/m' },
      { name: 'energia', symbol: 'Ep', min: 0.5, max: 5, decimals: 2, unit: 'J' }
    ],
    question: 'Encuentra la deformación.',
    answerUnit: 'cm',
    calculateAnswer: (v) => Math.sqrt((2 * v.Ep) / v.k) * 100, // Convertir a cm
    solutionSteps: [
      'Datos: k = {k} N/m, Ep = {Ep} J',
      'Despejar x de: Ep = ½kx² → x = √(2Ep/k)',
      'x = √(2 × {Ep} / {k}) = {answer_m} m = {answer} cm'
    ],
    formula: 'x = √(2Ep/k)',
    hints: ['Despeja x de la fórmula de energía', 'La raíz cuadrada invierte el cuadrado']
  },
  {
    id: 'hooke-5',
    planetId: 'hooke',
    title: 'Resortes en serie',
    difficulty: 'dificil',
    template: 'Dos resortes con constantes {k1} N/m y {k2} N/m se conectan en serie. ¿Cuál es la constante equivalente del sistema?',
    variables: [
      { name: 'constante1', symbol: 'k1', min: 100, max: 400, unit: 'N/m' },
      { name: 'constante2', symbol: 'k2', min: 100, max: 400, unit: 'N/m' }
    ],
    question: 'Calcula la constante equivalente.',
    answerUnit: 'N/m',
    calculateAnswer: (v) => (v.k1 * v.k2) / (v.k1 + v.k2),
    solutionSteps: [
      'Datos: k₁ = {k1} N/m, k₂ = {k2} N/m',
      'Para resortes en serie: 1/k_eq = 1/k₁ + 1/k₂',
      'k_eq = (k₁ × k₂) / (k₁ + k₂)',
      'k_eq = ({k1} × {k2}) / ({k1} + {k2}) = {answer} N/m'
    ],
    formula: 'k_eq = (k₁ × k₂) / (k₁ + k₂)',
    hints: ['En serie, la constante equivalente es menor que cada individual', 'Usa la fórmula del paralelo inverso']
  },
  {
    id: 'hooke-6',
    planetId: 'hooke',
    title: 'Resortes en paralelo',
    difficulty: 'medio',
    template: 'Dos resortes con constantes {k1} N/m y {k2} N/m se conectan en paralelo. ¿Cuál es la constante equivalente?',
    variables: [
      { name: 'constante1', symbol: 'k1', min: 100, max: 400, unit: 'N/m' },
      { name: 'constante2', symbol: 'k2', min: 100, max: 400, unit: 'N/m' }
    ],
    question: 'Calcula la constante equivalente.',
    answerUnit: 'N/m',
    calculateAnswer: (v) => v.k1 + v.k2,
    solutionSteps: [
      'Datos: k₁ = {k1} N/m, k₂ = {k2} N/m',
      'Para resortes en paralelo: k_eq = k₁ + k₂',
      'k_eq = {k1} + {k2} = {answer} N/m'
    ],
    formula: 'k_eq = k₁ + k₂',
    hints: ['En paralelo, las constantes se suman', 'La constante equivalente es mayor']
  },
  {
    id: 'hooke-7',
    planetId: 'hooke',
    title: 'Trabajo sobre un resorte',
    difficulty: 'medio',
    template: 'Se comprime un resorte de constante {k} N/m desde su posición natural hasta {x} cm. ¿Qué trabajo se realiza?',
    variables: [
      { name: 'constante', symbol: 'k', min: 200, max: 600, unit: 'N/m' },
      { name: 'deformacion', symbol: 'x', min: 5, max: 20, decimals: 1, unit: 'cm' }
    ],
    question: 'Calcula el trabajo realizado.',
    answerUnit: 'J',
    calculateAnswer: (v) => 0.5 * v.k * Math.pow(v.x / 100, 2),
    solutionSteps: [
      'Datos: k = {k} N/m, x = {x} cm = {x_m} m',
      'El trabajo es igual a la energía potencial: W = ½kx²',
      'W = ½ × {k} × ({x_m})² = {answer} J'
    ],
    formula: 'W = ½kx²',
    hints: ['El trabajo realizado es igual a la energía almacenada', 'La fuerza no es constante, por eso se usa ½']
  },
  {
    id: 'hooke-8',
    planetId: 'hooke',
    title: 'Masa sobre un resorte',
    difficulty: 'medio',
    template: 'Se coloca un objeto de {m} kg sobre un resorte vertical de constante {k} N/m. ¿Cuánto se comprime el resorte?',
    variables: [
      { name: 'masa', symbol: 'm', min: 1, max: 10, decimals: 1, unit: 'kg' },
      { name: 'constante', symbol: 'k', min: 200, max: 800, unit: 'N/m' }
    ],
    question: 'Calcula la compresión del resorte.',
    answerUnit: 'cm',
    calculateAnswer: (v) => (v.m * 9.8) / v.k * 100, // Convertir a cm
    solutionSteps: [
      'Datos: m = {m} kg, k = {k} N/m, g = 9.8 m/s²',
      'En equilibrio: Peso = Fuerza elástica → mg = kx',
      'x = mg/k = ({m} × 9.8) / {k} = {answer_m} m = {answer} cm'
    ],
    formula: 'x = mg/k',
    hints: ['En equilibrio, el peso iguala a la fuerza elástica', 'El peso es P = mg']
  },
  {
    id: 'hooke-9',
    planetId: 'hooke',
    title: 'Fuerza máxima sin deformación permanente',
    difficulty: 'dificil',
    template: 'Un resorte tiene constante {k} N/m y su límite elástico es {x_max} cm. ¿Cuál es la máxima fuerza que se puede aplicar sin causar deformación permanente?',
    variables: [
      { name: 'constante', symbol: 'k', min: 300, max: 800, unit: 'N/m' },
      { name: 'limite', symbol: 'x_max', min: 10, max: 30, decimals: 1, unit: 'cm' }
    ],
    question: 'Calcula la fuerza máxima.',
    answerUnit: 'N',
    calculateAnswer: (v) => v.k * (v.x_max / 100),
    solutionSteps: [
      'Datos: k = {k} N/m, límite elástico = {x_max} cm = {x_max_m} m',
      'Fuerza máxima en el límite elástico: F_max = k × x_max',
      'F_max = {k} × {x_max_m} = {answer} N'
    ],
    formula: 'F_max = k × x_max',
    hints: ['El límite elástico es la máxima deformación reversible', 'Más allá de este límite, el resorte se deforma permanentemente']
  },
  {
    id: 'hooke-10',
    planetId: 'hooke',
    title: 'Comparación de energías',
    difficulty: 'dificil',
    template: 'Un resorte de constante {k} N/m se deforma primero {x1} cm y luego {x2} cm. ¿Cuántas veces mayor es la energía en el segundo caso respecto al primero?',
    variables: [
      { name: 'constante', symbol: 'k', min: 100, max: 500, unit: 'N/m' },
      { name: 'deformacion1', symbol: 'x1', min: 5, max: 15, unit: 'cm' },
      { name: 'deformacion2', symbol: 'x2', min: 10, max: 30, unit: 'cm' }
    ],
    question: 'Calcula la razón entre energías.',
    answerUnit: 'veces',
    calculateAnswer: (v) => Math.pow(v.x2 / v.x1, 2),
    solutionSteps: [
      'Datos: x₁ = {x1} cm, x₂ = {x2} cm',
      'La energía es proporcional al cuadrado de la deformación',
      'Ep₂/Ep₁ = (x₂/x₁)² = ({x2}/{x1})² = {answer} veces'
    ],
    formula: 'Ep₂/Ep₁ = (x₂/x₁)²',
    hints: ['La energía depende del cuadrado de x', 'Si x se duplica, la energía se cuadruplica']
  }
];

// ============================================
// PLANETA CARGAS - Cargas Eléctricas
// ============================================
export const cargasExercises: Exercise[] = [
  {
    id: 'cargas-1',
    planetId: 'cargas',
    title: 'Fuerza entre dos cargas',
    difficulty: 'facil',
    template: 'Dos cargas de {q1} μC y {q2} μC están separadas por {r} cm. ¿Cuál es la fuerza eléctrica entre ellas?',
    variables: [
      { name: 'carga1', symbol: 'q1', min: 1, max: 10, decimals: 1, unit: 'μC' },
      { name: 'carga2', symbol: 'q2', min: 1, max: 10, decimals: 1, unit: 'μC' },
      { name: 'distancia', symbol: 'r', min: 10, max: 50, unit: 'cm' }
    ],
    question: 'Calcula la fuerza eléctrica.',
    answerUnit: 'N',
    calculateAnswer: (v) => (9e9 * v.q1 * 1e-6 * v.q2 * 1e-6) / Math.pow(v.r / 100, 2),
    solutionSteps: [
      'Datos: q₁ = {q1} μC = {q1_s} C, q₂ = {q2} μC = {q2_s} C, r = {r} cm = {r_m} m',
      'Aplicar Ley de Coulomb: F = k·q₁·q₂/r²',
      'F = 9×10⁹ × {q1_s} × {q2_s} / ({r_m})² = {answer} N'
    ],
    formula: 'F = k·q₁·q₂/r²',
    hints: ['k = 9×10⁹ N·m²/C²', 'Convierte μC a C multiplicando por 10⁻⁶']
  },
  {
    id: 'cargas-2',
    planetId: 'cargas',
    title: 'Distancia entre cargas',
    difficulty: 'medio',
    template: 'Dos cargas iguales de {q} μC experimentan una fuerza repulsiva de {F} N. ¿A qué distancia se encuentran?',
    variables: [
      { name: 'carga', symbol: 'q', min: 2, max: 15, decimals: 1, unit: 'μC' },
      { name: 'fuerza', symbol: 'F', min: 0.1, max: 5, decimals: 2, unit: 'N' }
    ],
    question: 'Calcula la distancia.',
    answerUnit: 'cm',
    calculateAnswer: (v) => Math.sqrt((9e9 * Math.pow(v.q * 1e-6, 2)) / v.F) * 100,
    solutionSteps: [
      'Datos: q = {q} μC = {q_s} C, F = {F} N',
      'Despejar r: r = √(k·q²/F)',
      'r = √(9×10⁹ × ({q_s})² / {F}) = {answer_m} m = {answer} cm'
    ],
    formula: 'r = √(k·q²/F)',
    hints: ['Despeja r de la Ley de Coulomb', 'Recuerda que las cargas son iguales: q₁ = q₂ = q']
  },
  {
    id: 'cargas-3',
    planetId: 'cargas',
    title: 'Campo eléctrico de una carga',
    difficulty: 'facil',
    template: 'Una carga puntual de {q} μC crea un campo eléctrico. ¿Cuál es la magnitud del campo a {r} cm de la carga?',
    variables: [
      { name: 'carga', symbol: 'q', min: 1, max: 20, decimals: 1, unit: 'μC' },
      { name: 'distancia', symbol: 'r', min: 5, max: 40, unit: 'cm' }
    ],
    question: 'Calcula el campo eléctrico.',
    answerUnit: 'N/C',
    calculateAnswer: (v) => (9e9 * v.q * 1e-6) / Math.pow(v.r / 100, 2),
    solutionSteps: [
      'Datos: q = {q} μC = {q_s} C, r = {r} cm = {r_m} m',
      'Campo eléctrico: E = k·q/r²',
      'E = 9×10⁹ × {q_s} / ({r_m})² = {answer} N/C'
    ],
    formula: 'E = k·q/r²',
    hints: ['El campo eléctrico es la fuerza por unidad de carga', 'Se mide en N/C o V/m']
  },
  {
    id: 'cargas-4',
    planetId: 'cargas',
    title: 'Fuerza sobre carga en campo',
    difficulty: 'facil',
    template: 'Una carga de {q} μC se coloca en un campo eléctrico uniforme de {E} N/C. ¿Cuál es la fuerza que experimenta?',
    variables: [
      { name: 'carga', symbol: 'q', min: 1, max: 15, decimals: 1, unit: 'μC' },
      { name: 'campo', symbol: 'E', min: 100, max: 2000, unit: 'N/C' }
    ],
    question: 'Calcula la fuerza eléctrica.',
    answerUnit: 'N',
    calculateAnswer: (v) => (v.q * 1e-6) * v.E,
    solutionSteps: [
      'Datos: q = {q} μC = {q_s} C, E = {E} N/C',
      'Fuerza eléctrica: F = q·E',
      'F = {q_s} × {E} = {answer} N'
    ],
    formula: 'F = q·E',
    hints: ['Esta es la forma más simple de calcular fuerza eléctrica', 'El campo ya está dado']
  },
  {
    id: 'cargas-5',
    planetId: 'cargas',
    title: 'Cargas en línea - fuerza neta',
    difficulty: 'dificil',
    template: 'Tres cargas están en línea: q₁ = {q1} μC en x=0, q₂ = {q2} μC en x={r1} cm, q₃ = {q3} μC en x={r2} cm. ¿Cuál es la fuerza neta sobre q₂?',
    variables: [
      { name: 'carga1', symbol: 'q1', min: 2, max: 10, decimals: 1, unit: 'μC' },
      { name: 'carga2', symbol: 'q2', min: 1, max: 8, decimals: 1, unit: 'μC' },
      { name: 'carga3', symbol: 'q3', min: 2, max: 10, decimals: 1, unit: 'μC' },
      { name: 'distancia1', symbol: 'r1', min: 10, max: 30, unit: 'cm' },
      { name: 'distancia2', symbol: 'r2', min: 20, max: 50, unit: 'cm' }
    ],
    question: 'Calcula la fuerza neta sobre q₂.',
    answerUnit: 'N',
    calculateAnswer: (v) => {
      const r12 = v.r1 / 100;
      const r23 = (v.r2 - v.r1) / 100;
      const F12 = 9e9 * v.q1 * 1e-6 * v.q2 * 1e-6 / Math.pow(r12, 2);
      const F23 = 9e9 * v.q2 * 1e-6 * v.q3 * 1e-6 / Math.pow(r23, 2);
      return Math.abs(F23 - F12); // Simplificado
    },
    solutionSteps: [
      'Calcular fuerza de q₁ sobre q₂: F₁₂ = k·q₁·q₂/r₁₂²',
      'Calcular fuerza de q₃ sobre q₂: F₂₃ = k·q₂·q₃/r₂₃²',
      'Sumar vectorialmente las fuerzas',
      'F_neta = {answer} N'
    ],
    formula: 'F_neta = F₁₂ + F₂₃',
    hints: ['Considera el signo de cada carga', 'Las fuerzas pueden sumar o restar']
  },
  {
    id: 'cargas-6',
    planetId: 'cargas',
    title: 'Cantidad de electrones',
    difficulty: 'medio',
    template: 'Un objeto tiene una carga de {q} nC. ¿Cuántos electrones en exceso o defecto tiene?',
    variables: [
      { name: 'carga', symbol: 'q', min: -50, max: 50, decimals: 1, unit: 'nC' }
    ],
    question: 'Calcula el número de electrones.',
    answerUnit: 'electrones',
    calculateAnswer: (v) => Math.abs(v.q * 1e-9 / 1.6e-19),
    solutionSteps: [
      'Datos: q = {q} nC = {q_s} C',
      'Carga de un electrón: e = 1.6×10⁻¹⁹ C',
      'Número de electrones: n = |q|/e',
      'n = |{q_s}| / 1.6×10⁻¹⁹ = {answer} electrones'
    ],
    formula: 'n = |q|/e',
    hints: ['Carga negativa = exceso de electrones', 'Carga positiva = defecto de electrones']
  },
  {
    id: 'cargas-7',
    planetId: 'cargas',
    title: 'Equilibrio de cargas',
    difficulty: 'dificil',
    template: 'Dos cargas fijas de {q1} μC y {q2} μC están separadas {r} cm. ¿Dónde se debe colocar una tercera carga para que esté en equilibrio?',
    variables: [
      { name: 'carga1', symbol: 'q1', min: 5, max: 20, decimals: 1, unit: 'μC' },
      { name: 'carga2', symbol: 'q2', min: 10, max: 40, decimals: 1, unit: 'μC' },
      { name: 'distancia', symbol: 'r', min: 20, max: 60, unit: 'cm' }
    ],
    question: 'Calcula la posición de equilibrio desde q₁.',
    answerUnit: 'cm',
    calculateAnswer: (v) => v.r / (1 + Math.sqrt(v.q2 / v.q1)),
    solutionSteps: [
      'Datos: q₁ = {q1} μC, q₂ = {q2} μC, r = {r} cm',
      'Sea x la distancia desde q₁ donde se coloca la tercera carga',
      'Para equilibrio: F₁₃ = F₂₃',
      'x = r/(1 + √(q₂/q₁)) = {answer} cm desde q₁'
    ],
    formula: 'x = r/(1 + √(q₂/q₁))',
    hints: ['El punto de equilibrio está entre las cargas si son de signos opuestos', 'Debe estar más cerca de la carga menor']
  },
  {
    id: 'cargas-8',
    planetId: 'cargas',
    title: 'Campo eléctrico nulo',
    difficulty: 'dificil',
    template: 'Dos cargas de {q1} μC y {q2} μC están separadas por {r} cm. ¿En qué punto entre ellas el campo eléctrico es cero?',
    variables: [
      { name: 'carga1', symbol: 'q1', min: 5, max: 15, decimals: 1, unit: 'μC' },
      { name: 'carga2', symbol: 'q2', min: 15, max: 40, decimals: 1, unit: 'μC' },
      { name: 'distancia', symbol: 'r', min: 30, max: 80, unit: 'cm' }
    ],
    question: 'Calcula la posición donde E = 0.',
    answerUnit: 'cm',
    calculateAnswer: (v) => v.r / (1 + Math.sqrt(v.q2 / v.q1)),
    solutionSteps: [
      'Datos: q₁ = {q1} μC, q₂ = {q2} μC, r = {r} cm',
      'E = 0 cuando: k·q₁/x² = k·q₂/(r-x)²',
      'x = r/(1 + √(q₂/q₁)) = {answer} cm desde q₁'
    ],
    formula: 'x = r/(1 + √(q₂/q₁))',
    hints: ['El campo se anula donde las contribuciones se cancelan', 'Solo existe entre cargas del mismo signo']
  },
  {
    id: 'cargas-9',
    planetId: 'cargas',
    title: 'Potencial eléctrico',
    difficulty: 'medio',
    template: 'Una carga de {q} μC crea un potencial eléctrico. ¿Cuál es el potencial a {r} cm de la carga?',
    variables: [
      { name: 'carga', symbol: 'q', min: 2, max: 20, decimals: 1, unit: 'μC' },
      { name: 'distancia', symbol: 'r', min: 5, max: 50, unit: 'cm' }
    ],
    question: 'Calcula el potencial eléctrico.',
    answerUnit: 'V',
    calculateAnswer: (v) => (9e9 * v.q * 1e-6) / (v.r / 100),
    solutionSteps: [
      'Datos: q = {q} μC = {q_s} C, r = {r} cm = {r_m} m',
      'Potencial eléctrico: V = k·q/r',
      'V = 9×10⁹ × {q_s} / {r_m} = {answer} V'
    ],
    formula: 'V = k·q/r',
    hints: ['El potencial es una magnitud escalar', 'Se mide en Voltios (V)']
  },
  {
    id: 'cargas-10',
    planetId: 'cargas',
    title: 'Trabajo en campo eléctrico',
    difficulty: 'medio',
    template: 'Se mueve una carga de {q} μC desde un punto con potencial {V1} V hasta otro con potencial {V2} V. ¿Cuál es el trabajo realizado?',
    variables: [
      { name: 'carga', symbol: 'q', min: 1, max: 10, decimals: 1, unit: 'μC' },
      { name: 'potencial1', symbol: 'V1', min: 100, max: 500, unit: 'V' },
      { name: 'potencial2', symbol: 'V2', min: 200, max: 800, unit: 'V' }
    ],
    question: 'Calcula el trabajo realizado.',
    answerUnit: 'J',
    calculateAnswer: (v) => (v.q * 1e-6) * (v.V2 - v.V1),
    solutionSteps: [
      'Datos: q = {q} μC = {q_s} C, V₁ = {V1} V, V₂ = {V2} V',
      'Trabajo: W = q·ΔV = q·(V₂ - V₁)',
      'W = {q_s} × ({V2} - {V1}) = {answer} J'
    ],
    formula: 'W = q·(V₂ - V₁)',
    hints: ['Trabajo positivo = aumenta energía potencial', 'Trabajo negativo = disminuye energía potencial']
  }
];

// ============================================
// PLANETA CIRCUITOS - Circuitos Eléctricos
// ============================================
export const circuitosExercises: Exercise[] = [
  {
    id: 'circuitos-1',
    planetId: 'circuitos',
    title: 'Ley de Ohm básica',
    difficulty: 'facil',
    template: 'Un resistor de {R} Ω está conectado a una fuente de {V} V. ¿Qué corriente circula por el circuito?',
    variables: [
      { name: 'resistencia', symbol: 'R', min: 10, max: 500, unit: 'Ω' },
      { name: 'voltaje', symbol: 'V', min: 5, max: 24, unit: 'V' }
    ],
    question: 'Calcula la corriente.',
    answerUnit: 'mA',
    calculateAnswer: (v) => (v.V / v.R) * 1000,
    solutionSteps: [
      'Datos: R = {R} Ω, V = {V} V',
      'Ley de Ohm: V = I·R → I = V/R',
      'I = {V} / {R} = {answer_a} A = {answer} mA'
    ],
    formula: 'I = V/R',
    hints: ['La corriente se mide en Amperios', '1 A = 1000 mA']
  },
  {
    id: 'circuitos-2',
    planetId: 'circuitos',
    title: 'Resistencias en serie',
    difficulty: 'facil',
    template: 'Tres resistores de {R1} Ω, {R2} Ω y {R3} Ω están conectados en serie a una fuente de {V} V. ¿Cuál es la corriente total?',
    variables: [
      { name: 'resistencia1', symbol: 'R1', min: 10, max: 100, unit: 'Ω' },
      { name: 'resistencia2', symbol: 'R2', min: 10, max: 100, unit: 'Ω' },
      { name: 'resistencia3', symbol: 'R3', min: 10, max: 100, unit: 'Ω' },
      { name: 'voltaje', symbol: 'V', min: 5, max: 20, unit: 'V' }
    ],
    question: 'Calcula la corriente total.',
    answerUnit: 'mA',
    calculateAnswer: (v) => (v.V / (v.R1 + v.R2 + v.R3)) * 1000,
    solutionSteps: [
      'Datos: R₁ = {R1} Ω, R₂ = {R2} Ω, R₃ = {R3} Ω, V = {V} V',
      'Resistencia equivalente en serie: R_eq = R₁ + R₂ + R₃ = {R_eq} Ω',
      'Corriente: I = V/R_eq = {V}/{R_eq} = {answer} mA'
    ],
    formula: 'R_eq = R₁ + R₂ + R₃',
    hints: ['En serie, las resistencias se suman', 'La corriente es igual en todos los resistores']
  },
  {
    id: 'circuitos-3',
    planetId: 'circuitos',
    title: 'Resistencias en paralelo',
    difficulty: 'facil',
    template: 'Dos resistores de {R1} Ω y {R2} Ω están conectados en paralelo. ¿Cuál es la resistencia equivalente?',
    variables: [
      { name: 'resistencia1', symbol: 'R1', min: 20, max: 200, unit: 'Ω' },
      { name: 'resistencia2', symbol: 'R2', min: 20, max: 200, unit: 'Ω' }
    ],
    question: 'Calcula la resistencia equivalente.',
    answerUnit: 'Ω',
    calculateAnswer: (v) => (v.R1 * v.R2) / (v.R1 + v.R2),
    solutionSteps: [
      'Datos: R₁ = {R1} Ω, R₂ = {R2} Ω',
      'Para resistencias en paralelo: 1/R_eq = 1/R₁ + 1/R₂',
      'R_eq = (R₁ × R₂)/(R₁ + R₂) = ({R1} × {R2})/({R1} + {R2}) = {answer} Ω'
    ],
    formula: 'R_eq = (R₁ × R₂)/(R₁ + R₂)',
    hints: ['La resistencia equivalente es menor que la menor de las dos', 'Conductancias en paralelo se suman']
  },
  {
    id: 'circuitos-4',
    planetId: 'circuitos',
    title: 'Potencia disipada',
    difficulty: 'facil',
    template: 'Una resistencia de {R} Ω tiene una corriente de {I} mA. ¿Cuánta potencia disipa?',
    variables: [
      { name: 'resistencia', symbol: 'R', min: 50, max: 500, unit: 'Ω' },
      { name: 'corriente', symbol: 'I', min: 10, max: 200, decimals: 1, unit: 'mA' }
    ],
    question: 'Calcula la potencia disipada.',
    answerUnit: 'mW',
    calculateAnswer: (v) => Math.pow(v.I / 1000, 2) * v.R * 1000,
    solutionSteps: [
      'Datos: R = {R} Ω, I = {I} mA = {I_a} A',
      'Potencia: P = I²·R',
      'P = ({I_a})² × {R} = {answer} mW'
    ],
    formula: 'P = I²R',
    hints: ['La potencia se mide en Watts', 'También puedes usar P = V²/R o P = V·I']
  },
  {
    id: 'circuitos-5',
    planetId: 'circuitos',
    title: 'Circuito mixto',
    difficulty: 'medio',
    template: 'Tres resistores: R₁ = {R1} Ω y R₂ = {R2} Ω en paralelo, conectados en serie con R₃ = {R3} Ω. Si el voltaje total es {V} V, ¿cuál es la corriente?',
    variables: [
      { name: 'resistencia1', symbol: 'R1', min: 50, max: 150, unit: 'Ω' },
      { name: 'resistencia2', symbol: 'R2', min: 50, max: 150, unit: 'Ω' },
      { name: 'resistencia3', symbol: 'R3', min: 50, max: 200, unit: 'Ω' },
      { name: 'voltaje', symbol: 'V', min: 10, max: 30, unit: 'V' }
    ],
    question: 'Calcula la corriente total.',
    answerUnit: 'mA',
    calculateAnswer: (v) => {
      const Rparalelo = (v.R1 * v.R2) / (v.R1 + v.R2);
      const Req = Rparalelo + v.R3;
      return (v.V / Req) * 1000;
    },
    solutionSteps: [
      'R₁₂ (paralelo) = (R₁×R₂)/(R₁+R₂)',
      'R_eq = R₁₂ + R₃',
      'I = V/R_eq',
      'I = {answer} mA'
    ],
    formula: 'R_eq = R_paralelo + R₃',
    hints: ['Primero calcula el paralelo', 'Luego suma en serie']
  },
  {
    id: 'circuitos-6',
    planetId: 'circuitos',
    title: 'Divisor de voltaje',
    difficulty: 'medio',
    template: 'Dos resistores de {R1} Ω y {R2} Ω están en serie con una fuente de {V} V. ¿Cuál es el voltaje sobre R₂?',
    variables: [
      { name: 'resistencia1', symbol: 'R1', min: 50, max: 300, unit: 'Ω' },
      { name: 'resistencia2', symbol: 'R2', min: 50, max: 300, unit: 'Ω' },
      { name: 'voltaje', symbol: 'V', min: 10, max: 24, unit: 'V' }
    ],
    question: 'Calcula el voltaje sobre R₂.',
    answerUnit: 'V',
    calculateAnswer: (v) => v.V * v.R2 / (v.R1 + v.R2),
    solutionSteps: [
      'Datos: R₁ = {R1} Ω, R₂ = {R2} Ω, V_total = {V} V',
      'Divisor de voltaje: V₂ = V × R₂/(R₁ + R₂)',
      'V₂ = {V} × {R2}/({R1} + {R2}) = {answer} V'
    ],
    formula: 'V₂ = V × R₂/(R₁ + R₂)',
    hints: ['El voltaje se divide proporcionalmente a la resistencia', 'Mayor resistencia = mayor voltaje']
  },
  {
    id: 'circuitos-7',
    planetId: 'circuitos',
    title: 'Divisor de corriente',
    difficulty: 'medio',
    template: 'Una corriente de {I} mA entra a un nodo y se divide en dos ramas con resistencias {R1} Ω y {R2} Ω. ¿Cuánta corriente pasa por R₁?',
    variables: [
      { name: 'corriente', symbol: 'I', min: 50, max: 500, decimals: 1, unit: 'mA' },
      { name: 'resistencia1', symbol: 'R1', min: 50, max: 300, unit: 'Ω' },
      { name: 'resistencia2', symbol: 'R2', min: 50, max: 300, unit: 'Ω' }
    ],
    question: 'Calcula la corriente por R₁.',
    answerUnit: 'mA',
    calculateAnswer: (v) => v.I * v.R2 / (v.R1 + v.R2),
    solutionSteps: [
      'Datos: I_total = {I} mA, R₁ = {R1} Ω, R₂ = {R2} Ω',
      'Divisor de corriente: I₁ = I × R₂/(R₁ + R₂)',
      'I₁ = {I} × {R2}/({R1} + {R2}) = {answer} mA'
    ],
    formula: 'I₁ = I × R₂/(R₁ + R₂)',
    hints: ['La corriente busca el camino de menor resistencia', 'Más corriente por la rama de menor R']
  },
  {
    id: 'circuitos-8',
    planetId: 'circuitos',
    title: 'Energía consumida',
    difficulty: 'facil',
    template: 'Un resistor de {R} Ω está conectado a {V} V durante {t} minutos. ¿Cuánta energía consume?',
    variables: [
      { name: 'resistencia', symbol: 'R', min: 50, max: 500, unit: 'Ω' },
      { name: 'voltaje', symbol: 'V', min: 5, max: 20, unit: 'V' },
      { name: 'tiempo', symbol: 't', min: 1, max: 30, unit: 'min' }
    ],
    question: 'Calcula la energía consumida.',
    answerUnit: 'kJ',
    calculateAnswer: (v) => (Math.pow(v.V, 2) / v.R) * (v.t * 60) / 1000,
    solutionSteps: [
      'Datos: R = {R} Ω, V = {V} V, t = {t} min = {t_s} s',
      'Potencia: P = V²/R',
      'Energía: E = P × t = V²×t/R',
      'E = {V}² × {t_s} / {R} = {answer} kJ'
    ],
    formula: 'E = V²t/R',
    hints: ['La energía es Potencia × Tiempo', '1 J = 1 W × 1 s']
  },
  {
    id: 'circuitos-9',
    planetId: 'circuitos',
    title: 'Leyes de Kirchhoff',
    difficulty: 'dificil',
    template: 'En un nodo entran corrientes de {I1} mA y {I2} mA. ¿Cuánta corriente sale por la tercera rama?',
    variables: [
      { name: 'corriente1', symbol: 'I1', min: 10, max: 100, decimals: 1, unit: 'mA' },
      { name: 'corriente2', symbol: 'I2', min: 10, max: 100, decimals: 1, unit: 'mA' }
    ],
    question: 'Calcula la corriente que sale.',
    answerUnit: 'mA',
    calculateAnswer: (v) => v.I1 + v.I2,
    solutionSteps: [
      'Datos: I₁ = {I1} mA (entra), I₂ = {I2} mA (entra)',
      'Ley de Kirchhoff (LCK): ΣI_entra = ΣI_sale',
      'I₃ = I₁ + I₂ = {I1} + {I2} = {answer} mA'
    ],
    formula: 'ΣI = 0',
    hints: ['Lo que entra al nodo debe salir', 'Suma algebraica de corrientes = 0']
  },
  {
    id: 'circuitos-10',
    planetId: 'circuitos',
    title: 'Resistencia desconocida',
    difficulty: 'medio',
    template: 'Un resistor desconocido R está en serie con uno de {R1} Ω. Si la fuente es {V} V y la corriente es {I} mA, ¿cuánto vale R?',
    variables: [
      { name: 'resistencia1', symbol: 'R1', min: 50, max: 200, unit: 'Ω' },
      { name: 'voltaje', symbol: 'V', min: 10, max: 24, unit: 'V' },
      { name: 'corriente', symbol: 'I', min: 20, max: 100, decimals: 1, unit: 'mA' }
    ],
    question: 'Calcula el valor de R.',
    answerUnit: 'Ω',
    calculateAnswer: (v) => (v.V / (v.I / 1000)) - v.R1,
    solutionSteps: [
      'Datos: R₁ = {R1} Ω, V = {V} V, I = {I} mA = {I_a} A',
      'Resistencia total: R_total = V/I = {V}/{I_a} = {R_total} Ω',
      'R = R_total - R₁ = {R_total} - {R1} = {answer} Ω'
    ],
    formula: 'R = V/I - R₁',
    hints: ['Primero encuentra la resistencia total', 'Luego resta la resistencia conocida']
  }
];

// ============================================
// PLANETA GRAVITACIÓN - Gravitación Universal
// ============================================
export const gravitacionExercises: Exercise[] = [
  {
    id: 'gravitacion-1',
    planetId: 'gravitacion',
    title: 'Fuerza gravitacional',
    difficulty: 'facil',
    template: 'Dos masas de {m1} kg y {m2} kg están separadas por {r} m. ¿Cuál es la fuerza gravitacional entre ellas?',
    variables: [
      { name: 'masa1', symbol: 'm1', min: 100, max: 1000, unit: 'kg' },
      { name: 'masa2', symbol: 'm2', min: 100, max: 1000, unit: 'kg' },
      { name: 'distancia', symbol: 'r', min: 1, max: 10, decimals: 1, unit: 'm' }
    ],
    question: 'Calcula la fuerza gravitacional.',
    answerUnit: 'N',
    calculateAnswer: (v) => (6.67e-11 * v.m1 * v.m2) / Math.pow(v.r, 2),
    solutionSteps: [
      'Datos: m₁ = {m1} kg, m₂ = {m2} kg, r = {r} m',
      'Ley de Gravitación: F = G·m₁·m₂/r²',
      'F = 6.67×10⁻¹¹ × {m1} × {m2} / ({r})² = {answer} N'
    ],
    formula: 'F = G·m₁·m₂/r²',
    hints: ['G = 6.67×10⁻¹¹ N·m²/kg²', 'La gravedad es siempre atractiva']
  },
  {
    id: 'gravitacion-2',
    planetId: 'gravitacion',
    title: 'Campo gravitacional',
    difficulty: 'facil',
    template: 'Un planeta tiene una masa de {m}×10²² kg. ¿Cuál es la aceleración gravitacional a {r}×10⁶ m de su centro?',
    variables: [
      { name: 'masa', symbol: 'm', min: 1, max: 50, unit: '×10²² kg' },
      { name: 'distancia', symbol: 'r', min: 1, max: 20, unit: '×10⁶ m' }
    ],
    question: 'Calcula la aceleración gravitacional.',
    answerUnit: 'm/s²',
    calculateAnswer: (v) => (6.67e-11 * v.m * 1e22) / Math.pow(v.r * 1e6, 2),
    solutionSteps: [
      'Datos: M = {m}×10²² kg, r = {r}×10⁶ m',
      'Aceleración gravitacional: g = G·M/r²',
      'g = 6.67×10⁻¹¹ × {m}×10²² / ({r}×10⁶)² = {answer} m/s²'
    ],
    formula: 'g = G·M/r²',
    hints: ['El campo gravitacional es g = GM/r²', 'Es la aceleración de un objeto en caída libre']
  },
  {
    id: 'gravitacion-3',
    planetId: 'gravitacion',
    title: 'Velocidad orbital',
    difficulty: 'medio',
    template: 'Un satélite orbita un planeta de masa {m}×10²⁴ kg a una altura de {h}×10⁵ m sobre la superficie. El radio del planeta es {R}×10⁶ m. ¿Cuál es la velocidad orbital?',
    variables: [
      { name: 'masa', symbol: 'm', min: 1, max: 10, unit: '×10²⁴ kg' },
      { name: 'altura', symbol: 'h', min: 1, max: 50, unit: '×10⁵ m' },
      { name: 'radio', symbol: 'R', min: 3, max: 10, unit: '×10⁶ m' }
    ],
    question: 'Calcula la velocidad orbital.',
    answerUnit: 'km/s',
    calculateAnswer: (v) => Math.sqrt((6.67e-11 * v.m * 1e24) / ((v.R * 1e6) + (v.h * 1e5))) / 1000,
    solutionSteps: [
      'Datos: M = {m}×10²⁴ kg, h = {h}×10⁵ m, R = {R}×10⁶ m',
      'Radio orbital: r = R + h = {r_total}×10⁶ m',
      'Velocidad orbital: v = √(GM/r)',
      'v = {answer} km/s'
    ],
    formula: 'v = √(GM/r)',
    hints: ['La velocidad orbital depende de la altura', 'Mayor altura = menor velocidad']
  },
  {
    id: 'gravitacion-4',
    planetId: 'gravitacion',
    title: 'Período orbital',
    difficulty: 'medio',
    template: 'Un satélite orbita a {r}×10⁶ m del centro de un planeta de masa {m}×10²⁴ kg. ¿Cuál es su período orbital?',
    variables: [
      { name: 'radio', symbol: 'r', min: 5, max: 50, unit: '×10⁶ m' },
      { name: 'masa', symbol: 'm', min: 1, max: 10, unit: '×10²⁴ kg' }
    ],
    question: 'Calcula el período orbital.',
    answerUnit: 'horas',
    calculateAnswer: (v) => (2 * Math.PI * Math.sqrt(Math.pow(v.r * 1e6, 3) / (6.67e-11 * v.m * 1e24))) / 3600,
    solutionSteps: [
      'Datos: r = {r}×10⁶ m, M = {m}×10²⁴ kg',
      'Tercera Ley de Kepler: T = 2π√(r³/GM)',
      'T = 2π√(({r}×10⁶)³/(6.67×10⁻¹¹ × {m}×10²⁴))',
      'T = {answer} horas'
    ],
    formula: 'T = 2π√(r³/GM)',
    hints: ['El período es el tiempo de una órbita completa', 'Relacionado con la Tercera Ley de Kepler']
  },
  {
    id: 'gravitacion-5',
    planetId: 'gravitacion',
    title: 'Energía potencial gravitacional',
    difficulty: 'medio',
    template: 'Un objeto de {m} kg está a {r}×10⁶ m del centro de un planeta de masa {M}×10²⁴ kg. ¿Cuál es su energía potencial gravitacional?',
    variables: [
      { name: 'masa', symbol: 'm', min: 1, max: 100, decimals: 1, unit: 'kg' },
      { name: 'distancia', symbol: 'r', min: 5, max: 50, unit: '×10⁶ m' },
      { name: 'masaPlaneta', symbol: 'M', min: 1, max: 10, unit: '×10²⁴ kg' }
    ],
    question: 'Calcula la energía potencial.',
    answerUnit: 'MJ',
    calculateAnswer: (v) => -(6.67e-11 * v.M * 1e24 * v.m) / (v.r * 1e6) / 1e6,
    solutionSteps: [
      'Datos: m = {m} kg, r = {r}×10⁶ m, M = {M}×10²⁴ kg',
      'Energía potencial: Ep = -G·M·m/r',
      'Ep = -6.67×10⁻¹¹ × {M}×10²⁴ × {m} / ({r}×10⁶)',
      'Ep = {answer} MJ'
    ],
    formula: 'Ep = -G·M·m/r',
    hints: ['La energía potencial gravitacional es negativa', 'Cero en el infinito']
  },
  {
    id: 'gravitacion-6',
    planetId: 'gravitacion',
    title: 'Velocidad de escape',
    difficulty: 'dificil',
    template: 'Un planeta tiene masa {m}×10²⁴ kg y radio {R}×10⁶ m. ¿Cuál es la velocidad de escape desde su superficie?',
    variables: [
      { name: 'masa', symbol: 'm', min: 1, max: 10, unit: '×10²⁴ kg' },
      { name: 'radio', symbol: 'R', min: 3, max: 10, unit: '×10⁶ m' }
    ],
    question: 'Calcula la velocidad de escape.',
    answerUnit: 'km/s',
    calculateAnswer: (v) => Math.sqrt((2 * 6.67e-11 * v.m * 1e24) / (v.R * 1e6)) / 1000,
    solutionSteps: [
      'Datos: M = {m}×10²⁴ kg, R = {R}×10⁶ m',
      'Velocidad de escape: v_e = √(2GM/R)',
      'v_e = √(2 × 6.67×10⁻¹¹ × {m}×10²⁴ / ({R}×10⁶))',
      'v_e = {answer} km/s'
    ],
    formula: 'v_e = √(2GM/R)',
    hints: ['Es la velocidad mínima para escapar del campo gravitacional', 'Independiente de la masa del objeto']
  },
  {
    id: 'gravitacion-7',
    planetId: 'gravitacion',
    title: 'Energía orbital total',
    difficulty: 'dificil',
    template: 'Un satélite de {m} kg orbita a {r}×10⁶ m del centro de un planeta de masa {M}×10²⁴ kg. ¿Cuál es su energía mecánica total?',
    variables: [
      { name: 'masa', symbol: 'm', min: 100, max: 1000, unit: 'kg' },
      { name: 'radio', symbol: 'r', min: 5, max: 30, unit: '×10⁶ m' },
      { name: 'masaPlaneta', symbol: 'M', min: 1, max: 10, unit: '×10²⁴ kg' }
    ],
    question: 'Calcula la energía mecánica total.',
    answerUnit: 'MJ',
    calculateAnswer: (v) => -(6.67e-11 * v.M * 1e24 * v.m) / (2 * v.r * 1e6) / 1e6,
    solutionSteps: [
      'Datos: m = {m} kg, r = {r}×10⁶ m, M = {M}×10²⁴ kg',
      'Energía orbital: E = -G·M·m/(2r)',
      'E = -6.67×10⁻¹¹ × {M}×10²⁴ × {m} / (2 × {r}×10⁶)',
      'E = {answer} MJ'
    ],
    formula: 'E = -G·M·m/(2r)',
    hints: ['La energía total es negativa (órbita ligada)', 'Es la mitad de la energía potencial']
  },
  {
    id: 'gravitacion-8',
    planetId: 'gravitacion',
    title: 'Masa de un planeta',
    difficulty: 'medio',
    template: 'Un planeta tiene un satélite que orbita a {r}×10⁶ m con un período de {T} horas. ¿Cuál es la masa del planeta?',
    variables: [
      { name: 'radio', symbol: 'r', min: 5, max: 50, unit: '×10⁶ m' },
      { name: 'periodo', symbol: 'T', min: 2, max: 24, decimals: 1, unit: 'horas' }
    ],
    question: 'Calcula la masa del planeta.',
    answerUnit: '×10²⁴ kg',
    calculateAnswer: (v) => (4 * Math.pow(Math.PI, 2) * Math.pow(v.r * 1e6, 3)) / (6.67e-11 * Math.pow(v.T * 3600, 2)) / 1e24,
    solutionSteps: [
      'Datos: r = {r}×10⁶ m, T = {T} horas = {T_s} s',
      'De la Tercera Ley de Kepler: T² = 4π²r³/(GM)',
      'M = 4π²r³/(GT²)',
      'M = {answer}×10²⁴ kg'
    ],
    formula: 'M = 4π²r³/(GT²)',
    hints: ['Esta es la forma de "pesar" un planeta', 'Solo necesitas conocer la órbita de un satélite']
  },
  {
    id: 'gravitacion-9',
    planetId: 'gravitacion',
    title: 'Variación de g con la altura',
    difficulty: 'medio',
    template: 'En la superficie de un planeta de radio {R}×10⁶ m, la gravedad es {g0} m/s². ¿Cuál es la gravedad a {h}×10⁶ m de altura?',
    variables: [
      { name: 'radio', symbol: 'R', min: 3, max: 10, unit: '×10⁶ m' },
      { name: 'gravedad', symbol: 'g0', min: 5, max: 15, decimals: 1, unit: 'm/s²' },
      { name: 'altura', symbol: 'h', min: 1, max: 10, unit: '×10⁶ m' }
    ],
    question: 'Calcula la gravedad a esa altura.',
    answerUnit: 'm/s²',
    calculateAnswer: (v) => v.g0 * Math.pow(v.R / (v.R + v.h), 2),
    solutionSteps: [
      'Datos: R = {R}×10⁶ m, g₀ = {g0} m/s², h = {h}×10⁶ m',
      'g a altura h: g = g₀·(R/(R+h))²',
      'g = {g0} × ({R}/({R}+{h}))² = {answer} m/s²'
    ],
    formula: 'g = g₀(R/(R+h))²',
    hints: ['La gravedad disminuye con el cuadrado de la distancia', 'g varía como 1/r²']
  },
  {
    id: 'gravitacion-10',
    planetId: 'gravitacion',
    title: 'Punto de equilibrio',
    difficulty: 'dificil',
    template: 'Dos planetas de masas {m1}×10²⁴ kg y {m2}×10²⁴ kg están separados por {d}×10⁸ m. ¿A qué distancia del planeta mayor está el punto donde la gravedad se anula?',
    variables: [
      { name: 'masa1', symbol: 'm1', min: 5, max: 20, unit: '×10²⁴ kg' },
      { name: 'masa2', symbol: 'm2', min: 1, max: 5, unit: '×10²⁴ kg' },
      { name: 'distancia', symbol: 'd', min: 1, max: 10, unit: '×10⁸ m' }
    ],
    question: 'Calcula la distancia desde el planeta mayor.',
    answerUnit: '×10⁸ m',
    calculateAnswer: (v) => v.d / (1 + Math.sqrt(v.m2 / v.m1)),
    solutionSteps: [
      'Datos: m₁ = {m1}×10²⁴ kg, m₂ = {m2}×10²⁴ kg, d = {d}×10⁸ m',
      'Sea x la distancia desde m₁ donde g₁ = g₂',
      'Gm₁/x² = Gm₂/(d-x)²',
      'x = d/(1 + √(m₂/m₁)) = {answer}×10⁸ m'
    ],
    formula: 'x = d/(1 + √(m₂/m₁))',
    hints: ['El punto está más cerca del planeta menor', 'Las gravedades de ambos planetas se igualan']
  }
];

// ============================================
// PLANETA NEWTON - Leyes de Newton
// ============================================
export const newtonExercises: Exercise[] = [
  {
    id: 'newton-1',
    planetId: 'newton',
    title: 'Segunda Ley de Newton',
    difficulty: 'facil',
    template: 'Una fuerza de {F} N se aplica a un objeto de {m} kg. ¿Cuál es la aceleración del objeto?',
    variables: [
      { name: 'fuerza', symbol: 'F', min: 10, max: 100, unit: 'N' },
      { name: 'masa', symbol: 'm', min: 1, max: 20, decimals: 1, unit: 'kg' }
    ],
    question: 'Calcula la aceleración.',
    answerUnit: 'm/s²',
    calculateAnswer: (v) => v.F / v.m,
    solutionSteps: [
      'Datos: F = {F} N, m = {m} kg',
      'Segunda Ley de Newton: F = m·a → a = F/m',
      'a = {F} / {m} = {answer} m/s²'
    ],
    formula: 'a = F/m',
    hints: ['La aceleración es directamente proporcional a la fuerza', 'E inversamente proporcional a la masa']
  },
  {
    id: 'newton-2',
    planetId: 'newton',
    title: 'Peso de un objeto',
    difficulty: 'facil',
    template: 'Un objeto tiene una masa de {m} kg. ¿Cuál es su peso en la Tierra?',
    variables: [
      { name: 'masa', symbol: 'm', min: 1, max: 100, decimals: 1, unit: 'kg' }
    ],
    question: 'Calcula el peso.',
    answerUnit: 'N',
    calculateAnswer: (v) => v.m * 9.8,
    solutionSteps: [
      'Datos: m = {m} kg, g = 9.8 m/s²',
      'Peso: P = m·g',
      'P = {m} × 9.8 = {answer} N'
    ],
    formula: 'P = m·g',
    hints: ['El peso es una fuerza', 'Masa y peso son magnitudes diferentes']
  },
  {
    id: 'newton-3',
    planetId: 'newton',
    title: 'Fuerza neta sobre un objeto',
    difficulty: 'facil',
    template: 'Sobre un objeto actúan dos fuerzas: {F1} N hacia la derecha y {F2} N hacia la izquierda. ¿Cuál es la fuerza neta?',
    variables: [
      { name: 'fuerza1', symbol: 'F1', min: 20, max: 100, unit: 'N' },
      { name: 'fuerza2', symbol: 'F2', min: 10, max: 80, unit: 'N' }
    ],
    question: 'Calcula la fuerza neta.',
    answerUnit: 'N',
    calculateAnswer: (v) => v.F1 - v.F2,
    solutionSteps: [
      'Datos: F₁ = {F1} N (derecha), F₂ = {F2} N (izquierda)',
      'Fuerza neta: F_neta = F₁ - F₂',
      'F_neta = {F1} - {F2} = {answer} N (derecha)'
    ],
    formula: 'F_neta = F₁ - F₂',
    hints: ['Las fuerzas opuestas se restan', 'El resultado indica dirección']
  },
  {
    id: 'newton-4',
    planetId: 'newton',
    title: 'Tensión en una cuerda',
    difficulty: 'medio',
    template: 'Un objeto de {m} kg cuelga de una cuerda y se eleva con una aceleración de {a} m/s². ¿Cuál es la tensión en la cuerda?',
    variables: [
      { name: 'masa', symbol: 'm', min: 2, max: 15, decimals: 1, unit: 'kg' },
      { name: 'aceleracion', symbol: 'a', min: 1, max: 5, decimals: 1, unit: 'm/s²' }
    ],
    question: 'Calcula la tensión.',
    answerUnit: 'N',
    calculateAnswer: (v) => v.m * (9.8 + v.a),
    solutionSteps: [
      'Datos: m = {m} kg, a = {a} m/s²',
      'Diagrama de cuerpo libre: T - mg = ma',
      'T = m(g + a) = {m}(9.8 + {a}) = {answer} N'
    ],
    formula: 'T = m(g + a)',
    hints: ['La tensión debe vencer el peso y proporcionar aceleración', 'Si sube, la tensión es mayor que el peso']
  },
  {
    id: 'newton-5',
    planetId: 'newton',
    title: 'Plano inclinado sin fricción',
    difficulty: 'medio',
    template: 'Un objeto de {m} kg está sobre un plano inclinado de {θ}° sin fricción. ¿Cuál es su aceleración al bajar?',
    variables: [
      { name: 'masa', symbol: 'm', min: 2, max: 20, unit: 'kg' },
      { name: 'angulo', symbol: 'θ', min: 15, max: 45, unit: '°' }
    ],
    question: 'Calcula la aceleración.',
    answerUnit: 'm/s²',
    calculateAnswer: (v) => 9.8 * Math.sin(v.θ * Math.PI / 180),
    solutionSteps: [
      'Datos: m = {m} kg, θ = {θ}°',
      'Aceleración en plano inclinado: a = g·sin(θ)',
      'a = 9.8 × sin({θ}°) = {answer} m/s²'
    ],
    formula: 'a = g·sin(θ)',
    hints: ['La aceleración no depende de la masa', 'Solo de la componente del peso paralela al plano']
  },
  {
    id: 'newton-6',
    planetId: 'newton',
    title: 'Fricción cinética',
    difficulty: 'medio',
    template: 'Un bloque de {m} kg se desliza sobre una superficie con coeficiente de fricción cinética μ = {mu}. ¿Qué fuerza horizontal se necesita para moverlo a velocidad constante?',
    variables: [
      { name: 'masa', symbol: 'm', min: 2, max: 20, unit: 'kg' },
      { name: 'coeficiente', symbol: 'mu', min: 0.1, max: 0.5, decimals: 2, unit: '' }
    ],
    question: 'Calcula la fuerza necesaria.',
    answerUnit: 'N',
    calculateAnswer: (v) => v.mu * v.m * 9.8,
    solutionSteps: [
      'Datos: m = {m} kg, μ = {mu}',
      'Fuerza de fricción: f = μ·N = μ·m·g',
      'F = {mu} × {m} × 9.8 = {answer} N'
    ],
    formula: 'f = μ·m·g',
    hints: ['A velocidad constante, la fuerza aplicada iguala la fricción', 'La normal N = mg en superficie horizontal']
  },
  {
    id: 'newton-7',
    planetId: 'newton',
    title: 'Sistema de poleas (Atwood)',
    difficulty: 'dificil',
    template: 'Dos masas de {m1} kg y {m2} kg cuelgan de una polea sin fricción. ¿Cuál es la aceleración del sistema?',
    variables: [
      { name: 'masa1', symbol: 'm1', min: 5, max: 15, unit: 'kg' },
      { name: 'masa2', symbol: 'm2', min: 1, max: 10, unit: 'kg' }
    ],
    question: 'Calcula la aceleración.',
    answerUnit: 'm/s²',
    calculateAnswer: (v) => 9.8 * (v.m1 - v.m2) / (v.m1 + v.m2),
    solutionSteps: [
      'Datos: m₁ = {m1} kg, m₂ = {m2} kg',
      'Aceleración: a = g(m₁-m₂)/(m₁+m₂)',
      'a = 9.8 × ({m1}-{m2})/({m1}+{m2}) = {answer} m/s²'
    ],
    formula: 'a = g(m₁-m₂)/(m₁+m₂)',
    hints: ['La masa mayor baja', 'La tensión es igual en ambos lados']
  },
  {
    id: 'newton-8',
    planetId: 'newton',
    title: 'Tensión en poleas',
    difficulty: 'dificil',
    template: 'En un sistema de Atwood con masas {m1} kg y {m2} kg, ¿cuál es la tensión en la cuerda?',
    variables: [
      { name: 'masa1', symbol: 'm1', min: 5, max: 15, unit: 'kg' },
      { name: 'masa2', symbol: 'm2', min: 1, max: 10, unit: 'kg' }
    ],
    question: 'Calcula la tensión.',
    answerUnit: 'N',
    calculateAnswer: (v) => 9.8 * 2 * v.m1 * v.m2 / (v.m1 + v.m2),
    solutionSteps: [
      'Datos: m₁ = {m1} kg, m₂ = {m2} kg',
      'Tensión: T = 2·m₁·m₂·g/(m₁+m₂)',
      'T = 2 × {m1} × {m2} × 9.8/({m1}+{m2}) = {answer} N'
    ],
    formula: 'T = 2m₁m₂g/(m₁+m₂)',
    hints: ['La tensión está entre los dos pesos', 'T < m₁g y T > m₂g']
  },
  {
    id: 'newton-9',
    planetId: 'newton',
    title: 'Fuerza de reacción',
    difficulty: 'medio',
    template: 'Una persona de {m} kg está en un elevador que sube con aceleración {a} m/s². ¿Cuál es la fuerza normal del piso sobre la persona?',
    variables: [
      { name: 'masa', symbol: 'm', min: 50, max: 100, unit: 'kg' },
      { name: 'aceleracion', symbol: 'a', min: 1, max: 4, decimals: 1, unit: 'm/s²' }
    ],
    question: 'Calcula la fuerza normal.',
    answerUnit: 'N',
    calculateAnswer: (v) => v.m * (9.8 + v.a),
    solutionSteps: [
      'Datos: m = {m} kg, a = {a} m/s²',
      'N - mg = ma → N = m(g + a)',
      'N = {m} × (9.8 + {a}) = {answer} N'
    ],
    formula: 'N = m(g + a)',
    hints: ['Si sube acelerando, la normal es mayor que el peso', 'Si baja, la normal es menor']
  },
  {
    id: 'newton-10',
    planetId: 'newton',
    title: 'Fricción estática máxima',
    difficulty: 'medio',
    template: 'Un bloque de {m} kg está sobre una superficie con coeficiente de fricción estática μₛ = {mus}. ¿Cuál es la máxima fuerza horizontal antes de que empieze a moverse?',
    variables: [
      { name: 'masa', symbol: 'm', min: 2, max: 20, unit: 'kg' },
      { name: 'coeficiente', symbol: 'mus', min: 0.2, max: 0.6, decimals: 2, unit: '' }
    ],
    question: 'Calcula la fuerza máxima.',
    answerUnit: 'N',
    calculateAnswer: (v) => v.mus * v.m * 9.8,
    solutionSteps: [
      'Datos: m = {m} kg, μₛ = {mus}',
      'Fuerza de fricción estática máxima: f_max = μₛ·N = μₛ·mg',
      'f_max = {mus} × {m} × 9.8 = {answer} N'
    ],
    formula: 'f_max = μₛ·m·g',
    hints: ['Es la fuerza máxima sin movimiento', 'Si la aplicada supera este valor, el bloque se mueve']
  }
];

// ============================================
// PLANETA MRU - Movimiento Rectilíneo Uniforme
// ============================================
export const mruExercises: Exercise[] = [
  {
    id: 'mru-1',
    planetId: 'mru',
    title: 'Velocidad constante',
    difficulty: 'facil',
    template: 'Un móvil recorre {d} m en {t} segundos moviéndose en línea recta. ¿Cuál es su velocidad?',
    variables: [
      { name: 'distancia', symbol: 'd', min: 10, max: 500, unit: 'm' },
      { name: 'tiempo', symbol: 't', min: 2, max: 30, unit: 's' }
    ],
    question: 'Calcula la velocidad.',
    answerUnit: 'm/s',
    calculateAnswer: (v) => v.d / v.t,
    solutionSteps: [
      'Datos: d = {d} m, t = {t} s',
      'Velocidad: v = d/t',
      'v = {d} / {t} = {answer} m/s'
    ],
    formula: 'v = d/t',
    hints: ['En MRU la velocidad es constante', 'No hay aceleración']
  },
  {
    id: 'mru-2',
    planetId: 'mru',
    title: 'Distancia recorrida',
    difficulty: 'facil',
    template: 'Un coche viaja a {v} m/s durante {t} segundos. ¿Qué distancia recorre?',
    variables: [
      { name: 'velocidad', symbol: 'v', min: 5, max: 30, unit: 'm/s' },
      { name: 'tiempo', symbol: 't', min: 5, max: 60, unit: 's' }
    ],
    question: 'Calcula la distancia.',
    answerUnit: 'm',
    calculateAnswer: (v) => v.v * v.t,
    solutionSteps: [
      'Datos: v = {v} m/s, t = {t} s',
      'Distancia: d = v × t',
      'd = {v} × {t} = {answer} m'
    ],
    formula: 'd = v × t',
    hints: ['La distancia es velocidad por tiempo', 'En MRU, el movimiento es uniforme']
  },
  {
    id: 'mru-3',
    planetId: 'mru',
    title: 'Tiempo de viaje',
    difficulty: 'facil',
    template: 'Un tren viaja a {v} km/h y debe recorrer {d} km. ¿Cuánto tiempo tarda?',
    variables: [
      { name: 'velocidad', symbol: 'v', min: 30, max: 120, unit: 'km/h' },
      { name: 'distancia', symbol: 'd', min: 10, max: 200, unit: 'km' }
    ],
    question: 'Calcula el tiempo en minutos.',
    answerUnit: 'min',
    calculateAnswer: (v) => (v.d / v.v) * 60,
    solutionSteps: [
      'Datos: v = {v} km/h, d = {d} km',
      'Tiempo: t = d/v',
      't = {d} / {v} = {t_h} horas = {answer} minutos'
    ],
    formula: 't = d/v',
    hints: ['Convierte horas a minutos multiplicando por 60', 'La fórmula es la misma del MRU']
  },
  {
    id: 'mru-4',
    planetId: 'mru',
    title: 'Posición en función del tiempo',
    difficulty: 'facil',
    template: 'Un móvil parte de la posición x₀ = {x0} m y se mueve con velocidad de {v} m/s. ¿Cuál es su posición después de {t} segundos?',
    variables: [
      { name: 'posicion0', symbol: 'x0', min: 0, max: 50, unit: 'm' },
      { name: 'velocidad', symbol: 'v', min: 2, max: 20, unit: 'm/s' },
      { name: 'tiempo', symbol: 't', min: 1, max: 20, unit: 's' }
    ],
    question: 'Calcula la posición final.',
    answerUnit: 'm',
    calculateAnswer: (v) => v.x0 + v.v * v.t,
    solutionSteps: [
      'Datos: x₀ = {x0} m, v = {v} m/s, t = {t} s',
      'Posición: x = x₀ + v·t',
      'x = {x0} + {v} × {t} = {answer} m'
    ],
    formula: 'x = x₀ + v·t',
    hints: ['La posición inicial se suma al desplazamiento', 'El signo de v indica dirección']
  },
  {
    id: 'mru-5',
    planetId: 'mru',
    title: 'Encuentro de dos móviles',
    difficulty: 'medio',
    template: 'Dos móviles parten de puntos separados por {d} m y avanzan uno hacia el otro con velocidades {v1} m/s y {v2} m/s. ¿En cuánto tiempo se encuentran?',
    variables: [
      { name: 'distancia', symbol: 'd', min: 50, max: 200, unit: 'm' },
      { name: 'velocidad1', symbol: 'v1', min: 2, max: 10, unit: 'm/s' },
      { name: 'velocidad2', symbol: 'v2', min: 2, max: 10, unit: 'm/s' }
    ],
    question: 'Calcula el tiempo de encuentro.',
    answerUnit: 's',
    calculateAnswer: (v) => v.d / (v.v1 + v.v2),
    solutionSteps: [
      'Datos: d = {d} m, v₁ = {v1} m/s, v₂ = {v2} m/s',
      'Tiempo de encuentro: t = d/(v₁ + v₂)',
      't = {d} / ({v1} + {v2}) = {answer} s'
    ],
    formula: 't = d/(v₁ + v₂)',
    hints: ['Las velocidades se suman porque van uno hacia el otro', 'El encuentro es cuando la suma de distancias = d']
  },
  {
    id: 'mru-6',
    planetId: 'mru',
    title: 'Persecución',
    difficulty: 'medio',
    template: 'Un móvil A viaja a {v1} m/s y lleva {d} m de ventaja. Otro móvil B viaja a {v2} m/s persiguiéndolo. ¿En cuánto tiempo B alcanza a A?',
    variables: [
      { name: 'ventaja', symbol: 'd', min: 20, max: 100, unit: 'm' },
      { name: 'velocidad1', symbol: 'v1', min: 5, max: 15, unit: 'm/s' },
      { name: 'velocidad2', symbol: 'v2', min: 10, max: 25, unit: 'm/s' }
    ],
    question: 'Calcula el tiempo de alcance.',
    answerUnit: 's',
    calculateAnswer: (v) => v.d / (v.v2 - v.v1),
    solutionSteps: [
      'Datos: ventaja = {d} m, v_A = {v1} m/s, v_B = {v2} m/s',
      'Tiempo de alcance: t = d/(v_B - v_A)',
      't = {d} / ({v2} - {v1}) = {answer} s'
    ],
    formula: 't = d/(v_B - v_A)',
    hints: ['B debe ser más rápido que A', 'La diferencia de velocidades determina el tiempo']
  },
  {
    id: 'mru-7',
    planetId: 'mru',
    title: 'Velocidad relativa',
    difficulty: 'medio',
    template: 'Dos móviles viajan en el mismo sentido con velocidades {v1} m/s y {v2} m/s. ¿Cuál es la velocidad relativa del segundo respecto al primero?',
    variables: [
      { name: 'velocidad1', symbol: 'v1', min: 5, max: 20, unit: 'm/s' },
      { name: 'velocidad2', symbol: 'v2', min: 10, max: 30, unit: 'm/s' }
    ],
    question: 'Calcula la velocidad relativa.',
    answerUnit: 'm/s',
    calculateAnswer: (v) => v.v2 - v.v1,
    solutionSteps: [
      'Datos: v₁ = {v1} m/s, v₂ = {v2} m/s',
      'Velocidad relativa: v_rel = v₂ - v₁',
      'v_rel = {v2} - {v1} = {answer} m/s'
    ],
    formula: 'v_rel = v₂ - v₁',
    hints: ['En mismo sentido, se restan', 'En sentidos opuestos, se suman']
  },
  {
    id: 'mru-8',
    planetId: 'mru',
    title: 'Cruce de móviles opuestos',
    difficulty: 'medio',
    template: 'Dos móviles separados por {d} m se mueven en sentidos opuestos a {v1} m/s y {v2} m/s. ¿A qué distancia del punto de partida del primero se cruzan?',
    variables: [
      { name: 'distancia', symbol: 'd', min: 50, max: 200, unit: 'm' },
      { name: 'velocidad1', symbol: 'v1', min: 3, max: 12, unit: 'm/s' },
      { name: 'velocidad2', symbol: 'v2', min: 3, max: 12, unit: 'm/s' }
    ],
    question: 'Calcula la distancia desde el primer móvil.',
    answerUnit: 'm',
    calculateAnswer: (v) => v.d * v.v1 / (v.v1 + v.v2),
    solutionSteps: [
      'Datos: d = {d} m, v₁ = {v1} m/s, v₂ = {v2} m/s',
      'Tiempo de cruce: t = d/(v₁ + v₂)',
      'Distancia del primero: x₁ = v₁ × t = d × v₁/(v₁+v₂)',
      'x₁ = {d} × {v1}/({v1}+{v2}) = {answer} m'
    ],
    formula: 'x₁ = d·v₁/(v₁+v₂)',
    hints: ['El móvil más rápido recorre más distancia', 'Se cruzan donde las distancias suman d']
  },
  {
    id: 'mru-9',
    planetId: 'mru',
    title: 'Conversión de unidades',
    difficulty: 'facil',
    template: 'Un móvil viaja a {v} km/h. ¿Cuál es su velocidad en m/s?',
    variables: [
      { name: 'velocidad', symbol: 'v', min: 18, max: 144, unit: 'km/h' }
    ],
    question: 'Convierte a m/s.',
    answerUnit: 'm/s',
    calculateAnswer: (v) => v.v / 3.6,
    solutionSteps: [
      'Datos: v = {v} km/h',
      'Conversión: 1 km/h = 1/3.6 m/s',
      'v = {v} / 3.6 = {answer} m/s'
    ],
    formula: 'v(m/s) = v(km/h) / 3.6',
    hints: ['Divide entre 3.6 para convertir', 'Multiplica por 3.6 para convertir de m/s a km/h']
  },
  {
    id: 'mru-10',
    planetId: 'mru',
    title: 'Velocidad media',
    difficulty: 'medio',
    template: 'Un móvil recorre la primera mitad de un trayecto a {v1} m/s y la segunda mitad a {v2} m/s. ¿Cuál es la velocidad media total?',
    variables: [
      { name: 'velocidad1', symbol: 'v1', min: 5, max: 15, unit: 'm/s' },
      { name: 'velocidad2', symbol: 'v2', min: 5, max: 15, unit: 'm/s' }
    ],
    question: 'Calcula la velocidad media.',
    answerUnit: 'm/s',
    calculateAnswer: (v) => (2 * v.v1 * v.v2) / (v.v1 + v.v2),
    solutionSteps: [
      'Datos: v₁ = {v1} m/s (primera mitad), v₂ = {v2} m/s (segunda mitad)',
      'Velocidad media: v_m = 2v₁v₂/(v₁+v₂)',
      'v_m = 2 × {v1} × {v2} / ({v1} + {v2}) = {answer} m/s'
    ],
    formula: 'v_m = 2v₁v₂/(v₁+v₂)',
    hints: ['No es el promedio aritmético', 'Se pondera por el tiempo en cada tramo']
  }
];

// ============================================
// PLANETA VERTICAL - Lanzamiento Vertical
// ============================================
export const verticalExercises: Exercise[] = [
  {
    id: 'vertical-1',
    planetId: 'vertical',
    title: 'Altura máxima',
    difficulty: 'facil',
    template: 'Se lanza un objeto verticalmente hacia arriba con velocidad inicial de {v0} m/s. ¿Cuál es la altura máxima que alcanza?',
    variables: [
      { name: 'velocidad0', symbol: 'v0', min: 10, max: 40, unit: 'm/s' }
    ],
    question: 'Calcula la altura máxima.',
    answerUnit: 'm',
    calculateAnswer: (v) => Math.pow(v.v0, 2) / (2 * 9.8),
    solutionSteps: [
      'Datos: v₀ = {v0} m/s, g = 9.8 m/s²',
      'Altura máxima: h_max = v₀²/(2g)',
      'h_max = ({v0})² / (2 × 9.8) = {answer} m'
    ],
    formula: 'h_max = v₀²/(2g)',
    hints: ['En la altura máxima, v = 0', 'Usa conservación de energía o cinemática']
  },
  {
    id: 'vertical-2',
    planetId: 'vertical',
    title: 'Tiempo de subida',
    difficulty: 'facil',
    template: 'Un objeto se lanza hacia arriba con velocidad de {v0} m/s. ¿Cuánto tiempo tarda en alcanzar su altura máxima?',
    variables: [
      { name: 'velocidad0', symbol: 'v0', min: 10, max: 50, unit: 'm/s' }
    ],
    question: 'Calcula el tiempo de subida.',
    answerUnit: 's',
    calculateAnswer: (v) => v.v0 / 9.8,
    solutionSteps: [
      'Datos: v₀ = {v0} m/s, g = 9.8 m/s²',
      'Tiempo de subida: t = v₀/g',
      't = {v0} / 9.8 = {answer} s'
    ],
    formula: 't_subida = v₀/g',
    hints: ['En el punto más alto, v = 0', 'v = v₀ - gt = 0']
  },
  {
    id: 'vertical-3',
    planetId: 'vertical',
    title: 'Velocidad a cierta altura',
    difficulty: 'medio',
    template: 'Un objeto se lanza hacia arriba con v₀ = {v0} m/s. ¿Cuál es su velocidad a {h} m de altura?',
    variables: [
      { name: 'velocidad0', symbol: 'v0', min: 15, max: 40, unit: 'm/s' },
      { name: 'altura', symbol: 'h', min: 5, max: 30, unit: 'm' }
    ],
    question: 'Calcula la velocidad a esa altura.',
    answerUnit: 'm/s',
    calculateAnswer: (v) => Math.sqrt(Math.pow(v.v0, 2) - 2 * 9.8 * v.h),
    solutionSteps: [
      'Datos: v₀ = {v0} m/s, h = {h} m',
      'Ecuación: v² = v₀² - 2gh',
      'v = √({v0}² - 2 × 9.8 × {h}) = {answer} m/s'
    ],
    formula: 'v² = v₀² - 2gh',
    hints: ['La velocidad disminuye al subir', 'Puede haber dos respuestas (subiendo y bajando)']
  },
  {
    id: 'vertical-4',
    planetId: 'vertical',
    title: 'Tiempo total de vuelo',
    difficulty: 'medio',
    template: 'Se lanza un objeto hacia arriba desde el suelo con velocidad {v0} m/s. ¿Cuánto tiempo permanece en el aire?',
    variables: [
      { name: 'velocidad0', symbol: 'v0', min: 10, max: 40, unit: 'm/s' }
    ],
    question: 'Calcula el tiempo total.',
    answerUnit: 's',
    calculateAnswer: (v) => (2 * v.v0) / 9.8,
    solutionSteps: [
      'Datos: v₀ = {v0} m/s',
      'Tiempo total: t_total = 2v₀/g',
      't = 2 × {v0} / 9.8 = {answer} s'
    ],
    formula: 't_total = 2v₀/g',
    hints: ['El tiempo de subida = tiempo de bajada', 'Regresa al mismo nivel con velocidad opuesta']
  },
  {
    id: 'vertical-5',
    planetId: 'vertical',
    title: 'Posición después de un tiempo',
    difficulty: 'medio',
    template: 'Se lanza un objeto hacia arriba con v₀ = {v0} m/s. ¿Cuál es su posición después de {t} segundos?',
    variables: [
      { name: 'velocidad0', symbol: 'v0', min: 10, max: 30, unit: 'm/s' },
      { name: 'tiempo', symbol: 't', min: 1, max: 5, unit: 's' }
    ],
    question: 'Calcula la posición.',
    answerUnit: 'm',
    calculateAnswer: (v) => v.v0 * v.t - 0.5 * 9.8 * Math.pow(v.t, 2),
    solutionSteps: [
      'Datos: v₀ = {v0} m/s, t = {t} s',
      'Posición: y = v₀t - ½gt²',
      'y = {v0} × {t} - ½ × 9.8 × ({t})² = {answer} m'
    ],
    formula: 'y = v₀t - ½gt²',
    hints: ['Positivo = arriba del punto de lanzamiento', 'Negativo = abajo del punto de lanzamiento']
  },
  {
    id: 'vertical-6',
    planetId: 'vertical',
    title: 'Velocidad de impacto',
    difficulty: 'medio',
    template: 'Un objeto se deja caer desde una altura de {h} m. ¿Con qué velocidad llega al suelo?',
    variables: [
      { name: 'altura', symbol: 'h', min: 10, max: 80, unit: 'm' }
    ],
    question: 'Calcula la velocidad de impacto.',
    answerUnit: 'm/s',
    calculateAnswer: (v) => Math.sqrt(2 * 9.8 * v.h),
    solutionSteps: [
      'Datos: h = {h} m, v₀ = 0',
      'Velocidad de impacto: v = √(2gh)',
      'v = √(2 × 9.8 × {h}) = {answer} m/s'
    ],
    formula: 'v = √(2gh)',
    hints: ['Caída libre = lanzamiento vertical con v₀ = 0', 'La energía potencial se convierte en cinética']
  },
  {
    id: 'vertical-7',
    planetId: 'vertical',
    title: 'Tiempo de caída',
    difficulty: 'facil',
    template: 'Un objeto se deja caer desde {h} m de altura. ¿Cuánto tiempo tarda en llegar al suelo?',
    variables: [
      { name: 'altura', symbol: 'h', min: 10, max: 100, unit: 'm' }
    ],
    question: 'Calcula el tiempo de caída.',
    answerUnit: 's',
    calculateAnswer: (v) => Math.sqrt((2 * v.h) / 9.8),
    solutionSteps: [
      'Datos: h = {h} m, v₀ = 0',
      'Tiempo de caída: t = √(2h/g)',
      't = √(2 × {h} / 9.8) = {answer} s'
    ],
    formula: 't = √(2h/g)',
    hints: ['Despeja t de h = ½gt²', 'El tiempo depende de la raíz de la altura']
  },
  {
    id: 'vertical-8',
    planetId: 'vertical',
    title: 'Lanzamiento desde altura',
    difficulty: 'dificil',
    template: 'Se lanza un objeto hacia abajo desde {h} m de altura con v₀ = {v0} m/s. ¿Cuánto tiempo tarda en llegar al suelo?',
    variables: [
      { name: 'altura', symbol: 'h', min: 20, max: 80, unit: 'm' },
      { name: 'velocidad0', symbol: 'v0', min: 5, max: 20, unit: 'm/s' }
    ],
    question: 'Calcula el tiempo.',
    answerUnit: 's',
    calculateAnswer: (v) => (v.v0 + Math.sqrt(Math.pow(v.v0, 2) + 2 * 9.8 * v.h)) / 9.8,
    solutionSteps: [
      'Datos: h = {h} m, v₀ = {v0} m/s (hacia abajo)',
      'Ecuación: h = v₀t + ½gt²',
      'Resolver para t usando fórmula cuadrática',
      't = {answer} s'
    ],
    formula: 'h = v₀t + ½gt²',
    hints: ['La velocidad inicial hacia abajo se suma a la aceleración', 'Usa la fórmula cuadrática']
  },
  {
    id: 'vertical-9',
    planetId: 'vertical',
    title: 'Dos objetos lanzados',
    difficulty: 'dificil',
    template: 'Desde el suelo se lanza un objeto hacia arriba con {v1} m/s. Desde {h} m de altura se deja caer otro simultáneamente. ¿A qué altura se encuentran?',
    variables: [
      { name: 'velocidad1', symbol: 'v1', min: 15, max: 30, unit: 'm/s' },
      { name: 'altura', symbol: 'h', min: 20, max: 60, unit: 'm' }
    ],
    question: 'Calcula la altura de encuentro.',
    answerUnit: 'm',
    calculateAnswer: (v) => {
      const t = v.h / (v.v1 + Math.sqrt(2 * 9.8 * v.h));
      return v.v1 * t - 0.5 * 9.8 * Math.pow(t, 2);
    },
    solutionSteps: [
      'Objeto 1 (sube): y₁ = v₁t - ½gt²',
      'Objeto 2 (cae): y₂ = h - ½gt²',
      'Encuentro: y₁ = y₂ → v₁t = h',
      'Altura de encuentro: {answer} m'
    ],
    formula: 'Se encuentran cuando v₁t = h',
    hints: ['Los tiempos son iguales', 'Iguala las posiciones']
  },
  {
    id: 'vertical-10',
    planetId: 'vertical',
    title: 'Velocidad inicial desconocida',
    difficulty: 'dificil',
    template: 'Un objeto lanzado hacia arriba alcanza una altura máxima de {h} m. ¿Cuál fue su velocidad inicial?',
    variables: [
      { name: 'altura', symbol: 'h', min: 5, max: 50, unit: 'm' }
    ],
    question: 'Calcula la velocidad inicial.',
    answerUnit: 'm/s',
    calculateAnswer: (v) => Math.sqrt(2 * 9.8 * v.h),
    solutionSteps: [
      'Datos: h_max = {h} m',
      'De h_max = v₀²/(2g) → v₀ = √(2gh_max)',
      'v₀ = √(2 × 9.8 × {h}) = {answer} m/s'
    ],
    formula: 'v₀ = √(2gh_max)',
    hints: ['Es el proceso inverso a calcular altura máxima', 'Usa conservación de energía']
  }
];

// ============================================
// PLANETA PARABÓLICO - Movimiento Parabólico
// ============================================
export const parabolicoExercises: Exercise[] = [
  {
    id: 'parabolico-1',
    planetId: 'parabolico',
    title: 'Alcance horizontal',
    difficulty: 'facil',
    template: 'Un proyectil se lanza con velocidad {v0} m/s a un ángulo de {θ}°. ¿Cuál es el alcance horizontal?',
    variables: [
      { name: 'velocidad0', symbol: 'v0', min: 20, max: 50, unit: 'm/s' },
      { name: 'angulo', symbol: 'θ', min: 30, max: 60, unit: '°' }
    ],
    question: 'Calcula el alcance.',
    answerUnit: 'm',
    calculateAnswer: (v) => (Math.pow(v.v0, 2) * Math.sin(2 * v.θ * Math.PI / 180)) / 9.8,
    solutionSteps: [
      'Datos: v₀ = {v0} m/s, θ = {θ}°',
      'Alcance: R = v₀²·sin(2θ)/g',
      'R = ({v0})² × sin({2θ}°) / 9.8 = {answer} m'
    ],
    formula: 'R = v₀²·sin(2θ)/g',
    hints: ['El máximo alcance es a 45°', 'Ángulos complementarios dan mismo alcance']
  },
  {
    id: 'parabolico-2',
    planetId: 'parabolico',
    title: 'Altura máxima del proyectil',
    difficulty: 'facil',
    template: 'Un proyectil se lanza con velocidad {v0} m/s a {θ}° sobre la horizontal. ¿Cuál es la altura máxima?',
    variables: [
      { name: 'velocidad0', symbol: 'v0', min: 15, max: 40, unit: 'm/s' },
      { name: 'angulo', symbol: 'θ', min: 30, max: 75, unit: '°' }
    ],
    question: 'Calcula la altura máxima.',
    answerUnit: 'm',
    calculateAnswer: (v) => (Math.pow(v.v0 * Math.sin(v.θ * Math.PI / 180), 2)) / (2 * 9.8),
    solutionSteps: [
      'Datos: v₀ = {v0} m/s, θ = {θ}°',
      'Componente vertical: v_y = v₀·sin(θ)',
      'Altura máxima: H = v_y²/(2g) = {answer} m'
    ],
    formula: 'H = (v₀·sin(θ))²/(2g)',
    hints: ['Solo la componente vertical determina la altura', 'En el punto más alto, vy = 0']
  },
  {
    id: 'parabolico-3',
    planetId: 'parabolico',
    title: 'Tiempo de vuelo',
    difficulty: 'facil',
    template: 'Un proyectil se lanza con velocidad {v0} m/s formando {θ}° con la horizontal. ¿Cuánto tiempo permanece en el aire?',
    variables: [
      { name: 'velocidad0', symbol: 'v0', min: 15, max: 40, unit: 'm/s' },
      { name: 'angulo', symbol: 'θ', min: 30, max: 60, unit: '°' }
    ],
    question: 'Calcula el tiempo de vuelo.',
    answerUnit: 's',
    calculateAnswer: (v) => (2 * v.v0 * Math.sin(v.θ * Math.PI / 180)) / 9.8,
    solutionSteps: [
      'Datos: v₀ = {v0} m/s, θ = {θ}°',
      'Tiempo de vuelo: T = 2v₀·sin(θ)/g',
      'T = 2 × {v0} × sin({θ}°) / 9.8 = {answer} s'
    ],
    formula: 'T = 2v₀·sin(θ)/g',
    hints: ['Es el doble del tiempo de subida', 'Solo depende de la componente vertical']
  },
  {
    id: 'parabolico-4',
    planetId: 'parabolico',
    title: 'Componentes de velocidad',
    difficulty: 'facil',
    template: 'Un proyectil se lanza con velocidad {v0} m/s a {θ}° sobre la horizontal. ¿Cuáles son sus componentes de velocidad inicial?',
    variables: [
      { name: 'velocidad0', symbol: 'v0', min: 20, max: 50, unit: 'm/s' },
      { name: 'angulo', symbol: 'θ', min: 20, max: 70, unit: '°' }
    ],
    question: 'Calcula v_x y v_y (responde solo v_y).',
    answerUnit: 'm/s',
    calculateAnswer: (v) => v.v0 * Math.sin(v.θ * Math.PI / 180),
    solutionSteps: [
      'Datos: v₀ = {v0} m/s, θ = {θ}°',
      'v_x = v₀·cos(θ) = {vx} m/s',
      'v_y = v₀·sin(θ) = {answer} m/s'
    ],
    formula: 'v_x = v₀·cos(θ), v_y = v₀·sin(θ)',
    hints: ['La componente horizontal es constante', 'La vertical cambia con el tiempo']
  },
  {
    id: 'parabolico-5',
    planetId: 'parabolico',
    title: 'Velocidad en el punto más alto',
    difficulty: 'medio',
    template: 'Un proyectil se lanza con v₀ = {v0} m/s a {θ}°. ¿Cuál es su velocidad en el punto más alto de la trayectoria?',
    variables: [
      { name: 'velocidad0', symbol: 'v0', min: 20, max: 50, unit: 'm/s' },
      { name: 'angulo', symbol: 'θ', min: 30, max: 60, unit: '°' }
    ],
    question: 'Calcula la velocidad en el punto más alto.',
    answerUnit: 'm/s',
    calculateAnswer: (v) => v.v0 * Math.cos(v.θ * Math.PI / 180),
    solutionSteps: [
      'Datos: v₀ = {v0} m/s, θ = {θ}°',
      'En el punto más alto: v_y = 0',
      'v = v_x = v₀·cos(θ) = {answer} m/s'
    ],
    formula: 'v = v₀·cos(θ)',
    hints: ['Solo queda la componente horizontal', 'La velocidad horizontal es constante']
  },
  {
    id: 'parabolico-6',
    planetId: 'parabolico',
    title: 'Posición en un tiempo dado',
    difficulty: 'medio',
    template: 'Un proyectil se lanza con v₀ = {v0} m/s a {θ}°. ¿Cuál es su posición después de {t} segundos?',
    variables: [
      { name: 'velocidad0', symbol: 'v0', min: 20, max: 40, unit: 'm/s' },
      { name: 'angulo', symbol: 'θ', min: 30, max: 60, unit: '°' },
      { name: 'tiempo', symbol: 't', min: 1, max: 4, unit: 's' }
    ],
    question: 'Calcula la posición horizontal (x).',
    answerUnit: 'm',
    calculateAnswer: (v) => v.v0 * Math.cos(v.θ * Math.PI / 180) * v.t,
    solutionSteps: [
      'Datos: v₀ = {v0} m/s, θ = {θ}°, t = {t} s',
      'Posición horizontal: x = v₀·cos(θ)·t',
      'x = {v0} × cos({θ}°) × {t} = {answer} m'
    ],
    formula: 'x = v₀·cos(θ)·t',
    hints: ['El movimiento horizontal es uniforme', 'La posición vertical es y = v₀y·t - ½gt²']
  },
  {
    id: 'parabolico-7',
    planetId: 'parabolico',
    title: 'Lanzamiento horizontal',
    difficulty: 'medio',
    template: 'Un objeto se lanza horizontalmente desde {h} m de altura con velocidad {v0} m/s. ¿A qué distancia cae?',
    variables: [
      { name: 'altura', symbol: 'h', min: 10, max: 50, unit: 'm' },
      { name: 'velocidad0', symbol: 'v0', min: 5, max: 25, unit: 'm/s' }
    ],
    question: 'Calcula el alcance horizontal.',
    answerUnit: 'm',
    calculateAnswer: (v) => v.v0 * Math.sqrt((2 * v.h) / 9.8),
    solutionSteps: [
      'Datos: h = {h} m, v₀ = {v0} m/s',
      'Tiempo de caída: t = √(2h/g)',
      'Alcance: x = v₀·t = {answer} m'
    ],
    formula: 'x = v₀·√(2h/g)',
    hints: ['El tiempo de caída no depende de la velocidad horizontal', 'Es un caso especial de tiro parabólico']
  },
  {
    id: 'parabolico-8',
    planetId: 'parabolico',
    title: 'Velocidad de impacto',
    difficulty: 'dificil',
    template: 'Un proyectil se lanza con v₀ = {v0} m/s a {θ}° desde el suelo. ¿Con qué velocidad llega al suelo?',
    variables: [
      { name: 'velocidad0', symbol: 'v0', min: 20, max: 40, unit: 'm/s' },
      { name: 'angulo', symbol: 'θ', min: 30, max: 60, unit: '°' }
    ],
    question: 'Calcula la velocidad de impacto.',
    answerUnit: 'm/s',
    calculateAnswer: (v) => v.v0, // Por conservación de energía
    solutionSteps: [
      'Datos: v₀ = {v0} m/s, θ = {θ}°',
      'Por conservación de energía: la velocidad de llegada = velocidad de salida',
      'v_impacto = v₀ = {answer} m/s (pero en sentido contrario)'
    ],
    formula: 'v_impacto = v₀',
    hints: ['La energía se conserva', 'La velocidad es igual pero la dirección es diferente']
  },
  {
    id: 'parabolico-9',
    planetId: 'parabolico',
    title: 'Ángulo para máximo alcance',
    difficulty: 'medio',
    template: '¿A qué ángulo se debe lanzar un proyectil con v₀ = {v0} m/s para que tenga el máximo alcance horizontal?',
    variables: [
      { name: 'velocidad0', symbol: 'v0', min: 20, max: 50, unit: 'm/s' }
    ],
    question: 'Calcula el ángulo óptimo.',
    answerUnit: '°',
    calculateAnswer: (v) => 45,
    solutionSteps: [
      'El máximo alcance se obtiene cuando sin(2θ) = 1',
      '2θ = 90° → θ = 45°',
      'Ángulo óptimo = {answer}°'
    ],
    formula: 'θ_óptimo = 45°',
    hints: ['El seno de 2θ es máximo cuando 2θ = 90°', 'Es independiente de la velocidad inicial']
  },
  {
    id: 'parabolico-10',
    planetId: 'parabolico',
    title: 'Blanco a不同 altura',
    difficulty: 'dificil',
    template: 'Se lanza un proyectil desde el suelo con v₀ = {v0} m/s hacia un blanco a {d} m de distancia y {h} m de altura. ¿A qué ángulo debe lanzarse?',
    variables: [
      { name: 'velocidad0', symbol: 'v0', min: 25, max: 45, unit: 'm/s' },
      { name: 'distancia', symbol: 'd', min: 20, max: 60, unit: 'm' },
      { name: 'altura', symbol: 'h', min: 5, max: 20, unit: 'm' }
    ],
    question: 'Calcula el ángulo (aproximado).',
    answerUnit: '°',
    calculateAnswer: (v) => {
      // Ángulo aproximado usando una simplificación
      const tanTheta = (v.v0 * v.v0 + Math.sqrt(Math.pow(v.v0, 4) - 9.8 * (9.8 * v.d * v.d + 2 * v.h * v.v0 * v.v0))) / (9.8 * v.d);
      return Math.atan(tanTheta) * 180 / Math.PI;
    },
    solutionSteps: [
      'Ecuación de la trayectoria: y = x·tan(θ) - gx²/(2v₀²cos²θ)',
      'Sustituir las coordenadas del blanco',
      'Resolver para θ usando la fórmula cuadrática en tan(θ)',
      'θ ≈ {answer}°'
    ],
    formula: 'tan(θ) = [v₀² ± √(v₀⁴ - g(gx² + 2yv₀²))]/(gx)',
    hints: ['Hay dos ángulos posibles para el mismo blanco', 'Uno es más alto y el otro más bajo']
  }
];

// ============================================
// PLANETA ENERGÍA - Trabajo y Energía
// ============================================
export const energiaExercises: Exercise[] = [
  {
    id: 'energia-1',
    planetId: 'energia',
    title: 'Trabajo básico',
    difficulty: 'facil',
    template: 'Una fuerza de {F} N mueve un objeto {d} m en la dirección de la fuerza. ¿Cuánto trabajo se realiza?',
    variables: [
      { name: 'fuerza', symbol: 'F', min: 10, max: 100, unit: 'N' },
      { name: 'distancia', symbol: 'd', min: 2, max: 20, unit: 'm' }
    ],
    question: 'Calcula el trabajo.',
    answerUnit: 'J',
    calculateAnswer: (v) => v.F * v.d,
    solutionSteps: [
      'Datos: F = {F} N, d = {d} m',
      'Trabajo: W = F·d·cos(θ)',
      'W = {F} × {d} × cos(0°) = {answer} J'
    ],
    formula: 'W = F·d',
    hints: ['El trabajo es positivo cuando la fuerza y el desplazamiento están en la misma dirección', '1 J = 1 N·m']
  },
  {
    id: 'energia-2',
    planetId: 'energia',
    title: 'Energía cinética',
    difficulty: 'facil',
    template: 'Un objeto de {m} kg se mueve a {v} m/s. ¿Cuál es su energía cinética?',
    variables: [
      { name: 'masa', symbol: 'm', min: 1, max: 20, unit: 'kg' },
      { name: 'velocidad', symbol: 'v', min: 2, max: 20, unit: 'm/s' }
    ],
    question: 'Calcula la energía cinética.',
    answerUnit: 'J',
    calculateAnswer: (v) => 0.5 * v.m * Math.pow(v.v, 2),
    solutionSteps: [
      'Datos: m = {m} kg, v = {v} m/s',
      'Energía cinética: Ec = ½mv²',
      'Ec = ½ × {m} × ({v})² = {answer} J'
    ],
    formula: 'Ec = ½mv²',
    hints: ['La energía cinética siempre es positiva', 'Depende del cuadrado de la velocidad']
  },
  {
    id: 'energia-3',
    planetId: 'energia',
    title: 'Energía potencial gravitacional',
    difficulty: 'facil',
    template: 'Un objeto de {m} kg está a {h} m de altura. ¿Cuál es su energía potencial gravitacional?',
    variables: [
      { name: 'masa', symbol: 'm', min: 1, max: 20, unit: 'kg' },
      { name: 'altura', symbol: 'h', min: 2, max: 30, unit: 'm' }
    ],
    question: 'Calcula la energía potencial.',
    answerUnit: 'J',
    calculateAnswer: (v) => v.m * 9.8 * v.h,
    solutionSteps: [
      'Datos: m = {m} kg, h = {h} m, g = 9.8 m/s²',
      'Energía potencial: Ep = m·g·h',
      'Ep = {m} × 9.8 × {h} = {answer} J'
    ],
    formula: 'Ep = mgh',
    hints: ['La referencia de altura cero es arbitraria', 'Solo importa el cambio de energía potencial']
  },
  {
    id: 'energia-4',
    planetId: 'energia',
    title: 'Conservación de energía',
    difficulty: 'medio',
    template: 'Un objeto de {m} kg se deja caer desde {h} m de altura. ¿Con qué velocidad llega al suelo?',
    variables: [
      { name: 'masa', symbol: 'm', min: 1, max: 10, unit: 'kg' },
      { name: 'altura', symbol: 'h', min: 5, max: 50, unit: 'm' }
    ],
    question: 'Calcula la velocidad final.',
    answerUnit: 'm/s',
    calculateAnswer: (v) => Math.sqrt(2 * 9.8 * v.h),
    solutionSteps: [
      'Datos: m = {m} kg, h = {h} m',
      'Conservación de energía: mgh = ½mv²',
      'v = √(2gh) = √(2 × 9.8 × {h}) = {answer} m/s'
    ],
    formula: 'v = √(2gh)',
    hints: ['La masa se cancela en la conservación', 'La energía potencial se convierte en cinética']
  },
  {
    id: 'energia-5',
    planetId: 'energia',
    title: 'Teorema trabajo-energía',
    difficulty: 'medio',
    template: 'Un objeto de {m} kg inicialmente en reposo es acelerado hasta {v} m/s. ¿Qué trabajo se realizó?',
    variables: [
      { name: 'masa', symbol: 'm', min: 1, max: 20, unit: 'kg' },
      { name: 'velocidad', symbol: 'v', min: 5, max: 30, unit: 'm/s' }
    ],
    question: 'Calcula el trabajo realizado.',
    answerUnit: 'J',
    calculateAnswer: (v) => 0.5 * v.m * Math.pow(v.v, 2),
    solutionSteps: [
      'Datos: m = {m} kg, v₀ = 0, v = {v} m/s',
      'Teorema trabajo-energía: W = ΔEc = ½mv² - ½mv₀²',
      'W = ½ × {m} × ({v})² - 0 = {answer} J'
    ],
    formula: 'W = ΔEc',
    hints: ['El trabajo neto iguala al cambio de energía cinética', 'Si parte del reposo, Ec₀ = 0']
  },
  {
    id: 'energia-6',
    planetId: 'energia',
    title: 'Potencia',
    difficulty: 'facil',
    template: 'Un motor realiza {W} kJ de trabajo en {t} segundos. ¿Cuál es su potencia?',
    variables: [
      { name: 'trabajo', symbol: 'W', min: 1, max: 20, decimals: 1, unit: 'kJ' },
      { name: 'tiempo', symbol: 't', min: 2, max: 30, unit: 's' }
    ],
    question: 'Calcula la potencia.',
    answerUnit: 'W',
    calculateAnswer: (v) => (v.W * 1000) / v.t,
    solutionSteps: [
      'Datos: W = {W} kJ = {W_J} J, t = {t} s',
      'Potencia: P = W/t',
      'P = {W_J} / {t} = {answer} W'
    ],
    formula: 'P = W/t',
    hints: ['La potencia es la razón de realizar trabajo', '1 W = 1 J/s']
  },
  {
    id: 'energia-7',
    planetId: 'energia',
    title: 'Péndulo simple',
    difficulty: 'medio',
    template: 'Un péndulo de {L} m de longitud se suelta desde un ángulo de {θ}°. ¿Cuál es su velocidad máxima en el punto más bajo?',
    variables: [
      { name: 'longitud', symbol: 'L', min: 0.5, max: 3, decimals: 1, unit: 'm' },
      { name: 'angulo', symbol: 'θ', min: 15, max: 45, unit: '°' }
    ],
    question: 'Calcula la velocidad máxima.',
    answerUnit: 'm/s',
    calculateAnswer: (v) => Math.sqrt(2 * 9.8 * v.L * (1 - Math.cos(v.θ * Math.PI / 180))),
    solutionSteps: [
      'Datos: L = {L} m, θ = {θ}°',
      'Conservación de energía: mgh = ½mv²',
      'h = L(1 - cos(θ))',
      'v = √(2gL(1-cos(θ))) = {answer} m/s'
    ],
    formula: 'v = √(2gL(1-cos(θ)))',
    hints: ['La altura se calcula con trigonometría', 'La velocidad máxima está en el punto más bajo']
  },
  {
    id: 'energia-8',
    planetId: 'energia',
    title: 'Rampa con fricción',
    difficulty: 'dificil',
    template: 'Un objeto de {m} kg baja por una rampa de {h} m de altura con coeficiente de fricción μ = {mu}. ¿Con qué velocidad llega abajo?',
    variables: [
      { name: 'masa', symbol: 'm', min: 1, max: 10, unit: 'kg' },
      { name: 'altura', symbol: 'h', min: 2, max: 10, unit: 'm' },
      { name: 'coeficiente', symbol: 'mu', min: 0.1, max: 0.3, decimals: 2, unit: '' }
    ],
    question: 'Calcula la velocidad final (aproximada).',
    answerUnit: 'm/s',
    calculateAnswer: (v) => Math.sqrt(2 * 9.8 * v.h * (1 - v.mu)), // Simplificación
    solutionSteps: [
      'Datos: m = {m} kg, h = {h} m, μ = {mu}',
      'Energía inicial = Energía final + Trabajo por fricción',
      'mgh = ½mv² + W_fricción',
      'v ≈ √(2gh(1-μ)) = {answer} m/s'
    ],
    formula: 'mgh = ½mv² + W_f',
    hints: ['La fricción disipa energía', 'La velocidad es menor que sin fricción']
  },
  {
    id: 'energia-9',
    planetId: 'energia',
    title: 'Trabajo con ángulo',
    difficulty: 'medio',
    template: 'Una fuerza de {F} N se aplica a {θ}° de la horizontal y mueve un objeto {d} m. ¿Cuánto trabajo realiza?',
    variables: [
      { name: 'fuerza', symbol: 'F', min: 20, max: 100, unit: 'N' },
      { name: 'angulo', symbol: 'θ', min: 20, max: 60, unit: '°' },
      { name: 'distancia', symbol: 'd', min: 2, max: 15, unit: 'm' }
    ],
    question: 'Calcula el trabajo.',
    answerUnit: 'J',
    calculateAnswer: (v) => v.F * v.d * Math.cos(v.θ * Math.PI / 180),
    solutionSteps: [
      'Datos: F = {F} N, θ = {θ}°, d = {d} m',
      'Trabajo: W = F·d·cos(θ)',
      'W = {F} × {d} × cos({θ}°) = {answer} J'
    ],
    formula: 'W = F·d·cos(θ)',
    hints: ['Solo la componente horizontal de la fuerza hace trabajo', 'Si θ = 90°, W = 0']
  },
  {
    id: 'energia-10',
    planetId: 'energia',
    title: 'Velocidad desde energía',
    difficulty: 'facil',
    template: 'Un objeto de {m} kg tiene una energía cinética de {Ec} J. ¿Cuál es su velocidad?',
    variables: [
      { name: 'masa', symbol: 'm', min: 1, max: 10, unit: 'kg' },
      { name: 'energia', symbol: 'Ec', min: 10, max: 500, unit: 'J' }
    ],
    question: 'Calcula la velocidad.',
    answerUnit: 'm/s',
    calculateAnswer: (v) => Math.sqrt((2 * v.Ec) / v.m),
    solutionSteps: [
      'Datos: m = {m} kg, Ec = {Ec} J',
      'Despejar v de: Ec = ½mv²',
      'v = √(2Ec/m) = √(2 × {Ec} / {m}) = {answer} m/s'
    ],
    formula: 'v = √(2Ec/m)',
    hints: ['Despeja la velocidad de la fórmula de energía cinética', 'La velocidad es proporcional a la raíz de la energía']
  }
];

// ============================================
// PLANETA MOMENTO - Momento Lineal
// ============================================
export const momentoExercises: Exercise[] = [
  {
    id: 'momento-1',
    planetId: 'momento',
    title: 'Momento lineal básico',
    difficulty: 'facil',
    template: 'Un objeto de {m} kg se mueve a {v} m/s. ¿Cuál es su momento lineal?',
    variables: [
      { name: 'masa', symbol: 'm', min: 1, max: 20, unit: 'kg' },
      { name: 'velocidad', symbol: 'v', min: 2, max: 20, unit: 'm/s' }
    ],
    question: 'Calcula el momento lineal.',
    answerUnit: 'kg·m/s',
    calculateAnswer: (v) => v.m * v.v,
    solutionSteps: [
      'Datos: m = {m} kg, v = {v} m/s',
      'Momento lineal: p = m·v',
      'p = {m} × {v} = {answer} kg·m/s'
    ],
    formula: 'p = m·v',
    hints: ['El momento es una cantidad vectorial', 'Tiene la misma dirección que la velocidad']
  },
  {
    id: 'momento-2',
    planetId: 'momento',
    title: 'Impulso',
    difficulty: 'facil',
    template: 'Una fuerza de {F} N actúa durante {t} segundos sobre un objeto. ¿Cuál es el impulso?',
    variables: [
      { name: 'fuerza', symbol: 'F', min: 10, max: 100, unit: 'N' },
      { name: 'tiempo', symbol: 't', min: 0.1, max: 2, decimals: 1, unit: 's' }
    ],
    question: 'Calcula el impulso.',
    answerUnit: 'N·s',
    calculateAnswer: (v) => v.F * v.t,
    solutionSteps: [
      'Datos: F = {F} N, t = {t} s',
      'Impulso: J = F·Δt',
      'J = {F} × {t} = {answer} N·s'
    ],
    formula: 'J = F·Δt',
    hints: ['El impulso es igual al cambio de momento', '1 N·s = 1 kg·m/s']
  },
  {
    id: 'momento-3',
    planetId: 'momento',
    title: 'Cambio de velocidad por impulso',
    difficulty: 'medio',
    template: 'Un objeto de {m} kg recibe un impulso de {J} N·s. ¿Cuánto cambia su velocidad?',
    variables: [
      { name: 'masa', symbol: 'm', min: 1, max: 10, unit: 'kg' },
      { name: 'impulso', symbol: 'J', min: 5, max: 50, unit: 'N·s' }
    ],
    question: 'Calcula el cambio de velocidad.',
    answerUnit: 'm/s',
    calculateAnswer: (v) => v.J / v.m,
    solutionSteps: [
      'Datos: m = {m} kg, J = {J} N·s',
      'Impulso-momento: J = Δp = m·Δv',
      'Δv = J/m = {J}/{m} = {answer} m/s'
    ],
    formula: 'Δv = J/m',
    hints: ['El impulso causa cambio de momento', 'Δp = m·Δv']
  },
  {
    id: 'momento-4',
    planetId: 'momento',
    title: 'Conservación del momento',
    difficulty: 'medio',
    template: 'Un objeto de {m1} kg que se mueve a {v1} m/s choca con otro de {m2} kg en reposo. ¿Cuál es la velocidad final si quedan pegados?',
    variables: [
      { name: 'masa1', symbol: 'm1', min: 2, max: 10, unit: 'kg' },
      { name: 'velocidad1', symbol: 'v1', min: 5, max: 20, unit: 'm/s' },
      { name: 'masa2', symbol: 'm2', min: 2, max: 10, unit: 'kg' }
    ],
    question: 'Calcula la velocidad final.',
    answerUnit: 'm/s',
    calculateAnswer: (v) => (v.m1 * v.v1) / (v.m1 + v.m2),
    solutionSteps: [
      'Datos: m₁ = {m1} kg, v₁ = {v1} m/s, m₂ = {m2} kg',
      'Conservación: m₁v₁ = (m₁ + m₂)v_f',
      'v_f = m₁v₁/(m₁+m₂) = {answer} m/s'
    ],
    formula: 'v_f = m₁v₁/(m₁+m₂)',
    hints: ['El momento se conserva en colisiones', 'Es una colisión inelástica']
  },
  {
    id: 'momento-5',
    planetId: 'momento',
    title: 'Colisión elástica',
    difficulty: 'dificil',
    template: 'Un objeto de {m1} kg que se mueve a {v1} m/s choca elásticamente con otro de {m2} kg en reposo. ¿Cuál es la velocidad del primero después del choque?',
    variables: [
      { name: 'masa1', symbol: 'm1', min: 2, max: 10, unit: 'kg' },
      { name: 'velocidad1', symbol: 'v1', min: 5, max: 15, unit: 'm/s' },
      { name: 'masa2', symbol: 'm2', min: 2, max: 10, unit: 'kg' }
    ],
    question: 'Calcula v₁ después del choque.',
    answerUnit: 'm/s',
    calculateAnswer: (v) => v.v1 * (v.m1 - v.m2) / (v.m1 + v.m2),
    solutionSteps: [
      'Datos: m₁ = {m1} kg, v₁ = {v1} m/s, m₂ = {m2} kg',
      'Colisión elástica: v₁\' = v₁(m₁-m₂)/(m₁+m₂)',
      'v₁\' = {v1} × ({m1}-{m2})/({m1}+{m2}) = {answer} m/s'
    ],
    formula: 'v₁\' = v₁(m₁-m₂)/(m₁+m₂)',
    hints: ['En colisión elástica se conserva la energía', 'Si m₁ > m₂, sigue adelante; si m₁ < m₂, rebota']
  },
  {
    id: 'momento-6',
    planetId: 'momento',
    title: 'Fuerza promedio en impacto',
    difficulty: 'medio',
    template: 'Un objeto de {m} kg que viaja a {v} m/s se detiene en {t} ms. ¿Cuál es la fuerza promedio?',
    variables: [
      { name: 'masa', symbol: 'm', min: 0.5, max: 5, decimals: 1, unit: 'kg' },
      { name: 'velocidad', symbol: 'v', min: 5, max: 20, unit: 'm/s' },
      { name: 'tiempo', symbol: 't', min: 10, max: 100, unit: 'ms' }
    ],
    question: 'Calcula la fuerza promedio.',
    answerUnit: 'N',
    calculateAnswer: (v) => (v.m * v.v) / (v.t / 1000),
    solutionSteps: [
      'Datos: m = {m} kg, v = {v} m/s, t = {t} ms = {t_s} s',
      'F = Δp/Δt = mv/t',
      'F = {m} × {v} / {t_s} = {answer} N'
    ],
    formula: 'F = Δp/Δt',
    hints: ['La fuerza es grande cuando el tiempo es corto', 'Por eso los airbags aumentan el tiempo de impacto']
  },
  {
    id: 'momento-7',
    planetId: 'momento',
    title: 'Retroceso de un arma',
    difficulty: 'medio',
    template: 'Un rifle de {M} kg dispara una bala de {m} g a {v} m/s. ¿Cuál es la velocidad de retroceso del rifle?',
    variables: [
      { name: 'masaRifle', symbol: 'M', min: 3, max: 8, decimals: 1, unit: 'kg' },
      { name: 'masaBala', symbol: 'm', min: 5, max: 15, unit: 'g' },
      { name: 'velocidad', symbol: 'v', min: 200, max: 500, unit: 'm/s' }
    ],
    question: 'Calcula la velocidad de retroceso.',
    answerUnit: 'm/s',
    calculateAnswer: (v) => (v.m / 1000 * v.v) / v.M,
    solutionSteps: [
      'Datos: M = {M} kg, m = {m} g = {m_kg} kg, v_bala = {v} m/s',
      'Conservación del momento: m·v = M·V_rifle',
      'V_rifle = m·v/M = {answer} m/s'
    ],
    formula: 'V_rifle = m·v/M',
    hints: ['El momento total inicial es cero', 'Los momentos son iguales y opuestos']
  },
  {
    id: 'momento-8',
    planetId: 'momento',
    title: 'Explosión en reposo',
    difficulty: 'medio',
    template: 'Un objeto de {M} kg en reposo explota en dos fragmentos de {m1} kg y {m2} kg. Si el primero sale a {v1} m/s, ¿a qué velocidad sale el segundo?',
    variables: [
      { name: 'masaTotal', symbol: 'M', min: 5, max: 20, unit: 'kg' },
      { name: 'masa1', symbol: 'm1', min: 2, max: 10, unit: 'kg' },
      { name: 'velocidad1', symbol: 'v1', min: 5, max: 20, unit: 'm/s' }
    ],
    question: 'Calcula la velocidad del segundo fragmento.',
    answerUnit: 'm/s',
    calculateAnswer: (v) => (v.m1 * v.v1) / (v.M - v.m1),
    solutionSteps: [
      'Datos: M = {M} kg, m₁ = {m1} kg, v₁ = {v1} m/s',
      'm₂ = M - m₁ = {m2} kg',
      'Conservación: m₁v₁ = m₂v₂',
      'v₂ = m₁v₁/m₂ = {answer} m/s'
    ],
    formula: 'v₂ = m₁v₁/m₂',
    hints: ['Los fragmentos van en direcciones opuestas', 'El momento total se conserva']
  },
  {
    id: 'momento-9',
    planetId: 'momento',
    title: 'Colisión en dos dimensiones',
    difficulty: 'dificil',
    template: 'Un objeto de {m1} kg con v₁ = {v1} m/s choca con otro de {m2} kg con v₂ = {v2} m/s en ángulo recto. ¿Cuál es el momento total?',
    variables: [
      { name: 'masa1', symbol: 'm1', min: 2, max: 8, unit: 'kg' },
      { name: 'velocidad1', symbol: 'v1', min: 3, max: 10, unit: 'm/s' },
      { name: 'masa2', symbol: 'm2', min: 2, max: 8, unit: 'kg' },
      { name: 'velocidad2', symbol: 'v2', min: 3, max: 10, unit: 'm/s' }
    ],
    question: 'Calcula la magnitud del momento total.',
    answerUnit: 'kg·m/s',
    calculateAnswer: (v) => Math.sqrt(Math.pow(v.m1 * v.v1, 2) + Math.pow(v.m2 * v.v2, 2)),
    solutionSteps: [
      'p₁ = m₁v₁ = {p1} kg·m/s (dirección x)',
      'p₂ = m₂v₂ = {p2} kg·m/s (dirección y)',
      'p_total = √(p₁² + p₂²) = {answer} kg·m/s'
    ],
    formula: 'p = √(p₁² + p₂²)',
    hints: ['Usa el teorema de Pitágoras', 'Los momentos perpendiculares se suman vectorialmente']
  },
  {
    id: 'momento-10',
    planetId: 'momento',
    title: 'Fuerza variable',
    difficulty: 'dificil',
    template: 'La fuerza sobre un objeto varía de {F1} N a {F2} N linealmente en {t} segundos. Si el objeto parte del reposo y tiene masa {m} kg, ¿cuál es su velocidad final?',
    variables: [
      { name: 'fuerza1', symbol: 'F1', min: 0, max: 50, unit: 'N' },
      { name: 'fuerza2', symbol: 'F2', min: 50, max: 150, unit: 'N' },
      { name: 'tiempo', symbol: 't', min: 1, max: 5, unit: 's' },
      { name: 'masa', symbol: 'm', min: 1, max: 10, unit: 'kg' }
    ],
    question: 'Calcula la velocidad final.',
    answerUnit: 'm/s',
    calculateAnswer: (v) => ((v.F1 + v.F2) / 2 * v.t) / v.m,
    solutionSteps: [
      'Fuerza promedio: F_avg = (F₁ + F₂)/2',
      'Impulso: J = F_avg × t',
      'Δp = J → mv = F_avg × t',
      'v = {answer} m/s'
    ],
    formula: 'J = F_avg × t',
    hints: ['El área bajo la curva F-t es el impulso', 'Para fuerza variable, usa el valor promedio']
  }
];

// ============================================
// PLANETA CALOR - Calor y Temperatura
// ============================================
export const calorExercises: Exercise[] = [
  {
    id: 'calor-1',
    planetId: 'calor',
    title: 'Calor específico',
    difficulty: 'facil',
    template: '¿Cuánto calor se necesita para elevar la temperatura de {m} kg de agua de {T1}°C a {T2}°C? (c_agua = 4186 J/kg·°C)',
    variables: [
      { name: 'masa', symbol: 'm', min: 0.5, max: 5, decimals: 1, unit: 'kg' },
      { name: 'temp1', symbol: 'T1', min: 20, max: 40, unit: '°C' },
      { name: 'temp2', symbol: 'T2', min: 50, max: 90, unit: '°C' }
    ],
    question: 'Calcula el calor necesario.',
    answerUnit: 'kJ',
    calculateAnswer: (v) => (v.m * 4186 * (v.T2 - v.T1)) / 1000,
    solutionSteps: [
      'Datos: m = {m} kg, ΔT = {T2} - {T1} = {dT}°C',
      'Q = m·c·ΔT',
      'Q = {m} × 4186 × {dT} = {answer} kJ'
    ],
    formula: 'Q = m·c·ΔT',
    hints: ['El agua tiene un calor específico muy alto', 'c_agua = 4186 J/(kg·°C)']
  },
  {
    id: 'calor-2',
    planetId: 'calor',
    title: 'Equilibrio térmico',
    difficulty: 'medio',
    template: '{m1} kg de agua a {T1}°C se mezcla con {m2} kg de agua a {T2}°C. ¿Cuál es la temperatura de equilibrio?',
    variables: [
      { name: 'masa1', symbol: 'm1', min: 0.5, max: 3, decimals: 1, unit: 'kg' },
      { name: 'temp1', symbol: 'T1', min: 60, max: 90, unit: '°C' },
      { name: 'masa2', symbol: 'm2', min: 0.5, max: 3, decimals: 1, unit: 'kg' },
      { name: 'temp2', symbol: 'T2', min: 10, max: 30, unit: '°C' }
    ],
    question: 'Calcula la temperatura de equilibrio.',
    answerUnit: '°C',
    calculateAnswer: (v) => (v.m1 * v.T1 + v.m2 * v.T2) / (v.m1 + v.m2),
    solutionSteps: [
      'Datos: m₁ = {m1} kg a T₁ = {T1}°C, m₂ = {m2} kg a T₂ = {T2}°C',
      'Equilibrio: Q_cedido = Q_absorbido',
      'm₁c(T₁-T_eq) = m₂c(T_eq-T₂)',
      'T_eq = (m₁T₁ + m₂T₂)/(m₁+m₂) = {answer}°C'
    ],
    formula: 'T_eq = (m₁T₁ + m₂T₂)/(m₁+m₂)',
    hints: ['El calor cedido = calor absorbido', 'Si es la misma sustancia, se simplifica']
  },
  {
    id: 'calor-3',
    planetId: 'calor',
    title: 'Calor latente de fusión',
    difficulty: 'medio',
    template: '¿Cuánto calor se necesita para fundir {m} kg de hielo a 0°C? (L_f = 334000 J/kg)',
    variables: [
      { name: 'masa', symbol: 'm', min: 0.1, max: 2, decimals: 2, unit: 'kg' }
    ],
    question: 'Calcula el calor necesario.',
    answerUnit: 'kJ',
    calculateAnswer: (v) => (v.m * 334000) / 1000,
    solutionSteps: [
      'Datos: m = {m} kg, L_f = 334000 J/kg',
      'Calor latente: Q = m·L_f',
      'Q = {m} × 334000 = {answer} kJ'
    ],
    formula: 'Q = m·L_f',
    hints: ['El calor latente es para cambio de fase', 'La temperatura no cambia durante la fusión']
  },
  {
    id: 'calor-4',
    planetId: 'calor',
    title: 'Calor latente de vaporización',
    difficulty: 'medio',
    template: '¿Cuánto calor se necesita para vaporizar {m} kg de agua a 100°C? (L_v = 2.26×10⁶ J/kg)',
    variables: [
      { name: 'masa', symbol: 'm', min: 0.1, max: 1, decimals: 2, unit: 'kg' }
    ],
    question: 'Calcula el calor necesario.',
    answerUnit: 'kJ',
    calculateAnswer: (v) => (v.m * 2.26e6) / 1000,
    solutionSteps: [
      'Datos: m = {m} kg, L_v = 2.26×10⁶ J/kg',
      'Calor latente: Q = m·L_v',
      'Q = {m} × 2.26×10⁶ = {answer} kJ'
    ],
    formula: 'Q = m·L_v',
    hints: ['Vaporizar requiere más energía que fundir', 'L_v agua = 2260 kJ/kg']
  },
  {
    id: 'calor-5',
    planetId: 'calor',
    title: 'Dilatación lineal',
    difficulty: 'facil',
    template: 'Una barra de {L} m se calienta desde {T1}°C hasta {T2}°C. Si el coeficiente de dilatación es α = {alpha}×10⁻⁶ /°C, ¿cuánto se alarga?',
    variables: [
      { name: 'longitud', symbol: 'L', min: 1, max: 10, unit: 'm' },
      { name: 'temp1', symbol: 'T1', min: 20, max: 40, unit: '°C' },
      { name: 'temp2', symbol: 'T2', min: 60, max: 120, unit: '°C' },
      { name: 'coeficiente', symbol: 'alpha', min: 10, max: 25, unit: '×10⁻⁶/°C' }
    ],
    question: 'Calcula el cambio de longitud.',
    answerUnit: 'mm',
    calculateAnswer: (v) => v.L * (v.alpha * 1e-6) * (v.T2 - v.T1) * 1000,
    solutionSteps: [
      'Datos: L₀ = {L} m, ΔT = {dT}°C, α = {alpha}×10⁻⁶/°C',
      'Dilatación lineal: ΔL = L₀·α·ΔT',
      'ΔL = {L} × {alpha}×10⁻⁶ × {dT} = {answer} mm'
    ],
    formula: 'ΔL = L₀·α·ΔT',
    hints: ['La dilatación es proporcional a la longitud y el cambio de temperatura', 'Los metales se dilatan más que otros materiales']
  },
  {
    id: 'calor-6',
    planetId: 'calor',
    title: 'Conversión de temperatura',
    difficulty: 'facil',
    template: 'Una temperatura es {T}°F. ¿Cuánto es en grados Celsius?',
    variables: [
      { name: 'temperatura', symbol: 'T', min: 50, max: 200, unit: '°F' }
    ],
    question: 'Convierte a Celsius.',
    answerUnit: '°C',
    calculateAnswer: (v) => (v.T - 32) * 5 / 9,
    solutionSteps: [
      'Datos: T = {T}°F',
      'Conversión: T(°C) = (T(°F) - 32) × 5/9',
      'T = ({T} - 32) × 5/9 = {answer}°C'
    ],
    formula: 'T(°C) = (T(°F) - 32) × 5/9',
    hints: ['El punto de congelación del agua es 32°F = 0°C', 'El punto de ebullición es 212°F = 100°C']
  },
  {
    id: 'calor-7',
    planetId: 'calor',
    title: 'Calor específico desconocido',
    difficulty: 'medio',
    template: 'Un bloque de {m1} kg de metal a {T1}°C se coloca en {m2} kg de agua a {T2}°C. La temperatura final es {Tf}°C. ¿Cuál es el calor específico del metal?',
    variables: [
      { name: 'masaMetal', symbol: 'm1', min: 0.2, max: 1, decimals: 2, unit: 'kg' },
      { name: 'tempMetal', symbol: 'T1', min: 80, max: 150, unit: '°C' },
      { name: 'masaAgua', symbol: 'm2', min: 0.5, max: 2, decimals: 1, unit: 'kg' },
      { name: 'tempAgua', symbol: 'T2', min: 15, max: 25, unit: '°C' },
      { name: 'tempFinal', symbol: 'Tf', min: 30, max: 50, unit: '°C' }
    ],
    question: 'Calcula el calor específico del metal.',
    answerUnit: 'J/(kg·°C)',
    calculateAnswer: (v) => (v.m2 * 4186 * (v.Tf - v.T2)) / (v.m1 * (v.T1 - v.Tf)),
    solutionSteps: [
      'Calor cedido por metal = Calor absorbido por agua',
      'm₁·c·(T₁-T_f) = m₂·c_agua·(T_f-T₂)',
      'c = m₂·c_agua·(T_f-T₂) / (m₁·(T₁-T_f))',
      'c = {answer} J/(kg·°C)'
    ],
    formula: 'c = m₂·c_agua·ΔT_agua / (m₁·ΔT_metal)',
    hints: ['Este es el método de las mezclas', 'Se usa para determinar calores específicos']
  },
  {
    id: 'calor-8',
    planetId: 'calor',
    title: 'Hielo que se derrite',
    difficulty: 'dificil',
    template: 'Se tienen {m} g de hielo a -{T}°C. ¿Cuánto calor se necesita para convertirlo en agua a 20°C?',
    variables: [
      { name: 'masa', symbol: 'm', min: 50, max: 300, unit: 'g' },
      { name: 'tempInicial', symbol: 'T', min: 5, max: 20, unit: '°C' }
    ],
    question: 'Calcula el calor total.',
    answerUnit: 'kJ',
    calculateAnswer: (v) => {
      const m = v.m / 1000; // kg
      const Q1 = m * 2090 * v.T; // Calentar hielo
      const Q2 = m * 334000; // Fundir
      const Q3 = m * 4186 * 20; // Calentar agua
      return (Q1 + Q2 + Q3) / 1000;
    },
    solutionSteps: [
      '1. Calentar hielo de -{T}°C a 0°C: Q₁ = m·c_hielo·{T}',
      '2. Fundir hielo a 0°C: Q₂ = m·L_f',
      '3. Calentar agua de 0°C a 20°C: Q₃ = m·c_agua·20',
      'Q_total = Q₁ + Q₂ + Q₃ = {answer} kJ'
    ],
    formula: 'Q_total = Q₁ + Q₂ + Q₃',
    hints: ['Son tres procesos diferentes', 'c_hielo ≈ 2090 J/(kg·°C)']
  },
  {
    id: 'calor-9',
    planetId: 'calor',
    title: 'Eficiencia de transferencia',
    difficulty: 'medio',
    template: 'Un calentador entrega {P} W de potencia. Si se usa para calentar {m} kg de agua desde 20°C hasta 80°C, ¿cuánto tiempo tarda?',
    variables: [
      { name: 'potencia', symbol: 'P', min: 500, max: 2000, unit: 'W' },
      { name: 'masa', symbol: 'm', min: 0.5, max: 3, decimals: 1, unit: 'kg' }
    ],
    question: 'Calcula el tiempo.',
    answerUnit: 'min',
    calculateAnswer: (v) => (v.m * 4186 * 60) / v.P / 60,
    solutionSteps: [
      'Datos: P = {P} W, m = {m} kg, ΔT = 60°C',
      'Energía necesaria: Q = m·c·ΔT = {Q} J',
      'Tiempo: t = Q/P',
      't = {answer} min'
    ],
    formula: 't = m·c·ΔT / P',
    hints: ['Potencia es energía por unidad de tiempo', 'P = Q/t']
  },
  {
    id: 'calor-10',
    planetId: 'calor',
    title: 'Capacidad calorífica',
    difficulty: 'facil',
    template: 'Un objeto necesita {Q} kJ de calor para aumentar su temperatura en {dT}°C. ¿Cuál es su capacidad calorífica?',
    variables: [
      { name: 'calor', symbol: 'Q', min: 5, max: 50, unit: 'kJ' },
      { name: 'deltaT', symbol: 'dT', min: 10, max: 50, unit: '°C' }
    ],
    question: 'Calcula la capacidad calorífica.',
    answerUnit: 'J/°C',
    calculateAnswer: (v) => (v.Q * 1000) / v.dT,
    solutionSteps: [
      'Datos: Q = {Q} kJ = {Q_J} J, ΔT = {dT}°C',
      'Capacidad calorífica: C = Q/ΔT',
      'C = {Q_J} / {dT} = {answer} J/°C'
    ],
    formula: 'C = Q/ΔT',
    hints: ['La capacidad calorífica es del objeto completo', 'C = m·c para un objeto']
  }
];

// ============================================
// PLANETA ONDAS - Ondas Mecánicas
// ============================================
export const ondasExercises: Exercise[] = [
  {
    id: 'ondas-1',
    planetId: 'ondas',
    title: 'Velocidad de onda',
    difficulty: 'facil',
    template: 'Una onda tiene longitud de onda de {lambda} m y frecuencia de {f} Hz. ¿Cuál es su velocidad?',
    variables: [
      { name: 'longitud', symbol: 'lambda', min: 0.5, max: 10, decimals: 1, unit: 'm' },
      { name: 'frecuencia', symbol: 'f', min: 10, max: 100, unit: 'Hz' }
    ],
    question: 'Calcula la velocidad.',
    answerUnit: 'm/s',
    calculateAnswer: (v) => v.lambda * v.f,
    solutionSteps: [
      'Datos: λ = {lambda} m, f = {f} Hz',
      'Velocidad de onda: v = λ·f',
      'v = {lambda} × {f} = {answer} m/s'
    ],
    formula: 'v = λ·f',
    hints: ['La velocidad de la onda es constante en un medio', 'λ = v/f o f = v/λ']
  },
  {
    id: 'ondas-2',
    planetId: 'ondas',
    title: 'Período y frecuencia',
    difficulty: 'facil',
    template: 'Una onda tiene un período de {T} segundos. ¿Cuál es su frecuencia?',
    variables: [
      { name: 'periodo', symbol: 'T', min: 0.01, max: 1, decimals: 3, unit: 's' }
    ],
    question: 'Calcula la frecuencia.',
    answerUnit: 'Hz',
    calculateAnswer: (v) => 1 / v.T,
    solutionSteps: [
      'Datos: T = {T} s',
      'Frecuencia: f = 1/T',
      'f = 1/{T} = {answer} Hz'
    ],
    formula: 'f = 1/T',
    hints: ['El período es el tiempo de una oscilación', 'La frecuencia es oscilaciones por segundo']
  },
  {
    id: 'ondas-3',
    planetId: 'ondas',
    title: 'Frecuencia angular',
    difficulty: 'facil',
    template: 'Una onda tiene frecuencia de {f} Hz. ¿Cuál es su frecuencia angular?',
    variables: [
      { name: 'frecuencia', symbol: 'f', min: 5, max: 100, unit: 'Hz' }
    ],
    question: 'Calcula la frecuencia angular.',
    answerUnit: 'rad/s',
    calculateAnswer: (v) => 2 * Math.PI * v.f,
    solutionSteps: [
      'Datos: f = {f} Hz',
      'Frecuencia angular: ω = 2πf',
      'ω = 2π × {f} = {answer} rad/s'
    ],
    formula: 'ω = 2πf',
    hints: ['ω se mide en radianes por segundo', '2π rad = una oscilación completa']
  },
  {
    id: 'ondas-4',
    planetId: 'ondas',
    title: 'Número de onda',
    difficulty: 'medio',
    template: 'Una onda tiene longitud de onda de {lambda} m. ¿Cuál es su número de onda?',
    variables: [
      { name: 'longitud', symbol: 'lambda', min: 0.1, max: 5, decimals: 2, unit: 'm' }
    ],
    question: 'Calcula el número de onda.',
    answerUnit: 'rad/m',
    calculateAnswer: (v) => 2 * Math.PI / v.lambda,
    solutionSteps: [
      'Datos: λ = {lambda} m',
      'Número de onda: k = 2π/λ',
      'k = 2π / {lambda} = {answer} rad/m'
    ],
    formula: 'k = 2π/λ',
    hints: ['k representa cuántas ondas caben en 2π metros', 'Es análogo a ω para el espacio']
  },
  {
    id: 'ondas-5',
    planetId: 'ondas',
    title: 'Ecuación de onda',
    difficulty: 'medio',
    template: 'Una onda tiene amplitud A = {A} m, longitud de onda λ = {lambda} m y frecuencia f = {f} Hz. ¿Cuál es el desplazamiento en x=0, t=0?',
    variables: [
      { name: 'amplitud', symbol: 'A', min: 0.1, max: 2, decimals: 2, unit: 'm' },
      { name: 'longitud', symbol: 'lambda', min: 1, max: 10, unit: 'm' },
      { name: 'frecuencia', symbol: 'f', min: 1, max: 20, unit: 'Hz' }
    ],
    question: 'Calcula el desplazamiento en x=0, t=0.',
    answerUnit: 'm',
    calculateAnswer: (v) => 0, // En x=0, t=0, la fase es 0
    solutionSteps: [
      'Ecuación de onda: y = A·sin(kx - ωt)',
      'En x = 0, t = 0:',
      'y = {A}·sin(0) = {answer} m'
    ],
    formula: 'y = A·sin(kx - ωt)',
    hints: ['La fase inicial depende de la onda', 'Asumimos fase inicial cero']
  },
  {
    id: 'ondas-6',
    planetId: 'ondas',
    title: 'Velocidad del sonido',
    difficulty: 'medio',
    template: 'El sonido viaja a {v} m/s en un medio. Si la frecuencia es {f} Hz, ¿cuál es la longitud de onda?',
    variables: [
      { name: 'velocidad', symbol: 'v', min: 200, max: 500, unit: 'm/s' },
      { name: 'frecuencia', symbol: 'f', min: 100, max: 2000, unit: 'Hz' }
    ],
    question: 'Calcula la longitud de onda.',
    answerUnit: 'm',
    calculateAnswer: (v) => v.v / v.f,
    solutionSteps: [
      'Datos: v = {v} m/s, f = {f} Hz',
      'Longitud de onda: λ = v/f',
      'λ = {v} / {f} = {answer} m'
    ],
    formula: 'λ = v/f',
    hints: ['El sonido viaja a ~343 m/s en el aire', 'La longitud de onda depende del medio']
  },
  {
    id: 'ondas-7',
    planetId: 'ondas',
    title: 'Onda en cuerda',
    difficulty: 'medio',
    template: 'Una cuerda de {L} m tiene {n} nodos en un modo de vibración. Si la velocidad de onda es {v} m/s, ¿cuál es la frecuencia?',
    variables: [
      { name: 'longitud', symbol: 'L', min: 0.5, max: 5, unit: 'm' },
      { name: 'nodos', symbol: 'n', min: 2, max: 5, unit: '' },
      { name: 'velocidad', symbol: 'v', min: 10, max: 100, unit: 'm/s' }
    ],
    question: 'Calcula la frecuencia.',
    answerUnit: 'Hz',
    calculateAnswer: (v) => (v.n - 1) * v.v / (2 * v.L),
    solutionSteps: [
      'Datos: L = {L} m, n = {n} nodos, v = {v} m/s',
      'Armónicos: λ_n = 2L/n',
      'Para n nodos, el modo es n-1',
      'f = (n-1)·v/(2L) = {answer} Hz'
    ],
    formula: 'f_n = n·v/(2L)',
    hints: ['Los armónicos tienen frecuencias múltiplos', 'El fundamental tiene 2 nodos']
  },
  {
    id: 'ondas-8',
    planetId: 'ondas',
    title: 'Energía de una onda',
    difficulty: 'dificil',
    template: 'Una onda en una cuerda tiene amplitud {A} cm, frecuencia {f} Hz, y la masa por unidad de longitud es {mu} kg/m. ¿Cuál es la potencia promedio si la tensión es {T} N?',
    variables: [
      { name: 'amplitud', symbol: 'A', min: 1, max: 10, unit: 'cm' },
      { name: 'frecuencia', symbol: 'f', min: 5, max: 50, unit: 'Hz' },
      { name: 'densidad', symbol: 'mu', min: 0.01, max: 0.1, decimals: 3, unit: 'kg/m' },
      { name: 'tension', symbol: 'T', min: 10, max: 100, unit: 'N' }
    ],
    question: 'Calcula la potencia promedio.',
    answerUnit: 'W',
    calculateAnswer: (v) => 0.5 * v.mu * Math.pow(v.A/100, 2) * Math.pow(2*Math.PI*v.f, 2) * Math.sqrt(v.T/v.mu),
    solutionSteps: [
      'v = √(T/μ) = {vel} m/s',
      'ω = 2πf = {omega} rad/s',
      'Potencia: P = ½μA²ω²v',
      'P = {answer} W'
    ],
    formula: 'P = ½μA²ω²v',
    hints: ['La potencia es proporcional al cuadrado de la amplitud', 'También al cuadrado de la frecuencia']
  },
  {
    id: 'ondas-9',
    planetId: 'ondas',
    title: 'Interferencia constructiva',
    difficulty: 'medio',
    template: 'Dos fuentes coherentes emiten ondas con longitud de onda {lambda} m. Un punto está a {d1} m de una fuente y {d2} m de la otra. ¿Hay interferencia constructiva o destructiva?',
    variables: [
      { name: 'longitud', symbol: 'lambda', min: 0.5, max: 2, decimals: 1, unit: 'm' },
      { name: 'distancia1', symbol: 'd1', min: 3, max: 10, unit: 'm' },
      { name: 'distancia2', symbol: 'd2', min: 3, max: 10, unit: 'm' }
    ],
    question: 'Calcula la diferencia de camino (responde en longitudes de onda).',
    answerUnit: 'λ',
    calculateAnswer: (v) => Math.abs(v.d1 - v.d2) / v.lambda,
    solutionSteps: [
      'Diferencia de camino: Δ = |d₁ - d₂|',
      'Δ = |{d1} - {d2}| = {delta} m',
      'Δ/λ = {delta}/{lambda} = {answer} λ',
      'Si es entero: constructiva; si es semi-entero: destructiva'
    ],
    formula: 'Δ = |d₁ - d₂|',
    hints: ['Diferencia = nλ → constructiva', 'Diferencia = (n+½)λ → destructiva']
  },
  {
    id: 'ondas-10',
    planetId: 'ondas',
    title: 'Efecto Doppler',
    difficulty: 'dificil',
    template: 'Una fuente de sonido con frecuencia {f0} Hz se acerca a {vs} m/s hacia un observador en reposo. ¿Qué frecuencia percibe el observador? (v_sonido = 340 m/s)',
    variables: [
      { name: 'frecuencia', symbol: 'f0', min: 200, max: 1000, unit: 'Hz' },
      { name: 'velocidad', symbol: 'vs', min: 10, max: 50, unit: 'm/s' }
    ],
    question: 'Calcula la frecuencia percibida.',
    answerUnit: 'Hz',
    calculateAnswer: (v) => v.f0 * 340 / (340 - v.vs),
    solutionSteps: [
      'Datos: f₀ = {f0} Hz, v_s = {vs} m/s (acerca)',
      'Efecto Doppler: f = f₀·v/(v-v_s)',
      'f = {f0} × 340/(340-{vs}) = {answer} Hz'
    ],
    formula: 'f = f₀·v/(v-v_s)',
    hints: ['La frecuencia aumenta cuando la fuente se acerca', 'Disminuye cuando se aleja']
  }
];

// ============================================
// PLANETA MAGNETISMO - Inducción y Magnetismo
// ============================================
export const magnetismoExercises: Exercise[] = [
  {
    id: 'magnetismo-1',
    planetId: 'magnetismo',
    title: 'Fuerza de Lorentz',
    difficulty: 'facil',
    template: 'Una carga de {q} μC se mueve a {v}×10⁵ m/s perpendicular a un campo magnético de {B} T. ¿Cuál es la fuerza magnética?',
    variables: [
      { name: 'carga', symbol: 'q', min: 1, max: 10, unit: 'μC' },
      { name: 'velocidad', symbol: 'v', min: 1, max: 10, unit: '×10⁵ m/s' },
      { name: 'campo', symbol: 'B', min: 0.1, max: 1, decimals: 2, unit: 'T' }
    ],
    question: 'Calcula la fuerza magnética.',
    answerUnit: 'N',
    calculateAnswer: (v) => (v.q * 1e-6) * (v.v * 1e5) * v.B,
    solutionSteps: [
      'Datos: q = {q} μC, v = {v}×10⁵ m/s, B = {B} T',
      'Fuerza de Lorentz: F = q·v·B (perpendicular)',
      'F = {q}×10⁻⁶ × {v}×10⁵ × {B} = {answer} N'
    ],
    formula: 'F = q·v·B',
    hints: ['La fuerza es perpendicular a v y B', 'Usa la regla de la mano derecha']
  },
  {
    id: 'magnetismo-2',
    planetId: 'magnetismo',
    title: 'Radio de trayectoria circular',
    difficulty: 'medio',
    template: 'Un electrón (m = 9.1×10⁻³¹ kg, q = 1.6×10⁻¹⁹ C) entra perpendicular a un campo de {B} T con velocidad {v}×10⁶ m/s. ¿Cuál es el radio de su trayectoria?',
    variables: [
      { name: 'campo', symbol: 'B', min: 0.01, max: 0.1, decimals: 3, unit: 'T' },
      { name: 'velocidad', symbol: 'v', min: 1, max: 10, unit: '×10⁶ m/s' }
    ],
    question: 'Calcula el radio.',
    answerUnit: 'cm',
    calculateAnswer: (v) => (9.1e-31 * v.v * 1e6) / (1.6e-19 * v.B) * 100,
    solutionSteps: [
      'Datos: m = 9.1×10⁻³¹ kg, q = 1.6×10⁻¹⁹ C',
      'v = {v}×10⁶ m/s, B = {B} T',
      'Radio: r = mv/(qB)',
      'r = {answer} cm'
    ],
    formula: 'r = mv/(qB)',
    hints: ['La fuerza magnética es centrípeta', 'La partícula sigue un círculo']
  },
  {
    id: 'magnetismo-3',
    planetId: 'magnetismo',
    title: 'Flujo magnético',
    difficulty: 'facil',
    template: 'Un campo magnético de {B} T atraviesa perpendicularmente una espira de área {A} cm². ¿Cuál es el flujo magnético?',
    variables: [
      { name: 'campo', symbol: 'B', min: 0.1, max: 2, decimals: 2, unit: 'T' },
      { name: 'area', symbol: 'A', min: 10, max: 100, unit: 'cm²' }
    ],
    question: 'Calcula el flujo magnético.',
    answerUnit: 'mWb',
    calculateAnswer: (v) => v.B * (v.A / 10000) * 1000,
    solutionSteps: [
      'Datos: B = {B} T, A = {A} cm² = {A_m} m²',
      'Flujo magnético: Φ = B·A·cos(θ)',
      'Φ = {B} × {A_m} × cos(0°) = {answer} mWb'
    ],
    formula: 'Φ = B·A·cos(θ)',
    hints: ['El flujo máximo es cuando θ = 0°', '1 Wb = 1 T·m²']
  },
  {
    id: 'magnetismo-4',
    planetId: 'magnetismo',
    title: 'FEM inducida',
    difficulty: 'medio',
    template: 'El flujo magnético a través de una espira cambia de {Phi1} Wb a {Phi2} Wb en {t} segundos. ¿Cuál es la FEM inducida?',
    variables: [
      { name: 'flujo1', symbol: 'Phi1', min: 0.01, max: 0.1, decimals: 3, unit: 'Wb' },
      { name: 'flujo2', symbol: 'Phi2', min: 0.1, max: 0.5, decimals: 3, unit: 'Wb' },
      { name: 'tiempo', symbol: 't', min: 0.1, max: 1, decimals: 2, unit: 's' }
    ],
    question: 'Calcula la FEM inducida.',
    answerUnit: 'V',
    calculateAnswer: (v) => Math.abs(v.Phi2 - v.Phi1) / v.t,
    solutionSteps: [
      'Datos: Φ₁ = {Phi1} Wb, Φ₂ = {Phi2} Wb, t = {t} s',
      'Ley de Faraday: ε = -ΔΦ/Δt',
      '|ε| = |{Phi2} - {Phi1}| / {t} = {answer} V'
    ],
    formula: 'ε = -ΔΦ/Δt',
    hints: ['El signo negativo es la ley de Lenz', 'Se opone al cambio']
  },
  {
    id: 'magnetismo-5',
    planetId: 'magnetismo',
    title: 'Campo de un conductor recto',
    difficulty: 'medio',
    template: 'Un conductor recto lleva una corriente de {I} A. ¿Cuál es el campo magnético a {r} cm del conductor?',
    variables: [
      { name: 'corriente', symbol: 'I', min: 5, max: 50, unit: 'A' },
      { name: 'distancia', symbol: 'r', min: 1, max: 20, unit: 'cm' }
    ],
    question: 'Calcula el campo magnético.',
    answerUnit: 'μT',
    calculateAnswer: (v) => (4e-7 * Math.PI * v.I) / (v.r / 100) * 1e6,
    solutionSteps: [
      'Datos: I = {I} A, r = {r} cm = {r_m} m',
      'Campo de conductor: B = μ₀I/(2πr)',
      'B = 4π×10⁻⁷ × {I} / (2π × {r_m}) = {answer} μT'
    ],
    formula: 'B = μ₀I/(2πr)',
    hints: ['μ₀ = 4π×10⁻⁷ T·m/A', 'El campo forma círculos alrededor del conductor']
  },
  {
    id: 'magnetismo-6',
    planetId: 'magnetismo',
    title: 'Fuerza entre conductores',
    difficulty: 'dificil',
    template: 'Dos conductores paralelos llevan corrientes de {I1} A y {I2} A en el mismo sentido, separados por {d} cm. ¿Cuál es la fuerza por metro entre ellos?',
    variables: [
      { name: 'corriente1', symbol: 'I1', min: 5, max: 30, unit: 'A' },
      { name: 'corriente2', symbol: 'I2', min: 5, max: 30, unit: 'A' },
      { name: 'distancia', symbol: 'd', min: 1, max: 10, unit: 'cm' }
    ],
    question: 'Calcula la fuerza por unidad de longitud.',
    answerUnit: 'mN/m',
    calculateAnswer: (v) => (4e-7 * Math.PI * v.I1 * v.I2) / (v.d / 100) * 1000,
    solutionSteps: [
      'Datos: I₁ = {I1} A, I₂ = {I2} A, d = {d} cm',
      'Fuerza por unidad de longitud: F/L = μ₀I₁I₂/(2πd)',
      'F/L = {answer} mN/m (atractiva, mismo sentido)'
    ],
    formula: 'F/L = μ₀I₁I₂/(2πd)',
    hints: ['Corrientes en mismo sentido se atraen', 'En sentidos opuestos se repelen']
  },
  {
    id: 'magnetismo-7',
    planetId: 'magnetismo',
    title: 'Campo dentro de un solenoide',
    difficulty: 'medio',
    template: 'Un solenoide de {n} vueltas por metro lleva una corriente de {I} A. ¿Cuál es el campo magnético en su interior?',
    variables: [
      { name: 'vueltas', symbol: 'n', min: 100, max: 1000, unit: 'vueltas/m' },
      { name: 'corriente', symbol: 'I', min: 0.5, max: 5, decimals: 1, unit: 'A' }
    ],
    question: 'Calcula el campo magnético.',
    answerUnit: 'mT',
    calculateAnswer: (v) => (4e-7 * Math.PI * v.n * v.I) * 1000,
    solutionSteps: [
      'Datos: n = {n} vueltas/m, I = {I} A',
      'Campo en solenoide: B = μ₀nI',
      'B = 4π×10⁻⁷ × {n} × {I} = {answer} mT'
    ],
    formula: 'B = μ₀nI',
    hints: ['El campo es uniforme dentro del solenoide', 'Es aproximadamente cero fuera']
  },
  {
    id: 'magnetismo-8',
    planetId: 'magnetismo',
    title: 'Frecuencia ciclotrón',
    difficulty: 'medio',
    template: 'Un protón (m = 1.67×10⁻²⁷ kg, q = 1.6×10⁻¹⁹ C) entra en un campo de {B} T. ¿Cuál es su frecuencia de ciclotrón?',
    variables: [
      { name: 'campo', symbol: 'B', min: 0.1, max: 1, decimals: 2, unit: 'T' }
    ],
    question: 'Calcula la frecuencia.',
    answerUnit: 'MHz',
    calculateAnswer: (v) => (1.6e-19 * v.B) / (2 * Math.PI * 1.67e-27) / 1e6,
    solutionSteps: [
      'Datos: m = 1.67×10⁻²⁷ kg, q = 1.6×10⁻¹⁹ C, B = {B} T',
      'Frecuencia de ciclotrón: f = qB/(2πm)',
      'f = {answer} MHz'
    ],
    formula: 'f = qB/(2πm)',
    hints: ['La frecuencia no depende de la velocidad', 'Solo de la masa y la carga']
  },
  {
    id: 'magnetismo-9',
    planetId: 'magnetismo',
    title: 'Inductancia',
    difficulty: 'dificil',
    template: 'Un solenoide de {N} vueltas, área {A} cm² y longitud {L} cm tiene qué inductancia?',
    variables: [
      { name: 'vueltas', symbol: 'N', min: 100, max: 500, unit: 'vueltas' },
      { name: 'area', symbol: 'A', min: 5, max: 20, unit: 'cm²' },
      { name: 'longitud', symbol: 'L', min: 10, max: 30, unit: 'cm' }
    ],
    question: 'Calcula la inductancia.',
    answerUnit: 'mH',
    calculateAnswer: (v) => (4e-7 * Math.PI * Math.pow(v.N, 2) * (v.A / 10000)) / (v.L / 100) * 1000,
    solutionSteps: [
      'Datos: N = {N}, A = {A} cm², L = {L} cm',
      'Inductancia: L_ind = μ₀N²A/L',
      'L = {answer} mH'
    ],
    formula: 'L = μ₀N²A/l',
    hints: ['La inductancia depende del cuadrado del número de vueltas', 'Es proporcional al área']
  },
  {
    id: 'magnetismo-10',
    planetId: 'magnetismo',
    title: 'Transformador ideal',
    difficulty: 'medio',
    template: 'Un transformador tiene {N1} vueltas en el primario y {N2} vueltas en el secundario. Si el voltaje primario es {V1} V, ¿cuál es el voltaje secundario?',
    variables: [
      { name: 'vueltas1', symbol: 'N1', min: 100, max: 500, unit: 'vueltas' },
      { name: 'vueltas2', symbol: 'N2', min: 50, max: 200, unit: 'vueltas' },
      { name: 'voltaje1', symbol: 'V1', min: 110, max: 220, unit: 'V' }
    ],
    question: 'Calcula el voltaje secundario.',
    answerUnit: 'V',
    calculateAnswer: (v) => v.V1 * v.N2 / v.N1,
    solutionSteps: [
      'Datos: N₁ = {N1}, N₂ = {N2}, V₁ = {V1} V',
      'Relación de transformador: V₂/V₁ = N₂/N₁',
      'V₂ = {V1} × {N2}/{N1} = {answer} V'
    ],
    formula: 'V₂/V₁ = N₂/N₁',
    hints: ['Es un transformador reductor si N₂ < N₁', 'La potencia se conserva (ideal)']
  }
];

// ============================================
// PLANETA FEM - Fuerza Electromotriz
// ============================================
export const femExercises: Exercise[] = [
  {
    id: 'fem-1',
    planetId: 'fem',
    title: 'FEM básica',
    difficulty: 'facil',
    template: 'Una batería realiza {W} J de trabajo para mover {q} C de carga. ¿Cuál es su FEM?',
    variables: [
      { name: 'trabajo', symbol: 'W', min: 10, max: 100, unit: 'J' },
      { name: 'carga', symbol: 'q', min: 1, max: 10, unit: 'C' }
    ],
    question: 'Calcula la FEM.',
    answerUnit: 'V',
    calculateAnswer: (v) => v.W / v.q,
    solutionSteps: [
      'Datos: W = {W} J, q = {q} C',
      'FEM: ε = W/q',
      'ε = {W} / {q} = {answer} V'
    ],
    formula: 'ε = W/q',
    hints: ['La FEM es trabajo por unidad de carga', 'Se mide en voltios']
  },
  {
    id: 'fem-2',
    planetId: 'fem',
    title: 'Voltaje terminal',
    difficulty: 'facil',
    template: 'Una batería de {epsilon} V y resistencia interna {r} Ω suministra una corriente de {I} A. ¿Cuál es el voltaje terminal?',
    variables: [
      { name: 'fem', symbol: 'epsilon', min: 6, max: 24, unit: 'V' },
      { name: 'resistencia', symbol: 'r', min: 0.1, max: 1, decimals: 2, unit: 'Ω' },
      { name: 'corriente', symbol: 'I', min: 1, max: 5, unit: 'A' }
    ],
    question: 'Calcula el voltaje terminal.',
    answerUnit: 'V',
    calculateAnswer: (v) => v.epsilon - v.I * v.r,
    solutionSteps: [
      'Datos: ε = {epsilon} V, r = {r} Ω, I = {I} A',
      'Voltaje terminal: V = ε - Ir',
      'V = {epsilon} - {I} × {r} = {answer} V'
    ],
    formula: 'V = ε - Ir',
    hints: ['El voltaje terminal es menor que la FEM cuando hay corriente', 'La diferencia es la caída en la resistencia interna']
  },
  {
    id: 'fem-3',
    planetId: 'fem',
    title: 'Corriente de cortocircuito',
    difficulty: 'medio',
    template: 'Una batería de {epsilon} V tiene resistencia interna de {r} Ω. ¿Cuál es la corriente de cortocircuito?',
    variables: [
      { name: 'fem', symbol: 'epsilon', min: 6, max: 24, unit: 'V' },
      { name: 'resistencia', symbol: 'r', min: 0.1, max: 2, decimals: 2, unit: 'Ω' }
    ],
    question: 'Calcula la corriente de cortocircuito.',
    answerUnit: 'A',
    calculateAnswer: (v) => v.epsilon / v.r,
    solutionSteps: [
      'Datos: ε = {epsilon} V, r = {r} Ω',
      'Cortocircuito: R_externa = 0',
      'I_cc = ε/r = {epsilon}/{r} = {answer} A'
    ],
    formula: 'I_cc = ε/r',
    hints: ['En cortocircuito solo hay la resistencia interna', 'Puede ser peligrosa si es muy grande']
  },
  {
    id: 'fem-4',
    planetId: 'fem',
    title: 'Potencia máxima transferida',
    difficulty: 'dificil',
    template: 'Una batería de {epsilon} V con resistencia interna {r} Ω se conecta a una resistencia externa R. ¿Qué valor de R da máxima potencia transferida?',
    variables: [
      { name: 'fem', symbol: 'epsilon', min: 6, max: 24, unit: 'V' },
      { name: 'resistencia', symbol: 'r', min: 0.5, max: 5, decimals: 1, unit: 'Ω' }
    ],
    question: 'Calcula el valor de R para máxima potencia.',
    answerUnit: 'Ω',
    calculateAnswer: (v) => v.r,
    solutionSteps: [
      'Datos: ε = {epsilon} V, r = {r} Ω',
      'Teorema de máxima transferencia: R = r',
      'R = {answer} Ω'
    ],
    formula: 'R = r',
    hints: ['La máxima potencia se transfiere cuando las resistencias son iguales', 'La eficiencia es solo del 50%']
  },
  {
    id: 'fem-5',
    planetId: 'fem',
    title: 'Circuitos con múltiples FEM',
    difficulty: 'medio',
    template: 'Dos baterías de {epsilon1} V y {epsilon2} V están en serie con polaridades opuestas y una resistencia total de {R} Ω. ¿Cuál es la corriente?',
    variables: [
      { name: 'fem1', symbol: 'epsilon1', min: 6, max: 15, unit: 'V' },
      { name: 'fem2', symbol: 'epsilon2', min: 3, max: 12, unit: 'V' },
      { name: 'resistencia', symbol: 'R', min: 2, max: 20, unit: 'Ω' }
    ],
    question: 'Calcula la corriente.',
    answerUnit: 'mA',
    calculateAnswer: (v) => Math.abs(v.epsilon1 - v.epsilon2) / v.R * 1000,
    solutionSteps: [
      'Datos: ε₁ = {epsilon1} V, ε₂ = {epsilon2} V (opuestos), R = {R} Ω',
      'FEM neta: ε_neta = |ε₁ - ε₂|',
      'I = ε_neta/R = |{epsilon1}-{epsilon2}|/{R} = {answer} mA'
    ],
    formula: 'I = |ε₁ - ε₂|/R',
    hints: ['FEMs opuestas se restan', 'FEMs en mismo sentido se suman']
  },
  {
    id: 'fem-6',
    planetId: 'fem',
    title: 'Carga de batería',
    difficulty: 'medio',
    template: 'Una batería de {epsilon} V y resistencia interna {r} Ω se carga con una fuente de {V} V a través de una resistencia de {R} Ω. ¿Cuál es la corriente de carga?',
    variables: [
      { name: 'fem', symbol: 'epsilon', min: 6, max: 12, unit: 'V' },
      { name: 'resistenciaInt', symbol: 'r', min: 0.1, max: 1, decimals: 2, unit: 'Ω' },
      { name: 'fuente', symbol: 'V', min: 15, max: 20, unit: 'V' },
      { name: 'resistencia', symbol: 'R', min: 1, max: 10, unit: 'Ω' }
    ],
    question: 'Calcula la corriente de carga.',
    answerUnit: 'A',
    calculateAnswer: (v) => (v.V - v.epsilon) / (v.R + v.r),
    solutionSteps: [
      'Datos: ε = {epsilon} V, V_fuente = {V} V, R_total = {R}+{r} Ω',
      'Para cargar: V_fuente > ε',
      'I = (V - ε)/(R + r) = ({V}-{epsilon})/({R}+{r}) = {answer} A'
    ],
    formula: 'I = (V_fuente - ε)/(R + r)',
    hints: ['La fuente debe tener mayor voltaje que la batería', 'La corriente entra por el terminal positivo']
  },
  {
    id: 'fem-7',
    planetId: 'fem',
    title: 'Potencia disipada internamente',
    difficulty: 'medio',
    template: 'Una batería de {epsilon} V con resistencia interna {r} Ω suministra {I} A. ¿Cuánta potencia se disipa internamente?',
    variables: [
      { name: 'fem', symbol: 'epsilon', min: 6, max: 24, unit: 'V' },
      { name: 'resistencia', symbol: 'r', min: 0.1, max: 2, decimals: 2, unit: 'Ω' },
      { name: 'corriente', symbol: 'I', min: 0.5, max: 5, decimals: 1, unit: 'A' }
    ],
    question: 'Calcula la potencia disipada.',
    answerUnit: 'W',
    calculateAnswer: (v) => Math.pow(v.I, 2) * v.r,
    solutionSteps: [
      'Datos: ε = {epsilon} V, r = {r} Ω, I = {I} A',
      'Potencia disipada: P = I²r',
      'P = ({I})² × {r} = {answer} W'
    ],
    formula: 'P = I²r',
    hints: ['Esta potencia se pierde como calor', 'Reduce la eficiencia de la batería']
  },
  {
    id: 'fem-8',
    planetId: 'fem',
    title: 'Determinar resistencia interna',
    difficulty: 'medio',
    template: 'Una batería tiene voltaje de circuito abierto {V0} V. Al conectar una carga de {R} Ω, el voltaje cae a {V} V. ¿Cuál es la resistencia interna?',
    variables: [
      { name: 'voltaje0', symbol: 'V0', min: 10, max: 24, unit: 'V' },
      { name: 'resistencia', symbol: 'R', min: 5, max: 50, unit: 'Ω' },
      { name: 'voltaje', symbol: 'V', min: 8, max: 20, unit: 'V' }
    ],
    question: 'Calcula la resistencia interna.',
    answerUnit: 'Ω',
    calculateAnswer: (v) => v.R * (v.V0 / v.V - 1),
    solutionSteps: [
      'Datos: V_0 = {V0} V (circuito abierto), V = {V} V (con carga)',
      'R = {R} Ω',
      'V = V_0 - Ir = V_0 - (V/R)r',
      'r = R(V_0/V - 1) = {answer} Ω'
    ],
    formula: 'r = R(V_0/V - 1)',
    hints: ['El voltaje de circuito abierto es la FEM', 'La caída de voltaje indica la resistencia interna']
  },
  {
    id: 'fem-9',
    planetId: 'fem',
    title: 'Baterías en paralelo',
    difficulty: 'dificil',
    template: 'Dos baterías idénticas de {epsilon} V y resistencia interna {r} Ω cada una se conectan en paralelo. ¿Cuál es la FEM equivalente y resistencia equivalente?',
    variables: [
      { name: 'fem', symbol: 'epsilon', min: 6, max: 12, unit: 'V' },
      { name: 'resistencia', symbol: 'r', min: 0.2, max: 1, decimals: 2, unit: 'Ω' }
    ],
    question: 'Calcula la FEM equivalente.',
    answerUnit: 'V',
    calculateAnswer: (v) => v.epsilon,
    solutionSteps: [
      'Datos: ε = {epsilon} V, r = {r} Ω (cada una)',
      'Baterías idénticas en paralelo:',
      'FEM equivalente = ε = {answer} V',
      'Resistencia equivalente = r/2 = {r_eq} Ω'
    ],
    formula: 'ε_eq = ε, r_eq = r/2',
    hints: ['La FEM no cambia si son idénticas', 'La resistencia interna se reduce']
  },
  {
    id: 'fem-10',
    planetId: 'fem',
    title: 'Eficiencia de la batería',
    difficulty: 'dificil',
    template: 'Una batería de {epsilon} V con resistencia interna {r} Ω alimenta una resistencia externa de {R} Ω. ¿Cuál es la eficiencia de transferencia?',
    variables: [
      { name: 'fem', symbol: 'epsilon', min: 10, max: 24, unit: 'V' },
      { name: 'resistenciaInt', symbol: 'r', min: 0.5, max: 2, decimals: 1, unit: 'Ω' },
      { name: 'resistencia', symbol: 'R', min: 2, max: 20, unit: 'Ω' }
    ],
    question: 'Calcula la eficiencia en porcentaje.',
    answerUnit: '%',
    calculateAnswer: (v) => (v.R / (v.R + v.r)) * 100,
    solutionSteps: [
      'Datos: ε = {epsilon} V, r = {r} Ω, R = {R} Ω',
      'Eficiencia: η = P_útil/P_total = R/(R+r)',
      'η = {R}/({R}+{r}) × 100 = {answer}%'
    ],
    formula: 'η = R/(R+r)',
    hints: ['Máxima eficiencia cuando r es pequeña', 'Para R = r, eficiencia = 50%']
  }
];

// ============================================
// PLANETA VECTORES - Análisis Vectorial
// ============================================
export const vectoresExercises: Exercise[] = [
  {
    id: 'vectores-1',
    planetId: 'vectores',
    title: 'Componentes de un vector',
    difficulty: 'facil',
    template: 'Un vector tiene magnitud {V} y forma un ángulo de {theta}° con el eje x. ¿Cuál es su componente y?',
    variables: [
      { name: 'magnitud', symbol: 'V', min: 5, max: 20, unit: '' },
      { name: 'angulo', symbol: 'theta', min: 20, max: 70, unit: '°' }
    ],
    question: 'Calcula la componente y.',
    answerUnit: '',
    calculateAnswer: (v) => v.V * Math.sin(v.theta * Math.PI / 180),
    solutionSteps: [
      'Datos: |V| = {V}, θ = {theta}°',
      'Componentes: V_x = V·cos(θ), V_y = V·sin(θ)',
      'V_y = {V} × sin({theta}°) = {answer}'
    ],
    formula: 'V_y = V·sin(θ)',
    hints: ['El seno da la componente vertical', 'El coseno da la componente horizontal']
  },
  {
    id: 'vectores-2',
    planetId: 'vectores',
    title: 'Magnitud de un vector',
    difficulty: 'facil',
    template: 'Un vector tiene componentes Vx = {vx} y Vy = {vy}. ¿Cuál es su magnitud?',
    variables: [
      { name: 'compX', symbol: 'vx', min: 3, max: 15, unit: '' },
      { name: 'compY', symbol: 'vy', min: 3, max: 15, unit: '' }
    ],
    question: 'Calcula la magnitud.',
    answerUnit: '',
    calculateAnswer: (v) => Math.sqrt(Math.pow(v.vx, 2) + Math.pow(v.vy, 2)),
    solutionSteps: [
      'Datos: V_x = {vx}, V_y = {vy}',
      'Magnitud: |V| = √(V_x² + V_y²)',
      '|V| = √({vx}² + {vy}²) = {answer}'
    ],
    formula: '|V| = √(V_x² + V_y²)',
    hints: ['Usa el teorema de Pitágoras', 'La magnitud siempre es positiva']
  },
  {
    id: 'vectores-3',
    planetId: 'vectores',
    title: 'Suma de vectores',
    difficulty: 'facil',
    template: 'Dos vectores son: A = ({Ax}, {Ay}) y B = ({Bx}, {By}). ¿Cuál es la magnitud del vector resultante?',
    variables: [
      { name: 'Ax', symbol: 'Ax', min: 2, max: 10, unit: '' },
      { name: 'Ay', symbol: 'Ay', min: 2, max: 10, unit: '' },
      { name: 'Bx', symbol: 'Bx', min: 2, max: 10, unit: '' },
      { name: 'By', symbol: 'By', min: 2, max: 10, unit: '' }
    ],
    question: 'Calcula la magnitud de A + B.',
    answerUnit: '',
    calculateAnswer: (v) => Math.sqrt(Math.pow(v.Ax + v.Bx, 2) + Math.pow(v.Ay + v.By, 2)),
    solutionSteps: [
      'Datos: A = ({Ax}, {Ay}), B = ({Bx}, {By})',
      'R = A + B = ({Rx}, {Ry})',
      '|R| = √({Rx}² + {Ry}²) = {answer}'
    ],
    formula: 'R = A + B',
    hints: ['Suma componente a componente', 'Luego calcula la magnitud']
  },
  {
    id: 'vectores-4',
    planetId: 'vectores',
    title: 'Producto escalar',
    difficulty: 'medio',
    template: 'Dos vectores tienen magnitudes |A| = {A} y |B| = {B}, y forman un ángulo de {theta}° entre ellos. ¿Cuál es su producto escalar?',
    variables: [
      { name: 'magA', symbol: 'A', min: 3, max: 15, unit: '' },
      { name: 'magB', symbol: 'B', min: 3, max: 15, unit: '' },
      { name: 'angulo', symbol: 'theta', min: 30, max: 120, unit: '°' }
    ],
    question: 'Calcula el producto escalar.',
    answerUnit: '',
    calculateAnswer: (v) => v.A * v.B * Math.cos(v.theta * Math.PI / 180),
    solutionSteps: [
      'Datos: |A| = {A}, |B| = {B}, θ = {theta}°',
      'Producto escalar: A·B = |A||B|cos(θ)',
      'A·B = {A} × {B} × cos({theta}°) = {answer}'
    ],
    formula: 'A·B = |A||B|cos(θ)',
    hints: ['El resultado es un escalar', 'Si son perpendiculares, A·B = 0']
  },
  {
    id: 'vectores-5',
    planetId: 'vectores',
    title: 'Ángulo entre vectores',
    difficulty: 'medio',
    template: 'Dos vectores tienen magnitudes {A} y {B}, y su producto escalar es {AB}. ¿Cuál es el ángulo entre ellos?',
    variables: [
      { name: 'magA', symbol: 'A', min: 5, max: 15, unit: '' },
      { name: 'magB', symbol: 'B', min: 5, max: 15, unit: '' },
      { name: 'producto', symbol: 'AB', min: 10, max: 100, unit: '' }
    ],
    question: 'Calcula el ángulo.',
    answerUnit: '°',
    calculateAnswer: (v) => Math.acos(v.AB / (v.A * v.B)) * 180 / Math.PI,
    solutionSteps: [
      'Datos: |A| = {A}, |B| = {B}, A·B = {AB}',
      'De A·B = |A||B|cos(θ):',
      'θ = arccos(A·B / (|A||B|)) = {answer}°'
    ],
    formula: 'θ = arccos(A·B / (|A||B|))',
    hints: ['Usa la función arccos', 'El ángulo está entre 0° y 180°']
  },
  {
    id: 'vectores-6',
    planetId: 'vectores',
    title: 'Producto vectorial',
    difficulty: 'medio',
    template: 'Dos vectores de magnitudes {A} y {B} forman {theta}° entre sí. ¿Cuál es la magnitud de su producto vectorial?',
    variables: [
      { name: 'magA', symbol: 'A', min: 3, max: 10, unit: '' },
      { name: 'magB', symbol: 'B', min: 3, max: 10, unit: '' },
      { name: 'angulo', symbol: 'theta', min: 30, max: 90, unit: '°' }
    ],
    question: 'Calcula |A × B|.',
    answerUnit: '',
    calculateAnswer: (v) => v.A * v.B * Math.sin(v.theta * Math.PI / 180),
    solutionSteps: [
      'Datos: |A| = {A}, |B| = {B}, θ = {theta}°',
      'Magnitud del producto vectorial: |A × B| = |A||B|sin(θ)',
      '|A × B| = {A} × {B} × sin({theta}°) = {answer}'
    ],
    formula: '|A × B| = |A||B|sin(θ)',
    hints: ['El resultado es un vector perpendicular', 'Si son paralelos, A × B = 0']
  },
  {
    id: 'vectores-7',
    planetId: 'vectores',
    title: 'Vector unitario',
    difficulty: 'facil',
    template: 'Un vector tiene componentes ({vx}, {vy}). ¿Cuál es el valor de su componente x como vector unitario?',
    variables: [
      { name: 'compX', symbol: 'vx', min: 3, max: 10, unit: '' },
      { name: 'compY', symbol: 'vy', min: 3, max: 10, unit: '' }
    ],
    question: 'Calcula la componente x del vector unitario.',
    answerUnit: '',
    calculateAnswer: (v) => v.vx / Math.sqrt(Math.pow(v.vx, 2) + Math.pow(v.vy, 2)),
    solutionSteps: [
      'Datos: V = ({vx}, {vy})',
      'Magnitud: |V| = {mag}',
      'Vector unitario: u = V/|V|',
      'u_x = {vx}/{mag} = {answer}'
    ],
    formula: 'u = V/|V|',
    hints: ['El vector unitario tiene magnitud 1', 'Indica solo dirección']
  },
  {
    id: 'vectores-8',
    planetId: 'vectores',
    title: 'Vector resta',
    difficulty: 'facil',
    template: 'Dados los vectores A = ({Ax}, {Ay}) y B = ({Bx}, {By}), ¿cuál es la magnitud de A - B?',
    variables: [
      { name: 'Ax', symbol: 'Ax', min: 5, max: 15, unit: '' },
      { name: 'Ay', symbol: 'Ay', min: 5, max: 15, unit: '' },
      { name: 'Bx', symbol: 'Bx', min: 2, max: 10, unit: '' },
      { name: 'By', symbol: 'By', min: 2, max: 10, unit: '' }
    ],
    question: 'Calcula |A - B|.',
    answerUnit: '',
    calculateAnswer: (v) => Math.sqrt(Math.pow(v.Ax - v.Bx, 2) + Math.pow(v.Ay - v.By, 2)),
    solutionSteps: [
      'Datos: A = ({Ax}, {Ay}), B = ({Bx}, {By})',
      'A - B = ({Ax}-{Bx}, {Ay}-{By}) = ({Rx}, {Ry})',
      '|A - B| = √({Rx}² + {Ry}²) = {answer}'
    ],
    formula: '|A - B| = √((Ax-Bx)² + (Ay-By)²)',
    hints: ['Resta componente a componente', 'A - B ≠ B - A']
  },
  {
    id: 'vectores-9',
    planetId: 'vectores',
    title: 'Descomposición de fuerzas',
    difficulty: 'medio',
    template: 'Una fuerza de {F} N actúa a {theta}° de la horizontal sobre un objeto de {m} kg. ¿Cuál es la aceleración horizontal?',
    variables: [
      { name: 'fuerza', symbol: 'F', min: 10, max: 100, unit: 'N' },
      { name: 'angulo', symbol: 'theta', min: 20, max: 60, unit: '°' },
      { name: 'masa', symbol: 'm', min: 2, max: 20, unit: 'kg' }
    ],
    question: 'Calcula la aceleración horizontal.',
    answerUnit: 'm/s²',
    calculateAnswer: (v) => (v.F * Math.cos(v.theta * Math.PI / 180)) / v.m,
    solutionSteps: [
      'Datos: F = {F} N, θ = {theta}°, m = {m} kg',
      'Componente horizontal: F_x = F·cos(θ)',
      'a_x = F_x/m = {F}·cos({theta}°)/{m} = {answer} m/s²'
    ],
    formula: 'a_x = F·cos(θ)/m',
    hints: ['Solo la componente horizontal causa aceleración horizontal', 'La componente vertical puede equilibrarse']
  },
  {
    id: 'vectores-10',
    planetId: 'vectores',
    title: 'Proyección de un vector',
    difficulty: 'dificil',
    template: 'El vector A = ({Ax}, {Ay}) se proyecta sobre la dirección del vector B = ({Bx}, {By}). ¿Cuál es la magnitud de la proyección?',
    variables: [
      { name: 'Ax', symbol: 'Ax', min: 3, max: 10, unit: '' },
      { name: 'Ay', symbol: 'Ay', min: 3, max: 10, unit: '' },
      { name: 'Bx', symbol: 'Bx', min: 2, max: 8, unit: '' },
      { name: 'By', symbol: 'By', min: 2, max: 8, unit: '' }
    ],
    question: 'Calcula la proyección de A sobre B.',
    answerUnit: '',
    calculateAnswer: (v) => {
      const prodEsc = v.Ax * v.Bx + v.Ay * v.By;
      const magB = Math.sqrt(Math.pow(v.Bx, 2) + Math.pow(v.By, 2));
      return Math.abs(prodEsc / magB);
    },
    solutionSteps: [
      'Producto escalar: A·B = {Ax}×{Bx} + {Ay}×{By} = {pe}',
      'Magnitud de B: |B| = {magB}',
      'Proyección: proj_B(A) = (A·B)/|B| = {answer}'
    ],
    formula: 'proj_B(A) = (A·B)/|B|',
    hints: ['La proyección es un escalar', 'Representa la componente de A en la dirección de B']
  }
];

// ============================================
// PLANETA KEPLER - Leyes de Kepler
// ============================================
export const keplerExercises: Exercise[] = [
  {
    id: 'kepler-1',
    planetId: 'kepler',
    title: 'Tercera Ley de Kepler',
    difficulty: 'medio',
    template: 'Un planeta tiene un período orbital de {T} años. ¿A qué distancia media del Sol orbita (en UA)?',
    variables: [
      { name: 'periodo', symbol: 'T', min: 0.5, max: 20, decimals: 1, unit: 'años' }
    ],
    question: 'Calcula el semieje mayor en UA.',
    answerUnit: 'UA',
    calculateAnswer: (v) => Math.pow(v.T, 2/3),
    solutionSteps: [
      'Datos: T = {T} años',
      'Tercera Ley de Kepler: T² = a³',
      'a = T^(2/3) = {T}^(2/3) = {answer} UA'
    ],
    formula: 'a = T^(2/3)',
    hints: ['En UA y años, T² = a³', '1 UA = distancia Tierra-Sol']
  },
  {
    id: 'kepler-2',
    planetId: 'kepler',
    title: 'Período desde semieje',
    difficulty: 'facil',
    template: 'Un cuerpo orbita el Sol a una distancia media de {a} UA. ¿Cuál es su período orbital?',
    variables: [
      { name: 'semieje', symbol: 'a', min: 0.5, max: 30, decimals: 1, unit: 'UA' }
    ],
    question: 'Calcula el período en años.',
    answerUnit: 'años',
    calculateAnswer: (v) => Math.sqrt(Math.pow(v.a, 3)),
    solutionSteps: [
      'Datos: a = {a} UA',
      'Tercera Ley de Kepler: T² = a³',
      'T = √({a}³) = {answer} años'
    ],
    formula: 'T = √(a³)',
    hints: ['Mayor distancia = mayor período', 'Kepler lo dedujo de observaciones']
  },
  {
    id: 'kepler-3',
    planetId: 'kepler',
    title: 'Velocidad areolar',
    difficulty: 'medio',
    template: 'Un planeta tiene semieje mayor {a}×10⁶ km y excentricidad {e}. ¿Cuál es el área barrida en un período?',
    variables: [
      { name: 'semieje', symbol: 'a', min: 50, max: 300, unit: '×10⁶ km' },
      { name: 'excentricidad', symbol: 'e', min: 0.1, max: 0.5, decimals: 2, unit: '' }
    ],
    question: 'Calcula el área total en 10¹² km².',
    answerUnit: '×10¹² km²',
    calculateAnswer: (v) => Math.PI * Math.pow(v.a * 1e6, 2) * Math.sqrt(1 - Math.pow(v.e, 2)) / 1e12,
    solutionSteps: [
      'Datos: a = {a}×10⁶ km, e = {e}',
      'Semieje menor: b = a√(1-e²)',
      'Área de elipse: A = πab',
      'A ≈ {answer}×10¹² km²'
    ],
    formula: 'A = πa²√(1-e²)',
    hints: ['La segunda ley dice que esta área se barre uniformemente', 'El Sol está en un foco']
  },
  {
    id: 'kepler-4',
    planetId: 'kepler',
    title: 'Distancia perihelio-afelio',
    difficulty: 'facil',
    template: 'Un planeta tiene semieje mayor {a} UA y excentricidad {e}. ¿Cuál es su distancia al afelio?',
    variables: [
      { name: 'semieje', symbol: 'a', min: 1, max: 30, unit: 'UA' },
      { name: 'excentricidad', symbol: 'e', min: 0.1, max: 0.6, decimals: 2, unit: '' }
    ],
    question: 'Calcula la distancia al afelio.',
    answerUnit: 'UA',
    calculateAnswer: (v) => v.a * (1 + v.e),
    solutionSteps: [
      'Datos: a = {a} UA, e = {e}',
      'Afelio (punto más lejano): r_a = a(1 + e)',
      'r_a = {a}(1 + {e}) = {answer} UA'
    ],
    formula: 'r_afelio = a(1 + e)',
    hints: ['Perihelio = a(1-e)', 'Afelio = a(1+e)']
  },
  {
    id: 'kepler-5',
    planetId: 'kepler',
    title: 'Excentricidad desde distancias',
    difficulty: 'medio',
    template: 'Un planeta está a {rp} UA del Sol en perihelio y {ra} UA en afelio. ¿Cuál es su excentricidad?',
    variables: [
      { name: 'perihelio', symbol: 'rp', min: 0.5, max: 5, decimals: 1, unit: 'UA' },
      { name: 'afelio', symbol: 'ra', min: 1, max: 10, unit: 'UA' }
    ],
    question: 'Calcula la excentricidad.',
    answerUnit: '',
    calculateAnswer: (v) => (v.ra - v.rp) / (v.ra + v.rp),
    solutionSteps: [
      'Datos: r_p = {rp} UA, r_a = {ra} UA',
      'Semieje: a = (r_p + r_a)/2 = {a} UA',
      'e = (r_a - r_p)/(r_a + r_p) = {answer}'
    ],
    formula: 'e = (r_a - r_p)/(r_a + r_p)',
    hints: ['e = 0 es un círculo', 'e cercano a 1 es muy elíptica']
  },
  {
    id: 'kepler-6',
    planetId: 'kepler',
    title: 'Velocidad orbital variable',
    difficulty: 'medio',
    template: 'Un planeta con semieje mayor {a} UA y excentricidad {e} está a {r} UA del Sol. ¿Qué fracción de su velocidad máxima tiene?',
    variables: [
      { name: 'semieje', symbol: 'a', min: 1, max: 5, unit: 'UA' },
      { name: 'excentricidad', symbol: 'e', min: 0.2, max: 0.5, decimals: 2, unit: '' },
      { name: 'distancia', symbol: 'r', min: 0.5, max: 3, unit: 'UA' }
    ],
    question: 'Calcula v/v_max.',
    answerUnit: '',
    calculateAnswer: (v) => Math.sqrt((2 / v.r - 1 / v.a) / (2 / (v.a * (1 - v.e)) - 1 / v.a)),
    solutionSteps: [
      'Velocidad orbital: v = √(GM(2/r - 1/a))',
      'Velocidad máxima en perihelio: v_max',
      'v/v_max = √[(2/r - 1/a)/(2/r_p - 1/a)]',
      'v/v_max ≈ {answer}'
    ],
    formula: 'v ∝ √(2/r - 1/a)',
    hints: ['Mayor velocidad cerca del Sol', 'Conservación del momento angular']
  },
  {
    id: 'kepler-7',
    planetId: 'kepler',
    title: 'Período de satélite artificial',
    difficulty: 'medio',
    template: 'Un satélite orbita la Tierra a {h} km de altura. ¿Cuál es su período? (R_Tierra = 6370 km, M_Tierra = 5.97×10²⁴ kg)',
    variables: [
      { name: 'altura', symbol: 'h', min: 200, max: 36000, unit: 'km' }
    ],
    question: 'Calcula el período en horas.',
    answerUnit: 'horas',
    calculateAnswer: (v) => {
      const r = (6370 + v.h) * 1000;
      const G = 6.67e-11;
      const M = 5.97e24;
      return (2 * Math.PI * Math.sqrt(Math.pow(r, 3) / (G * M))) / 3600;
    },
    solutionSteps: [
      'Datos: h = {h} km, R_T = 6370 km',
      'r = R_T + h = {r} km',
      'T = 2π√(r³/GM)',
      'T = {answer} horas'
    ],
    formula: 'T = 2π√(r³/GM)',
    hints: ['A 36000 km, T = 24 horas (órbita geoestacionaria)', 'Kepler también aplica a satélites']
  },
  {
    id: 'kepler-8',
    planetId: 'kepler',
    title: 'Comparación de períodos',
    difficulty: 'facil',
    template: 'El planeta A orbita a {a1} UA y el planeta B a {a2} UA. ¿Cuántas veces es mayor el período de B que el de A?',
    variables: [
      { name: 'semieje1', symbol: 'a1', min: 1, max: 5, unit: 'UA' },
      { name: 'semieje2', symbol: 'a2', min: 5, max: 30, unit: 'UA' }
    ],
    question: 'Calcula T_B/T_A.',
    answerUnit: 'veces',
    calculateAnswer: (v) => Math.pow(v.a2 / v.a1, 1.5),
    solutionSteps: [
      'T_A² = a₁³, T_B² = a₂³',
      'T_B/T_A = √(a₂³/a₁³) = (a₂/a₁)^(3/2)',
      'T_B/T_A = ({a2}/{a1})^1.5 = {answer} veces'
    ],
    formula: 'T_B/T_A = (a_B/a_A)^1.5',
    hints: ['El período crece más rápido que la distancia', 'Júpiter (5.2 UA) tarda ~12 años']
  },
  {
    id: 'kepler-9',
    planetId: 'kepler',
    title: 'Segunda Ley - Áreas iguales',
    difficulty: 'medio',
    template: 'Un planeta barre {A}×10⁶ km² en {t} días cuando está cerca del perihelio. ¿Cuánto tiempo tarda en barrer la misma área cerca del afelio?',
    variables: [
      { name: 'area', symbol: 'A', min: 1, max: 10, unit: '×10⁶ km²' },
      { name: 'tiempo', symbol: 't', min: 5, max: 30, unit: 'días' },
      { name: 'ratio', symbol: 'r', min: 1.5, max: 3, decimals: 1, unit: '' }
    ],
    question: 'Calcula el tiempo en afelio (días).',
    answerUnit: 'días',
    calculateAnswer: (v) => v.t * v.r,
    solutionSteps: [
      'Por la segunda ley, áreas iguales = tiempos iguales',
      'Pero la velocidad varía: v ∝ 1/r',
      'Si la velocidad en afelio es {ratio}× menor:',
      't_afelio = {t} × {r} = {answer} días'
    ],
    formula: 'Ley de áreas: dA/dt = constante',
    hints: ['Las áreas son iguales en tiempos iguales', 'Pero la velocidad varía según la distancia']
  },
  {
    id: 'kepler-10',
    planetId: 'kepler',
    title: 'Órbita geoestacionaria',
    difficulty: 'dificil',
    template: '¿A qué altura sobre la superficie terrestre debe estar un satélite para ser geoestacionario? (R_Tierra = 6370 km)',
    variables: [
      { name: 'dummy', symbol: 'x', min: 1, max: 1, unit: '' }
    ],
    question: 'Calcula la altura en km.',
    answerUnit: 'km',
    calculateAnswer: (v) => 35786, // Valor conocido
    solutionSteps: [
      'Para órbita geoestacionaria: T = 24 horas = 86400 s',
      'De la tercera ley: r³ = GMT²/4π²',
      'r = 42164 km (desde el centro)',
      'h = r - R_T = 42164 - 6370 = {answer} km'
    ],
    formula: 'r_geo = ∛(GMT²/4π²)',
    hints: ['Un satélite geoestacionario parece fijo en el cielo', 'Todos están en el plano ecuatorial']
  }
];

// ============================================
// Función para obtener ejercicios por planeta
// ============================================
export function getExercisesByPlanet(planetId: string): Exercise[] {
  const exerciseMap: Record<string, Exercise[]> = {
    'hooke': hookeExercises,
    'cargas': cargasExercises,
    'circuitos': circuitosExercises,
    'gravitacion': gravitacionExercises,
    'newton': newtonExercises,
    'mru': mruExercises,
    'vertical': verticalExercises,
    'parabolico': parabolicoExercises,
    'energia': energiaExercises,
    'momento': momentoExercises,
    'calor': calorExercises,
    'ondas': ondasExercises,
    'magnetismo': magnetismoExercises,
    'fem': femExercises,
    'vectores': vectoresExercises,
    'kepler': keplerExercises,
  };
  
  return exerciseMap[planetId] || [];
}

// Función para generar valores aleatorios para un ejercicio
export function generateExerciseValues(exercise: Exercise): Record<string, number> {
  const values: Record<string, number> = {};
  
  exercise.variables.forEach(variable => {
    const range = variable.max - variable.min;
    const randomValue = variable.min + Math.random() * range;
    values[variable.symbol] = variable.decimals 
      ? parseFloat(randomValue.toFixed(variable.decimals))
      : Math.round(randomValue);
  });
  
  return values;
}

// Función para generar una instancia completa de ejercicio
export function generateExerciseInstance(exercise: Exercise) {
  const values = generateExerciseValues(exercise);
  const answer = exercise.calculateAnswer(values);
  
  return {
    exercise,
    values,
    answer: parseFloat(answer.toFixed(3)),
    template: interpolateTemplate(exercise.template, values, exercise.variables)
  };
}

// Función auxiliar para interpolar valores en el template
function interpolateTemplate(
  template: string, 
  values: Record<string, number>,
  variables: ExerciseVariable[]
): string {
  let result = template;
  
  variables.forEach(v => {
    const regex = new RegExp(`\\{${v.symbol}\\}`, 'g');
    result = result.replace(regex, `${values[v.symbol]}`);
  });
  
  return result;
}
