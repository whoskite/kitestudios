import { NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'

// This middleware protects routes that require authentication
export default withAuth(
  // Augment the request
  function middleware(req) {
    // Add custom headers or modify the request if needed
    return NextResponse.next()
  },
  {
    callbacks: {
      // Only require auth for specific paths
      authorized({ req, token }) {
        // If there's a token, the user is authenticated
        return !!token
      },
    },
    // Redirect to access denied page if not authenticated
    pages: {
      signIn: '/access-denied',
      error: '/access-denied',
    },
  }
)

// Specify which routes should be protected
export const config = {
  matcher: [
    '/hub',
    '/hub/:path*',
    '/resource/:path*',
    '/admin/:path*',
    '/api/chat/:path*', // Protect chat API routes
  ],
} 