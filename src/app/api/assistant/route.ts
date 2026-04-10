import ZAI from 'z-ai-web-dev-sdk';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, topic, context } = body;

    console.log('[AI Assistant] Request received:', { message: message?.substring(0, 50), topic, context: context?.substring(0, 50) });

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Mensaje requerido', success: false },
        { status: 400 }
      );
    }

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

    console.log('[AI Assistant] Initializing ZAI...');
    const zai = await ZAI.create();
    console.log('[AI Assistant] ZAI initialized, sending request...');

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

    console.log('[AI Assistant] Response received:', completion ? 'OK' : 'NULL');

    // Verificar la respuesta
    if (!completion) {
      console.error('[AI Assistant] No completion returned');
      return NextResponse.json(
        { error: 'No se recibió respuesta del modelo', success: false },
        { status: 500 }
      );
    }

    if (!completion.choices || completion.choices.length === 0) {
      console.error('[AI Assistant] No choices in response:', completion);
      return NextResponse.json(
        { error: 'Respuesta vacía del modelo', success: false },
        { status: 500 }
      );
    }

    const responseContent = completion.choices[0]?.message?.content;
    
    if (!responseContent) {
      console.error('[AI Assistant] No content in message:', completion.choices[0]);
      return NextResponse.json(
        { error: 'Contenido vacío en la respuesta', success: false },
        { status: 500 }
      );
    }

    console.log('[AI Assistant] Success, response length:', responseContent.length);

    return NextResponse.json({ 
      response: responseContent,
      success: true 
    });

  } catch (error: any) {
    console.error('[AI Assistant] Error completo:', error);
    console.error('[AI Assistant] Error message:', error?.message);
    console.error('[AI Assistant] Error stack:', error?.stack);
    
    return NextResponse.json(
      { 
        error: 'Error al procesar la solicitud', 
        details: error?.message || 'Error desconocido',
        success: false 
      },
      { status: 500 }
    );
  }
}
