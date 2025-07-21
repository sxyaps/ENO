import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/lib/auth';

// Get current user session information
export async function GET(request: NextRequest) {
  try {
    // Get the token from cookies
    const token = authService.getTokenFromCookies();
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: "No active session found." },
        { status: 401 }
      );
    }
    
    // Verify the token
    const decoded = await authService.verifyToken(token);
    
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: "Invalid session token." },
        { status: 401 }
      );
    }
    
    // Return the user information
    return NextResponse.json({
      success: true,
      userId: decoded.userId,
      glyphName: decoded.glyphName
    });
    
  } catch (error) {
    console.error('Get session API error:', error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
