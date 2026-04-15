// Simuladores PhET embebidos para cada planeta
// PhET Interactive Simulations - University of Colorado Boulder
// https://phet.colorado.edu

export interface Simulator {
  id: string;
  name: string;
  description: string;
  url: string;
  thumbnail?: string;
}

export interface PlanetSimulator {
  planetId: string;
  simulators: Simulator[];
}

export const planetSimulators: PlanetSimulator[] = [
  {
    planetId: 'hooke',
    simulators: [
      {
        id: 'mass-spring-lab',
        name: 'Laboratorio de Resortes y Masas',
        description: 'Experimenta con resortes, masas y constante elástica. Observa las oscilaciones y la Ley de Hooke en acción.',
        url: 'https://phet.colorado.edu/sims/html/masses-and-springs/latest/masses-and-springs_es.html',
      },
      {
        id: 'pendulum-lab',
        name: 'Laboratorio de Péndulo',
        description: 'Explora el movimiento armónico simple con péndulos. Modifica la longitud, masa y gravedad.',
        url: 'https://phet.colorado.edu/sims/html/pendulum-lab/latest/pendulum-lab_es.html',
      }
    ]
  },
  {
    planetId: 'cargas',
    simulators: [
      {
        id: 'balloons',
        name: 'Globos y Electricidad Estática',
        description: 'Descubre cómo los globos se cargan electrostáticamente y se adhieren a las paredes.',
        url: 'https://phet.colorado.edu/sims/html/balloons-and-static-electricity/latest/balloons-and-static-electricity_es.html',
      },
      {
        id: 'coulombs-law',
        name: 'Ley de Coulomb',
        description: 'Visualiza la fuerza entre cargas eléctricas y cómo varía con la distancia.',
        url: 'https://phet.colorado.edu/sims/html/coulombs-law/latest/coulombs-law_es.html',
      },
      {
        id: 'charges-fields',
        name: 'Cargas y Campos Eléctricos',
        description: 'Explora el campo eléctrico creado por cargas puntuales y distribuidas.',
        url: 'https://phet.colorado.edu/sims/html/charges-and-fields/latest/charges-and-fields_es.html',
      }
    ]
  },
  {
    planetId: 'circuitos',
    simulators: [
      {
        id: 'circuit-construction-kit-dc',
        name: 'Kit de Construcción de Circuitos DC',
        description: 'Construye circuitos con baterías, resistencias, bombillas y switches. Mide voltaje y corriente.',
        url: 'https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_es.html',
      },
      {
        id: 'circuit-construction-kit-ac',
        name: 'Kit de Circuitos AC',
        description: 'Experimenta con circuitos de corriente alterna, inductores y capacitores.',
        url: 'https://phet.colorado.edu/sims/html/circuit-construction-kit-ac/latest/circuit-construction-kit-ac_es.html',
      },
      {
        id: 'ohms-law',
        name: 'Ley de Ohm',
        description: 'Visualiza la relación entre voltaje, corriente y resistencia.',
        url: 'https://phet.colorado.edu/sims/html/ohms-law/latest/ohms-law_es.html',
      }
    ]
  },
  {
    planetId: 'fem',
    simulators: [
      {
        id: 'battery-resistor',
        name: 'Batería y Resistencia',
        description: 'Explora cómo funciona una batería, la resistencia interna y el flujo de electrones.',
        url: 'https://phet.colorado.edu/sims/html/battery-resistor-circuit/latest/battery-resistor-circuit_es.html',
      },
      {
        id: 'circuit-construction-kit-dc',
        name: 'Kit de Circuitos DC',
        description: 'Construye circuitos y analiza la FEM, voltaje terminal y potencia.',
        url: 'https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_es.html',
      }
    ]
  },
  {
    planetId: 'ondas',
    simulators: [
      {
        id: 'wave-on-string',
        name: 'Onda en una Cuerda',
        description: 'Crea ondas transversales y longitudinales. Modifica amplitud, frecuencia y tensión.',
        url: 'https://phet.colorado.edu/sims/html/wave-on-a-string/latest/wave-on-a-string_es.html',
      },
      {
        id: 'sound',
        name: 'Simulación de Sonido',
        description: 'Explora las ondas sonoras, frecuencia, amplitud y cómo percibimos el sonido.',
        url: 'https://phet.colorado.edu/sims/html/sound/latest/sound_es.html',
      },
      {
        id: 'wave-interference',
        name: 'Interferencia de Ondas',
        description: 'Observa fenómenos de interferencia, difracción y patrones de onda.',
        url: 'https://phet.colorado.edu/sims/html/wave-interference/latest/wave-interference_es.html',
      }
    ]
  },
  {
    planetId: 'vectores',
    simulators: [
      {
        id: 'vector-addition',
        name: 'Suma de Vectores',
        description: 'Visualiza la suma y resta de vectores. Aprende sobre componentes y resultantes.',
        url: 'https://phet.colorado.edu/sims/html/vector-addition/latest/vector-addition_es.html',
      },
      {
        id: 'projectile-motion',
        name: 'Movimiento de Proyectiles',
        description: 'Aplica vectores al movimiento parabólico. Descompone velocidad en componentes.',
        url: 'https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_es.html',
      }
    ]
  },
  {
    planetId: 'gravitacion',
    simulators: [
      {
        id: 'gravity-orbits',
        name: 'Gravedad y Órbitas',
        description: 'Experimenta con la gravedad, órbitas planetarias y la Ley de Gravitación Universal.',
        url: 'https://phet.colorado.edu/sims/html/gravity-and-orbits/latest/gravity-and-orbits_es.html',
      },
      {
        id: 'gravity-force-lab',
        name: 'Laboratorio de Fuerza Gravitacional',
        description: 'Explora la fuerza gravitacional entre masas y cómo depende de la distancia.',
        url: 'https://phet.colorado.edu/sims/html/gravity-force-lab/latest/gravity-force-lab_es.html',
      }
    ]
  },
  {
    planetId: 'kepler',
    simulators: [
      {
        id: 'gravity-orbits',
        name: 'Gravedad y Órbitas',
        description: 'Observa las leyes de Kepler en acción. Manipula órbitas elípticas y períodos.',
        url: 'https://phet.colorado.edu/sims/html/gravity-and-orbits/latest/gravity-and-orbits_es.html',
      },
      {
        id: 'solar-system',
        name: 'Sistema Solar',
        description: 'Explora el sistema solar y las órbitas de los planetas.',
        url: 'https://phet.colorado.edu/sims/html/gravity-and-orbits/latest/gravity-and-orbits_es.html',
      }
    ]
  },
  {
    planetId: 'calor',
    simulators: [
      {
        id: 'states-of-matter',
        name: 'Estados de la Materia',
        description: 'Observa cómo la temperatura afecta los estados sólido, líquido y gaseoso.',
        url: 'https://phet.colorado.edu/sims/html/states-of-matter/latest/states-of-matter_es.html',
      },
      {
        id: 'gas-properties',
        name: 'Propiedades de los Gases',
        description: 'Explora la ley de los gases ideales, presión, temperatura y volumen.',
        url: 'https://phet.colorado.edu/sims/html/gas-properties/latest/gas-properties_es.html',
      },
      {
        id: 'energy-forms',
        name: 'Formas de Energía y Cambios',
        description: 'Visualiza la transferencia de calor y la conservación de energía.',
        url: 'https://phet.colorado.edu/sims/html/energy-forms-and-changes/latest/energy-forms-and-changes_es.html',
      }
    ]
  },
  {
    planetId: 'energia',
    simulators: [
      {
        id: 'energy-skate-park',
        name: 'Parque de Patinaje de Energía',
        description: 'Explora la conservación de energía con un patinador en una rampa.',
        url: 'https://phet.colorado.edu/sims/html/energy-skate-park/latest/energy-skate-park_es.html',
      },
      {
        id: 'ramp-forces',
        name: 'La Rampa: Fuerzas y Movimiento',
        description: 'Analiza trabajo, energía y fuerzas en un plano inclinado.',
        url: 'https://phet.colorado.edu/sims/html/the-ramp/latest/the-ramp_es.html',
      }
    ]
  },
  {
    planetId: 'momento',
    simulators: [
      {
        id: 'collision-lab',
        name: 'Laboratorio de Colisiones',
        description: 'Estudia la conservación del momento lineal en colisiones elásticas e inelásticas.',
        url: 'https://phet.colorado.edu/sims/html/collision-lab/latest/collision-lab_es.html',
      },
      {
        id: 'momentum',
        name: 'Simulación de Momento',
        description: 'Explora el impulso y la conservación del momento en diferentes escenarios.',
        url: 'https://phet.colorado.edu/sims/html/collision-lab/latest/collision-lab_es.html',
      }
    ]
  },
  {
    planetId: 'parabolico',
    simulators: [
      {
        id: 'projectile-motion',
        name: 'Movimiento de Proyectiles',
        description: 'Lanza proyectiles con diferentes ángulos y velocidades. Analiza trayectorias parabólicas.',
        url: 'https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_es.html',
      },
      {
        id: 'vectors-projectile',
        name: 'Vectores y Proyectiles',
        description: 'Descompone el movimiento en componentes horizontal y vertical.',
        url: 'https://phet.colorado.edu/sims/html/vector-addition/latest/vector-addition_es.html',
      }
    ]
  },
  {
    planetId: 'magnetismo',
    simulators: [
      {
        id: 'faraday-law',
        name: 'Ley de Faraday',
        description: 'Explora la inducción electromagnética moviendo un imán cerca de una bobina.',
        url: 'https://phet.colorado.edu/sims/html/faradays-law/latest/faradays-law_es.html',
      },
      {
        id: 'magnet-compass',
        name: 'Imán y Brújula',
        description: 'Visualiza el campo magnético de un imán y cómo afecta una brújula.',
        url: 'https://phet.colorado.edu/sims/html/magnet-and-compass/latest/magnet-and-compass_es.html',
      },
      {
        id: 'magnets-electromagnets',
        name: 'Imanes y Electroimanes',
        description: 'Construye electroimanes y explora campos magnéticos.',
        url: 'https://phet.colorado.edu/sims/html/magnets-and-electromagnets/latest/magnets-and-electromagnets_es.html',
      }
    ]
  },
  {
    planetId: 'vertical',
    simulators: [
      {
        id: 'projectile-motion-v',
        name: 'Movimiento de Proyectiles',
        description: 'Simula lanzamiento vertical y caída libre. Observa la influencia de la gravedad.',
        url: 'https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_es.html',
      },
      {
        id: 'calculadora-gravedad',
        name: 'Laboratorio de Gravedad',
        description: 'Experimenta con caída libre y aceleración gravitacional.',
        url: 'https://phet.colorado.edu/sims/html/gravity-force-lab/latest/gravity-force-lab_es.html',
      }
    ]
  },
  {
    planetId: 'mru',
    simulators: [
      {
        id: 'moving-man',
        name: 'El Hombre en Movimiento',
        description: 'Visualiza posición, velocidad y aceleración en movimientos rectilíneos.',
        url: 'https://phet.colorado.edu/sims/html/moving-man/latest/moving-man_es.html',
      },
      {
        id: 'calculus-grapher',
        name: 'Graficador de Movimiento',
        description: 'Relaciona gráficas de posición, velocidad y aceleración.',
        url: 'https://phet.colorado.edu/sims/html/calculus-grapher/latest/calculus-grapher_es.html',
      }
    ]
  },
  {
    planetId: 'relatividad',
    simulators: [
      {
        id: 'relativistic-doppler',
        name: 'Efecto Doppler Relativista',
        description: 'Observa cómo la luz cambia de frecuencia a altas velocidades.',
        url: 'https://phet.colorado.edu/sims/html/relativistic-doppler-effect/latest/relativistic-doppler-effect_es.html',
      }
    ]
  },
  {
    planetId: 'newton',
    simulators: [
      {
        id: 'forces-motion',
        name: 'Fuerzas y Movimiento',
        description: 'Aplica fuerzas a objetos y observa la aceleración. Explora las Leyes de Newton.',
        url: 'https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics_es.html',
      },
      {
        id: 'forces-motion-advanced',
        name: 'Fuerzas y Movimiento: Avanzado',
        description: 'Explora fricción, fuerzas netas y diagramas de cuerpo libre.',
        url: 'https://phet.colorado.edu/sims/html/forces-and-motion/latest/forces-and-motion_es.html',
      },
      {
        id: 'ramp-forces',
        name: 'La Rampa',
        description: 'Analiza fuerzas en un plano inclinado: peso, normal y fricción.',
        url: 'https://phet.colorado.edu/sims/html/the-ramp/latest/the-ramp_es.html',
      }
    ]
  }
];

// Función para obtener simuladores por planeta
export const getSimulatorsByPlanet = (planetId: string): Simulator[] => {
  const planetSim = planetSimulators.find(ps => ps.planetId === planetId);
  return planetSim ? planetSim.simulators : [];
};

// Función para verificar si un planeta tiene simuladores
export const hasSimulators = (planetId: string): boolean => {
  const simulators = getSimulatorsByPlanet(planetId);
  return simulators.length > 0;
};
