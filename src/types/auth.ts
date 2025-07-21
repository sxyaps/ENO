export interface User {
  id: string;
  nfcUid: string;
  accessCode: string;
  isAuthenticated: boolean;
  lastAuthenticated?: Date;
  sessionToken?: string;
  sessionExpiry?: Date;
  glyphName?: string; // Anonymous username for chat
}

export interface AuthToken {
  userId: string;
  nfcUid: string;
  glyphName: string;
  exp: number;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  glyphName?: string;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  sender: string;
  message: string;
  timestamp: Date;
}

export interface ChatRoom {
  id: string;
  name: string;
  description: string;
}
