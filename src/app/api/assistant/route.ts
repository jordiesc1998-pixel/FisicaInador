import { NextRequest, NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash';

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

    if (!GEMINI_API_KEY) {
      console.error('[AI Assistant] GEMINI_API_KEY not configured');
      return NextResponse.json(
        { error: 'API de Gemini no configurada', success: false },
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

    console.log('[AI Assistant] Calling Gemini API...');
    console.log('[AI Assistant] Model:', GEMINI_MODEL);

    // Llamar a la API de Gemini
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${systemPrompt}\n\nPregunta del estudiante: ${message}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[AI Assistant] Gemini API error:', response.status, errorText);
      
      // Si es error de ubicación, dar mensaje más amigable
      if (errorText.includes('location is not supported')) {
        return NextResponse.json(
          { 
            error: 'La API de Gemini no está disponible en tu región. Intenta usar VPN o cambiar a otra región.', 
            success: false 
          },
          { status: 500 }
        );
      }
      
      // Si es error de cuota
      if (response.status === 429) {
        return NextResponse.json(
          { 
            error: 'Se alcanzó el límite de solicitudes. Espera un momento e intenta de nuevo.', 
            success: false 
          },
          { status: 429 }
        );
      }
      
      return NextResponse.json(
        { error: `Error de Gemini API: ${response.status}`, details: errorText, success: false },
        { status: 500 }
      );
    }

    const data = await response.json();
    console.log('[AI Assistant] Gemini response received');

    const responseContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

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
