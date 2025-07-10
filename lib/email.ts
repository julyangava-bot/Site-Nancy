// Email utilities for password reset
// In production, you would use a service like SendGrid, Resend, etc.

export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  // For development, we'll just log the reset URL
  if (process.env.NODE_ENV === 'development') {
    console.log('=================================')
    console.log('Password Reset Email')
    console.log('To:', email)
    console.log('Reset URL:', resetUrl)
    console.log('=================================')
    return true
  }

  // In production, integrate with your email service
  // Example with fetch to your email webhook:
  try {
    const response = await fetch(process.env.EMAIL_WEBHOOK_URL || '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: email,
        subject: 'Reset Your PinkDog Admin Password',
        html: `
          <h2>Password Reset Request</h2>
          <p>You requested to reset your password for PinkDog Pet Resort Admin.</p>
          <p>Click the link below to reset your password:</p>
          <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #E73992; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this, please ignore this email.</p>
        `
      })
    })
    
    return response.ok
  } catch (error) {
    console.error('Failed to send email:', error)
    return false
  }
}