'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Lock, Loader2, AlertCircle, CheckCircle } from 'lucide-react'

interface ResetFormProps {
  token: string
}

export function ResetForm({ token }: ResetFormProps) {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      setStatus('error')
      setMessage('Passwords do not match')
      return
    }

    if (password.length < 8) {
      setStatus('error')
      setMessage('Password must be at least 8 characters long')
      return
    }

    setIsLoading(true)
    setStatus('idle')
    setMessage('')

    try {
      const response = await fetch('/api/auth/reset-password/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          token,
          password 
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage('Password reset successfully!')
        setTimeout(() => {
          router.push('/admin/login')
        }, 2000)
      } else {
        setStatus('error')
        setMessage(data.error || 'Failed to reset password.')
      }
    } catch {
      setStatus('error')
      setMessage('An error occurred. Please try again.')
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
              Set New Password
            </h1>
            <p className="text-sm text-gray-600">
              Choose a strong password for your account
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-8 pb-8">
        {status === 'success' ? (
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-3 text-center">
              <CheckCircle className="w-12 h-12 text-green-500" />
              <p className="text-sm text-gray-600">{message}</p>
              <p className="text-xs text-gray-500">Redirecting to login...</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Lock className="w-4 h-4 text-pink-500" />
                New Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="h-12 text-base border-pink-200 focus:border-pink-400 focus:ring-pink-400 bg-pink-50/30"
                required
                disabled={isLoading}
                minLength={8}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="h-12 text-base border-pink-200 focus:border-pink-400 focus:ring-pink-400 bg-pink-50/30"
                required
                disabled={isLoading}
                minLength={8}
              />
            </div>
            
            {status === 'error' && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4" />
                {message}
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
                  Resetting...
                </>
              ) : (
                'Reset Password'
              )}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}