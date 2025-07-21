import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/lib/auth';
import { cookies } from 'next/headers';

// Logout endpoint to clear the session
export async function POST(request: NextRequest) {
  try {
    // Get the token from cookies
    const token = authService.getTokenFromCookies();
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: "No active session found." },
        { status: 400 }
      );
    }
    
    // Verify the token to get the user ID
    const decoded = await authService.verifyToken(token);
    
    if (!decoded || !decoded.userId) {
      // Token is invalid, clear it anyway
      const cookieStore = cookies();
      cookieStore.delete('auth-token');
      
      return NextResponse.json(
        { success: false, message: "Invalid session token." },
        { status: 401 }
      );
    }
    
    // Logout the user in the database
    authService.logout(decoded.userId);
    
    // Clear the authentication cookie
    const cookieStore = cookies();
    cookieStore.delete('auth-token');
    
    return NextResponse.json({
      success: true,
      message: "Logout successful."
    });
    
  } catch (error) {
    console.error('Logout API error:', error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred during logout." },
      { status: 500 }
    );
  }
}
