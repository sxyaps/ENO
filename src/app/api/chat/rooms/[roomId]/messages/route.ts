import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/lib/auth';
import { db } from '@/lib/db';

// Get messages for a specific room
export async function GET(
  request: NextRequest,
  { params }: { params: { roomId: string } }
) {
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
    
    // Get room messages
    const { roomId } = params;
    const room = db.getChatRoomById(roomId);
    
    if (!room) {
      return NextResponse.json(
        { success: false, message: "Chat room not found." },
        { status: 404 }
      );
    }
    
    const messages = db.getMessagesForRoom(roomId);
    
    return NextResponse.json({
      success: true,
      roomName: room.name,
      messages
    });
    
  } catch (error) {
    console.error('Chat messages API error:', error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}

// Add a new message to a room
export async function POST(
  request: NextRequest,
  { params }: { params: { roomId: string } }
) {
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
    
    // Get the message content from the request body
    const body = await request.json();
    const { message } = body;
    
    if (!message) {
      return NextResponse.json(
        { success: false, message: "Message content is required." },
        { status: 400 }
      );
    }
    
    // Add the message to the room
    const { roomId } = params;
    const room = db.getChatRoomById(roomId);
    
    if (!room) {
      return NextResponse.json(
        { success: false, message: "Chat room not found." },
        { status: 404 }
      );
    }
    
    // Use the glyph name from the token as the sender
    const newMessage = db.addMessage(roomId, decoded.glyphName, message);
    
    return NextResponse.json({
      success: true,
      message: newMessage
    });
    
  } catch (error) {
    console.error('Add message API error:', error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
