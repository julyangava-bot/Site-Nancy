import { auth } from './auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const session = await auth()
  const isOnAdmin = request.nextUrl.pathname.startsWith('/admin')
  const isOnAdminLogin = request.nextUrl.pathname === '/admin/login'
  const isOnPasswordReset = request.nextUrl.pathname.startsWith('/admin/reset-password')
  const isOnApi = request.nextUrl.pathname.startsWith('/api/admin')
  
  console.log('Middleware:', { 
    path: request.nextUrl.pathname, 
    hasSession: !!session,
    user: session?.user?.email 
  })
  
  // Allow access to login and password reset pages
  if (isOnAdminLogin || isOnPasswordReset) {
    // If already logged in and trying to access login, redirect to admin
    if (session && isOnAdminLogin) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    return NextResponse.next()
  }
  
  // Protect admin routes
  if ((isOnAdmin || isOnApi) && !session) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*']
}