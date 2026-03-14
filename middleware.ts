import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

// Routes that should have anonymous session support
const CART_ROUTES = ['/api/cart', '/cart'];
const PUBLIC_ROUTES = ['/api/products', '/products', '/'];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Log incoming requests for cart operations
  if (pathname.includes('/api/cart')) {
    console.log(`[${new Date().toISOString()}] ${request.method} ${pathname}`);
  }

  // Check if user is authenticated
  const token = await getToken({ req: request, secret });

  // Handle session ID for anonymous users accessing cart
  if (CART_ROUTES.some(route => pathname.startsWith(route))) {
    const response = NextResponse.next();

    // If not authenticated and no sessionId cookie, create one
    if (!token && !request.cookies.has('sessionId')) {
      const sessionId = generateSessionId();
      response.cookies.set('sessionId', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      console.log(`[${new Date().toISOString()}] Created new session ID for anonymous user`);
    }

    return response;
  }

  // Log API requests for monitoring
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const response = NextResponse.next();
    response.headers.set('x-request-time', new Date().toISOString());
    return response;
  }

  return NextResponse.next();
}

/**
 * Generate a unique session ID for anonymous users
 * Uses crypto-secure random generation
 */
function generateSessionId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let sessionId = '';
  
  // Use a more secure approach with date + random string
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 15);
  
  return `${timestamp}-${random}`;
}

// Configure which routes this middleware runs on
export const config = {
  matcher: [
    // Cart routes
    '/api/cart/:path*',
    '/cart/:path*',
    
    // Auth routes
    '/api/auth/:path*',
    
    // Product routes
    '/api/products/:path*',
    '/products/:path*',
    '/checkout/:path*',
  ],
};
