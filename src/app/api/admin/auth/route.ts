import { NextRequest, NextResponse } from 'next/server';

// Contraseña del administrador (en producción usar variables de entorno)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'FisicaInador2024!';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: 'Contraseña requerida', success: false },
        { status: 400 }
      );
    }

    if (password === ADMIN_PASSWORD) {
      // En producción, usarías JWT o cookies seguras
      return NextResponse.json({ 
        success: true,
        message: 'Autenticación exitosa'
      });
    } else {
      return NextResponse.json(
        { error: 'Contraseña incorrecta', success: false },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Error en la autenticación', success: false },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Admin Auth API',
    hint: 'La contraseña por defecto es: FisicaInador2024!'
  });
}
