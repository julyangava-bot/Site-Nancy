import { LoginForm } from './login-form'
import { signIn } from '@/auth'
import { AuthError } from 'next-auth'

async function handleSignIn(email: string, password: string) {
  'use server'
  
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/admin',
    })
    
    return { success: true }
  } catch (error) {
    console.error('Sign in error:', error)
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { success: false, error: 'Invalid email or password' }
        default:
          return { success: false, error: 'Something went wrong' }
      }
    }
    throw error
  }
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF0F7] via-[#FFF9FC] to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
      
      <LoginForm signIn={handleSignIn} />
    </div>
  )
}