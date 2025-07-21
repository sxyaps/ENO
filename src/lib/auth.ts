import { SignJWT, jwtVerify } from 'jose';
import { v4 as uuidv4 } from 'uuid';
import { db } from './db';
import { AuthToken, AuthResponse } from '@/types/auth';
import { cookies } from 'next/headers';

// In a real app, these would be environment variables
const JWT_SECRET = new TextEncoder().encode('ENO-YEK-SECRET-KEY-REPLACE-IN-PRODUCTION');
const TOKEN_EXPIRY = '24h';

// Generate anonymous glyph-style username
const generateGlyphName = (userId: string): string => {
  const user = db.findUserByNfcUid(userId);
  if (user?.glyphName) return user.glyphName;
  
  // If no pre-assigned name, create a random one
  const glyphs = ['◊', '◯', '△', '□', '⌂', '⏧', '⏣', '⏥', '⌘', 'Ω', '⏚'];
  const segments = ['VOID', 'ECHO', 'PULSE', 'SHADOW', 'DAWN', 'DUSK', 'FLUX', 'RIFT', 'APEX', 'NULL', 'CROSS'];
  
  const glyph1 = glyphs[Math.floor(Math.random() * glyphs.length)];
  const segment = segments[Math.floor(Math.random() * segments.length)];
  const glyph2 = glyphs[Math.floor(Math.random() * glyphs.length)];
  
  return `${glyph1}-${segment}-${glyph2}`;
};

export const authService = {
  // Authenticate user with NFC UID and access code
  authenticate: async (nfcUid: string, accessCode: string): Promise<AuthResponse> => {
    try {
      // Validate the NFC UID and access code combination
      const user = db.validateAccessCode(nfcUid, accessCode);
      
      if (!user) {
        return {
          success: false,
          message: "Authentication failed. Invalid NFC tag or access code."
        };
      }
      
      // Generate glyph name for this session
      const glyphName = user.glyphName || generateGlyphName(user.id);
      
      // Create the JWT token
      const token = await new SignJWT({ 
        userId: user.id,
        nfcUid: user.nfcUid,
        glyphName
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(TOKEN_EXPIRY)
        .setJti(uuidv4())
        .sign(JWT_SECRET);
      
      // Update user in database
      db.setUserAuthenticated(user.id, token);
      
      return {
        success: true,
        message: "Authentication successful.",
        token,
        glyphName
      };
    } catch (error) {
      console.error('Authentication error:', error);
      return {
        success: false,
        message: "An unexpected error occurred during authentication."
      };
    }
  },
  
  // Verify the JWT token
  verifyToken: async (token: string): Promise<AuthToken | null> => {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      return {
        userId: payload.userId as string,
        nfcUid: payload.nfcUid as string,
        glyphName: payload.glyphName as string,
        exp: payload.exp as number
      };
    } catch (error) {
      console.error('Token verification error:', error);
      return null;
    }
  },
  
  // Get token from cookies
  getTokenFromCookies: (): string | undefined => {
    const cookieStore = cookies();
    return cookieStore.get('auth-token')?.value;
  },
  
  // Logout the user
  logout: (userId: string): boolean => {
    return db.logoutUser(userId);
  }
};
