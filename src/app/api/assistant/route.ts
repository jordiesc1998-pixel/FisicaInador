import { NextRequest, NextResponse } from 'next/server';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_BASE_URL = process.env.GROQ_BASE_URL || 'https://api.groq.com/openai/v1';
const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

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

    if (!GROQ_API_KEY) {
      console.error('[AI Assistant] GROQ_API_KEY not configured');
      return NextResponse.json(
        { error: 'API de Groq no configurada', success: false },
        { status: 500 }
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

    console.log('[AI Assistant] Calling Groq API...');
    console.log('[AI Assistant] Model:', GROQ_MODEL);
    console.log('[AI Assistant] Base URL:', GROQ_BASE_URL);

    // Llamar a la API de Groq
    const response = await fetch(`${GROQ_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
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
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[AI Assistant] Groq API error:', response.status, errorText);
      return NextResponse.json(
        { error: `Error de Groq API: ${response.status}`, details: errorText, success: false },
        { status: 500 }
      );
    }

    const data = await response.json();
    console.log('[AI Assistant] Groq response received');

    const responseContent = data.choices?.[0]?.message?.content;

    if (!responseContent) {
      console.error('[AI Assistant] No content in response:', data);
      return NextResponse.json(
        { error: 'Respuesta vacía del modelo', success: false },
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
