import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'
import { sendPasswordResetEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      // Don't reveal if user exists or not for security
      return NextResponse.json({ 
        message: 'If an account exists with this email, you will receive reset instructions.' 
      })
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour from now

    // Save token to database
    await prisma.passwordResetToken.create({
      data: {
        email,
        token: resetToken,
        expires: resetTokenExpiry
      }
    })

    // Generate reset URL
    const resetUrl = `${process.env.NEXTAUTH_URL}/admin/reset-password/${resetToken}`
    
    // Send email (or log in development)
    await sendPasswordResetEmail(email, resetUrl)

    // For development, also generate a temporary password as fallback
    if (process.env.NODE_ENV === 'development') {
      const tempPassword = Math.random().toString(36).slice(-8) + 'Aa1!'
      const bcrypt = await import('bcryptjs')
      const hashedPassword = await bcrypt.hash(tempPassword, 10)
      
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword }
      })
      
      console.log('=================================')
      console.log('DEVELOPMENT MODE - Password Reset')
      console.log('Email:', email)
      console.log('Option 1 - Reset URL:', resetUrl)
      console.log('Option 2 - Temporary Password:', tempPassword)
      console.log('=================================')
    }

    return NextResponse.json({ 
      message: 'If an account exists with this email, you will receive reset instructions. Check your console in development mode.' 
    })

  } catch (error) {
    console.error('Password reset error:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}