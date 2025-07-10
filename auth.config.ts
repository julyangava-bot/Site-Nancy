import type { NextAuthConfig } from 'next-auth'

export default {
  providers: [],
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.role = user.role
      }
      
      // Handle session updates
      if (trigger === "update" && session) {
        // Update token with new session data
        return { ...token, ...session }
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