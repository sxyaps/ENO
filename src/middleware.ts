import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authService } from './lib/auth';

// Paths that require authentication
const PROTECTED_PATHS = [
  '/chat',
  '/api/chat'
];

// Middleware for authentication
export async function middleware(request: NextRequest) {
  // Check if the request path should be protected
  const path = request.nextUrl.pathname;
  const isProtectedPath = PROTECTED_PATHS.some(protectedPath => 
    path.startsWith(protectedPath)
  );

  // Skip middleware for non-protected paths
  if (!isProtectedPath) {
    return NextResponse.next();
  }

  // Get token from cookies
  const token = request.cookies.get('auth-token')?.value;
  
  // If no token is present, redirect to auth page
  if (!token) {
    const authUrl = new URL('/auth', request.url);
    // Pass the original URL as a query parameter for redirect after login
    authUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(authUrl);
  }
  
  try {
    // Verify the token
    const decoded = await authService.verifyToken(token);
    
    if (!decoded) {
      // Token is invalid, redirect to auth page
      const authUrl = new URL('/auth', request.url);
      authUrl.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(authUrl);
    }
    
    // Token is valid, proceed with the request
    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    // Error occurred, redirect to auth page
    const authUrl = new URL('/auth', request.url);
    return NextResponse.redirect(authUrl);
  }
}

// Configure the paths that trigger this middleware
export const config = {
  matcher: [
    // Match all chat-related pages
    '/chat/:path*',
    // Match chat API routes
    '/api/chat/:path*',
  ],
};
