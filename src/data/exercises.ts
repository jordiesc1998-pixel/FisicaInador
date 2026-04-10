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
// AGREGAR MÁS TEMAS AQUÍ...
// ============================================

// Función para obtener ejercicios por planeta
export function getExercisesByPlanet(planetId: string): Exercise[] {
  const exerciseMap: Record<string, Exercise[]> = {
    'hooke': hookeExercises,
    'cargas': cargasExercises,
    'circuitos': circuitosExercises,
    'gravitacion': gravitacionExercises,
    // Agregar más según se necesite
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
