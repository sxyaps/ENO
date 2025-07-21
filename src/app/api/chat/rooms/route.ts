import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/lib/auth';
import { db } from '@/lib/db';

// Get all chat rooms
export async function GET(request: NextRequest) {
  try {
    // Get and verify the token from cookies
    const token = authService.getTokenFromCookies();
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Authentication required." },
        { status: 401 }
      );
    }
    
    const decoded = await authService.verifyToken(token);
    
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: "Invalid authentication." },
        { status: 401 }
      );
    }
    
    // Get all chat rooms
    const rooms = db.getChatRooms();
    
    return NextResponse.json({
      success: true,
      rooms
    });
    
  } catch (error) {
    console.error('Chat rooms API error:', error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
