import ZAI from 'z-ai-web-dev-sdk';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, topic, context } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Mensaje requerido' },
        { status: 400 }
      );
    }

    const zai = await ZAI.create();

    // Crear el prompt del sistema con contexto del tema
    const systemPrompt = `Eres un asistente de física educativo para estudiantes pre-universitarios. Tu rol es ayudar a entender conceptos de física de manera clara y didáctica.

${topic ? `El estudiante está actualmente estudiando: ${topic}.` : ''}

${context ? `Contexto adicional: ${context}` : ''}

Instrucciones:
- Responde en español de forma clara y concisa
- Usa ejemplos prácticos y cotidianos
- Si es relevante, incluye fórmulas con explicaciones
- Sé amigable y motivador
- Si el estudiante pregunta algo fuera de física, redirígelo amablemente al tema
- Usa emojis ocasionalmente para hacer la conversación más amena
- Limita tus respuestas a un máximo de 3-4 párrafos`;

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const responseContent = completion.choices[0]?.message?.content || 'Lo siento, no pude procesar tu pregunta. Intenta de nuevo.';

    return NextResponse.json({ 
      response: responseContent,
      success: true 
    });

  } catch (error: any) {
    console.error('Error en el asistente IA:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud', details: error.message },
      { status: 500 }
    );
  }
}
