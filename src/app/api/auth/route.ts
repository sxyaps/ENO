import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/lib/auth';
import { cookies } from 'next/headers';

// Authentication endpoint to validate NFC UID and access code
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nfcUid, accessCode } = body;
    
    if (!nfcUid || !accessCode) {
      return NextResponse.json(
        { success: false, message: "NFC tag ID and access code are required." },
        { status: 400 }
      );
    }
    
    // Authenticate using our service
    const authResponse = await authService.authenticate(nfcUid, accessCode);
    
    if (!authResponse.success || !authResponse.token) {
      return NextResponse.json(
        { success: false, message: authResponse.message },
        { status: 401 }
      );
    }
    
    // Set the secure HTTP-only cookie with the token
    // In a real app, these would be more secure settings
    const cookieStore = cookies();
    cookieStore.set({
      name: 'auth-token',
      value: authResponse.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      // 24 hours expiry
      maxAge: 60 * 60 * 24,
    });
    
    // Return success but don't include the token in the response body
    return NextResponse.json({
      success: true,
      message: "Authentication successful",
      glyphName: authResponse.glyphName
    });
    
  } catch (error) {
    console.error('Auth API error:', error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
