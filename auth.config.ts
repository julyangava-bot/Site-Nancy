import type { NextAuthConfig } from 'next-auth'

export default {
  providers: [],
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnAdmin = nextUrl.pathname.startsWith('/admin')
      const isOnAdminLogin = nextUrl.pathname === '/admin/login'
      const isOnPasswordReset = nextUrl.pathname.startsWith('/admin/reset-password')
      const isOnApi = nextUrl.pathname.startsWith('/api/admin')
      
      // Allow access to login and password reset pages
      if (isOnAdminLogin || isOnPasswordReset) return true
      
      // Protect admin routes
      if (isOnAdmin || isOnApi) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to login page
      }
      
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    }
  }
} satisfies NextAuthConfig