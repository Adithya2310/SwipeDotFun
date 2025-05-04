import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAuthenticated = request.cookies.has('token') // or however you store your auth token

  // Define protected routes
  const protectedRoutes = []
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  // Redirect to login if accessing protected route while not authenticated
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect to dashboard if accessing auth pages while authenticated
  const authRoutes = ['/login', '/register']
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))
  
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/categories', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/login',
    '/register'
  ],
} 