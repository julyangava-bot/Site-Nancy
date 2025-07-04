'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Shield, Loader2, AlertCircle } from 'lucide-react'
import Link from 'next/link'

interface LoginFormProps {
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
}

export function LoginForm({ signIn }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  // Check for saved email on mount
  useEffect(() => {
    // Check if remember me was previously set
    const rememberCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('remember-me='))
    
    if (rememberCookie) {
      setRememberMe(true)
      // Get saved email from localStorage
      const savedEmail = localStorage.getItem('admin-email')
      if (savedEmail) {
        setEmail(savedEmail)
      }
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Handle remember me preference
      if (typeof window !== 'undefined') {
        if (rememberMe) {
          document.cookie = `remember-me=true; max-age=${30 * 24 * 60 * 60}; path=/; SameSite=Lax`
          localStorage.setItem('admin-email', email)
        } else {
          document.cookie = 'remember-me=; max-age=0; path=/; SameSite=Lax'
          localStorage.removeItem('admin-email')
        }
      }

      const result = await signIn(email, password)

      if (result.success) {
        router.push('/admin')
        router.refresh()
      } else {
        setError(result.error || 'Invalid email or password')
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md shadow-xl border-0 bg-white/95 backdrop-blur-sm relative z-10">
      <CardHeader className="text-center space-y-6 pb-8 pt-12">
        <div className="flex flex-col items-center gap-4">
          <Image 
            src="/images/pinkdog_original_no_txt.png" 
            alt="PinkDog Logo" 
            width={80}
            height={80}
            className="drop-shadow-md"
          />
          <div className="space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
              PinkDog Pet Resort
            </h1>
            <p className="text-sm text-gray-600 font-medium tracking-wide uppercase">
              Admin Portal
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-8 pb-8">
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@pinkdog.com"
              className="h-12 text-base border-pink-200 focus:border-pink-400 focus:ring-pink-400 bg-pink-50/30"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Shield className="w-4 h-4 text-pink-500" />
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="h-12 text-base border-pink-200 focus:border-pink-400 focus:ring-pink-400 bg-pink-50/30"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-pink-500 bg-gray-100 border-gray-300 rounded focus:ring-pink-400 focus:ring-2"
            />
            <Label htmlFor="rememberMe" className="text-sm text-gray-600 cursor-pointer select-none">
              Remember me on this device
            </Label>
          </div>
          
          {error && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full h-12 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
          
          <div className="text-center">
            <Link 
              href="/admin/reset-password"
              className="text-sm text-gray-600 hover:text-pink-600 transition-colors"
            >
              Forgot your password?
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}