# -*- coding: utf-8 -*-
"""
Documento de Planificación - FisicaInador
Plataforma educativa de física con temática espacial
"""

from reportlab.lib.pagesizes import letter
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, Image
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.lib import colors
from reportlab.lib.units import inch, cm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
import os

# === FONT REGISTRATION ===
pdfmetrics.registerFont(TTFont('Times New Roman', '/usr/share/fonts/truetype/english/Times-New-Roman.ttf'))
pdfmetrics.registerFont(TTFont('SimHei', '/usr/share/fonts/truetype/chinese/SimHei.ttf'))
pdfmetrics.registerFont(TTFont('Microsoft YaHei', '/usr/share/fonts/truetype/chinese/msyh.ttf'))

registerFontFamily('Times New Roman', normal='Times New Roman', bold='Times New Roman')
registerFontFamily('SimHei', normal='SimHei', bold='SimHei')
registerFontFamily('Microsoft YaHei', normal='Microsoft YaHei', bold='Microsoft YaHei')

# === DOCUMENT SETUP ===
output_path = '/home/z/my-project/download/FisicaInador_Planificacion.pdf'
doc = SimpleDocTemplate(
    output_path,
    pagesize=letter,
    rightMargin=72,
    leftMargin=72,
    topMargin=72,
    bottomMargin=72,
    title='FisicaInador_Planificacion',
    author='Z.ai',
    creator='Z.ai',
    subject='Documento de planificación para plataforma educativa FisicaInador'
)

# === STYLES ===
styles = getSampleStyleSheet()

# Cover styles
cover_title = ParagraphStyle(
    name='CoverTitle',
    fontName='Microsoft YaHei',
    fontSize=42,
    leading=50,
    alignment=TA_CENTER,
    spaceAfter=36
)

cover_subtitle = ParagraphStyle(
    name='CoverSubtitle',
    fontName='SimHei',
    fontSize=20,
    leading=28,
    alignment=TA_CENTER,
    spaceAfter=24
)

cover_info = ParagraphStyle(
    name='CoverInfo',
    fontName='SimHei',
    fontSize=14,
    leading=22,
    alignment=TA_CENTER,
    spaceAfter=12
)

# Body styles
h1_style = ParagraphStyle(
    name='H1Style',
    fontName='Microsoft YaHei',
    fontSize=18,
    leading=24,
    alignment=TA_LEFT,
    spaceBefore=18,
    spaceAfter=12,
    textColor=colors.HexColor('#1F4E79')
)

h2_style = ParagraphStyle(
    name='H2Style',
    fontName='Microsoft YaHei',
    fontSize=14,
    leading=20,
    alignment=TA_LEFT,
    spaceBefore=12,
    spaceAfter=8,
    textColor=colors.HexColor('#2E75B6')
)

h3_style = ParagraphStyle(
    name='H3Style',
    fontName='SimHei',
    fontSize=12,
    leading=16,
    alignment=TA_LEFT,
    spaceBefore=8,
    spaceAfter=6,
    textColor=colors.HexColor('#404040')
)

body_style = ParagraphStyle(
    name='BodyStyle',
    fontName='SimHei',
    fontSize=10.5,
    leading=18,
    alignment=TA_LEFT,
    spaceAfter=8,
    wordWrap='CJK'
)

body_justify = ParagraphStyle(
    name='BodyJustify',
    fontName='SimHei',
    fontSize=10.5,
    leading=18,
    alignment=TA_JUSTIFY,
    spaceAfter=8,
    wordWrap='CJK'
)

# Table styles
table_header = ParagraphStyle(
    name='TableHeader',
    fontName='Microsoft YaHei',
    fontSize=10,
    leading=14,
    alignment=TA_CENTER,
    textColor=colors.white
)

table_cell = ParagraphStyle(
    name='TableCell',
    fontName='SimHei',
    fontSize=9,
    leading=12,
    alignment=TA_CENTER,
    wordWrap='CJK'
)

table_cell_left = ParagraphStyle(
    name='TableCellLeft',
    fontName='SimHei',
    fontSize=9,
    leading=12,
    alignment=TA_LEFT,
    wordWrap='CJK'
)

# Build story
story = []

# === COVER PAGE ===
story.append(Spacer(1, 100))
story.append(Paragraph('<b>FisicaInador</b>', cover_title))
story.append(Spacer(1, 24))
story.append(Paragraph('Documento de Planificacion', cover_subtitle))
story.append(Paragraph('Plataforma Educativa de Fisica con Tematica Espacial', cover_subtitle))
story.append(Spacer(1, 48))
story.append(Paragraph('Nivel: Pre-Universitario', cover_info))
story.append(Paragraph('Modalidad: Edutainment (Educacion + Entretenimiento)', cover_info))
story.append(Spacer(1, 60))
story.append(Paragraph('Fecha: Abril 2026', cover_info))
story.append(Paragraph('Version: 1.0', cover_info))
story.append(PageBreak())

# === 1. RESUMEN DEL PROYECTO ===
story.append(Paragraph('<b>1. Resumen del Proyecto</b>', h1_style))
story.append(Spacer(1, 12))

resumen_text = '''FisicaInador es una plataforma web educativa innovadora disenada para estudiantes de nivel pre-universitario que desean aprender fisica de manera interactiva y entretenida. La plataforma adopta una tematica espacial donde cada tema de fisica se representa como un planeta que el estudiante puede explorar libremente. Esta metodologia combina elementos de gamificacion con contenido educativo riguroso, creando una experiencia de aprendizaje inmersiva que motiva a los estudiantes a profundizar en los conceptos fisicos mientras disfrutan del proceso de exploracion.'''
story.append(Paragraph(resumen_text, body_justify))
story.append(Spacer(1, 12))

resumen_text2 = '''El diseno visual se caracteriza por un estilo cartoon colorido pero serio, evitando lo infantil mientras mantiene un atractivo visual para jovenes de 16 a 19 anos. La interfaz incorpora musica y efectos de sonido ambientales espaciales que enriquecen la experiencia inmersiva sin distraer del contenido educativo. Los estudiantes pueden navegar libremente entre los planetas sin una progresion lineal, permitiendo que cada usuario acceda directamente a los temas que necesita reforzar o que le resultan mas interesantes.'''
story.append(Paragraph(resumen_text2, body_justify))
story.append(Spacer(1, 12))

resumen_text3 = '''Cada planeta contiene cinco modulos fundamentales: teoria resumida, imagen ilustrativa del tema, ejercicios basicos generados por inteligencia artificial, un juego interactivo relacionado con el tema, y videos explicativos de YouTube. Adicionalmente, cada planeta cuenta con un asistente de inteligencia artificial configurable que puede responder dudas del estudiante, con la opcion de habilitar o deshabilitar esta funcionalidad segun las preferencias del usuario o del docente.'''
story.append(Paragraph(resumen_text3, body_justify))
story.append(Spacer(1, 18))

# === 2. OBJETIVOS ===
story.append(Paragraph('<b>2. Objetivos del Proyecto</b>', h1_style))
story.append(Spacer(1, 12))

story.append(Paragraph('<b>2.1 Objetivo General</b>', h2_style))
obj_gen = '''Desarrollar una plataforma web educativa interactiva de fisica que utilice gamificacion y tematica espacial para facilitar el aprendizaje de conceptos fisicos fundamentales en estudiantes pre-universitarios, aumentando su motivacion y comprension mediante experiencias inmersivas y personalizadas.'''
story.append(Paragraph(obj_gen, body_justify))
story.append(Spacer(1, 8))

story.append(Paragraph('<b>2.2 Objetivos Especificos</b>', h2_style))
objectives = [
    'Crear una interfaz visual atractiva con tematica espacial tipo cartoon que mantenga el interes del estudiante.',
    'Implementar 16 planetas tematicos con contenido educativo completo y un planeta adicional en desarrollo.',
    'Desarrollar juegos interactivos especificos para cada tema que refuercen el aprendizaje de manera ludica.',
    'Integrar un sistema de generacion de ejercicios con IA que proporcione practica personalizada.',
    'Implementar un asistente IA configurable para resolver dudas en tiempo real.',
    'Disenar un sistema de puntos y recompensas que incentive la participacion activa.',
    'Incluir videos educativos externos de YouTube como recurso complementario de aprendizaje.'
]
for obj in objectives:
    story.append(Paragraph(f'- {obj}', body_style))
story.append(Spacer(1, 18))

# === 3. TEMARIO - PLANETAS ===
story.append(Paragraph('<b>3. Temario: Planetas del Universo FisicaInador</b>', h1_style))
story.append(Spacer(1, 12))

temario_intro = '''El universo de FisicaInador esta compuesto por 16 planetas tematicos activos y un planeta en desarrollo futuro. Cada planeta representa un tema fundamental de fisica que los estudiantes pueden explorar de manera independiente, sin seguir un orden preestablecido. Esta libertad de navegacion permite que cada estudiante personalice su ruta de aprendizaje segun sus necesidades e intereses especificos.'''
story.append(Paragraph(temario_intro, body_justify))
story.append(Spacer(1, 12))

# Planet data
planetas = [
    ('1', 'Planeta Hooke', 'Ley de Hooke', 'Ley de elasticidad, constante de resorte, deformaciones'),
    ('2', 'Planeta Cargas', 'Cargas Electricas', 'Coulomb, distribucion de cargas, campos'),
    ('3', 'Planeta Circuitos', 'Circuitos Electricos', 'Ley de Ohm, series, paralelos, Kirchhoff'),
    ('4', 'Planeta Fem', 'Fuerza Electromotriz', 'FEM, baterias, resistencia interna'),
    ('5', 'Planeta Ondas', 'Ondas Mecanicas', 'Frecuencia, amplitud, longitud de onda'),
    ('6', 'Planeta Vectores', 'Vectores', 'Componentes, suma, producto escalar/vectorial'),
    ('7', 'Planeta Gravitacion', 'Gravitacion Universal', 'Ley de Newton, campos gravitacionales'),
    ('8', 'Planeta Kepler', 'Leyes de Kepler', 'Orbitas, periodos, areas'),
    ('9', 'Planeta Calor', 'Calor y Temperatura', 'Termodinamica basica, dilatacion, transferencia'),
    ('10', 'Planeta Energia', 'Trabajo y Energia', 'Energia cinetica, potencial, conservacion'),
    ('11', 'Planeta Momento', 'Momento Lineal', 'Cantidad de movimiento, impulsos, colisiones'),
    ('12', 'Planeta Parabolico', 'Movimiento Parabolico', 'Proyectiles, trayectorias, alcance'),
    ('13', 'Planeta Magnetismo', 'Induccion y Magnetismo', 'Campos magneticos, Faraday, Lenz'),
    ('14', 'Planeta Vertical', 'Lanzamiento Vertical', 'Caida libre, tiro vertical, gravedad'),
    ('15', 'Planeta MRU', 'Movimiento Rectilineo Uniforme', 'Velocidad constante, graficos posicion-tiempo'),
    ('16', 'Planeta Relatividad', 'Relatividad Especial', 'Einstein, dilatacion temporal, E=mc<super>2</super>'),
    ('17', 'Planeta Newton', 'Leyes de Newton', 'Inercia, F=ma, accion-reaccion'),
    ('18', 'Proximamente', 'Temas Futuros', 'Contenido en desarrollo')
]

# Create table
table_data = [
    [
        Paragraph('<b>No.</b>', table_header),
        Paragraph('<b>Nombre</b>', table_header),
        Paragraph('<b>Tema Principal</b>', table_header),
        Paragraph('<b>Conceptos Clave</b>', table_header)
    ]
]

for p in planetas:
    table_data.append([
        Paragraph(p[0], table_cell),
        Paragraph(p[1], table_cell),
        Paragraph(p[2], table_cell),
        Paragraph(p[3], table_cell_left)
    ])

planetas_table = Table(table_data, colWidths=[1*cm, 3*cm, 4*cm, 7*cm])
planetas_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1F4E79')),
    ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
    ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('FONTNAME', (0, 0), (-1, -1), 'SimHei'),
    ('FONTSIZE', (0, 0), (-1, 0), 10),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ('TOPPADDING', (0, 0), (-1, -1), 8),
    ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
    ('BACKGROUND', (0, 1), (-1, 1), colors.white),
    ('BACKGROUND', (0, 2), (-1, 2), colors.HexColor('#F5F5F5')),
    ('BACKGROUND', (0, 3), (-1, 3), colors.white),
    ('BACKGROUND', (0, 4), (-1, 4), colors.HexColor('#F5F5F5')),
    ('BACKGROUND', (0, 5), (-1, 5), colors.white),
    ('BACKGROUND', (0, 6), (-1, 6), colors.HexColor('#F5F5F5')),
    ('BACKGROUND', (0, 7), (-1, 7), colors.white),
    ('BACKGROUND', (0, 8), (-1, 8), colors.HexColor('#F5F5F5')),
    ('BACKGROUND', (0, 9), (-1, 9), colors.white),
    ('BACKGROUND', (0, 10), (-1, 10), colors.HexColor('#F5F5F5')),
    ('BACKGROUND', (0, 11), (-1, 11), colors.white),
    ('BACKGROUND', (0, 12), (-1, 12), colors.HexColor('#F5F5F5')),
    ('BACKGROUND', (0, 13), (-1, 13), colors.white),
    ('BACKGROUND', (0, 14), (-1, 14), colors.HexColor('#F5F5F5')),
    ('BACKGROUND', (0, 15), (-1, 15), colors.white),
    ('BACKGROUND', (0, 16), (-1, 16), colors.HexColor('#F5F5F5')),
    ('BACKGROUND', (0, 17), (-1, 17), colors.white),
    ('BACKGROUND', (0, 18), (-1, 18), colors.HexColor('#E8E8E8')),
]))

story.append(planetas_table)
story.append(Spacer(1, 6))
story.append(Paragraph('<i>Tabla 1. Lista de planetas y temas del universo FisicaInador</i>', 
    ParagraphStyle('Caption', fontName='SimHei', fontSize=9, alignment=TA_CENTER)))
story.append(Spacer(1, 18))

# === 4. CONTENIDO DE CADA PLANETA ===
story.append(Paragraph('<b>4. Estructura de Contenido por Planeta</b>', h1_style))
story.append(Spacer(1, 12))

contenido_intro = '''Cada planeta del universo FisicaInador contiene una estructura estandarizada de cinco modulos educativos mas un asistente de inteligencia artificial. Esta consistencia permite que los estudiantes se familiaricen rapidamente con la interfaz mientras experimentan contenido diverso y enriquecedor en cada tema. A continuacion se detalla cada componente del contenido planetario.'''
story.append(Paragraph(contenido_intro, body_justify))
story.append(Spacer(1, 12))

story.append(Paragraph('<b>4.1 Teoria Resumida</b>', h2_style))
teoria_text = '''El modulo de teoria presenta los conceptos fundamentales del tema de manera concisa y estructurada. El contenido esta disenado para ser digerible en sesiones de 10 a 15 minutos, utilizando lenguaje accesible para estudiantes pre-universitarios sin sacrificar el rigor cientifico. Se incluyen definiciones claras, formulas principales con explicaciones de cada variable, y ejemplos contextuales que conectan la teoria con situaciones cotidianas. La teoria incorpora elementos visuales como diagramas y esquemas integrados que facilitan la comprension de conceptos abstractos.'''
story.append(Paragraph(teoria_text, body_justify))
story.append(Spacer(1, 8))

story.append(Paragraph('<b>4.2 Imagen del Tema</b>', h2_style))
imagen_text = '''Cada planeta cuenta con una imagen ilustrativa central que resume visualmente el tema. Estas imagenes estan disenadas en estilo cartoon colorido pero profesional, manteniendo coherencia con la estetica general de la plataforma. La imagen sirve como referencia visual rapida y puede ser descargada por los estudiantes mediante el sistema de puntos. Las ilustraciones incorporan elementos caracteristicos del tema, como resortes para Ley de Hooke, orbitas para Kepler, o circuitos para el planeta correspondiente.'''
story.append(Paragraph(imagen_text, body_justify))
story.append(Spacer(1, 8))

story.append(Paragraph('<b>4.3 Ejercicios Basicos Generados por IA</b>', h2_style))
ejercicios_text = '''El modulo de ejercicios utiliza inteligencia artificial para generar problemas practicos de dificultad progresiva. Los ejercicios se clasifican en tres niveles: basico, intermedio y avanzado. El sistema IA genera nuevos ejercicios en cada sesion, evitando la repeticion mecanica y promoviendo la comprension genuina de los conceptos. Cada ejercicio incluye retroalimentacion inmediata con explicaciones detalladas cuando el estudiante comete un error. El sistema registra el desempeno del estudiante para adaptar la dificultad de ejercicios futuros segun su progreso individual.'''
story.append(Paragraph(ejercicios_text, body_justify))
story.append(Spacer(1, 8))

story.append(Paragraph('<b>4.4 Juego del Tema</b>', h2_style))
juego_text = '''Cada planeta incluye un juego interactivo disenado especificamente para reforzar el tema correspondiente. Los juegos implementan mecanicas de gamificacion como puntuacion, temporizadores, niveles de dificultad y logros. Por ejemplo, el Planeta MRU podria incluir un juego de simulacion de movimiento donde el estudiante debe calcular distancias y tiempos para que un personaje llegue a destinos especificos. El Planeta Vectores podria incorporar un juego de navegacion espacial donde el estudiante debe sumar vectores correctamente para dirigir una nave. Los juegos otorgan puntos adicionales al sistema general de recompensas.'''
story.append(Paragraph(juego_text, body_justify))
story.append(Spacer(1, 8))

story.append(Paragraph('<b>4.5 Video Explicativo</b>', h2_style))
video_text = '''Los videos educativos provienen de enlaces de YouTube previamente seleccionados por su calidad pedagogica y relevancia con el tema. Cada video dura entre 5 y 20 minutos y cubre aspectos complementarios a la teoria resumida. El reproductor de video esta integrado en la plataforma para evitar redirecciones externas que puedan distraer al estudiante. El sistema detecta cuando el estudiante ha visto el video completo para otorgar puntos correspondientes. Se incluye una seccion de videos recomendados adicionales para estudiantes que deseen profundizar mas en el tema.'''
story.append(Paragraph(video_text, body_justify))
story.append(Spacer(1, 8))

story.append(Paragraph('<b>4.6 Asistente IA Configurable</b>', h2_style))
asistente_text = '''El asistente de inteligencia artificial funciona como un tutor virtual disponible 24/7 para resolver dudas del estudiante. Utiliza el SDK de z-ai para proporcionar respuestas contextualizadas al tema actual del estudiante. La interfaz incluye un toggle que permite habilitar o deshabilitar el asistente, brindando flexibilidad a docentes que deseen limitar el acceso durante evaluaciones o a estudiantes que prefieran resolver ejercicios sin asistencia. El asistente puede explicar conceptos, resolver dudas puntuales, y proporcionar ejemplos adicionales. El uso del asistente otorga puntos al sistema general de recompensas.'''
story.append(Paragraph(asistente_text, body_justify))
story.append(Spacer(1, 18))

# === 5. SISTEMA DE PUNTOS ===
story.append(Paragraph('<b>5. Sistema de Puntos y Recompensas</b>', h1_style))
story.append(Spacer(1, 12))

puntos_intro = '''El sistema de gamificacion de FisicaInador se basa en un modelo de puntos acumulativos que incentiva la participacion activa del estudiante en todas las actividades educativas. Los puntos pueden canjearse por beneficios concretos dentro de la plataforma, creando un ciclo de motivacion que premia el esfuerzo y la constancia. El sistema esta disenado para evitar la frustracion, asegurando que cualquier actividad educativa genere al menos una cantidad minima de puntos.'''
story.append(Paragraph(puntos_intro, body_justify))
story.append(Spacer(1, 12))

story.append(Paragraph('<b>5.1 Acumulacion de Puntos</b>', h2_style))
story.append(Spacer(1, 8))

# Points table
puntos_data = [
    [Paragraph('<b>Actividad</b>', table_header), Paragraph('<b>Puntos</b>', table_header), Paragraph('<b>Descripcion</b>', table_header)],
    [Paragraph('Completar teoria', table_cell), Paragraph('+10', table_cell), Paragraph('Leer todo el contenido teorico del planeta', table_cell_left)],
    [Paragraph('Resolver ejercicio basico', table_cell), Paragraph('+10', table_cell), Paragraph('Completar un ejercicio del nivel basico', table_cell_left)],
    [Paragraph('Resolver ejercicio intermedio', table_cell), Paragraph('+15', table_cell), Paragraph('Completar un ejercicio del nivel intermedio', table_cell_left)],
    [Paragraph('Resolver ejercicio avanzado', table_cell), Paragraph('+25', table_cell), Paragraph('Completar un ejercicio del nivel avanzado', table_cell_left)],
    [Paragraph('Ganar juego (facil)', table_cell), Paragraph('+15', table_cell), Paragraph('Completar el juego en dificultad facil', table_cell_left)],
    [Paragraph('Ganar juego (medio)', table_cell), Paragraph('+25', table_cell), Paragraph('Completar el juego en dificultad media', table_cell_left)],
    [Paragraph('Ganar juego (dificil)', table_cell), Paragraph('+40', table_cell), Paragraph('Completar el juego en dificultad dificil', table_cell_left)],
    [Paragraph('Ver video completo', table_cell), Paragraph('+15', table_cell), Paragraph('Reproducir el video educativo hasta el final', table_cell_left)],
    [Paragraph('Usar asistente IA', table_cell), Paragraph('+5', table_cell), Paragraph('Realizar una consulta al asistente virtual', table_cell_left)],
]

puntos_table = Table(puntos_data, colWidths=[5*cm, 2*cm, 8*cm])
puntos_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1F4E79')),
    ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
    ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
    ('BACKGROUND', (0, 1), (-1, 1), colors.white),
    ('BACKGROUND', (0, 2), (-1, 2), colors.HexColor('#F5F5F5')),
    ('BACKGROUND', (0, 3), (-1, 3), colors.white),
    ('BACKGROUND', (0, 4), (-1, 4), colors.HexColor('#F5F5F5')),
    ('BACKGROUND', (0, 5), (-1, 5), colors.white),
    ('BACKGROUND', (0, 6), (-1, 6), colors.HexColor('#F5F5F5')),
    ('BACKGROUND', (0, 7), (-1, 7), colors.white),
    ('BACKGROUND', (0, 8), (-1, 8), colors.HexColor('#F5F5F5')),
    ('BACKGROUND', (0, 9), (-1, 9), colors.white),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
    ('TOPPADDING', (0, 0), (-1, -1), 6),
]))

story.append(puntos_table)
story.append(Spacer(1, 6))
story.append(Paragraph('<i>Tabla 2. Sistema de acumulacion de puntos por actividad</i>', 
    ParagraphStyle('Caption', fontName='SimHei', fontSize=9, alignment=TA_CENTER)))
story.append(Spacer(1, 12))

story.append(Paragraph('<b>5.2 Recompensas Desbloqueables</b>', h2_style))
story.append(Spacer(1, 8))

# Rewards table
recompensas_data = [
    [Paragraph('<b>Puntos Requeridos</b>', table_header), Paragraph('<b>Recompensa</b>', table_header), Paragraph('<b>Descripcion</b>', table_header)],
    [Paragraph('500 puntos', table_cell), Paragraph('Descarga de imagenes', table_cell), Paragraph('Permite descargar las imagenes ilustrativas de cualquier planeta visitado', table_cell_left)],
    [Paragraph('1000 puntos', table_cell), Paragraph('Descarga de formularios', table_cell), Paragraph('Acceso a formularios resumen PDF de cada tema con formulas principales', table_cell_left)],
    [Paragraph('1500 puntos', table_cell), Paragraph('Avatar personalizado', table_cell), Paragraph('Desbloquea opciones de personalizacion del avatar del estudiante', table_cell_left)],
    [Paragraph('2500 puntos', table_cell), Paragraph('Modo oscuro', table_cell), Paragraph('Activa el tema visual alternativo oscuro para la plataforma', table_cell_left)],
    [Paragraph('5000 puntos', table_cell), Paragraph('Certificado digital', table_cell), Paragraph('Genera un certificado de completacion del temario con puntuacion total', table_cell_left)],
]

recompensas_table = Table(recompensas_data, colWidths=[4*cm, 4*cm, 7*cm])
recompensas_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1F4E79')),
    ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
    ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
    ('BACKGROUND', (0, 1), (-1, 1), colors.white),
    ('BACKGROUND', (0, 2), (-1, 2), colors.HexColor('#F5F5F5')),
    ('BACKGROUND', (0, 3), (-1, 3), colors.white),
    ('BACKGROUND', (0, 4), (-1, 4), colors.HexColor('#F5F5F5')),
    ('BACKGROUND', (0, 5), (-1, 5), colors.white),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
    ('TOPPADDING', (0, 0), (-1, -1), 6),
]))

story.append(recompensas_table)
story.append(Spacer(1, 6))
story.append(Paragraph('<i>Tabla 3. Recompensas desbloqueables con puntos acumulados</i>', 
    ParagraphStyle('Caption', fontName='SimHei', fontSize=9, alignment=TA_CENTER)))
story.append(Spacer(1, 18))

# === 6. DISEÑO VISUAL ===
story.append(Paragraph('<b>6. Diseno Visual y de Experiencia</b>', h1_style))
story.append(Spacer(1, 12))

story.append(Paragraph('<b>6.1 Estetica General</b>', h2_style))
estetica_text = '''El diseno visual de FisicaInador sigue un estilo cartoon colorido con un enfoque serio y profesional, evitando elementos excesivamente infantiles que puedan alejar a estudiantes de 16 a 19 anos. La paleta de colores principal incluye tonos azules oscuros para el fondo espacial, colores vibrantes para los planetas (cada uno con una identidad cromatica unica), y acentos en amarillo y naranja para elementos interactivos. Los elementos visuales mantienen proporciones realistas con un toque estilizado que facilita la identificacion rapida de conceptos.'''
story.append(Paragraph(estetica_text, body_justify))
story.append(Spacer(1, 8))

story.append(Paragraph('<b>6.2 Interfaz del Universo</b>', h2_style))
interfaz_text = '''La pantalla principal muestra una vista del universo con planetas orbitando alrededor de un sol central que representa el centro de recursos. Cada planeta tiene un diseno unico que alude visualmente a su tema: el Planeta Vectores muestra flechas integradas en su superficie, el Planeta Circuitos tiene lineas conductoras visibles, el Planeta Ondas presenta ondulaciones en su atmosfera. Los planetas giran lentamente y emiten un brillo suave al pasar el cursor sobre ellos. El estudiante puede hacer clic en cualquier planeta para aterrizar y acceder a su contenido.'''
story.append(Paragraph(interfaz_text, body_justify))
story.append(Spacer(1, 8))

story.append(Paragraph('<b>6.3 Elementos de Audio</b>', h2_style))
audio_text = '''La plataforma incluye musica ambiental espacial suave que reproduce en bucle durante la navegacion. Los efectos de sonido acompanan las interacciones: un sonido sutil de choque al aterrizar en un planeta, efectos de interfaz al navegar entre modulos, y sonidos de confirmacion al completar actividades. El audio puede silenciarse completamente desde un control de acceso rapido en la interfaz. Los efectos estan disenados para ser informativos sin resultar intrusivos, manteniendo el enfoque del estudiante en el contenido educativo.'''
story.append(Paragraph(audio_text, body_justify))
story.append(Spacer(1, 8))

story.append(Paragraph('<b>6.4 Accesibilidad</b>', h2_style))
accesibilidad_text = '''La interfaz implementa consideraciones de accesibilidad incluyendo alto contraste para texto sobre fondos oscuros, tamanos de fuente ajustables, navegacion por teclado completa, y etiquetas descriptivas para elementos interactivos. Los colores de los planetas se complementan con iconos distintivos para usuarios con deficiencias de vision del color. El diseno responsivo permite el acceso desde dispositivos moviles y tablets, adaptando la disposicion de los planetas para pantallas de diferentes tamanos sin perder funcionalidad.'''
story.append(Paragraph(accesibilidad_text, body_justify))
story.append(Spacer(1, 18))

# === 7. ARQUITECTURA TECNICA ===
story.append(Paragraph('<b>7. Arquitectura Tecnica</b>', h1_style))
story.append(Spacer(1, 12))

story.append(Paragraph('<b>7.1 Stack Tecnologico</b>', h2_style))
stack_text = '''La plataforma se desarrolla utilizando Next.js 16 con App Router para el frontend, proporcionando una experiencia de aplicacion web moderna con renderizado del lado del servidor optimizado. El estilizado utiliza Tailwind CSS 4 combinado con componentes de shadcn/ui para una interfaz consistente y accesible. La gestion de datos de usuario y progreso se implementa con Prisma ORM conectado a una base de datos PostgreSQL. El asistente de inteligencia artificial utiliza el SDK de z-ai-web-dev-sdk para las funcionalidades de chat y respuesta contextual.'''
story.append(Paragraph(stack_text, body_justify))
story.append(Spacer(1, 8))

story.append(Paragraph('<b>7.2 Generacion de Ejercicios con IA</b>', h2_style))
gen_text = '''El sistema de generacion de ejercicios utiliza el SDK de z-ai para crear problemas contextualizados para cada tema. El prompt del sistema incluye el tema actual, el nivel de dificultad seleccionado, y parametros de variabilidad para generar ejercicios unicos. Cada ejercicio generado incluye el enunciado, los datos necesarios, la respuesta correcta, y una explicacion paso a paso. El sistema valida que los ejercicios generados sean coherentes y tengan soluciones alcanzables antes de presentarlos al estudiante.'''
story.append(Paragraph(gen_text, body_justify))
story.append(Spacer(1, 8))

story.append(Paragraph('<b>7.3 Integracion de Videos</b>', h2_style))
video_tech_text = '''Los videos se integran mediante embeds de YouTube, evitando la necesidad de almacenamiento local de contenido video. Cada planeta tiene asociados entre 1 y 3 videos preseleccionados por su calidad educativa. El reproductor embebido se configura con controles limitados para mantener al estudiante en la plataforma, deshabilitando funciones de videos sugeridos que podrian distraer. El sistema detecta el evento de finalizacion de reproduccion para otorgar puntos automaticamente al completar un video.'''
story.append(Paragraph(video_tech_text, body_justify))
story.append(Spacer(1, 18))

# === 8. FLUJO DE USUARIO ===
story.append(Paragraph('<b>8. Flujo de Usuario Tipico</b>', h1_style))
story.append(Spacer(1, 12))

flujo_intro = '''El flujo de navegacion de FisicaInador esta disenado para ser intuitivo y flexible, permitiendo multiples rutas de aprendizaje segun las preferencias del estudiante. A continuacion se describe un flujo tipico de interaccion con la plataforma.'''
story.append(Paragraph(flujo_intro, body_justify))
story.append(Spacer(1, 12))

flujos = [
    '1. El estudiante accede a la plataforma y observa el universo con los planetas disponibles.',
    '2. Selecciona un planeta de interes haciendo clic sobre el, lo que genera una animacion de aterrizaje.',
    '3. Aterriza en el planeta y visualiza el menu de modulos disponibles: teoria, imagen, ejercicios, juego, video, asistente.',
    '4. Inicia con la teoria resumida para comprender los conceptos fundamentales del tema.',
    '5. Observa la imagen ilustrativa como referencia visual rapida del tema.',
    '6. Accede al modulo de ejercicios donde la IA genera problemas personalizados.',
    '7. Juega el juego interactivo del tema para reforzar el aprendizaje de manera ludica.',
    '8. Ve el video explicativo complementario para profundizar en el tema.',
    '9. Utiliza el asistente IA para resolver dudas puntuales que surgieron durante el aprendizaje.',
    '10. Regresa al universo para explorar otro planeta o revisitar el mismo para practicar mas.'
]

for flujo in flujos:
    story.append(Paragraph(flujo, body_style))
story.append(Spacer(1, 18))

# === 9. CONSIDERACIONES FINALES ===
story.append(Paragraph('<b>9. Consideraciones de Implementacion</b>', h1_style))
story.append(Spacer(1, 12))

story.append(Paragraph('<b>9.1 Fases de Desarrollo</b>', h2_style))
fases_text = '''El desarrollo de FisicaInador se propone en tres fases principales. La primera fase incluye la estructura base del universo, la navegacion entre planetas, y el modulo de teoria resumida para todos los temas. La segunda fase incorpora los modulos de ejercicios con IA, imagenes ilustrativas, y videos de YouTube. La tercera fase completa la plataforma con los juegos interactivos, el sistema de puntos y recompensas, y el asistente IA configurable. Cada fase se entrega con pruebas de usuario para iterar mejoras antes de continuar.'''
story.append(Paragraph(fases_text, body_justify))
story.append(Spacer(1, 8))

story.append(Paragraph('<b>9.2 Mantenimiento y Actualizaciones</b>', h2_style))
mantenimiento_text = '''La plataforma requiere mantenimiento periodico para actualizar los enlaces de videos de YouTube que puedan quedar obsoletos, revisar la calidad de los ejercicios generados por IA, y expandir el contenido del planeta proximamente. Se recomienda implementar un sistema de retroalimentacion de usuarios que permita reportar errores en ejercicios o problemas tecnicos. Las actualizaciones de contenido teorico deben ser revisadas por docentes de fisica para mantener la precision cientifica.'''
story.append(Paragraph(mantenimiento_text, body_justify))
story.append(Spacer(1, 8))

story.append(Paragraph('<b>9.3 Escalabilidad</b>', h2_style))
escalabilidad_text = '''La arquitectura modular permite agregar nuevos planetas sin modificar la estructura existente. El sistema de generacion de ejercicios puede扩展 a temas adicionales simplemente actualizando los prompts del modelo de IA. La plataforma puede integrarse con sistemas de gestion del aprendizaje (LMS) como Moodle mediante API REST, permitiendo que instituciones educativas adopten FisicaInador como complemento a sus cursos presenciales de fisica.'''
story.append(Paragraph(escalabilidad_text, body_justify))
story.append(Spacer(1, 18))

# Build PDF
doc.build(story)
print(f"PDF generado exitosamente: {output_path}")
