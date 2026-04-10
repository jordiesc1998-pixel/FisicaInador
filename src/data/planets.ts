export interface PlanetTheory {
  definition: string;
  formulas: { name: string; formula: string; description: string }[];
  units: string;
  applications: string;
  keyPoints: string[];
}

export interface Planet {
  id: string;
  name: string;
  theme: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  icon: string;
  description: string;
  isActive: boolean;
  orbitRadius: number;
  orbitSpeed: number;
  size: number;
  theory: PlanetTheory;
}

export const planets: Planet[] = [
  {
    id: 'hooke',
    name: 'Planeta Hooke',
    theme: 'Ley de Hooke',
    color: '#22c55e',
    gradientFrom: 'from-green-400',
    gradientTo: 'to-emerald-600',
    icon: '🔧',
    description: 'La deformación de un resorte es proporcional a la fuerza aplicada',
    isActive: true,
    orbitRadius: 120,
    orbitSpeed: 20,
    size: 45,
    theory: {
      definition: 'La Ley de Hooke establece que la deformación de un resorte es directamente proporcional a la fuerza aplicada, siempre que no se exceda el límite de elasticidad del material.',
      formulas: [
        { name: 'Ley de Hooke', formula: 'F = -kx', description: 'F = fuerza (N), k = constante del resorte (N/m), x = deformación (m)' },
        { name: 'Energía Potencial Elástica', formula: 'Ep = ½kx²', description: 'Energía almacenada en un resorte deformado' },
        { name: 'Trabajo Elástico', formula: 'W = ½kx²', description: 'Trabajo realizado para deformar el resorte' }
      ],
      units: 'Fuerza: Newtons (N), Constante k: N/m, Deformación: metros (m), Energía: Joules (J)',
      applications: 'Resortes, colchones, amortiguadores, básculas de resorte, juguetes, suspensiones de vehículos, medidores de fuerza',
      keyPoints: [
        'El signo negativo indica que la fuerza es restauradora (opuesta a la deformación)',
        'Válido solo dentro del límite de elasticidad',
        'La constante k depende del material y geometría del resorte',
        'Los resortes en serie: 1/k_total = 1/k₁ + 1/k₂ + ...',
        'Los resortes en paralelo: k_total = k₁ + k₂ + ...'
      ]
    }
  },
  {
    id: 'cargas',
    name: 'Planeta Cargas',
    theme: 'Cargas Eléctricas',
    color: '#eab308',
    gradientFrom: 'from-yellow-400',
    gradientTo: 'to-amber-500',
    icon: '⚡',
    description: 'Fuerzas entre cargas eléctricas positivas y negativas',
    isActive: true,
    orbitRadius: 160,
    orbitSpeed: 25,
    size: 50,
    theory: {
      definition: 'Las cargas eléctricas son una propiedad fundamental de la materia que determina sus interacciones electromagnéticas. Existen dos tipos: positivas (+) y negativas (-). Cargas iguales se repelen, cargas opuestas se atraen.',
      formulas: [
        { name: 'Ley de Coulomb', formula: 'F = k·q₁·q₂/r²', description: 'Fuerza entre dos cargas puntuales' },
        { name: 'Constante de Coulomb', formula: 'k = 9×10⁹ N·m²/C²', description: 'Constante de proporcionalidad en el vacío' },
        { name: 'Campo Eléctrico', formula: 'E = k·q/r²', description: 'Campo creado por una carga puntual' },
        { name: 'Fuerza Eléctrica', formula: 'F = q·E', description: 'Fuerza sobre una carga en un campo eléctrico' }
      ],
      units: 'Carga: Coulombs (C), Fuerza: Newtons (N), Campo eléctrico: N/C o V/m, Distancia: metros (m)',
      applications: 'Electrostática, generadores Van de Graaff, precipitadores electrostáticos, impresoras láser, pintura electrostática',
      keyPoints: [
        'La carga se conserva: la carga total de un sistema aislado permanece constante',
        'La carga está cuantizada: existe en múltiplos enteros de e = 1.6×10⁻¹⁹ C',
        'Cargas iguales se repelen, cargas opuestas se atraen',
        'La fuerza es una ley de inverso del cuadrado',
        'La fuerza eléctrica es mucho más fuerte que la gravitacional'
      ]
    }
  },
  {
    id: 'circuitos',
    name: 'Planeta Circuitos',
    theme: 'Circuitos Eléctricos',
    color: '#f97316',
    gradientFrom: 'from-orange-400',
    gradientTo: 'to-orange-600',
    icon: '🔌',
    description: 'Análisis de circuitos eléctricos y Ley de Ohm',
    isActive: true,
    orbitRadius: 200,
    orbitSpeed: 18,
    size: 48,
    theory: {
      definition: 'Un circuito eléctrico es un camino cerrado que permite la circulación de corriente eléctrica. Incluye elementos como fuentes de voltaje, resistencias, condensadores e inductores.',
      formulas: [
        { name: 'Ley de Ohm', formula: 'V = I·R', description: 'Voltaje = Corriente × Resistencia' },
        { name: 'Resistencias en Serie', formula: 'R_total = R₁ + R₂ + R₃ + ...', description: 'Suma directa de resistencias' },
        { name: 'Resistencias en Paralelo', formula: '1/R_total = 1/R₁ + 1/R₂ + ...', description: 'Inverso de la suma de inversos' },
        { name: 'Potencia Eléctrica', formula: 'P = V·I = I²R = V²/R', description: 'Tres formas equivalentes de calcular potencia' }
      ],
      units: 'Voltaje: Voltios (V), Corriente: Amperios (A), Resistencia: Ohms (Ω), Potencia: Watts (W)',
      applications: 'Electrónica, instalaciones eléctricas, dispositivos electrónicos, sistemas de potencia, electrodomésticos',
      keyPoints: [
        'En serie: la corriente es igual en todos los elementos',
        'En paralelo: el voltaje es igual en todas las ramas',
        'La potencia total es la suma de potencias de cada elemento',
        'Las leyes de Kirchhoff: suma de corrientes en un nodo = 0, suma de voltajes en un lazo = 0',
        'Circuitos RC y RL tienen comportamiento transitorio'
      ]
    }
  },
  {
    id: 'fem',
    name: 'Planeta FEM',
    theme: 'Fuerza Electromotriz',
    color: '#ef4444',
    gradientFrom: 'from-red-400',
    gradientTo: 'to-red-600',
    icon: '🔋',
    description: 'Trabajo por unidad de carga que proporciona una fuente',
    isActive: true,
    orbitRadius: 240,
    orbitSpeed: 22,
    size: 42,
    theory: {
      definition: 'La Fuerza Electromotriz (FEM) es el trabajo realizado por unidad de carga para mantener una diferencia de potencial en un circuito. Representa la energía que una fuente proporciona a los electrones.',
      formulas: [
        { name: 'FEM', formula: 'ε = W/q', description: 'Trabajo por unidad de carga' },
        { name: 'Ecuación de Circuito', formula: 'ε = I·R + I·r', description: 'R = resistencia externa, r = resistencia interna' },
        { name: 'Voltaje Terminal', formula: 'V = ε - I·r', description: 'Voltaje disponible en los terminales' },
        { name: 'Potencia Disipada', formula: 'P = I²·r', description: 'Potencia perdida en la resistencia interna' }
      ],
      units: 'FEM: Voltios (V), Trabajo: Joules (J), Carga: Coulombs (C)',
      applications: 'Baterías, generadores, celdas solares, pilas, fuentes de alimentación, alternadores',
      keyPoints: [
        'La FEM no es una fuerza, es un voltaje',
        'Toda fuente real tiene resistencia interna',
        'La FEM se mide en circuito abierto (sin corriente)',
        'El voltaje terminal es menor que la FEM cuando hay corriente',
        'Conexión en serie de fuentes: FEM total = suma de FEM individuales'
      ]
    }
  },
  {
    id: 'ondas',
    name: 'Planeta Ondas',
    theme: 'Ondas Mecánicas',
    color: '#38bdf8',
    gradientFrom: 'from-sky-400',
    gradientTo: 'to-cyan-500',
    icon: '🌊',
    description: 'Propagación de energía mediante perturbaciones',
    isActive: true,
    orbitRadius: 280,
    orbitSpeed: 16,
    size: 52,
    theory: {
      definition: 'Una onda mecánica es una perturbación que se propaga a través de un medio material transportando energía sin transporte de materia. Pueden ser transversales o longitudinales.',
      formulas: [
        { name: 'Velocidad de Onda', formula: 'v = λ·f', description: 'Velocidad = longitud de onda × frecuencia' },
        { name: 'Período', formula: 'T = 1/f', description: 'Tiempo de una oscilación completa' },
        { name: 'Ecuación de Onda', formula: 'y = A·sen(kx - ωt)', description: 'A = amplitud, k = número de onda, ω = frecuencia angular' },
        { name: 'Frecuencia Angular', formula: 'ω = 2πf', description: 'Velocidad angular de oscilación' }
      ],
      units: 'Longitud de onda: metros (m), Frecuencia: Hertz (Hz), Velocidad: m/s, Amplitud: metros (m)',
      applications: 'Sonido, sismología, ultrasonido médico, comunicaciones submarinas, instrumentos musicales',
      keyPoints: [
        'Ondas transversales: vibración perpendicular a la dirección de propagación',
        'Ondas longitudinales: vibración paralela a la dirección de propagación',
        'El sonido es una onda longitudinal',
        'La velocidad depende del medio de propagación',
        'Principio de superposición: las ondas se suman linealmente'
      ]
    }
  },
  {
    id: 'vectores',
    name: 'Planeta Vectores',
    theme: 'Vectores',
    color: '#a855f7',
    gradientFrom: 'from-purple-400',
    gradientTo: 'to-violet-600',
    icon: '➡️',
    description: 'Magnitudes con dirección y sentido',
    isActive: true,
    orbitRadius: 320,
    orbitSpeed: 28,
    size: 46,
    theory: {
      definition: 'Un vector es una magnitud física caracterizada por tener módulo (intensidad), dirección y sentido. Es fundamental para describir cantidades como fuerza, velocidad y aceleración.',
      formulas: [
        { name: 'Componentes', formula: 'Vx = V·cos(θ), Vy = V·sin(θ)', description: 'Descomposición en ejes X e Y' },
        { name: 'Magnitud', formula: '|V| = √(Vx² + Vy²)', description: 'Módulo del vector' },
        { name: 'Producto Escalar', formula: 'A·B = |A||B|cos(θ)', description: 'Resultado es un escalar' },
        { name: 'Producto Vectorial', formula: '|A×B| = |A||B|sin(θ)', description: 'Resultado es un vector perpendicular' }
      ],
      units: 'Depende de la magnitud física: N para fuerzas, m/s para velocidades, etc.',
      applications: 'Física mecánica, ingeniería, navegación, gráficos computacionales, robótica',
      keyPoints: [
        'Suma de vectores: método del paralelogramo o de componentes',
        'Dos vectores son iguales si tienen mismo módulo, dirección y sentido',
        'El vector negativo tiene mismo módulo y dirección, pero sentido opuesto',
        'Vectores unitarios: tienen módulo igual a 1',
        'El producto escalar detecta perpendicularidad (resultado = 0)'
      ]
    }
  },
  {
    id: 'gravitacion',
    name: 'Planeta Gravitación',
    theme: 'Gravitación Universal',
    color: '#1e40af',
    gradientFrom: 'from-blue-600',
    gradientTo: 'to-blue-800',
    icon: '🪐',
    description: 'Fuerza de atracción entre masas',
    isActive: true,
    orbitRadius: 360,
    orbitSpeed: 14,
    size: 58,
    theory: {
      definition: 'La Ley de Gravitación Universal de Newton establece que dos cuerpos se atraen con una fuerza directamente proporcional al producto de sus masas e inversamente proporcional al cuadrado de su distancia.',
      formulas: [
        { name: 'Ley de Newton', formula: 'F = G·m₁·m₂/r²', description: 'Fuerza gravitacional entre dos masas' },
        { name: 'Constante G', formula: 'G = 6.67×10⁻¹¹ N·m²/kg²', description: 'Constante de gravitación universal' },
        { name: 'Aceleración Gravitacional', formula: 'g = G·M/r²', description: 'Campo gravitacional de un cuerpo' },
        { name: 'Velocidad Orbital', formula: 'v = √(GM/r)', description: 'Velocidad para órbita circular' }
      ],
      units: 'Fuerza: Newtons (N), Masa: kilogramos (kg), Distancia: metros (m)',
      applications: 'Astronomía, satélites, cohetes, navegación espacial, mareas, órbitas planetarias',
      keyPoints: [
        'Es una fuerza de atracción, siempre actúa hacia el otro cuerpo',
        'Es una ley de inverso del cuadrado',
        'La constante G es muy pequeña, por eso la gravedad entre objetos cotidianos es imperceptible',
        'El campo gravitacional es conservativo',
        'La energía potencial gravitacional: Ep = -Gm₁m₂/r'
      ]
    }
  },
  {
    id: 'kepler',
    name: 'Planeta Kepler',
    theme: 'Leyes de Kepler',
    color: '#fbbf24',
    gradientFrom: 'from-amber-400',
    gradientTo: 'to-yellow-600',
    icon: '☀️',
    description: 'Leyes del movimiento planetario',
    isActive: true,
    orbitRadius: 400,
    orbitSpeed: 12,
    size: 50,
    theory: {
      definition: 'Las tres leyes de Kepler describen el movimiento de los planetas alrededor del Sol, derivadas empíricamente de observaciones astronómicas precisas.',
      formulas: [
        { name: '1ra Ley', formula: 'Órbitas elípticas con el Sol en un foco', description: 'Los planetas se mueven en elipses' },
        { name: '2da Ley', formula: 'Áreas iguales en tiempos iguales', description: 'Ley de las áreas' },
        { name: '3ra Ley', formula: 'T²/r³ = constante', description: 'Relación entre período y radio orbital' },
        { name: '3ra Ley (completa)', formula: 'T² = 4π²r³/(GM)', description: 'Con la masa del cuerpo central' }
      ],
      units: 'Período: segundos (s) o años, Distancia: metros (m) o UA',
      applications: 'Astronomía, predicción de eclipses, lanzamiento de satélites, misiones espaciales, exoplanetas',
      keyPoints: [
        'La primera ley derriba el modelo de órbitas circulares perfectas',
        'La segunda ley implica que los planetas se mueven más rápido cerca del Sol',
        'La tercera ley permite calcular períodos o distancias orbitales',
        'Son válidas para cualquier sistema de dos cuerpos',
        'Newton demostró que estas leyes se derivan de la gravitación universal'
      ]
    }
  },
  {
    id: 'calor',
    name: 'Planeta Calor',
    theme: 'Calor y Temperatura',
    color: '#f97316',
    gradientFrom: 'from-orange-500',
    gradientTo: 'to-red-500',
    icon: '🔥',
    description: 'Transferencia de energía térmica',
    isActive: true,
    orbitRadius: 440,
    orbitSpeed: 20,
    size: 48,
    theory: {
      definition: 'El calor es la transferencia de energía entre cuerpos debido a una diferencia de temperatura. La temperatura es una medida del estado térmico de un cuerpo.',
      formulas: [
        { name: 'Calor Específico', formula: 'Q = m·c·ΔT', description: 'Calor para cambiar temperatura' },
        { name: 'Dilatación Lineal', formula: 'ΔL = L₀·α·ΔT', description: 'Cambio de longitud por temperatura' },
        { name: 'Calor Latente', formula: 'Q = m·L', description: 'Calor para cambio de fase' },
        { name: 'Equilibrio Térmico', formula: 'Q_cedido = Q_absorbido', description: 'Balance de energía' }
      ],
      units: 'Calor: Joules (J) o calorías (cal), Temperatura: Kelvin (K), Celsius (°C), Calor específico: J/(kg·K)',
      applications: 'Motores térmicos, refrigeración, climatización, cocina, termostatos, termómetros',
      keyPoints: [
        'Tres formas de transferencia: conducción, convección y radiación',
        '1 cal = 4.184 J (equivalente mecánico del calor)',
        'El equilibrio térmico es cuando no hay flujo de calor',
        'Los cambios de fase ocurren a temperatura constante',
        'La dilatación térmica tiene aplicaciones en juntas de dilatación'
      ]
    }
  },
  {
    id: 'energia',
    name: 'Planeta Energía',
    theme: 'Trabajo y Energía',
    color: '#facc15',
    gradientFrom: 'from-yellow-300',
    gradientTo: 'to-amber-500',
    icon: '⚡',
    description: 'Conservación y transformación de energía',
    isActive: true,
    orbitRadius: 480,
    orbitSpeed: 24,
    size: 54,
    theory: {
      definition: 'El trabajo es la transferencia de energía mediante una fuerza. La energía es la capacidad de realizar trabajo. Se conserva en sistemas aislados.',
      formulas: [
        { name: 'Trabajo', formula: 'W = F·d·cos(θ)', description: 'Fuerza × desplazamiento × coseno del ángulo' },
        { name: 'Energía Cinética', formula: 'Ec = ½mv²', description: 'Energía del movimiento' },
        { name: 'Energía Potencial', formula: 'Ep = mgh', description: 'Energía por posición en campo gravitacional' },
        { name: 'Conservación', formula: 'Ec₁ + Ep₁ = Ec₂ + Ep₂', description: 'Energía mecánica total constante' }
      ],
      units: 'Trabajo y Energía: Joules (J), Potencia: Watts (W) = J/s',
      applications: 'Máquinas simples, montañas rusas, vehículos, caída libre, péndulos, resortes',
      keyPoints: [
        'Trabajo positivo: la fuerza favorece el movimiento',
        'Trabajo negativo: la fuerza se opone al movimiento',
        'La energía se transforma pero no se crea ni se destruye',
        'Teorema trabajo-energía: W = ΔEc',
        'Potencia: P = W/t = F·v (razón de realizar trabajo)'
      ]
    }
  },
  {
    id: 'momento',
    name: 'Planeta Momento',
    theme: 'Momento Lineal',
    color: '#94a3b8',
    gradientFrom: 'from-slate-300',
    gradientTo: 'to-slate-500',
    icon: '🎯',
    description: 'Cantidad de movimiento e impulso',
    isActive: true,
    orbitRadius: 520,
    orbitSpeed: 18,
    size: 44,
    theory: {
      definition: 'El momento lineal (o cantidad de movimiento) es una magnitud vectorial que relaciona la masa y la velocidad de un objeto. Se conserva en ausencia de fuerzas externas.',
      formulas: [
        { name: 'Momento Lineal', formula: 'p = m·v', description: 'Masa × velocidad' },
        { name: 'Impulso', formula: 'J = F·Δt = Δp', description: 'Cambio de momento' },
        { name: 'Conservación', formula: 'p₁ = p₂', description: 'En sistema aislado' },
        { name: 'Colisión Elástica', formula: 'm₁v₁ + m₂v₂ = m₁v₁\' + m₂v₂\'', description: 'Se conservan momento y energía' }
      ],
      units: 'Momento: kg·m/s, Impulso: N·s (equivalente a kg·m/s)',
      applications: 'Colisiones, cohetes, armas de fuego, deportes, airbags, sistemas de propulsión',
      keyPoints: [
        'El momento es vector: tiene dirección y sentido',
        'Se conserva en colisiones (sin fuerzas externas)',
        'Colisión elástica: se conserva la energía cinética',
        'Colisión inelástica: no se conserva la energía cinética',
        'Fuerza promedio: F = Δp/Δt (segunda ley de Newton reformulada)'
      ]
    }
  },
  {
    id: 'parabolico',
    name: 'Planeta Parabólico',
    theme: 'Movimiento Parabólico',
    color: '#2dd4bf',
    gradientFrom: 'from-teal-400',
    gradientTo: 'to-cyan-500',
    icon: '🏹',
    description: 'Combinación de MRU y MRUA',
    isActive: true,
    orbitRadius: 560,
    orbitSpeed: 22,
    size: 50,
    theory: {
      definition: 'El movimiento parabólico es la composición de un movimiento rectilíneo uniforme (horizontal) y un movimiento rectilíneo uniformemente acelerado (vertical). La trayectoria resultante es una parábola.',
      formulas: [
        { name: 'Velocidad Horizontal', formula: 'vx = v₀·cos(θ)', description: 'Constante durante el movimiento' },
        { name: 'Velocidad Vertical', formula: 'vy = v₀·sin(θ) - g·t', description: 'Varía con el tiempo' },
        { name: 'Alcance Horizontal', formula: 'R = v₀²·sin(2θ)/g', description: 'Distancia horizontal máxima' },
        { name: 'Altura Máxima', formula: 'H = v₀²·sin²(θ)/2g', description: 'Punto más alto de la trayectoria' }
      ],
      units: 'Velocidad: m/s, Distancia: m, Tiempo: s, Ángulo: grados o radianes',
      applications: 'Deportes (baloncesto, fútbol, golf), proyectiles, fuegos artificiales, fuentes de agua',
      keyPoints: [
        'El tiempo de subida es igual al tiempo de bajada (desde el mismo nivel)',
        'El alcance máximo se logra con ángulo de 45°',
        'Ángulos complementarios dan el mismo alcance',
        'En el punto más alto, la velocidad vertical es cero',
        'La aceleración es siempre g hacia abajo'
      ]
    }
  },
  {
    id: 'magnetismo',
    name: 'Planeta Magnetismo',
    theme: 'Inducción y Magnetismo',
    color: '#3b82f6',
    gradientFrom: 'from-blue-400',
    gradientTo: 'to-indigo-600',
    icon: '🧲',
    description: 'Campos magnéticos e inducción electromagnética',
    isActive: true,
    orbitRadius: 600,
    orbitSpeed: 15,
    size: 52,
    theory: {
      definition: 'El magnetismo es un fenómeno físico mediado por campos magnéticos. La inducción electromagnética es la generación de corriente eléctrica mediante la variación de un campo magnético.',
      formulas: [
        { name: 'Fuerza de Lorentz', formula: 'F = q·v·B', description: 'Fuerza sobre carga en movimiento' },
        { name: 'Ley de Faraday', formula: 'ε = -dΦ/dt', description: 'FEM inducida = cambio de flujo magnético' },
        { name: 'Flujo Magnético', formula: 'Φ = B·A·cos(θ)', description: 'Campo × área × coseno del ángulo' },
        { name: 'Ley de Lenz', formula: 'Sentido de I inducida se opone al cambio', description: 'Conservación de energía' }
      ],
      units: 'Campo magnético: Tesla (T) o Weber/m², Flujo: Weber (Wb), FEM: Voltios (V)',
      applications: 'Generadores eléctricos, transformadores, motores, trenes maglev, resonancia magnética, altavoces',
      keyPoints: [
        'Los campos magnéticos se originan por cargas en movimiento',
        'La fuerza magnética es perpendicular a la velocidad',
        'Un campo magnético no realiza trabajo sobre cargas',
        'La inducción requiere CAMBIO en el flujo magnético',
        'Transformadores: V₁/V₂ = N₁/N₂ (relación de vueltas)'
      ]
    }
  },
  {
    id: 'vertical',
    name: 'Planeta Vertical',
    theme: 'Lanzamiento Vertical',
    color: '#6b7280',
    gradientFrom: 'from-gray-400',
    gradientTo: 'to-gray-600',
    icon: '⬆️',
    description: 'Movimiento vertical bajo gravedad',
    isActive: true,
    orbitRadius: 640,
    orbitSpeed: 26,
    size: 42,
    theory: {
      definition: 'El lanzamiento vertical es un movimiento en una dimensión bajo la acción de la gravedad. Puede ser hacia arriba (subida) o hacia abajo (caída). La aceleración es siempre g = 9.8 m/s² hacia abajo.',
      formulas: [
        { name: 'Velocidad', formula: 'v = v₀ - g·t', description: 'Subida: disminuye; bajada: aumenta' },
        { name: 'Posición', formula: 'y = v₀·t - ½g·t²', description: 'Posición en función del tiempo' },
        { name: 'Tiempo de Subida', formula: 't_subida = v₀/g', description: 'Tiempo hasta altura máxima' },
        { name: 'Altura Máxima', formula: 'h_max = v₀²/2g', description: 'Desde el punto de lanzamiento' }
      ],
      units: 'Velocidad: m/s, Posición: m, Tiempo: s, Aceleración: m/s²',
      applications: 'Deportes (baloncesto, voleibol), fuegos artificiales, lanzamiento de objetos, caída libre',
      keyPoints: [
        'En el punto más alto, la velocidad es instantáneamente cero',
        'El tiempo de subida iguala al tiempo de bajada (mismo nivel)',
        'La velocidad de llegada es igual a la de salida (mismo nivel)',
        'g = 9.8 m/s² (aproximadamente 10 m/s² en cálculos simples)',
        'Ecuación sin tiempo: v² = v₀² - 2g·h'
      ]
    }
  },
  {
    id: 'mru',
    name: 'Planeta MRU',
    theme: 'Movimiento Rectilíneo Uniforme',
    color: '#e5e7eb',
    gradientFrom: 'from-gray-200',
    gradientTo: 'to-gray-400',
    icon: '➡️',
    description: 'Movimiento a velocidad constante',
    isActive: true,
    orbitRadius: 680,
    orbitSpeed: 30,
    size: 40,
    theory: {
      definition: 'El MRU es el movimiento más simple: un cuerpo se mueve en línea recta con velocidad constante. No hay aceleración, por lo que la velocidad no cambia.',
      formulas: [
        { name: 'Velocidad', formula: 'v = d/t', description: 'Distancia recorrida por unidad de tiempo' },
        { name: 'Posición', formula: 'x = x₀ + v·t', description: 'Posición inicial + velocidad × tiempo' },
        { name: 'Distancia', formula: 'd = v·t', description: 'Distancia = velocidad × tiempo' },
        { name: 'Velocidad Media', formula: 'v_m = Δx/Δt', description: 'Igual a velocidad constante' }
      ],
      units: 'Velocidad: m/s, Distancia/Posición: m, Tiempo: s',
      applications: 'Navegación, cinemática básica, trenes, vehículos a velocidad constante, robots',
      keyPoints: [
        'Velocidad constante significa magnitud y dirección constantes',
        'La aceleración es cero',
        'Gráfico x-t: línea recta con pendiente = velocidad',
        'Gráfico v-t: línea horizontal',
        'Gráfico a-t: línea sobre el eje (a = 0)'
      ]
    }
  },
  {
    id: 'relatividad',
    name: 'Planeta Relatividad',
    theme: 'Relatividad Especial',
    color: '#7c3aed',
    gradientFrom: 'from-violet-500',
    gradientTo: 'to-purple-700',
    icon: '⏰',
    description: 'Física a velocidades cercanas a la luz',
    isActive: true,
    orbitRadius: 720,
    orbitSpeed: 10,
    size: 48,
    theory: {
      definition: 'La Relatividad Especial de Einstein describe la física a velocidades cercanas a la velocidad de la luz. Establece que las leyes de la física son iguales en todos los sistemas de referencia inerciales.',
      formulas: [
        { name: 'Dilatación del Tiempo', formula: "t' = t/√(1-v²/c²)", description: 'El tiempo se dilata a alta velocidad' },
        { name: 'Contracción de Longitud', formula: "L' = L·√(1-v²/c²)", description: 'Los objetos se contraen en dirección del movimiento' },
        { name: 'Energía-Masa', formula: 'E = mc²', description: 'Energía = masa × velocidad de la luz al cuadrado' },
        { name: 'Factor de Lorentz', formula: 'γ = 1/√(1-v²/c²)', description: 'Factor de corrección relativista' }
      ],
      units: 'Velocidad: m/s (c = 3×10⁸ m/s), Energía: J, Masa: kg',
      applications: 'Aceleradores de partículas, GPS, energía nuclear, reactores, medicina nuclear',
      keyPoints: [
        'La velocidad de la luz es constante en todos los sistemas de referencia',
        'Ningún objeto con masa puede alcanzar la velocidad de la luz',
        'El tiempo y el espacio son relativos, no absolutos',
        'Masa y energía son equivalentes',
        'A velocidades cotidianas, los efectos relativistas son despreciables'
      ]
    }
  },
  {
    id: 'newton',
    name: 'Planeta Newton',
    theme: 'Leyes de Newton',
    color: '#dc2626',
    gradientFrom: 'from-red-500',
    gradientTo: 'to-rose-700',
    icon: '🍎',
    description: 'Fundamentos de la mecánica clásica',
    isActive: true,
    orbitRadius: 760,
    orbitSpeed: 8,
    size: 56,
    theory: {
      definition: 'Las tres leyes de Newton son los fundamentos de la mecánica clásica. Describen la relación entre las fuerzas que actúan sobre un cuerpo y el movimiento que resulta.',
      formulas: [
        { name: '1ra Ley (Inercia)', formula: 'Si ΣF = 0 → v = constante', description: 'Un cuerpo en reposo o MRU permanece así' },
        { name: '2da Ley', formula: 'F = m·a', description: 'Fuerza = masa × aceleración' },
        { name: '3ra Ley (Acción-Reacción)', formula: 'F₁₂ = -F₂₁', description: 'Cada acción tiene una reacción igual y opuesta' },
        { name: 'Peso', formula: 'W = m·g', description: 'Fuerza gravitacional sobre un cuerpo' }
      ],
      units: 'Fuerza: Newtons (N), Masa: kg, Aceleración: m/s²',
      applications: 'Todo en mecánica clásica: vehículos, máquinas, construcción, deportes, ingeniería',
      keyPoints: [
        'La primera ley define los sistemas de referencia inerciales',
        'La segunda ley es la ecuación fundamental de la dinámica',
        'La tercera ley explica el cohete, la natación, caminar',
        'Las fuerzas siempre vienen en pares',
        'El peso y la normal NO son pares acción-reacción'
      ]
    }
  },
  {
    id: 'proximamente',
    name: 'Planeta Próximamente',
    theme: 'Temas Futuros',
    color: '#374151',
    gradientFrom: 'from-gray-600',
    gradientTo: 'to-gray-800',
    icon: '🔒',
    description: 'Nuevos temas en desarrollo',
    isActive: false,
    orbitRadius: 800,
    orbitSpeed: 35,
    size: 38,
    theory: {
      definition: 'Este planeta representa los temas que estarán disponibles en futuras actualizaciones de FisicaInador.',
      formulas: [],
      units: '',
      applications: 'Próximamente: Óptica, Fluidos, Termodinámica avanzada, Física Cuántica, y más...',
      keyPoints: [
        'Nuevos planetas serán descubiertos pronto',
        'Mantente atento a las actualizaciones',
        'Tu feedback ayuda a decidir nuevos temas',
        'La exploración del universo nunca termina'
      ]
    }
  }
];

export const getPlanetById = (id: string): Planet | undefined => {
  return planets.find(p => p.id === id);
};

export const getActivePlanets = (): Planet[] => {
  return planets.filter(p => p.isActive);
};
